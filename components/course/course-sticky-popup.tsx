"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Dismiss quick action bar"
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
            {/* Left: Bigger eCampus Logo + Divider + Bigger Course Info */}
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              {/* Bigger eCampus Logo */}
              <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-14 md:w-48 shrink-0">
                <Image
                  src="/image/logo.png"
                  alt="eCampus"
                  fill
                  sizes="(max-width: 640px) 130px, 190px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Taller Vertical Divider */}
              <div
                className="hidden sm:block h-12 w-px bg-slate-200 shrink-0"
                aria-hidden="true"
              />

              {/* Bigger Course Title + Sub-details */}
              <div className="min-w-0">
                <h3 className="truncate text-base font-extrabold text-slate-900 sm:text-xl lg:text-2xl leading-snug tracking-tight">
                  {courseName}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-600 font-semibold">
                  {/* Rating */}
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

            {/* Right: Bigger Apply Now CTA + Status Notice */}
            <div className="flex shrink-0 flex-col items-end gap-1.5 pr-6 sm:pr-8">
              {/* Bigger Apply Now Button in eCampus Brand Color */}
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="group inline-flex h-11 sm:h-13 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#f83d46] px-6 sm:px-9 text-sm sm:text-base font-extrabold text-white shadow-[0_6px_20px_rgba(248,61,70,0.36)] transition-all hover:bg-[#ef343d] hover:shadow-[0_8px_25px_rgba(248,61,70,0.48)] active:scale-[0.98]"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Status Notice */}
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>
                  Application Closes{" "}
                  <strong className="font-bold text-amber-700">Today</strong>
                </span>
              </div>
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
