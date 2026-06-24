import { MetadataRoute } from "next";

async function getBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      next: { revalidate: 3600 }, // Cache for 1 hour for sitemap calls
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
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

  return [...staticRoutes, ...blogRoutes];
}
