import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full">
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-[320px_1fr] items-center">
          {/* Image Area */}
          <div className="h-[220px] md:h-[180px] ">
            {/* iamges */}
            <img
              src="/compare/cta.png"
              alt="Compare Universities"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Two Great Universities. One Smart Decision.
            </h2>

            <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl">
              Compare every important factor and choose the university that's
              the right fit for your future.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white font-medium transition hover:bg-gray-800">
              Start Comparing Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
