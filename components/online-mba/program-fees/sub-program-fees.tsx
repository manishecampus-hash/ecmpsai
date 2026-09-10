"use client";

import React from "react";
import { Check, BadgeCheck } from "lucide-react";

export function RenderHeading({
  text,
  colorClass = "text-[#ee2c3c]",
  colorHex = "#ee2c3c",
}: {
  text?: string | null;
  colorClass?: string;
  colorHex?: string;
}) {
  if (!text || typeof text !== "string") return null;

  const regex = /(\*{1,2}[^*]+\*{1,2})/g;
  const parts = text.split(regex);

  if (parts.length === 1 && !text.includes("*")) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isAsteriskWrapped =
          (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
          (part.startsWith("*") && part.endsWith("*") && part.length > 2);

        if (isAsteriskWrapped) {
          const content = part.replace(/^\*+|\*+$/g, "");
          return (
            <span
              key={index}
              className={colorClass}
              style={{ color: colorHex }}
            >
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

interface SubProgramFeesProps {
  data?: any;
  title?: string;
}

export default function SubProgramFees({ data, title }: SubProgramFeesProps) {
  // Use ONLY configured heading and values, NO fallback dummy data
  const heading = (data?.heading || title || "").trim();
  const startingPrice = (data?.startingPrice || "").trim();
  const feeRange = (data?.feeRange || "").trim();
  const overviewText = (data?.overviewText || data?.description || "").trim();

  const parseList = (input: any): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map((s) => (typeof s === "string" ? s.trim() : String(s))).filter(Boolean);
    }
    if (typeof input === "string") {
      return input.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  const benefitsList = parseList(data?.benefits);
  const paymentOptionsList = parseList(data?.paymentOptions);

  const hasPriceInfo = Boolean(startingPrice || feeRange);
  const hasCard = benefitsList.length > 0 || hasPriceInfo;
  const hasContent = Boolean(heading || hasCard || overviewText || paymentOptionsList.length > 0);

  // If no data configured at all, render nothing (no fallback, placeholder, dummy content)
  if (!hasContent) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading ? (
        <div className="mb-8">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      ) : null}

      {/* Benefits + price promo card - render only if benefits or price configured */}
      {hasCard ? (
        <div className="relative rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
          <span className="absolute right-5 top-5 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Recommended
          </span>

          <div
            className={`grid gap-8 p-6 sm:p-8 ${
              hasPriceInfo && benefitsList.length > 0
                ? "lg:grid-cols-[1fr_260px] lg:items-center"
                : "grid-cols-1"
            }`}
          >
            {benefitsList.length > 0 ? (
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
            ) : null}

            {hasPriceInfo ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                {startingPrice ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Starting at
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                      {startingPrice}
                    </p>
                  </>
                ) : null}

                {feeRange ? (
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    {feeRange}
                  </p>
                ) : null}

                <button className="mt-4 w-full rounded-full bg-red-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/30 transition-colors hover:bg-red-600">
                  Apply Now
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
                  <BadgeCheck className="h-3.5 w-3.5 text-red-500" />
                  Low Cost EMI Available
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Fee overview text & payment options - render only if configured */}
      {overviewText || paymentOptionsList.length > 0 ? (
        <div className="mt-8 max-w-4xl">
          {overviewText ? (
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {overviewText}
            </p>
          ) : null}

          {paymentOptionsList.length > 0 ? (
            <>
              <p className="mt-4 text-sm font-semibold text-slate-900 sm:text-base">
                Payment Options:
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
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}