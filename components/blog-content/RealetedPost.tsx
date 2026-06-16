"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock3 } from "lucide-react";
import { Blog } from "@/data/blog-data";
import { useEffect, useRef, useState } from "react";

interface RelatedPostsProps {
  posts: Blog[];
  currentPostId: number;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const limitedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || window.innerWidth >= 640 || limitedPosts.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === limitedPosts.length - 1 ? 0 : currentIndex + 1;
      slider.scrollTo({
        left: nextIndex * slider.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex, limitedPosts.length]);

  if (limitedPosts.length === 0) return null;

  return (
    <section className="mt-16 w-full">
      <h2
        className="mb-6"
        style={{
          color: "var(--text-primary)",
          fontFamily: "var(--font-heading)",
          fontSize: "1.5rem",
          fontWeight: 800,
        }}
      >
        Related Articles
      </h2>

      {/* Desktop Grid — 3 columns */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-3">
        {limitedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span
                className="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                {post.category}
              </span>
              <h3
                className="mt-2 line-clamp-2 font-bold leading-snug"
                style={{ color: "var(--text-primary)", fontSize: "1rem" }}
              >
                {post.title}
              </h3>
              <p
                className="mt-2 line-clamp-2 text-xs opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                {post.description}
              </p>
              <div
                className="mt-4 flex items-center gap-3 text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Auto Carousel */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory overflow-x-auto pb-4 sm:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {limitedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group min-w-full snap-center overflow-hidden rounded-2xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="relative h-52 w-full">
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span
                className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                {post.category}
              </span>
              <h3
                className="mt-3 text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h3>
              <div
                className="mt-4 flex items-center gap-4 text-xs opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {limitedPosts.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === currentIndex ? "20px" : "6px",
              height: "6px",
              borderRadius: "999px",
              background:
                i === currentIndex ? "var(--accent)" : "var(--border)",
              transition: "all 0.3s",
              display: "inline-block",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
