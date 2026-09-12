import { Footer } from "@/components/layout/footer";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubjectSyllabus from "@/components/online-mba/subject-syllabus/subject-syllabus";
import FAQSection from "@/components/online-mba/subject-syllabus/syllabus-faq";
import SubHeader from "@/components/subheader/sub-header";

async function getSyllabusData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "syllabus" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "subject-syllabus"
      );
      return {
        templateData: sh?.templateData,
        title: sh?.title,
        subHeaders: course?.subHeaders,
      };
    }
  } catch (err) {
    console.error("Failed to fetch syllabus data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaPage() {
  const syllabusInfo = await getSyllabusData();

  return (
    <main>
      <SubHeader subHeaders={syllabusInfo?.subHeaders} courseSlug="online-mba" />
      <SubjectSyllabus data={syllabusInfo?.templateData} title={syllabusInfo?.title} />
      <ImportantPages />
      <FAQSection />
      <Footer />
    </main>
  );
}