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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4001";
  
  // 1. Static routes of the web application
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/discover`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.6 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // 2. Dynamic blog routes from the database
  const dbBlogs = await getBlogs();
  const blogRoutes = dbBlogs
    .filter((blog: any) => {
      // Exclude inactive blogs
      if (blog.status === "inactive") return false;
      // Exclude if sitemap is explicitly set to false in SEO Settings
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

  // 3. Dynamic root course routes from the database
  const dbCourses = await getRootCourses();
  const courseRoutes = dbCourses
    .filter((course: any) => {
      if (course.status === "inactive") return false;
      if (course.seoSettings && course.seoSettings.sitemap === false) return false;
      return true;
    })
    .map((course: any) => {
      const slug = (course.slug || "").replace(/^\/+|\/+$/g, "");
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...blogRoutes, ...courseRoutes];
}
