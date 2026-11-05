"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb, TrendingUp } from "lucide-react";
import { careerExplorerData } from "@/data/career-explorer";

export interface JobRoleItem {
  id?: string;
  heading?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
  ribbonText?: string;
  package?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface CareerExplorerProps {
  jobRoles?: JobRoleItem[];
  title?: string;
}

interface RoleColors {
  bg: string;
  border: string;
  text: string;
}

const colorPalette: RoleColors[] = [
  { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-500" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-500" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-500" },
  { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-500" },
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-500" },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-500" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-500" },
];

const specificMap: Record<string, RoleColors> = {
  "AI & ML Engineer": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  "Software Developer": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
  "Data Scientist": { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-500" },
  "Cyber Security Analyst": { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-500" },
  "Cloud Engineer": { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  "Business Analyst": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-500" },
  "Product Manager": { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-500" },
  "Project Manager": { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-500" },
  "Digital Marketing Manager": { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-500" },
  "Financial Analyst": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-500" },
};

// How long each role stays in the showcase before the next one slides in
const AUTO_ADVANCE_MS = 5000;

// Red line under the selected role that fills from 0 to 100% over AUTO_ADVANCE_MS (keep the 5s in step with it)
const COUNTDOWN_BAR =
  "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-red-500/70 animate-[draw_5s_linear_forwards]";

// Roles listed per page in the desktop list; the card is as tall as one full page
const ROLES_PER_PAGE = 5;

// Where the three orbiting role icons sit on the ring (top, lower right, lower left)
const SATELLITE_SPOTS = ["left-1/2 top-0", "left-[93.3%] top-3/4", "left-[6.7%] top-3/4"];

const getColors = (itemTitle: string, index: number): RoleColors => {
  if (specificMap[itemTitle]) return specificMap[itemTitle];
  return colorPalette[index % colorPalette.length];
};

const CareerExplorer: React.FC<CareerExplorerProps> = ({ jobRoles, title }) => {
  const [active, setActive] = useState(0);
  // Bumped on every selection so the countdown bar and auto-advance timer restart
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageDir, setPageDir] = useState(1);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const handleOpenSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-signup"));
    }
  };

  // Roles from the admin panel: hidden ones (isActive false) are left out and the rest follow their display order
  const adminRoles = (jobRoles ?? [])
    .filter((r) => r && r.isActive !== false && (r.heading || r.title))
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  // Normalize items from dynamic jobRoles prop, falling back to static dataset if empty
  const items =
    adminRoles.length > 0
      ? adminRoles.map((r, idx) => ({
          id: r.id || String(idx + 1),
          title: r.heading || r.title || "",
          description: r.description || "",
          ctaText: r.ctaText || "Explore",
          ctaUrl: r.ctaUrl || "",
          image: r.image || `/career/${(idx % 15) + 1}image.png`,
          package: r.ribbonText || r.package || "",
        }))
      : careerExplorerData.map((d) => ({
          id: String(d.id),
          title: d.title,
          description: d.description,
          ctaText: "Explore",
          ctaUrl: "",
          image: d.image,
          package: d.package || "",
        }));

  // Render title with customizable red highlight for words surrounded by *...* or "Job Role"
  const renderTitle = () => {
    const raw = title || "Enhance Skills by *Job Role*";
    if (raw.includes("*")) {
      const parts = raw.split(/\*([^*]+)\*/g);
      return parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-red-500">
            {part}
          </span>
        ) : (
          part
        )
      );
    }
    if (raw.includes("Job Role")) {
      const parts = raw.split("Job Role");
      return (
        <>
          {parts[0]}
          <span className="text-red-500">Job Role</span>
          {parts[1]}
        </>
      );
    }
    return raw;
  };

  const total = items.length;
  const current = items[Math.min(active, total - 1)] ?? items[0];
  const colors = getColors(current?.title ?? "", Math.min(active, total - 1));

  const select = useCallback(
    (i: number) => {
      setActive(((i % total) + total) % total);
      setCycle((c) => c + 1); // restarts the progress bar
    },
    [total],
  );

  // The desktop list shows the page holding the selected role, so auto-advance turns the pages too
  const pageCount = Math.ceil(total / ROLES_PER_PAGE);
  const page = Math.floor(Math.min(active, total - 1) / ROLES_PER_PAGE);
  const pageStart = page * ROLES_PER_PAGE;
  const pageItems = items.slice(pageStart, pageStart + ROLES_PER_PAGE);
  const goToPage = (p: number) => {
    setPageDir(p > page ? 1 : -1);
    select(p * ROLES_PER_PAGE);
  };
  // Auto-advance wrapping from the last role back to the first slides the list back the other way
  const prevPage = useRef(page);
  useEffect(() => {
    if (page !== prevPage.current) setPageDir(page > prevPage.current ? 1 : -1);
    prevPage.current = page;
  }, [page]);

  // Auto-advance while the section is on screen and nobody is interacting with it
  const autoplay = !reduceMotion && inView && !paused && total > 1;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => select(active + 1), AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [autoplay, active, cycle, select]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the selected chip in view in the phone strip (horizontal scroll only — never moves the page)
  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  if (!current) return null;

  return (
    <section ref={sectionRef} className="relative z-10 w-full overflow-hidden py-10 sm:py-14">
      {/* Soft brand wash behind the explorer */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-2/3 bg-gradient-to-b from-transparent via-red-50/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* Header: centred, with the same label pill as the other home sections */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Lightbulb className="h-3.5 w-3.5 text-red-500" />
            Upskill
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">{renderTitle()}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Pick the role you&apos;re aiming for and explore the skills and programs that lead there.
          </p>
        </div>

        <div
          className="mt-8 overflow-hidden rounded-[28px] border border-red-100 bg-gradient-to-br from-[#fffafa] via-white to-[#fff2f3] shadow-[0_24px_60px_-30px_rgba(190,18,60,0.28)] lg:grid lg:grid-cols-[340px_1fr]"
          // Hold the autoplay for a mouse pointer or keyboard focus only — a tap on a phone would otherwise
          // leave the card paused for good (touch never sends the matching "leave")
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Role list: a swipeable chip strip on phones and tablets, a paged list of five on desktop */}
          <div className="border-b border-red-100/70 lg:flex lg:flex-col lg:border-b-0 lg:border-r lg:bg-gradient-to-b lg:from-[#fff1f2] lg:to-[#fff8f8]">
            <div
              ref={stripRef}
              role="tablist"
              aria-label="Career paths"
              className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item, index) => {
                const selected = index === active;
                const c = getColors(item.title, index);
                return (
                  <button
                    key={item.id || index}
                    type="button"
                    role="tab"
                    data-index={index}
                    aria-selected={selected}
                    aria-controls="career-path-panel"
                    onClick={() => select(index)}
                    className={`relative flex max-w-[168px] flex-shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors sm:max-w-none sm:gap-3 sm:px-3 sm:py-2.5 ${
                      selected ? "border-red-200 text-gray-900" : "border-gray-200 bg-white/70 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="career-active-strip"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-red-50"
                      />
                    )}
                    <span className={`relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg border sm:h-9 sm:w-9 ${c.bg} ${c.border}`}>
                      <Image src={item.image} alt="" fill unoptimized className="object-contain p-1 sm:p-1.5" />
                    </span>
                    <span className="relative min-w-0 truncate whitespace-nowrap text-[13px] font-semibold sm:text-sm">{item.title}</span>
                    {selected && autoplay && <span key={cycle} aria-hidden className={COUNTDOWN_BAR} />}
                  </button>
                );
              })}
            </div>

            {/* Always five rows tall (5 × 54px rows, 4px gaps, 12px padding), so a short last page doesn't shrink the card */}
            <div
              role="tablist"
              aria-label="Career paths"
              aria-orientation="vertical"
              className="relative hidden flex-1 overflow-hidden p-3 lg:block lg:min-h-[310px]"
            >
              <AnimatePresence mode="wait" initial={false} custom={pageDir}>
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: pageDir * 18 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, x: pageDir * -18, transition: { duration: 0.15 } }}
                  className="flex flex-col gap-1"
                >
                  {pageItems.map((item, offset) => {
                    const index = pageStart + offset;
                    const selected = index === active;
                    const c = getColors(item.title, index);
                    return (
                      <button
                        key={item.id || index}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls="career-path-panel"
                        onClick={() => select(index)}
                        className={`relative flex h-[54px] w-full items-center gap-3 rounded-xl px-3 text-left transition-colors ${
                          selected ? "text-gray-900" : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="career-active"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            className="absolute inset-0 rounded-xl bg-white shadow-[0_6px_18px_-10px_rgba(190,18,60,0.45)] ring-1 ring-red-100"
                          >
                            <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-red-600" />
                          </motion.span>
                        )}
                        <span className={`relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border ${c.bg} ${c.border}`}>
                          <Image src={item.image} alt="" fill unoptimized className="object-contain p-1.5" />
                        </span>
                        <span className="relative min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{item.title}</span>
                          {item.package && <span className="mt-0.5 block text-[11px] font-semibold text-emerald-600">{item.package}</span>}
                        </span>
                        <ChevronRight
                          className={`relative h-4 w-4 flex-shrink-0 transition-all ${
                            selected ? "translate-x-0 text-red-600 opacity-100" : "-translate-x-1 opacity-0"
                          }`}
                          aria-hidden
                        />
                        {/* Countdown to the next role while auto-advancing (a CSS animation, so the page
                            transition around the list can't skip it); restarts on every selection */}
                        {selected && autoplay && <span key={cycle} aria-hidden className={COUNTDOWN_BAR} />}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Small pagination under the list */}
            {pageCount > 1 && (
              <div className="hidden items-center justify-between gap-3 border-t border-red-100/70 px-4 py-3 lg:flex">
                <span className="text-xs font-medium text-gray-500">
                  <span className="font-semibold text-gray-900">{`${pageStart + 1}–${pageStart + pageItems.length}`}</span>
                  {` of ${total} roles`}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 0}
                    aria-label="Previous roles"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-red-100 bg-white text-gray-600 transition hover:border-red-200 hover:text-red-600 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  {Array.from({ length: pageCount }, (_, p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      aria-label={`Roles page ${p + 1} of ${pageCount}`}
                      aria-current={p === page ? "page" : undefined}
                      className="flex h-7 items-center px-0.5"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          p === page ? "w-5 bg-red-600" : "w-1.5 bg-red-200 hover:bg-red-300"
                        }`}
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === pageCount - 1}
                    aria-label="Next roles"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-red-100 bg-white text-gray-600 transition hover:border-red-200 hover:text-red-600 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Showcase of the selected role */}
          <div id="career-path-panel" role="tabpanel" aria-live="polite" className="relative flex flex-col overflow-hidden">
            {/* Dot texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-56 w-72 opacity-60 [background-image:radial-gradient(#fecaca_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
            />

            {/* Top bar: position + clickable progress segments */}
            <div className="relative flex items-center justify-between gap-4 border-b border-red-100/60 px-5 py-4 sm:px-10 lg:py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                Career path {String(active + 1).padStart(2, "0")}
                <span className="text-gray-400"> / {String(total).padStart(2, "0")}</span>
              </p>
              <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                {items.map((item, i) => (
                  <button
                    key={item.id || i}
                    type="button"
                    tabIndex={-1}
                    onClick={() => select(i)}
                    title={item.title}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-red-600" : i < active ? "w-2 bg-red-200 hover:bg-red-300" : "w-2 bg-gray-200 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main showcase */}
            <div className="relative grid flex-1 items-center gap-8 px-5 py-8 sm:px-10 md:grid-cols-[1fr_minmax(220px,260px)] md:gap-10 md:py-6 lg:grid-cols-1 lg:py-4 xl:grid-cols-[1fr_minmax(200px,230px)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
                  className="order-2 md:order-1"
                >
                  <h3 className="text-[22px] font-bold leading-snug tracking-tight text-gray-900 sm:text-[34px] sm:leading-tight">{current.title}</h3>
                  {/* Short brand accent under the role name on phones */}
                  <span aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-gradient-to-r from-red-600 to-rose-400 sm:hidden" />
                  {current.description && (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-600 sm:text-base">{current.description}</p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-5 sm:justify-start sm:gap-y-8 lg:mt-4 lg:gap-y-5">
                    {current.package && (
                      <div className="order-1 inline-flex min-w-0 items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 py-2 pl-2 pr-3 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-5 lg:py-2">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm sm:h-10 sm:w-10">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-emerald-700/80 sm:text-[11px]">Salary range</span>
                          <span className="block whitespace-nowrap text-base font-extrabold text-emerald-700 sm:text-lg">{current.package}</span>
                        </span>
                      </div>
                    )}
                    {/* Line break after the salary, from sm up */}
                    {current.package && <span aria-hidden className="order-2 hidden h-0 basis-full sm:block" />}
                    <div className="order-4 flex basis-full justify-center sm:order-3 sm:basis-auto sm:justify-start">
                      <button
                        type="button"
                        onClick={handleOpenSignup}
                        aria-label={`${current.ctaText || "Explore"} programs for ${current.title}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-red-600 py-3 pl-6 pr-2 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700 active:scale-[0.98]"
                      >
                        {current.ctaText || "Explore"} programs
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                    {total > 1 && (
                      <button
                        type="button"
                        onClick={() => select(active + 1)}
                        className="order-3 inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 sm:order-4 sm:gap-1.5 sm:border-transparent sm:bg-transparent sm:px-4 sm:py-3 sm:shadow-none sm:hover:border-transparent sm:hover:bg-gray-100 sm:hover:text-gray-900"
                      >
                        {/* Very small phones (under 360px) show just the arrow so it stays beside the salary */}
                        <span className="max-[359px]:sr-only">Next role</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbit artwork — CSS-only transforms, so it stays smooth and costs almost nothing.
                  It lives outside the per-role animation so the orbit keeps turning when the role changes.
                  Hidden on small laptops, where the panel beside the list is too narrow for it and the text. */}
              <div aria-hidden className="relative order-1 mx-auto my-5 aspect-square w-[220px] sm:w-[260px] md:order-2 md:my-0 md:w-full md:max-w-[260px] lg:hidden xl:block xl:max-w-[230px]">
                {/* Soft glow in the role's colour */}
                <span className={`absolute inset-[10%] rounded-full opacity-80 blur-2xl transition-colors duration-500 ${colors.bg}`} />
                {/* Sweeping red arc */}
                <span className="absolute inset-[2%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(239,68,68,0.55)_70deg,transparent_140deg)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%_-_2px),black_calc(100%_-_1.5px))] motion-safe:animate-[spin_6s_linear_infinite]" />
                <span className="absolute inset-[2%] rounded-full border border-red-100" />
                <span className="absolute inset-[17%] rounded-full border border-dashed border-gray-300/80" />

                {/* Neighbouring roles orbiting the selected one — each stays upright by spinning the other way */}
                {total > 3 && (
                  <span className="absolute inset-[2%] motion-safe:animate-[spin_36s_linear_infinite]">
                    {SATELLITE_SPOTS.map((spot, i) => {
                      const role = items[(active + i + 1) % total];
                      return (
                        <span key={spot} className={`absolute -translate-x-1/2 -translate-y-1/2 ${spot}`}>
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md shadow-gray-900/10 ring-1 ring-gray-100 motion-safe:animate-[spin_36s_linear_infinite_reverse]">
                            <Image src={role.image} alt="" width={26} height={26} unoptimized className="h-[26px] w-[26px] object-contain" />
                          </span>
                        </span>
                      );
                    })}
                  </span>
                )}

                {/* Twinkling sparkles */}
                <span className="absolute left-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-red-400 motion-safe:animate-pulse" />
                <span className="absolute bottom-[16%] right-[12%] h-2 w-2 rounded-full bg-amber-300 motion-safe:animate-pulse [animation-delay:700ms]" />
                <span className="absolute right-[20%] top-[12%] h-1 w-1 rounded-full bg-sky-400 motion-safe:animate-pulse [animation-delay:1400ms]" />

                {/* Selected role, floating in the centre */}
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-[29%] overflow-hidden rounded-[32%] border-2 bg-white shadow-xl shadow-gray-900/10 transition-colors duration-500 ${colors.border}`}
                >
                  <span className={`absolute inset-0 transition-colors duration-500 ${colors.bg}`} />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Source artwork is small (≈50px), so it is shown near its real size to stay crisp */}
                      <Image
                        src={current.image}
                        alt={current.title}
                        width={72}
                        height={72}
                        unoptimized
                        className="h-14 w-14 object-contain sm:h-[72px] sm:w-[72px]"
                      />
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;