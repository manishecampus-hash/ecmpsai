"use client";

import React from "react";
import {
  Search,
  LayoutGrid,
  ArrowUpDown,
  ChevronDown,
  ArrowLeftRight,
  GraduationCap,
  Sprout,
  BookOpen,
  Briefcase,
  BarChart3,
  Laptop,
  Microscope,
  FileText,
  PieChart,
  Bot,
  FlaskConical,
  Settings,
  Building2,
  Star,
} from "lucide-react";

const SAMPLE_COURSES = [
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

// Per-course icon + colored badge, matched to the reference design
const courseVisuals = {
  ba: { Icon: BookOpen, bg: "bg-violet-50", icon: "text-re" },
  bcom: { Icon: Briefcase, bg: "bg-emerald-50", icon: "text-red" },
  bba: { Icon: BarChart3, bg: "bg-blue-50", icon: "text-blue-600" },
  bca: { Icon: Laptop, bg: "bg-orange-50", icon: "text-orange-600" },
  bsc: { Icon: Microscope, bg: "bg-blue-50", icon: "text-blue-600" },
  ma: { Icon: GraduationCap, bg: "bg-violet-50", icon: "text-violet-600" },
  mcom: { Icon: FileText, bg: "bg-emerald-50", icon: "text-emerald-600" },
  mba: { Icon: PieChart, bg: "bg-violet-50", icon: "text-violet-600" },
  mca: { Icon: Bot, bg: "bg-orange-50", icon: "text-orange-600" },
  msc: { Icon: FlaskConical, bg: "bg-emerald-50", icon: "text-emerald-600" },
  btech: { Icon: Settings, bg: "bg-red-50", icon: "text-red-600" },
  be: { Icon: Building2, bg: "bg-blue-50", icon: "text-blue-600" },
};

const categoryBadge = {
  Humanities: "bg-violet-100 text-violet-700",
  Commerce: "bg-emerald-100 text-emerald-700",
  Management: "bg-blue-100 text-blue-700",
  "Computer Applications": "bg-orange-100 text-orange-700",
  Science: "bg-emerald-100 text-emerald-700",
  Engineering: "bg-red-100 text-red-700",
};

export default function Step2Screen({
  courses = SAMPLE_COURSES,
  selectedTypeData,
  onCourseSelect = () => {},
  onBack = () => {},
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("popular");
  const [filterStream, setFilterStream] = React.useState("all");

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-white">
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
        <div className="hidden lg:flex relative w-28 h-28 flex-shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-violet-50" />
          <GraduationCap
            className="w-12 h-12 text-gray-800 relative z-10"
            strokeWidth={1.6}
          />
          <Sprout
            className="w-6 h-6 text-emerald-500 absolute bottom-3 left-3 z-10"
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filterStream}
              onChange={(e) => setFilterStream(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <option value="all">All Streams</option>
              <option value="humanities">Humanities</option>
              <option value="commerce">Commerce</option>
              <option value="science">Science</option>
              <option value="management">Management</option>
            </select>
            <LayoutGrid
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
            <ChevronDown
              className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="rating">Sort by: Rating</option>
              <option value="fees-low">Sort by: Fees Low</option>
              <option value="fees-high">Sort by: Fees High</option>
              <option value="duration">Sort by: Duration</option>
            </select>
            <ArrowUpDown
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
            <ChevronDown
              className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {filteredCourses.map((course) => {
          const visual = courseVisuals[course.id] ?? {
            Icon: BookOpen,
            bg: "bg-gray-50",
            icon: "text-gray-600",
          };
          const Icon = visual.Icon;
          const badgeClass =
            categoryBadge[course.category] ?? "bg-gray-100 text-gray-700";
          return (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="w-full p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-md hover:border-red-400 transition-all text-left min-w-0 duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${visual.bg} ${visual.icon} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                    {course.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-1 mb-3">
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 font-medium">Fees</div>
                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                    ₹{(course.feeMin / 100000).toFixed(1)} –{" "}
                    {(course.feeMax / 100000).toFixed(1)} Lakh
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <Star
                      className="w-3.5 h-3.5 text-amber-400"
                      strokeWidth={0}
                      fill="currentColor"
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      {course.rating}/5
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    Rating
                  </div>
                </div>
              </div>

              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full inline-block ${badgeClass}`}
              >
                {course.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-2xl px-5 py-3 w-full sm:w-auto">
          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div>
            <strong className="block">
              {filteredCourses.length} programs available
            </strong>
            <span className="text-gray-400 text-xs">Across 6 streams</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-2xl px-5 py-3 w-full sm:w-auto">
          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <ArrowLeftRight className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div>
            <strong className="block">Compare up to 3 programs</strong>
            <span className="text-gray-400 text-xs">
              Select programs to compare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
