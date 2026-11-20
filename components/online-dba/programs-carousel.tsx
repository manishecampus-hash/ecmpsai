"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal swipe/scroll carousel with left/right arrows and position dots.
 * Works on all screen sizes - mobile, tablet, and desktop.
 */
export default function ProgramsCarousel({
  children,
  count,
}: {
  children: React.ReactNode;
  count: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const cardStep = useCallback(() => {
    const strip = stripRef.current;
    const first = strip?.firstElementChild as HTMLElement | null;
    if (!strip || !first) return 0;
    const gap = parseFloat(getComputedStyle(strip).columnGap || "16") || 16;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const step = cardStep() || strip.clientWidth;
    const max = strip.scrollWidth - strip.clientWidth;
    setActive(Math.min(count - 1, Math.round(strip.scrollLeft / step)));
    setAtStart(strip.scrollLeft <= 4);
    setAtEnd(strip.scrollLeft >= max - 4);
  }, [cardStep, count]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollToIndex = (index: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    strip.scrollTo({ left: clamped * cardStep(), behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-[calc(50%-14px)] z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.4)] ring-1 ring-slate-200/80 backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-[0_14px_30px_-10px_rgba(220,38,38,0.35)] hover:ring-red-200 active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="relative overflow-visible">
      <div
        ref={stripRef}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overflow-y-visible px-4 py-4 pb-6 [scrollbar-width:none] sm:mx-0 sm:gap-5 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous university"
            onClick={() => scrollToIndex(active - 1)}
            disabled={atStart}
            className={`${arrowClass} -left-2 sm:-left-5`}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Next university"
            onClick={() => scrollToIndex(active + 1)}
            disabled={atEnd}
            className={`${arrowClass} -right-2 sm:-right-5`}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {/* position dots - mobile only */}
          <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to university ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-red-600" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
