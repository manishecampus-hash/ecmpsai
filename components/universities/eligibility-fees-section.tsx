import React from "react";
import { Percent } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface EligibilityFeesSectionProps {
  university?: any;
}

interface EligibilityGroup {
  title: string;
  points: string[];
}

const DEFAULT_ELIGIBILITY_GROUPS: EligibilityGroup[] = [
  {
    title: "For Online Undergraduate Programs (BBA, BCA, B.Com)",
    points: [
      "Candidates must have passed 10+2 or an equivalent qualification from a recognized educational board.",
      "Students awaiting final results may apply provisionally, subject to timely document verification.",
    ],
  },
  {
    title: "For Online Postgraduate Programs (MBA, MCA, M.Com)",
    points: [
      "Applicants must hold a Bachelor’s degree of minimum three (3) years duration from a recognized university.",
      "A minimum of 50% aggregate marks is required (relaxation applicable for reserved categories per statutory norms).",
      "Final-year graduating students are eligible to apply on a provisional basis.",
    ],
  },
];

const DEFAULT_FEE_ROWS = [
  {
    label: "Undergraduate Range",
    range: "₹10,383 – ₹15,133",
  },
  {
    label: "Postgraduate Range",
    range: "₹14,716 – ₹16,550",
  },
];

function formatFeeLabel(label: string = "", idx: number): string {
  const lower = label.toLowerCase();
  if (lower.includes("undergraduate") || lower.includes("ug")) {
    return "UNDERGRADUATE RANGE";
  }
  if (lower.includes("postgraduate") || lower.includes("pg")) {
    return "POSTGRADUATE RANGE";
  }
  if (label.trim()) {
    return label.toUpperCase();
  }
  return idx === 0 ? "UNDERGRADUATE RANGE" : "POSTGRADUATE RANGE";
}

function parseFeeRange(rawRange?: string) {
  if (!rawRange || !rawRange.trim()) {
    return {
      formattedRange: "₹10,383 – ₹15,133",
      subtext: "Per semester installment",
    };
  }

  let cleaned = rawRange.trim();
  let isTotal = false;

  if (
    cleaned.toLowerCase().includes("/total") ||
    cleaned.toLowerCase().includes("total")
  ) {
    isTotal = true;
    cleaned = cleaned.replace(/\/total/gi, "").replace(/total/gi, "").trim();
  }

  // Split on hyphen or en-dash
  const parts = cleaned.split(/[-–]/).map((s) => s.trim());
  let formattedRange = cleaned;

  if (parts.length === 2) {
    const p0 = parts[0].startsWith("₹") ? parts[0] : `₹${parts[0]}`;
    const p1 = parts[1].startsWith("₹") ? parts[1] : `₹${parts[1]}`;
    formattedRange = `${p0} – ${p1}`;
  } else if (!formattedRange.startsWith("₹")) {
    formattedRange = `₹${formattedRange}`;
  }

  return {
    formattedRange,
    subtext: isTotal ? "Total course fee (approx)" : "Per semester installment",
  };
}

export default function EligibilityFeesSection({
  university,
}: EligibilityFeesSectionProps) {
  const universityName = university?.name ?? "University";
  const eligibilityData = university?.details?.eligibility || {};

  const groups =
    eligibilityData.criteriaGroups && eligibilityData.criteriaGroups.length > 0
      ? eligibilityData.criteriaGroups
      : eligibilityData.groups && eligibilityData.groups.length > 0
      ? eligibilityData.groups
      : DEFAULT_ELIGIBILITY_GROUPS;

  const feeDesc = eligibilityData.feesDescription || eligibilityData.feeDesc;
  const feesHeading = eligibilityData.feesHeading || eligibilityData.feeHeading;
  const feesInstallments =
    eligibilityData.feesInstallments || eligibilityData.feeInstallments;

  let bullets = eligibilityData.feesBullets;
  if (!bullets || bullets.length === 0) {
    bullets = DEFAULT_FEE_ROWS.map((row) => ({
      isFeeRange: true,
      label: row.label,
      range: row.range,
    }));
  }

  const feeRanges = bullets.filter((b: any) => b.isFeeRange);
  const displayRanges = feeRanges.length > 0 ? feeRanges : DEFAULT_FEE_ROWS;

  const criteriaHeading =
    eligibilityData.criteriaHeading ||
    eligibilityData.heading ||
    eligibilityData.title ||
    "Eligibility *Criteria*";

  const feesTitle =
    feesHeading ||
    eligibilityData.feesHeading ||
    eligibilityData.feeHeading ||
    "Fees *Structure* & Semester Rates";

  const description =
    feeDesc ||
    `${universityName} Online adheres to a transparent, standardized fee framework sanctioned by university statutory bodies, without hidden examination or processing charges.`;

  const cleanInstallmentText = feesInstallments
    ? feesInstallments.replace(/\*+/g, "").trim()
    : "";
  const installmentDetail =
    cleanInstallmentText &&
    !cleanInstallmentText.toLowerCase().startsWith("easy installment") &&
    cleanInstallmentText.length > 25
      ? cleanInstallmentText
      : "Zero-cost EMI options available on credit/debit cards and leading educational NBFCs with zero foreclosure fees.";

  return (
    <section id="fee" className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-0 pb-8 sm:pt-1 sm:pb-12 font-sans">
      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
        {/* Left Card: Eligibility Criteria */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:p-8 shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-5 sm:mb-6">
              <HighlightedText text={criteriaHeading} defaultColor="#ea384c" />
            </h2>

            <div className="space-y-3.5 sm:space-y-4">
              {groups.map((group: any, gIdx: number) => (
                <div
                  key={gIdx}
                  className="rounded-2xl bg-[#f8fafc] border border-slate-200/70 p-4 sm:p-5 transition-colors duration-200 hover:border-slate-300/80"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#ea384c] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 pl-4">
                    {group.points?.map((point: string, pIdx: number) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Fees Structure & Semester Rates */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:p-8 shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              <HighlightedText text={feesTitle} defaultColor="#ea384c" />
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-2 mb-5 sm:mb-6">
              {description}
            </p>

            {/* Metric Range Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {displayRanges.slice(0, 2).map((rangeItem: any, idx: number) => {
                const isFirst = idx === 0;
                const formattedLabel = formatFeeLabel(rangeItem.label, idx);
                const { formattedRange, subtext } = parseFeeRange(rangeItem.range);

                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#f8fafc] border border-slate-200/70 p-4 sm:p-4.5 flex flex-col justify-between transition-colors duration-200 hover:border-slate-300/80"
                  >
                    <div>
                      <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        {formattedLabel}
                      </span>
                      <div
                        className={`text-base sm:text-lg lg:text-base xl:text-lg font-semibold tracking-tight mb-1 whitespace-nowrap overflow-hidden text-ellipsis tabular-nums ${
                          isFirst ? "text-[#ea384c]" : "text-slate-800"
                        }`}
                        title={formattedRange}
                      >
                        {formattedRange}
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                      {subtext}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Easy Installment Options Banner */}
          <div className="rounded-xl sm:rounded-2xl bg-red-50/70 border border-red-100/90 p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3 mt-auto">
            <Percent className="h-4 w-4 text-[#ea384c] shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-xs sm:text-[13px] text-red-600 leading-relaxed font-normal">
              <strong className="font-bold text-red-700">Easy Installment Options: </strong>
              <span>{installmentDetail}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
