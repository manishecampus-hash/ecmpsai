"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";

const STEPS = ["Review Details", "Payment"];

// Frame for the details and payment screens: back link, step tracker, content + side panel.
export default function FlowShell({
  backHref,
  step,
  aside,
  children,
}: {
  backHref: string;
  /** 1 = review details, 2 = payment */
  step: 1 | 2;
  aside: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 pb-28 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <ol className="flex items-center gap-2 sm:gap-3" aria-label="Application progress">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = n < step;
              const current = n === step;
              return (
                <li key={label} className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-2">
                    <span
                      aria-current={current ? "step" : undefined}
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                        done
                          ? "bg-[#ee2c3c] text-white"
                          : current
                            ? "bg-white text-[#ee2c3c] ring-2 ring-[#ee2c3c]"
                            : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
                    </span>
                    <span className={`text-xs font-semibold sm:text-sm ${current ? "text-slate-900" : "text-slate-500"}`}>
                      {label}
                    </span>
                  </span>
                  {n < STEPS.length && (
                    <span className={`h-0.5 w-6 rounded-full sm:w-10 ${done ? "bg-[#ee2c3c]" : "bg-slate-200"}`} />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            {children}
          </motion.div>
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            {aside}
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
