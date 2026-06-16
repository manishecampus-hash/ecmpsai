"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

const universities = [
    { rank: 1, name: "BITS Pilani", score: "98.2", badge: "NIRF Top 10" },
    { rank: 2, name: "Amity University Online", score: "95.5", badge: "QS Ranked" },
    { rank: 3, name: "Manipal University Jaipur", score: "92.1", badge: "Accredited" },
    { rank: 4, name: "Chandigarh University", score: "89.8", badge: "NAAC A+" },
    { rank: 5, name: "Graphic Era University", score: "87.4", badge: "UGC Approved" },
];

export default function UniversityRankings() {
    return (
        <section className="px-6 py-12 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Unified Header with Badge */}
                <div className="mb-10 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
                        <GraduationCap size={11} />
                        Top Universities
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        University Rankings
                    </h2>

                </div>

                {/* Table Container */}
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Rank</th>
                                <th className="px-6 py-4 font-semibold">University</th>
                                <th className="px-6 py-4 font-semibold">Accreditation</th>
                                <th className="px-6 py-4 font-semibold text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {universities.map((uni) => (
                                <tr key={uni.rank} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-5 font-bold text-gray-900">#{uni.rank}</td>
                                    <td className="px-6 py-5 font-medium text-gray-800">{uni.name}</td>
                                    <td className="px-6 py-5">
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                            {uni.badge}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right font-semibold text-gray-900">{uni.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}