"use client";

import React from "react";

/**
 * Eligibility & Duration Component
 * Aligned with MBA Overview and Key Highlights container layout and typography.
 */

export default function EligibilityDuration() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Eligibility &amp; <span className="text-red-500">Duration</span> of an Online MBA
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        Two things decide whether you can start, and how long it&apos;ll take:
        your existing qualification, and the university&apos;s semester
        structure. Here&apos;s what actually qualifies — and what doesn&apos;t.
      </p>

      {/* Side-by-Side Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eligibility Card */}
        <div className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <GradCapIcon />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Eligibility</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Who can apply
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  A Bachelor&apos;s degree from a recognized university, institution, or college.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  A minimum of 50% aggregate marks at the undergraduate level.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  No entrance exam score is required to enrol — admission is direct.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Duration Card */}
        <div className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="h-10 w-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <ClockIcon />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Duration</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              2 years, 4 semesters
            </p>

            {/* Semester Progress Strip */}
            <div className="mt-5 flex items-center gap-1.5">
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((sem, i) => (
                <div key={sem} className="flex-1">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                  <div className="mt-1.5 text-[11px] font-semibold text-slate-400 text-center">
                    {sem}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 text-center text-xs text-slate-400">
              Year 1 → Year 2
            </div>

            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  UGC-DEB mandates a 2-year minimum, so no approved online MBA can be legitimately compressed below this.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Most universities allow up to 4 years, so you can pause a semester and resume without losing credits.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Warning Callout Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 px-5 py-4">
        <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center">
          <InfoIcon />
        </span>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          <span className="font-bold">Watch out:</span> programs advertised as a
          &quot;1-year MBA&quot; are PG certificates or diplomas — not a recognized
          degree. Always confirm UGC-DEB approval before you enrol.
        </p>
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 7v5l3 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 8h.01M11 12h1v5h1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}