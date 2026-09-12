import { Footer } from "@/components/layout/footer";
import MbaAdmissionProcedure from "@/components/online-mba/admission-procedure/admission-procedure";
import AdmissionProcedureFAQ from "@/components/online-mba/admission-procedure/admission-procedure-faq";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubHeader from "@/components/subheader/sub-header";

async function getProcedureData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "procedure" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "admission-procedure" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "admission-process"
      );
      return {
        templateData: sh?.templateData,
        title: sh?.title,
        subHeaders: course?.subHeaders,
      };
    }
  } catch (err) {
    console.error("Failed to fetch procedure data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaProcedurePage() {
  const procedureInfo = await getProcedureData();

  return (
    <main>
      <SubHeader subHeaders={procedureInfo?.subHeaders} courseSlug="online-mba" />
      <MbaAdmissionProcedure data={procedureInfo?.templateData} title={procedureInfo?.title} />
      <ImportantPages />
      <AdmissionProcedureFAQ />
      <Footer />
    </main>
  );
}