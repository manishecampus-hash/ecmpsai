"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { ArrowUpRight } from "lucide-react";

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
    <section className="relative mx-auto w-full max-w-6xl px-4 py-10 font-sans text-black sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl font-[Inter]">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
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
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {subHeading}
            </p>
          )}
        </div>

        {/* Fees Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="hidden w-16 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:table-cell">
                  #
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                  {col1Header}
                </th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                  {col2Header}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="group transition-colors hover:bg-red-50/40">
                  <td className="hidden px-6 py-4 sm:table-cell">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                      {i + 1}
                    </span>
                  </td>

                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-[#ee2c3c] ring-1 ring-red-100 sm:flex">
                        {row.university?.trim().charAt(0) || "•"}
                      </span>
                      {row.link && row.link !== "#" ? (
                        <a
                          href={row.link}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors hover:text-[#ee2c3c] sm:text-base"
                        >
                          {row.university}
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-[#ee2c3c]" />
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-900 sm:text-base">
                          {row.university}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right sm:px-6">
                    <span className="inline-flex rounded-lg sm:whitespace-nowrap bg-slate-50 px-3 py-1.5 text-sm font-bold tabular-nums text-slate-900 ring-1 ring-slate-200 transition-colors group-hover:bg-white group-hover:ring-red-200 sm:text-base">
                      {row.fee}
                    </span>
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
