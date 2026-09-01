"use client";

import React, { useState } from "react";
import { Users, Check, Copy } from "lucide-react";

interface Coupon {
  code: string;
  university: string;
  logoText: string;
  discount: string;
  appliedNote: string;
  usedToday: number;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: "ALLI516",
    university: "Alliance University Online",
    logoText: "AU",
    discount: "Flat ₹ 3,500 off",
    appliedNote: "₹ 3,500 off applied on this course",
    usedToday: 516,
  },
  {
    code: "DYPA52",
    university: "DY Patil University Online",
    logoText: "DPU",
    discount: "Flat ₹ 4,000 off",
    appliedNote: "₹ 4,000 off applied on this course",
    usedToday: 52,
  },
  {
    code: "UPES79",
    university: "UPES Online",
    logoText: "UPES",
    discount: "Flat ₹ 8,000 off",
    appliedNote: "₹ 8,000 off applied on this course",
    usedToday: 79,
  },
  {
    code: "LPUO76",
    university: "LPU Online",
    logoText: "LPU",
    discount: "Flat ₹ 3,500 off",
    appliedNote: "₹ 3,500 off applied on this course",
    usedToday: 76,
  },
  {
    code: "CHAN81",
    university: "Chandigarh University Online",
    logoText: "CU",
    discount: "Flat ₹ 2,500 off",
    appliedNote: "₹ 2,500 off applied on this course",
    usedToday: 81,
  },
  {
    code: "BENN53",
    university: "Bennett University Online",
    logoText: "BU",
    discount: "Flat ₹ 4,000 off",
    appliedNote: "₹ 4,000 off applied on this course",
    usedToday: 53,
  },
];

interface CouponsProps {
  data?: any;
  title?: string;
}

export default function Coupons({ data, title }: CouponsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const heading = data?.heading || title || "Coupons for Online MBA";
  const couponsList = data?.coupons && Array.isArray(data.coupons) && data.coupons.length > 0
    ? data.coupons
    : DEFAULT_COUPONS;

  const handleApply = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard may be unavailable — fail silently
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 2000);
  };

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
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

      <div className="flex flex-col gap-5 max-w-4xl">
        {couponsList.map((coupon: any, i: number) => {
          const code = coupon.code || `OFFER${i + 1}`;
          const isCopied = copiedCode === code;

          return (
            <div
              key={code}
              className="relative flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Code stub */}
              <div className="relative flex w-16 sm:w-20 shrink-0 items-center justify-center bg-red-500">
                <span className="rotate-180 text-[11px] sm:text-xs font-bold tracking-widest text-white [writing-mode:vertical-rl]">
                  {code}
                </span>

                {/* Perforation dots */}
                <div className="absolute right-0 top-0 flex h-full flex-col justify-between py-2">
                  {Array.from({ length: 8 }).map((_, d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 -mr-[3px] rounded-full bg-white"
                    />
                  ))}
                </div>
              </div>

              {/* Dashed divider */}
              <div className="w-px border-l border-dashed border-slate-300" />

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-extrabold text-slate-600 uppercase">
                    {coupon.logoText || code.substring(0, 2)}
                  </span>

                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      {coupon.discount || "Flat Discount"}
                      <span className="ml-1 text-red-500">*</span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                      {coupon.appliedNote || "Discount applied on this course"}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-600">
                        {coupon.university || "Partner University"}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                        <Users className="h-3 w-3" />
                        {coupon.usedToday || 50} people used today
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(code)}
                  className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold text-white shadow-md transition-colors sm:min-w-[130px] ${
                    isCopied
                      ? "bg-green-500 shadow-green-500/30"
                      : "bg-red-500 shadow-red-500/30 hover:bg-red-600"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                      Applied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" strokeWidth={2} />
                      Apply Code
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}