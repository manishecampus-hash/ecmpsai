"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full py-4 md:py-6">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-2 items-center min-h-[320px]">
          {/* Image Section */}
          <div className="flex items-center justify-center p-4 md:p-6">
            <img
              src="/contact/newcontectus.png"
              alt="Contact Us"
              className="w-full max-w-sm md:max-w-md h-auto object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-6 md:p-8">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Contact Our Team
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Let's Talk About Your Goals
            </h2>

            <p className="mt-4 max-w-xl text-base md:text-lg text-gray-600">
              Have questions about our services, AI solutions, digital
              marketing, or training programs? Our experts are ready to help you
              find the perfect solution for your business and career goals.
            </p>

            <div className="mt-6 flex w-full flex-col sm:w-auto sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105">
                Contact Us Today
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-50">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
