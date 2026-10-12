"use client";

import { motion } from "framer-motion";
import { Check, Timer } from "lucide-react";
import type { AdmissionStage } from "@/data/application-flows";

const EASE = [0.22, 1, 0.36, 1] as const;

// Vertical admission-process tracker: finished stages get a tick, the current one is highlighted.
export default function StageTimeline({
  stages,
  completed,
}: {
  stages: AdmissionStage[];
  /** How many stages are already finished */
  completed: number;
}) {
  return (
    <ol className="relative">
      {stages.map((stage, i) => {
        const done = i < completed;
        const current = i === completed;
        const last = i === stages.length - 1;

        return (
          <li key={stage.title} className={`relative flex gap-4 ${last ? "" : "pb-6 [@media(min-width:1024px)_and_(min-height:700px)]:pb-9"}`}>
            {/* connector to the next stage — fills red once this stage is done */}
            {!last && (
              <span aria-hidden className="absolute bottom-0 left-[17px] top-10 w-0.5 overflow-hidden rounded-full bg-slate-200">
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: done ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.15 }}
                  className="block h-full w-full origin-top bg-[#ee2c3c]"
                />
              </span>
            )}

            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.15 + i * 0.1 }}
              className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                done
                  ? "border-[#ee2c3c] bg-[#ee2c3c] text-white"
                  : current
                    ? "border-[#ee2c3c] bg-white text-[#ee2c3c]"
                    : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              {current && (
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-[#ee2c3c]"
                />
              )}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.2 + i * 0.1 }}
              className={`min-w-0 flex-1 rounded-xl px-3.5 py-2.5 transition-colors ${
                current ? "bg-white shadow-sm ring-1 ring-red-100" : ""
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  current ? "text-[#ee2c3c]" : done ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {done ? "Completed" : current ? "Current step" : `Step ${i + 1}`}
              </p>
              <p className={`mt-0.5 text-[15px] font-bold leading-snug ${done || current ? "text-slate-900" : "text-slate-600"}`}>
                {stage.title}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                <Timer className="h-3.5 w-3.5" /> {stage.duration}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
