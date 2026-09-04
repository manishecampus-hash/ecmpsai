"use client";

import React from "react";

const globalPartners = [
  {
    name: "Rushford Business School",
    logo: "/universities/rushford.png",
  },
  {
    name: "Swiss School of Business Management",
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

export default function DBAGlobalPartners() {
  return (
    <section className="relative w-full overflow-hidden bg-white !m-0 !p-0">
      {/* =====================================================
          CSS FOR INFINITE LOOP
      ====================================================== */}

      <style>{`
        .dba-logo-track {
          animation: dba-logo-scroll 22s linear infinite;
        }

        .dba-logo-track:hover {
          animation-play-state: paused;
        }

        @keyframes dba-logo-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .dba-logo-track {
            animation-duration: 18s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dba-logo-track {
            animation: none;
          }
        }
      `}</style>

      {/* =====================================================
          MAIN CONTAINER
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
              text-[23px]
              font-extrabold
              leading-tight
              tracking-[-0.5px]
              text-slate-800
              sm:text-[28px]
              lg:text-[31px]
            "
          >
            Our Top{" "}
            <span className="text-red-500">
              Global University Partners
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-[600px]
              text-[10px]
              leading-5
              text-slate-500
              sm:text-[12px]
              sm:leading-6
            "
          >
            Connect with globally recognized institutions and
            explore career-focused doctoral learning opportunities.
          </p>
        </div>

        {/* =====================================================
            LOGO CONTAINER
        ====================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-100
            bg-slate-50/60
            py-5
            shadow-[0_8px_30px_rgba(15,23,42,0.05)]
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
              w-10
              bg-gradient-to-r
              from-slate-50
              to-transparent
              sm:w-16
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
              w-10
              bg-gradient-to-l
              from-slate-50
              to-transparent
              sm:w-16
            "
          />

          {/* =================================================
              MOVING TRACK
          ================================================== */}

          <div className="flex w-full overflow-hidden">
            <div className="dba-logo-track flex w-max shrink-0 items-center">
              {/* =================================================
                  FIRST SET
              ================================================== */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-4
                  pr-4
                  sm:gap-6
                  sm:pr-6
                "
              >
                {globalPartners.map((partner) => (
                  <div
                    key={`first-${partner.name}`}
                    className="
                      group
                      flex
                      h-[78px]
                      w-[165px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-100
                      bg-white
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-red-100
                      hover:shadow-[0_7px_20px_rgba(15,23,42,0.07)]
                      sm:h-[88px]
                      sm:w-[190px]
                      sm:px-5
                    "
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="
                        max-h-[50px]
                        max-w-[145px]
                        object-contain
                        opacity-85
                        transition-all
                        duration-300
                        group-hover:scale-[1.04]
                        group-hover:opacity-100
                        sm:max-h-[58px]
                        sm:max-w-[165px]
                      "
                    />
                  </div>
                ))}
              </div>

              {/* =================================================
                  DUPLICATE SET
                  Required for seamless infinite loop
              ================================================== */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-4
                  pr-4
                  sm:gap-6
                  sm:pr-6
                "
                aria-hidden="true"
              >
                {globalPartners.map((partner) => (
                  <div
                    key={`second-${partner.name}`}
                    className="
                      group
                      flex
                      h-[78px]
                      w-[165px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-100
                      bg-white
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-red-100
                      hover:shadow-[0_7px_20px_rgba(15,23,42,0.07)]
                      sm:h-[88px]
                      sm:w-[190px]
                      sm:px-5
                    "
                  >
                    <img
                      src={partner.logo}
                      alt=""
                      className="
                        max-h-[50px]
                        max-w-[145px]
                        object-contain
                        opacity-85
                        transition-all
                        duration-300
                        group-hover:scale-[1.04]
                        group-hover:opacity-100
                        sm:max-h-[58px]
                        sm:max-w-[165px]
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            TRUST LABEL
        ====================================================== */}

        <div className="mt-4 flex justify-center">
          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              text-slate-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

            Trusted Global Academic Network
          </div>
        </div>
      </div>
    </section>
  );
}