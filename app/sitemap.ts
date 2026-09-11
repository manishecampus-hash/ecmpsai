import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

async function getBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }
  return [];
}

async function getRootCourses() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Error fetching root courses for sitemap:", err);
  }
  return [];
}

async function getLandingPages() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/landing-pages`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Error fetching landing pages for sitemap:", err);
  }
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecampusapp.com";

  // 1. Standard Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/discover`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.6 },
    { url: `${baseUrl}/study`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/universities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // 2. Dynamic Blog Routes
  const dbBlogs = await getBlogs();
  const blogRoutes: MetadataRoute.Sitemap = dbBlogs
    .filter((blog: any) => {
      if (blog.status === "inactive") return false;
      if (blog.seoSettings && blog.seoSettings.sitemap === false) return false;
      return true;
    })
    .map((blog: any) => {
      const slug = (blog.url || "").replace(/^\/+|\/+$/g, "");
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

  // 3. Dynamic Root Courses & Sub-Header Page Routes
  const dbCourses = await getRootCourses();
  const courseRoutes: MetadataRoute.Sitemap = [];

  for (const course of dbCourses) {
    if (course.status === "inactive") continue;
    if (course.seoSettings && course.seoSettings.sitemap === false) continue;

    const courseSlug = (course.slug || "").replace(/^\/+|\/+$/g, "");
    if (courseSlug) {
      // Main root course URL
      courseRoutes.push({
        url: `${baseUrl}/${courseSlug}`,
        lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // Sub-header page URLs (only relative URLs, skipping anchors #)
      if (Array.isArray(course.subHeaders)) {
        for (const sh of course.subHeaders) {
          if (sh.urlType === "relative" && sh.url) {
            if (sh.seoSettings && sh.seoSettings.sitemap === false) continue;
            const subSlug = (sh.url || "").replace(/^\/+|\/+$/g, "");
            if (subSlug) {
              courseRoutes.push({
                url: `${baseUrl}/${courseSlug}/${subSlug}`,
                lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
              });
            }
          }
        }
      }
    }
  }

  // 4. Dynamic Landing Page Routes
  const dbLandingPages = await getLandingPages();
  const landingPageRoutes: MetadataRoute.Sitemap = dbLandingPages
    .filter((lp: any) => {
      if (lp.status === "inactive") return false;
      if (lp.seoSettings && lp.seoSettings.sitemap === false) return false;
      return true;
    })
    .map((lp: any) => {
      const slug = (lp.slug || "").replace(/^\/+|\/+$/g, "");
      return {
        url: `${baseUrl}/lp/${slug}`,
        lastModified: lp.updatedAt ? new Date(lp.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    });

  return [...staticRoutes, ...blogRoutes, ...courseRoutes, ...landingPageRoutes];
}

