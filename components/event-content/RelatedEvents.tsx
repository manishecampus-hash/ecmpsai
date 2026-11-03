"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface RelatedEventsProps {
  events: any[];
  currentEventId: string;
}

export function RelatedEvents({ events, currentEventId }: RelatedEventsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const filtered = events.filter((e) => String(e.id) !== String(currentEventId));
  const displayEvents = filtered.length > 0 ? filtered : events;

  if (displayEvents.length === 0) return null;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-8 w-full border-t border-gray-100 pt-8">
      {/* ── Section Header with Navigation ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Related Events & Webinars
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Explore more live masterclasses, panel sessions, and admissions guidance.
          </p>
        </div>

        {displayEvents.length > 2 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous events"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next events"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Slider Container ── */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
      >
        {displayEvents.map((item) => {
          const rawSlug = (item.url || item.slug || "").replace(/^\/+|\/+$/g, "");
          const cleanSlug = rawSlug.replace(/^events\//i, "");
          const eventUrl = `/events/${cleanSlug}`;

          return (
            <article
              key={item.id}
              className="group flex-shrink-0 w-[290px] sm:w-[320px] snap-start flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href={eventUrl} className="relative aspect-[16/9] w-full bg-gray-100 block overflow-hidden">
                {item.imageUrl || item.imageSrc ? (
                  <Image
                    src={item.imageUrl || item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-blue-500">
                    <Calendar size={28} />
                  </div>
                )}
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-blue-700 shadow-xs">
                  {item.category || "Event"}
                </span>
              </Link>

              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                  <span className="font-medium truncate max-w-[150px]">
                    {item.publisher || item.author || "eCampus"}
                  </span>
                  <span>{item.date || "Upcoming"}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                  <Link href={eventUrl}>{item.title}</Link>
                </h3>

                {item.excerpt && (
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">
                    {item.excerpt}
                  </p>
                )}

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs mt-auto">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Eye size={12} />
                    {item.view || "0"}
                  </span>

                  <Link href={eventUrl} className="font-semibold text-blue-600 hover:text-blue-700">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
