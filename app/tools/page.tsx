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
  ShieldCheck,
  Smartphone,
  Target,
  Zap,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// THEME PALETTE
// Each calculator is assigned one of these themes (cycled in order). The
// card header itself stays neutral/uses your image — these colours only
// drive the title text and the "Calculate Now" button below it.
// ---------------------------------------------------------------------------
const themes = [
  {
    name: "red",
    text: "text-red-600",
    border: "border-red-500",
    borderSoft: "border-red-200",
  },
  {
    name: "orange",
    text: "text-orange-600",
    border: "border-orange-400",
    borderSoft: "border-orange-200",
  },
  {
    name: "blue",
    text: "text-blue-700",
    border: "border-blue-500",
    borderSoft: "border-blue-200",
  },
  {
    name: "purple",
    text: "text-purple-700",
    border: "border-purple-500",
    borderSoft: "border-purple-200",
  },
  {
    name: "green",
    text: "text-green-700",
    border: "border-green-500",
    borderSoft: "border-green-200",
  },
  {
    name: "pink",
    text: "text-pink-600",
    border: "border-pink-500",
    borderSoft: "border-pink-200",
  },
  {
    name: "teal",
    text: "text-teal-700",
    border: "border-teal-500",
    borderSoft: "border-teal-200",
  },
  {
    name: "flame",
    text: "text-orange-700",
    border: "border-orange-500",
    borderSoft: "border-orange-200",
  },
] as const;

// ---------------------------------------------------------------------------
// CALCULATORS
// `image` is OPTIONAL — drop a file into /public (e.g. /public/tools/bmi.png)
// and set its path here. Leave it blank/undefined to fall back to the icon.
// ---------------------------------------------------------------------------
const calculators = [
  {
    slug: "inches-to-centimeters",
    title: "Inches to Centimeters Conversion",
    cardTitle: "Inches to Centimeters Conversion",
    description: "Convert inches to centimeters quickly and accurately.",
    icon: Ruler,
    image: "/tools/inchase.png", // e.g. "/tools/inches-to-cm.png"
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
  { icon: Zap, title: "Lightning Fast", desc: "Get results in seconds" },
  {
    icon: Target,
    title: "Highly Accurate",
    desc: "Precise & reliable calculations",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your data is 100% safe",
  },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Works on all devices" },
];

const ToolsPage = () => {
  const [query, setQuery] = useState("");

  const filteredCalculators = useMemo(() => {
    return calculators.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      {/* Header */}
      <section className="mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] font-bold tracking-wide text-red-600">
          <span className="h-px w-6 bg-red-400" />
          SMART TOOLS FOR SMARTER YOU
          <span className="h-px w-6 bg-red-400" />
        </div>

        <h1 className="mt-3 text-2xl font-extrabold text-gray-950 md:text-3xl">
          Academic &amp; Daily Use{" "}
          <span className="text-red-600">Calculators</span>
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Fast. Accurate. Always Reliable.
        </p>

        <div className="relative mx-auto mt-6 flex max-w-xl items-center">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 text-gray-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculator..."
            className="h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-28 text-sm text-gray-700 shadow-sm outline-none focus:border-red-400"
          />
          <button className="absolute right-1.5 h-8 rounded-full bg-red-600 px-5 text-xs font-semibold text-white hover:bg-red-700">
            Search
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCalculators.map((item, index) => {
          const Icon = item.icon;
          const theme = themes[index % themes.length];

          return (
            <Link
              key={item.slug}
              href={`/tools/${item.slug}`}
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Header — drop a full banner image (with its own title baked in,
                  like your "Inches to Centimeters" banner) into item.image.
                  No colour fill or overlay is added here; the image speaks
                  for itself. Until an image is set, a plain neutral
                  placeholder with the icon + title is shown instead. */}
              <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-start justify-center gap-2 px-4">
                    <Icon size={26} className="text-slate-400" />
                    <h2 className="text-[13px] font-bold leading-snug text-slate-500">
                      {item.title}
                    </h2>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-5">
                <h3 className={`text-[14px] font-bold ${theme.text}`}>
                  {item.cardTitle}
                </h3>
                <p className="text-[12px] leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <div
                  className={`mt-1 flex items-center justify-center gap-2 rounded-md border ${theme.border} px-4 py-2 text-[12px] font-semibold ${theme.text} transition-colors duration-300 group-hover:bg-slate-50`}
                >
                  <span>Calculate Now</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {filteredCalculators.length === 0 && (
        <p className="mt-10 text-center text-sm font-semibold text-gray-500">
          No calculator found.
        </p>
      )}

      {/* Trust bar */}
      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4">
        {trustBar.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-900">{title}</p>
              <p className="text-[11px] text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ToolsPage;
