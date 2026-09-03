"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";

import { universities, type University } from "@/data/universities";

const stats = [
  { label: "100+ Universities", icon: Building2 },
  { label: "Verified LMS Credentials", icon: CheckCircle2 },
  { label: "1,000+ Courses", icon: GraduationCap },
];

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Globe,
};

export default function LmsAccessPage(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const filteredUniversities = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return universities;

    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.region.toLowerCase().includes(q),
    );
  }, [query]);

  const suggestions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();

    const source = !q
      ? universities
      : universities.filter((u) => u.name.toLowerCase().includes(q));

    return source.slice(0, 8);
  }, [inputValue]);

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

        {/* Stats Bar */}
        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12 sm:gap-4">
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
                placeholder="Search for your university (e.g. Amity, Manipal, Jain)..."
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
                  <li key={u.slug}>
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
                            {u.location} • {u.courses}
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

        {/* Separated University Cards Grid */}
        {filteredUniversities.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Search className="h-8 w-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              No universities found matching &quot;{query}&quot;
            </h3>

            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              Try typing a different university name, city, or region to locate your portal.
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
              const LocationIcon =
                iconMap[university.locationIcon] ?? MapPin;

              return (
                <div
                  key={university.slug}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-slate-300/40"
                >
                  <div>
                    {/* Top Header: Logo Box + Location Pill */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex h-14 w-32 sm:w-36 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 transition-all duration-300 group-hover:bg-white group-hover:shadow-md group-hover:border-slate-200">
                        <Image
                          src={university.image}
                          alt={university.name}
                          width={140}
                          height={48}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold text-red-600">
                        <LocationIcon className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span className="truncate max-w-[120px]">{university.location}</span>
                      </div>
                    </div>

                    {/* University Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-red-600 mb-4">
                      {university.name}
                    </h3>

                    {/* Meta Chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <div className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50/80 border border-indigo-100/60 px-3 py-1.5 text-xs font-bold text-indigo-700">
                        <BookOpen className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span>{university.courses}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 text-xs font-bold text-slate-600">
                        <Users className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>{university.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Access LMS Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/apply?university=${university.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-red-600/30 active:scale-[0.98]"
                    >
                      <span>Access LMS</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
