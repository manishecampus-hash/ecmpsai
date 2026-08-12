import { ApplicationForm } from "@/components/discovery/degree-finder/application-form";
import { ArrowRight } from "lucide-react";

type CareerHeroProps = {
  hero: {
    badge: string;
    heading: string;
    description: string;
    image?: string;
    salary: string;
    duration: string;
  };
};

export function CareerHero({ hero }: CareerHeroProps) {
  return (
    <section className="relative overflow-hidden ">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-10 sm:py-14 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            {/* Small Heading */}
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide text-red-600 mb-3">
              {hero.badge}
            </p>

            {/* Main Heading */}
            <h1 className="font-sans text-3xl sm:text-3xl lg:text-3xl font-black tracking-tight text-slate-900 leading-[1.1]">
              {hero.heading} <span className="text-red-600">Developer</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-700 font-normal">
              {hero.description}
            </p>

            {/* Bullet Points */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-base sm:text-lg leading-7 text-slate-800 font-normal">
                  Learn modern full-stack development, cloud technologies, and
                  scalable software architecture used by leading technology
                  companies.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-base sm:text-lg leading-7 text-slate-800 font-normal">
                  Strengthen employability through hands-on projects, industry
                  workflows, and practical software engineering best practices.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-6 w-6 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-base sm:text-lg leading-7 text-slate-800 font-normal">
                  Build problem-solving skills with real-world frontend,
                  backend, database, API, and deployment-focused development
                  projects.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/25">
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-red-100 via-white to-blue-100 blur-2xl" />

              {/* Form Card */}
              <div className="relative overflow-hidden rounded-[2.25rem] border border-gray-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-5">
                <ApplicationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
