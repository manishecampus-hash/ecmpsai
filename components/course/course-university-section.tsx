"use client";

import { useMemo, useState } from "react";
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
  Sparkles,
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

export default function CourseUniversitySection({
  universities: propUniversities,
  courseName,
}: CourseUniversitySectionProps) {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selected, setSelected] = useState<string[]>([]);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  };

  const handleCompareNow = () => {
    if (selected.length < 2) return;

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

    router.push(`/search?q=${encodeURIComponent(compareQuery)}`);
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative w-full bg-slate-50/30 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                  {/* University name */}
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    {university.name}
                  </p>

                  {/* Heading */}
                  <h3 className="mt-1 text-sm font-bold leading-snug text-slate-900 line-clamp-2 h-10 flex items-start">
                    {university.courseName || defaultCourseTitle} from {university.name}
                  </h3>

                  {/* Starting Fees Pill (in place of WES Approved) */}
                  {university.startingFeeText && (
                    <div className="mt-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50/90 px-2.5 py-0.5 text-[10.5px] font-bold tracking-tight text-emerald-700 border border-emerald-200/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{university.startingFeeText}</span>
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {/* Meta info: Category & Duration in a single compact row */}
                  <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-1.5 truncate max-w-[55%]">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{university.category || "Degree"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{university.duration || "24 Months"}</span>
                    </div>
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
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                      <span>AI Compare</span>
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
          <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center px-4 animate-slide-up">
            <button
              type="button"
              onClick={handleCompareNow}
              className="flex items-center gap-2.5 rounded-full bg-[#ee2c3c] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(238,44,60,0.35)] transition-all duration-300 hover:bg-[#d02534] hover:scale-105 active:scale-95 hover:shadow-[0_16px_36px_rgba(238,44,60,0.45)]"
            >
              Compare Now ({selected.length})
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        )}

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
