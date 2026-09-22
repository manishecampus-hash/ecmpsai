import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Eye,
  Calendar,
  Sparkles,
} from "lucide-react";
import { blogs } from "@/data/blog-data";
import { TableOfContents } from "@/components/blog-content/TableOfContents";
import { RelatedPosts } from "@/components/blog-content/RealetedPost";
import { BlogContent } from "@/components/blog-content/blog-content";
import { sanitizeAutoLinks } from "@/lib/utils";
import { ShareSaveButtons } from "@/components/blog-content/ShareSaveButtons";
import { Footer } from "@/components/layout/footer";
import { BlogViewCounter } from "@/components/blog-content/BlogViewCounter";
import { ApplicationForm } from "@/components/form/common-form";
import { cache } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pageMaxWidth = "1264px";

function parseHtmlContent(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  let index = 0;

  const modifiedHtml = html.replace(
    /<(h[123])([^>]*)>([\s\S]*?)<\/h[123]>/gi,
    (match, tag, attrs, content) => {
      const text = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
      let id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (!id) {
        id = `heading-${index++}`;
      } else {
        id = `${id}-${index++}`;
      }

      const tagLower = tag.toLowerCase();
      const level = tagLower === "h1" ? 1 : tagLower === "h2" ? 2 : 3;
      headings.push({ id, text, level });

      return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
    },
  );

  return { html: modifiedHtml, headings };
}

function mapDbBlogToBlog(dbBlog: any) {
  if (Array.isArray(dbBlog.content)) {
    return dbBlog;
  }

  const { html, headings } = parseHtmlContent(
    sanitizeAutoLinks(dbBlog.content || ""),
  );

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

  const plainText = (dbBlog.content || "").replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTimeVal = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeVal} min read`;

  const imageSrc = dbBlog.imageUrl || "";
  const authorName = dbBlog.publisher || "eCampus Editorial Team";

  return {
    id: dbBlog.id || dbBlog._id || String(Math.random()),
    category: dbBlog.category || "General",
    title: dbBlog.title || "",
    imageSrc,
    mobileImageSrc: dbBlog.mobileImageUrl || "",
    excerpt: dbBlog.excerpt || "",
    description: dbBlog.excerpt || "",
    author: authorName,
    authorInitial: authorName.charAt(0).toUpperCase(),
    authorBio:
      "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
    authorImage: dbBlog.publisherImage || "",
    date: formattedDate,
    readTime,
    reads: typeof dbBlog.view === "number" ? `${dbBlog.view} Reads` : "0 Reads",
    view: typeof dbBlog.view === "number" ? dbBlog.view.toLocaleString() : "0",
    slug: (dbBlog.url || dbBlog.slug || "").replace(/^\/+|\/+$/g, ""),
    tags: dbBlog.tags || [],
    headings,
    content: html,
  };
}

const getBlogBySlug = cache(async (slug: string) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

  try {
    const res = await fetch(
      `${apiUrl}/blogs/by-slug/${encodeURIComponent(cleanSlug)}`,
      {
        next: { revalidate: 30 },
      },
    );
    if (res.ok) {
      const dbBlog = await res.json();
      if (dbBlog && dbBlog.id) {
        if (dbBlog.status === "inactive") return null;
        return dbBlog;
      }
    }
  } catch (err) {
    console.error("Error fetching single blog from API:", err);
  }

  const mockMatched = blogs.find(
    (item) => item.slug.trim().toLowerCase() === cleanSlug,
  );
  return mockMatched || null;
});

const getRelatedBlogs = cache(async () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/blogs/related/posts`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const dbBlogs = await res.json();
      if (Array.isArray(dbBlogs) && dbBlogs.length > 0) {
        const activeBlogs = dbBlogs.filter(
          (blog: any) => blog.status !== "inactive",
        );
        return activeBlogs.map(mapDbBlogToBlog);
      }
    }
  } catch (err) {
    console.error("Error fetching related blogs:", err);
  }
  return blogs.slice(0, 4);
});

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
      <BlogViewCounter blogId={blog.id} />

      {/* ========================================================= */}
      {/* DESKTOP / TABLET LAYOUT (lg:block)                        */}
      {/* ========================================================= */}
      <div className="hidden lg:block blog-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight className="breadcrumb-icon" />
          <Link href="/blog">Blog</Link>
          <ChevronRight className="breadcrumb-icon" />
          <span>{blog.category || "General"}</span>
          <ChevronRight className="breadcrumb-icon" />
          <strong>{blog.title}</strong>
        </nav>

        {/* Blog Main Title */}
        <header className="blog-header-area">
          <h1 className="blog-header-title">{blog.title}</h1>
        </header>

        {/* Two Column Shell */}
        <section className="blog-two-column-layout">
          {/* LEFT COLUMN: SIDEBAR */}
          <aside className="blog-sidebar-col">
            {/* 1. Table of Contents Card */}
            <TableOfContents headings={blog.headings} />

            {/* 2. Apply Now Form Card */}
            <div className="sidebar-apply-card">
              <ApplicationForm />
            </div>
          </aside>

          {/* RIGHT COLUMN: BLOG DETAILS */}
          <article className="blog-content-col">
            {/* 1. Featured Image */}
            {blog.imageSrc ? (
              <figure className="blog-feature-image">
                <Image
                  src={blog.imageSrc}
                  alt={blog.title}
                  width={900}
                  height={540}
                  sizes="860px"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "16px",
                  }}
                  priority
                />
              </figure>
            ) : null}

            {/* 2. Desktop Metadata Bar */}
            <div className="blog-metadata-row">
              <div className="meta-items-group">
                <div className="meta-author-pill">
                  <div className="author-avatar">{blog.authorInitial}</div>
                  <span className="author-name">By {blog.author}</span>
                </div>

                <div className="meta-divider" />

                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{blog.readTime}</span>
                </div>

                <div className="meta-divider" />

                <div className="meta-item">
                  <Eye className="meta-icon" />
                  <span>
                    <strong className="font-bold text-slate-800">
                      {blog.view}
                    </strong>{" "}
                    Views
                  </span>
                </div>

                <div className="meta-divider" />

                <div className="meta-item">
                  <Calendar className="meta-icon" />
                  <span>
                    Updated on{" "}
                    <strong className="font-bold text-slate-800">
                      {blog.date}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="meta-share">
                <ShareSaveButtons />
              </div>
            </div>

            {/* 3. Blog Lead / Excerpt */}
            {blog.description && !isDbBlog && (
              <p className="blog-lead">{blog.description}</p>
            )}

            {/* 4. Complete Blog Body */}
            <BlogContent blog={blog} />

            {/* 5. Related Posts */}
            <div className="related-wrap">
              <RelatedPosts posts={relatedPosts} currentPostId={blog.id} />
            </div>
          </article>
        </section>
      </div>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< lg / lg:hidden) - POLISHED & COMPACT     */}
      {/* Sequence: Featured Image -> Metadata Card -> Title -> TOC -> Content */}
      {/* ========================================================= */}
      <div className="block lg:hidden blog-container">
        {/* Mobile Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight className="breadcrumb-icon" />
          <Link href="/blog">Blog</Link>
          <ChevronRight className="breadcrumb-icon" />
          <strong>{blog.title}</strong>
        </nav>

        <article className="mobile-blog-wrapper">
          {/* 1. Featured Image Banner */}
          {blog.imageSrc ? (
            <figure className="mobile-featured-image">
              <img
                src={blog.imageSrc}
                alt={blog.title}
                className="mobile-img-element"
              />
            </figure>
          ) : null}

          {/* 2. Mobile Metadata Card */}
          <div className="mobile-meta-container">
            {/* Top row: Author & Share button */}
            <div className="mobile-meta-top">
              <div className="meta-author-pill">
                <div className="author-avatar">{blog.authorInitial}</div>
                <span className="author-name">By {blog.author}</span>
              </div>

              <ShareSaveButtons />
            </div>

            <div className="mobile-meta-divider" />

            {/* Bottom row: Compact badges */}
            <div className="mobile-meta-badges">
              <span className="meta-badge">
                <Clock className="mobile-meta-icon" />
                <span>{blog.readTime}</span>
              </span>

              <span className="meta-badge">
                <Eye className="mobile-meta-icon" />
                <span>{blog.view} Views</span>
              </span>

              <span className="meta-badge">
                <Calendar className="mobile-meta-icon" />
                <span>Updated on {blog.date}</span>
              </span>
            </div>
          </div>

          {/* 3. Blog Title Header */}
          <div className="mobile-title-block">
            <div className="mobile-category-chip">
              <Sparkles className="h-3 w-3 text-red-500" />
              <span>{blog.category || "General"}</span>
            </div>
            <h1 className="mobile-blog-title">{blog.title}</h1>
          </div>

          {/* 4. Table of Contents (With subtle boundary & shadow) */}
          <div className="mobile-toc-wrapper">
            <TableOfContents headings={blog.headings} />
          </div>

          {/* 5. Blog Excerpt & Main Content */}
          {blog.description && !isDbBlog && (
            <div className="mobile-lead-box font-medium text-slate-700 leading-relaxed text-sm sm:text-base bg-red-50/40 p-4 rounded-2xl border-l-4 border-red-500 my-2">
              {blog.description}
            </div>
          )}

          <BlogContent blog={blog} />

          {/* 6. Related Posts */}
          <div className="related-wrap">
            <RelatedPosts posts={relatedPosts} currentPostId={blog.id} />
          </div>
        </article>
      </div>

      <Footer />

      <style>{`
        .upgrad-blog-page {
          min-height: 100vh;
          background: #ffffff;
          color: #111827;
        }

        .blog-container {
          width: min(${pageMaxWidth}, calc(100% - 24px));
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
          padding: 16px 0 10px;
          font-size: 11.5px;
          line-height: 1.4;
          color: #6b7280;
        }

        .breadcrumb a {
          color: #4b5563;
          text-decoration: none;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .breadcrumb a:hover {
          color: #ef233c;
        }

        .breadcrumb strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          color: #111827;
        }

        .breadcrumb-icon {
          width: 12px;
          height: 12px;
          color: #9ca3af;
          flex: 0 0 auto;
        }

        .blog-header-area {
          margin-bottom: 20px;
        }

        .blog-header-title {
          max-width: 100%;
          margin: 0;
          color: #0f172a;
          font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.28;
          font-weight: 700;
          letter-spacing: -0.015em;
        }

        /* Desktop Two Column Layout */
        .blog-two-column-layout {
          display: grid;
          grid-template-columns: 360px minmax(0, 1fr);
          gap: 40px;
          align-items: start;
          padding-bottom: 80px;
        }

        /* Left Sidebar Column */
        .blog-sidebar-col {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 20;
        }

        .sidebar-apply-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .sidebar-apply-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
        }

        /* Right Content Column */
        .blog-content-col {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .blog-feature-image {
          width: 100%;
          margin: 0 0 20px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
        }

        /* Desktop Metadata Bar */
        .blog-metadata-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 12px 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          margin-bottom: 28px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
        }

        .meta-items-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13.5px;
          color: #475569;
        }

        .meta-author-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        .author-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12px;
          box-shadow: 0 2px 5px rgba(239, 68, 68, 0.25);
          flex-shrink: 0;
        }

        .author-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 13.5px;
        }

        .meta-divider {
          width: 1px;
          height: 15px;
          background: #cbd5e1;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .meta-icon {
          width: 15px;
          height: 15px;
          color: #ef4444;
          flex-shrink: 0;
        }

        .meta-share {
          display: flex;
          align-items: center;
        }

        .blog-lead {
          margin: 0 0 24px;
          color: #334155;
          font-size: 17px;
          line-height: 1.7;
          font-weight: 400;
          white-space: pre-line;
        }

        .related-wrap {
          margin-top: 48px;
          padding-top: 28px;
          border-top: 1px solid #f1f5f9;
        }

        /* ========================================================= */
        /* POLISHED MOBILE STYLING (< 1024px)                        */
        /* ========================================================= */
        .mobile-blog-wrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 50px;
        }

        .mobile-featured-image {
          width: 100%;
          margin: 0;
          max-height: 195px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px -1px rgba(15, 23, 42, 0.06);
        }

        .mobile-img-element {
          width: 100%;
          height: 195px;
          object-fit: cover;
          display: block;
        }

        .mobile-meta-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 12px 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.04);
        }

        .mobile-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .mobile-meta-divider {
          width: 100%;
          height: 1px;
          background: #f1f5f9;
        }

        .mobile-meta-badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 10px;
        }

        .meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 9px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 600;
          color: #475569;
        }

        .mobile-meta-icon {
          width: 13px;
          height: 13px;
          color: #ef4444;
          flex-shrink: 0;
        }

        .mobile-title-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          margin: 4px 0 2px;
        }

        .mobile-category-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fee2e2;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .mobile-blog-title {
          margin: 0;
          color: #0f172a;
          font-size: clamp(19px, 5.2vw, 24px);
          line-height: 1.28;
          font-weight: 800;
          letter-spacing: -0.015em;
        }

        .mobile-toc-wrapper {
          margin: 2px 0 6px;
        }

        @media (max-width: 480px) {
          .mobile-featured-image,
          .mobile-img-element {
            max-height: 175px;
            height: 175px;
          }

          .meta-badge {
            font-size: 11px;
            padding: 3.5px 8px;
          }

          .mobile-blog-title {
            font-size: 19px;
          }
        }
      `}</style>
    </main>
  );
}
