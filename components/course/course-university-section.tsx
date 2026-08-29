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
      className="relative w-full bg-white px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            AI Compare for
            <span className="text-[#ee2c3c]"> Top Universities</span>
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition lg:flex"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentUniversities.map((university) => {
              const key = university.slug || university.name;
              const isSelected = selected.includes(key);

              return (
                <article
                  key={key}
                  className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.10)] ${
                    isSelected
                      ? ""
                      : "border-slate-200"
                  }`}
                >
                  {/* Top row: logo + badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-20 items-center">
                      <Image
                        src={university.image}
                        alt={university.name}
                        width={280}
                        height={80}
                        className="max-h-20 w-auto object-contain"
                      />
                    </div>

                    {university.badge && (
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold text-white"
                        style={{
                          backgroundColor:
                            university.badgeColor || "#ee2c3c",
                        }}
                      >
                        {university.badge}
                      </span>
                    )}
                  </div>

                  {/* Checkbox */}
                  <label
                    className="absolute right-4 top-14 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-slate-300 bg-white shadow-sm transition hover:border-red-300"
                    style={
                      isSelected
                        ? { backgroundColor: "#ee2c3c", borderColor: "#ee2c3c" }
                        : undefined
                    }
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(key)}
                      className="sr-only"
                      aria-label={`Select ${university.name} to compare`}
                    />
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    )}
                  </label>

                  {/* University name */}
                  <p className="mt-3 text-sm text-slate-500">
                    {university.name}
                  </p>

                  {/* Heading */}
                  <h3 className="mt-1 text-lg font-bold leading-snug text-slate-950">
                    Program from {university.name}
                  </h3>

                  {/* Tag pill */}
                  {university.tag && (
                    <span
                      className="mt-3 inline-block w-fit rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor: university.tagBg || "#eff6ff",
                        color: university.tagColor || "#2563eb",
                      }}
                    >
                      {university.tag}
                    </span>
                  )}

                  {/* Meta info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <GraduationCap className="h-4 w-4 text-slate-500" />
                      <span>{university.eligibility || "Bachelor's Degree"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{university.duration || `${university.courses} Months`}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/universities/${university.slug}`}
                      className="flex-1 text-center rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                    >
                      View Program
                    </Link>
                    <button
                      type="button"
                      className="flex-grow-0 flex-shrink-0 flex-1 rounded-lg bg-[#ee2c3c] py-2.5 text-sm font-semibold text-white transition"
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
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition lg:flex"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        {/* Compare Now button */}
        {selected.length >= 2 && (
          <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
            <button
              type="button"
              onClick={handleCompareNow}
              className="flex items-center gap-2 rounded-full bg-[#ee2c3c] px-6 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(238,44,60,0.4)] transition"
            >
              Compare Now ({selected.length})
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
