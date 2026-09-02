"use client";

import React from "react";
import {
  MapPin,
  Globe,
  GraduationCap,
  Clock3,
  Award,
  ArrowRight,
} from "lucide-react";

import { universities } from "@/data/universities";

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
  return (
    <section className="relative z-10 w-full overflow-hidden bg-white !m-0 !p-0">

      {/* Background Decoration */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-40
          w-40
          rounded-full
          bg-red-50/60
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-48
          w-48
          rounded-full
          bg-red-50/50
          blur-3xl
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-8
          font-[Inter]
          sm:px-6
          sm:py-10
          lg:px-16
          lg:py-12
        "
      >

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-6 text-center sm:mb-8">

          <h2
            className="
              m-0
              text-[22px]
              font-extrabold
              leading-tight
              tracking-[-0.4px]
              text-slate-900
              sm:text-[27px]
              lg:text-[30px]
            "
          >
            Programs From Top{" "}
            <span className="text-red-500">
              Online Universities
            </span>
          </h2>

          <div
            className="
              mx-auto
              mt-2
              h-1
              w-12
              rounded-full
              bg-red-500
              shadow-[0_3px_8px_rgba(239,68,68,0.3)]
            "
          />

        </div>


        {/* =====================================================
            UNIVERSITY GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            lg:justify-items-center
          "
        >

          {dbaUniversities.map((university) => {

            const LocationIcon =
              university.locationIcon === "Globe"
                ? Globe
                : MapPin;

            return (

              <article
                key={university.slug}
                className="
                  group
                  relative
                  w-full
                  max-w-[330px]
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1
                  shadow-[0_3px_10px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-200
                  hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]
                "
              >

                {/* =================================================
                    IMAGE
                ================================================== */}

                <div
                  className="
                    relative
                    h-[105px]
                    overflow-hidden
                    rounded-lg
                    bg-slate-100
                    sm:h-[112px]
                  "
                >

                  <img
                    src={university.image}
                    alt={university.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.04]
                    "
                  />

                  {/* Image Overlay */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-slate-900/25
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Online DBA Badge */}

                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      flex
                      items-center
                      gap-1
                      rounded-md
                      bg-white/95
                      px-1.5
                      py-1
                      text-[8px]
                      font-bold
                      text-red-600
                      shadow-sm
                      backdrop-blur-sm
                    "
                  >

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-red-500
                      "
                    />

                    Online DBA

                  </div>

                </div>


                {/* =================================================
                    CARD CONTENT
                ================================================== */}

                <div className="px-2.5 pb-2.5 pt-2">

                  {/* University Name */}

                  <h3
                    className="
                      m-0
                      line-clamp-2
                      min-h-[32px]
                      text-[12px]
                      font-extrabold
                      leading-[1.35]
                      text-slate-900
                      transition-colors
                      group-hover:text-red-500
                    "
                  >
                    {university.name}
                  </h3>


                  {/* =================================================
                      META DETAILS
                  ================================================== */}

                  <div className="mt-2 space-y-1.5">

                    {/* Location */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-medium
                        text-slate-600
                      "
                    >

                      <LocationIcon
                        className="
                          h-3
                          w-3
                          shrink-0
                          text-red-500
                        "
                        strokeWidth={2.5}
                      />

                      <span className="truncate">
                        {university.location}
                      </span>

                      <span className="text-slate-300">
                        •
                      </span>

                      <span className="truncate">
                        {university.region}
                      </span>

                    </div>


                    {/* Program */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-medium
                        text-slate-600
                      "
                    >

                      <GraduationCap
                        className="
                          h-3
                          w-3
                          shrink-0
                          text-red-500
                        "
                        strokeWidth={2.5}
                      />

                      <span>
                        Doctorate • DBA
                      </span>

                    </div>


                    {/* Learning */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-medium
                        text-slate-600
                      "
                    >

                      <Clock3
                        className="
                          h-3
                          w-3
                          shrink-0
                          text-red-500
                        "
                        strokeWidth={2.5}
                      />

                      <span>
                        Flexible Online Learning
                      </span>

                    </div>


                    {/* Recognition */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-medium
                        text-slate-600
                      "
                    >

                      <Award
                        className="
                          h-3
                          w-3
                          shrink-0
                          text-red-500
                        "
                        strokeWidth={2.5}
                      />

                      <span className="truncate">
                        University Recognized Program
                      </span>

                    </div>

                  </div>


                  {/* =================================================
                      APPLY BUTTON
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      onApplyClick?.(university.name)
                    }
                    className="
                      group/btn
                      mx-auto
                      mt-2.5
                      flex
                      h-[28px]
                      w-[120px]
                      items-center
                      justify-center
                      gap-1.5
                      rounded-md
                      bg-gradient-to-r
                      from-red-500
                      to-red-600
                      text-[10px]
                      font-extrabold
                      text-white
                      shadow-[0_4px_10px_rgba(239,68,68,0.22)]
                      transition-all
                      duration-300
                      hover:-translate-y-[1px]
                      hover:from-red-600
                      hover:to-red-700
                      hover:shadow-[0_6px_14px_rgba(239,68,68,0.3)]
                      active:translate-y-0
                    "
                  >

                    Apply Now

                    <ArrowRight
                      className="
                        h-3
                        w-3
                        transition-transform
                        duration-300
                        group-hover/btn:translate-x-0.5
                      "
                    />

                  </button>

                </div>

              </article>

            );
          })}

        </div>

      </div>

    </section>
  );
}