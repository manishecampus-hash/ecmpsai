import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Sparkles,
  Clock,
  Eye,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { TableOfContents } from "@/components/blog-content/TableOfContents";
import { RelatedEvents } from "@/components/event-content/RelatedEvents";
import { BlogContent } from "@/components/blog-content/blog-content";
import { sanitizeAutoLinks } from "@/lib/utils";
import { ShareSaveButtons } from "@/components/blog-content/ShareSaveButtons";
import { Footer } from "@/components/layout/footer";
import { EventViewCounter } from "@/components/event-content/EventViewCounter";
import { ApplicationForm } from "@/components/form/common-form";
import { ScrollToTopButton } from "@/components/blog-content/ScrollToTopButton";
import { cache } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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

function mapDbEventToEvent(dbEvent: any) {
  const { html, headings } = parseHtmlContent(
    sanitizeAutoLinks(dbEvent.content || ""),
  );

  let formattedDate = "Coming Soon";
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

  const plainText = (dbEvent.content || "").replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTimeVal = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeVal} min read`;

  const imageSrc = dbEvent.imageUrl || "";
  const authorName = dbEvent.publisher || "eCampus Team";
  const rawSlug = (dbEvent.url || dbEvent.slug || "").replace(/^\/+|\/+$/g, "");
  const cleanSlug = rawSlug.replace(/^events\//i, "");

  return {
    id: dbEvent.id || dbEvent._id || String(Math.random()),
    category: dbEvent.category || "General",
    title: dbEvent.title || "",
    imageSrc,
    mobileImageSrc: dbEvent.mobileImageUrl || "",
    excerpt: dbEvent.excerpt || "",
    description: dbEvent.excerpt || "",
    author: authorName,
    authorInitial: authorName.charAt(0).toUpperCase(),
    authorBio:
      "eCampus events bring together top university representatives, admission advisors, and industry educators for distance and online learning.",
    authorImage: dbEvent.publisherImage || "",
    date: formattedDate,
    readTime,
    reads: typeof dbEvent.view === "number" ? `${dbEvent.view} Views` : "0 Views",
    view: typeof dbEvent.view === "number" ? dbEvent.view.toLocaleString() : "0",
    slug: cleanSlug,
    tags: dbEvent.tags || [],
    headings,
    content: html,
  };
}

const getEventBySlug = cache(async (slug: string) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "").replace(/^events\//i, "").toLowerCase().trim();

  try {
    const res = await fetch(
      `${apiUrl}/events/by-slug/${encodeURIComponent(cleanSlug)}`,
      {
        next: { revalidate: 30 },
      },
    );
    if (res.ok) {
      const dbEvent = await res.json();
      if (dbEvent && dbEvent.id) {
        if (dbEvent.status === "inactive") return null;
        return dbEvent;
      }
    }
  } catch (err) {
    console.error("Error fetching single event from API:", err);
  }

  return null;
});

const getRelatedEvents = cache(async () => {
  const apiUrl =
    process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/events/related/posts`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const dbEvents = await res.json();
      if (Array.isArray(dbEvents) && dbEvents.length > 0) {
        const activeEvents = dbEvents.filter(
          (e: any) => e.status !== "inactive",
        );
        return activeEvents.map(mapDbEventToEvent);
      }
    }
  } catch (err) {
    console.error("Error fetching related events:", err);
  }
  return [];
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawEvent = await getEventBySlug(slug);
  if (!rawEvent) {
    return {
      title: "Event Not Found | eCampus",
    };
  }

  const event = mapDbEventToEvent(rawEvent);
  const seo = rawEvent.seoSettings || {};

  const title = seo.title || `${event.title} | eCampus Events`;
  const description = seo.description || event.excerpt || event.description;
  const keywords = seo.tags || (event.tags ? event.tags.join(", ") : "");

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
      canonical: seo.rewriteUrl || `/events/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: rawEvent.createdAt,
      modifiedTime: rawEvent.updatedAt,
      images: event.imageSrc ? [{ url: event.imageSrc }] : [],
    },
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawEvent = await getEventBySlug(slug);

  if (!rawEvent) notFound();

  const event = mapDbEventToEvent(rawEvent);
  const relatedEvents = await getRelatedEvents();

  return (
    <main className={`upgrad-blog-page ${poppins.className}`}>
      <EventViewCounter eventId={event.id} />

      {/* ========================================================= */}
      {/* DESKTOP / TABLET LAYOUT (lg:block)                        */}
      {/* ========================================================= */}
      <div className="hidden lg:block blog-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight className="breadcrumb-icon" />
          <Link href="/events">Events</Link>
          <ChevronRight className="breadcrumb-icon" />
          <span>{event.category || "General"}</span>
          <ChevronRight className="breadcrumb-icon" />
          <strong>{event.title}</strong>
        </nav>

        {/* Two Column Shell */}
        <section className="blog-two-column-layout">
          {/* LEFT COLUMN: SIDEBAR */}
          <aside className="blog-sidebar-col">
            {/* 1. Table of Contents Card */}
            {event.headings.length > 0 && (
              <TableOfContents headings={event.headings} collapsible={false} />
            )}

            {/* 2. Registration / Inquiry Form Card */}
            <div className="sidebar-apply-card">
              <ApplicationForm />
            </div>
          </aside>

          {/* RIGHT COLUMN: EVENT DETAILS */}
          <article className="blog-content-col">
            {/* 1. Event Main Title */}
            <header className="blog-header-area">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                <Sparkles size={13} />
                <span>{event.category || "Event"}</span>
              </div>
              <h1 className="blog-header-title">{event.title}</h1>
            </header>

            {/* 2. Featured Image */}
            {event.imageSrc ? (
              <figure className="blog-feature-image">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  width={1200}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 860px"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "520px",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "16px",
                  }}
                  priority
                />
              </figure>
            ) : null}

            {/* 3. Metadata Bar */}
            <div className="blog-metadata-bar">
              <div className="meta-left-group">
                <div className="author-avatar">{event.authorInitial}</div>
                <span className="author-name inline-flex items-center gap-1">
                  <span>Organized by {event.author}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-50 shrink-0 stroke-[2.5]" />
                </span>
                <span className="meta-dot">•</span>
                <span className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{event.readTime}</span>
                </span>
                <span className="meta-dot">•</span>
                <span className="meta-item">
                  <Eye className="meta-icon" />
                  <span>{event.view} views</span>
                </span>
                <span className="meta-dot">•</span>
                <span className="meta-item">
                  <Calendar className="meta-icon" />
                  <span>{event.date}</span>
                </span>
              </div>

              <ShareSaveButtons />
            </div>

            {/* 4. Event Lead / Excerpt */}
            {event.excerpt && (
              <p className="blog-lead">{event.excerpt}</p>
            )}

            {/* 5. Complete Event Body */}
            <BlogContent blog={event as any} />
          </article>
        </section>

        {/* 6. Related Events */}
        {relatedEvents.length > 0 && (
          <div className="related-wrap">
            <RelatedEvents events={relatedEvents} currentEventId={event.id} />
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< lg)                                      */}
      {/* ========================================================= */}
      <div className="block lg:hidden blog-container">
        {/* Mobile Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight className="breadcrumb-icon" />
          <Link href="/events">Events</Link>
          <ChevronRight className="breadcrumb-icon" />
          <strong>{event.title}</strong>
        </nav>

        <article className="mobile-blog-wrapper">
          {/* 1. Featured Image Banner */}
          {event.imageSrc ? (
            <figure className="mobile-featured-image">
              <picture className="block w-full">
                {event.mobileImageSrc && (
                  <source media="(max-width: 640px)" srcSet={event.mobileImageSrc} />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.imageSrc}
                  alt={event.title}
                  className="mobile-img-element"
                />
              </picture>
            </figure>
          ) : null}

          {/* 2. Metadata Bar */}
          <div className="mobile-single-line-bar">
            <div className="author-avatar">{event.authorInitial}</div>
            <span className="author-name truncate">{event.author}</span>
            <span className="meta-dot">•</span>
            <span className="meta-item whitespace-nowrap">{event.date}</span>
            <div className="ml-auto">
              <ShareSaveButtons />
            </div>
          </div>

          {/* 3. Title */}
          <header className="mobile-blog-header">
            <span className="inline-block text-xs font-semibold text-blue-600 mb-1">
              {event.category || "Event"}
            </span>
            <h1 className="mobile-blog-title">{event.title}</h1>
          </header>

          {/* 4. Table of Contents */}
          {event.headings.length > 0 && (
            <div className="mobile-toc-wrapper">
              <TableOfContents headings={event.headings} collapsible={true} />
            </div>
          )}

          {/* 5. Excerpt */}
          {event.excerpt && (
            <p className="blog-lead text-sm">{event.excerpt}</p>
          )}

          {/* 6. Content */}
          <BlogContent blog={event as any} />

          {/* 7. Registration Form */}
          <div className="mt-8 mb-6">
            <ApplicationForm />
          </div>

          {/* 8. Related Events */}
          {relatedEvents.length > 0 && (
            <div className="mt-8">
              <RelatedEvents events={relatedEvents} currentEventId={event.id} />
            </div>
          )}
        </article>
      </div>

      <ScrollToTopButton />
      <Footer />
    </main>
  );
}
