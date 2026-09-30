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
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { BrochureForm } from "./../form/brochure-form";
import { ApplicationForm } from "../form/common-form";
import HighlightedText from "@/components/universities/HighlightedText";





function useScrollState(
  ref: React.RefObject<HTMLDivElement | null>,
  deps: React.DependencyList = [],
) {
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
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(raf1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, ...deps]);

  return { canLeft, canRight };
}

// More reliable than scrollLeft/scrollWidth math (which can get stuck
// "always true" due to padding/subpixel rounding). Places a 1px sentinel
// at the very start and very end of the scrollable content and uses
// IntersectionObserver to detect whether each one is actually visible
// inside the scroll container right now. Automatically re-checks when
// the container's content changes size (tab/mode switch) because
// IntersectionObserver keeps watching, it isn't a one-shot measurement.
function useEdgeVisibility(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const root = containerRef.current;
    const startEl = startRef.current;
    const endEl = endRef.current;
    if (!root || !startEl || !endEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === startEl) setAtStart(entry.isIntersecting);
          if (entry.target === endEl) setAtEnd(entry.isIntersecting);
        });
      },
      { root, threshold: 0 },
    );

    observer.observe(startEl);
    observer.observe(endEl);

    return () => observer.disconnect();
  }, [containerRef]);

  return { startRef, endRef, canLeft: !atStart, canRight: !atEnd };
}
const preventFocusScroll = (e: React.SyntheticEvent) => {
  e.preventDefault();
};

const tabArrowStyle = (visible: boolean): React.CSSProperties => ({
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: visible ? "pointer" : "",
  color: "#ff3b4f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s",
  flexShrink: 0,
});

interface ProgramCategory {
  id: string;
  name: string;
  slug?: string;
  sortOrder?: number;
  isUncategorized?: boolean;
}

interface ProgramItem {
  id: string | number;
  title?: string;
  name?: string;
  image?: string;
  thumbnail?: string;
  ribbon?: string;
  learners?: string;
  numberOfStudents?: string;
  duration?: string;
  tab?: string;
  categoryId?: string | null;
  slug?: string;
  isFree?: boolean;
  mode?: string;
  brochureUrl?: string;
  shortDescription?: string;
  description?: string;
  details?: string;
  highlights?: string[];
  deadline?: string;
}

interface ProgramDataProps {
  title?: string;
  categories?: ProgramCategory[];
  programs?: ProgramItem[];
}

export interface ProgramsSectionProps {
  programData?: ProgramDataProps;
}

const getModeBadgeProps = (rawMode?: string) => {
  const mode = (rawMode || "Online").trim();
  const normalized = mode.toLowerCase();

  if (normalized === "online") {
    return {
      label: "🟢 Online",
      bg: "#dcfce7",
      color: "#16a34a",
      border: "1px solid #bbf7d0",
    };
  }
  if (normalized === "offline") {
    return {
      label: "🟡 Offline",
      bg: "#fef3c7",
      color: "#b45309",
      border: "1px solid #fde68a",
    };
  }
  if (normalized === "hybrid") {
    return {
      label: "🟣 Hybrid",
      bg: "#e0e7ff",
      color: "#3730a3",
      border: "1px solid #c7d2fe",
    };
  }

  const displayLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
  return {
    label: `📍 ${displayLabel}`,
    bg: "#e0f2fe",
    color: "#0284c7",
    border: "1px solid #bae6fd",
  };
};

export default function ProgramsSection({ programData }: ProgramsSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMode, setActiveMode] = useState("all");
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<{ id: string | number | null; time: number }>({
    id: null,
    time: 0,
  });

  const courseTabs = useMemo(() => {
    if (
      programData?.categories &&
      Array.isArray(programData.categories) &&
      programData.categories.length > 0
    ) {
      return [
        { id: "all", label: "All Courses" },
        ...programData.categories
          .filter(
            (c) =>
              !c.isUncategorized &&
              c.id !== "uncategorized" &&
              c.name?.trim().toLowerCase() !== "uncategorized"
          )
          .map((c) => ({
            id: c.id,
            label: c.name,
            isUncategorized: c.isUncategorized,
          })),
      ];
    }
    return [{ id: "all", label: "All Courses" }];
  }, [programData]);

  const allPrograms = useMemo(() => {
    if (
      programData?.programs &&
      Array.isArray(programData.programs) &&
      programData.programs.length > 0
    ) {
      return programData.programs.map((p, idx) => ({
        id: p.id || `prog-${idx}`,
        title: p.title || p.name || "",
        image: p.thumbnail || p.image || "",
        ribbon: p.ribbon || "DEGREE",
        learners: p.numberOfStudents
          ? `${p.numberOfStudents} Students`
          : p.learners || "",
        duration: p.duration ? p.duration.trim() : "",
        categoryId: p.categoryId || null,
        tab: p.tab || (p.categoryId ? p.categoryId : "uncategorized"),
        slug: p.slug
          ? `/${p.slug.replace(/^\/+/, "").replace(/^programs?\//, "")}`
          : "#",
        isFree: p.isFree ?? false,
        mode: p.mode || "online",
        brochureUrl: p.brochureUrl || "",
        shortDescription: p.shortDescription || p.description || "",
        description: p.description || p.shortDescription || "",
        details: p.details || "",
        highlights:
          p.highlights && p.highlights.length > 0
            ? p.highlights
            : [],
        deadline: p.deadline || "",
      }));
    }
    return [];
  }, [programData]);

  // Touch/mobile: single tap on the image opens the overlay,
  // double tap (within 350ms) on it closes it again.
  const handleImageTap = (id: string | number) => {
    const now = Date.now();
    const last = lastTapRef.current;
    if (last.id === id && now - last.time < 350) {
      setActiveCardId(null);
      lastTapRef.current = { id: null, time: 0 };
      return;
    }
    lastTapRef.current = { id, time: now };
    setActiveCardId((prev) => (prev === id ? prev : id));
  };

  const dynamicModeTabs = useMemo(() => {
    const standardModes = ["Online", "Offline", "Hybrid"];
    const foundModes = new Set<string>();

    allPrograms.forEach((p) => {
      if (p.mode && typeof p.mode === "string" && p.mode.trim()) {
        const raw = p.mode.trim();
        const formatted = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
        foundModes.add(formatted);
      }
    });

    const orderedList = ["Online", "Offline", "Hybrid"];
    foundModes.forEach((m) => {
      if (!orderedList.includes(m)) {
        orderedList.push(m);
      }
    });

    return [
      { id: "all", label: "All" },
      ...orderedList.map((m) => ({
        id: m.toLowerCase(),
        label: m,
      })),
    ];
  }, [allPrograms]);

  const filteredPrograms = useMemo(
    () =>
      allPrograms.filter((p) => {
        let tabMatch = true;
        if (activeTab !== "all") {
          if (activeTab === "uncategorized") {
            tabMatch =
              !p.categoryId || p.categoryId === "uncategorized" || p.tab === "uncategorized";
          } else {
            tabMatch = p.categoryId === activeTab || p.tab === activeTab;
          }
        }
        const progMode = (p.mode || "").trim().toLowerCase();
        const modeMatch =
          activeMode === "all" || progMode === activeMode.toLowerCase();
        return tabMatch && modeMatch;
      }),
    [allPrograms, activeTab, activeMode],
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const handleModeChange = (modeId: string) => {
    setActiveMode(modeId);
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const {
    startRef: carStartRef,
    endRef: carEndRef,
    canLeft: carLeft,
    canRight: carRight,
  } = useEdgeVisibility(carouselRef);
  const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 290, behavior: "smooth" });
    }
  };

  const scrollTabs = (dir: number) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white pt-3 pb-13 lg:pb-5">
      <style>{`
        .__ps::-webkit-scrollbar { display: none; }



        /* Tab arrows are removed everywhere (mobile + desktop). They were
           the source of the tap-jitter/drag feel on mobile, and the tabs
           strip fits fine within its own horizontal scroll without them. */
        .__tabArrow { display: none !important; }

        @media (max-width: 640px) { .__modeToggle { display: none !important; } }

        /* On mobile, center the carousel arrows on the image area (160px
           tall) instead of the whole card, so they sit a bit higher than
           the full-card vertical center. */
        @media (max-width: 640px) {
          .__carArrowBtn {
            top: 80px !important;
          }
        }

        /* ---- Tab label: reserve bold-text width so switching
           font-weight on the active tab does not resize the row and
           cause the whole tabs strip to visibly shift/jitter ---- */
        .__tabLabel {
          position: relative;
          display: inline-block;
        }
        .__tabLabel::before {
          content: attr(data-text);
          display: block;
          height: 0;
          overflow: hidden;
          visibility: hidden;
          font-weight: 700;
        }

        /* ---- __imgWrap ---- */
        .__imgWrap {
          position: relative;
          height: 160px;
          overflow: hidden;
          // background: #f1f5f9;
          flex-shrink: 0;
          z-index: 1;
        }
        .__imgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .__card {
          cursor: pointer;
        }
        .__cardOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #ff3b4f 0%, #e02035 55%, #c41e3a 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 16px;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          z-index: 30;
        }
        .__overlayDeadline {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          color: #ffd166;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 20px;
          margin: 0 0 10px;
          width: fit-content;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .__overlayTitle {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.4;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.02s, transform 0.3s ease 0.02s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .__overlayText {
          color: #ffffff !important;
          font-size: 11px;
          line-height: 1.5;
          margin: 0 0 10px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .__overlayText,
        .__overlayText *,
        .__overlayText p,
        .__overlayText span,
        .__overlayText div,
        .__overlayText li,
        .__overlayText ul,
        .__overlayText ol,
        .__overlayText strong,
        .__overlayText em,
        .__overlayText h1,
        .__overlayText h2,
        .__overlayText h3,
        .__overlayText h4,
        .__overlayText h5,
        .__overlayText h6,
        .__overlayText a,
        .__overlayText b,
        .__overlayText i,
        .__overlayText u,
        .__overlayText font,
        .__overlayText td,
        .__overlayText th {
          color: #ffffff !important;
        }
        .__overlayInfoRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
        }
        .__overlayInfoItem {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .__overlayIconCircle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .__overlayLabel {
          font-size: 9.5px;
          color: #ffc4ce;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin: 0;
        }
        .__overlayValue {
          font-size: 12px;
          color: #ffffff;
          font-weight: 700;
          margin: 0;
        }
        .__overlayList {
          list-style: none;
          margin: 0 0 12px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s;
        }
        .__overlayList li {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 600;
          color: #f8fafc;
        }
        .__overlayBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #ffffff;
          color: #ff3b4f;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
          width: fit-content;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s, background 0.2s;
        }
        .__overlayBtn:hover {
          background: #fef1f3;
        }
        /* Overlay itself stays pointer-events:none always (base rule
           above) so the mouse never actually leaves .__imgWrap while
           it's visually covered — this is what stops the hover
           flicker loop. The one interactive element inside it, the
           "Know More" button, opts back in explicitly. */
        .__overlayBtn {
          pointer-events: auto;
        }

        /* ---- DESKTOP / real mouse only: pure CSS hover on the image.
           Wrapped in (hover: hover) and (pointer: fine) so touch
           devices never see this rule at all — that mismatch is what
           was causing the overlay to get "stuck" and randomly
           flicker open/closed on mobile after a tap. ---- */
        @media (hover: hover) and (pointer: fine) {
          .__imgWrap:hover img {
            transform: scale(1.08);
          }
          .__imgWrap:hover ~ .__cardOverlay {
            opacity: 1;
            transform: translateY(0);
          }
          .__imgWrap:hover ~ .__cardOverlay .__overlayDeadline,
          .__imgWrap:hover ~ .__cardOverlay .__overlayTitle,
          .__imgWrap:hover ~ .__cardOverlay .__overlayText,
          .__imgWrap:hover ~ .__cardOverlay .__overlayInfoRow,
          .__imgWrap:hover ~ .__cardOverlay .__overlayList,
          .__imgWrap:hover ~ .__cardOverlay .__overlayBtn {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ---- MOBILE / touch: overlay is driven entirely by JS state
           (single tap on image = open, double tap = close) through
           this class, never through :hover. ---- */
        .__cardOverlayActive {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .__cardOverlayActive .__overlayDeadline,
        .__cardOverlayActive .__overlayTitle,
        .__cardOverlayActive .__overlayText,
        .__cardOverlayActive .__overlayInfoRow,
        .__cardOverlayActive .__overlayList,
        .__cardOverlayActive .__overlayBtn {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5 text-red-500" />
            In-Demand Courses
          </span>

          <h2 className="mt-3 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {programData?.title ? (
              <HighlightedText text={programData.title} className="text-red-500" defaultColor="#ef4444" />
            ) : (
              <>
                Find The Right <span className="text-red-500">Program</span>
              </>
            )}
          </h2>
        </div>

        {/* Tabs Row + Mode Toggle (same line) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            borderBottom: "1px solid #e2e8f0",
            flexWrap: "wrap",
          }}
        >
          {/* <button
            type="button"
            className="__tabArrow"
            onPointerDown={preventFocusScroll}
            onClick={() => scrollTabs(-1)}
            style={{
              ...tabArrowStyle(tabLeft),
              width: 20,
              height: 20,
              minWidth: 20,
              padding: 0,
              marginRight: "6px",
            }}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft size={16} />
          </button> */}

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
              alignItems: "center",
              justifyContent: "flex-start",
              minWidth: 0,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {courseTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onPointerDown={preventFocusScroll}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 12px",
                    fontSize: "14px",
                    color: isActive ? "#000" : "#64748b",
                    whiteSpace: "nowrap",
                    borderBottom: isActive
                      ? "2px solid #000"
                      : "2px solid transparent",
                    marginBottom: "-1px",
                    transition: "color 0.2s",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                  }}
                >
                  <span
                    className="__tabLabel"
                    data-text={tab.label}
                    style={{ fontWeight: isActive ? 700 : 500 }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* <button
            type="button"
            className="__tabArrow"
            onPointerDown={preventFocusScroll}
            onClick={() => scrollTabs(1)}
            style={{
              ...tabArrowStyle(tabRight),
              width: 20,
              height: 20,
              minWidth: 20,
              padding: 0,
              marginLeft: "6px",
            }}
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={16} />
          </button> */}

          <div
            className="__modeToggle"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingBottom: "12px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                whiteSpace: "nowrap",
              }}
            >
              Mode:
            </span>
            <div
              style={{
                display: "flex",
                gap: "6px",
              }}
            >
              {dynamicModeTabs.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    type="button"
                    key={mode.id}
                    onPointerDown={preventFocusScroll}
                    onClick={() => handleModeChange(mode.id)}
                    style={{
                      background: isActive ? "#ff3b4f" : "#f8fafc",
                      border: isActive
                        ? "1.5px solid #ff3b4f"
                        : "1.5px solid #e2e8f0",
                      borderRadius: "20px",
                      padding: "5px 16px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isActive ? "#fff" : "#475569",
                      cursor: "pointer",
                      transition:
                        "background 0.2s, border-color 0.2s, color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Row */}
        <div ref={carouselWrapRef} style={{ position: "relative" }}>
          {/* ❌ REMOVED: White gradient overlays on left and right */}

          {/* {carLeft && (
            <button
              type="button"
              aria-label="Scroll carousel left"
              onMouseDown={preventFocusScroll}
              onClick={() => scrollCarousel(-1)}
              className="__carArrowBtn absolute left-0 top-1/2 z-40 -translate-y-1/2 flex h-28 w-6 items-center justify-center rounded-[10px] bg-[#444444] text-white hover:bg-[#333] transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )} */}

          <div
            ref={carouselRef}
            className="__ps"
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              padding: "4px 0 12px 0",
              alignItems: "stretch",
            }}
          >
            <div
              ref={carStartRef}
              aria-hidden="true"
              style={{ width: 1, flexShrink: 0, alignSelf: "stretch" }}
            />
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
                  className="__card"
                  style={{
                    flex: "0 0 270px",
                    scrollSnapAlign: "start",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    // transition: "box-shadow 0.25s, transform 0.25s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  {/* Image */}
                  <div
                    className="__imgWrap"
                    onClick={() => handleImageTap(program.id)}
                  >
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="__imgFallback"
                      style={{
                        display: program.image ? "none" : "flex",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#cbd5e1",
                        color: "#0f172a",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "13px",
                        lineHeight: "1.4",
                        userSelect: "none",
                      }}
                    >
                      <span className="line-clamp-3">{program.title}</span>
                    </div>
                    {/* <div
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
                        boxShadow: "0 2px 6px rgba(255,59,79,0.3)",
                        zIndex: 2,
                      }}
                    >
                      {program.ribbon}
                    </div> */}
                    {/* Mode Badge */}
                    {(() => {
                      const badge = getModeBadgeProps(program.mode);
                      return (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "10px",
                            background: badge.bg,
                            padding: "3px 8px",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: badge.color,
                            borderRadius: "20px",
                            border: badge.border,
                            zIndex: 2,
                          }}
                        >
                          {badge.label}
                        </div>
                      );
                    })()}
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

                    {/* Learners & Duration - Side by Side (AMNE SAMNE) */}
                    {(program.learners || program.duration) && (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "14px",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {program.learners ? (
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
                        ) : null}
                        {program.duration ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "12px",
                              color: "#475569",
                              marginLeft: program.learners ? "0" : "auto",
                            }}
                          >
                            <Clock size={13} color="#64748b" strokeWidth={1.8} />
                            <span>{program.duration}</span>
                          </div>
                        ) : null}
                      </div>
                    )}
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
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        textDecoration: "none",
                      }}
                    >
                      View Program
                    </a>
                    {program.isFree ? (
  <a
    href={program.slug}
    className="flex-1 flex items-center justify-center rounded-[6px] bg-[#ff3b4f] border-[1.5px] border-[#ff3b4f] px-[10px] py-2 text-xs font-bold text-white no-underline whitespace-nowrap transition-colors hover:bg-[#e02035] hover:border-[#e02035]"
  >
    Enroll Now
  </a>
) : (
  <button
    type="button"
    onClick={() => {
      if (program.brochureUrl) {
        window.open(program.brochureUrl, "_blank");
      }
      setShowBrochureForm(true);
    }}
    className="flex-1 flex items-center justify-center rounded-[6px] bg-[#ff3b4f] border-[1.5px] border-[#ff3b4f] px-[10px] py-2 text-xs font-bold text-white whitespace-nowrap transition-colors hover:bg-[#e02035] hover:border-[#e02035] cursor-pointer"
  >
    Get Brochure
  </button>
)}
                  </div>

                  {/* Full-card overlay - RED THEME with icon rows.
                      Desktop: reveals on real mouse hover of the image
                      (see the (hover:hover) media query above).
                      Mobile/touch: controlled by activeCardId state -
                      single tap on image opens, double tap closes. */}
                  <div
                    className={`__cardOverlay ${
                      activeCardId === program.id ? "__cardOverlayActive" : ""
                    }`}
                  >
                    {program.deadline ? (
                      <span className="__overlayDeadline">
                        <Clock size={10} color="#ffd166" />
                        {program.deadline}
                      </span>
                    ) : null}

                    {/* Title */}
                    <p className="__overlayTitle">{program.title}</p>

                    {/* 1. Short Description */}
                    {(program.shortDescription || program.description) ? (
                      <p className="__overlayText" style={{ fontSize: "11px", color: "#fdd0d7", marginBottom: "8px", lineHeight: "1.4" }}>
                        {program.shortDescription || program.description}
                      </p>
                    ) : null}

                    {/* 2. Duration & Number of Students */}
                    {(program.learners || program.duration) && (
                      <div className="__overlayInfoRow">
                        {program.learners ? (
                          <div className="__overlayInfoItem">
                            <div className="__overlayIconCircle">
                              <Users size={12} color="#ffc4ce" />
                            </div>
                            <div>
                              <p className="__overlayLabel">Students</p>
                              <p className="__overlayValue">{program.learners}</p>
                            </div>
                          </div>
                        ) : null}
                        {program.duration ? (
                          <div className="__overlayInfoItem">
                            <div className="__overlayIconCircle">
                              <Clock size={12} color="#ffc4ce" />
                            </div>
                            <div>
                              <p className="__overlayLabel">Duration</p>
                              <p className="__overlayValue">{program.duration}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Highlights */}
                    {program.highlights && program.highlights.length > 0 && (
                      <ul className="__overlayList">
                        {program.highlights.slice(0, 3).map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={11} color="#4ade80" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 3. Detailed Overview / Content (Legacy Fallback) */}
                    {program.details && program.details !== (program.shortDescription || program.description) ? (
                      <div className="__overlayText mt-1 text-[11px] text-white" style={{ color: "#ffffff" }}>
                        {typeof program.details === "string" &&
                        program.details.includes("<") ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: program.details.replace(/color\s*:\s*[^;"]+;?/gi, "color: #ffffff;"),
                            }}
                          />
                        ) : (
                          <p>{program.details}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))
            )}
            <div
              ref={carEndRef}
              aria-hidden="true"
              style={{ width: 1, flexShrink: 0, alignSelf: "stretch" }}
            />
          </div>

          {/* {carRight && (
            <button
              type="button"
              aria-label="Scroll carousel right"
              onMouseDown={preventFocusScroll}
              onClick={() => scrollCarousel(1)}
              className="__carArrowBtn absolute right-0 top-1/2 z-40 -translate-y-1/2 flex h-28 w-6 items-center justify-center rounded-[10px] bg-[#444444] text-white hover:bg-[#333] transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )} */}
        </div>
      </div>
      {showBrochureForm && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6"
    onClick={() => setShowBrochureForm(false)}
  >
   <div
  className="relative w-full max-w-md max-h-[90vh] overflow-visible rounded-2xl bg-white shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
      <button
        type="button"
        onClick={() => setShowBrochureForm(false)}
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
        aria-label="Close brochure form"
      >
        ×
      </button>

      <BrochureForm
        onSubmit={() => {
          setShowBrochureForm(false);
        }}
        onBack={() => {
          setShowBrochureForm(false);
        }}
      />
    </div>
  </div>
)}
{showApplicationForm && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6"
    onClick={() => setShowApplicationForm(false)}
  >
    <div
      className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setShowApplicationForm(false)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-gray-600 shadow"
      >
        ×
      </button>

      <ApplicationForm
        onSubmit={() => {
          setShowApplicationForm(false);
        }}
        onBack={() => {
          setShowApplicationForm(false);
        }}
      />
    </div>
  </div>
)}
    </section>
  );
}