import React from "react";
import {
  Award,
  BookOpenCheck,
  CalendarDays,
  Download,
  Globe2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

const stats = [
  { label: "Duration", value: "36 Months", icon: CalendarDays },
  { label: "Learning Mode", value: "100% Online", icon: BookOpenCheck },
  { label: "Program Level", value: "Doctoral", icon: GraduationCap },
  { label: "Community", value: "80+ Countries", icon: Globe2 },
];

const points = [
  "Built for working professionals and senior managers",
  "Research-focused doctoral learning with practical business application",
  "Specializations across strategy, finance, marketing, HR and leadership",
];

export default function DBAHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wide text-red-600">
                  Doctorate Program
                </p>
                <h1 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900  sm:text-3xl md:text-4xl ">
                  Doctor of Business Administration from Golden Gate{" "}
                  <span className="text-red-500">University</span>
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  A flexible online DBA designed for professionals who want to
                  strengthen research capability, strategic thinking and
                  executive leadership. Gain advanced business insights, develop
                  data-driven decision-making skills, and learn to lead
                  innovation and organizational transformation in a rapidly
                  evolving global business environment.
                  <br />
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex h-11 w-fit items-center justify-center self-start rounded-[13px] bg-[#f83d46] px-5 text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99]">
                Apply Now
              </button>

              <button className="inline-flex h-11 w-[170px] items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#dfe5ee] bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]">
                <Download className="h-4 w-4" />
                Explore Courses
              </button>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-red-50 text-red-600">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-black text-slate-950">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative h-[198px] bg-slate-100 sm:h-[218px] lg:h-[235px]">
              <img
                src="/ggubanner/newbnr.png"
                alt="Golden Gate University DBA program"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-3 left-4 right-4">
                <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Online Doctorate
                </p>
                <h2 className="mt-0.5 text-xl font-black leading-tight text-white">
                  Learn from anywhere. Lead everywhere.
                </h2>
              </div>
            </div>

            <div className="p-4">
              <div className="border-b border-slate-200 pb-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Recognition
                </p>
                <h2 className="mt-1 text-lg font-black text-slate-950">
                  Globally respected credentials
                </h2>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex h-16 items-center justify-center rounded-md border border-slate-200 bg-slate-50 p-2">
                  <img
                    src="/ggubanner/3rd.webp"
                    alt="AACSB Accredited"
                    className="max-h-12 w-auto object-contain"
                  />
                </div>

                <div className="flex h-16 items-center justify-center rounded-md border border-slate-200 bg-slate-50 p-2">
                  <img
                    src="/ggubanner/wes-logo.jpg"
                    alt="WES Recognized"
                    className="max-h-12 w-auto object-contain"
                  />
                </div>

                <div className="flex h-16 items-center justify-center rounded-md border border-slate-200 bg-slate-50 p-2">
                  <img
                    src="/ggubanner/75.png"
                    alt="75+ Years of Legacy"
                    className="max-h-14 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
