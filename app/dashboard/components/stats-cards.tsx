"use client";

import { Landmark, Wallet, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "TARGET COMPATIBILITY",
    title: "AI Matched Courses",
    icon: Landmark,
    iconBg: "bg-red-50 text-red-500",
    value: "14 Best Fits",
    valueClass: "text-gray-900",
    note: "3 Top-tier with 96% fit rate",
    pill: { text: "+2 New Today", cls: "bg-green-50 text-green-600" },
  },
  {
    label: "FINANCIAL FORECAST",
    title: "Predicted Scholarship",
    icon: Wallet,
    iconBg: "bg-emerald-50 text-emerald-500",
    value: "₹10,000",
    valueClass: "text-emerald-600",
    note: "Eligible for 4 merit waivers",
    pill: { text: "Pre-Approved", cls: "bg-emerald-50 text-emerald-600" },
  },
  {
    label: "ADMISSION VELOCITY",
    title: "Application Readiness",
    icon: CheckCircle2,
    iconBg: "bg-blue-50 text-blue-500",
    value: "88% Score",
    valueClass: "text-gray-900",
    note: "OCR Verified Documents",
    pill: { text: "1 Audit Pending", cls: "bg-amber-50 text-amber-600" },
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-gray-400">
                {s.label}
              </span>
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-gray-700">
              {s.title}
            </p>
            <p className={`mt-1 text-2xl font-bold ${s.valueClass}`}>
              {s.value}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">{s.note}</span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.pill.cls}`}
              >
                {s.pill.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
