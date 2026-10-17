import React from "react";
import { TrendingUp, Users, Target, Award, Sparkles } from "lucide-react";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";

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

  const cols = cards.length >= 4 ? "lg:grid-cols-4" : cards.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <LpSection>
      <LpHeading heading={sectionHeading} description={experience.sectionDescription || undefined} />

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${cols}`}>
        {cards.map((card, index) => {
          const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
          return (
            <LpReveal key={card.id || index} delay={index * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all sm:p-6 duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-24px_rgba(220,38,38,0.45)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-red-600 sm:text-4xl">{card.value}</span>
                </div>
                <h3 className="mt-3 text-[17px] font-bold text-slate-900 sm:mt-5">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{card.description}</p>
              </div>
            </LpReveal>
          );
        })}
      </div>

      {(experience.bottomHeading || experience.bottomDescription) && (
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-2.5 rounded-2xl border border-red-100 bg-red-50/60 px-5 py-3 text-center sm:flex-row sm:gap-3 sm:rounded-full sm:text-left">
          {experience.bottomHeading && (
            <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {experience.bottomHeading}
            </span>
          )}
          {experience.bottomDescription && <p className="text-sm font-semibold text-slate-700">{experience.bottomDescription}</p>}
        </div>
      )}
    </LpSection>
  );
}

export default LandingPageExperience;
