"use client";

import React, { useState } from "react";
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

  return (
    <div className="mx-auto max-w-5xl">
      {/* Tabs double as a progress track */}
      <div
        role="tablist"
        aria-label="Semesters"
        className="grid gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200"
        style={{ gridTemplateColumns: `repeat(${semesters.length}, minmax(0, 1fr))` }}
      >
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
              className={`flex flex-col items-center rounded-xl px-1 py-2 transition-all duration-300 sm:py-2.5 ${
                isActive
                  ? "bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-md shadow-red-500/25"
                  : isDone
                    ? "text-red-600 hover:bg-red-50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={`text-[9.5px] font-bold uppercase tracking-wider ${isActive ? "text-red-100" : ""}`}>Sem</span>
              <span className="text-lg font-black leading-none sm:text-xl">{s.number}</span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        key={active}
        role="tabpanel"
        className="lp-sem-in mt-4 grid gap-5 rounded-3xl bg-white p-5 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 sm:mt-5 sm:p-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8"
      >
        <div className="lg:border-r lg:border-slate-100 lg:pr-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-red-600">{sem.yearLabel}</p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">{sem.title}</h3>
          <p className="mt-1 text-[13px] text-slate-500">{sem.subjects.length} subjects this semester</p>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider">
              <span className="text-slate-400">Programme progress</span>
              <span className="text-red-600">{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-400 transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <MbaSubjectList subjects={sem.subjects} className="grid gap-x-6 gap-y-1 sm:grid-cols-2 sm:space-y-0" />
      </div>

      <style>{`
        @keyframes lp-sem-in { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
        .lp-sem-in { animation: lp-sem-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @media (prefers-reduced-motion: reduce) { .lp-sem-in { animation: none; } }
      `}</style>
    </div>
  );
}
