"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CalendarClock, IndianRupee, Percent, ShieldCheck, Wallet } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import FlowingLines from "@/components/about/flowing-lines";
import { fadeUp } from "../components/motion";
import EmiSliderField from "../components/emi/emi-slider-field";
import EmiDonut from "../components/emi/emi-donut";
import AmortizationChart from "../components/emi/amortization-chart";
import AnimatedNumber from "../components/emi/animated-number";
import EmiGuide from "../components/emi/emi-guide";
import { inr, monthlyEmi, yearlySchedule } from "../components/emi/emi-math";
import type { StudentProfile } from "../types";

const formatAmount = (n: number) => Math.round(n).toLocaleString("en-IN");
const formatRate = (n: number) => String(Math.round(n * 10) / 10);
const formatYears = (n: number) => String(Math.round(n));

export default function EducationLoanEmiCalculatorPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
  }, []);

  const emi = useMemo(() => monthlyEmi(amount, rate, years * 12), [amount, rate, years]);
  const schedule = useMemo(() => yearlySchedule(amount, rate, years), [amount, rate, years]);
  const totalAmount = emi * years * 12;
  const totalInterest = Math.max(0, totalAmount - amount);

  const results = [
    { icon: Wallet, label: "Principal amount", value: amount },
    { icon: Percent, label: "Total interest", value: totalInterest },
    { icon: IndianRupee, label: "Total amount", value: totalAmount },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mx-auto max-w-[1280px] space-y-5">
            {/* Page title */}
            <motion.div {...fadeUp()} className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                  <Calculator className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Education Loan EMI Calculator</h1>
                  <p className="mt-0.5 text-sm text-gray-500">Plan your course fee in easy monthly instalments before you apply.</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Free · Instant · No sign-up needed
              </span>
            </motion.div>

            {/* Calculator */}
            <motion.section
              {...fadeUp(0.05)}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)]"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(to_right,#dc2626,#f87171_40%,transparent)]" />
              <div className="grid lg:grid-cols-[minmax(0,1fr)_380px]">
                {/* Inputs + results */}
                <div className="p-5 sm:p-7">
                  <div className="space-y-7">
                    <EmiSliderField
                      id="emi-amount"
                      label="Loan amount"
                      value={amount}
                      min={50000}
                      max={5000000}
                      step={5000}
                      prefix="₹"
                      format={formatAmount}
                      minLabel="₹50K"
                      maxLabel="₹50L"
                      onChange={setAmount}
                    />
                    <EmiSliderField
                      id="emi-rate"
                      label="Rate of interest (p.a.)"
                      value={rate}
                      min={1}
                      max={20}
                      step={0.1}
                      suffix="%"
                      format={formatRate}
                      minLabel="1%"
                      maxLabel="20%"
                      onChange={setRate}
                    />
                    <EmiSliderField
                      id="emi-years"
                      label="Loan tenure"
                      value={years}
                      min={1}
                      max={10}
                      step={1}
                      suffix={years === 1 ? "Yr" : "Yrs"}
                      format={formatYears}
                      minLabel="1 year"
                      maxLabel="10 years"
                      onChange={setYears}
                    />
                  </div>

                  {/* Results */}
                  <div className="mt-8 grid gap-3 sm:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
                    {/* Highlighted result: light blush card with a red accent and the same flowing lines used across the site */}
                    <div className="relative overflow-hidden rounded-xl border border-red-200 bg-[#fff5f5] p-4 shadow-[0_14px_30px_-20px_rgba(220,38,38,0.45)]">
                      <FlowingLines />
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                      <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-dashed border-red-200 motion-safe:animate-[spin_30s_linear_infinite]" />
                      <p className="relative flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600 text-white">
                          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        Monthly EMI
                      </p>
                      <p className="relative mt-3 flex items-baseline gap-1 tracking-tight" aria-live="polite">
                        <span className="text-[28px] font-extrabold leading-none text-red-600">
                          <AnimatedNumber value={emi} format={inr} />
                        </span>
                        <span className="text-xs font-medium text-gray-500">/month</span>
                      </p>
                      <span className="relative mt-2.5 inline-flex rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-red-700 ring-1 ring-red-200">
                        {years * 12} months
                      </span>
                    </div>
                    {results.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                        <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                          <Icon className="h-3.5 w-3.5 text-red-500" aria-hidden />
                          {label}
                        </p>
                        <p className="mt-1.5 text-base font-bold tabular-nums text-gray-900">
                          <AnimatedNumber value={value} format={inr} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="relative flex flex-col justify-center border-t border-gray-100 bg-[radial-gradient(circle_at_50%_40%,#fef2f2,transparent_70%)] p-5 sm:p-7 lg:border-l lg:border-t-0">
                  <h2 className="mb-5 text-center text-sm font-semibold text-gray-700">Where your money goes</h2>
                  <EmiDonut principal={amount} interest={totalInterest} />
                </div>
              </div>
            </motion.section>

            <motion.div {...fadeUp(0.1)}>
              <AmortizationChart rows={schedule} loanAmount={amount} />
            </motion.div>

            <EmiGuide />

            <p className="text-center text-[11px] leading-relaxed text-gray-400">
              Figures are indicative. Your final EMI depends on the lender, the university and the terms of your loan.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
