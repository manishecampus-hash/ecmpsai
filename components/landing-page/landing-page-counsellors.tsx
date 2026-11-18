import React from "react";
import fs from "fs";
import path from "path";
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
  /** Label under each name (default "DBA Counsellor") */
  roleLabel?: string;
  /** Intro under the heading (default mentions the doctoral journey) */
  description?: string;
}

/** "Dr. Ananya Roy" → "AR" (titles skipped) */
function initials(name: string) {
  const parts = name.replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "").trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** Local /public images that don't exist render as a blank box — fall back to the initial instead */
function usableImage(src?: string) {
  if (!src) return "";
  if (!src.startsWith("/")) return src;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : "";
  } catch {
    return src;
  }
}

export function LandingPageCounsellors({
  counsellorsSection,
  roleLabel = "DBA Counsellor",
  description = "Connect with experienced academic advisors and career mentors dedicated to guiding your doctoral journey.",
}: LandingPageCounsellorsProps) {
  if (
    !counsellorsSection ||
    !counsellorsSection.counsellors ||
    counsellorsSection.counsellors.length === 0
  )
    return null;

  // "Meet Our Counsellors" → "Meet Your Counsellors"
  const sectionHeading = (
    counsellorsSection.sectionHeading || "Meet Your Counsellors"
  ).replace(/\bOur\b/, "Your");
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
        description={description}
      />

      <div className={`grid gap-5 ${grid}`}>
        {counsellors.map((c, i) => (
          <LpReveal key={c.id || c.name} delay={i * 0.08}>
            <article className="group flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-24px_rgba(220,38,38,0.45)] sm:p-6">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-40 sm:w-36">
                {usableImage(c.image) ? (
                  <Image src={usableImage(c.image)} alt={c.name} fill sizes="144px" className="object-cover object-top" />
                ) : (
                  <span className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-red-50 to-rose-100/70">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-lg font-extrabold tracking-wide text-white shadow-[0_8px_18px_-8px_rgba(220,38,38,0.7)] sm:h-16 sm:w-16 sm:text-xl">
                      {initials(c.name)}
                    </span>
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" strokeWidth={1.8} /> {c.rating}
                </span>
                <h3 className="mt-2.5 text-lg font-bold sm:text-xl leading-snug text-slate-900 transition-colors group-hover:text-red-600">{c.name}</h3>
                <p className="text-xs font-medium text-slate-500">{roleLabel}</p>
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
