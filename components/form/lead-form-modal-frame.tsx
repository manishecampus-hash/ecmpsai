"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

export default function LeadFormModalFrame({
  children,
  onClose,
  title,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto px-3 py-4 backdrop-blur-[2px] sm:px-6 sm:py-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      <motion.span
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 32, 0],
                y: [0, -24, 0],
                opacity: [0.42, 0.78, 0.42],
                scale: [0.92, 1.08, 0.92],
              }
        }
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute -left-24 top-[12%] h-80 w-80 rounded-full bg-red-600/30 blur-3xl"
      />
      <motion.span
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -28, 0],
                y: [0, 28, 0],
                opacity: [0.34, 0.66, 0.34],
                scale: [1.04, 0.9, 1.04],
              }
        }
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute -right-24 bottom-[8%] h-96 w-96 rounded-full bg-rose-500/25 blur-3xl"
      />
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 grid max-h-[94vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.32)] md:max-h-[90vh] md:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reserved visual panel for a course or university image. */}
        <div aria-hidden="true" data-course-image-placeholder className="hidden bg-[#fffafa] md:block" />
        <div className="relative min-h-0 overflow-y-auto bg-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
