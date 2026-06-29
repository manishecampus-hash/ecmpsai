"use client";
import NextImage from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
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
    }, 7000);
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

    const threshold = 80;
    if (dragOffset < -threshold && activeIndex < sliderBlogs.length - 1) {
      setActiveIndex((i) => i + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      setActiveIndex((i) => i - 1);
    }
    setDragOffset(0);
  };

  const translateX = `calc(-${activeIndex * 100}% + ${dragOffset}px)`;

  return (
    <section className="mx-auto max-w-[1540px] px-6 py-10 lg:px-12">
      <h1 className="mb-10 text-2xl font-bold tracking-tight text-gray-700 md:text-3xl text-center">
        eCampus Blogs
      </h1>

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
            transition: isDragging ? "none" : "transform 700ms ease-in-out",
          }}
        >
          {sliderBlogs.map((sliderBlog) => (
            <div key={sliderBlog.id} className="w-full shrink-0">
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
                <Link
                  href={`/blog/${sliderBlog.slug}`}
                  className="relative h-[350px] overflow-hidden rounded-[24px]"
                  onClick={(e) => {
                    if (Math.abs(dragOffset) > 5) e.preventDefault();
                  }}
                >
                  <NextImage
                    src={sliderBlog.imageSrc}
                    alt={sliderBlog.title}
                    fill
                    priority
                    className="object-cover pointer-events-none"
                  />
                </Link>
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                    <span className="rounded-full bg-gray-100 px-5 py-2 text-gray-700">
                      {sliderBlog.category}
                    </span>
                    <span>|</span>
                    <span>{sliderBlog.date}</span>
                    <span>|</span>
                    <span>{sliderBlog.reads}</span>
                  </div>

                  <h2 className="mb-5 text-2xl font-bold leading-tight text-gray-700 md:text-1xl">
                    {sliderBlog.title}
                  </h2>

                  <p className="mb-8 max-w-[780px] text-lg leading-relaxed text-gray-500">
                    {sliderBlog.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-7">
                    <div className="flex items-center gap-4">
                      {sliderBlog.authorImage ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <NextImage
                            src={sliderBlog.authorImage}
                            alt={sliderBlog.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                          {sliderBlog.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-700">
                          {sliderBlog.author}
                        </p>
                        <p className="text-sm text-gray-500">Verified Author</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${sliderBlog.slug}`}
                      className="font-bold text-gray-700"
                      onClick={(e) => {
                        if (Math.abs(dragOffset) > 5) e.preventDefault();
                      }}
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sliderBlogs.length > 1 && (
        <div className="mt-10 flex justify-center gap-3">
          {sliderBlogs.map((sliderBlog, index) => (
            <button
              key={sliderBlog.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-9 bg-gray-700" : "w-2 bg-gray-300"
              }`}
              aria-label={`Show blog ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
