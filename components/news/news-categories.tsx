"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, Eye, CheckCircle2, ChevronDown, Filter, Search } from "lucide-react";
import { NewsHeroItem } from "./news-hero";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

export default function NewsCategories({ news }: { news: NewsHeroItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Latest News");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const rawCategories = news.map((b) => b.category).filter(Boolean);
    const unique = Array.from(
      new Set(
        rawCategories.filter(
          (c) =>
            c.toLowerCase() !== "latest news" &&
            c.toLowerCase() !== "most read" &&
            c.toLowerCase() !== "latest articles",
        ),
      ),
    );
    return ["Latest News", "Most Read", ...unique];
  }, [news]);

  // Helper to extract numeric read/view count
  const parseCount = (val: any): number => {
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string") {
      const match = val.trim().match(/^([\d,.]+)\s*([kKmMbB])?/);
      if (match) {
        let num = parseFloat(match[1].replace(/,/g, ""));
        const unit = (match[2] || "").toLowerCase();
        if (unit === "k") num *= 1000;
        else if (unit === "m") num *= 1000000;
        else if (unit === "b") num *= 1000000000;
        return isNaN(num) ? 0 : num;
      }
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) return parsed;
    }
    return 0;
  };

  const getNewsReads = (item: NewsHeroItem): number => {
    const fromView = parseCount(item.view);
    const fromReads = parseCount(item.reads);
    return Math.max(fromView, fromReads);
  };

  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      const dateA = new Date((a as any).updatedAt || (a as any).createdAt || a.date || 0).getTime();
      const dateB = new Date((b as any).updatedAt || (b as any).createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [news]);

  const mostReadNews = useMemo(() => {
    return [...news].sort((a, b) => {
      const readsA = getNewsReads(a);
      const readsB = getNewsReads(b);
      if (readsB !== readsA) {
        return readsB - readsA;
      }
      const dateA = new Date((a as any).updatedAt || (a as any).createdAt || a.date || 0).getTime();
      const dateB = new Date((b as any).updatedAt || (b as any).createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [news]);

  const filteredNews = useMemo(() => {
    let list = sortedNews;
    if (activeCategory.toLowerCase() === "most read") {
      list = mostReadNews;
    } else if (activeCategory !== "Latest News") {
      list = sortedNews.filter(
        (b) => b.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    return list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(q)) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q)),
    );
  }, [activeCategory, sortedNews, mostReadNews, searchQuery]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredNews.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="bg-slate-50/70 py-6 sm:py-8 border-t border-slate-200/60">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header Row: Title & Search & Category Filter Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory === "Latest News"
                ? "Latest News & Updates"
                : activeCategory.toLowerCase() === "most read"
                ? "Most Read News"
                : activeCategory}
            </h2>
            <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-0.5 rounded-full border border-slate-300/50">
              {filteredNews.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(INITIAL_VISIBLE_COUNT);
                }}
                placeholder="Search news..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div ref={dropdownRef} className="relative self-start sm:self-auto min-w-[200px]">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition hover:border-slate-300 hover:text-slate-900 focus:outline-none cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate font-semibold">{activeCategory}</span>
                </div>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-red-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 sm:left-auto top-full z-50 mt-1.5 w-56 max-h-64 overflow-y-auto rounded-xl border border-slate-200/90 bg-white shadow-xl py-1.5 text-xs sm:text-sm font-semibold"
                >
                  {categories.map((category) => (
                    <li
                      key={category}
                      role="option"
                      aria-selected={activeCategory === category}
                    >
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                        className={`flex w-full items-center justify-between px-3.5 py-2 text-left transition hover:bg-slate-50 cursor-pointer ${
                          activeCategory === category
                            ? "font-bold text-red-600 bg-red-50/50"
                            : "text-slate-700 font-semibold"
                        }`}
                      >
                        <span>{category}</span>
                        {activeCategory === category && (
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* News Cards Grid — Matching BlogCards layout */}
        <div>
          {visibleNews.length > 0 ? (
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleNews.map((item) => {
                const cleanSlug = (item.slug || "").replace(/^\/+|\/+$/g, "").replace(/^(events|news)\//i, "");
                return (
                  <Link
                    key={item.id}
                    href={`/news/${cleanSlug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 cursor-pointer"
                  >
                    {/* Card Thumbnail - Harmonized 16:9 Aspect Ratio */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100">
                      <picture className="block h-full w-full">
                        {item.mobileImageSrc && (
                          <source media="(max-width: 640px)" srcSet={item.mobileImageSrc} />
                        )}
                        <img
                          src={item.imageSrc || "/blogs/top-career.png"}
                          alt={item.title}
                          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                        />
                      </picture>

                      {/* Category Badge overlay */}
                      <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-red-600 shadow-xs">
                        {item.category || "News"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        {/* Title with Fixed 2-Line Height for Horizontal Alignment */}
                        <h3 className="line-clamp-2 min-h-[2.75rem] h-[2.75rem] text-sm sm:text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>

                        {item.excerpt && (
                          <p className="mt-2 line-clamp-2 min-h-[2.25rem] h-[2.25rem] text-xs text-slate-500 leading-relaxed">
                            {item.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Card Footer — Always Aligned */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-bold text-slate-800 truncate">
                            {item.author || "eCampus"}
                          </span>
                          <CheckCircle2 className="h-3 w-3 text-blue-500 fill-blue-50 shrink-0 stroke-[2.5]" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 shrink-0">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.reads}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center text-slate-500 font-medium">
              No news articles found matching your criteria.
            </div>
          )}

          {canLoadMore && (
            <div className="mt-8 sm:mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-800 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-red-600 cursor-pointer active:scale-95"
              >
                <span>View More Articles</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

