"use client";

import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Code2,
  LayoutGrid,
  Users,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

type FeatureIcon = "stack" | "apps" | "mentor";

const FEATURE_ICONS: Record<FeatureIcon, LucideIcon> = {
  stack: Code2,
  apps: LayoutGrid,
  mentor: Users,
};

type CareerHeroProps = {
  hero: {
    badge: string;
    heading: string;
    headingHighlight?: string;
    description: string;
    image?: string;
    imageAlt?: string;
    cohortLabel?: string;
    coreStack?: readonly string[];
    emiText?: string;
    ctcGrowth?: string;
    salary: string;
    duration: string;
    features?: readonly {
      icon: FeatureIcon;
      title: string;
      description: string;
    }[];
    ratingText?: string;
    placementText?: string;
    report?: {
      candidateCtc: string;
      placementWindow: string;
      careerGoals?: readonly string[];
    };
  };
};

/* Right column: the hero photo with a small "engineering dashboard" panel tucked under it */
function HeroVisual({ hero }: CareerHeroProps) {
  if (!hero.image) return null;

  return (
    <div className="relative w-full max-w-[520px]">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)]">
        <div className="relative aspect-[4/3] w-full lg:aspect-[10/9] overflow-hidden rounded-[22px] bg-slate-100">
          <Image
            src={hero.image}
            alt={hero.imageAlt ?? "Software developer at work"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover object-[62%_center]"
          />

          {hero.cohortLabel && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-slate-800 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {hero.cohortLabel}
            </span>
          )}
        </div>
      </div>

      {/* Info panel overlapping the bottom of the photo */}
      <div className="relative z-10 mx-3 -mt-14 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)] sm:mx-6 sm:p-4">
        {/* Editor strip */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-700">cluster.service.ts</span>
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Build Passing (0.18s)
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-slate-600 ring-1 ring-slate-200">
            <GitBranch className="h-3 w-3" />
            main
          </span>
        </div>

        {/* Outcome stats */}
        {hero.report && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-white px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Average CTC
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900">
                  {hero.report.candidateCtc}
                </span>
                {hero.ctcGrowth && (
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {hero.ctcGrowth}
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Median Placement
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-slate-900">
                  {hero.report.placementWindow}
                </span>
                <span className="text-[11px] text-slate-400">from graduation</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CareerHero({ hero }: CareerHeroProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-slate-100 bg-slate-50/60">
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* LEFT CONTENT */}
          <div className="w-full max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[42px] md:text-[52px]">
              <span className="block">{hero.heading}</span>
              {hero.headingHighlight && (
                <span className="block text-red-600">{hero.headingHighlight}</span>
              )}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {hero.description}
            </p>

            {/* Core stack */}
            {hero.coreStack && hero.coreStack.length > 0 && (
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Core Stack
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {hero.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-medium text-slate-700 transition-colors hover:border-red-200 hover:text-red-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feature cards */}
            {hero.features && hero.features.length > 0 && (
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {hero.features.map((f) => {
                  const Icon = FEATURE_ICONS[f.icon];
                  return (
                    <div
                      key={f.title}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      <p className="mt-3 text-sm font-bold text-slate-900">{f.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{f.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA — opens the site-wide signup modal (the navbar listens for "open-signup") */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-signup"))}
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white sm:w-auto sm:px-6 shadow-lg shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Get My Personalized AI Career Report
                <ArrowRight className="hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block" />
              </button>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="flex w-full justify-center lg:justify-end">
            <HeroVisual hero={hero} />
          </div>
        </div>
      </div>
    </section>
  );
}
