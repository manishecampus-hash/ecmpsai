import UniversitySection from "@/components/home/university-section";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Top Online Universities in India — eCampus",
  description:
    "Explore and compare India's top UGC-DEB approved & NAAC accredited online universities. Browse 100+ programs and get expert counselling.",
};

async function getUniversities() {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";
    const res = await fetch(`${apiUrl}/universities`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch universities on server:", err);
  }
  return null;
}

export default async function UniversitiesPage() {
  const initialUniversities = await getUniversities();

  return (
    <main className="min-h-screen bg-white">
      {/* Partner universities directory */}
      <UniversitySection initialUniversities={initialUniversities} />
      <Footer />
    </main>
  );
}
