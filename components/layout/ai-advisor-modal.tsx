"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/app/dashboard/components/sidebar";
import Topbar from "@/app/dashboard/components/topbar";
import WelcomeBanner from "@/app/dashboard/components/welcome-banner";
import StatsCards from "@/app/dashboard/components/stats-cards";
import Recommendations from "@/app/dashboard/components/recommendations";
import Milestones from "@/app/dashboard/components/milestones";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  TrendingUp,
  GraduationCap,
  ArrowLeftRight,
  Rocket,
  Bot,
  Atom,
  LayoutGrid,
  Award,
  Cloud,
  BarChart3,
  Layers,
  Shield,
  Laptop,
  Trophy,
  Target,
  Code2,
  Building2,
  CalendarDays,
  Wallet,
  IndianRupee,
  Banknote,
  PiggyBank,
  RefreshCw,
  Check,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export interface AdvisorAnswers {
  goal: string;
  focusArea: string;
  format: string;
  budget: string;
}

interface AIAdvisorModalProps {
  onClose: () => void;
  onComplete: (answers: AdvisorAnswers) => void;
}

interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
}

const primaryGoals: Option[] = [
  { id: "Gen AI & Agentic AI", label: "Gen AI & Agentic AI", icon: Sparkles },
  { id: "Upskilling & Certification", label: "Upskilling & Certification", icon: TrendingUp },
  { id: "Higher Education Degree", label: "Higher Education Degree", icon: GraduationCap },
  { id: "Switch Career", label: "Switch Career", icon: ArrowLeftRight },
  { id: "Start My Career", label: "Start My Career", icon: Rocket },
];

const focusAreasByGoal: Record<string, Option[]> = {
  "Gen AI & Agentic AI": [
    { id: "Agentic AI & Multi-Agent Systems", label: "Agentic AI & Multi-Agent Systems", icon: Bot },
    { id: "Generative AI & Large Language Models", label: "Generative AI & Large Language Models", icon: Atom },
    { id: "Full Stack AI & Vector Databases", label: "Full Stack AI & Vector Databases", icon: LayoutGrid },
    { id: "Enterprise AI & Strategic Leadership", label: "Enterprise AI & Strategic Leadership", icon: Award },
  ],
  "Upskilling & Certification": [
    { id: "Cloud Architecture & DevOps", label: "Cloud Architecture & DevOps", icon: Cloud },
    { id: "Data Science & Machine Learning", label: "Data Science & Machine Learning", icon: BarChart3 },
    { id: "Product Management & Growth", label: "Product Management & Growth", icon: Layers },
    { id: "Cybersecurity & Ethical Hacking", label: "Cybersecurity & Ethical Hacking", icon: Shield },
  ],
  "Higher Education Degree": [
    { id: "Online MBA & Executive Management", label: "Online MBA & Executive Management", icon: GraduationCap },
    { id: "Online MCA & M.Tech Programs", label: "Online MCA & M.Tech Programs", icon: Laptop },
    { id: "Undergraduate Degrees (BCA / BBA / B.Tech)", label: "Undergraduate Degrees (BCA / BBA / B.Tech)", icon: Award },
    { id: "Doctorate / Global DBA Programs", label: "Doctorate / Global DBA Programs", icon: Trophy },
  ],
  "Switch Career": [
    { id: "Transition to AI & Data Careers", label: "Transition to AI & Data Careers", icon: Target },
    { id: "Transition to Software Engineering", label: "Transition to Software Engineering", icon: Code2 },
    { id: "Transition to Tech Product Roles", label: "Transition to Tech Product Roles", icon: LayoutGrid },
    { id: "Transition to Digital Strategy & Ops", label: "Transition to Digital Strategy & Ops", icon: TrendingUp },
  ],
  "Start My Career": [
    { id: "Placement-Linked Degree Track", label: "Placement-Linked Degree Track", icon: CheckCircle2 },
    { id: "Full Stack Coding Launchpad", label: "Full Stack Coding Launchpad", icon: Laptop },
    { id: "Business Management & Analytics", label: "Business Management & Analytics", icon: BarChart3 },
    { id: "Cloud & IT Operations Foundation", label: "Cloud & IT Operations Foundation", icon: Layers },
  ],
};

const learningFormats: Option[] = [
  { id: "100% Online", label: "100% Online", icon: Laptop },
  { id: "Hybrid / Blended", label: "Hybrid / Blended", icon: Building2 },
  { id: "Weekend Classroom", label: "Weekend Classroom", icon: CalendarDays },
];

const budgetRanges: Option[] = [
  { id: "Under ₹1 Lakh", label: "Under ₹1 Lakh", icon: Wallet },
  { id: "₹1 Lakh – ₹2.5 Lakh", label: "₹1 Lakh – ₹2.5 Lakh", icon: IndianRupee },
  { id: "₹2.5 Lakh – ₹5 Lakh", label: "₹2.5 Lakh – ₹5 Lakh", icon: Banknote },
  { id: "₹5 Lakh+", label: "₹5 Lakh+", icon: PiggyBank },
];

const analysisChecklist = [
  "Mapping Agentic & Tech curricula against career milestones",
  "Evaluating UGC, NAAC A++ accreditation and industry labs",
  "Calculating monthly EMI, scholarships & projected salary growth...",
];

type WizardStep = 1 | 2 | 3 | 4;
type Phase = "wizard" | "analysis";

const AUTO_ADVANCE_DELAY = 450;

export function AIAdvisorModal({ onClose, onComplete }: AIAdvisorModalProps) {
  const [phase, setPhase] = useState<Phase>("wizard");
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [goal, setGoal] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [format, setFormat] = useState("");
  const [budget, setBudget] = useState("");

  const [checklistDone, setChecklistDone] = useState<boolean[]>(
    analysisChecklist.map(() => false),
  );

  // Mirrors goal/focusArea/format/budget so the delayed timers below always
  // read the latest picks instead of the stale values captured in their closures.
  const answersRef = useRef<AdvisorAnswers>({
    goal: "",
    focusArea: "",
    format: "",
    budget: "",
  });

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysisTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      analysisTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  const goToStep = (next: WizardStep) => {
    clearAdvanceTimer();
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const startAnalysis = () => {
    clearAdvanceTimer();
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
      onComplete({ ...answersRef.current });
    }, finishDelay);
    analysisTimers.current.push(finishTimer);
  };

  const skipAnimation = () => {
    analysisTimers.current.forEach((t) => clearTimeout(t));
    analysisTimers.current = [];
    setChecklistDone(analysisChecklist.map(() => true));
    onComplete({ ...answersRef.current });
  };

  const selectAndAdvance = (apply: () => void, next: () => void) => {
    apply();
    clearAdvanceTimer();
    advanceTimer.current = setTimeout(next, AUTO_ADVANCE_DELAY);
  };

  const handleSelectGoal = (value: string) => {
    selectAndAdvance(
      () => {
        setGoal(value);
        setFocusArea("");
        answersRef.current.goal = value;
        answersRef.current.focusArea = "";
      },
      () => goToStep(2),
    );
  };

  const handleSelectFocusArea = (value: string) => {
    selectAndAdvance(
      () => {
        setFocusArea(value);
        answersRef.current.focusArea = value;
      },
      () => goToStep(3),
    );
  };

  const handleSelectFormat = (value: string) => {
    selectAndAdvance(
      () => {
        setFormat(value);
        answersRef.current.format = value;
      },
      () => goToStep(4),
    );
  };

  const handleSelectBudget = (value: string) => {
    selectAndAdvance(
      () => {
        setBudget(value);
        answersRef.current.budget = value;
      },
      () => startAnalysis(),
    );
  };

  const handleBack = () => {
    clearAdvanceTimer();
    if (step === 1) {
      onClose();
      return;
    }
    goToStep((step - 1) as WizardStep);
  };

  const focusOptions = goal ? focusAreasByGoal[goal] ?? [] : [];

  const stepMeta: Record<
    WizardStep,
    { title: string; subtitle: string; options: Option[]; selected: string; onSelect: (v: string) => void }
  > = {
    1: {
      title: "What is your primary goal?",
      subtitle: "Tap an option to select and auto-advance",
      options: primaryGoals,
      selected: goal,
      onSelect: handleSelectGoal,
    },
    2: {
      title: "Select your focus area",
      subtitle: "Tap to choose and auto-advance",
      options: focusOptions,
      selected: focusArea,
      onSelect: handleSelectFocusArea,
    },
    3: {
      title: "Preferred learning format?",
      subtitle: "Select your preferred study mode",
      options: learningFormats,
      selected: format,
      onSelect: handleSelectFormat,
    },
    4: {
      title: "What is your budget?",
      subtitle: "Tap your range to start the AI matching analysis",
      options: budgetRanges,
      selected: budget,
      onSelect: handleSelectBudget,
    },
  };

  const current = stepMeta[step];

  return (
    <>
      {/* Backdrop — a blurred, non-interactive preview of the dashboard the
          student is about to land on, instead of a flat dark overlay. */}
      <div className="fixed inset-0 z-[75] overflow-hidden" onClick={onClose}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none blur-sm"
        >
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
        <div className="flex min-h-full items-start justify-center p-3 pt-14 pb-6 sm:items-center sm:p-4 sm:pt-16">
          <div
            className="relative flex max-h-[calc(100dvh_-_5rem)] w-full max-w-[440px] flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh_-_5.5rem)] sm:max-w-[480px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — sticky so it (and the close button) stay reachable while the body scrolls */}
            <div className="sticky top-0 z-10 flex flex-shrink-0 flex-col gap-1.5 bg-white px-5 pb-3 pt-4 sm:px-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-base">
                    eCampus AI Smart Advisor
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
                  <Sparkles className="h-3 w-3" />
                  AI Degree Matcher
                </span>
                {phase === "wizard" && (
                  <span className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    Step {step} of 4
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[3px] translate-y-full overflow-hidden bg-red-100">
                <motion.div
                  initial={false}
                  animate={{ width: `${phase === "analysis" ? 100 : ((step - 1) / 4) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full rounded-r-full bg-gradient-to-r from-red-600 to-red-500"
                />
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col px-5 pb-5 pt-5 sm:px-7">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {phase === "wizard" ? (
                  <motion.div
                    key={`step-${step}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -24 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col"
                  >
                    <h2 className="text-lg font-bold leading-snug text-gray-900 sm:text-2xl">
                      {current.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">{current.subtitle}</p>

                    <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-2.5">
                      {current.options.map((opt) => {
                        const selected = current.selected === opt.id;
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => current.onSelect(opt.id)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all sm:px-3.5 sm:py-3 ${
                              selected
                                ? "border-red-400 bg-red-50/70 ring-1 ring-red-200"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${
                                selected
                                  ? "bg-red-100 text-red-600"
                                  : "bg-indigo-50 text-indigo-500"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span
                              className={`flex-1 text-sm font-semibold ${
                                selected ? "text-gray-900" : "text-gray-700"
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                                selected
                                  ? "border-red-600 bg-red-600 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex flex-shrink-0 items-center sm:mt-5">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-500 transition hover:text-gray-800"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    </div>
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
                      Our AI counselor is scoring course syllabi, faculty expertise,
                      hands-on labs, and placement ROI.
                    </p>

                    <div className="mt-4 flex w-full flex-shrink-0 flex-col gap-2.5 text-left">
                      {analysisChecklist.map((item, i) => {
                        const done = checklistDone[i];
                        return (
                          <div key={item} className="flex items-center gap-2.5">
                            <span
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                                done
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-50 text-red-500"
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
                              className={`text-xs sm:text-sm ${
                                done ? "text-gray-700" : "text-gray-500"
                              }`}
                            >
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
          </div>
        </div>
      </div>
    </>
  );
}
