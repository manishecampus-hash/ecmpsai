// "use client";

// import React from "react";
// import {
//   Globe2,
//   Laptop,
//   Sparkles,
//   CheckCircle,
//   GraduationCap,
// } from "lucide-react";

// interface WhyOnlineProps {
//   university?: {
//     name?: string;
//   };
// }

// export default function WhyOnline({ university }: WhyOnlineProps) {
//   const universityName = university?.name || "Amity University Online";

//   const benefits = [
//     {
//       id: "global",
//       title: "Globally Recognized",
//       description:
//         "Internationally aligned programs engineered and structurally vetted to meet worldwide rigorous higher education benchmarks.",
//       icon: Globe2,
//     },
//     {
//       id: "digital",
//       title: "Digital Advantage",
//       description:
//         "A state-of-the-art modern online learning ecosystem that natively reflects elite global university digital delivery standards.",
//       icon: Laptop,
//     },
//   ];

//   return (
//     /* ============================================================
//         WHY ONLINE SECTION WITH STICKY FRAME INTERACTION
//        ============================================================ */
//     <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
//       <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
//         {/* LEFT COLUMN: SCROLLABLE NARRATIVE DETAILS (Span 7) */}
//         <div className="space-y-8 lg:col-span-7">
//           <div>
//             <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600 sm:mb-4">
//               <Sparkles className="h-3.5 w-3.5" />
//               Why Choose Us
//             </span>
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
//               Earn a Globally <br />
//               <span className="text-red-500">Accepted Degree</span>
//             </h2>
//           </div>

//           {/* Core Intent Description Box Block */}
//           <p className="text-base text-gray-600 leading-relaxed sm:text-lg">
//             Choose <strong>{universityName}</strong> for flexible, accredited
//             programs uniquely tailored to real-world career growth. Gain
//             functional, high-value practical skills through elite expert faculty
//             mentorship pathways and deeply integrated industry-focused case
//             modules. Our advanced digital landscape ensures a completely
//             seamless, continuous, and engaging framework accessible from
//             anywhere.
//           </p>

//           {/* Render Visual Feature Row Items Blocks */}
//           <div className="space-y-6 pt-4 border-t border-slate-100">
//             {benefits.map((benefit) => {
//               const IconComponent = benefit.icon;
//               return (
//                 <div key={benefit.id} className="flex gap-4 group">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white shadow-md shadow-red-100 transition-transform duration-300 group-hover:scale-105">
//                     <IconComponent className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-red-500">
//                       {benefit.title}
//                     </h4>
//                     <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-xl">
//                       {benefit.description}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* RIGHT COLUMN: STICKY DEGREE CARD COMPONENT BOX FRAME (Span 5)
//             Uses lg:sticky and lg:top-24 to fix securely during scroll */}
//         <div className="lg:col-span-5 lg:sticky lg:top-24">
//           <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100/70 sm:p-8">
//             {/* Styled CSS Mock representation of the dynamic Degree Certificate frame */}
//             <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] rounded-xl border-[12px] border-slate-900 bg-amber-50/20 p-4 shadow-md ring-1 ring-slate-900/10">
//               {/* Internal Certificate Content Structures layout lines */}
//               <div className="h-full w-full border border-amber-800/20 p-3 flex flex-col justify-between text-center relative overflow-hidden">
//                 {/* Background decorative watermark seal layout effect */}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
//                   <GraduationCap className="h-40 w-40 text-slate-900" />
//                 </div>

//                 {/* Top header lines */}
//                 <div className="space-y-1.5 relative z-10">
//                   <div className="mx-auto h-5 w-5 rounded-full bg-slate-200" />
//                   <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">
//                     Amity University
//                   </p>
//                   <p className="text-[6px] font-medium text-slate-400 uppercase tracking-widest">
//                     Uttar Pradesh
//                   </p>
//                 </div>

//                 {/* Center award lines block context fields */}
//                 <div className="my-auto space-y-2 relative z-10">
//                   <p className="text-[6px] font-semibold italic text-slate-500">
//                     On recommendation of the Academic Council hereby confers
//                     upon
//                   </p>
//                   <p className="text-xs font-bold text-gray-900 border-b border-slate-200/80 pb-1 max-w-[140px] mx-auto tracking-tight">
//                     Graduate Scholar
//                   </p>
//                   <p className="text-[6px] font-semibold italic text-slate-500">
//                     the degree of
//                   </p>
//                   <p className="text-[9px] font-extrabold text-red-600 uppercase tracking-wide">
//                     Master of Business Administration
//                   </p>
//                 </div>

//                 {/* Bottom signatures and verification seal graphics */}
//                 <div className="flex items-end justify-between relative z-10">
//                   <div className="text-left">
//                     <div className="h-2 w-10 border-b border-slate-300" />
//                     <p className="text-[4px] mt-0.5 font-bold uppercase text-slate-400">
//                       Registrar
//                     </p>
//                   </div>

//                   {/* Red wax seal visualization asset replacement element */}
//                   <div className="h-7 w-7 rounded-full bg-red-500/90 flex items-center justify-center shadow-sm border border-red-600 animate-pulse">
//                     <div className="h-4 w-4 rounded-full border border-dashed border-white/40" />
//                   </div>

//                   <div className="text-right">
//                     <div className="h-2 w-10 border-b border-slate-300" />
//                     <p className="text-[4px] mt-0.5 font-bold uppercase text-slate-400">
//                       Vice Chancellor
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Micro verification floating pill confirmation underneath */}
//             <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
//               <CheckCircle className="h-4 w-4 text-green-500" />
//               <span>100% Verifiable Academic Credential</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
