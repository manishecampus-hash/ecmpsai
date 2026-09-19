"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  MapPin,
  Globe,
  Search,
  X,
  BookOpen,
  Users,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Award,
  Calendar,
} from "lucide-react";

import {
  DynamicUniversity,
  buildLmsUrl,
  isExternalUrl,
  formatLmsUniversities,
} from "@/lib/lms";

export type { DynamicUniversity };
export { buildLmsUrl, isExternalUrl, formatLmsUniversities };

const stats = [
  { label: "100+ Universities", icon: Building2 },
  { label: "Verified LMS Credentials", icon: CheckCircle2 },
  { label: "1,000+ Courses", icon: GraduationCap },
];

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Globe,
};


export interface LmsAccessPageProps {
  initialUniversities?: DynamicUniversity[];
}

export default function LmsAccessPage({
  initialUniversities = [],
}: LmsAccessPageProps): JSX.Element {
  const [universities, setUniversities] = useState<DynamicUniversity[]>(initialUniversities);
  const [isLoading, setIsLoading] = useState<boolean>(initialUniversities.length === 0);
  const [error, setError] = useState<string | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const fetchUniversities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const frontendApi =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

    let fetchedList: any[] = [];
    let success = false;

    // Fetch from Frontend API (standard for ecmpsai microservice)
    try {
      const res = await fetch(`${frontendApi}/universities`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          fetchedList = data;
          success = true;
        } else if (Array.isArray(data?.universities)) {
          fetchedList = data.universities;
          success = true;
        }
      }
    } catch (err) {
      console.error("Frontend universities API error:", err);
    }

    if (!success) {
      if (initialUniversities && initialUniversities.length > 0) {
        setUniversities(initialUniversities);
        setIsLoading(false);
        return;
      }
      setError("Unable to load universities. Please try again.");
      setIsLoading(false);
      return;
    }

    const mapped = formatLmsUniversities(fetchedList);
    setUniversities(mapped);
    setIsLoading(false);
  }, [initialUniversities]);

  useEffect(() => {
    if (initialUniversities && initialUniversities.length > 0) {
      setIsLoading(false);
      return;
    }
    fetchUniversities();
  }, [fetchUniversities, initialUniversities]);

  const filteredUniversities = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return universities;

    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        (u.location && u.location.toLowerCase().includes(q)) ||
        (u.nirfBadge && u.nirfBadge.toLowerCase().includes(q)) ||
        (u.estdBadge && u.estdBadge.toLowerCase().includes(q)),
    );
  }, [query, universities]);

  const suggestions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();

    const source = !q
      ? universities
      : universities.filter((u) => u.name.toLowerCase().includes(q));

    return source.slice(0, 8);
  }, [inputValue, universities]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuery(inputValue);
    setIsDropdownOpen(false);
  }

  function handleClear() {
    setInputValue("");
    setQuery("");
    setIsDropdownOpen(false);
  }

  function handleSuggestionClick(name: string) {
    setInputValue(name);
    setQuery(name);
    setIsDropdownOpen(false);
  }

  return (
    <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle ambient blur orbs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-100/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-rose-100/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200/60 bg-red-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            Verified LMS Student Portal
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl lg:text-4xl">
            Access Your University <span className="text-red-500">LMS</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Find and connect to your institution&apos;s official learning platform in seconds.
          </p>
          <div className="h-1 w-12 bg-red-500 mx-auto mt-3.5 rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* Loading State: Card Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="h-14 w-32 sm:w-36 rounded-xl bg-slate-100" />
                  <div className="h-6 w-24 rounded-full bg-slate-100" />
                </div>
                <div className="h-7 w-3/4 rounded-lg bg-slate-100 mb-4" />
                <div className="flex gap-2 mb-6">
                  <div className="h-6 w-24 rounded-lg bg-slate-100" />
                  <div className="h-6 w-20 rounded-lg bg-slate-100" />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="h-10 w-full rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center sm:p-12 max-w-lg mx-auto shadow-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{error}</h3>
            <p className="mt-1 text-xs text-slate-600">
              Could not retrieve the current university LMS list.
            </p>
            <button
              type="button"
              onClick={fetchUniversities}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Empty State: When NO universities have LMS enabled */}
        {!isLoading && !error && universities.length === 0 && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-10 sm:p-14 text-center shadow-sm max-w-xl mx-auto my-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100 shadow-2xs">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              University data coming soon.
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              We are currently configuring LMS access for partner institutions. Please check back shortly.
            </p>
          </div>
        )}

        {/* Content Area: When universities with LMS enabled exist */}
        {!isLoading && !error && universities.length > 0 && (
          <>
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 shadow-2xs text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50/60 transition-all"
                >
                  <item.icon className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Search Bar Section */}
            <div
              ref={searchWrapperRef}
              className="relative mx-auto mb-10 w-full max-w-2xl"
            >
              <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="university-search" className="sr-only">
                  Search for your university
                </label>

                <div className="relative flex items-center">
                  <Search className="absolute left-5 h-4 w-4 text-slate-400 pointer-events-none z-10" />

                  <input
                    id="university-search"
                    name="q"
                    type="text"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onClick={() => setIsDropdownOpen(true)}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Search for your university..."
                    aria-label="Search for your university"
                    className="w-full pl-12 pr-28 sm:pr-32 py-3.5 rounded-full border border-slate-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                  />

                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {inputValue && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={handleClear}
                        className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    <button
                      type="submit"
                      aria-label="Search"
                      className="inline-flex items-center justify-center rounded-full bg-slate-900 hover:bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all active:scale-95"
                    >
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {isDropdownOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                  <ul>
                    {suggestions.map((u) => (
                      <li key={u.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(u.name)}
                          className="w-full border-b border-slate-100 px-5 py-3 text-left text-sm font-medium text-slate-900 transition-colors last:border-b-0 hover:bg-red-50/60 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                              <Building2 className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate text-xs sm:text-sm">
                                {u.name}
                              </p>
                              <p className="text-[11px] font-medium text-slate-400 truncate">
                                {u.location} • {u.nirfBadge}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Result Count Status */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-3">
                <span>
                  Showing <strong className="text-slate-800 font-bold">{filteredUniversities.length}</strong> {filteredUniversities.length === 1 ? "university" : "universities"}
                </span>
                {query && (
                  <button
                    onClick={handleClear}
                    className="text-red-500 hover:text-red-600 font-semibold underline ml-1"
                  >
                    Reset search
                  </button>
                )}
              </div>
            </div>

            {/* University Cards Grid / Search Empty State */}
            {filteredUniversities.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto rounded-2xl bg-white border border-slate-200/80 p-8 shadow-sm">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                  No universities found matching &quot;{query}&quot;
                </h3>

                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Try typing a different university name or location to find your portal.
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition"
                >
                  Clear Search & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {filteredUniversities.map((university) => {
                  const LocationIcon = iconMap[university.locationIcon] ?? MapPin;
                  const lmsUrl = buildLmsUrl(university.lmsSlug, university.lmsUrl);
                  const isExternal = isExternalUrl(lmsUrl);

                  return (
                    <div
                      key={university.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 hover:border-red-400/80 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div>
                        {/* Top Header: Logo Box + Location Pill */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex h-14 w-32 sm:w-36 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50/80 p-2 transition-all duration-300 group-hover:bg-white group-hover:border-slate-200 overflow-hidden">
                            <Image
                              src={university.logoUrl}
                              alt={university.name}
                              width={140}
                              height={48}
                              unoptimized
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="inline-flex items-center gap-1 rounded-full bg-rose-50/80 border border-rose-200/60 px-2.5 py-1 text-[10px] font-semibold text-rose-700">
                            <LocationIcon className="h-3 w-3 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[120px]">{university.location}</span>
                          </div>
                        </div>

                        {/* University Title */}
                        <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors mb-3 line-clamp-2 min-h-[44px]">
                          {university.name}
                        </h3>

                        {/* Meta Chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                            <Award className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                            <span>{university.nirfBadge}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/80 border border-slate-200/60 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                            <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                            <span>{university.estdBadge}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Access LMS Button */}
                      <div className="pt-4 border-t border-slate-100">
                        {isExternal ? (
                          <a
                            href={lmsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                          >
                            <span>Access LMS Portal</span>
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        ) : (
                          <Link
                            href={lmsUrl}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                          >
                            <span>Access LMS Portal</span>
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}