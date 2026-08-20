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

function chunkIntoPairs(list: University[]): University[][] {
  const pairs: University[][] = [];

  for (let i = 0; i < list.length; i += 2) {
    pairs.push(list.slice(i, i + 2));
  }

  return pairs;
}

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

  const pairs = useMemo(
    () => chunkIntoPairs(filteredUniversities),
    [filteredUniversities],
  );

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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Access Your University
            <span className="text-red-500"> LMS</span>
          </h2>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Find and connect to your institution's learning platform in seconds
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12 sm:gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:px-5 sm:py-3"
            >
              <item.icon className="h-4 w-4 shrink-0 text-red-500 sm:h-5 sm:w-5" />

              <span className="whitespace-nowrap text-xs font-semibold text-gray-700 sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div
          ref={searchWrapperRef}
          className="relative mx-auto mb-10 w-full max-w-xs sm:mb-12 sm:max-w-lg md:max-w-xl"
        >
          <form onSubmit={handleSubmit} className="relative">
            <label htmlFor="university-search" className="sr-only">
              Search for your university
            </label>

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
              className="h-12 w-full rounded-2xl border-0 pl-4 pr-24 text-xs shadow-lg outline-none ring-1 ring-gray-200 transition-all focus:ring-2 focus:ring-red-500 sm:h-16 sm:pl-6 sm:pr-44 sm:text-lg"
            />

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 sm:right-3 sm:gap-2">
              {inputValue && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClear}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:text-gray-700 sm:h-10 sm:w-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                aria-label="Search"
                className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-red-600 px-2 text-xs font-medium text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg sm:h-10 sm:px-3 sm:text-base"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 sm:h-7 sm:w-7">
                  <Search className="h-4 w-4" />
                </span>

                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Suggestions */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
              <ul>
                {suggestions.map((u) => (
                  <li key={u.slug}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(u.name)}
                      className="w-full border-b border-gray-100 px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors last:border-b-0 hover:bg-red-50 sm:px-6 sm:text-base"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                          <Building2 className="h-4 w-4 text-red-500" />
                        </div>

                        <div>
                          <p>{u.name}</p>
                          <p className="mt-0.5 text-xs font-normal text-gray-400">
                            {u.location}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* University Cards */}
        <div className="grid gap-3 sm:gap-4">
          {pairs.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Search className="h-6 w-6 text-red-400" />
              </div>

              <p className="text-lg font-semibold text-gray-600">
                No universities found for "{query}"
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Try a different keyword or clear the search.
              </p>

              <button
                type="button"
                onClick={handleClear}
                className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Clear Search
              </button>
            </div>
          ) : (
            pairs.map((pair, pairIdx) => (
              <div
                key={pairIdx}
                className="group/card relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="p-4 sm:p-5">
                  <div
                    className={`grid ${
                      pair.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1"
                    } divide-y divide-gray-100 md:divide-x md:divide-y-0`}
                  >
                    {pair.map((university, uniIdx) => {
                      const LocationIcon =
                        iconMap[university.locationIcon] ?? MapPin;

                      return (
                        <div
                          key={university.slug}
                          className={`group flex min-w-0 flex-col ${
                            uniIdx === 0 && pair.length === 2
                              ? "pb-4 md:pb-0 md:pr-6 lg:pr-7"
                              : uniIdx === 1
                                ? "pt-4 md:pt-0 md:pl-6 lg:pl-7"
                                : ""
                          }`}
                        >
                          {/* Logo + Location */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-11 w-24 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-2 transition-all duration-300 group-hover:bg-white group-hover:shadow-sm sm:h-12 sm:w-28">
                              <Image
                                src={university.image}
                                alt={university.name}
                                width={120}
                                height={40}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <div className="flex min-w-0 items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 sm:px-3 sm:text-xs">
                              <LocationIcon className="h-3 w-3 shrink-0" />

                              <span className="truncate">
                                {university.location}
                              </span>
                            </div>
                          </div>

                          {/* University Name */}
                          <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-red-600 sm:text-lg">
                            {university.name}
                          </h3>

                          {/* Meta */}
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            <div className="flex items-center gap-1.5 rounded-lg bg-indigo-50/70 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-700 sm:text-xs">
                              <BookOpen className="h-3 w-3" />
                              <span>{university.courses}</span>
                            </div>

                            <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-[11px] font-semibold text-gray-600 sm:text-xs">
                              <Users className="h-3 w-3 shrink-0" />

                              <span className="truncate">
                                {university.region}
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <Link
                            href={`/apply?university=${university.slug}`}
                            className="mt-3.5 inline-flex w-fit items-center gap-1.5 rounded-[6px] bg-red-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-red-700 hover:shadow-md sm:text-sm"
                          >
                            <span>Access LMS</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
