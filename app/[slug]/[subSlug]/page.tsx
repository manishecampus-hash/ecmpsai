import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import SubHeader from "@/components/subheader/sub-header";
import SubHeaderTemplateRenderer, { SubHeaderData } from "@/components/subheader/SubHeaderTemplateRenderer";
import SubHeaderFaqSection from "@/components/subheader/SubHeaderFaqSection";
import { Navbar } from "@/components/layout/navbar";

interface CourseData {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  seoSettings?: {
    title?: string;
    description?: string;
    tags?: string;
    indexing?: boolean;
    crawl?: boolean;
  };
  subHeaders?: SubHeaderData[];
}

interface PageProps {
  params: Promise<{
    slug: string;
    subSlug: string;
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
    console.error("Failed to fetch course details for sub-header route:", error);
  }
  return null;
}

function findMatchingSubHeader(course: CourseData, subSlug: string): SubHeaderData | null {
  if (!course || !course.subHeaders || !Array.isArray(course.subHeaders)) {
    return null;
  }

  const targetSlug = subSlug.toLowerCase().trim();
  return (
    course.subHeaders.find((sh) => {
      const cleanUrl = (sh.url || "").replace(/^\/+|\/+$/g, "").toLowerCase();
      return cleanUrl === targetSlug;
    }) || null
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const course = await fetchCourse(slug);

  if (!course) {
    return {
      title: "Page Not Found | eCampus",
    };
  }

  const subHeader = findMatchingSubHeader(course, subSlug);
  if (!subHeader) {
    return {
      title: "Sub-page Not Found | eCampus",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4001";
  const metaDescription =
    subHeader.templateData?.description ||
    subHeader.templateData?.introText ||
    course.seoSettings?.description ||
    course.description;

  return {
    title: `${subHeader.title} - ${course.name} | eCampus`,
    description: metaDescription,
    keywords: course.seoSettings?.tags,
    alternates: {
      canonical: `${baseUrl}/${course.slug}/${subSlug}`,
    },
    robots: {
      index: course.seoSettings?.indexing !== false,
      follow: course.seoSettings?.crawl !== false,
      googleBot: {
        index: course.seoSettings?.indexing !== false,
        follow: course.seoSettings?.crawl !== false,
      },
    },
    openGraph: {
      title: `${subHeader.title} - ${course.name}`,
      description: metaDescription,
      url: `${baseUrl}/${course.slug}/${subSlug}`,
      siteName: "eCampus",
      type: "website",
      images: course.image ? [{ url: course.image }] : [],
    },
  };
}

export default async function SubHeaderDynamicPage({ params }: PageProps) {
  const { slug, subSlug } = await params;
  const course = await fetchCourse(slug);

  if (!course) {
    notFound();
  }

  const subHeader = findMatchingSubHeader(course, subSlug);
  if (!subHeader) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
      <Navbar />
      <SubHeader subHeaders={course.subHeaders} courseSlug={course.slug} />

      <div className="flex-1 pt-6">
        <SubHeaderTemplateRenderer subHeader={subHeader} course={course} />
        <SubHeaderFaqSection faqs={subHeader.faqs} title={subHeader.title} />
      </div>

      <Footer />
    </main>
  );
}
