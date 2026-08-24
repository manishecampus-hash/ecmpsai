"use client";

import React from "react";

/**
 * Online MBA Specializations Component
 * Aligned with MBA Overview and other sections for container width, spacing, and typography.
 */

type Spec = {
  name: string;
  about: string;
  careers: string;
};

const SPECIALIZATIONS: Spec[] = [
  {
    name: "Online MBA in HR Management",
    about:
      "A postgraduate degree focused on managing people and organizational resources. Covers recruitment, compensation, employee relations, performance management, training, labor laws, and leadership.",
    careers:
      "Opens roles like HR Manager, Talent Acquisition Specialist, Recruiter, HR Business Partner, and Training Manager across industries.",
  },
  {
    name: "Online MBA in Finance Management",
    about:
      "A master's degree centered on managing money, investments, and financial decisions in organizations. Covers financial planning, accounting, investment management, corporate finance, budgeting, and risk analysis.",
    careers:
      "Leads to roles such as Financial Manager, Investment Analyst, Financial Advisor, and Corporate Finance Manager.",
  },
  {
    name: "Online MBA in Operations Management",
    about:
      "A postgraduate degree focused on managing and improving business operations. Covers production planning, supply chain management, logistics, quality control, inventory, and process improvement.",
    careers:
      "Opens roles like Operations Manager, Supply Chain Manager, Logistics Manager, Production Manager, and Operations Analyst.",
  },
  {
    name: "Online MBA in Marketing",
    about:
      "A master's program focused on marketing strategy, consumer behavior, branding, digital marketing, sales, and market research.",
    careers:
      "Leads to roles such as Marketing Manager, Brand Manager, Digital Marketing Manager, and Sales Manager.",
  },
  {
    name: "Online MBA in Healthcare Management",
    about:
      "A postgraduate program focused on managing healthcare organizations and services. Covers healthcare administration, finance, operations, policy, and quality management.",
    careers:
      "Opens roles in healthcare administration, consulting, operations, marketing, quality management, and leadership across healthcare organizations.",
  },
  {
    name: "Online MBA in Project Management",
    about:
      "A postgraduate program focused on planning, executing, and managing projects. Covers project planning, budgeting, risk management, resource allocation, and scheduling.",
    careers:
      "Leads to roles such as Project Manager, Project Coordinator, Operations Manager, Program Manager, and Consultant.",
  },
  {
    name: "Online MBA in Business Analytics",
    about:
      "A postgraduate program combining business management with data-driven decision-making. Covers data analysis, business intelligence, statistics, and forecasting.",
    careers:
      "Opens roles in business analysis, consulting, strategy, market research, and data-driven operations.",
  },
  {
    name: "Online MBA in Data Science",
    about:
      "A postgraduate program combining business management with data science. Covers data analysis, statistics, machine learning, and data visualization.",
    careers:
      "Leads to roles such as Data Scientist, Machine Learning Professional, Data Engineer, and AI Analyst.",
  },
  {
    name: "Online MBA in Hospital Management",
    about:
      "A postgraduate program focused on managing hospitals and healthcare facilities. Covers hospital operations, administration, finance, HR, and patient services.",
    careers:
      "Opens roles in hospital administration, healthcare operations, quality management, and medical services coordination.",
  },
  {
    name: "Online MBA in Data Analytics",
    about:
      "A postgraduate program focused on using data to solve business problems. Covers data analysis, statistics, visualization, and reporting.",
    careers:
      "Leads to roles such as Data Analyst, Business Analyst, Reporting Specialist, and Data Consultant.",
  },
  {
    name: "Online MBA in IT",
    about:
      "A postgraduate program combining business management with information technology. Covers IT strategy, information systems, cybersecurity, and digital transformation.",
    careers:
      "Opens roles in IT management, technology consulting, systems administration, cybersecurity, and cloud computing.",
  },
];

export default function Specializations() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        What <span className="text-red-500">specializations</span> does an online MBA offer?
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
        Indian universities offer 95+ online MBA specializations to choose
        from, with good opportunities for dual specializations too. Here are
        the top picks by career scope and demand.
      </p>

      {/* Specializations Table Card */}
      <div className="mt-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-red-600 px-6 py-4">
          <h3 className="text-sm sm:text-base font-bold text-white text-center">
            Top Online MBA Specializations
          </h3>
        </div>

        {SPECIALIZATIONS.map((spec, i) => (
          <div
            key={spec.name}
            className={`grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-6 px-6 py-5 ${
              i % 2 === 0 ? "bg-red-50/40" : "bg-white"
            } ${i !== SPECIALIZATIONS.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            <a
              href="#"
              className="text-sm sm:text-base font-semibold text-red-500 underline decoration-red-200 hover:decoration-red-500 transition-colors self-start"
            >
              {spec.name}
            </a>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {spec.about}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckBubble />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {spec.careers}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <a
        href="#"
        className="mt-6 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-red-500 hover:text-red-600 transition-colors"
      >
        View list of all online MBA specializations
        <ArrowIcon />
      </a>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}