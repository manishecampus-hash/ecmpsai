"use client";

import React from "react";
import { Award, Briefcase, Globe2, Layers, Sparkles, TrendingUp, UsersRound, Wallet, type LucideIcon } from "lucide-react";
import { CARD_W, CENTERED_GRID, CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

const HIGHLIGHT_ICONS: [RegExp, LucideIcon][] = [
  [/network|peer|connect|community/i, UsersRound],
  [/value|recogni|accredit|degree|approv/i, Award],
  [/\bwork|\bjobs?\b|career|professional/i, Briefcase],
  [/anywhere|online|remote|flexib|pace/i, Globe2],
  [/\bfees?\b|cost|afford|\bemi\b/i, Wallet],
  [/placement|growth|salary/i, TrendingUp],
  [/stage|everyone|fresher|graduate|level/i, Layers],
];

export default function KeyHighlights({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const list = data?.list || data?.items || [];
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }

  const items = list
    .map((h: any) => ({ title: h.title || h.heading, text: h.text || h.description || h.detail }))
    .filter((h: { title?: string; text?: string }) => h.title || h.text);

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/India/} />

      <div className={CENTERED_GRID}>
        {items.map((h: { title?: string; text?: string }, i: number) => {
          const Icon = iconFor(h.title || "", HIGHLIGHT_ICONS, iconFor(h.text || "", HIGHLIGHT_ICONS, Sparkles));
          return (
            <Reveal key={i} delay={i * 0.06} className={CARD_W[3]}>
              <div className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-22px_rgba(238,44,60,0.45)] sm:block sm:p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 hidden select-none text-[52px] sm:block font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-red-50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#ee2c3c] group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/25">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="relative min-w-0">
                  {h.title && <h3 className="text-base font-bold leading-snug text-slate-900 sm:mt-4">{h.title}</h3>}
                  {h.text && <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:mt-1.5">{h.text}</p>}
                </div>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#ee2c3c] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </CourseSection>
  );
}
