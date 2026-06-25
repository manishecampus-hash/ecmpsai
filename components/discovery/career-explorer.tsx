"use client";

import { ArrowRight, Handshake } from "lucide-react";
import Image from "next/image";
import React from "react";
import { careerExplorer } from "@/data/career-explorer";

const CareerExplorer = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Career
          </span>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
            Find Your Perfect <span className="text-red-500">Program</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {careerExplorer.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative w-full h-[120px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text and Button Row */}
              <div className="flex flex-col gap-2 mt-1 flex-1">
                <h3 className=" font-bold leading-tight text-gray-900">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-red-500">{item.count}</p>

                  {/* Arrow Button */}
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full border border-gray-200 bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0"
                    aria-label={`View ${item.title}`}
                  >
                    <ArrowRight size={15} />
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
