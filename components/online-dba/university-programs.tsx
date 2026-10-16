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

const universityCardArtwork: Record<string, string> = {
  "rushford-business-school": "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&w=900&q=76",
  "edgewood-university": "https://images.unsplash.com/photo-1771322159307-f4ecd79d8263?auto=format&fit=crop&w=900&q=76",
  esgci: "https://images.unsplash.com/photo-1777202740019-5340f67184f8?auto=format&fit=crop&w=900&q=76",
  ssbm: "https://images.unsplash.com/photo-1763615834709-cd4b196980db?auto=format&fit=crop&w=900&q=76",
  "golden-gate-university": "https://images.unsplash.com/photo-1741636371515-8ce169441e2a?auto=format&fit=crop&w=900&q=76",
};

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

      <div className="flex flex-wrap justify-start gap-5 sm:gap-6">
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
              delay={i * 0.09}
              duration={0.75}
              distance={8}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 border-t-[3px] border-t-red-600 bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.3)] transition duration-500 hover:-translate-y-0.5 hover:border-slate-300 hover:border-t-red-600 hover:shadow-[0_18px_34px_-22px_rgba(15,23,42,0.32)]">
                <div className="relative h-36 overflow-hidden bg-slate-100 sm:h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={universityCardArtwork[university.slug]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-white/45 to-transparent" />
                </div>
                <div className="relative z-20 -mt-6 flex items-end justify-between px-5">
                  <div className="flex h-[58px] w-[116px] items-center justify-center rounded-xl border border-slate-100 bg-white px-3 shadow-[0_4px_14px_-8px_rgba(15,23,42,.2)] ring-2 ring-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={university.image}
                      alt={university.name}
                      loading="lazy"
                      className="max-h-10 max-w-full object-contain"
                    />
                  </div>
                  <span className="mb-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-700">
                    Online DBA
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                  <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-bold leading-snug tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-red-700">
                    {university.name}
                  </h3>

                  <div className="my-3 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
                  <ul className="grid flex-1 grid-cols-1 gap-y-2.5 text-[12px] font-medium text-slate-600">
                    {meta.map(({ icon: Icon, text }, metaIndex) => (
                      <li key={text} className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${metaIndex === 0 ? "bg-blue-50 text-blue-700" : metaIndex === 1 ? "bg-violet-50 text-violet-700" : metaIndex === 2 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="truncate">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleApply(university.name)}
                    className="group/btn mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 text-sm font-bold text-red-700 transition-colors duration-300 hover:border-red-700 hover:bg-red-700 hover:text-white group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
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
