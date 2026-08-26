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
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
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

        {/* Comparison Section */}
        <div className="mt-12">
          {/* Factor Rows */}
          <div className="space-y-4">
            {ROWS.map((row, index) => (
              <div key={row.factor} className="group">
                {/* Factor Title */}
                <div className="bg-[#2c313c]  from-slate-900 to-slate-800 px-6 py-3 rounded-lg mb-3 cursor-pointer">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    {row.factor}
                  </h4>
                </div>

                {/* Comparison Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Online MBA */}
                  <div className="rounded-xl border-l-4 border-l-red-500 bg-blue-50/50 p-5 hover:bg-blue-50/80 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-[#f56565]"></div>
                      <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">Online MBA</span>
                    </div>
                    <p className="text-sm text-red-500 leading-relaxed font-medium">
                      {row.online}
                    </p>
                  </div>

                  {/* Regular MBA */}
                  <div className="rounded-xl border-l-4 border-l-amber-500 bg-amber-50/50 p-5 hover:bg-amber-50/80 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Regular MBA</span>
                    </div>
                    <p className="text-sm text-amber-900 leading-relaxed font-medium">
                      {row.regular}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Start Your Online MBA Journey?</h3>
              <p className="text-sm text-slate-600 max-w-md">
                Compare universities, check approvals, and find the perfect program for your career goals.
              </p>
            </div>
           <button className="h-12 px-8 bg-[#f56565] text-white font-semibold rounded-full transition whitespace-nowrap shadow-md">
  Explore Programs
</button>
          </div>
        </div>
      </div>
    </section>
  );
}
