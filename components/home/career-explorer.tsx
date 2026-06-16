// "use client";

// import { useRef } from "react";
// import Link from "next/link";
// import { Brain, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// const careerExplorer = [
//   {
//     slug: "data-analyst",
//     title: "Data Analyst",
//     description:
//       "Turn raw data into insights. Master SQL, Python, and visualization tools to drive decisions.",
//     gradient: "from-blue-50 to-blue-100",
//     accentColor: "#2563eb",
//     bgColor: "#ffffff",
//     initials: "DA",
//     icon: (
//       <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//         <rect x="8" y="32" width="10" height="24" rx="2" fill="#2563eb" />
//         <rect x="22" y="20" width="10" height="36" rx="2" fill="#60a5fa" />
//         <rect x="36" y="12" width="10" height="44" rx="2" fill="#93c5fd" />
//         <rect x="50" y="24" width="10" height="32" rx="2" fill="#bfdbfe" />
//       </svg>
//     ),
//   },
//   {
//     slug: "product-manager",
//     title: "Product Manager",
//     description:
//       "Lead product vision and roadmap. Bridge business goals, user needs, and engineering delivery.",
//     gradient: "from-violet-50 to-violet-100",
//     accentColor: "#9333ea",
//     bgColor: "#ffffff",
//     initials: "PM",
//     icon: (
//       <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//         <rect
//           x="6"
//           y="8"
//           width="52"
//           height="36"
//           rx="4"
//           stroke="#9333ea"
//           strokeWidth="2"
//         />
//         <rect x="12" y="14" width="18" height="10" rx="2" fill="#9333ea" />
//         <rect x="34" y="14" width="18" height="10" rx="2" fill="#c084fc" />
//       </svg>
//     ),
//   },
//   {
//     slug: "hr-manager",
//     title: "HR Manager",
//     description:
//       "Shape company culture and talent. Lead hiring, performance, and people operations at scale.",
//     gradient: "from-green-50 to-green-100",
//     accentColor: "#16a34a",
//     bgColor: "#ffffff",
//     initials: "HR",
//     icon: (
//       <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//         <circle
//           cx="32"
//           cy="18"
//           r="10"
//           stroke="#16a34a"
//           strokeWidth="2"
//         />
//         <path
//           d="M14 54c0-9.94 8.06-18 18-18s18 8.06 18 18"
//           stroke="#16a34a"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//   },
//   {
//     slug: "marketing-manager",
//     title: "Marketing Manager",
//     description:
//       "Drive growth through campaigns, brand strategy, and data-driven marketing funnels.",
//     gradient: "from-orange-50 to-orange-100",
//     accentColor: "#ea580c",
//     bgColor: "#ffffff",
//     initials: "MM",
//     icon: (
//       <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//         <path
//           d="M8 40 L20 28 L32 34 L44 14 L56 20"
//           stroke="#ea580c"
//           strokeWidth="2.5"
//           fill="none"
//         />
//       </svg>
//     ),
//   },
// ];

// export default function CareerExplorer() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({
//       left: -620,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({
//       left: 620,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="py-20 bg-white">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6">





//         <div className="mx-auto text-center mb-8 border-b border-slate-100 pb-6 max-w-3xl">
//           <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
//             <Brain size={11} />
//             Career
//           </div>
//           <h2 className="mt-2 text-2xl font-bold text-gray-800 tracking-tight sm:text-3xl md:text-4xl">
//             Career Explorerrr{" "}

//           </h2>
//         </div>

//         <div className="relative group/slider">
//           {/* Left Arrow */}
//           <button
//             onClick={scrollLeft}
//             aria-label="Scroll left"
//             className="
//               hidden md:flex
//               absolute left-0 top-[110px]
//               -translate-x-1/2
//               z-20
//               h-10 w-10
//               items-center justify-center
//               rounded-full
//               bg-white
//               border border-zinc-200
//               shadow-lg
//               opacity-0
//               group-hover/slider:opacity-100
//               hover:scale-110
//               transition-all
//             "
//           >
//             <ChevronLeft className="h-5 w-5 text-zinc-900" />
//           </button>

//           {/* Right Arrow */}
//           <button
//             onClick={scrollRight}
//             aria-label="Scroll right"
//             className="
//               hidden md:flex
//               absolute right-0 top-[110px]
//               translate-x-1/2
//               z-20
//               h-10 w-10
//               items-center justify-center
//               rounded-full
//               bg-white
//               border border-zinc-200
//               shadow-lg
//               opacity-0
//               group-hover/slider:opacity-100
//               hover:scale-110
//               transition-all
//             "
//           >
//             <ChevronRight className="h-5 w-5 text-zinc-900" />
//           </button>

//           {/* Cards */}
//           <div
//             ref={scrollRef}
//             className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//           >
//             {careerExplorer.map((career) => (
//               <Link
//                 key={career.slug}
//                 href={`/search?q=${encodeURIComponent(career.title)}`}
//                 className="
//                   group
//                   flex-shrink-0
//                   w-[280px]
//                   sm:w-[240px]
//                 "
//               >
//                 {/* Card */}
//                 <div
//                   className="
//                     relative
//                     h-[220px]
//                     rounded-3xl
//                     overflow-hidden
//                     border
//                     border-zinc-200
//                     bg-white
//                     shadow-sm
//                     hover:shadow-xl
//                     transition-all
//                     duration-300
//                   "
//                 >
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-br ${career.gradient}`}
//                   />

//                   <div
//                     className="absolute inset-0 opacity-30"
//                     style={{
//                       backgroundImage: `linear-gradient(${career.accentColor}20 1px, transparent 1px),
//                       linear-gradient(90deg, ${career.accentColor}20 1px, transparent 1px)`,
//                       backgroundSize: "24px 24px",
//                     }}
//                   />

//                   <div
//                     className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl"
//                     style={{
//                       backgroundColor: `${career.accentColor}25`,
//                     }}
//                   />

//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="group-hover:scale-110 transition-transform duration-500">
//                       {career.icon}
//                     </div>
//                   </div>

//                   <div
//                     className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
//                     style={{
//                       color: career.accentColor,
//                       backgroundColor: `${career.accentColor}15`,
//                     }}
//                   >
//                     {career.initials}
//                   </div>

//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
//                     <div
//                       className="w-8 h-8 rounded-full flex items-center justify-center"
//                       style={{
//                         backgroundColor: career.accentColor,
//                       }}
//                     >
//                       <ChevronRight className="h-4 w-4 text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <h3 className="text-lg font-bold text-zinc-900">
//                     {career.title}
//                   </h3>

//                   <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
//                     {career.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }