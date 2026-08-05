"use client";

import { useEffect, useState } from "react";
import AiInsightCard from "@/components/discovery/degree-finder/ai-insight-card";

interface UserProfile {
  category: string;
  course: string;
  budget: string;
  targetPackage: string;
  qualification: string;
  scholarship: string;
}

interface UniversityLite {
  name: string;
  fees: string;
  location: string;
  rating: number;
}

// Fallback profile — used only if nothing is found in localStorage.
// Replace the localStorage keys below with whatever your wizard
// actually saves under, once you check your existing degree-finder code.
const FALLBACK_PROFILE: UserProfile = {
  category: "Skilling & Certificate",
  course: "BCA",
  budget: "Under ₹50,000",
  targetPackage: "Under ₹3 LPA",
  qualification: "10th Pass",
  scholarship: "Any scholarship",
};

const FALLBACK_UNIVERSITIES: UniversityLite[] = [
  {
    name: "Amity University",
    fees: "₹59K/Semester",
    location: "Noida",
    rating: 4.7,
  },
  {
    name: "Rushford Business School",
    fees: "₹90K/Semester",
    location: "Zurich",
    rating: 4.5,
  },
];

export default function AiResultsPage() {
  const [profile, setProfile] = useState<UserProfile>(FALLBACK_PROFILE);
  const [universities, setUniversities] = useState<UniversityLite[]>(
    FALLBACK_UNIVERSITIES,
  );

  useEffect(() => {
    // TODO: change "degreeFinderProfile" / "degreeFinderUniversities"
    // to match the actual keys your wizard saves, if different.
    try {
      const savedProfile = localStorage.getItem("degreeFinderProfile");
      const savedUniversities = localStorage.getItem(
        "degreeFinderUniversities",
      );

      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedUniversities) setUniversities(JSON.parse(savedUniversities));
    } catch (err) {
      console.error("Could not load saved profile, using fallback:", err);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Matched Results</h1>

      <div className="grid gap-3">
        {universities.map((u) => (
          <div
            key={u.name}
            className="border rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-gray-900">{u.name}</p>
              <p className="text-sm text-gray-500">{u.location}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{u.fees}</p>
              <p className="text-sm text-gray-500">★ {u.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <AiInsightCard profile={profile} universities={universities} />
    </div>
  );
}
