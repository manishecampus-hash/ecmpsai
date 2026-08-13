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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr] items-start">
          {/* Left: context copy */}
          <div>
            <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest text-red-600 border border-red-100">
              THE NUMBERS
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Outcomes that speak for themselves
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-7">
              We measure success the same way you will — by whether learners
              actually move forward in their careers. Here&apos;s what that has
              looked like so far.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
            >
              See the full outcomes report
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right: stat cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 hover:border-red-200 hover:bg-red-50/40 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                  <span className="mt-1 block text-sm font-semibold text-slate-700">
                    {stat.label}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
