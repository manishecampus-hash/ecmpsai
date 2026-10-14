"use client";

import React from "react";
import {
  Award,
  Building2,
  Briefcase,
  Clock3,
  Lightbulb,
  MonitorPlay,
  MonitorSmartphone,
  Scale,
  TrendingUp,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

const FACTOR_ICONS: [RegExp, LucideIcon][] = [
  [/flexib|schedule|time/i, Clock3],
  [/cost|tuition|fee|afford/i, Wallet],
  [/\bwork|\bearn|salary|\bjobs?\b/i, Briefcase],
  [/\blearn|method|lecture|\bclass/i, MonitorPlay],
  [/recogni|degree|value|accredit|approv/i, Award],
  [/practical|industry|applica/i, Lightbulb],
  [/career|outcome|growth|placement/i, TrendingUp],
  [/network|peer/i, UsersRound],
];

type ComparisonRow = {
  factor: string;
  online: string;
  regular: string;
};

const DEFAULT_ROWS: ComparisonRow[] = [
  {
    factor: "Flexibility",
    online: "Mostly self-paced, with scheduled live sessions (4–6 hrs/week)",
    regular: "Fixed, mandatory full-time physical class schedules",
  },
  {
    factor: "Cost & Tuition",
    online: "Highly affordable — lower tuition fees with zero commuting or hostel costs",
    regular: "Higher tuition fees along with mandatory living & travel expenses",
  },
  {
    factor: "Work Experience",
    online: "Continue your job and earn income while earning your degree",
    regular: "Requires pausing or quitting your job to attend classes full-time",
  },
  {
    factor: "Learning Method",
    online: "Live & recorded digital lectures, e-libraries, and 24/7 LMS access",
    regular: "Traditional classroom lectures and physical library access",
  },
  {
    factor: "Degree Recognition",
    online: "100% UGC-DEB & AICTE approved — equal standing to regular degrees",
    regular: "Standard campus-based accreditation",
  },
];

export default function OnlineVsRegular({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // Hide whole section if title is missing
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const description = data?.description || data?.subtext || "";
  const rows: ComparisonRow[] = data?.rows || data?.list || data?.comparison || DEFAULT_ROWS;

  const items = (Array.isArray(rows) ? rows : []).map((row: any, i: number) => {
    const factor = row.factor || row.title || row.label || `Factor ${i + 1}`;
    return {
      factor,
      icon: iconFor(factor, FACTOR_ICONS, Scale),
      online: row.online || row.onlineText || row.option1 || "",
      regular: row.regular || row.regularText || row.option2 || "",
    };
  });

  // factor | regular | vs | online — the header row uses the same columns so the labels sit over their cells
  const COLS = "lg:grid-cols-[220px_minmax(0,1fr)_32px_minmax(0,1fr)]";

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Regular|Degree|MBA/} sub={description} />

      {items.length > 0 && (
        <>
          <div className={`mb-3 hidden items-center gap-3 px-3 lg:grid ${COLS}`}>
            <span />
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-600">
              <Building2 className="h-4 w-4 text-slate-400" /> Regular On-Campus Degree
            </span>
            <span />
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#ee2c3c]">
              <MonitorSmartphone className="h-4 w-4" /> Online Degree
            </span>
          </div>

          <div className="space-y-3">
            {items.map((it, i) => (
              <Reveal key={i} delay={(i % 4) * 0.05}>
                <div className={`group grid items-stretch gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-red-200 hover:shadow-[0_14px_30px_-22px_rgba(238,44,60,0.5)] sm:grid-cols-2 lg:items-center lg:gap-3 ${COLS}`}>
                  <div className="flex items-center gap-3 px-1 py-1 sm:col-span-2 lg:col-span-1">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                      <it.icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="text-[15px] font-bold leading-snug text-slate-900">{it.factor}</h3>
                  </div>

                  <div className="h-full rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-200">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 lg:hidden">Regular On-Campus</p>
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {it.regular}
                    </p>
                  </div>

                  <span aria-hidden className="hidden h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-white text-[10px] font-extrabold text-[#ee2c3c] lg:flex">
                    VS
                  </span>

                  <div className="h-full rounded-xl border-l-[3px] border-[#ee2c3c] bg-red-50 p-3.5 ring-1 ring-red-100">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ee2c3c] lg:hidden">Online Degree</p>
                    <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-slate-800">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-white">
                        <CheckIcon />
                      </span>
                      {it.online}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </CourseSection>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
