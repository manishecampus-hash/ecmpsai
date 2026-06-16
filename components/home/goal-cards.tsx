"use client";

import React from "react";
import { OfferCarousel } from "@/components/ui/offer-carousel";
import { popularCourses } from "@/data/popular-courses";
import { Handshake, Sparkles } from "lucide-react";

export function PopularCoursesSection() {
  return (
    <section
      style={{}}
      className=" bg-white relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Unified Center Header with Standard Preview Typography */}
        <div className="mx-auto text-center mb-8 border-b border-slate-100 pb-6 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
            <Sparkles size={11} />
            Trending Courses
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Top Selling Courses{" "}

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
