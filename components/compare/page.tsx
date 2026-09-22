"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, ArrowRight, Scale, MapPin } from "lucide-react";
import { UNIVERSITY_COMPARISONS } from "@/data/comparisons";
import Link from "next/link";
import Image from "next/image";

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

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null;
    const gap = 24;
    const step = firstCard
      ? firstCard.offsetWidth + gap
      : scrollRef.current.clientWidth;
    const { scrollLeft } = scrollRef.current;
    const newScrollLeft =
      direction === "right" ? scrollLeft + step : scrollLeft - step;
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative bg-white rounded-3xl border border-slate-200/80 shadow-sm mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200/80 mb-2 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-red-500" />
            University Comparisons
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compare To Find The Right University
          </h2>
        </div>

        {/* Scroll Control Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2.5 rounded-xl border transition-all ${
              canScrollLeft
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2.5 rounded-xl border transition-all ${
              canScrollRight
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
                : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:snap-none pb-4"
        >
          {UNIVERSITY_COMPARISONS.map((pair) => (
            <div
              key={pair.id}
              className="w-[88%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col snap-start shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image Split Header */}
              <div className="relative h-[130px] bg-slate-100 flex items-center flex-shrink-0 overflow-hidden">
                {/* Left side - University A */}
                <div className="w-1/2 h-full relative border-r border-white/20">
                  <Image
                    src={pair.a.image}
                    alt={pair.a.university}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md truncate max-w-[90%]">
                    {pair.a.short || pair.a.university}
                  </span>
                </div>

                {/* Right side - University B */}
                <div className="w-1/2 h-full relative">
                  <Image
                    src={pair.b.image}
                    alt={pair.b.university}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md truncate max-w-[90%]">
                    {pair.b.short || pair.b.university}
                  </span>
                </div>

                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 text-white border-2 border-white text-xs font-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  VS
                </div>
              </div>

              {/* Content row */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Left Uni Details */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0 text-red-500" />
                      <span className="truncate">{pair.a.location}</span>
                    </p>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight line-clamp-1">
                      {pair.a.university}
                    </h4>
                    <p className="text-[11px] font-medium text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md inline-block max-w-full truncate">
                      {pair.a.ranking}
                    </p>
                  </div>

                  {/* Right Uni Details */}
                  <div className="space-y-1 text-right">
                    <p className="text-[11px] font-semibold text-slate-400 flex items-center justify-end gap-1 truncate">
                      <span className="truncate">{pair.b.location}</span>
                      <MapPin className="w-3 h-3 shrink-0 text-red-500" />
                    </p>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight line-clamp-1">
                      {pair.b.university}
                    </h4>
                    <p className="text-[11px] font-medium text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md inline-block max-w-full truncate">
                      {pair.b.ranking}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/compare/${pair.id}`}
                  className="w-full mt-auto py-2.5 px-4 border border-red-500 text-red-600 bg-white hover:bg-red-600 hover:text-white rounded-2xl font-bold text-xs text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs group-hover:shadow-red-500/20"
                >
                  <span>
                    {pair.a.university} vs {pair.b.university}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Comparisons Link */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
        <Link
          href="/comparisons"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm border border-red-200/80 hover:border-red-300 transition-all shadow-2xs group"
        >
          <span>View All University Comparisons</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white group-hover:scale-110 transition-transform">
            <ArrowRight size={12} />
          </span>
        </Link>
      </div>
    </div>
  );
}
