// "use client";

// import { useState } from "react";

// type SectionId = "degree" | "career" | "salary" | "rankings" | "blog";

// interface SubCard {
//     title: string;
//     badge: string;
//     desc: string;
//     cta: string;
//     extra?: string;
//     query: string;
// }

// interface RankRow {
//     num: string;
//     title: string;
//     badge: string;
//     badgeColor: string;
//     desc: string;
//     query: string;
// }

// const DEGREE_ITEMS: SubCard[] = [
//     { title: "Online MBA", badge: "Most popular", desc: "UGC-approved MBA from top private universities. Advance your management career.", cta: "Explore", query: "Show me online MBA programs under 2 lakh" },
//     { title: "Online BCA", badge: "Trending", desc: "3-year Computer Applications degree fully online. Best entry to tech.", cta: "Explore", query: "Show me online BCA programs available" },
//     { title: "Online MCA", badge: "High ROI", desc: "Master's in Computer Applications with AI and data science specialisations.", cta: "Explore", query: "Show me online MCA programs" },
//     { title: "Online BBA", badge: "Affordable", desc: "3-year business degree with marketing, finance, and HR electives.", cta: "Explore", query: "Show me online BBA programs" },
//     { title: "Online MCom", badge: "Commerce", desc: "Postgraduate commerce covering taxation, accounting, and finance management.", cta: "Explore", query: "Show me online MCom programs" },
//     { title: "Online MA", badge: "Liberal arts", desc: "Humanities, psychology, and social science masters from top colleges.", cta: "Explore", query: "Show me online MA programs" },
// ];

// const CAREER_ITEMS: SubCard[] = [
//     { title: "Career switch guide", badge: "Popular", desc: "Mapped pathways for switching industries with the right degree.", cta: "Explore", query: "Career switch paths for working professionals in India" },
//     { title: "Careers after MBA", badge: "Trending", desc: "Finance, marketing, consulting, and operations with salary data.", cta: "Explore", query: "Top careers after MBA in India with salary" },
//     { title: "Promotion roadmap", badge: "Career", desc: "Skills and certifications to fast-track your next promotion.", cta: "Explore", query: "How to get promoted faster in my current job" },
//     { title: "Tech career paths", badge: "Tech", desc: "Best roles after BCA, MCA, and B.Tech with salary benchmarks.", cta: "Explore", query: "Best tech career paths after BCA or MCA in India" },
//     { title: "Work abroad", badge: "Global", desc: "Degrees and skills that open international job opportunities.", cta: "Explore", query: "Work abroad options after online degree from India" },
//     { title: "Freelance paths", badge: "Flex", desc: "High-paying freelance careers you can start right after graduation.", cta: "Explore", query: "Freelance career options after BCA MCA India" },
// ];

// const SALARY_ITEMS: SubCard[] = [
//     { title: "Post-MBA salaries", badge: "₹8–22 LPA", desc: "Average CTC from top online MBA programs across India.", cta: "View data", query: "Average salary after online MBA in India 2024" },
//     { title: "Tech & data roles", badge: "₹6–35 LPA", desc: "Benchmarks for software engineering, data science, and AI roles.", cta: "View data", query: "Salary range for data science and software roles in India" },
//     { title: "Degree vs salary", badge: "2–3× hike", desc: "How much a postgrad degree bumps your current CTC on average.", cta: "View data", query: "Salary difference between BCA and MCA graduates India" },
//     { title: "City-wise salaries", badge: "Metro vs tier-2", desc: "Compare compensation across Bengaluru, Mumbai, Hyderabad, Pune.", cta: "View data", query: "City wise salary comparison for tech jobs India" },
//     { title: "Salary after upskilling", badge: "+40% avg", desc: "How much an online degree boosts your current package.", cta: "View data", query: "Expected salary hike after online MBA for working professionals" },
//     { title: "Fresher salaries", badge: "₹3–8 LPA", desc: "Starting salary ranges for BCA, MCA, and BBA freshers in 2024.", cta: "View data", query: "Freshers salary after online BCA MCA India 2024" },
// ];

// const RANK_ITEMS: RankRow[] = [
//     { num: "01", title: "Top online MBA universities", badge: "NAAC A+", badgeColor: "bg-amber-50 text-amber-800", desc: "Ranked by placement rate, faculty quality, and NAAC accreditation.", query: "Top 10 private universities for online MBA in India ranked" },
//     { num: "02", title: "Best BCA & MCA colleges", badge: "Tech", badgeColor: "bg-blue-50 text-blue-800", desc: "Strong tech curriculum and placement track record.", query: "Best private universities for online BCA and MCA in India" },
//     { num: "03", title: "Most affordable — under ₹2L", badge: "Budget", badgeColor: "bg-emerald-50 text-emerald-800", desc: "Quality private universities with annual fees under ₹2 lakh.", query: "Most affordable private universities under 2 lakh India" },
//     { num: "04", title: "Highest placement packages", badge: "Placements", badgeColor: "bg-amber-50 text-amber-800", desc: "Top recruiters, average and median CTC from graduating batches.", query: "Online MBA universities with highest placement packages India" },
//     { num: "05", title: "Best for working professionals", badge: "Flexible", badgeColor: "bg-violet-50 text-violet-800", desc: "Weekend classes, async learning, and industry-aligned curriculum.", query: "Best universities for online MBA for working professionals India" },
// ];

// const BLOG_ITEMS: SubCard[] = [
//     { title: "Online vs regular MBA", badge: "Guide", desc: "Cost, value, flexibility, and career outcomes fully compared.", cta: "Read", extra: "5 min", query: "Difference between online MBA and regular MBA which is better" },
//     { title: "Online degree for govt jobs?", badge: "Must read", desc: "UGC recognition, AICTE approval, and what recruiters actually think.", cta: "Read", extra: "4 min", query: "Is online degree valid for government jobs in India 2024" },
//     { title: "Scholarships guide 2024", badge: "Scholarships", desc: "All available scholarships — eligibility and application process.", cta: "Read", extra: "6 min", query: "Scholarship options for online degree programs in India 2024" },
//     { title: "Study while working", badge: "Tips", desc: "Time management tips for working professionals managing a degree.", cta: "Read", extra: "3 min", query: "How to balance job and online degree at the same time" },
//     { title: "Highest ROI degrees", badge: "Finance", desc: "Which degrees pay back the most within 3 years of graduation.", cta: "Read", extra: "5 min", query: "Online degrees with highest return on investment in India" },
//     { title: "NAAC vs NIRF explained", badge: "Explainer", desc: "Decode accreditation and ranking systems before you apply anywhere.", cta: "Read", extra: "4 min", query: "What is NAAC and NIRF ranking and how does it affect my degree" },
// ];

// const SECTIONS = [
//     {
//         id: "degree" as SectionId,
//         label: "Degree Finder",
//         sub: "Explore degrees matching your goals and budget",
//         iconColor: "bg-emerald-50 text-emerald-700",
//         cardHover: "hover:border-emerald-200",
//         badgeColor: "bg-emerald-50 text-emerald-800",
//         linkColor: "text-emerald-700",
//         icon: (
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" />
//             </svg>
//         ),
//     },
//     {
//         id: "career" as SectionId,
//         label: "Career Explorer",
//         sub: "Find careers aligned with your degree and ambitions",
//         iconColor: "bg-blue-50 text-blue-700",
//         cardHover: "hover:border-blue-200",
//         badgeColor: "bg-blue-50 text-blue-800",
//         linkColor: "text-blue-700",
//         icon: (
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//             </svg>
//         ),
//     },
//     {
//         id: "salary" as SectionId,
//         label: "Salary Insights",
//         sub: "Real salary data across roles and cities in India",
//         iconColor: "bg-green-50 text-green-800",
//         cardHover: "hover:border-green-200",
//         badgeColor: "bg-green-50 text-green-800",
//         linkColor: "text-green-800",
//         icon: (
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//             </svg>
//         ),
//     },
//     {
//         id: "rankings" as SectionId,
//         label: "University Rankings",
//         sub: "Trusted rankings to choose the right institution",
//         iconColor: "bg-amber-50 text-amber-700",
//         cardHover: "hover:border-amber-200",
//         badgeColor: "bg-amber-50 text-amber-800",
//         linkColor: "text-amber-700",
//         icon: (
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
//                 <path d="M4 22h16" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
//             </svg>
//         ),
//     },
//     {
//         id: "blog" as SectionId,
//         label: "Blog & Resources",
//         sub: "Expert guides for better education decisions",
//         iconColor: "bg-violet-50 text-violet-700",
//         cardHover: "hover:border-violet-200",
//         badgeColor: "bg-violet-50 text-violet-800",
//         linkColor: "text-violet-700",
//         icon: (
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//             </svg>
//         ),
//     },
// ];

// function SubCardGrid({ items, badge, hover, link }: { items: SubCard[]; badge: string; hover: string; link: string }) {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//             {items.map((item) => (
//                 <div key={item.title} className={`p-3 border border-gray-100 rounded-lg cursor-pointer transition-colors ${hover}`}>
//                     <div className="flex items-center justify-between mb-1">
//                         <span className="text-[12px] font-medium text-gray-800">{item.title}</span>
//                         <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badge}`}>{item.badge}</span>
//                     </div>
//                     <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
//                     <div className="flex items-center justify-between mt-2">
//                         <span className={`text-[11px] font-medium flex items-center gap-1 ${link}`}>
//                             {item.cta}
//                             <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                                 <path d="M5 12h14M12 5l7 7-7 7" />
//                             </svg>
//                         </span>
//                         {item.extra && <span className="text-[10px] text-gray-400">{item.extra} read</span>}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// function RankList({ items }: { items: RankRow[] }) {
//     return (
//         <div className="flex flex-col gap-2">
//             {items.map((r) => (
//                 <div key={r.num} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:border-amber-200 transition-colors">
//                     <span className="text-[20px] font-medium text-gray-200 min-w-[28px] leading-none">{r.num}</span>
//                     <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1 flex-wrap">
//                             <span className="text-[12px] font-medium text-gray-800">{r.title}</span>
//                             <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.badgeColor}`}>{r.badge}</span>
//                         </div>
//                         <p className="text-[11px] text-gray-500">{r.desc}</p>
//                     </div>
//                     <svg width="13" height="13" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0">
//                         <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default function DiscoverySections() {
//     const [open, setOpen] = useState<SectionId | null>(null);

//     const toggle = (id: SectionId) => setOpen((prev) => (prev === id ? null : id));

//     return (
//         <div className="flex flex-col gap-2">
//             {SECTIONS.map((sec) => {
//                 const isOpen = open === sec.id;
//                 return (
//                     <div key={sec.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">

//                         <button
//                             onClick={() => toggle(sec.id)}
//                             aria-expanded={isOpen}
//                             className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors text-left"
//                         >
//                             <div className="flex items-center gap-2.5">
//                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sec.iconColor}`}>
//                                     {sec.icon}
//                                 </div>
//                                 <div>
//                                     <p className="text-[13px] font-medium text-gray-800">{sec.label}</p>
//                                     <p className="text-[11px] text-gray-500 mt-0.5">{sec.sub}</p>
//                                 </div>
//                             </div>
//                             <svg
//                                 width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"
//                                 className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//                             >
//                                 <path d="m6 9 6 6 6-6" />
//                             </svg>
//                         </button>

//                         {isOpen && (
//                             <div className="border-t border-gray-100 p-4">
//                                 {sec.id === "degree" && <SubCardGrid items={DEGREE_ITEMS} badge={sec.badgeColor} hover={sec.cardHover} link={sec.linkColor} />}
//                                 {sec.id === "career" && <SubCardGrid items={CAREER_ITEMS} badge={sec.badgeColor} hover={sec.cardHover} link={sec.linkColor} />}
//                                 {sec.id === "salary" && <SubCardGrid items={SALARY_ITEMS} badge={sec.badgeColor} hover={sec.cardHover} link={sec.linkColor} />}
//                                 {sec.id === "rankings" && <RankList items={RANK_ITEMS} />}
//                                 {sec.id === "blog" && <SubCardGrid items={BLOG_ITEMS} badge={sec.badgeColor} hover={sec.cardHover} link={sec.linkColor} />}
//                             </div>
//                         )}

//                     </div>
//                 );
//             })}
//         </div>
//     );
// }


