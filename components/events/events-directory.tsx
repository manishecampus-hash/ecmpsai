"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Search, ArrowRight, User, Sparkles } from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  publisher?: string;
  publisherImage?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  date: string;
  view: string;
  status?: string;
  tags?: string[];
  updatedAt?: string;
  createdAt?: string;
}

const INITIAL_VISIBLE_COUNT = 9;
const LOAD_MORE_COUNT = 6;

export default function EventsDirectory({ events }: { events: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const categories = useMemo(() => {
    const rawCategories = events.map((e) => e.category).filter(Boolean);
    const unique = Array.from(new Set(rawCategories));
    return ["All Events", ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCat =
        activeCategory === "All Events" ||
        e.category?.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        e.title.toLowerCase().includes(query) ||
        (e.excerpt && e.excerpt.toLowerCase().includes(query)) ||
        (e.category && e.category.toLowerCase().includes(query)) ||
        (e.publisher && e.publisher.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [events, activeCategory, searchQuery]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  return (
    <section className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(INITIAL_VISIBLE_COUNT);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#1d4ed8] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(INITIAL_VISIBLE_COUNT);
            }}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Sparkles className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <h3 className="text-base font-semibold text-gray-800">No events found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery
              ? `No events matching "${searchQuery}". Try a different keyword.`
              : "There are currently no events published under this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => {
            const cleanSlug = (event.slug || "").replace(/^\/+|\/+$/g, "").replace(/^events\//i, "");
            const eventUrl = `/events/${cleanSlug}`;

            return (
              <article
                key={event.id}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Banner / Image */}
                <Link href={eventUrl} className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 block">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 flex items-center justify-center text-blue-500">
                      <Calendar size={36} />
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-700 shadow-sm">
                    {event.category || "Event"}
                  </span>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Meta: Organizer & Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      {event.publisherImage ? (
                        <Image
                          src={event.publisherImage}
                          alt={event.publisher || "Organizer"}
                          width={18}
                          height={18}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User size={14} className="text-gray-400" />
                      )}
                      <span className="font-medium text-gray-700 truncate">
                        {event.publisher || "eCampus"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0 text-gray-400">
                      <Calendar size={12} />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                    <Link href={eventUrl}>{event.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  {event.excerpt && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                      {event.excerpt}
                    </p>
                  )}

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye size={12} />
                      {event.view} views
                    </span>

                    <Link
                      href={eventUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredEvents.length && (
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:border-gray-400 rounded-full text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all shadow-sm"
          >
            Load More Events ({filteredEvents.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
