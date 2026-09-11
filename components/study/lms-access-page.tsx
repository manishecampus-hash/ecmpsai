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
    <section className="relative min-h-screen bg-slate-50/80 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-48 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            Verified LMS Student Portal
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Access Your University <span className="text-red-600">LMS</span>
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-sm text-slate-600 sm:text-base leading-relaxed">
            Find and connect to your institution&apos;s official learning platform in seconds.
          </p>
        </div>

        {/* Loading State: Card Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="h-14 w-32 sm:w-36 rounded-2xl bg-slate-100" />
                  <div className="h-6 w-24 rounded-full bg-slate-100" />
                </div>
                <div className="h-7 w-3/4 rounded-lg bg-slate-100 mb-4" />
                <div className="flex gap-2 mb-6">
                  <div className="h-6 w-24 rounded-xl bg-slate-100" />
                  <div className="h-6 w-20 rounded-xl bg-slate-100" />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="h-11 w-full rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-3xl border border-red-100 bg-red-50/50 p-8 text-center sm:p-12 max-w-lg mx-auto shadow-xs">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{error}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Could not retrieve the current university LMS list.
            </p>
            <button
              type="button"
              onClick={fetchUniversities}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-all active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Empty State: When NO universities have LMS enabled */}
        {!isLoading && !error && universities.length === 0 && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-12 sm:p-16 text-center shadow-sm max-w-xl mx-auto my-6">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100 shadow-2xs">
              <GraduationCap className="h-8 w-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              University data coming soon.
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
              We are currently configuring LMS access for partner institutions. Please check back shortly.
            </p>
          </div>
        )}

        {/* Content Area: When universities with LMS enabled exist */}
        {!isLoading && !error && universities.length > 0 && (
          <>
            {/* Stats Bar */}
            <div className="hidden sm:flex mb-10 flex-wrap justify-center gap-3 sm:mb-12 sm:gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md px-4 py-2.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-red-200"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <item.icon className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="whitespace-nowrap text-xs font-bold text-slate-700 sm:text-sm">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Search Bar Section */}
            <div
              ref={searchWrapperRef}
              className="relative mx-auto mb-12 w-full max-w-2xl"
            >
              <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="university-search" className="sr-only">
                  Search for your university
                </label>

                <div className="relative flex items-center">
                  <div className="absolute left-4 sm:left-5 pointer-events-none text-slate-400 z-10">
                    <Search className="w-5 h-5" />
                  </div>

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
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 sm:pl-14 pr-32 sm:pr-36 text-sm text-slate-900 placeholder:text-slate-400 shadow-xl shadow-slate-200/40 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-500/10 sm:h-16 sm:text-base font-medium"
                  />

                  <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-2">
                    {inputValue && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={handleClear}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}

                    <button
                      type="submit"
                      aria-label="Search"
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 text-xs font-bold text-white shadow-md shadow-red-600/20 transition-all hover:shadow-lg active:scale-95 sm:h-11 sm:px-5 sm:text-sm"
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
                          className="w-full border-b border-slate-100 px-5 py-3.5 text-left text-sm font-medium text-slate-900 transition-colors last:border-b-0 hover:bg-red-50/60 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 pr-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                              <Building2 className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate text-sm sm:text-base">
                                {u.name}
                              </p>
                              <p className="text-xs font-medium text-slate-400 truncate">
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
            </div>

            {/* University Cards Grid / Search Empty State */}
            {filteredUniversities.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Search className="h-8 w-8" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  No universities found matching &quot;{query}&quot;
                </h3>

                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  Try typing a different university name or location to find your portal.
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-red-700 transition-all"
                >
                  Clear Search & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {filteredUniversities.map((university) => {
                  const LocationIcon = iconMap[university.locationIcon] ?? MapPin;
                  const lmsUrl = buildLmsUrl(university.lmsSlug, university.lmsUrl);
                  const isExternal = isExternalUrl(lmsUrl);

                  return (
                    <div
                      key={university.id}
                      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-slate-300/40"
                    >
                      <div>
                        {/* Top Header: Logo Box + Location Pill */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex h-14 w-32 sm:w-36 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all duration-300 group-hover:bg-white group-hover:shadow-md group-hover:border-slate-200 overflow-hidden">
                            <Image
                              src={university.logoUrl}
                              alt={university.name}
                              width={140}
                              height={48}
                              unoptimized
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold text-red-600">
                            <LocationIcon className="h-3.5 w-3.5 text-red-500 shrink-0" />
                            <span className="truncate max-w-[120px]">{university.location}</span>
                          </div>
                        </div>

                        {/* University Title (Dynamic) */}
                        <h3 className="text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-red-600 mb-4">
                          {university.name}
                        </h3>

                        {/* Meta Chips: NIRF Ranking & Establishment Year (Dynamic) */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          <div className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50/80 border border-indigo-100/60 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            <Award className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                            <span>{university.nirfBadge}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-600">
                            <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                            <span>{university.estdBadge}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Access LMS Button (Dynamic from lmsSlug) */}
                      <div className="pt-4 border-t border-slate-100">
                        {isExternal ? (
                          <a
                            href={lmsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-red-600/30 active:scale-[0.98]"
                          >
                            <span>Access LMS</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        ) : (
                          <Link
                            href={lmsUrl}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-red-600/30 active:scale-[0.98]"
                          >
                            <span>Access LMS</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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