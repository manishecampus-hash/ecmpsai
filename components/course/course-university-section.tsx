"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignupModal } from "@/components/layout/signup-modal";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  Info,
  Plus,
} from "lucide-react";
import { universities } from "@/data/universities";
import { formatINR } from "@/lib/course-helpers";

const INITIAL_VISIBLE_COUNT = 4;

interface CourseUniversitySectionProps {
  universities?: any[];
  courseName?: string;
}

function cleanCourseName(name?: string): string {
  if (!name) return "";
  return name
    .replace(/\s*(?:Course)?\s*[–—-].*$/i, "")
    .replace(/\/(?:Bachelors|Masters|Doctorate)\s+Program/i, "")
    .replace(/\s+Course$/i, "")
    .trim();
}

// Curves for the section backdrop (viewBox 1440×560) and the points where they meet
const UNI_LINES = [
  "M-40 120 C 260 40, 420 220, 720 140 S 1180 40, 1480 130",
  "M-40 300 C 220 220, 480 380, 760 300 S 1220 200, 1480 290",
  "M-40 470 C 300 400, 520 540, 820 450 S 1240 380, 1480 470",
  "M180 -20 C 260 160, 120 360, 240 580",
  "M1240 -20 C 1160 180, 1320 380, 1200 580",
];
const UNI_NODES: [number, number][] = [
  [248, 156], [720, 140], [1180, 98], [212, 258], [1288, 286], [820, 450], [232, 470], [1214, 432],
];

/** Logged-in student check (same rule as the rest of the site: a stored student with id / phone / email) */
function isStudentLoggedIn() {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("ecampus_student");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && (parsed.id || parsed.phone || parsed.email));
  } catch {
    return false;
  }
}

/** Gap kept between the floating Compare button and the course quick-action bar (px) */
const COMPARE_BAR_GAP = 16;
/** Default distance from the bottom when the quick-action bar is hidden (= bottom-8) */
const COMPARE_DEFAULT_BOTTOM = 32;
/** How long the "add one more university" hint stays on screen (ms) */
const COMPARE_HINT_MS = 7000;

export default function CourseUniversitySection({
  universities: propUniversities,
  courseName,
}: CourseUniversitySectionProps) {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selected, setSelected] = useState<string[]>([]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  /** Bottom offset of the floating Compare button, lifted above the course quick-action bar when it shows */
  const [compareBottom, setCompareBottom] = useState(COMPARE_DEFAULT_BOTTOM);
  /** Hint shown at the top of the screen after the first university is added to AI Compare */
  const [showCompareHint, setShowCompareHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (hintTimer.current) clearTimeout(hintTimer.current);
  }, []);

  useEffect(() => {
    const measure = (visible: boolean) => {
      const bar = document.querySelector<HTMLElement>('[aria-label="Course Quick Action Bar"]');
      const height = visible && bar ? bar.getBoundingClientRect().height : 0;
      setCompareBottom(height > 0 ? Math.ceil(height) + COMPARE_BAR_GAP : COMPARE_DEFAULT_BOTTOM);
    };
    const onToggle = (e: Event) => measure(Boolean((e as CustomEvent).detail?.isVisible));
    const onResize = () => measure(document.body.classList.contains("course-popup-active"));

    measure(document.body.classList.contains("course-popup-active"));
    window.addEventListener("course-popup-toggle", onToggle);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("course-popup-toggle", onToggle);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const defaultCourseTitle = cleanCourseName(courseName) || "Program";

  const mappedUniversities = useMemo(() => {
    if (propUniversities && propUniversities.length > 0) {
      return propUniversities.map((uni) => {
        const startFee = uni.startingFee ?? uni.feeRange?.start ?? null;
        let feeText = "";
        if (startFee && typeof startFee === "number" && startFee > 0) {
          feeText = `Starts at ${formatINR(startFee)}`;
        } else if (typeof startFee === "string" && startFee.trim()) {
          feeText = `Starts at ${startFee}`;
        } else {
          feeText = "Affordable EMI";
        }

        return {
          slug: uni.slug ? uni.slug.replace(/^\/university\//, "").replace(/^\//, "") : "",
          name: uni.name,
          image: uni.logoUrl || "",
          badge: uni.nirfRanking ? `NIRF: ${uni.nirfRanking}` : "UGC-DEB",
          badgeColor: "#ee2c3c",
          startingFeeText: feeText,
          category: uni.category || "Degree",
          duration: uni.duration || "24 Months",
          courseName: uni.courseName || defaultCourseTitle,
          courseSlug: uni.courseSlug || (uni.slug ? `/universities/${uni.slug.replace(/^\/university\//, "").replace(/^\//, "")}` : ""),
        };
      });
    }
    return universities.map((u) => ({
      ...u,
      category: "Degree",
      duration: `${u.courses || 24} Months`,
      courseName: defaultCourseTitle,
      courseSlug: u.slug ? `/universities/${u.slug}` : "",
      badge: "UGC-DEB",
      badgeColor: "#ee2c3c",
      startingFeeText: "Affordable EMI",
    }));
  }, [propUniversities, defaultCourseTitle]);

  const visibleUniversities = useMemo(() => {
    return mappedUniversities.slice(0, visibleCount);
  }, [mappedUniversities, visibleCount]);

  const hasMore = visibleCount < mappedUniversities.length;
  const canCollapse = visibleCount > INITIAL_VISIBLE_COUNT;

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, mappedUniversities.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const toggleSelect = (key: string) => {
    const removing = selected.includes(key);
    const next = removing ? selected.filter((item) => item !== key) : [...selected, key];
    setSelected(next);

    // Only the first pick asks for a second one; any other change clears the hint
    if (hintTimer.current) clearTimeout(hintTimer.current);
    if (!removing && next.length === 1) {
      setShowCompareHint(true);
      hintTimer.current = setTimeout(() => setShowCompareHint(false), COMPARE_HINT_MS);
    } else {
      setShowCompareHint(false);
    }
  };

  const handleCompareNow = useCallback(() => {
    if (selected.length < 2) return;

    // The AI chat is for logged-in students only — ask logged-out visitors to log in / sign up first
    if (!isStudentLoggedIn()) {
      setShowSignupModal(true);
      return;
    }

    // Preserve the user's selection order
    const selectedUnis = selected
      .map((selKey) =>
        mappedUniversities.find((u) => (u.slug || u.name) === selKey)
      )
      .filter(Boolean) as typeof mappedUniversities;

    const uniNames = selectedUnis.map((u) => u.name).filter(Boolean);
    if (uniNames.length < 2) return;

    // Identify target course being compared
    const targetCourse =
      cleanCourseName(courseName) ||
      selectedUnis[0]?.courseName ||
      defaultCourseTitle ||
      "";

    // Build the query: "Compare Uni A vs Uni B for Course"
    const compareQuery = targetCourse
      ? `Compare ${uniNames.join(" vs ")} for ${targetCourse}`
      : `Compare ${uniNames.join(" vs ")}`;

    // `from` lets the AI chat show a Back button that returns to this compare section
    const from = `${window.location.pathname}#university-section`;
    router.push(`/search?q=${encodeURIComponent(compareQuery)}&from=${encodeURIComponent(from)}`);
  }, [selected, mappedUniversities, courseName, defaultCourseTitle, router]);

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative isolate w-full overflow-hidden bg-slate-50/30 px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      {/* Backdrop: thin flowing lines with light travelling along them */}
      <svg
        aria-hidden
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <defs>
          <linearGradient id="uni-line" x1="0" x2="1">
            <stop offset="0" stopColor="#ee2c3c" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ee2c3c" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ee2c3c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {UNI_LINES.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#uni-line)" strokeWidth="1" />
            <path d={d} fill="none" stroke="#ee2c3c" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" pathLength={100} strokeDasharray="6 94" className="uni-flow" style={{ animationDelay: `${i * -1.6}s`, animationDuration: `${7 + i}s` }} />
          </g>
        ))}
        {UNI_NODES.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3" fill="#ee2c3c" fillOpacity="0.45" />
            <circle cx={cx} cy={cy} r="3" fill="none" stroke="#ee2c3c" strokeOpacity="0.35" className="uni-pulse" style={{ animationDelay: `${i * 0.7}s` }} />
          </g>
        ))}
      </svg>
      <style>{`
        @keyframes uni-flow { from { stroke-dashoffset: 100 } to { stroke-dashoffset: 0 } }
        @keyframes uni-pulse { 0% { r: 3; stroke-opacity: .45 } 100% { r: 14; stroke-opacity: 0 } }
        .uni-flow { animation: uni-flow linear infinite; }
        .uni-pulse { animation: uni-pulse 2.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .uni-flow, .uni-pulse { animation: none; } }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            AI Compare for <span className="text-[#ee2c3c]">Top Universities</span>
          </h2>

          {/* Highlighted Dynamic Universities Count Badge */}
          {mappedUniversities.length > 0 && (
            <div className="mt-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 py-2 shadow-2xs font-quicksand transition-all duration-200 hover:border-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-700">
                  <span className="font-extrabold text-[#ee2c3c] text-sm sm:text-base mr-1">
                    {mappedUniversities.length}
                  </span>
                  <span className="font-bold text-slate-900">
                    {mappedUniversities.length === 1 ? "university" : "universities"}
                  </span>{" "}
                  <span className="text-slate-500 font-medium">
                    found offering this course
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 4 Cards in a Row Grid */}
        <div className="grid grid-cols-1 gap-4 px-3 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
          {visibleUniversities.map((university) => {
            const key = university.slug || university.name;
            const isSelected = selected.includes(key);

            return (
              <article
                key={key}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-[#ee2c3c] bg-rose-50/10 shadow-[0_8px_24px_rgba(238,44,60,0.08)] ring-1 ring-[#ee2c3c]/15"
                    : "border-slate-150 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                }`}
              >
                <div>
                  {/* Top row: logo + badge & checkbox stack */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex h-11 items-center">
                      <Image
                        src={university.image}
                        alt={university.name}
                        width={160}
                        height={44}
                        className="max-h-9 w-auto max-w-[125px] object-contain"
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {university.badge && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[8.5px] font-bold text-white tracking-wider uppercase shadow-xs shrink-0"
                          style={{
                            backgroundColor: university.badgeColor || "#ee2c3c",
                          }}
                        >
                          {university.badge}
                        </span>
                      )}

                      {/* Checkbox */}
                      <label
                        className={`flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-md border transition-all duration-200 shadow-xs ${
                          isSelected
                            ? "bg-[#ee2c3c] border-[#ee2c3c] text-white scale-105"
                            : "bg-white border-slate-250 text-transparent hover:border-[#ee2c3c]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(key)}
                          className="sr-only"
                          aria-label={`Select ${university.name} to compare`}
                        />
                        <Check className={`h-3 w-3 transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} strokeWidth={3} />
                      </label>
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-slate-900 sm:min-h-[2.5rem]">
                    {university.courseName || defaultCourseTitle} from {university.name}
                  </h3>
                </div>

                <div>
                  {/* Meta info: starting fee | category | duration in one compact row */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[10.5px] font-semibold text-slate-800">
                    {university.startingFeeText && (
                      <>
                        <span className="inline-flex min-w-0 shrink items-center gap-1 rounded-md border border-emerald-200/70 bg-emerald-50/90 px-1.5 py-0.5 font-bold tracking-tight text-emerald-700">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span className="truncate">{university.startingFeeText}</span>
                        </span>
                        <span aria-hidden className="h-3.5 w-px shrink-0 bg-slate-200" />
                      </>
                    )}
                    <span className="flex min-w-0 shrink items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">{university.category || "Degree"}</span>
                    </span>
                    <span aria-hidden className="h-3.5 w-px shrink-0 bg-slate-200" />
                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span>{university.duration || "24 Months"}</span>
                    </span>
                  </div>

                  {/* CTA button */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => toggleSelect(key)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-bold transition-all duration-200 active:scale-98 shadow-2xs ${
                        isSelected
                          ? "border-[#ea384c] bg-[#ea384c] text-white shadow-sm shadow-red-500/20"
                          : "border-[#ea384c] bg-white text-[#ea384c] hover:bg-[#ea384c] hover:text-white"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                      )}
                      <span>{isSelected ? "Added to AI Compare" : "AI Compare"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {(hasMore || canCollapse) && (
          <div className="mt-9 flex justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={handleSeeMore}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all duration-200 hover:border-[#ee2c3c] hover:text-[#ee2c3c] hover:shadow-sm active:scale-98"
              >
                <span>See More Universities ({mappedUniversities.length - visibleCount} more)</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all duration-200 hover:border-[#ee2c3c] hover:text-[#ee2c3c] hover:shadow-sm active:scale-98"
              >
                <span>Show Less</span>
                <ChevronUp className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Compare Now button */}
        {selected.length >= 2 && (
          <div
            className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 animate-slide-up transition-[bottom] duration-300 ease-out"
            // Sits above the course quick-action bar ("… Complete 2026 Guide") instead of covering it
            style={{ bottom: compareBottom }}
          >
            <button
              type="button"
              onClick={handleCompareNow}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-[#ee2c3c] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(238,44,60,0.35)] transition-all duration-300 hover:bg-[#d02534] hover:scale-105 active:scale-95 hover:shadow-[0_16px_36px_rgba(238,44,60,0.45)]"
            >
              Compare Now ({selected.length})
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        )}

        {/* First pick: ask for one more university */}
        <AnimatePresence>
          {showCompareHint && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-none fixed inset-x-0 top-20 z-[100] flex justify-center px-4"
            >
              <div className="flex max-w-sm items-center gap-2.5 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(15,23,42,0.6)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c]">
                  <Info className="h-3.5 w-3.5" />
                </span>
                Added to AI Compare. Add at least one more university to compare.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signup Modal */}
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => setShowSignupModal(false)}
        />
      </div>
    </section>
  );
}
