"use client";

import React from "react";

interface Course {
  id: string;
  title: string;
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
    duration: "2 - 5 Years",
    feeMin: 120000,
    feeMax: 280000,
    rating: 4.2,
    category: "Humanities",
  },
  {
    id: "bcom",
    title: "B.Com",
    duration: "3 - 6 Years",
    feeMin: 150000,
    feeMax: 350000,
    rating: 4.3,
    category: "Commerce",
  },
  {
    id: "bba",
    title: "BBA",
    duration: "3 - 6 Years",
    feeMin: 200000,
    feeMax: 450000,
    rating: 4.4,
    category: "Management",
  },
  {
    id: "bca",
    title: "BCA",
    duration: "3 - 8 Years",
    feeMin: 200000,
    feeMax: 400000,
    rating: 4.3,
    category: "Computer Applications",
  },
  {
    id: "bsc",
    title: "B.Sc",
    duration: "3 - 6 Years",
    feeMin: 150000,
    feeMax: 300000,
    rating: 4.2,
    category: "Science",
  },
  {
    id: "ma",
    title: "MA",
    duration: "2 - 4 Years",
    feeMin: 100000,
    feeMax: 250000,
    rating: 4.1,
    category: "Humanities",
  },
  {
    id: "mcom",
    title: "M.Com",
    duration: "2 - 4 Years",
    feeMin: 150000,
    feeMax: 300000,
    rating: 4.2,
    category: "Commerce",
  },
  {
    id: "mba",
    title: "MBA",
    duration: "2 Years",
    feeMin: 400000,
    feeMax: 1200000,
    rating: 4.6,
    category: "Management",
  },
  {
    id: "mca",
    title: "MCA",
    duration: "2 - 3 Years",
    feeMin: 250000,
    feeMax: 600000,
    rating: 4.4,
    category: "Computer Applications",
  },
  {
    id: "msc",
    title: "M.Sc",
    duration: "2 - 4 Years",
    feeMin: 150000,
    feeMax: 350000,
    rating: 4.3,
    category: "Science",
  },
  {
    id: "btech",
    title: "B.Tech (Online)",
    duration: "4 Years",
    feeMin: 180000,
    feeMax: 350000,
    rating: 4.4,
    category: "Engineering",
  },
  {
    id: "be",
    title: "B.E. (Online)",
    duration: "4 Years",
    feeMin: 180000,
    feeMax: 350000,
    rating: 4.3,
    category: "Engineering",
  },
];

const courseIcons: Record<string, React.ReactNode> = {
  ba: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6M8 15h4" />
    </svg>
  ),
  bcom: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <circle cx="12" cy="14" r="2" />
      <path d="M9 14h.01M15 14h.01" />
    </svg>
  ),
  bba: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4" />
      <line x1="9" y1="16" x2="9" y2="20" />
      <line x1="15" y1="16" x2="15" y2="20" />
    </svg>
  ),
  bca: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 9h10M7 13h4" />
    </svg>
  ),
  bsc: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <circle cx="7" cy="11" r="3" />
      <circle cx="17" cy="11" r="3" />
      <path d="M17 11v5a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-5" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  ma: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v6M9 14h6" />
    </svg>
  ),
  mcom: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
      <path d="M7 17v3M12 17v3" />
    </svg>
  ),
  mba: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill="white"
      >
        MBA
      </text>
    </svg>
  ),
  mca: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  msc: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
  ),
  btech: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path d="M9 3L3 7v10c0 5.55 4.03 10.74 9.5 12 5.47-1.26 9.5-6.45 9.5-12V7l-6-4" />
      <path d="M12 11l3-2M12 11l-3-2M12 11v4" />
    </svg>
  ),
  be: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path d="M2 20h20M4 20V10l8-7 8 7v10" />
      <path d="M10 20v-6h4v6M10 10h4v4h-4z" />
    </svg>
  ),
};

const categoryColors: Record<
  string,
  { bg: string; icon: string; badge: string }
> = {
  Humanities: {
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  Commerce: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
  },
  Science: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
  },
  Management: {
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
  "Computer Applications": {
    bg: "bg-pink-50",
    icon: "text-pink-600",
    badge: "bg-pink-100 text-pink-700",
  },
  Engineering: {
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3 h-3 text-amber-400"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const GraduationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-6 h-6 text-gray-400 flex-shrink-0"
  >
    <path d="M22 10l-10-5L2 10l10 5 10-5z" />
    <path d="M6 12v5c0 2.21 2.69 4 6 4s6-1.79 6-4v-5" />
  </svg>
);

const CompareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-6 h-6 text-gray-400 flex-shrink-0"
  >
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

export default function Step2Screen({
  courses = SAMPLE_COURSES,
  selectedTypeData,
  onCourseSelect,
  onBack,
}: {
  courses?: Course[];
  selectedTypeData?: { label: string };
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
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium text-sm">Back</span>
        </button>
      </div>

      {/* Title Section */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 break-words">
            Choose a course in {selectedTypeData?.label || "All Programs"}
          </h2>
          <p className="text-sm text-gray-500">
            Explore {courses.length} programs and find the right fit for your
            goals.
          </p>
        </div>
        <div className="hidden lg:flex">
          <GraduationIcon />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 text-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
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
          </span>
        </div>

        <div className="flex gap-2 w-full">
          <select
            value={filterStream}
            onChange={(e) => setFilterStream(e.target.value)}
            className="flex-1 min-w-0 px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm font-medium text-gray-700 cursor-pointer"
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
            className="flex-1 min-w-0 px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="popular">Popular</option>
            <option value="rating">Rating</option>
            <option value="fees-low">Fees: Low</option>
            <option value="fees-high">Fees: High</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {filteredCourses.map((course) => {
          const colors = categoryColors[course.category] ?? {
            bg: "bg-red-50",
            icon: "text-red-600",
            badge: "bg-red-100 text-red-700",
          };
          return (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="w-full p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-red-300 hover:scale-105 transition-all text-left min-w-0 duration-200"
            >
              {/* Icon + Title + Duration */}
              <div className="flex items-start gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.icon} flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  {courseIcons[course.id] ?? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                    {course.duration}
                  </p>
                </div>
              </div>

              {/* Fee and Rating Row */}
              <div className="flex items-start justify-between gap-1 mb-3 pb-3 border-b border-gray-100">
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 font-medium">Fees</div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                    ₹{(course.feeMin / 100000).toFixed(1)}–
                    {(course.feeMax / 100000).toFixed(1)}L
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    <StarIcon />
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {course.rating}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    Rating
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block truncate max-w-full ${colors.badge}`}
              >
                {course.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <GraduationIcon />
          <div>
            <strong className="block">
              {filteredCourses.length} programs available
            </strong>
            <span className="text-gray-500 text-xs">Across 6 streams</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <CompareIcon />
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
