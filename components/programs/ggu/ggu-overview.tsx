import React from "react";
import { CheckSquare, Handshake } from "lucide-react";

const specializations = [
  "Strategic Management",
  "Organizational Leadership",
  "Finance & Investment",
  "Marketing Strategy",
  "International Business",
];

export default function GGUDoctorateOverview() {
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
              src="/doctorate-universities/ggu-dba.png"
              alt="Golden Gate University DBA student researching"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Handshake className="h-3.5 w-3.5 text-red-500" />
              Overview
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Online DBA from Golden Gate University:{" "}
              <span className="text-red-500">Overview</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              The{" "}
              <strong className="text-white">
                Doctor of Business Administration (DBA)
              </strong>{" "}
              from Golden Gate University is an AACSB-accredited doctoral
              program built for{" "}
              <strong className="text-white">
                working executives and senior professionals
              </strong>{" "}
              who want to combine rigorous academic research with real-world
              business strategy — all delivered through a{" "}
              <strong className="text-white">
                100% online, flexible format.
              </strong>
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />
                <p className="text-lg leading-relaxed text-slate-300">
                  Prepares you for C-suite, consulting, and academic leadership
                  roles through applied doctoral research
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />
                <p className="text-lg leading-relaxed text-slate-300">
                  Offers flexible online learning designed around the schedules
                  of working professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
