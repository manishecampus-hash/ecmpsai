'use client';

import Link from 'next/link';
import { Star, CheckCircle2, TrendingUp, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { University, Degree } from '@/lib/data';
import { formatFee } from '@/lib/data';

type Props = {
  uni: University;
  uniDegrees: Degree[];
};

export function UniversityTabs({ uni, uniDegrees }: Props) {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="w-full md:w-auto mb-6 bg-gray-100 dark:bg-gray-900 rounded-xl p-1 overflow-x-auto">
        {['overview', 'programs', 'fees', 'placements', 'reviews'].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="capitalize text-sm rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-[#4F46E5] dark:data-[state=active]:text-indigo-400 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Overview */}
      <TabsContent value="overview" className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">About {uni.shortName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{uni.description}</p>
          <div className="flex flex-wrap gap-2">
            {uni.highlights.map((h) => (
              <span key={h} className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                {h}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Student Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {uni.outcomes.map((outcome) => (
              <div key={outcome.role} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-[#4F46E5]/30 dark:hover:border-indigo-600/30 transition-all">
                <span className="font-medium text-gray-900 dark:text-white text-sm">{outcome.role}</span>
                <span className="text-[#4F46E5] dark:text-indigo-400 font-bold text-sm">{outcome.salary}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Programs */}
      <TabsContent value="programs">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniDegrees.map((degree) => (
            <Link key={degree.slug} href={`/degrees/${degree.slug}`}>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#4F46E5]/40 dark:hover:border-indigo-600/40 hover:shadow-md transition-all group h-full">
                <div className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-[#4F46E5] dark:group-hover:text-indigo-400 transition-colors mb-1">{degree.name}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-3">{degree.fullName}</div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-[#4F46E5] dark:text-indigo-400">{formatFee(uni.avgFee)}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{degree.duration} · {uni.mode.join(' / ')}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      {/* Fees */}
      <TabsContent value="fees">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-4">
          {uniDegrees.map((degree) => (
            <div key={degree.slug} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{degree.name}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{degree.duration}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#4F46E5] dark:text-indigo-400 text-lg">{formatFee(uni.avgFee)}</div>
                {uni.emi && <div className="text-xs text-green-600 dark:text-green-400">EMI available</div>}
              </div>
            </div>
          ))}
          {uni.emi && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                EMI Available — No-cost EMI starting from ₹5,000/month
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Placements */}
      <TabsContent value="placements">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Placement Rate', value: `${uni.placementRate}%`, color: 'text-green-600 dark:text-green-400' },
              { label: 'Avg Salary', value: `₹${(uni.avgSalary / 100000).toFixed(1)}L`, color: 'text-[#4F46E5] dark:text-indigo-400' },
              { label: 'Top Recruiters', value: '50+', color: 'text-blue-600 dark:text-blue-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center">
                <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Roles After Graduation</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {uni.outcomes.map((outcome) => (
                <div key={outcome.role} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{outcome.role}</span>
                  <span className="text-sm font-bold text-[#4F46E5] dark:text-indigo-400">{outcome.salary}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Reviews */}
      <TabsContent value="reviews">
        <div className="space-y-4">
          {uni.reviews.map((review, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{review.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">{review.role}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
