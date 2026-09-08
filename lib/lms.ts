import { universities as staticUniversities } from "@/data/universities";

export interface DynamicUniversity {
  id: string;
  name: string;
  logoUrl: string;
  location: string;
  slug?: string;
  enableLms?: boolean | string | number;
  lmsSlug?: string;
  lmsUrl?: string;
  nirfRanking?: string;
  establishmentYear?: number | string;
  nirfBadge: string;
  estdBadge: string;
  locationIcon: string;
}

/**
 * Builds the destination LMS URL using the university's lmsSlug (or lmsUrl fallback).
 * Ensures URLs are generated consistently without hardcoding individual universities.
 */
export function buildLmsUrl(lmsSlug?: string, lmsUrl?: string): string {
  const target = (lmsSlug || lmsUrl || "").trim();
  if (!target) {
    return "#";
  }

  // Already a complete protocol URL (e.g., https://lms.amityonline.com)
  if (/^https?:\/\//i.test(target)) {
    return target;
  }

  // Relative application path (e.g., /study/portal)
  if (target.startsWith("/")) {
    return target;
  }

  // Domain without protocol prefix (e.g., lms.amityonline.com or learn.onlinejain.com)
  if (target.includes(".")) {
    return `https://${target}`;
  }

  // Plain slug or path identifier
  return `/${target}`;
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Formats a raw list of university documents into DynamicUniversity items,
 * filtering strictly for those with LMS enabled.
 */
export function formatLmsUniversities(fetchedList: any[]): DynamicUniversity[] {
  if (!Array.isArray(fetchedList)) return [];

  // Filter strictly for universities where `Enable University for LMS` is ON
  const lmsEnabledOnly = fetchedList.filter((u: any) => {
    return (
      u.enableLms === true ||
      u.enableLms === "true" ||
      u.enableLms === 1
    );
  });

  // Map dynamic fields from DB
  return lmsEnabledOnly.map((u: any) => {
    const uSlug = (u.slug || "").replace(/^\/university\//, "").replace(/^\//, "").toLowerCase().trim();
    const uName = (u.name || "").toLowerCase().replace(/ online$/i, "").trim();

    const matchedLocal = staticUniversities.find((item) => {
      const localSlug = (item.slug || "").toLowerCase().trim();
      const localName = item.name.toLowerCase().replace(/ online$/i, "").trim();
      return (uSlug && localSlug && uSlug === localSlug) || (uName && localName && uName === localName);
    });

    // NIRF Ranking (dynamic)
    const rawNirf = u.nirfRanking ? String(u.nirfRanking).trim() : "";
    const nirfClean = rawNirf.replace(/^#/, "").trim();
    const nirfBadge = nirfClean ? `NIRF #${nirfClean}` : (u.category || "Top Ranked");

    // Establishment Year (dynamic)
    const rawYear = u.establishmentYear ? String(u.establishmentYear).trim() : "";
    const estdBadge = rawYear ? `Estd. ${rawYear}` : "UGC Approved";

    return {
      id: u.id || u._id || u.slug || u.name,
      name: u.name, // DYNAMIC
      logoUrl: u.logoUrl || u.image || matchedLocal?.image || "/placeholder-uni.png", // DYNAMIC
      location: u.location || matchedLocal?.location || "India", // DYNAMIC
      slug: u.slug || matchedLocal?.slug || "",
      enableLms: u.enableLms,
      lmsSlug: u.lmsSlug || u.lmsUrl || "", // DYNAMIC
      lmsUrl: u.lmsUrl || u.lmsSlug || "",
      nirfRanking: nirfClean,
      establishmentYear: rawYear,
      nirfBadge, // DYNAMIC
      estdBadge, // DYNAMIC
      locationIcon: matchedLocal?.locationIcon || "MapPin",
    };
  });
}
