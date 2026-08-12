"use client";

import { Handshake, Star, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_GRADUATES, GraduateTestimonialT } from "@/data/graduates";

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={13}
        fill={i < Math.round(rating) ? "#facc15" : "none"}
        color={i < Math.round(rating) ? "#facc15" : "#d1d5db"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const GraduateCard = ({
  graduate,
  onOpen,
}: {
  graduate: GraduateTestimonialT;
  onOpen: (g: GraduateTestimonialT) => void;
}) => (
  <div
    className="__gradCard"
    onClick={() => onOpen(graduate)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onOpen(graduate);
    }}
  >
    {/* Image */}
    <div className="__gradCardImage">
      {graduate.avatarSrc ? (
        <img
          src={graduate.avatarSrc}
          alt={graduate.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: graduate.avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {graduate.initials}
        </div>
      )}
    </div>

    {/* Info overlay on hover */}
    <div className="__gradCardOverlay">
      <div className="__gradCardContent">
        <p className="__gradCardQuote">
          "
          {graduate.testimonial ??
            "This program completely transformed my career path and gave me the confidence to grow."}
          "
        </p>
        <div className="__gradCardMeta">
          <p
            style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#fff" }}
          >
            {graduate.name}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#cbd5e1" }}>
            {graduate.role}
          </p>
        </div>
      </div>
    </div>

    {/* Default info (below image) */}
    <div className="__gradCardInfo">
      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111" }}>
        {graduate.name}
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontSize: 12,
          color: "#666",
          fontWeight: 500,
        }}
      >
        {graduate.role}
      </p>
      <StarRating rating={graduate.rating} />
    </div>
  </div>
);

const GraduateSlider = ({
  graduates,
  onOpen,
}: {
  graduates: GraduateTestimonialT[];
  onOpen: (g: GraduateTestimonialT) => void;
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width + 16
      : el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.min(graduates.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slideEl = el.children[index] as HTMLElement | undefined;
    if (slideEl) {
      el.scrollTo({ left: slideEl.offsetLeft - 16, behavior: "smooth" });
    }
  };

  const startAutoplay = () => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

    autoplayIntervalRef.current = setInterval(() => {
      if (isInteractingRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % graduates.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);
  };

  // Auto-advance every few seconds
  useEffect(() => {
    if (graduates.length <= 1) return;
    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [graduates.length]);

  const pauseAutoplay = () => {
    isInteractingRef.current = true;
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const resumeAutoplaySoon = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      startAutoplay();
    }, 5000);
  };

  return (
    <div className="__gradSliderWrap">
      <div
        className="__gradSliderTrack"
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={pauseAutoplay}
        onTouchEnd={resumeAutoplaySoon}
        onPointerDown={pauseAutoplay}
        onPointerUp={resumeAutoplaySoon}
      >
        {graduates.map((graduate, index) => (
          <div className="__gradSlide" key={`${graduate.name}-slide-${index}`}>
            <GraduateCard graduate={graduate} onOpen={onOpen} />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="__gradDots">
        {graduates.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to testimonial ${index + 1}`}
            className={`__gradDot ${index === activeIndex ? "__gradDotActive" : ""}`}
            onClick={() => {
              pauseAutoplay();
              scrollToIndex(index);
              resumeAutoplaySoon();
            }}
          />
        ))}
      </div>
    </div>
  );
};

const GraduateModal = ({
  graduate,
  onClose,
}: {
  graduate: GraduateTestimonialT;
  onClose: () => void;
}) => {
  const [entered, setEntered] = useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
    };
  }, [onClose]);

  return (
    <div
      className={`__gradModal ${entered ? "__gradModalActive" : ""}`}
      onClick={onClose}
    >
      <div className="__gradModalBox" onClick={(e) => e.stopPropagation()}>
        <button
          className="__gradModalClose"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="__gradModalImage">
          {graduate.avatarSrc ? (
            <img
              src={graduate.avatarSrc}
              alt={graduate.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: graduate.avatarColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {graduate.initials}
            </div>
          )}
        </div>

        <div className="__gradModalBody">
          <p
            style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111" }}
          >
            {graduate.name}
          </p>
          <p style={{ margin: "4px 0 8px", fontSize: 13.5, color: "#666" }}>
            {graduate.role}
          </p>
          <StarRating rating={graduate.rating} />
          <p className="__gradModalQuote">
            "
            {graduate.testimonial ??
              "This program completely transformed my career path and gave me the confidence to grow."}
            "
          </p>
        </div>
      </div>
    </div>
  );
};

export function GraduatesMarquee({
  graduates = DEFAULT_GRADUATES,
}: {
  graduates?: GraduateTestimonialT[];
}) {
  const [selected, setSelected] = useState<GraduateTestimonialT | null>(null);

  return (
    <section className="__gradSection">
      <style>{`
        .__gradSection {
          background: #ffffff;
          padding: 60px 20px;
        }

        @media (max-width: 768px) {
          .__gradSection {
            padding: 48px 16px;
          }
        }

        .__gradContainer {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Header */
        .__gradHeader {
          text-align: center;
          margin-bottom: 48px;
        }

        @media (max-width: 768px) {
          .__gradHeader {
            margin-bottom: 40px;
          }
        }

        .__gradBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          padding: 8px 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #111;
          margin-bottom: 12px;
        }

        .__gradTitle {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          color: #111;
          margin: 0;
          letter-spacing: -0.5px;
        }

        @media (max-width: 1024px) {
          .__gradTitle {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .__gradTitle {
            font-size: 24px;
          }
        }

        .__gradTitle .highlight {
          color: #ef4444;
        }

        /* Card */
        .__gradCard {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .__gradCard:hover {
          border-color: #d1d5db;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
        }

        .__gradCardImage {
          width: 100%;
          height: 240px;
          background: #f3f4f6;
          overflow: hidden;
          position: relative;
        }

        .__gradCardImage img {
          transition: transform 0.4s ease, filter 0.3s ease;
        }

        .__gradCard:hover .__gradCardImage img {
          transform: scale(1.08);
          filter: brightness(0.7);
        }

        /* Overlay on image on hover */
        .__gradCardOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .__gradCard:hover .__gradCardOverlay {
          opacity: 1;
          pointer-events: auto;
        }

        .__gradCardContent {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .__gradCardQuote {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: #f3f4f6;
          font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .__gradCardMeta {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 8px;
        }

        .__gradCardMeta p {
          margin: 0;
        }

        /* Info below image */
        .__gradCardInfo {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .__gradCardInfo p {
          margin: 0;
        }

        /* Modal */
        .__gradModal {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.92);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .__gradModal.__gradModalActive {
          opacity: 1;
          visibility: visible;
        }

        .__gradModalBox {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          transform: scale(0.95);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .__gradModal.__gradModalActive .__gradModalBox {
          transform: scale(1);
          opacity: 1;
        }

        .__gradModalClose {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #fff;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .__gradModalClose:hover {
          background: #f3f4f6;
          transform: scale(1.08);
        }

        .__gradModalImage {
          width: 100%;
          height: 320px;
          background: #f3f4f6;
          overflow: hidden;
        }

        .__gradModalImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .__gradModalBody {
          padding: 24px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .__gradModalBody p {
          margin: 0;
        }

        .__gradModalQuote {
          margin-top: 16px;
          font-size: 14px;
          line-height: 1.7;
          color: #374151;
          font-style: italic;
        }

        @media (max-width: 640px) {
          .__gradModalImage {
            height: 280px;
          }

          .__gradModalBody {
            padding: 20px;
          }

          .__gradModalBox {
            max-width: 100%;
          }
        }

        /* Slider (now on all devices) */
        .__gradSliderWrap {
          display: block;
        }

        .__gradSliderTrack {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 16px;
          margin: 0 -16px;
          box-sizing: border-box;
          scrollbar-width: none;
        }

        .__gradSliderTrack::-webkit-scrollbar {
          display: none;
        }

        .__gradSlide {
          flex: 0 0 calc(33.333% - 11px);
          box-sizing: border-box;
          scroll-snap-align: start;
        }

        @media (max-width: 1024px) {
          .__gradSlide {
            flex: 0 0 calc(50% - 8px);
          }
        }

        @media (max-width: 640px) {
          .__gradSlide {
            flex: 0 0 calc(100% - 32px);
          }

          .__gradSliderTrack {
            gap: 12px;
            padding: 8px 16px;
          }
        }

        /* Dots */
        .__gradDots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          padding: 0 16px;
        }

        .__gradDot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: #d1d5db;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .__gradDot:hover {
          background: #9ca3af;
        }

        .__gradDotActive {
          background: #ef4444;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 1024px) {
          .__gradDots {
            margin-top: 16px;
          }
        }
      `}</style>

      <div className="__gradContainer">
        {/* Header */}
        <div className="__gradHeader">
          <div className="__gradBadge">
            <Handshake size={14} style={{ color: "#ef4444" }} />
            Success Stories
          </div>
          <h2 className="__gradTitle">
            What Our Graduates <span className="highlight">Say</span>
          </h2>
        </div>

        {/* Slider (All Devices) */}
        <GraduateSlider graduates={graduates} onOpen={setSelected} />
      </div>

      {/* Modal */}
      {selected && (
        <GraduateModal graduate={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
