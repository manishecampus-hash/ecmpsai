"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Search,
  GraduationCap,
} from "lucide-react";

// Define strict types for structural safety
interface Course {
  id: string;
  title: string;
  duration: string;
  eligibility: string;
  type: string;
  slug: string;
}

interface UniversityProps {
  university?: {
    name?: string;
    courses?: Course[];
  };
}

export default function CoursesSection({ university }: UniversityProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Robust fallback data array used if university.courses is missing or empty
  const defaultCourses: Course[] = [
    {
      id: "hr-analytics",
      title: "Executive Post Graduate Certificate in HR Analytics",
      duration: "10 Months",
      eligibility: "Graduation with 2+ years exp",
      type: "Executive Certificate",
      slug: "#",
    },
    {
      id: "digital-hr",
      title: "Advanced Program in Digital HR & Transformation",
      duration: "6 Months",
      eligibility: "Graduation",
      type: "Advanced Certificate",
      slug: "#",
    },
    {
      id: "shrm",
      title: "Strategic Human Resource Management Programme",
      duration: "1 Year",
      eligibility: "Post Graduation / 5+ years exp",
      type: "Executive Diploma",
      slug: "#",
    },
  ];

  // Defensive execution: Safely point to incoming array data or default portfolio
  const rawCourses =
    university?.courses &&
    Array.isArray(university.courses) &&
    university.courses.length > 0
      ? university.courses
      : defaultCourses;

  // Safe layout filtering line with optional chaining protection
  const filteredCourses = rawCourses.filter((course: Course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    /* ============================================================
        COURSES SECTION
        Handles grid alignments, search states, and card interactions
       ============================================================ */
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Section Header Wrapper */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:mb-12 sm:flex-row sm:items-end">
        <div>
          <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600 sm:mb-4">
            Programs Portfolio
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Available <span className="text-red-500">Courses</span>
          </h2>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">
            Explore cutting-edge modules offered by{" "}
            {university?.name || "IIM K"}
          </p>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full max-w-xs shrink-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-slate-400 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Conditional Cards Grid Rendering */}
      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course: Course, index: number) => (
            <div
              key={course.id || index}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100"
            >
              <div>
                {/* Course Metadata Tag Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                    {course.type}
                  </span>
                </div>

                {/* Course Title Context */}
                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-red-500 line-clamp-2">
                  {course.title}
                </h3>

                {/* Info Blocks Meta Container */}
                <div className="mt-6 space-y-3 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>
                      <strong>Duration:</strong> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">
                      <strong>Eligibility:</strong> {course.eligibility}
                    </span>
                  </div>
                </div>
              </div>

              {/* Explicit Action Callout Button */}
              <div className="mt-8">
                <Link
                  href={course.slug || "#"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 transition group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Isolated Empty Search State Layout */
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-4 text-base font-bold text-gray-900">
            No courses found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or clear key inputs.
          </p>
        </div>
      )}
    </section>
  );
}
