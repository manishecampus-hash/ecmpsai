import { GraduationCap, Laptop, Briefcase, Award } from "lucide-react";

const learnPoints = [
  {
    icon: GraduationCap,
    title: "Industry Mentors",
    description:
      "Learn directly from professionals working in top tech companies.",
  },
  {
    icon: Laptop,
    title: "Hands-on Projects",
    description:
      "Build real-world projects and strengthen your practical skills.",
  },
  {
    icon: Briefcase,
    title: "Career-Focused Learning",
    description:
      "Get job-ready with interview preparation, resume guidance, and portfolio building.",
  },
  {
    icon: Award,
    title: "Certification Support",
    description:
      "Earn recognized certifications to boost your career opportunities.",
  },
];

export function LearnFromSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 border border-red-100">
            Learn From Experts
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Learn From Industry Experts &amp; Real Projects
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-8">
            Gain practical knowledge, build real-world projects, and learn the
            exact skills that employers expect from modern professionals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {learnPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {point.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
