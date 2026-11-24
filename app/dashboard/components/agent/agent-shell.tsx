"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MutableRefObject, type ReactNode, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, Globe, LayoutDashboard, Lock, MoreVertical, MousePointer2, MousePointerClick, PauseCircle, Plus, RotateCw, Square, X } from "lucide-react";
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
  /** Work mode on laptop-size screens: the dashboard is shown inside the agent's "screen" (full-screen view) */
  screenMode: boolean;
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
  /** Frontend-only scripted task in Work mode (e.g. AI Apply). Returns false if the agent is busy. */
  runScript: (script: AgentScript) => boolean;
}

/** A task the agent works through step by step without eCampus AI — each step's line updates as it finishes */
export interface AgentScript {
  prompt: string;
  /** Page the agent opens first (shown on its screen while it works) */
  route?: string;
  routeTitle?: string;
  steps: { title: string; run: () => { ok: boolean; title: string; detail?: string } }[];
  summarize: (results: { ok: boolean; title: string }[]) => string;
}

const AgentContext = createContext<AgentState | null>(null);
/** Null outside the dashboard layout */
export const useAgent = () => useContext(AgentContext);

const OPEN_KEY = "ecampus_agent_open";
const SCREEN_MIN_WIDTH = 1024;
const MODE_KEY = "ecampus_agent_mode";
// The agent's screen: device bezel and the browser bar (tab strip + address row) above the page
const BEZEL = 10;
const CHROME_H = 72;
// The page inside the agent's screen is laid out at laptop size, so wide monitors don't stretch it
const LAPTOP_W = 1440;
const LAPTOP_H = 900;
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

  const runScript = useCallback(
    (script: AgentScript) => {
      if (liveRef.current) return false;
      setMode("work");
      setOpen(true);
      const now = Date.now();
      const run: AgentRun = { id: uid(), prompt: script.prompt, status: "running", steps: [], answer: "", startedAt: now };
      const task: AgentTask = { id: uid(), title: titleFromPrompt(script.prompt), createdAt: now, updatedAt: now, runs: [run] };
      setAll((all) => [task, ...all]);
      setActiveId(task.id);
      const live: LiveRun = { taskId: task.id, runId: run.id, cancelled: false, abort: new AbortController() };
      liveRef.current = live;
      const alive = () => !live.cancelled;
      const addStep = (step: Omit<AgentStep, "id">) => {
        const id = uid();
        patchRun(task.id, run.id, (r) => ({ ...r, steps: [...r.steps, { ...step, id }] }));
        return id;
      };
      const setStep = (id: string, patch: Partial<AgentStep>) =>
        patchRun(task.id, run.id, (r) => ({ ...r, steps: r.steps.map((st) => (st.id === id ? { ...st, ...patch } : st)) }));

      (async () => {
        if (script.route) {
          const id = addStep({ kind: "open", title: script.routeTitle ?? "Opening the page", status: "running", route: script.route, target: "main h1" });
          goTo(script.route);
          await waitForPage(script.route, alive);
          if (!alive()) return;
          setStep(id, { status: "done" });
        }
        const results: { ok: boolean; title: string }[] = [];
        for (const step of script.steps) {
          if (!alive()) return;
          const id = addStep({ kind: "act", title: step.title, status: "running" });
          await sleep(1100 + Math.round(Math.random() * 500));
          if (!alive()) return;
          const res = step.run();
          results.push(res);
          setStep(id, { title: res.title, detail: res.detail, status: res.ok ? "done" : "skipped" });
        }
        const answer = script.summarize(results);
        await typeOut(live, answer);
        if (!alive()) return;
        patchRun(task.id, run.id, (r) => ({ ...r, status: "done", finishedAt: Date.now(), answer }));
      })().finally(() => {
        if (liveRef.current === live) liveRef.current = null;
      });
      return true;
    },
    [goTo, patchRun, setAll, setMode, setOpen, typeOut, waitForPage],
  );

  // Work mode on laptop-size screens, once there's a task: full-screen view with the dashboard inside a laptop-style
  // screen and the agent docked on the right (like ChatGPT's agent). Before a task — and in Chat mode — the agent is
  // docked beside the normal dashboard.
  const [wide, setWide] = useState(false);
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const sync = () => {
      setWide(window.innerWidth >= SCREEN_MIN_WIDTH);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const activeTask = tasks.find((t) => t.id === activeId);
  const screenMode = open && mode === "work" && wide && Boolean(runningTask || (activeTask && activeTask.runs.length > 0));

  // Fit the full-size dashboard (laptop width × height) into the space beside the chat
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !screenMode) return;
    const ro = new ResizeObserver(([e]) => setStage({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [screenMode]);
  const screen = { w: Math.min(viewport.w, LAPTOP_W), h: Math.min(viewport.h, LAPTOP_H) };
  const scale =
    stage.w > 0 && stage.h > 0
      ? Math.min((stage.w - BEZEL * 2) / screen.w, (stage.h - BEZEL * 2 - CHROME_H) / screen.h, 1)
      : 0.6;

  const value: AgentState = {
    open,
    setOpen,
    screenMode,
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
    runScript,
  };

  const working = lastRun(runningTask);
  const chatVisible = open && mode === "chat";
  const runningStep = working?.steps.find((st) => st.status === "running");

  return (
    <AgentContext.Provider value={value}>
      <style>{`
        @keyframes agent-screen-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes agent-frame-in { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
        .agent-screen-in { animation: agent-screen-in .3s ease-out; }
        .agent-frame-in { animation: agent-frame-in .5s cubic-bezier(.22,1,.36,1); }
        @media (prefers-reduced-motion: reduce) { .agent-screen-in, .agent-frame-in { animation: none; } }
      `}</style>
      {/* The wrappers below are display:contents outside the laptop view, so the dashboard keeps its normal layout
          (and stays mounted — no reload — when the view changes) */}
      <div className={screenMode ? "agent-screen-in fixed inset-0 z-[80] flex overflow-hidden bg-[#f5f6f8]" : "flex h-screen overflow-hidden"}>
        {/* Agent's screen column — on the right in the laptop view (the agent panel sits on the left) */}
        <div className={screenMode ? "order-2 flex min-w-0 flex-1 flex-col overflow-hidden" : "contents"}>
          {screenMode && <ScreenHeader onExit={() => setOpen(false)} />}
          <div ref={stageRef} className={screenMode ? "flex min-h-0 flex-1 items-center justify-center px-6 xl:px-10" : "contents"}>
            <div
              className={
                screenMode
                  ? "agent-frame-in flex flex-col rounded-[26px] bg-[#0f1219] shadow-[0_40px_80px_-36px_rgba(15,23,42,0.6),inset_0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-black/25"
                  : "contents"
              }
              style={screenMode ? { width: screen.w * scale + BEZEL * 2, padding: BEZEL } : undefined}
            >
              {screenMode && <BrowserChrome route={pathname} />}
              <div
                ref={viewRef}
                className={screenMode ? "relative overflow-hidden rounded-b-[16px] bg-white" : "contents"}
                style={screenMode ? { width: screen.w * scale, height: screen.h * scale } : undefined}
              >
                {/* The whole dashboard — full laptop size, scaled into the screen in the laptop view */}
                <div
                  ref={dashRef}
                  className={screenMode ? "absolute left-0 top-0 origin-top-left" : "relative min-w-0 flex-1"}
                  style={screenMode ? { width: screen.w, height: screen.h, transform: `scale(${scale})` } : undefined}
                >
                  {children}
                  {!screenMode && <AgentCursor run={working ?? null} chatOpen={open && mode === "work"} hostRef={dashRef} scopeRef={dashRef} />}
                </div>
                {screenMode && <AgentCursor run={working ?? null} chatOpen inScreen hostRef={viewRef} scopeRef={dashRef} />}
              </div>
            </div>
          </div>
          {screenMode && (
            <ControlBar
              status={!working ? "idle" : working.status === "awaiting" ? "awaiting" : "working"}
              stepTitle={runningStep?.title}
              onStop={stop}
            />
          )}
        </div>

        {/* Work mode: the agent docked on the right beside the dashboard — or on the left beside its screen while it works */}
        <AnimatePresence initial={false}>{open && mode === "work" && <AgentPanel key="agent-panel" />}</AnimatePresence>

        {/* Chat mode: docked on the right beside the dashboard (full screen on phones / tablets). Stays mounted once
            opened so an answer keeps streaming while the student looks at Work. */}
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
                    : (working.steps.find((st) => st.status === "running")?.title ?? "eCampus Agent is working…")}
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

// Title row above the agent's screen, with the way back to the normal dashboard
function ScreenHeader({ onExit }: { onExit: () => void }) {
  return (
    <div className="flex h-14 flex-shrink-0 items-center gap-2.5 border-b border-black/[0.06] bg-white/70 px-6 backdrop-blur xl:px-10">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 ring-1 ring-inset ring-red-100">
        <Globe className="h-3.5 w-3.5 text-red-600" aria-hidden />
      </span>
      <span className="text-[14px] font-semibold text-[#1B2230]">Agent&apos;s browser</span>
      <span className="text-[12px] text-[#8f8f8f]">Your dashboard, live</span>
      <button
        type="button"
        onClick={onExit}
        className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 text-[12.5px] font-semibold text-[#1B2230] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:border-red-200 hover:bg-red-50/60 hover:text-red-700"
      >
        <LayoutDashboard className="h-4 w-4" aria-hidden />
        Go to Dashboard
      </button>
    </div>
  );
}

// Browser bar inside the device frame: one tab for the page the agent is on, and the address row
function BrowserChrome({ route }: { route: string }) {
  const page = DASHBOARD_ROUTES.find(([r]) => r === route)?.[1].split(" — ")[0] ?? "Dashboard";
  return (
    <div aria-hidden className="flex flex-shrink-0 flex-col overflow-hidden rounded-t-[16px] bg-[#e8eaee]" style={{ height: CHROME_H }}>
      <div className="flex h-[34px] items-end gap-1.5 px-3">
        <span className="mb-[11px] flex items-center gap-1.5 pr-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex h-[28px] w-[210px] min-w-0 items-center gap-2 rounded-t-[10px] bg-white px-3 text-[11.5px] font-medium text-[#1B2230]">
          <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-[4px] bg-red-600 text-[8px] font-bold leading-none text-white">e</span>
          <span className="truncate">{page} · eCampus</span>
          <X className="ml-auto h-3 w-3 flex-shrink-0 text-[#9aa0aa]" />
        </span>
        <Plus className="mb-[8px] h-3.5 w-3.5 text-[#7b818c]" />
      </div>
      <div className="flex h-[38px] items-center gap-3 border-b border-black/[0.06] bg-white px-3.5 text-[#7b818c]">
        <ArrowLeft className="h-3.5 w-3.5" />
        <ArrowRight className="h-3.5 w-3.5 text-[#c2c6cd]" />
        <RotateCw className="h-3.5 w-3.5" />
        <span className="flex h-[26px] min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f3f5] px-3 text-[11.5px] text-[#3d4352]">
          <Lock className="h-3 w-3 flex-shrink-0 text-[#9aa0aa]" />
          <span className="truncate">ecampusapp.com{route}</span>
        </span>
        <MoreVertical className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

// Under the screen: who's in control right now, with a way to stop the agent while it works
function ControlBar({ status, stepTitle, onStop }: { status: "idle" | "working" | "awaiting"; stepTitle?: string; onStop: () => void }) {
  return (
    <div className="flex flex-shrink-0 justify-center px-6 pb-5 pt-4">
      <div
        aria-live="polite"
        className="inline-flex h-11 max-w-[min(560px,100%)] items-center gap-3 rounded-2xl bg-[#141821] pl-4 pr-1.5 text-[13px] text-white shadow-[0_16px_32px_-14px_rgba(15,23,42,0.65)]"
      >
        {status === "working" ? (
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-red-500 motion-safe:animate-pulse" />
        ) : status === "awaiting" ? (
          <PauseCircle className="h-4 w-4 flex-shrink-0 text-amber-400" aria-hidden />
        ) : (
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
        )}
        <span className="min-w-0 truncate">
          {status === "working" ? (
            <>
              <span className="font-semibold">Agent has control</span>
              <span className="text-white/55"> · {stepTitle || "Working…"}</span>
            </>
          ) : status === "awaiting" ? (
            <span className="text-white/85">Waiting for your go-ahead in the chat</span>
          ) : (
            <span className="font-semibold">You have control</span>
          )}
        </span>
        {status === "idle" ? (
          <span className="w-2.5" />
        ) : (
          <button
            type="button"
            onClick={onStop}
            className="inline-flex h-8 flex-shrink-0 items-center gap-1.5 rounded-xl bg-white/10 px-3 text-[12.5px] font-semibold transition hover:bg-white/[0.16]"
          >
            <Square className="h-3 w-3 fill-current" aria-hidden />
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

// While the agent works: a normal mouse pointer that glides to what it's working on and "clicks" it — like a person
// using the dashboard. No frames or highlight boxes. The dashboard ignores the student's clicks meanwhile.
// `hostRef` is the box the pointer is drawn in; `scopeRef` is where it looks for the element being worked on.
function AgentCursor({
  run,
  chatOpen,
  inScreen = false,
  hostRef,
  scopeRef,
}: {
  run: AgentRun | null;
  chatOpen: boolean;
  inScreen?: boolean;
  hostRef: RefObject<HTMLDivElement | null>;
  scopeRef: RefObject<HTMLDivElement | null>;
}) {
  const pathname = usePathname();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [hostRef]);

  const runningIndex = run ? run.steps.findIndex((st) => st.status === "running") : -1;
  const step = runningIndex >= 0 && run ? run.steps[runningIndex] : undefined;
  const spot = CURSOR_SPOTS[Math.max(0, runningIndex) % CURSOR_SPOTS.length];
  const target = run?.status === "awaiting" ? undefined : step?.target;
  const stepId = step?.id;
  const clicks = step && (step.kind === "click" || step.kind === "select" || step.kind === "type" || step.kind === "open");

  // Glide to the element the step works on (following it while the page scrolls / settles)
  useEffect(() => {
    const host = hostRef.current;
    const scope = scopeRef.current;
    if (!target || !host || !scope) return;
    let el: HTMLElement | null = null;
    let tries = 0;
    const find = () =>
      [target, "main h1"]
        .flatMap((sel) => Array.from(scope.querySelectorAll<HTMLElement>(sel)))
        .find((e) => e.getClientRects().length > 0 && e.getBoundingClientRect().height > 4) ?? null;
    const timer = window.setInterval(() => {
      tries += 1;
      if (!el || !el.isConnected) {
        el = find();
        el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      if (el) {
        const h = host.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const x = Math.min(Math.max(10, r.left - h.left + Math.min(r.width / 2, 90)), h.width - 14);
        const y = Math.min(Math.max(10, r.top - h.top + r.height / 2), h.height - 14);
        setPoint({ x, y });
      }
      if (tries > 24) window.clearInterval(timer);
    }, 160);
    return () => window.clearInterval(timer);
  }, [target, stepId, pathname, hostRef, scopeRef]);

  // Start each run from a resting spot; while the agent thinks the pointer stays where it is
  const runId = run?.id;
  useEffect(() => setPoint(null), [runId]);
  const at = point ?? { x: spot.x * size.w, y: spot.y * size.h };

  return (
    <AnimatePresence>
      {run && (
        <motion.div
          key="agent-cursor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
          className={`absolute inset-0 ${inScreen ? "z-[5]" : "z-[60]"}`}
        >
          {/* Mouse pointer (tip at the point) */}
          {size.w > 0 && (
            <motion.span
              className="pointer-events-none absolute left-0 top-0"
              animate={{ x: at.x - 3, y: at.y - 2 }}
              transition={{ type: "spring", stiffness: 70, damping: 17, mass: 0.9 }}
            >
              <MousePointer2
                className={`${inScreen ? "h-5 w-5" : "h-6 w-6"} fill-white text-[#111827] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]`}
                strokeWidth={1.75}
              />
              {/* click ripple once the pointer has arrived */}
              {run.status === "running" && clicks && target && (
                <motion.span
                  key={stepId}
                  initial={{ scale: 0.2, opacity: 0.55 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.75, ease: "easeOut" }}
                  className="absolute -left-2.5 -top-2.5 h-6 w-6 rounded-full border-2 border-[#111827]/40 bg-[#111827]/10"
                />
              )}
            </motion.span>
          )}

          {/* Phones / tablets (no laptop screen): what it's doing, under the pointer */}
          {!inScreen && (
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
                      <MousePointerClick className="h-4 w-4 flex-shrink-0 text-white/70" />
                    )}
                    <span className="truncate">{run.status === "awaiting" ? "Waiting for your go-ahead in the chat" : step.title}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
