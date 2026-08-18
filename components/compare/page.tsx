"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { UNIVERSITY_COMPARISONS } from "@/data/comparisons";
import Link from "next/link";
import Image from "next/image";

export default function UniversitySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = () => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard
      ? firstCard.offsetWidth + gap
      : scrollRef.current.clientWidth;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const newScrollLeft = Math.min(
      scrollLeft + step,
      scrollWidth - clientWidth,
    );
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-5 relative bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Compare To Find The Right University
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:snap-none"
        >
          {UNIVERSITY_COMPARISONS.map((pair) => (
            <div
              key={pair.id}
              className="w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 h-[260px] bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col snap-start"
            >
              {/* Image row - reduced height, images removed, structure kept for custom PNG */}

              <div className="relative h-[110px] bg-[#e0e0e2] flex items-center flex-shrink-0 overflow-hidden">
                {/* Left side - University A */}
                <div className="w-1/2 h-full relative">
                  <Image
                    src={pair.a.image}
                    alt={pair.a.university}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right side - University B */}
                <div className="w-1/2 h-full relative">
                  <Image
                    src={pair.b.image}
                    alt={pair.b.university}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  VS
                </div>
              </div>

              {/* Content row */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between gap-3">
                  <div className="w-1/2">
                    <p className="text-xs text-gray-500 truncate">
                      {pair.a.location}
                    </p>
                    <p className="font-bold text-gray-900 text-[15px] leading-tight truncate">
                      {pair.a.university}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 truncate">
                      {pair.a.ranking}
                    </p>
                  </div>
                  <div className="w-1/2 text-right">
                    <p className="text-xs text-gray-500 truncate">
                      {pair.b.location}
                    </p>
                    <p className="font-bold text-gray-900 text-[15px] leading-tight truncate">
                      {pair.b.university}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 truncate">
                      {pair.b.ranking}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/compare/${pair.id}`}
                  className="w-full mt-auto py-2.5 border border-orange-500 text-orange-600 rounded-md font-semibold text-sm text-center block"
                >
                  {pair.a.university} vs {pair.b.university}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow position adjusted to match reduced image height */}
        {canScrollRight && (
          <button
            onClick={scroll}
            className="hidden sm:flex absolute right-0 top-[55px] translate-x-1/2 z-10 bg-white shadow-md p-2 rounded-full border border-gray-200 hover:shadow-lg transition"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href="/comparisons"
          className="inline-flex items-center gap-2 text-orange-600 font-medium text-sm underline"
        >
          View All University Comparisons
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white">
            <ArrowRight size={12} />
          </span>
        </Link>
      </div>
    </div>
  );
}
