"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Copy,
  CornerDownRight,
  RefreshCw,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";
import MarkdownAnswer from "./markdown-answer";
import { stripFollowups, type ChatMessage } from "./chat-store";

// Blinking caret after the last block of an answer that's still streaming
const STREAM_CURSOR =
  "[&>div>*:last-child]:after:ml-0.5 [&>div>*:last-child]:after:inline-block [&>div>*:last-child]:after:h-4 [&>div>*:last-child]:after:w-1.5 [&>div>*:last-child]:after:translate-y-0.5 [&>div>*:last-child]:after:animate-pulse [&>div>*:last-child]:after:rounded-sm [&>div>*:last-child]:after:bg-[#0d0d0d] [&>div>*:last-child]:after:content-['']";

const enter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
} as const;

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — nothing else to do.
    }
  };
  return { copied, copy };
}

// Icon-only action with a small dark tooltip, like ChatGPT's message toolbar
function IconAction({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`group/tip relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-black/[0.05] ${
        active ? "text-[#0d0d0d]" : "text-[#5d5d5d] hover:text-[#0d0d0d]"
      }`}
    >
      <Icon className="h-4 w-4" fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0} />
      <span
        role="tooltip"
        className="pointer-events-none absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0d0d0d] px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100"
      >
        {label}
      </span>
    </button>
  );
}

export function UserMessage({ message }: { message: ChatMessage }) {
  const { copied, copy } = useCopy();
  return (
    <motion.div {...enter} className="group/user flex flex-col items-end gap-1">
      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-3xl bg-[#f4f4f4] px-4 py-2.5 text-[15px] leading-relaxed text-[#0d0d0d] sm:max-w-[75%] sm:px-5">
        {message.content}
      </div>
      <div className="opacity-0 transition-opacity focus-within:opacity-100 group-hover/user:opacity-100">
        <IconAction icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy"} onClick={() => copy(message.content)} />
      </div>
    </motion.div>
  );
}

function Thinking() {
  return (
    <div className="flex h-7 items-center gap-2 text-sm text-[#5d5d5d]" role="status">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]"
          />
        ))}
      </span>
      Thinking
    </div>
  );
}

export function AssistantMessage({
  message,
  isLast,
  onFeedback,
  onRegenerate,
  onShare,
  onFollowup,
}: {
  message: ChatMessage;
  isLast: boolean;
  onFeedback: (value: "up" | "down") => void;
  onRegenerate: () => void;
  onShare: () => void;
  onFollowup: (question: string) => void;
}) {
  const { copied, copy } = useCopy();
  const streaming = message.status === "streaming";
  const text = stripFollowups(message.content, streaming);
  const finished = message.status === "done" || message.status === "stopped";

  return (
    <motion.div {...enter} className="flex gap-3 sm:gap-4">
      <span className="mt-0.5 hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        {streaming && !text ? (
          <Thinking />
        ) : (
          text && (
            <div className={streaming ? STREAM_CURSOR : ""}>
              <MarkdownAnswer text={text} />
            </div>
          )
        )}

        {message.status === "stopped" && <p className="mt-2 text-xs italic text-[#8f8f8f]">Response stopped</p>}

        {message.status === "error" && (
          <div role="alert" className="mt-1 flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1">Something went wrong while answering. Please try again.</span>
            {isLast && (
              <button
                type="button"
                onClick={onRegenerate}
                className="rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {finished && text && (
          <div className="-ml-1.5 mt-2 flex items-center gap-0.5">
            <IconAction icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy"} onClick={() => copy(text.replace(/\*\*/g, ""))} />
            <IconAction icon={ThumbsUp} label="Good response" active={message.feedback === "up"} onClick={() => onFeedback("up")} />
            <IconAction icon={ThumbsDown} label="Bad response" active={message.feedback === "down"} onClick={() => onFeedback("down")} />
            <IconAction icon={Share2} label="Share" onClick={onShare} />
            {isLast && <IconAction icon={RefreshCw} label="Regenerate" onClick={onRegenerate} />}
          </div>
        )}

        {/* Suggested follow-ups — asked in this same chat, so the answer builds on this one */}
        {isLast && message.status === "done" && message.followups && message.followups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-5"
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8f8f8f]">Related</p>
            <ul className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
              {message.followups.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => onFollowup(q)}
                    className="group/fu flex w-full items-center gap-3 py-2.5 text-left text-sm text-[#0d0d0d] transition-colors hover:text-black"
                  >
                    <CornerDownRight className="h-4 w-4 flex-shrink-0 text-[#8f8f8f] transition-transform group-hover/fu:translate-x-0.5 group-hover/fu:text-[#0d0d0d]" />
                    <span className="flex-1">{q}</span>
                    <span className="text-lg leading-none text-[#8f8f8f] opacity-0 transition-opacity group-hover/fu:opacity-100">+</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
