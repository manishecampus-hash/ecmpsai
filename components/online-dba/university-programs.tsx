"use client";

import React, { useState } from "react";
import {
  MapPin,
  Globe,
  GraduationCap,
  Clock3,
  Award,
  ArrowRight,
} from "lucide-react";

import { universities } from "@/data/universities";
import ApplyNowModal from "@/components/form/apply-now-modal";
import { LpHeading, LpReveal, LpSection } from "@/components/landing-page/lp-ui";

interface UniversityProgramsProps {
  onApplyClick?: (universityName: string) => void;
}

/* ============================================================
   ONLY DBA UNIVERSITIES
============================================================ */

const dbaUniversitySlugs = [
  "rushford-business-school",
  "edgewood-university",
  "esgci",
  "ssbm",
  "golden-gate-university",
];

/* ============================================================
   FILTER ONLY DBA UNIVERSITIES
============================================================ */

const dbaUniversities = universities.filter((university) =>
  dbaUniversitySlugs.includes(university.slug)
);

export default function UniversityPrograms({
  onApplyClick,
}: UniversityProgramsProps) {
  const [showModal, setShowModal] = useState(false);

  const handleApply = (universityName: string) => {
    if (onApplyClick) {
      onApplyClick(universityName);
    } else {
      setShowModal(true);
    }
  };

  return (
    <LpSection>
      <LpHeading
        heading="Programs From Top *Online Universities*"
        description="Explore globally accredited Doctor of Business Administration programs curated for working executives and business leaders."
      />

      <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
        {dbaUniversities.map((university, i) => {
          const LocationIcon = university.locationIcon === "Globe" ? Globe : MapPin;
          const meta = [
            { icon: LocationIcon, text: `${university.location} · ${university.region}` },
            { icon: GraduationCap, text: "Doctorate · DBA" },
            { icon: Clock3, text: "Flexible Online Learning" },
            { icon: Award, text: "University Recognized Program" },
          ];

          return (
            <LpReveal
              key={university.slug}
              delay={(i % 3) * 0.07}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-24px_rgba(220,38,38,0.45)]">
                {/* Logo */}
                <div className="relative flex h-32 items-center justify-center border-b border-slate-100 bg-slate-50/60 px-8">
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 ring-1 ring-red-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Online DBA
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={university.image}
                    alt={university.name}
                    loading="lazy"
                    className="max-h-16 max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600">
                    {university.name}
                  </h3>

                  <ul className="mt-3 space-y-2 text-[13px] font-medium text-slate-600">
                    {meta.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2} />
                        <span className="truncate">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleApply(university.name)}
                    className="group/btn mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_10px_20px_-10px_rgba(220,38,38,0.7)]"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </LpReveal>
          );
        })}
      </div>

      <ApplyNowModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </LpSection>
  );
}
