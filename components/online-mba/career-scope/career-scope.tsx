"use client";

import React from "react";
import { Info } from "lucide-react";

interface JobRole {
  role: string;
  salary: string;
}

const JOB_ROLES: JobRole[] = [
  { role: "Portfolio manager", salary: "3 LPA to 37.2 LPA" },
  { role: "Consultant", salary: "4.2 LPA to 25.3 LPA" },
  { role: "Business development manager", salary: "3.1 LPA to 15.8 LPA" },
  { role: "Security/investment analyst", salary: "3 LPA to 10.9 LPA" },
  { role: "Finance manager", salary: "3.5 LPA to 37 LPA" },
  { role: "Marketing Manager", salary: "2.2 LPA to 25.5 LPA" },
  { role: "Project manager", salary: "5 LPA to 30 LPA" },
  { role: "Management consultant", salary: "4.6 LPA to 37.5 LPA" },
  { role: "Investment banker", salary: "2.4 LPA to 52.3 LPA" },
  { role: "Business operations manager", salary: "4 LPA to 31.5 LPA" },
];

interface Recruiter {
  company: string;
  salary: string;
}

const RECRUITERS: Recruiter[] = [
  { company: "ICICI Lombard", salary: "39 lakhs to 44.2 lakhs" },
  { company: "Mphasis", salary: "2 lakhs to 106 lakhs" },
  { company: "Airtel", salary: "4.5 lakhs to 22.2 lakhs" },
  { company: "IndiaMART", salary: "3.2 lakhs to 16.9 lakhs" },
  { company: "NIIT", salary: "2.5 lakhs to 39.3 lakhs" },
  { company: "Coforge", salary: "24.5 lakhs to 44.2 lakhs" },
  { company: "InfoTech", salary: "10 lakhs to 31.6 lakhs" },
  { company: "Maruti Suzuki", salary: "2.2 lakhs to 11.7 lakhs" },
  { company: "EY", salary: "0.7 lakhs to 29 lakhs" },
  { company: "Teleperformance", salary: "1.2 lakhs to 8 lakhs" },
  { company: "Genpact", salary: "1.5 lakhs to 12 lakhs" },
  { company: "Amazon", salary: "1.5 lakhs to 34 lakhs" },
  { company: "Accenture", salary: "2 lakhs to 10.6 lakhs" },
];

export default function CareerScope() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Job Opportunity after <span className="text-red-500">Online MBA</span>
        </h2>
      </div>

      <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Aspirants can take several job opportunities from the online MBA
        course; thereof, there are several job roles available with their
        estimated data. Go through it in detail, which will help you learn
        about further opportunities.
      </p>

      <p className="mt-2 max-w-4xl text-xs italic text-slate-400 sm:text-sm">
        *The salary is estimated, and the data can be derived from Naukri or
        Glassdoor.
      </p>

      {/* Job roles table */}
      <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-red-500 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-white sm:text-base">
            Job Roles after Online MBA Course
          </h3>
        </div>

        <div className="hidden sm:grid sm:grid-cols-[2fr_1fr] bg-slate-50 border-b border-slate-200">
          <div className="px-6 py-3 border-r border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Job Role
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Wages in INR (annually)
            </span>
          </div>
        </div>

        {JOB_ROLES.map((job, i) => (
          <div
            key={job.role}
            className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr] ${
              i !== JOB_ROLES.length - 1 ? "border-b border-slate-200" : ""
            } ${i % 2 === 1 ? "bg-red-50/30" : "bg-white"}`}
          >
            <div className="px-6 py-3.5 sm:border-r border-slate-200">
              <p className="text-sm font-semibold text-slate-900 sm:text-base">
                {job.role}
              </p>
            </div>
            <div className="px-6 pb-3.5 sm:py-3.5">
              <p className="text-sm font-medium text-red-500 sm:text-base">
                {job.salary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Top recruiters intro */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Top Recruiters in <span className="text-red-500">Online MBA</span>
        </h3>

        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Multiple top recruiters of the top MNCs in India and abroad can
          hire online MBA course graduates and offer higher packages.
          However, there is a top company list that provides good salary
          packages yearly to the Online MBA course degree pursuer; get
          through it.
        </p>

        <p className="mt-2 max-w-4xl text-xs italic text-slate-400 sm:text-sm">
          *The Naukri Jobs or Companies portal can cover the salary data
          range or top companies that hire online MBA course pursuers.
        </p>
      </div>

      {/* Recruiters table */}
      <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-red-500 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-white sm:text-base">
            Top MNCs that Hire Online MBA Course Pursuants
          </h3>
        </div>

        <div className="hidden sm:grid sm:grid-cols-[2fr_1fr] bg-slate-50 border-b border-slate-200">
          <div className="px-6 py-3 border-r border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Company
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Salary Packages (yearly, in INR)
            </span>
          </div>
        </div>

        {RECRUITERS.map((rec, i) => (
          <div
            key={rec.company}
            className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr] ${
              i !== RECRUITERS.length - 1 ? "border-b border-slate-200" : ""
            } ${i % 2 === 1 ? "bg-red-50/30" : "bg-white"}`}
          >
            <div className="px-6 py-3.5 sm:border-r border-slate-200">
              <p className="text-sm font-semibold text-slate-900 sm:text-base">
                {rec.company}
              </p>
            </div>
            <div className="px-6 pb-3.5 sm:py-3.5">
              <p className="text-sm font-medium text-red-500 sm:text-base">
                {rec.salary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Salary figures shown above are estimated and sourced from platforms
          like Naukri and Glassdoor. Actual packages may vary based on your
          experience, specialization, negotiation, and the hiring company.
        </p>
      </div>
    </section>
  );
}