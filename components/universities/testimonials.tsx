"use client";

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
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=80",
    quote:
      "After pursuing my BBA through distance education a few years ago, I was looking for the right university to pursue my online MBA and enrolled in Manipal University Jaipur. The weekend classes were very convenient, and the curriculum is easy to understand. I completely made use of free access to paid learning resources.",
  },
  {
    id: "2",
    name: "Ritika Sharma",
    program: "BCA",
    university: "Amity Online",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=80",
    quote:
      "The online learning experience helped me balance my studies with work. The classes were structured well, faculty support was quick, and the learning platform made it simple to revise lectures and complete assignments on time.",
  },
  {
    id: "3",
    name: "Aman Verma",
    program: "MBA",
    university: "Amity Online",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=80",
    quote:
      "I wanted a program that could improve my management skills without leaving my job. The online MBA gave me the flexibility I needed, and the course content was practical enough to apply directly in my workplace.",
  },
  {
    id: "4",
    name: "Sneha Iyer",
    program: "MCA",
    university: "Online University",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&auto=format&fit=crop&q=80",
    quote:
      "The MCA program helped me strengthen my technical knowledge and confidence. Recorded lectures, doubt sessions, and project-based learning made the entire journey smooth and career-focused.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Student <span className="text-red-500">Testimonials</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Hear from learners who advanced their education through flexible
            online programs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_14px_36px_rgba(239,68,68,0.12)]"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-44 w-full rounded-md object-cover"
                loading="lazy"
              />

              <p className="mt-4 line-clamp-3 text-base font-medium leading-relaxed text-gray-800">
                {testimonial.quote}
              </p>

              <button
                type="button"
                className="mt-2 text-base font-black text-gray-900 underline decoration-2 underline-offset-2 transition hover:text-red-500"
              >
                Read More
              </button>

              <div className="mt-5">
                <h3 className="font-serif text-base font-black text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-slate-600">
                  {testimonial.program} <span className="text-gray-900">•</span>{" "}
                  {testimonial.university}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
