"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { popularDegrees } from "@/data/popular-degree";

export default function PopularDegrees() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 500);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}


        <div className="mx-auto text-center mb-8 border-b border-slate-100 pb-6 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-semibold tracking-wide uppercase">
            <Sparkles size={11} />
            Degrees
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
            Popular Degrees{" "}

          </h2>
        </div>

        {/* Slider wrapper with side arrows */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-16 w-6 items-center justify-center rounded-r-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
          )}

          {/* Slider */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {popularDegrees.map((degree) => (
              <Link
                key={degree.slug}
                href={`/degrees/${degree.slug}`}
                className="group min-w-[180px]"
              >
                {/* Circle Image */}
                <div className="relative w-44 h-44 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100">
                  <Image
                    src={degree.image}
                    alt={degree.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-gray-900 font-bold text-2xl">{degree.name}</h3>
                <p className="text-gray-500 mt-1">{degree.subtitle}</p>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-16 w-6 items-center justify-center rounded-l-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}