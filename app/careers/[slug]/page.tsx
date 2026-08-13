import { notFound } from "next/navigation";

import {
  careers,
  careersMap,
} from "@/data/careers-pages-data/software-developer";

import { CareerHero } from "@/components/careers-pages/career-hero";
import { LearnFromSection } from "@/components/careers-pages/learn-from";
import { CareerComparisonSection } from "@/components/careers-pages/career-comparison-section";
import { CareerJourneySection } from "@/components/careers-pages/career-journey-section";
import { CareerOutcomes } from "@/components/careers-pages/career-outcomes";

import { CareerMentor } from "@/components/careers-pages/career-mentor";
import { Footer } from "@/components/layout/footer";
import { CareerCourses } from "@/components/careers-pages/career-courses";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params;

  const career = careersMap[slug as keyof typeof careersMap];

  if (!career) {
    notFound();
  }

  return (
    <main className="bg-white">
      <CareerHero hero={career.hero} />

      {/* Learn From Section */}
      <LearnFromSection />
      <CareerComparisonSection />
      <CareerJourneySection />
      <CareerOutcomes />
      <CareerMentor />
      <CareerCourses />
      <Footer />
    </main>
  );
}
