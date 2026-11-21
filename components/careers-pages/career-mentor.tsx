"use client";

import { useState } from "react";
import { Wallet, TrendingUp, Briefcase, Code2, Cloud, type LucideIcon } from "lucide-react";
import { softwareDeveloper } from "@/data/careers-pages-data/software-developer";

const softwareRoles = [
  "Software Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Cloud Engineer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Cybersecurity Engineer",
];

const infraRoles = [
  "Cloud Engineer",
  "Cloud Solutions Architect",
  "DevOps Engineer",
  "Cloud Native Developer",
  "Cloud Consultant",
  "IT Infrastructure Manager",
];

const ROLE_GROUPS: { id: string; title: string; icon: LucideIcon; roles: string[] }[] = [
  { id: "eng", title: "Engineering & AI", icon: Code2, roles: softwareRoles },
  { id: "cloud", title: "Cloud & Infrastructure", icon: Cloud, roles: infraRoles },
];

// Usual job title at each experience band (same order as the salary ranges in the data file)
const STAGE_TITLES = ["Junior Developer", "Software Engineer", "Senior Engineer", "Lead / Architect"];

// Bars step up in tone as pay grows — soft tints, not a solid block of red
const BAR_TONES = [
  "from-rose-100 to-rose-300",
  "from-red-100 to-red-300",
  "from-red-200 to-red-400",
  "from-red-400 to-red-600",
];

// "₹18-35 LPA" → 35, used to scale the bars against the top bracket
function upperLakh(range: string) {
  const nums = range.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [0];
  return Math.max(...nums);
}

export function CareerMentor() {
  const { average, ranges } = softwareDeveloper.salary;
  const top = Math.max(...ranges.map((r) => upperLakh(r.salary)));
  const topRange = ranges[ranges.length - 1];
  const totalRoles = ROLE_GROUPS.reduce((n, g) => n + g.roles.length, 0);
  const [activeGroup, setActiveGroup] = useState(ROLE_GROUPS[0].id);
  const group = ROLE_GROUPS.find((g) => g.id === activeGroup) ?? ROLE_GROUPS[0];

  const stats = [
    { icon: Wallet, label: "Average salary", value: average, note: "Across experience levels" },
    {
      icon: TrendingUp,
      label: "Top bracket",
      value: topRange.salary,
      note: `With ${topRange.experience.toLowerCase()} of experience`,
    },
    { icon: Briefcase, label: "Career roles", value: `${totalRoles}`, note: `Across ${ROLE_GROUPS.length} career tracks` },
  ];

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-10 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Career Outcomes
          </span>
          <h2 className="mt-4 whitespace-nowrap text-[clamp(12px,4.2vw,24px)] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Career growth &amp; earning potential
          </h2>
          <p className="mt-3 text-base leading-6 text-gray-500">
            The roles our graduates step into once they&apos;ve done the work.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value, note }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-100 hover:shadow-md sm:p-4"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="text-xl font-extrabold tracking-tight text-slate-900">{value}</p>
                <p className="truncate text-xs text-slate-400">{note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl gap-4 lg:grid-cols-2">
          {/* Salary chart */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
            <div>
              <p className="text-sm font-bold text-slate-900 sm:text-base">Salary progression</p>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Typical annual pay in India by experience</p>
            </div>

            <div className="relative mt-5 flex min-h-[11rem] flex-1">
              {/* guide lines */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-7 flex flex-col justify-between">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="block border-t border-dashed border-slate-200" />
                ))}
              </div>

              <div className="relative grid flex-1 grid-cols-4 items-stretch gap-2 sm:gap-4">
                {ranges.map((r, i) => {
                  const height = Math.max(12, Math.round((upperLakh(r.salary) / top) * 100));
                  const isTop = i === ranges.length - 1;
                  return (
                    <div key={r.experience} className="flex h-full flex-col items-center justify-end">
                      <span
                        className={`mb-2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums sm:text-sm ${
                          isTop ? "bg-slate-900 text-white" : "text-slate-800"
                        }`}
                      >
                        {r.salary.replace(" LPA", "")}
                        <span className={`ml-0.5 font-medium ${isTop ? "text-slate-300" : "text-slate-400"}`}>L</span>
                      </span>
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className={`w-full rounded-t-lg bg-gradient-to-t ${BAR_TONES[i] ?? "from-red-200 to-red-400"} shadow-sm`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 border-t border-slate-200 pt-3 sm:gap-4">
              {ranges.map((r, i) => (
                <div key={r.experience} className="text-center">
                  <p className="text-[10px] font-semibold text-slate-800 sm:text-xs">{r.experience}</p>
                  <p className="mt-0.5 text-[10px] leading-4 text-slate-400">{STAGE_TITLES[i]}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] leading-4 text-slate-400 sm:text-xs">
              Indicative ranges in ₹ lakh per annum. Actual pay depends on city, company and skills.
            </p>
          </div>

          {/* Career roles with track tabs */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
            <p className="text-sm font-bold text-slate-900 sm:text-base">Career roles</p>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Explore roles by career track</p>

            <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1" role="tablist">
              {ROLE_GROUPS.map((g) => {
                const active = g.id === group.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGroup(g.id)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <g.icon className={`h-4 w-4 ${active ? "text-red-600" : ""}`} strokeWidth={1.8} />
                    {g.title}
                  </button>
                );
              })}
            </div>

            <ul className="mt-3 flex-1 space-y-0.5" role="tabpanel">
              {group.roles.map((role) => (
                <li
                  key={role}
                  className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-xs leading-4 text-slate-700 transition-colors hover:bg-red-50/70 sm:text-sm"
                >
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500">
                    <group.icon className="h-2.5 w-2.5" strokeWidth={2} />
                  </span>
                  <span className="leading-5">{role}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
              {group.roles.length} roles in {group.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
