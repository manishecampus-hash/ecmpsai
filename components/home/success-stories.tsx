"use client";

import { useRef } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const successStories = [
  {
    name: "Rahul M.",
    age: "24",
    icon: "🚀",
    text: "I went from applying blindly to landing 3 interviews in 2 weeks. The roadmap made everything click.",
    change: "+₹4.2L hike",
    tag: "#DataAnalyst",
  },
  {
    name: "Priya S.",
    age: "27",
    icon: "💼",
    text: "Switched from ops to product in 4 months. This platform gave me structure when I had zero idea where to start.",
    change: "Career switch",
    tag: "#ProductManager",
  },
  {
    name: "Aman K.",
    age: "29",
    icon: "📈",
    text: "Got promoted to HR Manager within 6 months. The skill gap analysis was brutally honest and exactly what I needed.",
    change: "Promoted",
    tag: "#HRManager",
  },
  {
    name: "Sneha R.",
    age: "26",
    icon: "🎯",
    text: "Cracked my first marketing role at a startup after 3 months of focused prep. The interview guides are gold.",
    change: "First job",
    tag: "#Marketing",
  },
  {
    name: "Vikram T.",
    age: "31",
    icon: "💡",
    text: "Moved from a tier-2 company to a top MNC with a 60% salary jump. Couldn't have done it without the mock tests.",
    change: "+60% salary",
    tag: "#ProductManager",
  },
  {
    name: "Divya N.",
    age: "25",
    icon: "⭐",
    text: "Got shortlisted by 4 out of 5 companies I applied to. The resume builder alone is worth it.",
    change: "4/5 shortlisted",
    tag: "#HRManager",
  },
];

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -620, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 620, behavior: "smooth" });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — same alignment as CareerExplorer */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Real people. Real results.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white hover:scale-105 active:scale-95 transition-transform duration-150 shadow-md"
              >
                <ChevronLeft className="h-4 w-4 text-black" strokeWidth={3} />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white hover:scale-105 active:scale-95 transition-transform duration-150 shadow-md"
              >
                <ChevronRight className="h-4 w-4 text-black" strokeWidth={3} />
              </button>
            </div>
            <span className="text-sm font-bold text-white hover:underline cursor-pointer">
              Show all
            </span>
          </div>
        </div>

        {/* Slider — same structure as CareerExplorer */}
        <div className="relative group/slider">
          {/* Floating left arrow */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="
              hidden md:flex
              absolute left-0 top-[110px] -translate-y-1/2 -translate-x-1/2
              z-10 h-8 w-8
              items-center justify-center
              rounded-full bg-white shadow-lg
              opacity-0 group-hover/slider:opacity-100
              hover:scale-110 active:scale-95
              transition-all duration-200
            "
          >
            <ChevronLeft className="h-4 w-4 text-black" strokeWidth={3} />
          </button>

          {/* Floating right arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="
              hidden md:flex
              absolute right-0 top-[110px] -translate-y-1/2 translate-x-1/2
              z-10 h-8 w-8
              items-center justify-center
              rounded-full bg-white shadow-lg
              opacity-0 group-hover/slider:opacity-100
              hover:scale-110 active:scale-95
              transition-all duration-200
            "
          >
            <ChevronRight className="h-4 w-4 text-black" strokeWidth={3} />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {successStories.map((story) => (
              <div
                key={story.name}
                className="
                  group
                  flex-shrink-0
                  w-[280px] md:w-[300px]
                  bg-[#18181B]
                  border border-white/[0.07]
                  rounded-2xl
                  p-6
                  transition-all duration-200
                  hover:border-indigo-500/30
                  hover:bg-[#1c1c22]
                  flex flex-col
                "
              >
                {/* Top row */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {story.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-white text-sm truncate">
                        {story.name}
                      </span>
                      <span className="text-white/35 text-xs flex-shrink-0">
                        {story.age}
                      </span>
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="flex gap-0.5 mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xl flex-shrink-0">{story.icon}</span>
                </div>

                {/* Quote */}
                <p className="text-sm text-white/65 leading-relaxed italic flex-1">
                  &ldquo;{story.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.07]">
                  <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    {story.change}
                  </span>
                  <span className="text-white/25 text-xs">{story.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
