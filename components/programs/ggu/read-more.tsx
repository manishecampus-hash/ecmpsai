"use client";

import React, { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const benefits = [
  "Future-ready doctoral education with flexible online learning",
  "Build advanced expertise in strategy, leadership, and applied research",
  "Designed for working executives and senior professionals",
  "Supports career growth into C-suite, consulting, and academia",
];

export default function GguReadMore() {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="border-b border-slate-100 bg-white px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
              Benefits of Choosing an Online DBA
              <span className="text-red-500"> Program?</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Gain advanced strategic and research capabilities through a
              flexible online DBA program from Golden Gate University, focused
              on leadership, finance, marketing, and applied business research.
            </p>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:bg-red-50/40"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                  <p className="text-sm font-semibold leading-6 text-gray-800">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {open && (
              <div className="mt-5 space-y-4 border-l-2 border-red-200 pl-5 text-sm leading-7 text-gray-700 sm:text-base">
                <p>
                  The Online DBA offers the flexibility to learn from anywhere
                  while providing access to live and recorded sessions, faculty
                  mentorship, and a peer cohort of fellow executives throughout
                  the program.
                </p>

                <p>
                  It helps learners develop advanced capabilities in strategic
                  leadership, corporate finance, organizational research, and
                  applied business decision-making while preparing for senior
                  executive, consulting, and academic careers.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-red-200 transition hover:bg-red-600"
            >
              {open ? "Show Less" : "Read More"}

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
