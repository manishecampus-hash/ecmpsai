"use client";

import { Users } from "lucide-react";
import { useState } from "react";

interface EnvironmentSection {
  university?: {
    name?: string;
  };
}

const JOB_PROFILES = [
  "General Management",
  "Strategy",
  "Operations",
  "Project Management",
  "Consulting",
  "Finance",
  "Sales",
  "Human Resources",
];

const INDUSTRIES = [
  "Information Technology",
  "Banking",
  "Consulting",
  "Human Resources",
  "Manufacturing",
  "Finance & Accounting",
  "Government / PSU",
  "Operations Management",
  "Sales & Marketing",
  "Legal & Compliance",
];

interface ExperienceSegment {
  label: string;
  percent: number;
  color: string;
}

const EXPERIENCE_SEGMENTS: ExperienceSegment[] = [
  { label: "3-5 Years", percent: 17, color: "#dc2626" },
  { label: "5-10 Years", percent: 42, color: "#7c2d12" },
  { label: "10-15 Years", percent: 27, color: "#f59e0b" },
  { label: "15+ Years", percent: 14, color: "#1e293b" },
];

const RADIUS = 70;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LearningEnvironmentSection({
  university,
}: EnvironmentSection) {
  const [hovered, setHovered] = useState<number | null>(null);

  let cumulativePercent = 0;

  return (
    <section
      id="learning-environment"
      className="bg-white px-4 -mt-6 pt-0 pb-14 sm:px-6 sm:-mt-4 lg:px-8 lg:-mt-2 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Users className="h-3.5 w-3.5 text-red-500" />
            Peer Network
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Your Learning <span className="text-red-500">Environment</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Left: profiles & industries */}
          <div className="lg:col-span-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-800">
                Top Job Profiles
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
                {JOB_PROFILES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.792 6.793-6.793a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-8 border-t border-slate-100" />

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-800">
                Top Industries
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
                {INDUSTRIES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.792 6.793-6.793a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: interactive work-experience donut */}
          <div className="flex flex-col items-center justify-center lg:col-span-2">
            <div className="relative h-72 w-72">
              <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                <circle
                  cx={100}
                  cy={100}
                  r={RADIUS}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth={STROKE}
                />
                {EXPERIENCE_SEGMENTS.map((segment, index) => {
                  const dash = (segment.percent / 100) * CIRCUMFERENCE;
                  const gap = CIRCUMFERENCE - dash;
                  const offset = -((cumulativePercent / 100) * CIRCUMFERENCE);
                  cumulativePercent += segment.percent;
                  const isActive = hovered === index;

                  return (
                    <circle
                      key={segment.label}
                      cx={100}
                      cy={100}
                      r={RADIUS}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth={isActive ? STROKE + 6 : STROKE}
                      strokeDasharray={`${dash} ${gap}`}
                      strokeDashoffset={offset}
                      strokeLinecap="butt"
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        opacity: hovered === null || isActive ? 1 : 0.45,
                      }}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                {hovered !== null ? (
                  <>
                    <span
                      className="text-3xl font-extrabold"
                      style={{ color: EXPERIENCE_SEGMENTS[hovered].color }}
                    >
                      {EXPERIENCE_SEGMENTS[hovered].percent}%
                    </span>
                    <span className="mt-1 text-xs font-semibold text-slate-500">
                      {EXPERIENCE_SEGMENTS[hovered].label}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold uppercase tracking-wide text-slate-800">
                      Work
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide text-slate-800">
                      Experience
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Legend */}
            <ul className="mt-8 grid w-full max-w-xs grid-cols-2 gap-x-6 gap-y-3">
              {EXPERIENCE_SEGMENTS.map((segment, index) => (
                <li
                  key={segment.label}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {segment.percent}%
                    </span>{" "}
                    {segment.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
