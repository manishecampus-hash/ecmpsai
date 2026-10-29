import type { Metadata } from "next";
import { cache } from "react";
import HeroSearch from "@/components/home/hero-search";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import CareerExplorer from "@/components/home/career-explorer";
import ProgramsSection from "@/components/home/online-courses";
import { Footer } from "@/components/layout/footer";
import FAQ from "@/components/home/faq";
import { MediaMarquee } from "@/components/home/media-marquee";
import { StudentStoriesSection } from "@/components/home/student-stories";
import { CarouselBanner } from "@/components/home/carousel-banner";

export const revalidate = 60;

const FRONTEND_API_URL =
  process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

let inMemoryHomepageCache: { data: any; expiresAt: number } | null = null;
let isRefreshingHomepage = false;
const HOMEPAGE_CACHE_TTL = 60 * 1000;

async function getHomepageData() {
  const now = Date.now();

  // Fresh in-memory cache
  if (inMemoryHomepageCache && now < inMemoryHomepageCache.expiresAt) {
    return inMemoryHomepageCache.data;
  }

  // Stale in-memory cache: return immediately and update in background
  if (inMemoryHomepageCache?.data && !isRefreshingHomepage) {
    isRefreshingHomepage = true;
    fetch(`${FRONTEND_API_URL}/homepage`, { next: { revalidate: 60 } })
      .then((res) => (res.ok ? res.json() : null))
      .then((fresh) => {
        if (fresh) {
          inMemoryHomepageCache = {
            data: fresh,
            expiresAt: Date.now() + HOMEPAGE_CACHE_TTL,
          };
        }
      })
      .catch((err) =>
        console.error("Background homepage data fetch error:", err)
      )
      .finally(() => {
        isRefreshingHomepage = false;
      });
    return inMemoryHomepageCache.data;
  }

  try {
    const res = await fetch(`${FRONTEND_API_URL}/homepage`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      inMemoryHomepageCache = {
        data,
        expiresAt: Date.now() + HOMEPAGE_CACHE_TTL,
      };
      return data;
    }
  } catch (err) {
    console.error("Failed to fetch homepage dynamic content from API:", err);
    if (inMemoryHomepageCache?.data) {
      return inMemoryHomepageCache.data;
    }
  }
  return null;
}

const fetchHomepageData = cache(async () => {
  return getHomepageData();
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomepageData();
  const seo = data?.seo;

  const title = seo?.metaTitle || "eCampus — Your Career Starts Here";
  const description =
    seo?.metaDescription ||
    "AI-powered education discovery for Indian Gen Z. Find your perfect degree, compare universities, and get personalised career guidance in seconds.";
  const canonicalUrl = seo?.canonicalUrl || "https://ecampusapp.com";

  return {
    title,
    description,
    keywords: seo?.metaKeywords
      ? seo.metaKeywords.split(",").map((k: string) => k.trim())
      : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: canonicalUrl,
      images: seo?.ogImage
        ? [
            {
              url: seo.ogImage,
              alt: seo.ogImageAltText || title,
            },
          ]
        : undefined,
    },
  };
}

export default async function HomePage() {
  const data = await fetchHomepageData();

  const banners = data?.banner;
  const trendingCourses = data?.trendingCourses;
  const faqs = data?.faqs;
  const jobRoles = data?.jobRoles;
  const jobRoleTitle = data?.jobRoleSettings?.title;

  return (
    <main className="home-sections">
      <div className="mt-1 mb-1">
        <CarouselBanner banners={banners} />
      </div>
      <HeroSearch />
      <PopularCoursesSection courses={trendingCourses} />
      <CareerExplorer jobRoles={jobRoles} title={jobRoleTitle} />
      <ProgramsSection programData={data?.program} />
      <StudentStoriesSection />
      <MediaMarquee articles={data?.media} />
      <FAQ items={faqs} />
      <Footer />
    </main>
  );
}
