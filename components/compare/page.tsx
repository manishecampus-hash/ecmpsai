"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { UNIVERSITY_COMPARISONS } from "@/data/comparisons";
import Link from "next/link";

export default function UniversitySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard
      ? firstCard.offsetWidth + gap
      : scrollRef.current.clientWidth;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    let newScrollLeft = dir === "left" ? scrollLeft - step : scrollLeft + step;
    newScrollLeft = Math.max(
      0,
      Math.min(newScrollLeft, scrollWidth - clientWidth),
    );
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    // Reduced outer padding on small screens so content doesn't feel cramped
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Smaller heading on mobile, scales up on larger screens */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-5 sm:mb-6 lg:mb-8">
        Compare to choose the right university
      </h2>

      <div className="relative">
        {/* Left Arrow - hidden on mobile since swipe gesture handles navigation there */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:shadow-xl transition"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Slider Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          // Reduced horizontal padding on mobile (no arrows to make room for),
          // snap scrolling added so swipes land cleanly on each card on touch devices
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-1 sm:px-12 py-4 snap-x snap-mandatory sm:snap-none"
        >
          {UNIVERSITY_COMPARISONS.map((pair) => (
            <div
              key={pair.id}
              // Mobile: nearly full width, single card per view
              // Tablet (sm): ~half width, two cards visible
              // Desktop (lg): one-third width, three cards visible (original behavior)
              className="w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col snap-start"
            >
              {/* Combined VS Banner Image */}
              <div className="relative h-36 overflow-hidden rounded-t-2xl">
                <img
                  src={pair.image}
                  alt={`${pair.a.name} vs ${pair.b.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-1">
                {/* Course Badge (e.g. MBA) */}
                <div className="text-center mb-3">
                  <p className="font-bold text-gray-900 text-lg">
                    {pair.a.name}
                  </p>
                </div>

                {/* University Names */}
                <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-200">
                  <p className="font-bold text-gray-900 text-sm text-left w-[48%] line-clamp-2">
                    {pair.a.university}
                  </p>
                  <p className="font-bold text-gray-900 text-sm text-right w-[48%] line-clamp-2">
                    {pair.b.university}
                  </p>
                </div>

                {/* Location */}
                <div className="flex justify-between gap-2 text-xs text-gray-500 mb-3 pb-2 border-b border-gray-100">
                  <p className="flex items-center gap-1 min-w-0 w-[48%]">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{pair.a.location}</span>
                  </p>
                  <p className="flex items-center gap-1 min-w-0 w-[48%] justify-end">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">{pair.b.location}</span>
                  </p>
                </div>

                {/* Course Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pair.a.courses.slice(0, 2).map((c, i) => (
                    <span
                      key={`a-${i}`}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium"
                    >
                      {c}
                    </span>
                  ))}
                  {pair.b.courses.slice(0, 2).map((c, i) => (
                    <span
                      key={`b-${i}`}
                      className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/compare/${pair.id}`}
                  className="w-full py-2 border-2 border-gray-500 text-black rounded-lg font-bold text-sm hover:bg-gray-50 transition mt-auto text-center block"
                >
                  Compare Universities
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow - hidden on mobile since swipe gesture handles navigation there */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:shadow-xl transition"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-6 sm:mt-8 text-center">
        <a
          href="/comparisons"
          className="text-orange-500 font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:gap-3 transition"
        >
          View All University Comparisons
          <ChevronRight size={20} />
        </a>
      </div>
    </div>
  );
}
