// import { notFound } from "next/navigation";
// import { blogs } from "@/data/blog-data";

// type Props = {
//     params: Promise<{
//         slug: string;
//     }>;
// };

// export async function generateStaticParams() {
//     return blogs.map((blog) => ({
//         slug: blog.slug,
//     }));
// }

// export default async function BlogDetailPage({ params }: Props) {
//     const { slug } = await params;

//     const blog = blogs.find(
//         (item) => item.slug.trim().toLowerCase() === slug.trim().toLowerCase()
//     );

//     if (!blog) {
//         return (
//             <main className="min-h-screen bg-white">
//                 <div className="mx-auto max-w-4xl px-6 py-20">
//                     <h1 className="text-3xl font-bold text-red-600">
//                         Blog Not Found
//                     </h1>

//                     <p className="mt-4 text-gray-600">
//                         Requested slug: {slug}
//                     </p>

//                     <div className="mt-8">
//                         <h2 className="font-semibold">Available Slugs:</h2>

//                         <ul className="mt-3 space-y-2">
//                             {blogs.map((b) => (
//                                 <li key={b.id} className="text-blue-600">
//                                     {b.slug}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </main>
//         );
//     }

//     return (
//         <main className="min-h-screen bg-white">
//             <article className="mx-auto max-w-4xl px-6 py-16">
//                 <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                     {blog.category}
//                 </span>

//                 <h1 className="mt-6 text-4xl font-bold text-gray-900">
//                     {blog.title}
//                 </h1>

//                 <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
//                     <span>{blog.author}</span>
//                     <span>•</span>
//                     <span>{blog.date}</span>
//                     <span>•</span>
//                     <span>{blog.reads}</span>
//                 </div>

//                 <div className="mt-10">
//                     <p className="text-xl leading-8 text-gray-600">
//                         {blog.excerpt}
//                     </p>
//                 </div>
//             </article>
//         </main>
//     );
// }

// ── Server Component — NO "use client" ──

// ── Server Component — NO "use client" ──

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { blogs } from "@/data/blog-data";
import { TableOfContents } from "@/components/blog-content/TableOfContents";
import { RelatedPosts } from "@/components/blog-content/RealetedPost";
import { BlogContent } from "@/components/blog-content/blog-content";
import { ShareSaveButtons } from "@/components/blog-content/ShareSaveButtons";
import { ConsultationForm } from "@/components/blog-content/ConsultationForm";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageMaxWidth = "1264px";

function parseHtmlContent(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  let index = 0;
  
  // Replace <h1>, <h2> and <h3> tags and inject an id
  const modifiedHtml = html.replace(/<(h[123])([^>]*)>([\s\S]*?)<\/h[123]>/gi, (match, tag, attrs, content) => {
    // Strip HTML tags from the content to get clean text
    const text = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    // Generate a unique-ish kebab-case ID
    let id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces and dashes
      .replace(/\s+/g, "-")         // replace spaces with single dash
      .replace(/-+/g, "-")          // replace multiple dashes with single dash
      .replace(/^-+|-+$/g, "");     // trim dashes from start/end
      
    if (!id) {
      id = `heading-${index++}`;
    } else {
      id = `${id}-${index++}`; // ensure uniqueness
    }
    
    const tagLower = tag.toLowerCase();
    const level = tagLower === "h1" ? 1 : tagLower === "h2" ? 2 : 3;
    headings.push({ id, text, level });
    
    return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
  });
  
  return { html: modifiedHtml, headings };
}

function mapDbBlogToBlog(dbBlog: any) {
  if (Array.isArray(dbBlog.content)) {
    return dbBlog; // already a mock blog object
  }

  // Generate headings and process HTML
  const { html, headings } = parseHtmlContent(dbBlog.content || "");

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
    authorImage: "/images/authors/ecampus-team.png",
    date: formattedDate,
    readTime,
    reads: dbBlog.view ? `${dbBlog.view} Reads` : "1.2K Reads",
    view: dbBlog.view || "1.2K",
    slug: dbBlog.url || "",
    tags: dbBlog.tags || [],
    headings,
    content: html,
  };
}

async function getBlogBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const dbBlogs = await res.json();
      
      const normalize = (s: string) => s.replace(/^\/+|\/+$/g, "").toLowerCase().trim();
      const targetSlug = normalize(slug);
      
      const matched = dbBlogs.find((item: any) => normalize(item.url || "") === targetSlug);
      if (matched) {
        return matched;
      }
    } else {
      console.error(`Failed to fetch blogs from API: ${res.statusText}`);
    }
  } catch (err) {
    console.error("Error fetching blog from API:", err);
  }
  
  // Fallback to local mock data
  const mockMatched = blogs.find(
    (item) => item.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );
  return mockMatched || null;
}

async function getRelatedBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const dbBlogs = await res.json();
      if (dbBlogs && dbBlogs.length > 0) {
        return dbBlogs.map(mapDbBlogToBlog);
      }
    }
  } catch (err) {
    console.error("Error fetching related blogs:", err);
  }
  return blogs; // fallback to mock blogs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawBlog = await getBlogBySlug(slug);
  if (!rawBlog) {
    return {
      title: "Blog Not Found",
    };
  }

  const blog = mapDbBlogToBlog(rawBlog);
  const seo = rawBlog.seoSettings || {};
  
  const title = seo.title || blog.title;
  const description = seo.description || blog.excerpt || blog.description;
  const keywords = seo.tags || (blog.tags ? blog.tags.join(", ") : "");
  
  const indexing = seo.indexing !== false;
  const crawl = seo.crawl !== false;

  return {
    title,
    description,
    keywords,
    robots: {
      index: indexing,
      follow: crawl,
    },
    alternates: {
      canonical: seo.rewriteUrl || `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: rawBlog.createdAt,
      modifiedTime: rawBlog.updatedAt,
      images: [
        {
          url: blog.imageSrc,
        },
      ],
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawBlog = await getBlogBySlug(slug);

  if (!rawBlog) notFound();

  const blog = mapDbBlogToBlog(rawBlog);
  const relatedPosts = await getRelatedBlogs();
  const isDbBlog = typeof rawBlog.content === "string";

  return (
    <main className={`upgrad-blog-page ${poppins.className}`}>
      <div className="blog-container breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight className="breadcrumb-icon" />
        <Link href="/blog">Blog</Link>
        <ChevronRight className="breadcrumb-icon" />
        <span>General</span>
        <ChevronRight className="breadcrumb-icon" />
        <strong>{blog.title}</strong>
      </div>

      <section className="blog-container blog-shell">
        <article className="blog-main">
          <header className="blog-hero">
            <h1>{blog.title}</h1>

            <div className="hero-meta-row">
              <div className="hero-meta">
                <Link href="#" className="author-link">
                  By {blog.author}
                </Link>
                <p>
                  Updated on {blog.date} | {blog.readTime} | {blog.view} views
                </p>
              </div>

              <div>
                <ShareSaveButtons />
              </div>
            </div>
          </header>

          <TableOfContents headings={blog.headings} />

          {!isDbBlog && (
            <>
              <p className="blog-lead">{blog.description}</p>

              {blog.imageSrc && (
                <figure className="blog-feature-image">
                  <Image
                    src={blog.imageSrc}
                    alt={blog.title}
                    width={900}
                    height={560}
                    sizes="(max-width: 980px) calc(100vw - 28px), 900px"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "8px",
                    }}
                    priority
                  />
                </figure>
              )}
            </>
          )}

          <BlogContent blog={blog} />

          <div className="related-wrap">
            <RelatedPosts posts={relatedPosts} currentPostId={blog.id} />
          </div>
        </article>

        <aside className="blog-sidebar" aria-label="Consultation form">
          <ConsultationForm />
        </aside>
      </section>

      <button className="back-top" aria-label="Back to top">
        <span />
        <span />
      </button>

      <Footer />

      <style>{`
        .upgrad-blog-page {
          min-height: 100vh;
          background: #ffffff;
          color: #111827;
        }

        .blog-container {
          width: min(${pageMaxWidth}, calc(100% - 40px));
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          padding: 38px 0 30px;
          font-size: 13px;
          line-height: 1.4;
          color: #111827;
        }

        .breadcrumb a {
          color: #111827;
          text-decoration: none;
          flex-shrink: 0;
        }

        .breadcrumb strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        .breadcrumb-icon {
          width: 13px;
          height: 13px;
          color: #6b7280;
          flex: 0 0 auto;
        }

        .blog-shell {
          display: grid;
          grid-template-columns: minmax(0, 868px) 352px;
          gap: 46px;
          align-items: start;
          padding-bottom: 70px;
        }

        .blog-main {
          min-width: 0;
        }

        .blog-hero h1 {
          max-width: 900px;
          margin: 0 0 34px;
          color: #000000;
          font-size: clamp(34px, 3.1vw, 46px);
          line-height: 1.18;
          font-weight: 600;
          letter-spacing: 0;
        }

        .hero-meta-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 42px;
        }

        .hero-meta {
          min-width: 0;
          font-size: 16px;
          line-height: 1.5;
        }

        .author-link {
          display: inline-block;
          color: #111827;
          text-decoration: underline;
          text-underline-offset: 2px;
          margin-bottom: 2px;
        }

        .hero-meta p {
          margin: 0;
          color: #4b5563;
        }

        .share-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
          color: #374151;
          font-size: 16px;
        }

        .blog-lead {
          margin: 30px 0 28px;
          max-width: 900px;
          color: #111827;
          font-size: 18px;
          line-height: 1.75;
          font-weight: 400;
          white-space: pre-line;
        }

        .blog-feature-image {
          width: 100%;
          max-width: 900px;
          margin: 0 0 34px;
        }

        .blog-sidebar {
          position: sticky;
          top: 102px;
          min-width: 0;
        }

        .related-wrap {
          margin-top: 56px;
        }

        .back-top {
          position: fixed;
          left: 50px;
          bottom: 48px;
          width: 72px;
          height: 72px;
          display: none;
          place-items: center;
          border: 1px solid #f43f5e;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 12px 34px rgba(17, 24, 39, 0.08);
          cursor: pointer;
        }

        .back-top span {
          position: absolute;
          width: 16px;
          height: 16px;
          border-left: 3px solid #ef233c;
          border-top: 3px solid #ef233c;
          transform: rotate(45deg);
        }

        .back-top span:first-child {
          margin-top: 10px;
        }

        .back-top span:last-child {
          margin-top: -6px;
        }

        @media (max-width: 1180px) {
          .blog-shell {
            grid-template-columns: minmax(0, 1fr) 320px;
            gap: 32px;
          }

          .blog-lead {
            font-size: 17px;
          }
        }

        @media (max-width: 980px) {
          .blog-shell {
            grid-template-columns: 1fr;
          }

          .blog-sidebar {
            position: static;
            max-width: 420px;
          }

          .hero-meta-row {
            align-items: flex-start;
          }
        }

        @media (max-width: 720px) {
          .blog-container {
            width: min(100% - 28px, ${pageMaxWidth});
          }

          .breadcrumb {
            padding: 22px 0 20px;
            font-size: 12px;
          }

          .blog-hero h1 {
            margin-bottom: 22px;
            font-size: clamp(28px, 9vw, 38px);
          }

          .hero-meta-row {
            flex-direction: column;
            gap: 16px;
            margin-bottom: 28px;
          }

          .hero-meta,
          .share-wrap {
            font-size: 14px;
          }

          .blog-lead {
            margin: 26px 0;
            font-size: 16px;
            line-height: 1.72;
          }

          .blog-sidebar {
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb strong {
            max-width: 180px;
          }

          .share-wrap {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
