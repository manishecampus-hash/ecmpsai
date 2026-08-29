"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

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

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-900">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Valid?") ? (
              <>
                {heading.split("Valid?")[0]}
                <span className="text-[#ee2c3c]">Valid?</span>
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* Paragraphs */}
        {paragraphs && paragraphs.length > 0 && (
          <div className="mx-auto max-w-4xl text-center space-y-3 mb-10 text-slate-600 text-sm sm:text-base leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}

        {/* Comparison Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Left Card - Online University in India */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#ee2c3c] px-6 py-4 text-center">
              <h3 className="text-base font-bold text-white">{indiaTitle}</h3>
              {indiaSubtitle && (
                <p className="text-xs text-red-100 font-medium mt-0.5">{indiaSubtitle}</p>
              )}
            </div>

            <ul className="p-6 space-y-3.5 flex-1 bg-white">
              {indiaApprovals.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card - Online University Abroad */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#2b3342] px-6 py-4 text-center">
              <h3 className="text-base font-bold text-white">{abroadTitle}</h3>
              {abroadSubtitle && (
                <p className="text-xs text-slate-300 font-medium mt-0.5">{abroadSubtitle}</p>
              )}
            </div>

            <ul className="p-6 space-y-3.5 flex-1 bg-white">
              {foreignApprovals.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Note Alert */}
        {importantNote && (
          <div className="mt-8 max-w-5xl mx-auto rounded-xl border-l-4 border-amber-500 bg-[#fffdf0] p-4 shadow-sm flex items-start gap-3">
            <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
              !
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="font-bold text-slate-900">Important:</strong> {importantNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
