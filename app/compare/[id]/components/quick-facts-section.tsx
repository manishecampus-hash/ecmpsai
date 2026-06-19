import React from "react";

// Defensive type definition
interface UniversityData {
  established?: string;
  students?: string;
  faculty?: string;
  programs?: string;
  campusSize?: string;
  placementRate?: string;
}

interface Props {
  a: UniversityData;
  b: UniversityData;
}

export function QuickFactsSection({ a, b }: Props) {
  // Safe data access using optional chaining (?.)
  const stats = [
    {
      label: "Established",
      icon: "📅",
      valA: a?.established || "1872",
      valB: b?.established || "2008",
    },
    {
      label: "Student Population",
      icon: "👥",
      valA: a?.students || "18,500+",
      valB: b?.students || "12,000+",
    },
    {
      label: "Faculty",
      icon: "👤",
      valA: a?.faculty || "350+",
      valB: b?.faculty || "280+",
    },
    {
      label: "Programs",
      icon: "📖",
      valA: a?.programs || "120+",
      valB: b?.programs || "95+",
    },
    {
      label: "Campus Size",
      icon: "🗺️",
      valA: a?.campusSize || "45 Acres",
      valB: b?.campusSize || "32 Acres",
    },
    {
      label: "Placement Rate",
      icon: "📈",
      valA: a?.placementRate || "98%",
      valB: b?.placementRate || "96%",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
      {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Facts</h2> */}
      <div className="space-y-1">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="grid grid-cols-3 items-center py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
          >
            {/* University A */}
            <div className="text-center">
              <p className="text-lg font-bold text-indigo-900">{stat.valA}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </p>
            </div>

            {/* Middle Icon & Label */}
            <div className="flex flex-col items-center justify-center gap-1 border-x border-gray-100">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs font-semibold text-gray-600 text-center">
                {stat.label}
              </span>
            </div>

            {/* University B */}
            <div className="text-center">
              <p className="text-lg font-bold text-indigo-900">{stat.valB}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
