import { notFound } from "next/navigation";

import HeroSection from "@/components/universities/hero-section";
import FAQSection from "@/components/universities/faq-section";

import { universities } from "@/data/universities";
import AboutProgram from "@/components/universities/about";

import TopSpecializations from "@/components/universities/top-secializations";

import TestimonialsSection from "@/components/universities/testimonials";
import { Footer } from "@/components/layout/footer";
import SubHeader from "@/components/universities/sub-header";
import LoanSection from "@/components/universities/loan-section";
import AdmissionProcessSection from "@/components/universities/process-section";

import LearningEnvironmentSection from "@/components/universities/environment-section";
import EligibilityFeesSection from "@/components/universities/eligibility-fees-section";
import ExaminationPatternSection from "@/components/universities/examination-pattern-section";
import ApSection from "@/components/universities/aproveltest";
import PlacementPartners from "@/components/universities/placement-partners";

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
    <main className="min-h-screen">
      <SubHeader />
      <HeroSection university={university} />

      <AboutProgram university={university} />
      <TopSpecializations university={university} />

      <EligibilityFeesSection />
      <LoanSection />
      <AdmissionProcessSection />

      <ExaminationPatternSection />
      <ApSection />

      <LearningEnvironmentSection />
      <PlacementPartners />
      <TestimonialsSection university={university} />

      <FAQSection university={university} />

      <Footer />
    </main>
  );
}
