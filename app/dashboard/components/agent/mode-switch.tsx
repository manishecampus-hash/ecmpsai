"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Bot, MessageCircle, type LucideIcon } from "lucide-react";
import { useAgent, type AgentMode } from "./agent-shell";

const MODES: { id: AgentMode; label: string; icon: LucideIcon; hint: string }[] = [
  { id: "work", label: "Work", icon: Bot, hint: "The agent works in your dashboard" },
  { id: "chat", label: "Chat", icon: MessageCircle, hint: "Ask eCampus AI anything" },
];

// Work ⇄ Chat, like ChatGPT's agent mode. `stretch` fills the width (the work panel's sub-header).
export default function ModeSwitch({ stretch = false }: { stretch?: boolean }) {
  const agent = useAgent();
  // Each switch animates its own thumb (the chat's stays mounted while the work panel shows its own)
  const thumbId = useId();
  if (!agent) return null;
  const working = Boolean(agent.runningTask);

  return (
    <div
      role="tablist"
      aria-label="eCampus Agent mode"
      className={`relative items-center rounded-full bg-[#f1f2f4] p-1 ring-1 ring-inset ring-black/[0.04] ${stretch ? "flex w-full" : "inline-flex"}`}
    >
      {MODES.map(({ id, label, icon: Icon, hint }) => {
        const active = agent.mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            title={hint}
            onClick={() => agent.setMode(id)}
            className={`relative z-10 inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors ${
              stretch ? "flex-1" : ""
            } ${active ? "text-[#1B2230]" : "text-[#6b7280] hover:text-[#1B2230]"}`}
          >
            {active && (
              <motion.span
                layoutId={`agent-mode-thumb-${thumbId}`}
                transition={{ type: "spring", stiffness: 520, damping: 40 }}
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.14),0_1px_2px_rgba(16,24,40,0.06)]"
              />
            )}
            <Icon className={`h-4 w-4 ${active ? "text-red-600" : ""}`} aria-hidden />
            {label}
            {id === "work" && working && (
              <span aria-label="working" className="h-1.5 w-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}
