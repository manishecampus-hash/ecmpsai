// Applications made with "1-Click Apply" — kept in the browser for now (frontend only).
// The backend hook-up comes later; until then the My Applications page reads from here.

/** What a card hands to the apply popup */
export interface ApplyTarget {
  university: string;
  program: string;
  image?: string;
  fee?: string;
  match?: number;
}

/** applied → green card; failed (couldn't apply / already applied) → red card */
export type ApplyStatus = "applied" | "failed";

export interface AppliedProgram extends ApplyTarget {
  id: string;
  status: ApplyStatus;
  /** Why it failed, e.g. "Already applied" */
  note?: string;
  appliedAt: number;
  /** Applied by the agent (AI Apply) */
  viaAI?: boolean;
}

const KEY = "ecampus_applied_programs";
export const APPLIED_EVENT = "ecampus-applied-change";

const keyOf = (t: ApplyTarget) => `${t.university}::${t.program}`.toLowerCase();

export function readApplied(): AppliedProgram[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) ? list.filter((a) => a && a.status) : [];
  } catch {
    return [];
  }
}

/** Applies to one program. Already applied → recorded as a failed attempt ("Already applied"). */
export function applyTo(target: ApplyTarget, viaAI = false): AppliedProgram {
  const current = readApplied();
  const k = keyOf(target);
  const already = current.some((a) => keyOf(a) === k && a.status === "applied");
  const now = Date.now();
  const entry: AppliedProgram = {
    ...target,
    id: `${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    status: already ? "failed" : "applied",
    note: already ? "Already applied" : undefined,
    appliedAt: now,
    viaAI,
  };
  // One card per program and outcome: a new attempt replaces the last one with the same outcome
  const rest = current.filter((a) => !(keyOf(a) === k && (a.status === entry.status || entry.status === "applied")));
  try {
    localStorage.setItem(KEY, JSON.stringify([entry, ...rest]));
    window.dispatchEvent(new Event(APPLIED_EVENT));
  } catch {
    // Storage unavailable — not remembered after this visit.
  }
  return entry;
}
