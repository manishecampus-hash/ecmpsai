"use client";

import { pressArticles } from "@/data/press-section";
import {
  Handshake,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Expected shape of each item in `pressArticles`:
 * {
 *   image: string;        // photo used in the card (event photo / thumbnail)
 *   name: string;         // outlet name, e.g. "ThePrint", "ANI", "The Tribune"
 *   href: string;         // link to the article
 *   description: string;  // one-line summary shown under the outlet name
 *   headline?: string;    // optional small "as it appeared" strip (only some cards had this in the reference)
 * }
 *
 * If your data file doesn't have `description` / `headline` yet, add them —
 * the card layout below is built around that copy, not just the logo.
 */

const CARD_WIDTH = 300; // px, keep in sync with the className width below
const GAP = 24; // px, keep in sync with gap-6

export function MediaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(4);

  const items = pressArticles;
  const pageCount = Math.max(1, items.length - visible + 1);

  // responsive: how many cards are visible at once
  useEffect(() => {
    const computeVisible = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      if (w < 1280) return 3;
      return 4;
    };
    const onResize = () => setVisible(computeVisible());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, items.length - visible)));
  }, [visible, items.length]);

  const scrollToPage = (index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - visible));
    setPage(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-white px-4 py-16 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Featured in
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            We&apos;ve been in the <span className="text-red-500">news</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev / Next arrows */}
          <button
            aria-label="Previous"
            onClick={() => scrollToPage(page - 1)}
            disabled={page === 0}
            className="absolute left-0 top-1/2 z-20 -translate-x-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/5 transition hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-700 sm:-translate-x-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollToPage(page + 1)}
            disabled={page >= items.length - visible}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-3 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/5 transition hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-700 sm:translate-x-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

          {/* Track */}
          <div
            ref={trackRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth px-1 py-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((article, i) => (
              <a
                key={i}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ scrollSnapAlign: "start", width: CARD_WIDTH }}
                className="group flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/10"
              >
                {/* Photo */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x200/f8fafc/e2e8f0?text=eCampus";
                    }}
                  />
                  {article.headline && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6">
                      <p className="line-clamp-2 text-xs font-semibold leading-snug text-white">
                        {article.headline}
                      </p>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col gap-3 px-5 pb-5 pt-4">
                  <div className="flex h-8 items-center">
                    {article.logo ? (
                      <img
                        src={article.logo}
                        alt={`${article.name} logo`}
                        className="h-6 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-lg font-black tracking-tight text-slate-900">
                        {article.name}
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {article.description}
                  </p>

                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-red-500 transition-transform group-hover:translate-x-0.5">
                    Read More
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? "w-6 bg-red-500"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
