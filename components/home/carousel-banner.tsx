"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const staticSlides = [
  {
    id: "static-1",
    desktop: "/banner/banner1.svg",
    mobile: "/banner/mobile1.png",
    slug: "",
    title: "",
    category: "",
    isDynamic: false,
  },
  {
    id: "static-2",
    desktop: "/banner/banner2.svg",
    mobile: "/banner/mobile2.webp",
    slug: "",
    title: "",
    category: "",
    isDynamic: false,
  },
  {
    id: "static-3",
    desktop: "/banner/banner3.svg",
    mobile: "/banner/mobile3.png",
    slug: "",
    title: "",
    category: "",
    isDynamic: false,
  },
  {
    id: "static-4",
    desktop: "/banner/banner4.svg",
    mobile: "/banner/mobile4.png",
    slug: "",
    title: "",
    category: "",
    isDynamic: false,
  },
];

const SWIPE_THRESHOLD = 50;
const LOCK_AXIS_THRESHOLD = 10;

export function CarouselBanner() {
  const [slidesData, setSlidesData] = useState<any[]>(staticSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchDeltaX = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ─── Fetch Dynamic Carousel Blogs ────────────────────────────
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const dynamicCarousel = data
            .filter((b: any) => b.inCarousel && b.status === "active")
            .sort((a: any, b: any) => a.carouselOrder - b.carouselOrder)
            .map((b: any, index: number) => ({
              id: b.id || b._id || `dynamic-${index}`,
              desktop: b.imageUrl || `/banner/banner${(index % 4) + 1}.svg`,
              mobile: b.imageUrl || `/banner/mobile${(index % 4) + 1}.png`,
              slug: `/blog/${(b.url || "").replace(/^\/+|\/+$/g, "")}`,
              title: b.title || "",
              category: b.category || "General",
              isDynamic: true,
            }));

          if (dynamicCarousel.length > 0) {
            setSlidesData(dynamicCarousel);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch dynamic carousel slides, using static fallback:", err);
      });
  }, []);

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
    if (slidesData.length === 0) return;
    goTo((currentSlide + 1) % slidesData.length);
  }, [currentSlide, goTo, slidesData.length]);

  const prevSlide = useCallback(() => {
    if (slidesData.length === 0) return;
    goTo((currentSlide - 1 + slidesData.length) % slidesData.length);
  }, [currentSlide, goTo, slidesData.length]);

  const goToSlide = (index: number) => {
    goTo(index);
    setIsAutoPlay(false);
  };

  // ─── Autoplay ────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoPlay || slidesData.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, slidesData.length]);

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
        .cb-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #ffffff;
          
          /* BALANCED HEIGHT: Taller than the previous thin version */
          aspect-ratio: 16 / 6;
          max-height: 30vh;
          
          border-radius: 12px;
          user-select: none;
          touch-action: pan-y;
        }

        @media (min-width: 768px) {
          .cb-wrap {
            /* BALANCED HEIGHT: Adjusted for desktop */
            aspect-ratio: 16 / 4;
            max-height: 40vh;
            border-bottom: none;
            touch-action: auto;
          }
        }
        
        /* ── SLIDING STRIP ── */
        .cb-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.77, 0, 0.18, 1);
          will-change: transform;
        }

        /* ── EACH SLIDE ── */
        .cb-slide {
          flex: 0 0 100%;
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

        /* DYNAMIC OVERLAY styling */
        .cb-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%);
          padding: 20px 24px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
          z-index: 10;
        }

        .cb-category {
          display: inline-block;
          align-self: flex-start;
          background: #E8281E;
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cb-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        @media (min-width: 768px) {
          .cb-overlay {
            padding: 32px 48px;
          }
          .cb-title {
            font-size: 1.4rem;
          }
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
          <div
            className="cb-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidesData.map((s, i) => (
              <div key={s.id} className="cb-slide">
                {s.slug ? (
                  <Link
                    href={s.slug}
                    style={{ display: "block", width: "100%", height: "100%", position: "relative" }}
                  >
                    <div className="img-mobile relative w-full h-full">
                      <Image
                        src={s.mobile}
                        alt={s.title || `Mobile Banner ${s.id}`}
                        fill
                        priority={i === 0}
                        className="banner-img"
                        draggable={false}
                      />
                    </div>
                    <div className="img-desktop relative w-full h-full">
                      <Image
                        src={s.desktop}
                        alt={s.title || `Desktop Banner ${s.id}`}
                        fill
                        priority={i === 0}
                        className="banner-img"
                        draggable={false}
                      />
                    </div>
                    {s.isDynamic && (
                      <div className="cb-overlay">
                        <span className="cb-category">{s.category}</span>
                        <h3 className="cb-title">{s.title}</h3>
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            ))}
          </div>

          {slidesData.length > 1 && (
            <>
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
            </>
          )}
        </div>

        {slidesData.length > 1 && (
          <div className="cb-dots">
            {slidesData.map((_, i) => (
              <button
                key={i}
                className={`cb-dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
