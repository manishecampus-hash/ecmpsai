"use client";

import React from "react";
import {
  BadgeCheck,
  Briefcase,
  Clock3,
  Crown,
  Globe2,
  Library,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { CARD_W, CENTERED_GRID, CourseSection, RICH_TEXT, Reveal, SectionHeading, iconFor } from "./section-ui";

const BENEFIT_ICONS: [RegExp, LucideIcon][] = [
  [/network|global|connect/i, Globe2],
  [/problem|solv|framework|think/i, Lightbulb],
  [/interrupt|\bjob\b|income|\bwork\b/i, Briefcase],
  [/credib|authority|recogni/i, BadgeCheck],
  [/flexib|pac|schedul|time/i, Clock3],
  [/library|resource|research/i, Library],
  [/cost|afford|fee|expens/i, Wallet],
  [/leader|maturity|executive/i, Crown],
  [/career|advance|growth|promot/i, TrendingUp],
];

export default function Professionals({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // If title is not present, hide the section
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const description = data?.description || data?.subtext || "";
  const list = data?.list || data?.points || data?.bullets || [];

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Professionals/} />

      {description ? (
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 pl-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.3)] sm:p-8 sm:pl-10">
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#ee2c3c]" />
            <div
              className={`${RICH_TEXT} relative lg:columns-2 lg:gap-12 [&_p]:break-inside-avoid`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </Reveal>
      ) : null}

      {Array.isArray(list) && list.length > 0 && (
        <ul className={`mt-5 ${CENTERED_GRID}`}>
          {list.map((item: any, i: number) => {
            const itemTitle = typeof item === "string" ? "" : item.title || item.heading || "";
            const itemText = typeof item === "string" ? item : item.text || item.description || item.detail || "";
            const Icon = iconFor(itemTitle || itemText, BENEFIT_ICONS, Sparkles);

            return (
              <li key={i} className={CARD_W[3]}>
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <div className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-22px_rgba(238,44,60,0.45)] sm:p-5">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#ee2c3c] transition-transform duration-300 group-hover:scale-x-100" />
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors duration-300 group-hover:bg-[#ee2c3c] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        {itemTitle && (
                          <strong className="text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#ee2c3c]">
                            {itemTitle}
                          </strong>
                        )}
                        <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold tabular-nums text-slate-500 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{itemText}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}
    </CourseSection>
  );
}
