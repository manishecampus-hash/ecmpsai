import React from "react";

/**
 * Types of Online MBA
 * Same container/heading system as the other sections
 * (max-w-4xl, text-3xl md:text-4xl, red-500 accent).
 * Table header re-themed navy -> red-600; two-column table (course link
 * left, checklist details right) matches the reference format.
 */

type MBAType = {
  name: string;
  about: string;
  duration: string;
  fees: string;
};

const TYPES: MBAType[] = [
  {
    name: "MBA Distance Education",
    about:
      "A remote or hybrid study format where you aren't required to attend classes physically — you only need to appear for exams, and the degree carries the same standing once approved.",
    duration: "2 years (may vary by university)",
    fees: "₹20,000 to ₹2 Lakhs (approx.)",
  },
  {
    name: "Part-Time MBA",
    about:
      "A flexible program built for working executives, with classes scheduled around weekends, evenings, or through recorded lectures on the LMS.",
    duration: "3 to 5 years (may vary by university)",
    fees: "₹80,000 to ₹6 Lakhs (approx.)",
  },
  {
    name: "Online Global MBA",
    about:
      "A remotely delivered MBA focused on the global business environment, letting you study from anywhere while continuing your career.",
    duration: "1 to 2 years (UGC-DEB Indian MBAs remain 2-year minimum)",
    fees: "₹30,000 to ₹3 Lakhs (approx.)",
  },
  {
    name: "Executive MBA for Working Professionals",
    about:
      "Designed for working professionals looking to sharpen strategic leadership and managerial skills while building a strong professional network.",
    duration: "15 months to 2 years (may vary by university)",
    fees: "₹6 Lakhs to ₹25 Lakhs (approx.)",
  },
  {
    name: "1-Year MBA Online",
    about:
      "An accelerated PG certificate/diploma-style management program for working executives — not a UGC-DEB MBA degree, since UGC mandates a 2-year minimum for any MBA.",
    duration: "10 to 15 months (may vary by university)",
    fees: "₹30,000 to ₹3 Lakhs (approx.)",
  },
  {
    name: "Dual MBA Online",
    about:
      "Lets you pursue two MBA specializations — or an MBA alongside another discipline — building both skill sets within a single program.",
    duration: "2 years (may vary by university)",
    fees: "₹30,000 to ₹3 Lakhs (approx.)",
  },
  {
    name: "Online MBA after Diploma",
    about:
      "Some universities allow diploma holders to move directly into an MBA program without needing a separate bachelor's degree.",
    duration: "2 to 4 years (may vary by university)",
    fees: "₹30,000 to ₹3 Lakhs (approx.)",
  },
  {
    name: "Online MBA Plus",
    about:
      "Goes beyond the standard curriculum with specialized, industry-driven skills and practical experience through internships or training workshops.",
    duration: "2 years (may vary by university)",
    fees: "₹30,000 to ₹3.5 Lakhs (approx.)",
  },
  {
    name: "IIM Online MBA",
    about:
      "A top-tier program designed by the Indian Institutes of Management for working executives, built to boost careers without disrupting jobs.",
    duration: "1 to 2 years (varies by IIM and program type)",
    fees: "₹5 Lakhs to ₹20 Lakhs (approx.)",
  },
];

export default function TypesOfOnlineMBA() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-800">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Types of <span className="text-red-500">Online MBA</span>
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        "Online MBA" isn't a single format — the pace, cost, and eligibility
        shift depending on which route you pick. Here's a breakdown of the
        main types on offer in India.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-red-600 px-6 py-4">
          <h3 className="text-sm font-bold text-white text-center">
            Types of Online MBA
          </h3>
        </div>

        <div className="hidden md:grid grid-cols-[240px_1fr] bg-red-50/60 border-b border-slate-100">
          <div className="px-6 py-3">
            <h4 className="text-sm font-bold text-slate-900">Courses</h4>
          </div>
          <div className="px-6 py-3 border-l border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Details</h4>
          </div>
        </div>

        {TYPES.map((type, i) => (
          <div
            key={type.name}
            className={`grid md:grid-cols-[240px_1fr] gap-4 md:gap-0 px-6 py-5 ${
              i % 2 === 0 ? "bg-red-50/40" : "bg-white"
            } ${i !== TYPES.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            <a
              href="#"
              className="text-sm font-semibold text-red-500 underline decoration-red-200 hover:decoration-red-500 self-start"
            >
              {type.name}
            </a>

            <div className="md:pl-6 md:border-l border-slate-100 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm text-slate-600 leading-relaxed">
                  {type.about}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 italic">Duration — </span>
                  {type.duration}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 italic">Fees — </span>
                  {type.fees}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}