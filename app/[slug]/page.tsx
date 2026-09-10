import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import SubHeader from "@/components/subheader/sub-header";
import CourseHeroSection from "@/components/course/course-hero";
import CourseUniversitySection from "@/components/course/course-university-section";
import CourseOverview from "@/components/course/course-overview";
import KeyHighlights from "@/components/course/key-highlight";
import EligibilityDuration from "@/components/course/eligibility-duration";
import CourseSyllabus from "@/components/course/course-syllabus";
import FeesAndEnrollment from "@/components/course/fees-and-enrollment";
import CourseEnrol from "@/components/course/course-enrol";
import CourseSpecializations from "@/components/course/course-specializations";
import UgcValidity from "@/components/course/ugc-validity";
import OnlineVsRegular from "@/components/course/online-vs-regular";
import TypesOfOnlineCourse from "@/components/course/type-online-course";
import CourseOffer from "@/components/course/course-offer";
import Professionals from "@/components/course/professionals";
import CourseFAQ from "@/components/course/course-faq";

interface SeoSettings {
  title?: string;
  tags?: string;
  description?: string;
  sitemap?: boolean;
  indexing?: boolean;
  crawl?: boolean;
}

interface University {
  id: string;
  name: string;
  logoUrl: string;
  slug: string;
  shortcode: string;
  location: string;
  nirfRanking?: string;
  wesApproval?: boolean;
  establishmentYear?: number;
  emiFacility?: boolean;
  studentsVisited?: string;
}

interface CourseData {
  id: string;
  name: string;
  slug: string;
  shortcode?: string;
  description: string;
  details: any;
  image?: string;
  status: "active" | "inactive";
  seoSettings?: SeoSettings;
  associatedUniversities?: University[];
  subHeaders?: any[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchCourse(slug: string): Promise<CourseData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch course details:", error);
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourse(slug);

  if (!course) {
    return {
      title: "Course Not Found | eCampus",
    };
  }

  const seo = course.seoSettings;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4001";
  
  return {
    title: seo?.title || `${course.name} Course, Associated Universities | eCampus`,
    description: seo?.description || course.description,
    keywords: seo?.tags,
    alternates: {
      canonical: `${baseUrl}/${course.slug}`,
    },
    robots: {
      index: seo?.indexing !== false,
      follow: seo?.crawl !== false,
      googleBot: {
        index: seo?.indexing !== false,
        follow: seo?.crawl !== false,
      }
    },
    openGraph: {
      title: seo?.title || course.name,
      description: seo?.description || course.description,
      url: `${baseUrl}/${course.slug}`,
      siteName: "eCampus",
      type: "website",
      images: course.image ? [{ url: course.image }] : [],
    }
  };
}

export default async function RootCourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await fetchCourse(slug);

  if (!course) {
    notFound();
  }

  // Parse details field safely
  let detailsObj: any = {};
  if (course.details) {
    if (typeof course.details === "string") {
      try {
        detailsObj = JSON.parse(course.details);
      } catch (e) {
        console.error("Failed to parse course.details string:", e);
      }
    } else {
      detailsObj = course.details;
    }
  }

  const universities = course.associatedUniversities || [];

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
      <SubHeader subHeaders={course.subHeaders} courseSlug={course.slug} />

      <section id="hero-section">
        <CourseHeroSection data={detailsObj?.banner} />
      </section>

      <section id="university-section">
        <CourseUniversitySection universities={universities} />
      </section>

      <section id="about">
        <CourseOverview data={detailsObj?.about} />
      </section>

      <section id="key-highlights">
        <KeyHighlights data={detailsObj?.keyHighlights} />
      </section>

      <section id="eligibility-duration">
        <EligibilityDuration data={detailsObj?.eligibility || detailsObj?.specializations} />
      </section>

      <section id="subject-syllabus">
        <CourseSyllabus data={detailsObj?.syllabus} />
      </section>

      <section id="program-fees">
        <FeesAndEnrollment data={detailsObj?.courseFees || detailsObj?.fees} />
      </section>

      <section id="admission-procedure">
        <CourseEnrol data={detailsObj?.processFlow} />
      </section>

      <section id="top-specializations">
        <CourseSpecializations data={detailsObj?.specializations} />
      </section>

      <section id="accreditation">
        <UgcValidity data={detailsObj?.accreditation} />
      </section>

      <section id="online-vs-regular">
        <OnlineVsRegular data={detailsObj?.onlineVsRegular || detailsObj?.comparison} />
      </section>

      <section id="types-of-course">
        <TypesOfOnlineCourse data={detailsObj?.typesOfCourse} />
      </section>

      <section id="course-offer">
        <CourseOffer data={detailsObj?.courseOffer} />
      </section>

      <section id="working-professionals">
        <Professionals data={detailsObj?.workingProfessionals || detailsObj?.professionals} />
      </section>

      <section id="faq-support">
        <CourseFAQ data={detailsObj?.supportDesk} />
      </section>

      <Footer />
    </main>
  );
}
