"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Monitor,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { CarouselBanner } from "./carousel-banner";

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
  const [student, setStudent] = useState<any>(null);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const s = localStorage.getItem("ecampus_student");
    if (s) setStudent(JSON.parse(s));
  }, []);

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

  if (!mounted) return <section className="min-h-screen bg-white" />;

  return (
    <section className="relative h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-white px-4 overflow-hidden">
        
      {/* Banner above search */}
      <CarouselBanner />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center mt-2">

        {/* Heading */}
        <div className="mb-6">
          {student?.name ? (
            <h1 className="text-5xl md:text-7xl font-normal tracking-[-0.06em] leading-none text-gray-900">
              <span className="block">Hey, {student.name.split(" ")[0]} 👋</span>
              <span className="block mt-2">What's your next move?</span>
            </h1>
          ) : (
            <h1 className="text-3xl md:text-3xl font-normal tracking-[-0.06em] leading-none text-gray-900">
              Explore. Learn. Advance.
            </h1>
          )}
        </div>

        {/* Single Input Box */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-6">
          <div
            className="flex items-center px-5 py-3 rounded-full bg-white border border-gray-300"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholders[placeholderIndex]}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-2 py-1 text-[16px] text-gray-800 placeholder:text-gray-400"
              // Inline style se direct override
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                WebkitAppearance: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white disabled:opacity-30"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {suggestionChips.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => search(label)}
              className="h-10 px-5 rounded-full border border-gray-200 bg-white flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all"
            >
              <Icon size={14} style={{ color }} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Two Feature Cards */}
        <div className="flex justify-center w-full mt-8 px-4 ">
          {/* Card 1: Search */}
          <Link href="/discover" className="block">
            <div className="bg-[#0f766e] px-4 py-3 rounded-2xl text-left">
              <div className="flex items-center gap-2 text-white">
                <Search size={18} />
                <h3 className="font-semibold text-md">Discover</h3>
              </div>
              <p className="text-teal-50 text-xs mt-0.5">Get fast and accurate
                answers from the most trusted sources.</p>
            </div>
          </Link>

          {/* Card 2: Computer Use */}

          {/* <div className="bg-[#111827] px-4 py-3 rounded-2xl text-left"> */}
          {/* <div className="flex items-center justify-between"> */}
          {/* <div className="flex items-center gap-2 text-white"> */}
          {/* <Monitor size={18} /> */}
          {/* <h3 className="font-semibold text-md">Get work done with Computer</h3> */}
        </div>
        {/* <span className="bg-[#1f2937] text-white text-[9px] px-2 py-0.5 rounded-full font-medium ml-2">NEW</span> */}
      </div>
      {/* <p className="text-gray-300 text-xs mt-0.5">Hand off your projects to get polished, reliable deliverables around the clock.</p> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}


    </section>
  );
}