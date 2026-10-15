"use client";

import React from "react";
import { CourseSection, SectionHeading } from "./section-ui";

// "Subject A, Subject B, …" → individual subjects; sentence-style text stays as it is
function toSubjects(text: string): string[] | null {
  const parts = text.split(/\s*,\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2 || /[.!?](\s|$)/.test(text.trim())) return null;
  return parts.some((p) => p.split(/\s+/).length > 6) ? null : parts;
}

export default function CourseSyllabus({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  // Segment 1: Programme Structure / Journey Cards
  const journeyBadge = data?.journeyBadge;
  const journeyTitle = data?.journeyTitle;
  const journeySubtitle = data?.journeySubtitle;

  const rawSemesters = data?.semesters || data?.journeyCards;
  const semesters = Array.isArray(rawSemesters) && rawSemesters.length > 0
    ? rawSemesters.map((s: any, i: number) => ({
        number: s.number || `0${i + 1}`,
        title: s.title || s.semester || `Semester ${i + 1}`,
        text: s.text || s.description || (Array.isArray(s.subjects) ? s.subjects.join(", ") : "")
      }))
    : [];

  // Segment 2: Core Subjects Covered
  const coreSubLabel = data?.coreSubLabel;
  const coreTitle = data?.coreTitle;
  const coreBadge = data?.coreBadge;
  const coreDescription = data?.coreDescription;

  const rawCoreSubjects = data?.coreSubjects;
  const coreSubjects: string[] = Array.isArray(rawCoreSubjects)
    ? rawCoreSubjects
    : typeof rawCoreSubjects === "string" && rawCoreSubjects.trim()
    ? rawCoreSubjects.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const note = data?.note;

  // Don't render empty sections
  const showSegment1 = Boolean(journeyTitle || semesters.length > 0);
  const showSegment2 = Boolean(coreTitle || coreSubjects.length > 0);

  if (!showSegment1 && !showSegment2 && !note) {
    return null;
  }

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Syllabus/} />

      <div className="space-y-6">
        {/* Segment 1: semester-wise syllabus table */}
        {showSegment1 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            {(journeyBadge || journeyTitle || journeySubtitle) && (
              <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                <div>
                  {journeyBadge && (
                    <p className="text-xs font-bold uppercase tracking-wider text-[#ee2c3c]">{journeyBadge}</p>
                  )}
                  {journeyTitle && <h3 className="mt-0.5 text-lg font-bold text-slate-900 sm:text-xl">{journeyTitle}</h3>}
                </div>
                {journeySubtitle && <p className="text-sm text-slate-500">{journeySubtitle}</p>}
              </div>
            )}

            {semesters.length > 0 && (
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th scope="col" className="w-[32%] px-5 py-3 sm:w-[220px] sm:px-6">Semester</th>
                    <th scope="col" className="px-5 py-3 sm:px-6">Subjects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {semesters.map((sem, idx) => {
                    const subjects = toSubjects(sem.text);
                    return (
                      <tr key={idx} className="align-top transition-colors hover:bg-slate-50/70">
                        <th scope="row" className="border-r border-slate-100 px-5 py-4 font-semibold text-slate-900 sm:px-6">
                          <span className="block border-l-[3px] border-[#ee2c3c] pl-3 leading-snug">{sem.title.replace(/\b0+(\d)/g, "$1")}</span>
                        </th>
                        <td className="px-5 py-4 sm:px-6">
                          {subjects ? (
                            <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                              {subjects.map((subject) => (
                                <li key={subject} className="flex items-start gap-2.5 leading-snug text-slate-700">
                                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee2c3c]" />
                                  {subject}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="leading-relaxed text-slate-600">{sem.text}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Segment 2: Core Subjects Covered */}
        {showSegment2 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
            {/* Card Header */}
            {(coreSubLabel || coreTitle || coreBadge) && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-white shadow-md shadow-red-500/25">
                    <TargetIcon />
                  </span>

                  <div>
                    {coreSubLabel && (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#ee2c3c]">
                        {coreSubLabel}
                      </p>
                    )}
                    {coreTitle && (
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                        {coreTitle}
                      </h3>
                    )}
                  </div>
                </div>

                {coreBadge && (
                  <span className="rounded-full border border-red-100 bg-red-50 px-3.5 py-1 text-xs font-bold text-[#ee2c3c]">
                    {coreBadge}
                  </span>
                )}
              </div>
            )}

            {/* Card Content */}
            <div className="p-6 sm:p-8">
              {coreDescription && (
                <p className="mb-6 max-w-4xl text-sm font-normal leading-relaxed text-slate-600">
                  {coreDescription}
                </p>
              )}

              {coreSubjects.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {coreSubjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 transition-colors hover:border-red-200 hover:bg-red-50/40"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold leading-snug text-slate-800">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Optional Note */}
        {note && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-5 py-4 text-sm font-medium text-amber-900">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
              i
            </span>
            <div dangerouslySetInnerHTML={{ __html: note }} />
          </div>
        )}
      </div>
    </CourseSection>
  );
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2v3M22 12h-3M12 22v-3M2 12h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
