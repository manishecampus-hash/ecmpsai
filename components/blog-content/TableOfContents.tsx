"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";

type Heading = { id: string; text?: string; label?: string; level: number };

const PREVIEW_COUNT = 4;

export function TableOfContents({
  headings,
  collapsible = false,
}: {
  headings: Heading[];
  collapsible?: boolean;
}) {
  const [active, setActive] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(!collapsible);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const handleHeadingClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const visibleHeadings =
    collapsible && !isExpanded
      ? headings.slice(0, PREVIEW_COUNT)
      : headings;
  const hasMore = collapsible && headings.length > PREVIEW_COUNT;

  return (
    <nav
      aria-label="Table of contents"
      className="w-full rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_2px_6px_-1px_rgba(15,23,42,0.03)] font-sans transition-all duration-200 hover:border-slate-300"
    >
      {/* ── Header ── */}
      <div
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between pb-3 border-b border-slate-100 mb-3 ${
          collapsible ? "cursor-pointer select-none" : ""
        }`}
      >
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 border border-red-100/70 shadow-2xs">
            <ListOrdered className="h-4 w-4 stroke-[2.2]" />
          </div>
          <span>Table of Contents</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100/80 px-2.5 py-0.5 rounded-full border border-slate-200/60">
            {headings.length} Topics
          </span>
          {collapsible && (
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>

      {/* ── Items ── */}
      <ul className="space-y-1 list-none p-0 m-0">
        {visibleHeadings.map(({ id, text, label, level }) => {
          const displayText = label ?? text ?? id;
          const isActive = active === id;

          return (
            <li key={id} className="text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => handleHeadingClick(id)}
                className={`w-full flex items-start gap-2.5 py-1.5 px-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  level === 3
                    ? "ml-3 text-[12.5px]"
                    : level === 2
                    ? "ml-1.5 text-xs sm:text-sm"
                    : "text-xs sm:text-sm"
                } ${
                  isActive
                    ? "bg-red-50/90 text-red-600 font-bold shadow-2xs border-l-3 border-red-500"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? "bg-red-500" : "bg-slate-300"
                  }`}
                />
                <span className="line-clamp-2 leading-relaxed">{displayText}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── View all / View less (only if collapsible) ── */}
      {hasMore && (
        <div className="pt-2.5 mt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? "Show Less" : "View Full Outline"}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180 text-red-600" : "text-slate-600"
              }`}
            />
          </button>
        </div>
      )}
    </nav>
  );
}

export default TableOfContents;
