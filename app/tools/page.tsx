"use client";

import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Calculator,
  GraduationCap,
  Landmark,
  Percent,
  Ruler,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// CALCULATORS LIST
// ---------------------------------------------------------------------------
const calculators = [
  {
    slug: "inches-to-centimeters",
    title: "Inches to Centimeters Conversion",
    cardTitle: "Inches to Centimeters Conversion",
    description: "Convert inches to centimeters quickly and accurately.",
    icon: Ruler,
    image: "/tools/inchase.png",
  },
  {
    slug: "online-university-roi",
    title: "Online University ROI Calculator",
    cardTitle: "Online University ROI Calculator",
    description:
      "Estimate online degree cost and payback based on future income.",
    icon: GraduationCap,
    image: "/tools/onlineu.png",
  },
  {
    slug: "gpa-to-percentage",
    title: "GPA to Percentage Calculator",
    cardTitle: "GPA to Percentage Calculator",
    description:
      "Convert GPA scores into percentage equivalent for academic use.",
    icon: Calculator,
    image: "/tools/gpa.png",
  },
  {
    slug: "sgpa-to-percentage",
    title: "SGPA to Percentage Calculator",
    cardTitle: "SGPA to Percentage Calculator",
    description:
      "Convert SGPA values into percentage equivalent for academic use.",
    icon: Percent,
    image: "/tools/sgpa.png",
  },
  {
    slug: "cgpa-to-percentage",
    title: "CGPA to Percentage Calculator",
    cardTitle: "CGPA to Percentage Calculator",
    description:
      "Convert CGPA scores into percentage equivalent for academic use.",
    icon: Calculator,
    image: "/tools/cgp.png",
  },
  {
    slug: "bmi",
    title: "BMI Calculator",
    cardTitle: "BMI Calculator",
    description: "Calculate body mass index using your height and weight.",
    icon: WalletCards,
    image: "/tools/bmi.png",
  },
  {
    slug: "age",
    title: "Age Calculator",
    cardTitle: "Age Calculator",
    description: "Calculate exact age in years, months, and days.",
    icon: Calculator,
    image: "/tools/agee.png",
  },
  {
    slug: "inr-to-usd",
    title: "INR to USD Converter",
    cardTitle: "INR to USD Converter",
    description: "Convert Indian Rupees to US Dollars in real-time.",
    icon: Landmark,
    image: "/tools/inr.png",
  },
  {
    slug: "fraction",
    title: "Fraction Calculator",
    cardTitle: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions.",
    icon: Calculator,
    image: "/tools/fraction.png",
  },
  {
    slug: "gallon-to-liter",
    title: "Gallon to Liter Calculator",
    cardTitle: "Gallon to Liter Calculator",
    description: "Convert gallons to liters.",
    icon: Calculator,
    image: "/tools/gallon.png",
  },
  {
    slug: "meters-to-feet",
    title: "Meters to Feet Converter",
    cardTitle: "Meters to Feet Converter",
    description: "Convert meters to feet instantly.",
    icon: Ruler,
    image: "/tools/meters.png",
  },
  {
    slug: "percentage",
    title: "Percentage Calculator",
    cardTitle: "Percentage Calculator",
    description: "Calculate percentages, increase, and decrease.",
    icon: Percent,
    image: "",
  },
  {
    slug: "feet-to-centimeter",
    title: "Feet to Centimeter Calculator",
    cardTitle: "Feet to Centimeter Calculator",
    description: "Convert feet to centimeters.",
    icon: Ruler,
    image: "",
  },
  {
    slug: "kilometer-to-mile",
    title: "Kilometer to Mile Calculator",
    cardTitle: "Kilometer to Mile Calculator",
    description: "Convert kilometers to miles.",
    icon: Ruler,
    image: "",
  },
  {
    slug: "sq-ft-to-sq-meter",
    title: "Sq Ft to Sq Meter Converter",
    cardTitle: "Sq Ft to Sq Meter Converter",
    description: "Convert square feet to square meters.",
    icon: Ruler,
    image: "",
  },
];

const trustBar = [
  { icon: Zap, title: "Lightning Fast" },
  { icon: Target, title: "Highly Accurate" },
  { icon: ShieldCheck, title: "Secure & Private" },
  { icon: Smartphone, title: "Mobile Friendly" },
];

export default function ToolsPage() {
  const [query, setQuery] = useState("");

  const filteredCalculators = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calculators;
    return calculators.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.cardTitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle ambient blur orbs */}
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-100/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-rose-100/20 blur-3xl" />

        <div className="max-w-7xl mx-auto">
          {/* ── Section Header ── */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200/60 bg-red-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600 shadow-2xs">
              <Sparkles className="h-3 w-3 text-red-500" />
              Free Academic &amp; Utility Tools
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl lg:text-4xl">
              Academic &amp; Daily Use <span className="text-red-500">Calculators</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
              Fast, accurate, and completely free calculators designed for students, educators, and professionals.
            </p>
            <div className="h-1 w-12 bg-red-500 mx-auto mt-3.5 rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
          </div>

          {/* ── Search & Filter Controls ── */}
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            {/* Search Box */}
            <div className="relative flex items-center">
              <Search className="absolute left-5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators (e.g. GPA, BMI, SGPA, Percentage, Inches)..."
                className="w-full pl-12 pr-11 py-3.5 rounded-full border border-slate-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {trustBar.map((item) => (
                <div
                  key={item.title}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white text-slate-600 border border-slate-200/80 shadow-2xs"
                >
                  <item.icon className="h-3 w-3 text-red-500 shrink-0" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            {/* Result Count Status */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <span>
                Showing <strong className="text-slate-800 font-bold">{filteredCalculators.length}</strong> {filteredCalculators.length === 1 ? "calculator" : "calculators"}
              </span>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-red-500 hover:text-red-600 font-semibold underline ml-1"
                >
                  Reset search
                </button>
              )}
            </div>
          </div>

          {/* ── Calculators Cards Grid ── */}
          {filteredCalculators.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto rounded-2xl bg-white border border-slate-200/80 p-8 shadow-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-bold text-slate-800">No calculators found</p>
              <p className="text-xs text-slate-500 mt-1">
                We couldn&apos;t find any calculators matching &quot;{query}&quot;.
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredCalculators.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.slug}
                    href={`/tools/${item.slug}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white hover:border-red-400/80 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 relative"
                  >
                    {/* Visual Banner / Icon */}
                    <div className="relative h-32 w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100/70">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200/70 shadow-2xs text-red-500 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2 min-h-[38px]">
                          {item.cardTitle}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px]">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 py-2 px-3.5 text-xs font-bold text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                          <span>Calculate Now</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
