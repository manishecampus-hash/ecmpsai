import { Users, MapPin, Coffee, Zap } from 'lucide-react';

interface CampusProps {
    a: { name: string; description: string; highlights: string[] };
    b: { name: string; description: string; highlights: string[] };
}

export default function CampusLife({ a, b }: CampusProps) {
    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                    <Users size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Campus Life & Facilities</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* University A */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">{a.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{a.description}</p>
                    <ul className="space-y-2 pt-2">
                        {a.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <Zap size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* University B */}
                <div className="space-y-4 md:border-l md:pl-8">
                    <h3 className="font-bold text-lg text-gray-900">{b.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
                    <ul className="space-y-2 pt-2">
                        {b.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <Zap size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Visual Aid placeholder */}
            <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <MapPin className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                    Experience campus life through guided virtual tours available on official websites.
                </p>
            </div>
        </section>
    );
}