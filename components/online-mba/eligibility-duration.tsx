"use client";

import React from "react";

const data = [
  {
    category: "Basic Requirement",
    eligibility: (
      <>
        A <strong>Bachelor&apos;s degree</strong> from a recognized university,
        institution, or college.
      </>
    ),
    duration: (
      <>
        The programme has a minimum duration of <strong>2 years</strong> and is
        generally divided into <strong>4 semesters.</strong>
      </>
    ),
  },
  {
    category: "Academic Criteria",
    eligibility: (
      <>
        Most universities require at least{" "}
        <strong>50% aggregate marks</strong> at the undergraduate level.
      </>
    ),
    duration: (
      <>
        Students complete the programme progressively across{" "}
        <strong>Semester 1, 2, 3 and 4.</strong>
      </>
    ),
  },
  {
    category: "Admission Process",
    eligibility: (
      <>
        Many Online MBA programmes offer <strong>direct admission</strong> and
        may not require an entrance examination.
      </>
    ),
    duration: (
      <>
        Many universities allow students additional time, often up to{" "}
        <strong>4 years</strong>, to complete the programme.
      </>
    ),
  },
  {
    category: "Flexibility",
    eligibility: (
      <>
        <strong>Work experience</strong> is usually not mandatory, although
        requirements can vary by university.
      </>
    ),
    duration: (
      <>
        Depending on university rules, students may be able to{" "}
        <strong>pause and resume</strong> their studies within the permitted
        completion period.
      </>
    ),
  },
];

export default function EligibilityDuration() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Heading - kept same */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Eligibility Duration of an Online
            <span className="text-red-500"> MBA</span>
          </h2>
        </div>

        {/* Main Premium Layout */}
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          {/* Top Labels */}
          <div className="grid grid-cols-1 border-b border-slate-200 md:grid-cols-2">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 md:border-b-0 md:border-r">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <GradCapIcon />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Eligibility
                  </h3>
                  <p className="text-xs text-slate-500">Who can apply?</p>
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <ClockIcon />
                </div>

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

          {/* Comparison Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Eligibility Column */}
            <div className="divide-y divide-slate-200 md:border-r md:border-slate-200">
              {data.map((item, index) => (
                <div
                  key={item.category}
                  className="relative px-6 py-6 sm:px-7"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      0{index + 1}
                    </span>

                    <p className="font-semibold text-slate-900">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex gap-3 pl-1">
                    <CheckBubble />

                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.eligibility}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Duration Column */}
            <div className="divide-y divide-slate-200">
              {data.map((item, index) => (
                <div
                  key={item.category}
                  className="relative px-6 py-6 sm:px-7"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                      0{index + 1}
                    </span>

                    <p className="font-semibold text-slate-900">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex gap-3 pl-1">
                    <CheckBubble />

                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/50 px-5 py-4">
          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
            !
          </div>

          <p className="text-sm leading-relaxed text-slate-500">
            <span className="font-semibold text-red-500">Note:</span>{" "}
            Eligibility and programme duration may vary by university. Always
            check the official admission and programme guidelines before
            applying.
          </p>
        </div>
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