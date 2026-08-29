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

        {/* Clean Comparison Matrix */}
        {rows && Array.isArray(rows) && rows.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[180px_1fr_1fr] bg-slate-900 text-white font-semibold text-sm">
              <div className="px-6 py-4 flex items-center text-slate-300">Factor</div>
              <div className="px-6 py-4 flex items-center gap-2 bg-[#ee2c3c] text-white">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                Online Degree / MBA
              </div>
              <div className="px-6 py-4 flex items-center gap-2 bg-slate-800 text-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
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
                    className={`grid md:grid-cols-[180px_1fr_1fr] gap-3 md:gap-0 p-5 md:p-0 ${
                      i % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                    } hover:bg-slate-50 transition-colors`}
                  >
                    {/* Factor Label */}
                    <div className="md:px-6 md:py-4 flex items-center font-bold text-slate-900 text-sm md:text-base border-b md:border-b-0 border-slate-100 pb-2 md:pb-0">
                      <span className="inline-block md:hidden mr-2 text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        #{i + 1}
                      </span>
                      {factorName}
                    </div>

                    {/* Online Degree Column */}
                    <div className="md:px-6 md:py-4 md:border-l border-slate-100 flex items-start gap-2.5 bg-red-50/30 md:bg-transparent rounded-xl md:rounded-none p-3 md:p-0">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <span className="md:hidden block text-xs font-bold text-[#ee2c3c] uppercase mb-1">
                          Online Degree
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {onlineText}
                        </p>
                      </div>
                    </div>

                    {/* Regular Degree Column */}
                    <div className="md:px-6 md:py-4 md:border-l border-slate-100 flex items-start gap-2.5 bg-slate-100/40 md:bg-transparent rounded-xl md:rounded-none p-3 md:p-0">
                      <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                        •
                      </div>
                      <div>
                        <span className="md:hidden block text-xs font-bold text-slate-500 uppercase mb-1">
                          Regular Degree
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">
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
