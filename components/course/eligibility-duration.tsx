"use client";

import React from "react";
import { Info } from "lucide-react";
import { CourseSection, Reveal, SectionHeading } from "./section-ui";

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
    eligCriteria && { label: "Who can apply", title: "Educational Qualification", html: eligCriteria, icon: <GraduationIcon /> },
    durationText && { label: "How long it takes", title: "Course Duration", html: durationText, icon: <ClockIcon /> },
  ].filter(Boolean) as { label: string; title: string; html: string; icon: React.ReactNode }[];

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Eligibility/} />

      {cards.length > 0 && (
        <div className={`grid gap-5 ${cards.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-24px_rgba(238,44,60,0.45)]">
                <div className="flex items-center gap-3.5 border-b border-red-100 bg-red-50/60 px-6 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#ee2c3c] shadow-sm ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                    {card.icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">{card.label}</p>
                    <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  </div>
                </div>
                <div className="px-6 py-5 text-[15px] leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: card.html }} />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {eligNote && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 border-l-4 border-l-[#ee2c3c] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c]">
            <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <div className="text-sm leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900">Good to know: </span>
            <span dangerouslySetInnerHTML={{ __html: eligNote }} />
          </div>
        </div>
      )}
    </CourseSection>
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
