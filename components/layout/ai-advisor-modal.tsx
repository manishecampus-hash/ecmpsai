"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/app/dashboard/components/sidebar";
import Topbar from "@/app/dashboard/components/topbar";
import WelcomeBanner from "@/app/dashboard/components/welcome-banner";
import StatsCards from "@/app/dashboard/components/stats-cards";
import Recommendations from "@/app/dashboard/components/recommendations";
import Milestones from "@/app/dashboard/components/milestones";
import { X, ArrowLeft, ArrowRight, Sparkles, RefreshCw, Check, Target } from "lucide-react";
import {
  BUDGET_OPTIONS,
  CATEGORY_OPTIONS,
  CURRENT_SALARY_OPTIONS,
  EMPLOYMENT_OPTIONS,
  EMPTY_ONBOARDING,
  ONBOARDING_STEPS,
  QUALIFICATION_OPTIONS,
  TARGET_SALARY_OPTIONS,
  getCourseOptions,
  isOnboardingComplete,
  isStepComplete,
  type CourseOption,
  type EmploymentStatus,
  type OnboardingData,
  type QualificationId,
} from "./onboarding-options";

// The full answer set handed back to the signup flow when the questionnaire finishes
export type AdvisorAnswers = OnboardingData;

interface AIAdvisorModalProps {
  onClose: () => void;
  onComplete: (answers: AdvisorAnswers) => void;
}

const analysisChecklist = [
  "Mapping Agentic & Tech curricula against career milestones",
  "Evaluating UGC, NAAC A++ accreditation and industry labs",
  "Calculating monthly EMI, scholarships & projected salary growth...",
];

type WizardStep = 1 | 2 | 3 | 4 | 5;
// Short pause after a pick so the selected card is visible before moving on
const AUTO_ADVANCE_DELAY = 400;
type Phase = "wizard" | "analysis";
const TOTAL_STEPS = ONBOARDING_STEPS.length;

const STEP_COPY: Record<WizardStep, { title: string; subtitle: string }> = {
  1: { title: "What is your highest completed qualification?", subtitle: "We'll show programs you're eligible for" },
  2: { title: "What would you like to pursue?", subtitle: "Programs matched to your qualification" },
  3: { title: "What is your budget?", subtitle: "Total programme fee you're comfortable with" },
  4: { title: "Please tell us your current vs targeted salary", subtitle: "Helps us estimate the return on your degree" },
  5: {
    title: "Do you belong to any one of the categories?",
    subtitle: "Special scholarships are available for these categories",
  },
};

/* ─────────────── Reusable selection card ─────────────── */
function ChoiceCard({
  selected,
  onSelect,
  title,
  subtitle,
  emphasis = false,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  /** Larger title for course abbreviations (BCA, MBA…) */
  emphasis?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group flex h-full w-full items-start gap-3.5 rounded-2xl border px-4 py-4 text-left transition-all duration-200 sm:px-5 sm:py-[18px] ${
        selected
          ? "border-red-500 bg-red-50/60 shadow-sm ring-1 ring-red-200"
          : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-red-600" : "border-gray-300 group-hover:border-red-300"
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full bg-red-600 transition-transform duration-200 ${
            selected ? "scale-100" : "scale-0"
          }`}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block break-words font-semibold leading-snug ${
            emphasis ? "text-base sm:text-lg" : "text-sm sm:text-[15px]"
          } ${selected ? "text-gray-900" : "text-gray-800"}`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="mt-1 block break-words text-xs leading-5 text-gray-500 sm:text-[13px]">{subtitle}</span>
        )}
      </span>
    </button>
  );
}

function OptionGrid({ children, columns = "sm:grid-cols-2 lg:grid-cols-3" }: { children: React.ReactNode; columns?: string }) {
  return (
    <div role="radiogroup" className={`grid grid-cols-1 gap-3 sm:gap-4 ${columns}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-wider text-red-600 sm:text-sm">{children}</p>;
}

/* ─────────────── Step 2: programmes, grouped when the config groups them ─────────────── */
function CourseStep({
  courses,
  selected,
  onSelect,
}: {
  courses: CourseOption[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
        Select your qualification first to see the programs available to you.
      </div>
    );
  }

  const groups = courses.reduce<{ name: string; items: CourseOption[] }[]>((acc, c) => {
    const name = c.group ?? "";
    const existing = acc.find((g) => g.name === name);
    if (existing) existing.items.push(c);
    else acc.push({ name, items: [c] });
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.name || "all"}>
          {g.name && <SectionLabel>{g.name}</SectionLabel>}
          <OptionGrid>
            {g.items.map((c) => (
              <ChoiceCard
                key={c.id}
                selected={selected === c.id}
                onSelect={() => onSelect(c.id)}
                title={c.name}
                subtitle={c.fullName}
                emphasis
              />
            ))}
          </OptionGrid>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Step 4: working status + salary ─────────────── */
function SalaryStep({
  data,
  onEmployment,
  onCurrent,
  onTarget,
}: {
  data: OnboardingData;
  onEmployment: (s: EmploymentStatus) => void;
  onCurrent: (id: string) => void;
  onTarget: (id: string) => void;
}) {
  const working = data.employmentStatus === "working";

  const targetColumn = (
    <div>
      <SectionLabel>Target Salary</SectionLabel>
      <div role="radiogroup" className="flex flex-col gap-3">
        {TARGET_SALARY_OPTIONS.map((o) => (
          <ChoiceCard key={o.id} selected={data.targetSalary === o.id} onSelect={() => onTarget(o.id)} title={o.label} />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Employment status" className="inline-flex rounded-full bg-red-50 p-1.5">
          {EMPLOYMENT_OPTIONS.map((o) => {
            const active = data.employmentStatus === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onEmployment(o.id)}
                className={`min-w-[120px] rounded-full px-6 py-2.5 text-sm font-semibold transition-all sm:min-w-[150px] sm:text-base ${
                  active ? "bg-white text-red-600 shadow-sm" : "text-red-500/80 hover:text-red-600"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyed views fade in on switch — no exit wait, so the salary options appear instantly */}
      {!data.employmentStatus ? (
          <p className="mt-8 text-center text-sm text-gray-500">Choose your current status to continue.</p>
        ) : working ? (
          <motion.div
            key="working"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-6"
          >
            <div>
              <SectionLabel>Current Salary</SectionLabel>
              <div role="radiogroup" className="flex flex-col gap-3">
                {CURRENT_SALARY_OPTIONS.map((o) => (
                  <ChoiceCard key={o.id} selected={data.currentSalary === o.id} onSelect={() => onCurrent(o.id)} title={o.label} />
                ))}
              </div>
            </div>
            {targetColumn}
          </motion.div>
        ) : (
          <motion.div
            key="non-working"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-8 max-w-md"
          >
            {targetColumn}
          </motion.div>
        )}
    </div>
  );
}

/* ─────────────── 5-step progress indicator ─────────────── */
function StepProgress({ step }: { step: WizardStep }) {
  return (
    <ol className="flex items-center gap-1.5 sm:gap-2">
      {ONBOARDING_STEPS.map((s, i) => {
        const done = s.id < step;
        const current = s.id === step;
        return (
          <li key={s.id} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <span className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                  done
                    ? "bg-red-600 text-white"
                    : current
                      ? "bg-white text-red-600 ring-2 ring-red-600"
                      : "bg-gray-100 text-gray-400"
                }`}
                aria-current={current ? "step" : undefined}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.id}
              </span>
              <span
                className={`hidden whitespace-nowrap text-xs font-semibold md:inline ${
                  current ? "text-gray-900" : done ? "text-red-600" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </span>
            {i < ONBOARDING_STEPS.length - 1 && (
              <span className={`h-0.5 flex-1 rounded-full ${done ? "bg-red-600" : "bg-gray-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function AIAdvisorModal({ onClose, onComplete }: AIAdvisorModalProps) {
  const [phase, setPhase] = useState<Phase>("wizard");
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING);

  const [checklistDone, setChecklistDone] = useState<boolean[]>(analysisChecklist.map(() => false));

  // Latest answers for the delayed "analysis finished" timer (avoids a stale closure)
  const dataRef = useRef<OnboardingData>(EMPTY_ONBOARDING);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const analysisTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Set when the student picks an option; the effect below moves on once the step is complete.
  // Only real picks set it, so returning to a finished step with Back never auto-skips it.
  const advanceRequested = useRef(false);

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      analysisTimers.current.forEach((t) => clearTimeout(t));
      clearAdvanceTimer();
    };
  }, []);

  const goToStep = (next: WizardStep) => {
    clearAdvanceTimer();
    setDirection(next > step ? 1 : -1);
    setStep(next);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  /* ── field updates ── */
  const setQualification = (q: QualificationId) => {
    advanceRequested.current = true;
    setData((prev) => {
      // Keep the course only if it's still offered for the new qualification
      const stillValid = getCourseOptions(q).some((c) => c.id === prev.coursePreference);
      return { ...prev, highestQualification: q, coursePreference: stillValid ? prev.coursePreference : "" };
    });
  };

  const setEmployment = (s: EmploymentStatus) =>
    setData((prev) => ({
      ...prev,
      employmentStatus: s,
      // Non-working students have no current salary; target salary is kept either way
      currentSalary: s === "working" ? prev.currentSalary : "",
    }));

  const setField = (key: keyof OnboardingData) => (value: string) => {
    advanceRequested.current = true;
    setData((prev) => ({ ...prev, [key]: value }));
  };

  /* ── existing calculating popup, now triggered after step 5 ── */
  const startAnalysis = () => {
    setDirection(1);
    setPhase("analysis");

    analysisChecklist.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setChecklistDone((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        700 + i * 900,
      );
      analysisTimers.current.push(t);
    });

    const finishDelay = 700 + analysisChecklist.length * 900 + 700;
    const finishTimer = setTimeout(() => {
      onComplete({ ...dataRef.current });
    }, finishDelay);
    analysisTimers.current.push(finishTimer);
  };

  const skipAnimation = () => {
    analysisTimers.current.forEach((t) => clearTimeout(t));
    analysisTimers.current = [];
    setChecklistDone(analysisChecklist.map(() => true));
    onComplete({ ...dataRef.current });
  };

  // Auto-advance: after a pick, move on as soon as the current step is complete
  // (step 4 needs both salaries when working). The last step starts the analysis.
  useEffect(() => {
    if (!advanceRequested.current || phase !== "wizard") return;
    advanceRequested.current = false;
    if (!isStepComplete(step, data)) return;

    clearAdvanceTimer();
    advanceTimer.current = setTimeout(() => {
      if (step < TOTAL_STEPS) {
        goToStep((step + 1) as WizardStep);
        return;
      }
      // Final guard: never start the analysis with incomplete answers
      if (!isOnboardingComplete(dataRef.current)) {
        const firstIncomplete = ([1, 2, 3, 4, 5] as WizardStep[]).find((st) => !isStepComplete(st, dataRef.current));
        if (firstIncomplete) goToStep(firstIncomplete);
        return;
      }
      startAnalysis();
    }, AUTO_ADVANCE_DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleBack = () => {
    if (step === 1) return;
    goToStep((step - 1) as WizardStep);
  };

  const copy = STEP_COPY[step];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OptionGrid>
            {QUALIFICATION_OPTIONS.map((o) => (
              <ChoiceCard
                key={o.id}
                selected={data.highestQualification === o.id}
                onSelect={() => setQualification(o.id)}
                title={o.label}
                subtitle={o.description}
                emphasis
              />
            ))}
          </OptionGrid>
        );
      case 2:
        return (
          <CourseStep
            courses={getCourseOptions(data.highestQualification)}
            selected={data.coursePreference}
            onSelect={setField("coursePreference")}
          />
        );
      case 3:
        return (
          <OptionGrid>
            {BUDGET_OPTIONS.map((o) => (
              <ChoiceCard
                key={o.id}
                selected={data.budget === o.id}
                onSelect={() => setField("budget")(o.id)}
                title={o.label}
                emphasis
              />
            ))}
          </OptionGrid>
        );
      case 4:
        return (
          <SalaryStep
            data={data}
            onEmployment={setEmployment}
            onCurrent={setField("currentSalary")}
            onTarget={setField("targetSalary")}
          />
        );
      case 5:
        return (
          <OptionGrid>
            {CATEGORY_OPTIONS.map((o) => (
              <ChoiceCard
                key={o.id}
                selected={data.category === o.id}
                onSelect={() => setField("category")(o.id)}
                title={o.label}
                subtitle={o.description}
              />
            ))}
          </OptionGrid>
        );
    }
  };

  return (
    <>
      {/* Backdrop — a blurred, non-interactive preview of the dashboard the
          student is about to land on, instead of a flat dark overlay. */}
      <div className="fixed inset-0 z-[75] overflow-hidden" onClick={onClose}>
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none blur-sm">
          <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
            <Sidebar mobileOpen={false} onClose={() => {}} />
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <Topbar student={{}} onOpenMobileMenu={() => {}} />
              <main className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-4 sm:p-6">
                <WelcomeBanner student={{}} onResumeSelected={() => {}} />
                <StatsCards />
                <Recommendations />
                <Milestones />
              </main>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-[75] overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <div
            className={`relative flex max-h-[calc(100dvh_-_1rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-[max-width] duration-300 sm:max-h-[calc(100dvh_-_2rem)] ${
              phase === "analysis" ? "max-w-[440px] sm:max-w-[480px]" : "max-w-[1140px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex-shrink-0 border-b border-gray-100 bg-white px-5 pb-4 pt-4 sm:px-8">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-base">
                    eCampus AI Smart Advisor
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:inline-flex">
                    <Sparkles className="h-3 w-3" />
                    AI Degree Matcher
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {phase === "wizard" && (
                    <span className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      Step {step} of {TOTAL_STEPS}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {phase === "wizard" && (
                <div className="mt-4">
                  <StepProgress step={step} />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 h-[3px] translate-y-full overflow-hidden bg-red-100">
                <motion.div
                  initial={false}
                  animate={{ width: `${phase === "analysis" ? 100 : ((step - 1) / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full rounded-r-full bg-red-600"
                />
              </div>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {phase === "wizard" ? (
                  <motion.div
                    key={`step-${step}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -24 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
                      <h2 className="text-xl font-bold leading-snug text-gray-900 sm:text-[28px]">{copy.title}</h2>
                      <p className="mt-1.5 text-sm text-gray-500">{copy.subtitle}</p>
                    </div>
                    {renderStep()}
                  </motion.div>
                ) : (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="mb-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                        className="flex"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </motion.span>
                    </span>

                    <h2 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                      Analyzing 500+ Programs &amp; Universities...
                    </h2>
                    <p className="mx-auto mt-1.5 max-w-[320px] text-xs text-gray-500 sm:text-sm">
                      Our AI counselor is scoring course syllabi, faculty expertise, hands-on labs, and placement
                      ROI.
                    </p>

                    <div className="mt-4 flex w-full flex-shrink-0 flex-col gap-2.5 text-left">
                      {analysisChecklist.map((item, i) => {
                        const done = checklistDone[i];
                        return (
                          <div key={item} className="flex items-center gap-2.5">
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
                            <span className={`text-xs sm:text-sm ${done ? "text-gray-700" : "text-gray-500"}`}>
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={skipAnimation}
                      className="mb-1 mt-4 flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Click here to skip animation
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            {phase === "wizard" && (
              <div className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-gray-100 bg-white px-5 py-3.5 sm:px-8 sm:py-4">
                {/* No Back on the first question — hidden (not removed) so the layout stays steady */}
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  aria-hidden={step === 1}
                  tabIndex={step === 1 ? -1 : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-500 transition hover:text-gray-800 ${
                    step === 1 ? "invisible" : ""
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <span className="text-xs text-gray-400 sm:text-sm">
                  {step === 4 ? "Select your salary details to continue" : "Tap an option to continue"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
