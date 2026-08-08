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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          <span className="text-red-500">Golden Gate University</span> Online
          DBA - Coupons
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          Apply a coupon code below to unlock cashback and discounts on the
          Golden Gate University Online DBA program.
        </p>

        {/* Coupons Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-[#ef4444]grid grid-cols-[1fr,auto] sm:grid-cols-2">
            <div className="px-4 py-3">
              <h2 className="text-xs sm:text-sm font-bold text-white">
                Golden Gate University Online DBA - Specializations
              </h2>
            </div>
            <div className="px-4 py-3 text-right sm:text-left border-l border-red-800">
              <h2 className="text-xs sm:text-sm font-bold text-white">
                Coupon Code (GGU Cashback)
              </h2>
            </div>
          </div>

          {coupons.map((coupon, index) => (
            <div
              key={coupon.id}
              className={`grid grid-cols-[1fr,auto] sm:grid-cols-2 border-b border-slate-200 last:border-b-0 ${
                index % 2 === 0 ? "bg-white" : "bg-red-50/40"
              }`}
            >
              <div className="px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">
                  {coupon.plan}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{coupon.note}</p>
              </div>
              <div className="px-4 py-4 flex items-center sm:items-start border-l border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveCoupon(coupon)}
                  className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  APPLY CODE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ef4444] px-6 py-3 text-sm font-bold text-white hover:bg-red-800 transition-colors duration-200"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
            onClick={() => setActiveCoupon(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ animation: "modal-pop 0.25s ease-out" }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 sm:p-7 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveCoupon(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
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

              <div className="mt-5 rounded-xl bg-red-50 border border-red-100 p-6 flex flex-col items-center gap-2">
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
