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

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Regular|Degree|MBA/} sub={description} />

      {items.length > 0 && (
        <Reveal>
          {/* Desktop / tablet: one table, Online column framed in red */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] md:block">
            <table className="w-full table-fixed border-collapse text-left text-[15px]">
              <colgroup>
                <col className="w-[26%]" />
                <col className="w-[34%]" />
                <col className="w-[40%]" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Factor
                  </th>
                  <th scope="col" className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Building2 className="h-4 w-4 text-slate-400" /> Regular On-Campus Degree
                    </span>
                  </th>
                  <th scope="col" className="relative border-x border-b border-red-200 border-b-red-100 bg-gradient-to-b from-red-50 to-white px-5 py-4">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#ee2c3c] to-rose-400" />
                    <span className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#ee2c3c]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#ee2c3c] shadow-sm ring-1 ring-red-100">
                          <MonitorSmartphone className="h-4 w-4" />
                        </span>
                        Online Degree
                      </span>
                      <span className="rounded-full bg-[#ee2c3c] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Recommended
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => {
                  const last = i === items.length - 1;
                  return (
                    <tr key={i} className="group">
                      <th scope="row" className={`px-5 py-4 align-top font-normal ${last ? "" : "border-b border-slate-100"}`}>
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
                            <it.icon className="h-[18px] w-[18px]" />
                          </span>
                          <span className="text-[15px] font-bold leading-snug text-slate-900">{it.factor}</span>
                        </span>
                      </th>
                      <td className={`px-5 py-4 align-top text-sm leading-relaxed text-slate-500 ${last ? "" : "border-b border-slate-100"}`}>
                        <span className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                          {it.regular}
                        </span>
                      </td>
                      <td
                        className={`border-x border-red-200 bg-red-50/25 px-5 py-4 align-top text-sm font-medium leading-relaxed text-slate-800 transition-colors group-hover:bg-red-50/60 ${
                          last ? "" : "border-b border-b-red-100/70"
                        }`}
                      >
                        <span className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c] ring-1 ring-red-200">
                            <CheckIcon />
                          </span>
                          {it.online}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Phones: one compact block per factor */}
          <div className="space-y-3 md:hidden">
            {items.map((it, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 px-4 pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
                    <it.icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-[15px] font-bold text-slate-900">{it.factor}</h3>
                </div>
                <div className="px-4 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Regular On-Campus</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{it.regular}</p>
                </div>
                <div className="m-3 rounded-xl border border-red-100 bg-red-50/40 p-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ee2c3c]">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#ee2c3c] ring-1 ring-red-200">
                      <CheckIcon />
                    </span>
                    Online Degree
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800">{it.online}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
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
