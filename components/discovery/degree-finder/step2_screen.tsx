"use client";

import React from "react";

interface Course {
  id: string;
  title: string;
  emoji: string;
  duration: string;
  feeMin: number;
  feeMax: number;
  rating: number;
  category: string;
}

const SAMPLE_COURSES: Course[] = [
  {
    id: "ba",
    title: "BA",
    emoji: "📚",
    duration: "2 - 5 Years",
    feeMin: 120000,
    feeMax: 280000,
    rating: 4.2,
    category: "Humanities",
  },
  {
    id: "bcom",
    title: "B.Com",
    emoji: "💼",
    duration: "3 - 6 Years",
    feeMin: 150000,
    feeMax: 350000,
    rating: 4.3,
    category: "Commerce",
  },
  {
    id: "bba",
    title: "BBA",
    emoji: "📊",
    duration: "3 - 6 Years",
    feeMin: 200000,
    feeMax: 450000,
    rating: 4.4,
    category: "Management",
  },
  {
    id: "bca",
    title: "BCA",
    emoji: "💻",
    duration: "3 - 8 Years",
    feeMin: 200000,
    feeMax: 400000,
    rating: 4.3,
    category: "Computer Applications",
  },
  {
    id: "bsc",
    title: "B.Sc",
    emoji: "🔬",
    duration: "3 - 6 Years",
    feeMin: 150000,
    feeMax: 300000,
    rating: 4.2,
    category: "Science",
  },
  {
    id: "ma",
    title: "MA",
    emoji: "🎓",
    duration: "2 - 4 Years",
    feeMin: 100000,
    feeMax: 250000,
    rating: 4.1,
    category: "Humanities",
  },
  {
    id: "mcom",
    title: "M.Com",
    emoji: "📈",
    duration: "2 - 4 Years",
    feeMin: 150000,
    feeMax: 300000,
    rating: 4.2,
    category: "Commerce",
  },
  {
    id: "mba",
    title: "MBA",
    emoji: "💰",
    duration: "2 Years",
    feeMin: 400000,
    feeMax: 1200000,
    rating: 4.6,
    category: "Management",
  },
  {
    id: "mca",
    title: "MCA",
    emoji: "🎯",
    duration: "2 - 3 Years",
    feeMin: 250000,
    feeMax: 600000,
    rating: 4.4,
    category: "Computer Applications",
  },
  {
    id: "msc",
    title: "M.Sc",
    emoji: "🧪",
    duration: "2 - 4 Years",
    feeMin: 150000,
    feeMax: 350000,
    rating: 4.3,
    category: "Science",
  },
  {
    id: "btech",
    title: "B.Tech (Online)",
    emoji: "⚙️",
    duration: "4 Years",
    feeMin: 180000,
    feeMax: 350000,
    rating: 4.4,
    category: "Engineering",
  },
  {
    id: "be",
    title: "B.E. (Online)",
    emoji: "🏗️",
    duration: "4 Years",
    feeMin: 180000,
    feeMax: 350000,
    rating: 4.3,
    category: "Engineering",
  },
];

export default function Step2Screen({
  courses = SAMPLE_COURSES,
  selectedTypeData,
  onCourseSelect,
  onBack,
}: {
  courses?: Course[];
  selectedTypeData?: { label: string; emoji: string };
  onCourseSelect: (id: string) => void;
  onBack: () => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("popular");
  const [filterStream, setFilterStream] = React.useState("all");

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-lg">←</span>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Title Section */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Choose a course in {selectedTypeData?.label || "All Programs"}
          </h2>
          <p className="text-base text-gray-600">
            Explore {courses.length} programs and find the right fit for your
            goals.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-center gap-2 text-6xl opacity-70 flex-shrink-0">
          <div>🎓</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 text-sm"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <select
            value={filterStream}
            onChange={(e) => setFilterStream(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
          >
            <option value="all">All Streams</option>
            <option value="humanities">Humanities</option>
            <option value="commerce">Commerce</option>
            <option value="science">Science</option>
            <option value="management">Management</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
          >
            <option value="popular">Sort by: Popular</option>
            <option value="rating">Sort by: Rating</option>
            <option value="fees-low">Sort by: Fees (Low)</option>
            <option value="fees-high">Sort by: Fees (High)</option>
            <option value="duration">Sort by: Duration</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {filteredCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course.id)}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-left"
          >
            {/* Icon + Title + Duration */}
            <div className="flex items-flex-start gap-3 mb-3">
              <div className="text-3xl flex-shrink-0">{course.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {course.duration}
                </p>
              </div>
            </div>

            {/* Fee and Rating Row */}
            <div className="flex items-flex-start justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
              <div>
                <div className="text-xs text-gray-500 font-medium">Fees</div>
                <div className="text-sm font-semibold text-gray-900 leading-tight">
                  ₹{(course.feeMin / 100000).toFixed(1)} – ₹
                  {(course.feeMax / 100000).toFixed(1)} Lakh
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <span>⭐</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {course.rating}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-medium">Rating</div>
              </div>
            </div>

            {/* Category Badge */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                course.category === "Humanities"
                  ? "bg-purple-100 text-purple-700"
                  : course.category === "Commerce"
                    ? "bg-green-100 text-green-700"
                    : course.category === "Science"
                      ? "bg-cyan-100 text-cyan-700"
                      : course.category === "Management"
                        ? "bg-blue-100 text-blue-700"
                        : course.category === "Computer Applications"
                          ? "bg-orange-100 text-orange-700"
                          : course.category === "Engineering"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
              }`}
            >
              {course.category}
            </span>
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <span className="text-2xl">🎓</span>
          <div>
            <strong className="block">
              {filteredCourses.length} programs available
            </strong>
            <span className="text-gray-500 text-xs">Across 6 streams</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <span className="text-2xl">↔️</span>
          <div>
            <strong className="block">Compare up to 3 programs</strong>
            <span className="text-gray-500 text-xs">
              Select programs to compare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
