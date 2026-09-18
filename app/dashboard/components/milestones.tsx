"use client";

import { Check } from "lucide-react";

const milestones = [
  {
    step: 1,
    title: "OTP Verified",
    status: "COMPLETED",
    desc: "Phone & identity confirmed via Gov DigiLocker sync.",
    state: "done",
  },
  {
    step: 2,
    title: "Academic Profile",
    status: "IN PROGRESS",
    desc: "10th, 12th, and undergrad credits validation underway.",
    state: "active",
  },
  {
    step: 3,
    title: "AI Match Call",
    status: "UP NEXT",
    desc: "15-minute verification session with Sara & Chief Academic Officer.",
    state: "pending",
  },
  {
    step: 4,
    title: "Scholarship Award",
    status: "FINAL GRANT",
    desc: "Direct university allotment letter with locked institutional fee.",
    state: "pending",
  },
];

export default function Milestones() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Pending Verification &amp; Next Milestones
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">
            Step-by-step pathway to securing your accredited degree &amp;
            scholarship grant
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
          Stage 2 of 4 Active
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <div
            key={m.step}
            className={`rounded-xl border p-4 ${
              m.state === "active"
                ? "border-red-200 bg-red-50/50"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  m.state === "done"
                    ? "bg-green-500 text-white"
                    : m.state === "active"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {m.state === "done" ? <Check className="h-3.5 w-3.5" /> : m.step}
              </span>
              <span
                className={`text-[10px] font-bold tracking-wide ${
                  m.state === "done"
                    ? "text-green-600"
                    : m.state === "active"
                      ? "text-red-600"
                      : "text-gray-400"
                }`}
              >
                {m.status}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-gray-900">
              {m.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
