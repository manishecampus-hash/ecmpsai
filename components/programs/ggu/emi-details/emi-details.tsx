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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            <span className="text-red-500">Golden Gate University</span> EMI
            Details
          </h1>
        </div>

        {/* Intro Paragraph */}
        <div className="mb-10 max-w-4xl">
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">
            Golden Gate University knows how important it is to think about
            money when going to college or pursuing higher education. They make
            it easy for students to pay tuition by offering{" "}
            <span className="font-semibold text-slate-900">
              EMI (Equated Monthly Installment)
            </span>{" "}
            plans. This flexible payment choice allows students to pay their
            tuition in manageable monthly amounts. This way, money worries will
            stay out of the way of them getting a world-class education at
            Golden Gate University.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border-2 border-slate-200 overflow-hidden rounded-xl shadow-sm bg-white">
          {/* Table Header */}
          <div className="bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="text-lg sm:text-xl font-bold text-center text-slate-900">
              Other Doctor of Business Administration [DBA] Courses
            </h2>
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

        {/* Features Grid */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center hover:border-red-300 hover:shadow-md transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-500 mx-auto mb-3">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">
              Instant Approval
            </h4>
            <p className="text-sm text-slate-600">
              Quick processing with partner banks - approval within 24-48 hours
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center hover:border-red-300 hover:shadow-md transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-500 mx-auto mb-3">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">
              No Hidden Charges
            </h4>
            <p className="text-sm text-slate-600">
              Transparent EMI structure - no processing fees or hidden costs
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center hover:border-red-300 hover:shadow-md transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-500 mx-auto mb-3">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">
              Flexible Tenure
            </h4>
            <p className="text-sm text-slate-600">
              Choose your preferred tenure - 6 to 48 months based on your
              capacity
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-center mb-3">
            <CreditCard className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-2xl font-bold text-slate-900">
              Flexible EMI Options Available
            </h3>
          </div>
          <p className="mb-6 text-slate-600">
            With multiple payment plans through partner banks and financial
            institutions
          </p>
          <button className="rounded-xl bg-red-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            Explore EMI Plans
          </button>
        </div>

        {/* Additional Info Box */}
        <div className="mt-10 rounded-xl border-2 border-red-100 bg-red-50 p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            💡 Program Fee: <span className="text-red-600">₹3,50,000</span>
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Online DBA Program - Flexible payment plans available. Contact our
            admissions team to understand which EMI plan works best for your
            financial situation.
          </p>
        </div>
      </div>
    </section>
  );
}
