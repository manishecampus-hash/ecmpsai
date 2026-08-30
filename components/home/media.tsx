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

const preventFocusScroll = (e: SyntheticEvent) => {
  e.preventDefault();
};

// Modern attractive logo designs with gradients
const LOGO_STYLES: Record<
  string,
  {
    bgGradient: string;
    textColor: string;
    borderColor?: string;
    glowColor?: string;
  }
> = {
  "Lokmat Times": {
    bgGradient: "linear-gradient(135deg, #0F3460 0%, #533483 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(83, 52, 131, 0.4)",
  },
  "Hindustan Times": {
    bgGradient: "linear-gradient(135deg, #C41E3A 0%, #FF6B6B 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(196, 30, 58, 0.4)",
  },
  ThePrint: {
    bgGradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(26, 26, 46, 0.4)",
  },
  ANI: {
    bgGradient: "linear-gradient(135deg, #E63946 0%, #FF8C42 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(230, 57, 70, 0.4)",
  },
  Digpu: {
    bgGradient: "linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(46, 134, 171, 0.4)",
  },
  LatestLY: {
    bgGradient: "linear-gradient(135deg, #F77F00 0%, #FCBF49 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(247, 127, 0, 0.4)",
  },
  "Daily Hunt": {
    bgGradient: "linear-gradient(135deg, #06A77D 0%, #2DD36F 100%)",
    textColor: "#FFFFFF",
    glowColor: "rgba(6, 168, 125, 0.4)",
  },
};

export function MediaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(4);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

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

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, items.length]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = CARD_WIDTH + GAP;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const scrollToPage = (index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - visible));
    setPage(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative z-10 w-full">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-[#ef4444]" />
            Media
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            The press <span className="text-[#ef4444]">wall</span>
          </h2>
        </div>

       <div className="relative">
          {showLeft && (
            <button
              type="button"
              aria-label="Previous"
              onMouseDown={preventFocusScroll}
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-40 -translate-y-1/2 flex h-28 w-6 items-center justify-center rounded-[10px] bg-[#444444] text-white hover:bg-[#333] transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {showRight && (
            <button
              type="button"
              aria-label="Next"
              onMouseDown={preventFocusScroll}
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-40 -translate-y-1/2 flex h-28 w-6 items-center justify-center rounded-[10px] bg-[#444444] text-white hover:bg-[#333] transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            ref={trackRef}
            onScroll={checkScroll}
            className="scrollbar-hide flex gap-7 overflow-x-auto scroll-smooth px-0 py-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((article, i) => {
              const logoStyle = LOGO_STYLES[article.name] || {
                bg: "bg-[#1B2230]",
                text: "text-white",
              };

              return (
                <a
                  key={i}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    scrollSnapAlign: "start",
                    width: CARD_WIDTH,
                  }}
                  className="group relative flex-shrink-0 bg-white shadow-[0_8px_24px_-8px_rgba(27,34,48,0.18)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:shadow-[0_18px_36px_-10px_rgba(27,34,48,0.28)]"
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
                    <div className="flex items-center justify-center">
                      {article.logo ? (
                        <img
                          src={article.logo}
                          alt={article.name + " logo"}
                          className="h-5 w-auto object-contain"
                        />
                      ) : (
                        // Modern attractive gradient badge - centered
                        <div
                          className="__logo-badge relative flex items-center gap-1.5 px-4 py-2 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-0.5"
                          style={{
                            background: logoStyle.bgGradient,
                            boxShadow: `0 8px 16px ${logoStyle.glowColor}`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                          <div className="relative flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            <span
                              className="text-[9px] font-black uppercase tracking-widest"
                              style={{
                                color: logoStyle.textColor,
                                letterSpacing: "0.8px",
                              }}
                            >
                              {article.name}
                            </span>
                          </div>
                        </div>
                      )}
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .__logo-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}