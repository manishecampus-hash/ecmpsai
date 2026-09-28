"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, MotionConfig, animate, motion } from "framer-motion";
import {
  X,
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  GraduationCap,
  IndianRupee,
  Lock,
  Loader2,
  Briefcase,
  Award,
  BookOpen,
  Wrench,
} from "lucide-react";
import { EASE_OUT } from "../motion";

const SCAN_STEPS = [
  { title: "Reading document structure", detail: "Parsing layout, sections and formatting" },
  { title: "Extracting skills & experience", detail: "Identifying roles, tools and achievements" },
  { title: "Matching to top online programs", detail: "Comparing against accredited online programs" },
  { title: "Calculating scholarship eligibility", detail: "Checking merit & need-based waivers" },
];

// Resume sections "detected" on the preview as the scan progresses (one per step)
const DETECTED_SECTIONS = [
  { icon: BookOpen, label: "Education" },
  { icon: Briefcase, label: "Experience" },
  { icon: Wrench, label: "Skills" },
  { icon: Award, label: "Certifications" },
];

const MATCH_SCORE = 96;

const SCAN_RESULTS = [
  { icon: GraduationCap, label: "Programs matched", value: "14", tone: "bg-blue-50 text-blue-600" },
  { icon: IndianRupee, label: "Scholarship unlocked", value: "₹25,000", tone: "bg-emerald-50 text-emerald-600" },
  { icon: Sparkles, label: "AI Readiness score", value: "94/100", tone: "bg-amber-50 text-amber-600" },
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

function fileExtension(name?: string) {
  return name?.split(".").pop()?.toUpperCase() || "PDF";
}

/* ---------- Scanning: mock resume page with a sweeping scan beam ---------- */
function ResumePreview({ doneCount }: { doneCount: number }) {
  // Skeleton rows grouped into the four sections; a section lights up once its step completes
  const sections = [
    [92, 78, 64],
    [88, 95, 70, 82],
    [60, 74, 52],
    [80, 66],
  ];

  return (
    <div className="mx-auto w-full max-w-[200px] sm:max-w-[260px]">
      <div className="relative">
      {/* Back sheet for depth */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl bg-white/60 shadow-sm" />

      <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-4 shadow-xl shadow-red-900/10 sm:p-5">
        {/* Header: avatar + name lines */}
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-red-100 to-rose-200" />
          <div className="flex-1 space-y-1.5">
            <span className="block h-2.5 w-3/4 rounded-full bg-slate-800/80" />
            <span className="block h-2 w-1/2 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mt-4 space-y-3.5">
          {sections.map((rows, si) => {
            const detected = si < doneCount;
            return (
              <div
                key={si}
                className={`relative rounded-lg p-1.5 transition-colors duration-500 ${
                  detected ? "bg-red-50/70" : ""
                }`}
              >
                <span
                  className={`mb-1.5 block h-2 w-16 rounded-full transition-colors duration-500 ${
                    detected ? "bg-red-400" : "bg-slate-300"
                  }`}
                />
                <div className="space-y-1">
                  {rows.map((w, ri) => (
                    <span
                      key={ri}
                      style={{ width: `${w}%` }}
                      className={`block h-1.5 rounded-full transition-colors duration-500 ${
                        detected ? "bg-red-200" : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
                {detected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600"
                  >
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>

        {/* Scan beam */}
        <motion.div
          aria-hidden
          animate={{ top: ["-15%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          className="pointer-events-none absolute inset-x-0 h-16"
        >
          <div className="h-full bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-red-500/70 shadow-[0_0_12px_2px_rgba(239,68,68,0.45)]" />
        </motion.div>
      </div>
      </div>

      {/* Detected section chips */}
      <div className="mt-6 hidden min-h-[64px] flex-wrap justify-center gap-2 sm:flex">
        <AnimatePresence>
          {DETECTED_SECTIONS.slice(0, doneCount).map(({ icon: Icon, label }) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-white px-2.5 py-1 text-[11px] font-semibold text-red-600 shadow-sm"
            >
              <Icon className="h-3 w-3" />
              {label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Complete: animated match-score ring ---------- */
function ScoreRing({ score }: { score: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.2,
      delay: 0.2,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [score]);

  const r = 52;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-red-100" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="url(#score-gradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
        />
        <defs>
          <linearGradient id="score-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black tabular-nums text-slate-900">{shown}%</span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Match
        </span>
      </div>
    </div>
  );
}

export default function ResumeScanScreen({ file, onClose }: ResumeScanScreenProps) {
  const router = useRouter();
  const isOpen = !!file;
  const [phase, setPhase] = useState<"scanning" | "complete">("scanning");
  const [doneSteps, setDoneSteps] = useState<boolean[]>(SCAN_STEPS.map(() => false));
  const [progress, setProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const progressAnim = useRef<ReturnType<typeof animate> | null>(null);

  const totalDuration = (STEP_START_DELAY_MS + SCAN_STEPS.length * STEP_INTERVAL_MS + 500) / 1000;

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    progressAnim.current?.stop();
  };

  useEffect(() => {
    if (!isOpen) return;

    setPhase("scanning");
    setDoneSteps(SCAN_STEPS.map(() => false));
    setProgress(0);

    progressAnim.current = animate(0, 100, {
      duration: totalDuration,
      ease: "linear",
      onUpdate: (v) => setProgress(Math.round(v)),
    });

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

    timers.current.push(setTimeout(() => setPhase("complete"), totalDuration * 1000));

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, file]);

  // Escape closes; the dashboard behind shouldn't scroll while the overlay is up
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSkip = () => {
    clearTimers();
    setDoneSteps(SCAN_STEPS.map(() => true));
    setProgress(100);
    setPhase("complete");
  };

  const doneCount = doneSteps.filter(Boolean).length;
  const activeIndex = doneSteps.findIndex((d) => !d);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[85] overflow-y-auto bg-slate-900/30 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="AI resume analysis"
          >
            <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20"
              >
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:bg-white hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>

                <AnimatePresence mode="wait" initial={false}>
                  {phase === "scanning" ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="grid md:grid-cols-[0.95fr_1.05fr]"
                    >
                      {/* Left: live document preview */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 px-6 pb-7 pt-12 md:px-10 md:py-12">
                        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-red-200/40 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />
                        <div className="relative">
                          <ResumePreview doneCount={doneCount} />
                        </div>
                      </div>

                      {/* Right: status + step timeline */}
                      <div className="flex flex-col p-6 sm:p-8 md:p-10">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
                          <Sparkles className="h-3.5 w-3.5" />
                          AI Resume Analysis
                        </span>

                        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-[28px] sm:leading-tight">
                          Analyzing your resume
                        </h1>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          We&apos;re mapping your skills and experience to the programs and
                          scholarships you qualify for.
                        </p>

                        {file && (
                          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                            <span className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                              <FileText className="h-4 w-4" />
                              <span className="text-[8px] font-bold leading-none">
                                {fileExtension(file.name)}
                              </span>
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {formatFileSize(file.size)} · Uploaded just now
                              </p>
                            </div>
                            <span className="flex-shrink-0 text-sm font-bold tabular-nums text-red-600">
                              {progress}%
                            </span>
                          </div>
                        )}

                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-600 transition-[width] duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Step timeline */}
                        <ol className="mt-6 space-y-0">
                          {SCAN_STEPS.map((step, i) => {
                            const done = doneSteps[i];
                            const active = i === activeIndex;
                            const isLast = i === SCAN_STEPS.length - 1;
                            return (
                              <li key={step.title} className="relative flex gap-3.5 pb-5 last:pb-0">
                                {!isLast && (
                                  <span className="absolute left-[13px] top-7 h-[calc(100%-24px)] w-0.5 overflow-hidden rounded-full bg-slate-100">
                                    <motion.span
                                      initial={false}
                                      animate={{ height: done ? "100%" : "0%" }}
                                      transition={{ duration: 0.4, ease: EASE_OUT }}
                                      className="block w-full bg-emerald-400"
                                    />
                                  </span>
                                )}
                                <span
                                  className={`relative z-[1] flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                    done
                                      ? "bg-emerald-500 text-white"
                                      : active
                                        ? "bg-red-50 text-red-600 ring-2 ring-red-200"
                                        : "bg-slate-100 text-slate-400"
                                  }`}
                                >
                                  {done ? (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                      className="flex"
                                    >
                                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    </motion.span>
                                  ) : active ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <span className="text-[11px] font-bold">{i + 1}</span>
                                  )}
                                </span>
                                <div className="min-w-0 pt-0.5">
                                  <p
                                    className={`text-sm font-semibold transition-colors ${
                                      done || active ? "text-slate-900" : "text-slate-400"
                                    }`}
                                  >
                                    {step.title}
                                  </p>
                                  <p
                                    className={`mt-0.5 text-xs transition-colors ${
                                      active ? "text-red-500" : done ? "text-slate-500" : "text-slate-300"
                                    }`}
                                  >
                                    {done ? "Completed" : step.detail}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ol>

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 md:mt-8">
                          <p className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Lock className="h-3.5 w-3.5" />
                            Encrypted & never shared
                          </p>
                          <button
                            type="button"
                            onClick={handleSkip}
                            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            Skip
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid md:grid-cols-[0.95fr_1.05fr]"
                    >
                      {/* Left: score */}
                      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 px-6 pb-8 pt-14 text-center md:px-10 md:py-12">
                        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-red-200/40 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />
                        <div className="relative flex flex-col items-center">
                          <div className="rounded-full bg-white p-3 shadow-xl shadow-red-900/10">
                            <ScoreRing score={MATCH_SCORE} />
                          </div>
                          <p className="mt-5 text-sm font-bold text-slate-900">Excellent profile match</p>
                          <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-slate-500">
                            Your skills and goals align closely with the programs you&apos;re targeting.
                          </p>
                        </div>
                      </div>

                      {/* Right: summary + actions */}
                      <div className="flex flex-col p-6 sm:p-8 md:p-10">
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          Analysis complete
                        </motion.span>

                        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-[28px] sm:leading-tight">
                          Your AI Match Report is ready
                        </h1>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          {file?.name ? (
                            <>
                              We analyzed <span className="font-semibold text-slate-700">{file.name}</span> and
                              found strong matches for your profile.
                            </>
                          ) : (
                            "We analyzed your resume and found strong matches for your profile."
                          )}
                        </p>

                        <div className="mt-6 space-y-2.5">
                          {SCAN_RESULTS.map((r, i) => {
                            const Icon = r.icon;
                            return (
                              <motion.div
                                key={r.label}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.08, duration: 0.35, ease: EASE_OUT }}
                                className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm"
                              >
                                <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${r.tone}`}>
                                  <Icon className="h-[18px] w-[18px]" />
                                </span>
                                <span className="flex-1 text-sm text-slate-500">{r.label}</span>
                                <span className="text-base font-bold text-slate-900">{r.value}</span>
                              </motion.div>
                            );
                          })}
                        </div>

                        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              router.push("/dashboard/matcher");
                            }}
                            className="flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700 active:scale-[0.98]"
                          >
                            View My Matches
                            <ArrowRight className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={onClose}
                            className="flex h-12 items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                          >
                            Back to Dashboard
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
