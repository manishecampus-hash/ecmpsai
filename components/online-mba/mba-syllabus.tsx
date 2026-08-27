"use client";

import React from "react";

const CORE_SUBJECTS: string[] = [
  "Entrepreneurial Practice",
  "Business Communication",
  "Managerial Economics",
  "Financial Accounting",
  "Data Visualisation",
  "Organizational Behaviour",
  "Marketing Management",
  "Business Research Methods",
  "Operations Management",
  "Human Resource Management",
  "Management Accounting",
  "Financial Management",
];

const SPECIALIZATIONS: string[] = [
  "Human Resource Management",
  "Business Analytics",
  "Operations Management",
  "Information Technology",
  "Marketing Management",
  "Data Analytics",
  "Finance",
];

const SEMESTERS = [
  {
    number: "01",
    title: "Semester 1",
    text: "Build a strong foundation in management, communication, economics and accounting.",
  },
  {
    number: "02",
    title: "Semester 2",
    text: "Develop deeper knowledge of marketing, operations, finance and business research.",
  },
  {
    number: "03",
    title: "Semester 3",
    text: "Begin your chosen specialization with advanced and industry-focused subjects.",
  },
  {
    number: "04",
    title: "Semester 4",
    text: "Complete advanced specialization courses, projects and practical learning.",
  },
];

export default function Syllabus() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Online MBA{" "}
            <span className="text-[#ee2c3c]">Syllabus</span>
          </h2>
        </div>

        {/* Semester Journey */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                Programme Structure
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                Your 4-Semester MBA Journey
              </h3>
            </div>

            <p className="text-sm text-slate-500">
              From business foundations to specialization
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEMESTERS.map((semester) => (
              <div
                key={semester.number}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-md"
              >
                <span className="text-3xl font-bold tracking-tight text-red-100">
                  {semester.number}
                </span>

                <h4 className="mt-3 text-base font-bold text-slate-900">
                  {semester.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {semester.text}
                </p>

                <div className="mt-4 h-1 w-10 rounded-full bg-red-500 transition-all duration-200 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Core Subjects */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
               <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <TargetIcon />
                </span>


                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                    Semester 1 &amp; 2
                  </p>


                  
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                   Core Subjects Covered
                  </h3>
                </div>
              </div>

              <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500">
                Foundation Learning
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
              The first year focuses on essential business and management
              concepts that create a strong foundation before students move
              into their chosen specialization.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {CORE_SUBJECTS.map((subject) => (
                <li
                  key={subject}
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-red-100 hover:bg-red-50/40"
                >
                  <CheckBubble />

                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {subject}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <TargetIcon />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                    Semester 3 &amp; 4
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Choose Your Specialization
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                During the second year, the curriculum becomes more focused on
                your selected area of expertise. Subjects and elective options
                may differ depending on the university.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:max-w-xl">
              {SPECIALIZATIONS.map((specialization) => (
                <div
                  key={specialization}
                  className="flex items-center gap-2.5 rounded-xl border border-white bg-white/80 px-4 py-3 shadow-sm"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <span className="text-sm font-semibold text-slate-700">
                    {specialization}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            i
          </span>

          <p className="text-sm leading-relaxed text-slate-600">
            <span className="font-semibold text-slate-900">Note:</span>{" "}
            The exact syllabus, subject names, credits, electives and
            specialization options can vary between universities. Always check
            the official programme curriculum before applying.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
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

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v2M22 12h-2M12 22v-2M2 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}