"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from "recharts";

const salaries = [
    { id: "phd", title: "PhD / Doctorate", avg: "10 - 30 LPA", avgValue: 20, percentage: 95, color: "#f43f5e", roles: "Research Scientist, Professor, R&D Head" },
    { id: "mba", title: "Online MBA", avg: "12 - 25 LPA", avgValue: 18.5, percentage: 90, color: "#10b981", roles: "Product Manager, Consultant, Business Analyst" },
    { id: "mca", title: "Online MCA", avg: "8 - 18 LPA", avgValue: 13, percentage: 75, color: "#8b5cf6", roles: "Software Engineer, Data Analyst" },
    { id: "bca", title: "Online BCA", avg: "4 - 8 LPA", avgValue: 6, percentage: 45, color: "#3b82f6", roles: "Web Developer, Software Tester" },
    { id: "bba", title: "Online BBA", avg: "3 - 7 LPA", avgValue: 5, percentage: 35, color: "#f59e0b", roles: "Operations Executive, Marketing Associate" },
];

export default function SalaryInsights() {
    return (
        <section className="px-6 py-12 bg-white">
            <div className="max-w-3xl mx-auto">
                {/* Unified Header with Badge */}
                <div className="mb-10 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
                        <TrendingUp size={11} />
                        Salary Insights
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Earning Potential</h2>
                </div>

                {/* Actual horizontal bar graph comparing avg LPA across degrees */}
                <div className="w-full h-[280px] mb-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={salaries}
                            layout="vertical"
                            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        >
                            <XAxis type="number" domain={[0, 32]} tickFormatter={(v) => `${v} LPA`} tick={{ fontSize: 12, fill: "#6b7280" }} />
                            <YAxis type="category" dataKey="title" width={120} tick={{ fontSize: 12, fill: "#374151" }} />
                            <Tooltip
                                formatter={(value: number) => [`${value} LPA`, "Avg salary"]}
                                cursor={{ fill: "rgba(0,0,0,0.03)" }}
                            />
                            <Bar dataKey="avgValue" radius={[0, 6, 6, 0]} barSize={28}>
                                {salaries.map((s) => (
                                    <Cell key={s.id} fill={s.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Existing role-tagged progress bars kept below for detail view */}
                <div className="space-y-7">
                    {salaries.map((s, i) => (
                        <div key={s.id} className="group flex items-center gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                                {i + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="font-semibold text-gray-800">{s.title}</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{s.roles}</p>

                                <div className="relative w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 shadow-sm"
                                        style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
                                    >
                                        <span className="text-[11px] font-bold text-white whitespace-nowrap">
                                            {s.avg}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        *Note: Salary ranges are based on industry averages and may vary based on experience,
                        institution prestige, and specific job roles. These figures represent potential
                        post-graduation estimates for the year 2026.
                    </p>
                </div>
            </div>
        </section>
    );
}