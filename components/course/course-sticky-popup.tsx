"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Clock, X, ArrowRight } from "lucide-react";
import ApplyNowModal from "@/components/form/apply-now-modal";

export interface CourseStickyPopupProps {
  courseName: string;
  duration?: string;
  mode?: string;
  rating?: string | number;
  fee?: string;
  brochureUrl?: string;
}

export default function CourseStickyPopup({
  courseName,
  duration = "2 Years",
  mode = "Online",
  rating = "4.8",
  fee,
}: CourseStickyPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Sync state with body class and custom event so FloatingWhatsApp can float gracefully above it
  useEffect(() => {
    const active = isVisible && !isDismissed;
    if (active) {
      document.body.classList.add("course-popup-active");
    } else {
      document.body.classList.remove("course-popup-active");
    }
    window.dispatchEvent(
      new CustomEvent("course-popup-toggle", { detail: { isVisible: active } })
    );

    return () => {
      document.body.classList.remove("course-popup-active");
      window.dispatchEvent(
        new CustomEvent("course-popup-toggle", { detail: { isVisible: false } })
      );
    };
  }, [isVisible, isDismissed]);

  useEffect(() => {
    lastScrollY.current = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;

        // When at the very top fold (< 120px), hide bar
        if (currentScrollY < 120) {
          setIsVisible(false);
        } else {
          const delta = currentScrollY - lastScrollY.current;
          if (delta > 4) {
            // Scrolling down -> appears as user scrolls
            setIsVisible(true);
          } else if (delta < -4) {
            // Scrolling up -> disappears
            setIsVisible(false);
          }
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        role="region"
        aria-label="Course Quick Action Bar"
        className={`fixed bottom-0 left-0 right-0 z-40 w-full transform transition-all duration-300 ease-out ${
          isVisible && !isDismissed
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative border-t border-slate-200 bg-white shadow-[0_-8px_32px_rgba(15,23,42,0.12)]">
          {/* ── Desktop Layout (sm:flex hidden) ────────────────────────── */}
          <div className="hidden sm:flex mx-auto max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:px-8 relative">
            {/* Desktop Dismiss Button */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Dismiss quick action bar"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left: Course Info */}
            <div className="flex min-w-0 flex-1 items-center">
              <div className="min-w-0">
                <h3 className="truncate text-base font-extrabold text-slate-900 sm:text-xl lg:text-2xl leading-snug tracking-tight">
                  {courseName}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-semibold">
                  <span className="inline-flex items-center gap-1 text-slate-900 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                    <span>{rating}</span>
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 inline -translate-y-[0.5px]" />
                  </span>

                  <span className="text-slate-300 font-normal">·</span>
                  <span className="text-slate-700">{duration}</span>

                  <span className="text-slate-300 font-normal">·</span>
                  <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 font-bold">
                    {mode}
                  </span>

                  {fee && (
                    <>
                      <span className="hidden md:inline text-slate-300 font-normal">·</span>
                      <span className="hidden md:inline text-slate-700">
                        Starting at <strong className="font-bold text-slate-900">{fee}</strong>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Apply Now CTA + Status Notice */}
            <div className="flex shrink-0 flex-col items-end gap-1.5 pr-8">
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="group inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-2xl bg-[#f83d46] px-8 sm:px-9 text-sm sm:text-base font-extrabold text-white shadow-[0_6px_20px_rgba(248,61,70,0.36)] transition-all hover:bg-[#ef343d] hover:shadow-[0_8px_25px_rgba(248,61,70,0.48)] active:scale-[0.98]"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>
                  Application Closes <strong className="font-bold text-amber-700">Today</strong>
                </span>
              </div>
            </div>
          </div>

          {/* ── Mobile Layout (< sm) ─────────────────────────────────── */}
          <div className="block sm:hidden px-3.5 py-2.5">
            {/* Top Row: Title + Dismiss */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="truncate text-sm font-bold text-slate-900 leading-tight flex-1 min-w-0">
                {courseName}
              </h4>

              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:scale-95"
                aria-label="Dismiss quick action bar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Bottom Row: Details Pills + Compact Apply Now Button */}
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 overflow-hidden min-w-0">
                <span className="inline-flex items-center gap-0.5 text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-bold shrink-0">
                  <span>{rating}</span>
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 -translate-y-[0.5px]" />
                </span>
                <span className="text-slate-300 shrink-0">·</span>
                <span className="text-slate-700 shrink-0 font-medium">{duration}</span>
                <span className="text-slate-300 shrink-0">·</span>
                <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 font-bold shrink-0">
                  {mode}
                </span>
                {fee && (
                  <>
                    <span className="text-slate-300 shrink-0">·</span>
                    <span className="text-slate-700 font-bold shrink-0">{fee}</span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#f83d46] px-3.5 text-xs font-extrabold text-white shadow-[0_2px_8px_rgba(248,61,70,0.3)] active:scale-95"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Now Modal */}
      <ApplyNowModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </>
  );
}
