import React from "react";
import {
  BriefcaseBusiness,
  Calculator,
  Landmark,
  FileCheck2,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const careerRoles = [
  {
    title: "Account Executive",
    icon: Calculator,
  },
  {
    title: "Finance Associate",
    icon: BarChart3,
  },
  {
    title: "Tax Assistant",
    icon: FileCheck2,
  },
  {
    title: "Banking Executive",
    icon: Landmark,
  },
  {
    title: "Audit Assistant",
    icon: ShieldCheck,
  },
  {
    title: "Business Analyst",
    icon: BriefcaseBusiness,
  },
];

export default function BComCareers() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Center Header */}
        <div className="mx-auto mb-10 max-w-3xl border-b border-slate-100 pb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <BriefcaseBusiness className="h-3.5 w-3.5 text-red-500" />
            Career Pathways
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            After Online <span className="text-red-500">B.Com</span>
          </h2>
        </div>

        {/* Image and Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Image */}
          <div className="relative mx-auto flex h-full min-h-[420px] w-full max-w-md items-center justify-center lg:min-h-[520px]">
            <div className="absolute bottom-8 right-4 h-24 w-48 rounded-full bg-red-500/20 blur-3xl" />

            <img
              src="/bcom-universities/mycareer.png"
              alt="B.Com career opportunities"
              className="relative z-10 h-full max-h-[520px] w-full object-contain"
            />
          </div>

          {/* Right Content */}
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              An Online B.Com degree opens career opportunities across
              accounting, taxation, banking, finance, auditing, and business
              operations. Students can build practical commerce skills and apply
              for entry-level roles in corporates, banks, startups, and
              financial service companies.
            </p>

            {/* Career Role Cards */}
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
              {careerRoles.map((role) => {
                const Icon = role.icon;

                return (
                  <div
                    key={role.title}
                    className="group flex min-h-[76px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-bold text-slate-900 sm:text-base">
                      {role.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Extra Career Notes */}
            <div className="mt-7 max-w-2xl space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  Suitable for students interested in finance, accounts,
                  banking, tax, and corporate job roles.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  Helps build a foundation for higher studies like M.Com, MBA,
                  CA, CMA, CS, and finance certifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
