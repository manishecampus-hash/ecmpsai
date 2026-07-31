"use client";

import { MessageSquareQuote, Quote } from "lucide-react";
import React from "react";

interface TestimonialCard {
  id: string;
  name: string;
  program: string;
  university: string;
  image: string;
  quote: string;
}

const testimonials: TestimonialCard[] = [
  {
    id: "1",
    name: "Hav. Ningappa Nayak",
    program: "MBA",
    university: "MUJ",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote:
      "After pursuing my BBA through distance education a few years ago, I was looking for the right university to pursue my online MBA and enrolled in Manipal University Jaipur. The weekend classes were very convenient, and the curriculum is easy to understand. I completely made use of free access to paid learning resources.",
  },
  {
    id: "2",
    name: "Ritika Sharma",
    program: "BCA",
    university: "Amity Online",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote:
      "The online learning experience helped me balance my studies with work. The classes were structured well, faculty support was quick, and the learning platform made it simple to revise lectures and complete assignments on time.",
  },
  {
    id: "3",
    name: "Aman Verma",
    program: "MBA",
    university: "Amity Online",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote:
      "I wanted a program that could improve my management skills without leaving my job. The online MBA gave me the flexibility I needed, and the course content was practical enough to apply directly in my workplace.",
  },
  {
    id: "4",
    name: "Sneha Iyer",
    program: "MCA",
    university: "Online University",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&auto=format&fit=crop&q=80",
    quote:
      "The MCA program helped me strengthen my technical knowledge and confidence. Recorded lectures, doubt sessions, and project-based learning made the entire journey smooth and career-focused.",
  },
];

interface TestimonialsProps {
  university?: any;
}

export default function TestimonialsSection({ university }: TestimonialsProps) {
  const reviewsData = university?.details?.studentReviews || {};
  const list =
    reviewsData.list && reviewsData.list.length > 0
      ? reviewsData.list.map((item: any, idx: number) => ({
          id: item.id || String(idx),
          name: item.name || "",
          program: item.program || "",
          university: item.university || "",
          image:
            item.image ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
          quote: item.quote || "",
        }))
      : testimonials;

  return (
    <section
      id="reviews"
      className="bg-slate-50 px-4 pt-2 pb-12 sm:px-6 sm:pt-3 lg:px-8 lg:pt-4 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider">
            <MessageSquareQuote className="h-3.5 w-3.5 text-red-500" />
            {reviewsData.badge || "Student Reviews"}
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl ">
            Student <span className="text-red-500">Testimonials</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-${Math.min(4, list.length)}`}
        >
          {list.map((testimonial: any) => (
            <article
              key={testimonial.id}
              className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 text-left"
            >
              <div>
                <Quote className="h-6 w-6 text-slate-200 mb-4" />
                <p className="text-sm leading-relaxed text-slate-600">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Profile Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-100"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 truncate">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {testimonial.program} &bull; {testimonial.university}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
