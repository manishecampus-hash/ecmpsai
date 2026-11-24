"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUpRight,
  Bot,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Copy,
  FileSearch,
  FolderDown,
  Gift,
  Globe,
  History,
  IndianRupee,
  Keyboard,
  LayoutDashboard,
  ListChecks,
  Loader2,
  MousePointerClick,
  PauseCircle,
  PenLine,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  SquarePen,
  StopCircle,
  UserCircle,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";
import ChatSidebar from "@/app/search/components/chat-sidebar";
import ChatComposer, { type ChatComposerHandle } from "@/app/search/components/chat-composer";
import { UserMessage } from "@/app/search/components/chat-message";
import MarkdownAnswer from "@/app/search/components/markdown-answer";
import { ConfirmDeleteDialog } from "@/app/search/components/chat-dialogs";
import { stripFollowups, type ChatThread } from "@/app/search/components/chat-store";
import { lastRun, type AgentRun, type AgentStep, type AgentTask, type StepKind } from "./agent-engine";
import { useAgent } from "./agent-shell";
import ModeSwitch from "./mode-switch";

// Work mode: the agent beside the dashboard, like ChatGPT's agent. The student gives it a task; eCampus AI works through
// the real dashboard on the other side — looks at each page, opens, clicks, types, asks before changing anything —
// narrating every step here, then answers.
// Follow-ups continue the same task. Docked from 1024px; a full-screen sheet on smaller screens.

const EASE = [0.22, 1, 0.36, 1] as const;

const SUGGESTIONS: { icon: LucideIcon; text: string }[] = [
  { icon: ClipboardList, text: "Check where each of my applications stands" },
  { icon: FolderDown, text: "Find the documents I still need to submit" },
  { icon: IndianRupee, text: "Plan EMIs for a 3 lakh education loan" },
  { icon: Gift, text: "Track my referral rewards" },
];

// What the agent can open — shown under the greeting
const ACCESS: { icon: LucideIcon; label: string }[] = [
  { icon: UserCircle, label: "Profile" },
  { icon: ClipboardList, label: "Applications" },
  { icon: FolderDown, label: "Downloads" },
  { icon: Gift, label: "Invite & Earn" },
  { icon: Calculator, label: "EMI Calculator" },
];

const KIND_ICON: Record<StepKind, LucideIcon> = {
  open: MousePointerClick,
  read: FileSearch,
  check: ShieldCheck,
  calc: Calculator,
  act: Wand2,
  write: PenLine,
  think: Sparkles,
  click: MousePointerClick,
  type: Keyboard,
  select: ListChecks,
  scroll: ArrowDownUp,
};

const elapsed = (from: number, to = Date.now()) => {
  const s = Math.max(0, Math.round((to - from) / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};

// Task history reuses the chat's sidebar, so tasks are shaped like chat threads for it
const asThread = (t: AgentTask): ChatThread => ({
  id: t.id,
  title: t.title,
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
  messages: [{ id: `${t.id}-q`, role: "user", content: t.runs[0]?.prompt ?? t.title }],
});

export default function AgentPanel() {
  const agent = useAgent();
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<ChatThread | null>(null);
  const [studentName, setStudentName] = useState<string | undefined>();
  const [, setTick] = useState(0);
  const composerRef = useRef<ChatComposerHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const [showJump, setShowJump] = useState(false);

  useEffect(() => {
    try {
      setStudentName(JSON.parse(localStorage.getItem("ecampus_student") || "{}")?.name);
    } catch {
      // No saved profile.
    }
  }, []);

  const tasks = agent?.tasks;
  const active = tasks?.find((t) => t.id === agent?.activeId) ?? null;
  const runningTask = agent?.runningTask ?? null;
  const current = lastRun(active);

  // Ticks the elapsed time while something runs
  useEffect(() => {
    if (!runningTask) return;
    const i = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(i);
  }, [runningTask]);

  // Follow the run unless the student scrolled up
  useEffect(() => {
    const el = scrollRef.current;
    if (el && pinnedRef.current) el.scrollTo({ top: el.scrollHeight });
  }, [current?.steps, current?.answer, current?.status, active?.runs.length]);

  const threads = useMemo(() => (tasks ?? []).map(asThread), [tasks]);
  if (!agent) return null;
  const { start, retry, respond, stop, rename, remove, setActiveId, setOpen } = agent;
  const busy = Boolean(runningTask);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedRef.current = gap < 80;
    setShowJump(gap > 240);
  };

  // A message continues the open task; with none open it starts a new one
  const run = (prompt: string, taskId: string | null = active?.id ?? null) => {
    pinnedRef.current = true;
    start(prompt, taskId);
  };

  const submit = () => {
    if (!draft.trim() || busy) return;
    run(draft);
    setDraft("");
  };

  const newTask = () => {
    setHistoryOpen(false);
    setDraft("");
    setActiveId(null);
    requestAnimationFrame(() => composerRef.current?.focus());
  };

  // Dashboard links in a report open in place (beside the agent) instead of a new tab
  const openLink = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/")) return;
    e.preventDefault();
    router.push(href);
    if (window.innerWidth < 1024) setOpen(false);
  };

  const firstName = studentName?.trim().split(/\s+/)[0];
  // In the laptop view the agent sits on the left and its screen on the right
  const dockLeft = agent.screenMode;

  return (
    <motion.aside
      initial={{ opacity: 0, x: dockLeft ? -32 : 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dockLeft ? -32 : 32 }}
      transition={{ duration: 0.3, ease: EASE }}
      aria-label="eCampus Agent"
      className={`fixed inset-0 z-[80] flex flex-col bg-white lg:relative lg:inset-auto lg:z-[55] lg:h-screen ${dockLeft ? "lg:w-[440px] xl:w-[500px] 2xl:w-[540px]" : "lg:w-[400px] xl:w-[440px]"} lg:flex-shrink-0 lg:border-black/[0.08] ${
        dockLeft ? "lg:border-r lg:shadow-[12px_0_40px_-24px_rgba(0,0,0,0.18)]" : "lg:border-l lg:shadow-[-12px_0_40px_-24px_rgba(0,0,0,0.25)]"
      }`}
    >
      {/* Header */}
      <header className={`flex-shrink-0 border-b border-black/[0.06] px-3 sm:px-4 ${dockLeft ? "" : "pb-3"}`}>
        <div className="flex h-14 items-center gap-2">
          <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2a3346] to-[#1B2230] shadow-sm">
            <Bot className="h-4 w-4 text-white" aria-hidden />
            <span
              className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${busy ? "bg-red-500 motion-safe:animate-pulse" : "bg-emerald-500"}`}
            />
          </span>
          {/* Phones: just the avatar — the title needs more room than the header has there */}
          <div className="invisible min-w-0 flex-1 sm:visible">
            <h2 className="truncate text-[15px] font-semibold leading-tight text-[#1B2230]">{dockLeft ? "eCampus AI Work Agent" : "eCampus Agent"}</h2>
            <p className={`truncate text-[11px] font-medium ${busy ? "text-red-600" : "text-[#6b7280]"}`}>
              {busy ? (runningTask && lastRun(runningTask)?.status === "awaiting" ? "Waiting for your go-ahead" : "Working in your dashboard…") : "Works in your dashboard"}
            </p>
          </div>
          {/* Phones: the agent covers the screen, so this shows the dashboard it's working on */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/10 px-3 text-xs font-semibold text-[#1B2230] transition hover:bg-black/[0.04] lg:hidden"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setHistoryOpen((o) => !o)}
            aria-label="Task history"
            aria-expanded={historyOpen}
            className={`flex h-9 w-9 items-center justify-center rounded-[10px] transition hover:bg-black/[0.05] ${historyOpen ? "bg-black/[0.05] text-[#1B2230]" : "text-[#5d6472]"}`}
          >
            <History className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={newTask}
            aria-label="New task"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#5d6472] transition hover:bg-black/[0.05] hover:text-[#1B2230]"
          >
            <SquarePen className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close eCampus Agent"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#5d6472] transition hover:bg-black/[0.05] hover:text-[#1B2230]"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
        {/* While the agent works on its screen the panel is Work only — no switch to Chat */}
        {!dockLeft && <ModeSwitch stretch />}
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Task history */}
        <AnimatePresence>
          {historyOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute inset-0 z-20 bg-[#f8f9fb] [&>div]:w-full"
            >
              <ChatSidebar
                title="Agent tasks"
                noun="task"
                threads={threads}
                activeId={agent.activeId}
                busyThreadId={runningTask?.id ?? null}
                student={studentName ? { name: studentName } : null}
                onNewChat={newTask}
                onSelect={(id) => {
                  setHistoryOpen(false);
                  setActiveId(id);
                }}
                onRename={rename}
                onDelete={setPendingDelete}
                onLogin={() => setHistoryOpen(false)}
                variant="drawer"
                onToggle={() => setHistoryOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {active ? (
          <div ref={scrollRef} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-5 px-4 pb-8 pt-4 sm:px-5 [&_.whitespace-pre-wrap]:text-[13.5px]" onClickCapture={openLink}>
              {active.runs.map((r, i) => {
                const isLast = i === active.runs.length - 1;
                return (
                  <div key={r.id} className="space-y-5">
                    <UserMessage message={{ id: `${r.id}-q`, role: "user", content: r.prompt }} />
                    <RunCard run={r} onApprove={() => respond(true)} onSkip={() => respond(false)} />
                    {r.answer && (
                      <Report
                        run={r}
                        onRunAgain={isLast && !busy ? () => retry(active.id) : undefined}
                        onFollowup={isLast && !busy ? (q) => run(q, active.id) : undefined}
                      />
                    )}
                    {isLast && r.status === "stopped" && !r.answer && !busy && (
                      <button
                        type="button"
                        onClick={() => retry(active.id)}
                        className="ml-0 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#1B2230] transition hover:bg-black/[0.04] sm:ml-11"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden />
                        Run this again
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-7 sm:px-5">
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-b from-[#f8f9fb] to-white px-5 pb-5 pt-6 text-center">
              <span aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-32 w-56 -translate-x-1/2 rounded-full bg-red-500/[0.08] blur-2xl" />
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a3346] to-[#1B2230] shadow-lg shadow-[#1B2230]/20"
              >
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
              </motion.span>
              <h3 className="relative mt-4 text-xl font-semibold tracking-tight text-[#1B2230]">
                {firstName ? `What should I work on, ${firstName}?` : "What should I work on?"}
              </h3>
              <p className="relative mx-auto mt-2 max-w-xs text-sm text-[#5d6472]">
                I use your dashboard like you do — open pages, click, type and read — and ask before I change anything.
              </p>
              <ul aria-label="The agent can open" className="relative mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {ACCESS.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11px] font-medium text-[#5d6472]">
                    <Icon className="h-3.5 w-3.5 text-red-500" aria-hidden />
                    {label}
                    <Check className="h-3 w-3 text-emerald-600" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
            <p className="mb-2 mt-6 px-1 text-[11px] font-semibold uppercase tracking-wider text-[#8f8f8f]">Try a task</p>
            <div className="space-y-2">
              {SUGGESTIONS.map(({ icon: Icon, text }, i) => (
                <motion.button
                  key={text}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  onClick={() => run(text, null)}
                  disabled={busy}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-black/[0.08] bg-white px-3.5 py-3 text-left text-sm text-[#1B2230] transition hover:border-black/15 hover:shadow-[0_8px_24px_-16px_rgba(27,34,48,0.35)] disabled:opacity-50"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#f4f5f7] transition-colors group-hover:bg-red-50">
                    <Icon className="h-4 w-4 text-[#5d6472] transition-colors group-hover:text-red-600" />
                  </span>
                  <span className="flex-1">{text}</span>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[#b0b4bc] transition group-hover:text-red-600" aria-hidden />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Composer */}
        <div className="relative flex-shrink-0 px-3 pb-3 pt-2 sm:px-4 [&_textarea]:text-[14px]">
          <AnimatePresence>
            {showJump && active && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                onClick={() => {
                  pinnedRef.current = true;
                  scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
                }}
                aria-label="Scroll to latest"
                className="absolute -top-11 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#1B2230] shadow-md transition hover:bg-[#f9f9f9]"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
          <ChatComposer
            ref={composerRef}
            value={draft}
            onChange={setDraft}
            onSubmit={submit}
            onStop={stop}
            streaming={busy}
            placeholder={active ? "Ask a follow-up or give the next step…" : "Give the agent a task…"}
            label="Give eCampus Agent a task"
          />
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] leading-snug text-[#8f8f8f]">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" aria-hidden />
            Powered by eCampus AI · asks before it changes anything
          </p>
        </div>
      </div>

      <ConfirmDeleteDialog
        title={pendingDelete?.title ?? null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) remove(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </motion.aside>
  );
}

// ── The run: status line, the steps so far, and an approval prompt when the agent is waiting ──
function RunCard({ run, onApprove, onSkip }: { run: AgentRun; onApprove: () => void; onSkip: () => void }) {
  const [open, setOpen] = useState(true);
  const shown = run.steps.filter((s) => s.status !== "pending");
  const waiting = run.status === "awaiting" ? run.steps.find((s) => s.status === "running") : undefined;
  const status =
    run.status === "running"
      ? { icon: Loader2, spin: true, tone: "text-red-600", text: `Working · ${elapsed(run.startedAt)}` }
      : run.status === "awaiting"
        ? { icon: PauseCircle, spin: false, tone: "text-amber-600", text: "Waiting for your go-ahead" }
        : run.status === "done"
          ? { icon: CheckCircle2, spin: false, tone: "text-emerald-600", text: `Worked for ${elapsed(run.startedAt, run.finishedAt)} · ${run.steps.length} steps` }
          : { icon: StopCircle, spin: false, tone: "text-[#8f8f8f]", text: "Stopped" };
  const StatusIcon = status.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="flex gap-3 sm:gap-4">
      <span className="mt-0.5 hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1B2230] sm:flex">
        <Bot className="h-3.5 w-3.5 text-white" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-[#f8f9fb] px-3 py-1.5 text-[12.5px] font-medium text-[#1B2230] transition hover:bg-[#f1f2f4]"
        >
          <StatusIcon className={`h-4 w-4 ${status.tone} ${status.spin ? "animate-spin" : ""}`} aria-hidden />
          <span>{status.text}</span>
          <ChevronDown className={`h-4 w-4 text-[#8f8f8f] transition-transform ${open ? "" : "-rotate-90"}`} aria-hidden />
        </button>

        <AnimatePresence initial={false}>
          {open && shown.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <ol className="ml-2 mt-3 border-l border-black/[0.08] pl-5">
                {shown.map((s) => (
                  <StepRow key={s.id} step={s} waiting={s === waiting} />
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Approval — the agent doesn't act without it */}
        <AnimatePresence>
          {waiting?.approval && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              role="alertdialog"
              aria-label={waiting.approval.title}
              className="mt-4 rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-[0_10px_30px_-20px_rgba(217,119,6,0.6)]"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-[#1B2230]">
                <ShieldCheck className="h-4 w-4 text-amber-600" aria-hidden />
                {waiting.approval.title}
              </p>
              <p className="mt-1 text-sm text-[#5d6472]">{waiting.approval.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onApprove}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1B2230] px-4 text-sm font-medium text-white transition hover:bg-[#2a3346]"
                >
                  <Check className="h-4 w-4" aria-hidden />
                  {waiting.approval.confirmLabel}
                </button>
                <button
                  type="button"
                  onClick={onSkip}
                  className="inline-flex h-9 items-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-[#1B2230] transition hover:bg-black/[0.04]"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StepRow({ step, waiting }: { step: AgentStep; waiting: boolean }) {
  const Icon = KIND_ICON[step.kind];
  const running = step.status === "running" && !waiting;
  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="relative flex items-start gap-3 pb-3 last:pb-0"
    >
      <span
        className={`absolute -left-[29.5px] top-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full ring-4 ring-white ${
          step.status === "done"
            ? "bg-emerald-500 text-white"
            : step.status === "skipped"
              ? "bg-gray-200 text-gray-500"
              : waiting
                ? "bg-amber-100 text-amber-600"
                : "bg-red-50 text-red-600"
        }`}
      >
        {step.status === "done" ? (
          <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
        ) : running ? (
          <Loader2 className="h-2.5 w-2.5 animate-spin" aria-hidden />
        ) : (
          <span className="h-1 w-1 rounded-full bg-current" />
        )}
      </span>
      <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${running ? "text-red-600" : waiting ? "text-amber-600" : "text-[#8f8f8f]"}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className={`text-[13px] ${running || waiting ? "font-medium text-[#1B2230]" : step.status === "skipped" ? "text-[#8f8f8f] line-through" : "text-[#3d4352]"}`}>
          {step.title}
          {step.status === "skipped" && <span className="ml-1.5 text-[11px] no-underline">(skipped)</span>}
        </p>
        {step.detail && <p className="mt-0.5 text-xs text-[#8f8f8f]">{step.detail}</p>}
        {step.route && (
          <span className="mt-1 inline-flex max-w-full items-center gap-1 truncate rounded-md bg-[#f4f5f7] px-1.5 py-0.5 font-mono text-[11px] text-[#5d6472]">
            <Globe className="h-3 w-3 flex-shrink-0" aria-hidden />
            {step.route}
          </span>
        )}
      </div>
    </motion.li>
  );
}

// ── The report from eCampus AI, streamed in once the work is done, with suggested next tasks ──
function Report({ run, onRunAgain, onFollowup }: { run: AgentRun; onRunAgain?: () => void; onFollowup?: (q: string) => void }) {
  const [copied, setCopied] = useState(false);
  const writing = run.status === "running";
  const text = stripFollowups(run.answer, writing);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable.
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="flex gap-3 sm:gap-4">
      <span className="mt-0.5 hidden h-7 w-7 flex-shrink-0 sm:block" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-600">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Report
        </p>
        <div className="[&_a]:text-red-600 [&_a]:decoration-red-300 [&_h2]:text-[15px] [&_h3]:text-[14px] [&_h4]:text-[13.5px] [&_li]:text-[13.5px] [&_li]:leading-[1.65] [&_p]:text-[13.5px] [&_p]:leading-[1.7] [&_td]:text-[12.5px]">
          <MarkdownAnswer text={text} />
        </div>
        {!writing && (
          <div className="mt-2 flex items-center gap-1">
            <button
              type="button"
              onClick={copy}
              aria-label="Copy report"
              className="flex h-8 w-8 items-center justify-center rounded-[10px] text-[#5d6472] transition hover:bg-black/[0.05] hover:text-[#1B2230]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            {onRunAgain && (
              <button
                type="button"
                onClick={onRunAgain}
                aria-label="Run again"
                className="flex h-8 w-8 items-center justify-center rounded-[10px] text-[#5d6472] transition hover:bg-black/[0.05] hover:text-[#1B2230]"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        {!writing && onFollowup && (run.followups?.length ?? 0) > 0 && (
          <div className="mt-3 flex flex-col items-start gap-1.5">
            {run.followups!.slice(0, 3).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onFollowup(q)}
                className="group inline-flex max-w-full items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-left text-[12.5px] text-[#1B2230] transition hover:border-red-200 hover:bg-red-50/50"
              >
                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-[#8f8f8f] group-hover:text-red-600" aria-hidden />
                <span className="truncate">{q}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
