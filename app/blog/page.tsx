import { blogs } from "@/data/blog-data";
import BlogHero from "@/components/blog/blog-hero";
import BlogCategories from "@/components/blog/blog-categories";
import RecommendedPrograms from "@/components/blog/recommended-programs";

function mapDbBlogToBlog(dbBlog: any) {
  if (Array.isArray(dbBlog.content)) {
    return dbBlog; // already a mock blog object
  }

  // Format date
  let formattedDate = "Jun 8, 2026";
  if (dbBlog.createdAt) {
    try {
      formattedDate = new Date(dbBlog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      formattedDate = dbBlog.createdAt;
    }
  }

  // Calculate read time
  const plainText = (dbBlog.content || "").replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTimeVal = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeVal} min read`;

  // Fallback image
  const imageSrc = dbBlog.imageUrl || "/blogs/top-career.png";

  return {
    id: dbBlog.id || dbBlog._id || String(Math.random()),
    category: dbBlog.category || "General",
    title: dbBlog.title || "",
    imageSrc,
    excerpt: dbBlog.excerpt || "",
    description: dbBlog.excerpt || "", // use excerpt as description/lead paragraph
    author: dbBlog.publisher || "eCampus Team",
    authorBio: "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
    authorImage: dbBlog.publisherImage || "",
    date: formattedDate,
    readTime,
    reads: dbBlog.view ? `${dbBlog.view} Reads` : "1.2K Reads",
    view: dbBlog.view || "1.2K",
    slug: dbBlog.url || "",
    tags: dbBlog.tags || [],
    headings: [],
    content: dbBlog.content || "",
    inCarousel: dbBlog.inCarousel || false,
    carouselOrder: typeof dbBlog.carouselOrder === "number" ? dbBlog.carouselOrder : 999,
    updatedAt: dbBlog.updatedAt || "",
    createdAt: dbBlog.createdAt || "",
  };
}

async function getBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const dbBlogs = await res.json();
      if (dbBlogs && dbBlogs.length > 0) {
        const activeBlogs = dbBlogs.filter((blog: any) => blog.status !== "inactive");
        return activeBlogs.map(mapDbBlogToBlog);
      }
    }
  } catch (err) {
    console.error("Error fetching blogs for list page:", err);
  }
  return blogs; // fallback to mock blogs
}

export default async function BlogPage() {
    const allBlogs = await getBlogs();
    
    // Sort all blogs by updatedAt latest first (falling back to createdAt or mock date)
    const sortedAllBlogs = [...allBlogs].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || (a as any).date || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || (b as any).date || 0).getTime();
      return dateB - dateA;
    });

    // Filter and sort blogs configured for the slider/carousel in CMS
    const sliderBlogs = allBlogs
        .filter((blog) => blog.inCarousel)
        .sort((a, b) => a.carouselOrder - b.carouselOrder);
        
    // Fallback to first 4 blogs if none are set in the slider carousel
    const blogsToShow = sliderBlogs.length > 0 ? sliderBlogs : sortedAllBlogs.slice(0, 4);
    const featuredBlog = blogsToShow[0] ?? allBlogs[0];

    return (
        <main className="min-h-screen bg-white text-gray-700">
            {/* Blog hero slider */}
            <BlogHero blog={featuredBlog} blogs={blogsToShow} />

            {/* Blog list receives full data so filtering and load more can work */}
            <BlogCategories blogs={sortedAllBlogs} />
            <RecommendedPrograms />
        </main>
    );
}