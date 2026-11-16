// eCampus Agent — the thinking side of work mode, like ChatGPT's agent: each step the AI sees the page,
// decides one action (open, click, type, select, scroll) and says why, until it's done and answers.
// It runs on eCampus AI (/api/chat — the same API and model as the chat), asking for one JSON decision per step.

import type { Observation } from "./agent-dom";

export type AgentAction =
  | { type: "open"; route: string }
  | { type: "click"; id: number }
  | { type: "type"; id: number; text: string; enter?: boolean }
  | { type: "select"; id: number; value: string }
  | { type: "scroll"; direction: "up" | "down" }
  | { type: "done"; answer: string; followups?: string[] };

export interface AgentDecision {
  thought: string;
  action: AgentAction;
}

export type ApiMessage = { role: "user" | "assistant"; content: string };

export const MAX_STEPS = 12;

export const DASHBOARD_ROUTES: [string, string][] = [
  ["/dashboard", "Overview — profile summary, applications at a glance, rewards"],
  ["/dashboard/matcher", "AI Degree Finder — find programs that fit the student"],
  ["/dashboard/applications", "My Applications — every application, its stage and documents"],
  ["/dashboard/receipts", "Payment Receipts — seat block payments"],
  ["/dashboard/downloads", "My Downloads — brochures, receipts, forms, offer letters, documents to submit"],
  ["/dashboard/profile", "Profile — the student's details"],
  ["/dashboard/invite-earn", "Invite & Earn — refer friends, rewards, payout bank account"],
  ["/dashboard/education-loan-emi-calculator", "EMI Calculator — loan amount, interest rate and tenure fields"],
  ["/dashboard/settings", "Settings"],
];
export const isDashboardRoute = (route: string) => DASHBOARD_ROUTES.some(([r]) => r === route);

export function agentRules(task: string, accountData: string, earlier: string) {
  return `[eCampus Agent — WORK MODE]
You are eCampus Agent. You operate this student's eCampus dashboard in their browser the way a person would: open pages, read them, click tabs and buttons, type into fields. Work step by step until the task is done, then answer.

Reply with ONE JSON object and nothing else — no markdown, no code fences, no follow-up block:
{"thought": "<one short sentence to the student: what you're doing and why>", "action": <one action>}

Actions:
{"type":"open","route":"<a dashboard route below>"}  – go to a dashboard page
{"type":"click","id":<element id>}  – click a link, tab, button or checkbox on the current page
{"type":"type","id":<element id>,"text":"<text>","enter":false}  – type into a field (replaces its value; enter:true presses Enter after)
{"type":"select","id":<element id>,"value":"<option text>"}  – choose in a dropdown
{"type":"scroll","direction":"down"}  – see more of a long page ("up" to go back)
{"type":"done","answer":"<markdown answer for the student>","followups":["<short next task>"]}  – finish

Rules:
- Do exactly what the task asks, in as few steps as you can. To "show", "find" or "open" something, get the page into that state (the right page, tab, filter or search) and finish there — don't open or download every file, and don't navigate away afterwards.
- Finish with done as soon as you can answer or the page shows what was asked. Many tasks need only 2–4 steps.
- Use open (not sidebar links) to change dashboard page. Use only element ids from the latest page you were shown; after every action you're shown the page again.
- Read what's already on the page before clicking around. Don't repeat an action that changed nothing.
- Elements marked (needs approval) pause for the student's OK — use them only when the task asks for that change.
- Never sign out, pay, or open links outside the dashboard — put such links in your answer instead.
- About the student's account, use only what you saw on the pages and the account data below; never invent applications, fees, dates or statuses. For general education questions you may use your own knowledge.
- Answer: lead with the direct result, use a short markdown table for lists, link dashboard pages like [My Downloads](/dashboard/downloads), under 200 words, up to 3 followups. Reply in the student's language.
- Finish within ${MAX_STEPS} steps.

Dashboard routes:
${DASHBOARD_ROUTES.map(([r, d]) => `${r} — ${d}`).join("\n")}

Account data saved in this browser:
${accountData}${earlier ? `\n\nEarlier in this task:\n${earlier}` : ""}

Student's task: "${task}"`;
}

export function observationText(step: number, obs: Observation, lastResult: string, mustFinish: boolean) {
  return `Step ${step} of ${MAX_STEPS}${lastResult ? ` — result of your last action: ${lastResult}` : ""}

Current page: ${obs.route} — "${obs.title}"
Page text:
${obs.text || "(empty)"}

Elements:
${obs.elements.map((e) => e.line).join("\n") || "(none)"}

${mustFinish ? "You've used all your steps — reply with the done action now." : "Your next action? (one JSON object only)"}`;
}

/** Older observations are long; the AI only needs what happened at each step */
export const compactObservation = (step: number, obs: Observation, lastResult: string) =>
  `Step ${step}${lastResult ? ` — result: ${lastResult}` : ""} (was on ${obs.route} "${obs.title}")`;

export class AgentOffline extends Error {}

// First balanced {...} in the reply — tolerates code fences or a stray sentence around it
export function parseDecision(raw: string): AgentDecision | null {
  const text = raw.replace(/```(?:json)?/gi, "");
  const start = text.indexOf("{");
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      try {
        const parsed = JSON.parse(text.slice(start, i + 1));
        const action = parsed?.action;
        if (!action || typeof action.type !== "string") return null;
        if (action.type === "done" && typeof action.answer !== "string") return null;
        if (["click", "type", "select"].includes(action.type)) action.id = Number(action.id);
        return { thought: typeof parsed.thought === "string" ? parsed.thought : "", action };
      } catch {
        return null;
      }
    }
  }
  return null;
}

async function ask(messages: ApiMessage[], query: string, signal: AbortSignal) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, messages }),
    signal,
  });
  if (!res.ok) throw new AgentOffline(`eCampus AI returned ${res.status}`);
  const text = await res.text();
  // The API's offline answer is a generic page about the query, not a decision
  if (/^\s*#+\s*Information for:/i.test(text)) throw new AgentOffline("eCampus AI is offline");
  return text;
}

/** One step's decision from eCampus AI (asks once more if the reply isn't valid JSON) */
export async function decide(messages: ApiMessage[], query: string, signal: AbortSignal): Promise<AgentDecision> {
  const first = await ask(messages, query, signal);
  const decision = parseDecision(first);
  if (decision) return decision;
  const retry = await ask(
    [...messages, { role: "assistant", content: first.slice(0, 1500) }, { role: "user", content: "That wasn't a valid decision. Reply with only the JSON object." }],
    query,
    signal,
  );
  const second = parseDecision(retry);
  if (second) return second;
  throw new AgentOffline("eCampus AI didn't return a decision");
}
