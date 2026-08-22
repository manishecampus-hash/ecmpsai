// "use client";

// import React, { useRef } from "react";
// import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// interface Specialization {
//   id: string;
//   title: string;
//   tagline: string;
//   image: string;
// }

// const specializations: Specialization[] = [
//   {
//     id: "finance",
//     title: "Finance",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "marketing",
//     title: "Marketing",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "leadership",
//     title: "Strategic Leadership",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "healthcare",
//     title: "Healthcare Management",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "technology",
//     title: "Technology Management",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "global-business",
//     title: "Global Business Strategy",
//     tagline: "Right Choice for Right Education",
//     image:
//       "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&auto=format&fit=crop&q=80",
//   },
// ];

// export default function GGUSpecializationsCarousel() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const amount = 320;
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -amount : amount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="relative w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
//           <span className="text-red-500">Golden Gate University</span>{" "}
//           <span className="text-gray-900">Specializations</span>
//         </h2>

//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             type="button"
//             onClick={() => scroll("left")}
//             aria-label="Scroll left"
//             className="absolute left-0 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50"
//           >
//             <ChevronLeft className="h-4 w-4 text-gray-700" />
//           </button>

//           {/* Right Arrow */}
//           <button
//             type="button"
//             onClick={() => scroll("right")}
//             aria-label="Scroll right"
//             className="absolute right-0 top-1/3 z-10 translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50"
//           >
//             <ChevronRight className="h-4 w-4 text-gray-700" />
//           </button>

//           {/* Cards */}
//           <div
//             ref={scrollRef}
//             className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
//           >
//             {specializations.map((item) => (
//               <div
//                 key={item.id}
//                 className="min-w-[260px] max-w-[260px] shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
//               >
//                 <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />

//                   {/* Logo badge */}
//                   <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 shadow-sm">
//                     <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-red-500 text-[9px] font-bold text-white">
//                       GGU
//                     </span>
//                     <span className="text-[10px] font-bold leading-none text-gray-800">
//                       Golden Gate
//                       <br />
//                       University
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
//                     Golden Gate University
//                   </p>
//                   <h3 className="mt-1 text-base font-bold text-gray-900">
//                     {item.title}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{item.tagline}</p>

//                   <a
//                     href="#"
//                     className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600"
//                   >
//                     Read more
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Specialization {
  id: string;
  title: string;
  tagline: string;
  image: string;
}

const specializations: Specialization[] = [
  {
    id: "finance",
    title: "Finance",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "leadership",
    title: "Strategic Leadership",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "healthcare",
    title: "Healthcare Management",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "technology",
    title: "Technology Management",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "global-business",
    title: "Global Business Strategy",
    tagline: "Right Choice for Right Education",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&auto=format&fit=crop&q=80",
  },
];

export default function GGUSpecializationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="text-red-500">Golden Gate University</span>{" "}
          <span className="text-gray-900">Specializations</span>
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {specializations.map((item) => (
              <div
                key={item.id}
                className="min-w-[260px] max-w-[260px] shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  {/* Logo badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 shadow-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-red-500 text-[9px] font-bold text-white">
                      GGU
                    </span>
                    <span className="text-[10px] font-bold leading-none text-gray-800">
                      Golden Gate
                      <br />
                      University
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Golden Gate University
                  </p>
                  <h3 className="mt-1 text-base font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.tagline}</p>

                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
