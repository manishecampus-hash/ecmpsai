import React from "react";
import { CheckSquare } from "lucide-react";

const specializations = [
  {
    title: "Accounting & Finance",
    desc: "This specialization builds strong expertise in financial accounting, auditing, taxation, and corporate finance.",
    roles:
      "Accountant, Financial Analyst, Auditor, Tax Consultant, Accounts Executive, Finance Officer",
  },
  {
    title: "Banking & Insurance",
    desc: "It focuses on banking operations, insurance laws, risk management, and financial services.",
    roles:
      "Bank Officer, Insurance Advisor, Relationship Manager, Credit Analyst, Risk Analyst",
  },
  {
    title: "Taxation",
    desc: "This specialization provides in-depth knowledge of direct and indirect taxes, GST, compliance, and tax planning.",
    roles:
      "Tax Consultant, GST Executive, Income Tax Advisor, Compliance Officer, Accounts Executive",
  },
  {
    title: "Financial Markets",
    desc: "It covers stock markets, mutual funds, portfolio management, and investment analysis.",
    roles:
      "Investment Analyst, Equity Dealer, Portfolio Manager, Wealth Advisor, Stock Market Analyst",
  },
  {
    title: "International Business",
    desc: "This specialization focuses on global trade, export-import management, foreign exchange, and international marketing.",
    roles:
      "Export Manager, International Business Executive, Trade Analyst, Global Sales Manager",
  },
];

export default function BComSpecializations() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Top Online B.Com{" "}
            <span className="text-red-500">Specializations in India</span>
          </h2>

          <p className="mx-auto mt-4 max-w-6xl text-lg leading-relaxed text-black">
            <strong>Online B.Com</strong> programs offer in-demand
            specializations aligned with commerce, finance, taxation, banking,
            and global business careers.
          </p>
        </div>

        <div className="mt-9 space-y-7">
          {specializations.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />

              <div>
                <h3 className="text-xl font-bold text-black">{item.title}:</h3>

                <p className="mt-1 text-lg leading-relaxed text-black">
                  {item.desc}
                </p>

                <p className="mt-1 text-lg leading-relaxed text-black">
                  <strong>Career roles:</strong> {item.roles}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
