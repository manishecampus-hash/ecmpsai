import { notFound } from "next/navigation";
import { getDegreeBySlug, universities, degrees } from "@/lib/data";

import { DegreeHero } from "@/components/degree/degree-hero";
import { CareerPath } from "@/components/degree/careerpath";
import { TargetAudience } from "@/components/degree/target-audience";
import { UniversitySection } from "@/components/degree/university-section";
import { FAQSection } from "@/components/degree/faq-section";
import { CallToAction } from "@/components/degree/call-to-action";

export async function generateStaticParams() {
  return degrees.map((d) => ({
    slug: d.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DegreePage({ params }: PageProps) {
  const degree = getDegreeBySlug(params.slug);

  if (!degree) {
    notFound();
  }

  const eligibleUniversities = universities.filter((u) =>
    u.programs.includes(degree.name),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <DegreeHero degree={degree} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <CareerPath path={degree.careerPath} />
        <TargetAudience audience={degree.whoShouldDo} />

        <UniversitySection
          universities={eligibleUniversities}
          degreeName={degree.name}
        />

        <FAQSection faqs={degree.faqs} />
        <CallToAction degreeName={degree.name} />
      </div>
    </div>
  );
}
