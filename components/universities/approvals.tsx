import React from "react";
import {
  Award,
  BadgeCheck,
  Crown,
  Landmark,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

interface RecognitionItem {
  id: string;
  label: string;
  description: string;
  ribbon?: string;
  icon: React.ElementType | string; // component for lucide icons, string (path) for images
}

const recognitionData: RecognitionItem[] = [
  {
    id: "naac",
    label: "NAAC A+",
    description: "Rajasthan's 1st NAAC A+ Accredited University",
    icon: "/approvals/NIRF-2.jpg.webp",
  },
  {
    id: "qs",
    label: "AIU",
    description: "Amongst South Asia's Top Universities (2026)",
    ribbon: "Rank 195",
    icon: "/approvals/NAAC-A-3.jpg.webp",
  },
  {
    id: "ugc",
    label: "WES",
    description: "Online Degrees Equivalent to Campus Degree",
    icon: Landmark,
  },
  {
    id: "aicte",
    label: "ACU",
    description: "AICTE Norms Compliant",
    icon: BadgeCheck,
  },
  {
    id: "impact",
    label: "BCI",
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
    <section
      id="approvals"
      className="bg-white px-4 -mt-6 pt-0 pb-14 sm:px-6 sm:-mt-4 lg:px-8 lg:-mt-2 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
            Accreditation
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Recognition & <span className="text-red-500">Approval</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {recognitionData.map((item) => {
            const isImage = typeof item.icon === "string";
            const Icon = !isImage ? (item.icon as React.ElementType) : null;

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
                  {isImage ? (
                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white">
                      <img
                        src={item.icon as string}
                        alt={item.label}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                      {Icon && <Icon className="h-10 w-10" />}
                    </div>
                  )}
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
