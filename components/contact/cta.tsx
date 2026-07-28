"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full pt-0 pb-0 md:py-6">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-2 items-center lg:min-h-[320px]">
          {/* Image Section */}
          <div className="flex items-center justify-center p-4 md:p-6">
            <img
              src="/contact/contactusnew.png"
              alt="Contact Us"
              className="w-full max-w-sm md:max-w-md h-auto object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-6 md:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-red-500 uppercase tracking-wider">
              Contact Our Team
            </span>

            <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Let's Talk About Your<span className="text-red-500"> Goals</span>
            </h2>

            <p className="mt-4 max-w-xl text-base md:text-lg text-gray-600">
              Have questions about our services, AI solutions, digital
              marketing, or training programs? Our experts are ready to help you
              find the perfect solution for your business and career goals.
            </p>

            <div className="mt-6 flex w-full flex-col items-center sm:w-auto sm:flex-row gap-3 sm:gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm text-white font-semibold transition-all duration-300 hover:scale-105 sm:px-6 sm:py-3 sm:text-base">
                Contact Us Today
                <ArrowRight size={16} className="sm:hidden" />
                <ArrowRight size={18} className="hidden sm:block" />
              </button>

              <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition duration-300 hover:bg-gray-50 sm:px-6 sm:py-3 sm:text-base">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
