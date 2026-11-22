import React from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  BriefcaseBusiness,
} from "lucide-react";
import Image from "next/image";
import HighlightedTitle from "./highlighted-title";
import { ApplyNowButton } from "@/components/form/apply-now-modal";

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
  /** Floating chip on the hero image (default "Verified Doctorate") */
  credentialLabel?: string;
  /** Third trust indicator under the CTAs (default "WES / ECE Accredited") */
  trustLabel?: string;
}

interface LandingPageHeroProps {
  hero: LandingPageHeroData;
  /** Optional right-hand content (e.g. an inline form) shown instead of the before/after images */
  aside?: React.ReactNode;
  /** Options for the Apply form's course dropdown on this page */
  formCourses?: string[];
}

// Backdrop curves (viewBox 1440×600)
const HERO_LINES = [
  "M-40 140 C 260 60, 520 240, 820 150 S 1240 60, 1480 140",
  "M-40 420 C 280 340, 560 520, 860 420 S 1260 320, 1480 410",
  "M1000 -20 C 920 180, 1100 380, 980 620",
];

const PRIMARY_CTA =
  "lp-hero-cta group inline-flex min-h-[46px] flex-auto items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-3 py-2.5 text-[clamp(11.5px,3.2vw,14px)] font-bold text-white shadow-[0_12px_28px_-8px_rgba(239,68,68,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_16px_34px_-8px_rgba(239,68,68,0.6)] active:translate-y-0 sm:min-h-[54px] sm:flex-none sm:gap-2.5 sm:px-8 sm:py-3.5 sm:text-base";

export function LandingPageHero({ hero, formCourses, aside }: LandingPageHeroProps) {
  const ctaText = hero.primaryCtaText || "Let's Talk About Your Career Goals";
  const beforeImg = hero.beforeImage || "/dba/before.png";
  const afterImg = hero.afterImage || "/dba/after.png";
  const beforeLabel = hero.beforeLabel || "BEFORE";
  const afterLabel = hero.afterLabel || "AFTER";
  const badgeText = hero.badgeText || "From 'Mr.' To 'Dr.'";

  const isDbaTransition =
    badgeText.toLowerCase().includes("mr") && badgeText.toLowerCase().includes("dr");

  return (
    <section className="lp-hero relative z-10 w-full overflow-hidden border-b border-slate-100 bg-white !m-0 !p-0">
      {/* ── Backdrop (static layers + one GPU-friendly line animation on desktop) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/70 via-white to-white" />
        {/* faint grid, fading out */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
        {/* soft colour blobs */}
        <div className="lp-hero-blob absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-red-200/35 blur-3xl" />
        <div className="lp-hero-blob-late absolute right-[-8%] top-[18%] hidden h-[440px] w-[440px] rounded-full bg-rose-200/30 blur-3xl lg:block" />
      </div>
      <svg aria-hidden viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
        <defs>
          <linearGradient id="lp-hero-line" x1="0" x2="1">
            <stop offset="0" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
        {HERO_LINES.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#lp-hero-line)" strokeWidth="1" />
            <path d={d} fill="none" stroke="#ef4444" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" pathLength={100} strokeDasharray="5 95" className="lp-hero-flow" style={{ animationDuration: `${8 + i * 1.5}s`, animationDelay: `${i * -2}s` }} />
          </g>
        ))}
      </svg>
      <style>{`
        @keyframes lp-hero-flow { from { stroke-dashoffset: 100 } to { stroke-dashoffset: 0 } }
        @keyframes lp-hero-float { 0%,100% { translate: 0 0 } 50% { translate: 0 -8px } }
        @keyframes lp-hero-spin { to { rotate: 360deg } }
        @keyframes lp-hero-drift { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(24px,18px,0) } }
        /* entrance: content fades up; the heading only slides (no fade) so it paints immediately */
        @keyframes lp-hero-in { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes lp-hero-rise { from { transform: translateY(14px) } to { transform: none } }
        @keyframes lp-hero-card { from { opacity: 0; transform: translateY(18px) scale(.985) } to { opacity: 1; transform: none } }
        @keyframes lp-hero-shine { 0% { transform: translateX(-130%) skewX(-20deg) } 60%,100% { transform: translateX(330%) skewX(-20deg) } }
        @keyframes lp-hero-ring { 0% { transform: scale(.9); opacity: .55 } 100% { transform: scale(1.8); opacity: 0 } }
        .lp-hero-flow { animation: lp-hero-flow linear infinite; }
        .lp-hero-float { animation: lp-hero-float 5s ease-in-out infinite; }
        .lp-hero-float-late { animation: lp-hero-float 5s ease-in-out 1.2s infinite; }
        .lp-hero-spin { animation: lp-hero-spin 50s linear infinite; }
        /* blob drift on desktop only (saves work on phones) */
        @media (min-width: 1024px) {
          .lp-hero-blob { animation: lp-hero-drift 18s ease-in-out infinite; }
          .lp-hero-blob-late { animation: lp-hero-drift 22s ease-in-out -6s infinite reverse; }
        }
        .lp-hero-in { animation: lp-hero-in .6s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0s); }
        .lp-hero-rise { animation: lp-hero-rise .6s cubic-bezier(.22,1,.36,1) both; }
        .lp-hero-card { animation: lp-hero-card .7s cubic-bezier(.22,1,.36,1) .15s both; }
        .lp-hero-mark { display: inline-block; background: linear-gradient(90deg,#dc2626,#f43f5e); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .lp-hero-cta { position: relative; overflow: hidden; }
        .lp-hero-cta::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 35%; background: linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent); animation: lp-hero-shine 3.6s ease-in-out 1.2s infinite; pointer-events: none; }
        .lp-hero-ring { animation: lp-hero-ring 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-hero-flow, .lp-hero-float, .lp-hero-float-late, .lp-hero-spin, .lp-hero-blob, .lp-hero-blob-late,
          .lp-hero-in, .lp-hero-rise, .lp-hero-card, .lp-hero-cta::after, .lp-hero-ring { animation: none; }
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 font-sans sm:px-6 lg:px-8">
        <div
          className={`grid items-center gap-7 py-8 sm:gap-10 sm:py-10 lg:grid-cols-12 lg:gap-12 ${
            aside ? "lg:min-h-[calc(100svh-64px)] lg:py-6" : "lg:py-12"
          }`}
        >
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start gap-4 lg:col-span-7 lg:gap-5">
            {/* Tag / Pre-headline */}
            <div
              className="lp-hero-in inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white/80 py-1 pl-1 pr-4 text-xs font-bold text-red-600 shadow-[0_6px_18px_-12px_rgba(220,38,38,0.6)] backdrop-blur"
              style={{ "--d": "0s" } as React.CSSProperties}
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                <span aria-hidden className="lp-hero-ring absolute inset-0 rounded-full bg-red-500/50" />
                <Sparkles className="relative h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-normal sm:tracking-wider">
                Accelerate Your Career
              </span>
            </div>

            {/* Heading */}
            <h1 className="lp-hero-rise m-0 text-[28px] font-black leading-[1.1] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px] lg:text-[52px]">
              <HighlightedTitle text={hero.mainHeading} highlightClassName="lp-hero-mark" />
            </h1>

            {/* Description */}
            {hero.subHeading && (
              <p
                className="lp-hero-in m-0 max-w-[600px] whitespace-pre-line text-[15px] font-normal leading-relaxed text-slate-600 sm:text-[17px]"
                style={{ "--d": ".1s" } as React.CSSProperties}
              >
                <HighlightedTitle text={hero.subHeading} />
              </p>
            )}

            {/* CTAs */}
            {/* Mobile: both CTAs on one line with smaller text. sm and up: unchanged */}
            <div
              className="lp-hero-in flex w-full flex-nowrap items-center gap-2.5 pt-1 sm:w-auto sm:flex-wrap sm:gap-3.5 sm:pt-2"
              style={{ "--d": ".2s" } as React.CSSProperties}
            >
              {hero.primaryCtaUrl?.startsWith("http") ? (
                <a
                  href={hero.primaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_CTA}
                >
                  <span className="relative">{ctaText}</span>
                  <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]" />
                </a>
              ) : (
                <ApplyNowButton courses={formCourses} className={PRIMARY_CTA}>
                  <span className="relative">{ctaText}</span>
                  <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]" />
                </ApplyNowButton>
              )}

              {hero.secondaryCtaText && (
                <a
                  href={hero.secondaryCtaUrl || "#programs"}
                  className="inline-flex min-h-[46px] flex-auto items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-slate-300/80 bg-white px-3 py-2.5 text-[clamp(11.5px,3.2vw,14px)] font-bold text-slate-700 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm active:translate-y-0 sm:min-h-[54px] sm:flex-none sm:px-7 sm:py-3.5 sm:text-base"
                >
                  {hero.secondaryCtaText}
                </a>
              )}
            </div>

            {/* Micro Trust Indicators */}
            <ul
              className="lp-hero-in flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-slate-600 sm:gap-2.5 sm:text-[13px]"
              style={{ "--d": ".3s" } as React.CSSProperties}
            >
              <li className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3 shadow-[0_4px_12px_-10px_rgba(15,23,42,0.5)] backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                Free 1-on-1 Mentorship
              </li>
              <li className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3 shadow-[0_4px_12px_-10px_rgba(15,23,42,0.5)] backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
                Globally Recognized
              </li>
              <li className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3 shadow-[0_4px_12px_-10px_rgba(15,23,42,0.5)] backdrop-blur sm:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Award className="h-3.5 w-3.5" />
                </span>
                {hero.trustLabel || "WES / ECE Accredited"}
              </li>
            </ul>

          </div>

          {aside ? (
            /* ================= RIGHT: CUSTOM CONTENT (inline form) ================= */
            <div className="lp-hero-card relative lg:col-span-5">
              {/* soft glow behind the card */}
              <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-red-200/50 via-rose-100/40 to-amber-100/50 blur-2xl" />
              {aside}
            </div>
          ) : (
          <>
          {/* ================= RIGHT IMAGE AREA ================= */}
          <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:col-span-5 lg:min-h-[440px]">
            {/* Ambient Multi-Layer Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-red-200/40 via-rose-100/30 to-amber-100/25 blur-3xl sm:h-[420px] sm:w-[420px]" />

            {/* Concentric Subtle Rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-200/50 sm:h-[400px] sm:w-[400px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-red-300/40 sm:h-[320px] sm:w-[320px]" />
            <div className="lp-hero-spin pointer-events-none absolute left-1/2 top-1/2 -ml-[170px] -mt-[170px] h-[340px] w-[340px] sm:-ml-[200px] sm:-mt-[200px] sm:h-[400px] sm:w-[400px]">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.15)]" />
            </div>

            {/* Floating Credential Chip */}
            <div className="pointer-events-none absolute -right-2 top-2 z-20 hidden items-center gap-2 rounded-full border border-red-100/90 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{hero.credentialLabel || "Verified Doctorate"}</span>
            </div>

            {/* Study-while-working chip */}
            <div className="lp-hero-float-late pointer-events-none absolute -right-3 top-[48%] z-20 hidden items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3 py-2 shadow-[0_14px_30px_-12px_rgba(15,23,42,0.3)] sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-red-50 text-red-600">
                <BriefcaseBusiness className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-extrabold text-slate-900">Study while you work</span>
                <span className="block text-[10px] font-semibold text-slate-500">100% online, flexible</span>
              </span>
            </div>

            {/* Images Wrapper */}
            <div className="relative z-10 flex w-full max-w-[460px] items-end justify-center gap-3.5 pt-7 sm:gap-4.5 sm:pt-10">
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
                    <span className="hidden text-[11px] font-bold text-slate-500 sm:inline">To</span>
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
                <div className="lp-hero-float group/before relative w-[48%] max-w-[215px] translate-y-3 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_12px_28px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.15)]">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[290px] lg:h-[310px]">
                    <Image
                      src={beforeImg}
                      alt={beforeLabel || "Before"}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 48vw, 215px"
                      quality={60}
                      className="object-cover object-center grayscale-[15%] transition-transform duration-500 group-hover/before:scale-[1.03]"
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
                <div className="lp-hero-float-late group/after relative w-[48%] max-w-[215px] -translate-y-2 overflow-hidden rounded-2xl border-[3.5px] border-white bg-slate-100 shadow-[0_20px_40px_rgba(239,68,68,0.22),0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(239,68,68,0.28)] ring-2 ring-red-500/20">
                  <div className="relative h-[250px] w-full overflow-hidden sm:h-[290px] lg:h-[310px]">
                    <Image
                      src={afterImg}
                      alt={afterLabel || "After"}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 48vw, 215px"
                      quality={60}
                      className="object-cover object-center transition-transform duration-500 group-hover/after:scale-[1.03]"
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
          </>
          )}
        </div>
      </div>
    </section>
  );
}

export default LandingPageHero;
