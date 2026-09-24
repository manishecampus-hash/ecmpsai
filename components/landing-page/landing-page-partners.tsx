"use client";

import React from "react";
import HighlightedTitle from "./highlighted-title";

export interface PartnerLogoItem {
  id?: string;
  name: string;
  logo: string;
}

export interface LandingPageGlobalPartnersData {
  sectionHeading?: string;
  sectionDescription?: string;
  logos?: PartnerLogoItem[];
}

interface LandingPagePartnersProps {
  partners?: LandingPageGlobalPartnersData;
}

export function LandingPagePartners({ partners }: LandingPagePartnersProps) {
  // CRITICAL REQUIREMENT: If no logos are present, the section shall NOT be visible.
  // No fallback content.
  const logos = partners?.logos;
  if (!logos || !Array.isArray(logos) || logos.length === 0) {
    return null;
  }

  // Filter out any invalid items without a logo URL
  const validLogos = logos.filter((item) => item && item.logo && item.logo.trim() !== "");
  if (validLogos.length === 0) {
    return null;
  }

  const sectionHeading =
    partners?.sectionHeading || "Our Top *Global University Partners*";
  const sectionDescription = partners?.sectionDescription;

  // For a silky-smooth continuous marquee, repeat logos so track is wide enough
  const repeatCount = validLogos.length < 4 ? 4 : validLogos.length < 8 ? 3 : 2;
  const marqueeItems = Array.from({ length: repeatCount }).flatMap(() => validLogos);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-slate-50/50 border-b border-slate-100 !m-0 !p-0">
      <style>{`
        @keyframes lpPartnersScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lp-partners-track {
          display: flex;
          width: max-content;
          animation: lpPartnersScroll 28s linear infinite;
        }
        .lp-partners-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .lp-partners-track {
            animation-duration: 20s;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-12 sm:mb-14 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>

          {sectionDescription && (
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              <HighlightedTitle text={sectionDescription} />
            </p>
          )}

          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= LOGO MARQUEE SHOWCASE ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white py-9 sm:py-12 shadow-2xs">
          {/* Subtle ambient gradient backdrops */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-red-100/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-red-100/25 blur-3xl" />

          {/* Edge fades for seamless marquee blending */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Marquee Track Container */}
          <div className="flex w-full overflow-hidden">
            <div className="lp-partners-track flex items-center">
              {/* First Track Loop */}
              <div className="flex shrink-0 items-center gap-4.5 pr-4.5 sm:gap-6 sm:pr-6">
                {marqueeItems.map((p, idx) => (
                  <div
                    key={`p1-${idx}-${p.id || p.name}`}
                    className="group relative flex h-[88px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:h-[98px] sm:w-[215px] sm:px-6"
                  >
                    {/* Top subtle highlight reflection */}
                    <div className="pointer-events-none absolute left-3 right-3 top-1 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                    {/* Partner Logo */}
                    <img
                      src={p.logo}
                      alt={p.name || "University Partner"}
                      loading="lazy"
                      className="relative z-10 max-h-[52px] max-w-[145px] object-contain opacity-85 transition-all duration-300 group-hover:scale-[1.05] group-hover:opacity-100 sm:max-h-[60px] sm:max-w-[170px]"
                    />
                  </div>
                ))}
              </div>

              {/* Second Track Loop for seamless loop */}
              <div
                className="flex shrink-0 items-center gap-4.5 pr-4.5 sm:gap-6 sm:pr-6"
                aria-hidden="true"
              >
                {marqueeItems.map((p, idx) => (
                  <div
                    key={`p2-${idx}-${p.id || p.name}`}
                    className="group relative flex h-[88px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:h-[98px] sm:w-[215px] sm:px-6"
                  >
                    <div className="pointer-events-none absolute left-3 right-3 top-1 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                    <img
                      src={p.logo}
                      alt=""
                      loading="lazy"
                      className="relative z-10 max-h-[52px] max-w-[145px] object-contain opacity-85 transition-all duration-300 group-hover:scale-[1.05] group-hover:opacity-100 sm:max-h-[60px] sm:max-w-[170px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust chip */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4.5 py-2 text-xs font-semibold text-slate-600 shadow-2xs backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Accredited Global University Network</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPagePartners;
