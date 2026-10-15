"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Globe2,
  Globe,
  Wallet,
  Briefcase,
  Award,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle,
  GraduationCap,
  Users,
  BookOpen,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export function RenderHeading({
  text,
  colorClass = "text-[#ee2c3c]",
  colorHex = "#ee2c3c",
}: {
  text?: string | null;
  colorClass?: string;
  colorHex?: string;
}) {
  if (!text || typeof text !== "string") return null;

  const regex = /(\*{1,2}[^*]+\*{1,2})/g;
  const parts = text.split(regex);

  if (parts.length === 1 && !text.includes("*")) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isAsteriskWrapped =
          (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
          (part.startsWith("*") && part.endsWith("*") && part.length > 2);

        if (isAsteriskWrapped) {
          const content = part.replace(/^\*+|\*+$/g, "");
          return (
            <span
              key={index}
              className={colorClass}
              style={{ color: colorHex }}
            >
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

const ICON_MAP: Record<string, any> = {
  clock: Clock,
  globe: Globe2,
  globe2: Globe2,
  wallet: Wallet,
  briefcase: Briefcase,
  award: Award,
  target: Target,
  sparkles: Sparkles,
  trendingup: TrendingUp,
  trending: TrendingUp,
  checkcircle: CheckCircle,
  check: CheckCircle,
  graduationcap: GraduationCap,
  degree: GraduationCap,
  users: Users,
  bookopen: BookOpen,
  shieldcheck: ShieldCheck,
};

const FALLBACK_ICON_LIST = [Clock, Globe2, Wallet, Briefcase, Award, Target, Sparkles, TrendingUp];

function getReasonIcon(iconName?: string, index: number = 0) {
  if (typeof iconName === "string" && iconName.trim()) {
    const key = iconName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (ICON_MAP[key]) {
      return ICON_MAP[key];
    }
  }
  return FALLBACK_ICON_LIST[index % FALLBACK_ICON_LIST.length] || Clock;
}

export interface DemandStatItem {
  id?: string;
  value: string;
  label: string;
}

export interface ReasonItem {
  id?: string;
  icon?: string;
  title: string;
  description: string;
}

interface WorthItProps {
  data?: any;
  title?: string;
}

// Stat cards: 1 wide card, or 2–4 in a row
const STAT_COLS: Record<number, string> = {
  1: "max-w-xl grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2",
};

// Bar heights for the decorative growth graph (%)
const GROWTH_BARS = [28, 40, 36, 52, 64, 80];

export default function WorthIt({ data, title }: WorthItProps) {
  const [showVerdict, setShowVerdict] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  // Use ONLY configured fields - NO hardcoded fallback data
  const heading = (data?.heading || title || "").trim();
  const introText = (data?.introText || data?.description || "").trim();
  const demandHeading = (data?.demandHeading || "Demand & Growth Overview").trim();

  const demandStats: DemandStatItem[] = Array.isArray(data?.demandStats)
    ? data.demandStats.filter((s: any) => s && (s.value || s.label))
    : [];

  const reasons: ReasonItem[] = Array.isArray(data?.reasons)
    ? data.reasons.filter((r: any) => r && (r.title || r.description))
    : [];

  const gmacHighlight = (data?.gmacHighlight || data?.highlightNote || "").trim();

  // If no data configured at all, render nothing (no fallback dummy content)
  if (!heading && !introText && demandStats.length === 0 && reasons.length === 0 && !gmacHighlight) {
    return null;
  }

  // Split intro text into paragraphs if multi-line
  const introParagraphs = introText ? introText.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean) : [];

  const verdict = gmacHighlight ? gmacHighlight.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean) : [];
  const statCols = STAT_COLS[Math.min(demandStats.length, 4)] || STAT_COLS[4];

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {heading && (
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
        </h2>
      )}

      {/* Intro */}
      {introParagraphs.length > 0 && (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 pl-6 sm:p-7 sm:pl-8">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#ee2c3c]" />
          <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">
            <BadgeCheck className="h-4 w-4" /> Short answer
          </p>
          <div className="space-y-3">
            {(showIntro ? introParagraphs : introParagraphs.slice(0, 1)).map((para: string, idx: number) => (
              <p key={idx} className={`leading-relaxed ${idx === 0 ? "text-[15px] font-medium text-slate-800 sm:text-base" : "text-sm text-slate-600 sm:text-[15px]"}`}>
                {para}
              </p>
            ))}
          </div>
          {introParagraphs.length > 1 && (
            <button
              type="button"
              onClick={() => setShowIntro((v) => !v)}
              aria-expanded={showIntro}
              className="mt-3 text-sm font-bold text-[#ee2c3c] hover:underline"
            >
              {showIntro ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* Demand & growth — ring + rising bar graph per stat (1 to 4 stats) */}
      {demandStats.length > 0 && (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/40 px-5 py-6 sm:px-8">
          <h3 className="text-center text-lg font-bold text-slate-900 sm:text-xl">{demandHeading}</h3>
          <div className={`mx-auto mt-5 grid gap-4 ${statCols}`}>
            {demandStats.map((stat: DemandStatItem, idx: number) => {
              const pct = /%/.test(stat.value) ? Math.min(100, parseFloat(stat.value) || 0) : 100;
              return (
                <div
                  key={stat.id || stat.label || idx}
                  className="flex items-center gap-5 rounded-xl border border-red-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-18px_rgba(238,44,60,0.6)] sm:p-5"
                >
                  <div className="flex shrink-0 flex-col items-center text-center">
                    <span className="relative flex h-[76px] w-[76px] items-center justify-center">
                      <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fee2e2" strokeWidth="3" />
                        <motion.circle
                          cx="18" cy="18" r="15.5" fill="none" stroke="#ee2c3c" strokeWidth="3" strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: pct / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 + idx * 0.1 }}
                        />
                      </svg>
                      <span className="text-base font-extrabold text-[#ee2c3c]">{stat.value}</span>
                    </span>
                    <span className="mt-2 text-sm font-semibold text-slate-700">{stat.label}</span>
                  </div>

                  {/* rising bars (illustrative growth) */}
                  <div className="flex h-24 flex-1 items-end gap-1.5 border-b border-l border-slate-200 pb-px pl-px" aria-hidden>
                    {GROWTH_BARS.map((h, b) => {
                      const last = b === GROWTH_BARS.length - 1;
                      return (
                        <motion.span
                          key={b}
                          style={{ height: `${h}%` }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + b * 0.08 + idx * 0.1 }}
                          className={`relative flex-1 origin-bottom rounded-t ${last ? "bg-[#ee2c3c]" : "bg-red-200"}`}
                        >
                          {last && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#ee2c3c] px-1.5 py-0.5 text-[10px] font-bold text-white">
                              {stat.value}
                            </span>
                          )}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reasons */}
      {reasons.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Why it&apos;s worth it</h3>
          <div className={`grid gap-3 sm:gap-4 ${reasons.length > 1 ? "md:grid-cols-2" : ""}`}>
            {reasons.map((reason: ReasonItem, i: number) => {
              const Icon = getReasonIcon(reason.icon, i);
              return (
                <div
                  key={reason.id || reason.title || i}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-red-200 hover:shadow-[0_16px_32px_-22px_rgba(238,44,60,0.5)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    {reason.title && <p className="text-base font-bold text-slate-900">{reason.title}</p>}
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verdict */}
      {verdict.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c]">
              <Sparkles className="h-4 w-4" />
            </span>
            Our verdict
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {(showVerdict ? verdict : verdict.slice(0, 1)).map((para: string, i: number) => (
              <p key={i} className={i === 0 ? "font-medium text-slate-800" : ""}>{para}</p>
            ))}
          </div>
          {verdict.length > 1 && (
            <button
              type="button"
              onClick={() => setShowVerdict((v) => !v)}
              aria-expanded={showVerdict}
              className="mt-3 text-sm font-bold text-[#ee2c3c] hover:underline"
            >
              {showVerdict ? "Read less" : "Read full verdict"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
