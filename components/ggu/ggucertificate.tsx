"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";

const certificationPoints = [
  "Degree equivalent to a regular on-campus degree",
  "Hands-on Learning",
  "Globally Recognized Degree",
  "Highly experienced faculty",
];

export default function GGUCertificate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Right image (kept first in DOM on mobile via order utilities to match About-section pattern) */}
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <div
            className="group relative w-full max-w-sm rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img
              src="/programuniversity/ggu_dba_certificate__1648725921747.webp"
              alt="Golden Gate University Certificate"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {/* Hover overlay with eye icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 bg-white rounded-full p-3 shadow-lg">
                <Eye className="h-6 w-6 text-gray-900" />
              </span>
            </div>
          </div>
        </div>

        {/* Left content */}
        <div className="order-1 md:order-2">
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Sample Certificate from{" "}
            <span className="text-red-500">Golden Gate University</span>
          </h2>

          <ul className="space-y-5">
            {certificationPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 h-3 w-3 shrink-0 bg-red-500" />
                <span className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Image popup / lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button - fixed to viewport corner, always on top */}
          <button
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative z-[105] bg-white rounded-lg border-2 border-amber-200 shadow-2xl p-3 sm:p-4 max-w-lg w-full max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/programuniversity/ggu_dba_certificate__1648725921747.webp"
              alt="Golden Gate University Certificate"
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </section>
  );
}
