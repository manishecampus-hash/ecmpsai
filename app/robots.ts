import { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // website-dev.ecampusapp.com -> Disallow all
  if (host.toLowerCase().includes("website-dev.ecampusapp.com") || host.toLowerCase().includes("website-dev")) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // ecampusapp.com (and all other production traffic) -> Allow all
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ecampusapp.com/sitemap.xml",
  };
}
