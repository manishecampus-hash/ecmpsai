import { StatsSection } from "@/components/home/stats-section";
import UniversitySection from "@/components/home/university-section";

export const metadata = {
  title: "Apply Now — eCampus",
  description: "Apply to top online universities through eCampus. Browse 100+ programs and get expert counselling.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Stats banner — dark section with animated counters */}
      <StatsSection />
      {/* Partner universities grid */}
      <UniversitySection />
    </main>
  );
}
