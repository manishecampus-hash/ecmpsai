"use client";

import React, { useState } from "react";
import {
  CreditCard,
  PiggyBank,
  Landmark,
  Building,
  Building2,
  Wallet,
  Calculator,
  Percent,
  ShieldCheck,
  Banknote,
  Check,
  Calendar,
  FileText,
  CheckCircle2,
  BadgeCheck,
  GraduationCap,
  Sparkles,
  Clock,
  Award,
  CircleDollarSign,
  Receipt,
  Scale,
  Gift,
  Coins,
  DollarSign,
} from "lucide-react";
import HighlightedText from "./HighlightedText";

interface LoanSectionProps {
  university?: any;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  creditcard: CreditCard,
  piggybank: PiggyBank,
  landmark: Landmark,
  building: Building,
  building2: Building2,
  wallet: Wallet,
  calculator: Calculator,
  percent: Percent,
  shieldcheck: ShieldCheck,
  banknote: Banknote,
  check: Check,
  calendar: Calendar,
  filetext: FileText,
  checkcircle2: CheckCircle2,
  badgecheck: BadgeCheck,
  graduationcap: GraduationCap,
  sparkles: Sparkles,
  clock: Clock,
  award: Award,
  circledollarsign: CircleDollarSign,
  receipt: Receipt,
  scale: Scale,
  gift: Gift,
  coins: Coins,
  dollarsign: DollarSign,
};

const ACCENT_COLORS = [
  "text-amber-500",
  "text-rose-500",
  "text-blue-500",
  "text-emerald-500",
  "text-purple-500",
];

export default function EducationLoanSection({ university }: LoanSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const loanData = university?.details?.financialAssistance || {};
  const rawCards = loanData.cards || [];

  if (!rawCards || rawCards.length === 0) {
    return null;
  }

  const mappedCards = rawCards.map((c: any, idx: number) => ({
    title: c.value || c.title || "",
    subtitle: c.text || c.subtitle || c.description || "",
    iconName: c.iconName || c.icon || "",
    tag: c.tag || c.feature || c.badge || "",
    colorClass: ACCENT_COLORS[idx % ACCENT_COLORS.length],
  }));

  const openModal = () => {
    setSubmitted(false);
    setError("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !loanAmount.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  const renderIcon = (iconName: string, colorClass: string) => {
    if (!iconName || !iconName.trim()) {
      return null;
    }

    const trimmed = iconName.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
      return (
        <img
          src={trimmed}
          alt=""
          className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
        />
      );
    }

    const normalized = trimmed.replace(/[-_\s]/g, "").toLowerCase();
    const MatchedIcon = ICON_MAP[normalized];
    if (MatchedIcon) {
      return <MatchedIcon className={`h-7 w-7 sm:h-8 sm:w-8 ${colorClass} stroke-[1.8]`} />;
    }

    return null;
  };

  const headingText = loanData.heading || "Education Loan & *No-Cost EMI* Assistance";
  const subheadingText =
    loanData.subheading ||
    loanData.subtitle ||
    loanData.description ||
    "Never let financial limits compromise your career growth. Benefit from pre-approved student loan plans with transparent disbursements.";

  return (
    <section
      id="loan"
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12 font-sans"
    >
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-[11px] font-bold tracking-wider text-amber-700 uppercase">
            {loanData.badge || "FINANCIAL ASSISTANCE"}
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            <HighlightedText text={headingText} defaultColor="#ea384c" />
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {subheadingText}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div
          className={`grid grid-cols-1 ${
            mappedCards.length === 1
              ? "max-w-md mx-auto"
              : mappedCards.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : "md:grid-cols-3"
          } gap-5 sm:gap-6 my-8`}
        >
          {mappedCards.map((card: any, idx: number) => {
            const iconElement = renderIcon(card.iconName, card.colorClass);
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#f8fafc] border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all duration-200 text-left"
              >
                <div>
                  {iconElement && <div className="mb-3">{iconElement}</div>}

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 mb-2 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {card.tag && card.tag.trim() && (
                  <div className="pt-3.5 border-t border-slate-200/70 mt-auto flex items-center gap-2 text-emerald-600 text-xs sm:text-[13px] font-semibold">
                    <Check className="h-3.5 w-3.5 stroke-[2.5] text-emerald-500 shrink-0" />
                    <span>{card.tag.trim()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#ea384c] hover:bg-[#d82a3e] px-7 py-3 text-sm font-bold text-white shadow-md shadow-red-500/20 transition-all duration-200 cursor-pointer hover:shadow-lg active:scale-[0.98]"
          >
            <Calculator className="h-4 w-4" />
            <span>{loanData.buttonText || "Check EMI Eligibility"}</span>
          </button>
        </div>
      </div>

      {/* Eligibility Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Check EMI Eligibility
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="text-2xl leading-none text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="loanAmount"
                    className="mb-1 block text-xs font-semibold text-slate-700"
                  >
                    Loan Amount Needed (₹)
                  </label>
                  <input
                    id="loanAmount"
                    type="number"
                    required
                    min={1}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="e.g. 150000"
                  />
                </div>

                {error && <p className="text-xs font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#ea384c] hover:bg-[#d82a3e] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors cursor-pointer"
                >
                  Submit Enquiry
                </button>

                <p className="text-center text-xs text-slate-500">
                  This isn&apos;t an automatic approval — a loan advisor will review your details and contact you.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Got it, {name}!
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thanks for sharing your details. One of our loan advisors will call you on{" "}
                  <strong className="text-slate-800">{phone}</strong> within 24 hours to guide you through EMI plans for your ₹
                  {Number(loanAmount).toLocaleString("en-IN")} requirement.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
