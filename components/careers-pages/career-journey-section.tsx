import { UserPlus, BookOpenCheck, Hammer, Briefcase } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Enroll & Get Assessed",
    description:
      "Pick your program and take a quick skill check so your learning path starts at the right level.",
  },
  {
    icon: BookOpenCheck,
    title: "Learn From Experts, Live",
    description:
      "Attend live sessions with industry mentors and go through a curriculum built for real job roles.",
  },
  {
    icon: Hammer,
    title: "Build Real Projects",
    description:
      "Apply what you learn in labs, case studies, and a capstone project you can show employers.",
  },
  {
    icon: Briefcase,
    title: "Get Interview-Ready & Hired",
    description:
      "Work with career coaches on mock interviews, resumes, and job boards until you land the role.",
  },
];

export function CareerJourneySection() {
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            From enrolling to getting hired
          </h2>

          <p className="mt-3 text-base leading-6 text-gray-600">
            Every eCampus learner moves through the same four milestones —
            here&apos;s exactly what that path looks like.
          </p>
        </div>

        {/* Journey */}
        <div className="relative">
          {/* Connecting Rail - Desktop */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gray-200 md:block">
            <div className="h-full w-full bg-gradient-to-r from-red-600 via-red-500 to-red-200" />
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.title} className="relative flex gap-4 md:block">
                  {/* Connecting Rail - Mobile */}
                  {!isLast && (
                    <div className="absolute bottom-[-1.75rem] left-8 top-16 w-0.5 bg-gray-200 md:hidden" />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-md ${
                        isLast
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-600 ring-1 ring-red-200"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-5">
                    <span className="text-xs font-bold text-red-600">
                      STEP {index + 1}
                    </span>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
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
