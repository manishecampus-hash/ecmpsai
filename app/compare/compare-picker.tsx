"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { universities, type University } from "@/data/universities";

// Builds the /search URL that the AI search page picks up and runs automatically
export function compareSearchHref(a: string, b: string) {
  return `/search?q=${encodeURIComponent(`Compare ${a} vs ${b}`)}`;
}

const POPULAR_PAIRS: [string, string][] = [
  ["Amity University Online", "Online Manipal University"],
  ["Chandigarh University Online", "GLA University Online"],
  ["Jain University Online", "Sharda University Online"],
];

const shortName = (name: string) =>
  name.replace(/\s+(University\s+)?Online$/i, "").replace(/\s+University$/i, "");

function UniversitySelect({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: University | null;
  onChange: (u: University) => void;
  exclude: University | null;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return universities.filter(
      (u) =>
        u.name !== exclude?.name &&
        (!q || u.name.toLowerCase().includes(q) || u.location.toLowerCase().includes(q)),
    );
  }, [query, exclude]);

  return (
    <div ref={ref} className="relative">
      <p className="mb-1.5 text-xs font-semibold text-slate-500">{label}</p>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setQuery("");
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 text-left transition ${
          open
            ? "border-red-300 ring-4 ring-red-50"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {value ? (
          <>
            <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <Image src={value.image} alt="" fill sizes="36px" className="object-contain p-1" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-slate-900">{value.name}</span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="h-3 w-3" />
                {value.location}
              </span>
            </span>
          </>
        ) : (
          <span className="flex-1 py-2 text-sm text-slate-400">Select a university</span>
        )}
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60"
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
            <ul role="listbox" className="max-h-60 overflow-y-auto p-1.5">
              {options.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-slate-400">No universities found</li>
              )}
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
                      <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white">
                        <Image src={u.image} alt="" fill sizes="32px" className="object-contain p-0.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm ${selected ? "font-bold text-red-600" : "font-medium text-slate-800"}`}
                        >
                          {u.name}
                        </span>
                        <span className="block text-xs text-slate-400">{u.location}</span>
                      </span>
                      {selected && (
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                      )}
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

export default function ComparePicker({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [uniA, setUniA] = useState<University | null>(null);
  const [uniB, setUniB] = useState<University | null>(null);

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
    router.push(compareSearchHref(a, b));
  };

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
            className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="compare-picker-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 32 } }}
              exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.15 } }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200/80 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                <Sparkles className="h-3.5 w-3.5" />
                AI Comparison
              </span>
              <h2 id="compare-picker-title" className="mt-3 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                Pick two universities to compare
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                We&apos;ll build a side-by-side breakdown of fees, approvals, placements and more.
              </p>

              <div className="mt-6 space-y-3">
                <UniversitySelect label="First university" value={uniA} onChange={setUniA} exclude={uniB} />

                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-slate-100" />
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[11px] font-black text-white shadow-md">
                    VS
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setUniA(uniB);
                      setUniB(uniA);
                    }}
                    disabled={!uniA && !uniB}
                    aria-label="Swap universities"
                    className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <UniversitySelect label="Second university" value={uniB} onChange={setUniB} exclude={uniA} />
              </div>

              <button
                type="button"
                disabled={!uniA || !uniB}
                onClick={() => uniA && uniB && goCompare(uniA.name, uniB.name)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 hover:shadow-red-600/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
              >
                {uniA && uniB
                  ? `Compare ${shortName(uniA.name)} vs ${shortName(uniB.name)}`
                  : "Select two universities"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-400">Popular comparisons</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {POPULAR_PAIRS.map(([a, b]) => (
                    <button
                      key={`${a}-${b}`}
                      type="button"
                      onClick={() => goCompare(a, b)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
                    >
                      {shortName(a)} vs {shortName(b)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
