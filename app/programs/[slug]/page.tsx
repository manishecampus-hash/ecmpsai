// import { Footer } from "@/components/footer";
import BComCareers from "@/components/programs/bcom/bcom-careers";
import BComCurriculum from "@/components/programs/bcom/bcom-curriculum";
import BComEligibilityFees from "@/components/programs/bcom/bcom-eligibility-fees";
import BComFAQ from "@/components/programs/bcom/bcom-faq";
import BComHero from "@/components/programs/bcom/bcom-hero";
import BComOverview from "@/components/programs/bcom/bcom-overview";
import ReadMore from "@/components/programs/bcom/read-more";
import TestimonialsSection from "@/components/programs/bcom/testimonials-section";
import UniversitySection from "@/components/programs/bcom/university-section";
// import { Header } from "@/components/ui/header-3";
import BComSubHeader from "@/components/programs/bcom/bcom-sub-header";
import { KeyHighlights } from "@/components/programs/bcom/key-highlight";
import BComSpecializations from "@/components/programs/bcom/bcom-specializations";

export default function BComPage() {
  return (
    <>
      {/* <Header /> */}

      {/* Sticky scroll-spy sub-navigation */}
      <BComSubHeader />

      <main className="bg-white">
        {/* 1. Hero and Overview */}
        <BComHero />
        <div id="program-overview">
          <BComOverview />
          <BComSpecializations />
        </div>

        {/* 2. Key Highlights */}
        <div id="key-highlights">
          <KeyHighlights />
        </div>

        {/* 3. University Info */}
        <div id="university-section">
          <UniversitySection />
          <ReadMore />
        </div>

        {/* 4. Curriculum */}
        <div id="subject-syllabus">
          <BComCurriculum />
        </div>

        {/* 5. Eligibility & Fees */}
        <div id="eligibility-duration">
          <BComEligibilityFees />
        </div>

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
          <BComCareers />
        </div>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* 9. FAQs */}
        <div id="faqs">
          <BComFAQ />
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
