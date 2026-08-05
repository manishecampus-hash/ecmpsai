import { Footer } from "@/components/layout/footer";
import GGUDoctorateHero from "@/components/programs/ggu/ggu-hero";
import GGUDoctorateSpecializations from "@/components/programs/ggu/ggu-specializations";

import GGUDoctorateSyllabus from "@/components/programs/ggu/ggu-syllabus";
import GguUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GguReadMore from "@/components/programs/ggu/read-more";
import GGUDoctorateCurriculum from "@/components/programs/ggu/ggu-curriculum";
import GGUDoctorateFeeSection from "@/components/programs/ggu/ggu-eligibility-fees";
import GGUDoctorateCareers from "@/components/programs/ggu/ggu-careers";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import GGUDoctorateFAQ from "@/components/programs/ggu/ggu-faq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUCertificate from "@/components/programs/ggu/ggucertificate";
import GguAprovel from "@/components/programs/ggu/gguaprovel";
import GguDBAVsPhDSection from "@/components/programs/ggu/dba-vs-phd-section";

export default function GguPage() {
  return (
    <>
      <GguSubHeader />

      <main className="bg-white">
        <GGUDoctorateHero />
        <div id="about">
          <GGUDoctorateSpecializations />
        </div>

        <GguDBAVsPhDSection />

        <div id="university-section">
          <GguUniversitySection />
          <GguReadMore />
          <GGUCertificate />
        </div>

        <div id="subject-syllabus">
          <GGUDoctorateCurriculum />
        </div>

        <div id="eligibility-duration">
          <GGUDoctorateFeeSection />
        </div>

        <GGUDoctorateSyllabus />
        <GguAprovel />

        <div id="program-fees" className="scroll-mt-20" />

        <div id="admission-process" className="scroll-mt-20"></div>

        <div id="top-specialization" className="scroll-mt-20"></div>

        <div id="career-scope">
          <GGUDoctorateCareers />
        </div>

        <GGUDoctorateTestimonials />

        <div id="faqs">
          <GGUDoctorateFAQ />
        </div>
      </main>

      <Footer />
    </>
  );
}
