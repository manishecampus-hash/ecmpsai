// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Handshake } from "lucide-react";
// import { universities } from "@/data/universities";

// const DESKTOP_INITIAL_COUNT = 15;
// const MOBILE_INITIAL_COUNT = 6;

// export default function UniversitySection() {
//   const [isMobile, setIsMobile] = useState(false);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 639px)");
//     const updateIsMobile = () => setIsMobile(mediaQuery.matches);
//     updateIsMobile();
//     mediaQuery.addEventListener("change", updateIsMobile);
//     return () => mediaQuery.removeEventListener("change", updateIsMobile);
//   }, []);

//   const initialCount = isMobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT;
//   const displayedUniversities = showAll
//     ? universities
//     : universities.slice(0, initialCount);

//   return (
//     <section className="w-full py-12 px-4 bg-white">
//       <div className="text-center mb-8">
//         <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
//           <Handshake className="h-3.5 w-3.5 text-red-500" />
//           University
//         </span>

//         <h2 className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
//           Our Partner <span className="text-red-500">Universities</span>
//         </h2>

//         <div className="h-1 w-12 bg-red-600 mx-auto mt-3 rounded-full" />
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-6xl mx-auto">
//         {displayedUniversities.map((uni, index) => (
//           <Link
//             key={index}
//             href={`/universities/${uni.slug}`}
//             className="group flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all duration-300"
//           >
//             <div className="w-full h-14 flex items-center justify-center mb-2">
//               <div className="relative w-full h-full">
//                 <Image
//                   src={uni.image}
//                   alt={uni.name}
//                   fill
//                   className="object-contain group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             </div>

//             <h3 className="text-[11px] sm:text-xs font-medium text-gray-800 text-center leading-snug line-clamp-2 min-h-[28px]">
//               {uni.name}
//             </h3>

//             <span className="mt-1 text-[9px] text-gray-400 uppercase tracking-wide">
//               {uni.location}
//             </span>
//           </Link>
//         ))}
//       </div>

//       {universities.length > initialCount && (
//         <div className="text-center mt-8">
//           <button
//             onClick={() => setShowAll((prev) => !prev)}
//             className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full text-[11px] font-semibold hover:bg-red-700 transition-colors duration-300"
//           >
//             {showAll ? "See Less" : "View More"}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Search, X } from "lucide-react";
import { universities } from "@/data/universities";

const DESKTOP_INITIAL_COUNT = 15;
const MOBILE_INITIAL_COUNT = 6;

const TYPE_FILTERS = [
  "All",
  "Engineering",
  "Business",
  "Arts",
  "Medicine",
  "Law",
];
const MODE_FILTERS = ["All", "Online", "Hybrid", "On-campus"];

export default function UniversitySection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeMode, setActiveMode] = useState("All");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Reset pagination on any filter change
  useEffect(() => {
    setShowAll(false);
  }, [query, activeType, activeMode]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return universities.filter((u) => {
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        (u.location ?? "").toLowerCase().includes(q);
      const matchType = activeType === "All" || (u as any).type === activeType;
      const matchMode = activeMode === "All" || (u as any).mode === activeMode;
      return matchSearch && matchType && matchMode;
    });
  }, [query, activeType, activeMode]);

  const initialCount = isMobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT;
  const displayed = showAll ? filtered : filtered.slice(0, initialCount);

  return (
    <section className="w-full py-12 px-4 bg-white">
      {/* ── Header (unchanged) ── */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Handshake className="h-3.5 w-3.5 text-red-500" />
          University
        </span>
        <h2 className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
          Our Partner <span className="text-red-500">Universities</span>
        </h2>
        <div className="h-1 w-12 bg-red-600 mx-auto mt-3 rounded-full" />
      </div>

      {/* ── Search + Filters ── */}
      <div className="max-w-6xl mx-auto mb-6 space-y-3">
        {/* Search bar */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus-within:border-red-500 transition-colors duration-200">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities or locations…"
            aria-label="Search universities"
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none min-w-0"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
            Type:
          </span>
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                activeType === t
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Mode pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
            Mode:
          </span>
          {MODE_FILTERS.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${
                activeMode === m
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-[11px] text-gray-400">
          {filtered.length}{" "}
          {filtered.length === 1 ? "university" : "universities"} found
        </p>
      </div>

      {/* ── Grid (unchanged card design) ── */}
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-16">
          No universities match your search. Try different filters.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-6xl mx-auto">
          {displayed.map((uni, index) => (
            <Link
              key={index}
              href={`/universities/${uni.slug}`}
              className="group flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all duration-300"
            >
              <div className="w-full h-14 flex items-center justify-center mb-2">
                <div className="relative w-full h-full">
                  <Image
                    src={uni.image}
                    alt={uni.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-[11px] sm:text-xs font-medium text-gray-800 text-center leading-snug line-clamp-2 min-h-[28px]">
                {uni.name}
              </h3>
              <span className="mt-1 text-[9px] text-gray-400 uppercase tracking-wide">
                {uni.location}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* ── View More / See Less (unchanged) ── */}
      {filtered.length > initialCount && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full text-[11px] font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            {showAll ? "See Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
}
