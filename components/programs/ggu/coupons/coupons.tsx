"use client";

import { useMemo, useState } from "react";
import { PartyPopper, Tag, X, GraduationCap } from "lucide-react";

const CONFETTI_COLORS = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#facc15",
];

function ConfettiBurst({ burstKey }) {
  const pieces = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => {
      const size = 6 + Math.random() * 7;
      return {
        id: `${burstKey}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.35,
        duration: 1.8 + Math.random() * 1.4,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size,
        rounded: Math.random() > 0.5,
        drift: (Math.random() - 0.5) * 260,
        spin: 360 + Math.random() * 720,
      };
    });
  }, [burstKey]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.rounded ? "50%" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            "--spin": `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}

const coupons = [
  {
    id: "launchpad",
    plan: "Career Launchpad Pro",
    note: "Best for early applicants",
    code: "GGUDBA10",
    validityDays: 7,
  },
  {
    id: "placement",
    plan: "Placement Plus",
    note: "Includes placement support add-on",
    code: "GGUPLACE12",
    validityDays: 5,
  },
  {
    id: "vip",
    plan: "VIP Student",
    note: "Priority admissions review",
    code: "GGUVIP15",
    validityDays: 3,
  },
  {
    id: "alumni",
    plan: "GGU Alumni",
    note: "For verified Golden Gate University alumni",
    code: "GGUALUM5",
    validityDays: 10,
  },
];

export default function GGUCoupons() {
  const [activeCoupon, setActiveCoupon] = useState(null);

  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Golden Gate University Online
          <span className="text-red-500"> DBA - Coupons</span>
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Apply a coupon code below to unlock cashback and discounts on the
          Golden Gate University Online DBA program.
        </p>

        {/* Coupons Table */}
        <div className="mt-6 w-full overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-2 bg-[#ef4444]">
            <div className="px-3 py-3.5 sm:px-5 sm:py-4">
              <h2 className="text-xs font-bold text-white sm:text-sm">
                Golden Gate University Online DBA - Specializations
              </h2>
            </div>
            <div className="border-l border-red-400 px-3 py-3.5 text-right sm:px-5 sm:py-4 sm:text-left">
              <h2 className="text-xs font-bold text-white sm:text-sm">
                Coupon Code (GGU Cashback)
              </h2>
            </div>
          </div>

          {coupons.map((coupon, index) => {
            const reverseIndex = coupons.length - 1 - index;
            const isTinted = reverseIndex % 2 === 0;
            return (
              <div
                key={coupon.id}
                className={`grid grid-cols-2 items-center border-b border-slate-200 last:border-b-0 ${
                  isTinted ? "bg-red-50/40" : "bg-white"
                }`}
              >
                <div className="min-w-0 px-3 py-5 sm:px-5 sm:py-6">
                  <p className="text-sm font-semibold text-slate-900">
                    {coupon.plan}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500">{coupon.note}</p>
                </div>
                <div className="flex min-w-0 items-center justify-end border-l border-slate-200 px-3 py-5 sm:justify-start sm:px-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setActiveCoupon(coupon)}
                    className="inline-flex h-10 w-full max-w-[128px] items-center justify-center rounded-[13px] bg-[#ef4444] px-3 text-xs font-bold text-white shadow-[0_10px_18px_rgba(239,68,68,0.24)] transition hover:bg-red-600 active:scale-[0.99] sm:w-auto sm:max-w-none sm:px-5"
                  >
                    APPLY CODE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 text-center">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[13px] bg-[#ef4444] px-6 text-sm font-bold text-white shadow-[0_10px_18px_rgba(239,68,68,0.24)] transition hover:bg-red-600 active:scale-[0.99]"
          >
            <Tag className="h-4 w-4" />
            View Other University Coupons
          </button>
        </div>
      </div>

      {/* Apply Code Modal */}
      {activeCoupon && (
        <>
          <style>{`
            @keyframes confetti-fall {
              0% {
                transform: translate(0, -20px) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translate(var(--drift), 90vh) rotate(var(--spin));
                opacity: 0;
              }
            }
            .confetti-piece {
              position: absolute;
              top: -20px;
              animation-name: confetti-fall;
              animation-timing-function: ease-in;
              animation-fill-mode: forwards;
            }
            @keyframes modal-pop {
              0% {
                opacity: 0;
                transform: scale(0.9);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>

          <ConfettiBurst burstKey={activeCoupon.id + activeCoupon.code} />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm"
            onClick={() => setActiveCoupon(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ animation: "modal-pop 0.25s ease-out" }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-7"
            >
              <button
                type="button"
                onClick={() => setActiveCoupon(null)}
                className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex justify-center">
                <PartyPopper className="h-10 w-10 text-red-500" />
              </div>

              <p className="mt-3 text-lg font-bold text-slate-900">
                '{activeCoupon.code}' applied
              </p>

              <span className="mt-3 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                Only valid for {activeCoupon.validityDays} days
              </span>

              <div className="mt-5 flex flex-col items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-6">
                <GraduationCap className="h-10 w-10 text-red-400" />
                <p className="text-xs text-slate-500">
                  Golden Gate University Admissions Team
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Discount will be applied automatically at the financial
                enrollment step.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
