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
          <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
            {cardTitle && <TableCaption>{cardTitle}</TableCaption>}

            <div className="divide-y divide-slate-100">
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
                    className="group grid gap-4 px-5 py-5 transition-colors hover:bg-red-50/40 sm:px-7 md:grid-cols-[240px_1fr] md:gap-0"
                  >
                    <div className="flex items-start gap-3 md:pr-6">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                        {catName}
                      </span>
                    </div>

                    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 md:border-l md:border-slate-100 md:pl-7">
                      {catItems.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckBubble />
                          <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
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
