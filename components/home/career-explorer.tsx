"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import { careerExplorerData } from "@/data/career-explorer";

export interface JobRoleItem {
  id?: string;
  heading?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
  ribbonText?: string;
  package?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface CareerExplorerProps {
  jobRoles?: JobRoleItem[];
  title?: string;
}

interface RoleColors {
  bg: string;
  border: string;
  text: string;
}

const colorPalette: RoleColors[] = [
  { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-500" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-500" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-500" },
  { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-500" },
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-500" },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-500" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-500" },
];

const specificMap: Record<string, RoleColors> = {
  "AI & ML Engineer": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  "Software Developer": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  "Data Scientist": { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-500" },
  "Cyber Security Analyst": { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-500" },
  "Cloud Engineer": { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  "Business Analyst": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500" },
  "Product Manager": { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-500" },
  "Project Manager": { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  "Digital Marketing Manager": { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-500" },
  "Financial Analyst": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
};

const getColors = (itemTitle: string, index: number): RoleColors => {
  if (specificMap[itemTitle]) return specificMap[itemTitle];
  return colorPalette[index % colorPalette.length];
};

const CareerExplorer: React.FC<CareerExplorerProps> = ({ jobRoles, title }) => {
  const [showAllCards, setShowAllCards] = useState(false);

  const handleOpenSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-signup"));
    }
  };

  // Normalize items from dynamic jobRoles prop, falling back to static dataset if empty
  const items =
    jobRoles && jobRoles.length > 0
      ? jobRoles.map((r, idx) => ({
          id: r.id || String(idx + 1),
          title: r.heading || r.title || "",
          description: r.description || "",
          ctaText: r.ctaText || "Explore",
          ctaUrl: r.ctaUrl || "",
          image: r.image || `/career/${(idx % 15) + 1}image.png`,
          package: r.ribbonText || r.package || "",
        }))
      : careerExplorerData.map((d) => ({
          id: String(d.id),
          title: d.title,
          description: d.description,
          ctaText: "Explore",
          ctaUrl: "",
          image: d.image,
          package: d.package || "",
        }));

  // Render title with customizable red highlight for words surrounded by *...* or "Job Role"
  const renderTitle = () => {
    const raw = title || "Enhance Skills by *Job Role*";
    if (raw.includes("*")) {
      const parts = raw.split(/\*([^*]+)\*/g);
      return parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-red-500">
            {part}
          </span>
        ) : (
          part
        )
      );
    }
    if (raw.includes("Job Role")) {
      const parts = raw.split("Job Role");
      return (
        <>
          {parts[0]}
          <span className="text-red-500">Job Role</span>
          {parts[1]}
        </>
      );
    }
    return raw;
  };

  return (
    <section className="relative z-10 w-full py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Lightbulb className="h-3.5 w-3.5 text-red-500" />
            Upskill
          </span>

          <h2 className="mt-2 whitespace-nowrap text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {renderTitle()}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {items.map((item, index) => {
            const colors = getColors(item.title, index);

            return (
              <div
                key={item.id || index}
                className={`relative flex flex-col items-center overflow-hidden rounded-[6px] border border-gray-200 bg-white p-2 pt-3 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-md sm:p-3.5 sm:pt-4 ${
                  !showAllCards && index >= 4 ? "hidden lg:flex" : ""
                } ${!showAllCards && index >= 10 ? "lg:hidden" : ""}`}
              >
                {/* Highest Package / Ribbon Badge */}
                {item.package && (
                  <div className="absolute right-2 top-2 z-10 inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-green-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm sm:text-[9px]">
                    <TrendingUp size={9} className="animate-bounce" />
                    {item.package}
                  </div>
                )}

                {/* Image / Icon Container */}
                <div
                  className={`relative mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border sm:h-16 sm:w-16 ${colors.bg} ${colors.border}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>

                {/* Title */}
                <h3 className="mb-1 line-clamp-1 text-xs font-bold text-gray-900 sm:mb-2 sm:text-sm">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mb-2 hidden line-clamp-1 text-[11px] text-gray-600 sm:mb-3 sm:block">
                  {item.description}
                </p>

                {/* Explore Button - opens signup popup until job role pages are built */}
                <button
                  type="button"
                  onClick={handleOpenSignup}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-[11px] font-semibold text-black transition-colors hover:bg-gray-50 sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs cursor-pointer active:scale-95"
                  aria-label={`Explore ${item.title}`}
                >
                  {item.ctaText || "Explore"}
                  <ArrowRight size={12} className="sm:h-3.5 sm:w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* More Cards Button */}
        {items.length > 4 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCards((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md cursor-pointer"
            >
              {showAllCards ? "Show Less" : "Show More"}
              <ArrowRight
                size={15}
                className={`transition-transform duration-300 ${
                  showAllCards ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerExplorer;