"use client";

import React from "react";
import {
  Clock,
  Globe2,
  Wallet,
  Briefcase,
  Award,
  Target,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
}

const DEFAULT_REASONS: Reason[] = [
  {
    title: "Convenience",
    description:
      "An online MBA program enables learners to pursue their studies around a flexible schedule, offering resources and recorded sessions alongside scheduled live classes depending on their convenience.",
    icon: Clock,
  },
  {
    title: "Global Reach",
    description:
      "Internet access lets you get top university coursework from locations throughout the world, even if you don't move.",
    icon: Globe2,
  },
  {
    title: "Lower Costs",
    description:
      "Online MBA programs usually cost less than their conventional on-campus equivalents due to their reduced expenses.",
    icon: Wallet,
  },
  {
    title: "Study While Working",
    description:
      "Working students can pursue their MBA studies through online programs so they can maintain their current employment.",
    icon: Briefcase,
  },
  {
    title: "Leadership and Managerial Skills",
    description:
      "An MBA provides students with essential leadership abilities together with managerial competencies that enable them to advance in their careers.",
    icon: Award,
  },
  {
    title: "Specializations",
    description:
      "The program allows students to select an academic focus that develops their skills in a particular field of expertise.",
    icon: Target,
  },
  {
    title: "Innovative Learning Methods",
    description:
      "The learning experience improves through online programs because they adopt state-of-the-art technological solutions.",
    icon: Sparkles,
  },
  {
    title: "Increased Earning Potential",
    description:
      "Professional leaders almost universally consider the Master of Business Administration their top qualification to reach executive positions.",
    icon: TrendingUp,
  },
];

const DEFAULT_DEMAND_STATS = [
  { label: "Growing Market", value: "30%" },
  { label: "Flexibility", value: "75%" },
  { label: "Career Benefits", value: "55%" },
  { label: "Specialization Options", value: "70–80%" },
];

const ICONS = [Clock, Globe2, Wallet, Briefcase, Award, Target, Sparkles, TrendingUp];

interface WorthItProps {
  data?: any;
  title?: string;
}

export default function WorthIt({ data, title }: WorthItProps) {
  const heading = data?.heading || title || "Is Online MBA Worth It?";
  const introText =
    data?.introText ||
    "Pursuing an online MBA course can be a valuable investment depending on your personal goals, career aspirations, and learning preferences. Here are some reasons why it might be worth pursuing:";

  const demandStats = data?.demandStats && Array.isArray(data.demandStats) && data.demandStats.length > 0
    ? data.demandStats
    : DEFAULT_DEMAND_STATS;

  const reasons = data?.reasons && Array.isArray(data.reasons) && data.reasons.length > 0
    ? data.reasons.map((r: any, idx: number) => ({
        title: r.title || `Reason #${idx + 1}`,
        description: r.description || "",
        icon: ICONS[idx % ICONS.length],
      }))
    : DEFAULT_REASONS;

  const gmacHighlight =
    data?.gmacHighlight ||
    "As per GMAC (Graduate Management Admission Council), MBA graduates typically earn a 77% higher median salary compared to bachelor's degree holders, along with stronger promotion rates and long-term career mobility.";

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          {heading.includes("Online MBA") ? (
            <>
              {heading.split("Online MBA")[0]}
              <span className="text-red-500">Online MBA</span>
              {heading.split("Online MBA")[1]}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {introText}
      </p>

      {/* Demand stats panel */}
      <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6 sm:p-8">
        <h3 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
          Demand &amp; Growth Overview
        </h3>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {demandStats.map((stat: any, idx: number) => (
            <div
              key={stat.label || idx}
              className="flex flex-col items-center gap-3 rounded-xl bg-white px-3 py-5 shadow-sm border border-red-100"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-red-200 text-sm font-extrabold text-red-500 sm:h-16 sm:w-16 sm:text-base">
                {stat.value}
              </span>
              <span className="text-center text-xs font-semibold text-slate-700 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasons list */}
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
        {reasons.map((reason: any, i: number) => {
          const Icon = reason.icon || ICONS[i % ICONS.length];
          return (
            <div
              key={reason.title || i}
              className={`flex gap-4 px-5 py-6 sm:px-8 ${
                i !== reasons.length - 1 ? "border-b border-slate-100" : ""
              } ${i % 2 === 1 ? "bg-red-50/20" : ""}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-md shadow-red-500/30">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                <span className="font-bold text-slate-900">
                  {reason.title}:
                </span>{" "}
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* GMAC stat highlight */}
      <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {gmacHighlight}
        </p>
      </div>
    </section>
  );
}