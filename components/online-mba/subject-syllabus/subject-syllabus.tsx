"use client";

import React from "react";

const defaultSem1 = [
  "Entrepreneurial Practice",
  "Business Communication (WAC)",
  "Managerial Economics",
  "Financial Accounting",
  "Data Visualisation (Excel/Tableau)",
  "Organizational Behaviour",
  "Marketing Management",
];

const defaultSem2 = [
  "Business Research Methods (R/R/Python)",
  "Operation Management",
  "Human Resource Management",
  "Management Accounting",
  "Financial Management",
  "Legal Aspects of Business",
  "Business Communication (VAC)",
];

const defaultElectives = [
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

const defaultSem3Core = ["Strategic Management", "Term Paper"];
const defaultSem4Core = ["International Business Management", "Project"];

interface SubjectSyllabusProps {
  data?: any;
  title?: string;
}

export default function SubjectSyllabus({ data, title }: SubjectSyllabusProps) {
  const heading = data?.heading || title || "Online MBA Course Subjects/Syllabus";
  const introText =
    data?.introText ||
    "The online MBA course syllabus is bifurcated into 2 years or 4 semesters, which helps you in understanding that in the 1st year, you will acknowledge basic management or related information or skills, while in the 2nd year, you can grasp skills in particular specializations (HR, operations, business analytics, IT, or marketing) in management programs.";
  
  const disclaimer =
    data?.disclaimer ||
    "*The syllabus mentioned below is a general syllabus of the Online MBA course; most universities cover these topics, but you still need to check on the university page before enrolling for the course.";

  const parseList = (input: any, defaultList: string[]) => {
    if (!input) return defaultList;
    if (Array.isArray(input)) return input;
    if (typeof input === "string") {
      return input
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return defaultList;
  };

  const sem1Items = parseList(data?.semester1, defaultSem1);
  const sem2Items = parseList(data?.semester2, defaultSem2);
  const sem3CoreItems = parseList(data?.semester3Core, defaultSem3Core);
  const sem4CoreItems = parseList(data?.semester4Core, defaultSem4Core);
  const electiveItems = parseList(data?.electives, defaultElectives);

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          {heading.includes("Online MBA") ? (
            <>
              <span className="text-[#ee2c3c]">Online MBA</span>{" "}
              {heading.replace("Online MBA", "").trim()}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      <div className="mb-8 max-w-4xl mx-auto text-center">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {introText}
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-slate-500 sm:text-base">
          {disclaimer}
        </p>
      </div>

      {/* Syllabus panel */}
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-white sm:text-base">
            {heading}
          </h3>
        </div>

        {/* Semester I & II */}
        <SemesterHeaderRow left="Semester I" right="Semester II" />
        <div className="grid sm:grid-cols-2 border-b border-slate-200">
          <SubjectList items={sem1Items} bordered />
          <SubjectList items={sem2Items} />
        </div>

        {/* Semester III & IV */}
        <SemesterHeaderRow left="Semester III" right="Semester IV" />
        <div className="grid sm:grid-cols-2">
          <div className="border-b sm:border-b-0 sm:border-r border-slate-200 bg-slate-50 px-6 py-6">
            <CoreBlock items={sem3CoreItems} />
            <ElectivesBlock items={electiveItems} />
          </div>
          <div className="bg-white px-6 py-6">
            <CoreBlock items={sem4CoreItems} />
            <ElectivesBlock items={electiveItems} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 bg-slate-100 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-slate-900 sm:text-base">
            Skills obtained in the course
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
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
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
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
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
        There are {items.length} electives; please review the list.
      </p>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
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
