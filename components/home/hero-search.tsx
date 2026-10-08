"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  Briefcase,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Monitor,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";


const suggestionChips = [
  { label: "Career Switch", icon: BriefcaseBusiness, color: "#5b21b6" },
  { label: "Get Promotion", icon: Zap, color: "#d97706" },
  { label: "MBA under ₹2 lakh", icon: GraduationCap, color: "#5b21b6" },
];

const placeholders = [
  "How do I reach ₹10 LPA?",
  "What's the smartest career for me?",
  "Help me figure out my future",
  "Which career has the best salary?",
  "I'm confused about my career",
];



export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (query) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [query]);

  const search = (value: string) => {
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-start lg:pt-0 bg-white px-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center mt-1 sm:mt-2">
        {/* Heading */}
        <div className="mb-3 sm:mb-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-red-500" />
            AI Overview
          </span>

          <h1 className="mt-1.5 whitespace-nowrap text-[22px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Explore. Learn.{" "}
            <span className="text-red-500">Advance.</span>
          </h1>
        </div>

        {/* Single Input Box */}
        <form
          onSubmit={handleSearch}
          className="w-[92%] sm:w-full max-w-2xl mx-auto mb-3 sm:mb-3.5"
        >
          <div className="flex items-center h-10 md:h-11 px-4 md:px-5 rounded-full bg-white border border-gray-300 w-full shadow-2xs hover:border-gray-400 focus-within:border-gray-500 transition-colors">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholders[placeholderIndex]}
              className="flex-1 h-full bg-transparent border-none outline-none focus:ring-0 px-2 text-sm md:text-base text-gray-800 placeholder:text-gray-400"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                WebkitAppearance: "none",
              }}
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white disabled:opacity-30 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </form>


        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {suggestionChips.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => search(label)}
              className="h-7.5 px-4 rounded-full border border-gray-200 bg-white flex items-center gap-1.5 text-[10px] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
            >
              <Icon size={13} style={{ color }} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Two Feature Cards */}
        <div className="flex flex-col sm:flex-row justify-center w-full mt-5 sm:mt-6 px-2 sm:px-4 gap-3 sm:gap-4">
          {/* Card 1 */}
          <Link href="/discover" className="block flex-1 no-underline">
            <div className="bg-[#FFF5F5] hover:bg-[#ffebee] border border-red-100/60 px-4 py-3 rounded-2xl text-left min-h-[84px] transition-colors">
              <div className="flex items-center gap-2 text-black">
                <Search size={17} />
                <h3 className="font-semibold text-sm">Discover</h3>
              </div>
              <p className="text-gray-700 text-xs mt-1">
                Get fast and accurate answers from the most trusted sources.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <div className="bg-[#111827] px-4 py-3 rounded-2xl text-left flex-1 min-h-[84px] border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Monitor size={17} />
                <h3 className="font-semibold text-sm">Get work done with AI</h3>
              </div>

              <span className="bg-[#1f2937] text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                NEW
              </span>
            </div>

            <p className="text-gray-300 text-xs mt-1">
              Hand off your projects to get polished.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
