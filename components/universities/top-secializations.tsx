"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Search,
  Download,
  BookOpen,
  Clock,
  CreditCard,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRight,
  GraduationCap,
  Star,
} from "lucide-react";
import HighlightedText from "./HighlightedText";


import { EXPLORE_LINKS } from "@/data/explore-course";
import { DEFAULT_SPECIALIZATIONS_DATA, SpecializationRow } from "@/data/specializations";
import { CARD_IMAGES, UG_COURSES } from "@/data/constant";
import { feeToNumber, formatINR, calculateEMI } from "@/lib/course-helpers";

/* TopSpecializations is intentionally compact: all large arrays & helpers
   are imported from data/ and lib/. Only rendering and fetch logic live here. */

interface TopSpecializationsProps {
  university?: any;
}

function categorize(course: string): "ug" | "pg" {
  if (UG_COURSES.includes(course)) return "ug";
  return course.trim().toUpperCase().startsWith("B") ? "ug" : "pg";
}

export default function TopSpecializations({ university }: TopSpecializationsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("top");
  const itemsPerPage = 10;

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
      ...dynamicTabs,
      { key: "top", label: "Top Specializations" },
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

  const filteredRows = specializationsData.filter(
    (row) =>
      row.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="text-center bg-black text-white font-bold border-b border-red-200 py-3 font-semibold text-lg text-black-700">
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
    <section id="courses" className="mx-auto max-w-7xl px-3 pt-1 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8 lg:pt-5 lg:pb-16">
      <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 text-center mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <GraduationCap className="h-3 w-3 text-red-500" />
          {specData.badge || "In-Demand Specializations"}
        </span>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
          {specData.heading ? <HighlightedText text={specData.heading} /> : <>{uniLabel} <span className="text-red-500">Programs</span></>}
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 w-full"><div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div></div>
      ) : (
        <>
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.key);
                  setCurrentPage(1);
                }}
                className={`w-[170px] sm:w-[200px] rounded-lg border px-6 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap text-center ${
                  activeCategory === tab.key ? "border-red-500 bg-red-500 text-white shadow-md shadow-red-100" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeCategory !== "top" && (
            <>
              {activeCategory === "explore" ? (
                <div className="mx-auto w-full max-w-7xl overflow-hidden px-0">{renderExploreTable()}</div>
              ) : (
                /* card slider with arrows */
                <div className="mx-auto w-full max-w-7xl overflow-hidden px-0">
                  <div className="relative">
                    {visibleCourses.length > 0 && (
                      <>
                       <button
  type="button"
  onClick={() => scrollCards("left")}
  className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-500"
  aria-label="Scroll left"
>
  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
</button>

<button
  type="button"
  onClick={() => scrollCards("right")}
  className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-500"
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
                            <div key={card.id || card.slug} className="__card-container snap-start flex flex-col h-full flex-shrink-0 w-[85%] sm:w-[260px] lg:w-[270px] overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:shadow-md">
                              <div className="__card-image-wrapper relative overflow-hidden h-24 sm:h-28 rounded-t-xl">
                                {card.thumbnail ? (
                                  <img src={card.thumbnail} alt={`${card.name} ${uniLabel}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                                ) : (
                                  <img src={cardImage} alt={`${card.name} ${uniLabel}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                                )}

                                <div className="__card-rating absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white px-1.5 py-1 text-[10px] font-bold text-slate-900 shadow-md">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  {card.rating || 4.7}
                                </div>
                              </div>

                              <div className="__card-content flex flex-col flex-grow p-3.5">
                                <h3 className="text-sm font-bold text-slate-900 mb-2.5 line-clamp-2 leading-snug">
                                  {card.name.toLowerCase().startsWith("online") ? card.name : `Online ${card.name}`}
                                </h3>

                                <ul className="space-y-2 text-xs mb-3.5 border-t border-slate-100 pt-2.5">
                                  <li className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-slate-500"><Clock className="h-3.5 w-3.5 text-blue-700 flex-shrink-0" />Duration</span>
                                    <span className="font-semibold text-slate-800">{card.duration}</span>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-slate-500"><IndianRupee className="h-3.5 w-3.5 text-blue-700 flex-shrink-0" />Fees</span>
                                    <span className="font-bold text-slate-900">{formatINR(card.feeRange?.start || 0)}</span>
                                  </li>
                                </ul>

                                <button type="button" className="__explore-btn w-full flex items-center justify-center gap-1.5 text-xs py-1.5 mt-auto">
                                  Explore More
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center text-slate-400 font-medium w-full">No courses available under this category yet.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeCategory === "top" && (
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-4 sm:mb-6 flex justify-end">
                <div className="relative w-full max-w-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Search className="h-4 w-4" /></div>
                  <input type="text" placeholder="Search Course / Spec..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-slate-400 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-black text-white font-bold">
                      <th className="p-3 sm:p-4 whitespace-nowrap"><div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Course</div></th>
                      <th className="p-3 sm:p-4 whitespace-nowrap"><div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Specializations</div></th>
                      <th className="p-3 sm:p-4 whitespace-nowrap"><div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Duration</div></th>
                      <th className="p-3 sm:p-4 whitespace-nowrap"><div className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" /> Fees</div></th>
                      <th className="p-3 sm:p-4 whitespace-nowrap"><div className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> EMI Option</div></th>
                      <th className="p-3 sm:p-4 text-center whitespace-nowrap">Brochure</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 text-gray-700">
                    {currentRows.length > 0 ? (
                      currentRows.map((row, idx) => {
                        const isFirstCourseOccurrence = idx === 0 || currentRows[idx - 1].course !== row.course;

                        return (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3 sm:p-4 font-bold text-gray-900 border-r border-slate-100 bg-slate-50/20 max-w-[100px] sm:max-w-[120px] text-xs sm:text-sm">{isFirstCourseOccurrence ? row.course : ""}</td>
                            <td className="p-3 sm:p-4 text-gray-600 font-medium border-r border-slate-100 max-w-xs text-xs sm:text-sm">{row.specialization}</td>
                            <td className="p-3 sm:p-4 text-slate-500 whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">{row.duration}</td>
                            <td className="p-3 sm:p-4 text-gray-900 font-medium whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">{row.fees}</td>
                            <td className="p-3 sm:p-4 text-gray-900 font-bold whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">{row.emi}</td>
                            <td className="p-2 sm:p-3 text-center whitespace-nowrap">
                              {row.brochure ? (
                                <a href={row.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-red-500 hover:text-red-500">
                                  <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span className="hidden sm:inline">Download</span>
                                  <span className="sm:hidden">DL</span>
                                </a>
                              ) : (
                                <button type="button" onClick={() => handleDownload(row.specialization)} className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-red-500 hover:text-red-500">
                                  <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span className="hidden sm:inline">Download</span>
                                  <span className="sm:hidden">DL</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 sm:p-12 text-center text-slate-400 font-medium text-xs sm:text-sm">No courses or specializations found matching your criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 sm:mt-6 flex items-center justify-end gap-1 sm:gap-2">
                  <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white">
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    if (totalPages <= 5) return i + 1;
                    if (currentPage <= 3) return i + 1;
                    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
                    return currentPage - 2 + i;
                  }).map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && <span className="text-slate-400 px-1">...</span>}
                      <button type="button" onClick={() => setCurrentPage(page)} className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-sm transition ${currentPage === page ? "bg-red-500 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                  <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}