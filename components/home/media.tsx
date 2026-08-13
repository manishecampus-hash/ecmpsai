"use client";

import { pressArticles } from "@/data/press-section";
import {
  Pin,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Handshake,
} from "lucide-react";
import type { CSSProperties, SyntheticEvent } from "react";
import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 300;
const GAP = 28;

const TILTS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2, -2.6, 1.9];

const preventFocusScroll = (e: SyntheticEvent) => {
  e.preventDefault();
};

const leftArrowStyle = (visible: boolean): CSSProperties => ({
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  margin: "auto 0",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "0 8px 8px 0",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s, background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

const rightArrowStyle = (visible: boolean): CSSProperties => ({
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto 0",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "8px 0 0 8px",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s, background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

export function MediaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(4);

  const items = pressArticles;
  const pageCount = Math.max(1, items.length - visible + 1);

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
    <section className="relative w-full overflow-hidden px-4 py-8 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-[#ef4444]" />
            Media
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            The press <span className="text-[#ef4444]">wall</span>
          </h2>
        </div>

        <div className="relative py-4">
          <button
            type="button"
            aria-label="Previous"
            onMouseDown={preventFocusScroll}
            onClick={() => scrollToPage(page - 1)}
            disabled={page === 0}
            className="__carArrow"
            style={leftArrowStyle(page !== 0)}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onMouseDown={preventFocusScroll}
            onClick={() => scrollToPage(page + 1)}
            disabled={page >= items.length - visible}
            className="__carArrow"
            style={rightArrowStyle(page < items.length - visible)}
          >
            <ChevronRight size={16} />
          </button>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FBFAF7] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FBFAF7] to-transparent sm:w-20" />

          <div
            ref={trackRef}
            className="scrollbar-hide flex gap-7 overflow-x-auto scroll-smooth px-2 py-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((article, i) => {
              const tilt = TILTS[i % TILTS.length];
              return (
                <a
                  key={i}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    scrollSnapAlign: "start",
                    width: CARD_WIDTH,
                    transform: "rotate(" + tilt + "deg)",
                  }}
                  className="group relative flex-shrink-0 bg-white shadow-[0_8px_24px_-8px_rgba(27,34,48,0.18)] transition-all duration-300 hover:z-10 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_18px_36px_-10px_rgba(27,34,48,0.28)]"
                >
                  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md ring-2 ring-white">
                    <Pin
                      className="h-3 w-3 rotate-45 text-red-500"
                      fill="currentColor"
                    />
                  </div>

                  <div
                    className="h-3 w-full bg-white"
                    style={{
                      maskImage:
                        "repeating-linear-gradient(110deg, transparent 0 3px, black 3px 7px)",
                      WebkitMaskImage:
                        "repeating-linear-gradient(110deg, transparent 0 3px, black 3px 7px)",
                    }}
                  />

                  <div className="relative h-36 w-full overflow-hidden border-y border-[#1B2230]/5 bg-slate-100 grayscale-[10%]">
                    <img
                      src={article.image}
                      alt={article.name}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/400x200/F3EEE1/1B2230?text=eCampus";
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

                  <div className="flex flex-col gap-2.5 px-5 pb-6 pt-4">
                    <div className="flex items-center justify-between">
                      {article.logo ? (
                        <img
                          src={article.logo}
                          alt={article.name + " logo"}
                          className="h-5 w-auto object-contain"
                        />
                      ) : (
                        <span
                          className="text-base font-black tracking-tight text-[#1B2230]"
                          style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                        >
                          {article.name}
                        </span>
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#1B2230]/35">
                        Press
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-[#1B2230]/65">
                      {article.description}
                    </p>

                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#B33A3A] transition-transform group-hover:translate-x-0.5">
                      Read clipping
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              aria-label={"Go to slide " + (i + 1)}
              onClick={() => scrollToPage(i)}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === page
                  ? "w-6 bg-red-500 text-red-500"
                  : "w-1.5 bg-[#1B2230]/15 hover:bg-[#1B2230]/25")
              }
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .__carArrow:hover {
          background: #333333 !important;
        }

        @media (max-width: 640px) {
          .__carArrow {
            top: 115px !important;
            bottom: auto !important;
            margin: 0 !important;
            transform: translateY(-50%) !important;
          }
        }

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
