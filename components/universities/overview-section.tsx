"use client";

import React from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Globe2,
  Award,
  ChevronRight,
} from "lucide-react";

interface OverviewSectionProps {
  university?: {
    name?: string;
    fullName?: string;
    aboutText?: string;
    stats?: {
      ranking?: string;
      alumniCount?: string;
      highestPackage?: string;
      globalPartners?: string;
    };
  };
}

export default function OverviewSection({ university }: OverviewSectionProps) {
  // Safe layout fallbacks for structural fields
  const universityName = university?.name || "IIM K";
  const universityFullName =
    university?.fullName || "Indian Institute of Management Kozhikode";

  const aboutDescription =
    university?.aboutText ||
    `Founded to nurture future-ready leaders, this institution stands as a premier beacon of academic excellence. The curriculum blends rigorous data-driven analytics frameworks with classic leadership philosophy, ensuring global recognition and elite operational insights across fast-evolving industries.`;

  // Static fallback or custom dynamic metrics array
  const metrics = [
    {
      id: "rank",
      label: "NIRF Management Rank",
      value: university?.stats?.ranking || "#3 Top Tier",
      icon: Award,
      bgColor: "bg-red-50 text-red-600",
    },
    {
      id: "alumni",
      label: "Global Active Alumni",
      value: university?.stats?.alumniCount || "10,000+",
      icon: Users,
      bgColor: "bg-slate-50 text-slate-700",
    },
    {
      id: "placements",
      label: "Highest Salary CTC",
      value: university?.stats?.highestPackage || "₹43.9 LPA",
      icon: TrendingUp,
      bgColor: "bg-amber-50 text-amber-600",
    },
    {
      id: "global",
      label: "International Alliances",
      value: university?.stats?.globalPartners || "40+ Countries",
      icon: Globe2,
      bgColor: "bg-slate-50 text-slate-700",
    },
  ];

  return (
    /* ============================================================
        OVERVIEW SECTION
        Maintains structural styling parity with standard design layout
       ============================================================ */
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Mini Section Tagline */}
      <div className="mb-8 sm:mb-12">
        <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600 sm:mb-4">
          Institutional Profile
        </span>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          University <span className="text-red-500">Overview</span>
        </h2>
      </div>

      {/* Main Container Layout split Grid */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* LEFT COL: Key Metrics Visual Blocks Matrix (Span 5) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          {metrics.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT COL: Comprehensive Narratives & Accreditations (Span 7) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl bg-slate-50/60 p-6 sm:p-8 border border-slate-100">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 text-red-500 shadow-sm ring-1 ring-slate-100">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {universityName} Core Legacy
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {universityFullName}
                </p>
              </div>
            </div>

            <p className="text-base text-gray-600 leading-relaxed sm:text-lg">
              {aboutDescription}
            </p>

            {/* Micro value proposition list */}
            <ul className="mt-6 space-y-2.5 border-t border-slate-200/60 pt-4">
              <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ChevronRight className="h-4 w-4 text-red-500" />
                AACSB & AMBA Global Double-Crown Accreditation Status
              </li>
              <li className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ChevronRight className="h-4 w-4 text-red-500" />
                Immersive industry capstones integrated directly into programs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
