"use client";

import React from "react";

const INDIA_APPROVALS: string[] = [
  "UGC-DEB Approval",
  "UGC Recognition",
  "NAAC Accreditation",
  "AICTE Approval",
  "AIU Equivalence",
  "NIRF Ranking",
];

const FOREIGN_APPROVALS: string[] = [
  "WES",
  "AACSB",
  "EQUIS",
  "AMBA",
  "ABET",
  "QS World University Ranking",
];

export default function UgcValidity() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8 font-sans text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl font-[Inter]">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Is an Online MBA<span className="text-[#ee2c3c]"> Valid?</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Yes, an Online MBA can be valid when it is offered by a properly
            recognized university and meets the applicable regulatory
            requirements for online education.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Before applying, check the university&apos;s recognition,
            accreditation and programme approvals. These details can help you
            understand the degree&apos;s acceptance for employment, higher
            education and other professional opportunities.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Here are some important approvals, accreditations and rankings to
            check when comparing Online MBA universities in India and abroad.
          </p>
        </div>

        {/* Approvals Cards Container */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* India Card */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-[#ee2c3c] px-6 py-5">
              <h4 className="text-center text-base font-bold text-white">
                Online University in India
              </h4>
              <p className="text-center text-xs text-blue-100 mt-1">Check these certifications</p>
            </div>

            <ul className="space-y-3 px-6 py-6">
              {INDIA_APPROVALS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckBubble variant="blue" />
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Foreign Card */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-emerald-50/30 to-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-[#2c313c] px-6 py-5">
              <h4 className="text-center text-base font-bold text-white">
                Online University Abroad
              </h4>
              <p className="text-center text-xs text-emerald-100 mt-1">International standards</p>
            </div>

            <ul className="space-y-3 px-6 py-6">
              {FOREIGN_APPROVALS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckBubble variant="emerald" />
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border-l-4 border-l-amber-500 bg-amber-50 px-6 py-5 shadow-sm">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white mt-0.5">
            !
          </span>

          <div>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              <span className="font-semibold text-slate-900">
                Important:
              </span>{" "}
              Approval and accreditation requirements may vary depending on the
              country, university and specific programme. Always verify the
              latest status directly through the relevant official regulatory
              authority and university before enrolling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckBubble({ variant = "red" }: { variant?: "blue" | "emerald" | "red" }) {
  const variantColors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
  };

  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${variantColors[variant]}`}>
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
