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
          <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
            {cardTitle && (
              <div className="bg-[#ee2c3c] px-6 py-4">
                <h3 className="text-sm font-bold text-white text-center">
                  {cardTitle}
                </h3>
              </div>
            )}

            <div className="hidden md:grid grid-cols-[240px_1fr] bg-red-50/60 border-b border-slate-100">
              <div className="px-6 py-3">
                <h4 className="text-sm font-bold text-slate-900">Courses</h4>
              </div>

              <div className="px-6 py-3 border-l border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">Details</h4>
              </div>
            </div>

            {types.map((type: any, i: number) => {
              const typeName = type.name || type.title || type.heading;
              const typeAbout = type.about || type.description || type.details || "";
              const typeDuration = type.duration || "";
              const typeFees = type.fees || type.fee || "";

              return (
                <div
                  key={i}
                  className={`grid md:grid-cols-[240px_1fr] gap-4 md:gap-0 px-6 py-5 ${
                    i % 2 === 0 ? "bg-red-50/40" : "bg-white"
                  } ${
                    i !== types.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <span className="text-sm font-semibold text-red-500 self-start">
                    {typeName}
                  </span>

                  <div className="md:pl-6 md:border-l border-slate-100 space-y-3">
                    {typeAbout && (
                      <div className="flex items-start gap-2.5">
                        <CheckBubble />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          {typeAbout}
                        </span>
                      </div>
                    )}

                    {typeDuration && (
                      <div className="flex items-start gap-2.5">
                        <CheckBubble />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-900 italic">
                            Duration —{" "}
                          </span>
                          {typeDuration}
                        </span>
                      </div>
                    )}

                    {typeFees && (
                      <div className="flex items-start gap-2.5">
                        <CheckBubble />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-900 italic">
                            Fees —{" "}
                          </span>
                          {typeFees}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
