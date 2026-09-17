"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Search, X, MapPin, Globe, ArrowRight, Sparkles } from "lucide-react";
import { universities } from "@/data/universities";

const DESKTOP_PAGE_SIZE = 15;
const MOBILE_PAGE_SIZE = 6;

const REGION_TABS = [
  "All",
  "North India",
  "South India",
  "West India",
  "Central India",
  "International",
];

// Icon map for location icons
const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-3 h-3 shrink-0 text-slate-500" />,
  Globe: <Globe className="w-3 h-3 shrink-0 text-blue-500" />,
};

// Region color mapping - Subtle, modern tinted badges
const regionBgColor: Record<string, string> = {
  "North India": "bg-rose-50/80 text-rose-700 border-rose-200/60",
  "South India": "bg-emerald-50/80 text-emerald-700 border-emerald-200/60",
  "West India": "bg-amber-50/80 text-amber-700 border-amber-200/60",
  "North-East India": "bg-purple-50/80 text-purple-700 border-purple-200/60",
  "Central India": "bg-orange-50/80 text-orange-700 border-orange-200/60",
  International: "bg-sky-50/80 text-sky-700 border-sky-200/60",
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
    l.includes("california") ||
    l.includes("florida") ||
    l.includes("uk") ||
    l.includes("geneva") ||
    l.includes("orlando") ||
    l.includes("london")
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
  const [selectedRegion, setSelectedRegion] = useState("All");
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
              location: u.location || "Online / India",
              region,
              locationIcon,
              slug,
              shortcode: u.shortcode || "",
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

  // Filtered universities based on search query and region filter
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return uniList.filter((u) => {
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        (u.location ?? "").toLowerCase().includes(q) ||
        (u.region ?? "").toLowerCase().includes(q) ||
        (u.shortcode ?? "").toLowerCase().includes(q);

      const matchRegion =
        selectedRegion === "All" || u.region === selectedRegion;

      return matchSearch && matchRegion;
    });
  }, [uniList, query, selectedRegion]);

  // Reset pagination whenever search query, region or device mode changes
  useEffect(() => {
    setVisibleCount(isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
  }, [query, selectedRegion, isMobile]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="w-full bg-slate-50/60 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200/60 bg-red-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600 shadow-sm">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Accredited Institutions
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl lg:text-4xl">
            Our Partner <span className="text-red-500">Universities</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Choose from India&apos;s leading online universities accredited by UGC-DEB, AICTE, NAAC &amp; NIRF ranked.
          </p>
          <div className="h-1 w-12 bg-red-500 mx-auto mt-3.5 rounded-full" />
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="absolute left-4.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by university name, shortcode, city or state..."
              className="w-full pl-12 pr-11 py-3.5 rounded-full border border-slate-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Region Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {REGION_TABS.map((region) => {
              const isActive = selectedRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/60"
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>

          {/* Result Count Status */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
            <span>
              Showing <strong className="text-slate-800 font-bold">{Math.min(visibleCount, filtered.length)}</strong> of{" "}
              <strong className="text-slate-800 font-bold">{filtered.length}</strong> {filtered.length === 1 ? "university" : "universities"}
            </span>
            {(query || selectedRegion !== "All") && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedRegion("All");
                }}
                className="text-red-500 hover:text-red-600 font-semibold underline ml-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* ── Universities Cards Grid ── */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto rounded-2xl bg-white border border-slate-200/80 p-8 shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-800">No universities found</p>
            <p className="text-xs text-slate-500 mt-1">
              We couldn&apos;t find any universities matching your filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedRegion("All");
              }}
              className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
            {displayed.map((uni, index) => {
              const bgBadgeClass =
                regionBgColor[uni.region] ||
                "bg-slate-100 text-slate-700 border-slate-200";

              return (
                <Link
                  key={uni.id || index}
                  href={`/universities/${uni.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 hover:border-red-400/80 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 relative"
                >
                  <div>
                    {/* Logo Container */}
                    <div className="relative mb-3 flex h-16 w-full items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100 p-2.5 transition-colors duration-300 group-hover:bg-white">
                      <Image
                        src={uni.image}
                        alt={`${uni.name} logo`}
                        fill
                        className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* University Name */}
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 text-center leading-snug line-clamp-2 min-h-[36px] group-hover:text-red-600 transition-colors">
                      {uni.name}
                    </h3>
                  </div>

                  {/* Location & Region Badge */}
                  <div className="mt-3 flex flex-col items-center gap-1.5">
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10px] font-semibold border ${bgBadgeClass}`}
                    >
                      {iconMap[uni.locationIcon] || <MapPin className="w-3 h-3 shrink-0 text-slate-400" />}
                      <span className="truncate max-w-[110px] sm:max-w-[130px]">{uni.location}</span>
                    </div>

                    <span className="text-[10.5px] font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      View Details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Progressive Load More Button ── */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + pageSize)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Load More Universities ({filtered.length - visibleCount} remaining)
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
