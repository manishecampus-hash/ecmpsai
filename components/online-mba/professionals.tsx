import React from "react";

/**
 * Is an Online MBA Good for Working Professionals? +
 * What facilities and support do you get in an Online MBA?
 * Same container/heading system as the other sections
 * (max-w-4xl, text-3xl md:text-4xl, red-500 accent, red-50 check bubbles).
 */

export default function Professionals() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-800">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Is an Online MBA Good for <span className="text-red-500">Working Professionals?</span>
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        An online MBA is a strong fit for working professionals who want to
        move their career forward without leaving their job. It brings the
        flexibility to learn management while keeping a paycheck — unlike
        a traditional classroom setup, you can study from anywhere and
        attend classes on your own schedule, making it easier to balance
        work, family, and study.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm bg-white p-6">
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CheckBubble />
            <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">Career advancement</span> is
              one of the biggest wins here. You build leadership, communication,
              and decision-making skills — exactly what a competitive job
              market demands — and most organizations prefer a management
              qualification for promotions and bigger responsibilities. It can
              also help you switch careers, move into a managerial role, or
              start your own business.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckBubble />
            <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">Cost and application</span> work
              in your favor too. Online programs typically cost less than a
              regular MBA since there's no commuting or relocation, and you
              can apply what you learn at work almost immediately — making
              the learning more practical and useful.
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-6 text-slate-500 leading-relaxed">
        For most working professionals, an online MBA is a sound choice —
        it offers the flexibility to keep working, the chance to learn
        practical skills, and a structured path to grow professionally,
        delivering both personal and career gains.
      </p>

      {/* Facilities section */}
      <h2 className="mt-12 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        What <span className="text-red-500">facilities and support</span> do you get in an Online MBA?
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Online MBA students typically get access to a full LMS, live and
        recorded classes, and financial support options. Academic
        facilities include a learning management system with e-books and
        recorded lectures, weekly live sessions, doubt-clearing forums, and
        proctored online exams. Financial facilities include no-cost EMI,
        education loans, and scholarship options. Career support varies by
        university — resume workshops, interview prep, and virtual
        placement drives are standard at NAAC A+ institutions.
      </p>

      <a
        href="#"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 underline decoration-red-200 hover:decoration-red-500"
      >
        <span className="not-italic">→</span>
        Education loan, EMI, and scholarship options for online MBA
      </a>
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