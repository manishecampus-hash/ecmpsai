"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

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
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Programs") || heading.includes("MBA") || heading.includes("Course") ? (
              <>
                {heading.split(/(Programs|MBA|Course)/)[0]}
                <span className="text-[#ee2c3c]">
                  {heading.match(/(Programs|MBA|Course)/)?.[0]}
                </span>
                {heading.split(/(Programs|MBA|Course)/).slice(2).join("")}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {types && Array.isArray(types) && types.length > 0 && (
          <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
            {cardTitle && <TableCaption>{cardTitle}</TableCaption>}

            <div className="hidden grid-cols-[260px_1fr] border-b border-slate-200 bg-white md:grid">
              <div className="px-7 py-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Courses</h4>
              </div>
              <div className="border-l border-slate-100 px-7 py-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Details</h4>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {types.map((type: any, i: number) => {
                const typeName = type.name || type.title || type.heading;
                const typeAbout = type.about || type.description || type.details || "";
                const typeDuration = type.duration || "";
                const typeFees = type.fees || type.fee || "";

                return (
                  <div
                    key={i}
                    className="group grid gap-3 px-5 py-5 transition-colors hover:bg-red-50/40 sm:px-7 md:grid-cols-[260px_1fr] md:gap-0"
                  >
                    <div className="flex items-start gap-3 md:pr-6">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                        {typeName}
                      </span>
                    </div>

                    <div className="space-y-3 md:border-l md:border-slate-100 md:pl-7">
                      {typeAbout && (
                        <div className="flex items-start gap-2.5">
                          <CheckBubble />
                          <span className="text-sm leading-relaxed text-slate-600">{typeAbout}</span>
                        </div>
                      )}

                      {(typeDuration || typeFees) && (
                        <div className="flex flex-wrap gap-2 pl-7">
                          {typeDuration && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600 ring-1 ring-slate-200">
                              <span className="font-semibold text-slate-900">Duration —</span>
                              {typeDuration}
                            </span>
                          )}
                          {typeFees && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50/70 px-2.5 py-1.5 text-xs text-slate-700 ring-1 ring-red-100">
                              <span className="font-semibold text-slate-900">Fees —</span>
                              {typeFees}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function TableCaption({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
      <span className="h-5 w-1 shrink-0 rounded-full bg-[#ee2c3c]" />
      <h3 className="text-sm font-semibold leading-snug text-slate-800 sm:text-base">{children}</h3>
    </div>
  );
}
