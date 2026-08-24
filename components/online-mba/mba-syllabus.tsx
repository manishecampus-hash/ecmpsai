"use client";

import React from "react";

/**
 * Online MBA Syllabus Component
 * Aligned with MBA Overview and other sections for container width, spacing, and typography.
 */

const CORE_SUBJECTS: string[] = [
  "Entrepreneurial Practice",
  "Business Communication (WAC)",
  "Managerial Economics",
  "Financial Accounting",
  "Data Visualisation (Excel/Tableau)",
  "Organizational Behaviour",
  "Marketing Management",
  "Business Research Methods (R/SPSS/Python)",
  "Operations Management",
  "Human Resource Management",
  "Management Accounting",
  "Financial Management",
  "Legal Aspects of Business",
  "Business Communication (VAC)",
];

const SPECIALIZATIONS: string[] = [
  "HR",
  "Business Analytics",
  "Operations",
  "IT",
  "Marketing",
  "Data Analytics",
  "Finance",
];

export default function Syllabus() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        What subjects are covered in the{" "}
        <span className="text-red-500">Online MBA syllabus?</span>
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        The syllabus varies from university to university, but the program
        typically runs for 2 years, split into 4 semesters. The first two
        semesters build the same core foundation across most universities —
        here&apos;s what&apos;s usually covered.
      </p>

      {/* Core subjects checklist, sem 1 & 2 */}
      <div className="mt-8 rounded-2xl border border-slate-200 shadow-sm bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Semester 1 &amp; 2 — Core Foundation
          </h3>
          <span className="inline-flex text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-full px-3 py-1">
            Common to all specializations
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
          {CORE_SUBJECTS.map((subject) => (
            <li key={subject} className="flex items-start gap-2.5">
              <CheckBubble />
              <span className="text-sm sm:text-base font-medium text-slate-700">
                {subject}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Semester 3 & 4 specialization note */}
      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/60 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center">
            <ArrowIcon />
          </span>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Semester 3 &amp; 4 — Your Specialization
            </h4>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              From the third semester, the curriculum shifts to the
              specialization you choose. Pick from options like{" "}
              {SPECIALIZATIONS.map((s, i) => (
                <span key={s}>
                  <span className="font-semibold text-slate-800">{s}</span>
                  {i < SPECIALIZATIONS.length - 1 ? ", " : ", and more."}
                </span>
              ))}
            </p>
          </div>
        </div>
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

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}