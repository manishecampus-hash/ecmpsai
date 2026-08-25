"use client";

import React, { ReactNode } from "react";

/**
 * Key Highlights Component
 * Card-grid layout, aligned with the MBA Overview container structure,
 * typography, and accent colors (red-500 / slate).
 */

interface Highlight {
  icon: ReactNode;
  title: string;
  text: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <CapIcon />,
    title: "Same academic value",
    text: "A 2-year program that carries the same academic value and recognition as a regular, on-campus MBA.",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Study while you work",
    text: "Keep working while you study — build core business and leadership skills without stepping away from your career.",
  },
  {
    icon: <GlobeIcon />,
    title: "Learn from anywhere",
    text: "Course material, recorded lectures, and assignments are accessible from anywhere, so you can balance study with work and life.",
  },
  {
    icon: <LayersIcon />,
    title: "Pick your specialization",
    text: "Finance, marketing, entrepreneurship, IT, business analytics & data science, HR, and operations management.",
  },
  {
    icon: <UsersIcon />,
    title: "A wider network",
    text: "Connect with peers, faculty, and industry professionals from different regions and sectors through live sessions and forums.",
  },
  {
    icon: <BookIcon />,
    title: "Everything in one place",
    text: "Recorded lectures, e-books, live classes, LMS platforms, and discussion boards — all in one place.",
  },
  {
    icon: <UserCheckIcon />,
    title: "Built for every stage",
    text: "A strong fit for working professionals, fresh graduates, business owners, and anyone switching careers.",
  },
  {
    icon: <TrendUpIcon />,
    title: "Sharper leadership",
    text: "Strategic, managerial, and leadership skills that support promotions and stronger job roles.",
  },
  {
    icon: <ShieldIcon />,
    title: "Accredited institutions",
    text: "Most universities offering UGC-DEB-approved online MBA programs are also NAAC-accredited institutions.",
  },
  {
    icon: <TargetIcon />,
    title: "Placement support",
    text: "Virtual placement assistance, resume-building support, and interview preparation from reputable universities.",
  },
  {
    icon: <CompassIcon />,
    title: "Global exposure",
    text: "Global case studies, international faculty sessions, and industry certifications for broader exposure.",
  },
  {
    icon: <BrainIcon />,
    title: "Well-rounded skills",
    text: "Sharper decision-making, communication, strategic thinking, and problem-solving skills along the way.",
  },
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
      <span className="inline-block text-xs font-bold tracking-wider text-red-500 uppercase">
        Why it works
      </span>
      <h2 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        <span className="text-red-500">Key Highlights</span> of Online MBA in India
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed text-base sm:text-lg">
        Twelve reasons working professionals across India are choosing to
        study for their MBA online.
      </p>

      {/* Main Layout Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-200 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                {h.icon}
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {h.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {h.text}
              </p>
            </div>
          ))}
        </div>

        {/* Sidebar Sticky CTA Card */}
        <aside className="lg:sticky lg:top-6 rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="h-1.5 bg-red-500" />
          <div className="p-6">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Admissions closing soon
            </p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              Compare &amp; enrol now
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Free, and takes under 2 minutes.
            </p>

            <ul className="mt-5 space-y-3.5">
              {SIDEBAR_POINTS.map((text, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <CheckIcon />
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-5 py-3 shadow-[0_8px_20px_-6px_rgba(239,68,68,0.55)]">
              Compare universities
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17.5l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4.5a3.2 3.2 0 010 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 14c2.6.4 5 2.8 5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 5.5A2.5 2.5 0 016.5 3H12v17H6.5A2.5 2.5 0 004 17.5v-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 5.5A2.5 2.5 0 0017.5 3H12v17h5.5a2.5 2.5 0 002.5-2.5v-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function UserCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 11l1.5 1.5L21.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h6v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M15 9l-2 6-4 2 2-6 4-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 007 18a3 3 0 003-3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011 5.8A3 3 0 0117 18a3 3 0 01-3-3V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}