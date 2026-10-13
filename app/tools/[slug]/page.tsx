import { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorDetailClient, {
  type ToolDetail,
  type RelatedCalculatorItem,
} from "./calculator-detail-client";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

async function getToolBySlug(slug: string): Promise<ToolDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/tools/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (!data || !data.slug) {
      return null;
    }
    return data;
  } catch (err) {
    console.error(`Error fetching tool with slug "${slug}":`, err);
    return null;
  }
}

async function getAllCalculators(): Promise<RelatedCalculatorItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/tools`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.tools) ? data.tools : [];
  } catch (err) {
    console.error("Error fetching all calculators:", err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | eCampus",
    };
  }

  const seo = tool.seoSettings;
  const title =
    seo?.title ||
    `${tool.title} | Free Online Calculator | eCampus`;
  const description =
    seo?.description ||
    tool.description ||
    `Use the free online ${tool.title} on eCampus for instant calculations.`;

  const keywords = seo?.tags
    ? seo.tags.split(",").map((k: string) => k.trim())
    : undefined;

  return {
    title,
    description,
    keywords,
    robots: {
      index: seo?.indexing !== false,
      follow: seo?.crawl !== false,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const [tool, allCalculators] = await Promise.all([
    getToolBySlug(slug),
    getAllCalculators(),
  ]);

  if (!tool) {
    notFound();
  }

  return (
    <CalculatorDetailClient
      tool={tool}
      allCalculators={allCalculators}
    />
  );
}
