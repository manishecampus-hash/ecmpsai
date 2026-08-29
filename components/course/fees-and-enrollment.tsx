"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function FeesAndEnrollment({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const subHeading = data?.subHeading || data?.subheading || data?.description;
  const col1Header = data?.col1Header || "Top Universities Offering Online Programs";
  const col2Header = data?.col2Header || "Full Fees";

  const rawList = data?.rows || data?.list || data?.fees;
  const rows = Array.isArray(rawList) && rawList.length > 0
    ? rawList.map((item: any) => ({
        university: item.university || item.name || item.title || "",
        fee: item.fee || item.price || item.amount || "",
        link: item.link || item.url || "#"
      }))
    : [];

  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-10 font-sans text-black sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Fees") ? (
              <>
                {heading.split("Fees")[0]}
                <span className="text-[#ee2c3c]">Fees</span>
                {heading.split("Fees")[1]}
              </>
            ) : (
              heading
            )}
          </h2>

          {subHeading && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base max-w-3xl mx-auto">
              {subHeading}
            </p>
          )}
        </div>

        {/* Fees Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#ee2c3c]">
                <th className="px-6 py-4 text-sm font-bold text-white">
                  {col1Header}
                </th>
                <th className="px-6 py-4 text-sm font-bold text-white">
                  {col2Header}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-red-50/40" : "bg-white"
                  } ${
                    i !== rows.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    {row.link && row.link !== "#" ? (
                      <a
                        href={row.link}
                        className="text-sm font-semibold text-red-500 underline decoration-red-200 transition-colors hover:decoration-red-500 sm:text-base"
                      >
                        {row.university}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-800 sm:text-base">
                        {row.university}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-700 sm:text-base">
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
