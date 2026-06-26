"use client";

import React, { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface University {
  id: string;
  name: string;
  logo?: string; // URL or initials fallback
  logoText?: string; // short abbrev for fallback avatar
  logoColor?: string; // bg color for fallback
  accreditations: string[];
  reviews: number;
  rating: number;
  highlights: string[];
  hiringPartners?: string;
  students?: string;
  feePerSem: number;
  savings?: number;
  expertPhoto?: string;
  expertLabel?: string;
}

// ── Data: 5 MBA universities ──────────────────────────────────────────────────

export const mbaUniversities: University[] = [
  {
    id: "rushford",
    name: "Rushford Business School",
    logoText: "RBS",
    logoColor: "#1a3a6b",
    accreditations: ["AACSB", "EFMD", "QS Ranked", "Swiss Accredited"],
    reviews: 892,
    rating: 4.5,
    highlights: [
      "Global MBA with Swiss education standards",
      "Dual degree option with European campus",
      "Industry mentorship from Fortune 500 leaders",
    ],
    hiringPartners: "300+ Hiring Partners",
    students: "12,000+ Students",
    feePerSem: 89500,
    savings: 5000,
    expertLabel: "Talk to our experts",
  },
  {
    id: "amity",
    name: "Amity University Online",
    logoText: "AU",
    logoColor: "#8B1A1A",
    accreditations: [
      "UGC-DEB",
      "AICTE",
      "NIRF",
      "WES",
      "QS World University Rankings",
      "DEC",
    ],
    reviews: 1755,
    rating: 4.7,
    highlights: [
      "Saves time by getting a UG+PG Degree in just 4.5 years",
      "Corporate Internship Included for Practical Exposure",
      "Cost-effective Dual Degree Program",
    ],
    hiringPartners: "500+ Hiring Partners",
    students: "1 Lakh+ Students",
    feePerSem: 59300,
    savings: 4000,
    expertLabel: "Talk to our experts",
  },
  {
    id: "gla",
    name: "GLA University Online",
    logoText: "GLA",
    logoColor: "#0057A8",
    accreditations: ["UGC-DEB", "NAAC A+", "AICTE", "AIU"],
    reviews: 643,
    rating: 4.4,
    highlights: [
      "NAAC A+ accredited institution with 25+ years of excellence",
      "Live interactive sessions with industry practitioners",
      "Placement assistance with 400+ corporate tie-ups",
    ],
    hiringPartners: "400+ Hiring Partners",
    students: "50,000+ Students",
    feePerSem: 42000,
    savings: 3000,
    expertLabel: "Talk to our experts",
  },
  {
    id: "chandigarh",
    name: "Chandigarh University Online",
    logoText: "CU",
    logoColor: "#C8102E",
    accreditations: ["UGC-DEB", "NAAC A+", "QS World Ranked", "NIRF Top 50"],
    reviews: 1124,
    rating: 4.6,
    highlights: [
      "QS World Ranked university — top 1000 globally",
      "Industry-integrated curriculum with live projects",
      "Career support & guaranteed interview calls",
    ],
    hiringPartners: "600+ Hiring Partners",
    students: "3 Lakh+ Students",
    feePerSem: 52000,
    savings: 6000,
    expertLabel: "Talk to our experts",
  },
  {
    id: "manipal",
    name: "Manipal University Jaipur",
    logoText: "MUJ",
    logoColor: "#E87722",
    accreditations: ["UGC-DEB", "NAAC A", "AICTE", "NBA", "WES"],
    reviews: 987,
    rating: 4.5,
    highlights: [
      "Ranked among top private universities in India",
      "Experiential learning with real-world case studies",
      "Dedicated alumni network of 1.5 lakh+ professionals",
    ],
    hiringPartners: "450+ Hiring Partners",
    students: "80,000+ Students",
    feePerSem: 47500,
    savings: 2500,
    expertLabel: "Talk to our experts",
  },
];

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span
            key={i}
            className="text-base leading-none"
            style={{ color: filled || half ? "#F5A623" : "#D1D5DB" }}
          >
            {filled ? "★" : half ? "⯨" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

// ── Logo Avatar ───────────────────────────────────────────────────────────────

function LogoAvatar({ uni }: { uni: University }) {
  const [imgError, setImgError] = useState(false);
  if (uni.logo && !imgError) {
    return (
      <img
        src={uni.logo}
        alt={uni.name}
        onError={() => setImgError(true)}
        className="w-16 h-16 object-contain rounded-lg"
      />
    );
  }
  return (
    <div
      className="w-16 h-16 rounded-xl flex items-center justify-center font-extrabold text-white text-sm tracking-tight"
      style={{ backgroundColor: uni.logoColor ?? "#334155" }}
    >
      {uni.logoText ?? uni.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ── Expert CTA ────────────────────────────────────────────────────────────────

function ExpertCTA({ label }: { label?: string }) {
  return (
    <button className="flex items-center gap-2 group">
      {/* stacked avatars placeholder */}
      <div className="flex -space-x-2">
        {["#0EA5E9", "#6366F1"].map((c, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: c }}
          >
            {i === 0 ? "A" : "R"}
          </div>
        ))}
      </div>
      <span className="text-xs font-semibold text-blue-600 group-hover:underline flex items-center gap-0.5">
        {label ?? "Talk to our experts"}
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </button>
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────────

function UniversityCard({
  uni,
  onSelect,
  compareSelected,
  onCompareToggle,
}: {
  uni: University;
  onSelect: (id: string) => void;
  compareSelected: boolean;
  onCompareToggle: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* ── Top row ── */}
      <div className="flex items-start justify-between gap-4 p-5 pb-4">
        {/* Logo + name + accreditations */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="shrink-0">
            <LogoAvatar uni={uni} />
            <p className="text-[10px] text-gray-400 text-center mt-1 max-w-[64px] leading-tight">
              {uni.name.split(" ").slice(0, 2).join(" ")}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-500 font-medium mb-1">
              Accredited by:
            </p>
            <p className="text-sm font-bold text-gray-800 leading-snug">
              {uni.accreditations.join(" | ")}
            </p>
          </div>
        </div>

        {/* Reviews + rating */}
        <div className="shrink-0 text-center">
          <p className="text-xs text-gray-500 mb-1">
            {uni.reviews.toLocaleString()} Reviews
          </p>
          <p className="text-2xl font-extrabold text-gray-900 leading-none">
            {uni.rating.toFixed(1)}
          </p>
          <StarRating rating={uni.rating} />
        </div>

        {/* Expert CTA */}
        <div className="shrink-0 hidden md:flex">
          <ExpertCTA label={uni.expertLabel} />
        </div>
      </div>

      {/* ── Highlights strip ── */}
      <div className="mx-5 mb-4 bg-indigo-50 rounded-xl px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1">
        {uni.highlights.map((h, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-xs text-indigo-800"
          >
            <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            {h}
          </span>
        ))}
      </div>

      {/* ── Bottom row ── */}
      <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
        {/* Pills */}
        {uni.hiringPartners && (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
            {uni.hiringPartners}
          </span>
        )}
        {uni.students && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {uni.students}
          </span>
        )}

        {/* Know in 2 mins */}
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
          </svg>
          Know University in 2 mins
          <svg
            className="w-3 h-3 ml-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Compare */}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <div
            onClick={() => onCompareToggle(uni.id)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${compareSelected ? "bg-emerald-500 border-emerald-500" : "border-gray-300 bg-white"}`}
          >
            {compareSelected && (
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            Compare University
          </span>
        </label>

        {/* Fee CTA */}
        <button
          onClick={() => onSelect(uni.id)}
          className="flex items-center gap-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="bg-blue-700 hover:bg-blue-800 transition-colors text-white text-sm font-bold px-4 py-2.5 flex flex-col leading-tight">
            <span>₹ {uni.feePerSem.toLocaleString("en-IN")}/Sem</span>
            {uni.savings && (
              <span className="text-[10px] font-normal text-emerald-300">
                You save ₹ {uni.savings.toLocaleString("en-IN")} *
              </span>
            )}
          </span>
          <span className="bg-blue-900 text-white px-2.5 py-[22px] self-stretch flex items-center">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

// ── Results List (drop-in replacement for the grid in ResultsScreen) ──────────

export default function UniversityResultsList({
  universities = mbaUniversities,
  onSelect,
}: {
  universities?: University[];
  onSelect?: (id: string) => void;
}) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };

  return (
    <div className="space-y-4">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          uni={uni}
          onSelect={onSelect ?? (() => {})}
          compareSelected={compareList.includes(uni.id)}
          onCompareToggle={toggleCompare}
        />
      ))}

      {compareList.length >= 2 && (
        <div className="sticky bottom-4 flex justify-center">
          <button className="bg-emerald-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            Compare {compareList.length} Universities
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
