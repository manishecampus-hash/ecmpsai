"use client";

import React from "react";
import { Check, BadgeCheck } from "lucide-react";

const DEFAULT_BENEFITS: string[] = [
  "Join Community for peer interaction",
  "Get placement support via webinars & networking sessions",
  "Dedicated Buddy for your queries",
  "One-on-One career mentorship sessions",
  "Ensures timely delivery of LMS & degree",
  "A career advisor for life",
];

const DEFAULT_PAYMENT_OPTIONS: string[] = [
  "One-time payment option available",
  "Allowed to pay semester-wise",
  "Annual payments are also allowed",
  "EMI options are available",
];

interface UniversityFee {
  university: string;
  courseFees: string;
  details: string[];
}

const DEFAULT_UNIVERSITY_FEES: UniversityFee[] = [
  {
    university: "Golden Gate University Online MBA",
    courseFees: "INR 4.30 lakhs",
    details: ["Full program fees—INR 4.30 lakhs"],
  },
  {
    university: "Birchwood University Online MBA",
    courseFees: "INR 4.03 lakhs",
    details: ["Full program fees—INR 4.03 lakhs", "Registration fees—INR 17,079"],
  },
  {
    university: "BIMTECH Online MBA",
    courseFees: "INR 2.75 lakhs",
    details: ["Full program fees—INR 2.75 lakhs"],
  },
  {
    university: "NMIMS Online MBA",
    courseFees: "INR 2.20 lakh (If you pay semester-wise)",
    details: ["Registration fees—INR 1200", "Yearly fees—INR 105,000", "Semester-wise fees: INR 55,000"],
  },
  {
    university: "Amity University Online MBA",
    courseFees: "INR 2.25 lakhs",
    details: ["Semester-wise fees: INR 56,300", "Full program fees—INR 2.25 lakhs"],
  },
  {
    university: "DY Patil University Online MBA",
    courseFees: "INR 1.89 Lakhs",
    details: ["Semester-wise Program Fees—INR 50,000"],
  },
  {
    university: "Manipal Online MBA",
    courseFees: "INR 1.80 lakhs",
    details: ["Semester-wise fees: INR 45,000"],
  },
  {
    university: "LPU Online MBA",
    courseFees: "INR 2 Lakhs",
    details: ["Registration Fee (One Time)—INR 1000", "Per Semester Fee—INR 50,000", "Exam Fees (semester-wise)—INR 2000"],
  },
];

interface SubProgramFeesProps {
  data?: any;
  title?: string;
}

export default function SubProgramFees({ data, title }: SubProgramFeesProps) {
  const heading = data?.heading || title || "Program Fees for Online MBA";
  const startingPrice = data?.startingPrice || "₹ 6,776/month";
  const feeRange = data?.feeRange || "Program Fee: ₹ 62,200 – ₹ 20,50,000";

  const benefitsList = data?.benefits
    ? typeof data.benefits === "string"
      ? data.benefits.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(data.benefits)
      ? data.benefits
      : DEFAULT_BENEFITS
    : DEFAULT_BENEFITS;

  const paymentOptionsList = data?.paymentOptions
    ? typeof data.paymentOptions === "string"
      ? data.paymentOptions.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(data.paymentOptions)
      ? data.paymentOptions
      : DEFAULT_PAYMENT_OPTIONS
    : DEFAULT_PAYMENT_OPTIONS;

  const universityFeesList = data?.universityFees && Array.isArray(data.universityFees) && data.universityFees.length > 0
    ? data.universityFees
    : DEFAULT_UNIVERSITY_FEES;

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          {heading.includes("Online MBA") ? (
            <>
              {heading.split("Online MBA")[0]}
              <span className="text-red-500">Online MBA</span>
              {heading.split("Online MBA")[1]}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      {/* Benefits + price promo card */}
      <div className="relative rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
        <span className="absolute right-5 top-5 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Benefits of learning from us
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {benefitsList.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-600">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Starting at
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {startingPrice}
            </p>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              {feeRange}
            </p>

            <button className="mt-4 w-full rounded-full bg-red-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/30 transition-colors hover:bg-red-600">
              Apply Now
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
              <BadgeCheck className="h-3.5 w-3.5 text-red-500" />
              Low Cost EMI Available
            </p>
          </div>
        </div>
      </div>

      {/* Fee overview text */}
      <div className="mt-8 max-w-4xl">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          The full program fees are affordable and flexible, designed to fit semester-wise, yearly, and annual installment plans.
        </p>

        <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">
          Students can pay the fees throughout the payment cycle:
        </p>

        <ul className="mt-3 space-y-2.5">
          {paymentOptionsList.map((option: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {option}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fee comparison table */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Fee Comparison between Top Universities
        </h3>

        <div className="mt-5 rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-red-500 px-6 py-4">
            <h4 className="text-center text-sm font-bold text-white sm:text-base">
              Course Fees Overview
            </h4>
          </div>

          <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_2fr] bg-slate-50 border-b border-slate-200">
            <div className="px-6 py-3 border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                List of Universities
              </span>
            </div>
            <div className="px-6 py-3 border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Fees
              </span>
            </div>
            <div className="px-6 py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detailed Fee Structure
              </span>
            </div>
          </div>

          {universityFeesList.map((row: any, i: number) => (
            <div
              key={row.university || i}
              className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr] ${
                i !== universityFeesList.length - 1
                  ? "border-b border-slate-200"
                  : ""
              } ${i % 2 === 1 ? "bg-red-50/30" : "bg-white"}`}
            >
              <div className="px-6 py-4 sm:border-r border-slate-200">
                <p className="text-sm font-bold text-slate-900 sm:text-base">
                  {row.university}
                </p>
              </div>

              <div className="px-6 py-2 sm:py-4 sm:border-r border-slate-200">
                <p className="text-sm font-semibold text-red-500 sm:text-base">
                  {row.courseFees}
                </p>
              </div>

              <div className="px-6 pb-4 sm:py-4">
                <ul className="space-y-1.5">
                  {(Array.isArray(row.details) ? row.details : [row.details || "Full program fee"]).map((d: string, dIdx: number) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 sm:text-base"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}