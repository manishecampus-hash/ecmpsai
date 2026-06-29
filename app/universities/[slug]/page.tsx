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
      <HeroSection university={university} />
      {/* <OverviewSection university={university} /> */}
      <AboutProgram university={university} />
      <ProgramsSection university={university} />
      <TopSpecializations university={university} />
      <ApprovalsSection university={university} />
      <PlacementPartners university={university} />
      <TestimonialsSection university={university} />

      {/* <WhyOnline university={university} /> */}

      {/* <CoursesSection university={university} /> */}

      <FAQSection university={university} />
      {/* <Footer /> */}
    </main>
  );
}
