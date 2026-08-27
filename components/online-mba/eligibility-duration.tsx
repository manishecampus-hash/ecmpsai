"use client";

import React from "react";

export default function EligibilityDuration() {
  return (
    <section className="w-full px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Eligibility Duration of an Online
            <span className="text-red-500"> MBA</span>
          </h2>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[28px] border border-red-100 bg-red-50/70 p-3 shadow-[0_10px_35px_rgba(220,38,38,0.06)] sm:p-5">
          {/* Soft Background Effect */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(254,226,226,0.8),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(254,242,242,0.9),transparent_35%)]" />

          {/* Inner Card */}
          <div className="relative grid overflow-hidden rounded-[24px] bg-white md:grid-cols-2">
            {/* Educational Qualification */}
            <div className="border-b border-red-100 px-6 py-7 sm:px-8 sm:py-9 md:border-b-0 md:border-r">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 sm:h-[72px] sm:w-[72px]">
                  <GraduationIcon />
                </div>

                <div className="min-w-0 pt-1">
                  <h3 className="text-[22px] font-bold leading-tight text-slate-900 sm:text-[27px]">
                    Educational Qualification
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.65] text-slate-600 sm:mt-4 sm:text-[16px] lg:text-[17px]">
                    An Online MBA course requires a{" "}
                    <strong className="font-semibold text-slate-800">
                      Bachelor&apos;s degree with a minimum of 50% marks
                    </strong>{" "}
                    from a recognized university, institution, or college.
                    Students seeking admission to an Online MBA programme{" "}
                    <strong className="font-semibold text-slate-800">
                      generally do not need an entrance exam score.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="px-6 py-7 sm:px-8 sm:py-9">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 sm:h-[72px] sm:w-[72px]">
                  <ClockIcon />
                </div>

                <div className="min-w-0 pt-1">
                  <h3 className="text-[22px] font-bold leading-tight text-slate-900 sm:text-[27px]">
                    Duration
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.65] text-slate-600 sm:mt-4 sm:text-[16px] lg:text-[17px]">
                    The Online MBA programme has a minimum duration of{" "}
                    <strong className="font-semibold text-slate-800">
                      2 years
                    </strong>
                    , divided into{" "}
                    <strong className="font-semibold text-slate-800">
                      4 semesters.
                    </strong>{" "}
                    Most universities allow students up to{" "}
                    <strong className="font-semibold text-slate-800">
                      4 years
                    </strong>{" "}
                    to complete the programme, allowing them to pause and resume
                    their studies within the permitted completion period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
            !
          </div>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            <span className="font-semibold text-red-500">Important:</span>{" "}
            Eligibility and programme duration may vary by university. UGC-DEB
            mandates a minimum two-year duration for an MBA degree, and
            programmes advertised as a “1-year MBA” may not be equivalent to a
            full MBA degree. Always check the university&apos;s latest admission
            and programme guidelines before applying.
          </p>
        </div>
      </div>
    </section>
  );
}

function GraduationIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.2 12 5l9.5 4.2L12 13.5 2.5 9.2Z"
        fill="currentColor"
      />

      <path
        d="M6.5 11.2v4.4c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M3.5 10v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle cx="3.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M12 7.5v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}