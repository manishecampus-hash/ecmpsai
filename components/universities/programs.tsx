"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
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
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Discover Career-Ready{" "}
            <span className="text-red-500">Online Programs</span>
          </h2>

          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
          >
            Explore All Programs
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-7">
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-base font-semibold transition ${
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
            className="absolute -left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-red-500 shadow-md transition hover:border-red-200 hover:bg-red-50 lg:flex"
            aria-label="Previous programs"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPrograms.map((program) => (
              <article
                key={program.id}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_8px_28px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_14px_38px_rgba(239,68,68,0.14)]"
              >
                <div className="absolute left-5 top-0 z-20">
                  <div className="relative bg-red-500 px-7 py-1 text-sm font-black text-white shadow-sm">
                    {program.ribbon}
                    <span className="absolute right-[-14px] top-0 h-0 w-0 border-b-[16px] border-l-[14px] border-t-[16px] border-b-transparent border-l-red-500 border-t-transparent" />
                  </div>
                </div>

                <div className="relative h-56 overflow-hidden rounded-2xl border-2 border-red-100 bg-slate-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  {program.partner && (
                    <div className="absolute bottom-0 right-0 rounded-tl-2xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-100">
                      <p className="text-[10px] font-medium text-slate-500">
                        In Collaboration with
                      </p>
                      <p className="mt-1 text-xs font-black text-red-500">
                        {program.partner}
                      </p>
                    </div>
                  )}

                  <div className="absolute left-3 top-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow">
                    <Star className="h-5 w-5 fill-red-500 text-red-500" />
                  </div>
                </div>

                <div className="px-2 pb-1 pt-4">
                  <h3 className="min-h-[58px] text-xl font-black leading-tight text-gray-900">
                    {program.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-5 text-sm font-medium text-slate-500">
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
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
                  >
                    Get Brochure
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="absolute -right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-red-500 shadow-md transition hover:border-red-200 hover:bg-red-50 lg:flex"
            aria-label="Next programs"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {filteredPrograms.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="font-bold text-slate-500">
              No programs found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
