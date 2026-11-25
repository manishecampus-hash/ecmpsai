"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface SubHeaderItemProp {
  id: string;
  title: string;
  url: string;
  urlType?: "relative" | "anchor";
}

interface SubHeaderProps {
  subHeaders?: SubHeaderItemProp[];
  courseSlug?: string;
  /** Un-pin the bar (showing the main header again) once the section with this id has been scrolled past */
  hideAfterId?: string;
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  isAnchor?: boolean;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "about", label: "Program Overview", isAnchor: true },
  { id: "subject-syllabus", label: "Subjects/Syllabus", href: "/online-mba/subject-syllabus" },
  { id: "eligibility-duration", label: "Eligibility & Duration", href: "/online-mba/eligibility-duration" },
  { id: "program-fees", label: "Program Fees", href: "/online-mba/program-fees" },
  { id: "admission-procedure", label: "Admission Procedure", href: "/online-mba/admission-procedure" },
  { id: "top-specializations", label: "Top Specializations", href: "/online-mba/top-specializations" },
  { id: "education-loans", label: "EducationLoan/EMIs", href: "/online-mba/education-loans" },
  { id: "worth-it", label: "Worth It?", href: "/online-mba/worth-it" },
  { id: "career-scope", label: "Career Scope", href: "/online-mba/career-scope" },
  { id: "coupons", label: "Coupons", href: "/online-mba/coupons" },
];

/** Sideways scroll position of the bar per course, kept while moving between its sub-pages */
const barScrollMemory = new Map<string, number>();
/** Position of the last current link per course, to tell going forward from going back */
const barActiveMemory = new Map<string, number>();

export default function SubHeader({ subHeaders, courseSlug = "online-mba", hideAfterId }: SubHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("overview");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const mainHeaderHeight = 70;
  const stickyTriggerOffset = 400;
  // Pinned after 400px, until the `hideAfterId` section (e.g. the FAQs) has been scrolled past
  const shouldPin = () => {
    const endEl = hideAfterId ? document.getElementById(hideAfterId) : null;
    const pastEnd = Boolean(endEl && endEl.getBoundingClientRect().bottom <= 64);
    return window.scrollY > stickyTriggerOffset && !pastEnd;
  };
  const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const cleanCourseSlug = (courseSlug || "online-mba").replace(/^\/+|\/+$/g, "");
  const basePath = `/${cleanCourseSlug}`;

  const isOnlineMbaRoute = pathname === "/online-mba" || pathname.startsWith("/online-mba/");
  // Course sub-pages (e.g. /online-ba/subject-syllabus) pin the bar to the top from the start, exactly as it
  // looks after scrolling; the course page itself keeps revealing it only after scrolling.
  const isSubPage = pathname.startsWith(`${basePath}/`);

  // If no sub-headers punched in CMS and this is NOT the static /online-mba route, do not render sub-header bar
  if ((!subHeaders || subHeaders.length === 0) && !isOnlineMbaRoute) {
    return null;
  }

  // Build items from CMS subHeaders or fallback DEFAULT_NAV_ITEMS for online-mba
  const items: NavItem[] =
    subHeaders && subHeaders.length > 0
      ? subHeaders.map((sh) => {
          const rawUrl = (sh.url || "").trim();
          const isAnchor = sh.urlType === "anchor" || rawUrl.startsWith("#");
          if (isAnchor) {
            const anchorId = rawUrl.replace(/^#/, "").toLowerCase();
            return {
              id: anchorId,
              label: (sh.title || "").replace(/\*/g, "").trim(),
              isAnchor: true,
            };
          } else {
            const relSlug = rawUrl.replace(/^\/+|\/+$/g, "").toLowerCase();
            return {
              id: relSlug,
              label: (sh.title || "").replace(/\*/g, "").trim(),
              href: `${basePath}/${relSlug}`,
              isAnchor: false,
            };
          }
        })
      : DEFAULT_NAV_ITEMS;

  useLayoutEffect(() => {
    const update = () => {
      const h = navRef.current?.offsetHeight ?? 56;
      setSubHeaderHeight(h);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  useLayoutEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  // Each sub-page mounts a fresh bar. Put it back where it was on the previous page straight away,
  // so it never replays the slide from the first link.
  const hadSavedScroll = useRef(false);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const saved = barScrollMemory.get(basePath);
    if (saved !== undefined) {
      el.scrollLeft = saved;
      hadSavedScroll.current = true;
    }
    const remember = () => barScrollMemory.set(basePath, el.scrollLeft);
    el.addEventListener("scroll", remember, { passive: true });
    return () => el.removeEventListener("scroll", remember);
  }, [basePath]);

  // Then move only as far as needed: going forward, the current link and the one after it come
  // on screen; going back, the current link and the one before it do.
  // Only the bar scrolls sideways; the page itself does not move.
  useEffect(() => {
    const el = scrollRef.current;
    const active = el?.querySelector<HTMLElement>('[data-active="true"]');
    if (!el || !active) return;

    const links = Array.from(el.children) as HTMLElement[];
    const index = links.indexOf(active);
    const lastIndex = barActiveMemory.get(basePath);
    barActiveMemory.set(basePath, index);
    const goingBack = lastIndex !== undefined && index < lastIndex;

    const prev = links[index - 1] ?? active;
    const next = links[index + 1] ?? active;
    const barLeft = el.getBoundingClientRect().left;
    const leftOf = (node: HTMLElement) => node.getBoundingClientRect().left - barLeft;
    const rightOf = (node: HTMLElement) => node.getBoundingClientRect().right - barLeft;
    const pad = 8;
    const viewEnd = el.clientWidth - pad;

    let delta = 0;
    if (goingBack) {
      if (leftOf(prev) < pad) delta = leftOf(prev) - pad;
      // never push the current link off the right edge
      if (rightOf(active) - delta > viewEnd) delta = rightOf(active) - viewEnd;
    } else {
      if (rightOf(next) > viewEnd) delta = rightOf(next) - viewEnd;
      // never push the current link off the left edge
      if (leftOf(active) - delta < pad) delta = leftOf(active) - pad;
    }
    if (Math.abs(delta) < 1) return;

    // Smooth when moving on from a previous page; instant on a fresh visit so there is no long slide
    el.scrollBy({ left: delta, behavior: hadSavedScroll.current ? "smooth" : "auto" });
    hadSavedScroll.current = true;
  }, [pathname, activeId]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.6, 160);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (pathname !== basePath) return;

    const handleScroll = () => {
      setIsSticky(shouldPin());

      const offset =
        (window.scrollY > stickyTriggerOffset
          ? subHeaderHeight
          : mainHeaderHeight + subHeaderHeight) + 20;

      let currentId = activeId;
      for (const item of items) {
        if (!item.isAnchor) continue;
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentId = item.id;
        }
      }
      setActiveId((prev) => (prev !== currentId ? currentId : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, basePath, subHeaderHeight, activeId, items]);

  useEffect(() => {
    if (pathname === basePath) return;
    const handleScroll = () => setIsSticky(shouldPin());
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, basePath]);

  useEffect(() => {
    const mainHeader = document.getElementById("main-header");
    if (!mainHeader) return;
    if (isSticky) {
      mainHeader.classList.add("main-header--hidden");
      mainHeader.setAttribute("aria-hidden", "true");
    } else {
      mainHeader.classList.remove("main-header--hidden");
      mainHeader.removeAttribute("aria-hidden");
    }
  }, [isSticky]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      if (pathname !== basePath) {
        router.push(`${basePath}#${id}`);
      }
      return;
    }

    setActiveId(id);

    const offset = isSticky
      ? subHeaderHeight
      : mainHeaderHeight + subHeaderHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const pinned = isSticky || isSubPage;

  return (
    <div
      ref={navRef}
      style={{
        position: "fixed",
        top: pinned ? 0 : "-100px",
        left: 0,
        right: 0,
        zIndex: 70,
        borderBottom: "1px solid #e6f0fa",
        background: "#ffffff",
        boxShadow: pinned ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 200ms ease, top 250ms ease",
        pointerEvents: "auto",
      }}
    >
      <style jsx>{`
        .subheader-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .subheader-scroll::-webkit-scrollbar {
          display: none;
          height: 0;
        }
        .subheader-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
        }
        .subheader-item {
          scroll-snap-align: start;
        }
        .subheader-arrow {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 1px solid #e6f0fa;
          background: #ffffff;
          color: #111827;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            opacity 0.2s ease;
        }
        .subheader-arrow:hover {
          background: #fef2f2;
          color: #ef4444;
          border-color: #fecaca;
        }
        .subheader-arrow:disabled {
          opacity: 0;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .subheader-scroll {
            gap: 0.25rem !important;
            padding: 0.6rem 0.5rem !important;
          }
          .subheader-item {
            font-size: 0.78rem !important;
            padding: 0.4rem 0.4rem !important;
          }
          .subheader-arrow {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.5rem 0.75rem",
          gap: "0.5rem",
        }}
      >
        <button
          type="button"
          aria-label="Scroll left"
          className="subheader-arrow"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="subheader-scroll"
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            flex: "1 1 auto",
            justifyContent: "flex-start",
          }}
        >
          {items.map((item) => {
            const isActive = item.href
              ? pathname === item.href
              : pathname === basePath && item.id === activeId;

            const commonStyles = {
              flex: "0 0 auto",
              whiteSpace: "nowrap" as const,
              padding: "0.5rem 0.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: isActive ? "#ef4444" : "#111827",
              transition: "color 0.2s ease",
              borderBottom: isActive
                ? "3px solid #ef4444"
                : "3px solid transparent",
            };

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  data-active={isActive ? "true" : undefined}
                  className="subheader-item"
                  style={{
                    ...commonStyles,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                data-active={isActive ? "true" : undefined}
                className="subheader-item"
                style={{
                  ...commonStyles,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: item.id === "about" ? "0.65rem" : undefined,
                }}
              >
                {item.id === "about" && <Home size={18} />}
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          className="subheader-arrow"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
