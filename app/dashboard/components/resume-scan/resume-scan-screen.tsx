"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  FileText,
  Sparkles,
  Check,
  Target,
  ArrowRight,
  Trophy,
  GraduationCap,
  IndianRupee,
} from "lucide-react";

const SCAN_STEPS = [
  "Reading document structure",
  "Extracting skills & experience",
  "Matching to top online programs",
  "Calculating scholarship eligibility",
];

const SCAN_RESULTS = [
  { icon: Target, label: "Profile Match", value: "96%" },
  { icon: GraduationCap, label: "Programs Matched", value: "14" },
  { icon: IndianRupee, label: "Scholarship Unlocked", value: "₹25,000" },
];

const STEP_INTERVAL_MS = 900;
const STEP_START_DELAY_MS = 600;

interface ResumeScanScreenProps {
  file: File | null;
  onClose: () => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeScanScreen({ file, onClose }: ResumeScanScreenProps) {
  const isOpen = !!file;
  const [phase, setPhase] = useState<"scanning" | "complete">("scanning");
  const [doneSteps, setDoneSteps] = useState<boolean[]>(SCAN_STEPS.map(() => false));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    if (!isOpen) return;

    setPhase("scanning");
    setDoneSteps(SCAN_STEPS.map(() => false));

    SCAN_STEPS.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setDoneSteps((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        STEP_START_DELAY_MS + i * STEP_INTERVAL_MS,
      );
      timers.current.push(t);
    });

    const finishDelay = STEP_START_DELAY_MS + SCAN_STEPS.length * STEP_INTERVAL_MS + 500;
    timers.current.push(setTimeout(() => setPhase("complete"), finishDelay));

    return clearTimers;
  }, [isOpen, file]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSkip = () => {
    clearTimers();
    setDoneSteps(SCAN_STEPS.map(() => true));
    setPhase("complete");
  };

  const totalDuration = (STEP_START_DELAY_MS + SCAN_STEPS.length * STEP_INTERVAL_MS + 500) / 1000;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[85] overflow-y-auto bg-gradient-to-br from-red-50 via-white to-rose-50"
          role="dialog"
          aria-modal="true"
          aria-label="AI resume analysis"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 sm:right-6 sm:top-6"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex min-h-full items-center justify-center p-5 py-16 sm:p-8">
            <div className="w-full max-w-md text-center">
              <AnimatePresence mode="wait">
                {phase === "scanning" ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                      <Sparkles className="h-3.5 w-3.5" />
                      AI RESUME ANALYSIS
                    </span>

                    {/* Scanning visual */}
                    <div className="relative mx-auto mt-8 h-40 w-40">
                      <motion.span
                        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-red-200"
                      />
                      <span className="absolute inset-3 rounded-full border-2 border-dashed border-red-300" />

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-3 rounded-full"
                        style={{
                          background:
                            "conic-gradient(from 0deg, rgba(220,38,38,0) 0deg, rgba(220,38,38,0.55) 55deg, rgba(220,38,38,0) 110deg)",
                        }}
                      />

                      <div className="absolute inset-8 flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">
                        <FileText className="h-10 w-10 text-red-300" strokeWidth={1.5} />
                        <motion.div
                          animate={{ y: ["-120%", "120%"] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-red-400/40 to-transparent"
                        />
                      </div>

                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.6, 1, 0.6],
                            x: [0, (i - 1) * 26, 0],
                            y: [0, -46 - i * 6, 0],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                          className="absolute left-1/2 top-1/2 text-red-400"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </motion.span>
                      ))}
                    </div>

                    <h1 className="mt-6 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                      AI is reviewing your resume...
                    </h1>
                    <p className="mx-auto mt-1.5 max-w-[340px] text-sm leading-relaxed text-gray-500">
                      Our AI is scanning your skills and experience to match you
                      with the right programs and scholarships.
                    </p>

                    {file && (
                      <div className="mx-auto mt-4 flex max-w-[300px] items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-left shadow-sm">
                        <FileText className="h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-700">
                          {file.name}
                        </span>
                        <span className="flex-shrink-0 text-[11px] text-gray-400">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="mx-auto mt-5 h-1.5 w-full max-w-[320px] overflow-hidden rounded-full bg-red-100">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: totalDuration, ease: "linear" }}
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-600"
                      />
                    </div>

                    {/* Step checklist */}
                    <div className="mx-auto mt-6 flex w-full max-w-[320px] flex-col gap-2.5 text-left">
                      {SCAN_STEPS.map((step, i) => {
                        const done = doneSteps[i];
                        return (
                          <div key={step} className="flex items-center gap-2.5">
                            <span
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                                done ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500"
                              }`}
                            >
                              {done ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <motion.span
                                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="flex"
                                >
                                  <Target className="h-3.5 w-3.5" />
                                </motion.span>
                              )}
                            </span>
                            <span
                              className={`text-sm ${done ? "text-gray-700" : "text-gray-500"}`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={handleSkip}
                      className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Skip animation
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 16 }}
                      className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/60"
                    >
                      <Trophy className="h-9 w-9 text-green-600" />
                    </motion.div>

                    <h1 className="mt-5 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                      Your AI Match Report is Ready!
                    </h1>
                    <p className="mx-auto mt-1.5 max-w-[340px] text-sm leading-relaxed text-gray-500">
                      {file?.name ? `We've analyzed ${file.name} and found strong matches for your profile.` : "We've analyzed your resume and found strong matches for your profile."}
                    </p>

                    <div className="mx-auto mt-6 grid max-w-[380px] grid-cols-3 gap-3">
                      {SCAN_RESULTS.map((r, i) => {
                        const Icon = r.icon;
                        return (
                          <motion.div
                            key={r.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.1 }}
                            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-base font-bold text-gray-900">{r.value}</span>
                            <span className="text-center text-[11px] leading-tight text-gray-500">
                              {r.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mx-auto mt-7 flex h-12 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 sm:h-14"
                    >
                      Continue to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
