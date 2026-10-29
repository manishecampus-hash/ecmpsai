"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock3,
  CreditCard,
  FileCheck2,
  GraduationCap,
  ListChecks,
  PhoneCall,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { REFERRAL_STEPS, initials, type Referral } from "./referral-store";

type StepState = "done" | "active" | "pending";

const STEP_ICONS: LucideIcon[] = [FileCheck2, PhoneCall, CreditCard, GraduationCap, Wallet];

// What the student can expect next, indexed by the number of finished steps
const NEXT_UP = [
  "Submit a referral to start tracking.",
  "Our counselor will call your friend within 24 hours.",
  "Your friend completes the fee payment.",
  "The university confirms the admission.",
  "Your reward is sent to your bank account.",
];

const BADGES: Record<StepState, { label: string; className: string }> = {
  done: { label: "Completed", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  active: { label: "In Progress", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  pending: { label: "Pending", className: "bg-gray-50 text-gray-500 ring-gray-200" },
};

// Circular percentage meter for the selected friend
function ProgressRing({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[68px] w-[68px] flex-shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="#fee2e2" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#dc2626"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-900">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

export default function ReferralStatusCard({
  referrals,
  selected,
  onSelect,
}: {
  referrals: Referral[];
  selected: Referral | null;
  onSelect: (id: string) => void;
}) {
  const total = REFERRAL_STEPS.length;
  const stage = selected?.stage ?? 0;
  const progress = Math.min(stage, total) / total;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <ListChecks className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <h2 className="text-base font-bold text-gray-900">Referral Process &amp; Status</h2>
        </div>
        <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600">
          Step {Math.min(stage + (stage < total ? 1 : 0), total)} of {total}
        </span>
      </div>

      {/* Whose progress is shown — one chip per invited friend */}
      {referrals.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {referrals.map((r) => {
            const active = r.id === selected?.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelect(r.id)}
                aria-pressed={active}
                className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-semibold transition ${
                  active ? "border-red-200 bg-red-50 text-red-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                    active ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {initials(r.name)}
                </span>
                {r.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      )}

      {/* Summary of the selected friend */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selected?.id ?? "empty"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
          className="mx-5 mt-4 flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-3.5"
        >
          <ProgressRing value={progress} />
          {selected ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-gray-900">{selected.name}</p>
              <p className="mt-0.5 truncate text-xs text-gray-500">{selected.courses.join(" · ")}</p>
              <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden />
                {stage >= total ? "All done — your reward has been paid!" : NEXT_UP[stage]}
              </p>
            </div>
          ) : (
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-gray-900">No referral yet</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                Invite a friend and follow every step of their admission here.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Steps */}
      <ol className="px-5 pb-5 pt-3">
        {REFERRAL_STEPS.map((step, i) => {
          const state: StepState = i < stage ? "done" : i === stage && stage > 0 ? "active" : "pending";
          const Icon = STEP_ICONS[i];
          const badge = BADGES[state];
          const last = i === total - 1;
          return (
            <motion.li
              key={`${selected?.id ?? "none"}-${step.title}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i, duration: 0.3 } }}
              className="relative flex gap-3.5"
            >
              {/* Marker and the connector down to the next step */}
              <div className="relative flex flex-col items-center">
                <span
                  className={`relative z-10 mt-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                    state === "done"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : state === "active"
                        ? "bg-white text-red-600 ring-2 ring-red-500"
                        : "bg-gray-50 text-gray-400 ring-1 ring-gray-200"
                  }`}
                >
                  {state === "active" && <span aria-hidden className="absolute inset-0 rounded-xl bg-red-400/25 motion-safe:animate-ping" />}
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                  {state === "done" && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                      <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />
                    </span>
                  )}
                </span>
                {!last && (
                  <span aria-hidden className="relative -mb-3 w-0.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <motion.span
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: i < stage ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                      className="absolute inset-0 origin-top bg-red-600"
                    />
                  </span>
                )}
              </div>

              {/* Step text */}
              <div
                className={`my-1.5 min-w-0 flex-1 rounded-xl px-3 py-2.5 transition-colors ${
                  state === "active" ? "bg-amber-50/60 ring-1 ring-amber-100" : ""
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className={`text-sm font-semibold ${state === "pending" ? "text-gray-500" : "text-gray-900"}`}>{step.title}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${badge.className}`}>
                    {state === "done" ? (
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    ) : state === "active" ? (
                      <Clock3 className="h-3 w-3" aria-hidden />
                    ) : null}
                    {badge.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
