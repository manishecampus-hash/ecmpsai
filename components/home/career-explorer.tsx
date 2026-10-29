"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, ChevronRight, Lightbulb, TrendingUp } from "lucide-react";
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
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const handleOpenSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-signup"));
    }
  };

  // Normalize items from dynamic jobRoles prop, falling back to static dataset if empty
  const items =
    jobRoles && jobRoles.length > 0
      ? jobRoles.map((r, idx) => ({
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
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
              <Lightbulb className="h-3.5 w-3.5" />
              Upskill
            </span>
            <h2 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              {renderTitle()}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Pick the role you&apos;re aiming for and explore the skills and programs that lead there.
            </p>
          </div>
          <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Briefcase className="h-4 w-4 text-red-500" aria-hidden />
            {total} career paths
          </p>
        </div>

        <div
          className="mt-8 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] lg:grid lg:grid-cols-[340px_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Role list — vertical on desktop, a swipeable chip strip on phones/tablets */}
          <div className="border-b border-gray-100 lg:border-b-0 lg:border-r lg:bg-gray-50/60">
            <div
              ref={stripRef}
              role="tablist"
              aria-label="Career paths"
              className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:p-3 [&::-webkit-scrollbar]:hidden"
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
                    className={`relative flex flex-shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left lg:py-2 transition-colors lg:w-full ${
                      selected ? "text-gray-900" : "text-gray-600 hover:bg-white hover:text-gray-900"
                    } max-lg:border ${selected ? "max-lg:border-red-200" : "max-lg:border-gray-200"}`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="career-active"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-red-100 max-lg:bg-red-50"
                      >
                        <span className="absolute inset-y-2 left-0 hidden w-1 rounded-r-full bg-red-600 lg:block" />
                      </motion.span>
                    )}
                    <span className={`relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border ${c.bg} ${c.border}`}>
                      <Image src={item.image} alt="" fill unoptimized className="object-contain p-1.5" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block whitespace-nowrap text-sm font-semibold lg:truncate">{item.title}</span>
                      {item.package && (
                        <span className="mt-0.5 hidden text-[11px] font-semibold text-emerald-600 lg:block">{item.package}</span>
                      )}
                    </span>
                    <ChevronRight
                      className={`relative hidden h-4 w-4 flex-shrink-0 transition-all lg:block ${
                        selected ? "translate-x-0 text-red-600 opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                      aria-hidden
                    />
                    {/* Countdown to the next role while auto-advancing */}
                    {selected && autoplay && (
                      <motion.span
                        key={cycle}
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                        className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-red-500/70"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showcase of the selected role */}
          <div id="career-path-panel" role="tabpanel" aria-live="polite" className="relative flex flex-col overflow-hidden">
            {/* Dot texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-56 w-72 opacity-60 [background-image:radial-gradient(#fecaca_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
            />

            {/* Top bar: position + clickable progress segments */}
            <div className="relative flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4 sm:px-10">
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
            <div className="relative grid flex-1 items-center gap-8 px-6 py-8 sm:px-10 md:grid-cols-[1fr_minmax(240px,300px)] md:gap-10 md:py-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
                  className="order-2 md:order-1"
                >
                  <h3 className="text-[28px] font-bold leading-tight tracking-tight text-gray-900 sm:text-[34px]">{current.title}</h3>
                  {current.description && (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-600 sm:text-base">{current.description}</p>
                  )}

                  {current.package && (
                    <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 py-2.5 pl-2.5 pr-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                        <TrendingUp className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-700/80">Salary range</span>
                        <span className="block text-lg font-extrabold text-emerald-700">{current.package}</span>
                      </span>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3">
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
                    {total > 1 && (
                      <button
                        type="button"
                        onClick={() => select(active + 1)}
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                      >
                        Next role
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Orbit artwork — CSS-only transforms, so it stays smooth and costs almost nothing.
                  It lives outside the per-role animation so the orbit keeps turning when the role changes. */}
              <div aria-hidden className="relative order-1 mx-auto my-5 aspect-square w-[220px] sm:w-[270px] md:order-2 md:my-0 md:w-full md:max-w-[300px]">
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

            {/* Bottom bar: what's coming next */}
            {total > 1 && (
              <div className="relative hidden items-center gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-3.5 sm:flex sm:px-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">Up next</span>
                <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                  {[1, 2, 3].slice(0, Math.min(3, total - 1)).map((step) => {
                    const i = (active + step) % total;
                    const role = items[i];
                    return (
                      <button
                        key={`${role.id}-${step}`}
                        type="button"
                        onClick={() => select(i)}
                        className="group/next inline-flex min-w-0 items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 text-xs font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-600"
                      >
                        <span className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-gray-50">
                          <Image src={role.image} alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain p-0.5" />
                        </span>
                        <span className="truncate">{role.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;