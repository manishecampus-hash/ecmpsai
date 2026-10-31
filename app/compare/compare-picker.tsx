"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowLeftRight, ArrowRight, Check, ChevronDown, GraduationCap, MapPin, Plus, Scale, Search, X } from "lucide-react";
import { universities, type University } from "@/data/universities";
import { courseOptions } from "@/data/course-options";
import { compareHref } from "@/components/compare/compare-link";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAVY = "#1B2230";

// Sections of the panel rise in one after another
const stagger: Variants = { hidden: {}, show: { transition: { delayChildren: 0.08, staggerChildren: 0.07 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const POPULAR_PAIRS: [string, string][] = [
  ["Amity University Online", "Online Manipal University"],
  ["Chandigarh University Online", "GLA University Online"],
  ["Jain University Online", "Sharda University Online"],
];

const shortName = (name: string) =>
  name.replace(/\s+(University\s+)?Online$/i, "").replace(/\s+University$/i, "");

function StepTitle({ n, done, children }: { n: number; done: boolean; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-sm font-bold" style={{ color: NAVY }}>
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
          done ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
      </span>
      {children}
    </p>
  );
}

/* Course dropdown: in the flow on phones, floating under the field from sm up */
function CourseSelect({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={value ? `Course: ${value}. Change` : "Select a course"}
        className="group relative flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left"
      >
        {/* The outline lives on its own layer: the site-wide focus style resets borders on the focused button itself */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition-[border-color,box-shadow] duration-200 ${
            open
              ? "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
              : value
                ? "border-slate-200 shadow-[0_10px_24px_-18px_rgba(27,34,48,0.55)]"
                : "border-dashed border-slate-300 group-hover:border-red-400"
          }`}
        />
        <span
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
            value ? "bg-red-600 text-white" : "bg-red-50 text-red-600"
          }`}
        >
          <GraduationCap className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Course</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={value || "empty"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className={`block truncate text-sm ${value ? "font-bold" : "font-medium text-slate-400"}`}
              style={value ? { color: NAVY } : undefined}
            >
              {value || "Select a course"}
            </motion.span>
          </AnimatePresence>
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-red-600" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Courses"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            style={{ transformOrigin: "top" }}
            className="relative z-40 mt-2 grid max-h-64 grid-cols-2 gap-1 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(27,34,48,0.45)] ring-1 ring-slate-200 sm:absolute sm:inset-x-0 sm:top-full sm:grid-cols-3"
          >
            {courseOptions.map((c) => {
              const selected = c === value;
              return (
                <li key={c}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      selected ? "bg-red-50 font-bold text-red-600" : "font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600"
                    }`}
                  >
                    {c}
                    {selected && <Check className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} aria-hidden />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* One side of the "versus" arena: an empty slot to add a university, or the chosen one */
function UniversitySlot({
  label,
  value,
  onChange,
  onClear,
  exclude,
  align,
}: {
  label: string;
  value: University | null;
  onChange: (u: University) => void;
  onClear: () => void;
  exclude: University | null;
  align: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open upward when there isn't room for the list below the slot
  const toggle = () => {
    if (!open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      setUp(below < 300 && r.top > below);
    }
    setOpen((v) => !v);
    setQuery("");
  };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    // On phones the list sits in the sheet's flow, so bring it into view
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return universities.filter(
      (u) => u.name !== exclude?.name && (!q || u.name.toLowerCase().includes(q) || u.location.toLowerCase().includes(q)),
    );
  }, [query, exclude]);

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={value ? `${label}: ${value.name}. Change` : `Add ${label.toLowerCase()}`}
        className={`group flex h-[136px] w-full flex-col items-center justify-center rounded-2xl p-4 text-center transition-[background-color,border-color,box-shadow] duration-300 ${
          value
            ? "border-2 border-transparent bg-white shadow-[0_16px_32px_-22px_rgba(27,34,48,0.55)]"
            : "border-2 border-dashed border-slate-300 bg-white/50 hover:border-red-400 hover:bg-white"
        } ${open ? "!border-red-500 !border-solid bg-white" : ""}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {value ? (
            <motion.span
              key={value.name}
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="flex w-full min-w-0 flex-col items-center"
            >
              <span className="relative h-12 w-28 overflow-hidden rounded-xl bg-white ring-1 ring-slate-100">
                <Image src={value.image} alt="" fill sizes="112px" className="object-contain p-1.5" />
              </span>
              <span className="mt-2.5 w-full truncate text-sm font-bold" style={{ color: NAVY }}>
                {value.name}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3 text-red-500" aria-hidden />
                {value.location}
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">
                <Plus className="h-5 w-5" />
              </span>
              <span className="mt-2.5 text-sm font-bold" style={{ color: NAVY }}>
                {label}
              </span>
              <span className="text-xs text-slate-500">Search {universities.length} universities</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {value && !open && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Remove ${value.name}`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Search list: in the flow on phones, floating under the slot from sm up */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: up ? 4 : -4, scale: 0.98, transition: { duration: 0.12 } }}
            style={{ transformOrigin: up ? "bottom" : "top" }}
            className={`relative z-30 mt-2 overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-20px_rgba(27,34,48,0.45)] ring-1 ring-slate-200 sm:absolute sm:w-[340px] ${
              up ? "sm:bottom-full sm:mb-2 sm:mt-0" : "sm:top-full"
            } ${align === "right" ? "sm:right-0" : "sm:left-0"}`}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-3.5 py-2.5">
              <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or city"
                className="w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
              />
            </div>
            <ul role="listbox" aria-label={label} className="max-h-52 overflow-y-auto p-1.5">
              {options.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-400">No universities found</li>}
              {options.map((u) => {
                const selected = u.name === value?.name;
                return (
                  <li key={u.name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(u);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                        selected ? "bg-red-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-[10px] bg-white ring-1 ring-slate-100">
                        <Image src={u.image} alt="" fill sizes="32px" className="object-contain p-0.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm ${selected ? "font-bold text-red-600" : "font-medium text-slate-800"}`}>
                          {u.name}
                        </span>
                        <span className="block text-xs text-slate-400">{u.location}</span>
                      </span>
                      {selected && <Check className="h-4 w-4 flex-shrink-0 text-red-600" strokeWidth={3} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComparePicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [uniA, setUniA] = useState<University | null>(null);
  const [uniB, setUniB] = useState<University | null>(null);
  const [course, setCourse] = useState("");

  // Escape closes, and the page behind shouldn't scroll while the dialog is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const goCompare = (a: string, b: string) => {
    onClose();
    router.push(compareHref(a, b, course || undefined));
  };

  const both = Boolean(uniA && uniB);
  const ready = Boolean(course) && both;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            key="compare-picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            onClick={onClose}
            className="fixed inset-0 z-[90] flex items-end justify-center bg-[#1B2230]/60 backdrop-blur-sm sm:items-center sm:p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="compare-picker-title"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 30 } }}
              exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.15 } }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92dvh] w-full max-w-[720px] overflow-y-auto rounded-t-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(27,34,48,0.6)] sm:max-h-none sm:overflow-visible sm:rounded-[28px]"
            >
              <span aria-hidden className="mx-auto mt-3 block h-1 w-10 rounded-full bg-slate-200 sm:hidden" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:rotate-90 hover:bg-red-50 hover:text-red-600 sm:right-5 sm:top-5"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div variants={stagger} initial="hidden" animate="show">
                {/* Header */}
                <motion.div variants={rise} className="flex items-start gap-4 px-5 pb-2 pt-5 sm:px-7 sm:pt-7">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_12px_22px_-10px_rgba(220,38,38,0.8)]">
                    <Scale className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 pr-10">
                    <h2 id="compare-picker-title" className="text-xl font-bold tracking-tight sm:text-2xl" style={{ color: NAVY }}>
                      Compare universities
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Choose a course and two universities. Our AI breaks down fees, approvals and placements side by side.
                    </p>
                  </div>
                </motion.div>

                {/* Step 1: course */}
                <motion.div variants={rise} className="relative z-20 px-5 pt-5 sm:px-7">
                  <StepTitle n={1} done={Boolean(course)}>
                    Choose a course
                  </StepTitle>
                  <CourseSelect value={course} onChange={setCourse} />
                </motion.div>

                {/* Step 2: the versus arena */}
                <motion.div variants={rise} className="px-5 pb-6 pt-6 sm:px-7">
                  <StepTitle n={2} done={both}>
                    Pick two universities
                  </StepTitle>
                  <div className="mt-3 grid gap-3 rounded-[22px] bg-slate-50 p-3 ring-1 ring-slate-100 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-4 sm:p-4">
                    <UniversitySlot
                      label="First university"
                      value={uniA}
                      onChange={setUniA}
                      onClear={() => setUniA(null)}
                      exclude={uniB}
                      align="left"
                    />

                    <div className="flex items-center justify-center gap-3 sm:flex-col">
                      <span className="relative flex h-12 w-12 items-center justify-center">
                        {/* A ring ripples out once when both universities are in */}
                        {both && (
                          <motion.span
                            key={`${uniA?.name}-${uniB?.name}`}
                            aria-hidden
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.9, opacity: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-red-500"
                          />
                        )}
                        <motion.span
                          key={both ? "ready" : "waiting"}
                          initial={{ scale: 0.6, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 320, damping: 16 }}
                          className={`relative flex h-12 w-12 items-center justify-center rounded-full text-xs font-black text-white ring-4 ring-slate-50 transition-colors duration-300 ${
                            both ? "bg-red-600" : "bg-[#1B2230]"
                          }`}
                        >
                          VS
                        </motion.span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setUniA(uniB);
                          setUniB(uniA);
                        }}
                        disabled={!uniA && !uniB}
                        aria-label="Swap universities"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:rotate-180 hover:text-red-600 hover:ring-red-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:rotate-0"
                      >
                        <ArrowLeftRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <UniversitySlot
                      label="Second university"
                      value={uniB}
                      onChange={setUniB}
                      onClear={() => setUniB(null)}
                      exclude={uniA}
                      align="right"
                    />
                  </div>
                </motion.div>

                {/* Footer: shortcuts and the action */}
                <motion.div
                  variants={rise}
                  className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-b-[28px] sm:px-7 sm:py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Popular comparisons</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {POPULAR_PAIRS.map(([a, b]) => (
                        <button
                          key={`${a}-${b}`}
                          type="button"
                          onClick={() => goCompare(a, b)}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:text-red-600 hover:ring-red-300 active:scale-95"
                        >
                          {shortName(a)} vs {shortName(b)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() => uniA && uniB && goCompare(uniA.name, uniB.name)}
                    className="group relative inline-flex h-12 w-full flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-600 px-7 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(220,38,38,0.8)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {!course ? "Choose a course" : !both ? "Pick two universities" : `Compare ${course}`}
                    <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-1" aria-hidden />
                    {ready && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-0 group-hover:translate-x-[400%] group-hover:duration-700 motion-reduce:hidden"
                      />
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
