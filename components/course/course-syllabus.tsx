"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

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
    <section className="relative w-full max-w-6xl mx-auto px-4 py-10 font-sans text-black sm:px-6 lg:px-8 font-[Inter]">
      <div className="max-w-6xl mx-auto">
        {/* Main Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Syllabus") ? (
              <>
                {heading.split("Syllabus")[0]}
                <span className="text-[#ee2c3c]">Syllabus</span>
                {heading.split("Syllabus")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Segment 1: Programme Structure Journey */}
          {showSegment1 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
              {(journeyBadge || journeyTitle || journeySubtitle) && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-5">
                  <div>
                    {journeyBadge && (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#ee2c3c]">
                        {journeyBadge}
                      </p>
                    )}
                    {journeyTitle && (
                      <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                        {journeyTitle}
                      </h3>
                    )}
                  </div>

                  {journeySubtitle && (
                    <p className="text-xs sm:text-sm text-slate-400 font-normal">
                      {journeySubtitle}
                    </p>
                  )}
                </div>
              )}

              {semesters.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {semesters.map((sem, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 flex flex-col justify-between transition-all duration-300 hover:border-red-200 hover:bg-white hover:shadow-md min-h-[190px]"
                    >
                      <div>
                        <span className="text-3xl font-extrabold text-[#ee2c3c]/25 block mb-2 font-mono">
                          {sem.number}
                        </span>

                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          {sem.title}
                        </h4>

                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                          {sem.text}
                        </p>
                      </div>

                      <div className="mt-4 h-[3px] w-6 rounded-full bg-[#ee2c3c] transition-all duration-300 group-hover:w-10" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Segment 2: Core Subjects Covered */}
          {showSegment2 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
              {/* Card Header */}
              {(coreSubLabel || coreTitle || coreBadge) && (
                <div className="border-b border-slate-100 bg-white px-6 py-5 sm:px-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-white shadow-xs">
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
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-6 max-w-4xl font-normal">
                    {coreDescription}
                  </p>
                )}

                {coreSubjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
                    {coreSubjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-xs font-bold text-red-400">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
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
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white mt-0.5">
                i
              </span>
              <div dangerouslySetInnerHTML={{ __html: note }} />
            </div>
          )}
        </div>
      </div>
    </section>
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
