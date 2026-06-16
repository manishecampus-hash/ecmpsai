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

import Link from "next/link";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Clock3,
    User,
    ChevronRight,
} from "lucide-react";
import { blogs } from "@/data/blog-data";
import { TableOfContents } from "@/components/blog-content/TableOfContents";
import { AuthorCard } from "@/components/blog-content/AuthorCard";
import { RelatedPosts } from "@/components/blog-content/RealetedPost";
import { BlogContent } from "@/components/blog-content/blog-content";
import { ShareSaveButtons } from "@/components/blog-content/ShareSaveButtons";
import { ApplicationModal } from "@/components/application-modal";
import { Footer } from "@/components/layout/footer";

// ── Module level — NOT inside the function ──
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
            style={{ background: "var(--bg-page)", paddingTop: "80px" }}
        >
            {/* ── BREADCRUMB ── */}
            <div
                style={{
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-surface)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: "10px 16px",
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
                        style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }}
                    />
                    <Link
                        href="/blog"
                        style={{ color: "var(--text-muted)", textDecoration: "none" }}
                    >
                        Blog
                    </Link>
                    <ChevronRight
                        style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }}
                    />
                    <span
                        style={{
                            color: "var(--text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                        }}
                    >
                        {blog.title}
                    </span>
                </div>
            </div>

            {/* ── HERO ── */}
            <div
                style={{
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-surface)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: "32px 16px 40px",
                    }}
                >
                    <Link
                        href="/blog"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "var(--accent)",
                            textDecoration: "none",
                            marginBottom: "24px",
                        }}
                    >
                        <ArrowLeft style={{ width: 16, height: 16 }} />
                        Back to all posts
                    </Link>

                    {/* Meta row */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "16px",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "13px",
                                color: "var(--text-muted)",
                            }}
                        >
                            <Calendar style={{ width: 14, height: 14 }} />
                            {blog.date}
                        </span>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "13px",
                                color: "var(--text-muted)",
                            }}
                        >
                            <Clock3 style={{ width: 14, height: 14 }} />
                            {blog.readTime}
                        </span>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "13px",
                                color: "var(--text-muted)",
                            }}
                        >
                            <User style={{ width: 14, height: 14 }} />
                            {blog.author}
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(1.1rem, 4vw, 2.2rem)",
                            fontWeight: 500,
                            lineHeight: 1.25,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                            maxWidth: "800px",
                            margin: 0,
                            fontFamily: "inherit",
                        }}
                    >
                        {blog.title}
                    </h1>

                    <p
                        style={{
                            marginTop: "14px",
                            fontSize: "clamp(0.9rem, 2vw, 1rem)",
                            lineHeight: 1.7,
                            color: "var(--text-muted)",
                            maxWidth: "680px",
                            fontWeight: 400,
                        }}
                    >
                        {blog.description}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
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
                                        padding: "3px 10px",
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
                    )}

                    <ShareSaveButtons />
                </div>
            </div>

            {/* ── BODY ── */}
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "40px 16px 60px",
                }}
            >
                <div
                    className="blog-body-grid"
                    style={{
                        display: "grid",
                        gap: "32px",
                        gridTemplateColumns: "1fr",
                        gridTemplateAreas: '"article" "sidebar"',
                    }}
                >
                    {/* LEFT TOC */}
                    <aside className="blog-toc" style={{ display: "none" }}>
                        <div style={{ position: "sticky", top: "100px" }}>
                            <TableOfContents headings={blog.headings} />
                        </div>
                    </aside>

                    {/* CENTER — Article */}
                    <div style={{ gridArea: "article", minWidth: 0 }}>
                        <BlogContent blog={blog} />
                    </div>

                    {/* RIGHT — Sidebar */}
                    <aside style={{ gridArea: "sidebar" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <AuthorCard
                                author={blog.author}
                                authorBio={blog.authorBio}
                                authorImage={blog.authorImage}
                            />

                            {/* CTA */}
                            <div
                                style={{
                                    borderRadius: "16px",
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
                                        margin: "0 0 8px",
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
                                    Explore top online universities and take the next step in your career.
                                </p>

                                <ApplicationModal
                                    trigger={
                                        <button
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                textAlign: "center",
                                                borderRadius: "12px",
                                                padding: "10px",
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                background: "var(--accent)",
                                                color: "#374151",
                                                border: "1px solid #d1d5db", // gray border
                                                cursor: "pointer",
                                            }}
                                        >
                                            Apply Now
                                        </button>
                                    }
                                />

                                <Link
                                    href="/discovery"
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        textAlign: "center",
                                        borderRadius: "12px",
                                        padding: "10px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        background: "var(--accent)",
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Explore Universities
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>

                <RelatedPosts posts={blogs} currentPostId={blog.id} />
            </div>

            <Footer />
            <style>{`
        @media (min-width: 768px) {
          .blog-body-grid {
            grid-template-columns: 1fr 260px !important;
            grid-template-areas: "article sidebar" !important;
          }
        }
        @media (min-width: 1024px) {
          .blog-body-grid {
            grid-template-columns: 210px 1fr 260px !important;
            grid-template-areas: "toc article sidebar" !important;
          }
          .blog-toc {
            display: block !important;
            grid-area: toc;
          }
        }
      `}</style>
        </main>
    );
} 