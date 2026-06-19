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
import { Calendar, Clock3, User, ChevronRight, Eye } from "lucide-react";
import { blogs } from "@/data/blog-data";
import { TableOfContents } from "@/components/blog-content/TableOfContents";
import { AuthorCard } from "@/components/blog-content/AuthorCard";
import { RelatedPosts } from "@/components/blog-content/RealetedPost";
import { BlogContent } from "@/components/blog-content/blog-content";
import { ShareSaveButtons } from "@/components/blog-content/ShareSaveButtons";
import { ConsultationForm } from "@/components/blog-content/ConsultationForm";
import { ApplicationModal } from "@/components/application-modal";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);
  if (!blog) notFound();

  return (
    <main
      className={`min-h-screen ${poppins.className}`}
      style={{ background: "var(--bg-page)" }}
    >
      {/* ── BREADCRUMB ── */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-surface)",
          paddingTop: "0px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Home
          </Link>
          <ChevronRight
            style={{
              width: 14,
              height: 14,
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          />
          <Link
            href="/blog"
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            Blog
          </Link>
          <ChevronRight
            style={{
              width: 14,
              height: 14,
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "300px",
              fontWeight: 500,
            }}
          >
            {blog.title}
          </span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "24px 16px 40px",
          }}
        >
          {/* Title & Meta */}
          <h1
            style={{
              fontSize: "clamp(1.4rem, 5vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              maxWidth: "800px",
            }}
          >
            {blog.title}
          </h1>

          {/* Meta Info Row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
              fontSize: "13px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "var(--text-muted)",
              }}
            >
              <Calendar style={{ width: 14, height: 14, flexShrink: 0 }} />
              {blog.date}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "var(--text-muted)",
              }}
            >
              <Clock3 style={{ width: 14, height: 14, flexShrink: 0 }} />
              {blog.readTime}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "var(--text-muted)",
              }}
            >
              <Eye style={{ width: 14, height: 14, flexShrink: 0 }} />
              {blog.view}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "var(--text-muted)",
              }}
            >
              <User style={{ width: 14, height: 14, flexShrink: 0 }} />
              {blog.author}
            </span>
          </div>

          {/* Share Buttons */}
          <div style={{ marginBottom: "20px" }}>
            <ShareSaveButtons />
          </div>
          <TableOfContents headings={blog.headings} />
          {/* Description */}
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: "800px",
              marginBottom: "20px",
              fontWeight: 400,
              whiteSpace: "pre-line",
            }}
          >
            {blog.description}
          </p>

          {/* Tags */}
          {/* {blog.tags && blog.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "16px",
              }}
            >
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    background: "var(--bg-page)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {/* ── HERO IMAGE ── */}
        {blog.imageSrc && (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 16px 32px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(220px, 50vw, 420px)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              <Image
                src={blog.imageSrc}
                alt={blog.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 16px 60px",
        }}
      >
        {/* Table of Contents */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* ── ARTICLE ── */}
          <div style={{ minWidth: 0 }}>
            <BlogContent blog={blog} />
          </div>

          {/* ── SIDEBAR ── */}
          <aside>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "sticky",
                top: "100px",
              }}
            >
              {/* Author Card */}
              <AuthorCard
                author={blog.author}
                authorBio={blog.authorBio}
                authorImage={blog.authorImage}
              />

              {/* CTA Box */}
              <div
                style={{
                  borderRadius: "14px",
                  padding: "20px",
                  border: "1px solid var(--border)",
                  background: "var(--bg-surface)",
                }}
              >
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    margin: "0 0 10px",
                  }}
                >
                  Ready to start?
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--text-muted)",
                    margin: "0 0 16px",
                  }}
                >
                  Explore top online universities and take the next step in your
                  career.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <ApplicationModal
                    trigger={
                      <button
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          padding: "11px 14px",
                          fontSize: "13px",
                          fontWeight: 600,
                          background: "var(--accent)",
                          color: "#374151",
                          border: "1px solid #d1d5db",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                      >
                        Apply Now
                      </button>
                    }
                  />

                  <Link
                    href="/discovery"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: "var(--accent)",
                      color: "#fff",
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                      display: "block",
                    }}
                  >
                    Explore Universities
                  </Link>
                </div>
              </div>

              {/* Consultation Form */}
              <ConsultationForm />
            </div>
          </aside>
        </div>

        {/* ── RELATED POSTS ── */}
        <div style={{ marginTop: "60px" }}>
          <RelatedPosts posts={blogs} currentPostId={blog.id} />
        </div>
      </div>

      {/* ── MOBILE RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 300px"] {
            grid-template-columns: 1fr !important;
          }
          aside {
            order: 2;
          }
          [role="article"] {
            order: 1;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
