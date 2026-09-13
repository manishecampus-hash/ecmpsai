import type { Metadata } from "next";
import HeroSearch from "@/components/home/hero-search";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import CareerExplorer from "@/components/home/career-explorer";
import ProgramsSection from "@/components/home/online-courses";
import { Footer } from "@/components/layout/footer";
import FAQ from "@/components/home/faq";
import { GraduatesMarquee } from "@/components/home/graduates-marquee";
import { MediaSection } from "@/components/home/media";
import { CarouselBanner } from "@/components/home/carousel-banner";
import type { GraduateTestimonialT } from "@/data/graduates";

const FRONTEND_API_URL =
  process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

async function fetchHomepageData() {
  try {
    const res = await fetch(`${FRONTEND_API_URL}/homepage`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`Homepage API returned status ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch homepage dynamic content from API:", err);
    return null;
  }
}

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

function mapSuccessStories(stories?: any[]): GraduateTestimonialT[] | undefined {
  if (!stories || !Array.isArray(stories) || stories.length === 0) return undefined;

  return stories.map((s, idx) => ({
    initials: s.name
      ? s.name
          .split(" ")
          .map((w: string) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "EC",
    avatarColor: idx % 2 === 0 ? "#ef4444" : "#f97316",
    avatarSrc: s.image,
    altText: s.altText || s.name,
    storySrc: s.storyImage,
    name: s.name,
    role: s.programName
      ? `${s.programName}${s.graduationDate ? `, ${s.graduationDate}` : ""}`
      : "Graduate",
    rating: typeof s.rating === "number" ? s.rating : 5,
    testimonial: s.mainQuote || s.shortDescription || "",
  }));
}

export default async function HomePage() {
  const data = await fetchHomepageData();

  const banners = data?.banner;
  const trendingCourses = data?.trendingCourses;
  const mediaArticles = data?.media;
  const mappedGraduates = mapSuccessStories(data?.successStories);
  const faqs = data?.faqs;

  return (
    <main className="home-sections">
      <div className="mt-1 mb-1">
        <CarouselBanner banners={banners} />
      </div>
      <HeroSearch />
      <PopularCoursesSection courses={trendingCourses} />
      <CareerExplorer />
      <ProgramsSection />
      <MediaSection articles={mediaArticles} />
      <GraduatesMarquee graduates={mappedGraduates} />
      <FAQ items={faqs} />
      <Footer />
    </main>
  );
}
