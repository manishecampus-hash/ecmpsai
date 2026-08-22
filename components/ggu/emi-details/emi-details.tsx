"use client";

import { CreditCard, Check } from "lucide-react";

const otherDbaPrograms = [
  { name: "Golden Gate University Online DBA", link: "#", highlight: true },
  { name: "Rushford Online DBA", link: "#" },
  { name: "SSBJM Online DBA", link: "#" },
  { name: "IIM Kashipur Online DBA", link: "#" },
  { name: "Durham University Online DBA", link: "#" },
  { name: "IMSR Online DBA", link: "#" },
  { name: "University of Michigan Flint Online DBA", link: "#" },
  { name: "University of Dallas Online DBA", link: "#" },
  { name: "ESGCI School of Business Online DBA", link: "#" },
  { name: "Westcliff University Online DBA", link: "#" },
  { name: "University of South Florida Online DBA", link: "#" },
  { name: "Walden University Online DBA", link: "#" },
  { name: "Liberty University Online DBA", link: "#" },
  { name: "Purdue University Online DBA", link: "#" },
];

export default function GGUEMIDetails() {
  // Split programs into two columns
  const midpoint = Math.ceil(otherDbaPrograms.length / 2);
  const leftColumn = otherDbaPrograms.slice(0, midpoint);
  const rightColumn = otherDbaPrograms.slice(midpoint);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Golden Gate University{" "}
            <span className="text-red-500">EMI Details</span>
          </h2>
        </div>

        <div className="mb-10 w-11/12 mx-auto text-center">
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">
            Golden Gate University knows how important it is to think about
            money when going to college. They make it easy for students to pay
            tuition by offering{" "}
            <span className="font-semibold text-slate-900">
              EMI (Equated Monthly Installment)
            </span>{" "}
            plans. This flexible payment choice allows students to pay their
            tuition in manageable monthly amounts, keeping money worries out of
            the way of getting a world-class education.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border-2 border-slate-200 overflow-hidden rounded-xl shadow-sm bg-white">
          {/* Table Header */}
          <div className="bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
            <h3 className="mt-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Other Doctor of Business Administration{" "}
              <span className="text-red-500">[DBA] Courses</span>
            </h3>
          </div>

          {/* Table Grid */}
          <div className="grid grid-cols-2 divide-x-2 divide-slate-200 bg-white">
            {/* Left Column */}
            <div className="divide-y-2 divide-slate-200">
              {leftColumn.map((program, index) => (
                <div
                  key={index}
                  className={`px-4 py-4 sm:px-6 sm:py-5 transition-all duration-200 ${
                    program.highlight
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <a
                    href={program.link}
                    className={`text-base font-medium transition-colors hover:underline ${
                      program.highlight
                        ? "text-red-600 font-semibold"
                        : "text-red-500 hover:text-red-600"
                    }`}
                  >
                    {program.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="divide-y-2 divide-slate-200">
              {rightColumn.map((program, index) => (
                <div
                  key={index}
                  className={`px-4 py-4 sm:px-6 sm:py-5 transition-all duration-200 ${
                    program.highlight
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <a
                    href={program.link}
                    className={`text-base font-medium transition-colors hover:underline ${
                      program.highlight
                        ? "text-red-600 font-semibold"
                        : "text-red-500 hover:text-red-600"
                    }`}
                  >
                    {program.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
