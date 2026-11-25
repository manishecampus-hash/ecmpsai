"use client";

import { useState, useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLElement>(null);

  const isElementVisible = (el: HTMLElement): boolean => {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  };

  const getTargetElement = (id: string): HTMLElement | null => {
    if (typeof document === "undefined") return null;

    // 1. Search inside the same blog container / wrapper as this TableOfContents instance
    // This correctly separates mobile headings from hidden desktop headings (or vice versa)
    const parentContainer =
      navRef.current?.closest(".blog-container") ||
      navRef.current?.closest("article") ||
      navRef.current?.parentElement;

    if (parentContainer) {
      try {
        const localEl = parentContainer.querySelector<HTMLElement>(
          `#${CSS.escape(id)}`
        );
        if (localEl && isElementVisible(localEl)) {
          return localEl;
        }
      } catch {
        const fallbackLocal = parentContainer.querySelector<HTMLElement>(
          `[id="${id}"]`
        );
        if (fallbackLocal && isElementVisible(fallbackLocal)) {
          return fallbackLocal;
        }
      }
    }

    // 2. Search document-wide for all matching IDs, and pick the one that is currently visible
    try {
      const allEls = Array.from(
        document.querySelectorAll<HTMLElement>(`#${CSS.escape(id)}`)
      );
      const visible = allEls.find(isElementVisible);
      if (visible) return visible;
      if (allEls.length > 0) return allEls[0];
    } catch {
      const allElsFallback = Array.from(
        document.querySelectorAll<HTMLElement>(`[id="${id}"]`)
      );
      const visibleFallback = allElsFallback.find(isElementVisible);
      if (visibleFallback) return visibleFallback;
      if (allElsFallback.length > 0) return allElsFallback[0];
    }

    // 3. Fallback to standard getElementById
    return document.getElementById(id);
  };

  const clickLock = useRef(false);
  const clickLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (clickLockTimer.current) clearTimeout(clickLockTimer.current);
    },
    [],
  );

  // Highlight the heading currently being read: the last one that has passed the top of the screen.
  // Checked on every scroll, so it stays right when scrolling down, up, or jumping.
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // A clicked heading lands 80px from the top, so the line sits a little below that
    const READ_LINE = 120;
    let targets: { id: string; el: HTMLElement }[] = [];
    let frame = 0;

    const collect = () => {
      targets = headings
        .map(({ id }) => ({ id, el: getTargetElement(id) }))
        .filter((t): t is { id: string; el: HTMLElement } => Boolean(t.el));
    };

    const update = () => {
      frame = 0;
      // After a click, hold the clicked heading until the page has finished gliding to it,
      // instead of flicking through every heading on the way
      if (clickLock.current) {
        if (clickLockTimer.current) clearTimeout(clickLockTimer.current);
        clickLockTimer.current = setTimeout(() => {
          clickLock.current = false;
        }, 150);
        return;
      }
      if (targets.length === 0) return;
      let current = targets[0].id;
      for (const { id, el } of targets) {
        if (el.getBoundingClientRect().top <= READ_LINE) current = id;
        else break;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      collect();
      onScroll();
    };

    collect();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  // Keep the highlighted heading visible inside the list when the list has its own scroll
  // (desktop sidebar). Only the list moves, never the page.
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollHeight <= list.clientHeight) return;
    const item = list.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(active)}"]`);
    if (!item) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    // Leave the list still while the heading is comfortably in view (e.g. the one just clicked),
    // so it doesn't shift under the pointer or nudge on every heading while reading
    if (itemRect.top >= listRect.top + 24 && itemRect.bottom <= listRect.bottom - 48) return;
    // Otherwise bring it about a third of the way down, so the next ones show too
    const target = list.scrollTop + (itemRect.top - listRect.top) - list.clientHeight / 3;
    list.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  if (!headings || headings.length === 0) return null;

  const handleHeadingClick = (id: string) => {
    const el = getTargetElement(id);
    if (el) {
      // Hold this highlight while the page glides; released 150ms after scrolling stops,
      // or after 1s if the page is already in place and doesn't scroll at all
      clickLock.current = true;
      if (clickLockTimer.current) clearTimeout(clickLockTimer.current);
      clickLockTimer.current = setTimeout(() => {
        clickLock.current = false;
      }, 1000);

      // 80px accounts for top fixed navbar (64px) + breathing space
      const yOffset = -80;
      const elementTop = el.getBoundingClientRect().top;
      const y = elementTop + window.pageYOffset + yOffset;
      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth",
      });

      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
      setActive(id);
    }
  };

  const visibleHeadings =
    collapsible && !isExpanded
      ? headings.slice(0, PREVIEW_COUNT)
      : headings;
  const hasMore = collapsible && headings.length > PREVIEW_COUNT;

  return (
    <nav
      ref={navRef}
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
      <ul ref={listRef} className="toc-list space-y-1 list-none p-0 m-0">
        {visibleHeadings.map(({ id, text, label, level }) => {
          const displayText = label ?? text ?? id;
          const isActive = active === id;

          return (
            // Indent sits on the row (padding), so the full-width button never spills past the list edge
            <li
              key={id}
              data-toc-id={id}
              className={`text-xs sm:text-sm ${level === 3 ? "pl-3" : level === 2 ? "pl-1.5" : ""}`}
            >
              <button
                type="button"
                onClick={() => handleHeadingClick(id)}
                className={`w-full flex items-start gap-2.5 py-1.5 px-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  level === 3
                    ? "text-[12.5px]"
                    : level === 2
                    ? "text-xs sm:text-sm"
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
