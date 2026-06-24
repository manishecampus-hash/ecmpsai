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
} from "lucide-react";
import { programsData } from "./../../data/online-course";

const courseTabs = [
  { id: "all", label: "All Courses" },
  { id: "engineering", label: "Engineering" },
  { id: "management", label: "Management" },
  { id: "degree", label: "Degree" },
  { id: "globalandasync", label: "Global and Async" },
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
  const [activeTab, setActiveTab] = useState("all"); // ← "free" se "all" fix kiya
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = useMemo(
    () =>
      activeTab === "all"
        ? programsData
        : programsData.filter((p) => p.tab === activeTab),
    [activeTab],
  );

  // Tab change hone par carousel reset karo
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    }, 50);
  };

  const { canLeft: carLeft, canRight: carRight } = useScrollState(carouselRef);
  const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

  const scrollCarousel = (dir: number) =>
    carouselRef.current?.scrollBy({ left: dir * 290, behavior: "smooth" });
  const scrollTabs = (dir: number) =>
    tabsRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  return (
    <section className="relative w-full py-10 bg-white">
      <style>{`
        .__ps::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .__tabArrow { display: none !important; } }
        .__carArrow:hover { background: #333333 !important; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 font-[Inter]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            In-Demand Courses
          </span>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
            Find The Right <span className="text-red-500">Program</span>
          </h2>
        </div>

        {/* Tabs Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "28px",
            borderBottom: "1px solid #e2e8f0",
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
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 12px",
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#000" : "#64748b",
                    whiteSpace: "nowrap",
                    borderBottom: isActive
                      ? "2px solid #000"
                      : "2px solid transparent",
                    marginBottom: "-1px",
                    transition: "color 0.2s, font-weight 0.2s",
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

        {/* Carousel Row */}
        <div style={{ position: "relative" }}>
          <button
            className="__carArrow"
            onClick={() => scrollCarousel(-1)}
            style={leftArrowStyle(carLeft)}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={carouselRef}
            className="__ps"
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              padding: "4px 32px 12px",
              alignItems: "stretch",
            }}
          >
            {filteredPrograms.length === 0 ? (
              <div
                style={{
                  flex: "0 0 100%",
                  borderRadius: "12px",
                  border: "1px dashed #e2e8f0",
                  padding: "48px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                No programs found for this category.
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

                  {/* Body */}
                  <div
                    style={{
                      padding: "14px 14px 0",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
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
