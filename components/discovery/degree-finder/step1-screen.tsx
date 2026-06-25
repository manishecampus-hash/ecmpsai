"use client";

import React from "react";

const degreeTypes = [
  {
    id: "all",
    label: "All Programs",
    description: "Explore all degrees and programs across streams.",
    color: "purple",
  },
  {
    id: "ug",
    label: "UG Courses",
    description: "Discover undergraduate courses and degrees.",
    color: "teal",
  },
  {
    id: "pg",
    label: "PG Courses",
    description: "Explore postgraduate courses and specializations.",
    color: "green",
  },
  {
    id: "exec",
    label: "Executive Education",
    description: "Advance your leadership with executive programs.",
    color: "orange",
  },
  {
    id: "phd",
    label: "Doctorate / Ph.D.",
    description: "Pursue advanced research and doctoral programs.",
    color: "purple",
  },
  {
    id: "eng",
    label: "Engineering",
    description: "Find engineering programs across all specializations.",
    color: "teal",
  },
  {
    id: "ai",
    label: "Gen AI / Agentic AI",
    description: "Explore cutting-edge AI and Gen AI programs.",
    color: "green",
  },
  {
    id: "skill",
    label: "Skilling & Certificate",
    description: "Build new skills with short-term certificates and courses.",
    color: "orange",
  },
];

const colorMap: Record<
  string,
  { bg: string; icon: string; line: string; arrow: string }
> = {
  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-700",
    line: "bg-violet-700",
    arrow: "text-violet-700 border-violet-700",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-700",
    line: "bg-teal-700",
    arrow: "text-teal-700 border-teal-700",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-700",
    line: "bg-emerald-600",
    arrow: "text-emerald-600 border-emerald-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    line: "bg-orange-500",
    arrow: "text-orange-500 border-orange-500",
  },
};

const icons: Record<string, React.ReactNode> = {
  all: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  ug: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  ),
  pg: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  exec: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  phd: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
      <circle cx="16" cy="19" r="3" />
    </svg>
  ),
  eng: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  ),
  ai: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  skill: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M2 6h8M6 2l4 4-4 4" />
  </svg>
);

const footerItems = [
  {
    label: "Curated Programs",
    desc: "Handpicked programs from top universities",
    icon: (
      <svg
        className="w-7 h-7 text-violet-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M17 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Quality Assured",
    desc: "Verified programs with high academic standards",
    icon: (
      <svg
        className="w-7 h-7 text-violet-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "For Every Goal",
    desc: "Programs for every stage of your career",
    icon: (
      <svg
        className="w-7 h-7 text-violet-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <circle cx="8" cy="8" r="5" />
        <circle cx="16" cy="16" r="5" />
        <path d="M8 13v3M11 8h3" />
      </svg>
    ),
  },
];

interface Props {
  onTypeSelect: (id: string) => void;
}

export default function Step1Screen({ onTypeSelect }: Props) {
  return (
    <div className="bg-[#F0EEF8] py-5 px-4">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 bg-white text-red-700 text-xs font-bold tracking-widest uppercase mb-3">
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M12 3l1.912 5.813L20 9.727l-4.5 4.387 1.063 6.2L12 17.25l-4.563 3.064 1.063-6.2L4 9.727l6.088-.914z" />
          </svg>
          Smart Degree Finder
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          Find the right program for you
        </h1>
        <p className="text-gray-500 text-sm">
          Explore programs across different categories and find the perfect
          match for your goals.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-5">
        {degreeTypes.map((d) => {
          const c = colorMap[d.color];
          return (
            <button
              key={d.id}
              onClick={() => onTypeSelect(d.id)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl ${c.bg} ${c.icon} flex items-center justify-center mb-3`}
              >
                {icons[d.id]}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {d.label}
              </h3>

              {/* Colored underline */}
              <div className={`h-[2px] w-6 rounded-full ${c.line} mb-2`} />

              {/* Description */}
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                {d.description}
              </p>

              {/* Arrow */}
              <div className="flex justify-end">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${c.arrow} flex items-center justify-center`}
                >
                  <ArrowIcon />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer trust bar */}
      <div className="flex justify-center divide-x divide-gray-200 border-t border-gray-200 pt-4 max-w-3xl mx-auto">
        {footerItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 px-8 text-center"
          >
            {item.icon}
            <span className="text-xs font-bold text-gray-900">
              {item.label}
            </span>
            <span className="text-xs text-gray-400">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
