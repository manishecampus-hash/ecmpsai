"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

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

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-900">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Regular") || heading.includes("Degree") || heading.includes("MBA") ? (
              <>
                {heading.split(/(Regular|Degree|MBA)/)[0]}
                <span className="text-[#ee2c3c]">
                  {heading.match(/(Regular|Degree|MBA)/)?.[0]}
                </span>
                {heading.split(/(Regular|Degree|MBA)/).slice(2).join("")}
              </>
            ) : (
              heading
            )}
          </h2>
          {description && (
            <p className="mt-3 mx-auto max-w-3xl text-center text-slate-600 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Comparison table */}
        {rows && Array.isArray(rows) && rows.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
            {/* Table Header */}
            <div className="hidden grid-cols-[200px_1fr_1fr] border-b border-slate-200 bg-slate-50 md:grid">
              <div className="flex items-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Factor
              </div>
              <div className="flex items-center gap-2 border-l border-red-100 bg-red-50/60 px-6 py-4 text-sm font-bold text-[#ee2c3c]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ee2c3c] text-white">
                  <CheckIcon />
                </span>
                Online Degree
              </div>
              <div className="flex items-center gap-2 border-l border-slate-200 px-6 py-4 text-sm font-bold text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                  <DotIcon />
                </span>
                Regular On-Campus Degree
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-slate-100">
              {rows.map((row: any, i: number) => {
                const factorName = row.factor || row.title || row.label || `Factor ${i + 1}`;
                const onlineText = row.online || row.onlineText || row.option1 || "";
                const regularText = row.regular || row.regularText || row.option2 || "";

                return (
                  <div
                    key={i}
                    className="group grid gap-3 p-5 transition-colors hover:bg-slate-50/80 md:grid-cols-[200px_1fr_1fr] md:gap-0 md:p-0"
                  >
                    {/* Factor Label */}
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 md:px-6 md:py-5 md:text-base">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-500 md:hidden">
                        {i + 1}
                      </span>
                      {factorName}
                    </div>

                    {/* Online Degree Column (highlighted) */}
                    <div className="flex items-start gap-2.5 rounded-xl bg-red-50/50 p-3.5 md:rounded-none md:border-l md:border-red-100 md:bg-red-50/30 md:px-6 md:py-5 md:group-hover:bg-red-50/60">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-white">
                        <CheckIcon />
                      </span>
                      <div>
                        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c] md:hidden">
                          Online Degree
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-slate-700">
                          {onlineText}
                        </p>
                      </div>
                    </div>

                    {/* Regular Degree Column */}
                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 md:rounded-none md:border-l md:border-slate-100 md:bg-transparent md:px-6 md:py-5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                        <DotIcon />
                      </span>
                      <div>
                        <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500 md:hidden">
                          Regular Degree
                        </span>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {regularText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotIcon() {
  return <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />;
}
