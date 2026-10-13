"use client";

import { motion } from "framer-motion";
import {
  Award,
  Check,
  FileText,
  GraduationCap,
  UserCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { SubmittedApplication } from "@/components/application-flow/submitted-applications";
import { formatINR, formatLongDate } from "@/components/application-flow/options";
import { EASE_OUT } from "../motion";

type StepStatus = "done" | "current" | "upcoming";

export interface JourneyStep {
  title: string;
  caption: string;
  status: StepStatus;
  icon: LucideIcon;
  date?: string;
}

const STAGE_ICONS: [RegExp, LucideIcon][] = [
  [/pay/i, Wallet],
  [/document|verif/i, FileText],
  [/screen|profile|interview/i, UserCheck],
];

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/**
 * The university's admission stages (from the flow config), followed by admission
 * confirmation and the intake date. Everything up to and including the payment stage
 * is complete once the seat block is paid; the stage after it is in progress.
 */
export function buildJourney({ program, payment }: SubmittedApplication): JourneyStep[] {
  const payIndex = program.stages.findIndex((s) => /pay/i.test(s.title));
  const doneThrough = payIndex >= 0 ? payIndex : program.stages.length - 1;
  const paidOn = shortDate(payment.paidAt);

  const stages: JourneyStep[] = program.stages.map((stage, i) => {
    const status: StepStatus = i <= doneThrough ? "done" : i === doneThrough + 1 ? "current" : "upcoming";
    const isDocs = /document/i.test(stage.title) && program.documents.length > 0;
    return {
      title: stage.title,
      status,
      icon: STAGE_ICONS.find(([re]) => re.test(stage.title))?.[1] ?? UserCheck,
      caption:
        i === payIndex
          ? `${formatINR(payment.amount)} paid`
          : status === "done"
            ? "Details submitted"
            : isDocs
              ? `${program.documents.length} documents to share`
              : stage.duration,
      date: status === "done" ? paidOn : undefined,
    };
  });

  const start = formatLongDate(program.startDate);
  return [
    ...stages,
    { title: "Admission Confirmed", caption: `Offer from ${program.universityName}`, status: "upcoming", icon: Award },
    ...(start
      ? [{ title: "Program Starts", caption: start, status: "upcoming" as const, icon: GraduationCap }]
      : []),
  ];
}

const STATUS_CHIP: Record<StepStatus, { label: string; className: string }> = {
  done: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  current: { label: "In progress", className: "bg-red-50 text-red-600" },
  upcoming: { label: "Upcoming", className: "bg-gray-100 text-gray-500" },
};

// Vertical timeline on phones, horizontal tracker from md up
export default function ApplicationJourney({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="md:flex">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const chip = STATUS_CHIP[step.status];
        const last = i === steps.length - 1;
        return (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
            // last step only takes its own width, so the tracker runs to the card's right edge
            className="relative flex gap-3.5 pb-6 last:pb-0 md:flex-1 md:flex-col md:gap-3 md:pb-0 md:pr-4 md:last:max-w-[190px] md:last:flex-none md:last:pr-0"
          >
            {/* connector to the next step — fills in once this step is complete */}
            {!last && (
              <>
                <span aria-hidden className="absolute bottom-0 left-[19px] top-11 w-0.5 rounded-full bg-gray-100 md:hidden">
                  {step.status === "done" && (
                    <motion.span
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.45 + i * 0.15 }}
                      className="absolute inset-0 origin-top rounded-full bg-emerald-500"
                    />
                  )}
                </span>
                <span aria-hidden className="absolute left-[52px] right-3 top-[19px] hidden h-0.5 rounded-full bg-gray-100 md:block">
                  {step.status === "done" && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.45 + i * 0.15 }}
                      className="absolute inset-0 origin-left rounded-full bg-emerald-500"
                    />
                  )}
                </span>
              </>
            )}

            <span
              className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                step.status === "done"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                  : step.status === "current"
                    ? "bg-white text-red-600 ring-2 ring-red-500"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.status === "done" ? <Check className="h-5 w-5" strokeWidth={2.6} /> : <Icon className="h-[18px] w-[18px]" strokeWidth={2} />}
              {step.status === "current" && (
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-xl border-2 border-red-500"
                />
              )}
            </span>

            <div className="min-w-0 pt-0.5 md:pt-0">
              <p className={`text-sm font-bold leading-snug ${step.status === "upcoming" ? "text-gray-500" : "text-gray-900"}`}>
                {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.caption}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${chip.className}`}>
                  {step.status === "current" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />}
                  {chip.label}
                </span>
                {step.date && <span className="text-[11px] font-medium text-gray-400">{step.date}</span>}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
