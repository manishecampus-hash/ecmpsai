"use client";

import {
  Building2,
  CreditCard,
  GraduationCap,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const feeOptions = [
  {
    icon: Landmark,
    title: "Partner Bank EMI",
    desc: "HDFC, ICICI, Axis Bank - no-cost EMI with instant approval",
  },
  {
    icon: CreditCard,
    title: "NBFC & Fintech",
    desc: "PaySense, KreditBee, EarlySalary - flexible tenures up to 36 months",
  },
  {
    icon: Building2,
    title: "Corporate Sponsorship",
    desc: "Get your employer to sponsor with B2B invoicing and reimbursement support",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Available",
    desc: "Merit & need-based scholarships up to Rs.75,000 available",
  },
];

export default function GGUDoctorateFeeSection() {
  return (
    <section
      id="fee"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.12), transparent 35%), #05070d",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mx-auto mb-10 max-w-7xl text-center px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
              Investment
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white-900 tracking-tight sm:text-3xl md:text-4xl">
              Program Fee & <span className="text-red-500">Financing</span>
            </h2>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Flexible payment options to make a Golden Gate University DBA more
            accessible for working executives and senior professionals.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Fee Highlight Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-8 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/10" />
            <div className="absolute bottom-0 left-0 h-28 w-28 -translate-x-10 translate-y-10 rounded-full bg-red-500/10 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                Total Program Fee
              </div>

              <div className="mb-2 text-4xl font-extrabold text-red-500 sm:text-5xl">
                Rs.3,50,000
              </div>

              <div className="mb-6 text-sm text-slate-400 sm:text-base">
                Online DBA Program - Golden Gate University
              </div>

              {/* EMI Box */}
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-bold text-red-400">
                  <CreditCard className="h-4 w-4" />
                  No-Cost EMI
                </div>

                <div className="text-sm leading-6 text-slate-300 sm:text-base">
                  Starting from{" "}
                  <span className="font-bold text-white">Rs.9,750/month</span>{" "}
                  with flexible payment tenure.
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_12px_28px_rgba(239,68,68,0.25)] sm:text-base">
                Apply & Secure Seat
              </button>
            </div>
          </div>

          {/* Financing Options */}
          <div className="flex flex-col gap-4">
            {feeOptions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111827] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-[#151f32]"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-slate-300 sm:text-[15px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
