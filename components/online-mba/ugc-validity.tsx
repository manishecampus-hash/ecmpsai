import React from "react";

/**
 * Is a UGC-approved Online MBA valid?
 * Same container/heading system as the other sections
 * (max-w-4xl, text-3xl md:text-4xl, red-500 accent).
 * Table header re-themed navy -> red-600; two-column approvals table
 * (India / Foreign) matches the reference format.
 */

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
    <section className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-800">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Is a <span className="text-red-500">UGC-approved Online MBA</span> valid?
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Yes — an online MBA is valid in India as long as the university is
        recognized by the University Grants Commission and approved by the
        Distance Education Bureau. Once approved, the degree is treated as
        equivalent to a regular MBA, and recruitment rules accept it for
        private-sector jobs, promotions, and most government opportunities.
      </p>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Employers generally look at the university's reputation,
        accreditation, curriculum, and the skills you've actually gained —
        though a few roles or foreign institutions may still prefer a
        regular MBA. Always verify the approval status on the official
        university and UGC-DEB websites before you enrol.
      </p>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Here's the set of accreditations, recognitions, and rankings worth
        checking for when you shortlist an online MBA from reputed
        universities in India or abroad.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-red-600 px-6 py-4">
          <h3 className="text-sm font-bold text-white text-center">
            Approvals to Check
          </h3>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="px-6 py-3 border-b md:border-r border-slate-100 bg-red-50/40">
            <h4 className="text-sm font-bold text-slate-900 text-center">
              Online University in India
            </h4>
          </div>
          <div className="px-6 py-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 text-center">
              Online University Abroad
            </h4>
          </div>

          <ul className="px-6 py-5 space-y-3.5 bg-red-50/40 md:border-r border-slate-100">
            {INDIA_APPROVALS.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <ul className="px-6 py-5 space-y-3.5">
            {FOREIGN_APPROVALS.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400 italic">
        Accreditation requirements depend on the country, region, and
        program you choose.
      </p>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}