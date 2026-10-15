"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CourseSection, Reveal, SectionHeading } from "./section-ui";

const PAGE_SIZE = 10;

export default function FeesAndEnrollment({ data }: { data?: any }) {
  const [page, setPage] = useState(0);
  const tableRef = useRef<HTMLDivElement>(null);
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

  const pages = Math.ceil(rows.length / PAGE_SIZE);
  const current = Math.min(page, pages - 1);
  const visible = rows.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  // Change page, then bring the table top back into view (below the sticky navbar + sub-header)
  const goTo = (n: number) => {
    setPage(n);
    const el = tableRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <CourseSection>
      <SectionHeading heading={heading} fallback={/Fees/} sub={subHeading} />

      <Reveal>
        <div ref={tableRef} className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-red-100 bg-red-50 text-slate-900">
                <th scope="col" className="w-16 border-r border-red-100 px-4 py-4 text-center font-bold">#</th>
                <th scope="col" className="border-r border-red-100 px-6 py-4 font-bold">{col1Header}</th>
                <th scope="col" className="px-6 py-4 font-bold">{col2Header}</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait" initial={false}>
            <motion.tbody
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {visible.map((row, idx) => {
                const i = current * PAGE_SIZE + idx;
                const hasLink = row.link && row.link !== "#";
                return (
                  <tr key={i} className="border-b border-slate-200 transition-colors last:border-b-0 hover:bg-red-50/40">
                    <td className="border-r border-slate-200 px-4 py-4 text-center font-semibold tabular-nums text-slate-500">{i + 1}</td>
                    <td className="border-r border-slate-200 px-6 py-4 font-semibold text-slate-900">
                      {hasLink ? (
                        <a href={row.link} className="inline-flex items-center gap-1 hover:text-[#ee2c3c]">
                          {row.university}
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                        </a>
                      ) : (
                        row.university
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium tabular-nums text-slate-700">{row.fee}</td>
                  </tr>
                );
              })}
            </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {pages > 1 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <nav
              aria-label="Table pages"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.35)]"
            >
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-[#ee2c3c] disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              {Array.from({ length: pages }, (_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goTo(n)}
                  aria-current={n === current ? "page" : undefined}
                  aria-label={`Page ${n + 1}`}
                  className={`h-9 w-9 rounded-full text-sm font-bold tabular-nums transition-all duration-300 ${
                    n === current
                      ? "scale-105 bg-gradient-to-br from-[#ee2c3c] to-rose-500 text-white shadow-[0_8px_16px_-6px_rgba(238,44,60,0.7)]"
                      : "text-slate-600 hover:bg-red-50 hover:text-[#ee2c3c]"
                  }`}
                >
                  {n + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === pages - 1}
                className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-[#ee2c3c] disabled:pointer-events-none disabled:opacity-35"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="h-1 w-24 overflow-hidden rounded-full bg-slate-200">
                <span
                  className="block h-full rounded-full bg-[#ee2c3c] transition-[width] duration-500"
                  style={{ width: `${((current * PAGE_SIZE + visible.length) / rows.length) * 100}%` }}
                />
              </span>
              Showing {current * PAGE_SIZE + 1}–{current * PAGE_SIZE + visible.length} of {rows.length} universities
            </div>
          </div>
        )}
      </Reveal>
    </CourseSection>
  );
}
