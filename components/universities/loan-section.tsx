"use client";

import { Wallet } from "lucide-react";
import { useState } from "react";

interface LoanSectionProps {
  university?: any;
}

export default function EducationLoanSection({ university }: LoanSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const loanData = university?.details?.financialAssistance || {};
  const cards = loanData.cards || [];

  if (!cards || cards.length === 0) {
    return null;
  }

  const mappedCards = cards.map((c: any) => ({
    title: c.value || c.title || "",
    subtitle: c.text || c.subtitle || "",
  }));

  const gridColsClass =
    mappedCards.length === 1
      ? "sm:grid-cols-1"
      : mappedCards.length === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-3";

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
    // NOTE: wire this up to your real backend/CRM endpoint, e.g.:
    // await fetch("/api/loan-enquiry", { method: "POST", body: JSON.stringify({ name, phone, loanAmount }) });
    setSubmitted(true);
  };

  return (
    <section
      id="loan"
      className="bg-white px-4 -mt-2 pt-4 pb-14 sm:px-6 sm:mt-0 lg:px-8 lg:mt-2 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Wallet className="h-3.5 w-3.5 text-red-500" />
            {loanData.badge || "Financial Assistance"}
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl ">
            {loanData.heading ? (
              <span dangerouslySetInnerHTML={{ __html: loanData.heading }} />
            ) : (
              <>
                Education Loan <span className="text-red-500">EMI</span>
              </>
            )}
          </h2>
        </div>

        <div
          className={`mx-auto grid max-w-4xl grid-cols-1 gap-6 ${gridColsClass}`}
        >
          {mappedCards.map((card: any, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-300 p-6 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-red-600">{card.title}</p>
              <p className="mt-2 text-sm text-slate-500">{card.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openModal}
            className="cursor-pointer rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
          >
            {loanData.buttonText || "Check EMI Eligibility"}
          </button>
        </div>
      </div>

      {/* Eligibility Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                Check EMI Eligibility
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="text-2xl leading-none text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-slate-600"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-slate-600"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="loanAmount"
                    className="mb-1 block text-sm font-medium text-slate-600"
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                    placeholder="e.g. 200000"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                >
                  Submit Enquiry
                </button>

                <p className="text-center text-xs text-slate-400">
                  This isn&apos;t an automatic eligibility check — a loan
                  advisor will review your details and call you back.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-4xl">📞</p>
                <p className="mt-3 text-lg font-semibold text-slate-800">
                  Got it, {name}!
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Thanks for sharing your details. One of our loan advisors will
                  call you on {phone} within 24 hours to walk you through real
                  EMI options for your ₹
                  {Number(loanAmount).toLocaleString("en-IN")} requirement.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 rounded-full bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
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
