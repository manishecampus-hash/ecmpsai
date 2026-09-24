"use client";

import Link from "next/link";
import { Star, Scale, Zap } from "lucide-react";
import UniImage from "@/components/ui/uniImage";

const recommendations = [
  {
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=70",
    match: "98% Match",
    university: "CHANDIGARH UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "1.2k reviews",
    title: "MCA with AI & Machine Learning Specialization",
    tags: ["NAAC A+", "UGC Entitled", "Zero Cost EMI", "Top Recruiter Network"],
    fee: "₹65,000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=70",
    match: "94% Match",
    university: "NMIMS CDOE",
    rating: "4.9",
    reviews: "2.4k reviews",
    title: "Executive MBA in Business & AI Analytics",
    tags: ["Top Ranked B-School", "Industry Mentorship", "Placement Support"],
    fee: "₹1,10,000",
  },
];

export default function Recommendations() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            AI University &amp; Degree Recommendations
          </h2>
          <p className="mt-0.5 text-sm text-gray-400">
            Live alignment calculated from your academic transcript &amp;
            career target
          </p>
        </div>
        <Link
          href="/dashboard/matcher"
          className="whitespace-nowrap text-sm font-semibold text-red-600 hover:text-red-700"
        >
          View All 14 Matches →
        </Link>
      </div>

      <div className="mt-5 space-y-5">
        {recommendations.map((rec) => (
          <div
            key={rec.university}
            className="flex flex-col gap-5 rounded-xl border border-gray-100 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/60 sm:flex-row sm:items-center"
          >
            <div className="relative h-36 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-40">
              <UniImage src={rec.image} alt={rec.university} className="object-cover" />
              <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                {rec.match}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold tracking-wide text-red-600">
                  {rec.university}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {rec.rating}{" "}
                  <span className="text-gray-400">({rec.reviews})</span>
                </span>
              </div>

              <p className="mt-1.5 text-lg font-semibold text-gray-900">
                {rec.title}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {rec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Annual Fee{" "}
                <span className="font-semibold text-gray-900">
                  {rec.fee}
                </span>{" "}
                / year
              </p>
            </div>

            <div className="flex flex-shrink-0 gap-2.5 sm:w-40 sm:flex-col">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 sm:flex-none sm:w-full"
              >
                <Scale className="h-3.5 w-3.5" />
                Compare
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md sm:flex-none sm:w-full"
              >
                <Zap className="h-3.5 w-3.5 fill-white" />
                1-Click Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
