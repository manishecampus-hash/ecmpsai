import { Footer } from "@/components/layout/footer";
import LmsAccessPage from "@/components/study/lms-access-page";
import {
  DynamicUniversity,
  formatLmsUniversities,
} from "@/lib/lms";

export const metadata = {
  title: "University LMS Student Portal Access — eCampus",
  description:
    "Direct verified access to your university's Learning Management System (LMS). Connect to student portals for 100+ accredited universities.",
};

export const dynamic = "force-dynamic";

async function getInitialLmsUniversities(): Promise<DynamicUniversity[]> {
  const frontendApi =
    process.env.ECAMPUS_FRONTEND_API_URL ||
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
    "http://localhost:5000";

  let fetchedList: any[] = [];

  try {
    const res = await fetch(`${frontendApi}/universities`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        fetchedList = data;
      } else if (Array.isArray(data?.universities)) {
        fetchedList = data.universities;
      }
    }
  } catch (err) {
    console.error("Server: Error fetching universities from frontend API:", err);
  }

  return formatLmsUniversities(fetchedList);
}

export default async function StudyPage() {
  const initialUniversities = await getInitialLmsUniversities();

  return (
    <main className="min-h-screen bg-white">
      <LmsAccessPage initialUniversities={initialUniversities} />
      <Footer />
    </main>
  );
}

