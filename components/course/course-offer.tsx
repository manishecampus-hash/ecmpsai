"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

type Category = {
  name: string;
  items: string[];
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    name: "Cost Effectiveness",
    items: [
      "Lower tuition fees",
      "No commuting costs",
      "Loan, instalment, and EMI options available",
    ],
  },
  {
    name: "Flexibility",
    items: [
      "Freedom to keep working while you study",
      "Learn around live class schedules that fit your routine",
    ],
  },
  {
    name: "Networking",
    items: [
      "Access to a broader range of programs",
      "Virtual events and webinars",
      "Social media engagement with peers and alumni",
      "Study groups and collaborative projects",
    ],
  },
  {
    name: "Professional Growth",
    items: [
      "Increased marketability to employers",
      "Leadership skills development",
      "Business analytics expertise",
      "Broad networking opportunities",
    ],
  },
  {
    name: "Personal Growth",
    items: [
      "Broadened horizons and perspective",
      "Self-confidence development",
      "Leadership development",
      "Self-discipline",
      "Communication proficiency",
      "Adaptability and innovation",
    ],
  },
];

export default function CourseOffer({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // If heading is not present, hide the section altogether
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const cardTitle = data?.cardTitle || data?.subtitle || "What Online Degree Courses Offer";
  const categories: Category[] = data?.categories || data?.list || DEFAULT_CATEGORIES;

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Offer") ? (
              <>
                {heading.split("Offer")[0]}
                <span className="text-[#ee2c3c]">Offer?</span>
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {categories && Array.isArray(categories) && categories.length > 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
            {cardTitle && (
              <div className="bg-[#ee2c3c] px-6 py-4">
                <h3 className="text-sm font-bold text-white text-center">
                  {cardTitle}
                </h3>
              </div>
            )}

            {categories.map((cat: any, i: number) => {
              const catName = cat.name || cat.title || cat.heading;
              const catItems: string[] = Array.isArray(cat.items)
                ? cat.items
                : Array.isArray(cat.points)
                ? cat.points
                : [];

              return (
                <div
                  key={i}
                  className={`grid md:grid-cols-[220px_1fr] gap-4 md:gap-0 px-6 py-5 ${
                    i % 2 === 0 ? "bg-red-50/40" : "bg-white"
                  } ${
                    i !== categories.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <span className="text-sm font-bold text-slate-900 self-start">
                    {catName}
                  </span>

                  <ul className="md:pl-6 md:border-l border-slate-100 space-y-3">
                    {catItems.map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckBubble />

                        <span className="text-sm text-slate-600 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
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
