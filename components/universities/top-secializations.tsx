"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  BookOpen,
  Clock,
  CreditCard,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SpecializationRow {
  id: string;
  course: string;
  specialization: string;
  duration: string;
  fees: string;
  emi: string;
}

export default function TopSpecializations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Premium mock dataset avoiding complete direct duplication
  const specializationsData: SpecializationRow[] = [
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

  // Dynamic filter processing tracking over course and specialization title loops
  const filteredRows = specializationsData.filter(
    (row) =>
      row.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination bounds Calculations
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownload = (specialization: string) => {
    alert(`Downloading Brochure for: ${specialization}`);
  };

  return (
    /* ============================================================
        TOP SPECIALIZATIONS MATRIX TABLE COMPONENT
       ============================================================ */
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Centered Descriptive Copy Context Header */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Top <span className="text-red-500">Specializations</span>
        </h2>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed sm:text-base">
          Designed for <strong>flexibility</strong>, online degree programs
          support both academic and professional growth. Students can easily
          select courses aligned with their career goals and study from
          anywhere. The learning platform ensures a supportive and engaging
          experience focused on real-world success.
        </p>
      </div>

      {/* Floating Action Filter Row Bar */}
      <div className="mb-6 flex justify-end">
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
              setCurrentPage(1); // reset index bounds window safely
            }}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-slate-400 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Structured Responsive Matrix Grid Wrapper Canvas */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full border-collapse text-left text-sm">
          {/* Custom Header Element Styling mimicking requested layout context */}
          <thead>
            <tr className="bg-red-500 text-white font-bold">
              <th className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" /> Course
                </div>
              </th>
              <th className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" /> Specializations
                </div>
              </th>
              <th className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> Duration
                </div>
              </th>
              <th className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4" /> Fees
                </div>
              </th>
              <th className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" /> EMI Option
                </div>
              </th>
              <th className="p-4 text-center whitespace-nowrap">Brochure</th>
            </tr>
          </thead>

          {/* Matrix Body Data Mapping rows with alternate stripings */}
          <tbody className="divide-y divide-slate-200 text-gray-700">
            {currentRows.length > 0 ? (
              currentRows.map((row, idx) => {
                // Determine whether to display the course name or a clean visual row-span spacer line structure
                const isFirstCourseOccurrence =
                  idx === 0 || currentRows[idx - 1].course !== row.course;

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Course Grouping Field Indicator cell column */}
                    <td className="p-4 font-bold text-gray-900 border-r border-slate-100 bg-slate-50/20 max-w-[120px]">
                      {isFirstCourseOccurrence ? row.course : ""}
                    </td>

                    {/* Specialization Detail Field Column */}
                    <td className="p-4 text-gray-600 font-medium border-r border-slate-100 max-w-xs">
                      {row.specialization}
                    </td>

                    {/* Duration metrics parameters */}
                    <td className="p-4 text-slate-500 whitespace-nowrap border-r border-slate-100">
                      {row.duration}
                    </td>

                    {/* Gross Raw Institutional Fees block */}
                    <td className="p-4 text-gray-900 font-medium whitespace-nowrap border-r border-slate-100">
                      {row.fees}
                    </td>

                    {/* Active Monthly EMI conversion calculation tags string lines */}
                    <td className="p-4 text-gray-900 font-bold whitespace-nowrap border-r border-slate-100">
                      {row.emi}
                    </td>

                    {/* Interactive Operational Actions cell matrix block */}
                    <td className="p-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDownload(row.specialization)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-red-500 hover:text-red-500"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Brochure
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              /* Isolated Empty Search Row state fallback structure representation */
              <tr>
                <td
                  colSpan={6}
                  className="p-12 text-center text-slate-400 font-medium"
                >
                  No courses or specializations found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Styled Pagination Navigation Controller Footbar layout interface */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold shadow-sm transition ${
                currentPage === page
                  ? "bg-red-500 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
