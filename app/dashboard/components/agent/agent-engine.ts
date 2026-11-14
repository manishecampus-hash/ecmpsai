// eCampus Agent — work mode: how a task becomes steps, and the data the agent works with.
// The agent runs in the student's browser: it opens real dashboard pages, reads what's on them, works numbers out
// here, asks before acting, and writes its report with eCampus AI (/api/chat — the same API as the chat).
// If eCampus AI can't be reached, the report is written here from the same data so the task still finishes.

import { readSubmittedApplications, type SubmittedApplication } from "@/components/application-flow/submitted-applications";
import { REFERRAL_STEPS, readBankDetails, readReferrals, type BankDetails, type Referral } from "../invite-earn/referral-store";
import { inr, monthlyEmi } from "../emi/emi-math";
import type { StudentProfile } from "../../types";

export type StepKind = "open" | "read" | "check" | "calc" | "act" | "write" | "think" | "click" | "type" | "select" | "scroll";
export type StepStatus = "pending" | "running" | "done" | "skipped";
export type RunStatus = "running" | "awaiting" | "done" | "stopped";

export interface AgentApproval {
  title: string;
  description: string;
  confirmLabel: string;
}

export interface AgentStep {
  id: string;
  kind: StepKind;
  title: string;
  detail?: string;
  /** Dashboard page the agent opens for this step */
  route?: string;
  /** Element the agent's cursor goes to on that page */
  target?: string;
  /** Read the page's text and hand it to eCampus AI with the report */
  read?: boolean;
  /** The agent stops here and asks before going on */
  approval?: AgentApproval;
  /** Event the opened page listens for to let the agent fill it in (sent once the page is up) */
  action?: { event: string; detail: Record<string, number> };
  status: StepStatus;
}

/** The EMI calculator listens for this so the agent can fill it in for the student */
export const AGENT_FILL_EMI = "ecampus-agent:fill-emi";

/** One turn of a task: the student's message, the agent's steps and its report */
export interface AgentRun {
  id: string;
  prompt: string;
  status: RunStatus;
  steps: AgentStep[];
  answer: string;
  followups?: string[];
  startedAt: number;
  finishedAt?: number;
}

export interface AgentTask {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  runs: AgentRun[];
}

export interface AgentContext {
  student: StudentProfile;
  applications: SubmittedApplication[];
  referrals: Referral[];
  bank: BankDetails | null;
}

export function readAgentContext(): AgentContext {
  let student: StudentProfile = {};
  try {
    student = JSON.parse(localStorage.getItem("ecampus_student") || "{}") ?? {};
  } catch {
    // No profile saved — the agent works with what it has.
  }
  return { student, applications: readSubmittedApplications(), referrals: readReferrals(), bank: readBankDetails() };
}

export const lastRun = (task: AgentTask | null | undefined) => task?.runs[task.runs.length - 1];
export const isLive = (run: AgentRun | undefined) => run?.status === "running" || run?.status === "awaiting";

// ── Saved tasks ─────────────────────────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "ecampus_agent_tasks";

type LegacyStep = AgentStep & { view?: { route: string } };
type LegacyTask = Partial<AgentTask> & Partial<Omit<AgentRun, "id" | "steps">> & { steps?: LegacyStep[] };

/** Tasks saved before follow-ups existed held a single run at the top level */
function upgrade(t: LegacyTask): AgentTask {
  if (Array.isArray(t.runs)) return t as AgentTask;
  const now = Date.now();
  return {
    id: t.id ?? `${now}`,
    title: t.title ?? "Task",
    createdAt: t.createdAt ?? now,
    updatedAt: t.updatedAt ?? now,
    runs: [
      {
        id: `${t.id}-r0`,
        prompt: t.prompt ?? "",
        status: t.status ?? "done",
        steps: (t.steps ?? []).map(({ view, ...s }) => ({ ...s, route: s.route ?? view?.route })),
        answer: t.answer ?? "",
        startedAt: t.startedAt ?? now,
        finishedAt: t.finishedAt,
      },
    ],
  };
}

export function loadTasks(): AgentTask[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(list)) return [];
    // A run cut off by a refresh is kept as stopped
    return list.map(upgrade).map((t) => ({
      ...t,
      runs: t.runs.map((r) =>
        isLive(r) ? { ...r, status: "stopped" as const, steps: r.steps.map((s) => (s.status === "running" ? { ...s, status: "pending" as const } : s)) } : r,
      ),
    }));
  } catch {
    return [];
  }
}

export function saveTasks(tasks: AgentTask[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.slice(0, 40)));
  } catch {
    // Storage full or unavailable — the task still runs for this visit.
  }
}

// ── Understanding the task ──────────────────────────────────────────────────────────────────────────────────────
export type Intent = "documents" | "applications" | "emi" | "referrals" | "profile" | "receipts" | "research" | "general";

export function intentOf(prompt: string): Intent {
  const p = prompt.toLowerCase();
  if (/compare|\bvs\b|versus|best |recommend|suggest|which (?:university|college|program|course)|scholarship|placement|valid|ugc|naac/.test(p)) return "research";
  if (/receipt|payment|paid|transaction/.test(p)) return "receipts";
  if (/document|download|brochure|offer letter|marksheet/.test(p)) return "documents";
  if (/\bemi\b|loan|instal|monthly/.test(p)) return "emi";
  if (/refer|invite|reward|earn|friend/.test(p)) return "referrals";
  if (/application|applied|status|admission|offer|seat/.test(p)) return "applications";
  if (/profile|my details|complete|phone|email/.test(p)) return "profile";
  return "general";
}

/** Rupee amount in the task ("3 lakh", "₹2,50,000", "300000"), if any */
function amountFrom(prompt: string): number | null {
  const lakh = prompt.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b)/i);
  if (lakh) return Math.round(parseFloat(lakh[1]) * 100000);
  const plain = prompt.replace(/,/g, "").match(/₹?\s*(\d{5,8})/);
  return plain ? parseInt(plain[1], 10) : null;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const fmtDate = (v: string) => new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// ── What the agent knows about the student, as plain text for eCampus AI ──────────────────────────────────────
function profileFields(student: StudentProfile): [string, unknown][] {
  return [
    ["Name", student.name],
    ["Email", student.email],
    ["Phone", student.phone],
    ["Course of interest", student.course || student.coursesInterested?.join(", ")],
    ["State", student.state],
  ];
}

export function accountFacts({ student, applications: apps, referrals, bank }: AgentContext) {
  const profile = profileFields(student)
    .map(([k, v]) => `${k}: ${v ? String(v) : "not filled"}`)
    .join("; ");
  const appLines = apps.length
    ? apps
        .map((a) => {
          const docs = a.program.documents ?? [];
          return `- ${a.program.programName} at ${a.program.universityName} (application ${a.applicationId}); seat blocked on ${fmtDate(a.payment.paidAt)} with ${inr(a.payment.amount)}; stage: ${a.offerLetterUrl ? "offer letter issued" : "seat blocked, offer letter awaited"}; documents to submit: ${docs.length ? docs.map((d) => d.title).join(", ") : "none requested yet"}; brochure: ${a.program.brochureUrl ? "available" : "not available"}`;
        })
        .join("\n")
    : "- No applications yet";
  const refLines = referrals.length
    ? referrals.map((r) => `- ${r.name} (${r.courses.join(", ")}): ${REFERRAL_STEPS[Math.min(r.stage, REFERRAL_STEPS.length) - 1]?.title ?? "Invited"}`).join("\n")
    : "- No friends invited yet";
  return `Profile — ${profile}\nApplications:\n${appLines}\nReferrals:\n${refLines}\nPayout bank account: ${bank ? "saved" : "not added"}`;
}

// ── Planning ────────────────────────────────────────────────────────────────────────────────────────────────────
export type PlannedStep = Omit<AgentStep, "id" | "status">;

export interface Plan {
  intent: Intent;
  steps: PlannedStep[];
  /** Worked out here (EMIs and the like) so eCampus AI reports exact numbers */
  extraFacts?: string;
  /** Report written here if eCampus AI can't be reached */
  fallback: (approved: Record<number, boolean>) => string;
}

const WRITE: PlannedStep = { kind: "write", title: "Writing the report with eCampus AI" };

export function planTask(prompt: string, ctx: AgentContext): Plan {
  const { applications: apps, referrals, student, bank } = ctx;
  const intent = intentOf(prompt);
  const docCount = apps.reduce((n, a) => n + (a.program.documents?.length ?? 0), 0);

  switch (intent) {
    case "applications":
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening My Applications", route: "/dashboard/applications", target: "main h1" },
          { kind: "read", title: `Reading ${plural(apps.length, "application")}`, detail: "Program, university, payment and stage", read: true, target: "main section" },
          { kind: "open", title: "Opening My Downloads", route: "/dashboard/downloads", target: "main h1" },
          { kind: "check", title: "Checking documents and offer letters", detail: `${plural(docCount, "document")} requested · ${plural(apps.filter((a) => !a.offerLetterUrl).length, "offer letter")} awaited`, read: true, target: "main article" },
          WRITE,
        ],
        fallback: () => {
          if (!apps.length) return "You haven't applied to a program yet, so there's nothing to track.\n\n**Next step:** find a program in the [AI Degree Finder](/dashboard/matcher) — once you block a seat, I can track every stage for you.";
          const rows = apps
            .map((a) => {
              const docs = a.program.documents?.length ?? 0;
              const next = a.offerLetterUrl ? "Pay the program fee to enrol" : docs ? `Submit ${plural(docs, "document")}` : "Wait for document verification";
              return `| ${a.program.programName} | ${a.program.universityName} | ${fmtDate(a.payment.paidAt)} | ${a.offerLetterUrl ? "Offer letter issued" : "Seat blocked"} | ${next} |`;
            })
            .join("\n");
          return `Here's where your ${plural(apps.length, "application")} ${apps.length === 1 ? "stands" : "stand"}:\n\n| Program | University | Applied | Stage | Next step |\n|---|---|---|---|---|\n${rows}\n\n${docCount ? `**${plural(docCount, "document")}** still need to reach the universities — the checklist is in [My Downloads](/dashboard/downloads). ` : ""}Offer letters appear in My Downloads as soon as they're issued.`;
        },
      };

    case "documents":
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening My Downloads", route: "/dashboard/downloads", target: "main h1" },
          { kind: "read", title: "Reading every program's files", detail: `${plural(apps.length * 4, "file")} across ${plural(apps.length, "program")}`, read: true, target: "main article" },
          { kind: "check", title: "Checking the universities' document checklists", detail: `${plural(docCount, "document")} requested`, target: "main article ul" },
          WRITE,
        ],
        fallback: () => {
          if (!apps.length) return "There are no files yet — brochures, receipts, application forms and offer letters appear in [My Downloads](/dashboard/downloads) once you apply to a program.";
          const blocks = apps
            .map((a) => {
              const docs = a.program.documents ?? [];
              return `**${a.program.programName} — ${a.program.universityName}**\n- Ready: payment receipt, application form${a.program.brochureUrl ? ", brochure" : ""}${a.offerLetterUrl ? ", offer letter" : ""}\n- ${a.offerLetterUrl ? "Offer letter issued" : "Offer letter: awaited from the university"}\n${docs.length ? `- To submit: ${docs.map((d) => d.title).join(", ")}` : "- No documents requested yet"}`;
            })
            .join("\n\n");
          return `${blocks}\n\nEverything that's ready can be downloaded from [My Downloads](/dashboard/downloads).`;
        },
      };

    case "receipts":
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening Payment Receipts", route: "/dashboard/receipts", target: "main h1" },
          { kind: "read", title: `Reading ${plural(apps.length, "payment")}`, detail: "Amount, date and payment ID", read: true, target: "main section" },
          WRITE,
        ],
        fallback: () =>
          apps.length
            ? `You've made ${plural(apps.length, "payment")}:\n\n| Program | Amount | Paid on | Payment ID |\n|---|---|---|---|\n${apps
                .map((a) => `| ${a.program.programName} · ${a.program.universityName} | ${inr(a.payment.amount)} | ${fmtDate(a.payment.paidAt)} | ${a.payment.paymentId} |`)
                .join("\n")}\n\nDownload any receipt from [Payment Receipts](/dashboard/receipts).`
            : "There are no payments yet — a receipt appears in [Payment Receipts](/dashboard/receipts) as soon as you block a seat.",
      };

    case "emi": {
      const principal = clamp(amountFrom(prompt) ?? 300000, 50000, 5000000);
      const rateMatch = prompt.match(/(\d+(?:\.\d+)?)\s*%/);
      const rate = clamp(rateMatch ? parseFloat(rateMatch[1]) : 10.5, 1, 20);
      const yearsMatch = prompt.match(/(\d+)\s*(?:years?|yrs?)/i);
      const asked = yearsMatch ? clamp(parseInt(yearsMatch[1], 10), 1, 10) : null;
      const tenures = asked ? [Math.max(1, asked - 1), asked, Math.min(10, asked + 2)].filter((y, i, all) => all.indexOf(y) === i) : [2, 3, 5];
      const pick = asked ?? 3;
      const rows = tenures.map((y) => {
        const emi = monthlyEmi(principal, rate, y * 12);
        return { y, emi, interest: emi * y * 12 - principal, total: emi * y * 12 };
      });
      const table = `| Tenure | Monthly EMI | Total interest | Total payable |\n|---|---|---|---|\n${rows.map((r) => `| ${r.y} years | ${inr(r.emi)} | ${inr(r.interest)} | ${inr(r.total)} |`).join("\n")}`;
      return {
        intent,
        steps: [
          { kind: "read", title: "Reading your applications for the fee", detail: apps.length ? apps.map((a) => a.program.programName).join(" · ") : "No application yet — using the amount in your task", route: "/dashboard/applications", read: true, target: "main section" },
          { kind: "calc", title: `Calculating EMIs for ${inr(principal)}`, detail: `${rate}% p.a. over ${tenures.join(" / ")} years` },
          {
            kind: "act",
            title: `Filling the EMI calculator with ${inr(principal)}`,
            detail: `${rate}% p.a. · ${pick} years`,
            route: "/dashboard/education-loan-emi-calculator",
            action: { event: AGENT_FILL_EMI, detail: { amount: principal, rate, years: pick } },
            target: "main section",
            approval: {
              title: "Fill in the EMI calculator for you?",
              description: `I'll open it and set ${inr(principal)} at ${rate}% for ${pick} years — you can change any value after.`,
              confirmLabel: "Yes, fill it in",
            },
          },
          WRITE,
        ],
        extraFacts: `EMIs worked out by the dashboard for a loan of ${inr(principal)} at ${rate}% p.a. (use these exact numbers):\n${table}`,
        fallback: (approved) =>
          `For an education loan of **${inr(principal)}** at **${rate}% p.a.**:\n\n${table}\n\nA shorter tenure costs less interest overall; a longer one keeps the monthly amount low.${
            approved[2] ? `\n\nThe [EMI calculator](/dashboard/education-loan-emi-calculator) is filled in with ${pick} years — move the sliders to try other options.` : ""
          }`,
      };
    }

    case "referrals": {
      const byStage = REFERRAL_STEPS.map((s, i) => ({ title: s.title, count: referrals.filter((r) => r.stage === i + 1).length })).filter((s) => s.count);
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening Invite & Earn", route: "/dashboard/invite-earn", target: "main h1" },
          { kind: "read", title: `Reading ${plural(referrals.length, "referral")}`, detail: "Who you invited, their course and stage", read: true, target: "main section" },
          { kind: "check", title: "Checking your payout details", detail: bank ? "Bank account saved" : "No bank account saved yet" },
          WRITE,
        ],
        fallback: () => {
          if (!referrals.length) return "You haven't invited anyone yet. Refer a friend from [Invite & Earn](/dashboard/invite-earn) — you're rewarded when they enrol.";
          const list = referrals.map((r) => `- **${r.name}** (${r.courses.join(", ")}) — ${REFERRAL_STEPS[Math.min(r.stage, REFERRAL_STEPS.length) - 1]?.title ?? "Invited"}`).join("\n");
          return `You've invited **${plural(referrals.length, "friend")}**:\n\n${list}\n\n${byStage.map((s) => `${s.count} at “${s.title}”`).join(" · ")}.\n\n${bank ? "Your bank account is saved, so rewards can be paid straight in." : "**Add your bank account** in [Invite & Earn](/dashboard/invite-earn) so rewards can be paid when a friend enrols."}`;
        },
      };
    }

    case "profile": {
      const fields = profileFields(student);
      const missing = fields.filter(([, v]) => !v).map(([k]) => k);
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening your Profile", route: "/dashboard/profile", target: "main h1" },
          { kind: "read", title: "Reading your details", read: true, target: "main form, main section" },
          { kind: "check", title: "Checking which details are missing", detail: missing.length ? `${plural(missing.length, "detail")} missing` : "Everything is filled" },
          WRITE,
        ],
        fallback: () =>
          missing.length
            ? `Your profile is missing: **${missing.join(", ")}**. Complete it in [Profile](/dashboard/profile) so recommendations and counsellor calls are more accurate.`
            : "Your profile has all the key details. You can review it any time in [Profile](/dashboard/profile).",
      };
    }

    case "research":
      return {
        intent,
        steps: [
          { kind: "check", title: "Reading your profile and applications", detail: `${student.course || student.coursesInterested?.join(", ") || "No course saved"} · ${plural(apps.length, "application")}` },
          { kind: "read", title: "Researching with eCampus AI", detail: "Verified university data, fees and approvals" },
          { kind: "write", title: "Writing the answer for you" },
        ],
        fallback: () =>
          "I couldn't reach eCampus AI just now, so I can't research this. Try again in a moment, or switch to **Chat** to ask it directly.",
      };

    default:
      return {
        intent,
        steps: [
          { kind: "open", title: "Opening your dashboard", route: "/dashboard", target: "main h1" },
          { kind: "read", title: "Reading your Overview", read: true, target: "main section" },
          WRITE,
        ],
        fallback: () =>
          `Here's what I can do in your dashboard:\n\n- **Track applications** — stage and next step for each program\n- **Check documents** — what's ready to download and what's still needed\n- **Plan fees** — fill the EMI calculator for a loan amount and tenure\n- **Follow referrals** — friends invited and reward status\n- **Review your profile** — details that are missing`,
      };
  }
}

/** What goes to eCampus AI for the report: the task, the account data, and the pages the agent read */
export function reportPrompt(prompt: string, ctx: AgentContext, plan: Plan, pages: { title: string; text: string }[], approved: Record<number, boolean>) {
  const done = plan.steps
    .map((s, i) => `- ${s.title}${s.approval ? (approved[i] ? " (the student approved — done)" : " (the student said no — not done)") : ""}`)
    .join("\n");
  const read = pages.map((p) => `### ${p.title}\n${p.text}`).join("\n\n");
  return `You are eCampus Agent, working inside this student's eCampus dashboard. You just did these steps for them:
${done}

Their task: "${prompt}"

Real data from their account (only use this for anything about their account — never invent applications, fees, dates, names or statuses):
${accountFacts(ctx)}${plan.extraFacts ? `\n\n${plan.extraFacts}` : ""}${read ? `\n\nText of the dashboard pages you read:\n${read}` : ""}

Write the result for the student now:
- Start with the direct answer in one or two sentences.
- Use a short markdown table when you list several programs, files or options.
- Stay on the task: only mention things that matter for it (no unrelated tips about rewards, bank accounts or other pages).
- The payout bank account is managed in Invite & Earn, not in Profile.
- End with clear next steps for this task, linking dashboard pages like [My Downloads](/dashboard/downloads), [My Applications](/dashboard/applications), [EMI Calculator](/dashboard/education-loan-emi-calculator), [Invite & Earn](/dashboard/invite-earn) or [Profile](/dashboard/profile).
- Keep it under 220 words unless the task is research that needs more.`;
}

export const titleFromPrompt = (prompt: string) => {
  const t = prompt.replace(/\s+/g, " ").trim();
  const title = t.charAt(0).toUpperCase() + t.slice(1);
  return title.length > 60 ? `${title.slice(0, 57)}…` : title;
};
