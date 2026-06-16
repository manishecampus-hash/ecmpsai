import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Star, CheckCircle2, Users, Building2, TrendingUp, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUniversityBySlug, universities, degrees, formatFee } from '@/lib/data';
import { UniversityTabs } from './UniversityTabs';

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export default function UniversityPage({ params }: { params: { slug: string } }) {
  const uni = getUniversityBySlug(params.slug);
  if (!uni) notFound();

  const uniDegrees = degrees.filter((d) => uni.programs.includes(d.name));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      {/* Hero Cover */}
      <div className="relative h-40 md:h-52 bg-gradient-to-r from-[#4F46E5] via-blue-600 to-cyan-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      </div>

      {/* Logo + Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative -mt-10 flex items-end gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 shadow-xl flex items-center justify-center text-[#4F46E5] dark:text-indigo-400 font-bold text-2xl flex-shrink-0 z-10">
            {uni.shortName.slice(0, 2)}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{uni.name}</h1>
            </div>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              {uni.ugc && (
                <span className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-medium">
                  <BadgeCheck className="w-3.5 h-3.5" /> UGC Approved
                </span>
              )}
              <span className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> NAAC {uni.naac}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {uni.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(uni.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'}`} />
              ))}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{uni.rating}</span>
              <span className="text-sm text-gray-400 dark:text-gray-500">({(uni.students / 1000).toFixed(0)}K+ students)</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl px-6">Apply Now</Button>
            <Link href="/compare">
              <Button variant="outline" className="rounded-xl px-6 hover:border-[#4F46E5] hover:text-[#4F46E5] dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all">
                Compare
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Building2, label: 'Programs', value: `${uni.programs.length}+` },
            { icon: TrendingUp, label: 'Avg Salary', value: `₹${(uni.avgSalary / 100000).toFixed(1)}L` },
            { icon: Users, label: 'Placement', value: `${uni.placementRate}%` },
            { icon: Star, label: 'Rating', value: `${uni.rating}/5` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 text-center">
              <Icon className="w-5 h-5 text-[#4F46E5] dark:text-indigo-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <UniversityTabs uni={uni} uniDegrees={uniDegrees} />

        <div className="py-8" />
      </div>
    </div>
  );
}
