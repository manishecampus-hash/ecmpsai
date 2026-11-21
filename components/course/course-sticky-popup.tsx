"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Clock, X, ArrowRight } from "lucide-react";
import ApplyNowModal from "@/components/form/apply-now-modal";
import { getFormCourses } from "@/data/form-courses";

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
          {/* Dismiss — a small round button sitting on the bar's top edge, so the content stays centred */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="absolute -top-3.5 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-[0_4px_12px_rgba(15,23,42,0.15)] transition hover:border-red-200 hover:text-[#f83d46] active:scale-95 sm:right-5"
            aria-label="Dismiss quick action bar"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>

          {/* ── Desktop Layout (sm:flex hidden) ────────────────────────── */}
          <div className="hidden sm:flex mx-auto max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:px-8 relative">

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
            <div className="flex shrink-0 flex-col items-end gap-1.5">
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
          <div className="flex items-center gap-3 px-3.5 py-3 sm:hidden">
            {/* Left: title + detail pills */}
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-bold leading-tight text-slate-900">
                {courseName}
              </h4>
              <div className="mt-1.5 flex min-w-0 items-center gap-1.5 overflow-hidden text-[11px] font-semibold text-slate-600">
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
            </div>

            {/* Right: Apply Now, centred against the whole bar */}
            <button
              type="button"
              onClick={() => setShowApplyModal(true)}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1 rounded-xl bg-[#f83d46] px-4 text-xs font-extrabold text-white shadow-[0_4px_12px_rgba(248,61,70,0.35)] active:scale-95"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Apply Now Modal */}
      <ApplyNowModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        courses={getFormCourses(courseName)}
      />
    </>
  );
}
