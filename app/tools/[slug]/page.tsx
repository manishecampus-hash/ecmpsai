"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  GraduationCap,
  HelpCircle,
  Home,
  Info,
  Landmark,
  Percent,
  RotateCcw,
  Ruler,
  Scissors,
  ShoppingBag,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";

const calculatorTitles: Record<string, string> = {
  "inches-to-centimeters": "Inch to Centimeter Calculator",
  "online-university-roi": "Online University ROI Calculator",
  "gpa-to-percentage": "GPA to Percentage Calculator",
  "sgpa-to-percentage": "SGPA to Percentage Calculator",
  "cgpa-to-percentage": "CGPA to Percentage Calculator",
  bmi: "BMI Calculator",
  age: "Age Calculator",
  "inr-to-usd": "INR to USD Converter",
  fraction: "Fraction Calculator",
  "gallon-to-liter": "Gallon to Liter Calculator",
  "meters-to-feet": "Meters to Feet Converter",
  percentage: "Percentage Calculator",
  "feet-to-centimeter": "Feet to Centimeter Calculator",
  "kilometer-to-mile": "Kilometer to Mile Calculator",
  "sq-ft-to-sq-meter": "Sq Ft to Sq Meter Converter",
};

const conversionRows = [
  ["1 inch", "2.54 cm"],
  ["2 inches", "5.08 cm"],
  ["3 inches", "7.62 cm"],
  ["4 inches", "10.16 cm"],
  ["5 inches", "12.7 cm"],
  ["6 inches", "15.24 cm"],
  ["8 inches", "20.32 cm"],
  ["10 inches", "25.4 cm"],
  ["12 inches", "30.48 cm"],
  ["15 inches", "38.1 cm"],
  ["20 inches", "50.8 cm"],
  ["24 inches", "60.96 cm"],
];

const popularCourses = [
  "Online B.Com",
  "Online M.Com",
  "Online B.Sc",
  "Online M.Sc",
  "Online BA",
  "Online MA",
  "Online BBA",
  "Online MCA",
  "Online BCA",
  "Online MBA",
];

const relatedCalculatorsData = [
  { name: "Inch to Centimeter Calculator", slug: "inches-to-centimeters" },
  { name: "Online University ROI Calculator", slug: "online-university-roi" },
  { name: "GPA To Percentage Calculator", slug: "gpa-to-percentage" },
  { name: "SGPA to Percentage Calculator", slug: "sgpa-to-percentage" },
  { name: "BMI Calculator", slug: "bmi" },
  { name: "Age Calculator", slug: "age" },
  { name: "INR to USD Converter", slug: "inr-to-usd" },
  { name: "Fraction Calculator", slug: "fraction" },
  { name: "Convert Gallon Into Liter", slug: "gallon-to-liter" },
  { name: "Meters & Feet Converter", slug: "meters-to-feet" },
  { name: "Percentage Calculator", slug: "percentage" },
  { name: "CGPA to Percentage Calculator", slug: "cgpa-to-percentage" },
  { name: "Feet to Centimeter Calculator", slug: "feet-to-centimeter" },
  { name: "Kilometer to Mile Calculator", slug: "kilometer-to-mile" },
  { name: "Sq Ft to Sq Meter Converter", slug: "sq-ft-to-sq-meter" },
];

const faqs = [
  {
    question: "What is the formula to convert inches into centimeters?",
    answer:
      "The standard formula to convert inches into centimeters is: 1 inch = 2.54 centimeters. To get the value in centimeters, multiply the inch value by 2.54.",
  },
  {
    question: "How accurate is the Inch to Centimeter Calculator?",
    answer:
      "The calculator uses the globally accepted conversion value of 1 inch = 2.54 centimeters, so the result is accurate for normal academic, professional, and daily use.",
  },
  {
    question: "Can I convert decimal inch values using this tool?",
    answer:
      "Yes, you can enter decimal inch values such as 5.5, 10.25, or 12.75 and convert them instantly.",
  },
  {
    question: "Why do we need to convert inches to centimeters?",
    answer:
      "Inches are commonly used in some countries and product listings, while centimeters are used in the metric system. Conversion helps users understand measurements clearly.",
  },
  {
    question: "Is the Inch to Centimeter Calculator free to use?",
    answer:
      "Yes, this calculator is free to use and does not require sign-up or installation.",
  },
];

const numberValue = (value: string) => Number(value) || 0;

const SectionHeader = ({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) => (
  <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
    {Icon && <Icon className="w-6 h-6 text-red-600 shrink-0" />}
    <span>{children}</span>
  </h2>
);

const InchToCentimeterPage = () => {
  const [inches, setInches] = useState("12");
  const [result, setResult] = useState("30.48");
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handlePreset = (val: string) => {
    setInches(val);
    setResult((numberValue(val) * 2.54).toFixed(2));
  };

  const handleReset = () => {
    setInches("");
    setResult("");
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result} cm`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Sleek Dark Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.25),rgba(255,255,255,0))] text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Top Bar / Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Calculators</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
              <Ruler className="w-3.5 h-3.5" /> Unit Converter
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Inch to Centimeter Calculator
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
              Convert length from inches (
              <span className="text-red-400 font-semibold">in</span>) to
              centimeters (
              <span className="text-red-400 font-semibold">cm</span>){" "}
              instantly with high accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator Card */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Interactive Converter
                </h3>
                <p className="text-xs text-slate-500">
                  1 inch = 2.54 centimeters
                </p>
              </div>
            </div>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Input Section */}
            <div className="md:col-span-6 space-y-2">
              <label
                htmlFor="inch-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Inches (in)
              </label>
              <div className="relative flex items-center">
                <input
                  id="inch-input"
                  type="number"
                  value={inches}
                  onChange={(e) => {
                    setInches(e.target.value);
                    const val = numberValue(e.target.value);
                    setResult(e.target.value ? (val * 2.54).toFixed(2) : "");
                  }}
                  placeholder="Enter value"
                  className="w-full h-14 pl-4 pr-16 text-2xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                />
                <span className="absolute right-4 text-sm font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                  in
                </span>
              </div>
            </div>

            {/* Equal Sign */}
            <div className="md:col-span-1 flex justify-center text-slate-400 py-1 md:py-0">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                =
              </div>
            </div>

            {/* Output Section */}
            <div className="md:col-span-5 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Centimeters (cm)
              </span>
              <div className="h-14 px-4 bg-red-50/70 border border-red-100 rounded-2xl flex items-center justify-between">
                <span className="text-2xl font-black text-red-600 tracking-tight">
                  {result ? `${result}` : "0.00"}
                </span>
                <span className="text-sm font-extrabold text-red-700 bg-white px-2.5 py-1 rounded-lg border border-red-200/60 shadow-xs">
                  cm
                </span>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Presets:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {["1", "6", "12", "15", "24", "36", "48", "60"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    inches === preset
                      ? "bg-red-600 text-white border-red-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {preset}&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Result Actions Bar */}
          {result && (
            <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-400 font-medium">
                  Converted Result
                </p>
                <p className="text-xl sm:text-2xl font-extrabold text-white">
                  {inches || "0"} in ={" "}
                  <span className="text-red-400">{result} cm</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Article */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-slate-700 text-base leading-relaxed">
        {/* Intro Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Inch to Centimeter Calculator - Quick & Accurate Measurement
            Converter
          </h2>
          <p className="text-slate-600">
            The Inch to Centimeter Calculator is a fast, reliable, and
            easy-to-use online tool that helps you convert measurements from
            inches to centimeters instantly. Designed for students,
            professionals, online shoppers, designers, and everyday users who
            need quick and accurate measurement conversions without manual
            calculations.
          </p>
          <p className="text-slate-600">
            Since different countries follow different measurement systems,
            converting inches to centimeters has become a common requirement.
            This calculator on eCampus eliminates confusion and provides
            precise results in just one click.
          </p>
        </div>

        {/* Section: What is an Inch to Centimeter Calculator */}
        <SectionHeader icon={Info}>
          What Is an Inch to Centimeter Calculator?
        </SectionHeader>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs mb-8">
          <p className="text-slate-600">
            An Inch to Centimeter Calculator is an online conversion tool that
            converts values measured in inches into centimeters. Inches are
            widely used in countries like the USA, while centimeters are part of
            the metric system followed in India and most parts of the world.
          </p>
        </div>

        {/* Section: Formula */}
        <SectionHeader icon={Sparkles}>
          Inch to Centimeter Conversion Formula
        </SectionHeader>
        <div className="bg-gradient-to-br from-red-50/80 via-white to-rose-50/40 rounded-2xl p-6 sm:p-8 border border-red-100 shadow-sm mb-10 space-y-4">
          <p className="text-slate-700">
            The conversion between inches and centimeters is based on a
            standard mathematical relationship:
          </p>
          <div className="inline-block bg-red-600 text-white font-black text-xl sm:text-2xl px-6 py-3 rounded-2xl shadow-md">
            1 inch = 2.54 centimeters
          </div>
          <p className="text-slate-700 font-medium">
            To convert inches into centimeters, simply multiply the inch value
            by{" "}
            <code className="bg-red-100 text-red-900 px-2 py-0.5 rounded font-mono font-bold">
              2.54
            </code>
            .
          </p>
          <div className="bg-white rounded-xl p-4 border border-red-100/80 space-y-2">
            <p className="font-bold text-slate-900 text-sm">Examples:</p>
            <ul className="space-y-1 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  6 inches × 2.54 ={" "}
                  <strong className="text-slate-900">15.24 cm</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  15 inches × 2.54 ={" "}
                  <strong className="text-slate-900">38.1 cm</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: Conversion Table */}
        <SectionHeader icon={Ruler}>
          Inch to Centimeter Conversion Table
        </SectionHeader>
        <p className="text-slate-600 mb-4">
          For quick reference, here is a commonly used Inch to Centimeter
          conversion table:
        </p>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold">
                    Inches (in)
                  </th>
                  <th className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold">
                    Centimeters (cm)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {conversionRows.map((row) => (
                  <tr
                    key={row[0]}
                    className="even:bg-slate-50/60 hover:bg-red-50/40 transition-colors"
                  >
                    <td className="px-6 py-3 font-semibold text-slate-900">
                      {row[0]}
                    </td>
                    <td className="px-6 py-3 font-medium text-red-600">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: How to Use */}
        <SectionHeader icon={Zap}>
          How to Use the Calculator on eCampus
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 font-extrabold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Enter Value</h4>
            <p className="text-xs text-slate-600">
              Type the measurement in inches into the input box above.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 font-extrabold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-900 mb-1">
              Instant Calculation
            </h4>
            <p className="text-xs text-slate-600">
              The converted centimeter result updates automatically in
              real-time.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 font-extrabold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Copy or Reset</h4>
            <p className="text-xs text-slate-600">
              Click to copy your formatted result or reset to start a new
              conversion.
            </p>
          </div>
        </div>

        {/* Section: Who Can Use */}
        <SectionHeader icon={Briefcase}>
          Who Can Use This Inch to cm Calculator?
        </SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            {
              title: "Students",
              icon: GraduationCap,
              desc: "Essential for mathematics, physics, engineering, and technical subjects.",
            },
            {
              title: "Professionals",
              icon: Briefcase,
              desc: "Used by architects, civil engineers, interior designers, and technical pros.",
            },
            {
              title: "Online Shoppers",
              icon: ShoppingBag,
              desc: "Convert global product dimensions (US/UK inches) to standard cm.",
            },
            {
              title: "Tailors & Designers",
              icon: Scissors,
              desc: "Ensures correct size conversion for clothing, fabrics, and patterns.",
            },
            {
              title: "Everyday Users",
              icon: Home,
              desc: "Perfect for home measurements like TVs, furniture, and room layouts.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-red-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Section: Explore Popular Online Courses */}
        <SectionHeader icon={GraduationCap}>
          Explore Popular Online Courses
        </SectionHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-12">
          {popularCourses.map((course) => (
            <div
              key={course}
              className="bg-white border border-slate-200 rounded-xl p-3 text-center text-xs font-semibold text-red-600 hover:border-red-500 hover:bg-red-50/40 transition-all cursor-pointer shadow-2xs"
            >
              {course}
            </div>
          ))}
        </div>

        {/* Section: Free Online Calculators Grid */}
        <SectionHeader icon={Calculator}>Free Online Calculators</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {relatedCalculatorsData.map((calc) => (
            <Link
              key={calc.name}
              href={`/tools/${calc.slug}`}
              className="group bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-400 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Calculator className="w-4 h-4 text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-red-600 transition-colors">
                  {calc.name}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          ))}
        </div>

        {/* Section: FAQs Accordion */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mt-12">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Got questions? We have answers.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-slate-200/70 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
};

const GenericCalculatorPage = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [c, setC] = useState("3");
  const [date, setDate] = useState("2000-01-01");
  const [operation, setOperation] = useState("add");
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Set default sensible initial values based on slug
  React.useEffect(() => {
    if (slug.includes("gpa")) {
      setA("8.5");
    } else if (slug === "bmi") {
      setA("70");
      setB("170");
    } else if (slug === "inr-to-usd") {
      setA("8300");
    } else if (slug === "gallon-to-liter") {
      setA("5");
    } else if (slug === "meters-to-feet") {
      setA("10");
    } else if (slug === "percentage") {
      setA("15");
      setB("200");
    } else if (slug === "feet-to-centimeter") {
      setA("6");
    } else if (slug === "kilometer-to-mile") {
      setA("10");
    } else if (slug === "sq-ft-to-sq-meter") {
      setA("1000");
    } else if (slug === "online-university-roi") {
      setA("150000");
      setB("50000");
      setC("3");
    }
  }, [slug]);

  const { result, formulaText, unitTag, icon: ToolIcon, presets, toolFaqs } = useMemo(() => {
    const x = numberValue(a);
    const y = numberValue(b);
    const z = numberValue(c);

    let res = "";
    let formula = "";
    let unit = "";
    let Icon = Calculator;
    let presetList: string[] = [];
    let customFaqs = [
      {
        question: `How does the ${title} work?`,
        answer: `This calculator processes your inputs using standard mathematical algorithms to deliver instant, accurate results on eCampus.`,
      },
      {
        question: `Is the ${title} free to use?`,
        answer: `Yes! All tools on eCampus are 100% free with unlimited access and zero sign-up required.`,
      },
      {
        question: `Can I use this calculator on mobile devices?`,
        answer: `Absolutely! The responsive UI is optimized for seamless performance across smartphones, tablets, and desktops.`,
      },
    ];

    switch (slug) {
      case "gpa-to-percentage":
      case "sgpa-to-percentage":
      case "cgpa-to-percentage": {
        const pct = (x * 9.5).toFixed(2);
        res = `${pct}%`;
        formula = "Percentage (%) = GPA Score × 9.5";
        unit = "%";
        Icon = Percent;
        presetList = ["7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0"];
        customFaqs = [
          {
            question: "How is GPA converted to percentage?",
            answer:
              "In most Indian universities and boards (including CBSE, VTU, Mumbai University), percentage is calculated by multiplying your grade point average by 9.5.",
          },
          {
            question: "Is 10 GPA equal to 95% or 100%?",
            answer:
              "Under the standard 9.5 multiplier rule, 10 GPA equals 95%. Some specific autonomous institutes use a direct 10x multiplier.",
          },
          {
            question: "What is the difference between SGPA and CGPA?",
            answer:
              "SGPA (Semester Grade Point Average) evaluates marks for a single semester, while CGPA (Cumulative Grade Point Average) measures overall performance across all completed semesters.",
          },
        ];
        break;
      }
      case "bmi": {
        const heightM = y / 100;
        Icon = WalletCards;
        if (!heightM || heightM <= 0) {
          res = "Enter valid height";
        } else {
          const bmiVal = (x / (heightM * heightM)).toFixed(1);
          let category = "Normal";
          const numBmi = Number(bmiVal);
          if (numBmi < 18.5) category = "Underweight";
          else if (numBmi >= 25 && numBmi < 30) category = "Overweight";
          else if (numBmi >= 30) category = "Obese";

          res = `${bmiVal} BMI (${category})`;
        }
        formula = "BMI = Weight (kg) / [Height (m)]²";
        unit = "BMI";
        customFaqs = [
          {
            question: "What is a healthy BMI range?",
            answer:
              "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal/healthy for adults.",
          },
          {
            question: "What are the BMI categories?",
            answer:
              "Below 18.5 is Underweight, 18.5 to 24.9 is Normal weight, 25 to 29.9 is Overweight, and 30 or higher is classified as Obese.",
          },
        ];
        break;
      }
      case "age": {
        Icon = Calculator;
        if (!date) {
          res = "Select date of birth";
        } else {
          const dob = new Date(date);
          const now = new Date();
          let years = now.getFullYear() - dob.getFullYear();
          let months = now.getMonth() - dob.getMonth();
          let days = now.getDate() - dob.getDate();
          if (days < 0) {
            months -= 1;
            days += 30;
          }
          if (months < 0) {
            years -= 1;
            months += 12;
          }
          res = `${years} Years, ${months} Months, ${days} Days`;
        }
        formula = "Age = Current Date - Date of Birth";
        unit = "Age";
        break;
      }
      case "inr-to-usd": {
        Icon = Landmark;
        res = `$${(x / 83).toFixed(2)} USD`;
        formula = "USD ($) = INR (₹) / 83.00";
        unit = "USD";
        presetList = ["1000", "5000", "10000", "50000", "100000"];
        break;
      }
      case "fraction": {
        Icon = Calculator;
        if (operation === "subtract") res = `${(x - y).toFixed(2)}`;
        else if (operation === "multiply") res = `${(x * y).toFixed(2)}`;
        else if (operation === "divide") res = y ? `${(x / y).toFixed(2)}` : "Cannot divide by 0";
        else res = `${(x + y).toFixed(2)}`;
        formula = `Result = ${x} ${operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷"} ${y}`;
        break;
      }
      case "gallon-to-liter": {
        Icon = Calculator;
        res = `${(x * 3.78541).toFixed(2)} Liters`;
        formula = "1 US Gallon = 3.78541 Liters";
        unit = "Liters";
        presetList = ["1", "5", "10", "20", "50"];
        break;
      }
      case "meters-to-feet": {
        Icon = Ruler;
        res = `${(x * 3.28084).toFixed(2)} Feet`;
        formula = "1 Meter = 3.28084 Feet";
        unit = "Feet";
        presetList = ["1", "5", "10", "50", "100"];
        break;
      }
      case "percentage": {
        Icon = Percent;
        res = `${((x / 100) * y).toFixed(2)}`;
        formula = `Value = (${x}% × ${y}) / 100`;
        break;
      }
      case "feet-to-centimeter": {
        Icon = Ruler;
        res = `${(x * 30.48).toFixed(2)} cm`;
        formula = "1 Foot = 30.48 Centimeters";
        unit = "cm";
        presetList = ["1", "5", "6", "10", "12"];
        break;
      }
      case "kilometer-to-mile": {
        Icon = Ruler;
        res = `${(x * 0.621371).toFixed(2)} Miles`;
        formula = "1 Kilometer = 0.621371 Miles";
        unit = "Miles";
        presetList = ["1", "5", "10", "42", "100"];
        break;
      }
      case "sq-ft-to-sq-meter": {
        Icon = Ruler;
        res = `${(x * 0.092903).toFixed(2)} Sq Meters`;
        formula = "1 Square Foot = 0.092903 Square Meters";
        unit = "Sq M";
        presetList = ["100", "500", "1000", "1500", "2000"];
        break;
      }
      case "online-university-roi": {
        Icon = GraduationCap;
        const totalIncrease = y * (z || 1);
        const roiVal = totalIncrease - x;
        res = `₹${roiVal.toLocaleString("en-IN")} Net Return`;
        formula = "Net ROI = (Yearly Salary Increase × Years) - Total Course Cost";
        unit = "₹";
        break;
      }
      default:
        res = "Calculator Ready";
        formula = "Standard Conversion";
        break;
    }

    return {
      result: res,
      formulaText: formula,
      unitTag: unit,
      icon: Icon,
      presets: presetList,
      toolFaqs: customFaqs,
    };
  }, [a, b, c, date, operation, slug, title]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setA("");
    setB("");
    setC("");
  };

  const needsSecondInput = [
    "bmi",
    "fraction",
    "percentage",
    "online-university-roi",
  ].includes(slug);
  const needsThirdInput = slug === "online-university-roi";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Sleek Dark Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.25),rgba(255,255,255,0))] text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Top Bar / Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Calculators</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
              <ToolIcon className="w-3.5 h-3.5" /> eCampus Smart Tool
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
              Quick, accurate, and easy-to-use digital calculator designed for instant results.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator Card */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <ToolIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {title}
                </h3>
                <p className="text-xs text-slate-500">{formulaText}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Form Controls */}
          <div className="space-y-5">
            {slug === "age" ? (
              <div className="space-y-2">
                <label htmlFor="dob-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date of Birth
                </label>
                <input
                  id="dob-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 px-4 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="input-a" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  {slug === "bmi"
                    ? "Weight in Kilograms (kg)"
                    : slug === "online-university-roi"
                    ? "Total Course Cost (₹)"
                    : slug === "percentage"
                    ? "Percentage Value (%)"
                    : "Enter Value"}
                </label>
                <input
                  id="input-a"
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="Enter number..."
                  className="w-full h-14 px-4 text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                />
              </div>
            )}

            {slug === "fraction" && (
              <div className="space-y-2">
                <label htmlFor="op-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Operation
                </label>
                <select
                  id="op-select"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full h-14 px-4 text-base font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                >
                  <option value="add">Add (+)</option>
                  <option value="subtract">Subtract (-)</option>
                  <option value="multiply">Multiply (×)</option>
                  <option value="divide">Divide (÷)</option>
                </select>
              </div>
            )}

            {needsSecondInput && (
              <div className="space-y-2">
                <label htmlFor="input-b" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  {slug === "bmi"
                    ? "Height in Centimeters (cm)"
                    : slug === "percentage"
                    ? "Total Base Value"
                    : slug === "online-university-roi"
                    ? "Expected Yearly Salary Increase (₹)"
                    : "Second Value"}
                </label>
                <input
                  id="input-b"
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="Enter value..."
                  className="w-full h-14 px-4 text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                />
              </div>
            )}

            {needsThirdInput && (
              <div className="space-y-2">
                <label htmlFor="input-c" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Time Horizon (Years)
                </label>
                <input
                  id="input-c"
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="Enter years..."
                  className="w-full h-14 px-4 text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                />
              </div>
            )}

            {/* Presets Bar */}
            {presets.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Presets:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setA(p)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                        a === p
                          ? "bg-red-600 text-white border-red-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {p} {unitTag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result Box */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-slate-900/10">
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Calculated Result
                </p>
                <p className="text-2xl sm:text-3xl font-black text-red-400 tracking-tight">
                  {result}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-slate-700 text-base leading-relaxed">
        {/* Intro Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {title} - Fast &amp; Accurate Digital Tool
          </h2>
          <p className="text-slate-600">
            The {title} on eCampus is designed to provide immediate, reliable calculations without manual hassle or complex formulas. Built for students, working professionals, educators, and everyday users who require quick precision.
          </p>
        </div>

        {/* Section: Formula Callout */}
        <SectionHeader icon={Sparkles}>Formula &amp; Method</SectionHeader>
        <div className="bg-gradient-to-br from-red-50/80 via-white to-rose-50/40 rounded-2xl p-6 sm:p-8 border border-red-100 shadow-sm mb-10 space-y-3">
          <p className="text-slate-700 text-sm font-medium">
            This tool uses the standard mathematical reference:
          </p>
          <div className="inline-block bg-red-600 text-white font-black text-lg sm:text-xl px-5 py-2.5 rounded-2xl shadow-sm">
            {formulaText}
          </div>
        </div>

        {/* Section: Free Online Calculators Grid */}
        <SectionHeader icon={Calculator}>Explore More Free Calculators</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {relatedCalculatorsData.map((calc) => (
            <Link
              key={calc.name}
              href={`/tools/${calc.slug}`}
              className="group bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-red-400 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Calculator className="w-4 h-4 text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-red-600 transition-colors">
                  {calc.name}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          ))}
        </div>

        {/* Section: FAQs Accordion */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mt-12">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Got questions? We have answers.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {toolFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-slate-200/70 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
};

const ToolsDetailPage = () => {
  const params = useParams();
  const slug = String(params.slug || "");
  const title = calculatorTitles[slug] || "Calculator";

  const isInchToCm =
    slug === "inches-to-centimeters" ||
    slug === "inch-to-centimeter-calculator";

  return (
    <>
      {isInchToCm ? (
        <InchToCentimeterPage />
      ) : (
        <GenericCalculatorPage slug={slug} title={title} />
      )}
      <Footer />
    </>
  );
};

export default ToolsDetailPage;
