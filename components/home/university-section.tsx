"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Search, X, MapPin, Globe } from "lucide-react";
import { universities } from "@/data/universities";

const DESKTOP_PAGE_SIZE = 15;
const MOBILE_PAGE_SIZE = 6;

// Icon map for location icons
const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-3.5 h-3.5 shrink-0" />,
  Globe: <Globe className="w-3.5 h-3.5 shrink-0" />,
};

// Region color mapping
const regionBgColor: Record<string, string> = {
  "North India": "bg-red-50 text-red-700 hover:bg-red-100",
  "South India": "bg-green-50 text-green-700 hover:bg-green-100",
  "West India": "bg-amber-50 text-amber-700 hover:bg-amber-100",
  "North-East India": "bg-purple-50 text-purple-700 hover:bg-purple-100",
  "Central India": "bg-orange-50 text-orange-700 hover:bg-orange-100",
  International: "bg-blue-50 text-blue-700 hover:bg-blue-100",
};

function getRegionFromLocation(loc: string): string {
  const l = (loc || "").toLowerCase();
  if (
    l.includes("bengaluru") ||
    l.includes("bangalore") ||
    l.includes("karnataka") ||
    l.includes("andhra") ||
    l.includes("visakhapatnam") ||
    l.includes("south")
  ) {
    return "South India";
  }
  if (
    l.includes("pune") ||
    l.includes("mumbai") ||
    l.includes("maharashtra") ||
    l.includes("gujarat") ||
    l.includes("west")
  ) {
    return "West India";
  }
  if (
    l.includes("raipur") ||
    l.includes("central") ||
    l.includes("chhattisgarh") ||
    l.includes("madhya pradesh")
  ) {
    return "Central India";
  }
  if (
    l.includes("switzerland") ||
    l.includes("france") ||
    l.includes("international") ||
    l.includes("california")
  ) {
    return "International";
  }
  if (l.includes("sikkim") || l.includes("north-east")) {
    return "North-East India";
  }
  return "North India";
}

export default function UniversitySection() {
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(DESKTOP_PAGE_SIZE);
  const [uniList, setUniList] = useState<any[]>(() =>
    universities.map((u) => ({
      ...u,
      id: u.slug,
      type: "Engineering",
    }))
  );

  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";
    fetch(`${apiUrl}/universities`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((u: any) => {
            let slug = "";
            if (u.slug) {
              slug = u.slug.split("/").pop() || "";
            } else if (u.seoSettings?.rewriteUrl) {
              slug = u.seoSettings.rewriteUrl.split("/").pop() || "";
            }
            if (!slug) {
              slug = u.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
            }

            const region = getRegionFromLocation(u.location);
            const locationIcon =
              region === "International" ? "Globe" : "MapPin";

            return {
              id: u.id,
              name: u.name,
              image: u.logoUrl || "/placeholder-uni.png",
              location: u.location,
              region,
              locationIcon,
              slug,
              type: "Engineering",
            };
          });
          setUniList(mapped);
        } else {
          setUniList(universities);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch universities from backend:", err);
        setUniList(universities);
      });
  }, []);

  // Filtered universities based on search query
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return uniList;
    return uniList.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        (u.location ?? "").toLowerCase().includes(q) ||
        (u.region ?? "").toLowerCase().includes(q)
    );
  }, [uniList, query]);

  // Reset pagination whenever search query or device mode changes
  useEffect(() => {
    setVisibleCount(isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
  }, [query, isMobile]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="w-full py-12 px-4 bg-white">
      {/* ── Header ── */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Handshake className="h-3.5 w-3.5 text-red-500" />
          University
        </span>
        <h2 className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
          Our Partner <span className="text-red-500">Universities</span>
        </h2>
        <div className="h-1 w-12 bg-red-600 mx-auto mt-3 rounded-full" />
      </div>

      {/* ── Search Bar & Counter ── */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search university by name, city or state..."
            className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Result summary */}
        <p className="mt-2.5 text-xs text-gray-500 text-center">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}{" "}
          {filtered.length === 1 ? "university" : "universities"}
          {query && ` matching "${query}"`}
        </p>
      </div>

      {/* ── Grid with Location Badges ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <p className="text-sm font-medium text-gray-600">
            No universities found matching &ldquo;{query}&rdquo;
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-3 inline-flex items-center text-xs font-semibold text-red-600 hover:text-red-700 underline"
          >
            Clear search filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
          {displayed.map((uni, index) => {
            const bgColor =
              regionBgColor[uni.region] ||
              "bg-gray-50 text-gray-700 hover:bg-gray-100";

            return (
              <Link
                key={uni.id || index}
                href={`/universities/${uni.slug}`}
                className="group flex flex-col items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 hover:border-red-300"
              >
                <div className="w-full h-14 flex items-center justify-center mb-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={uni.image}
                      alt={uni.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-[11px] sm:text-xs font-medium text-gray-800 text-center leading-snug line-clamp-2 min-h-[28px] w-full">
                  {uni.name}
                </h3>

                {/* ── Location Badge ── */}
                <div
                  className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-[9px] uppercase tracking-wide transition-all duration-300 group-hover:shadow-sm ${bgColor}`}
                >
                  {iconMap[uni.locationIcon]}
                  <span className="truncate max-w-[120px]">{uni.location}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Load More Pagination Button ── */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + pageSize)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-full text-xs font-semibold hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
          >
            Load More Universities ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
