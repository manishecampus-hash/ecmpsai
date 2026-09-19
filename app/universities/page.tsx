import UniversitySection from "@/components/home/university-section";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Top Online Universities in India — eCampus",
  description:
    "Explore and compare India's top UGC-DEB approved & NAAC accredited online universities. Browse 100+ programs and get expert counselling.",
};

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Partner universities directory */}
      <UniversitySection />
      <Footer />
    </main>
  );
}
