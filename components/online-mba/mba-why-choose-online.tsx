import React from "react";

/**
 * Why Are So Many Professionals Choosing an Online MBA Right Now?
 * Same container/heading system as the other sections
 * (max-w-4xl, text-3xl md:text-4xl, red-500 accent, red-50 check bubbles).
 */

type Reason = { title: string; detail: string };

const REASONS: Reason[] = [
  {
    title: "No fixed classroom hours:",
    detail:
      "Study when and where it works for you, through recorded lectures and self-paced coursework.",
  },
  {
    title: "You learn and still earn:",
    detail:
      "Most students stay employed through the program and apply what they learn on the job the very next day.",
  },
  {
    title: "Much more affordable:",
    detail:
      "Online MBA programs in India typically cost ₹30,000 to ₹5,00,000 — a fraction of on-campus fees, with no relocation or hostel costs.",
  },
  {
    title: "You build real connections:",
    detail:
      "Virtual events, alumni groups, mentors, and collaborative projects keep your network growing without a physical campus.",
  },
  {
    title: "It opens the door to bigger roles:",
    detail:
      "GMAC data shows online MBA graduates see larger pay increases than those with only a bachelor's degree — and the gap widens over time.",
  },
];

export default function WhyChooseOnlineMBA() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-800">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Why are so many professionals choosing an <span className="text-red-500">Online MBA</span> right now?
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        A traditional campus MBA usually means fixed office hours. An
        online MBA hands that control back to you — early mornings, lunch
        breaks, or late nights, whenever you can focus. There's no need to
        relocate, quit your job, or disrupt your cash flow. And the career
        payoff is real: employers increasingly recognize online degrees
        from accredited universities.
      </p>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Here's why so many professionals pick an online MBA every year — it
        works around your schedule, not the other way round.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm bg-white p-6">
        <ul className="space-y-4">
          {REASONS.map((reason) => (
            <li key={reason.title} className="flex items-start gap-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <CheckIcon />
              </span>
              <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">{reason.title}</span>{" "}
                {reason.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-slate-500 leading-relaxed">
        If you want to move your career forward without pressing pause on
        everything else in your life, an online MBA is probably the
        smartest move you can make.
      </p>
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