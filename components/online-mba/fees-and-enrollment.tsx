"use client";

import React from "react";

type FeeRow = {
  university: string;
  fee: string;
};

const FEES: FeeRow[] = [
  { university: "Alliance Online MBA", fee: "INR 1.60 Lakhs" },
  { university: "Amity Online MBA", fee: "INR 2.25 Lakhs" },
  { university: "DPU Pune Online MBA", fee: "INR 1.89 Lakhs" },
  { university: "UPES Online MBA", fee: "INR 1.75 Lakhs" },
  { university: "LPU Online MBA", fee: "INR 2.00 Lakhs" },
];

const ENROLL_STEPS: string[] = [
  "Visit the university's official online admissions page.",
  "Register and log in to your applicant portal.",
  "Fill out the application form and select your Online MBA specialization.",
  "Upload the required documents — mark sheets, ID proof, and photographs.",
  "Pay the application/enrolment fee and get confirmation via email & phone.",
];

export default function FeesAndEnrollment() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-8 font-sans text-black sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Fees Section Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Online MBA Course{" "}
            <span className="text-[#ee2c3c]">Fees</span>
          </h2>
        </div>


        {/* Fees Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#ee2c3c]">
                <th className="px-6 py-4 text-sm font-bold text-white">
                  Top Universities Offering Online MBA
                </th>
                <th className="px-6 py-4 text-sm font-bold text-white">
                  Full Fees
                </th>
              </tr>
            </thead>

            <tbody>
              {FEES.map((row, i) => (
                <tr
                  key={row.university}
                  className={`${
                    i % 2 === 0 ? "bg-red-50/40" : "bg-white"
                  } ${
                    i !== FEES.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="text-sm font-semibold text-red-500 underline decoration-red-200 transition-colors hover:decoration-red-500 sm:text-base"
                    >
                      {row.university}
                    </a>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700 sm:text-base">
                    {row.fee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
    
      </div>
    </section>
  );
}