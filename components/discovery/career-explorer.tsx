// "use client";

// import { ArrowRight, Handshake } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";
// import { careerExplorer } from "@/data/career-explorer";

// const CareerExplorer = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <section className="px-4 pt-4 pb-12 sm:pt-6 sm:pb-12 min-h-screen -mt-8 sm:-mt-12 relative z-10">
//       <div className="max-w-7xl mx-auto text-center font-[Inter]">
//         <div className="mb-8 sm:mb-10">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Handshake className="h-3.5 w-3.5 text-red-500" />
//             Skill
//           </span>

//           <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
//             Enhance Skills by <span className="text-red-500">Industry</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 text-left">
//           {careerExplorer.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col transition-shadow duration-300 hover:shadow-md"
//             >
//               {/* Image Container - hover/tap sirf isi area pe trigger hoga */}
//               <div
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setOpenIndex((prev) => (prev === index ? null : index));
//                 }}
//                 className="group relative w-full h-[90px] sm:h-[110px] lg:h-[120px] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-3 sm:mb-4 shrink-0 cursor-pointer"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   className="object-cover"
//                 />

//                 {/* Hover overlay - sirf image area ke andar, size change nahi hota */}
//                 <div
//                   className={`absolute inset-0 flex flex-col justify-center gap-2 p-2.5 sm:p-3
//                              bg-[#1b1464]/90 transition-all duration-300 ease-out
//                              ${
//                                openIndex === index
//                                  ? "opacity-100 translate-y-0 pointer-events-auto"
//                                  : "opacity-0 translate-y-1 pointer-events-none"
//                              }
//                              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
//                 >
//                   <p className="text-white/90 text-[10px] sm:text-[11px] leading-snug line-clamp-3">
//                     {item.description ??
//                       "Explore top-ranked programs, career paths and industry insights in this field."}
//                   </p>

//                   <button
//                     type="button"
//                     className="self-start inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-white
//                                bg-white/10 hover:bg-white/20 border border-white/20
//                                rounded-full px-2.5 py-1 transition-colors"
//                   >
//                     Explore
//                     <ArrowRight size={10} />
//                   </button>
//                 </div>
//               </div>

//               {/* Text and Button Row - jaisa pehle tha, waisa hi */}
//               <div className="flex flex-col gap-1.5 sm:gap-2 mt-1 flex-1">
//                 <h3 className="font-bold leading-tight text-gray-900 text-[13px] sm:text-base line-clamp-2">
//                   {item.title}
//                 </h3>

//                 <div className="flex items-center justify-between gap-2 mt-auto">
//                   <p className="text-xs sm:text-sm font-bold text-red-500">
//                     {item.count}
//                   </p>

//                   <button
//                     type="button"
//                     className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0"
//                     aria-label={`View ${item.title}`}
//                   >
//                     <ArrowRight size={13} className="sm:hidden" />
//                     <ArrowRight size={15} className="hidden sm:block" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerExplorer;

// "use client";

// import { careerExplorerData } from "@/data/career-explorer";
// import { ArrowRight, Handshake } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";

// const CareerExplorer = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <section className="px-0 sm:px-1 lg:px-2 py-5 sm:py-7 relative z-10">
//       <div className="max-w-6xl mx-auto text-center font-[Inter]">
//         <div className="mb-5 sm:mb-6">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider">
//             <Handshake className="h-3.5 w-3.5 text-red-500" />
//             Skill
//           </span>

//           <h2 className="mt-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
//             Enhance Skills by <span className="text-red-500">Job Role</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 text-left">
//           {careerExplorerData.map((item, index) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 sm:p-2.5 flex flex-col transition-shadow duration-300 hover:shadow-md"
//             >
//               {/* Image Container */}
//               <div
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setOpenIndex((prev) => (prev === index ? null : index));
//                 }}
//                 className="group relative w-full h-16 sm:h-20 lg:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-2 sm:mb-2.5 shrink-0 cursor-pointer"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   className="object-cover"
//                 />

//                 {/* Hover overlay */}
//                 <div
//                   className={`absolute inset-0 flex flex-col justify-center gap-2 p-2.5 sm:p-3
//                              bg-[#1b1464]/90 transition-all duration-300 ease-out
//                              ${
//                                openIndex === index
//                                  ? "opacity-100 translate-y-0 pointer-events-auto"
//                                  : "opacity-0 translate-y-1 pointer-events-none"
//                              }
//                              group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
//                 >
//                   <p className="text-white/90 text-[9px] sm:text-[10px] leading-snug line-clamp-3">
//                     {item.description}
//                   </p>

//                   <button
//                     type="button"
//                     className="self-start inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold text-white
//                                bg-white/10 hover:bg-white/20 border border-white/20
//                                rounded-full px-2 py-0.5 transition-colors"
//                   >
//                     Explore
//                     <ArrowRight size={8} />
//                   </button>
//                 </div>
//               </div>

//               {/* Text and Button Row */}
//               <div className="flex items-center justify-between gap-1.5 flex-1">
//                 <h3 className="font-bold leading-tight text-gray-900 text-[11px] sm:text-sm line-clamp-2 flex-1">
//                   {item.title}
//                 </h3>

//                 <button
//                   type="button"
//                   className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-gray-200 bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0"
//                   aria-label={`View ${item.title}`}
//                 >
//                   <ArrowRight size={11} className="sm:hidden" />
//                   <ArrowRight size={12} className="hidden sm:block" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerExplorer;

// 7 AUG

// "use client";

// import { careerExplorerData } from "@/data/career-explorer";
// import { ArrowRight, Briefcase } from "lucide-react";
// import Image from "next/image";
// import React from "react";

// interface RoleColors {
//   bg: string;
//   border: string;
//   text: string;
// }

// const CareerExplorer = () => {
//   const getColors = (title: string): RoleColors => {
//     const colorMap: { [key: string]: RoleColors } = {
//       "Frontend Developer": {
//         bg: "bg-blue-50",
//         border: "border-blue-200",
//         text: "text-blue-500",
//       },
//       "React Developer": {
//         bg: "bg-blue-50",
//         border: "border-blue-200",
//         text: "text-blue-500",
//       },
//       "Backend Developer": {
//         bg: "bg-purple-50",
//         border: "border-purple-200",
//         text: "text-purple-500",
//       },
//       "Full Stack Developer": {
//         bg: "bg-indigo-50",
//         border: "border-indigo-200",
//         text: "text-indigo-500",
//       },
//       "Mobile Developer": {
//         bg: "bg-pink-50",
//         border: "border-pink-200",
//         text: "text-pink-500",
//       },
//       "DevOps Engineer": {
//         bg: "bg-cyan-50",
//         border: "border-cyan-200",
//         text: "text-cyan-500",
//       },
//       "Database Engineer": {
//         bg: "bg-emerald-50",
//         border: "border-emerald-200",
//         text: "text-emerald-500",
//       },
//       "UX Designer": {
//         bg: "bg-rose-50",
//         border: "border-rose-200",
//         text: "text-rose-500",
//       },
//       "UI Designer": {
//         bg: "bg-rose-50",
//         border: "border-rose-200",
//         text: "text-rose-500",
//       },
//       "Product Designer": {
//         bg: "bg-pink-50",
//         border: "border-pink-200",
//         text: "text-pink-500",
//       },
//       "Product Manager": {
//         bg: "bg-orange-50",
//         border: "border-orange-200",
//         text: "text-orange-500",
//       },
//       "Business Analyst": {
//         bg: "bg-amber-50",
//         border: "border-amber-200",
//         text: "text-amber-500",
//       },
//       "Data Analyst": {
//         bg: "bg-yellow-50",
//         border: "border-yellow-200",
//         text: "text-yellow-500",
//       },
//       "Account Manager": {
//         bg: "bg-lime-50",
//         border: "border-lime-200",
//         text: "text-lime-500",
//       },
//       "Data Scientist": {
//         bg: "bg-teal-50",
//         border: "border-teal-200",
//         text: "text-teal-500",
//       },
//       "AI Engineer": {
//         bg: "bg-teal-50",
//         border: "border-teal-200",
//         text: "text-teal-500",
//       },
//       "Solutions Architect": {
//         bg: "bg-slate-50",
//         border: "border-slate-200",
//         text: "text-slate-500",
//       },
//       "System Administrator": {
//         bg: "bg-slate-50",
//         border: "border-slate-200",
//         text: "text-slate-500",
//       },
//     };

//     return (
//       colorMap[title] || {
//         bg: "bg-red-50",
//         border: "border-red-200",
//         text: "text-red-500",
//       }
//     );
//   };

//   return (
//     <section className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 relative z-10">
//       <div className="max-w-6xl mx-auto font-[Inter]">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8 text-center">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Briefcase className="h-3.5 w-3.5 text-red-500" />
//             Skill
//           </span>

//           <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
//             Enhance Skills by <span className="text-red-500">Job Role</span>
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
//           {careerExplorerData.map((item) => {
//             const colors = getColors(item.title);

//             return (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-3.5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105"
//               >
//                 {/* Image Container - bigger now */}
//                 <div
//                   className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mb-2 overflow-hidden`}
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     className="object-contain p-2"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-2 line-clamp-1">
//                   {item.title}
//                 </h3>

//                 {/* Description removed to save height, or keep 1 line only */}
//                 <p className="hidden sm:block text-[11px] text-gray-600 mb-3 line-clamp-1">
//                   {item.description}
//                 </p>

//                 {/* Button - compact */}
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 font-semibold text-xs transition-colors"
//                   aria-label={`Explore ${item.title}`}
//                 >
//                   Explore
//                   <ArrowRight size={14} />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerExplorer;

// "use client";

// import { careerExplorerData } from "@/data/career-explorer";
// import { ArrowRight, Briefcase, TrendingUp } from "lucide-react";
// import Image from "next/image";
// import React from "react";

// interface RoleColors {
//   bg: string;
//   border: string;
//   text: string;
// }

// const CareerExplorer = () => {
//   const getColors = (title: string): RoleColors => {
//     const colorMap: { [key: string]: RoleColors } = {
//       "Frontend Developer": {
//         bg: "bg-blue-50",
//         border: "border-blue-200",
//         text: "text-blue-500",
//       },
//       "React Developer": {
//         bg: "bg-blue-50",
//         border: "border-blue-200",
//         text: "text-blue-500",
//       },
//       "Backend Developer": {
//         bg: "bg-purple-50",
//         border: "border-purple-200",
//         text: "text-purple-500",
//       },
//       "Full Stack Developer": {
//         bg: "bg-indigo-50",
//         border: "border-indigo-200",
//         text: "text-indigo-500",
//       },
//       "Mobile Developer": {
//         bg: "bg-pink-50",
//         border: "border-pink-200",
//         text: "text-pink-500",
//       },
//       "DevOps Engineer": {
//         bg: "bg-cyan-50",
//         border: "border-cyan-200",
//         text: "text-cyan-500",
//       },
//       "Database Engineer": {
//         bg: "bg-emerald-50",
//         border: "border-emerald-200",
//         text: "text-emerald-500",
//       },
//       "UX Designer": {
//         bg: "bg-rose-50",
//         border: "border-rose-200",
//         text: "text-rose-500",
//       },
//       "UI Designer": {
//         bg: "bg-rose-50",
//         border: "border-rose-200",
//         text: "text-rose-500",
//       },
//       "Product Designer": {
//         bg: "bg-pink-50",
//         border: "border-pink-200",
//         text: "text-pink-500",
//       },
//       "Product Manager": {
//         bg: "bg-orange-50",
//         border: "border-orange-200",
//         text: "text-orange-500",
//       },
//       "Business Analyst": {
//         bg: "bg-amber-50",
//         border: "border-amber-200",
//         text: "text-amber-500",
//       },
//       "Data Analyst": {
//         bg: "bg-yellow-50",
//         border: "border-yellow-200",
//         text: "text-yellow-500",
//       },
//       "Account Manager": {
//         bg: "bg-lime-50",
//         border: "border-lime-200",
//         text: "text-lime-500",
//       },
//       "Data Scientist": {
//         bg: "bg-teal-50",
//         border: "border-teal-200",
//         text: "text-teal-500",
//       },
//       "AI Engineer": {
//         bg: "bg-teal-50",
//         border: "border-teal-200",
//         text: "text-teal-500",
//       },
//       "Solutions Architect": {
//         bg: "bg-slate-50",
//         border: "border-slate-200",
//         text: "text-slate-500",
//       },
//       "System Administrator": {
//         bg: "bg-slate-50",
//         border: "border-slate-200",
//         text: "text-slate-500",
//       },
//     };

//     return (
//       colorMap[title] || {
//         bg: "bg-red-50",
//         border: "border-red-200",
//         text: "text-red-500",
//       }
//     );
//   };

//   return (
//     <section className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 relative z-10">
//       <div className="max-w-6xl mx-auto font-[Inter]">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8 text-center">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Briefcase className="h-3.5 w-3.5 text-red-500" />
//             Skill
//           </span>

//           <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
//             Enhance Skills by <span className="text-red-500">Job Role</span>
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
//           {careerExplorerData.map((item) => {
//             const colors = getColors(item.title);

//             return (
//               <div
//                 key={item.id}
//                 className="relative bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-3.5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105"
//               >
//                 {/* Highest Package Badge - top */}
//                 {item.package && (
//                   <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
//                     <TrendingUp size={10} />
//                     Up to {item.package}
//                   </div>
//                 )}

//                 {/* Image Container - bigger now */}
//                 <div
//                   className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mb-2 mt-1.5 overflow-hidden`}
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     className="object-contain p-2"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-2 line-clamp-1">
//                   {item.title}
//                 </h3>

//                 {/* Description removed to save height, or keep 1 line only */}
//                 <p className="hidden sm:block text-[11px] text-gray-600 mb-3 line-clamp-1">
//                   {item.description}
//                 </p>

//                 {/* Button - compact */}
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 font-semibold text-xs transition-colors"
//                   aria-label={`Explore ${item.title}`}
//                 >
//                   Explore
//                   <ArrowRight size={14} />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerExplorer;

"use client";

import { careerExplorerData } from "@/data/career-explorer";
import { ArrowRight, Briefcase, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

interface RoleColors {
  bg: string;
  border: string;
  text: string;
}

const CareerExplorer = () => {
  const getColors = (title: string): RoleColors => {
    const colorMap: { [key: string]: RoleColors } = {
      "Frontend Developer": {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-500",
      },
      "React Developer": {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-500",
      },
      "Backend Developer": {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-500",
      },
      "Full Stack Developer": {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-500",
      },
      "Mobile Developer": {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-500",
      },
      "DevOps Engineer": {
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        text: "text-cyan-500",
      },
      "Database Engineer": {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-500",
      },
      "UX Designer": {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-500",
      },
      "UI Designer": {
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-500",
      },
      "Product Designer": {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-500",
      },
      "Product Manager": {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-500",
      },
      "Business Analyst": {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-500",
      },
      "Data Analyst": {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-500",
      },
      "Account Manager": {
        bg: "bg-lime-50",
        border: "border-lime-200",
        text: "text-lime-500",
      },
      "Data Scientist": {
        bg: "bg-teal-50",
        border: "border-teal-200",
        text: "text-teal-500",
      },
      "AI Engineer": {
        bg: "bg-teal-50",
        border: "border-teal-200",
        text: "text-teal-500",
      },
      "Solutions Architect": {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-500",
      },
      "System Administrator": {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-500",
      },
    };

    return (
      colorMap[title] || {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-500",
      }
    );
  };

  return (
    <section className="px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 relative z-10">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Briefcase className="h-3.5 w-3.5 text-red-500" />
            Skill
          </span>

          <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Enhance Skills by <span className="text-red-500">Job Role</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {careerExplorerData.map((item) => {
            const colors = getColors(item.title);

            return (
              <div
                key={item.id}
                className="relative bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-3.5 pt-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105 overflow-hidden"
              >
                {/* Highest Package Badge */}
                {item.package && (
                  <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-0.5 bg-green-500 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    <TrendingUp size={9} className="animate-bounce" />
                    {item.package}
                  </div>
                )}

                {/* Image Container */}
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mb-2 overflow-hidden`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="hidden sm:block text-[11px] text-gray-600 mb-3 line-clamp-1">
                  {item.description}
                </p>

                {/* Button */}
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 font-semibold text-xs transition-colors"
                  aria-label={`Explore ${item.title}`}
                >
                  Explore
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;
