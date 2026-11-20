"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Semester subjects that reveal one after another when the card scrolls into view.
 * Shows everything immediately when motion is reduced or IntersectionObserver is missing.
 */
export default function MbaSubjectList({ subjects, className = "space-y-1" }: { subjects: string[]; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className={className}>
      {subjects.map((sub, i) => (
        <li
          key={sub}
          style={{ transitionDelay: visible ? `${120 + i * 70}ms` : "0ms" }}
          className={`group/item flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-500 ease-out hover:border-red-100 hover:bg-red-50/50 hover:shadow-sm ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-sm transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-md">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="flex-1 text-[13.5px] font-semibold leading-relaxed text-slate-700 transition-colors group-hover/item:text-slate-900">
            {sub}
          </span>
        </li>
      ))}
    </ul>
  );
}
