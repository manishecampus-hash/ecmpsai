// 'use client';

// import React, { useState, useRef } from 'react';
// import Link from 'next/link';
// import { degrees } from '@/data/degree-data';

// // Degree type buttons
// const degreeTypes = [
//     { id: 'pg', label: 'PG Courses', emoji: '🎓', category: 'pg' },
//     { id: 'gen-ai', label: 'Gen AI/Agentic AI', emoji: '🤖', category: 'gen-ai' },
//     { id: 'executive', label: 'Executive Education', emoji: '🏆', category: 'executive' },
//     { id: 'phd', label: 'Doctorate/Ph.D.', emoji: '📜', category: 'phd' },
//     { id: 'ug', label: 'UG Courses', emoji: '📚', category: 'ug' },
//     { id: 'engineering', label: 'Engineering', emoji: '⚙️', category: 'engineering' },
//     { id: 'study-abroad', label: 'Study Abroad', emoji: '✈️', category: 'study-abroad' },
//     { id: 'skill', label: 'Skilling & Certificate', emoji: '🛠️', category: 'skill' },
// ];

// // Map degree-type id → which category values in degree-data to show
// const categoryMap: Record<string, string[]> = {
//     pg: ['Management', 'Finance', 'Arts'],   // MBA, MCom, MA, MCA, MSc = PG
//     'gen-ai': ['Tech'],
//     executive: ['Management'],
//     phd: [],
//     ug: ['UG'],
//     engineering: ['Tech'],
//     'study-abroad': [],
//     skill: [],
// };

// // Override: some ids map directly to specific degree ids
// const idOverrideMap: Record<string, string[]> = {
//     pg: ['mba', 'mca', 'mcom', 'ma', 'msc-ds', 'pgdm'],
//     'gen-ai': ['mca', 'msc-ds'],
//     executive: ['pgdm', 'mba'],
//     ug: ['bca', 'bba'],
//     engineering: ['bca', 'mca', 'msc-ds'],
//     skill: ['bca', 'bba'],
// };

// export default function DegreeFinder() {
//     const [selected, setSelected] = useState<string | null>(null);
//     const cardsRef = useRef<HTMLDivElement>(null);

//     const handleSelect = (id: string) => {
//         setSelected(prev => prev === id ? null : id);
//         // Smooth scroll to cards after state update
//         setTimeout(() => {
//             cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }, 100);
//     };

//     const filteredDegrees = selected
//         ? degrees.filter(d => (idOverrideMap[selected] ?? []).includes(d.id))
//         : [];

//     const selectedLabel = degreeTypes.find(d => d.id === selected)?.label;

//     return (
//         <div className="flex flex-col items-center px-6 py-10">

//             {/* Heading */}
//             <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
//                 Which Degree are you interested in?
//             </h2>
//             <p className="text-sm text-gray-400 mb-8 text-center">
//                 Click a category to explore matching programs
//             </p>

//             {/* Degree Type Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 justify-center w-full max-w-5xl">
//                 {degreeTypes.map((degree) => (
//                     <button
//                         key={degree.id}
//                         onClick={() => handleSelect(degree.id)}
//                         className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 w-full aspect-square
//                             ${selected === degree.id
//                                 ? 'border-gray-900 bg-white text-gray-700 shadow-lg scale-105'
//                                 : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md'
//                             }`}
//                     >
//                         <span className="text-3xl mb-2">{degree.emoji}</span>
//                         <span className="text-xs font-semibold text-center leading-tight">
//                             {degree.label}
//                         </span>
//                     </button>
//                 ))}
//             </div>

//             {/* Filtered Course Cards */}
//             {selected && (
//                 <div ref={cardsRef} className="w-full max-w-6xl mt-12">

//                     {/* Section Header */}
//                     <div className="flex items-center justify-between mb-6 px-1">
//                         <div>
//                             <h3 className="text-xl font-bold text-gray-900">
//                                 {selectedLabel}
//                             </h3>
//                             <p className="text-sm text-gray-400 mt-0.5">
//                                 {filteredDegrees.length} program{filteredDegrees.length !== 1 ? 's' : ''} found
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => setSelected(null)}
//                             className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl transition-all"
//                         >
//                             Clear ✕
//                         </button>
//                     </div>

//                     {/* No Results */}
//                     {filteredDegrees.length === 0 && (
//                         <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
//                             <p className="text-3xl mb-3">🔎</p>
//                             <p className="text-gray-600 font-semibold">Coming Soon</p>
//                             <p className="text-gray-400 text-sm mt-1">
//                                 Programs for this category are being added.
//                             </p>
//                         </div>
//                     )}

//                     {/* Cards Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                         {filteredDegrees.map((d) => (
//                             <div
//                                 key={d.id}
//                                 className="bg-white rounded-3xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
//                             >
//                                 <div className="p-6 flex-1">

//                                     {/* Tag + Emoji */}
//                                     <div className="flex items-center justify-between mb-4">
//                                         <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                                             {d.tag}
//                                         </span>
//                                         <span className="text-2xl">{d.emoji}</span>
//                                     </div>

//                                     {/* Title */}
//                                     <h3 className="text-lg font-bold text-gray-900 mb-1">{d.title}</h3>
//                                     <p className="text-xs font-medium text-gray-500 mb-4">{d.highlight}</p>

//                                     {/* Avg Salary */}
//                                     <div className="bg-gray-900 rounded-2xl px-4 py-3 mb-4 flex items-center justify-between">
//                                         <div>
//                                             <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Avg. Salary</p>
//                                             <p className="text-base font-bold text-white">{d.avgSalary}</p>
//                                         </div>
//                                         <span className="text-xl">💰</span>
//                                     </div>

//                                     {/* Top Roles */}
//                                     <div className="mb-4">
//                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Top Job Roles</p>
//                                         <div className="flex flex-wrap gap-1.5">
//                                             {d.topRoles.map((role) => (
//                                                 <span
//                                                     key={role}
//                                                     className="text-[11px] font-medium bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-full"
//                                                 >
//                                                     {role}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Stats */}
//                                     <div className="grid grid-cols-2 gap-3 mb-4">
//                                         <div className="bg-gray-50 rounded-2xl px-3 py-2.5 border border-gray-100">
//                                             <p className="text-xs text-gray-400 mb-0.5">Duration</p>
//                                             <p className="text-sm font-semibold text-gray-800">⏳ {d.duration}</p>
//                                         </div>
//                                         <div className="bg-gray-50 rounded-2xl px-3 py-2.5 border border-gray-100">
//                                             <p className="text-xs text-gray-400 mb-0.5">Total Fees</p>
//                                             <p className="text-sm font-semibold text-gray-800">💰 {d.avgFees}</p>
//                                         </div>
//                                     </div>

//                                     {/* Eligibility */}
//                                     <div className="text-xs text-gray-500 mb-3">
//                                         <span className="font-semibold text-gray-700">Eligibility: </span>
//                                         {d.eligibility}
//                                     </div>

//                                     {/* Desc */}
//                                     <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
//                                 </div>

//                                 {/* Footer */}
//                                 <div className="px-6 pb-5">
//                                     <Link
//                                         href={`/discovery/degree/${d.id}`}
//                                         className="block w-full text-sm font-semibold py-2.5 rounded-2xl bg-gray-900 text-white text-center hover:bg-gray-700 transition-all"
//                                     >
//                                         Explore Program →
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }