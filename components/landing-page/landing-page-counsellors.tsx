import React from "react";
import Image from "next/image";
import { BriefcaseBusiness, UserRound, Star } from "lucide-react";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";

export interface CounsellorItem {
  id: string;
  name: string;
  image: string;
  rating: string;
  experience: string;
  students: string;
}

export interface LandingPageCounsellorsData {
  sectionHeading?: string;
  counsellors?: CounsellorItem[];
}

interface LandingPageCounsellorsProps {
  counsellorsSection?: LandingPageCounsellorsData;
}

export function LandingPageCounsellors({
  counsellorsSection,
}: LandingPageCounsellorsProps) {
  if (
    !counsellorsSection ||
    !counsellorsSection.counsellors ||
    counsellorsSection.counsellors.length === 0
  )
    return null;

  const sectionHeading =
    counsellorsSection.sectionHeading || "Meet Our Counsellors";
  const counsellors = counsellorsSection.counsellors;

  const grid =
    counsellors.length === 1
      ? "mx-auto max-w-sm grid-cols-1"
      : counsellors.length === 2
        ? "mx-auto max-w-4xl grid-cols-1 sm:grid-cols-2"
        : counsellors.length === 3
          ? "mx-auto max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <LpSection tone="muted">
      <LpHeading
        heading={sectionHeading}
        description="Connect with experienced academic advisors and career mentors dedicated to guiding your doctoral journey."
      />

      <div className={`grid gap-5 ${grid}`}>
        {counsellors.map((c, i) => (
          <LpReveal key={c.id || c.name} delay={i * 0.08}>
            <article className="group flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-24px_rgba(220,38,38,0.45)] sm:p-6">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-40 sm:w-36">
                {c.image ? (
                  <Image src={c.image} alt={c.name} fill sizes="144px" className="object-cover object-top" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-300">
                    {c.name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" strokeWidth={1.8} /> {c.rating}
                </span>
                <h3 className="mt-2.5 text-lg font-bold sm:text-xl leading-snug text-slate-900 transition-colors group-hover:text-red-600">{c.name}</h3>
                <p className="text-xs font-medium text-slate-500">DBA Counsellor</p>
                <ul className="mt-3.5 space-y-2 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2} />
                    <span className="leading-snug">{c.experience}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2} />
                    <span className="leading-snug">{c.students}</span>
                  </li>
                </ul>
              </div>
            </article>
          </LpReveal>
        ))}
      </div>
    </LpSection>
  );
}

export default LandingPageCounsellors;
