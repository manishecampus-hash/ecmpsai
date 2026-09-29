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

const BADGE_STYLES = [
  { bg: "bg-red-50", text: "text-red-500" },
  { bg: "bg-amber-50", text: "text-amber-500" },
  { bg: "bg-indigo-50", text: "text-indigo-500" },
  { bg: "bg-purple-50", text: "text-purple-500" },
  { bg: "bg-emerald-50", text: "text-emerald-500" },
  { bg: "bg-rose-50", text: "text-rose-500" },
];

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

  const gridColsClass =
    rawItems.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : rawItems.length === 2
        ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="examination"
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-0 pb-6 sm:pb-10 font-sans"
    >
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-8 shadow-xs">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/80 px-3.5 py-1 text-[11px] font-bold tracking-wider text-slate-800 uppercase">
            <ClipboardCheck className="h-3.5 w-3.5 text-[#ea384c]" />
            {examData.badge || "EXAMINATION"}
          </span>

          <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {examData.heading ? (
              <HighlightedText text={examData.heading} defaultColor="#ea384c" />
            ) : (
              <>
                Online Examination <span className="text-[#ea384c]">Pattern</span>
              </>
            )}
          </h2>
        </div>

        {/* 3-Column Card Grid with reduced vertical spacing */}
        <div className={`grid ${gridColsClass} gap-4 sm:gap-4.5`}>
          {rawItems.map((item: any, idx: number) => {
            const badgeStyle = BADGE_STYLES[idx % BADGE_STYLES.length];
            const iconElement = renderIcon(item, badgeStyle.text);

            return (
              <div
                key={item.title || idx}
                className="rounded-2xl bg-[#f8fafc] border border-slate-200/70 p-4 sm:p-5 flex flex-col hover:border-slate-300 hover:shadow-xs transition-all duration-200 text-left"
              >
                {/* Icon Badge (only when explicitly provided) */}
                {iconElement && (
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center mb-2.5 ${badgeStyle.bg}`}
                  >
                    {iconElement}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal whitespace-pre-line">
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
