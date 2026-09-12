import { Footer } from "@/components/layout/footer";
import ProgramFeesFAQ from "@/components/online-mba/program-fees/program-fee-faq";
import SubProgramFees from "@/components/online-mba/program-fees/sub-program-fees";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubHeader from "@/components/subheader/sub-header";

async function getFeesData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "program_fees" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "program-fees"
      );
      return {
        templateData: sh?.templateData,
        title: sh?.title,
        subHeaders: course?.subHeaders,
      };
    }
  } catch (err) {
    console.error("Failed to fetch program fees data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaFeesPage() {
  const feesInfo = await getFeesData();

  return (
    <main>
      <SubHeader subHeaders={feesInfo?.subHeaders} courseSlug="online-mba" />
      <SubProgramFees data={feesInfo?.templateData} title={feesInfo?.title} />
      <ImportantPages />
      <ProgramFeesFAQ />
      <Footer />
    </main>
  );
}