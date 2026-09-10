"use client";

import React from "react";
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

export default function WorthIt({ data, title }: WorthItProps) {
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

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading && (
        <div className="mb-6">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      )}

      {/* Intro / Description Paragraphs - render only if configured */}
      {introParagraphs.length > 0 && (
        <div className="max-w-4xl space-y-3">
          {introParagraphs.map((para: string, idx: number) => (
            <p key={idx} className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Demand & Growth Overview Section - render only if configured */}
      {demandStats.length > 0 && (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6 sm:p-8">
          <h3 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
            {demandHeading}
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {demandStats.map((stat: DemandStatItem, idx: number) => (
              <div
                key={stat.id || stat.label || idx}
                className="flex flex-col items-center gap-3 rounded-xl bg-white px-3 py-5 shadow-sm border border-red-100"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-red-200 text-sm font-extrabold text-red-500 sm:h-16 sm:w-16 sm:text-base text-center px-1">
                  {stat.value}
                </span>
                <span className="text-center text-xs font-semibold text-slate-700 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Reasons / Value Drivers List - render only if configured */}
      {reasons.length > 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
          {reasons.map((reason: ReasonItem, i: number) => {
            const Icon = getReasonIcon(reason.icon, i);
            return (
              <div
                key={reason.id || reason.title || i}
                className={`flex gap-4 px-5 py-6 sm:px-8 ${
                  i !== reasons.length - 1 ? "border-b border-slate-100" : ""
                } ${i % 2 === 1 ? "bg-red-50/20" : ""}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-md shadow-red-500/30">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {reason.title && (
                    <span className="font-bold text-slate-900">
                      {reason.title}:{" "}
                    </span>
                  )}
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* GMAC / Bottom Highlight Callout - render only if configured */}
      {gmacHighlight && (
        <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white mt-0.5">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <div className="text-sm leading-relaxed text-slate-600 sm:text-base whitespace-pre-line">
            {gmacHighlight}
          </div>
        </div>
      )}
    </section>
  );
}