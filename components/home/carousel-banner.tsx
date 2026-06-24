"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    desktop: "/banner/banner1test.png",
    mobile: "/banner/mobile1.png",
  },
  {
    id: 2,
    desktop: "/banner/banner2.svg",
    mobile: "/banner/mobile2.webp",
  },
  {
    id: 3,
    desktop: "/banner/banner3.svg",
    mobile: "/banner/mobile3.png",
  },
  {
    id: 4,
    desktop: "/banner/banner4.svg",
    mobile: "/banner/mobile4.png",
  },
];

const SWIPE_THRESHOLD = 50;
const LOCK_AXIS_THRESHOLD = 10;

export function CarouselBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false); // ← NEW: prevent rapid clicks

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchDeltaX = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ─── Navigate with transition lock ───────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600); // match transition duration
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goTo((currentSlide + 1) % slides.length);
  }, [currentSlide, goTo]);

  const prevSlide = useCallback(() => {
    goTo((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goTo]);

  const goToSlide = (index: number) => {
    goTo(index);
    setIsAutoPlay(false);
  };

  // ─── Autoplay ────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // ─── Touch Handlers ──────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    isHorizontalSwipe.current = null;
    setIsAutoPlay(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isHorizontalSwipe.current === true) {
      if (touchDeltaX.current < -SWIPE_THRESHOLD) nextSlide();
      else if (touchDeltaX.current > SWIPE_THRESHOLD) prevSlide();
    }
    isHorizontalSwipe.current = null;
  }, [nextSlide, prevSlide]);

  // ─── Non-passive touchmove ────────────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      touchDeltaX.current = dx;
      if (isHorizontalSwipe.current === null) {
        if (
          Math.abs(dx) > LOCK_AXIS_THRESHOLD ||
          Math.abs(dy) > LOCK_AXIS_THRESHOLD
        ) {
          isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
        }
      }
      if (isHorizontalSwipe.current === true) e.preventDefault();
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  return (
    <>
      <style>{`
        /* ── OUTER CLIP ── */
       /* ── OUTER CLIP ── */
.cb-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  
  /* BALANCED HEIGHT: Taller than the previous thin version */
  aspect-ratio: 16 / 6;  /* 3 was too thin, 6 is a good medium height */
  max-height: 30vh;      /* Increased back to 30vh */
  
  border-radius: 12px;
  user-select: none;
  touch-action: pan-y;
}

@media (min-width: 768px) {
  .cb-wrap {
    /* BALANCED HEIGHT: Adjusted for desktop */
    aspect-ratio: 16 / 4; /* 2 was too thin, 4 is standard for desktop banners */
    max-height: 40vh;     /* Increased to 40vh */
    border-bottom: none;
    touch-action: auto;
  }
}
        /* ── SLIDING STRIP ── */
        /* All slides sit side-by-side in one wide row; we translate the strip */
        .cb-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.77, 0, 0.18, 1); /* ← the magic */
          will-change: transform;
        }

        /* ── EACH SLIDE ── */
        .cb-slide {
          flex: 0 0 100%;          /* every slide takes exactly 100% width */
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* MOBILE / DESKTOP IMAGE TOGGLE */
        .img-mobile { display: block; }
        .img-desktop { display: none; }

        @media (min-width: 768px) {
          .img-mobile { display: none; }
          .img-desktop { display: block; }
        }

        .banner-img {
          object-fit: cover;
          -webkit-touch-callout: none;
          pointer-events: none;
        }

        /* ARROWS */
        .cb-arrow { display: none; }

        @media (min-width: 768px) {
          .cb-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            border: none;
            background: rgba(0,0,0,0.3);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.25s ease;
          }
          .cb-arrow:hover { background: rgba(0,0,0,0.5); }
        }

        .cb-arrow.left  { left: 10px; }
        .cb-arrow.right { right: 10px; }

        /* DOTS */
        .cb-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 8px 0 0 0;
        }

        .cb-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          background: #d1d5db;
          transition: all 0.3s ease;
          padding: 0;
        }

        .cb-dot.active {
          width: 16px;
          background: #2563eb;
        }
      `}</style>

      <div className="relative w-[calc(100%+49px)] -mx-4 overflow-hidden mb-6 mt-4">
        <div
          ref={wrapRef}
          className="cb-wrap shadow-sm border border-gray-100"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/*
            KEY CHANGE: instead of stacking slides with position:absolute + opacity,
            we use a flex row and translateX the whole strip.
            translateX(-N * 100%) moves to the Nth slide.
          */}
          <div
            className="cb-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={s.id} className="cb-slide">
                <div className="img-mobile relative w-full h-full">
                  <Image
                    src={s.mobile}
                    alt={`Mobile Banner ${s.id}`}
                    fill
                    priority={i === 0}
                    className="banner-img"
                    draggable={false}
                  />
                </div>
                <div className="img-desktop relative w-full h-full">
                  <Image
                    src={s.desktop}
                    alt={`Desktop Banner ${s.id}`}
                    fill
                    priority={i === 0}
                    className="banner-img"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="cb-arrow left"
            onClick={() => {
              prevSlide();
              setIsAutoPlay(false);
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="cb-arrow right"
            onClick={() => {
              nextSlide();
              setIsAutoPlay(false);
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="cb-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`cb-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
