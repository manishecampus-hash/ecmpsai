"use client";

import NextImage from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Blog } from "@/data/blog-data";

export default function BlogHero({
  blog,
  blogs = [],
}: {
  blog: Blog;
  blogs?: Blog[];
}) {
  const sliderBlogs = blogs.length > 0 ? blogs : [blog];
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderBlogs.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === sliderBlogs.length - 1 ? 0 : currentIndex + 1,
      );
    }, 6000);
    return () => window.clearInterval(timer);
  }, [sliderBlogs.length]);

  const handleDragStart = (clientX: number) => {
    startXRef.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - startXRef.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 60;
    if (dragOffset < -threshold && activeIndex < sliderBlogs.length - 1) {
      setActiveIndex((i) => i + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      setActiveIndex((i) => i - 1);
    }
    setDragOffset(0);
  };

  const translateX = `calc(-${activeIndex * 100}% + ${dragOffset}px)`;

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 py-2 sm:py-4 lg:px-8">
      <div className="relative">
        {/* Carousel Slides Container — Clean & Borderless */}
        <div
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(${translateX})`,
              transition: isDragging ? "none" : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {sliderBlogs.map((sliderBlog) => {
              const cleanSlug = (sliderBlog.slug || "").replace(/^\/+|\/+$/g, "");
              return (
                <div key={sliderBlog.id} className="w-full shrink-0">
                  <div className="grid items-center gap-4 sm:gap-8 grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
                    {/* Featured Image */}
                    <Link
                      href={`/blog/${cleanSlug}`}
                      className="relative overflow-hidden rounded-2xl w-full bg-slate-100 h-[210px] sm:h-[270px] lg:h-[320px] shadow-xs border border-slate-200/70"
                      onClick={(e) => {
                        if (Math.abs(dragOffset) > 5) e.preventDefault();
                      }}
                    >
                      <NextImage
                        src={sliderBlog.imageSrc}
                        alt={sliderBlog.title}
                        fill
                        priority
                        className={`object-cover pointer-events-none transition-transform duration-500 hover:scale-105 ${
                          sliderBlog.mobileImageSrc ? "hidden sm:block" : ""
                        }`}
                      />
                      {sliderBlog.mobileImageSrc && (
                        <NextImage
                          src={sliderBlog.mobileImageSrc}
                          alt={sliderBlog.title}
                          fill
                          priority
                          className="object-cover pointer-events-none block sm:hidden"
                        />
                      )}
                    </Link>

                    {/* Featured Article Text Content */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                          <span className="rounded-md bg-red-50 text-red-600 border border-red-100/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider">
                            {sliderBlog.category}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span>{sliderBlog.date}</span>
                          <span className="text-slate-300">•</span>
                          <span>{sliderBlog.reads}</span>
                        </div>

                        <h2 className="mb-2.5 text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-slate-900 tracking-tight line-clamp-2">
                          {sliderBlog.title}
                        </h2>

                        <p className="mb-4 text-sm sm:text-base lg:text-[16.5px] leading-relaxed text-slate-500 font-normal line-clamp-3">
                          {sliderBlog.excerpt}
                        </p>
                      </div>

                      {/* Author & CTA Row */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2.5">
                          {sliderBlog.authorImage ? (
                            <div className="relative h-8 w-8 overflow-hidden rounded-full shrink-0">
                              <NextImage
                                src={sliderBlog.authorImage}
                                alt={sliderBlog.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 font-bold text-white text-xs shrink-0">
                              {sliderBlog.author.charAt(0)}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {sliderBlog.author}
                            </span>
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-50 shrink-0 stroke-[2.5]" />
                          </div>
                        </div>

                        <Link
                          href={`/blog/${cleanSlug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:text-red-600 hover:border-red-300 hover:bg-red-50/50 transition-all cursor-pointer shadow-2xs"
                          onClick={(e) => {
                            if (Math.abs(dragOffset) > 5) e.preventDefault();
                          }}
                        >
                          <span>Read Article</span>
                          <ArrowRight className="h-3.5 w-3.5 text-red-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Indicator Dots */}
        {sliderBlogs.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {sliderBlogs.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? "w-6 bg-red-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}