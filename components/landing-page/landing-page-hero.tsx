"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";
import HighlightedTitle from "./highlighted-title";
import ApplyNowModal from "@/components/form/apply-now-modal";

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

  const [showApplyModal, setShowApplyModal] = useState(false);

  const handlePrimaryCtaClick = (e: React.MouseEvent) => {
    if (hero.primaryCtaUrl?.startsWith("http") && !onCtaClick) {
      return;
    }
    e.preventDefault();
    if (onCtaClick) {
      onCtaClick();
    } else {
      setShowApplyModal(true);
    }
  };

  return (
    <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-red-50/50 via-white to-white border-b border-slate-100 !m-0 !p-0">
      {/* Top subtle radial aura */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-full max-w-6xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
        <div className="grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            {/* Tag / Pre-headline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50/90 px-4 py-1.5 text-xs font-bold text-red-600 shadow-2xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-red-500" />
              <span className="tracking-wider uppercase text-[11px] font-extrabold">
                Accelerate Your Career
              </span>
            </div>

            {/* Heading */}
            <h1 className="m-0 text-3xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[52px]">
              <HighlightedTitle text={hero.mainHeading} />
            </h1>

            {/* Description */}
            {hero.subHeading && (
              <p className="m-0 max-w-[600px] text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[18px] whitespace-pre-line font-normal">
                <HighlightedTitle text={hero.subHeading} />
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {hero.primaryCtaUrl?.startsWith("http") && !onCtaClick ? (
                <a
                  href={hero.primaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_10px_25px_-5px_rgba(239,68,68,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_14px_30px_-5px_rgba(239,68,68,0.45)] active:translate-y-0"
                >
                  <span>{ctaText}</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimaryCtaClick}
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_10px_25px_-5px_rgba(239,68,68,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_14px_30px_-5px_rgba(239,68,68,0.45)] active:translate-y-0"
                >
                  <span>{ctaText}</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              )}

              {hero.secondaryCtaText && (
                <a
                  href={hero.secondaryCtaUrl || "#"}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm active:translate-y-0"
                >
                  {hero.secondaryCtaText}
                </a>
              )}
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2 text-xs font-semibold text-slate-500 sm:text-[13px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Free 1-on-1 Mentorship</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-500 shrink-0" />
                <span>Globally Recognized</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500 shrink-0" />
                <span>WES / ECE Accredited</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE AREA ================= */}
          <div className="relative flex min-h-[380px] items-center justify-center lg:col-span-5 lg:min-h-[440px]">
            {/* Ambient Multi-Layer Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-red-200/40 via-rose-100/30 to-amber-100/25 blur-3xl sm:h-[420px] sm:w-[420px]" />

            {/* Concentric Subtle Rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-200/50 sm:h-[400px] sm:w-[400px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-red-300/40 sm:h-[320px] sm:w-[320px]" />

            {/* Floating Credential Chip */}
            <div className="pointer-events-none absolute -right-2 top-2 z-20 hidden items-center gap-2 rounded-full border border-red-100/90 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Doctorate</span>
            </div>

            {/* Images Wrapper */}
            <div className="relative z-10 flex w-full max-w-[460px] items-end justify-center gap-3.5 pt-10 sm:gap-4.5">
              {/* Transition Badge between Before and After */}
              {badgeText && (
                isDbaTransition ? (
                  <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-red-200/90 bg-white/95 px-4 py-1.5 shadow-[0_8px_20px_rgba(239,68,68,0.12)] backdrop-blur-md">
                    <span className="text-[11px] font-bold text-slate-500">From</span>
                    <span className="text-xs font-black text-red-600">&#39;Mr.&#39;</span>
                    <div className="relative w-8 sm:w-10 border-t-2 border-dashed border-red-400">
                      <span className="absolute -right-1 -top-[5px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-red-500" />
                    </div>
                    <span className="text-xs font-black text-red-600">&#39;Dr.&#39;</span>
                    <span className="text-[11px] font-bold text-slate-500">To</span>
                  </div>
                ) : (
                  <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-red-200/90 bg-white/95 px-4 py-1.5 shadow-[0_8px_20px_rgba(239,68,68,0.12)] backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span className="text-xs font-extrabold text-slate-800">
                      <HighlightedTitle text={badgeText} />
                    </span>
                  </div>
                )
              )}

              {/* BEFORE IMAGE CARD */}
              {beforeImg && (
                <div className="group/before relative w-[48%] max-w-[215px] translate-y-3 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_12px_28px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.15)]">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[290px] lg:h-[310px]">
                    <img
                      src={beforeImg}
                      alt={beforeLabel || "Before"}
                      className="h-full w-full object-cover object-center filter grayscale-[15%] transition-transform duration-500 group-hover/before:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 rounded-lg border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
                    {beforeLabel}
                  </span>
                </div>
              )}

              {/* AFTER IMAGE CARD */}
              {afterImg && (
                <div className="group/after relative w-[48%] max-w-[215px] -translate-y-2 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_20px_40px_rgba(239,68,68,0.22),0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(239,68,68,0.28)] ring-2 ring-red-500/20">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[290px] lg:h-[310px]">
                    <img
                      src={afterImg}
                      alt={afterLabel || "After"}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/after:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent opacity-50" />
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-lg border border-red-300/30 bg-gradient-to-r from-red-600 to-red-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                    <Sparkles className="h-2.5 w-2.5 text-amber-200" />
                    {afterLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ApplyNowModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </section>
  );
}

export default LandingPageHero;
