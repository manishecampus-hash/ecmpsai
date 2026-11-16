"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MutableRefObject, type ReactNode, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MousePointer2, MousePointerClick, PauseCircle } from "lucide-react";
import { REFER_INTENT_KEY } from "../invite-earn/invite-earn-button";
import { parseFollowups, stripFollowups } from "@/app/search/components/chat-store";
import { clickElement, markTarget, observe, scrollPage, selectOption, typeInto } from "./agent-dom";
import { DASHBOARD_ROUTES, MAX_STEPS, agentRules, compactObservation, decide, isDashboardRoute, observationText, type AgentDecision, type ApiMessage } from "./agent-brain";
import {
  accountFacts,
  isLive,
  lastRun,
  loadTasks,
  planTask,
  readAgentContext,
  reportPrompt,
  saveTasks,
  titleFromPrompt,
  type AgentContext as AgentData,
  type AgentRun,
  type AgentStep,
  type AgentTask,
  type Plan,
} from "./agent-engine";
import AgentPanel from "./agent-panel";
import AgentChat from "./agent-chat";

// The eCampus Agent for the whole dashboard, in two modes (like ChatGPT):
// - Chat: the student's AI chat (what used to be My Chat), full screen.
// - Work: the dashboard on one side and the agent on the other. The agent drives the real dashboard — it opens
//   pages, reads them, fills tools in after asking — and writes its report with eCampus AI.
// Mounted by app/dashboard/layout.tsx so it stays open while pages change.

export type AgentMode = "chat" | "work";
export interface ChatRequest {
  /** Ask this in a new chat */
  q?: string;
  /** Reopen this saved chat */
  t?: string;
  key: number;
}

interface AgentState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  mode: AgentMode;
  setMode: (mode: AgentMode) => void;
  /** Opens the chat (full screen), optionally asking a question or reopening a saved chat */
  openChat: (request?: Omit<ChatRequest, "key">) => void;
  chatRequest: ChatRequest | null;
  clearChatRequest: () => void;
  /** The chat the student last had open, so it's still there when they come back to Chat */
  chatThreadRef: MutableRefObject<string | null>;
  tasks: AgentTask[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  runningTask: AgentTask | null;
  /** New task, or a follow-up in `taskId` */
  start: (prompt: string, taskId?: string | null) => void;
  /** Switches to Work and starts a new task (from the chat) */
  startWork: (prompt: string) => void;
  /** Runs the task's last message again */
  retry: (taskId: string) => void;
  respond: (approve: boolean) => void;
  stop: () => void;
  rename: (id: string, title: string) => void;
  remove: (id: string) => void;
}

const AgentContext = createContext<AgentState | null>(null);
/** Null outside the dashboard layout */
export const useAgent = () => useContext(AgentContext);

const OPEN_KEY = "ecampus_agent_open";
const MODE_KEY = "ecampus_agent_mode";
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
const remember = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Not remembered — still applies for this visit.
  }
};

// Where the agent cursor rests when a step has nothing on the page to point at (fractions of the dashboard area)
const CURSOR_SPOTS = [
  { x: 0.36, y: 0.32 },
  { x: 0.6, y: 0.46 },
  { x: 0.44, y: 0.62 },
  { x: 0.72, y: 0.36 },
  { x: 0.52, y: 0.74 },
  { x: 0.3, y: 0.52 },
];

interface LiveRun {
  taskId: string;
  runId: string;
  cancelled: boolean;
  abort: AbortController;
  resolveApproval?: (ok: boolean) => void;
}

export default function AgentShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpenState] = useState(false);
  const [mode, setModeState] = useState<AgentMode>("chat");
  const [chatRequest, setChatRequest] = useState<ChatRequest | null>(null);
  const chatThreadRef = useRef<string | null>(null);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const tasksRef = useRef<AgentTask[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const liveRef = useRef<LiveRun | null>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const saved = loadTasks();
    tasksRef.current = saved;
    setTasks(saved);
    try {
      setOpenState(localStorage.getItem(OPEN_KEY) === "1");
      if (localStorage.getItem(MODE_KEY) === "work") setModeState("work");
    } catch {
      // Storage unavailable — starts closed, in chat.
    }
    return () => {
      const live = liveRef.current;
      if (live) {
        live.cancelled = true;
        live.abort.abort();
      }
    };
  }, []);

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next);
    remember(OPEN_KEY, next ? "1" : "0");
  }, []);

  const setMode = useCallback((next: AgentMode) => {
    setModeState(next);
    remember(MODE_KEY, next);
  }, []);

  const openChat = useCallback(
    (request?: Omit<ChatRequest, "key">) => {
      setMode("chat");
      setOpen(true);
      if (request && (request.q || request.t)) setChatRequest({ ...request, key: Date.now() });
    },
    [setMode, setOpen],
  );

  // ── Task state: every change goes through here so the ref stays current ──
  const setAll = useCallback((fn: (prev: AgentTask[]) => AgentTask[], persist = true) => {
    const next = fn(tasksRef.current);
    tasksRef.current = next;
    setTasks(next);
    if (persist) saveTasks(next);
  }, []);

  const patchRun = useCallback(
    (taskId: string, runId: string, fn: (r: AgentRun) => AgentRun, persist = true) =>
      setAll(
        (all) => all.map((t) => (t.id !== taskId ? t : { ...t, updatedAt: Date.now(), runs: t.runs.map((r) => (r.id === runId ? fn(r) : r)) })),
        persist,
      ),
    [setAll],
  );

  // ── The agent's hands: open a page, wait for it, read it ──
  const goTo = useCallback(
    (route: string) => {
      if (route === pathRef.current) return;
      // Invite & Earn opens its offer popup on every visit; this hand-off flag makes it skip it
      if (route === "/dashboard/invite-earn") {
        try {
          sessionStorage.setItem(REFER_INTENT_KEY, "1");
        } catch {
          // Storage unavailable — the popup may show.
        }
      }
      router.push(route);
    },
    [router],
  );

  const waitForPage = useCallback(async (route: string, alive: () => boolean) => {
    const started = Date.now();
    while (alive() && Date.now() - started < 9000) {
      const main = dashRef.current?.querySelector("main");
      if (pathRef.current === route && main && (main.textContent ?? "").trim().length > 60) break;
      await sleep(150);
    }
    // Let the page load its data and settle before the agent reads or points at it
    await sleep(800);
  }, []);

  const readPage = useCallback(() => {
    const main = dashRef.current?.querySelector("main") as HTMLElement | null;
    if (!main) return null;
    const title = main.querySelector("h1")?.textContent?.trim() || "Dashboard page";
    const text = (main.innerText || "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n+/g, "\n")
      .trim()
      .slice(0, 3200);
    return { title, text };
  }, []);

  // Writes an answer out a few words at a time, the way a streamed answer arrives
  const typeOut = useCallback(
    async (live: LiveRun, text: string) => {
      const words = text.split(/(\s+)/);
      for (let shown = 0; shown < words.length && !live.cancelled; ) {
        shown = Math.min(words.length, shown + 6);
        const partial = words.slice(0, shown).join("");
        patchRun(live.taskId, live.runId, (r) => ({ ...r, answer: partial }), false);
        await sleep(24);
      }
    },
    [patchRun],
  );

  // ── The report: streamed from eCampus AI; written here from the same data if it can't be reached ──
  const writeReport = useCallback(
    async (live: LiveRun, prompt: string, ctx: AgentData, plan: Plan, pages: { title: string; text: string }[], approved: Record<number, boolean>, history: { role: "user" | "assistant"; content: string }[]) => {
      const alive = () => !live.cancelled;
      let full = "";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: prompt, messages: [...history, { role: "user", content: reportPrompt(prompt, ctx, plan, pages, approved) }] }),
          signal: live.abort.signal,
        });
        if (!res.ok || !res.body) throw new Error("eCampus AI unavailable");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let checked = false;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          if (!checked && full.length > 40) {
            checked = true;
            // The API's offline answer is generic — the agent writes its own instead
            if (/^\s*#+\s*Information for:/i.test(full)) throw new Error("eCampus AI offline");
          }
          if (checked) patchRun(live.taskId, live.runId, (r) => ({ ...r, answer: full }), false);
        }
        if (!full.trim() || /^\s*#+\s*Information for:/i.test(full)) throw new Error("eCampus AI offline");
        return { answer: full, followups: parseFollowups(full) };
      } catch (e) {
        if (!alive() || (e as Error)?.name === "AbortError") return null;
        const text = plan.fallback(approved);
        await typeOut(live, text);
        return alive() ? { answer: text, followups: [] } : null;
      }
    },
    [patchRun, typeOut],
  );

  // ── The run: each step for real — open the page, read it, ask before acting, then report ──
  const execute = useCallback(
    async (live: LiveRun, prompt: string, plan: Plan, ctx: AgentData, history: { role: "user" | "assistant"; content: string }[]) => {
      const { taskId, runId } = live;
      const alive = () => !live.cancelled;
      const setStep = (i: number, patch: Partial<AgentRun["steps"][number]>, runPatch: Partial<AgentRun> = {}) =>
        patchRun(taskId, runId, (r) => ({ ...r, ...runPatch, steps: r.steps.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));
      const pages: { title: string; text: string }[] = [];
      const approved: Record<number, boolean> = {};

      for (let i = 0; i < plan.steps.length && alive(); i++) {
        const step = plan.steps[i];
        setStep(i, { status: "running" });

        if (step.approval) {
          setStep(i, {}, { status: "awaiting" });
          const ok = await new Promise<boolean>((resolve) => (live.resolveApproval = resolve));
          live.resolveApproval = undefined;
          if (!alive()) return;
          approved[i] = ok;
          setStep(i, ok ? {} : { status: "skipped" }, { status: "running" });
          if (!ok) continue;
        }

        if (step.kind === "write") {
          const report = await writeReport(live, prompt, ctx, plan, pages, approved, history);
          if (!alive() || !report) return;
          patchRun(taskId, runId, (r) => ({
            ...r,
            status: "done",
            finishedAt: Date.now(),
            answer: report.answer,
            followups: report.followups,
            steps: r.steps.map((s) => (s.status === "running" || s.status === "pending" ? { ...s, status: "done" } : s)),
          }));
          return;
        }

        if (step.route) {
          goTo(step.route);
          await waitForPage(step.route, alive);
        }
        if (!alive()) return;
        if (step.action) {
          window.dispatchEvent(new CustomEvent(step.action.event, { detail: step.action.detail }));
          await sleep(1200);
        }
        if (step.read) {
          const page = readPage();
          if (page) {
            pages.push(page);
            setStep(i, { detail: `${step.detail ? `${step.detail} · ` : ""}read ${page.text.length.toLocaleString("en-IN")} characters on “${page.title}”` });
          }
          await sleep(900);
        } else if (!step.route) {
          await sleep(900 + Math.round(Math.random() * 500));
        }
        if (alive()) setStep(i, { status: "done" });
      }
    },
    [goTo, patchRun, readPage, waitForPage, writeReport],
  );

  // ── Work mode, like ChatGPT's agent: look at the page, let eCampus AI pick one action, do it, repeat ──
  // Returns "offline" when eCampus AI can't take the first step, so the scripted run above takes over.
  const executeAI = useCallback(
    async (live: LiveRun, prompt: string, ctx: AgentData, earlier: AgentRun[]): Promise<"done" | "offline"> => {
      const { taskId, runId } = live;
      const alive = () => !live.cancelled;
      const addStep = (step: Omit<AgentStep, "id">) => {
        const id = uid();
        patchRun(taskId, runId, (r) => ({ ...r, steps: [...r.steps, { ...step, id }] }));
        return id;
      };
      const setStep = (id: string, patch: Partial<AgentStep>, runPatch: Partial<AgentRun> = {}) =>
        patchRun(taskId, runId, (r) => ({ ...r, ...runPatch, steps: r.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
      const finish = async (answer: string, followups: string[] = []) => {
        await typeOut(live, answer);
        if (!alive()) return;
        patchRun(taskId, runId, (r) => ({
          ...r,
          status: "done",
          finishedAt: Date.now(),
          answer,
          followups: followups.filter((f) => typeof f === "string" && f.trim()).slice(0, 3),
          steps: r.steps.map((s) => (s.status === "running" ? { ...s, status: "done" } : s)),
        }));
      };

      const earlierText = earlier
        .filter((r) => r.answer.trim())
        .slice(-3)
        .map((r) => `Student: ${r.prompt}\nYou answered: ${stripFollowups(r.answer).slice(0, 1200)}`)
        .join("\n\n");
      const rules = agentRules(prompt, accountFacts(ctx), earlierText);
      const turns: ApiMessage[] = [];
      let lastResult = "";
      let lastKey = "";

      for (let n = 1; n <= MAX_STEPS + 1; n++) {
        if (!alive()) return "done";
        const stepId = addStep({ kind: "think", title: n === 1 ? "Looking at your dashboard" : "Thinking", status: "running" });
        const obs = observe(dashRef.current, pathRef.current);
        const now = observationText(n, obs, lastResult, n > MAX_STEPS);

        let decision: AgentDecision;
        try {
          decision = await decide([...turns, { role: "user", content: n === 1 ? `${rules}\n\n${now}` : now }], prompt, live.abort.signal);
        } catch {
          if (!alive()) return "done";
          if (n === 1) {
            patchRun(taskId, runId, (r) => ({ ...r, steps: r.steps.filter((s) => s.id !== stepId) }));
            return "offline";
          }
          setStep(stepId, { kind: "write", title: "Lost the connection to eCampus AI" });
          await finish(`I lost my connection to eCampus AI partway through.${lastResult ? ` The last thing I did: ${lastResult}` : ""}\n\nTry the task again in a moment.`);
          return "done";
        }
        if (!alive()) return "done";
        // Earlier pages go back to the AI in short form; only the newest page is sent in full
        const compact = compactObservation(n, obs, lastResult);
        turns.push({ role: "user", content: n === 1 ? `${rules}\n\n${compact}` : compact }, { role: "assistant", content: JSON.stringify(decision) });

        const a = decision.action;
        const thought = decision.thought || undefined;
        let result = "";
        let skipped = false;

        if (a.type === "done") {
          setStep(stepId, { kind: "write", title: "Writing the answer", detail: thought });
          await finish(a.answer, Array.isArray(a.followups) ? a.followups : []);
          return "done";
        } else if (a.type === "open") {
          if (!isDashboardRoute(a.route)) {
            result = `${a.route} isn't a dashboard page.`;
            skipped = true;
            setStep(stepId, { kind: "open", title: `Couldn't open ${a.route}`, detail: thought });
          } else {
            const name = DASHBOARD_ROUTES.find(([r]) => r === a.route)?.[1].split(" — ")[0] ?? a.route;
            setStep(stepId, { kind: "open", title: `Opening ${name}`, detail: thought, route: a.route, target: "main h1" });
            goTo(a.route);
            await waitForPage(a.route, alive);
            result = `Opened ${a.route}.`;
          }
        } else if (a.type === "scroll") {
          const dir = a.direction === "up" ? "up" : "down";
          setStep(stepId, { kind: "scroll", title: dir === "up" ? "Scrolling back up" : "Scrolling down the page", detail: thought });
          const moved = scrollPage(dashRef.current, dir);
          await sleep(900);
          result = moved ? `Scrolled ${dir}.` : `The page can't scroll further ${dir}.`;
        } else if (a.type === "click" || a.type === "type" || a.type === "select") {
          const target = obs.elements.find((e) => e.id === a.id);
          if (!target || !target.el.isConnected) {
            result = `There's no element [${a.id}] on this page now.`;
            skipped = true;
            setStep(stepId, { kind: a.type, title: "Looking for that again", detail: thought });
          } else if (target.blocked) {
            result = target.blocked;
            skipped = true;
            setStep(stepId, { kind: a.type, title: `Left “${target.label}” for you`, detail: thought });
          } else {
            const name = target.label.length > 42 ? `${target.label.slice(0, 40).trim()}…` : target.label;
            const title = a.type === "click" ? `Clicking “${name}”` : a.type === "type" ? `Typing “${a.text}” into ${name}` : `Choosing “${a.value}” in ${name}`;
            setStep(stepId, { kind: a.type, title, detail: thought, target: `[data-agent-target="${stepId}"]` });
            markTarget(target.el, stepId);

            // Anything that changes the student's account waits for their OK
            let approved = true;
            if (target.sensitive) {
              setStep(
                stepId,
                { approval: { title: `Click “${target.label}”?`, description: thought ?? "This changes something in your account.", confirmLabel: "Yes, do it" } },
                { status: "awaiting" },
              );
              approved = await new Promise<boolean>((resolve) => (live.resolveApproval = resolve));
              live.resolveApproval = undefined;
              if (!alive()) return "done";
              setStep(stepId, {}, { status: "running" });
            }

            if (!approved) {
              result = `The student said no to “${target.label}” — don't try it again.`;
              skipped = true;
            } else {
              await sleep(750); // the cursor gets there first
              const before = pathRef.current;
              try {
                if (a.type === "click") {
                  await clickElement(target.el);
                  result = `Clicked “${target.label}”.`;
                } else if (a.type === "type") {
                  await typeInto(target.el, String(a.text ?? ""), Boolean(a.enter), alive);
                  result = `Typed “${a.text}” into “${target.label}”.`;
                } else {
                  result = `Chose “${selectOption(target.el, String(a.value ?? ""))}” in “${target.label}”.`;
                }
                await sleep(800);
                if (pathRef.current !== before) {
                  await waitForPage(pathRef.current, alive);
                  result += ` The page changed to ${pathRef.current}.`;
                }
              } catch (err) {
                result = `That didn't work (${(err as Error).message}).`;
              }
            }
          }
        } else {
          result = "That action doesn't exist — use one from the list.";
          skipped = true;
          setStep(stepId, { title: "Rethinking", detail: thought });
        }

        // Don't let it go round in circles
        const key = JSON.stringify(a);
        if (key === lastKey) result += " You already did exactly this — try something else, or finish with done.";
        lastKey = key;
        lastResult = result;
        if (alive()) setStep(stepId, { status: skipped ? "skipped" : "done" });
      }

      if (alive()) await finish(`I ran out of steps before finishing this.${lastResult ? ` The last thing I did: ${lastResult}` : ""}\n\nTell me what to focus on and I'll continue.`);
      return "done";
    },
    [goTo, patchRun, typeOut, waitForPage],
  );

  const runningTask = tasks.find((t) => isLive(lastRun(t))) ?? null;

  const begin = useCallback(
    (prompt: string, taskId: string | null, replaceLast: boolean) => {
      const text = prompt.trim();
      if (!text || liveRef.current) return;
      const ctx = readAgentContext();
      const plan = planTask(text, ctx);
      const now = Date.now();
      const run: AgentRun = {
        id: uid(),
        prompt: text,
        status: "running",
        steps: [],
        answer: "",
        startedAt: now,
      };
      const existing = taskId ? tasksRef.current.find((t) => t.id === taskId) : undefined;
      const earlier = existing ? (replaceLast ? existing.runs.slice(0, -1) : existing.runs) : [];
      const task: AgentTask = existing
        ? { ...existing, updatedAt: now, runs: [...earlier, run] }
        : { id: uid(), title: titleFromPrompt(text), createdAt: now, updatedAt: now, runs: [run] };
      // Earlier turns go along so follow-ups ("now for 5 years") keep their context
      const history = earlier
        .filter((r) => r.answer.trim())
        .slice(-4)
        .flatMap((r) => [
          { role: "user" as const, content: r.prompt },
          { role: "assistant" as const, content: stripFollowups(r.answer).slice(0, 3000) },
        ]);

      setAll((all) => [task, ...all.filter((t) => t.id !== task.id)]);
      setActiveId(task.id);
      const live: LiveRun = { taskId: task.id, runId: run.id, cancelled: false, abort: new AbortController() };
      liveRef.current = live;
      // eCampus AI drives the dashboard step by step; if it can't be reached, the scripted run for this kind of task does the work
      (async () => {
        const outcome = await executeAI(live, text, ctx, earlier);
        if (outcome === "offline" && !live.cancelled) {
          patchRun(task.id, run.id, (r) => ({ ...r, steps: plan.steps.map((s, i) => ({ ...s, id: `${now}-${i}`, status: "pending" })) }));
          await execute(live, text, plan, ctx, history);
        }
      })().finally(() => {
        if (liveRef.current === live) liveRef.current = null;
      });
    },
    [execute, executeAI, patchRun, setAll],
  );

  const start = useCallback((prompt: string, taskId: string | null = null) => begin(prompt, taskId, false), [begin]);

  const startWork = useCallback(
    (prompt: string) => {
      setMode("work");
      setOpen(true);
      begin(prompt, null, false);
    },
    [begin, setMode, setOpen],
  );

  const retry = useCallback(
    (taskId: string) => {
      const run = lastRun(tasksRef.current.find((t) => t.id === taskId));
      if (run) begin(run.prompt, taskId, true);
    },
    [begin],
  );

  const respond = useCallback((approve: boolean) => liveRef.current?.resolveApproval?.(approve), []);

  const stop = useCallback(() => {
    const live = liveRef.current;
    if (!live) return;
    live.cancelled = true;
    live.abort.abort();
    live.resolveApproval?.(false);
    liveRef.current = null;
    patchRun(live.taskId, live.runId, (r) => ({
      ...r,
      status: "stopped",
      finishedAt: Date.now(),
      steps: r.steps.map((s) => (s.status === "running" ? { ...s, status: "pending" } : s)),
    }));
  }, [patchRun]);

  const rename = useCallback((id: string, title: string) => setAll((all) => all.map((t) => (t.id === id ? { ...t, title } : t))), [setAll]);

  const remove = useCallback(
    (id: string) => {
      if (liveRef.current?.taskId === id) stop();
      setAll((all) => all.filter((t) => t.id !== id));
      setActiveId((current) => (current === id ? null : current));
    },
    [setAll, stop],
  );

  const value: AgentState = {
    open,
    setOpen,
    toggle: () => setOpen(!open),
    mode,
    setMode,
    openChat,
    chatRequest,
    clearChatRequest: () => setChatRequest(null),
    chatThreadRef,
    tasks,
    activeId,
    setActiveId,
    runningTask,
    start,
    startWork,
    retry,
    respond,
    stop,
    rename,
    remove,
  };

  const working = lastRun(runningTask);
  const chatVisible = open && mode === "chat";

  return (
    <AgentContext.Provider value={value}>
      <div className="flex h-screen overflow-hidden">
        {/* The whole dashboard */}
        <div ref={dashRef} className="relative min-w-0 flex-1">
          {children}
          <WorkingOverlay run={working ?? null} chatOpen={open && mode === "work"} hostRef={dashRef} />
        </div>

        {/* Work mode: the agent beside the dashboard */}
        <AnimatePresence initial={false}>{open && mode === "work" && <AgentPanel key="agent-panel" />}</AnimatePresence>

        {/* Chat mode: full screen. Stays mounted once opened so an answer keeps streaming while the student looks at Work. */}
        <AgentChat visible={chatVisible} />

        {/* Closed while a task runs: a pill with what the agent is doing, to bring it back */}
        <AnimatePresence>
          {!open && working && (
            <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[85] flex justify-center px-4 md:bottom-6">
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                onClick={() => {
                  setMode("work");
                  setOpen(true);
                }}
                aria-label="Open eCampus Agent"
                className="pointer-events-auto inline-flex max-w-full items-center gap-2 rounded-full bg-[#1B2230] px-4 py-2.5 text-sm font-medium text-white shadow-xl shadow-black/20"
              >
                <Bot className="h-4 w-4 flex-shrink-0" aria-hidden />
                <span className="truncate">
                  {working.status === "awaiting"
                    ? "Waiting for your go-ahead — tap to answer"
                    : (working.steps.find((s) => s.status === "running")?.title ?? "eCampus Agent is working…")}
                </span>
                <span aria-hidden className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500 motion-safe:animate-pulse" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AgentContext.Provider>
  );
}

// Over the dashboard while the agent works: a red frame, the agent's cursor on the element it's working with,
// and what it's doing right now. The dashboard is locked meanwhile so the student doesn't click under its hands.
function WorkingOverlay({ run, chatOpen, hostRef }: { run: AgentRun | null; chatOpen: boolean; hostRef: RefObject<HTMLDivElement | null> }) {
  const pathname = usePathname();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [hostRef]);

  const runningIndex = run ? run.steps.findIndex((s) => s.status === "running") : -1;
  const step = runningIndex >= 0 && run ? run.steps[runningIndex] : undefined;
  const spot = CURSOR_SPOTS[Math.max(0, runningIndex) % CURSOR_SPOTS.length];

  // Find what the step works on, bring it into view and follow it while the page settles
  // (not while it waits for a go-ahead — the page that step works on isn't open yet)
  const target = run?.status === "awaiting" ? undefined : step?.target;
  const stepId = step?.id;
  // A new run or a new page starts without a highlight; while the agent thinks (no target) the cursor stays put
  const runId = run?.id;
  useEffect(() => setBox(null), [runId, pathname]);
  useEffect(() => {
    const host = hostRef.current;
    if (!target || !host) return;
    setBox(null);
    let el: HTMLElement | null = null;
    let tries = 0;
    const find = () =>
      [target, "main h1"]
        .flatMap((sel) => Array.from(host.querySelectorAll<HTMLElement>(sel)))
        .find((e) => e.getClientRects().length > 0 && e.getBoundingClientRect().height > 8) ?? null;
    const timer = window.setInterval(() => {
      tries += 1;
      if (!el || !el.isConnected) {
        el = find();
        el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      if (el) {
        const h = host.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const y = Math.max(8, r.top - h.top);
        setBox({ x: Math.max(8, r.left - h.left), y, w: Math.min(r.width, h.width - 16), h: Math.max(24, Math.min(r.height, h.height - y - 16)) });
      }
      if (tries > 24) window.clearInterval(timer);
    }, 160);
    return () => window.clearInterval(timer);
  }, [target, stepId, pathname, hostRef]);

  const cursor = box ? { x: box.x + Math.min(box.w * 0.3, 160), y: box.y + Math.min(box.h * 0.5, 26) } : { x: spot.x * size.w, y: spot.y * size.h };

  return (
    <AnimatePresence>
      {run && (
        <motion.div
          key="agent-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
          className="absolute inset-0 z-[60] cursor-not-allowed"
        >
          {/* Red working frame */}
          <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_3px_rgba(239,68,68,0.55),inset_0_0_40px_rgba(239,68,68,0.18)]" />
          <span className="pointer-events-none absolute right-4 top-[76px] inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-red-600/30">
            <span className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
            eCampus Agent is working
          </span>

          {/* What the agent is working on */}
          <AnimatePresence>
            {box && (
              <motion.span
                key="focus"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: box.x - 6, y: box.y - 6, width: box.w + 12, height: box.h + 12 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="pointer-events-none absolute left-0 top-0 rounded-2xl border-2 border-red-500/70 bg-red-500/[0.04] shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              />
            )}
          </AnimatePresence>

          {/* Agent cursor */}
          {size.w > 0 && (
            <motion.span
              className="pointer-events-none absolute left-0 top-0"
              animate={{ x: cursor.x, y: cursor.y }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
            >
              <MousePointer2 className="h-7 w-7 -rotate-12 fill-red-600 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
              {run.status === "running" && (
                <span key={runningIndex} className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/40 motion-safe:animate-ping" />
              )}
            </motion.span>
          )}

          {/* What it's doing */}
          <AnimatePresence mode="wait">
            {step && (
              <motion.div
                key={step.id + run.status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-none absolute bottom-24 left-4 right-4 justify-center md:bottom-6 ${chatOpen ? "flex" : "hidden"}`}
              >
                <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#1B2230]/95 px-4 py-2 text-xs font-medium text-white shadow-xl">
                  {run.status === "awaiting" ? (
                    <PauseCircle className="h-4 w-4 flex-shrink-0 text-amber-400" />
                  ) : (
                    <MousePointerClick className="h-4 w-4 flex-shrink-0 text-red-400" />
                  )}
                  <span className="truncate">{run.status === "awaiting" ? "Waiting for your go-ahead in the chat" : step.title}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
