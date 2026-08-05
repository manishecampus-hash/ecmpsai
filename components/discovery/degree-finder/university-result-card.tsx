// "use client";

// import React, { useState } from "react";

// export interface UniversityFeature {
//   icon: string;
//   iconColor: string;
//   title: string;
//   subtitle: string;
// }

// export interface University {
//   id: string;
//   name: string;
//   logo?: string;
//   logoText?: string;
//   logoColor?: string;
//   heroImage?: string;
//   location?: string;
//   accreditations: string[];
//   reviews: number;
//   rating: number;
//   highlights: string[];
//   features?: UniversityFeature[];
//   hiringPartners?: string;
//   students?: string;
//   feePerSem: number;
//   savings?: number;
//   buttonColor?: string;
//   expertLabel?: string;
// }

// export const mbaUniversities: University[] = [
//   {
//     id: "rushford",
//     name: "Rushford Business School",
//     // logo: "/doctorate/Rushford.svg",
//     // logoColor: "#1a3a6b",
//     heroImage: "/descoverresult/testimg.png",
//     location: "Zurich, Switzerland",
//     accreditations: ["AACSB", "EFMD", "QS Ranked", "Swiss Accredited"],
//     reviews: 892,
//     rating: 4.5,
//     highlights: [
//       "Global MBA with Swiss education standards",
//       "Dual degree option with European campus",
//       "Industry mentorship from Fortune 500 leaders",
//     ],
//     features: [
//       {
//         icon: "🎓",
//         iconColor: "#6366F1",
//         title: "Dual degree",
//         subtitle: "European campus",
//       },
//       {
//         icon: "👥",
//         iconColor: "#8B5CF6",
//         title: "Industry mentors",
//         subtitle: "Fortune 500 leaders",
//       },
//       {
//         icon: "🌐",
//         iconColor: "#6366F1",
//         title: "Global exposure",
//         subtitle: "Networking events",
//       },
//     ],
//     students: "12,000+ Students",
//     feePerSem: 89500,
//     buttonColor: "#DC2626",
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "amity",
//     name: "Amity University",
//     // logoText: "AU",
//     logoColor: "#8B1A1A",
//     heroImage: "/descoverresult/2.png",
//     location: "Noida, India",
//     accreditations: ["UGC-DEB", "AICTE", "QS Ranked"],
//     reviews: 1755,
//     rating: 4.7,
//     highlights: [
//       "Saves time by getting a UG+PG Degree in just 4.5 years",
//       "Corporate Internship Included for Practical Exposure",
//       "Cost-effective Dual Degree Program",
//     ],
//     features: [
//       {
//         icon: "⏱️",
//         iconColor: "#6366F1",
//         title: "Save time",
//         subtitle: "UG+PG in 4.5 yrs",
//       },
//       {
//         icon: "💼",
//         iconColor: "#8B5CF6",
//         title: "Internship",
//         subtitle: "Included",
//       },
//       {
//         icon: "🛡️",
//         iconColor: "#6366F1",
//         title: "Cost-effective",
//         subtitle: "Dual degree program",
//       },
//     ],
//     students: "1L+ Students",
//     feePerSem: 59300,
//     buttonColor: "#DC2626",
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "gla",
//     name: "GLA University Online",
//     logoText: "GLA",
//     logoColor: "#0057A8",
//     heroImage:
//       "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=400&fit=crop",
//     location: "Mathura, India",
//     accreditations: ["UGC-DEB", "NAAC A+", "AICTE", "AIU"],
//     reviews: 643,
//     rating: 4.4,
//     highlights: [
//       "NAAC A+ accredited institution with 25+ years of excellence",
//       "Live interactive sessions with industry practitioners",
//       "Placement assistance with 400+ corporate tie-ups",
//     ],
//     features: [
//       {
//         icon: "⭐",
//         iconColor: "#6366F1",
//         title: "NAAC A+",
//         subtitle: "25+ years excellence",
//       },
//       {
//         icon: "🎥",
//         iconColor: "#8B5CF6",
//         title: "Live Sessions",
//         subtitle: "Industry experts",
//       },
//       {
//         icon: "🤝",
//         iconColor: "#6366F1",
//         title: "400+ Tie-ups",
//         subtitle: "Placement support",
//       },
//     ],
//     students: "50,000+ Students",
//     feePerSem: 42000,
//     buttonColor: "#DC2626",
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "chandigarh",
//     name: "Chandigarh University Online",
//     logoText: "CU",
//     logoColor: "#C8102E",
//     heroImage:
//       "https://images.unsplash.com/photo-1541339907198-8c8255e9ca7f?w=500&h=400&fit=crop",
//     location: "Chandigarh, India",
//     accreditations: ["UGC-DEB", "NAAC A+", "QS World Ranked", "NIRF Top 50"],
//     reviews: 1124,
//     rating: 4.6,
//     highlights: [
//       "QS World Ranked university — top 1000 globally",
//       "Industry-integrated curriculum with live projects",
//       "Career support & guaranteed interview calls",
//     ],
//     features: [
//       {
//         icon: "🌍",
//         iconColor: "#6366F1",
//         title: "QS Ranked",
//         subtitle: "Top 1000 globally",
//       },
//       {
//         icon: "📚",
//         iconColor: "#8B5CF6",
//         title: "Live Projects",
//         subtitle: "Industry-integrated",
//       },
//       {
//         icon: "💼",
//         iconColor: "#6366F1",
//         title: "Career Support",
//         subtitle: "Interview guaranteed",
//       },
//     ],
//     students: "3L+ Students",
//     feePerSem: 52000,
//     buttonColor: "#DC2626",
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "manipal",
//     name: "Manipal University Jaipur",
//     logoText: "MUJ",
//     logoColor: "#E87722",
//     heroImage:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=400&fit=crop",
//     location: "Jaipur, India",
//     accreditations: ["UGC-DEB", "NAAC A", "AICTE", "NBA", "WES"],
//     reviews: 987,
//     rating: 4.5,
//     highlights: [
//       "Ranked among top private universities in India",
//       "Experiential learning with real-world case studies",
//       "Dedicated alumni network of 1.5 lakh+ professionals",
//     ],
//     features: [
//       {
//         icon: "🏆",
//         iconColor: "#6366F1",
//         title: "Top Private",
//         subtitle: "Universities in India",
//       },
//       {
//         icon: "🧪",
//         iconColor: "#8B5CF6",
//         title: "Experiential",
//         subtitle: "Real-world cases",
//       },
//       {
//         icon: "👨‍🎓",
//         iconColor: "#6366F1",
//         title: "1.5L+ Alumni",
//         subtitle: "Professional network",
//       },
//     ],
//     students: "80,000+ Students",
//     feePerSem: 47500,
//     buttonColor: "#DC2626",
//     expertLabel: "Talk to our experts",
//   },
// ];

// // ── Star Rating ───────────────────────────────────────────────────────────────

// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((i) => {
//         const filled = rating >= i;
//         const half = !filled && rating >= i - 0.5;
//         return (
//           <span
//             key={i}
//             className="text-lg leading-none"
//             style={{ color: filled || half ? "#F59E0B" : "#E5E7EB" }}
//           >
//             {filled ? "★" : half ? "⯨" : "☆"}
//           </span>
//         );
//       })}
//     </div>
//   );
// }

// // ── Main Card ─────────────────────────────────────────────────────────────────

// function UniversityCard({
//   uni,
//   onSelect,
//   compareSelected,
//   onCompareToggle,
//   onExpertClick,
// }: {
//   uni: University;
//   onSelect: (id: string) => void;
//   compareSelected: boolean;
//   onCompareToggle: (id: string) => void;
//   onExpertClick?: (id: string) => void;
// }) {
//   const [imgError, setImgError] = useState(false);
//   const showFallback = !uni.heroImage || imgError;

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
//       {/* ── 3-Column Grid Layout (Fully Responsive) ── */}
//       {/* order-* classes lock the mobile stacking sequence: Image -> Content -> Actions.
//           sm:order-none resets to natural grid column order on tablet/desktop. */}
//       <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_140px] lg:grid-cols-[220px_1fr_200px] gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4">
//         {/* ── LEFT: Hero Image ── */}
//         <div className="relative order-1 sm:order-none">
//           {!showFallback && uni.heroImage && (
//             <img
//               src={uni.heroImage}
//               alt={uni.name}
//               onError={() => setImgError(true)}
//               className="w-full h-40 sm:h-48 lg:h-56 rounded-xl sm:rounded-2xl object-cover"
//             />
//           )}
//           {showFallback && (
//             <div className="w-full h-40 sm:h-48 lg:h-56 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//               <span className="text-gray-400 text-xs sm:text-sm">No image</span>
//             </div>
//           )}
//         </div>

//         {/* ── MIDDLE: Main Content ── */}
//         <div className="flex flex-col order-2 sm:order-none">
//           {/* University Name */}
//           <div>
//             <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
//               {uni.name}
//             </h3>

//             {/* Accreditation Badges */}
//             <div className="flex flex-wrap gap-1.5 sm:gap-2">
//               {uni.accreditations.slice(0, 4).map((acc, i) => (
//                 <span
//                   key={i}
//                   className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-700 bg-gray-100 rounded-full"
//                 >
//                   {acc}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Features Grid (3 columns) */}
//           {uni.features && uni.features.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
//               {uni.features.map((feature, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-200 rounded-xl shadow-sm px-1.5 sm:px-2 py-2.5 sm:py-3"
//                 >
//                   <div
//                     className="w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11 rounded-full flex items-center justify-center shrink-0 text-sm sm:text-base lg:text-lg"
//                     style={{ backgroundColor: `${feature.iconColor}20` }}
//                   >
//                     {feature.icon}
//                   </div>
//                   <p className="min-w-0 flex-1 text-left text-[10px] sm:text-xs lg:text-xs leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
//                     <span className="font-semibold text-gray-900">
//                       {feature.title}
//                     </span>{" "}
//                     <span className="text-gray-500">{feature.subtitle}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Location + Students + Know More (wraps gracefully on very narrow screens) */}
//           <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-wrap sm:flex-nowrap sm:overflow-hidden mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
//             {uni.location && (
//               <div className="flex items-center gap-1 shrink-0 min-w-fit">
//                 <svg
//                   className="w-3 h-3 text-gray-600 shrink-0"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
//                   />
//                   <circle
//                     cx="12"
//                     cy="11"
//                     r="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
//                   {uni.location}
//                 </span>
//               </div>
//             )}

//             {uni.location && uni.students && (
//               <span className="h-3 w-px bg-gray-300 shrink-0 hidden sm:inline-block" />
//             )}

//             {uni.students && (
//               <div className="flex items-center gap-1 shrink-0 min-w-fit">
//                 <svg
//                   className="w-3 h-3 text-gray-600 shrink-0"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
//                   {uni.students}
//                 </span>
//               </div>
//             )}

//             {uni.students && (
//               <span className="h-3 w-px bg-gray-300 shrink-0 hidden sm:inline-block" />
//             )}

//             <button className="flex items-center gap-1 text-xs sm:text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors shrink-0 min-w-fit">
//               <svg
//                 className="w-3 h-3 shrink-0"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 6v6l4 2"
//                 />
//               </svg>
//               <span className="hidden sm:inline whitespace-nowrap">
//                 Know more in 2 mins
//               </span>
//               <span className="sm:hidden whitespace-nowrap">Know more</span>
//             </button>
//           </div>
//         </div>

//         {/* ── RIGHT: Rating + Fee + Actions (Responsive) ── */}
//         <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 order-3 sm:order-none">
//           {/* Rating + Fee (Stacked - Fee below Rating) */}
//           <div className="flex flex-row sm:flex-col gap-2 sm:gap-3">
//             {/* Rating Section */}
//             <div className="flex-1 sm:flex-none space-y-0.5 sm:space-y-1">
//               <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
//                 {uni.reviews.toLocaleString()} Reviews
//               </p>
//               <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-none">
//                 {uni.rating.toFixed(1)}
//               </p>
//               <div className="flex items-center gap-0.5">
//                 {[1, 2, 3, 4, 5].map((i) => {
//                   const filled = uni.rating >= i;
//                   const half = !filled && uni.rating >= i - 0.5;
//                   return (
//                     <span
//                       key={i}
//                       className="text-xs sm:text-sm leading-none"
//                       style={{ color: filled || half ? "#F59E0B" : "#E5E7EB" }}
//                     >
//                       {filled ? "★" : half ? "⯨" : "☆"}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Fee Section */}
//             <div className="flex-1 sm:flex-none space-y-0.5 sm:space-y-1 bg-gray-50 rounded-xl shadow-sm px-2.5 sm:px-3 py-1.5 sm:py-2">
//               <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
//                 Fees
//               </p>
//               <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 leading-tight">
//                 ₹{(uni.feePerSem / 1000).toFixed(0)}K{" "}
//                 <span className="text-[9px] sm:text-[10px] font-normal text-gray-500">
//                   /Semester
//                 </span>
//               </p>
//             </div>
//           </div>
//           {/* View Details Button */}
//           <button
//             onClick={() => onSelect(uni.id)}
//             className="w-full text-white font-bold py-1.5 sm:py-2 sm:py-2.5 px-2.5 sm:px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:opacity-90 text-xs sm:text-sm"
//             style={{ backgroundColor: "#DC2626" }}
//           >
//             View Details
//             <svg
//               className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2.5}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>

//           {/* Compare Checkbox */}
//           <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
//             <div
//               onClick={() => onCompareToggle(uni.id)}
//               className={`w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
//                 compareSelected
//                   ? "bg-emerald-500 border-emerald-500"
//                   : "border-gray-300 bg-white group-hover:border-emerald-400"
//               }`}
//             >
//               {compareSelected && (
//                 <svg
//                   className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={3}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               )}
//             </div>
//             <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-gray-900">
//               Compare
//             </span>
//           </label>

//           {/* Talk to Experts */}
//           {/* <button
//             onClick={() => onExpertClick?.(uni.id)}
//             className="text-xs font-semibold text-blue-600 hover:underline mt-auto pt-1 sm:pt-2 text-center"
//           >
//             {uni.expertLabel || "Talk to our experts"}
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Results List ──────────────────────────────────────────────────────────────

// export default function UniversityResultsList({
//   universities = mbaUniversities,
//   onSelect,
//   onExpertClick,
// }: {
//   universities?: University[];
//   onSelect?: (id: string) => void;
//   onExpertClick?: (id: string) => void;
// }) {
//   const [compareList, setCompareList] = useState<string[]>([]);

//   const toggleCompare = (id: string) => {
//     setCompareList((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : prev.length < 3
//           ? [...prev, id]
//           : prev,
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {universities.map((uni) => (
//         <UniversityCard
//           key={uni.id}
//           uni={uni}
//           onSelect={onSelect ?? (() => {})}
//           compareSelected={compareList.includes(uni.id)}
//           onCompareToggle={toggleCompare}
//           onExpertClick={onExpertClick}
//         />
//       ))}

//       {compareList.length >= 2 && (
//         <div className="sticky bottom-4 flex justify-center">
//           <button className="bg-emerald-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
//             Compare {compareList.length} Universities
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// test

import React, { useState } from "react";
import { ChevronDown, Award, Users, MapPin, DollarSign } from "lucide-react";

export interface University {
  id: string;
  name: string;
  location: string;
  rating: number;
  feePerSem: number;
  placement: number;
  specialization: string;
  courses?: string[]; // ← ADD COURSE TAGS
}

// ── UNIVERSITY DATA WITH COURSE TAGS ──────────────────────────────────────────
export const mbaUniversities: University[] = [
  {
    id: "amity",
    name: "Amity University",
    location: "Noida, India",
    rating: 4.7,
    feePerSem: 59000,
    placement: 89,
    specialization: "Management",
    courses: ["MBA", "BBA", "PGDM"], // ← MBA, BBA wala
  },
  {
    id: "rushford",
    name: "Rushford Business School",
    location: "Zurich, Switzerland",
    rating: 4.5,
    feePerSem: 90000,
    placement: 85,
    specialization: "Business",
    courses: ["MBA", "PGDM"],
  },
  {
    id: "gla",
    name: "GLA University",
    location: "Mathura, India",
    rating: 4.4,
    feePerSem: 45000,
    placement: 82,
    specialization: "Engineering & Management",
    courses: ["B.Tech", "MBA", "M.Tech"],
  },
  {
    id: "manipal",
    name: "Manipal Academy of Higher Education",
    location: "Manipal, India",
    rating: 4.6,
    feePerSem: 52000,
    placement: 87,
    specialization: "Engineering",
    courses: ["B.Tech", "M.Tech", "MBA"],
  },
  {
    id: "chandigarh",
    name: "University of Chandigarh",
    location: "Chandigarh, India",
    rating: 4.3,
    feePerSem: 35000,
    placement: 78,
    specialization: "Liberal Arts",
    courses: ["BCA", "B.Com", "B.Sc", "MBA"],
  },
];

// ── FILTER FUNCTION: GET UNIVERSITIES BY COURSE ──────────────────────────────
export function getUniversitiesByCourse(courseName: string): University[] {
  // Normalize course name
  const normalized = courseName.toUpperCase().trim();

  // Filter universities that have this course
  const filtered = mbaUniversities.filter((uni) => {
    if (!uni.courses) return true; // agar courses array nahi hai, sab dikhao (backward compatible)
    return uni.courses.some(
      (c) =>
        c.toUpperCase().includes(normalized) ||
        normalized.includes(c.toUpperCase()),
    );
  });

  // agar kuch match nahi hua, sab universities dikhao (fallback)
  return filtered.length > 0 ? filtered : mbaUniversities;
}

// ── UNIVERSITY CARD COMPONENT ─────────────────────────────────────────────────

interface UniversityCardProps {
  university: University;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onCompare: () => void;
}

function UniversityCard({
  university,
  isSelected,
  onSelect,
  onCompare,
}: UniversityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border-2 rounded-2xl p-5 transition-all ${
        isSelected
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-100 bg-white hover:border-emerald-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {university.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">{university.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-gray-900">{university.rating}</span>
          </div>
          <p className="text-xs text-gray-400">Rating</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">
            ₹{(university.feePerSem / 1000).toFixed(0)}K
          </div>
          <p className="text-xs text-gray-500 mt-1">Per Semester</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">
            {university.placement}%
          </div>
          <p className="text-xs text-gray-500 mt-1">Placement</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm font-bold text-gray-900">
            {university.specialization.split(" ")[0]}
          </div>
          <p className="text-xs text-gray-500 mt-1">Specialization</p>
        </div>
      </div>

      {/* Course Tags */}
      {university.courses && university.courses.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-600 mb-2">Courses:</p>
          <div className="flex flex-wrap gap-2">
            {university.courses.map((course, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full mb-3 p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          {expanded ? "Hide Details" : "View Details"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
          <p className="mb-2">
            <strong>{university.name}</strong> offers comprehensive programs
            with industry-focused curriculum. Strong placement record and alumni
            network.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Average package: ₹{(university.placement * 12).toFixed(0)}K</li>
            <li>Specialization: {university.specialization}</li>
            <li>Location: {university.location}</li>
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSelect(university.id)}
          className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
            isSelected
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
          }`}
        >
          {isSelected ? "✓ Selected" : "Compare"}
        </button>
        <button
          type="button"
          onClick={onCompare}
          className="flex-1 py-2 px-3 rounded-lg font-semibold bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 transition-all"
        >
          More Info
        </button>
      </div>
    </div>
  );
}

// ── MAIN LIST COMPONENT ───────────────────────────────────────────────────────

interface UniversityResultsListProps {
  universities?: University[];
  onSelect?: (id: string) => void;
  onExpertClick?: (id: string) => void;
}

export default function UniversityResultsList({
  universities = mbaUniversities,
  onSelect,
  onExpertClick,
}: UniversityResultsListProps) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const handleToggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
    onSelect?.(id);
  };

  return (
    <div className="space-y-4">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          university={uni}
          isSelected={compareList.includes(uni.id)}
          onSelect={handleToggleCompare}
          onCompare={() => onExpertClick?.(uni.id)}
        />
      ))}

      {compareList.length >= 2 && (
        <div className="sticky bottom-4 flex justify-center">
          <button className="bg-emerald-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            ✨ Compare {compareList.length} Universities
          </button>
        </div>
      )}
    </div>
  );
}
