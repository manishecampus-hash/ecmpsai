"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Briefcase,
  Cpu,
  Factory,
  Globe2,
  GraduationCap,
  HeartPulse,
  IndianRupee,
  Landmark,
  Megaphone,
  Rocket,
  Settings2,
  ShieldCheck,
  Truck,
  UsersRound,
  ArrowUpRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

const SPECIALIZATION_ICONS: [RegExp, LucideIcon][] = [
  [/market|brand|sales|advertis/i, Megaphone],
  [/financ|account|fintech/i, IndianRupee],
  [/bank|insurance/i, Landmark],
  [/human|hr\b|people|talent/i, UsersRound],
  [/analytic|data|business intelligence/i, BarChart3],
  [/health|hospital|pharma/i, HeartPulse],
  [/information|technolog|\bit\b|computer|software|digital|ai\b/i, Cpu],
  [/international|global|foreign/i, Globe2],
  [/supply|logistic/i, Truck],
  [/operation|project/i, Settings2],
  [/entrepreneur|startup|family business/i, Rocket],
  [/manufactur|production/i, Factory],
  [/risk|security|cyber/i, ShieldCheck],
  [/strateg|general|leadership/i, Briefcase],
];

const INITIAL_COUNT = 6;

export default function CourseSpecializations({ data }: { data?: any }) {
  const [showAll, setShowAll] = useState(false);
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const cardTitle = data?.subHeading || data?.subheading || data?.description || "Popular Specializations";

  // Normalize items list
  const items: Array<{ key: string; value: string }> =
    Array.isArray(data?.items) && data.items.length > 0
      ? data.items
      : Array.isArray(data?.list) && data.list.length > 0
      ? data.list.map((item: any) => ({
          key: item.key || item.specialization || item.name || item.label || "",
          value: item.value || item.about || item.description || item.text || item.fees || ""
        }))
      : [];

  if (!items || items.length === 0) {
    return null;
  }

  // Same list panel as the Top Specializations sub-page; the top ones show first
  const shown = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hidden = items.length - INITIAL_COUNT;

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Specializations/} />

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {cardTitle && (
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
              <span className="h-4 w-1 shrink-0 rounded-full bg-[#ee2c3c]" />
              <h3 className="text-sm font-semibold text-slate-800 sm:text-[15px]">{cardTitle}</h3>
              <span className="ml-auto rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-[#ee2c3c] ring-1 ring-red-100">{items.length}</span>
            </div>
          )}
          <div className="grid sm:grid-cols-2">
            {shown.map((item, i) => {
              const Icon = iconFor(item.key, SPECIALIZATION_ICONS, GraduationCap);
              return (
                <div
                  key={item.key || i}
                  className={`group flex items-center gap-4 border-b border-slate-200 px-6 py-5 transition-colors hover:bg-red-50/50 ${i % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 group-hover:text-red-500 group-hover:decoration-red-300 sm:text-base">
                      {item.key}
                    </span>
                    {item.value && <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">{item.value}</span>}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-500" />
                </div>
              );
            })}
          </div>

          {hidden > 0 && (
            <div className="-mt-px flex justify-center border-t border-slate-200 bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-sm font-bold text-[#ee2c3c] transition-all duration-300 hover:border-[#ee2c3c] hover:bg-[#ee2c3c] hover:text-white"
              >
                {showAll ? "Show less" : `See more specializations (${hidden})`}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </CourseSection>
  );
}
