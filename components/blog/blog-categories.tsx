"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, Eye, CheckCircle2, ChevronDown, Filter } from "lucide-react";
import { Blog } from "@/data/blog-data";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

export default function BlogCategories({ blogs }: { blogs: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState("Latest Articles");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const blogCategories = blogs.map((b) => b.category).filter(Boolean);
    return Array.from(new Set(["Latest Articles", ...blogCategories]));
  }, [blogs]);

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || (a as any).date || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || (b as any).date || 0).getTime();
      return dateB - dateA;
    });
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "Latest Articles") return sortedBlogs;
    return sortedBlogs.filter(
      (b) => b.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [activeCategory, sortedBlogs]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredBlogs.length;

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
        {/* Header Row: Title & Category Filter Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory === "Latest Articles" ? "Latest Articles" : activeCategory}
            </h2>
            <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-0.5 rounded-full border border-slate-300/50">
              {filteredBlogs.length}
            </span>
          </div>

          {/* Category Filter Dropdown */}
          <div ref={dropdownRef} className="relative self-start sm:self-auto min-w-[210px]">
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

        {/* Blog Cards Grid */}
        <div>
          {visibleBlogs.length > 0 ? (
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleBlogs.map((blog) => {
                const cleanSlug = (blog.slug || "").replace(/^\/+|\/+$/g, "");
                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${cleanSlug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 cursor-pointer"
                  >
                    {/* Card Thumbnail */}
                    <div className="h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                      <picture>
                        {blog.mobileImageSrc && (
                          <source media="(max-width: 640px)" srcSet={blog.mobileImageSrc} />
                        )}
                        <img
                          src={blog.imageSrc}
                          alt={blog.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </picture>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        {/* Title with Fixed 2-Line Height for Horizontal Alignment */}
                        <h3 className="line-clamp-2 min-h-[2.75rem] h-[2.75rem] text-sm sm:text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                          {blog.title}
                        </h3>

                        {blog.description && (
                          <p className="mt-2 line-clamp-2 min-h-[2.25rem] h-[2.25rem] text-xs text-slate-500 leading-relaxed">
                            {blog.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer — Always Aligned */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-bold text-slate-800 truncate">
                            By {blog.author}
                          </span>
                          <CheckCircle2 className="h-3 w-3 text-blue-500 fill-blue-50 shrink-0 stroke-[2.5]" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 shrink-0">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{blog.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{blog.reads}</span>
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
              No blogs found in this category.
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
