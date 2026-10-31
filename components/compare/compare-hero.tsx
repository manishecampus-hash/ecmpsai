"use client";

import { ArrowRight, BookOpen, Briefcase, Check, Clock, IndianRupee, ShieldCheck, Trophy } from "lucide-react";
import HeroShowcase from "./hero-showcase";
import { openComparePicker } from "./compare-link";

const FACTORS = [
  { icon: IndianRupee, label: "Fees & EMI" },
  { icon: ShieldCheck, label: "Approvals" },
  { icon: Trophy, label: "Rankings" },
  { icon: Briefcase, label: "Placements" },
  { icon: BookOpen, label: "Curriculum" },
  { icon: Clock, label: "Duration" },
];

const POINTS = ["Free & unbiased", "Approvals verified", "Detailed answer in My Chat"];

// Dark hero in the same black-and-red style as the course pages
export default function CompareHero() {
  return (
    <section aria-labelledby="compare-heading" className="relative isolate overflow-hidden bg-slate-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-48 h-[520px] w-[520px] rounded-full bg-[#ee2c3c]/30 blur-[120px]" />
        <div className="absolute -bottom-40 -right-24 h-[460px] w-[460px] rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 py-14 sm:px-8 lg:w-[86%] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-0 lg:py-20">
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <h1
            id="compare-heading"
            className="text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-[44px] lg:text-[52px]"
          >
            Compare universities side by side. <span className="text-red-500">Choose with confidence.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Fees, approvals, duration and career outcomes for India&apos;s top online universities and global business
            schools, explained by our AI counsellor in seconds.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openComparePicker}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-7 text-sm font-bold text-white shadow-[0_12px_24px_-8px_rgba(220,38,38,0.6)] transition-colors hover:bg-red-700 focus-visible:underline active:scale-[0.98]"
            >
              Start comparing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
            <a
              href="#comparisons"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:underline"
            >
              Browse comparisons
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                <Check className="h-4 w-4 text-red-500" strokeWidth={3} aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-6 motion-safe:duration-700">
          <HeroShowcase />
        </div>
      </div>

      {/* What the comparison covers */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-5 py-5 sm:px-8 lg:w-[86%] lg:flex-row lg:items-center lg:gap-10 lg:px-0">
          <p className="flex-shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-white/50">What our AI compares</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
            {FACTORS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Icon className="h-4 w-4 text-red-500" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
