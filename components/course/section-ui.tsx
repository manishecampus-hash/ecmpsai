"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpenCheck,
  CalendarDays,
  Globe2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import HighlightedText from "@/components/universities/HighlightedText";

// Shared building blocks so every section of the course page has the same rhythm,
// heading style and entrance motion.

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Icons the CMS can name on banner stats (`iconName`) */
export const STAT_ICONS: Record<string, LucideIcon> = {
  CalendarDays,
  BookOpenCheck,
  GraduationCap,
  Globe2,
  Award,
  UsersRound,
  Landmark,
  ShieldCheck,
  Star,
};

export function CourseSection({
  children,
  className = "",
  width = "max-w-6xl",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div className={`w-full px-4 py-6 font-[Inter] text-slate-900 sm:px-6 sm:py-9 lg:px-8 ${className}`}>
      <div className={`mx-auto w-full ${width}`}>{children}</div>
    </div>
  );
}

/** Highlights `*word*` from the CMS, otherwise the first match of `fallback` */
export function Highlighted({ text, fallback }: { text: string; fallback?: RegExp }) {
  if (text.includes("*")) return <HighlightedText text={text} className="text-[#ee2c3c]" />;
  const match = fallback ? text.match(fallback) : null;
  if (!match || match.index === undefined) return <>{text}</>;
  return (
    <>
      {text.slice(0, match.index)}
      <span className="text-[#ee2c3c]">{match[0]}</span>
      {text.slice(match.index + match[0].length)}
    </>
  );
}

export function SectionHeading({
  heading,
  fallback,
  sub,
  align = "center",
  className = "",
}: {
  heading: string;
  fallback?: RegExp;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`mb-5 sm:mb-8 ${align === "center" ? "mx-auto max-w-4xl text-center" : ""} ${className}`}>
      <h2 className="text-[23px] font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[34px]">
        <Highlighted text={heading} fallback={fallback} />
      </h2>
      {sub && <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{sub}</p>}
    </div>
  );
}

/** Fades content up the first time it scrolls into view */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(delay, 0.4) }}
    >
      {children}
    </motion.div>
  );
}

/** Picks an icon from the first keyword rule that matches the text */
export function iconFor(text: string, rules: [RegExp, LucideIcon][], fallback: LucideIcon): LucideIcon {
  return rules.find(([re]) => re.test(text))?.[1] ?? fallback;
}

/** Grid that keeps an unfinished last row centred (cards size themselves with `CARD_W`) */
export const CENTERED_GRID = "flex flex-wrap justify-center gap-3 sm:gap-4";
export const CARD_W = {
  2: "w-full sm:w-[calc(50%-8px)]",
  3: "w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-10.67px)]",
  4: "w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]",
} as const;

/** "VS" badge between two comparison cards — in the flow on phones, centred over the gap from md up */
export function VsBadge() {
  return (
    <div className="relative z-10 -my-1 flex justify-center md:absolute md:left-1/2 md:top-1/2 md:my-0 md:-translate-x-1/2 md:-translate-y-1/2">
      <span className="flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-2xl bg-gradient-to-br from-[#ee2c3c] to-rose-500 shadow-[0_12px_24px_-8px_rgba(238,44,60,0.65)] ring-4 ring-white">
        <span className="rotate-[8deg] font-black italic leading-none tracking-tight text-white">
          <span className="text-xl">V</span>
          <span className="text-base">s</span>
        </span>
      </span>
    </div>
  );
}

/** Small check bubble used in lists across the page */
export function CheckDot({ tone = "emerald" }: { tone?: "emerald" | "red" }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        tone === "red" ? "bg-[#ee2c3c] text-white" : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Styles CMS rich text (no typography plugin in this project) */
export const RICH_TEXT =
  "text-[15px] leading-relaxed text-slate-600 sm:text-base [&_p]:mb-3 [&_p:empty]:hidden [&_strong]:font-semibold [&_strong]:text-slate-900 [&_ul]:my-4 [&_ul]:space-y-2.5 [&_li]:relative [&_li]:pl-8 [&_li>p]:mb-0 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[3px] [&_li]:before:flex [&_li]:before:h-5 [&_li]:before:w-5 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:bg-red-50 [&_li]:before:text-[11px] [&_li]:before:font-bold [&_li]:before:text-[#ee2c3c] [&_li]:before:ring-1 [&_li]:before:ring-red-100 [&_li]:before:content-['✓']";
