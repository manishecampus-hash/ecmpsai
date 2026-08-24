"use client";

import React from "react";

/**
 * Fees & Enrollment Component
 * Aligned with MBA Overview and other sections for container width, spacing, and typography.
 */

type FeeRow = { university: string; fee: string };

const FEES: FeeRow[] = [
  { university: "Alliance Online MBA", fee: "INR 1.60 Lakhs" },
  { university: "Amity Online MBA", fee: "INR 2.25 Lakhs" },
  { university: "DPU Pune Online MBA", fee: "INR 1.89 Lakhs" },
  { university: "UPES Online MBA", fee: "INR 1.75 Lakhs" },
  { university: "LPU Online MBA", fee: "INR 2.00 Lakhs" },
];

const ENROLL_STEPS: string[] = [
  "Visit the university's official online admissions page.",
  "Register and log in to your applicant portal.",
  "Fill out the application form and select your Online MBA specialization.",
  "Upload the required documents — mark sheets, ID proof, and photographs.",
  "Pay the application/enrolment fee and get confirmation via email & phone.",
];

export default function FeesAndEnrollment() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      {/* Fees Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        What are the <span className="text-red-500">Online MBA course fees?</span>
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        An online MBA in India typically costs between ₹30,000 and ₹5,00,000
        for the full 2-year program. Fees vary by university and
        specialization — here&apos;s what the top 5 universities charge for the
        complete course.
      </p>

      {/* Fees Table */}
      <div className="mt-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-600">
              <th className="px-6 py-4 text-sm font-bold text-white">
                Top 5 Universities Offering Online MBA
              </th>
              <th className="px-6 py-4 text-sm font-bold text-white">
                Full Fees
              </th>
            </tr>
          </thead>
          <tbody>
            {FEES.map((row, i) => (
              <tr
                key={row.university}
                className={`${i % 2 === 0 ? "bg-red-50/40" : "bg-white"} ${
                  i !== FEES.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="text-sm sm:text-base font-semibold text-red-500 underline decoration-red-200 hover:decoration-red-500 transition-colors"
                  >
                    {row.university}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm sm:text-base font-medium text-slate-700">
                  {row.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enrollment Section Heading */}
      <h2 className="mt-14 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        How do I <span className="text-red-500">enrol for an Online MBA</span> course?
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        Enrolment is quick and fully online — most universities take you
        from registration to confirmation in five simple steps.
      </p>

      {/* Enrollment Ordered List */}
      <ol className="mt-8 space-y-4">
        {ENROLL_STEPS.map((step, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              {i + 1}
            </span>
            <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}