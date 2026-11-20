"use client";

import React, { useState } from "react";
import { BookOpen, TrendingUp } from "lucide-react";
import MbaSubjectList from "./mba-subject-list";

export interface SemesterTab {
  number: string;
  title: string;
  yearLabel: string;
  subjects: string[];
}

/** Semester switcher: one panel instead of four cards. */
export default function MbaSemesterTabs({ semesters }: { semesters: SemesterTab[] }) {
  const [active, setActive] = useState(0);
  const sem = semesters[active];
  const progress = Math.round(((active + 1) / semesters.length) * 100);
  const isYear1 = active < 2;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Enhanced Tabs with better visual hierarchy */}
      <div
        role="tablist"
        aria-label="Semesters"
        className="relative grid gap-2 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-2 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/80 sm:gap-2.5 sm:p-2.5"
        style={{ gridTemplateColumns: `repeat(${semesters.length}, minmax(0, 1fr))` }}
      >
        {/* Background gradient indicator */}
        <div
          className="pointer-events-none absolute inset-y-2 left-2 right-2 rounded-xl bg-gradient-to-r from-red-600/5 to-rose-600/5 transition-all duration-500 sm:inset-y-2.5 sm:left-2.5 sm:right-2.5"
          style={{
            width: `calc(${((active + 1) / semesters.length) * 100}% - 16px)`,
          }}
        />
        
        {semesters.map((s, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <button
              key={s.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative z-10 flex flex-col items-center rounded-xl px-2 py-3 transition-all duration-300 sm:px-3 sm:py-3.5 ${
                isActive
                  ? "bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-600/20 ring-offset-2"
                  : isDone
                    ? "bg-white text-red-600 shadow-sm ring-1 ring-red-100 hover:shadow-md hover:ring-red-200"
                    : "bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
              }`}
            >
              <span className={`text-[9px] font-bold uppercase tracking-[0.1em] ${isActive ? "text-red-100" : isDone ? "text-red-400" : "text-slate-400"} sm:text-[10px]`}>
                Semester
              </span>
              <span className="mt-0.5 text-xl font-black leading-none sm:text-2xl">{s.number}</span>
              {isDone && !isActive && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Enhanced Panel with better design */}
      <div
        key={active}
        role="tabpanel"
        className="lp-sem-in mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/80"
      >
        {/* Header Section with gradient background */}
        <div className={`relative overflow-hidden px-6 py-6 sm:px-8 sm:py-7 ${isYear1 ? "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white" : "bg-gradient-to-br from-purple-50 via-pink-50/50 to-white"}`}>
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-red-600/10 to-rose-600/5 blur-3xl" />
          
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isYear1 ? (
                  <BookOpen className="h-5 w-5 text-red-600" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-red-600" />
                )}
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">{sem.yearLabel}</p>
              </div>
              <h3 className="mt-2 text-[22px] font-extrabold leading-tight text-slate-900 sm:text-[26px]">{sem.title}</h3>
              <p className="mt-1.5 text-[13px] font-medium text-slate-600">
                {sem.subjects.length} core subjects • Build {isYear1 ? "foundation" : "specialization"} knowledge
              </p>
            </div>

            {/* Progress Circle - Responsive sizing */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progress) / 100}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-[16px] font-black leading-none text-red-600 sm:text-[20px] lg:text-[24px]">{progress}%</span>
                <span className="text-[7px] font-bold uppercase tracking-wider text-slate-500 sm:text-[8px] lg:text-[9px]">Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-gradient-to-r from-red-600 to-rose-600" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">Subjects Covered</h4>
          </div>
          <MbaSubjectList subjects={sem.subjects} className="grid gap-x-6 gap-y-2 sm:grid-cols-2" />
        </div>
      </div>

      <style>{`
        @keyframes lp-sem-in { from { opacity: 0; transform: translate3d(0, 12px, 0); } to { opacity: 1; transform: none; } }
        .lp-sem-in { animation: lp-sem-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @media (prefers-reduced-motion: reduce) { .lp-sem-in { animation: none; } }
      `}</style>
    </div>
  );
}
