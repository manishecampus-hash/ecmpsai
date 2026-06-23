"use client";

import {
  ArrowRight,
  BookOpen,
  Calculator,
  GraduationCap,
  Landmark,
  Percent,
  Ruler,
  Search,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const calculators = [
  {
    slug: "inches-to-centimeters",
    title: "Inches to Centimeters Conversion",
    description: "Convert inches to centimeters quickly and accurately.",
    icon: Ruler,
  },
  {
    slug: "online-university-roi",
    title: "Online University ROI Calculator",
    description: "Estimate online degree cost and payback value.",
    icon: GraduationCap,
  },
  {
    slug: "gpa-to-percentage",
    title: "GPA to Percentage Calculator",
    description: "Convert GPA scores into percentage equivalents.",
    icon: Calculator,
  },
  {
    slug: "sgpa-to-percentage",
    title: "SGPA to Percentage Calculator",
    description: "Convert SGPA values into percentage equivalents.",
    icon: Percent,
  },
  {
    slug: "cgpa-to-percentage",
    title: "CGPA to Percentage Calculator",
    description: "Convert CGPA scores into percentage equivalents.",
    icon: Calculator,
  },
  {
    slug: "bmi",
    title: "BMI Calculator",
    description: "Calculate body mass index using height and weight.",
    icon: WalletCards,
  },
  {
    slug: "age",
    title: "Age Calculator",
    description: "Calculate exact age in years, months, and days.",
    icon: Calculator,
  },
  {
    slug: "inr-to-usd",
    title: "INR to USD Converter",
    description: "Convert Indian Rupees to US Dollars.",
    icon: Landmark,
  },
  {
    slug: "fraction",
    title: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions.",
    icon: Calculator,
  },
  {
    slug: "gallon-to-liter",
    title: "Gallon to Liter Calculator",
    description: "Convert gallons to liters.",
    icon: Calculator,
  },
  {
    slug: "meters-to-feet",
    title: "Meters to Feet Converter",
    description: "Convert meters to feet instantly.",
    icon: Ruler,
  },
  {
    slug: "percentage",
    title: "Percentage Calculator",
    description: "Calculate percentages, increase, and decrease.",
    icon: Percent,
  },
  {
    slug: "feet-to-centimeter",
    title: "Feet to Centimeter Calculator",
    description: "Convert feet to centimeters.",
    icon: Ruler,
  },
  {
    slug: "kilometer-to-mile",
    title: "Kilometer to Mile Calculator",
    description: "Convert kilometers to miles.",
    icon: Ruler,
  },
  {
    slug: "sq-ft-to-sq-meter",
    title: "Sq Ft to Sq Meter Converter",
    description: "Convert square feet to square meters.",
    icon: Ruler,
  },
];

const ToolsPage = () => {
  const [query, setQuery] = useState("");

  const filteredCalculators = useMemo(() => {
    return calculators.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <main className="min-h-screen  px-4 py-10">
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-2xl font-extrabold text-gray-950 md:text-3xl">
          Academic & Daily Use Calculators
        </h1>

        <div className="mx-auto mt-3 inline-flex rounded-sm bg-red-600 px-4 py-1 text-[11px] font-bold text-white">
          Easy | Fast | Accurate
        </div>

        <div className="relative mx-auto mt-5 max-w-xl">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculator..."
            className="h-8 w-full border border-gray-300 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-red-500"
          />
        </div>
      </section>

      <section className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCalculators.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.slug}
              className="overflow-hidden border border-gray-400 bg-white shadow-[3px_3px_0_rgba(0,0,0,0.18)]"
            >
              <div className="flex h-[86px] items-center justify-between bg-black px-4 text-white">
                <h2 className="max-w-[135px] text-[15px] font-extrabold leading-tight">
                  {item.title}
                </h2>
                <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-white/25 bg-white/15">
                  <Icon size={32} />
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-[13px] font-extrabold text-red-600">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-[48px] text-[11px] leading-5 text-gray-600">
                  {item.description}
                </p>

                <Link
                  href={`/tools/${item.slug}`}
                  className="mt-4 flex h-8 items-center justify-center gap-2 border border-gray-800 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                >
                  Calculate Now
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {filteredCalculators.length === 0 && (
        <p className="mt-10 text-center text-sm font-semibold text-gray-500">
          No calculator found.
        </p>
      )}
    </main>
  );
};

export default ToolsPage;
