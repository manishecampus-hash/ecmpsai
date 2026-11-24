"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import UniImage from "@/components/ui/uniImage";
import AppliedBadge from "./applied-badge";
import { useAgent } from "./agent/agent-shell";
import ApplyChoiceModal from "./applications/apply-choice-modal";
import type { ApplyTarget } from "./applications/applied-store";
import type { StudentProfile } from "../types";
import {
  type RecommendationItem,
  FALLBACK_RECOMMENDATIONS_CATALOG,
} from "@/lib/recommendations";

interface RecommendationsProps {
  student?: StudentProfile;
}

const toTarget = (r: RecommendationItem): ApplyTarget => ({ university: r.university, program: r.title, image: r.image, fee: r.fee, match: r.matchScore });

export default function Recommendations({ student: propStudent }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const agent = useAgent();
  const [applyFor, setApplyFor] = useState<RecommendationItem | null>(null);
  const closeApply = useCallback(() => setApplyFor(null), []);

  const applyTarget = useMemo(() => (applyFor ? toTarget(applyFor) : null), [applyFor]);
  // AI Apply: other universities from these recommendations (topped up from the catalog)
  const similarTo = (r: RecommendationItem) => {
    const seen = new Set([r.university]);
    return [...recommendations, ...FALLBACK_RECOMMENDATIONS_CATALOG]
      .filter((x) => !seen.has(x.university) && seen.add(x.university))
      .slice(0, 3)
      .map(toTarget);
  };

  // "Is this for me?" opens the eCampus AI chat with a question about this program
  const askAboutRecommendation = (rec: RecommendationItem) =>
    agent?.openChat({
      q: `Is the ${rec.title} at ${rec.university} (${rec.fee}/year) right for me? Based on my profile, tell me how well it fits, and compare it with similar universities on fees, eligibility, accreditation and career outcomes.`,
    });

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
      {/* Animated fee on phones (same as the AI Degree Finder cards) */}
      <style>{`
        @keyframes rec-fee-flow { from { background-position: 0% 50%; } to { background-position: 200% 50%; } }
        .rec-fee {
          background-image: linear-gradient(90deg, #dc2626, #f43f5e, #fb923c, #f43f5e, #dc2626);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: rec-fee-flow 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) { .rec-fee { animation: none; } }
      `}</style>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="w-full text-center sm:w-auto sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">
            AI Degree Recommendations
          </h2>
          <p className="mt-0.5 text-sm text-gray-400">
            Live alignment calculated from your academic transcript &amp; career target
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {loading && recommendations.length === 0 ? (
          <div className="flex animate-pulse flex-col gap-5 rounded-xl border border-gray-100 p-5 sm:flex-row sm:items-center">
            <div className="h-36 w-full flex-shrink-0 rounded-xl bg-gray-200 sm:h-32 sm:w-40" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-32 rounded bg-gray-200" />
                <div className="h-3 w-16 rounded bg-gray-200" />
              </div>
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="flex flex-wrap gap-2 pt-1">
                <div className="h-6 w-24 rounded-full bg-gray-100" />
                <div className="h-6 w-20 rounded-full bg-gray-100" />
                <div className="h-6 w-28 rounded-full bg-gray-100" />
              </div>
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
            <div className="flex flex-shrink-0 flex-col gap-3 sm:w-40">
              <div className="h-10 w-full rounded-full bg-gray-200" />
              <div className="h-10 w-full rounded-full bg-gray-200" />
            </div>
          </div>
        ) : (
          (recommendations.length > 0 ? recommendations : FALLBACK_RECOMMENDATIONS_CATALOG.slice(0, 2)).map((rec) => (
            <div
              key={rec.id || rec.university}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/60 sm:flex-row sm:items-center sm:gap-5 sm:rounded-xl sm:p-5 sm:shadow-none"
            >
              <div className="relative h-36 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-40">
                <UniImage src={rec.image} alt={rec.university} className="object-cover" />
                <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                  {rec.match}
                </span>
                {/* Phones: rating on the image */}
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-bold text-gray-800 shadow-sm sm:hidden">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {rec.rating}
                  <span className="font-medium text-gray-400">({rec.reviews.replace(/\s*reviews?/i, "")})</span>
                </span>
                {/* Phones: university name over the image */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2 pt-10 sm:hidden">
                  <p className="line-clamp-2 text-[13px] font-extrabold uppercase leading-snug tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {rec.university}
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                {/* University & rating — on the image on phones */}
                <div className="hidden flex-wrap items-center gap-2 sm:flex">
                  <span className="text-xs font-bold tracking-wide text-red-600">
                    {rec.university}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {rec.rating}{" "}
                    <span className="text-gray-400">({rec.reviews})</span>
                  </span>
                </div>

                {/* Course name (2 lines max on phones), with the annual fee beside it on phones */}
                <div className="flex items-baseline justify-between gap-3 sm:block">
                  <p
                    title={rec.title}
                    className="line-clamp-2 min-w-0 flex-1 pt-0.5 text-[15px] font-bold leading-snug text-gray-900 sm:mt-1.5 sm:line-clamp-none sm:pt-0 sm:text-lg sm:font-semibold"
                  >
                    {rec.title}
                  </p>
                  <p className="flex flex-shrink-0 items-baseline gap-1.5 whitespace-nowrap sm:hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Annual Fee</span>
                    <span className="rec-fee text-[16px] font-extrabold tracking-tight">{rec.fee}</span>
                  </p>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                  {rec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600 ring-1 ring-gray-100 sm:px-3 sm:py-1.5 sm:text-xs sm:ring-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Annual fee — beside the course name on phones */}
                <p className="mt-3 hidden text-sm text-gray-500 sm:block">
                  Annual Fee{" "}
                  <span className="font-semibold text-gray-900">
                    {rec.fee}
                  </span>{" "}
                  / year
                </p>
              </div>

              <div className="flex flex-shrink-0 flex-col gap-2 border-t border-gray-100 pt-3 sm:w-40 sm:gap-3 sm:border-0 sm:pt-0">
                {/* Phones: both buttons on one line */}
                <div className="flex gap-2 sm:flex-col sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => askAboutRecommendation(rec)}
                    className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 px-3 py-2 text-[13px] font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50/60 hover:text-red-700 active:scale-[0.97] sm:w-full sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-red-500" />
                    Is this for me?
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyFor(rec)}
                    className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-red-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md active:scale-[0.97] sm:w-full sm:flex-none sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <Zap className="h-3.5 w-3.5 fill-white" />
                    1-Click Apply
                  </button>
                </div>
                <AppliedBadge count={rec.applied} seed={rec.seed} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* After the cards: go to the full matcher */}
      <div className="mt-5 flex justify-center">
        <Link
          href="/dashboard/matcher"
          className="group inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-6 py-2.5 text-sm font-bold text-red-700 transition-colors duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          View All Matches
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <ApplyChoiceModal target={applyTarget} similar={applyFor ? similarTo(applyFor) : []} onClose={closeApply} />
    </div>
  );
}
