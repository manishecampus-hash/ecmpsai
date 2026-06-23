import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Image Section */}
          <div className="flex justify-center items-center p-6 md:p-10 ">
            <img
              src="/contact/newcontectus.png"
              alt="Contact Us"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-8 md:p-12">
            <span className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
              Contact Our Team
            </span>

            <p className="mt-4 max-w-xl text-base md:text-lg text-gray-600">
              Have questions about our services, AI solutions, digital
              marketing, or training programs? Our experts are ready to help you
              find the perfect solution for your business and career goals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 text-white font-semibold transition-all  hover:scale-105">
                Contact Us Today
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-50">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
