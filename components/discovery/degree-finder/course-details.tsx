'use client';

import React from 'react';
import Link from 'next/link';

export default function CourseDetailsPage({
    course,
    onBack,
}: {
    course: any;
    onBack: () => void;
}) {
    if (!course) return null;

    const careerPath = course.careerPath ?? [];

    // Compute bar widths relative to max salary value
    const parseSalary = (s: string) => {
        if (!s) return 0;
        const match = s.match(/[\d.]+/g);
        if (!match) return 0;
        // take last number (upper bound)
        return parseFloat(match[match.length - 1]);
    };
    const maxVal = Math.max(...careerPath.map((c: any) => parseSalary(c.salary)), 1);

    const barColors = [
        'bg-emerald-200',
        'bg-emerald-400',
        'bg-emerald-500',
        'bg-emerald-600',
        'bg-emerald-700',
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-300">
            <button
                type="button"
                onClick={onBack}
                className="mb-4 text-[11px] font-semibold text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl transition-all"
            >
                ← Back
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* ── Header ── */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                    <div className="text-3xl leading-none">{course.emoji}</div>
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            {course.tag}
                        </span>
                        <h1 className="text-base font-bold text-gray-900 mt-0.5 truncate">
                            {course.title}
                        </h1>
                        <p className="text-xs text-gray-400 truncate">{course.highlight}</p>
                    </div>
                </div>

                <div className="px-5 py-4 space-y-5">

                    {/* ── Stats row ── */}
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'Duration', value: course.duration, icon: '🕐' },
                            { label: 'Fees', value: course.avgFees, icon: '💰' },
                            { label: 'Salary', value: course.avgSalary, icon: '📈' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5"
                            >
                                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">
                                    {item.icon} {item.label}
                                </p>
                                <p className="text-xs font-semibold text-gray-800 leading-tight">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ── About ── */}
                    <Section title="About">
                        <p className="text-xs text-gray-500 leading-relaxed">{course.desc}</p>
                    </Section>

                    {/* ── Eligibility ── */}
                    <Section title="Eligibility">
                        <p className="text-xs text-gray-500">{course.eligibility}</p>
                    </Section>

                    {/* ── Salary Growth Chart ── */}
                    {careerPath.length > 0 && (
                        <Section title="Salary Growth Path">
                            <div className="space-y-2.5">
                                {careerPath.map((item: any, i: number) => {
                                    const pct = Math.round((parseSalary(item.salary) / maxVal) * 100);
                                    return (
                                        <div key={i}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[11px] font-medium text-gray-700 truncate max-w-[55%]">
                                                    {item.role}
                                                </span>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="text-[10px] text-gray-400">{item.year}</span>
                                                    <span className="text-[11px] font-semibold text-emerald-600">
                                                        {item.salary}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-gray-100">
                                                <div
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${barColors[Math.min(i, barColors.length - 1)]}`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-2 text-[10px] text-gray-400">
                                Based on industry reports & alumni data
                            </p>
                        </Section>
                    )}

                    {/* ── Top Roles ── */}
                    {course.topRoles?.length > 0 && (
                        <Section title="Top Career Roles">
                            <TagList items={course.topRoles} color="gray" />
                        </Section>
                    )}

                    {/* ── Skills ── */}
                    {course.topSkills?.length > 0 && (
                        <Section title="Key Skills">
                            <TagList items={course.topSkills} color="blue" />
                        </Section>
                    )}

                    {/* ── Industries ── */}
                    {course.industries?.length > 0 && (
                        <Section title="Hiring Industries">
                            <TagList items={course.industries} color="green" />
                        </Section>
                    )}

                    {/* ── Universities ── */}
                    {course.topUniversities?.length > 0 && (
                        <Section title="Top Universities">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {course.topUniversities.map((uni: string) => (
                                    <div
                                        key={uni}
                                        className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700 leading-snug"
                                    >
                                        🎓 {uni}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* ── Certifications ── */}
                    {course.certifications?.length > 0 && (
                        <Section title="Recommended Certifications">
                            <div className="space-y-1.5">
                                {course.certifications.map((cert: string) => (
                                    <div
                                        key={cert}
                                        className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                                    >
                                        🏅 {cert}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* ── Job Market ── */}
                    {course.jobMarket && (
                        <Section title="Job Market Outlook">
                            <p className="text-xs text-gray-500 leading-relaxed">{course.jobMarket}</p>
                        </Section>
                    )}

                    {/* ── CTA ── */}
                    <Link
                        href={`/programs/${course.id}`}
                        className="inline-block text-[10px] font-medium py-1.5 px-3 rounded-lg bg-gray-900 text-white text-center mt-2"
                    >
                        View More →
                    </Link>

                </div>
            </div>
        </div>
    );
}

/* ── Helpers ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
                {title}
            </h2>
            {children}
        </div>
    );
}

const tagColorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
};

function TagList({ items, color }: { items: string[]; color: 'gray' | 'blue' | 'green' }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((item: string) => (
                <span
                    key={item}
                    className={`px-2.5 py-1 rounded-full text-xs ${tagColorMap[color]}`}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}