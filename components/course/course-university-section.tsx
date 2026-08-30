"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
} from "lucide-react";
import { universities } from "@/data/universities";

const CARDS_PER_PAGE = 3;

export default function CourseUniversitySection({ universities: propUniversities }: { universities?: any[] }) {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const mappedUniversities = useMemo(() => {
    if (propUniversities && propUniversities.length > 0) {
      return propUniversities.map((uni) => ({
        slug: uni.slug.replace(/^\/university\//, "").replace(/^\//, ""),
        name: uni.name,
        image: uni.logoUrl || "",
        badge: uni.nirfRanking ? `NIRF: ${uni.nirfRanking}` : "UGC-DEB",
        badgeColor: "#ee2c3c",
        tag: uni.wesApproval ? "WES Approved" : "100% Online Program",
        tagBg: "#eff6ff",
        tagColor: "#2563eb",
        eligibility: "Bachelor's Degree",
        duration: "24 Months",
      }));
    }
    return universities;
  }, [propUniversities]);

  const universityPages = useMemo(() => {
    const pages = [];

    for (let i = 0; i < mappedUniversities.length; i += CARDS_PER_PAGE) {
      pages.push(mappedUniversities.slice(i, i + CARDS_PER_PAGE));
    }

    return pages;
  }, [mappedUniversities]);

  const currentUniversities = universityPages[page] || [];
  const totalPages = universityPages.length;

  const goPrev = () => {
    setPage((current) => (current === 0 ? totalPages - 1 : current - 1));
  };

  const goNext = () => {
    setPage((current) => (current === totalPages - 1 ? 0 : current + 1));
  };

  const toggleSelect = (key: string) => {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  };

  const handleCompareNow = () => {
    console.log("Comparing:", selected);
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative w-full bg-slate-50/30 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            AI Compare for <span className="text-[#ee2c3c]">Top Universities</span>
          </h2>
          <p className="mt-3 text-sm text-slate-550 max-w-lg mx-auto">
            Select and compare top-tier accredited institutions side-by-side to find the perfect program for your career goals.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-650 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition-all duration-200 hover:text-[#ee2c3c] hover:scale-105 hover:border-slate-200 active:scale-95 lg:flex"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentUniversities.map((university) => {
              const key = university.slug || university.name;
              const isSelected = selected.includes(key);

              return (
                <article
                  key={key}
                  className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
                    isSelected
                      ? "border-[#ee2c3c] bg-rose-50/10 shadow-[0_12px_28px_rgba(238,44,60,0.08)] ring-1 ring-[#ee2c3c]/10"
                      : "border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  {/* Top row: logo + badge & checkbox stack */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 items-center">
                      <Image
                        src={university.image}
                        alt={university.name}
                        width={220}
                        height={60}
                        className="max-h-14 w-auto object-contain"
                      />
                    </div>

                    <div className="flex flex-col items-end gap-2.5 shrink-0">
                      {university.badge ? (
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[9px] font-bold text-white tracking-wider uppercase shadow-sm shrink-0"
                          style={{
                            backgroundColor: university.badgeColor || "#ee2c3c",
                          }}
                        >
                          {university.badge}
                        </span>
                      ) : (
                        <span className="h-4 shrink-0" />
                      )}

                      {/* Checkbox */}
                      <label
                        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition-all duration-200 shadow-sm ${
                          isSelected
                            ? "bg-[#ee2c3c] border-[#ee2c3c] text-white scale-105"
                            : "bg-white border-slate-200 text-transparent hover:border-[#ee2c3c]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(key)}
                          className="sr-only"
                          aria-label={`Select ${university.name} to compare`}
                        />
                        <Check className={`h-3.5 w-3.5 transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} strokeWidth={3} />
                      </label>
                    </div>
                  </div>

                  {/* University name */}
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {university.name}
                  </p>

                  {/* Heading */}
                  <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 line-clamp-2 h-11 flex items-start">
                    Program from {university.name}
                  </h3>

                  {/* Tag pill */}
                  {university.tag && (
                    <div className="mt-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide border"
                        style={{
                          backgroundColor: university.tagBg || "#f0f6ff",
                          color: university.tagColor || "#1e40af",
                          borderColor: (university.tagColor ? `${university.tagColor}15` : "#dbeafe"),
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                        {university.tag}
                      </span>
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <span>{university.eligibility || "Bachelor's Degree"}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                        <Clock className="h-4 w-4" />
                      </div>
                      <span>{university.duration || `${university.courses} Months`}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/universities/${university.slug}`}
                      className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-98"
                    >
                      View Program
                    </Link>
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#ee2c3c] py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#d02534] hover:shadow-md hover:shadow-red-500/10 active:scale-98"
                    >
                      Syllabus
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-650 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition-all duration-200 hover:text-[#ee2c3c] hover:scale-105 hover:border-slate-200 active:scale-95 lg:flex"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-150 bg-white text-slate-650 shadow-sm transition-all duration-200 hover:text-[#ee2c3c] active:scale-95"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-150 bg-white text-slate-650 shadow-sm transition-all duration-200 hover:text-[#ee2c3c] active:scale-95"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

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
      </div>
    </section>
  );
}
