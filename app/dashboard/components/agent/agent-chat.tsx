"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  ClipboardCheck,
  Gift,
  History,
  Landmark,
  LayoutDashboard,
  Share2,
  Sparkles,
  SquarePen,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ChatSidebar from "@/app/search/components/chat-sidebar";
import ChatComposer, { type ChatComposerHandle } from "@/app/search/components/chat-composer";
import { AssistantMessage, UserMessage } from "@/app/search/components/chat-message";
import { ConfirmDeleteDialog, ShareDialog } from "@/app/search/components/chat-dialogs";
import type { ChatThread } from "@/app/search/components/chat-store";
import { useAiChat } from "@/app/search/components/use-ai-chat";
import { intentOf } from "./agent-engine";
import { useAgent } from "./agent-shell";
import ModeSwitch from "./mode-switch";

// Chat mode of the eCampus Agent — the student's AI chat (formerly the My Chat page). From 1024px it's docked on the
// right beside the dashboard (saved chats in a drawer); on phones / tablets it's full screen with saved chats on the
// left. Answers stream from eCampus AI (/api/chat).
// Chats are the same ones saved by /search and the old My Chat page.

const SUGGESTIONS: { icon: LucideIcon; text: string }[] = [
  { icon: Zap, text: "Compare MBA vs MCA ROI" },
  { icon: Landmark, text: "Find NAAC A++ Colleges" },
  { icon: ClipboardCheck, text: "Check EMI options" },
  { icon: Gift, text: "Which scholarships can I apply for?" },
];

const SIDEBAR_KEY = "ecampus_agent_chat_sidebar_collapsed";
const SIDEBAR_SPRING = { type: "spring", stiffness: 320, damping: 34, mass: 0.9 } as const;
// Questions about the student's own dashboard that Work mode can act on
const DASHBOARD_INTENTS = new Set(["applications", "documents", "emi", "referrals", "profile", "receipts"]);

export default function AgentChat({ visible }: { visible: boolean }) {
  const [mounted, setMounted] = useState(visible);
  useEffect(() => {
    if (visible) setMounted(true);
  }, [visible]);
  // Mounted on first open, then kept so a streaming answer and the open chat survive switching to Work
  if (!mounted) return null;
  return <ChatScreen visible={visible} />;
}

function ChatScreen({ visible }: { visible: boolean }) {
  const agent = useAgent();
  const { threads, threadsRef, hydrated, activeId, activeIdRef, streaming, pinnedRef, updateThreads, patchMessage, showThread, ask, regenerate, stop, removeThread } =
    useAiChat();

  const [draft, setDraft] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ChatThread | null>(null);
  const [student, setStudent] = useState<{ name?: string } | null>(null);
  const composerRef = useRef<ChatComposerHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showJump, setShowJump] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_KEY) === "1");
      const s = localStorage.getItem("ecampus_student");
      if (s) setStudent(JSON.parse(s));
    } catch {
      // Storage unavailable — defaults apply.
    }
  }, []);

  // ── What to show: a question sent here (My Chat links with ?q=), a saved chat (?t=), or the chat left open ──
  const chatRequest = agent?.chatRequest ?? null;
  const restored = useRef(false);
  useEffect(() => {
    if (!hydrated || !agent) return;
    if (chatRequest) {
      if (chatRequest.q) ask(chatRequest.q, null, "replace");
      else if (chatRequest.t && threadsRef.current.some((t) => t.id === chatRequest.t)) showThread(chatRequest.t, "none");
      restored.current = true;
      agent.clearChatRequest();
      return;
    }
    if (restored.current) return;
    restored.current = true;
    const last = agent.chatThreadRef.current;
    if (last && threadsRef.current.some((t) => t.id === last)) showThread(last, "none");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, chatRequest]);

  useEffect(() => {
    if (agent && restored.current) agent.chatThreadRef.current = activeId;
  }, [activeId, agent]);

  // Focus the message box whenever the chat comes up
  useEffect(() => {
    if (visible) requestAnimationFrame(() => composerRef.current?.focus());
  }, [visible]);

  const active = threads.find((t) => t.id === activeId) ?? null;
  const hasMessages = Boolean(active?.messages.length);
  const streamingHere = streaming?.threadId === activeId;

  // ── Scrolling: follow the answer while it streams unless the reader scrolled up ──
  const scrollToBottom = (smooth = false) => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  useLayoutEffect(() => {
    if (pinnedRef.current) scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.messages]);
  useLayoutEffect(() => setShowJump(false), [activeId]);
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedRef.current = gap < 80;
    setShowJump(gap > 240);
  };

  if (!agent) return null;

  // ── Actions ──
  const submit = () => {
    if (!draft.trim() || streamingHere) return;
    ask(draft, activeId);
    setDraft("");
  };
  const newChat = () => {
    setDrawerOpen(false);
    setDraft("");
    showThread(null, "none");
    requestAnimationFrame(() => composerRef.current?.focus());
  };
  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(SIDEBAR_KEY, next ? "1" : "0");
    } catch {
      // Not remembered — still applies for this visit.
    }
  };
  const share = (question: string) => setShareUrl(`${window.location.origin}/search?q=${encodeURIComponent(question)}`);

  const sidebarProps = {
    title: "eCampus Agent",
    threads,
    activeId,
    busyThreadId: streaming?.threadId ?? null,
    student,
    onNewChat: newChat,
    onSelect: (id: string) => {
      setDrawerOpen(false);
      if (id !== activeIdRef.current) showThread(id, "none");
    },
    onRename: (id: string, title: string) => updateThreads((ts) => ts.map((t) => (t.id === id ? { ...t, title } : t)), true),
    onDelete: setPendingDelete,
    onLogin: () => setDrawerOpen(false),
  };

  const firstName = student?.name?.trim().split(/\s+/)[0];
  const firstQuestion = active?.messages.find((m) => m.role === "user")?.content;
  // A finished answer to a question about the student's own dashboard → offer to have the agent do it in Work mode
  const lastMessage = active?.messages[active.messages.length - 1];
  const lastQuestion = active ? [...active.messages].reverse().find((m) => m.role === "user")?.content : undefined;
  const handoff = lastMessage?.role === "assistant" && lastMessage.status === "done" && lastQuestion && DASHBOARD_INTENTS.has(intentOf(lastQuestion)) ? lastQuestion : null;

  return (
    <motion.div
      // Slides in from the right (full screen on phones, docked panel on desktop)
      initial={{ opacity: 0, x: "100%" }}
      animate={visible ? { opacity: 1, x: 0, visibility: "visible" } : { opacity: 0, x: "100%", transitionEnd: { visibility: "hidden" } }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      inert={!visible}
      aria-hidden={!visible}
      aria-label="eCampus Agent chat"
      role="dialog"
      className={`fixed inset-0 z-[80] flex overflow-hidden bg-white lg:relative lg:inset-auto lg:z-[55] lg:h-screen lg:w-[400px] lg:flex-shrink-0 lg:border-l lg:border-black/[0.08] lg:shadow-[-12px_0_40px_-24px_rgba(0,0,0,0.25)] xl:w-[440px] ${
        visible ? "" : "lg:hidden"
      }`}
    >
      {/* Saved chats — docked from tablets up */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 60 : 260 }}
        transition={hydrated ? SIDEBAR_SPRING : { duration: 0 }}
        className="hidden h-full flex-shrink-0 overflow-hidden border-r border-black/[0.06] bg-[#f8f9fb] md:block lg:hidden"
      >
        <ChatSidebar {...sidebarProps} variant="docked" collapsed={collapsed} onToggle={toggleCollapsed} />
      </motion.aside>

      {/* Drawer — phones */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 z-[85] bg-black/40 md:hidden lg:block"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 z-[90] w-[280px] max-w-[85%] bg-[#f8f9fb] shadow-2xl md:hidden lg:block [&>div]:w-full"
            >
              <ChatSidebar {...sidebarProps} variant="drawer" onToggle={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Conversation */}
      <section className="relative flex min-w-0 flex-1 flex-col">
        {/* Soft brand wash behind the top of the page */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(238,44,60,0.06),transparent)]" />

        <header className="relative z-10 flex-shrink-0 border-b border-black/[0.05] bg-white/80 px-2 backdrop-blur-sm sm:px-4 lg:px-3 lg:pb-3">
         <div className="flex h-16 items-center gap-1.5 lg:h-14 lg:gap-1">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open chat history"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#1B2230] hover:bg-black/[0.05] md:hidden lg:order-2 lg:flex lg:h-9 lg:w-9 lg:text-[#5d6472]"
          >
            <History className="h-5 w-5 lg:h-[18px] lg:w-[18px]" />
          </button>
          <div className="hidden min-w-0 items-center gap-2.5 lg:order-1 lg:flex lg:flex-1">
            <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1B2230] shadow-sm">
              <Sparkles className="h-4 w-4 text-white" aria-hidden />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-[15px] font-semibold leading-tight text-[#1B2230]">eCampus Agent</h1>
              <p className="text-[11px] font-medium text-emerald-600">Live · eCampus AI</p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 justify-center lg:hidden">
            <ModeSwitch />
          </div>

          <div className="ml-auto flex items-center gap-1.5 lg:order-3 lg:ml-0 lg:gap-1">
            {firstQuestion && (
              <button
                type="button"
                onClick={() => share(firstQuestion)}
                aria-label="Share"
                className="hidden h-9 items-center gap-2 rounded-full border border-black/10 px-3.5 text-sm font-medium text-[#1B2230] transition hover:bg-black/[0.04] sm:inline-flex lg:w-9 lg:justify-center lg:rounded-[10px] lg:border-0 lg:px-0 lg:text-[#5d6472] lg:hover:bg-black/[0.05]"
              >
                <Share2 className="h-4 w-4" /> <span className="lg:hidden">Share</span>
              </button>
            )}
            <button
              type="button"
              onClick={newChat}
              aria-label="New chat"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#1B2230] hover:bg-black/[0.05] md:hidden lg:flex lg:h-9 lg:w-9 lg:text-[#5d6472]"
            >
              <SquarePen className="h-5 w-5 lg:h-[18px] lg:w-[18px]" />
            </button>
            {/* Phones / tablets: back to the dashboard (the chat covers it) */}
            <button
              type="button"
              onClick={() => agent.setOpen(false)}
              aria-label="Back to dashboard"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1B2230] px-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2a3346] sm:px-3.5 lg:hidden"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            {/* Docked beside the dashboard: close, like the Work panel */}
            <button
              type="button"
              onClick={() => agent.setOpen(false)}
              aria-label="Close eCampus Agent"
              className="hidden h-9 w-9 items-center justify-center rounded-[10px] text-[#5d6472] transition hover:bg-black/[0.05] hover:text-[#1B2230] lg:flex"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>
         </div>
          {/* Docked: Chat / Work switch on its own row, like the Work panel */}
          <div className="hidden lg:block">
            <ModeSwitch stretch />
          </div>
        </header>

        {hasMessages && active ? (
          <div ref={scrollRef} onScroll={onScroll} className="relative order-1 min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl space-y-8 px-4 pb-10 pt-6 sm:px-6 lg:space-y-6 lg:px-4 lg:pt-4">
              {active.messages.map((m, i) =>
                m.role === "user" ? (
                  <UserMessage key={m.id} message={m} />
                ) : (
                  <AssistantMessage
                    key={m.id}
                    message={m}
                    isLast={i === active.messages.length - 1}
                    onFeedback={(value) => patchMessage(active.id, m.id, { feedback: m.feedback === value ? undefined : value }, true)}
                    onRegenerate={() => regenerate(active.id)}
                    onShare={() => share(active.messages[i - 1]?.content ?? active.title)}
                    onFollowup={(q) => ask(q, active.id)}
                  />
                ),
              )}

              {/* Hand-off: the agent can do this in the dashboard */}
              <AnimatePresence>
                {handoff && !streamingHere && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex gap-3 sm:gap-4"
                  >
                    <span className="hidden w-7 flex-shrink-0 sm:block" aria-hidden />
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 rounded-2xl border border-black/[0.07] bg-gradient-to-r from-[#f8f9fb] to-white px-4 py-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1B2230]">
                        <Bot className="h-4 w-4 text-white" aria-hidden />
                      </span>
                      <p className="min-w-0 flex-1 text-sm text-[#3d4352]">
                        <span className="font-semibold text-[#1B2230]">Want me to check this in your dashboard?</span> Work mode opens your pages and reports
                        back with your real data.
                      </p>
                      <button
                        type="button"
                        onClick={() => agent.startWork(handoff)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-600 px-4 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition hover:bg-red-700"
                      >
                        Do it in Work mode
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <>
            <div className="order-1 flex-1" />
            <div className="relative order-2 px-4 text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a3346] to-[#1B2230] shadow-lg shadow-[#1B2230]/20"
              >
                <Sparkles className="h-6 w-6 text-white" />
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-red-500 ring-[3px] ring-white" />
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mt-5 text-2xl font-semibold tracking-tight text-[#1B2230] sm:text-[30px] lg:text-[22px]"
              >
                {firstName ? `Hi ${firstName}, what can I help with?` : "What can I help you with?"}
              </motion.h2>
              <p className="mt-2 text-sm text-[#5d6472]">Ask about programs, fees, scholarships and admissions.</p>
            </div>

            <div className="order-3 mx-auto mt-6 grid w-full max-w-3xl grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:px-6 md:order-5 md:mt-4 lg:order-3 lg:mt-5 lg:grid-cols-1 lg:px-4">
              {SUGGESTIONS.map(({ icon: Icon, text }, i) => (
                <motion.button
                  key={text}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  onClick={() => ask(text, null, "replace")}
                  className="group flex items-center gap-3 rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-left text-sm text-[#1B2230] transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-[0_8px_24px_-16px_rgba(27,34,48,0.35)]"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#f4f5f7] transition-colors group-hover:bg-red-50">
                    <Icon className="h-4 w-4 text-[#5d6472] transition-colors group-hover:text-red-600" />
                  </span>
                  {text}
                </motion.button>
              ))}

              {/* Work mode, introduced */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.32 }}
                onClick={() => agent.setMode("work")}
                className="group flex items-center gap-3 rounded-2xl border border-[#1B2230]/10 bg-gradient-to-r from-[#1B2230] to-[#2a3346] px-4 py-3.5 text-left text-white shadow-[0_12px_30px_-18px_rgba(27,34,48,0.7)] transition hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Bot className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">Let the agent do it — Work mode</span>
                  <span className="block truncate text-xs text-white/70">It opens your dashboard, reads your applications and fills tools in. It asks before acting.</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </motion.button>
            </div>
            <div className="order-4 flex-1 md:order-6 lg:order-4" />
          </>
        )}

        {/* Composer — at the bottom of a conversation; in the middle of an empty chat on larger screens */}
        <div className={`relative flex-shrink-0 px-3 pt-2 sm:px-6 lg:px-4 ${hasMessages ? "order-2 pb-3" : "order-5 pb-4 md:order-4 md:mt-8 md:pb-0 lg:order-5 lg:mt-0 lg:pb-3"}`}>
          <AnimatePresence>
            {showJump && hasMessages && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                onClick={() => {
                  pinnedRef.current = true;
                  scrollToBottom(true);
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
            streaming={streamingHere}
            placeholder="Ask anything about college..."
            label="Ask eCampus Agent"
          />
          {hasMessages && (
            <p className="mt-2 text-center text-[11px] leading-snug text-[#8f8f8f]">
              eCampus Agent can make mistakes. Verify fees and approvals on the official university website.
            </p>
          )}
        </div>
      </section>

      <ShareDialog url={shareUrl} onClose={() => setShareUrl(null)} />
      <ConfirmDeleteDialog
        title={pendingDelete?.title ?? null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) removeThread(pendingDelete);
          setPendingDelete(null);
        }}
      />
    </motion.div>
  );
}
