"use client";

import React from "react";
import { Award, Briefcase } from "lucide-react";
import { CheckDot, CourseSection, Reveal, SectionHeading, VsBadge } from "./section-ui";

const DEFAULT_PARAGRAPHS = [
  "Yes, an Online MBA can be valid when it is offered by a properly recognized university and meets the applicable regulatory requirements for online education.",
  "Before applying, check the university's recognition, accreditation and programme approvals. These details can help you understand the degree's acceptance for employment, higher education and other professional opportunities.",
  "Here are some important approvals, accreditations and rankings to check when comparing Online MBA universities in India and abroad.",
];

const DEFAULT_INDIA_APPROVALS = [
  "UGC-DEB Approval",
  "UGC Recognition",
  "NAAC Accreditation",
  "AICTE Approval",
  "AIU Equivalence",
  "NIRF Ranking",
];

const DEFAULT_FOREIGN_APPROVALS = [
  "WES",
  "AACSB",
  "EQUIS",
  "AMBA",
  "ABET",
  "QS World University Ranking",
];

const DEFAULT_IMPORTANT_NOTE =
  "Approval and accreditation requirements may vary depending on the country, university and specific programme. Always verify the latest status directly through the relevant official regulatory authority and university before enrolling.";

export default function UgcValidity({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // Don't show section if title is not present
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  // Parse paragraphs
  let paragraphs: string[] = DEFAULT_PARAGRAPHS;
  if (data?.paragraphs && Array.isArray(data.paragraphs)) {
    paragraphs = data.paragraphs;
  } else if (data?.description) {
    if (Array.isArray(data.description)) {
      paragraphs = data.description;
    } else if (typeof data.description === "string" && data.description.trim()) {
      paragraphs = data.description.split("\n\n").filter(Boolean);
    }
  }

  // Parse approvals
  const indiaTitle = data?.indiaTitle || "Online University in India";
  const indiaSubtitle = data?.indiaSubtitle || "Check these certifications";
  const indiaApprovals: string[] = data?.indiaApprovals
    ? Array.isArray(data.indiaApprovals)
      ? data.indiaApprovals
      : data.indiaApprovals.split(",").map((s: string) => s.trim()).filter(Boolean)
    : DEFAULT_INDIA_APPROVALS;

  const abroadTitle = data?.abroadTitle || data?.foreignTitle || "Online University Abroad";
  const abroadSubtitle = data?.abroadSubtitle || data?.foreignSubtitle || "International standards";
  const foreignApprovals: string[] = data?.foreignApprovals
    ? Array.isArray(data.foreignApprovals)
      ? data.foreignApprovals
      : data.foreignApprovals.split(",").map((s: string) => s.trim()).filter(Boolean)
    : DEFAULT_FOREIGN_APPROVALS;

  const importantNote = data?.importantNote || data?.disclaimer || DEFAULT_IMPORTANT_NOTE;

  // "(With MBA)" → "With MBA". When both sides share a title (e.g. "Corporate Employee"),
  // show it once above the cards and let the subtitles become the card titles.
  const clean = (v: string) => (v || "").trim().replace(/^\((.*)\)$/, "$1").trim();
  const sharedTitle = clean(indiaTitle) && clean(indiaTitle) === clean(abroadTitle) ? clean(indiaTitle) : "";
  const columns = [
    { title: sharedTitle ? clean(indiaSubtitle) || sharedTitle : clean(indiaTitle), subtitle: sharedTitle ? "" : clean(indiaSubtitle), items: indiaApprovals },
    { title: sharedTitle ? clean(abroadSubtitle) || sharedTitle : clean(abroadTitle), subtitle: sharedTitle ? "" : clean(abroadSubtitle), items: foreignApprovals },
  ];

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Valid\?/} />

      {paragraphs && paragraphs.length > 0 && (
        <div className="mx-auto -mt-2 mb-7 max-w-4xl space-y-3 text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      )}

      {sharedTitle && (
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#ee2c3c]">
            <Briefcase className="h-4 w-4" />
            {sharedTitle}
          </span>
        </div>
      )}

      <div className="relative mx-auto grid max-w-5xl items-stretch gap-4 md:grid-cols-2 md:gap-10">
        {/* Muted side */}
        <Reveal>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-7">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-700 sm:text-[28px]">{columns[0].title}</h3>
              {columns[0].subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{columns[0].subtitle}</p>}
            </div>
            <ul className="flex-1 space-y-4 p-6 sm:px-7">
              {columns[0].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                  <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <VsBadge />

        {/* Highlighted side */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-[#ee2c3c] bg-white shadow-[0_16px_36px_-20px_rgba(238,44,60,0.45)]">
            <div className="flex items-start justify-between gap-3 bg-[#ee2c3c] px-6 py-5 sm:px-7">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">{columns[1].title}</h3>
                {columns[1].subtitle && <p className="mt-1 text-sm font-medium text-red-100">{columns[1].subtitle}</p>}
              </div>
              <Award className="mt-1 h-6 w-6 shrink-0 text-white/90" />
            </div>
            <ul className="flex-1 space-y-4 p-6 sm:px-7">
              {columns[1].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckDot tone="red" />
                  <span className="text-sm font-semibold leading-relaxed text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {importantNote && (
        <div className="mx-auto mt-7 flex max-w-5xl items-start gap-3 rounded-xl border-l-4 border-amber-500 bg-[#fffdf0] p-4 shadow-sm">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
            !
          </span>
          <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
            <strong className="font-bold text-slate-900">Important:</strong> {importantNote}
          </p>
        </div>
      )}
    </CourseSection>
  );
}
