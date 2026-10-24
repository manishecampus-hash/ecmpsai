"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Mic, Search, SendHorizontal, Sparkle, Square, SquarePen, X } from "lucide-react";
import { AssistantMessage, UserMessage } from "@/app/search/components/chat-message";
import { ShareDialog } from "@/app/search/components/chat-dialogs";
import { useAiChat } from "@/app/search/components/use-ai-chat";
import RobotMascot from "./robot-mascot";

const SUGGESTIONS = [
  "Help me choose the right online degree",
  "Which university fits my budget?",
  "What scholarships & EMI options can I get?",
];

const MAX_INPUT_HEIGHT = 120;

// Browser speech-to-text, where available (Chrome, Edge, Safari)
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
const getRecognition = (): (new () => Recognition) | null =>
  typeof window === "undefined" ? null : (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;

// Search icon with a small sparkle, used on the suggestion cards
function AskIcon() {
  return (
    <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center text-gray-700 transition-colors group-hover:text-fuchsia-600">
      <Search className="h-5 w-5" />
      <Sparkle className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 text-fuchsia-500" fill="currentColor" />
    </span>
  );
}

// eCampus AI in a side panel: welcome screen with suggestions, then the same streaming chat as My Chat.
// Conversations are saved with the rest of the student's chats, so they also show up in My Chat.
export default function AiChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { threads, activeId, streaming, pinnedRef, patchMessage, showThread, ask, regenerate, stop } = useAiChat();
  const [draft, setDraft] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [canDictate, setCanDictate] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId) ?? null;
  const hasMessages = Boolean(active?.messages.length);
  const streamingHere = Boolean(streaming && streaming.threadId === activeId);
  const canSend = draft.trim().length > 0 && !streamingHere;

  useEffect(() => setCanDictate(Boolean(getRecognition())), []);

  // Escape closes; focus the input when the panel opens
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !shareUrl && onClose();
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose, shareUrl]);

  // Stop dictation when the panel closes
  useEffect(() => {
    if (!open) recognitionRef.current?.stop();
  }, [open]);

  // Grow the input with its text
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_INPUT_HEIGHT)}px`;
  }, [draft, open]);

  // Follow the answer while it streams unless the reader scrolled up
  useLayoutEffect(() => {
    if (pinnedRef.current) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [active?.messages, pinnedRef]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (el) pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const send = (text: string) => {
    if (!text.trim() || streamingHere) return;
    recognitionRef.current?.stop();
    ask(text, activeId, "push");
    setDraft("");
  };

  const newChat = () => {
    setDraft("");
    showThread(null, "none");
    inputRef.current?.focus();
  };

  const toggleDictation = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const SR = getRecognition();
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = true;
    const before = draft ? `${draft.trimEnd()} ` : "";
    rec.onresult = (e: any) => {
      const heard = Array.from(e.results as ArrayLike<any>)
        .map((r) => r[0].transcript)
        .join("");
      setDraft(before + heard);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="ai-panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-[80] bg-slate-900/40"
            />
            <motion.aside
              key="ai-panel"
              role="dialog"
              aria-modal="true"
              aria-label="KIVO"
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { type: "spring", stiffness: 340, damping: 36 } }}
              exit={{ x: "100%", transition: { duration: 0.22, ease: "easeIn" } }}
              className="fixed inset-y-0 right-0 z-[85] flex w-full flex-col overflow-hidden bg-[#f7f6fb] shadow-[-20px_0_60px_-20px_rgba(15,23,42,0.35)] sm:w-[480px] lg:w-[560px] 2xl:w-[640px]"
            >
              {/* Colour wash behind the header */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_30%_0%,rgba(217,70,239,0.20),transparent_60%),radial-gradient(ellipse_at_85%_0%,rgba(244,63,94,0.16),transparent_55%)]" />

              {/* Top bar */}
              <div className="relative flex flex-shrink-0 items-center gap-2 px-4 pt-4 sm:px-5">
                {hasMessages ? (
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <Image src="/aiimage/newai.png" alt="" width={28} height={28} className="h-7 w-7" />
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-gray-900">KIVO</p>
                      <p className="truncate text-xs font-medium text-fuchsia-600">Find your right online degree</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1" />
                )}
                {hasMessages && (
                  <>
                    <Link
                      href={`/dashboard/mychat?t=${activeId}`}
                      title="Open in My Chat"
                      aria-label="Open in My Chat"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
                    >
                      <ExternalLink className="h-[18px] w-[18px]" />
                    </Link>
                    <button
                      type="button"
                      onClick={newChat}
                      title="New chat"
                      aria-label="New chat"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
                    >
                      <SquarePen className="h-[18px] w-[18px]" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close KIVO"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm ring-1 ring-black/5 transition hover:bg-gray-50 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div ref={scrollRef} onScroll={onScroll} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {hasMessages && active ? (
                  <div className="space-y-7 px-4 pb-6 pt-4 sm:px-5">
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
                          onShare={() =>
                            setShareUrl(
                              `${window.location.origin}/search?q=${encodeURIComponent(active.messages[i - 1]?.content ?? active.title)}`,
                            )
                          }
                          onFollowup={(q) => send(q)}
                        />
                      ),
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-full flex-col px-4 pb-6 sm:px-5">
                    <div className="mt-2 text-center">
                      <motion.h2
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="flex items-center justify-center gap-2.5 text-[34px] font-bold tracking-tight text-gray-900 sm:text-[40px]"
                      >
                        <Image src="/aiimage/newai.png" alt="" width={30} height={30} className="h-7 w-7 sm:h-8 sm:w-8" />
                        KIVO
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.16 }}
                        className="mt-1 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text text-lg font-semibold text-transparent sm:text-xl"
                      >
                        Find Your Right Online Degree
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                      className="mx-auto mt-3"
                    >
                      <RobotMascot className="h-40 w-36 sm:h-52 sm:w-48" />
                    </motion.div>

                    <div className="mt-2 space-y-3">
                      {SUGGESTIONS.map((text, i) => (
                        <motion.button
                          key={text}
                          type="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
                          onClick={() => send(text)}
                          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white bg-white px-5 py-4 text-left text-[15px] font-medium text-gray-800 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-fuchsia-200 hover:shadow-[0_8px_24px_-8px_rgba(192,38,211,0.35)] sm:text-base"
                        >
                          {text}
                          <AskIcon />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="relative flex-shrink-0 border-t border-black/[0.04] bg-white px-4 pb-3 pt-3 sm:px-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(draft);
                  }}
                  className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-[#f4f4f7] py-2 pl-3 pr-2 transition focus-within:border-fuchsia-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(217,70,239,0.10)]"
                >
                  {canDictate && (
                    <>
                      <button
                        type="button"
                        onClick={toggleDictation}
                        aria-label={listening ? "Stop voice input" : "Speak your question"}
                        aria-pressed={listening}
                        className={`relative mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition ${
                          listening ? "bg-red-500 text-white" : "text-gray-800 hover:bg-black/[0.05]"
                        }`}
                      >
                        {listening && <span className="absolute inset-0 animate-ping rounded-full bg-red-400/60" />}
                        <Mic className="relative h-5 w-5" />
                      </button>
                      <span className="mb-2.5 h-5 w-px flex-shrink-0 bg-gray-300" />
                    </>
                  )}
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        send(draft);
                      }
                    }}
                    placeholder={listening ? "Listening…" : "Type here"}
                    aria-label="Ask KIVO"
                    className="max-h-[120px] min-h-[40px] flex-1 resize-none rounded-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-gray-900 shadow-none outline-none placeholder:text-gray-400 focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
                  />
                  {streamingHere ? (
                    <button
                      type="button"
                      onClick={stop}
                      aria-label="Stop generating"
                      className="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-800 active:scale-95"
                    >
                      <Square className="h-3.5 w-3.5" fill="currentColor" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canSend}
                      aria-label="Send"
                      className="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 text-white shadow-md shadow-fuchsia-500/30 transition active:scale-95 disabled:bg-gray-200 disabled:bg-none disabled:text-gray-400 disabled:shadow-none"
                    >
                      <SendHorizontal className="h-[18px] w-[18px]" />
                    </button>
                  )}
                </form>
                <p className="mt-2 text-center text-xs text-gray-500">These are AI powered responses</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ShareDialog url={shareUrl} onClose={() => setShareUrl(null)} />
    </>
  );
}
