"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import type { StudentProfile } from "../types";
import { EASE_OUT } from "./motion";

// Single source of truth for profile completion, shared by the dashboard banner and the
// Profile page so both always show the same number (computed from the saved student).
const COMPLETION_FIELDS: { label: string; filled: (s: StudentProfile) => boolean }[] = [
  { label: "full name", filled: (s) => !!s.name?.trim() },
  { label: "email", filled: (s) => !!s.email?.trim() },
  { label: "phone number", filled: (s) => !!s.phone?.trim() },
  { label: "state / location", filled: (s) => !!s.state?.trim() },
  { label: "interested program", filled: (s) => !!s.coursesInterested?.length },
  { label: "career goal", filled: (s) => !!s.advisorProfile?.goal },
];

export function getProfileCompletion(student: StudentProfile) {
  const missing = COMPLETION_FIELDS.filter((f) => !f.filled(student)).map((f) => f.label);
  const percent = Math.round(((COMPLETION_FIELDS.length - missing.length) / COMPLETION_FIELDS.length) * 100);
  return { percent, missing };
}

export default function ProfileProgress({
  student,
  label = "Profile Progress",
  delay = 0.2,
}: {
  student: StudentProfile;
  label?: string;
  delay?: number;
}) {
  const { percent } = getProfileCompletion(student);
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  // Count the percentage up alongside the bar fill
  useEffect(() => {
    if (reduceMotion) {
      setShown(percent);
      return;
    }
    const controls = animate(shown, percent, {
      duration: 1,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, reduceMotion]);

  const complete = percent >= 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-gray-500">{label}</span>
        <span className={`font-semibold tabular-nums ${complete ? "text-emerald-600" : "text-red-600"}`}>
          {shown}% Completed
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="relative h-2.5 w-full rounded-full bg-white shadow-inner ring-1 ring-red-100"
      >
        <motion.div
          initial={{ width: reduceMotion ? `${percent}%` : 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, delay, ease: EASE_OUT }}
          className={`relative h-full overflow-hidden rounded-full ${
            complete
              ? "bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.45)]"
              : "bg-gradient-to-r from-rose-400 via-red-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.45)]"
          }`}
        >
          {/* Light sweep travelling along the filled part */}
          {!reduceMotion && percent > 0 && (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              initial={{ left: "-35%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut", delay: delay + 1 }}
            />
          )}
        </motion.div>

        {/* Glowing knob riding the end of the fill */}
        {percent > 0 && (
          <motion.span
            aria-hidden
            initial={{ left: reduceMotion ? `${percent}%` : "0%" }}
            animate={{ left: `${percent}%` }}
            transition={{ duration: 1, delay, ease: EASE_OUT }}
            className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white shadow-md ${
              complete ? "border-emerald-500" : "border-red-500"
            }`}
          >
            {!reduceMotion && !complete && (
              <span className="absolute inset-0 -m-[3px] animate-ping rounded-full bg-red-400/40" />
            )}
          </motion.span>
        )}
      </div>
    </div>
  );
}
