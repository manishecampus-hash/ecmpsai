import React from "react";
import { CheckSquare, Handshake } from "lucide-react";

const specializations = [
  "Accounting & Finance",
  "Banking & Insurance",
  "Taxation",
  "Financial Markets",
  "International Business",
];

export default function BComOverview() {
  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.12), transparent 35%), #05070d",
      }}
      className="relative w-full px-4 py-12 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/bcom-universities/bcom.png"
              alt="Online B.Com student learning"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Handshake className="h-3.5 w-3.5 text-red-500" />
              Overview
            </span>

            <h2 className="mt-2 text-[23px] font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Online B.Com Degree Courses{" "}
              <span className="text-red-500">Overview</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              The{" "}
              <strong className="text-white">
                Online B.Com (Bachelor of Commerce)
              </strong>{" "}
              is a flexible undergraduate degree that helps students gain
              practical knowledge in{" "}
              <strong className="text-white">
                accounting, finance, taxation, and business fundamentals
              </strong>{" "}
              through online learning. It is ideal for students and working
              professionals seeking a{" "}
              <strong className="text-white">
                recognized, career-oriented commerce degree.
              </strong>
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />
                <p className="text-lg leading-relaxed text-slate-300">
                  Builds job-ready skills for careers in banking, accounting,
                  finance, and corporate sectors
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />
                <p className="text-lg leading-relaxed text-slate-300">
                  Offers flexible learning with online classes, digital study
                  material, and assessments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
