import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageTemplate, {
  LandingPageData,
} from "@/components/landing-page/landing-page-template";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

const FRONTEND_API_URL =
  process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

async function fetchLandingPage(
  slug: string,
  preview: boolean
): Promise<LandingPageData | null> {
  try {
    const res = await fetch(
      `${FRONTEND_API_URL}/landing-pages/${encodeURIComponent(slug)}${
        preview ? "?preview=true" : ""
      }`,
      {
        cache: preview ? "no-store" : "no-cache",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const data = await fetchLandingPage(slug, isPreview);
  if (!data) {
    return {
      title: "Landing Page Not Found | eCampus",
    };
  }

  const seo = (data as any).seoSettings;
  const title = seo?.metaTitle || `${data.name} | eCampus`;
  const description =
    seo?.metaDescription ||
    `Explore accredited ${data.name} programs and top global universities on eCampus.`;
  const canonical = seo?.canonicalUrl || `https://ecampusapp.com/lp/${slug}`;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || "/dba/after.png";

  return {
    title,
    description,
    keywords: seo?.metaKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "eCampus",
      images: ogImage ? [{ url: ogImage }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function DynamicLandingPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const data = await fetchLandingPage(slug, isPreview);

  if (!data) {
    notFound();
  }

  return <LandingPageTemplate data={data} isPreview={isPreview} />;
}
