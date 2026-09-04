"use client";

import {
  TrendingUp,
  Users,
  Building2,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "4.2X",
    label: "Average salary hike",
    description:
      "Reported by learners within 12 months of completing a career-track program.",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Learners trained",
    description:
      "Across working professionals, career switchers, and fresh graduates.",
  },
  {
    icon: Building2,
    value: "300+",
    label: "Hiring partners",
    description:
      "Companies that actively recruit from our learner and alumni pool.",
  },
  {
    icon: Globe2,
    value: "70+",
    label: "Countries reached",
    description:
      "Learners join live cohorts from every time zone, not just one region.",
  },
];

export function CareerOutcomes() {
  return (
    <section className="w-full bg-white !m-0 !p-0">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-7
          text-center
          font-[Inter]
          sm:px-6
          sm:py-9
          lg:px-16
          lg:py-10
        "
      >
        {/* HEADING */}
        <div className="mx-auto max-w-[700px]">
          <p className="m-0 text-[9px] font-extrabold uppercase tracking-[1.2px] text-red-500">
            Career Outcomes
          </p>

          <h2
            className="
              m-0
              mt-2
              text-[27px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.6px]
              text-slate-900
              sm:text-[31px]
              lg:text-[34px]
            "
          >
            Outcomes that{" "}
            <span className="text-red-500">speak for themselves</span>
          </h2>
        </div>

        {/* STATS */}
        <div className="mx-auto mt-8 max-w-6xl border-y border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    px-4
                    py-6
                    sm:px-5
                    sm:py-7
                    lg:px-6
                    lg:py-8
                    ${
                      index !== 0
                        ? "border-t border-slate-200 sm:border-t lg:border-l lg:border-t-0"
                        : ""
                    }
                  `}
                >
                  {/* ICON + VALUE */}
                  <div className="flex items-center justify-center gap-3">
                    <Icon
                      className="h-5 w-5 text-red-500"
                      strokeWidth={2}
                    />

                    <span
                      className="
                        text-[28px]
                        font-black
                        leading-none
                        tracking-[-1px]
                        text-slate-900
                        sm:text-[30px]
                      "
                    >
                      {stat.value}
                    </span>
                  </div>

                  {/* LABEL */}
                  <h3
                    className="
                      m-0
                      mt-4
                      text-center
                      text-[12px]
                      font-extrabold
                      leading-5
                      text-slate-800
                      sm:text-[13px]
                    "
                  >
                    {stat.label}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      m-0
                      mt-1.5
                      max-w-[235px]
                      text-center
                      text-[10px]
                      leading-5
                      text-slate-500
                      sm:text-[11px]
                    "
                  >
                    {stat.description}
                  </p>

                  {/* RED ACCENT */}
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-8
                      -translate-x-1/2
                      bg-red-500
                    "
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* REPORT LINK */}
        <a
          href="#"
          className="
            mt-4
            inline-flex
            items-center
            justify-center
            gap-1.5
            text-center
            text-[10px]
            font-extrabold
            text-red-500
            transition-colors
            hover:text-red-600
            sm:text-[11px]
          "
        >
          See the full outcomes report
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

export default CareerOutcomes;