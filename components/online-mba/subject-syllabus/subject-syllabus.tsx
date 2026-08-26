"use client";

import React from "react";

const semester1 = [
  "Entrepreneurial Practice",
  "Business Communication (WAC)",
  "Managerial Economics",
  "Financial Accounting",
  "Data Visualisation (Excel/Tableau)",
  "Organizational Behaviour",
  "Marketing Management",
];

const semester2 = [
  "Business Research Methods (R/R/Python)",
  "Operation Management",
  "Human Resource Management",
  "Management Accounting",
  "Financial Management",
  "Legal Aspects of Business",
  "Business Communication (VAC)",
];

const electives = [
  "Digital Marketing",
  "Finance",
  "Marketing",
  "Human Resources",
  "Analytics & DS",
  "BFSI",
  "FinTech",
  "General Management",
  "Sustainability Management",
  "Information System Management",
  "Project Management",
  "Supply Chain Management",
  "Retail Management",
];

const semester3Core = ["Strategic Management", "Term Paper"];
const semester4Core = ["International Business Management", "Project"];

export default function SubjectSyllabus() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="text-[#ee2c3c]">Online MBA</span> Course
          Subjects/Syllabus
        </h2>
      </div>

      <div className="mb-8 max-w-4xl mx-auto text-center">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          The online MBA course syllabus is bifurcated into 2 years or 4
          semesters, which helps you in understanding that in the 1st year,
          you will acknowledge basic management or related information or
          skills, while in the 2nd year, you can grasp skills in particular
          specializations (HR, operations, business analytics, IT, or
          marketing) in management programs.
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-slate-500 sm:text-base">
          *The syllabus mentioned below is a general syllabus of the Online
          MBA course; most universities cover these topics, but you still
          need to check on the university page before enrolling for the
          course.
        </p>
      </div>

      {/* Syllabus panel */}
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-white sm:text-base">
            Online MBA Course Syllabus
          </h3>
        </div>

        {/* Semester I & II */}
        <SemesterHeaderRow left="Semester I" right="Semester II" />
        <div className="grid sm:grid-cols-2 border-b border-slate-200">
          <SubjectList items={semester1} bordered />
          <SubjectList items={semester2} />
        </div>

        {/* Semester III & IV */}
        <SemesterHeaderRow left="Semester III" right="Semester IV" />
        <div className="grid sm:grid-cols-2">
          <div className="border-b sm:border-b-0 sm:border-r border-slate-200 bg-slate-50 px-6 py-6">
            <CoreBlock items={semester3Core} />
            <ElectivesBlock items={electives} />
          </div>
          <div className="bg-white px-6 py-6">
            <CoreBlock items={semester4Core} />
            <ElectivesBlock items={electives} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 bg-slate-100 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-slate-900 sm:text-base">
            Skills obtained in the online MBA Course
          </h3>
        </div>
      </div>
    </section>
  );
}

function SemesterHeaderRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid sm:grid-cols-2 border-b border-slate-200">
      <div className="border-b sm:border-b-0 sm:border-r border-slate-200 px-6 py-3 bg-slate-100">
        <h4 className="text-center text-sm font-bold text-slate-900 sm:text-base">
          {left}
        </h4>
      </div>
      <div className="px-6 py-3 bg-slate-100">
        <h4 className="text-center text-sm font-bold text-slate-900 sm:text-base">
          {right}
        </h4>
      </div>
    </div>
  );
}

function SubjectList({
  items,
  bordered = false,
}: {
  items: string[];
  bordered?: boolean;
}) {
  return (
    <ul
      className={`space-y-3.5 bg-white px-6 py-6 ${
        bordered ? "border-b sm:border-b-0 sm:border-r border-slate-200" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckBubble />
          <span className="text-sm font-medium text-slate-700 sm:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CoreBlock({ items }: { items: string[] }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm font-bold text-slate-900">Core subjects</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckBubble />
            <span className="text-sm font-medium text-slate-700 sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ElectivesBlock({ items }: { items: string[] }) {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-slate-900">
        Electives/Specialization Subjects:
      </p>
      <p className="mb-3 text-xs text-slate-500 sm:text-sm">
        There are 13 electives; please review the list.
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckBubble />
            <span className="text-sm font-medium text-slate-700 sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
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
