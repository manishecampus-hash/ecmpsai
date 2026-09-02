"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

const impactStats = [
  {
    icon: TrendingUp,
    value: "2.5x",
    title: "Leadership Growth",
    text: "Strengthen your ability to move into strategic and senior leadership roles.",
  },
  {
    icon: Users,
    value: "40+",
    title: "Career Opportunities",
    text: "Build access to wider opportunities across management and consulting.",
  },
  {
    icon: Target,
    value: "96%",
    title: "Professional Value",
    text: "Turn advanced business knowledge into measurable career impact.",
  },
];

export default function DBAImpact() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-red-50/40
        !m-0
        !p-0
      "
    >
      {/* Decorative shapes */}

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          top-16
          h-40
          w-40
          rounded-full
          bg-red-100/50
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          bottom-10
          h-44
          w-44
          rounded-full
          bg-red-100/40
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
          py-9
          font-[Inter]
          sm:px-6
          sm:py-11
          lg:px-16
          lg:py-13
        "
      >

        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-7 text-center sm:mb-9">


          <h2
            className="
              m-0
              text-[25px]
              font-extrabold
              leading-tight
              tracking-[-0.6px]
              text-slate-800
              sm:text-[30px]
              lg:text-[34px]
            "
          >
            Make Your Experience{" "}
            <span className="text-red-500">
              More Powerful
            </span>
          </h2>

        </div>


        {/* =====================================================
            IMPACT CARD
        ====================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-red-100
            bg-white
            shadow-[0_10px_35px_rgba(15,23,42,0.07)]
          "
        >

          {/* Top accent */}

          <div
            className="
              absolute
              left-1/2
              top-0
              h-1
              w-20
              -translate-x-1/2
              rounded-b-full
              bg-red-500
            "
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
            "
          >

            {impactStats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`
                    group
                    relative
                    flex
                    min-h-[185px]
                    flex-col
                    items-center
                    justify-center
                    px-6
                    py-7
                    text-center
                    transition-all
                    duration-300
                    hover:bg-red-50/50
                    sm:min-h-[195px]
                    sm:px-8
                    ${
                      index !== impactStats.length - 1
                        ? "border-b border-slate-100 md:border-b-0 md:border-r"
                        : ""
                    }
                  `}
                >

                  {/* Icon */}

                  <div
                    className="
                      mb-3
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      text-red-500
                      transition-all
                      duration-300
                      group-hover:bg-red-500
                      group-hover:text-white
                    "
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={2.2}
                    />
                  </div>


                  {/* Number */}

                  <div
                    className="
                      text-[38px]
                      font-black
                      leading-none
                      tracking-[-1px]
                      text-slate-800
                      transition-colors
                      duration-300
                      group-hover:text-red-500
                      sm:text-[40px]
                    "
                  >
                    {stat.value}
                  </div>


                  {/* Title */}

                  <h3
                    className="
                      m-0
                      mt-2.5
                      text-[12px]
                      font-extrabold
                      text-slate-800
                      sm:text-[13px]
                    "
                  >
                    {stat.title}
                  </h3>


                  {/* Description */}

                  <p
                    className="
                      m-0
                      mt-1.5
                      max-w-[285px]
                      text-[10px]
                      leading-5
                      text-slate-500
                      sm:text-[11px]
                      sm:leading-5
                    "
                  >
                    {stat.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>


        {/* =====================================================
            BOTTOM MESSAGE
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-5
            flex
            max-w-[850px]
            flex-col
            items-center
            justify-center
            gap-2
            text-center
            sm:flex-row
            sm:gap-3
          "
        >

          <span
            className="
              rounded-full
              bg-red-500
              px-2.5
              py-1
              text-[8px]
              font-bold
              uppercase
              tracking-wide
              text-white
            "
          >
            DBA Advantage
          </span>

          <p
            className="
              m-0
              text-[10px]
              font-semibold
              text-slate-600
              sm:text-[11px]
            "
          >
            Learn strategically. Lead confidently. Create lasting impact.
          </p>

        </div>

      </div>
    </section>
  );
}