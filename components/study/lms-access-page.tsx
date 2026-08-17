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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Access Your University<span className="text-red-500"> LMS</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Find and connect to your institution's learning platform in seconds
          </p>
        </div>

        {/* Stats Strip */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10 sm:mb-12">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg border border-gray-100 transition-shadow duration-200"
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div
          ref={searchWrapperRef}
          className="relative w-full max-w-xs sm:max-w-lg md:max-w-xl mx-auto mb-12 sm:mb-16"
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
              className="w-full h-12 sm:h-16 pl-4 sm:pl-6 pr-24 sm:pr-44 rounded-2xl border-0 shadow-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-xs sm:text-lg [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            />

            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2">
              {inputValue && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClear}
                  className="bg-white text-gray-500 h-8 sm:h-10 w-8 sm:w-10 rounded-full shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 hover:text-gray-700 transition-all flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                aria-label="Search"
                className="bg-red-600 text-white h-8 sm:h-10 px-2 sm:px-3 rounded-full font-medium text-xs sm:text-base hover:bg-red-700 transition-all flex items-center gap-2 shrink-0 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20">
                  <Search className="w-4 h-4" />
                </span>
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Suggestions Dropdown */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden z-20 max-h-72 overflow-y-auto">
              <ul>
                {suggestions.map((u) => (
                  <li key={u.slug}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(u.name)}
                      className="w-full text-left px-4 sm:px-6 py-2.5 text-gray-900 text-sm sm:text-base font-medium hover:bg-red-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-red-500 shrink-0" />
                        {u.name}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* University Cards Grid */}
        <div className="grid gap-6 sm:gap-8">
          {pairs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-gray-100 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                No universities found for "{query}"
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try a different keyword or clear the search.
              </p>
            </div>
          ) : (
            pairs.map((pair, pairIdx) => (
              <div
                key={pairIdx}
                className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl border border-gray-100 transition-shadow duration-300"
              >
                <div
                  className={`relative grid ${
                    pair.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1"
                  } divide-y md:divide-y-0 md:divide-x-2 divide-gray-200 gap-8 md:gap-0`}
                >
                  {pair.map((university, uniIdx) => {
                    const LocationIcon =
                      iconMap[university.locationIcon] ?? MapPin;
                    return (
                      <div
                        key={university.slug}
                        className={`group flex flex-col gap-4 sm:gap-5 pt-8 first:pt-0 md:pt-0 transition-transform duration-300 ${
                          uniIdx === 0 && pair.length === 2
                            ? "md:pr-10"
                            : uniIdx === 1
                              ? "md:pl-10"
                              : ""
                        }`}
                      >
                        {/* Header: Logo + Location */}
                        <div className="flex justify-between items-start gap-4">
                          {/* Logo Container */}
                          <div className="h-14 w-32 sm:h-16 sm:w-40 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow shrink-0">
                            <Image
                              src={university.image}
                              alt={university.name}
                              width={140}
                              height={50}
                              className="object-contain"
                            />
                          </div>

                          {/* Location Badge */}
                          <div className="bg-gradient-to-r from-red-50 to-orange-50 text-red-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 border border-red-200 shadow-sm">
                            <LocationIcon className="h-3.5 w-3.5 text-red-600" />
                            <span>{university.location}</span>
                          </div>
                        </div>

                        {/* University Name */}
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight tracking-tight group-hover:text-red-600 transition-colors duration-200">
                          {university.name}
                        </h3>

                        {/* Meta Info Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* Courses Badge */}
                          <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200 shadow-sm">
                            <BookOpen className="h-3.5 w-3.5" />
                            {university.courses}
                          </div>

                          {/* Region Badge */}
                          <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200">
                            <Users className="h-3.5 w-3.5" />
                            {university.region}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                          href={`http://localhost:3000/apply?university=${university.slug}`}
                          className="mt-2 sm:mt-4 inline-flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold text-sm hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all duration-200 group/btn w-fit"
                        >
                          <span>Access LMS</span>
                          <ChevronRight className="h-4 w-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
