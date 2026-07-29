"use client";

import React from "react";
import { Handshake } from "lucide-react";

export default function PlacementPartners() {
  // Brand items extracted from image_161a52.png with exact brand coloring accents
  const partners = [
    { name: "Hero", color: "text-red-600 font-black tracking-tighter" },
    {
      name: "Hitachi Vantara",
      color: "text-neutral-900 font-extrabold tracking-tight",
    },
    {
      name: "FEDERAL BANK",
      color: "text-blue-700 font-black italic tracking-tight",
    },
    { name: "Apple", color: "text-black font-semibold tracking-tight" },
    {
      name: "Reliance Industries Limited",
      color: "text-amber-700 font-bold tracking-normal",
    },
    {
      name: "SAMSUNG",
      color: "text-blue-800 font-black tracking-widest italic",
    },
    { name: "TECH mahindra", color: "text-red-500 font-medium tracking-tight" },
    { name: "HDFC BANK", color: "text-blue-900 font-black tracking-tight" },
    { name: "Granite", color: "text-purple-700 font-bold tracking-tight" },
  ];

  // Double the list array to ensure a flawless, gapless loop animation transitions
  const doublePartners = [...partners, ...partners];

  return (
    /* ============================================================
        PLACEMENT PARTNERS — INFINITE TICKER MARQUEE
       ============================================================ */
    <section
      id="placements"
      className="bg-white border-y border-slate-100 pt-2 pb-10 sm:pt-3 sm:pb-12 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Handshake className="h-3.5 w-3.5 text-red-500" />
          Our Elite Hiring Network
        </span>
        <h2 className="mt-2 text-base sm:text-lg font-extrabold text-gray-900 tracking-tight sm:text-2xl">
          Top Corporate Recruitment &{" "}
          <span className="text-red-500">Placement Partners</span>
        </h2>
      </div>

      {/* Infinite loop flex track wrapper container */}
      <div className="relative w-full flex items-center overflow-hidden py-1 select-none">
        {/* Left & Right gradient masking over components context elements */}
        <div className="pointer-events-none absolute left-0 z-10 h-full w-32 sm:w-44 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-32 sm:w-44 bg-gradient-to-l from-white to-transparent" />

        {/* ALIGNMENT FIX:
            1. Changed 'justify-around' to 'justify-start' so tracking is linear.
            2. Added 'pr-4 sm:pr-6' to balance the inner 'gap-6'. */}
        <div className="flex shrink-0 items-center justify-start gap-4 sm:gap-6 pr-4 sm:pr-6 animate-marquee whitespace-nowrap">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 min-w-[120px] sm:min-w-[140px] md:min-w-[170px] h-[64px] sm:h-[72px] rounded-xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 hover:scale-105"
            >
              <span
                className={`text-sm sm:text-base select-none ${partner.color}`}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inject custom animation keyframes missing inside base tailwind configs */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            /* Moves exactly half the total width of the duplicated array track */
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Reduce motion on very small screens for smoother UX */
        @media (max-width: 420px) {
          .animate-marquee {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
}
