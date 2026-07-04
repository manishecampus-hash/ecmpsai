"use client";

import { useEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "programs", label: "Programs" },
  { id: "specializations", label: "Specializations" },
  { id: "approvals", label: "Approvals" },
  { id: "placements", label: "Placements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQs" },
];

// How far (in px) the user needs to scroll before the sub-header appears.
const SHOW_AFTER_SCROLL = 320;

export default function SubHeader() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Track which section is currently in view and toggle sticky shadow
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Keep the active pill scrolled into view on mobile
  useEffect(() => {
    const activeEl = itemRefs.current[activeId];
    if (activeEl && navRef.current) {
      const nav = navRef.current;
      const elLeft = activeEl.offsetLeft;
      const elRight = elLeft + activeEl.offsetWidth;
      if (
        elLeft < nav.scrollLeft ||
        elRight > nav.scrollLeft + nav.clientWidth
      ) {
        nav.scrollTo({ left: elLeft - 16, behavior: "smooth" });
      }
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    setActiveId(id);

    const el = document.getElementById(id);
    if (!el) {
      // eslint-disable-next-line no-console
      console.warn(
        `[SubHeader] No element with id="${id}" found on the page. ` +
          `Make sure the matching <section> has that id.`,
      );
      return;
    }

    const headerOffset = 96; // account for sticky sub-header + any main navbar
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={`sticky top-0 z-[60] w-full border-b border-slate-100 bg-white/95 backdrop-blur transition-all duration-300 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      } ${isSticky ? "shadow-sm" : ""}`}
    >
      <div
        ref={navRef}
        className="relative z-[60] mx-auto flex max-w-7xl justify-center gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              type="button"
              onClick={() => handleClick(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative z-[60] shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-red-50 text-red-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
