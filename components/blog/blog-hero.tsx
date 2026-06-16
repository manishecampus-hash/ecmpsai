"use client";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Image } from "lucide-react";
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

    useEffect(() => {
        if (sliderBlogs.length <= 1) return;

        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) =>
                currentIndex === sliderBlogs.length - 1 ? 0 : currentIndex + 1
            );
        }, 4000);

        return () => window.clearInterval(timer);
    }, [sliderBlogs.length]);

    return (
        <section className="mx-auto max-w-[1540px] px-6 py-10 lg:px-12">
            {/* Blog page heading */}
            <h1 className="mb-10 text-2xl font-bold tracking-tight text-gray-700 md:text-3xl">
                eCampus Blogs
            </h1>

            {/* Full banner auto slider */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {sliderBlogs.map((sliderBlog) => (
                        <div key={sliderBlog.id} className="w-full shrink-0">
                            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
                                <Link
                                    href={`/blog/${sliderBlog.slug}`}
                                    className="relative h-[350px] overflow-hidden rounded-[24px]"
                                >
                                    <NextImage
                                        src={sliderBlog.imageSrc}
                                        alt={sliderBlog.title}
                                        fill
                                        priority
                                        className="object-cover"
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
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                                                {sliderBlog.author.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-bold text-gray-700">
                                                    {sliderBlog.author}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Verified Author
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${sliderBlog.slug}`}
                                            className="font-bold text-gray-700"
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

            {/* Slider dots */}
            {sliderBlogs.length > 1 && (
                <div className="mt-10 flex justify-center gap-3">
                    {sliderBlogs.map((sliderBlog, index) => (
                        <button
                            key={sliderBlog.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-9 bg-gray-700" : "w-2 bg-gray-300"
                                }`}
                            aria-label={`Show blog ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}