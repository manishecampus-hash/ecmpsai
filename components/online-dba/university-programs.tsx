import React from "react";
import Image from "next/image";
import { MapPin, Sparkles, BadgeCheck, ArrowRight } from "lucide-react";

import { ApplyNowButton } from "@/components/form/apply-now-modal";
import { LpHeading, LpReveal, LpSection } from "@/components/landing-page/lp-ui";
import ProgramsCarousel from "./programs-carousel";

/* ============================================================
   DBA UNIVERSITIES (shown in this order)
============================================================ */

interface DbaUniversity {
  slug: string;
  name: string;
  location: string;
  usp: string;
  accreditation: string;
  logo: string;
  artwork: string;
}

const DBA_UNIVERSITIES: DbaUniversity[] = [
  {
    slug: "golden-gate-university",
    name: "Golden Gate University (GGU)",
    location: "California, USA",
    usp: "Industry-Experienced Faculty",
    accreditation: "AACSB Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/3.svg",
    artwork: "https://images.unsplash.com/photo-1741636371515-8ce169441e2a?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "paris-american-international-university",
    name: "Paris American International University (PAIU)",
    location: "Paris, France",
    usp: "Flexible Study Options",
    accreditation: "QUALIOPI Certified",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/4.svg",
    artwork: "https://images.unsplash.com/photo-1763615834709-cd4b196980db?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "rushford-business-school",
    name: "Rushford Business School",
    location: "Switzerland",
    usp: "Best Industry Mentorship",
    accreditation: "EDUQUA Certified",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/2.svg",
    artwork: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "london-school-of-management",
    name: "London School of Management & Technology (LSMT)",
    location: "London, UK",
    usp: "Industry-Relevant Curriculum",
    accreditation: "QAHE Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/6.svg",
    artwork: "https://images.unsplash.com/photo-1771322159307-f4ecd79d8263?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "esgci",
    name: "Ecole de Commerce International (ESGCI)",
    location: "Paris, France",
    usp: "30 Years of Educational Experience",
    accreditation: "IACBE Accredited",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/5.svg",
    artwork: "https://images.unsplash.com/photo-1777202740019-5340f67184f8?auto=format&fit=crop&w=800&q=70",
  },
];

export default function UniversityPrograms({ formCourses }: { formCourses?: string[] } = {}) {
  return (
    <LpSection>
      <LpHeading
        heading="Top *Online Universities*"
        description="Explore globally accredited Doctor of Business Administration programs curated for working executives and business leaders."
        descriptionClassName="text-[clamp(11px,3vw,15px)] tracking-[-0.01em] sm:tracking-normal"
      />

      <p className="-mt-3 mb-4 text-center text-xs font-semibold text-slate-500 sm:hidden">
        {`Swipe to see all ${DBA_UNIVERSITIES.length} universities →`}
      </p>

      <ProgramsCarousel count={DBA_UNIVERSITIES.length}>
        {DBA_UNIVERSITIES.map((university, i) => {
          const meta = [
            {
              icon: MapPin,
              text: university.location,
              tone: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
            },
            {
              icon: Sparkles,
              text: university.usp,
              tone: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
            },
            {
              icon: BadgeCheck,
              text: university.accreditation,
              tone: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
            },
          ];

          return (
            <LpReveal
              key={university.slug}
              delay={i * 0.09}
              duration={0.75}
              distance={8}
              className="w-[82%] shrink-0 snap-start max-sm:![animation:none] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 border-t-[3px] border-t-red-600 bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.3)] transition duration-500 hover:-translate-y-0.5 hover:border-slate-300 hover:border-t-red-600 hover:shadow-[0_18px_34px_-22px_rgba(15,23,42,0.32)]">
                <div className="relative h-36 overflow-hidden bg-slate-100 sm:h-40">
                  <Image
                    src={university.artwork}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 384px"
                    quality={55}
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-white/45 to-transparent" />
                </div>

                <div className="relative z-20 -mt-8 flex items-end justify-between gap-2 px-5">
                  {/* Logo — 3:1 artwork, shown whole */}
                  <div className="flex h-[64px] w-[168px] items-center justify-center rounded-xl border border-slate-100 bg-white px-2 py-1.5 shadow-[0_6px_16px_-8px_rgba(15,23,42,.25)] ring-2 ring-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={university.logo}
                      alt={`${university.name} logo`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="mb-2 shrink-0 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-700">
                    Online DBA
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                  <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-bold leading-snug tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-red-700">
                    {university.name}
                  </h3>

                  <div className="my-3 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
                  <ul className="grid flex-1 grid-cols-1 gap-y-2.5 text-[12.5px] font-medium text-slate-600">
                    {meta.map(({ icon: Icon, text, tone }) => (
                      <li key={text} className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                        </span>
                        <span className="truncate">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <ApplyNowButton
                    courses={formCourses}
                    className="group/btn mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 text-sm font-bold text-red-700 transition-colors duration-300 hover:border-red-700 hover:bg-red-700 hover:text-white group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </ApplyNowButton>
                </div>
              </article>
            </LpReveal>
          );
        })}
      </ProgramsCarousel>
    </LpSection>
  );
}
