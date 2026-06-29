// "use client";

// import React, { useState } from "react";

// // ── Types ─────────────────────────────────────────────────────────────────────

// export interface University {
//   id: string;
//   name: string;
//   logo?: string; // URL or initials fallback
//   logoText?: string; // short abbrev for fallback avatar
//   logoColor?: string; // bg color for fallback
//   accreditations: string[];
//   reviews: number;
//   rating: number;
//   highlights: string[];
//   hiringPartners?: string;
//   students?: string;
//   feePerSem: number;
//   savings?: number;
//   expertPhoto?: string;
//   expertLabel?: string;
// }

// // ── Data: 5 MBA universities ──────────────────────────────────────────────────

// export const mbaUniversities: University[] = [
//   {
//     id: "rushford",
//     name: "Rushford Business School",
//     logo: "/doctorate/Rushford.svg",
//     logoColor: "#1a3a6b",
//     accreditations: ["AACSB", "EFMD", "QS Ranked", "Swiss Accredited"],
//     reviews: 892,
//     rating: 4.5,
//     highlights: [
//       "Global MBA with Swiss education standards",
//       "Dual degree option with European campus",
//       "Industry mentorship from Fortune 500 leaders",
//     ],
//     hiringPartners: "300+ Hiring Partners",
//     students: "12,000+ Students",
//     feePerSem: 89500,
//     savings: 5000,
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "amity",
//     name: "Amity University Online",
//     logoText: "AU",
//     logoColor: "#8B1A1A",
//     accreditations: [
//       "UGC-DEB",
//       "AICTE",
//       "NIRF",
//       "WES",
//       "QS World University Rankings",
//       "DEC",
//     ],
//     reviews: 1755,
//     rating: 4.7,
//     highlights: [
//       "Saves time by getting a UG+PG Degree in just 4.5 years",
//       "Corporate Internship Included for Practical Exposure",
//       "Cost-effective Dual Degree Program",
//     ],
//     hiringPartners: "500+ Hiring Partners",
//     students: "1 Lakh+ Students",
//     feePerSem: 59300,
//     savings: 4000,
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "gla",
//     name: "GLA University Online",
//     logoText: "GLA",
//     logoColor: "#0057A8",
//     accreditations: ["UGC-DEB", "NAAC A+", "AICTE", "AIU"],
//     reviews: 643,
//     rating: 4.4,
//     highlights: [
//       "NAAC A+ accredited institution with 25+ years of excellence",
//       "Live interactive sessions with industry practitioners",
//       "Placement assistance with 400+ corporate tie-ups",
//     ],
//     hiringPartners: "400+ Hiring Partners",
//     students: "50,000+ Students",
//     feePerSem: 42000,
//     savings: 3000,
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "chandigarh",
//     name: "Chandigarh University Online",
//     logoText: "CU",
//     logoColor: "#C8102E",
//     accreditations: ["UGC-DEB", "NAAC A+", "QS World Ranked", "NIRF Top 50"],
//     reviews: 1124,
//     rating: 4.6,
//     highlights: [
//       "QS World Ranked university — top 1000 globally",
//       "Industry-integrated curriculum with live projects",
//       "Career support & guaranteed interview calls",
//     ],
//     hiringPartners: "600+ Hiring Partners",
//     students: "3 Lakh+ Students",
//     feePerSem: 52000,
//     savings: 6000,
//     expertLabel: "Talk to our experts",
//   },
//   {
//     id: "manipal",
//     name: "Manipal University Jaipur",
//     logoText: "MUJ",
//     logoColor: "#E87722",
//     accreditations: ["UGC-DEB", "NAAC A", "AICTE", "NBA", "WES"],
//     reviews: 987,
//     rating: 4.5,
//     highlights: [
//       "Ranked among top private universities in India",
//       "Experiential learning with real-world case studies",
//       "Dedicated alumni network of 1.5 lakh+ professionals",
//     ],
//     hiringPartners: "450+ Hiring Partners",
//     students: "80,000+ Students",
//     feePerSem: 47500,
//     savings: 2500,
//     expertLabel: "Talk to our experts",
//   },
// ];

// // ── Star Rating ───────────────────────────────────────────────────────────────

// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((i) => {
//         const filled = rating >= i;
//         const half = !filled && rating >= i - 0.5;
//         return (
//           <span
//             key={i}
//             className="text-base leading-none"
//             style={{ color: filled || half ? "#F5A623" : "#D1D5DB" }}
//           >
//             {filled ? "★" : half ? "⯨" : "☆"}
//           </span>
//         );
//       })}
//     </div>
//   );
// }

// // ── Logo Avatar ───────────────────────────────────────────────────────────────

// function LogoAvatar({ uni }: { uni: University }) {
//   const [imgError, setImgError] = useState(false);
//   if (uni.logo && !imgError) {
//     return (
//       <img
//         src={uni.logo}
//         alt={uni.name}
//         onError={() => setImgError(true)}
//         className="w-25 h-25 object-contain rounded-lg"
//       />
//     );
//   }
//   return (
//     <div
//       className="w-16 h-16 rounded-xl flex items-center justify-center font-extrabold text-white text-sm tracking-tight"
//       style={{ backgroundColor: uni.logoColor ?? "#334155" }}
//     >
//       {uni.logoText ?? uni.name.slice(0, 2).toUpperCase()}
//     </div>
//   );
// }

// // ── Expert CTA ────────────────────────────────────────────────────────────────

// function ExpertCTA({ label }: { label?: string }) {
//   return (
//     <button className="flex items-center gap-2 group">
//       {/* stacked avatars placeholder */}
//       <div className="flex -space-x-2">
//         {["#0EA5E9", "#6366F1"].map((c, i) => (
//           <div
//             key={i}
//             className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
//             style={{ backgroundColor: c }}
//           >
//             {i === 0 ? "A" : "R"}
//           </div>
//         ))}
//       </div>
//       <span className="text-xs font-semibold text-blue-600 group-hover:underline flex items-center gap-0.5">
//         {label ?? "Talk to our experts"}
//         <svg
//           className="w-3 h-3"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//           />
//         </svg>
//       </span>
//     </button>
//   );
// }

// // ── Main Card ─────────────────────────────────────────────────────────────────

// function UniversityCard({
//   uni,
//   onSelect,
//   compareSelected,
//   onCompareToggle,
// }: {
//   uni: University;
//   onSelect: (id: string) => void;
//   compareSelected: boolean;
//   onCompareToggle: (id: string) => void;
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//       {/* ── Top row ── */}
//       <div className="flex items-start justify-between gap-4 p-5 pb-4">
//         {/* Logo + name + accreditations */}
//         <div className="flex items-start gap-4 flex-1 min-w-0">
//           <div className="shrink-0">
//             <LogoAvatar uni={uni} />
//             <p className="text-[10px] text-gray-400 text-center mt-1 max-w-[64px] leading-tight">
//               {uni.name.split(" ").slice(0, 2).join(" ")}
//             </p>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-[10px] text-gray-500 font-medium mb-1">
//               Accredited by:
//             </p>
//             <p className="text-sm font-bold text-gray-800 leading-snug">
//               {uni.accreditations.join(" | ")}
//             </p>
//           </div>
//         </div>

//         {/* Reviews + rating */}
//         <div className="shrink-0 text-center">
//           <p className="text-xs text-gray-500 mb-1">
//             {uni.reviews.toLocaleString()} Reviews
//           </p>
//           <p className="text-2xl font-extrabold text-gray-900 leading-none">
//             {uni.rating.toFixed(1)}
//           </p>
//           <StarRating rating={uni.rating} />
//         </div>

//         {/* Expert CTA */}
//         <div className="shrink-0 hidden md:flex">
//           <ExpertCTA label={uni.expertLabel} />
//         </div>
//       </div>

//       {/* ── Highlights strip ── */}
//       <div className="mx-5 mb-4 bg-indigo-50 rounded-xl px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1">
//         {uni.highlights.map((h, i) => (
//           <span
//             key={i}
//             className="flex items-center gap-1.5 text-xs text-indigo-800"
//           >
//             <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
//               <svg
//                 className="w-2.5 h-2.5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={3}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </span>
//             {h}
//           </span>
//         ))}
//       </div>

//       {/* ── Bottom row ── */}
//       <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
//         {/* Pills */}
//         {uni.hiringPartners && (
//           <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
//             {uni.hiringPartners}
//           </span>
//         )}
//         {uni.students && (
//           <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100">
//             <svg
//               className="w-3 h-3"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             {uni.students}
//           </span>
//         )}

//         {/* Know in 2 mins */}
//         <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
//           <svg
//             className="w-3 h-3"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <circle cx="12" cy="12" r="10" />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 6v6l4 2"
//             />
//           </svg>
//           Know University in 2 mins
//           <svg
//             className="w-3 h-3 ml-0.5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>

//         {/* Spacer */}
//         <div className="flex-1" />

//         {/* Compare */}
//         <label className="flex items-center gap-1.5 cursor-pointer">
//           <div
//             onClick={() => onCompareToggle(uni.id)}
//             className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${compareSelected ? "bg-emerald-500 border-emerald-500" : "border-gray-300 bg-white"}`}
//           >
//             {compareSelected && (
//               <svg
//                 className="w-2.5 h-2.5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={3}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             )}
//           </div>
//           <span className="text-xs text-gray-600 font-medium">
//             Compare University
//           </span>
//         </label>

//         {/* Fee CTA */}
//         <button
//           onClick={() => onSelect(uni.id)}
//           className="flex items-center gap-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//         >
//           <span className="bg-blue-700 hover:bg-blue-800 transition-colors text-white text-sm font-bold px-4 py-2.5 flex flex-col leading-tight">
//             <span>₹ {uni.feePerSem.toLocaleString("en-IN")}/Sem</span>
//             {uni.savings && (
//               <span className="text-[10px] font-normal text-emerald-300">
//                 You save ₹ {uni.savings.toLocaleString("en-IN")} *
//               </span>
//             )}
//           </span>
//           <span className="bg-blue-900 text-white px-2.5 py-[22px] self-stretch flex items-center">
//             <svg
//               className="w-4 h-4"
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
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Results List (drop-in replacement for the grid in ResultsScreen) ──────────

// export default function UniversityResultsList({
//   universities = mbaUniversities,
//   onSelect,
// }: {
//   universities?: University[];
//   onSelect?: (id: string) => void;
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

"use client";

import React, { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UniversityFeature {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

export interface University {
  id: string;
  name: string;
  logo?: string;
  logoText?: string;
  logoColor?: string;
  heroImage?: string;
  location?: string;
  accreditations: string[];
  reviews: number;
  rating: number;
  highlights: string[];
  features?: UniversityFeature[];
  hiringPartners?: string;
  students?: string;
  feePerSem: number;
  savings?: number;
  buttonColor?: string;
  expertLabel?: string;
}

// ── Data: 5 MBA universities ──────────────────────────────────────────────────

export const mbaUniversities: University[] = [
  {
    id: "rushford",
    name: "Rushford Business School",
    logo: "/doctorate/Rushford.svg",
    logoColor: "#1a3a6b",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    location: "Zurich, Switzerland",
    accreditations: ["AACSB", "EFMD", "QS Ranked", "Swiss Accredited"],
    reviews: 892,
    rating: 4.5,
    highlights: [
      "Global MBA with Swiss education standards",
      "Dual degree option with European campus",
      "Industry mentorship from Fortune 500 leaders",
    ],
    features: [
      {
        icon: "🎓",
        iconColor: "#6366F1",
        title: "Dual degree",
        subtitle: "European campus",
      },
      {
        icon: "👥",
        iconColor: "#8B5CF6",
        title: "Industry mentors",
        subtitle: "Fortune 500 leaders",
      },
      {
        icon: "🌐",
        iconColor: "#6366F1",
        title: "Global exposure",
        subtitle: "Networking events",
      },
    ],
    students: "12,000+ Students",
    feePerSem: 89500,
    buttonColor: "#DC2626",
    expertLabel: "Talk to our experts",
  },
  {
    id: "amity",
    name: "Amity University",
    logoText: "AU",
    logoColor: "#8B1A1A",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
    location: "Noida, India",
    accreditations: ["UGC-DEB", "AICTE", "QS Ranked"],
    reviews: 1755,
    rating: 4.7,
    highlights: [
      "Saves time by getting a UG+PG Degree in just 4.5 years",
      "Corporate Internship Included for Practical Exposure",
      "Cost-effective Dual Degree Program",
    ],
    features: [
      {
        icon: "⏱️",
        iconColor: "#6366F1",
        title: "Save time",
        subtitle: "UG+PG in 4.5 yrs",
      },
      {
        icon: "💼",
        iconColor: "#8B5CF6",
        title: "Internship",
        subtitle: "Included",
      },
      {
        icon: "🛡️",
        iconColor: "#6366F1",
        title: "Cost-effective",
        subtitle: "Dual degree program",
      },
    ],
    students: "1L+ Students",
    feePerSem: 59300,
    buttonColor: "#DC2626",
    expertLabel: "Talk to our experts",
  },
  {
    id: "gla",
    name: "GLA University Online",
    logoText: "GLA",
    logoColor: "#0057A8",
    heroImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=400&fit=crop",
    location: "Mathura, India",
    accreditations: ["UGC-DEB", "NAAC A+", "AICTE", "AIU"],
    reviews: 643,
    rating: 4.4,
    highlights: [
      "NAAC A+ accredited institution with 25+ years of excellence",
      "Live interactive sessions with industry practitioners",
      "Placement assistance with 400+ corporate tie-ups",
    ],
    features: [
      {
        icon: "⭐",
        iconColor: "#6366F1",
        title: "NAAC A+",
        subtitle: "25+ years excellence",
      },
      {
        icon: "🎥",
        iconColor: "#8B5CF6",
        title: "Live Sessions",
        subtitle: "Industry experts",
      },
      {
        icon: "🤝",
        iconColor: "#6366F1",
        title: "400+ Tie-ups",
        subtitle: "Placement support",
      },
    ],
    students: "50,000+ Students",
    feePerSem: 42000,
    buttonColor: "#DC2626",
    expertLabel: "Talk to our experts",
  },
  {
    id: "chandigarh",
    name: "Chandigarh University Online",
    logoText: "CU",
    logoColor: "#C8102E",
    heroImage:
      "https://images.unsplash.com/photo-1541339907198-8c8255e9ca7f?w=500&h=400&fit=crop",
    location: "Chandigarh, India",
    accreditations: ["UGC-DEB", "NAAC A+", "QS World Ranked", "NIRF Top 50"],
    reviews: 1124,
    rating: 4.6,
    highlights: [
      "QS World Ranked university — top 1000 globally",
      "Industry-integrated curriculum with live projects",
      "Career support & guaranteed interview calls",
    ],
    features: [
      {
        icon: "🌍",
        iconColor: "#6366F1",
        title: "QS Ranked",
        subtitle: "Top 1000 globally",
      },
      {
        icon: "📚",
        iconColor: "#8B5CF6",
        title: "Live Projects",
        subtitle: "Industry-integrated",
      },
      {
        icon: "💼",
        iconColor: "#6366F1",
        title: "Career Support",
        subtitle: "Interview guaranteed",
      },
    ],
    students: "3L+ Students",
    feePerSem: 52000,
    buttonColor: "#DC2626",
    expertLabel: "Talk to our experts",
  },
  {
    id: "manipal",
    name: "Manipal University Jaipur",
    logoText: "MUJ",
    logoColor: "#E87722",
    heroImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=400&fit=crop",
    location: "Jaipur, India",
    accreditations: ["UGC-DEB", "NAAC A", "AICTE", "NBA", "WES"],
    reviews: 987,
    rating: 4.5,
    highlights: [
      "Ranked among top private universities in India",
      "Experiential learning with real-world case studies",
      "Dedicated alumni network of 1.5 lakh+ professionals",
    ],
    features: [
      {
        icon: "🏆",
        iconColor: "#6366F1",
        title: "Top Private",
        subtitle: "Universities in India",
      },
      {
        icon: "🧪",
        iconColor: "#8B5CF6",
        title: "Experiential",
        subtitle: "Real-world cases",
      },
      {
        icon: "👨‍🎓",
        iconColor: "#6366F1",
        title: "1.5L+ Alumni",
        subtitle: "Professional network",
      },
    ],
    students: "80,000+ Students",
    feePerSem: 47500,
    buttonColor: "#DC2626",
    expertLabel: "Talk to our experts",
  },
];

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <span
            key={i}
            className="text-lg leading-none"
            style={{ color: filled || half ? "#F59E0B" : "#E5E7EB" }}
          >
            {filled ? "★" : half ? "⯨" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

// ── Logo Avatar ───────────────────────────────────────────────────────────────

function LogoAvatar({ uni }: { uni: University }) {
  const [imgError, setImgError] = useState(false);
  if (uni.logo && !imgError) {
    return (
      <img
        src={uni.logo}
        alt={uni.name}
        onError={() => setImgError(true)}
        className="w-14 h-14 object-contain rounded-lg"
      />
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-lg flex items-center justify-center font-extrabold text-white text-xs tracking-tight"
      style={{ backgroundColor: uni.logoColor ?? "#334155" }}
    >
      {uni.logoText ?? uni.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────────

function UniversityCard({
  uni,
  onSelect,
  compareSelected,
  onCompareToggle,
  onExpertClick,
}: {
  uni: University;
  onSelect: (id: string) => void;
  compareSelected: boolean;
  onCompareToggle: (id: string) => void;
  onExpertClick?: (id: string) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
      {/* ── 3-Column Grid Layout (Fully Responsive) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_140px] lg:grid-cols-[220px_1fr_200px] gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4">
        {/* ── LEFT: Hero Image + Logo ── */}
        <div className="relative">
          {uni.heroImage && !imgError && (
            <img
              src={uni.heroImage}
              alt={uni.name}
              onError={() => setImgError(true)}
              className="w-full h-40 sm:h-48 lg:h-56 rounded-xl sm:rounded-2xl object-cover"
            />
          )}
          {!uni.heroImage ||
            (imgError && (
              <div className="w-full h-40 sm:h-48 lg:h-56 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs sm:text-sm">
                  No image
                </span>
              </div>
            ))}

          {/* ── Logo Badge (Overlaid) ── */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <div className="bg-white rounded-lg p-1 sm:p-1.5 shadow-md">
              <LogoAvatar uni={uni} />
            </div>
          </div>
        </div>

        {/* ── MIDDLE: Main Content ── */}
        <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
          {/* University Name */}
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {uni.name}
            </h3>

            {/* Accreditation Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {uni.accreditations.slice(0, 4).map((acc, i) => (
                <span
                  key={i}
                  className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg"
                >
                  {acc}
                </span>
              ))}
            </div>
          </div>

          {/* Features Grid (3 columns) */}
          {uni.features && uni.features.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {uni.features.map((feature, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-1.5 text-sm sm:text-base lg:text-lg"
                    style={{ backgroundColor: `${feature.iconColor}20` }}
                  >
                    {feature.icon}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-sm font-semibold text-gray-900 leading-tight">
                    {feature.title}
                  </p>
                  <p className="text-[9px] sm:text-xs lg:text-xs text-gray-500 leading-tight mt-0.5">
                    {feature.subtitle}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Location + Students + Know More (1 LINE - NO WRAP) */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-nowrap overflow-hidden">
            {uni.location && (
              <div className="flex items-center gap-0.5 shrink-0 min-w-fit">
                <svg
                  className="w-3 h-3 text-gray-600 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
                <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                  {uni.location}
                </span>
              </div>
            )}

            {uni.students && (
              <div className="flex items-center gap-0.5 shrink-0 min-w-fit">
                <svg
                  className="w-3 h-3 text-gray-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                  {uni.students}
                </span>
              </div>
            )}

            <button className="flex items-center gap-0.5 text-xs sm:text-xs lg:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors shrink-0 min-w-fit">
              <svg
                className="w-3 h-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              <span className="hidden sm:inline whitespace-nowrap">
                Know more in 2 mins
              </span>
              <span className="sm:hidden whitespace-nowrap">Know more</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT: Rating + Fee + Actions (Responsive) ── */}
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
          {/* Rating + Fee Row (1 line on mobile) */}
          <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            {/* Rating Section */}
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                {uni.reviews.toLocaleString()} Reviews
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-none">
                {uni.rating.toFixed(1)}
              </p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => {
                  const filled = uni.rating >= i;
                  const half = !filled && uni.rating >= i - 0.5;
                  return (
                    <span
                      key={i}
                      className="text-xs sm:text-sm leading-none"
                      style={{ color: filled || half ? "#F59E0B" : "#E5E7EB" }}
                    >
                      {filled ? "★" : half ? "⯨" : "☆"}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Fee Section */}
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                Fees
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                ₹{(uni.feePerSem / 1000).toFixed(0)}K
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500">
                /Semester
              </p>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => onSelect(uni.id)}
            className="w-full text-white font-bold py-1.5 sm:py-2 sm:py-2.5 px-2.5 sm:px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:opacity-90 text-xs sm:text-sm"
            style={{ backgroundColor: uni.buttonColor || "#DC2626" }}
          >
            View Details
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Compare Checkbox */}
          <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
            <div
              onClick={() => onCompareToggle(uni.id)}
              className={`w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                compareSelected
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-gray-300 bg-white group-hover:border-emerald-400"
              }`}
            >
              {compareSelected && (
                <svg
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-gray-900">
              Compare
            </span>
          </label>

          {/* Talk to Experts */}
          <button
            onClick={() => onExpertClick?.(uni.id)}
            className="text-xs font-semibold text-blue-600 hover:underline mt-auto pt-1 sm:pt-2 text-center"
          >
            {uni.expertLabel || "Talk to our experts"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Results List ──────────────────────────────────────────────────────────────

export default function UniversityResultsList({
  universities = mbaUniversities,
  onSelect,
  onExpertClick,
}: {
  universities?: University[];
  onSelect?: (id: string) => void;
  onExpertClick?: (id: string) => void;
}) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };

  return (
    <div className="space-y-4">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          uni={uni}
          onSelect={onSelect ?? (() => {})}
          compareSelected={compareList.includes(uni.id)}
          onCompareToggle={toggleCompare}
          onExpertClick={onExpertClick}
        />
      ))}

      {compareList.length >= 2 && (
        <div className="sticky bottom-4 flex justify-center">
          <button className="bg-emerald-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            Compare {compareList.length} Universities
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
