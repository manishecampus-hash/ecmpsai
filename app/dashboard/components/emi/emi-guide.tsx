"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, ChevronDown, IndianRupee, Hourglass, Percent, Phone, SlidersHorizontal, Sparkles, Target } from "lucide-react";

const FACTORS = [
  { icon: IndianRupee, title: "Loan amount", text: "The fee you finance. Paying part of it upfront lowers both your EMI and the interest you pay." },
  { icon: Percent, title: "Interest rate", text: "Even a 1% lower rate makes a visible difference over a long tenure, so compare lenders." },
  { icon: CalendarClock, title: "Tenure", text: "A longer tenure means a smaller EMI, but you pay more interest overall." },
  { icon: Hourglass, title: "Moratorium", text: "Many education loans pause repayment during the course; interest may still build up then." },
];

const STEPS = [
  { icon: SlidersHorizontal, title: "Enter your loan amount", text: "Use the course fee you plan to finance, after any down payment or scholarship." },
  { icon: Percent, title: "Set the interest rate", text: "Add the yearly rate your bank or lender has quoted you." },
  { icon: CalendarClock, title: "Pick a tenure", text: "Choose how many years you want to repay over." },
  { icon: Target, title: "Read your plan", text: "See your monthly EMI, the interest you'll pay and a year-by-year schedule." },
];

const FAQS = [
  {
    q: "What is an education loan EMI?",
    a: "An EMI (equated monthly instalment) is the fixed amount you pay every month until the loan is cleared. Each EMI covers part of the loan and part of the interest — early EMIs are mostly interest, later ones mostly principal.",
  },
  {
    q: "Are the results from this calculator exact?",
    a: "They are a close estimate using the standard reducing-balance formula. Your final EMI can differ slightly because of processing fees, the moratorium period or how your lender rounds figures.",
  },
  {
    q: "Can I get a tax benefit on my education loan?",
    a: "In India, the interest paid on an education loan can be claimed as a deduction under Section 80E of the Income Tax Act, for up to 8 years from the year you start repaying. Check the latest rules with a tax adviser.",
  },
  {
    q: "Can I prepay my education loan?",
    a: "Most lenders allow part or full prepayment, which reduces the interest you pay. Some may charge a small fee, so read your loan terms first.",
  },
  {
    q: "Does eCampus help with EMI options?",
    a: "Yes — our advisors can walk you through EMI and loan options available for your chosen program and university. Call us on 1800 121 6201.",
  },
];

export default function EmiGuide() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      {/* Formula + what affects your EMI */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">How your EMI is calculated</h2>
          <p className="mt-1 text-sm text-gray-500">The standard reducing-balance formula used by banks and lenders.</p>

          {/* Formula set as a proper fraction, like a textbook */}
          <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border-l-4 border-red-600 bg-gray-50 px-4 py-5 font-serif text-gray-900">
            <span className="text-base font-semibold">EMI</span>
            <span className="text-base">=</span>
            <span className="inline-flex flex-col items-center text-[15px]">
              <span className="px-1 pb-1">
                P × r × (1 + r)<sup className="text-[10px]">n</sup>
              </span>
              <span className="w-full border-t border-gray-900" aria-hidden />
              <span className="px-1 pt-1">
                (1 + r)<sup className="text-[10px]">n</sup> − 1
              </span>
            </span>
          </div>

          <dl className="mt-5 divide-y divide-gray-100 border-y border-gray-100 text-sm">
            {[
              ["P", "Loan amount (principal)"],
              ["r", "Monthly interest rate = yearly rate ÷ 12 ÷ 100"],
              ["n", "Number of monthly instalments"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-4 py-2.5">
                <dt className="w-4 flex-shrink-0 font-serif text-base font-semibold italic text-red-600">{k}</dt>
                <dd className="text-gray-600">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Example</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            A loan of <span className="font-semibold text-gray-900">₹3,00,000</span> at{" "}
            <span className="font-semibold text-gray-900">10.5%</span> for <span className="font-semibold text-gray-900">5 years</span> gives an
            EMI of <span className="font-semibold text-red-600">₹6,448</span> a month.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">What affects your education loan EMI</h2>
          <p className="mt-1 text-sm text-gray-500">Four things decide how much you pay each month.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {FACTORS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group flex gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-red-100 hover:bg-red-50/30"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to use */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-gray-900">How to use this calculator</h2>
        <ol className="relative mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden className="absolute left-5 right-5 top-5 hidden border-t-2 border-dashed border-red-100 lg:block" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 ring-2 ring-red-100">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ + advisor */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-gray-100">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-gray-900 transition hover:text-red-600"
                  >
                    {f.q}
                    <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-red-600" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pr-8 text-sm leading-relaxed text-gray-600">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="relative self-start overflow-hidden rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <span aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-red-50" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/25">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <h2 className="relative mt-4 text-lg font-bold text-gray-900">Not sure which plan fits you?</h2>
          <p className="relative mt-1.5 text-sm leading-relaxed text-gray-600">
            Talk to an eCampus advisor about EMI, loan and scholarship options for your program — it&apos;s free.
          </p>
          <a
            href="tel:18001216201"
            className="relative mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.99]"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call 1800 121 6201
          </a>
        </aside>
      </section>
    </div>
  );
}
