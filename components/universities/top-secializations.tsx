"use client";

import React, { useMemo, useState } from "react";
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

interface SpecializationRow {
  id: string;
  course: string;
  specialization: string;
  duration: string;
  fees: string;
  emi: string;
}

interface TopSpecializationsProps {
  university?: any;
}

const DEFAULT_SPECIALIZATIONS_DATA: SpecializationRow[] = [
  {
    id: "1",
    course: "B.Tech",
    specialization: "Cloud & Cyber Security",
    duration: "4 Years",
    fees: "₹2,80,000",
    emi: "INR 7,775/mo*",
  },
  {
    id: "2",
    course: "B.Tech",
    specialization: "Artificial Intelligence & Data Science",
    duration: "4 Years",
    fees: "₹3,20,000",
    emi: "INR 8,888/mo*",
  },
  {
    id: "3",
    course: "B.Com",
    specialization: "General Accountancy",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "4",
    course: "B.Com",
    specialization: "Honours & Corporate Finance",
    duration: "3 Years",
    fees: "₹1,50,000",
    emi: "INR 4,166/mo*",
  },
  {
    id: "5",
    course: "B.Com",
    specialization: "International Accounting & Finance",
    duration: "3 Years",
    fees: "₹2,25,000",
    emi: "INR 6,250/mo*",
  },
  {
    id: "6",
    course: "BA",
    specialization: "Liberal Arts & Economics",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "7",
    course: "BA",
    specialization: "Sociology & Human Behavior",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "8",
    course: "BA",
    specialization: "Journalism & Digital Media",
    duration: "3 Years",
    fees: "₹1,70,000",
    emi: "INR 4,722/mo*",
  },
  {
    id: "9",
    course: "BA",
    specialization: "Political Science & Governance",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "10",
    course: "BA",
    specialization: "English Literature",
    duration: "3 Years",
    fees: "₹85,000",
    emi: "INR 2,361/mo*",
  },
  {
    id: "11",
    course: "MCA",
    specialization: "Advanced Software Engineering",
    duration: "2 Years",
    fees: "₹1,70,000",
    emi: "INR 7,083/mo*",
  },
  {
    id: "12",
    course: "MCA",
    specialization: "Blockchain Systems & Management",
    duration: "2 Years",
    fees: "₹1,70,000",
    emi: "INR 7,083/mo*",
  },
  {
    id: "13",
    course: "MCA",
    specialization: "FinTech Systems & Cloud Architecture",
    duration: "2 Years",
    fees: "₹2,75,000",
    emi: "INR 11,458/mo*",
  },
  {
    id: "14",
    course: "MBA",
    specialization: "Strategic Marketing & Analytics",
    duration: "2 Years",
    fees: "₹2,50,000",
    emi: "INR 10,416/mo*",
  },
  {
    id: "15",
    course: "MBA",
    specialization: "Human Resource Transformation",
    duration: "2 Years",
    fees: "₹2,50,000",
    emi: "INR 10,416/mo*",
  },
];

const UG_COURSES = ["B.Tech", "B.Com", "BA", "BBA", "BCA", "B.Sc"];

function categorize(course: string): "ug" | "pg" {
  if (UG_COURSES.includes(course)) return "ug";
  return course.trim().toUpperCase().startsWith("B") ? "ug" : "pg";
}

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80",
];

function feeToNumber(fee: string) {
  return parseInt(fee.replace(/[^\d]/g, ""), 10) || 0;
}

export default function TopSpecializations({
  university,
}: TopSpecializationsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<"ug" | "pg" | "top">(
    "ug",
  );
  const itemsPerPage = 10;

  const uniLabel = university?.name
    ? `${university.name} Online`
    : "Amity Online";

  const specData = university?.details?.inDemandSpecializations || {};
  const specializationsData: SpecializationRow[] =
    specData.list && specData.list.length > 0
      ? specData.list.map((item: any, idx: number) => ({
          id: item.id || String(idx),
          course: item.course || "",
          specialization: item.specialization || "",
          duration: item.duration || "",
          fees: item.fees || "",
          emi: item.emi || "",
        }))
      : DEFAULT_SPECIALIZATIONS_DATA;

  const groupedCourses = useMemo(() => {
    const groups: Record<string, SpecializationRow[]> = {};
    specializationsData.forEach((row) => {
      if (!groups[row.course]) groups[row.course] = [];
      groups[row.course].push(row);
    });

    return Object.entries(groups).map(([course, rows], idx) => {
      const feeNumbers = rows.map((r) => feeToNumber(r.fees));
      const allFeesEqual = feeNumbers.every((f) => f === feeNumbers[0]);
      const minFeeIdx = feeNumbers.indexOf(Math.min(...feeNumbers));

      return {
        course,
        category: categorize(course),
        image: CARD_IMAGES[idx % CARD_IMAGES.length],
        specializationsCount: rows.length,
        duration: rows[0].duration,
        feesLabel: allFeesEqual ? "Total Fees" : "Fees Start",
        fees: rows[minFeeIdx].fees,
        emi: rows[minFeeIdx].emi,
      };
    });
  }, [specializationsData]);

  const visibleCourses = groupedCourses.filter(
    (c) => c.category === activeCategory,
  );

  const filteredRows = specializationsData.filter(
    (row) =>
      row.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = (specialization: string) => {
    alert(`Downloading Brochure for: ${specialization}`);
  };

  const categoryTabs: { key: "ug" | "pg" | "top"; label: string }[] = [
    { key: "ug", label: "UG Courses" },
    { key: "pg", label: "PG Courses" },
    { key: "top", label: "Top Specializations" },
  ];

  return (
    <section
      id="courses"
      className="mx-auto max-w-7xl px-3 pt-1 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8 lg:pt-5 lg:pb-16"
    >
      {/* Header Section */}
      <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 text-center mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <GraduationCap className="h-3 w-3 text-red-500" />
          {specData.badge || "In-Demand Specializations"}
        </span>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
          {specData.heading ? (
            <span dangerouslySetInnerHTML={{ __html: specData.heading }} />
          ) : (
            <>
              {uniLabel} <span className="text-red-500">Programs</span>
            </>
          )}
        </h2>
      </div>

      {/* Category Tabs - Compact centered buttons */}
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
              activeCategory === tab.key
                ? "border-red-500 bg-red-500 text-white shadow-md shadow-red-100"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card Grid Section */}
      {(activeCategory === "ug" || activeCategory === "pg") && (
        <>
          <div className="flex justify-center overflow-hidden">
            <div className="__cards-container flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full overflow-x-auto pb-2 snap-x snap-mandatory">
              <style>{`
                @media (max-width: 640px) {
                  .__cards-container > * {
                    min-width: calc(85% - 8px);
                    flex-shrink: 0;
                    snap-align: start;
                  }
                }
              `}</style>
              {visibleCourses.length > 0 ? (
                visibleCourses.map((card) => (
                  <div
                    key={card.course}
                    className="__card-container flex flex-col h-full w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:shadow-lg"
                  >
                    {/* Image Section */}
                    <div className="__card-image-wrapper relative overflow-hidden h-44 sm:h-48 rounded-t-2xl">
                      <img
                        src={card.image}
                        alt={`${card.course} ${uniLabel}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />

                      {/* Badge - Yellow/Amber at bottom-left */}
                      <div className="__card-badge absolute bottom-3 left-3 rounded-lg bg-amber-300 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md">
                        {card.course} ({uniLabel})
                      </div>

                      {/* Rating - Top right */}
                      <div className="__card-rating absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        4.7
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="__card-content flex flex-col flex-grow p-5">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                        Online {card.course} Degree
                      </h3>

                      {/* Info List */}
                      <ul className="space-y-3 text-sm mb-5 flex-grow">
                        {/* Specializations */}
                        <li className="flex items-center gap-3">
                          <div className="__icon-box flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-700" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            Specializations:
                          </span>
                          <span className="font-bold text-slate-900 ml-auto">
                            {card.specializationsCount}
                          </span>
                        </li>

                        {/* Duration */}
                        <li className="flex items-center gap-3">
                          <div className="__icon-box flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-700" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            Duration:
                          </span>
                          <span className="font-bold text-slate-900 ml-auto">
                            {card.duration}
                          </span>
                        </li>

                        {/* Fees */}
                        <li className="flex items-center gap-3">
                          <div className="__icon-box flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <IndianRupee className="h-5 w-5 text-blue-700" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            {card.feesLabel}:
                          </span>
                          <span className="font-bold text-slate-900 ml-auto">
                            {card.fees}
                          </span>
                        </li>

                        {/* EMI */}
                        <li className="flex items-center gap-3">
                          <div className="__icon-box flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-700" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            EMI/month:
                          </span>
                          <span className="font-bold text-slate-900 ml-auto">
                            {card.emi}
                          </span>
                        </li>
                      </ul>

                      {/* Button */}
                      <button
                        type="button"
                        className="__explore-btn w-full flex items-center justify-center gap-2 rounded-xl border-2 border-red-500 py-3 text-sm font-bold text-red-500 transition duration-300 hover:bg-red-50 active:bg-red-100"
                      >
                        Explore More
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center text-slate-400 font-medium">
                  No {activeCategory === "ug" ? "UG" : "PG"} courses available
                  yet.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Top Specializations Section */}
      {activeCategory === "top" && (
        <>
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6 flex justify-end">
            <div className="relative w-full max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search Course / Spec..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-slate-400 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-red-500 text-white font-bold">
                  <th className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" /> Course
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" /> Specializations
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> Duration
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="h-4 w-4" /> Fees
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4" /> EMI Option
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-center whitespace-nowrap">
                    Brochure
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-gray-700">
                {currentRows.length > 0 ? (
                  currentRows.map((row, idx) => {
                    const isFirstCourseOccurrence =
                      idx === 0 || currentRows[idx - 1].course !== row.course;

                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="p-3 sm:p-4 font-bold text-gray-900 border-r border-slate-100 bg-slate-50/20 max-w-[100px] sm:max-w-[120px] text-xs sm:text-sm">
                          {isFirstCourseOccurrence ? row.course : ""}
                        </td>

                        <td className="p-3 sm:p-4 text-gray-600 font-medium border-r border-slate-100 max-w-xs text-xs sm:text-sm">
                          {row.specialization}
                        </td>

                        <td className="p-3 sm:p-4 text-slate-500 whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">
                          {row.duration}
                        </td>

                        <td className="p-3 sm:p-4 text-gray-900 font-medium whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">
                          {row.fees}
                        </td>

                        <td className="p-3 sm:p-4 text-gray-900 font-bold whitespace-nowrap border-r border-slate-100 text-xs sm:text-sm">
                          {row.emi}
                        </td>

                        <td className="p-2 sm:p-3 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleDownload(row.specialization)}
                            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white px-2 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-red-500 hover:text-red-500"
                          >
                            <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span className="hidden sm:inline">Download</span>
                            <span className="sm:hidden">DL</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 sm:p-12 text-center text-slate-400 font-medium text-xs sm:text-sm"
                    >
                      No courses or specializations found matching your
                      criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 sm:mt-6 flex items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                if (totalPages <= 5) return i + 1;
                if (currentPage <= 3) return i + 1;
                if (currentPage >= totalPages - 2) return totalPages - 4 + i;
                return currentPage - 2 + i;
              }).map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && arr[idx - 1] !== page - 1 && (
                    <span className="text-slate-400 px-1">...</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-sm transition ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
