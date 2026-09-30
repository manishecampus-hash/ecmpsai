"use client";

import { useState } from "react";
import { Send, Zap, Landmark, ClipboardCheck } from "lucide-react";

type Message = {
  id: number;
  from: "sara" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    from: "sara",
    text: "Rahul, analyzing your tech interests… You qualify for Chandigarh's MCA AI Track with ₹35,000 guaranteed institutional fee rebate. Would you like me to simulate ROI versus an MBA?",
  },
  {
    id: 2,
    from: "user",
    text: "Yes, can you check if weekend online proctored exams are available?",
  },
  {
    id: 3,
    from: "sara",
    text: "Confirmed! CU & Manipal offer slot-based weekend exams. Your semester dates would not conflict with current internship timelines.",
  },
];

const quickActions = [
  { icon: Zap, label: "Compare MBA vs MCA ROI" },
  { icon: Landmark, label: "Find NAAC A++ Colleges" },
  { icon: ClipboardCheck, label: "Check EMI options" },
];

export default function CounselorPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text: trimmed },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
        <div>
          <p className="text-sm font-bold text-gray-900">Counselor Sara</p>
          <p className="text-xs text-gray-400">Autonomous Career Agent</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Live
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.from === "user"
                  ? "rounded-br-sm bg-red-50 text-gray-800"
                  : "rounded-bl-sm bg-gray-50 text-gray-700"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-4 py-3">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              type="button"
              onClick={() => sendMessage(a.label)}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1.5 text-[11px] font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <Icon className="h-3 w-3" />
              {a.label}
            </button>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(draft);
        }}
        className="flex items-center gap-2 border-t border-gray-100 p-3"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Sara anything about college..."
          className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
