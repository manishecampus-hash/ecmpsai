// app/search/page.tsx
"use client";

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, GraduationCap, IndianRupee, Landmark, Menu, Scale, Share2, Sparkles, SquarePen } from "lucide-react";
import { SignupModal } from "@/components/layout/signup-modal";
import { Footer } from "@/components/layout/footer";
import ChatSidebar from "./components/chat-sidebar";
import ChatComposer, { type ChatComposerHandle } from "./components/chat-composer";
import { AssistantMessage, UserMessage } from "./components/chat-message";
import { ConfirmDeleteDialog, ShareDialog } from "./components/chat-dialogs";
import {
  loadThreads,
  parseFollowups,
  saveThreads,
  titleFrom,
  toApiHistory,
  uid,
  type ChatMessage,
  type ChatThread,
} from "./components/chat-store";

const SIDEBAR_KEY = "ecampus_ai_sidebar_collapsed";
const SIDEBAR_SPRING = { type: "spring", stiffness: 320, damping: 34, mass: 0.9 } as const;

const SUGGESTIONS = [
  { icon: GraduationCap, text: "Best online MBA programs in India" },
  { icon: Scale, text: "Compare Amity vs Manipal online MBA" },
  { icon: Landmark, text: "Is an online degree valid for government jobs?" },
  { icon: IndianRupee, text: "Online BCA fees and EMI options" },
];

type ApiHistory = ReturnType<typeof toApiHistory>;

// ChatGPT-style AI chat: saved threads on the left, the conversation and composer on the right.
// `/search?q=…` (from the home search, navbar, compare links) starts a new chat with that question;
// `/search?t=<id>` reopens a saved one.
function AiChatPage() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q")?.trim() ?? "";
  const urlThread = searchParams.get("t");

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const threadsRef = useRef<ChatThread[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [streaming, setStreaming] = useState<{ threadId: string; messageId: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [draft, setDraft] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ChatThread | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [student, setStudent] = useState<{ name?: string } | null>(null);

  const composerRef = useRef<ChatComposerHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const [showJump, setShowJump] = useState(false);

  // ── State helpers: every change goes through here so the ref is always current ──
  const updateThreads = useCallback((fn: (prev: ChatThread[]) => ChatThread[], persist = false) => {
    const next = fn(threadsRef.current);
    threadsRef.current = next;
    setThreads(next);
    if (persist) saveThreads(next);
  }, []);

  const patchMessage = useCallback(
    (threadId: string, messageId: string, patch: Partial<ChatMessage>, persist = false) =>
      updateThreads(
        (ts) =>
          ts.map((t) =>
            t.id !== threadId ? t : { ...t, messages: t.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m)) },
          ),
        persist,
      ),
    [updateThreads],
  );

  const showThread = useCallback((id: string | null, history: "push" | "replace" | "none" = "push") => {
    activeIdRef.current = id;
    setActiveId(id);
    pinnedRef.current = true;
    if (history !== "none") {
      window.history[history === "push" ? "pushState" : "replaceState"](null, "", id ? `/search?t=${id}` : "/search");
    }
  }, []);

  // ── Streaming one answer; earlier turns go along so follow-ups keep their context ──
  const streamAnswer = useCallback(
    async (threadId: string, messageId: string, question: string, history: ApiHistory) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setStreaming({ threadId, messageId });

      let full = "";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: question, messages: [...history, { role: "user", content: question }] }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) throw new Error("API error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          patchMessage(threadId, messageId, { content: full });
        }
        patchMessage(threadId, messageId, { content: full, status: "done", followups: parseFollowups(full) }, true);
      } catch (e: any) {
        patchMessage(threadId, messageId, { content: full, status: e?.name === "AbortError" ? "stopped" : "error" }, true);
      } finally {
        if (abortRef.current === ctrl) {
          abortRef.current = null;
          setStreaming(null);
        }
      }
    },
    [patchMessage],
  );

  const ask = useCallback(
    (text: string, threadId: string | null, history: "push" | "replace" = "push") => {
      const question = text.trim();
      if (!question) return;
      const now = Date.now();
      const existing = threadId ? threadsRef.current.find((t) => t.id === threadId) : undefined;
      const reply: ChatMessage = { id: uid(), role: "assistant", content: "", status: "streaming" };
      const messages: ChatMessage[] = [...(existing?.messages ?? []), { id: uid(), role: "user", content: question }, reply];
      const thread: ChatThread = existing
        ? { ...existing, messages, updatedAt: now }
        : { id: uid(), title: titleFrom(question), messages, createdAt: now, updatedAt: now };

      updateThreads((ts) => [thread, ...ts.filter((t) => t.id !== thread.id)], true);
      if (existing) pinnedRef.current = true;
      else showThread(thread.id, history);
      streamAnswer(thread.id, reply.id, question, toApiHistory(existing?.messages ?? []));
    },
    [updateThreads, showThread, streamAnswer],
  );

  const regenerate = (threadId: string) => {
    const thread = threadsRef.current.find((t) => t.id === threadId);
    const msgs = thread?.messages ?? [];
    const question = msgs[msgs.length - 2];
    if (msgs[msgs.length - 1]?.role !== "assistant" || question?.role !== "user") return;
    const reply: ChatMessage = { id: uid(), role: "assistant", content: "", status: "streaming" };
    updateThreads((ts) => ts.map((t) => (t.id === threadId ? { ...t, messages: [...msgs.slice(0, -1), reply], updatedAt: Date.now() } : t)), true);
    pinnedRef.current = true;
    streamAnswer(threadId, reply.id, question.content, toApiHistory(msgs.slice(0, -2)));
  };

  // ── Load saved chats, sidebar preference and the signed-in student ──
  useEffect(() => {
    const saved = loadThreads();
    threadsRef.current = saved;
    setThreads(saved);
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_KEY) === "1");
      const s = localStorage.getItem("ecampus_student");
      if (s) setStudent(JSON.parse(s));
    } catch {
      // Storage unavailable — defaults apply.
    }
    setHydrated(true);
    return () => abortRef.current?.abort();
  }, []);

  // ── URL → chat: ?q= starts a new chat, ?t= opens a saved one, nothing = new chat screen ──
  const handledQuery = useRef("");
  useEffect(() => {
    if (!hydrated) return;
    if (urlQuery) {
      if (handledQuery.current === urlQuery) return;
      handledQuery.current = urlQuery;
      ask(urlQuery, null, "replace");
      return;
    }
    handledQuery.current = "";
    if (urlThread === activeIdRef.current) return;
    const exists = urlThread && threadsRef.current.some((t) => t.id === urlThread);
    showThread(exists ? urlThread : null, urlThread && !exists ? "replace" : "none");
  }, [hydrated, urlQuery, urlThread, ask, showThread]);

  useEffect(() => {
    const openSignup = () => setShowSignup(true);
    window.addEventListener("open-signup", openSignup);
    return () => window.removeEventListener("open-signup", openSignup);
  }, []);

  const active = threads.find((t) => t.id === activeId) ?? null;
  const hasMessages = Boolean(active?.messages.length);
  const streamingHere = streaming?.threadId === activeId;

  // ── Scrolling: follow the answer while it streams unless the reader scrolled up ──
  const scrollToBottom = (smooth = false) =>
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? "smooth" : "auto" });

  useLayoutEffect(() => {
    if (pinnedRef.current) scrollToBottom();
  }, [active?.messages]);

  useLayoutEffect(() => {
    setShowJump(false);
  }, [activeId]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedRef.current = gap < 80;
    setShowJump(gap > 240);
  };

  // ── Actions ──
  const submit = () => {
    if (!draft.trim() || streamingHere) return;
    ask(draft, activeId);
    setDraft("");
  };

  const newChat = () => {
    setDrawerOpen(false);
    setDraft("");
    showThread(null);
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

  const deleteThread = (thread: ChatThread) => {
    if (streaming?.threadId === thread.id) abortRef.current?.abort();
    updateThreads((ts) => ts.filter((t) => t.id !== thread.id), true);
    if (thread.id === activeIdRef.current) showThread(null, "replace");
    setPendingDelete(null);
  };

  const share = (question: string) => setShareUrl(`${window.location.origin}/search?q=${encodeURIComponent(question)}`);

  const sidebarProps = {
    threads,
    activeId,
    busyThreadId: streaming?.threadId ?? null,
    student,
    onNewChat: newChat,
    onSelect: (id: string) => {
      setDrawerOpen(false);
      if (id !== activeIdRef.current) showThread(id);
    },
    onRename: (id: string, title: string) =>
      updateThreads((ts) => ts.map((t) => (t.id === id ? { ...t, title } : t)), true),
    onDelete: setPendingDelete,
    onLogin: () => {
      setDrawerOpen(false);
      setShowSignup(true);
    },
  };

  const firstName = student?.name?.trim().split(/\s+/)[0];
  const firstQuestion = active?.messages.find((m) => m.role === "user")?.content;

  return (
    <>
      <div className="flex h-[calc(100dvh-4rem)] overflow-hidden bg-white">
        {/* Docked sidebar — tablets and up */}
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 60 : 260 }}
          transition={hydrated ? SIDEBAR_SPRING : { duration: 0 }}
          className="hidden h-full flex-shrink-0 overflow-hidden border-r border-black/[0.06] bg-[#f9f9f9] md:block"
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
                className="fixed inset-0 z-[65] bg-black/40 md:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-[#f9f9f9] shadow-2xl md:hidden [&>div]:w-full"
              >
                <ChatSidebar {...sidebarProps} variant="drawer" onToggle={() => setDrawerOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Conversation */}
        <section className="relative flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 flex-shrink-0 items-center gap-1 px-2 sm:px-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open chat history"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0d0d0d] hover:bg-black/[0.05] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate px-1 text-lg font-semibold text-[#0d0d0d] md:px-2">eCampus AI</h1>
            {firstQuestion && (
              <button
                type="button"
                onClick={() => share(firstQuestion)}
                className="hidden items-center gap-2 rounded-full border border-black/10 px-3.5 py-1.5 text-sm font-medium text-[#0d0d0d] transition hover:bg-black/[0.04] sm:flex"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            )}
            <button
              type="button"
              onClick={newChat}
              aria-label="New chat"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0d0d0d] hover:bg-black/[0.05] md:hidden"
            >
              <SquarePen className="h-5 w-5" />
            </button>
          </header>

          {hasMessages && active ? (
            <div ref={scrollRef} onScroll={onScroll} className="order-1 min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-3xl space-y-8 px-4 pb-10 pt-2 sm:px-6">
                {active.messages.map((m, i) =>
                  m.role === "user" ? (
                    <UserMessage key={m.id} message={m} />
                  ) : (
                    <AssistantMessage
                      key={m.id}
                      message={m}
                      isLast={i === active.messages.length - 1}
                      onFeedback={(value) =>
                        patchMessage(active.id, m.id, { feedback: m.feedback === value ? undefined : value }, true)
                      }
                      onRegenerate={() => regenerate(active.id)}
                      onShare={() => share(active.messages[i - 1]?.content ?? active.title)}
                      onFollowup={(q) => ask(q, active.id)}
                    />
                  ),
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="order-1 flex-1" />
              <div className="order-2 px-4 text-center">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d0d0d] shadow-lg shadow-black/10"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="mt-4 text-2xl font-semibold tracking-tight text-[#0d0d0d] sm:text-[28px]"
                >
                  {firstName ? `Hi ${firstName}, what can I help with?` : "What can I help you with?"}
                </motion.h2>
                <p className="mt-2 text-sm text-[#5d5d5d]">Ask about online degrees, universities, fees, eligibility or careers.</p>
              </div>
              <div className="order-3 mx-auto mt-6 grid w-full max-w-3xl grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:px-6 md:order-5 md:mt-4">
                {SUGGESTIONS.map(({ icon: Icon, text }, i) => (
                  <motion.button
                    key={text}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    onClick={() => ask(text, null)}
                    className="group flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 text-left text-sm text-[#0d0d0d] transition hover:border-black/15 hover:bg-[#f9f9f9]"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 text-[#5d5d5d] transition-colors group-hover:text-[#ee2c3c]" />
                    {text}
                  </motion.button>
                ))}
              </div>
              <div className="order-4 flex-1 md:order-6" />
            </>
          )}

          {/* Composer — sits above the phone bottom bar; in the middle of an empty chat on larger screens */}
          <div
            className={`relative flex-shrink-0 px-3 pt-2 sm:px-6 ${
              hasMessages ? "order-2 pb-[88px] md:pb-3" : "order-5 pb-[88px] md:order-4 md:mt-8 md:pb-0"
            }`}
          >
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
                  className="absolute -top-11 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#0d0d0d] shadow-md transition hover:bg-[#f9f9f9]"
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
              onStop={() => abortRef.current?.abort()}
              streaming={streamingHere}
            />
            {hasMessages && (
              <p className="mt-2 text-center text-[11px] leading-snug text-[#8f8f8f]">
                eCampus AI can make mistakes. Verify fees and approvals on the official university website.
              </p>
            )}
          </div>
        </section>

        <ShareDialog url={shareUrl} onClose={() => setShareUrl(null)} />
        <ConfirmDeleteDialog
          title={pendingDelete?.title ?? null}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => pendingDelete && deleteThread(pendingDelete)}
        />
        <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} onSwitchToLogin={() => setShowSignup(false)} />
      </div>

      {/* Footer sits right under the full-height chat — scroll past the conversation to reach it */}
      <div className="relative z-10 [&>footer]:mt-0">
        <Footer />
      </div>
    </>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100dvh-4rem)] items-center justify-center bg-white text-sm text-[#5d5d5d]">Loading…</div>
      }
    >
      <AiChatPage />
    </Suspense>
  );
}
