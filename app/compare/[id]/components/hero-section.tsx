import { ExternalLink } from 'lucide-react';

interface HeroProps {
    a: { name: string; image: string; website: string };
    b: { name: string; image: string; website: string };
}

export default function HeroSection({ a, b }: HeroProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Gradient Background Header */}
            <div className="grid grid-cols-2 items-center bg-gradient-to-r from-indigo-50 to-emerald-50 p-8 md:p-12 relative">

                {/* University A */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{a.name}</h1>

                </div>

                {/* University B */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{b.name}</h1>

                </div>

                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white font-black text-lg px-6 py-3 rounded-full shadow-xl border-4 border-white z-10">
                    VS
                </div>
            </div>
        </div>
    );
}