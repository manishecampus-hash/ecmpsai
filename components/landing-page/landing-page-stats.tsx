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

  return (
    <section className="relative z-10 w-full border-y border-slate-100 bg-white/95 !m-0 !p-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
        <div
          className={`grid grid-cols-1 gap-6 py-7 sm:gap-6 sm:py-8 lg:py-9 ${
            stats.length === 2
              ? "sm:grid-cols-2"
              : stats.length === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-3"
          }`}
        >
          {stats.map((stat, index) => {
            const Icon = (stat.icon && ICON_MAP[stat.icon]) || ShieldCheck;

            return (
              <div
                key={stat.id || index}
                className="flex items-center justify-center gap-3.5 sm:gap-4"
              >
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-13 sm:w-13">
                  <Icon className="h-6 w-6 stroke-[2] text-red-600" />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col">
                  <div className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[32px]">
                    {stat.value}
                  </div>

                  <div className="mt-0.5 text-xs font-semibold text-slate-600 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingPageStats;
