"use client";

import React from "react";
import { TrendingUp, Users, Target, Award, Sparkles } from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface BenefitCardItem {
  id: string;
  value: string;
  title: string;
  description: string;
  icon?: string;
}

export interface LandingPageExperienceData {
  sectionHeading?: string;
  sectionDescription?: string;
  cards?: BenefitCardItem[];
  bottomHeading?: string;
  bottomDescription?: string;
}

interface LandingPageExperienceProps {
  experience?: LandingPageExperienceData;
}

const BENEFIT_ICONS = [TrendingUp, Users, Target, Award, Sparkles];

export function LandingPageExperience({ experience }: LandingPageExperienceProps) {
  if (!experience || !experience.cards || experience.cards.length === 0) return null;

  const sectionHeading = experience.sectionHeading || "Make Your Experience More Powerful";
  const cards = experience.cards;

  return (
    <section className="relative w-full overflow-hidden bg-slate-50/60 !m-0 !p-0">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -left-20 top-16 h-60 w-60 rounded-full bg-red-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-red-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 font-sans sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-10 sm:mb-12 lg:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>

          {experience.sectionDescription && (
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <HighlightedTitle text={experience.sectionDescription} />
            </p>
          )}

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= IMPACT CARDS GRID ================= */}
        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
            cards.length >= 4 ? "lg:grid-cols-4" : cards.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {cards.map((card, index) => {
            const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];

            return (
              <div
                key={card.id || index}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl sm:p-8"
              >
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                {/* Number / Value */}
                <div className="text-3xl font-black leading-tight tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-red-600 sm:text-4xl lg:text-5xl">
                  {card.value}
                </div>

                {/* Title */}
                <h3 className="m-0 mt-3 text-sm font-bold text-slate-900 sm:text-base">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="m-0 mt-1.5 text-xs text-slate-500 leading-relaxed sm:text-sm max-w-[260px]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}
        {(experience.bottomHeading || experience.bottomDescription) && (
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-6 py-2.5 shadow-xs sm:flex-row sm:gap-3">
            {experience.bottomHeading && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                {experience.bottomHeading}
              </span>
            )}
            {experience.bottomDescription && (
              <p className="m-0 text-xs sm:text-sm font-semibold text-slate-700">
                {experience.bottomDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default LandingPageExperience;
