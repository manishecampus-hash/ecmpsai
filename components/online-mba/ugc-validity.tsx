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

        {/* Approvals Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#ee2c3c] px-6 py-4">
            <h3 className="text-center text-sm font-bold text-white sm:text-base">
              Important Approvals to Check
            </h3>
          </div>

          <div className="grid md:grid-cols-2">
            {/* India Header */}
            <div className="border-b border-slate-100 bg-red-50/40 px-6 py-4 md:border-r">
              <h4 className="text-center text-sm font-bold text-slate-900 sm:text-base">
                Online University in India
              </h4>
            </div>

            {/* Foreign Header */}
            <div className="border-b border-slate-100 px-6 py-4">
              <h4 className="text-center text-sm font-bold text-slate-900 sm:text-base">
                Online University Abroad
              </h4>
            </div>

            {/* India List */}
            <ul className="space-y-4 bg-red-50/40 px-6 py-6 md:border-r md:border-slate-100">
              {INDIA_APPROVALS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckBubble />
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Foreign List */}
            <ul className="space-y-4 px-6 py-6">
              {FOREIGN_APPROVALS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckBubble />
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            !
          </span>

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