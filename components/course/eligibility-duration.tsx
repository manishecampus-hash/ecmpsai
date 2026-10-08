"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { Info } from "lucide-react";

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

  const cards = [
    eligCriteria && { title: "Educational Qualification", html: eligCriteria, icon: <GraduationIcon /> },
    durationText && { title: "Duration", html: durationText, icon: <ClockIcon /> },
  ].filter(Boolean) as { title: string; html: string; icon: React.ReactNode }[];

  return (
    <section className="w-full px-4 py-10 font-sans sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-6xl font-[Inter]">
        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-10">
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

        {/* Qualification & duration cards */}
        {cards.length > 0 && (
          <div className={`grid gap-5 ${cards.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-3xl grid-cols-1"}`}>
            {cards.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_16px_40px_-20px_rgba(238,44,60,0.35)] sm:p-7"
              >
                {/* thin brand accent */}
                <span className="absolute inset-x-0 top-0 h-1 bg-[#ee2c3c] opacity-90" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                    {card.icon}
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{card.title}</h3>
                    <div
                      className="prose prose-slate mt-2.5 max-w-none text-sm font-normal leading-relaxed text-slate-600 sm:text-[15px]"
                      dangerouslySetInnerHTML={{ __html: card.html }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Important Note */}
        {eligNote && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-5 py-4 text-amber-900">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
              <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <div
              className="prose prose-slate max-w-none text-sm font-medium leading-relaxed text-amber-900"
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
