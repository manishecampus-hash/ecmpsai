"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

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
          style={{ transitionDelay: visible ? `${150 + i * 90}ms` : "0ms" }}
          className={`group/item flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-all duration-500 ease-out hover:bg-red-50/70 ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
          }`}
        >
          <span className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100 transition-colors group-hover/item:bg-red-600 group-hover/item:text-white">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-[13px] font-medium leading-snug text-slate-700 transition-colors group-hover/item:text-slate-900">
            {sub}
          </span>
        </li>
      ))}
    </ul>
  );
}
