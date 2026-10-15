"use client";

import React from "react";
import {
  ShieldCheck,
  UsersRound,
  Star,
  Award,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export interface LandingPageStatisticItem {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

interface LandingPageStatsProps {
  stats: LandingPageStatisticItem[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  UsersRound,
  Star,
  Award,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
};

export function LandingPageStats({ stats }: LandingPageStatsProps) {
  if (!stats || stats.length === 0) return null;

  const cols = stats.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <section className="relative w-full bg-white px-4 py-5 font-sans sm:px-6 sm:py-6 lg:px-8">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_-24px_rgba(15,23,42,0.35)] sm:divide-x sm:divide-y-0 ${cols}`}
      >
        {stats.map((stat, index) => {
          const Icon = (stat.icon && ICON_MAP[stat.icon]) || ShieldCheck;
          return (
            <div key={stat.id || index} className="flex items-center gap-4 px-5 py-5 sm:justify-center sm:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[28px]">{stat.value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default LandingPageStats;
