import { Footer } from "@/components/layout/footer";
import TopSpecializations from "@/components/online-mba/top-specializations/top-specializations";
import TopSpecializationsFAQ from "@/components/online-mba/top-specializations/top-specializations-faq";
import SubHeader from "@/components/subheader/sub-header";

async function getSpecializationsData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "top_specializations" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "top-specializations" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "specializations"
      );
      return {
        templateData: sh?.templateData,
        title: sh?.title,
        subHeaders: course?.subHeaders,
      };
    }
  } catch (err) {
    console.error("Failed to fetch top specializations data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaSpecializationsPage() {
  const specInfo = await getSpecializationsData();

  return (
    <main>
      <SubHeader subHeaders={specInfo?.subHeaders} courseSlug="online-mba" />
      <TopSpecializations data={specInfo?.templateData} title={specInfo?.title} />
      <TopSpecializationsFAQ />
      <Footer />
    </main>
  );
}