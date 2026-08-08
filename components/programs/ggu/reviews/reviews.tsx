"use client";

import { Star, Quote } from "lucide-react";

const ratingBreakdown = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const reviews = [
  {
    name: "Ankit Sharma",
    role: "Senior Manager, IT Services",
    rating: 5,
    text: "The Online DBA at Golden Gate University gave me the flexibility to keep working full-time while pursuing a doctorate. The research track especially pushed me to think more rigorously about real business problems.",
  },
  {
    name: "Priya Menon",
    role: "Entrepreneur",
    rating: 5,
    text: "What stood out was how practical the curriculum felt. Case studies and hands-on assessments meant I could apply what I learned directly to my own business almost immediately.",
  },
  {
    name: "Rahul Verma",
    role: "Finance Consultant",
    rating: 4,
    text: "Solid program overall. The specialization electives let me focus on finance-heavy coursework, and the admissions team was responsive throughout the EMI and enrollment process.",
  },
  {
    name: "Fatima Khan",
    role: "Academic & Researcher",
    rating: 5,
    text: "The dissertation support during the ECTS track was excellent. My supervisor was engaged at every stage, from the proposal defence to the final oral defence.",
  },
  {
    name: "Vikram Desai",
    role: "Operations Head",
    rating: 4,
    text: "A demanding but rewarding program. Balancing work and coursework took discipline, but the flexible online format made it manageable alongside a full-time job.",
  },
  {
    name: "Sneha Iyer",
    role: "HR Business Partner",
    rating: 5,
    text: "I appreciated the variety of assessments — written tests, presentations, and case studies — instead of relying on just one format. It kept the learning experience engaging.",
  },
];

function StarRow({ rating, size = "h-4 w-4" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating
              ? "fill-red-500 text-red-500"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function GGUReviews() {
  const average = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          <span className="text-red-500">Golden Gate University</span> Online
          DBA Reviews
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          Hear directly from students and alumni about their experience with the
          Online DBA program at Golden Gate University — from coursework and
          faculty support to career outcomes after graduation.
        </p>

        {/* Rating Summary */}
        <div className="mt-8 grid sm:grid-cols-[auto,1fr] gap-6 sm:gap-10 rounded-xl border border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col items-center justify-center sm:pr-8 sm:border-r border-slate-200">
            <span className="text-4xl font-bold text-slate-900">{average}</span>
            <StarRow rating={Math.round(Number(average))} size="h-5 w-5" />
            <span className="mt-1 text-xs text-slate-500">
              Based on {reviews.length}+ reviews
            </span>
          </div>

          <div className="space-y-2">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="w-10 text-xs font-medium text-slate-600">
                  {row.stars} star
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-10 text-xs text-slate-500 text-right">
                  {row.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col p-5 border border-slate-200 rounded-lg bg-white hover:border-red-200 hover:shadow-sm transition-all duration-200"
            >
              <Quote className="h-5 w-5 text-red-200 mb-2" />
              <StarRow rating={review.rating} />
              <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                {review.text}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-900">
                  {review.name}
                </p>
                <p className="text-xs text-slate-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
