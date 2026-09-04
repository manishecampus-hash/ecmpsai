// "use client";

// import Link from "next/link";
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
//     <section className="relative z-10 w-full">
//   <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
//         {/* Header */}
//         <div className="mb-6 text-center">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Briefcase className="h-3.5 w-3.5 text-red-500" />
//             Skill
//           </span>

//           <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
//             Enhance Skills by{" "}
//             <span className="text-red-500">Job Role</span>
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
//           {careerExplorerData.map((item) => {
//             const colors = getColors(item.title);

//             return (
//               <div
//                 key={item.id}
//                 className="relative bg-white rounded-[6px] border border-gray-200 shadow-sm p-2 sm:p-3.5 pt-3 sm:pt-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105 overflow-hidden"
//               >
//                 {/* Highest Package Badge */}
//                 {item.package && (
//                   <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-0.5 bg-green-500 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
//                     <TrendingUp size={9} className="animate-bounce" />
//                     {item.package}
//                   </div>
//                 )}

//                 {/* Image Container */}
//                 <div
//                   className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mb-2 overflow-hidden`}
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     className="object-contain p-2"
//                   />
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-1 sm:mb-2 line-clamp-1">
//                   {item.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="hidden sm:block text-[11px] text-gray-600 mb-2 sm:mb-3 line-clamp-1">
//                   {item.description}
//                 </p>

//                 {/* Button */}
//                 <Link href={`/careers/${item.slug}`} passHref>
//                   <button
//                     type="button"
//                     className="w-full sm:w-auto inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-transparate-50 text-black-500 hover:bg-transparate-100 border border-transparate-200 font-semibold text-[11px] sm:text-xs transition-colors"
//                     aria-label={`Explore ${item.title}`}
//                   >
//                     Explore
//                     <ArrowRight
//                       size={12}
//                       className="sm:h-3.5 sm:w-3.5"
//                     />
//                   </button>
//                 </Link>
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
// import { ArrowRight, Briefcase, TrendingUp, X } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { ApplicationForm } from "@/components/form/common-form";

// interface RoleColors {
//   bg: string;
//   border: string;
//   text: string;
// }

// const CareerExplorer = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);

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

//   // Prevent background page scrolling while popup is open
//   useEffect(() => {
//     if (!isFormOpen) return;

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = originalOverflow;
//     };
//   }, [isFormOpen]);

//   // Close popup with Escape key
//   useEffect(() => {
//     if (!isFormOpen) return;

//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsFormOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isFormOpen]);

//   return (
//     <>
//       <section className="relative z-10 w-full">
//         <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
//           {/* Header */}
//           <div className="mb-6 text-center">
//             <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
//               <Briefcase className="h-3.5 w-3.5 text-red-500" />
//               Skill
//             </span>

//             <h2 className="mt-2 whitespace-nowrap text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
//               Enhance Skills by{" "}
//               <span className="text-red-500">Job Role</span>
//             </h2>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
//             {careerExplorerData.map((item) => {
//               const colors = getColors(item.title);

//               return (
//                 <div
//                   key={item.id}
//                   className="relative flex flex-col items-center overflow-hidden rounded-[6px] border border-gray-200 bg-white p-2 pt-3 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-md sm:p-3.5 sm:pt-4"
//                 >
//                   {/* Highest Package Badge */}
//                   {item.package && (
//                     <div className="absolute right-2 top-2 z-10 inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-green-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm sm:text-[9px]">
//                       <TrendingUp size={9} className="animate-bounce" />
//                       {item.package}
//                     </div>
//                   )}

//                   {/* Image Container */}
//                   <div
//                     className={`relative mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border sm:h-16 sm:w-16 ${colors.bg} ${colors.border}`}
//                   >
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       className="object-contain p-2"
//                     />
//                   </div>

//                   {/* Title */}
//                   <h3 className="mb-1 line-clamp-1 text-xs font-bold text-gray-900 sm:mb-2 sm:text-sm">
//                     {item.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="mb-2 hidden line-clamp-1 text-[11px] text-gray-600 sm:mb-3 sm:block">
//                     {item.description}
//                   </p>

//                   {/* Explore Button */}
//                   <button
//                     type="button"
//                     onClick={() => setIsFormOpen(true)}
//                     className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-[11px] font-semibold text-black transition-colors hover:bg-gray-50 sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
//                     aria-label={`Explore ${item.title}`}
//                   >
//                     Explore
//                     <ArrowRight
//                       size={12}
//                       className="sm:h-3.5 sm:w-3.5"
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ================= FORM POPUP ================= */}
//       {isFormOpen && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-5 sm:py-8"
//           onMouseDown={(e) => {
//             if (e.target === e.currentTarget) {
//               setIsFormOpen(false);
//             }
//           }}
//         >
//           {/* Popup */}
//           <div
//             className="relative z-[10000] flex max-h-[92vh] w-full max-w-md flex-col overflow-visible rounded-2xl bg-white shadow-2xl"
//             onMouseDown={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               type="button"
//               onClick={() => setIsFormOpen(false)}
//               className="absolute right-3 top-3 z-[10002] flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
//               aria-label="Close form"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {/* Form Container */}
//             <div className="relative z-[10001] max-h-[92vh] overflow-y-auto overflow-x-visible rounded-2xl bg-white">
//               <ApplicationForm
//                 onSubmit={() => {
//                   setIsFormOpen(false);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CareerExplorer;


// 31 Aug 




"use client";

import { careerExplorerData } from "@/data/career-explorer";
import { ArrowRight, BadgeCheck, Briefcase, BriefcaseBusiness, Lightbulb, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ApplicationForm } from "@/components/form/common-form";

interface RoleColors {
  bg: string;
  border: string;
  text: string;
}

const CareerExplorer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);

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

  // Prevent background page scrolling while popup is open
  useEffect(() => {
    if (!isFormOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isFormOpen]);

  // Close popup with Escape key
  useEffect(() => {
    if (!isFormOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFormOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFormOpen]);

  return (
    <>
      <section className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
          {/* Header */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Lightbulb className="h-3.5 w-3.5 text-red-500" />
              Upskill
            </span>

            <h2 className="mt-2 whitespace-nowrap text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Enhance Skills by{" "}
              <span className="text-red-500">Job Role</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {careerExplorerData.map((item, index) => {
              const colors = getColors(item.title);

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center overflow-hidden rounded-[6px] border border-gray-200 bg-white p-2 pt-3 text-center shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-md sm:p-3.5 sm:pt-4 ${
                    !showAllCards && index >= 4
                      ? "hidden lg:flex"
                      : ""
                  } ${
                    !showAllCards && index >= 10
                      ? "lg:hidden"
                      : ""
                  }`}
                >
                  {/* Highest Package Badge */}
                  {item.package && (
                    <div className="absolute right-2 top-2 z-10 inline-flex items-center gap-0.5 whitespace-nowrap rounded-full bg-green-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm sm:text-[9px]">
                      <TrendingUp size={9} className="animate-bounce" />
                      {item.package}
                    </div>
                  )}

                  {/* Image Container */}
                  <div
                    className={`relative mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border sm:h-16 sm:w-16 ${colors.bg} ${colors.border}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 line-clamp-1 text-xs font-bold text-gray-900 sm:mb-2 sm:text-sm">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-2 hidden line-clamp-1 text-[11px] text-gray-600 sm:mb-3 sm:block">
                    {item.description}
                  </p>

                  {/* Explore Button */}
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-[11px] font-semibold text-black transition-colors hover:bg-gray-50 sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                    aria-label={`Explore ${item.title}`}
                  >
                    Explore
                    <ArrowRight
                      size={12}
                      className="sm:h-3.5 sm:w-3.5"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* More Cards Button */}
          {careerExplorerData.length > 4 && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCards((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              >
                {showAllCards ? "Show Less" : "Show More"}
                <ArrowRight
                  size={15}
                  className={`transition-transform duration-300 ${
                    showAllCards ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= FORM POPUP ================= */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-5 sm:py-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsFormOpen(false);
            }
          }}
        >
          {/* Popup */}
          <div
            className="relative z-[10000] flex max-h-[92vh] w-full max-w-md flex-col overflow-visible rounded-2xl bg-white shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute right-3 top-3 z-[10002] flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
              aria-label="Close form"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Form Container */}
            <div className="relative z-[10001] max-h-[92vh] overflow-y-auto overflow-x-visible rounded-2xl bg-white">
              <ApplicationForm
                onSubmit={() => {
                  setIsFormOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerExplorer;