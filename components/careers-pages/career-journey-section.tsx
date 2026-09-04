"use client";

import {
  UserPlus,
  BookOpenCheck,
  Hammer,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Enroll & Get Assessed",
    description:
      "Pick your program and take a quick skill check so your learning path starts at the right level.",
  },
  {
    icon: BookOpenCheck,
    number: "02",
    title: "Learn From Experts, Live",
    description:
      "Attend live sessions with industry mentors and go through a curriculum built for real job roles.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Build Real Projects",
    description:
      "Apply what you learn in labs, case studies, and a capstone project you can show employers.",
  },
  {
    icon: Briefcase,
    number: "04",
    title: "Get Interview-Ready & Hired",
    description:
      "Work with career coaches on mock interviews, resumes, and job boards until you land the role.",
  },
];

export function CareerJourneySection() {
  return (
    <section className="relative w-full overflow-hidden bg-white !m-0 !p-0">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-7
          font-[Inter]
          sm:px-6
          sm:py-9
          lg:px-16
          lg:py-10
        "
      >
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <div
            className="
              mb-2
              inline-flex
              items-center
              rounded-full
              border
              border-red-100
              bg-red-50
              px-3
              py-1
              text-[9px]
              font-extrabold
              uppercase
              tracking-[1px]
              text-red-500
            "
          >
            Career Journey
          </div>

          <h2
            className="
              m-0
              text-[25px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.6px]
              text-slate-900
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            From enrolling to{" "}
            <span className="text-red-500">getting hired</span>
          </h2>

          <p
            className="
              m-0
              mx-auto
              mt-2.5
              max-w-[600px]
              text-[11px]
              leading-5
              text-slate-500
              sm:text-[12px]
              sm:leading-6
            "
          >
            Every eCampus learner moves through the same four milestones —
            here&apos;s exactly what that path looks like.
          </p>
        </div>

        {/* Journey */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="
              absolute
              left-[12.5%]
              right-[12.5%]
              top-[43px]
              hidden
              h-px
              bg-gradient-to-r
              from-red-200
              via-red-500
              to-red-200
              lg:block
            "
          />

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-5
            "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* Mobile Connecting Line */}
                  {!isLast && (
                    <div
                      className="
                        absolute
                        left-[30px]
                        top-[68px]
                        bottom-[-20px]
                        w-px
                        bg-gradient-to-b
                        from-red-300
                        to-slate-200
                        sm:hidden
                      "
                    />
                  )}

                  {/* Card */}
                  <div
                    className="
                      relative
                      h-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      shadow-[0_4px_15px_rgba(15,23,42,0.05)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-red-200
                      hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]
                      lg:p-5
                    "
                  >
                    {/* Top Number */}
                    <div className="flex items-start justify-between">
                      <div
                        className="
                          relative
                          z-10
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-white
                          bg-red-50
                          text-red-500
                          shadow-[0_4px_12px_rgba(239,68,68,0.12)]
                          ring-1
                          ring-red-100
                          transition-all
                          duration-300
                          group-hover:bg-red-500
                          group-hover:text-white
                          group-hover:ring-red-500
                        "
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={2.2}
                        />
                      </div>

                      <span
                        className="
                          text-[26px]
                          font-black
                          leading-none
                          tracking-[-1px]
                          text-slate-100
                          transition-colors
                          duration-300
                          group-hover:text-red-50
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <span
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[1px]
                          text-red-500
                        "
                      >
                        Step {index + 1}
                      </span>

                      <h3
                        className="
                          m-0
                          mt-1
                          min-h-[43px]
                          text-[15px]
                          font-extrabold
                          leading-[1.35]
                          text-slate-900
                          transition-colors
                          duration-300
                          group-hover:text-red-500
                          sm:text-[16px]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          m-0
                          mt-2.5
                          text-[10px]
                          leading-5
                          text-slate-500
                          sm:text-[11px]
                        "
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Arrow */}
                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-bold
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:text-red-500
                      "
                    >
                      <span>Next Step</span>

                      <ArrowRight
                        className="
                          h-3
                          w-3
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>

                    {/* Bottom Accent */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-1/2
                        h-[3px]
                        w-0
                        -translate-x-1/2
                        rounded-full
                        bg-red-500
                        transition-all
                        duration-300
                        group-hover:w-1/2
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerJourneySection;