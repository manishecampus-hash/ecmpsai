"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  GraduationCap,
  HelpCircle,
  Info,
  Landmark,
  Percent,
  RotateCcw,
  Ruler,
  Sparkles,
  WalletCards,
  Zap,
  Target,
  ShieldCheck,
  Smartphone,
  Activity,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Layers,
  FileText,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Ruler,
  GraduationCap,
  Percent,
  WalletCards,
  Landmark,
  Zap,
  Target,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Info,
  HelpCircle,
  RotateCcw,
  Copy,
  Check,
  Activity,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Layers,
  FileText,
};

export interface ToolInput {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  unit?: string;
  options?: Array<{ label: string; value: string }>;
}

export interface ToolCalculation {
  formulaExpression: string;
  formulaText?: string;
  resultType?: string;
  resultPrefix?: string;
  resultSuffix?: string;
  resultDecimals?: number;
  formatNumber?: boolean;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDetail {
  id?: string;
  slug: string;
  title: string;
  cardTitle?: string;
  description?: string;
  category?: string;
  icon?: string;
  image?: string;
  buttonText?: string;
  order?: number;
  inputs?: ToolInput[];
  calculation?: ToolCalculation;
  presets?: string[];
  introContent?: string;
  faqs?: ToolFaq[];
  seoSettings?: Record<string, any>;
}

export interface RelatedCalculatorItem {
  id?: string;
  slug: string;
  title: string;
  cardTitle?: string;
  description?: string;
  category?: string;
  icon?: string;
}

interface CalculatorDetailClientProps {
  tool: ToolDetail;
  allCalculators: RelatedCalculatorItem[];
}

export function evaluateDynamicFormula(
  calculation?: ToolCalculation,
  inputs: ToolInput[] = [],
  values: Record<string, any> = {}
): string {
  if (!calculation || !calculation.formulaExpression) return "";

  const {
    formulaExpression,
    resultType = "number",
    resultPrefix = "",
    resultSuffix = "",
    resultDecimals,
    formatNumber = false,
  } = calculation;

  // 1. Age Calculation
  if (resultType === "age") {
    const dobStr = values["dob"] || Object.values(values)[0];
    if (!dobStr) return "";
    const birthDate = new Date(dobStr);
    if (isNaN(birthDate.getTime())) return "Invalid Date";
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    if (years < 0) return "Date is in the future";
    return `${years} Years, ${months} Months, ${days} Days`;
  }

  // 2. Fraction Calculation
  if (resultType === "fraction") {
    const a = Number(values["a"] ?? Object.values(values)[0] ?? 0);
    const b = Number(values["b"] ?? Object.values(values)[2] ?? 0);
    const op = values["operation"] || "add";
    let res = 0;
    if (op === "add") res = a + b;
    else if (op === "subtract") res = a - b;
    else if (op === "multiply") res = a * b;
    else if (op === "divide") res = b !== 0 ? a / b : NaN;
    if (isNaN(res)) return "Error: Division by zero";
    const formatted =
      typeof resultDecimals === "number"
        ? res.toFixed(resultDecimals)
        : String(res);
    return `${resultPrefix}${formatted}${resultSuffix}`;
  }

  // 3. Mathematical Expression Evaluator
  try {
    const varKeys = Object.keys(values);
    const varVals = varKeys.map((k) => {
      const v = values[k];
      const num = Number(v);
      return !isNaN(num) && typeof v !== "boolean" && v !== "" ? num : v;
    });

    const compute = new Function(
      ...varKeys,
      "Math",
      `"use strict"; return (${formulaExpression});`
    );
    const raw = compute(...varVals, Math);

    if (
      raw === null ||
      raw === undefined ||
      (typeof raw === "number" && isNaN(raw))
    ) {
      return "";
    }

    // BMI categorization
    if (resultType === "bmi") {
      const numBmi = Number(raw);
      if (isNaN(numBmi) || numBmi <= 0 || !isFinite(numBmi))
        return "Enter valid inputs";
      const formattedBmi =
        typeof resultDecimals === "number"
          ? numBmi.toFixed(resultDecimals)
          : numBmi.toFixed(1);
      let cat = "Normal";
      if (numBmi < 18.5) cat = "Underweight";
      else if (numBmi >= 25 && numBmi < 30) cat = "Overweight";
      else if (numBmi >= 30) cat = "Obese";
      return `${resultPrefix}${formattedBmi} BMI (${cat})${resultSuffix}`;
    }

    if (typeof raw === "number") {
      const rounded =
        typeof resultDecimals === "number"
          ? raw.toFixed(resultDecimals)
          : String(raw);
      if (formatNumber) {
        const parts = rounded.split(".");
        const integerPart = Number(parts[0]).toLocaleString("en-IN");
        return `${resultPrefix}${
          parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart
        }${resultSuffix}`;
      }
      return `${resultPrefix}${rounded}${resultSuffix}`;
    }

    return `${resultPrefix}${String(raw)}${resultSuffix}`;
  } catch (err) {
    return "";
  }
}

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

export default function CalculatorDetailClient({
  tool,
  allCalculators,
}: CalculatorDetailClientProps) {
  // Initialize dynamic inputs state
  const initialValues = useMemo(() => {
    const vals: Record<string, any> = {};
    if (Array.isArray(tool.inputs)) {
      tool.inputs.forEach((input) => {
        vals[input.id] = input.defaultValue ?? "";
      });
    }
    return vals;
  }, [tool.inputs]);

  const [inputValues, setInputValues] = useState<Record<string, any>>(initialValues);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Compute live result reactively
  const result = useMemo(() => {
    return evaluateDynamicFormula(tool.calculation, tool.inputs || [], inputValues);
  }, [tool.calculation, tool.inputs, inputValues]);

  const handleInputChange = (id: string, val: any) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handlePresetClick = (presetVal: string) => {
    if (tool.inputs && tool.inputs.length > 0) {
      const primaryInputId = tool.inputs[0].id;
      setInputValues((prev) => ({
        ...prev,
        [primaryInputId]: presetVal,
      }));
    }
  };

  const handleReset = () => {
    const emptyVals: Record<string, any> = {};
    if (Array.isArray(tool.inputs)) {
      tool.inputs.forEach((input) => {
        emptyVals[input.id] = "";
      });
    }
    setInputValues(emptyVals);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ToolIcon = (tool.icon && ICON_MAP[tool.icon]) || Calculator;
  const inputsCount = tool.inputs?.length || 1;
  const gridColsClass =
    inputsCount === 1
      ? "grid-cols-1"
      : inputsCount === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Sleek Dark Radial Hero Section */}
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

            {tool.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                <ToolIcon className="w-3.5 h-3.5" /> {tool.category}
              </span>
            )}
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {tool.title}
            </h1>
            {tool.description && (
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
                {tool.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Interactive Dynamic Calculator Card */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <ToolIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {tool.cardTitle || tool.title}
                </h3>
                {tool.calculation?.formulaText && (
                  <p className="text-xs text-slate-500">
                    {tool.calculation.formulaText}
                  </p>
                )}
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

          {/* Dynamic Inputs Builder Render */}
          <div className={`grid ${gridColsClass} gap-6 items-end`}>
            {tool.inputs && tool.inputs.length > 0 ? (
              tool.inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <label
                    htmlFor={input.id}
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    {input.label}
                  </label>
                  <div className="relative flex items-center">
                    {input.type === "select" ? (
                      <select
                        id={input.id}
                        value={inputValues[input.id] ?? ""}
                        onChange={(e) =>
                          handleInputChange(input.id, e.target.value)
                        }
                        className="w-full h-14 pl-4 pr-10 text-base font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all cursor-pointer"
                      >
                        {input.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={input.id}
                        type={input.type || "number"}
                        value={inputValues[input.id] ?? ""}
                        onChange={(e) =>
                          handleInputChange(input.id, e.target.value)
                        }
                        placeholder={input.placeholder || "Enter value"}
                        className="w-full h-14 pl-4 pr-16 text-xl sm:text-2xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                      />
                    )}

                    {input.unit && (
                      <span className="absolute right-4 text-xs sm:text-sm font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                        {input.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : null}
          </div>

          {/* Presets Chips */}
          {tool.presets && tool.presets.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 mr-1">
                Quick Values:
              </span>
              {tool.presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handlePresetClick(val)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-200/60"
                >
                  {val}
                </button>
              ))}
            </div>
          )}

          {/* Dynamic Calculated Result Bar */}
          {result && (
            <div className="mt-8 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-slate-900/10">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-400 font-medium">
                  Calculated Result
                </p>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  <span className="text-red-400">{result}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-sm"
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
        {tool.introContent && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {tool.title} - Free Online Calculator
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {tool.introContent}
            </p>
          </div>
        )}

        {/* Dynamic Formula & Method Card */}
        {tool.calculation?.formulaText && (
          <div className="mb-10">
            <SectionHeader icon={Sparkles}>
              Formula & Calculation Method
            </SectionHeader>
            <div className="bg-gradient-to-br from-red-50/80 via-white to-rose-50/40 rounded-2xl p-6 sm:p-8 border border-red-100 shadow-sm space-y-4">
              <p className="text-slate-700">
                This calculator computes results using the mathematical formula:
              </p>
              <div className="inline-block bg-red-600 text-white font-black text-lg sm:text-xl px-6 py-3 rounded-2xl shadow-md">
                {tool.calculation.formulaText}
              </div>
              {tool.inputs && tool.inputs.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-red-100/80 space-y-2 mt-4">
                  <p className="font-bold text-slate-900 text-sm">
                    Formula Variables:
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {tool.inputs.map((inp) => (
                      <li key={inp.id} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>
                          <strong className="text-slate-900 font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 mr-1.5">
                            {inp.id}
                          </strong>
                          {inp.label} {inp.unit ? `(${inp.unit})` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Explore More Free Calculators (Static & shows all calculators by default) */}
        <div className="mb-12">
          <SectionHeader icon={Calculator}>
            Explore More Free Calculators
          </SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {allCalculators.map((calc) => {
              const CalcIcon =
                (calc.icon && ICON_MAP[calc.icon]) || Calculator;
              const isCurrent = calc.slug === tool.slug;
              return (
                <Link
                  key={calc.slug}
                  href={`/tools/${calc.slug}`}
                  className={`group p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? "bg-red-50/60 border-red-300 shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-red-400 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                        isCurrent
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      <CalcIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-red-600 transition-colors">
                        {calc.cardTitle || calc.title}
                      </span>
                      {calc.category && (
                        <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                          {calc.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 ml-2 transition-transform ${
                      isCurrent
                        ? "text-red-600"
                        : "text-slate-400 group-hover:text-red-600 group-hover:translate-x-1"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Frequently Asked Questions (Accordion) */}
        {tool.faqs && tool.faqs.length > 0 && (
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
                  Common questions about {tool.title}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={`${faq.question}-${idx}`}
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
        )}
      </article>
      <Footer />
    </main>
  );
}
