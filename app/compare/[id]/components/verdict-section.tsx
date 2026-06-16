'use client';

import { Target, Lightbulb, Trophy } from 'lucide-react';
import React from 'react';

interface VerdictProps {
    a: {
        name: string;
        verdict: string;
    };
    b: {
        name: string;
        verdict: string;
    };
    recommendation: string;
}

export default function VerdictSection({
    a,
    b,
    recommendation,
}: VerdictProps): React.ReactElement {
    return (
        <section className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-gray-700" />
                </div>

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Expert Analysis
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900">
                        Final Verdict
                    </h2>
                </div>
            </div>

            {/* University Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-gray-700" />
                        <h3 className="font-bold text-lg text-gray-900">
                            {a.name}
                        </h3>
                    </div>

                    <p className="text-gray-600 leading-7">
                        {a.verdict}
                    </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-gray-700" />
                        <h3 className="font-bold text-lg text-gray-900">
                            {b.name}
                        </h3>
                    </div>

                    <p className="text-gray-600 leading-7">
                        {b.verdict}
                    </p>
                </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                        <Target className="h-6 w-6 text-gray-700" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Our Recommendation
                        </h3>

                        <p className="text-gray-600 leading-7">
                            {recommendation}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}