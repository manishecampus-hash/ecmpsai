// import Image from "next/image";
// import Link from "next/link";
// import {
//   BarChart3,
//   BookOpen,
//   Bot,
//   Building2,
//   CheckCircle2,
//   ChevronRight,
//   GraduationCap,
//   Laptop,
//   Search,
//   ShieldCheck,
//   Smartphone,
//   Tag,
//   Users,
//   Video,
//   FileText,
//   Globe,
//   HeadphonesIcon,
//   Award,
//   Wifi,
//   ClipboardList,
//   MessageSquare,
//   Star,
// } from "lucide-react";

// const stats = [
//   { label: "100+ Universities", icon: Building2 },
//   { label: "Verified LMS Credentials", icon: CheckCircle2 },
//   { label: "1,000+ Courses", icon: GraduationCap },
// ];

// const universityPairs = [
//   {
//     universities: [
//       {
//         name: "Sanskriti University Engineering",
//         logo: "/universities/sanskriti.png",
//         rating: "4.6",
//         features: [
//           { label: "Live Recorded Lectures", icon: Video },
//           { label: "Progress Tracking Dashboard", icon: BarChart3 },
//           { label: "Online Proctored Exams", icon: ShieldCheck },
//           { label: "Mobile LMS Access", icon: Smartphone },
//         ],
//       },
//       {
//         name: "Amity University Online",
//         logo: "/universities/amity.webp",
//         rating: "4.7",
//         features: [
//           { label: "AI Academic Support", icon: Bot },
//           { label: "Virtual Campus Community", icon: Users },
//           { label: "Live Recorded Sessions", icon: Video },
//           { label: "Secure Online Exams", icon: ShieldCheck },
//         ],
//       },
//     ],
//     deals: [
//       "Flat ₹5,000 off on first semester fees",
//       "Free study material worth ₹2,000",
//     ],
//   },
//   {
//     universities: [
//       {
//         name: "Manipal University Online",
//         logo: "/universities/onlinemanipal.webp",
//         rating: "4.7",
//         features: [
//           { label: "Progress Tracking Dashboard", icon: BarChart3 },
//           { label: "Live Recorded Sessions", icon: Video },
//           { label: "Discussion Forums", icon: BookOpen },
//           { label: "Dedicated Learner App", icon: Smartphone },
//         ],
//       },
//       {
//         name: "Lovely Professional University",
//         logo: "/universities/lpu.png",
//         rating: "4.5",
//         features: [
//           { label: "24/7 Student Support", icon: HeadphonesIcon },
//           { label: "Industry Certifications", icon: Award },
//           { label: "Live Interactive Classes", icon: Video },
//           { label: "Online Examination Portal", icon: ClipboardList },
//         ],
//       },
//     ],
//     deals: [
//       "₹10,000 cashback on full fee payment",
//       "Free alumni network access for life",
//     ],
//   },
//   // Add other university pairs here following the same structure
// ];

// export default function LmsAccessPage() {
//   return (
//     <section className="min-h-screen bg-gray-50 px-4 py-12">
//       <div className="mx-auto w-full max-w-4xl">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Access Your <span className="text-red-600">University LMS</span>
//           </h1>
//           <p className="text-lg text-gray-600 max-w-lg mx-auto">
//             Choose your institution to get verified access to your learning
//             portal, dashboard, and resources.
//           </p>
//         </div>

//         {/* Stats Strip */}
//         <div className="flex flex-wrap justify-center gap-6 mb-12">
//           {stats.map((item) => (
//             <div
//               key={item.label}
//               className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100"
//             >
//               <item.icon className="h-5 w-5 text-red-600" />
//               <span className="font-semibold text-gray-700 text-sm">
//                 {item.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="relative max-w-2xl mx-auto mb-16">
//           <input
//             type="search"
//             placeholder="Search for your university..."
//             className="w-full h-16 pl-6 pr-32 rounded-2xl border-0 shadow-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-lg"
//           />
//           <button className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors">
//             Search
//           </button>
//         </div>

//         {/* University Cards Grid */}
//         <div className="grid gap-6">
//           {universityPairs.map((pair, pairIdx) => (
//             <div
//               key={pairIdx}
//               className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
//             >
//               <div className="grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
//                 {pair.universities.map((university) => (
//                   <div
//                     key={university.name}
//                     className="flex flex-col gap-4 pt-6 first:pt-0 md:pt-0 md:pr-8"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="h-12 w-32 relative bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
//                         <Image
//                           src={university.logo}
//                           alt={university.name}
//                           width={120}
//                           height={40}
//                           className="object-contain"
//                         />
//                       </div>
//                       <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
//                         <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{" "}
//                         {university.rating}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-gray-900 text-lg">
//                       {university.name}
//                     </h3>

//                     <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
//                       {university.features.map((f) => (
//                         <li key={f.label} className="flex items-center gap-2">
//                           <f.icon className="h-3.5 w-3.5 text-red-500" />{" "}
//                           {f.label}
//                         </li>
//                       ))}
//                     </ul>

//                     <Link
//                       href="/apply"
//                       className="mt-4 text-red-600 font-semibold flex items-center gap-1 text-sm hover:underline"
//                     >
//                       View Access Details <ChevronRight className="h-4 w-4" />
//                     </Link>
//                   </div>
//                 ))}
//               </div>

//               {/* Deal Section */}
//               <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
//                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center">
//                   Exclusive Deals:
//                 </span>
//                 {pair.deals.map((deal) => (
//                   <span
//                     key={deal}
//                     className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
//                   >
//                     <CheckCircle2 className="h-3.5 w-3.5" /> {deal}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Laptop,
  Search,
  ShieldCheck,
  Smartphone,
  Tag,
  Users,
  Video,
  FileText,
  Globe,
  HeadphonesIcon,
  Award,
  Wifi,
  ClipboardList,
  MessageSquare,
  Star,
  Filter,
  X,
  ArrowUpDown,
  Heart,
  Share2,
  Zap,
  Clock,
  IndianRupee,
} from "lucide-react";

interface University {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  avgFees: number;
  studentCount: number;
  features: Array<{ label: string; icon: any }>;
  deals: string[];
  category: "engineering" | "business" | "liberal-arts" | "professional";
  dealsExpireIn: string;
  popularFeature: string;
}

const universities: University[] = [
  {
    id: "1",
    name: "Sanskriti University Engineering",
    logo: "/universities/sanskriti.png",
    rating: 4.6,
    reviews: 2840,
    avgFees: 85000,
    studentCount: 12500,
    category: "engineering",
    features: [
      { label: "Live Recorded Lectures", icon: Video },
      { label: "Progress Tracking", icon: BarChart3 },
      { label: "Online Proctored Exams", icon: ShieldCheck },
      { label: "Mobile LMS Access", icon: Smartphone },
    ],
    deals: [
      "Flat ₹5,000 off on first semester",
      "Free study material worth ₹2,000",
    ],
    dealsExpireIn: "3 days",
    popularFeature: "24/7 Doubt Support",
  },
  {
    id: "2",
    name: "Amity University Online",
    logo: "/universities/amity.webp",
    rating: 4.7,
    reviews: 5120,
    avgFees: 95000,
    studentCount: 28000,
    category: "engineering",
    features: [
      { label: "AI Academic Support", icon: Bot },
      { label: "Virtual Campus Community", icon: Users },
      { label: "Live Recorded Sessions", icon: Video },
      { label: "Secure Online Exams", icon: ShieldCheck },
    ],
    deals: ["₹10,000 cashback", "Free alumni network access"],
    dealsExpireIn: "5 days",
    popularFeature: "AI Tutoring Bot",
  },
  {
    id: "3",
    name: "Manipal University Online",
    logo: "/universities/onlinemanipal.webp",
    rating: 4.7,
    reviews: 3950,
    avgFees: 88000,
    studentCount: 18000,
    category: "engineering",
    features: [
      { label: "Progress Dashboard", icon: BarChart3 },
      { label: "Live Sessions", icon: Video },
      { label: "Discussion Forums", icon: BookOpen },
      { label: "Learner App", icon: Smartphone },
    ],
    deals: ["Free month access", "Industry certification included"],
    dealsExpireIn: "7 days",
    popularFeature: "Industry Partnerships",
  },
  {
    id: "4",
    name: "Lovely Professional University",
    logo: "/universities/lpu.png",
    rating: 4.5,
    reviews: 4200,
    avgFees: 75000,
    studentCount: 22000,
    category: "professional",
    features: [
      { label: "24/7 Student Support", icon: HeadphonesIcon },
      { label: "Industry Certifications", icon: Award },
      { label: "Live Interactive Classes", icon: Video },
      { label: "Examination Portal", icon: ClipboardList },
    ],
    deals: ["₹7,500 welcome bonus", "Free placement assistance"],
    dealsExpireIn: "2 days",
    popularFeature: "Placement Support",
  },
  {
    id: "5",
    name: "NMIMS Online",
    logo: "/universities/nmims.png",
    rating: 4.8,
    reviews: 2100,
    avgFees: 120000,
    studentCount: 8000,
    category: "business",
    features: [
      { label: "Executive Mentoring", icon: Users },
      { label: "Case Study Learning", icon: BookOpen },
      { label: "Industry Experts", icon: Laptop },
      { label: "Networking Events", icon: Globe },
    ],
    deals: ["Early bird discount 15%", "Free career counseling"],
    dealsExpireIn: "4 days",
    popularFeature: "Expert Faculty",
  },
  {
    id: "6",
    name: "Symbiosis Online",
    logo: "/universities/symbiosis.png",
    rating: 4.6,
    reviews: 1850,
    avgFees: 100000,
    studentCount: 6500,
    category: "business",
    features: [
      { label: "Industry Collaborations", icon: Building2 },
      { label: "Interactive Webinars", icon: Video },
      { label: "Alumni Network", icon: Users },
      { label: "Career Services", icon: Award },
    ],
    deals: ["₹5,000 off + free books", "Scholarship opportunity"],
    dealsExpireIn: "6 days",
    popularFeature: "Alumni Mentorship",
  },
];

type SortType = "rating" | "fees-low" | "fees-high" | "popular";
type FilterCategory =
  | "all"
  | "engineering"
  | "business"
  | "liberal-arts"
  | "professional";

export default function LmsAccessPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("rating");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [expandedUniversity, setExpandedUniversity] = useState<string | null>(
    null,
  );
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  const filteredAndSorted = useMemo(() => {
    let result = universities.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || uni.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "fees-low":
        result.sort((a, b) => a.avgFees - b.avgFees);
        break;
      case "fees-high":
        result.sort((a, b) => b.avgFees - a.avgFees);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    return result;
  }, [searchQuery, sortBy, filterCategory]);

  const handleCompareToggle = (universityId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(universityId)) {
        return prev.filter((id) => id !== universityId);
      }
      if (prev.length < 3) {
        return [...prev, universityId];
      }
      return prev;
    });
  };

  const handleSaveUniversity = (universityId: string) => {
    setSavedUniversities((prev) =>
      prev.includes(universityId)
        ? prev.filter((id) => id !== universityId)
        : [...prev, universityId],
    );
  };

  const comparedUniversities = universities.filter((uni) =>
    selectedForCompare.includes(uni.id),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              Access Your <span className="text-red-600">University LMS</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8 md:mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search universities, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-red-500 focus:border-0 outline-none transition-all text-sm sm:text-base"
            />
          </div>
        </div>
      </section>

      {/* Filters & Sort Section */}
      <section className="px-4 py-6 md:py-8 border-y border-gray-200 bg-white sticky top-0 z-40">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-5 w-5 text-gray-600" />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                Filters ({filterCategory !== "all" ? 1 : 0})
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${showFilters ? "rotate-90" : ""}`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="text-xs sm:text-sm px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="popular">📈 Most Popular</option>
                <option value="fees-low">💰 Budget First</option>
                <option value="fees-high">💎 Premium First</option>
              </select>
            </div>

            {selectedForCompare.length > 0 && (
              <button
                onClick={() => setCompareMode(!compareMode)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                Compare ({selectedForCompare.length})
              </button>
            )}
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All Categories" },
                  { value: "engineering", label: "🏗️ Engineering" },
                  { value: "business", label: "💼 Business" },
                  { value: "professional", label: "🎯 Professional" },
                  { value: "liberal-arts", label: "📚 Liberal Arts" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() =>
                      setFilterCategory(cat.value as FilterCategory)
                    }
                    className={`px-3 py-2 text-xs sm:text-sm rounded-lg font-medium transition-all ${
                      filterCategory === cat.value
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto w-full max-w-5xl">
          {/* Compare Mode */}
          {compareMode && comparedUniversities.length > 0 && (
            <div className="mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Comparison View
                </h2>
                <button
                  onClick={() => {
                    setCompareMode(false);
                    setSelectedForCompare([]);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Comparison Table - Horizontal Scroll on Mobile */}
              <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 sm:px-4 font-bold text-gray-900 whitespace-nowrap">
                        University
                      </th>
                      {comparedUniversities.map((uni) => (
                        <th
                          key={uni.id}
                          className="text-center py-3 px-2 sm:px-4 font-bold text-gray-900"
                        >
                          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                            {uni.rating}⭐
                            <button
                              onClick={() => handleCompareToggle(uni.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">
                        Avg Fees
                      </td>
                      {comparedUniversities.map((uni) => (
                        <td
                          key={uni.id}
                          className="text-center py-3 px-2 sm:px-4 text-gray-900"
                        >
                          ₹{uni.avgFees.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">
                        Students
                      </td>
                      {comparedUniversities.map((uni) => (
                        <td
                          key={uni.id}
                          className="text-center py-3 px-2 sm:px-4 text-gray-900"
                        >
                          {(uni.studentCount / 1000).toFixed(1)}k
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">
                        Reviews
                      </td>
                      {comparedUniversities.map((uni) => (
                        <td
                          key={uni.id}
                          className="text-center py-3 px-2 sm:px-4 text-gray-900"
                        >
                          {uni.reviews.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">
                        Action
                      </td>
                      {comparedUniversities.map((uni) => (
                        <td
                          key={uni.id}
                          className="text-center py-3 px-2 sm:px-4"
                        >
                          <Link
                            href="/apply"
                            className="inline-block text-xs sm:text-sm px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                          >
                            View
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* University Cards Grid */}
          {filteredAndSorted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredAndSorted.map((university) => (
                <div
                  key={university.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="p-6 md:p-8 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="h-14 w-24 sm:h-16 sm:w-32 relative bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100 flex-shrink-0">
                        <Image
                          src={university.logo}
                          alt={university.name}
                          width={120}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleSaveUniversity(university.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            savedUniversities.includes(university.id)
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <Heart
                            className="h-5 w-5"
                            fill={
                              savedUniversities.includes(university.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                      {university.name}
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {university.rating} (
                        {university.reviews.toLocaleString()})
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                        <Users className="h-4 w-4" />
                        {(university.studentCount / 1000).toFixed(0)}k Students
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                        <IndianRupee className="h-4 w-4" />₹
                        {(university.avgFees / 1000).toFixed(0)}k
                      </span>
                    </div>

                    <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 px-3 py-1.5 rounded-lg">
                      <p className="text-xs sm:text-sm font-bold text-red-700 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        {university.popularFeature}
                      </p>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex-grow">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-sm">
                        Key Features
                      </h4>
                      <button
                        onClick={() =>
                          setExpandedUniversity(
                            expandedUniversity === university.id
                              ? null
                              : university.id,
                          )
                        }
                        className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        {expandedUniversity === university.id ? "Less" : "More"}
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-transform ${
                            expandedUniversity === university.id
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <ul className="grid grid-cols-2 gap-2 mb-4">
                      {(expandedUniversity === university.id
                        ? university.features
                        : university.features.slice(0, 2)
                      ).map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                        >
                          <feature.icon className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    {expandedUniversity === university.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs sm:text-sm text-blue-900 font-medium">
                          ✓ All features available with verified access
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Deals Section */}
                  <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        <Tag className="h-4 w-4 text-red-600" />
                        Exclusive Deals
                      </h4>
                      <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {university.dealsExpireIn}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {university.deals.map((deal, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-red-900 font-medium"
                        >
                          <CheckCircle2 className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{deal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="px-6 md:px-8 py-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/apply"
                      className="flex-1 text-center bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors text-sm sm:text-base"
                    >
                      Access LMS
                    </Link>
                    <button
                      onClick={() => handleCompareToggle(university.id)}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-colors text-sm sm:text-base ${
                        selectedForCompare.includes(university.id)
                          ? "bg-red-100 text-red-600 border border-red-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {selectedForCompare.includes(university.id)
                        ? "✓ Selected"
                        : "Compare"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No universities found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Compare Button - Mobile Sticky */}
          {selectedForCompare.length > 0 && (
            <div className="fixed md:hidden bottom-6 left-4 right-4 z-50">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-red-600 transition-all"
              >
                <ArrowUpDown className="h-5 w-5" />
                Compare ({selectedForCompare.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-red-50 mb-8">
            Choose your university and gain instant access to your learning
            portal
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors"
          >
            Get Started Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
