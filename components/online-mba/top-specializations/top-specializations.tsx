"use client";

import React from "react";
import {
  Landmark,
  Megaphone,
  Users,
  Settings,
  Truck,
  BarChart3,
  Monitor,
  Globe,
  Package,
  Briefcase,
  TrendingUp,
  HeartPulse,
  Database,
  ShoppingBag,
  Building2,
  Wallet,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

interface Specialization {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SPECIALIZATIONS: Specialization[] = [
  { title: "Finance Management", href: "#", icon: Landmark },
  { title: "Marketing Management", href: "#", icon: Megaphone },
  { title: "HR Management", href: "#", icon: Users },
  { title: "Operations Management", href: "#", icon: Settings },
  { title: "Logistics And Supply Chain (Dual)", href: "#", icon: Truck },
  { title: "Business Analytics", href: "#", icon: BarChart3 },
  { title: "IT Management", href: "#", icon: Monitor },
  { title: "International Business Management", href: "#", icon: Globe },
  { title: "Supply Chain Management", href: "#", icon: Package },
  { title: "General Management", href: "#", icon: Briefcase },
  { title: "Digital Marketing", href: "#", icon: TrendingUp },
  { title: "Healthcare Management", href: "#", icon: HeartPulse },
  { title: "Data Science", href: "#", icon: Database },
  { title: "Retail Management", href: "#", icon: ShoppingBag },
  {
    title: "Hospital Administration & Healthcare (Dual)",
    href: "#",
    icon: Building2,
  },
  { title: "Fintech Management", href: "#", icon: Wallet },
];

export default function TopSpecializations() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="text-red-500">Top Specializations</span> in Online
          MBA
        </h2>
      </div>

      {/* Specializations list panel */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid sm:grid-cols-2">
          {SPECIALIZATIONS.map((spec, i) => {
            const Icon = spec.icon;
            const isLastRow = i >= SPECIALIZATIONS.length - 2;

            return (
              <a
                key={spec.title}
                href={spec.href}
                className={`group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-red-50/50 border-b border-slate-200 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${isLastRow ? "sm:border-b-0" : ""}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>

                <span className="flex-1 text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 group-hover:text-red-500 group-hover:decoration-red-300 sm:text-base">
                  {spec.title}
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red-500" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}