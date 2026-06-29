"use client";

import React from "react";
import { OfferCarousel } from "@/components/ui/offer-carousel";
import { popularCourses } from "@/data/popular-courses";
import { Handshake, Sparkles } from "lucide-react";

export function PopularCoursesSection() {
  return (
    <section
      style={{}}
      className=" relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Unified Center Header with Standard Preview Typography */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Trending Courses
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Most Popular <span className="text-red-500">Program</span>
          </h2>
        </div>

        {/* Dynamic Carousel Component */}
        <div className="w-full">
          <OfferCarousel offers={popularCourses} />
        </div>
      </div>
    </section>
  );
}
