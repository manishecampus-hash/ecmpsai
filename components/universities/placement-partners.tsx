"use client";

import React from "react";
import Image from "next/image";
import { Handshake } from "lucide-react";

interface PlacementPartnersProps {
  university?: any;
}

export default function PlacementPartners({ university }: PlacementPartnersProps) {
  const hiringNetwork = university?.details?.hiringNetwork || {};
  const rawLogos = hiringNetwork.logos || hiringNetwork.partners || [];

  if (!rawLogos || rawLogos.length === 0) {
    return null;
  }

  const partners = rawLogos.map((item: any) => ({
    name: item.name || "",
    logo: item.logoUrl || item.logo || "",
  }));

  // Double the list array to ensure a flawless, gapless loop animation transitions
  const doublePartners = [...partners, ...partners];

  return (
    /* ============================================================
        PLACEMENT PARTNERS — INFINITE TICKER MARQUEE
       ============================================================ */
    <section
      id="placements"
      className="bg-white border-y border-slate-100 pt-1.5 pb-8 sm:pt-2 sm:pb-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider">
          <Handshake className="h-3.5 w-3.5 text-red-500" />
          {hiringNetwork.badge || "Our Elite Hiring Network"}
        </span>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
          {hiringNetwork.heading ? (
            <span dangerouslySetInnerHTML={{ __html: hiringNetwork.heading }} />
          ) : (
            <>
              Top Corporate Recruitment &{" "}
              <span className="text-red-500">Placement Partners</span>
            </>
          )}
        </h2>
      </div>

      {/* Infinite loop flex track wrapper container */}
      <div className="relative w-full flex items-center overflow-hidden py-1 select-none">
        {/* Left & Right gradient masking over components context elements */}
        <div className="pointer-events-none absolute left-0 z-10 h-full w-32 sm:w-44 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-32 sm:w-44 bg-gradient-to-l from-white to-transparent" />

        {/* Logo carousel track */}
        <div className="flex shrink-0 items-center justify-start gap-3 sm:gap-4 pr-3 sm:pr-4 animate-marquee whitespace-nowrap">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2.5 min-w-[120px] sm:min-w-[150px] h-[52px] sm:h-[65px] rounded-xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={220}
                  height={130}
                  className="h-auto w-auto max-h-[110%] max-w-[110%] object-contain"
                  priority={index < 3}
                />
              </div>
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
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Reduce motion on very small screens for smoother UX */
        @media (max-width: 420px) {
          .animate-marquee {
            animation-duration: 38s;
          }
        }
      `}</style>
    </section>
  );
}
