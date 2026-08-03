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

"use client";

import { ArrowRight, Handshake } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const careerExplorerData = [
  {
    id: 1,
    title: "Software Developer",
    count: "580+ Courses",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop",
    description:
      "Master programming languages and build scalable applications.",
  },
  {
    id: 2,
    title: "AI & Machine Learning Engineer",
    count: "420+ Courses",
    image:
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=300&h=200&fit=crop",
    description: "Learn AI/ML algorithms, neural networks, and deep learning.",
  },
  {
    id: 3,
    title: "Data Scientist",
    count: "310+ Courses",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    description: "Analyze data and drive business decisions with insights.",
  },
  {
    id: 4,
    title: "Cyber Security Analyst",
    count: "250+ Courses",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52b8b93?w=300&h=200&fit=crop",
    description: "Protect systems and networks from security threats.",
  },
  {
    id: 5,
    title: "Cloud Engineer",
    count: "340+ Courses",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
    description: "Design and manage cloud infrastructure solutions.",
  },
  {
    id: 6,
    title: "Business Analyst",
    count: "290+ Courses",
    image:
      "https://images.unsplash.com/photo-1460925895917-adf4198c838d?w=300&h=200&fit=crop",
    description: "Analyze business needs and improve operational efficiency.",
  },
  {
    id: 7,
    title: "Product Manager",
    count: "320+ Courses",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    description: "Lead product strategy from concept to market launch.",
  },
  {
    id: 8,
    title: "Project Manager",
    count: "280+ Courses",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    description: "Oversee projects and ensure timely delivery of goals.",
  },
  {
    id: 9,
    title: "Digital Marketing Manager",
    count: "370+ Courses",
    image:
      "https://images.unsplash.com/photo-1611606063065-ab8b5035daaa?w=300&h=200&fit=crop",
    description: "Create and execute digital marketing campaigns.",
  },
  {
    id: 10,
    title: "Financial Analyst",
    count: "220+ Courses",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf35f?w=300&h=200&fit=crop",
    description:
      "Analyze financial data and provide investment recommendations.",
  },
  {
    id: 11,
    title: "Human Resources Manager",
    count: "190+ Courses",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    description: "Manage recruitment, training, and employee relations.",
  },
  {
    id: 12,
    title: "Hospital Administrator",
    count: "160+ Courses",
    image:
      "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=300&h=200&fit=crop",
    description: "Oversee hospital operations and healthcare services.",
  },
  {
    id: 13,
    title: "UI/UX Designer",
    count: "400+ Courses",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    description: "Design intuitive interfaces and user experiences.",
  },
  {
    id: 14,
    title: "Mechanical Engineer",
    count: "270+ Courses",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop",
    description: "Design and develop mechanical systems and equipment.",
  },
  {
    id: 15,
    title: "Civil Engineer",
    count: "240+ Courses",
    image:
      "https://images.unsplash.com/photo-1581092895033-37fb195c6b38?w=300&h=200&fit=crop",
    description: "Plan and build infrastructure projects.",
  },
];

const CareerExplorer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-0 sm:px-1 lg:px-2 py-5 sm:py-7 relative z-10">
      <div className="max-w-6xl mx-auto text-center font-[Inter]">
        <div className="mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Skill
          </span>

          <h2 className="mt-2 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Enhance Skills by <span className="text-red-500">Job Role</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 text-left">
          {careerExplorerData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 sm:p-2.5 flex flex-col transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image Container */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex((prev) => (prev === index ? null : index));
                }}
                className="group relative w-full h-16 sm:h-20 lg:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-2 sm:mb-2.5 shrink-0 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center gap-2 p-2.5 sm:p-3
                             bg-[#1b1464]/90 transition-all duration-300 ease-out
                             ${
                               openIndex === index
                                 ? "opacity-100 translate-y-0 pointer-events-auto"
                                 : "opacity-0 translate-y-1 pointer-events-none"
                             }
                             group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
                >
                  <p className="text-white/90 text-[9px] sm:text-[10px] leading-snug line-clamp-3">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    className="self-start inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold text-white
                               bg-white/10 hover:bg-white/20 border border-white/20
                               rounded-full px-2 py-0.5 transition-colors"
                  >
                    Explore
                    <ArrowRight size={8} />
                  </button>
                </div>
              </div>

              {/* Text and Button Row */}
              <div className="flex items-center justify-between gap-1.5 flex-1">
                <h3 className="font-bold leading-tight text-gray-900 text-[11px] sm:text-sm line-clamp-2 flex-1">
                  {item.title}
                </h3>

                <button
                  type="button"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-gray-200 bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0"
                  aria-label={`View ${item.title}`}
                >
                  <ArrowRight size={11} className="sm:hidden" />
                  <ArrowRight size={12} className="hidden sm:block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerExplorer;
