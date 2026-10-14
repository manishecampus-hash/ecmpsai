"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { CourseSection, EASE, RICH_TEXT, SectionHeading, STAT_ICONS } from "./section-ui";

type Stat = { label: string; value: string; iconName?: string };

// Corners clear of the centre card, so no chip covers its title or chart
const CHIP_POSITIONS = [
  "left-0 top-[3%]",
  "right-0 top-[10%]",
  "left-[1%] bottom-[9%]",
  "right-0 bottom-[2%]",
];
const BARS = [36, 56, 44, 72, 92];

// Animated companion for the About text, built from the banner's own facts
function AboutVisual({ title, stats }: { title: string; stats: Stat[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px]">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gradient-to-br from-red-100 via-rose-50 to-transparent blur-2xl" />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[6%] rounded-full border-2 border-dashed border-red-200/80"
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ee2c3c] shadow-[0_0_0_5px_rgba(238,44,60,0.15)]" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[20%] rounded-full border border-red-100"
      >
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-rose-300" />
      </motion.div>

      {/* Course card with a rising chart */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-[62%] rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] sm:p-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-white shadow-md shadow-red-500/30">
              <GraduationCap className="h-5 w-5" />
            </span>
            <p className="line-clamp-2 text-[13px] font-bold leading-snug text-slate-900 sm:text-sm">{title}</p>
          </div>

          <div className="relative mt-4 flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.12 }}
                style={{ height: `${h}%` }}
                className={`flex-1 origin-bottom rounded-t-md ${i === BARS.length - 1 ? "bg-[#ee2c3c]" : "bg-gradient-to-t from-red-100 to-red-200"}`}
              />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <motion.path
                d="M10 68 L30 48 L50 58 L70 30 L90 9"
                fill="none"
                stroke="#b91c1c"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.9 }}
              />
            </svg>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-red-400 to-[#ee2c3c]"
              initial={{ width: "0%" }}
              whileInView={{ width: "86%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating facts */}
      {stats.slice(0, 4).map((stat, i) => {
        const Icon = STAT_ICONS[stat.iconName ?? ""] ?? GraduationCap;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.5 + i * 0.12 },
              scale: { duration: 0.4, delay: 0.5 + i * 0.12 },
              y: { duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            }}
            className={`absolute ${CHIP_POSITIONS[i]} flex items-center gap-2 rounded-2xl border border-slate-100 bg-white py-2 pl-2 pr-3 shadow-[0_14px_30px_-12px_rgba(15,23,42,0.3)]`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-extrabold text-slate-900">{stat.value}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">{stat.label}</span>
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function CourseOverview({ data, banner }: { data?: any; banner?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const description = data?.description || "";
  const tabs = data?.tabs || [];
  const stats: Stat[] = Array.isArray(banner?.stats) ? banner.stats.filter((s: Stat) => s?.value) : [];
  const visualTitle = (banner?.subheading || heading).replace(/\*/g, "").trim();
  const hasVisual = stats.length > 0;

  return (
    <CourseSection>
      <div className={`grid items-center gap-8 ${hasVisual ? "lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12" : ""}`}>
        <div className="min-w-0">
          <SectionHeading heading={heading} align={hasVisual ? "left" : "center"} className="sm:mb-6" />

          {description ? (
            <div className={`${RICH_TEXT} ${hasVisual ? "" : "mx-auto max-w-4xl"}`} dangerouslySetInnerHTML={{ __html: description }} />
          ) : null}

          {/* Dynamic Tabs Checklist if present */}
          {Array.isArray(tabs) && tabs.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tabs.map((tab: any, i: number) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="mb-1 inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase text-red-600">
                    {tab.label}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{tab.heading}</h3>
                  {tab.subtext && <p className="mt-0.5 text-xs text-slate-500">{tab.subtext}</p>}
                  {Array.isArray(tab.points) && (
                    <ul className="mt-2 space-y-1">
                      {tab.points.map((pt: string, j: number) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="font-bold text-green-500">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {hasVisual && <AboutVisual title={visualTitle} stats={stats} />}
      </div>
    </CourseSection>
  );
}
