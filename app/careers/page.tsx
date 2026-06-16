import Link from 'next/link';
import { careers, formatFee } from '@/lib/data';
import { TrendingUp, Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-black text-white mb-2">Top Careers in India</h1>
        <p className="text-white/40 mb-12">
          Explore the most in-demand careers with salary insights and growth potential
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {careers.map((career) => (
            <div
              key={career.slug}
              className="card-dark-hover rounded-2xl p-6 group hover:border-indigo-500/30 hover:bg-[#18181B]"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-sm text-white/40 mt-1">
                    Popular choice for tech & management professionals
                  </p>
                </div>
                <Briefcase className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Average Salary</span>
                  <span className="text-lg font-black text-emerald-400">{career.avgSalary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Growth Rate</span>
                  <span className="flex items-center gap-1 text-sm font-black text-emerald-400">
                    <TrendingUp className="w-4 h-4" /> {career.growth}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                  Top Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="badge-primary text-xs">{skill}</span>
                  ))}
                </div>
              </div>

              <Link href={`/search?q=${encodeURIComponent(career.title)}`}>
                <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all text-sm">
                  View Programs
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
