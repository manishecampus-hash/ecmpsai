import { notFound } from "next/navigation";

import HeroSection from "@/components/universities/hero-section";
// import OverviewSection from "@/components/universities/overview-section";
// import CoursesSection from "@/components/universities/courses-section";
import FAQSection from "@/components/universities/faq-section";

import { universities } from "@/data/universities";
import AboutProgram from "@/components/universities/about";
import ProgramsSection from "@/components/universities/programs";
import TopSpecializations from "@/components/universities/top-secializations";
import ApprovalsSection from "@/components/universities/approvals";
import PlacementPartners from "@/components/universities/placement-partners";
// import { Footer } from "@/components/footer";
import TestimonialsSection from "@/components/universities/testimonials";
import { Footer } from "@/components/layout/footer";
import SubHeader from "@/components/universities/sub-header";
import LoanSection from "@/components/universities/loan-section";
// ✅ correct
import AdmissionProcessSection from "@/components/universities/process-section";

import LearningEnvironmentSection from "@/components/universities/environment-section";
import EligibilityFeesSection from "@/components/universities/eligibility-fees-section";
import ExaminationPatternSection from "@/components/universities/examination-pattern-section";

// import WhyOnline from "@/components/universities/why-online";

interface UniversityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params;

  const university = universities.find((item) => item.slug === slug);

  if (!university) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <SubHeader />
      <HeroSection university={university} />

      {/* <OverviewSection university={university} /> */}
      <AboutProgram university={university} />
      <ProgramsSection university={university} />
      <AdmissionProcessSection />
      <EligibilityFeesSection />
      <TopSpecializations university={university} />
      <LoanSection />
      <ExaminationPatternSection />
      <ApprovalsSection university={university} />
      <LearningEnvironmentSection />
      <PlacementPartners university={university} />
      <TestimonialsSection university={university} />

      {/* <WhyOnline university={university} /> */}

      {/* <CoursesSection university={university} /> */}

      <FAQSection university={university} />

      <Footer />
    </main>
  );
}
