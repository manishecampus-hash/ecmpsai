"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Check,
  Target,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Wallet,
  TrendingUp,
  Award,
  type LucideIcon,
} from "lucide-react";
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

export interface AIAdvisorModalProps {
  onClose: () => void;
  onComplete: (answers: AdvisorAnswers) => void;
  initialAnswers?: Partial<OnboardingData> | null;
  initialStep?: 1 | 2 | 3 | 4 | 5;
  isEditing?: boolean;
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

const STEP_COPY: Record<WizardStep, { title: string; icon: LucideIcon }> = {
  1: { title: "What's your highest completed qualification?", icon: GraduationCap },
  2: { title: "What would you like to pursue?", icon: BookOpen },
  3: { title: "What's your budget?", icon: Wallet },
  4: { title: "Please tell us your current vs targeted salary", icon: TrendingUp },
  5: { title: "Do you belong to any one of the categories?", icon: Award },
};

/* ─────────────── Reusable selection row ─────────────── */
function ChoiceCard({
  selected,
  onSelect,
  title,
  subtitle,
  emphasis = false,
  index = 0,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  /** Slightly larger title for short names (BCA, MBA…) */
  emphasis?: boolean;
  /** Position in its list — staggers the entrance */
  index?: number;
}) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 + index * 0.04 }}
      whileTap={{ scale: 0.985 }}
      className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
        selected
          ? "border-red-500 bg-red-50/70 ring-1 ring-red-200"
          : "border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/30"
      }`}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-red-600 bg-red-600" : "border-gray-300 group-hover:border-red-300"
        }`}
      >
        <Check
          className={`h-3 w-3 text-white transition-transform duration-200 ${selected ? "scale-100" : "scale-0"}`}
          strokeWidth={3.5}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block break-words font-semibold leading-snug ${
            emphasis ? "text-[15px]" : "text-sm"
          } ${selected ? "text-red-700" : "text-gray-800"}`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 block break-words text-xs leading-5 text-gray-500">{subtitle}</span>
        )}
      </span>
      <ChevronRight
        className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
          selected ? "translate-x-0 text-red-500" : "-translate-x-1 text-gray-300 group-hover:translate-x-0 group-hover:text-red-400"
        }`}
      />
    </motion.button>
  );
}

// One option per row, in a comfortable reading width
function OptionList({ children }: { children: React.ReactNode }) {
  return (
    <div role="radiogroup" className="mx-auto flex w-full max-w-[460px] flex-col gap-2.5">
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-red-600">{children}</p>;
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
          {g.name && (
            <div className="mx-auto max-w-[460px]">
              <SectionLabel>{g.name}</SectionLabel>
            </div>
          )}
          <OptionList>
            {g.items.map((c, i) => (
              <ChoiceCard
                key={c.id}
                selected={selected === c.id || selected === c.name || selected === c.fullName}
                onSelect={() => onSelect(c.id)}
                title={c.name}
                emphasis
                index={i}
              />
            ))}
          </OptionList>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Step 4: working status + salary ─────────────── */
const SALARY_COLUMN_EASE = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

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
      <div role="radiogroup" className="flex flex-col gap-2.5">
        {TARGET_SALARY_OPTIONS.map((o, i) => (
          <ChoiceCard key={o.id} selected={data.targetSalary === o.id} onSelect={() => onTarget(o.id)} title={o.label} index={i} />
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
                className={`relative min-w-[120px] rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 sm:min-w-[140px] ${
                  active ? "text-red-600" : "text-red-500/80 hover:text-red-600"
                }`}
              >
                {/* white pill glides to the chosen option */}
                {active && (
                  <motion.span
                    layoutId="employment-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}
                <span className="relative">{o.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyed views animate in on switch — no exit wait, so the salary options appear instantly.
          Columns glide in from their side while the rows stagger in like every other step. */}
      {!data.employmentStatus ? null : working ? (
          <motion.div
            key="working"
            className="mx-auto mt-7 grid max-w-[720px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-5"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={SALARY_COLUMN_EASE}
            >
              <SectionLabel>Current Salary</SectionLabel>
              <div role="radiogroup" className="flex flex-col gap-2.5">
                {CURRENT_SALARY_OPTIONS.map((o, i) => (
                  <ChoiceCard key={o.id} selected={data.currentSalary === o.id} onSelect={() => onCurrent(o.id)} title={o.label} index={i} />
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...SALARY_COLUMN_EASE, delay: 0.06 }}
            >
              {targetColumn}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="non-working"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SALARY_COLUMN_EASE}
            className="mx-auto mt-7 max-w-[460px]"
          >
            {targetColumn}
          </motion.div>
        )}
    </div>
  );
}

/* ─────────────── 5-step progress indicator ─────────────── */
function StepProgress({
  step,
  onSelectStep,
  data,
  isEditing,
}: {
  step: WizardStep;
  onSelectStep?: (s: WizardStep) => void;
  data?: OnboardingData;
  isEditing?: boolean;
}) {
  return (
    <ol className="flex items-center gap-1.5 sm:gap-2">
      {ONBOARDING_STEPS.map((s, i) => {
        const done = (data && isStepComplete(s.id, data)) || s.id < step;
        const current = s.id === step;
        const canClick = Boolean(onSelectStep) && (isEditing || done);
        return (
          <li key={s.id} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              disabled={!canClick}
              onClick={() => onSelectStep?.(s.id as WizardStep)}
              className={`flex items-center gap-2 group text-left transition-all ${
                canClick ? "cursor-pointer hover:opacity-85" : "cursor-default"
              }`}
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                  current
                    ? "bg-white text-red-600 ring-2 ring-red-600 shadow-xs"
                    : done
                      ? "bg-red-600 text-white group-hover:scale-105"
                      : "bg-gray-100 text-gray-400"
                }`}
                aria-current={current ? "step" : undefined}
              >
                {done && !current ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.id}
              </span>
              <span
                className={`hidden whitespace-nowrap text-xs font-semibold md:inline ${
                  current ? "text-gray-900" : done ? "text-red-600" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < ONBOARDING_STEPS.length - 1 && (
              <span className={`h-0.5 flex-1 rounded-full ${done ? "bg-red-600" : "bg-gray-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function AIAdvisorModal({
  onClose,
  onComplete,
  initialAnswers,
  initialStep = 1,
  isEditing = false,
}: AIAdvisorModalProps) {
  const [phase, setPhase] = useState<Phase>("wizard");
  const [step, setStep] = useState<WizardStep>(() => {
    if (initialStep && initialStep >= 1 && initialStep <= 5) return initialStep;
    return 1;
  });
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<OnboardingData>(() => ({
    ...EMPTY_ONBOARDING,
    ...(initialAnswers || {}),
  }));

  const [checklistDone, setChecklistDone] = useState<boolean[]>(analysisChecklist.map(() => false));

  // Dynamic options loaded from Admin & Database
  const [dynamicEligibilities, setDynamicEligibilities] = useState<{ id: string; label: string; title: string }[]>([]);
  const [dynamicBudgetRanges, setDynamicBudgetRanges] = useState<{ id: string; name: string; label: string; min: number; max: number }[]>([]);
  const [availableCourses, setAvailableCourses] = useState<CourseOption[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

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

  // Fetch admin root course eligibilities & university course budget ranges
  useEffect(() => {
    let active = true;
    fetch("/api/onboarding/options")
      .then((r) => r.json())
      .then((res) => {
        if (!active || !res?.success) return;
        if (Array.isArray(res.eligibilities) && res.eligibilities.length > 0) {
          setDynamicEligibilities(res.eligibilities);
        }
        if (Array.isArray(res.budgetRanges) && res.budgetRanges.length > 0) {
          setDynamicBudgetRanges(res.budgetRanges);
        }
      })
      .catch((err) => console.error("Error loading onboarding options:", err));
    return () => {
      active = false;
    };
  }, []);

  // Fetch root courses matching the selected qualification
  const fetchCoursesForQualification = useCallback(async (qual: string) => {
    if (!qual) {
      setAvailableCourses([]);
      return;
    }
    setLoadingCourses(true);
    try {
      const res = await fetch(`/api/onboarding/options?eligibility=${encodeURIComponent(qual)}`);
      const json = await res.json();
      if (json?.success && Array.isArray(json.rootCourses) && json.rootCourses.length > 0) {
        setAvailableCourses(json.rootCourses);
      } else {
        setAvailableCourses(getCourseOptions(qual));
      }
    } catch (err) {
      console.error("Error fetching courses for qualification:", err);
      setAvailableCourses(getCourseOptions(qual));
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  // Initial course list fetch if qualification is already selected (e.g. edit mode)
  useEffect(() => {
    if (data.highestQualification) {
      fetchCoursesForQualification(data.highestQualification);
    }
  }, [data.highestQualification, fetchCoursesForQualification]);

  const goToStep = (next: WizardStep) => {
    clearAdvanceTimer();
    setDirection(next > step ? 1 : -1);
    setStep(next);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  /* ── field updates ── */
  const setQualification = (q: string) => {
    advanceRequested.current = true;
    setData((prev) => ({
      ...prev,
      highestQualification: q,
      coursePreference: "", // reset course selection when qualification changes
    }));
    fetchCoursesForQualification(q);
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
      if (isEditing) {
        onComplete({ ...dataRef.current });
      } else {
        startAnalysis();
      }
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
      case 1: {
        const options = dynamicEligibilities.length > 0 ? dynamicEligibilities : QUALIFICATION_OPTIONS;
        return (
          <OptionList>
            {options.map((o, i) => (
              <ChoiceCard
                key={o.id}
                selected={data.highestQualification === o.id || data.highestQualification === o.label}
                onSelect={() => setQualification(o.id || o.label)}
                title={o.label || (o as any).title}
                emphasis
                index={i}
              />
            ))}
          </OptionList>
        );
      }
      case 2: {
        if (loadingCourses) {
          return (
            <div className="flex flex-col items-center justify-center py-12 text-sm text-gray-500">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              <span className="mt-3 font-medium text-gray-600">Loading courses for {data.highestQualification}...</span>
            </div>
          );
        }
        const coursesToShow =
          availableCourses.length > 0
            ? availableCourses
            : getCourseOptions(data.highestQualification);
        return (
          <CourseStep
            courses={coursesToShow}
            selected={data.coursePreference}
            onSelect={setField("coursePreference")}
          />
        );
      }
      case 3: {
        const options = dynamicBudgetRanges.length > 0 ? dynamicBudgetRanges : BUDGET_OPTIONS;
        return (
          <OptionList>
            {options.map((o, i) => {
              const val = (o as any).name || o.label || o.id;
              return (
                <ChoiceCard
                  key={o.id}
                  selected={data.budget === o.id || data.budget === (o as any).name || data.budget === o.label}
                  onSelect={() => setField("budget")(val)}
                  title={o.label || (o as any).name}
                  emphasis
                  index={i}
                />
              );
            })}
          </OptionList>
        );
      }
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
          <OptionList>
            {CATEGORY_OPTIONS.map((o, i) => (
              <ChoiceCard
                key={o.id}
                selected={data.category === o.id}
                onSelect={() => setField("category")(o.id)}
                title={o.description ? `${o.label} (${o.description})` : o.label}
                index={i}
              />
            ))}
          </OptionList>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[75] bg-[#0a1428]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-[75] overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <div
            className={`relative flex max-h-[calc(100dvh_-_1rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-[calc(100dvh_-_2rem)] ${
              phase === "analysis"
                ? "max-w-[440px] sm:max-w-[480px]"
                : step === 4 && data.employmentStatus === "working"
                  ? "max-w-[820px]"
                  : "max-w-[600px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex-shrink-0 border-b border-gray-100 bg-white px-5 pb-4 pt-4 sm:px-8">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-base">
                    {isEditing ? "Edit Questionnaire Choices" : "eCampus AI Smart Advisor"}
                  </span>
                  <span className="hidden items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:inline-flex">
                    <Sparkles className="h-3 w-3" />
                    {isEditing ? "Update Preferences" : "AI Degree Matcher"}
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
                  <StepProgress
                    step={step}
                    onSelectStep={goToStep}
                    data={data}
                    isEditing={isEditing}
                  />
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
                    <div className="mx-auto mb-6 flex flex-col items-center text-center">
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.05 }}
                        className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100"
                      >
                        <copy.icon className="h-5 w-5" strokeWidth={2} />
                      </motion.span>
                      <h2 className="text-lg font-bold leading-snug text-gray-900 sm:text-[22px]">{copy.title}</h2>
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
              <div className="flex flex-shrink-0 items-center justify-between border-t border-gray-100 bg-white px-5 py-3 sm:px-8">
                <div>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 active:scale-95"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isEditing && isOnboardingComplete(data) && (
                    <button
                      type="button"
                      onClick={() => onComplete({ ...dataRef.current })}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </button>
                  )}

                  {step < TOTAL_STEPS && isStepComplete(step, data) && (
                    <button
                      type="button"
                      onClick={() => goToStep((step + 1) as WizardStep)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50 hover:text-gray-900 active:scale-95"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
