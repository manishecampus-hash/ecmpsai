import type { Metadata } from "next";
import ToolsClient, { type ToolsPageData } from "./tools-client";

async function getToolsData(): Promise<{ data: ToolsPageData; seoSettings?: any }> {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/tools`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.tools)) {
        return {
          data: {
            hero: json.hero,
            trustBar: json.trustBar || [],
            tools: json.tools,
            total: json.total ?? json.tools.length,
          },
          seoSettings: json.seoSettings,
        };
      }
    }
  } catch (err) {
    console.error("Error fetching tools data from ecampus-frontend:", err);
  }
  return { data: { tools: [], total: 0 } };
}

export async function generateMetadata(): Promise<Metadata> {
  const { seoSettings, data } = await getToolsData();
  const title =
    seoSettings?.title ||
    `${data.hero?.titlePrefix || ""} ${data.hero?.titleHighlight || "Calculators"} | Ecampus`.trim();
  const description = seoSettings?.description || data.hero?.subtitle || "";

  return {
    title: title || "Calculators | eCampus",
    description,
    keywords: seoSettings?.tags ? seoSettings.tags.split(",").map((k: string) => k.trim()) : undefined,
    robots: {
      index: seoSettings?.indexing !== false,
      follow: seoSettings?.crawl !== false,
    },
  };
}

export default async function ToolsPage() {
  const { data } = await getToolsData();
  return <ToolsClient initialData={data} />;
}
