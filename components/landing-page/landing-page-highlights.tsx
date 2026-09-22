"use client";

import React from "react";
import {
  Bookmark,
  CheckSquare,
  Search,
  CalendarDays,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface ComparisonColumnItem {
  id: string;
  title: string;
}

export interface ComparisonRowItem {
  id: string;
  title: string;
  columnValues: Record<string, string>;
  icon?: string;
}

export interface LandingPageHighlightsData {
  sectionHeading?: string;
  columns?: ComparisonColumnItem[];
  rows?: ComparisonRowItem[];
}

interface LandingPageHighlightsProps {
  highlights?: LandingPageHighlightsData;
}

const ROW_ICONS = [Bookmark, CheckSquare, Search, CalendarDays, Users, Award, BookOpen];

export function LandingPageHighlights({ highlights }: LandingPageHighlightsProps) {
  if (!highlights || !highlights.rows || highlights.rows.length === 0) return null;

  const sectionHeading = highlights.sectionHeading || "Key Highlights";
  const columns = highlights.columns && highlights.columns.length > 0
    ? highlights.columns
    : [
        { id: "col-1", title: "Program A" },
        { id: "col-2", title: "Program B" },
      ];
  const rows = highlights.rows;

  return (
    <section className="relative z-10 w-full overflow-hidden bg-slate-50/60 border-b border-slate-100 !m-0 !p-0">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ================= SECTION HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-12 sm:mb-14 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="relative hidden overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm md:block">
          {/* TABLE HEADER */}
          <div
            className="grid border-b border-slate-200 bg-slate-100/60"
            style={{
              gridTemplateColumns: `1.15fr ${columns.map(() => "1fr").join(" ")}`,
            }}
          >
            {/* Empty first corner */}
            <div className="p-4 flex items-center px-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Features &amp; Comparison</span>
            </div>

            {/* Column Headers */}
            {columns.map((col, idx) => (
              <div
                key={col.id}
                className="flex items-end justify-center p-3.5"
              >
                <div
                  className={`flex h-12 w-full max-w-[220px] items-center justify-center rounded-xl px-5 text-sm sm:text-base font-black text-white shadow-xs ${
                    idx === 0
                      ? "bg-gradient-to-r from-red-600 to-red-500 shadow-[0_4px_12px_rgba(239,68,68,0.25)]"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  {col.title}
                </div>
              </div>
            ))}
          </div>

          {/* TABLE ROWS */}
          {rows.map((row, rIdx) => {
            const Icon = ROW_ICONS[rIdx % ROW_ICONS.length];

            return (
              <div
                key={row.id || row.title}
                className={`grid border-b border-slate-100 last:border-b-0 transition-colors ${
                  rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                }`}
                style={{
                  gridTemplateColumns: `1.15fr ${columns.map(() => "1fr").join(" ")}`,
                }}
              >
                {/* Row Title Column */}
                <div className="flex min-h-[85px] items-center gap-3.5 px-6 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50/90 text-red-600 border border-red-100/70">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </div>
                  <span className="text-sm sm:text-[15px] font-bold text-slate-900">
                    {row.title}
                  </span>
                </div>

                {/* Column values */}
                {columns.map((col, colIdx) => (
                  <div
                    key={col.id}
                    className={`flex min-h-[85px] items-center border-l border-slate-100 px-6 py-4 ${
                      colIdx === 0
                        ? "bg-red-50/30 font-semibold text-slate-900"
                        : "text-slate-600 text-sm leading-relaxed"
                    }`}
                  >
                    <p className="m-0 text-sm sm:text-[14px] leading-relaxed font-medium">
                      {row.columnValues?.[col.id] || "—"}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="space-y-4 md:hidden">
          {rows.map((row, rIdx) => {
            const Icon = ROW_ICONS[rIdx % ROW_ICONS.length];

            return (
              <div
                key={row.id || row.title}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs"
              >
                {/* Title */}
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-3.5 border-b border-slate-100">
                  <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 border border-red-100/60">
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="m-0 text-sm font-bold text-slate-900">
                    {row.title}
                  </h3>
                </div>

                {/* Column details */}
                <div className="divide-y divide-slate-100">
                  {columns.map((col, colIdx) => (
                    <div
                      key={col.id}
                      className={`p-4 ${
                        colIdx === 0 ? "bg-red-50/40 text-slate-900" : "bg-white text-slate-700"
                      }`}
                    >
                      <div
                        className={`inline-block mb-1.5 rounded-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                          colIdx === 0
                            ? "bg-red-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {col.title}
                      </div>
                      <p className="m-0 text-xs sm:text-sm font-medium leading-relaxed">
                        {row.columnValues?.[col.id] || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingPageHighlights;
