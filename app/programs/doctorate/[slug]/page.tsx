// import { Footer } from "@/components/footer";
import BComCareers from "@/components/programs/bcom/bcom-careers";
import BComCurriculum from "@/components/programs/bcom/bcom-curriculum";
import BComEligibilityFees from "@/components/programs/bcom/bcom-eligibility-fees";
import BComFAQ from "@/components/programs/bcom/bcom-faq";

import { Footer } from "@/components/layout/footer";
import GGUDoctorateHero from "@/components/programs/ggu/ggu-hero";
import GGUDoctorateSpecializations from "@/components/programs/ggu/ggu-specializations";
import { KeyHighlights } from "@/components/programs/ggu/ggu-key-highlight";
import GGUDoctorateSyllabus from "@/components/programs/ggu/ggu-syllabus";
import GguUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GguReadMore from "@/components/programs/ggu/read-more";
import GGUDoctorateCurriculum from "@/components/programs/ggu/ggu-curriculum";
import GGUDoctorateFeeSection from "@/components/programs/ggu/ggu-eligibility-fees";
import GGUDoctorateCareers from "@/components/programs/ggu/ggu-careers";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import GGUDoctorateFAQ from "@/components/programs/ggu/ggu-faq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateAbout from "@/components/programs/ggu/ggu-about";

export default function GguPage() {
  return (
    <>
      {/* <Header /> */}

      {/* Sticky scroll-spy sub-navigation */}
      <GguSubHeader />

      <main className="bg-white">
        {/* 1. Hero and Overview */}
        <GGUDoctorateHero />
        <div id="about">
          <GGUDoctorateAbout />
          <GGUDoctorateSpecializations />
        </div>
        {/* 2. Key Highlights */}
        <div id="key-highlights">
          <KeyHighlights />
        </div>

        {/* 3. University Info */}
        <div id="university-section">
          <GguUniversitySection />
          <GguReadMore />
        </div>

        {/* 4. Curriculum */}
        <div id="subject-syllabus">
          <GGUDoctorateCurriculum />
        </div>

        {/* 5. Eligibility & Fees */}
        <div id="eligibility-duration">
          <GGUDoctorateFeeSection />
        </div>

        <GGUDoctorateSyllabus />

        {/* If program-fees is a separate section in sub-nav, 
            ensure BComEligibilityFees component handles the anchor internally 
            or use this wrapper: */}
        <div id="program-fees" className="scroll-mt-20" />

        {/* 6. Admission Process */}
        <div id="admission-process" className="scroll-mt-20">
          {/* <BComAdmissionProcess /> */}
        </div>

        {/* 7. Specialization */}
        <div id="top-specialization" className="scroll-mt-20">
          {/* <BComSpecializations /> */}
        </div>

        {/* 8. Career */}
        <div id="career-scope">
          <GGUDoctorateCareers />
        </div>

        {/* Testimonials */}
        <GGUDoctorateTestimonials />

        {/* 9. FAQs */}
        <div id="faqs">
          <GGUDoctorateFAQ />
        </div>
      </main>

      <Footer />
    </>
  );
}
