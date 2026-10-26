"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Star, Scale, Zap } from "lucide-react";
import UniImage from "@/components/ui/uniImage";
import AppliedBadge from "./applied-badge";
import type { StudentProfile } from "../types";
import {
  type RecommendationItem,
  FALLBACK_RECOMMENDATIONS_CATALOG,
} from "@/lib/recommendations";

interface RecommendationsProps {
  student?: StudentProfile;
}

export default function Recommendations({ student: propStudent }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(() => {
    // Initial sensible fallback to avoid layout shift before API responds
    return FALLBACK_RECOMMENDATIONS_CATALOG.slice(0, 2);
  });
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = useCallback(async (currentStudent?: StudentProfile) => {
    try {
      setLoading(true);

      // Determine active student data from argument or localStorage
      let activeStudent = currentStudent;
      if (!activeStudent && typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("ecampus_student");
          if (saved) activeStudent = JSON.parse(saved);
        } catch {}
      }

      // Build query string params from student's answers
      const params = new URLSearchParams();
      if (activeStudent?.advisorProfile?.coursePreference) {
        params.set("coursePreference", activeStudent.advisorProfile.coursePreference);
      } else if (activeStudent?.course) {
        params.set("coursePreference", activeStudent.course);
      } else if (activeStudent?.coursesInterested?.[0]) {
        params.set("coursePreference", activeStudent.coursesInterested[0]);
      }

      if (activeStudent?.advisorProfile?.highestQualification) {
        params.set("highestQualification", activeStudent.advisorProfile.highestQualification);
      }
      if (activeStudent?.advisorProfile?.budget) {
        params.set("budget", activeStudent.advisorProfile.budget);
      }
      if (activeStudent?.advisorProfile?.category) {
        params.set("category", activeStudent.advisorProfile.category);
      }
      if (activeStudent?.state) {
        params.set("state", activeStudent.state);
      }

      const res = await fetch(`/api/recommendations?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
          setRecommendations(data.recommendations);
        }
      }
    } catch (err) {
      console.error("Failed to load recommendations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount or when propStudent changes
  useEffect(() => {
    fetchRecommendations(propStudent);
  }, [fetchRecommendations, propStudent]);

  // Listen for login/signup/advisor updates in real-time
  useEffect(() => {
    const handleAuthChange = () => {
      let latestStudent: StudentProfile | undefined;
      try {
        const saved = localStorage.getItem("ecampus_student");
        if (saved) latestStudent = JSON.parse(saved);
      } catch {}
      fetchRecommendations(latestStudent);
    };

    window.addEventListener("ecampus-auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("ecampus-auth-change", handleAuthChange);
    };
  }, [fetchRecommendations]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            AI University &amp; Degree Recommendations
          </h2>
          <p className="mt-0.5 text-sm text-gray-400">
            Live alignment calculated from your academic transcript &amp; career target
          </p>
        </div>
        <Link
          href="/dashboard/matcher"
          className="whitespace-nowrap text-sm font-semibold text-red-600 hover:text-red-700"
        >
          View Matches →
        </Link>
      </div>

      <div className="mt-5 space-y-5">
        {recommendations.map((rec) => (
          <div
            key={rec.id || rec.university}
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

            <div className="flex flex-shrink-0 flex-col gap-3 sm:w-40">
              <div className="flex gap-2.5 sm:flex-col">
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
              <AppliedBadge count={rec.applied} seed={rec.seed} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
