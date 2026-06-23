"use client";

import { ArrowRight, Brain } from "lucide-react";
import Image from "next/image";
import React from "react";
import { careerExplorer } from "@/data/career-explorer";

const CareerExplorer = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 min-h-screen">
      <div className="max-w-[1380px] mx-auto text-center">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
            <Brain size={11} />
            Career
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {" "}
            Career Explorer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {careerExplorer.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 min-h-[255px] flex flex-col transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative w-full h-[120px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-extrabold leading-tight text-gray-900 mb-1">
                {item.title}
              </h3>

              <p className="text-sm font-bold text-gray-500">{item.count}</p>

              <div className="mt-auto flex justify-end pt-2">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  aria-label={`View ${item.title}`}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;
