"use client";

import React from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface LandingPageHeroData {
  mainHeading: string;
  subHeading: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  badgeText?: string;
}

interface LandingPageHeroProps {
  hero: LandingPageHeroData;
  onCtaClick?: () => void;
}

export function LandingPageHero({ hero, onCtaClick }: LandingPageHeroProps) {
  const ctaText = hero.primaryCtaText || "Let's Talk About Your Career Goals";
  const beforeImg = hero.beforeImage || "/dba/before.png";
  const afterImg = hero.afterImage || "/dba/after.png";
  const beforeLabel = hero.beforeLabel || "BEFORE";
  const afterLabel = hero.afterLabel || "AFTER";
  const badgeText = hero.badgeText || "From 'Mr.' To 'Dr.'";

  const isDbaTransition =
    badgeText.toLowerCase().includes("mr") && badgeText.toLowerCase().includes("dr");

  const handlePrimaryCtaClick = (e: React.MouseEvent) => {
    if (hero.primaryCtaUrl?.startsWith("http") && !onCtaClick) {
      return;
    }
    e.preventDefault();
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new CustomEvent("open-signup"));
    }
  };

  return (
    <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-red-50/40 via-white to-white !m-0 !p-0">
      {/* Top subtle radial aura */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-full max-w-6xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.07),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
        <div className="grid items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start gap-4 sm:gap-5">
            {/* Tag / Pre-headline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/80 px-3.5 py-1 text-xs font-bold text-red-600 shadow-2xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-red-500" />
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">
                Accelerate Your Career
              </span>
            </div>

            {/* Heading */}
            <h1 className="m-0 text-3xl font-black leading-[1.14] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[50px]">
              <HighlightedTitle text={hero.mainHeading} />
            </h1>

            {/* Description */}
            {hero.subHeading && (
              <p className="m-0 max-w-[580px] text-sm leading-relaxed text-slate-600 sm:text-base lg:text-[17px] whitespace-pre-line">
                <HighlightedTitle text={hero.subHeading} />
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {hero.primaryCtaUrl?.startsWith("http") && !onCtaClick ? (
                <a
                  href={hero.primaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(239,68,68,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_12px_28px_rgba(239,68,68,0.38)] active:translate-y-0 sm:min-h-[52px] sm:px-7 sm:text-[15px]"
                >
                  <span>{ctaText}</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimaryCtaClick}
                  className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(239,68,68,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_12px_28px_rgba(239,68,68,0.38)] active:translate-y-0 sm:min-h-[52px] sm:px-7 sm:text-[15px]"
                >
                  <span>{ctaText}</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              )}

              {hero.secondaryCtaText && (
                <a
                  href={hero.secondaryCtaUrl || "#"}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-sm active:translate-y-0 sm:min-h-[52px] sm:px-6"
                >
                  {hero.secondaryCtaText}
                </a>
              )}
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[11px] font-medium text-slate-500 sm:text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Free 1-on-1 Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span>Globally Recognized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>WES / ECE Accredited</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE AREA ================= */}
          <div className="relative flex min-h-[400px] items-center justify-center lg:min-h-[430px]">
            {/* Ambient Multi-Layer Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-red-200/40 via-rose-100/30 to-amber-100/25 blur-3xl sm:h-[400px] sm:w-[400px] lg:h-[430px] lg:w-[430px]" />

            {/* Concentric Subtle Rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-200/50 sm:h-[380px] sm:w-[380px] lg:h-[410px] lg:w-[410px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-red-300/40 sm:h-[310px] sm:w-[310px]" />

            {/* Floating Credential Chip */}
            <div className="pointer-events-none absolute -right-2 top-4 z-20 hidden items-center gap-1.5 rounded-full border border-red-100 bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-md backdrop-blur-md sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Doctorate</span>
            </div>

            {/* Images Wrapper */}
            <div className="relative z-10 flex w-full max-w-[460px] items-end justify-center gap-3 pt-12 sm:gap-4 lg:max-w-[480px]">
              {/* Transition Badge between Before and After */}
              {badgeText && (
                isDbaTransition ? (
                  <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-red-200/90 bg-white/95 px-3.5 py-1 shadow-[0_8px_20px_rgba(239,68,68,0.12)] backdrop-blur-md">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">From</span>
                    <span className="text-xs font-black text-red-500">&#39;Mr.&#39;</span>
                    <div className="relative w-7 sm:w-9 border-t-2 border-dashed border-red-300">
                      <span className="absolute -right-1 -top-[5px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-red-500" />
                    </div>
                    <span className="text-xs font-black text-red-500">&#39;Dr.&#39;</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">To</span>
                  </div>
                ) : (
                  <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-red-200/90 bg-white/95 px-4 py-1 shadow-[0_8px_20px_rgba(239,68,68,0.12)] backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-red-500 shrink-0" />
                    <span className="text-xs font-extrabold text-slate-800">
                      <HighlightedTitle text={badgeText} />
                    </span>
                  </div>
                )
              )}

              {/* BEFORE IMAGE CARD */}
              {beforeImg && (
                <div className="group/before relative w-[47%] max-w-[215px] translate-y-4 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.16)]">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[300px] lg:h-[320px]">
                    <img
                      src={beforeImg}
                      alt={beforeLabel || "Before"}
                      className="h-full w-full object-cover object-center filter grayscale-[15%] transition-transform duration-500 group-hover/before:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 rounded-lg border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
                    {beforeLabel}
                  </span>
                </div>
              )}

              {/* AFTER IMAGE CARD */}
              {afterImg && (
                <div className="group/after relative w-[47%] max-w-[215px] -translate-y-2 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_20px_40px_rgba(239,68,68,0.22),0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(239,68,68,0.28)] ring-2 ring-red-500/20">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[300px] lg:h-[320px]">
                    <img
                      src={afterImg}
                      alt={afterLabel || "After"}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/after:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent opacity-50" />
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-lg border border-red-300/30 bg-gradient-to-r from-red-600 to-red-500 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                    <Sparkles className="h-2.5 w-2.5 text-amber-200" />
                    {afterLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageHero;
