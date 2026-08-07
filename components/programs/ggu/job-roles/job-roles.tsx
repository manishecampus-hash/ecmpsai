"use client";

import { CheckCircle2 } from "lucide-react";

const hiringPartners = ["Deloitte", "EY", "IBM", "Nestle"];

const jobRoles = [
  { role: "Government Agency", salary: "INR 12 LPA" },
  { role: "C-level Executive", salary: "INR 18 LPA" },
  { role: "Organizational Manager", salary: "INR 9 LPA" },
  { role: "Economist", salary: "INR 14 LPA" },
  { role: "Entrepreneur", salary: "INR 15 LPA" },
  { role: "Consulting", salary: "INR 9 LPA" },
  { role: "Professor", salary: "INR 4 LPA" },
];

export default function JobRoles() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Job Roles{" "}
          <span className="text-red-500">
            Golden Gate University Online DBA/Doctorate
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          An Online DBA program is an ideal choice for candidates looking for an
          online doctorate program that adds a "Dr." title to their name and
          rewards them with the highest scholarly distinction. After
          successfully completing an Online DBA program from Golden Gate
          University, a student is entitled to many job opportunities, including
          University Professors, Industrial R&D Lab professionals, and start-up
          mentors.
        </p>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          A few major active hiring partners of Golden Gate University are
          listed below:
        </p>

        {/* Hiring Partners */}
        <div className="mt-4 space-y-2.5">
          {hiringPartners.map((partner) => (
            <div key={partner} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50 border border-red-200 flex-shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-red-600" />
              </span>
              <span className="text-sm sm:text-base text-slate-700">
                {partner}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
          The list of job roles and average salary packages offered to an Online
          DBA graduate from Golden Gate University is mentioned below:
        </p>

        {/* Job Roles Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-2 bg-red-50 border-b border-slate-200">
            <div className="px-4 py-3">
              <h3 className="text-sm font-bold text-slate-900">Job Roles</h3>
            </div>
            <div className="px-4 py-3 border-l border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                Average Salary (LPA)
              </h3>
            </div>
          </div>

          {jobRoles.map((item, index) => (
            <div
              key={item.role}
              className={`grid grid-cols-2 border-b border-slate-200 last:border-b-0 ${
                index % 2 === 0 ? "bg-white" : "bg-red-50/40"
              }`}
            >
              <div className="px-4 py-3">
                <p className="text-sm text-slate-700">{item.role}</p>
              </div>
              <div className="px-4 py-3 border-l border-slate-200">
                <p className="text-sm text-red-600 font-medium">
                  {item.salary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
