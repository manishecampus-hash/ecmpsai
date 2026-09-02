"use client";

import React from "react";
import { ShieldCheck, UsersRound, Star } from "lucide-react";

const stats = [
  {
    value: "1.25 Lakh+",
    label: "Trusted by Students",
    icon: ShieldCheck,
    iconClass: "text-red-500",
  },
  {
    value: "600+",
    label: "Expert Mentors",
    icon: UsersRound,
    iconClass: "text-red-500",
  },
  {
    value: "4.8/5 (3,199)",
    label: "Google Rating",
    icon: Star,
    iconClass: "text-red-500",
  },
];

export default function DBAStats() {
  return (
    <section className="relative z-10 w-full bg-white !m-0 !p-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-3 sm:gap-4 sm:py-7 lg:py-8">
          
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-center gap-4 sm:gap-3 lg:gap-4"
              >
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-11 sm:w-11 lg:h-14 lg:w-14">
                  <Icon
                    className={`h-10 w-10 stroke-[1.8] lg:h-12 lg:w-12 ${stat.iconClass}`}
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col">
                  <div className="text-[28px] font-extrabold leading-none tracking-[-0.6px] text-slate-900 sm:text-[25px] lg:text-[32px]">
                    {stat.value}
                  </div>

                  <div className="mt-1.5 text-[14px] font-medium leading-tight text-slate-700 sm:text-[13px] lg:text-[16px]">
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