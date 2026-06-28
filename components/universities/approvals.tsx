import React from "react";
import {
  Award,
  BadgeCheck,
  Crown,
  Landmark,
  Sparkles,
  Trophy,
} from "lucide-react";

interface RecognitionItem {
  id: string;
  label: string;
  description: string;
  ribbon?: string;
  icon: React.ElementType;
}

const recognitionData: RecognitionItem[] = [
  {
    id: "naac",
    label: "NAAC A+",
    description: "Rajasthan's 1st NAAC A+ Accredited University",
    icon: Award,
  },
  {
    id: "qs",
    label: "QS Ranking",
    description: "Amongst South Asia's Top Universities (2026)",
    ribbon: "Rank 195",
    icon: Trophy,
  },
  {
    id: "ugc",
    label: "UGC Entitled",
    description: "Online Degrees Equivalent to Campus Degree",
    icon: Landmark,
  },
  {
    id: "aicte",
    label: "AICTE",
    description: "AICTE Norms Compliant",
    icon: BadgeCheck,
  },
  {
    id: "impact",
    label: "Impact Ranking",
    description: "Amongst World's Top 400 Universities (2025)",
    ribbon: "Ranked 301-400",
    icon: Crown,
  },
  {
    id: "week",
    label: "The Week",
    description: "Amongst Private & Deemed Multidisciplinary Universities",
    ribbon: "Rank 15",
    icon: Sparkles,
  },
];

export default function ApprovalsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Recognition & <span className="text-red-500">Approvals</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Explore key accreditations, rankings, and academic recognitions for
            online degree programs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {recognitionData.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="relative flex min-h-[300px] flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-5 pb-6 pt-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-white hover:shadow-[0_14px_36px_rgba(239,68,68,0.12)]"
              >
                {item.ribbon && (
                  <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2">
                    <div className="relative bg-red-600 px-6 py-1.5 text-xs font-black text-white shadow-sm sm:text-sm">
                      {item.ribbon}
                      <span className="absolute left-[-13px] top-0 h-0 w-0 border-b-[16px] border-r-[13px] border-t-[16px] border-b-transparent border-r-red-600 border-t-transparent" />
                      <span className="absolute right-[-13px] top-0 h-0 w-0 border-b-[16px] border-l-[13px] border-t-[16px] border-b-transparent border-l-red-600 border-t-transparent" />
                    </div>
                  </div>
                )}

                <div className="mt-3 flex h-32 w-full items-center justify-center rounded-2xl bg-white shadow-sm">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <Icon className="h-10 w-10" />
                  </div>
                </div>

                <h3 className="mt-6 text-base font-black text-gray-900">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
