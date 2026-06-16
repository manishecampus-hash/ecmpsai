"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { universities } from "@/data/universities";

const DESKTOP_INITIAL_COUNT = 15;
const MOBILE_INITIAL_COUNT = 6;

export default function UniversitySection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const initialCount = isMobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT;
  const displayedUniversities = showAll
    ? universities
    : universities.slice(0, initialCount);

  return (
    <section className="w-full py-12 px-4 bg-white">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-6xl mx-auto">
        {displayedUniversities.map((uni, index) => (
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

      {universities.length > initialCount && (
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
