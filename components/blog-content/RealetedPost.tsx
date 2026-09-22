"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock3, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Blog } from "@/data/blog-data";
import { useRef } from "react";

interface RelatedPostsProps {
  posts: Blog[];
  currentPostId: number;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredPosts = posts.filter((post) => post.id !== currentPostId);
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : posts;

  if (displayPosts.length === 0) return null;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-4 w-full">
      {/* ── Section Header with Navigation ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Related Articles
        </h2>

        {displayPosts.length > 3 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous articles"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next articles"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Carousel Slider ── */}
      <div
        ref={sliderRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayPosts.map((post) => {
          const cleanSlug = (post.slug || "").replace(/^\/+|\/+$/g, "");
          return (
            <Link
              key={post.id}
              href={`/blog/${cleanSlug}`}
              className="group flex-shrink-0 w-[290px] sm:w-[340px] md:w-[360px] snap-start block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
            >
              {/* Card Thumbnail */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.imageSrc}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 290px, 360px"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    post.mobileImageSrc ? "hidden sm:block" : ""
                  }`}
                />
                {post.mobileImageSrc && (
                  <Image
                    src={post.mobileImageSrc}
                    alt={post.title}
                    fill
                    sizes="290px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 block sm:hidden"
                  />
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  {/* Fixed 2-Line Height for Uniform Alignment */}
                  <h3 className="line-clamp-2 h-[2.75rem] min-h-[2.75rem] font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Fixed 2-Line Excerpt Height */}
                  <p className="mt-2 line-clamp-2 h-[2.25rem] min-h-[2.25rem] text-xs text-slate-500 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Bottom Metadata Section — Always Perfectly Aligned */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3 w-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-slate-400" />
                    <span>{post.reads || `${post.view} Reads`}</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default RelatedPosts;
