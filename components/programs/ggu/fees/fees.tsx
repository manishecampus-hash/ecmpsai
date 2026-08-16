"use client";

import React from "react";
import { Calculator } from "lucide-react";

const feeData = [
  {
    specialization: "Sustainability",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Data Science",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Big Data",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Supply Chain Management",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Marketing",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "HR Management",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Healthcare Management",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  { specialization: "Finance", fees: "₹ 4,50,000/Full", duration: "36 Months" },
  {
    specialization: "International Business",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "Business Analytics",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
  {
    specialization: "General Management",
    fees: "₹ 4,50,000/Full",
    duration: "36 Months",
  },
];

export default function Fees() {
  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff3b4d]">
          Course Fees
        </span>

        <h2 className="mt-3 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Fees Structure of Rushford Online DBA/Doctorate
        </h2>

        <p className="mt-4 max-w-4xl text-[14px] leading-7 text-slate-600 sm:text-[15px]">
          Below is the detailed fee structure for the various programs offered
          by the "Rushford Online DBA/Doctorate". The fees listed below
          represents the total cost of the program. The total fees mentioned can
          be paid Yearly or semester-wise and EMI facilities are easily
          accessible.
        </p>

        <h3 className="mt-8 text-[18px] font-bold tracking-tight sm:text-[22px]">
          <span className="text-[#ff3b4d]">
            Rushford Business School Specialization Wise
          </span>{" "}
          <span className="text-gray-900">Updated Fees 2026</span>
        </h3>

        {/* ================= ROI CALCULATOR BUTTON ================= */}
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#ff3b4d] px-5 py-2.5 text-[13px] font-semibold text-white underline decoration-white/70 underline-offset-2 shadow-[0_6px_16px_rgba(255,59,77,0.25)] transition-colors hover:bg-red-600"
        >
          <Calculator className="h-4 w-4" />
          ROI Calculator
        </button>

        {/* ================= FEES TABLE ================= */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-[#0f1f3d]">
                  <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wide text-white">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-wide text-white">
                    Fees
                  </th>
                  <th className="px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-wide text-white">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, index) => (
                  <tr
                    key={row.specialization}
                    className={`border-b border-slate-100 last:border-0 ${
                      index % 2 === 0 ? "bg-red-50/40" : "bg-white"
                    } transition-colors hover:bg-red-50`}
                  >
                    <td className="px-6 py-4 text-[14px] font-medium text-[#0f1f3d] sm:text-[15px]">
                      {row.specialization}
                    </td>
                    <td className="px-6 py-4 text-center text-[14px] font-semibold text-[#ff3b4d] sm:text-[15px]">
                      {row.fees}
                    </td>
                    <td className="px-6 py-4 text-center text-[14px] text-slate-600 sm:text-[15px]">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= BOTTOM NOTE ================= */}
        <div className="mt-8 rounded-xl border border-red-100 bg-red-50/50 px-5 py-4 text-center">
          <p className="text-[13px] leading-6 text-slate-600">
            Fees shown are indicative for the full program duration. Contact our
            admissions team for the latest fee updates, scholarships, and EMI
            options available for your chosen specialization.
          </p>
        </div>
      </div>
    </section>
  );
}
