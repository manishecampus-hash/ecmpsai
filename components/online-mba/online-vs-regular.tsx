"use client";

import React from "react";

type Row = {
  factor: string;
  online: string;
  regular: string;
};

const ROWS: Row[] = [
  {
    factor: "Flexibility",
    online: "Mostly self-paced, with scheduled live sessions (4–6 hrs/week)",
    regular: "Fixed class schedules",
  },
  {
    factor: "Cost",
    online: "More affordable — lower tuition and no relocation expenses",
    regular: "Higher tuition and living costs",
  },
  {
    factor: "Work Experience",
    online: "Continue your job while studying",
    regular: "Often requires leaving or pausing a job",
  },
  {
    factor: "Learning Method",
    online: "Live and recorded digital classes with online resources",
    regular: "Classroom-based learning",
  },
  {
    factor: "Time Management",
    online: "Suitable for working professionals",
    regular: "Requires full-time commitment",
  },
  {
    factor: "Networking",
    online: "Virtual networking with professionals worldwide",
    regular: "Face-to-face networking opportunities",
  },
];

export default function OnlineVsRegular() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Why Choose an Online MBA Over a Regular<span className="text-red-500"> MBA?</span>{" "}
             
          </h2>
        </div>

        <p className="mx-auto max-w-5xl text-center text-slate-600 leading-relaxed text-base sm:text-lg">
          Under UGC norms, an online MBA carries the same standing as a
          regular MBA. What it adds is flexibility, cost-effectiveness, and
          earning potential while you upgrade your skills — plus the chance
          to build a network that spans the globe rather than one campus.
          And the part that matters most: employers and HR teams accept and
          consider this degree.
        </p>

        {/* Comparison Table */}
        <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="bg-[#ee2c3c]  px-6 py-4">
            <h3 className="text-sm font-bold text-white text-center">
              Online MBA vs. Regular MBA
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="bg-red-50/60 border-b border-slate-100">
                  <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[26%]">
                    Factor
                  </th>
                  <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[37%]">
                    Online MBA
                  </th>
                  <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[37%]">
                    Regular MBA
                  </th>
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.factor}
                    className={
                      i !== ROWS.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 align-top">
                      <span className="text-sm font-bold text-slate-900">
                        {row.factor}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <span className="text-sm text-red-600 leading-relaxed">
                        {row.online}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <span className="text-sm text-slate-600 leading-relaxed">
                        {row.regular}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}