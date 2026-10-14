"use client";

import React from "react";
import { Check, Clock3, Sparkles, Star, TrendingUp, UsersRound, Wallet, type LucideIcon } from "lucide-react";
import { CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

const CATEGORY_ICONS: [RegExp, LucideIcon][] = [
  [/cost|fee|afford|money/i, Wallet],
  [/flexib|time|schedule/i, Clock3],
  [/network|peer|community/i, UsersRound],
  [/professional|career|job/i, TrendingUp],
  [/personal|self|confidence/i, Sparkles],
];

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

  const list = (Array.isArray(categories) ? categories : []).map((cat: any) => ({
    name: cat.name || cat.title || cat.heading || "",
    items: (Array.isArray(cat.items) ? cat.items : Array.isArray(cat.points) ? cat.points : []) as string[],
  }));

  // One panel, categories side by side with thin dividers (stacked on phones)
  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Offer\??/} />

      {list.length > 0 && (
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            {cardTitle && (
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3.5 sm:px-6">
                <span className="h-4 w-1 shrink-0 rounded-full bg-[#ee2c3c]" />
                <h3 className="text-sm font-semibold text-slate-800 sm:text-[15px]">{cardTitle}</h3>
              </div>
            )}

            <div
              className="grid sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
              style={{ "--cols": list.length } as React.CSSProperties}
            >
              {list.map((cat, i) => {
                const Icon = iconFor(cat.name, CATEGORY_ICONS, Star);
                return (
                  <div
                    key={i}
                    className="group border-slate-100 p-5 transition-colors hover:bg-red-50/30 max-sm:border-t max-sm:first:border-t-0 sm:max-lg:even:border-l sm:max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0 sm:p-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h4 className="mt-3.5 text-[15px] font-bold leading-snug text-slate-900">{cat.name}</h4>
                    <ul className="mt-3 space-y-2">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}
    </CourseSection>
  );
}
