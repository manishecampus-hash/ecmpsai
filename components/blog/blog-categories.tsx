"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown } from "lucide-react";
import { Blog } from "@/data/blog-data";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export default function BlogCategories({ blogs }: { blogs: Blog[] }) {
    const [activeCategory, setActiveCategory] = useState("Latest Articles");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => {
        const blogCategories = blogs.map((b) => b.category).filter(Boolean);
        return Array.from(new Set(["Latest Articles", ...blogCategories]));
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (activeCategory === "Latest Articles") return blogs;
        return blogs.filter(
            (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
        );
    }, [activeCategory, blogs]);

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
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <section className="bg-gray-50 py-14">
            <div className="mx-auto max-w-[1540px] px-6 lg:px-12">
                <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-700">
                    Discover Blogs by Categories
                </h2>

                {/* Custom Dropdown */}
                <div ref={dropdownRef} className="relative mb-10 max-w-xs">
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                    >
                        <span className="truncate">{activeCategory}</span>
                        <ChevronDown
                            size={16}
                            className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isOpen && (
                        <ul
                            role="listbox"
                            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
                        >
                            {categories.map((category) => (
                                <li key={category} role="option" aria-selected={activeCategory === category}>
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryChange(category)}
                                        className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition hover:bg-gray-50 ${activeCategory === category
                                            ? "font-semibold text-gray-900"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Blog Cards Grid */}
                <div>
                    {visibleBlogs.length > 0 ? (
                        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                            {visibleBlogs.map((blog, index) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="h-48 w-full overflow-hidden bg-gray-200">
                                        <img
                                            src={blog.imageSrc}
                                            alt={blog.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <p className="mb-4 text-xs font-bold uppercase text-gray-500">
                                            {blog.category}
                                        </p>
                                        <h3 className="mb-5 line-clamp-2 text-lg font-bold leading-snug text-gray-800">
                                            {blog.title}
                                        </h3>
                                        <p className="mb-2 text-sm text-gray-500">
                                            By <span className="font-bold text-gray-700">{blog.author}</span>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {blog.date} · {blog.reads}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-gray-500">
                            No blogs found in this category.
                        </div>
                    )}

                    {canLoadMore && (
                        <div className="mt-12 text-center">
                            <button
                                type="button"
                                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                                className="rounded-xl bg-white px-7 py-3 text-base font-bold text-gray-700 shadow-sm transition hover:bg-gray-100"
                            >
                                View 6 More →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}