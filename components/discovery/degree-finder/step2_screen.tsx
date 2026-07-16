// "use client";

// import React from "react";
// import {
//   Search,
//   ChevronDown,
//   ArrowLeft,
//   ArrowLeftRight,
//   GraduationCap,
//   BookOpen,
//   Briefcase,
//   BarChart3,
//   Laptop,
//   Microscope,
//   FileText,
//   PieChart,
//   Bot,
//   FlaskConical,
//   Settings,
//   Building2,
//   Star,
// } from "lucide-react";

// const SAMPLE_COURSES = [
//   {
//     id: "ba",
//     title: "BA",
//     duration: "2 - 5 Years",
//     feeMin: 120000,
//     feeMax: 280000,
//     rating: 4.2,
//     category: "Humanities",
//   },
//   {
//     id: "bcom",
//     title: "B.Com",
//     duration: "3 - 6 Years",
//     feeMin: 150000,
//     feeMax: 350000,
//     rating: 4.3,
//     category: "Commerce",
//   },
//   {
//     id: "bba",
//     title: "BBA",
//     duration: "3 - 6 Years",
//     feeMin: 200000,
//     feeMax: 450000,
//     rating: 4.4,
//     category: "Management",
//   },
//   {
//     id: "bca",
//     title: "BCA",
//     duration: "3 - 8 Years",
//     feeMin: 200000,
//     feeMax: 400000,
//     rating: 4.3,
//     category: "Computer Applications",
//   },
//   {
//     id: "bsc",
//     title: "B.Sc",
//     duration: "3 - 6 Years",
//     feeMin: 150000,
//     feeMax: 300000,
//     rating: 4.2,
//     category: "Science",
//   },
//   {
//     id: "ma",
//     title: "MA",
//     duration: "2 - 4 Years",
//     feeMin: 100000,
//     feeMax: 250000,
//     rating: 4.1,
//     category: "Humanities",
//   },
//   {
//     id: "mcom",
//     title: "M.Com",
//     duration: "2 - 4 Years",
//     feeMin: 150000,
//     feeMax: 300000,
//     rating: 4.2,
//     category: "Commerce",
//   },
//   {
//     id: "mba",
//     title: "MBA",
//     duration: "2 Years",
//     feeMin: 400000,
//     feeMax: 1200000,
//     rating: 4.6,
//     category: "Management",
//   },
//   {
//     id: "mca",
//     title: "MCA",
//     duration: "2 - 3 Years",
//     feeMin: 250000,
//     feeMax: 600000,
//     rating: 4.4,
//     category: "Computer Applications",
//   },
//   {
//     id: "msc",
//     title: "M.Sc",
//     duration: "2 - 4 Years",
//     feeMin: 150000,
//     feeMax: 350000,
//     rating: 4.3,
//     category: "Science",
//   },
//   {
//     id: "btech",
//     title: "B.Tech (Online)",
//     duration: "4 Years",
//     feeMin: 180000,
//     feeMax: 350000,
//     rating: 4.4,
//     category: "Engineering",
//   },
//   {
//     id: "be",
//     title: "B.E. (Online)",
//     duration: "4 Years",
//     feeMin: 180000,
//     feeMax: 350000,
//     rating: 4.3,
//     category: "Engineering",
//   },
// ];

// // Icon per program — kept semantic to the degree itself
// const COURSE_ICONS = {
//   ba: BookOpen,
//   bcom: Briefcase,
//   bba: BarChart3,
//   bca: Laptop,
//   bsc: Microscope,
//   ma: GraduationCap,
//   mcom: FileText,
//   mba: PieChart,
//   mca: Bot,
//   msc: FlaskConical,
//   btech: Settings,
//   be: Building2,
// };

// // Colour reads off the stream/category, not the individual course — one consistent system
// const CATEGORY_STYLES = {
//   Humanities: {
//     icon: "text-violet-700",
//     badge: "border-violet-300 text-violet-700 bg-violet-50",
//   },
//   Commerce: {
//     icon: "text-emerald-700",
//     badge: "border-emerald-300 text-emerald-700 bg-emerald-50",
//   },
//   Management: {
//     icon: "text-blue-700",
//     badge: "border-blue-300 text-blue-700 bg-blue-50",
//   },
//   "Computer Applications": {
//     icon: "text-orange-700",
//     badge: "border-orange-300 text-orange-700 bg-orange-50",
//   },
//   Science: {
//     icon: "text-teal-700",
//     badge: "border-teal-300 text-teal-700 bg-teal-50",
//   },
//   Engineering: {
//     icon: "text-red-700",
//     badge: "border-red-300 text-red-700 bg-red-50",
//   },
// };
// const DEFAULT_STYLE = {
//   icon: "text-slate-700",
//   badge: "border-slate-300 text-slate-700 bg-slate-50",
// };

// function formatLakh(n) {
//   return (n / 100000).toFixed(1);
// }

// export default function Step2Screen({
//   courses = SAMPLE_COURSES,
//   selectedTypeData,
//   onCourseSelect = () => {},
//   onBack = () => {},
// }) {
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [sortBy, setSortBy] = React.useState("popular");
//   const [filterStream, setFilterStream] = React.useState("all");
//   const [showAll, setShowAll] = React.useState(false);
//   const INITIAL_COUNT = 3;

//   React.useEffect(() => {
//     setShowAll(false);
//   }, [filterStream, searchTerm, sortBy]);

//   const streams = React.useMemo(
//     () => Array.from(new Set(courses.map((c) => c.category))),
//     [courses],
//   );

//   const visibleCourses = React.useMemo(() => {
//     let list = courses.filter((c) =>
//       c.title.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//     if (filterStream !== "all") {
//       list = list.filter((c) => c.category === filterStream);
//     }
//     list = [...list];
//     switch (sortBy) {
//       case "rating":
//         list.sort((a, b) => b.rating - a.rating);
//         break;
//       case "fees-low":
//         list.sort((a, b) => a.feeMin - b.feeMin);
//         break;
//       case "fees-high":
//         list.sort((a, b) => b.feeMax - a.feeMax);
//         break;
//       case "duration":
//         list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
//         break;
//       default:
//         break;
//     }
//     return list;
//   }, [courses, searchTerm, filterStream, sortBy]);

//   const isAllStreams = filterStream === "all";
//   const canCollapse = isAllStreams && visibleCourses.length > INITIAL_COUNT;
//   const displayedCourses =
//     canCollapse && !showAll
//       ? visibleCourses.slice(0, INITIAL_COUNT)
//       : visibleCourses;

//   return (
//     <div className="w-full min-w-0 overflow-x-hidden font-[Inter]">
//       <div className="max-w-6xl mx-auto px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-10 lg:px-4 lg:pt-4 lg:pb-14">
//         {/* Header */}
//         <div className="mb-4 sm:mb-6 pb-3 sm:pb-4">
//           <h2 className="leading-snug break-words font-bold tracking-tight text-gray-900 text-xl sm:text-3xl md:text-4xl">
//             Choose a course in{" "}
//             <span className="text-red-500">
//               {selectedTypeData?.label || "All Programs"}
//             </span>
//           </h2>
//         </div>

//         {/* Filters */}
//         <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
//           <div className="relative w-full sm:flex-1 sm:max-w-xs">
//             <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
//               Search
//             </label>
//             <div className="relative">
//               <Search
//                 className="w-4 h-4 text-slate-400 absolute left-0 top-1/2 -translate-y-1/2"
//                 strokeWidth={2}
//               />
//               <input
//                 type="text"
//                 placeholder="Program name…"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-6 pr-2 py-2 bg-transparent border-b-2 border-slate-300 focus:outline-none focus:border-amber-600 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col xs:flex-row sm:items-end gap-4 sm:gap-6 w-full sm:w-auto">
//             <div className="relative w-full sm:w-48">
//               <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
//                 Stream
//               </label>
//               <select
//                 value={filterStream}
//                 onChange={(e) => setFilterStream(e.target.value)}
//                 className="appearance-none w-full pr-6 py-2 bg-transparent border-b-2 border-slate-300 focus:outline-none focus:border-amber-600 text-sm font-medium text-slate-800 cursor-pointer truncate"
//               >
//                 <option value="all">All streams</option>
//                 {streams.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 className="w-3.5 h-3.5 text-slate-400 absolute right-0 bottom-2.5 pointer-events-none"
//                 strokeWidth={2}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Course cards — styled as admission-ticket stubs */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
//           {displayedCourses.map((course, i) => {
//             const Icon = COURSE_ICONS[course.id] ?? BookOpen;
//             const style = CATEGORY_STYLES[course.category] ?? DEFAULT_STYLE;
//             return (
//               <button
//                 key={course.id}
//                 onClick={() => onCourseSelect(course.id)}
//                 className="group relative w-full text-left bg-white border border-slate-200 rounded-md overflow-hidden hover:border-amber-500 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
//               >
//                 <div className="p-4 sm:p-5 pb-4">
//                   <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
//                     <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
//                       No. {String(i + 1).padStart(2, "0")}
//                     </span>
//                     <span
//                       className={`text-xs font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm whitespace-nowrap ${style.badge}`}
//                     >
//                       {course.category}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 mb-1">
//                     <Icon
//                       className={`w-5 h-5 flex-shrink-0 ${style.icon}`}
//                       strokeWidth={1.6}
//                     />
//                     <h3 className="font-serif text-base sm:text-lg text-slate-900 truncate">
//                       {course.title}
//                     </h3>
//                   </div>
//                   <p className="text-xs text-slate-400 font-mono">
//                     {course.duration}
//                   </p>
//                 </div>

//                 {/* Perforation */}
//                 <div className="relative">
//                   <div className="border-t border-dashed border-slate-300" />
//                   <span className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-stone-50 border border-slate-200" />
//                   <span className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-stone-50 border border-slate-200" />
//                 </div>

//                 <div className="p-4 sm:p-5 pt-4 flex flex-wrap items-end justify-between gap-3">
//                   <div className="min-w-0">
//                     <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
//                       Tuition
//                     </p>
//                     <p className="font-mono text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
//                       ₹{formatLakh(course.feeMin)}L – ₹
//                       {formatLakh(course.feeMax)}L
//                     </p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
//                       Rating
//                     </p>
//                     <p className="font-mono text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1 justify-end">
//                       <Star
//                         className="w-3.5 h-3.5 text-amber-500"
//                         strokeWidth={0}
//                         fill="currentColor"
//                       />
//                       {course.rating}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="px-4 sm:px-5 pb-4">
//                   <span className="text-xs font-mono uppercase tracking-widest text-slate-300 group-hover:text-amber-700 transition-colors">
//                     Select program →
//                   </span>
//                 </div>
//               </button>
//             );
//           })}

//           {visibleCourses.length === 0 && (
//             <div className="col-span-full text-center py-16 border border-dashed border-slate-300 rounded-md px-4">
//               <p className="text-sm text-slate-500">
//                 No programs match “{searchTerm}”. Try a different search or
//                 stream.
//               </p>
//             </div>
//           )}
//         </div>

//         {canCollapse && (
//           <div className="flex justify-center mb-10 sm:mb-12 -mt-2 sm:-mt-4">
//             <button
//               onClick={() => setShowAll((v) => !v)}
//               className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-dashed border-slate-300 rounded-full text-xs font-mono uppercase tracking-widest text-slate-600 hover:border-amber-500 hover:text-amber-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
//             >
//               {showAll
//                 ? "Show fewer programs"
//                 : `View all ${visibleCourses.length} programs`}
//               <ChevronDown
//                 className={`w-3.5 h-3.5 transition-transform ${
//                   showAll ? "rotate-180" : ""
//                 }`}
//                 strokeWidth={2}
//               />
//             </button>
//           </div>
//         )}

//         {/* Footer ledger */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-dashed border-slate-300 text-xs font-mono uppercase tracking-widest text-slate-500 text-center sm:text-left">
//           <span>{visibleCourses.length} programs on record</span>
//           <span className="flex items-center gap-1.5">
//             <ArrowLeftRight className="w-3.5 h-3.5" strokeWidth={2} />
//             Compare up to 3 programs
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  ChevronDown,
  ArrowLeftRight,
  GraduationCap,
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
  LucideIcon,
} from "lucide-react";

type Course = {
  id: string;
  title: string;
  duration: string;
  feeMin: number;
  feeMax: number;
  rating: number;
  category: string;
};

type SelectedTypeData = {
  label?: string;
};

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

// Icon per program — kept semantic to the degree itself
const COURSE_ICONS: Record<string, LucideIcon> = {
  ba: BookOpen,
  bcom: Briefcase,
  bba: BarChart3,
  bca: Laptop,
  bsc: Microscope,
  ma: GraduationCap,
  mcom: FileText,
  mba: PieChart,
  mca: Bot,
  msc: FlaskConical,
  btech: Settings,
  be: Building2,
};

function formatLakh(n: number) {
  return (n / 100000).toFixed(1);
}

type Step2ScreenProps = {
  courses?: Course[];
  selectedTypeData?: SelectedTypeData;
  onCourseSelect?: (id: string) => void;
  onBack?: () => void;
};

export default function Step2Screen({
  courses = SAMPLE_COURSES,
  selectedTypeData,
  onCourseSelect = () => {},
  onBack = () => {},
}: Step2ScreenProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("popular");
  const [filterStream, setFilterStream] = React.useState("all");
  const [showAll, setShowAll] = React.useState(false);
  const INITIAL_COUNT = 3;

  React.useEffect(() => {
    setShowAll(false);
  }, [filterStream, searchTerm, sortBy]);

  const visibleCourses = React.useMemo(() => {
    let list = courses.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (filterStream !== "all") {
      list = list.filter((c) => c.category === filterStream);
    }
    list = [...list];
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "fees-low":
        list.sort((a, b) => a.feeMin - b.feeMin);
        break;
      case "fees-high":
        list.sort((a, b) => b.feeMax - a.feeMax);
        break;
      case "duration":
        list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        break;
    }
    return list;
  }, [courses, searchTerm, filterStream, sortBy]);

  const isAllStreams = filterStream === "all";
  const canCollapse = isAllStreams && visibleCourses.length > INITIAL_COUNT;
  const displayedCourses =
    canCollapse && !showAll
      ? visibleCourses.slice(0, INITIAL_COUNT)
      : visibleCourses;

  return (
    <div className="w-full min-w-0 overflow-x-hidden font-[Inter]">
      <div className="max-w-6xl mx-auto px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-10 lg:px-4 lg:pt-4 lg:pb-14">
        {/* Header */}
        <div className="mb-6 sm:mb-8 pb-3 sm:pb-4">
          <h2 className="leading-snug break-words font-bold tracking-tight text-gray-900 text-xl sm:text-3xl md:text-4xl">
            Choose a course in{" "}
            <span className="text-red-500">
              {selectedTypeData?.label || "All Programs"}
            </span>
          </h2>
        </div>

        {/* Course cards — image-style icon cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-10 sm:mb-12">
          {displayedCourses.map((course, i) => {
            const Icon = COURSE_ICONS[course.id] ?? BookOpen;
            return (
              <button
                key={course.id}
                onClick={() => onCourseSelect(course.id)}
                className="group relative w-full text-center bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 transition-all duration-200 hover:border-red-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                {/* Rating badge, top-right corner — hidden on mobile */}
                <span className="hidden sm:flex absolute top-4 right-4 items-center gap-1 text-xs font-semibold text-gray-500">
                  <Star
                    className="w-3.5 h-3.5 text-amber-500"
                    strokeWidth={0}
                    fill="currentColor"
                  />
                  {course.rating}
                </span>

                {/* Icon box — centered, smaller on mobile */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-red-50 flex items-center justify-center mb-2 sm:mb-4 mx-auto">
                  <Icon
                    className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-red-500"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title + red underline — centered */}
                <h3 className="font-bold text-gray-900 text-sm sm:text-lg mb-1 sm:mb-1.5">
                  {course.title}
                </h3>
                <span className="block w-6 sm:w-8 h-[2.5px] sm:h-[3px] bg-red-500 rounded-full mb-0 sm:mb-3 mx-auto" />

                {/* Description-style meta info — hidden on mobile, visible sm+ */}
                <p className="hidden sm:block text-sm text-gray-500 leading-snug mb-1 mt-3">
                  {course.category} programs · {course.duration}
                </p>
                <p className="hidden sm:block text-sm text-gray-500 leading-snug">
                  ₹{formatLakh(course.feeMin)}L – ₹{formatLakh(course.feeMax)}L
                  tuition
                </p>
              </button>
            );
          })}

          {visibleCourses.length === 0 && (
            <div className="col-span-full text-center py-16 border border-dashed border-slate-300 rounded-2xl px-4">
              <p className="text-sm text-slate-500">
                No programs match "{searchTerm}". Try a different search or
                stream.
              </p>
            </div>
          )}
        </div>

        {canCollapse && (
          <div className="flex justify-center mb-10 sm:mb-12 -mt-2 sm:-mt-4">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-dashed border-slate-300 rounded-full text-xs font-mono uppercase tracking-widest text-slate-600 hover:border-amber-500 hover:text-amber-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {showAll
                ? "Show fewer programs"
                : `View all ${visibleCourses.length} programs`}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
          </div>
        )}

        {/* Footer ledger */}
      </div>
    </div>
  );
}
