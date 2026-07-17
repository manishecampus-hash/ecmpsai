"use client";

import { ArrowRight, Handshake } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { careerExplorer } from "@/data/career-explorer";

const CareerExplorer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 pt-4 pb-12 sm:pt-6 sm:pb-12 min-h-screen -mt-8 sm:-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto text-center font-[Inter]">
        <div className="mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Skill
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Enhance Skills by <span className="text-red-500">Industry</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 text-left">
          {careerExplorer.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image Container - hover/tap sirf isi area pe trigger hoga */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex((prev) => (prev === index ? null : index));
                }}
                className="group relative w-full h-[90px] sm:h-[110px] lg:h-[120px] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-3 sm:mb-4 shrink-0 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Hover overlay - sirf image area ke andar, size change nahi hota */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center gap-2 p-2.5 sm:p-3
                             bg-[#1b1464]/90 transition-all duration-300 ease-out
                             ${
                               openIndex === index
                                 ? "opacity-100 translate-y-0 pointer-events-auto"
                                 : "opacity-0 translate-y-1 pointer-events-none"
                             }
                             group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
                >
                  <p className="text-white/90 text-[10px] sm:text-[11px] leading-snug line-clamp-3">
                    {item.description ??
                      "Explore top-ranked programs, career paths and industry insights in this field."}
                  </p>

                  <button
                    type="button"
                    className="self-start inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-white
                               bg-white/10 hover:bg-white/20 border border-white/20
                               rounded-full px-2.5 py-1 transition-colors"
                  >
                    Explore
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>

              {/* Text and Button Row - jaisa pehle tha, waisa hi */}
              <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 flex-1">
                <h3 className="font-bold leading-tight text-gray-900 text-[13px] sm:text-base line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between gap-2 mt-auto">
                  <p className="text-xs sm:text-sm font-bold text-red-500">
                    {item.count}
                  </p>

                  <button
                    type="button"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0"
                    aria-label={`View ${item.title}`}
                  >
                    <ArrowRight size={13} className="sm:hidden" />
                    <ArrowRight size={15} className="hidden sm:block" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;
