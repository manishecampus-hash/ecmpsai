"use client";

import React from "react";

export interface SemesterData {
  title: string;
  subjects: string[];
  electives: string[];
}

interface SubjectSyllabusProps {
  data?: any;
  title?: string;
}

export function RenderHeading({
  text,
  colorClass = "text-[#ee2c3c]",
  colorHex = "#ee2c3c",
}: {
  text?: string | null;
  colorClass?: string;
  colorHex?: string;
}) {
  if (!text || typeof text !== "string") return null;

  // Match *word*, *multiple words*, etc.
  const regex = /(\*{1,2}[^*]+\*{1,2})/g;
  const parts = text.split(regex);

  if (parts.length === 1 && !text.includes("*")) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isAsteriskWrapped =
          (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
          (part.startsWith("*") && part.endsWith("*") && part.length > 2);

        if (isAsteriskWrapped) {
          const content = part.replace(/^\*+|\*+$/g, "");
          return (
            <span
              key={index}
              className={colorClass}
              style={{ color: colorHex }}
            >
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

export function stripAsterisks(text: string): string {
  if (!text) return "";
  return text.replace(/\*+/g, "").trim();
}

function parseSubjects(input: any): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((s) => (typeof s === "string" ? s.trim() : String(s))).filter(Boolean);
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];
    if (trimmed.includes("\n")) {
      return trimmed.split("\n").map((s) => s.trim()).filter(Boolean);
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function getNormalizedSemesters(data: any): SemesterData[] {
  if (Array.isArray(data?.semesters) && data.semesters.length > 0) {
    return data.semesters
      .map((sem: any, idx: number) => {
        const title = (sem?.title || "").trim() || `Semester ${idx + 1}`;
        const subjects = parseSubjects(sem?.subjects);
        const electives = parseSubjects(sem?.electives);
        return { title, subjects, electives };
      })
      .filter((sem: SemesterData) => sem.subjects.length > 0 || sem.electives.length > 0);
  }

  // Backward compatibility fallback if legacy fields are present
  const legacy: SemesterData[] = [];
  const sem1 = parseSubjects(data?.semester1);
  if (sem1.length > 0) {
    legacy.push({ title: "Semester I", subjects: sem1, electives: [] });
  }
  const sem2 = parseSubjects(data?.semester2);
  if (sem2.length > 0) {
    legacy.push({ title: "Semester II", subjects: sem2, electives: [] });
  }
  const sem3Core = parseSubjects(data?.semester3Core);
  const legacyElectives = parseSubjects(data?.electives);
  if (sem3Core.length > 0 || legacyElectives.length > 0) {
    legacy.push({ title: "Semester III", subjects: sem3Core, electives: legacyElectives });
  }
  const sem4Core = parseSubjects(data?.semester4Core);
  if (sem4Core.length > 0) {
    legacy.push({ title: "Semester IV", subjects: sem4Core, electives: legacyElectives });
  }
  return legacy;
}

export default function SubjectSyllabus({ data, title }: SubjectSyllabusProps) {
  // Use ONLY configured heading, NO fallback string
  const heading = (data?.heading || title || "").trim();
  const tableHeading = (data?.tableHeading || data?.heading || title || "").trim();
  const introText = (data?.introText || "").trim();
  const disclaimer = (data?.disclaimer || "").trim();
  const semesters = getNormalizedSemesters(data);

  // If no data configured at all, render nothing (no fallback, placeholder, dummy content)
  if (!heading && !introText && semesters.length === 0) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading ? (
        <div className="mb-6 text-center">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      ) : null}

      {/* Intro & Disclaimer - render only if configured */}
      {introText || disclaimer ? (
        <div className="mb-8 max-w-4xl mx-auto text-center">
          {introText ? (
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {introText}
            </p>
          ) : null}
          {disclaimer ? (
            <p className="mt-3 text-sm italic leading-relaxed text-slate-500 sm:text-base">
              {disclaimer}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Syllabus panel - render only if semesters exist */}
      {semesters.length > 0 ? (
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 overflow-hidden bg-slate-200 shadow-sm">
          {tableHeading ? (
            <div className="bg-slate-900 px-6 py-4">
              <h3
                className="text-center text-sm font-bold text-white sm:text-base tracking-wide"
                style={{ color: "#ffffff" }}
              >
                {stripAsterisks(tableHeading)}
              </h3>
            </div>
          ) : null}

          <div
            className={`grid grid-cols-1 ${
              semesters.length > 1 ? "md:grid-cols-2" : ""
            } gap-px bg-slate-200`}
          >
            {semesters.map((sem, idx) => (
              <div
                key={idx}
                className={`bg-white flex flex-col ${
                  semesters.length > 1 && semesters.length % 2 === 1 && idx === semesters.length - 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                {/* Semester Title */}
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                  <h4 className="text-center text-sm font-bold text-slate-900 sm:text-base">
                    {sem.title}
                  </h4>
                </div>

                {/* Subjects & Optional Electives */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {sem.electives.length > 0 && sem.subjects.length > 0 ? (
                      <p className="mb-3 text-sm font-bold text-slate-900">Core Subjects</p>
                    ) : null}

                    {sem.subjects.length > 0 ? (
                      <ul className="space-y-3.5">
                        {sem.subjects.map((item, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3">
                            <CheckBubble />
                            <span className="text-sm font-medium text-slate-700 sm:text-base">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {/* Electives - Render ONLY when configured and non-empty */}
                  {sem.electives.length > 0 ? (
                    <div className="mt-6 pt-5 border-t border-slate-200">
                      <p className="mb-1 text-sm font-bold text-slate-900">
                        Electives / Specialization Subjects:
                      </p>
                      <p className="mb-3 text-xs text-slate-500">
                        {sem.electives.length} {sem.electives.length === 1 ? "elective subject" : "elective subjects"} available:
                      </p>
                      <ul className="space-y-3">
                        {sem.electives.map((el, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-3">
                            <CheckBubble />
                            <span className="text-sm font-medium text-slate-700 sm:text-base">
                              {el}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Optional Bottom Bar - only if custom text configured */}
          {data?.bottomBarText ? (
            <div className="border-t border-slate-200 bg-slate-100 px-6 py-4">
              <h3 className="text-center text-sm font-bold text-slate-900 sm:text-base">
                {data.bottomBarText}
              </h3>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
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
