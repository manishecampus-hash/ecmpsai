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
import { CareerRoles } from "@/components/careers-pages/career-roles";

import { CareerMentor } from "@/components/careers-pages/career-mentor";
import { Footer } from "@/components/layout/footer";
import { LogoCarousel } from "@/components/careers-pages/carousel";
import FAQ from "@/components/home/faq";

// Same FAQs as the home page (from the homepage API; the FAQ component has its own fallback)
async function fetchHomepageFaqs() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/homepage`, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data = await res.json();
    return data?.faqs;
  } catch {
    return undefined;
  }
}

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

  const faqs = await fetchHomepageFaqs();

  return (
    <main className="bg-white">
      <CareerHero hero={career.hero} />

      {/* Learn From Section */}
      <LearnFromSection />
      <CareerRoles roles={career.opportunities} />
      <CareerMentor />
      <CareerComparisonSection />
      <CareerJourneySection />
      <CareerOutcomes />
      <LogoCarousel/>
      {/* <CareerCourses /> */}
      <div className="pt-8 sm:pt-12">
        <FAQ
          items={faqs}
          headingClassName="whitespace-nowrap text-[clamp(12px,4.2vw,24px)] font-extrabold leading-tight tracking-tight text-slate-900 sm:whitespace-normal sm:text-3xl md:text-4xl"
        />
      </div>
      <Footer />
    </main>
  );
}
