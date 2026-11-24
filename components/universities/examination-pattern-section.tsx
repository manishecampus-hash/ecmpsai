"use client";

import React from "react";
import {
  Scale,
  FileText,
  ClipboardList,
  Award,
  ShieldCheck,
  ClipboardCheck,
  PieChart,
  BarChart2,
  HelpCircle,
  CheckCheck,
  Video,
  Camera,
  BookOpen,
  FileQuestion,
  TrendingUp,
  CheckCircle2,
  Lock,
} from "lucide-react";
import * as Icons from "lucide-react";
import HighlightedText from "./HighlightedText";

interface ExaminationPatternSectionProps {
  university?: any;
}

interface PatternItem {
  icon?: any;
  iconName?: string;
  title: string;
  description: string;
}

const ICON_MAP: Record<string, any> = {
  scale: Scale,
  filetext: FileText,
  clipboardlist: ClipboardList,
  award: Award,
  shieldcheck: ShieldCheck,
  piechart: PieChart,
  barchart: BarChart2,
  barchart2: BarChart2,
  helpcircle: HelpCircle,
  checkcheck: CheckCheck,
  video: Video,
  camera: Camera,
  bookopen: BookOpen,
  filequestion: FileQuestion,
  trendingup: TrendingUp,
  checkcircle2: CheckCircle2,
  lock: Lock,
};

const PATTERN_ITEMS: PatternItem[] = [
  {
    title: "Weightage Distribution",
    description:
      "Both internal assessments and end-term examinations carry defined weightage, ensuring continuous effort and holistic subject mastery.",
  },
  {
    title: "Assessment Structure",
    description:
      "The continuous evaluation framework tracks consistent learning progress, problem-solving, and subject conceptualization throughout terms.",
  },
  {
    title: "Internal Components",
    description:
      "Assignments, case-study presentations, periodic quizzes, interactive lab simulations, and objective tests form the continuous score.",
  },
  {
    title: "End-Term Exam Format",
    description:
      "Conducted 100% online, combining Multiple-Choice Questions (MCQs), descriptive conceptual sections, and application-oriented challenges.",
  },
  {
    title: "Qualifying Criteria",
    description:
      "Candidates must secure the minimum passing grades separately in both internal and terminal proctored assessments to successfully certify.",
  },
  {
    title: "Secure Online Proctoring",
    description:
      "Protected by AI surveillance, biometric identity verification, dual webcam monitoring, and automated red-flag detections for utmost integrity.",
  },
];

export default function ExaminationPatternSection({
  university,
}: ExaminationPatternSectionProps) {
  const examData = university?.details?.examination || {};
  const rawItems = examData.items && examData.items.length > 0 ? examData.items : PATTERN_ITEMS;

  const renderIcon = (item: any, textColorClass: string) => {
    const rawIcon = item.iconName || item.icon;
    if (!rawIcon) return null;

    if (typeof rawIcon === "string") {
      const trimmed = rawIcon.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("/") || trimmed.startsWith("http") || trimmed.startsWith("data:")) {
        return <img src={trimmed} alt="" className="h-4.5 w-4.5 object-contain" />;
      }

      const normalized = trimmed.replace(/[-_\s]/g, "").toLowerCase();
      const MatchedIcon = ICON_MAP[normalized] || (Icons as any)[trimmed];
      if (MatchedIcon) {
        return <MatchedIcon className={`h-4.5 w-4.5 ${textColorClass} stroke-[2]`} />;
      }
      return null;
    }

    if (typeof rawIcon === "function") {
      const CustomIcon = rawIcon;
      return <CustomIcon className={`h-4.5 w-4.5 ${textColorClass} stroke-[2]`} />;
    }

    return null;
  };

  // When every item leads with a figure ("15K+ …"), phones get a compact 2-column grid
  const allStats = rawItems.length > 1 && rawItems.every((item: any) => splitStat(item.title || ""));
  const mobileCols = allStats ? "grid-cols-2" : "grid-cols-1";
  const gridColsClass =
    rawItems.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : rawItems.length === 2
        ? `${mobileCols} sm:grid-cols-2 max-w-4xl mx-auto`
        : `${mobileCols} sm:grid-cols-2 lg:grid-cols-3`;

  return (
    <section
      id="examination"
      className="relative mb-8 w-full overflow-hidden border-y border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-900 sm:mb-12"
    >
      {/* subtle grid texture + glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,#000_40%,transparent_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
            <ClipboardCheck className="h-3.5 w-3.5 text-[#ea384c]" />
            {examData.badge || "Why Choose US"}
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {examData.heading ? (
              <HighlightedText text={examData.heading} defaultColor="#ea384c" />
            ) : (
              <>
                Online Examination <span className="text-[#ea384c]">Pattern</span>
              </>
            )}
          </h2>
        </div>

        {/* Open grid — no cards: each item is set off by a red accent line */}
        <div className={`grid ${gridColsClass} gap-x-5 gap-y-7 sm:gap-x-8 sm:gap-y-10`}>
          {rawItems.map((item: any, idx: number) => {
            const iconElement = renderIcon(item, "text-[#ea384c]");
            const stat = splitStat(item.title || "");

            return (
              <div
                key={item.title || idx}
                className="group relative border-l-2 border-slate-200 pl-3.5 text-left sm:pl-5 transition-colors duration-300 hover:border-red-300"
              >
                {/* accent that grows on hover */}
                <span
                  aria-hidden
                  className="absolute -left-[2px] top-0 h-8 w-[2px] bg-[#ea384c] transition-all duration-300 group-hover:h-full"
                />

                {stat ? (
                  <>
                    <p className="text-[26px] font-extrabold leading-none tracking-tight text-[#ea384c] sm:text-[34px]">
                      {stat.value}
                    </p>
                    <h3 className="mt-2 text-[13px] font-bold leading-snug text-slate-900 sm:mt-2.5 sm:text-[15px]">
                      {stat.label}
                    </h3>
                  </>
                ) : (
                  <div className="flex items-center gap-2.5">
                    {iconElement && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                        {iconElement}
                      </span>
                    )}
                    <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{item.title}</h3>
                  </div>
                )}

                <p className="mt-1.5 whitespace-pre-line text-[11px] leading-relaxed text-slate-500 sm:text-[13px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Display-only: splits a leading figure off a title so it can be shown large,
 * e.g. "1 Lakh+ Students Guided" → { value: "1 Lakh+", label: "Students Guided" }.
 * Titles without a leading figure are returned as null and render normally.
 */
function splitStat(title: string): { value: string; label: string } | null {
  const match = title
    .trim()
    .match(/^((?:up to\s+)?[₹$]?\d[\d.,/]*\s*(?:lakh|lac|k|cr|crore|m)?\+?%?)\s+(.+)$/i);
  if (!match) return null;
  return { value: match[1].trim(), label: match[2].trim() };
}
