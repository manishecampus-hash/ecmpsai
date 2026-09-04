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

// Real data with actual content
const programsData = [
  
{
    id: 1,
    title: "MBA - Master of Business Administration",
   image: "/onlinecourses/mba.svg",
    ribbon: "DEGREE",
    learners: "3.8K+ Students",
    duration: "2 Years",
    tab: "degree",
    slug: "/program/mba-general",
    isFree: false,
    mode: "online",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
    deadline: "Applications closes on 31 Oct",
  },
  
{
    id: 2,
    title: "B.Tech - CS Engineering",
    image: "/onlinecourses/bcse.svg",
    ribbon: "DEGREE",
    learners: "5.2K+ Students",
    duration: "3 Years",
    tab: "engineering",
    slug: "/program/btech-cse",
    isFree: false,
    mode: "online",
    description:
      "Build strong foundations in programming, algorithms, data structures, and software development with an industry-focused curriculum.",
    highlights: [
      "Industry-aligned curriculum",
      "Live coding labs",
      "Placement-focused projects",
    ],
    deadline: "Application closes on 31 Oct",
  },
  {
    id: 3,
    title: "B.Tech - Mechanical Engineering",
   image: "/onlinecourses/btm.svg",
    ribbon: "DEGREE",
    learners: "7.2K+ Students",
    duration: "3 Years",
    tab: "engineering",
    slug: "/program/btech-me",
    isFree: false,
    mode: "online",
    description:
      "Master manufacturing, thermodynamics, machine design, and automation with a curriculum built for modern industries.",
    highlights: [
      "Advanced manufacturing concepts",
      "CAD & design training",
      " Industry-ready technical skills",
    ],
    deadline: "Application closes on 31 Oct",
  },
  {
    id: 4,
    title: "B.Tech - Civil Engineering", 
    image: "/onlinecourses/bce.svg",
    ribbon: "DEGREE",
    learners: "6.9K+ Students",
    duration: "3 Years",
    tab: "engineering",
    slug: "/program/btech-ci",
    isFree: false,
    mode: "online",
    description:
      "Develop expertise in construction, structural design, surveying, and infrastructure planning through practical engineering concepts.",
    highlights: [
      " Structural design expertise",
      "Construction management skills",
      " Industry-oriented site practices",
    ],
    deadline: "Application closes on 31 Oct",
  },
  {
    id: 5,
    title: "B.Tech - Electrical Engineering",
    image: "/onlinecourses/5.svg",
    ribbon: "DEGREE",
    learners: "6.1K+ Students",
    duration: "3 Years",
    tab: "engineering",
    slug: "/program/btech-ee",
    isFree: false,
    mode: "online",
    description:
      "Gain knowledge in power systems, electrical machines, circuits, and energy technologies through hands-on learning.",
    highlights: [
      "Power systems fundamentals",
      "Practical circuit design",
      "Smart energy technologies",
    ],
    deadline: "Application closes on 31 Oct",
  },
  {
    id: 6,
    title: "B.Tech - ECE ", 
    image: "/onlinecourses/6.svg",
    ribbon: "DEGREE",
    learners: "3.4K+ Students",
    duration: "3 Years",
    tab: "engineering",
    slug: "/program/btech-ece",
    isFree: false,
    mode: "online",
    description:
      "Learn communication systems, embedded technology, electronics design, and signal processing with industry-relevant skills.",
    highlights: [
      "Embedded systems training",
      "Communication technology focus",
      " Industry-driven lab exposure",
    ],
    deadline: "Application closes on 31 Oct",
  },
  {
    id: 7,
    title: "BBA - Bachelor of Business Administration",
    image: "/onlinecourses/7.svg",
    ribbon: "DEGREE",
    learners: "3.8K+ Students",
    duration: "3 Years",
    tab: "degree",
    slug: "/program/bba-general",
    isFree: false,
    mode: "online",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
    deadline: "Application closes on 31 Oct",
  },

  {
    id: 8,
    title: "BCA - Bachelor of Computer Application",
 image: "/onlinecourses/8.svg",
    ribbon: "DEGREE",
    learners: "3.8K+ Students",
    duration: "3 Years",
    tab: "degree",
    slug: "/program/bca-general",
    isFree: false,
    mode: "online",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
    deadline: "Application closes on 31 Oct",
  },
   {
    id: 9,
    title: "BA - Bachelor of Arts",
   image: "/onlinecourses/9.svg",
    ribbon: "DEGREE",
    learners: "3.7K+ Students",
    duration: "3 Years",
    tab: "degree",
    slug: "/program/ba-general",
    isFree: false,
    mode: "online",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
    deadline: "Application closes on 31 Oct",
  },
   {
    id: 10,
    title: "BCOM - Bachelor of Commerce",
   image: "/onlinecourses/10.svg",
    ribbon: "DEGREE",
    learners: "5.1K+ Students",
    duration: "3 Years",
    tab: "degree",
    slug: "/program/bcom-general",
    isFree: false,
    mode: "online",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
    deadline: "Application closes on 31 Oct",
  },

  

  {
    id: 11,
    title: "Chief Technology Officer & AI Leadership Programme",
   image: "/onlinecourses/11.svg",
    ribbon: "CERTIFICATE",
    learners: "20.2K+ Students",
    duration: "6 months",
    tab: "aiml",
    slug: "/program/bcom-general",
    isFree: false,
    mode: "online",
    description:
      "The only program that transforms engineering leaders into AI-first CTOs with structured depth in deep tech, AI, business strategy, and boardroom leadership.",
    highlights: ["Tech & AI Leadership: IIIT-Bangalore", "Business, Strategy & P&L Leadership: IIM Udaipur", "Immersive AI & Strategy workshop at IIIT-B"],
    deadline: "Application closes on 31 Aug",
  },

  {
    id: 12,
    title: "Ex. Diploma in Machine Learning & AI with MLOps, Gen AI & Agentic AI",
     image: "/onlinecourses/12.svg",
    ribbon: "CERTIFICATE",
    learners: "10.7K+ Students",
    duration: "12 months",
    tab: "aiml",
    slug: "/program/bcom-general",
    isFree: false,
    mode: "online",
    description:
      "Enroll into India's pioneering Online Machine Learning Program; Learn machine learning the way product companies build, deploy, and scale AI systems",
    highlights: ["450+ Hours of Curriculum", "30+ Hands-on Projects", "80+ Industry Tools"],
    deadline: "Application closes on 15 Sep",
  },

  {
    id: 13,
    title: "DBA in Emerging Technologies with a concentration in Generative and Agentic AI ",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    ribbon: "DOCTORATE",
    learners: "14.4K+ Students",
    duration: "27 months",
    tab: "genai",
    slug: "/program/dba-generative-ai",
    isFree: false,
    mode: "online",
    description:
      "The DBA in Emerging Technologies with a concentration in Generative and Agentic AI from GGU teaches AI, emerging tech, leadership, and decision-making skills to solve real-world business challenges and drive innovation.",
    highlights: ["500 hours of live learning", "Learn with Students from 15+ Countries", "Lead in the space of emerging technologies"],
    deadline: "Application closes on 15 Sep",
  },
  
];

const courseTabs = [
  { id: "all", label: "All Courses" },
  { id: "engineering", label: "Engineering" },
  { id: "degree", label: "Degree" },
  { id: "aiml", label: "AI & ML" },
  { id: "genai", label: "Generative AI" },
  { id: "certifications", label: "Certifications" },
];

const modeTabs = [
  { id: "all", label: "All" },
  { id: "online", label: "Online" },
  { id: "Blended", label: "Blended" },
  

];

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

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMode, setActiveMode] = useState("all");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
const [showBrochureForm, setShowBrochureForm] = useState(false);
const [showApplicationForm, setShowApplicationForm] = useState(false);

const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<{ id: number | null; time: number }>({
    id: null,
    time: 0,
  });

  // Touch/mobile: single tap on the image opens the overlay,
  // double tap (within 350ms) on it closes it again. This replaces
  // CSS :hover on touch devices, which gets "stuck" after a tap and
  // was causing the overlay to randomly flicker open/closed.
  const handleImageTap = (id: number) => {
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

  const filteredPrograms = useMemo(
    () =>
      programsData.filter((p) => {
        const tabMatch = activeTab === "all" || p.tab === activeTab;
        const modeMatch = activeMode === "all" || p.mode === activeMode;
        return tabMatch && modeMatch;
      }),
    [activeTab, activeMode],
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
          color: #fdd0d7;
          font-size: 11px;
          line-height: 1.5;
          margin: 0 0 10px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
        {/* Header */}
        <div className="text-center mb-8 font-[Inter]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5 text-red-500" />
            In-Demand Courses
          </span>

          <h2 className="mt-3 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Find The Right <span className="text-red-500">Program</span>
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
              {modeTabs.map((mode) => {
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
                    <img
                      src={program.image}
                      alt={program.title}
                      loading="lazy"
                    />
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
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "10px",
                        background:
                          program.mode === "online" ? "#dcfce7" : "#fef3c7",
                        padding: "3px 8px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color:
                          program.mode === "online" ? "#16a34a" : "#b45309",
                        borderRadius: "20px",
                        border:
                          program.mode === "online"
                            ? "1px solid #bbf7d0"
                            : "1px solid #fde68a",
                        textTransform: "capitalize",
                        zIndex: 2,
                      }}
                    >
                      {program.mode === "online" ? "🟢 Online" : "🟡 Offline"}
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

                    {/* Learners & Duration - Side by Side (AMNE SAMNE) */}
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "14px",
                        justifyContent: "space-between",
                        alignItems: "center",
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
         <button
  type="button"
  onClick={() => setShowApplicationForm(true)}
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
  }}
>
  View Program
</button>
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
    onClick={() => setShowBrochureForm(true)}
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
                    <span className="__overlayDeadline">
                      <Clock size={10} color="#ffd166" />
                      {program.deadline}
                    </span>
                    <p className="__overlayTitle">{program.title}</p>
                    <p className="__overlayText">{program.description}</p>

                    <div className="__overlayInfoRow">
                      <div className="__overlayInfoItem">
                        <div className="__overlayIconCircle">
                          <Users size={12} color="#ffc4ce" />
                        </div>
                        <div>
                          <p className="__overlayLabel">Students</p>
                          <p className="__overlayValue">{program.learners}</p>
                        </div>
                      </div>
                      <div className="__overlayInfoItem">
                        <div className="__overlayIconCircle">
                          <Clock size={12} color="#ffc4ce" />
                        </div>
                        <div>
                          <p className="__overlayLabel">Duration</p>
                          <p className="__overlayValue">{program.duration}</p>
                        </div>
                      </div>
                    </div>

                    <ul className="__overlayList">
                      {program.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={11} color="#4ade80" />
                          {h}
                        </li>
                      ))}
                    </ul>
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