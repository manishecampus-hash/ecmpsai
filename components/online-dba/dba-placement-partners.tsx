"use client";

import React from "react";
import Image from "next/image";
import { BriefcaseBusiness } from "lucide-react";

const placementPartners = [
  {
    name: "Rushford Business School",
    logo: "/universities/rushford.png",
  },
  {
    name: "SSBM",
    logo: "/universities/ssbm.png",
  },
  {
    name: "ESGCI",
    logo: "/universities/esgci.png",
  },
  {
    name: "Golden Gate University",
    logo: "/universities/ggu.png",
  },
  {
    name: "Edgewood University",
    logo: "/universities/edgewood.png",
  },
];

export default function DBATopPlacementPartners() {
  // Duplicate logos for seamless infinite loop
  const loopPartners = [
    ...placementPartners,
    ...placementPartners,
  ];

  return (
    <section
      id="placements"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        !m-0
        !p-0
      "
    >
      {/* =====================================================
          MARQUEE ANIMATION
      ====================================================== */}

      <style>{`
        .dba-placement-track {
          animation: dba-placement-scroll 24s linear infinite;
          will-change: transform;
        }

        .dba-placement-track:hover {
          animation-play-state: paused;
        }

        @keyframes dba-placement-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .dba-placement-track {
            animation-duration: 28s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dba-placement-track {
            animation: none;
          }
        }
      `}</style>

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-8
          font-[Inter]
          sm:px-6
          sm:py-10
          lg:px-16
          lg:py-11
        "
      >
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-6 text-center sm:mb-7">
         

          <h2
            className="
              m-0
              text-[24px]
              font-extrabold
              leading-tight
              tracking-[-0.5px]
              text-slate-800
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            Top{" "}
            <span className="text-red-500">
              Placement Partners
            </span>
          </h2>

        </div>

        {/* =====================================================
            LOGO BOX
        ====================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-100
            bg-slate-50/70
            py-5
            shadow-[0_8px_28px_rgba(15,23,42,0.05)]
            sm:py-6
          "
        >
          {/* LEFT FADE */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-20
              h-full
              w-12
              bg-gradient-to-r
              from-slate-50
              via-slate-50/90
              to-transparent
              sm:w-20
              lg:w-28
            "
          />

          {/* RIGHT FADE */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-20
              h-full
              w-12
              bg-gradient-to-l
              from-slate-50
              via-slate-50/90
              to-transparent
              sm:w-20
              lg:w-28
            "
          />

          {/* =================================================
              MOVING TRACK
          ================================================== */}

          <div className="flex w-full overflow-hidden">
            <div
              className="
                dba-placement-track
                flex
                w-max
                shrink-0
                items-center
              "
            >
              {/* FIRST SET */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                  pr-3
                  sm:gap-4
                  sm:pr-4
                "
              >
                {placementPartners.map((partner, index) => (
                  <PartnerCard
                    key={`one-${partner.name}-${index}`}
                    partner={partner}
                  />
                ))}
              </div>

              {/* DUPLICATE SET */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                  pr-3
                  sm:gap-4
                  sm:pr-4
                "
                aria-hidden="true"
              >
                {placementPartners.map((partner, index) => (
                  <PartnerCard
                    key={`two-${partner.name}-${index}`}
                    partner={partner}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SMALL INDICATOR */}

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   PARTNER CARD
============================================================ */

function PartnerCard({
  partner,
}: {
  partner: {
    name: string;
    logo: string;
  };
}) {
  return (
    <div
      className="
        group
        relative
        flex
        h-[78px]
        w-[145px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        shadow-[0_4px_0_rgba(226,232,240,0.8),0_8px_18px_rgba(15,23,42,0.07)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-red-100
        hover:shadow-[0_6px_0_rgba(254,226,226,0.9),0_14px_25px_rgba(15,23,42,0.11)]
        sm:h-[88px]
        sm:w-[170px]
      "
    >
      {/* TOP HIGHLIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          left-3
          right-3
          top-1
          h-px
          bg-white
        "
      />

      {/* SMALL RED ACCENT */}

      <div
        className="
          absolute
          right-0
          top-0
          h-5
          w-5
          rounded-bl-xl
          bg-red-50
          transition-colors
          duration-300
          group-hover:bg-red-100
        "
      />

      <Image
        src={partner.logo}
        alt={partner.name}
        width={200}
        height={100}
        className="
          relative
          z-10
          max-h-[48px]
          max-w-[125px]
          object-contain
          opacity-90
          transition-all
          duration-300
          group-hover:scale-[1.05]
          group-hover:opacity-100
          sm:max-h-[55px]
          sm:max-w-[145px]
        "
      />
    </div>
  );
}