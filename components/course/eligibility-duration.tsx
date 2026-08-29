"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function EligibilityDuration({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const eligCriteria = data?.eligCriteria || data?.qualification || data?.educationalQualification || "";
  const durationText = data?.durationText || data?.duration || "";
  const eligNote = data?.eligNote || data?.note || data?.importantNote || "";

  // If no content inside card exists at all, do not render
  if (!eligCriteria && !durationText && !eligNote) {
    return null;
  }

  return (
    <section className="w-full px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl font-[Inter]">
        {/* Section Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="text-[23px] font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Eligibility") ? (
              <>
                {heading.split("Eligibility")[0]}
                <span className="text-[#ee2c3c]">Eligibility</span>
                {heading.split("Eligibility")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* Outer Pink Box */}
        {(eligCriteria || durationText) && (
          <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-red-50/40 p-3 shadow-xs sm:p-5">
            {/* Inner White Box */}
            <div className={`relative grid overflow-hidden rounded-2xl bg-white border border-slate-100/80 ${
              eligCriteria && durationText ? "md:grid-cols-2" : "grid-cols-1"
            }`}>
              {/* Educational Qualification */}
              {eligCriteria && (
                <div className={`px-6 py-7 sm:px-8 sm:py-8 ${
                  eligCriteria && durationText ? "border-b border-slate-100 md:border-b-0 md:border-r" : ""
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c]">
                      <GraduationIcon />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                        Educational Qualification
                      </h3>

                      <div 
                        className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 prose prose-slate max-w-none font-normal"
                        dangerouslySetInnerHTML={{ __html: eligCriteria }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Duration */}
              {durationText && (
                <div className="px-6 py-7 sm:px-8 sm:py-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c]">
                      <ClockIcon />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                        Duration
                      </h3>

                      <div 
                        className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 prose prose-slate max-w-none font-normal"
                        dangerouslySetInnerHTML={{ __html: durationText }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Important Note */}
        {eligNote && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 px-5 py-3.5 text-xs sm:text-sm text-slate-600">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-xs font-bold text-white">
              !
            </div>

            <div 
              className="leading-relaxed prose prose-slate max-w-none text-xs sm:text-sm font-medium"
              dangerouslySetInnerHTML={{ __html: eligNote }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function GraduationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2.5 9.2L12 5l9.5 4.2L12 13.5 2.5 9.2Z" fill="currentColor" />
      <path d="M6.5 11.2v4.4c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
