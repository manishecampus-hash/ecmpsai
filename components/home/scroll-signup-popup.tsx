"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Compass, Headset, X } from "lucide-react";
import { ApplyNowModal } from "@/components/form/apply-now-modal";

/**
 * Site-wide sign-up nudge (mounted in the root layout; never on /dashboard).
 * Opens once per browser session — after 5 seconds on a page or when the visitor scrolls past
 * half of it, whichever comes first. Not shown to signed-in users, and it waits while another
 * popup is open.
 * "Sign Up Free" opens the site's existing signup modal; "Talk to a Program Expert" opens the lead form.
 */

const SEEN_KEY = "ecampus_scroll_signup_seen";
const SCROLL_THRESHOLD = 0.5;
const DELAY_MS = 5000;
/** Re-check interval while another popup is open */
const RETRY_MS = 2000;

const POINTS = [
  "Free 1:1 guidance from Program Experts",
  "A university shortlist that fits your goals & budget",
  "Scholarships up to ₹10,000* on enrolment",
];

const ADVISORS = [
  "https://ecampus-admin-ui.b-cdn.net/ecampus-images/Priya.png",
  "https://ecampus-admin-ui.b-cdn.net/ecampus-images/shivi.png",
];

function readSafe(fn: () => string | null) {
  try {
    return fn();
  } catch {
    return null;
  }
}

export default function ScrollSignupPopup() {
  const [open, setOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;

  useEffect(() => {
    if (isDashboard) return;
    // Already shown this session, or the visitor is signed in → nothing to do
    if (readSafe(() => sessionStorage.getItem(SEEN_KEY))) return;
    const student = readSafe(() => localStorage.getItem("ecampus_student"));
    if (student && student !== "null") return;

    let done = false;
    let retry: number | undefined;

    const show = () => {
      if (done) return;
      // Another popup (Apply form, signup, menu…) is open — try again shortly
      if (document.querySelector('[role="dialog"][aria-modal="true"], [role="dialog"][data-state="open"]')) {
        window.clearTimeout(retry);
        retry = window.setTimeout(show, RETRY_MS);
        return;
      }
      done = true;
      cleanup();
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setOpen(true);
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_THRESHOLD) show();
    };

    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      window.clearTimeout(retry);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [isDashboard, pathname]);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close. The page behind keeps scrolling while the popup is open (no scroll lock).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const signUp = () => {
    close();
    window.dispatchEvent(new CustomEvent("open-signup"));
  };

  const talkToExpert = () => {
    close();
    setApplyOpen(true);
  };

  if (isDashboard) return null;

  return (
    <>
      {open &&
        createPortal(
          <div
            className="ssp-backdrop fixed inset-0 z-[9999] flex items-end justify-center px-3 pb-3 backdrop-blur-[1px] sm:items-center sm:p-6"
            // Dark navy scrim (same family as the Apply popup); page stays visible behind it
            style={{ backgroundColor: "rgba(2, 6, 23, 0.5)" }}
            onClick={close}
          >
            <style>{`
              @keyframes ssp-fade { from { opacity: 0 } to { opacity: 1 } }
              @keyframes ssp-rise { from { opacity: 0; transform: translateY(24px) scale(.97) } to { opacity: 1; transform: none } }
              @keyframes ssp-ring { 0% { transform: scale(.85); opacity: .55 } 100% { transform: scale(1.55); opacity: 0 } }
              @keyframes ssp-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
              .ssp-backdrop { animation: ssp-fade .25s ease-out both; }
              .ssp-card { animation: ssp-rise .45s cubic-bezier(.22,1,.36,1) both; }
              .ssp-ring { animation: ssp-ring 2.4s ease-out infinite; }
              .ssp-ring-late { animation: ssp-ring 2.4s ease-out 1.2s infinite; }
              .ssp-bob { animation: ssp-bob 3s ease-in-out infinite; }
              .ssp-item { animation: ssp-rise .45s cubic-bezier(.22,1,.36,1) both; }
              @media (prefers-reduced-motion: reduce) {
                .ssp-backdrop, .ssp-card, .ssp-item, .ssp-ring, .ssp-ring-late, .ssp-bob { animation: none; }
              }
            `}</style>

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ssp-title"
              className="ssp-card relative w-full max-w-[520px] overflow-hidden rounded-[26px] bg-white shadow-[0_40px_90px_-30px_rgba(2,6,23,0.6)] ring-1 ring-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 ring-1 ring-slate-200 backdrop-blur transition hover:bg-white hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Top visual */}
              <div className="relative flex h-[150px] items-center sm:h-[160px] justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/70">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
                />
                <div className="relative">
                  <span aria-hidden className="ssp-ring absolute inset-0 rounded-full bg-red-200/70" />
                  <span aria-hidden className="ssp-ring-late absolute inset-0 rounded-full bg-red-200/70" />
                  <span className="ssp-bob relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-red-600 shadow-[0_14px_30px_-12px_rgba(220,38,38,0.55)] ring-1 ring-red-100">
                    <Compass className="h-8 w-8" strokeWidth={1.8} />
                  </span>
                </div>

                {/* Advisors chip */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 py-1 pl-1 pr-3 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.45)] ring-1 ring-slate-200">
                  <span className="flex -space-x-2">
                    {ADVISORS.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-white" />
                    ))}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white ring-2 ring-white">
                      <Headset className="h-3 w-3" />
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-slate-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Program Experts online
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-5 text-center sm:px-10 sm:pb-7">
                <h2 id="ssp-title" className="text-[22px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                  You&apos;ve come this far,
                  <br />
                  <span className="text-red-600">don&apos;t leave just yet!</span>
                </h2>
                <p className="mx-auto mt-2.5 max-w-[400px] text-[14.5px] leading-relaxed text-slate-600">
                  Let our Program Experts guide you.
                </p>

                <ul className="mx-auto mt-5 max-w-[400px] space-y-2.5 text-left">
                  {POINTS.map((p, i) => (
                    <li
                      key={p}
                      className="ssp-item flex items-start gap-2.5 text-[13.5px] font-medium text-slate-700"
                      style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                    >
                      <CheckCircle2 className="mt-px h-[18px] w-[18px] shrink-0 text-emerald-500" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={signUp}
                    className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-[15px] font-bold text-white shadow-[0_12px_26px_-12px_rgba(220,38,38,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0"
                  >
                    Sign Up Free
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={talkToExpert}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[15px] font-bold text-slate-800 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <Headset className="h-4 w-4 text-slate-500" />
                    Talk to a Program Expert
                  </button>
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 text-xs font-semibold text-slate-400 underline-offset-4 transition-colors hover:text-slate-600 hover:underline"
                >
                  I&apos;ll keep exploring
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <ApplyNowModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
