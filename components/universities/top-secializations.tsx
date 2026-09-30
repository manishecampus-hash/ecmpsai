"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Download,
  BookOpen,
  Clock,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRight,
  Star,
} from "lucide-react";
import HighlightedText from "./HighlightedText";


import { EXPLORE_LINKS } from "@/data/explore-course";
import { DEFAULT_SPECIALIZATIONS_DATA, SpecializationRow } from "@/data/specializations";
import { CARD_IMAGES } from "@/data/constant";
import { formatINR } from "@/lib/course-helpers";
import { SignupModal } from "@/components/layout/signup-modal";

/* TopSpecializations is intentionally compact: all large arrays & helpers
   are imported from data/ and lib/. Only rendering and fetch logic live here. */

interface TopSpecializationsProps {
  university?: any;
}

export default function TopSpecializations({ university }: TopSpecializationsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("top");
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const itemsPerPage = 8;

  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: "left" | "right") => {
    if (!cardsScrollRef.current) return;
    const scrollAmount = 280; // approx one card width + gap
    cardsScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const uniLabel = university?.name ? `${university.name} Online` : "Amity Online";

  const normalize = (val?: string) => (val || "").toLowerCase().trim().replace(/[\s_-]+/g, "");

  useEffect(() => {
    if (!university?.id) {
      setIsLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

    const fetchCoursesAndCategories = async () => {
      try {
        setIsLoading(true);
        const coursesUrl = `${apiUrl}/universities/${university.id}/courses`;
        const coursesRes = await fetch(coursesUrl);
        let coursesData = [];
        if (coursesRes.ok) {
          coursesData = await coursesRes.json();
        }

        const categoriesUrl = `${apiUrl}/universities/course-meta?type=category`;
        const categoriesRes = await fetch(categoriesUrl);
        let categoriesData = [];
        if (categoriesRes.ok) {
          categoriesData = await categoriesRes.json();
        }

        setDbCourses(coursesData);
        setCategoriesList(categoriesData);
      } catch (err) {
        console.error("Failed to fetch courses or categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesAndCategories();
  }, [university?.id]);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    if (Array.isArray(categoriesList)) {
      categoriesList.forEach((cat: any) => {
        if (cat.id && cat.name) {
          map[cat.id] = cat.name;
        }
      });
    }
    return map;
  }, [categoriesList]);

  const showOnlyTopTab = useMemo(() => {
    if (isLoading) return false;
    if (dbCourses.length === 0) return true;
    const hasCourseWithoutCategory = dbCourses.some(
      (course) => !course.category || !categoryMap[course.category]
    );
    return hasCourseWithoutCategory;
  }, [dbCourses, categoryMap, isLoading]);

  const categoryTabs = useMemo(() => {
    if (isLoading) {
      return [{ key: "top", label: "Top Specializations" }];
    }
    if (showOnlyTopTab) {
      return [
        { key: "top", label: "Top Specializations" },
        { key: "explore", label: "Explore Online Courses" },
      ];
    }

    const uniqueCategoryIds = Array.from(
      new Set(dbCourses.map((c) => c.category).filter(Boolean))
    );

    const dynamicTabs = uniqueCategoryIds.map((catId) => ({
      key: catId,
      label: categoryMap[catId] || "Category",
    }));

    return [
      { key: "top", label: "Top Specializations" },
      ...dynamicTabs,
      { key: "explore", label: "Explore Online Courses" },
    ];
  }, [dbCourses, categoryMap, showOnlyTopTab, isLoading]);

  useEffect(() => {
    if (categoryTabs.length > 0) {
      const exists = categoryTabs.some((t) => t.key === activeCategory);
      if (!exists) {
        setActiveCategory(categoryTabs[0].key);
      }
    }
  }, [categoryTabs, activeCategory]);

  const visibleCourses = useMemo(() => {
    if (activeCategory === "top") return [];
    if (activeCategory === "explore") {
      return dbCourses.length > 0 ? dbCourses : [];
    }
    return dbCourses.filter((c) => c.category === activeCategory);
  }, [dbCourses, activeCategory]);

  const specData =
    university?.details?.specializations ||
    university?.details?.inDemandSpecializations ||
    {};
  const specializationsData: SpecializationRow[] =
    specData.list && specData.list.length > 0
      ? specData.list.map((item: any, idx: number) => ({
          id: item.id || String(idx),
          course: item.course || "",
          specialization: item.specialization || "",
          duration: item.duration || "",
          fees: item.fees || "",
          emi: item.emi || "",
          brochure: item.brochure || "",
        }))
      : DEFAULT_SPECIALIZATIONS_DATA;

  const totalPages = Math.ceil(specializationsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = specializationsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = (specialization: string) => {
    alert(`Downloading Brochure for: ${specialization}`);
  };

  /* Render explore table using EXPLORE_LINKS (keeps TopSpecializations tidy) */
  const renderExploreTable = () => {
    const pairs: { left: any; right?: any }[] = [];
    for (let i = 0; i < EXPLORE_LINKS.length; i += 2) {
      pairs.push({ left: EXPLORE_LINKS[i], right: EXPLORE_LINKS[i + 1] });
    }

    return (
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="text-center bg-[#ee2c3c] text-white font-bold border-b border-red-200 py-3 font-semibold text-lg text-black-700">
         Explore Top Online Courses in India
        </div>

        <div className="hidden sm:block">
          <table className="w-full border-collapse">
            <tbody>
              {pairs.map((p, i) => (
                <tr key={i} className="even:bg-slate-50">
                  <td className="px-4 py-4 border-b border-slate-200 align-top w-1/2">
                    <a href={p.left.url} className="text-black-600 
                    underline font-medium" target="_blank" rel="noopener noreferrer">
                      {p.left.label}
                    </a>
                  </td>
                  <td className="px-4 py-4 border-b border-slate-200 align-top w-1/2">
                    {p.right ? (
                      <a href={p.right.url} className="text-black-600 underline font-medium" target="_blank" rel="noopener noreferrer">
                        {p.right.label}
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block sm:hidden">
          <div className="divide-y divide-slate-200">
            {EXPLORE_LINKS.map((link, idx) => (
              <div key={idx} className="px-4 py-3 bg-white">
                <a href={link.url} className="text-black underline font-medium" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="courses" className="mx-auto max-w-7xl px-3 pt-1 pb-4 sm:px-6 sm:pt-3 sm:pb-6 lg:px-8 lg:pt-5 lg:pb-6">
      {isLoading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Centered Section Title and IN-DEMAND SPECIALIZATIONS badge outside the table */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
            <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ea384c] mb-2.5 bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              <BookOpen className="h-3.5 w-3.5 text-[#ea384c]" />
              <span>{specData.badge || "IN-DEMAND SPECIALIZATIONS"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {specData.heading ? (
                <HighlightedText text={specData.heading} />
              ) : (
                specData.title || "Explore Top Online Courses"
              )}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
              {specData.subheading ||
                "UGC-entitled, industry-aligned curricula designed for career acceleration"}
            </p>
          </div>

          {/* Main Card Container where table & filters are displayed */}
          <div className="mx-auto w-full max-w-7xl rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-xs">
            {/* Main Category Filter inside the div where table is showing */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-6 border-b border-slate-100">
              {categoryTabs.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.key);
                      setCurrentPage(1);
                    }}
                    className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap text-center ${
                      isActive
                        ? "bg-[#ea384c] text-white shadow-sm shadow-red-200/60"
                        : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* View 1: Top Specializations Table */}
            {activeCategory === "top" && (
              <div>
                <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-2xs">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#ea384c] text-white font-bold text-xs uppercase tracking-wider">
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 whitespace-nowrap">COURSE</th>
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 whitespace-nowrap">SPECIALIZATIONS</th>
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 whitespace-nowrap">DURATION</th>
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 whitespace-nowrap">TOTAL FEES (APPROX)</th>
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 whitespace-nowrap">EMI OPTION</th>
                        <th className="px-4 py-3.5 sm:px-6 sm:py-4 text-center whitespace-nowrap">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentRows.length > 0 ? (
                        currentRows.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                              {row.course}
                            </td>
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 font-medium text-slate-600 text-xs sm:text-sm">
                              {row.specialization}
                            </td>
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 text-slate-600 font-normal whitespace-nowrap text-xs sm:text-sm">
                              {row.duration}
                            </td>
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                              {row.fees}
                            </td>
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 font-bold text-[#ea384c] whitespace-nowrap text-xs sm:text-sm">
                              {row.emi}
                            </td>
                            <td className="px-4 py-3.5 sm:px-6 sm:py-4 text-center whitespace-nowrap">
                              {row.brochure ? (
                                <a
                                  href={row.brochure}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#ea384c] hover:text-[#ea384c] transition-colors"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  <span>Brochure</span>
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleDownload(row.specialization)}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#ea384c] hover:text-[#ea384c] transition-colors cursor-pointer"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  <span>Brochure</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium text-xs sm:text-sm">
                            No specializations available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-slate-400 font-normal">
                    *Examination and registration charges may apply per semester.
                  </p>

                  {totalPages > 1 && (
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`h-7 w-7 sm:h-8 sm:w-8 rounded-md text-xs sm:text-sm font-bold transition-all flex items-center justify-center cursor-pointer ${
                            currentPage === page
                              ? "bg-[#ea384c] text-white shadow-2xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View 2: Explore Online Courses Table */}
            {activeCategory === "explore" && (
              <div className="w-full overflow-hidden">
                {renderExploreTable()}
              </div>
            )}

            {/* View 3: Dynamic Category Course Slider */}
            {activeCategory !== "top" && activeCategory !== "explore" && (
              <div className="w-full overflow-hidden">
                <div className="relative">
                  {visibleCourses.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => scrollCards("left")}
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-500 cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollCards("right")}
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-500 cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </>
                  )}

                  <div
                    ref={cardsScrollRef}
                    className="__cards-container flex flex-nowrap gap-3 sm:gap-4 w-full mx-auto pb-2 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-8 sm:px-10"
                  >
                    {visibleCourses.length > 0 ? (
                      visibleCourses.map((card, idx) => {
                        const cardImage = CARD_IMAGES[idx % CARD_IMAGES.length];
                        return (
                          <div
                            key={card.id || card.slug}
                            className="__card-container snap-start flex flex-col h-full flex-shrink-0 w-[85%] sm:w-[260px] lg:w-[270px] overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:shadow-md"
                          >
                            <div className="__card-image-wrapper relative overflow-hidden h-24 sm:h-28 rounded-t-xl">
                              {card.thumbnail ? (
                                <img
                                  src={card.thumbnail}
                                  alt={`${card.name} ${uniLabel}`}
                                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                              ) : (
                                <img
                                  src={cardImage}
                                  alt={`${card.name} ${uniLabel}`}
                                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                              )}

                              <div className="__card-rating absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white px-1.5 py-1 text-[10px] font-bold text-slate-900 shadow-md">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {card.rating || 4.7}
                              </div>
                            </div>

                            <div className="__card-content flex flex-col flex-grow p-3.5">
                              <h3 className="text-sm font-bold text-slate-900 mb-2.5 line-clamp-2 leading-snug">
                                {card.name.toLowerCase().startsWith("online")
                                  ? card.name
                                  : `Online ${card.name}`}
                              </h3>

                              <ul className="space-y-2 text-xs mb-3.5 border-t border-slate-100 pt-2.5">
                                <li className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5 text-slate-500">
                                    <Clock className="h-3.5 w-3.5 text-blue-700 flex-shrink-0" />
                                    Duration
                                  </span>
                                  <span className="font-semibold text-slate-800">{card.duration}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5 text-slate-500">
                                    <IndianRupee className="h-3.5 w-3.5 text-blue-700 flex-shrink-0" />
                                    Fees
                                  </span>
                                  <span className="font-bold text-slate-900">
                                    {formatINR(card.feeRange?.start || 0)}
                                  </span>
                                </li>
                              </ul>

                              <button
                                type="button"
                                onClick={() => setShowSignupModal(true)}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ea384c] hover:bg-[#d82a3e] py-2.5 px-3 text-xs font-bold text-white shadow-sm shadow-red-500/15 transition-all duration-200 cursor-pointer hover:shadow-md hover:shadow-red-500/25 active:scale-[0.98] mt-auto group"
                              >
                                <span>Explore More</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center text-slate-400 font-medium w-full">
                        No courses available under this category yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => setShowSignupModal(false)}
      />
    </section>
  );
}