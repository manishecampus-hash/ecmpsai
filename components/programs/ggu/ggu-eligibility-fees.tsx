"use client";

import React from "react";

const feeCards = [
  {
    title: "DBA (without Immersion)",
    standardFee: "INR 10,65,000",
    waiverPercent: "upto 20%",
    monthlyPayment: "INR 22,222/month",
  },
  {
    title: "DBA (with Immersion)",
    standardFee: "INR 12,15,000",
    waiverPercent: "upto 20%",
    monthlyPayment: "INR 26,388/month",
  },
];

export default function GGUDoctorateFeeNew() {
  return (
    <section
      id="fee"
      style={{}}
      className="relative w-full px-4 pt-4 pb-16 text-slate-900 sm:px-6 lg:pt-6 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="">
          <div className="mx-auto max-w-4xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
              Golden Gate DBA & MBA
              <span className="text-red-500"> Course Fee</span>
            </h2>
          </div>

          <div className="mb-4 flex justify-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-red-600">
              Limited Time Offer
            </p>
          </div>
        </div>

        {/* Fee Cards Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8 max-w-4xl w-full">
            {feeCards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Title Badge */}
                <div className="mb-6 flex justify-center">
                  <div className="inline-block rounded-full border-2 border-slate-900 px-5 py-1.5 text-sm font-bold text-slate-900">
                    {card.title}
                  </div>
                </div>

                {/* Fee Details */}
                <div className="mb-5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700">
                      Standard Fee:
                    </span>
                    <span className="text-base font-bold text-red-600">
                      {card.standardFee}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    (Including taxes)
                  </div>
                </div>

                {/* Waiver */}
                <div className="mb-5 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">
                    eCampus Waiver:
                  </span>
                  <span className="text-base font-bold text-red-600">
                    {card.waiverPercent}
                  </span>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-slate-300" />

                {/* Monthly Payment Section */}
                <div className="text-center">
                  <p className="mb-2 text-xs font-semibold text-slate-700">
                    Complete your doctorate starting
                  </p>
                  <p className="text-2xl font-bold text-red-600 sm:text-3xl">
                    {card.monthlyPayment}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">*</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}
