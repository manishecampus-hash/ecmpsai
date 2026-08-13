"use client";

import React, { useState } from "react";
import { Quote, Star, GraduationCap, ChevronRight } from "lucide-react";

interface TestimonialCard {
  id: string;
  name: string;
  program: string;
  university: string;
  image: string;
  quote: string;
  rating?: number;
}

const fallbackTestimonials: TestimonialCard[] = [
  {
    id: "1",
    name: "Priya Mehta",
    program: "Online DBA",
    university: "Golden Gate University",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "The Online DBA at GGU pushed me to think like a researcher and a strategist at the same time. Balancing coursework with a full-time VP role was tough, but the flexible schedule and faculty support made it work.",
  },
  {
    id: "2",
    name: "Rohan Agarwal",
    program: "Online DBA",
    university: "Golden Gate University",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "I wanted a doctoral program that respected my time as a working executive. The dissertation process was rigorous, but it directly shaped the strategy work I now lead at my company.",
  },
  {
    id: "3",
    name: "Ananya Sharma",
    program: "Online DBA",
    university: "Golden Gate University",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&auto=format&fit=crop&q=80",
    rating: 4,
    quote:
      "The best part was the cohort of fellow executives — the discussions were as valuable as the coursework. I could attend live sessions, revisit recordings, and stay on track for my dissertation defense.",
  },
];

export default function GGUDoctorateTestimonials({
  testimonials = fallbackTestimonials,
}: {
  testimonials?: TestimonialCard[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.08), transparent 35%), #ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full px-4 py-10 text-slate-900 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {/* Section Header */}
          <div className="mx-auto mb-10 max-w-7xl text-center px-4 sm:px-6 lg:px-8">
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl md:text-4xl">
              DBA Scholar <span className="text-red-500">Testimonials</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const isOpen = activeId === testimonial.id;
            const rating = testimonial.rating ?? 5;

            return (
              <article
                key={testimonial.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50"
              >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-red-500/10 transition group-hover:bg-red-500/20" />

                <div className="relative z-10 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-200"
                    loading="lazy"
                  />

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {testimonial.program} • {testimonial.university}
                    </p>

                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < rating
                              ? "fill-red-500 text-red-500"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6">
                  <Quote className="mb-3 h-8 w-8 text-red-500/80" />

                  <p
                    className={`text-sm font-medium leading-6 text-slate-600 ${
                      isOpen ? "" : "line-clamp-4"
                    }`}
                  >
                    {testimonial.quote}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveId(isOpen ? null : testimonial.id)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-red-500 transition hover:text-red-600"
                  >
                    {isOpen ? "Show Less" : "Read More"}
                    <ChevronRight
                      className={`h-4 w-4 transition ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
