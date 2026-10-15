"use client";

import React from "react";
import { Award, Briefcase, Globe2, Layers, Sparkles, TrendingUp, UsersRound, Wallet, type LucideIcon } from "lucide-react";
import { CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

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

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {items.map((h: { title?: string; text?: string }, i: number) => {
          const Icon = iconFor(h.title || "", HIGHLIGHT_ICONS, iconFor(h.text || "", HIGHLIGHT_ICONS, Sparkles));
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_36px_-24px_rgba(238,44,60,0.5)] sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c] ring-4 ring-red-50/50 transition-colors duration-300 group-hover:bg-[#ee2c3c] group-hover:text-white">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-0.5">
                  {h.title && <h3 className="text-[17px] font-bold leading-snug text-slate-900">{h.title}</h3>}
                  {h.text && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{h.text}</p>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </CourseSection>
  );
}
