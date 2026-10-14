"use client";

import React from "react";
import { Clock3, IndianRupee } from "lucide-react";
import { CARD_W, CENTERED_GRID, CheckDot, CourseSection, Reveal, SectionHeading } from "./section-ui";

type CourseType = {
  name: string;
  about: string;
  duration: string;
  fees: string;
};

const DEFAULT_TYPES: CourseType[] = [
  {
    name: "Distance Education",
    about:
      "A remote or hybrid study format where you aren't required to attend classes physically — you only need to appear for exams, and the degree carries the same standing once approved.",
    duration: "2 years (may vary by university)",
    fees: "₹20,000 to ₹2 Lakhs (approx.)",
  },
  {
    name: "Part-Time Program",
    about:
      "A flexible program built for working executives, with classes scheduled around weekends, evenings, or through recorded lectures on the LMS.",
    duration: "3 to 5 years (may vary by university)",
    fees: "₹80,000 to ₹6 Lakhs (approx.)",
  },
  {
    name: "Online Global Program",
    about:
      "A remotely delivered program focused on the global business environment, letting you study from anywhere while continuing your career.",
    duration: "1 to 2 years (UGC-DEB Indian degrees remain 2-year minimum)",
    fees: "₹30,000 to ₹3 Lakhs (approx.)",
  },
  {
    name: "Executive Program for Working Professionals",
    about:
      "Designed for working professionals looking to sharpen strategic leadership and managerial skills while building a strong professional network.",
    duration: "15 months to 2 years (may vary by university)",
    fees: "₹6 Lakhs to ₹25 Lakhs (approx.)",
  },
];

export default function TypesOfOnlineCourse({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // If heading/title is not present, hide the section altogether
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const cardTitle = data?.cardTitle || data?.subtitle || "Types of Online Programs";
  const types: CourseType[] = data?.types || data?.list || DEFAULT_TYPES;

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Programs|MBA|Course/} />

      {cardTitle && (
        <p className="mx-auto -mt-2 mb-6 flex w-fit max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-center text-xs font-semibold text-slate-600 shadow-sm">
          <IndianRupee className="h-3.5 w-3.5 shrink-0 text-[#ee2c3c]" />
          {cardTitle}
        </p>
      )}

      {Array.isArray(types) && types.length > 0 && (
        <div className={CENTERED_GRID}>
          {types.map((type: any, i: number) => {
            const typeName = type.name || type.title || type.heading;
            const typeAbout = type.about || type.description || type.details || "";
            const typeDuration = type.duration || "";
            const typeFees = type.fees || type.fee || "";

            return (
              <Reveal key={i} delay={(i % 3) * 0.07} className={CARD_W[3]}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_22px_44px_-22px_rgba(238,44,60,0.5)] sm:p-5">
                  <div className="relative flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ee2c3c] to-[#c81e2f] text-sm font-extrabold tabular-nums text-white shadow-md shadow-red-500/25 transition-transform duration-300 group-hover:scale-105">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="pt-1 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#ee2c3c]">{typeName}</h3>
                  </div>

                  {typeAbout && (
                    <div className="relative mt-3 flex flex-1 items-start gap-2.5 sm:mt-4">
                      <CheckDot />
                      <p className="text-sm leading-relaxed text-slate-600">{typeAbout}</p>
                    </div>
                  )}

                  {(typeDuration || typeFees) && (
                    <div className="relative mt-3 flex flex-wrap gap-2 border-t border-dashed border-slate-200 pt-3 sm:mt-4 sm:pt-4">
                      {typeDuration && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200">
                          <Clock3 className="h-3.5 w-3.5 text-[#ee2c3c]" />
                          <span className="font-semibold text-slate-900">Duration</span> {typeDuration}
                        </span>
                      )}
                      {typeFees && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs text-slate-700 ring-1 ring-red-100">
                          <IndianRupee className="h-3.5 w-3.5 text-[#ee2c3c]" />
                          <span className="font-semibold text-slate-900">Fees</span> {typeFees}
                        </span>
                      )}
                    </div>
                  )}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#ee2c3c] transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </CourseSection>
  );
}
