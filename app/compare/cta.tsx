import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 mb-10 md:mb-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 overflow-hidden relative">
        <div className="grid md:grid-cols-12 items-center">
          {/* Image Area */}
          <div className="md:col-span-5 h-[220px] md:h-full relative bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex items-center justify-center p-4">
            <div className="relative w-full h-full min-h-[220px]">
              <Image
                src="/compare/cta.png"
                alt="Compare Universities"
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-7 p-6 sm:p-8 md:p-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              Smart Decision Engine
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              Two Great Universities. One Smart Decision.
            </h2>

            <p className="text-slate-600 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
              Compare every important factor and choose the university that&apos;s
              the right fit for your future.
            </p>

            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-white font-bold text-sm transition-all duration-300 shadow-md hover:shadow-red-600/25 group"
              >
                <span>Start Comparing Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
