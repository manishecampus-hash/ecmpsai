import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { buildLmsFaqs } from "@/lib/lms-content";
import LmsUniversityDetail, {
  type LmsUniversityDetailData,
  type LmsRelatedUniversity,
} from "@/components/study/lms-university-detail";
import {
  buildLmsUrl,
  cleanUniversitySlug,
  formatLmsUniversities,
} from "@/lib/lms";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const API_BASE_URL =
  process.env.ECAMPUS_FRONTEND_API_URL ||
  process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
  "http://localhost:5000";

function isLmsEnabled(u: any): boolean {
  return u?.enableLms === true || u?.enableLms === "true" || u?.enableLms === 1;
}

async function fetchUniversity(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/universities/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && (data.id || data._id || data.name) ? data : null;
  } catch (err) {
    console.error(`Error fetching university "${slug}" for LMS page:`, err);
    return null;
  }
}

async function fetchAllUniversities(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/universities`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.universities)) return data.universities;
    return [];
  } catch (err) {
    console.error("Error fetching universities for LMS page:", err);
    return [];
  }
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ecampusapp.com").replace(/\/+$/, "");

/**
 * Fetch the university by slug, falling back to the list endpoint if needed.
 * Wrapped in React `cache` so generateMetadata and the page share one request.
 */
const getPageData = cache(async (slug: string) => {
  const clean = cleanUniversitySlug(slug);
  const [single, all] = await Promise.all([fetchUniversity(clean), fetchAllUniversities()]);

  const university =
    single ||
    all.find((u) => cleanUniversitySlug(u.slug) === clean) ||
    null;

  return { clean, university, all };
});

function toDetail(u: any, clean: string): LmsUniversityDetailData {
  const details = u.details || {};
  const lmsUrl = buildLmsUrl(u.lmsSlug, u.lmsUrl);

  let lmsHost = "";
  try {
    lmsHost = new URL(lmsUrl).hostname.replace(/^www\./, "");
  } catch {
    lmsHost = "";
  }

  const accreditations: string[] = Array.isArray(details?.accreditation?.list)
    ? details.accreditation.list
        .map((a: any) => String(a?.label || "").trim())
        .filter(Boolean)
        .slice(0, 6)
    : [];

  const nirfClean = u.nirfRanking ? String(u.nirfRanking).replace(/^#/, "").trim() : "";
  const rawNirf = /^\d+$/.test(nirfClean) ? `#${nirfClean}` : nirfClean;

  const studentsRaw = u.studentsVisited ? String(u.studentsVisited).trim() : "";
  const studentsCount =
    !studentsRaw || studentsRaw === "-"
      ? ""
      : /^\d+$/.test(studentsRaw)
        ? `${Number(studentsRaw).toLocaleString("en-IN")}+`
        : studentsRaw;

  return {
    slug: clean,
    name: u.name || "University",
    shortcode: u.shortcode || "",
    logoUrl: u.logoUrl || u.image || "/placeholder-uni.png",
    location: u.location || "India",
    establishmentYear: u.establishmentYear ? String(u.establishmentYear) : "",
    nirfRanking: rawNirf,
    studentsCount,
    contactDetails: u.contactDetails || "",
    ugcApproval: u.ugcApproval !== false,
    wesApproval: Boolean(u.wesApproval),
    emiFacility: Boolean(u.emiFacility),
    ecampusAssured: Boolean(u.ecampusAssured),
    aboutHtml: details?.about?.description || u.allAbout || "",
    tagline: details?.banner?.subheading ? String(details.banner.subheading).trim() : "",
    accreditations,
    lmsUrl,
    lmsHost,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { university } = await getPageData(slug);

  if (!university || !isLmsEnabled(university)) {
    return { title: "LMS Portal Not Found | eCampus" };
  }

  const d = toDetail(university, cleanUniversitySlug(slug));
  const shortName = d.shortcode || d.name;
  const url = `${SITE_URL}/study/${d.slug}`;
  const title = `${d.name} LMS Login | Official Portal – eCampus`;
  const description = `Log in to the official ${d.name} LMS${d.lmsHost ? ` (${d.lmsHost})` : ""}. Verified link, login steps, password help & FAQs for ${shortName} students.`;

  return {
    title,
    description,
    keywords: [
      `${d.name} LMS`,
      `${d.name} LMS login`,
      `${shortName} LMS`,
      `${shortName} LMS login`,
      `${shortName} student portal`,
      `${d.name} student login`,
      `${shortName} online login`,
    ],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "eCampus",
      images: d.logoUrl?.startsWith("http") ? [{ url: d.logoUrl, alt: `${d.name} logo` }] : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: d.logoUrl?.startsWith("http") ? [d.logoUrl] : undefined,
    },
  };
}

function buildJsonLd(d: LmsUniversityDetailData) {
  const shortName = d.shortcode || d.name;
  const url = `${SITE_URL}/study/${d.slug}`;
  const faqs = buildLmsFaqs({
    name: d.name,
    shortName,
    lmsHost: d.lmsHost,
    contactDetails: d.contactDetails,
  });

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "University LMS Portals", item: `${SITE_URL}/study` },
        { "@type": "ListItem", position: 3, name: `${d.name} LMS Login`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: `${d.name} LMS Login`,
      description: `Official ${d.name} LMS student portal access, login guide and FAQs.`,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: "eCampus", url: SITE_URL },
      about: {
        "@type": "CollegeOrUniversity",
        name: d.name,
        ...(d.logoUrl?.startsWith("http") ? { logo: d.logoUrl } : {}),
        ...(d.establishmentYear ? { foundingDate: d.establishmentYear } : {}),
        ...(d.contactDetails ? { telephone: d.contactDetails } : {}),
        address: { "@type": "PostalAddress", addressLocality: d.location, addressCountry: "IN" },
        sameAs: `${SITE_URL}/universities/${d.slug}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default async function StudyUniversityPage({ params }: PageProps) {
  const { slug } = await params;
  const { clean, university, all } = await getPageData(slug);

  if (!university || !isLmsEnabled(university)) {
    notFound();
  }

  const detail = toDetail(university, clean);

  const related: LmsRelatedUniversity[] = formatLmsUniversities(all)
    .map((u) => ({
      slug: cleanUniversitySlug(u.slug),
      name: u.name,
      logoUrl: u.logoUrl,
      location: u.location,
    }))
    .filter((u) => u.slug);

  const jsonLd = buildJsonLd(detail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LmsUniversityDetail university={detail} related={related} />
    </>
  );
}
