"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CourseSection, Reveal, SectionHeading } from "./section-ui";

/** "₹2,07,000 - ₹4,13,000" → 207000 (the starting fee), or null when there's no number */
function startingFee(fee: string) {
  const first = fee.match(/\d[\d,]*/);
  return first ? Number(first[0].replace(/,/g, "")) : null;
}

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

  // Fee bar: each university's starting fee against the highest starting fee in the list
  const fees = rows.map((r) => startingFee(String(r.fee)));
  const known = fees.filter((f): f is number => f !== null && f > 0);
  const maxFee = known.length ? Math.max(...known) : 0;
  const minFee = known.length > 1 ? Math.min(...known) : null;

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Fees/} sub={subHeading} />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="h-4 w-1 rounded-full bg-[#ee2c3c]" />
          {col1Header}
        </p>
        {maxFee > 0 && (
          <p className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
            Lower
            <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-red-200 to-[#ee2c3c]" />
            Higher {col2Header.toLowerCase()}
          </p>
        )}
      </div>

      <div className="grid gap-2.5 sm:gap-3 md:grid-cols-2">
        {rows.map((row, i) => {
          const fee = fees[i];
          const isLowest = minFee !== null && fee === minFee;
          const hasLink = row.link && row.link !== "#";
          const Card = hasLink ? "a" : "div";

          return (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <Card
                {...(hasLink ? { href: row.link } : {})}
                className="group flex h-full items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_18px_36px_-22px_rgba(238,44,60,0.45)] sm:p-5"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-base font-extrabold text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                  {row.university?.trim().charAt(0) || "•"}
                  <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
                    {i + 1}
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#ee2c3c]">
                      {row.university}
                      {hasLink && <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 text-slate-400 group-hover:text-[#ee2c3c]" />}
                    </h3>
                    {isLowest && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                        Lowest fee
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{col2Header}</span>
                    <span className="text-[15px] font-extrabold tabular-nums text-slate-900 sm:text-base">{row.fee}</span>
                  </div>

                  {fee !== null && maxFee > 0 && (
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-red-300 to-[#ee2c3c] transition-[width] duration-700"
                        style={{ width: `${Math.max(8, Math.round((fee / maxFee) * 100))}%` }}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </CourseSection>
  );
}
