"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Handshake,
  IndianRupee,
  Star,
} from "lucide-react";

type CourseTab = "all" | "pg" | "ug" | "specializations" | "certifications";

interface ProgramCardProps {
  id: string;
  tab: CourseTab;
  category: string;
  ribbon: string;
  title: string;
  image: string;
  duration: string;
  fees: string;
  slug: string;
  partner?: string;
}

const courseTabs: { id: CourseTab; label: string }[] = [
  { id: "all", label: "All Courses" },
  { id: "pg", label: "PG Courses" },
  { id: "ug", label: "UG Courses" },
  { id: "specializations", label: "Specializations" },
  { id: "certifications", label: "Certifications" },
];

const programsData: ProgramCardProps[] = [
  {
    id: "mba-healthcare",
    tab: "pg",
    category: "Management",
    ribbon: "Trending",
    title: "MBA in Hospital and Healthcare Management",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    fees: "INR 3,29,000",
    slug: "#",
    partner: "Medvarsity",
  },
  {
    id: "bca-fintech-ai",
    tab: "ug",
    category: "Technology",
    ribbon: "Trending",
    title: "BCA with specialization in Financial Technology and AI",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=900&auto=format&fit=crop&q=80",
    duration: "36 months",
    fees: "INR 2,75,000",
    slug: "#",
    partner: "Paytm",
  },
  {
    id: "mca-fintech-ai",
    tab: "pg",
    category: "Technology",
    ribbon: "Trending",
    title: "MCA with specialization in Financial Technology and AI",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    fees: "INR 2,75,000",
    slug: "#",
    partner: "Paytm",
  },
  {
    id: "mba-dual",
    tab: "pg",
    category: "Management",
    ribbon: "QS Ranked",
    title: "MBA with Dual Specialization",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    fees: "INR 3,29,000",
    slug: "#",
  },
];

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<CourseTab>("all");
  const [activeCategory, setActiveCategory] = useState("Trending");

  const filteredPrograms = useMemo(() => {
    return programsData.filter((program) => {
      const matchesTab = activeTab === "all" || program.tab === activeTab;
      const matchesCategory =
        activeCategory === "Trending"
          ? program.ribbon === "Trending"
          : program.category === activeCategory;

      return matchesTab && matchesCategory;
    });
  }, [activeTab, activeCategory]);

  return (
    <section
      id="programs"
      className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-7xl text-center font-[Inter]">
        <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 sm:text-xs">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Career Ready
          </span>

          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Discover Career-Ready
            <span className="text-red-500"> Online Programs</span>
          </h2>
        </div>

        {/* Tabs: horizontally scrollable on mobile so they never wrap/overflow */}
        <div className="mb-6 -mx-4 flex gap-5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 whitespace-nowrap text-sm font-semibold transition sm:text-base ${
                  isActive
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-slate-500 hover:text-red-500"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <button
            type="button"
            className="absolute -left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-red-500 shadow-md transition hover:border-red-200 hover:bg-red-50 sm:-left-4 sm:flex md:h-11 md:w-11 lg:-left-5"
            aria-label="Previous programs"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <div className="grid grid-cols-1 gap-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPrograms.map((program) => (
              <article
                key={program.id}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_8px_28px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_14px_38px_rgba(239,68,68,0.14)]"
              >
                <div className="absolute left-4 top-0 z-20 sm:left-5">
                  <div className="relative bg-red-500 px-5 py-1 text-xs font-black text-white shadow-sm sm:px-7 sm:text-sm">
                    {program.ribbon}
                    <span className="absolute right-[-14px] top-0 h-0 w-0 border-b-[16px] border-l-[14px] border-t-[16px] border-b-transparent border-l-red-500 border-t-transparent" />
                  </div>
                </div>

                <div className="relative h-44 overflow-hidden rounded-2xl border-2 border-red-100 bg-slate-100 sm:h-52 lg:h-56">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  {program.partner && (
                    <div className="absolute bottom-0 right-0 rounded-tl-2xl bg-white px-3 py-2 shadow-md ring-1 ring-slate-100 sm:px-4 sm:py-3">
                      <p className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
                        In Collaboration with
                      </p>
                      <p className="mt-1 text-[11px] font-black text-red-500 sm:text-xs">
                        {program.partner}
                      </p>
                    </div>
                  )}

                  <div className="absolute left-3 top-11 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow sm:top-12 sm:h-10 sm:w-10">
                    <Star className="h-4 w-4 fill-red-500 text-red-500 sm:h-5 sm:w-5" />
                  </div>
                </div>

                <div className="px-1 pb-1 pt-4 sm:px-2">
                  <h3 className="min-h-[54px] text-lg font-black leading-tight text-gray-900 sm:min-h-[58px] sm:text-xl">
                    {program.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 sm:mt-5 sm:gap-5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <Clock className="h-3.5 w-3.5" />
                      </span>
                      {program.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-red-50 text-red-500">
                        <IndianRupee className="h-3.5 w-3.5" />
                      </span>
                      {program.fees}
                    </div>
                  </div>

                  <Link
                    href={program.slug}
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-red-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-600 sm:py-3 sm:text-base"
                  >
                    Get Brochure
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="absolute -right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-red-500 shadow-md transition hover:border-red-200 hover:bg-red-50 sm:-right-4 sm:flex md:h-11 md:w-11 lg:-right-5"
            aria-label="Next programs"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {filteredPrograms.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-10">
            <p className="font-bold text-slate-500">
              No programs found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
