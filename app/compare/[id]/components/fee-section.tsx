import { Banknote, DollarSign, Info } from 'lucide-react';

interface FeeProps {
    a: { name: string; fee: string };
    b: { name: string; fee: string };
}

export default function FeeSection({ a, b }: FeeProps) {
    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                    <Banknote size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Fee Structure</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* University A Fees */}
                <div className="border border-gray-100 bg-gray-50 rounded-2xl p-6 hover:border-indigo-200 transition-colors">
                    <p className="text-sm font-medium text-gray-500 mb-1">{a.name}</p>
                    <div className="flex items-baseline gap-2">
                        <DollarSign className="text-indigo-600" size={20} />
                        <span className="text-3xl font-extrabold text-gray-900">{a.fee}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 italic">Annual tuition estimate</p>
                </div>

                {/* University B Fees */}
                <div className="border border-gray-100 bg-gray-50 rounded-2xl p-6 hover:border-emerald-200 transition-colors">
                    <p className="text-sm font-medium text-gray-500 mb-1">{b.name}</p>
                    <div className="flex items-baseline gap-2">
                        <DollarSign className="text-emerald-600" size={20} />
                        <span className="text-3xl font-extrabold text-gray-900">{b.fee}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 italic">Annual tuition estimate</p>
                </div>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm text-gray-500 bg-yellow-50 p-4 rounded-xl">
                <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <p>
                    Note: Fees are subject to change. Please visit the official university websites
                    for the most accurate and up-to-date financial information.
                </p>
            </div>
        </section>
    );
}