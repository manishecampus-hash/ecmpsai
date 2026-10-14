"use client";

import React from "react";
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
  type LucideIcon,
} from "lucide-react";
import { CARD_W, CENTERED_GRID, CourseSection, Reveal, SectionHeading, iconFor } from "./section-ui";

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

export default function CourseSpecializations({ data }: { data?: any }) {
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

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Specializations/} />

      <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <span className="h-px w-8 bg-slate-300" />
        {cardTitle}
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-[#ee2c3c] ring-1 ring-red-100">{items.length}</span>
        <span className="h-px w-8 bg-slate-300" />
      </p>

      <div className={CENTERED_GRID}>
        {items.map((item, idx) => {
          const Icon = iconFor(item.key, SPECIALIZATION_ICONS, GraduationCap);
          return (
            <Reveal key={idx} delay={(idx % 4) * 0.06} className={CARD_W[4]}>
              <div className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-22px_rgba(238,44,60,0.45)] sm:flex-col sm:gap-0 sm:p-5">
                {/* accent bar that sweeps in on hover */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#ee2c3c] transition-transform duration-300 group-hover:scale-x-100" />

                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors duration-300 group-hover:bg-[#ee2c3c] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>

                {/* number as its own badge, not a background watermark */}
                <span className="absolute right-3.5 top-3.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold tabular-nums text-slate-500 ring-1 ring-slate-200 transition-colors duration-300 group-hover:bg-[#ee2c3c] group-hover:text-white group-hover:ring-[#ee2c3c]">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="relative min-w-0 pr-10 sm:pr-0">
                  <h3 className="text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#ee2c3c] sm:mt-4">{item.key}</h3>
                  {item.value && <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:mt-1.5">{item.value}</p>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </CourseSection>
  );
}
