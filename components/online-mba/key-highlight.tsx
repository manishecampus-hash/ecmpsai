"use client";

import React from "react";

/**
 * Key Highlights Component
 * Aligned with MBA Overview container structure, typography, and accent colors.
 */

const HIGHLIGHTS: string[] = [
  "An online MBA is a 2-year program that carries the same academic value and recognition as a regular, on-campus MBA.",
  "It lets you keep working while you study — build core business and leadership skills without stepping away from your career.",
  "Course material, recorded lectures, and assignments are accessible from anywhere, so you can balance studies with your job and personal commitments.",
  "Choose from specializations like finance, marketing, entrepreneurship, IT, business analytics & data science, HR, and operations management.",
  "Connect with peers, faculty, and industry professionals from different regions and sectors through live sessions and forums.",
  "Get access to recorded lectures, e-books, live classes, LMS platforms, and discussion boards — all in one place.",
  "A strong fit for working professionals, fresh graduates, business owners, and anyone switching careers.",
  "Sharpen strategic, managerial, and leadership skills that support promotions and stronger job roles.",
  "Most universities offering UGC-DEB-approved online MBA programs are also NAAC-accredited institutions.",
  "Studying with a reputable university can come with virtual placement assistance, resume-building support, and interview preparation.",
  "Programs often include global case studies, international faculty sessions, and industry certifications for broader exposure.",
  "Build sharper decision-making, communication, strategic thinking, and problem-solving skills along the way.",
];

const SIDEBAR_POINTS: string[] = [
  "Avail an exclusive discount coupon of up to ₹20,000 on all online courses",
  "Secure a seat at your dream university before intake closes",
  "Unlock early-bird benefits and fee waivers",
];

export default function KeyHighlights() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        <span className="text-red-500">Key Highlights</span> of Online MBA in India
      </h2>

      {/* Main Layout Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Checklist */}
        <ul className="space-y-4">
          {HIGHLIGHTS.map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <CheckIcon />
              </span>
              <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* Sidebar Sticky CTA Card */}
        <aside className="lg:sticky lg:top-6 rounded-2xl border border-slate-200 shadow-sm bg-white p-6">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wide">
            Admissions closing soon
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            Compare &amp; Enrol Now
          </h3>

          <ul className="mt-4 space-y-3">
            {SIDEBAR_POINTS.map((text, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <CheckIcon />
                </span>
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-5 py-3 shadow-[0_8px_20px_-6px_rgba(239,68,68,0.55)]">
            Compare Universities
          </button>
        </aside>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}