// Chat threads for the eCampus AI page — saved in this browser, newest first.

export type ChatRole = "user" | "assistant";
export type MessageStatus = "streaming" | "done" | "stopped" | "error";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status?: MessageStatus;
  /** Suggested next questions parsed from the answer's FOLLOWUPS block */
  followups?: string[];
  feedback?: "up" | "down";
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "ecampus_ai_chats";
const MAX_THREADS = 50;
// How much of the conversation goes back to the AI with each question
const HISTORY_MESSAGES = 12;
const HISTORY_CHARS = 4000;

export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function loadThreads(): ChatThread[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(list)) return [];
    // An answer cut off by a refresh keeps what it had, marked as stopped
    return list.map((t: ChatThread) => ({
      ...t,
      messages: t.messages.map((m) => (m.status === "streaming" ? { ...m, status: "stopped" as const } : m)),
    }));
  } catch {
    return [];
  }
}

export function saveThreads(threads: ChatThread[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads.slice(0, MAX_THREADS)));
  } catch {
    // Storage full or unavailable — the chat still works for this visit.
  }
}

export function titleFrom(question: string) {
  const t = question.replace(/\s+/g, " ").trim();
  const title = t.charAt(0).toUpperCase() + t.slice(1);
  return title.length > 60 ? `${title.slice(0, 57)}…` : title;
}

// The prompt asks for "FOLLOWUPS: q1|q2|…", but the model often ends with a
// "**Follow-up Questions:**" numbered list instead — both are treated the same.
const FOLLOWUPS_MARKER = String.raw`(?:FOLLOWUPS\s*:|Follow[- ]?up\s+Questions\s*:?)`;
const FOLLOWUPS_BLOCK = new RegExp(String.raw`\**\s*${FOLLOWUPS_MARKER}[\s\S]*$`, "i");
const FOLLOWUPS_PARTIAL = /\**\s*(?:FOLLOW[A-Z]*|Follow[- ]?(?:up)?(?:\s+Q[a-z]*)?)\s*:?\**\s*$/i;

/** Removes the follow-up block (and, mid-stream, a heading that's only half arrived) */
export function stripFollowups(text: string, streaming = false) {
  let out = text.replace(FOLLOWUPS_BLOCK, "");
  if (streaming) out = out.replace(FOLLOWUPS_PARTIAL, "");
  // the divider the model puts before the block
  return out.replace(/\n\s*(?:-{3,}|━+)\s*$/, "").trim();
}

// The marker may be bolded and the questions may sit on the next line(s), numbered or
// pipe-separated, so read everything after it and strip markdown leftovers.
export function parseFollowups(text: string) {
  const match = text.match(new RegExp(String.raw`${FOLLOWUPS_MARKER}([\s\S]*)$`, "i"));
  if (!match) return [];
  return match[1]
    .split(/\||\n/)
    .map((s) =>
      s
        .replace(/[*_`#>]/g, "")
        .replace(/^\s*(?:[-•]|\d+[.)])\s*/, "")
        .replace(/^["'“”]+|["'“”]+$/g, "")
        .trim(),
    )
    .filter((s) => s.length > 3 && /[a-z]/i.test(s))
    .slice(0, 5);
}

/** Earlier turns sent with a new question, so follow-ups ("what are its fees?") keep their context */
export function toApiHistory(messages: ChatMessage[]) {
  return messages
    .filter((m) => m.content.trim() && m.status !== "error")
    .slice(-HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.role === "assistant" ? stripFollowups(m.content).slice(0, HISTORY_CHARS) : m.content,
    }));
}

const DAY = 86_400_000;

/** Today / Yesterday / Previous 7 days / Previous 30 days / Older, like ChatGPT's sidebar */
export function groupThreads(threads: ChatThread[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const t0 = today.getTime();
  const buckets = [
    { label: "Today", from: t0 },
    { label: "Yesterday", from: t0 - DAY },
    { label: "Previous 7 days", from: t0 - 7 * DAY },
    { label: "Previous 30 days", from: t0 - 30 * DAY },
    { label: "Older", from: -Infinity },
  ];
  const groups = buckets.map((b) => ({ label: b.label, items: [] as ChatThread[] }));
  [...threads]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .forEach((t) => groups[buckets.findIndex((b) => t.updatedAt >= b.from)].items.push(t));
  return groups.filter((g) => g.items.length > 0);
}
