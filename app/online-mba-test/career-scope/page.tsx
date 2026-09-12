import { Footer } from "@/components/layout/footer";
import CareerScope from "@/components/online-mba/career-scope/career-scope";
import CareerScopeFAQ from "@/components/online-mba/career-scope/career-scope-faq";
import SubHeader from "@/components/subheader/sub-header";

async function getCareerScopeData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "career_scope" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "career-scope" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "job-opportunities"
      );
      if (sh) {
        return {
          templateData: sh.templateData,
          title: sh.title,
          subHeaders: course?.subHeaders,
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch career scope data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaCareerScopePage() {
  const info = await getCareerScopeData();

  return (
    <main>
      <SubHeader subHeaders={info?.subHeaders} courseSlug="online-mba" />
      <CareerScope data={info?.templateData ?? null} title={info?.title} />
      <CareerScopeFAQ />
      <Footer />
    </main>
  );
}