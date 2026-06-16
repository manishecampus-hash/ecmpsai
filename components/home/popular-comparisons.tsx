"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { popularComparisons } from "@/data/comparisons";
import UniImage from "@/components/ui/uniImage";

export default function PopularComparisons() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
        }
    };

    return (
        <section className="py-10 px-4 max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Compare to find the right university</h2>

                <div className="relative">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
                    >
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth pb-1"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {popularComparisons.map((pair) => {
                            const { slug, uni1, uni2 } = pair;
                            return (
                                <div
                                    key={slug}
                                    className="flex-shrink-0 w-[300px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-center justify-center gap-2 p-4 bg-gray-50">
                                        <div className="relative w-[110px] h-[75px] rounded-lg overflow-hidden bg-white border border-gray-100">
                                            <UniImage src={uni1.image} alt={uni1.name} />
                                        </div>
                                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-semibold">VS</span>
                                        </div>
                                        <div className="relative w-[110px] h-[75px] rounded-lg overflow-hidden bg-white border border-gray-100">
                                            <UniImage src={uni2.image} alt={uni2.name} />
                                        </div>
                                    </div>

                                    <div className="px-4 pt-3 pb-2 flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-[11px] text-gray-400 leading-none mb-0.5">{uni1.type}</p>
                                            <p className="text-sm font-semibold text-gray-900 leading-snug">{uni1.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{uni1.fees}</p>
                                            <p className="text-[11px] text-indigo-600 mt-1 truncate">{uni1.popularCourse}</p>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-[11px] text-gray-400 leading-none mb-0.5">{uni2.type}</p>
                                            <p className="text-sm font-semibold text-gray-900 leading-snug">{uni2.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{uni2.fees}</p>
                                            <p className="text-[11px] text-indigo-600 mt-1 truncate">{uni2.popularCourse}</p>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4 pt-2">
                                        <Link href={`/compare/${slug}`}>
                                            <button className="w-full border border-indigo-500 text-indigo-600 text-sm font-medium py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-150">
                                                {uni1.name.split(" ").slice(-1)[0]} vs {uni2.name.split(" ").slice(-1)[0]}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
                    >
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>

                <div className="mt-4">
                    <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline">
                        View All University Comparisons
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}