"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Handshake,
  TrendingUp,
} from "lucide-react";
import { programsData } from "./../../data/online-course";

const courseTabs = [
  { id: "free", label: "Free Courses" },
  { id: "all", label: "All Courses" },
  { id: "pg", label: "PG Courses" },
  { id: "ug", label: "UG Courses" },
  { id: "specializations", label: "Specializations" },
  { id: "certifications", label: "Certifications" },
];

function useScrollState(ref: React.RefObject<HTMLDivElement | null>) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, update]);

  useEffect(() => {
    setTimeout(update, 80);
  });

  return { canLeft, canRight };
}

// Tab arrows — small, transparent (mobile only)
const tabArrowStyle = (visible: boolean): React.CSSProperties => ({
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ff3b4f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s",
  flexShrink: 0,
  width: 36,
  height: 36,
});

// Carousel left arrow — rounded right side (matches OfferCarousel style)
const leftArrowStyle = (visible: boolean): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
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

// Carousel right arrow — rounded left side (matches OfferCarousel style)
const rightArrowStyle = (visible: boolean): React.CSSProperties => ({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
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

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState("free");
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = useMemo(
    () =>
      programsData.filter((p) => activeTab === "all" || p.tab === activeTab),
    [activeTab],
  );

  const { canLeft: carLeft, canRight: carRight } = useScrollState(carouselRef);
  const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

  const scrollCarousel = (dir: number) =>
    carouselRef.current?.scrollBy({ left: dir * 290, behavior: "smooth" });
  const scrollTabs = (dir: number) =>
    tabsRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  return (
    <section
      style={{
        background: "#000",
      }}
      className="relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <style>{`
        .__ps::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .__tabArrow { display: none !important; } }
        .__carArrow:hover { background: #333333 !important; }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ── Header ── */}

        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
            <TrendingUp size={11} />
            Courses
          </div>

          <h2 className="text-3xl font-bold text-black mb-2">
            Get started with a free course{" "}
          </h2>
        </div>

        {/* ── Tabs Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "28px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            className="__tabArrow"
            onClick={() => scrollTabs(-1)}
            style={tabArrowStyle(tabLeft)}
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={tabsRef}
            className="__ps"
            style={{
              flex: 1,
              display: "flex",
              gap: "28px",
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "0 2px",
            }}
          >
            {courseTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 12px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isActive ? "#000" : "#000",
                    whiteSpace: "nowrap",
                    borderBottom: isActive
                      ? "2px solid #000"
                      : "2px solid transparent",
                    marginBottom: "-1px",
                    transition: "color 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            className="__tabArrow"
            onClick={() => scrollTabs(1)}
            style={tabArrowStyle(tabRight)}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ── Carousel Row ── */}
        <div style={{ position: "relative" }}>
          {/* Left arrow — OfferCarousel style */}
          <button
            className="__carArrow"
            onClick={() => scrollCarousel(-1)}
            style={leftArrowStyle(carLeft)}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Card track — px-8 gives breathing room so arrows don't overlap cards */}
          <div
            ref={carouselRef}
            className="__ps"
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              padding: "4px 32px 12px", // 32px left/right keeps cards away from arrows
              alignItems: "stretch", // all cards in a row stretch to the tallest card's height
            }}
          >
            {filteredPrograms.length === 0 ? (
              <div
                style={{
                  flex: "0 0 100%",
                  borderRadius: "12px",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  padding: "48px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                No programs found.
              </div>
            ) : (
              filteredPrograms.map((program) => (
                <article
                  key={program.id}
                  style={{
                    flex: "0 0 270px",
                    scrollSnapAlign: "start",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    position: "relative",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.14)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      height: "160px",
                      overflow: "hidden",
                      background: "#f1f5f9",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                    {/* Ribbon */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "0",
                        background: "#ff3b4f",
                        padding: "3px 10px 3px 12px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#fff",
                        borderRadius: "0 4px 4px 0",
                        letterSpacing: "0.0em",
                        boxShadow: "0 2px 6px rgba(255,59,79,0.3)",
                      }}
                    >
                      {program.ribbon}
                    </div>
                  </div>

                  {/* Body — flex:1 so it fills remaining height, pushing CTA to bottom */}
                  <div
                    style={{
                      padding: "14px 14px 0",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Title */}
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: "1.45",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {program.title}
                    </p>

                    {/* Meta: learners + duration */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginBottom: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "#475569",
                        }}
                      >
                        <Users size={13} color="#64748b" strokeWidth={1.8} />
                        <span>{program.learners}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "#475569",
                        }}
                      >
                        <Clock size={13} color="#64748b" strokeWidth={1.8} />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    style={{
                      padding: "12px 14px 14px",
                      display: "flex",
                      gap: "10px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <a
                      href={program.slug}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        border: "1.5px solid #cbd5e1",
                        background: "#fff",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#0f172a",
                        textDecoration: "none",
                        transition: "border-color 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#94a3b8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#cbd5e1";
                      }}
                    >
                      View Program
                    </a>
                    <a
                      href={program.slug}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        background: "#ff3b4f",
                        border: "1.5px solid #ff3b4f",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                        textDecoration: "none",
                        transition: "background 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#e02035")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#ff3b4f")
                      }
                    >
                      {program.isFree ? "Enroll Now" : "Get Brochure"}
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right arrow — OfferCarousel style */}
          <button
            className="__carArrow"
            onClick={() => scrollCarousel(1)}
            style={rightArrowStyle(carRight)}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
