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

  let dbUniversity: any = null;
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";
    const res = await fetch(`${apiUrl}/universities/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim()) {
        dbUniversity = JSON.parse(text);
      }
    }
  } catch (error) {
    console.error("Failed to fetch university details from database:", error);
  }

  const localUniversity = universities.find(
    (item) =>
      item.slug === slug ||
      (item.slug === `amity-university-online` &&
        slug === `amity-university-online`),
  );

  if (!dbUniversity && !localUniversity) {
    notFound();
  }

  // Merge database university data with static fallbacks
  const university = {
    name: localUniversity?.name || dbUniversity?.name,
    image: localUniversity?.image || dbUniversity?.logoUrl,
    ...localUniversity,
    ...dbUniversity,
    details: {
      ...dbUniversity?.details,
    },
  };

  return (
    <main className="min-h-screen">
      <SubHeader />
      <HeroSection university={university} />

      <AboutProgram university={university} />
      <TopSpecializations university={university} />

      <EligibilityFeesSection university={university} />
      <LoanSection university={university} />
      <AdmissionProcessSection university={university} />

      <ExaminationPatternSection university={university} />
      <ApSection university={university} />

      <LearningEnvironmentSection university={university} />
      <PlacementPartners university={university} />
      <TestimonialsSection university={university} />

      <FAQSection university={university} />

      <Footer />
    </main>
  );
}
