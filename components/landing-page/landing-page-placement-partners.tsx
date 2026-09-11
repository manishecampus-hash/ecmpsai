"use client";

import React from "react";
import { Handshake } from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface PlacementPartnerLogoItem {
  id?: string;
  name: string;
  logo: string;
}

export interface LandingPagePlacementPartnersData {
  sectionHeading?: string;
  sectionDescription?: string;
  logos?: PlacementPartnerLogoItem[];
}

interface LandingPagePlacementPartnersProps {
  placementPartners?: LandingPagePlacementPartnersData;
}

export function LandingPagePlacementPartners({
  placementPartners,
}: LandingPagePlacementPartnersProps) {
  // CRITICAL: If no logos are configured, the section shall NOT be visible.
  // No fallback content.
  const logos = placementPartners?.logos;
  if (!logos || !Array.isArray(logos) || logos.length === 0) {
    return null;
  }

  const validLogos = logos.filter(
    (item) => item && item.logo && item.logo.trim() !== ""
  );
  if (validLogos.length === 0) {
    return null;
  }

  const sectionHeading =
    placementPartners?.sectionHeading || "Top *Placement Partners*";
  const sectionDescription = placementPartners?.sectionDescription;

  // Repeat logos so continuous marquee scrolls smoothly
  const repeatCount = validLogos.length < 4 ? 4 : validLogos.length < 8 ? 3 : 2;
  const marqueeItems = Array.from({ length: repeatCount }).flatMap(
    () => validLogos
  );

  return (
    <section
      id="placements"
      className="relative w-full overflow-hidden bg-white !m-0 !p-0"
    >
      <style>{`
        @keyframes lpPlacementsScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lp-placements-track {
          display: flex;
          width: max-content;
          animation: lpPlacementsScroll 26s linear infinite;
        }
        .lp-placements-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .lp-placements-track {
            animation-duration: 20s;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 font-sans sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-10 sm:mb-12 lg:mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-2xs uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            <span>Executive Hiring Network</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>

          {sectionDescription && (
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <HighlightedTitle text={sectionDescription} />
            </p>
          )}

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= MARQUEE SHOWCASE ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 py-8 sm:py-10 shadow-xs">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-red-100/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-red-100/20 blur-3xl" />

          {/* Seamless Edge Fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-14 sm:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-14 sm:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

          {/* Marquee Track */}
          <div className="flex w-full overflow-hidden">
            <div className="lp-placements-track flex items-center">
              {/* Loop 1 */}
              <div className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6">
                {marqueeItems.map((p, idx) => (
                  <div
                    key={`place-1-${idx}-${p.id || p.name}`}
                    className="group relative flex h-[82px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:h-[92px] sm:w-[205px] sm:px-6 sm:py-4"
                  >
                    <div className="pointer-events-none absolute left-3 right-3 top-1 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    <img
                      src={p.logo}
                      alt={p.name || "Placement Partner"}
                      loading="lazy"
                      className="relative z-10 max-h-[48px] max-w-[140px] object-contain opacity-85 transition-all duration-300 group-hover:scale-[1.05] group-hover:opacity-100 sm:max-h-[55px] sm:max-w-[160px]"
                    />
                  </div>
                ))}
              </div>

              {/* Loop 2 */}
              <div
                className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
                aria-hidden="true"
              >
                {marqueeItems.map((p, idx) => (
                  <div
                    key={`place-2-${idx}-${p.id || p.name}`}
                    className="group relative flex h-[82px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:h-[82px] sm:w-[205px] sm:px-6 sm:py-4"
                  >
                    <div className="pointer-events-none absolute left-3 right-3 top-1 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    <img
                      src={p.logo}
                      alt=""
                      loading="lazy"
                      className="relative z-10 max-h-[48px] max-w-[140px] object-contain opacity-85 transition-all duration-300 group-hover:scale-[1.05] group-hover:opacity-100 sm:max-h-[55px] sm:max-w-[160px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Chip */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 py-1.5 text-[11px] font-semibold text-slate-600 shadow-2xs backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Hiring Partners Across Senior Leadership &amp; Consulting</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPagePlacementPartners;
