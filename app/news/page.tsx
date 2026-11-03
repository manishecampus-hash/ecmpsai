import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import NewsHero, { NewsHeroItem } from "@/components/news/news-hero";
import NewsCategories from "@/components/news/news-categories";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Dynamic SEO metadata implementation for /news
export async function generateMetadata(): Promise<Metadata> {
  const backendUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_BACKEND_API_URL || "http://localhost:4000";

  let seoTitle = "Latest Education News, Updates & Events | eCampus";
  let seoDescription =
    "Stay informed with the latest higher education news, university policy updates, admission announcements, webinars, and masterclasses on eCampus.";
  let seoKeywords = "education news, university updates, college admissions, masterclasses, webinars, higher education";
  let indexing = true;
  let crawl = true;
  let canonicalUrl = "/news";

  try {
    const res = await fetch(`${backendUrl}/api/settings/news-list`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const data = await res.json();
      const seo = data.seoSettings;
      if (seo) {
        if (seo.title) seoTitle = seo.title;
        if (seo.description) seoDescription = seo.description;
        if (seo.tags) seoKeywords = seo.tags;
        if (typeof seo.indexing === "boolean") indexing = seo.indexing;
        if (typeof seo.crawl === "boolean") crawl = seo.crawl;
        if (seo.rewriteUrl) canonicalUrl = seo.rewriteUrl.replace(/\/events\/?$/, "/news");
      }
    }
  } catch (err) {
    console.error("Error fetching news-list SEO settings:", err);
  }

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    robots: {
      index: indexing,
      follow: crawl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "eCampus",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

function mapDbEventToNewsItem(dbEvent: any): NewsHeroItem {
  let formattedDate = "Recent";
  if (dbEvent.createdAt) {
    try {
      formattedDate = new Date(dbEvent.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      formattedDate = dbEvent.createdAt;
    }
  }

  const rawSlug = (dbEvent.url || dbEvent.slug || "").replace(/^\/+|\/+$/g, "");
  const cleanSlug = rawSlug.replace(/^(events|news)\//i, "");

  const imageSrc = dbEvent.imageUrl || "/blogs/top-career.png";

  return {
    id: dbEvent.id || dbEvent._id || String(Math.random()),
    title: dbEvent.title || "Untitled News",
    slug: cleanSlug,
    category: dbEvent.category || "News",
    author: dbEvent.publisher || "eCampus Team",
    authorImage: dbEvent.publisherImage || "",
    imageSrc,
    mobileImageSrc: dbEvent.mobileImageUrl || "",
    excerpt: dbEvent.excerpt || "",
    description: dbEvent.excerpt || "",
    date: formattedDate,
    reads: typeof dbEvent.view === "number" ? `${dbEvent.view} Views` : "0 Views",
    view: typeof dbEvent.view === "number" ? String(dbEvent.view) : "0",
    inCarousel: Boolean(dbEvent.inCarousel),
    carouselOrder: typeof dbEvent.carouselOrder === "number" ? dbEvent.carouselOrder : 999,
  };
}

async function getNews(): Promise<NewsHeroItem[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  const backendUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_BACKEND_API_URL || "http://localhost:4000";

  // First try frontend API (port 5000)
  try {
    const res = await fetch(`${apiUrl}/events`, {
      next: { revalidate: 15 },
    });
    if (res.ok) {
      const dbEvents = await res.json();
      if (Array.isArray(dbEvents) && dbEvents.length > 0) {
        const activeEvents = dbEvents.filter(
          (item: any) => item.status !== "inactive",
        );
        return activeEvents.map(mapDbEventToNewsItem);
      }
    }
  } catch (err) {
    console.warn("Could not fetch events from frontend API, trying backend API...", err);
  }

  // Fallback to backend API (port 4000)
  try {
    const res = await fetch(`${backendUrl}/api/events`, {
      next: { revalidate: 15 },
    });
    if (res.ok) {
      const data = await res.json();
      const eventsList = Array.isArray(data) ? data : data.events || [];
      if (eventsList.length > 0) {
        const activeEvents = eventsList.filter(
          (item: any) => item.status !== "inactive",
        );
        return activeEvents.map(mapDbEventToNewsItem);
      }
    }
  } catch (err) {
    console.error("Error fetching news from backend API:", err);
  }

  return [];
}

export default async function NewsPage() {
  const allNews = await getNews();

  // Sort all news by updatedAt / createdAt descending
  const sortedAllNews = [...allNews].sort((a, b) => {
    const dateA = new Date((a as any).updatedAt || (a as any).createdAt || a.date || 0).getTime();
    const dateB = new Date((b as any).updatedAt || (b as any).createdAt || b.date || 0).getTime();
    return dateB - dateA;
  });

  // Filter and sort items configured for the hero slider/carousel
  const sliderItems = allNews
    .filter((item) => item.inCarousel)
    .sort((a, b) => (a.carouselOrder || 999) - (b.carouselOrder || 999));

  // Fallback to top 4 latest if none explicitly marked inCarousel
  const newsToShow = sliderItems.length > 0 ? sliderItems : sortedAllNews.slice(0, 4);
  const featuredNews = newsToShow[0] ?? sortedAllNews[0];

  return (
    <main className={`min-h-screen bg-white text-gray-700 ${poppins.className}`}>
      {/* Page Header Title */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-6 pb-2 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          eCampus News & Updates
        </h1>
      </div>

      {/* Hero Carousel Slider */}
      {featuredNews && (
        <NewsHero news={featuredNews} allNews={newsToShow} />
      )}

      {/* News Categories & Directory Grid */}
      <NewsCategories news={sortedAllNews} />

      <Footer />
    </main>
  );
}
