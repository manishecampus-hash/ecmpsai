"use client";

import React from "react";

export default function EligibilityDuration() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Eligibility Duration of an Online
            <span className="text-red-500"> MBA</span>
          </h2>
        </div>

      

        {/* Table */}
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[700px] border border-slate-200">
            {/* Table Header */}
            <div className="grid grid-cols-[190px_1fr_1fr] border-b border-slate-200 bg-slate-50">
              <div className="border-r border-slate-200 px-6 py-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category
                </span>
              </div>

              <div className="border-r border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <GradCapIcon />
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Eligibility
                    </h3>
                    <p className="text-xs text-slate-500">Who can apply?</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <ClockIcon />
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Duration
                    </h3>
                    <p className="text-xs text-slate-500">
                      2 Years · 4 Semesters
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-[190px_1fr_1fr] border-b border-slate-200">
              <div className="border-r border-slate-200 bg-slate-50/50 px-6 py-5">
                <p className="font-semibold text-slate-900">
                  Basic Requirement
                </p>
              </div>

              <div className="border-r border-slate-200 px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    A{" "}
                    <span className="font-semibold text-slate-900">
                      Bachelor&apos;s degree
                    </span>{" "}
                    from a recognized university, institution, or college.
                  </p>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    The programme has a minimum duration of{" "}
                    <span className="font-semibold text-slate-900">
                      2 years
                    </span>{" "}
                    and is generally divided into{" "}
                    <span className="font-semibold text-slate-900">
                      4 semesters.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-[190px_1fr_1fr] border-b border-slate-200">
              <div className="border-r border-slate-200 bg-slate-50/50 px-6 py-5">
                <p className="font-semibold text-slate-900">
                  Academic Criteria
                </p>
              </div>

              <div className="border-r border-slate-200 px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Most universities require at least{" "}
                    <span className="font-semibold text-slate-900">
                      50% aggregate marks
                    </span>{" "}
                    at the undergraduate level.
                  </p>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Students complete the programme progressively across{" "}
                    <span className="font-semibold text-slate-900">
                      Semester 1, 2, 3 and 4.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-[190px_1fr_1fr] border-b border-slate-200">
              <div className="border-r border-slate-200 bg-slate-50/50 px-6 py-5">
                <p className="font-semibold text-slate-900">
                  Admission Process
                </p>
              </div>

              <div className="border-r border-slate-200 px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Many Online MBA programmes offer{" "}
                    <span className="font-semibold text-slate-900">
                      direct admission
                    </span>{" "}
                    and may not require an entrance examination.
                  </p>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Many universities allow students additional time, often up
                    to{" "}
                    <span className="font-semibold text-slate-900">
                      4 years
                    </span>
                    , to complete the programme.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-[190px_1fr_1fr]">
              <div className="border-r border-slate-200 bg-slate-50/50 px-6 py-5">
                <p className="font-semibold text-slate-900">Flexibility</p>
              </div>

              <div className="border-r border-slate-200 px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    <span className="font-semibold text-slate-900">
                      Work experience
                    </span>{" "}
                    is usually not mandatory, although requirements can vary by
                    university.
                  </p>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex gap-3">
                  <CheckBubble />
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Depending on university rules, students may be able to{" "}
                    <span className="font-semibold text-slate-900">
                      pause and resume
                    </span>{" "}
                    their studies within the permitted completion period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-5 text-sm leading-relaxed text-slate-500">
          <span className="font-semibold text-red-500">Note:</span>{" "}
          Eligibility and programme duration may vary by university. Always
          check the official admission and programme guidelines before
          applying.
        </p>
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function GradCapIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 9l10-5 10 5-10 5-10-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7v5l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}