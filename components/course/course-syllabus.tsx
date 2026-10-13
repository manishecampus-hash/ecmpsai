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
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
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
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {semesters.map((sem, idx) => (
                    <div
                      key={idx}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-20px_rgba(238,44,60,0.4)]"
                    >
                      {/* large faint number watermark */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-6 -right-1 select-none text-8xl font-black leading-none text-slate-50 transition-colors duration-300 group-hover:text-red-50"
                      >
                        {sem.number}
                      </span>

                      <div className="relative flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-sm font-extrabold tabular-nums text-white shadow-md shadow-red-500/25">
                          {sem.number}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                          {sem.title}
                        </h4>
                      </div>

                      <div className="relative mt-4 border-t border-dashed border-slate-200 pt-4">
                        <p className="text-sm font-normal leading-relaxed text-slate-600">
                          {sem.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
