import React from 'react';

export function HighlightsSection({ a, b }: any) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-indigo-600 mb-4">{a.name}</h3>
                    <ul className="space-y-3">
                        {(a.highlights || ["Top Ranked", "Excellent Faculty", "Global Alumni"]).map((h: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-emerald-500 mt-0.5">✓</span> {h}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-indigo-600 mb-4">{b.name}</h3>
                    <ul className="space-y-3">
                        {(b.highlights || ["Industry Leaders", "Modern Infrastructure", "Great Placements"]).map((h: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-emerald-500 mt-0.5">✓</span> {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export function EligibilitySection({ a, b }: any) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility & Duration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x divide-gray-100">
                <div className="pr-4">
                    <h3 className="font-semibold text-indigo-600 mb-2">{a.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Duration: 2 Years (4 Semesters)</p>
                    <p className="text-sm text-gray-700">Graduation from a recognized university with a minimum of 50% marks (45% for reserved categories).</p>
                </div>
                <div className="pl-4">
                    <h3 className="font-semibold text-indigo-600 mb-2">{b.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">Duration: 2 Years (4 Semesters)</p>
                    <p className="text-sm text-gray-700">Bachelor's degree in any discipline with at least 50% aggregate score.</p>
                </div>
            </div>
        </div>
    );
}

export function PlacementsSection({ a, b }: any) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Scope & Placements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-semibold text-indigo-600 mb-2">{a.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">Strong placement cell with over 500+ hiring partners including top MNCs.</p>
                    <p className="text-sm font-medium text-gray-900">Highest Package: <span className="text-emerald-600">₹15 LPA</span></p>
                    <p className="text-sm font-medium text-gray-900">Average Package: <span className="text-indigo-600">₹6.5 LPA</span></p>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <h3 className="font-semibold text-emerald-600 mb-2">{b.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">Dedicated career support and tie-ups with industry leaders for internships and jobs.</p>
                    <p className="text-sm font-medium text-gray-900">Highest Package: <span className="text-emerald-600">₹12 LPA</span></p>
                    <p className="text-sm font-medium text-gray-900">Average Package: <span className="text-indigo-600">₹5.8 LPA</span></p>
                </div>
            </div>
        </div>
    );
}

export function FAQSection() {
    const faqs = [
        { q: "Are online degrees recognized for government jobs?", a: "Yes, online degrees from UGC-DEB approved universities are fully recognized for government jobs and competitive exams." },
        { q: "Can I pay the fees in installments?", a: "Yes, most universities offer semester-wise payment options and no-cost EMI plans." },
        { q: "Is there any difference between online and regular degrees?", a: "As per UGC guidelines, online degrees hold the same academic value and recognition as regular campus degrees." },
    ];
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-1">{faq.q}</h4>
                        <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
