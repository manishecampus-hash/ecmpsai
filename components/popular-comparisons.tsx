'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, XCircle, Sparkles, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { universities, formatFee } from '@/lib/data';

type University = typeof universities[0];

const POPULAR_PAIRS: [string, string][] = [
    ['amity', 'manipal'],
    ['symbiosis', 'amity'],
    ['lpu', 'manipal'],
    ['ignou', 'lpu'],
];

const PAIR_LABELS: Record<string, string> = {
    'amity-manipal': 'Most Compared',
    'symbiosis-amity': 'Premium Pick',
    'lpu-manipal': 'Top Rated',
    'ignou-lpu': 'Best Value',
};

const COMPARISON_ROWS = [
    { key: 'fee', label: 'Total Fee' },
    { key: 'naac', label: 'NAAC Grade' },
    { key: 'placement', label: 'Placement Rate' },
    { key: 'emi', label: 'EMI Option' },
    { key: 'rating', label: 'Student Rating' },
    { key: 'mode', label: 'Mode of Study' },
    { key: 'programs', label: 'Programs Offered' },
    { key: 'established', label: 'Established' },
    { key: 'avgSalary', label: 'Avg Package' },
];

function getCellValue(uni: University, key: string) {
    switch (key) {
        case 'fee': return { display: formatFee(uni.avgFee), raw: uni.avgFee };
        case 'naac': return { display: uni.naac, raw: uni.naac === 'A+' ? 2 : 1 };
        case 'placement': return { display: `${uni.placementRate}%`, raw: uni.placementRate };
        case 'emi': return { display: uni.emi ? 'Yes' : 'No', raw: uni.emi ? 1 : 0 };
        case 'rating': return { display: `${uni.rating} / 5`, raw: uni.rating };
        case 'mode': return { display: uni.mode.join(', '), raw: 0 };
        case 'programs': return { display: `${uni.programs.length} programs`, raw: uni.programs.length };
        case 'established': return { display: String(uni.established), raw: uni.established };
        case 'avgSalary': return { display: `₹${(uni.avgSalary / 100000).toFixed(1)}L`, raw: uni.avgSalary };
        default: return { display: '—', raw: 0 };
    }
}

function isBetter(key: string, a: University, b: University) {
    const aVal = getCellValue(a, key).raw as number;
    const bVal = getCellValue(b, key).raw as number;
    if (key === 'fee') return aVal < bVal;
    if (key === 'established') return aVal < bVal;
    return aVal > bVal;
}

function getScore(a: University, b: University) {
    let aScore = 0, bScore = 0;
    COMPARISON_ROWS.forEach(({ key }) => {
        if (key === 'mode') return;
        if (isBetter(key, a, b)) aScore++;
        else if (isBetter(key, b, a)) bScore++;
    });
    return { a: aScore, b: bScore };
}

// ─── Comparison Detail ───────────────────────────────────────────────────────

function ComparisonDetail({ a, b, onBack }: { a: University; b: University; onBack: () => void }) {
    const score = getScore(a, b);

    return (
        <div className="mt-6">
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-[#4F46E5] dark:hover:text-indigo-400 mb-5 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to comparisons
            </button>

            {/* Header */}
            <div className="grid grid-cols-[140px,1fr,1fr] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-t-2xl overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-100 dark:border-gray-700" />
                {[a, b].map((uni, idx) => (
                    <div key={uni.slug} className={`p-5 text-center ${idx === 0 ? 'border-r border-gray-100 dark:border-gray-700' : ''}`}>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F46E5] to-blue-600 flex items-center justify-center text-white font-bold text-base mx-auto mb-2">
                            {uni.shortName.slice(0, 2)}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{uni.shortName}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{uni.location}</div>
                        <div className="flex items-center justify-center gap-0.5 mt-1.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{uni.rating}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="bg-white dark:bg-gray-900 border-x border-b border-gray-100 dark:border-gray-800 rounded-b-2xl overflow-hidden mb-5">
                {COMPARISON_ROWS.map((row, rowIdx) => {
                    const aData = getCellValue(a, row.key);
                    const bData = getCellValue(b, row.key);
                    const aBetter = typeof aData.raw === 'number' && typeof bData.raw === 'number' && isBetter(row.key, a, b);
                    const bBetter = typeof aData.raw === 'number' && typeof bData.raw === 'number' && isBetter(row.key, b, a);

                    return (
                        <div key={row.key} className={`grid grid-cols-[140px,1fr,1fr] ${rowIdx < COMPARISON_ROWS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800/30 border-r border-gray-100 dark:border-gray-700 flex items-center">
                                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-tight">{row.label}</span>
                            </div>
                            {[{ uni: a, better: aBetter }, { uni: b, better: bBetter }].map(({ uni, better }, idx) => {
                                const data = getCellValue(uni, row.key);
                                return (
                                    <div key={uni.slug} className={`p-3 flex items-center justify-center ${idx === 0 ? 'border-r border-gray-100 dark:border-gray-700' : ''} ${better ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                                        {row.key === 'emi' ? (
                                            data.raw === 1
                                                ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                : <XCircle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                        ) : (
                                            <span className={`text-sm font-semibold text-center ${better ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {data.display}
                                                {better && (row.key === 'fee') && <span className="block text-[9px] font-normal text-green-600 dark:text-green-400">Cheaper</span>}
                                                {better && (row.key === 'placement' || row.key === 'rating' || row.key === 'avgSalary') && <span className="block text-[9px] font-normal text-green-600 dark:text-green-400">Better</span>}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Score */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center mb-5">
                <div className={`rounded-2xl p-4 text-center border-2 transition-all ${score.a > score.b ? 'border-green-400 bg-green-50 dark:bg-green-950/20' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{score.a}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.shortName}</div>
                    {score.a > score.b && <div className="text-xs font-bold text-green-600 dark:text-green-400 mt-1">Winner 🏆</div>}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 text-center leading-tight">out of<br />{score.a + score.b}</div>
                <div className={`rounded-2xl p-4 text-center border-2 transition-all ${score.b > score.a ? 'border-green-400 bg-green-50 dark:bg-green-950/20' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{score.b}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.shortName}</div>
                    {score.b > score.a && <div className="text-xs font-bold text-green-600 dark:text-green-400 mt-1">Winner 🏆</div>}
                </div>
            </div>

            {/* AI Verdict */}
            <div className="bg-gradient-to-br from-[#4F46E5] via-blue-600 to-cyan-600 rounded-2xl p-6 text-white mb-5">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">AI Verdict</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-2">For Management / Marketing</div>
                        <div className="font-bold text-base text-white">{a.shortName} is better</div>
                        <div className="text-white/80 text-sm mt-1">{a.placementRate}% placement rate with strong alumni network in management roles.</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-2">For Technology / Analytics</div>
                        <div className="font-bold text-base text-white">{b.shortName} is better</div>
                        <div className="text-white/80 text-sm mt-1">{b.programs.length} programs, established {b.established}, avg salary ₹{(b.avgSalary / 100000).toFixed(1)}L.</div>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-white/60 text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Based on placement data, fee structure, and student reviews
                </div>
            </div>

            {/* CTA */}
            <div className="grid grid-cols-2 gap-4">
                {[a, b].map((uni) => (
                    <Link key={uni.slug} href={`/university/${uni.slug}`}>
                        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center hover:border-[#4F46E5]/40 hover:shadow-lg transition-all">
                            <div className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{uni.shortName}</div>
                            <div className="text-[#4F46E5] dark:text-indigo-400 font-bold text-lg mb-3">{formatFee(uni.avgFee)}</div>
                            <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-sm">
                                View Details
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PopularComparisons() {
    const [selected, setSelected] = useState<{ a: University; b: University } | null>(null);

    const pairs = POPULAR_PAIRS.map(([slugA, slugB]) => {
        const a = universities.find((u) => u.slug === slugA);
        const b = universities.find((u) => u.slug === slugB);
        if (!a || !b) return null;
        return { a, b, label: PAIR_LABELS[`${slugA}-${slugB}`] ?? '' };
    }).filter(Boolean) as { a: University; b: University; label: string }[];

    return (
        <section className="py-8">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Compare to choose the right university
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Tap any pair for a detailed side-by-side breakdown
                    </p>
                </div>
            </div>

            {/* Cards strip */}
            {!selected && (
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide snap-x snap-mandatory">
                    {pairs.map(({ a, b, label }) => (
                        <button
                            key={`${a.slug}-${b.slug}`}
                            onClick={() => setSelected({ a, b })}
                            className="snap-start flex-shrink-0 w-64 sm:w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#4F46E5]/40 dark:hover:border-indigo-500/40 transition-all text-left group"
                        >
                            {/* Badge */}
                            {label && (
                                <div className="px-4 pt-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F46E5] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
                                        {label}
                                    </span>
                                </div>
                            )}

                            {/* Uni logos */}
                            <div className="flex items-center justify-between px-5 py-4 gap-2">
                                <UniCard uni={a} />
                                <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 font-black text-[9px] flex-shrink-0 shadow">
                                    VS
                                </div>
                                <UniCard uni={b} />
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
                                <StatCell label="Fee" value={formatFee(a.avgFee)} />
                                <StatCell label="Fee" value={formatFee(b.avgFee)} />
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
                                <StatCell label="Placement" value={`${a.placementRate}%`} />
                                <StatCell label="Placement" value={`${b.placementRate}%`} />
                            </div>

                            {/* CTA row */}
                            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-1.5 text-[#4F46E5] dark:text-indigo-400 font-semibold text-sm">
                                {a.shortName} vs {b.shortName} →
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Inline detail */}
            {selected && (
                <ComparisonDetail
                    a={selected.a}
                    b={selected.b}
                    onBack={() => setSelected(null)}
                />
            )}
        </section>
    );
}

function UniCard({ uni }: { uni: University }) {
    return (
        <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-blue-500 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                {uni.shortName.slice(0, 2)}
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{uni.shortName}</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">NAAC {uni.naac}</span>
        </div>
    );
}

function StatCell({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-3 py-2 text-center">
            <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</div>
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">{value}</div>
        </div>
    );
}