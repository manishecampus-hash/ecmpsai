import type { Metadata } from "next";
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

interface SeoSettings {
  title?: string;
  tags?: string;
  description?: string;
  rewriteUrl?: string;
  sitemap?: boolean;
  indexing?: boolean;
  crawl?: boolean;
}

interface UniversityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getUniversityData(slug: string) {
  let dbUniversity: any = null;
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
    "http://localhost:5000";

  try {
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
  if (!dbUniversity) {
    return null;
  }

  // Pre-fetch courses and categories in parallel on the server
  let coursesList: any[] = [];
  let categoriesList: any[] = [];
  if (dbUniversity.id) {
    try {
      const [coursesRes, categoriesRes] = await Promise.all([
        fetch(`${apiUrl}/universities/${dbUniversity.id}/courses`, {
          cache: "no-store",
        }),
        fetch(`${apiUrl}/universities/course-meta?type=category`, {
          cache: "no-store",
        }),
      ]);
      if (coursesRes.ok) coursesList = await coursesRes.json();
      if (categoriesRes.ok) categoriesList = await categoriesRes.json();
    } catch (e) {
      console.error("Failed to prefetch university courses/categories on server:", e);
    }
  }

  const localUniversity = universities.find(
    (item) =>
      item.slug === slug ||
      item.name.toLowerCase().replace(/ online$/i, "").trim() ===
        dbUniversity.name?.toLowerCase().replace(/ online$/i, "").trim() ||
      (dbUniversity.slug && item.slug === dbUniversity.slug.split("/").pop())
  );

  return {
    ...localUniversity,
    ...dbUniversity,
    name: dbUniversity?.name || localUniversity?.name,
    image: dbUniversity?.logoUrl || localUniversity?.image,
    coursesList,
    categoriesList,
    details: {
      ...dbUniversity?.details,
    },
  };
}

export async function generateMetadata({
  params,
}: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const university = await getUniversityData(slug);

  if (!university) {
    return {
      title: "University Not Found | eCampus",
    };
  }

  const seo: SeoSettings = university.seoSettings || {};
  const fallbackTitle = university.name
    ? `${university.name} - Online Degrees & Admissions | eCampus`
    : "University Details | eCampus";
  const fallbackDescription =
    university.about?.description ||
    (university.name
      ? `Explore online degree programs, fee structure, eligibility, and approvals for ${university.name} on eCampus.`
      : "");

  const title = seo.title?.trim() || fallbackTitle;
  const description = seo.description?.trim() || fallbackDescription;
  const keywords = seo.tags?.trim() || undefined;

  return {
    title,
    description,
    keywords,
  };
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params;
  const university = await getUniversityData(slug);

  if (!university) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* sub-header un-pins (main header shows again) once the FAQs have been scrolled past */}
      <SubHeader university={university} hideAfterId="faq" />
      <HeroSection university={university} />

      <AboutProgram university={university} />
      <TopSpecializations
        university={university}
        initialCourses={university.coursesList}
        initialCategories={university.categoriesList}
      />

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
