import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import SubHeader, { SubHeaderItemProp } from "@/components/subheader/sub-header";
import CourseHeroSection from "@/components/course/course-hero";
import CourseOverview from "@/components/course/course-overview";
import KeyHighlights from "@/components/course/key-highlight";
import EligibilityDuration from "@/components/course/eligibility-duration";
import CourseSyllabus from "@/components/course/course-syllabus";
import FeesAndEnrollment from "@/components/course/fees-and-enrollment";
import CourseEnrol from "@/components/course/course-enrol";
import CourseSpecializations from "@/components/course/course-specializations";
import UgcValidity from "@/components/course/ugc-validity";
import OnlineVsRegular from "@/components/course/online-vs-regular";
import CourseOffer from "@/components/course/course-offer";
import Professionals from "@/components/course/professionals";
import CourseFAQ from "@/components/course/course-faq";
import CourseStickyPopup from "@/components/course/course-sticky-popup";
import { buildPodcastScript } from "@/components/course/podcast-script";

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
  logoUrl?: string;
  slug: string;
  shortcode?: string;
  location?: string;
  nirfRanking?: string;
  wesApproval?: boolean;
  establishmentYear?: number;
  emiFacility?: boolean;
  studentsVisited?: string;
  startingFee?: number;
  courseFee?: number;
  feeRange?: { start?: number; end?: number };
}

interface UniversityCourseData {
  id: string;
  name: string;
  slug: string;
  shortcode?: string;
  duration?: string;
  mode?: string;
  type?: string;
  courseFee?: number;
  feeRange?: { start?: number; end?: number };
  rating?: number;
  content?: string;
  thumbnail?: string;
  seoSettings?: SeoSettings;
  brochureUrl?: string;
  subHeaders?: SubHeaderItemProp[];
  details: any;
  university: University;
  associatedUniversities: University[];
}

interface PageProps {
  params: Promise<{
    slug: string;
    courseSlug: string;
  }>;
}

const fetchUniversityCourse = cache(
  async (uniSlug: string, courseSlug: string): Promise<UniversityCourseData | null> => {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
    try {
      const res = await fetch(
        `${apiUrl}/universities/${encodeURIComponent(uniSlug)}/courses/${encodeURIComponent(courseSlug)}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.error("Failed to fetch university course details:", error);
    }
    return null;
  }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, courseSlug } = await params;
  const course = await fetchUniversityCourse(slug, courseSlug);

  if (!course) {
    return {
      title: "Course Not Found | eCampus",
    };
  }

  const seo = course.seoSettings || {};
  const uniName = course.university?.name || "University";
  const courseName = course.name || "Course";
  const defaultTitle = `${courseName} from ${uniName} - Fees, Eligibility, Syllabus | eCampus`;
  const defaultDescription =
    seo.description ||
    course.details?.banner?.description ||
    `Explore ${courseName} at ${uniName}. Check admission process, fee structure, duration, eligibility, approvals, and curriculum on eCampus.`;

  return {
    title: seo.title || defaultTitle,
    description: defaultDescription,
    keywords: seo.tags,
    robots: {
      index: seo.indexing !== false,
      follow: seo.crawl !== false,
      googleBot: {
        index: seo.indexing !== false,
        follow: seo.crawl !== false,
      },
    },
    openGraph: {
      title: seo.title || defaultTitle,
      description: defaultDescription,
      type: "website",
      images: course.thumbnail || course.university?.logoUrl ? [{ url: course.thumbnail || course.university?.logoUrl }] : [],
    },
  };
}

export default async function UniversityCourseDetailPage({ params }: PageProps) {
  const { slug, courseSlug } = await params;
  const course = await fetchUniversityCourse(slug, courseSlug);

  if (!course) {
    notFound();
  }

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

  const universities = course.associatedUniversities && course.associatedUniversities.length > 0
    ? course.associatedUniversities
    : course.university
    ? [course.university]
    : [];

  const bannerDuration = detailsObj?.banner?.stats?.find((s: any) =>
    s?.label?.toLowerCase()?.includes("duration")
  )?.value;
  const duration =
    course.duration ||
    detailsObj?.eligibility?.durationText ||
    detailsObj?.eligibility?.duration ||
    bannerDuration ||
    "24 Months";

  const bannerMode = detailsObj?.banner?.stats?.find((s: any) =>
    s?.label?.toLowerCase()?.includes("mode")
  )?.value;
  const mode = course.mode || bannerMode || "100% Online";

  const bannerRating = detailsObj?.banner?.stats?.find((s: any) =>
    s?.label?.toLowerCase()?.includes("rating")
  )?.value;
  const rating = bannerRating || String(course.rating || 4.8);

  const rawFee = course.courseFee || course.feeRange?.start || course.university?.startingFee;
  const fee = rawFee ? `₹${rawFee.toLocaleString("en-IN")}` : "";

  const subHeaders: SubHeaderItemProp[] = [
    { id: "hero-section", title: "Overview", url: "#hero-section", urlType: "anchor" },
    { id: "about", title: "About", url: "#about", urlType: "anchor" },
    { id: "key-highlights", title: "Highlights", url: "#key-highlights", urlType: "anchor" },
    { id: "eligibility-duration", title: "Eligibility", url: "#eligibility-duration", urlType: "anchor" },
    { id: "subject-syllabus", title: "Syllabus", url: "#subject-syllabus", urlType: "anchor" },
    { id: "program-fees", title: "Fees", url: "#program-fees", urlType: "anchor" },
    { id: "admission-procedure", title: "Admission", url: "#admission-procedure", urlType: "anchor" },
    { id: "top-specializations", title: "Specializations", url: "#top-specializations", urlType: "anchor" },
    { id: "accreditation", title: "Approvals", url: "#accreditation", urlType: "anchor" },
    { id: "faq-support", title: "FAQ", url: "#faq-support", urlType: "anchor" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100/90 border-b border-slate-200 text-xs text-slate-600 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-[#ea384c] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/universities" className="hover:text-[#ea384c] transition-colors">
            Universities
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/universities/${slug}`} className="hover:text-[#ea384c] transition-colors font-medium">
            {course.university?.name || slug}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold">{course.name}</span>
        </div>
      </div>

      <SubHeader subHeaders={subHeaders} courseSlug={course.slug} />

      <section id="hero-section">
        <CourseHeroSection
          data={detailsObj?.banner}
          universities={universities}
          podcastScript={buildPodcastScript(detailsObj)}
        />
      </section>

      <section id="about">
        <CourseOverview data={detailsObj?.about} banner={detailsObj?.banner} />
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

      {/* Floating Action Bar */}
      <CourseStickyPopup
        courseName={`${course.name} - ${course.university?.name || ""}`}
        duration={duration}
        mode={mode}
        rating={rating}
        fee={fee}
        brochureUrl={course.brochureUrl}
      />
    </main>
  );
}

