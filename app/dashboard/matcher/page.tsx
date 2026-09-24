"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import UniImage from "@/components/ui/uniImage";
import type { StudentProfile } from "../types";
import {
  Search,
  MapPin,
  Sparkles,
  Star,
  Scale,
  Zap,
  Check,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

type Mode = "Online" | "Hybrid" | "Campus";
type Degree = "MBA" | "MCA" | "BCA" | "BBA" | "M.Tech" | "M.Sc";
type Specialization =
  | "AI & ML"
  | "Data Science"
  | "Cloud & Cyber Security"
  | "Full Stack";
type Accreditation = "NAAC" | "UGC" | "AICTE" | "WES";
type FeatureTag = "Scholarship" | "ZeroCostEMI" | "Placement";
type SortKey = "match" | "rating" | "fee" | "popular";

interface UniversityListing {
  id: string;
  name: string;
  image: string;
  program: string;
  degree: Degree;
  specialization: Specialization;
  mode: Mode;
  location: string;
  matchScore: number;
  rating: number;
  reviews: number;
  fee: number;
  scholarshipNote?: string;
  durationNote: string;
  accreditations: Accreditation[];
  features: FeatureTag[];
}

const UNIVERSITIES: UniversityListing[] = [
  {
    id: "chandigarh",
    name: "Chandigarh University Online",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=70",
    program: "MCA with AI & Machine Learning Specialization",
    degree: "MCA",
    specialization: "AI & ML",
    mode: "Online",
    location: "Chandigarh",
    matchScore: 98,
    rating: 4.8,
    reviews: 1200,
    fee: 65000,
    scholarshipNote: "Scholarships up to ₹10,000",
    durationNote: "100% Online · 2 Years Duration",
    accreditations: ["NAAC", "UGC", "AICTE"],
    features: ["Scholarship", "ZeroCostEMI", "Placement"],
  },
  {
    id: "nmims",
    name: "NMIMS CDOE",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=70",
    program: "Executive MBA in Business & AI Analytics",
    degree: "MBA",
    specialization: "AI & ML",
    mode: "Hybrid",
    location: "Mumbai",
    matchScore: 94,
    rating: 4.9,
    reviews: 2400,
    fee: 110000,
    scholarshipNote: "Eligible for 4 merit waivers",
    durationNote: "Live Weekend Batches",
    accreditations: ["UGC", "AICTE"],
    features: ["Placement"],
  },
  {
    id: "amity",
    name: "Amity University Online",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=400&q=70",
    program: "MCA in Cloud Computing & Cyber Security",
    degree: "MCA",
    specialization: "Cloud & Cyber Security",
    mode: "Online",
    location: "Noida",
    matchScore: 91,
    rating: 4.7,
    reviews: 1100,
    fee: 55000,
    scholarshipNote: "₹7,500 Early Bird Grant",
    durationNote: "Self-Paced with Masterclasses",
    accreditations: ["NAAC", "UGC"],
    features: ["ZeroCostEMI"],
  },
  {
    id: "manipal",
    name: "Manipal University Jaipur",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=70",
    program: "Master of Computer Applications (MCA) in Data Science",
    degree: "MCA",
    specialization: "Data Science",
    mode: "Online",
    location: "Jaipur",
    matchScore: 89,
    rating: 4.6,
    reviews: 987,
    fee: 75000,
    scholarshipNote: "₹12,000 Verified Scholarship",
    durationNote: "Live Mentorship Included",
    accreditations: ["NAAC", "WES"],
    features: ["Scholarship"],
  },
  {
    id: "gla",
    name: "GLA University Online",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=70",
    program: "BBA in Full Stack & Digital Business",
    degree: "BBA",
    specialization: "Full Stack",
    mode: "Online",
    location: "Mathura",
    matchScore: 87,
    rating: 4.4,
    reviews: 643,
    fee: 42000,
    scholarshipNote: "Zero Cost EMI available",
    durationNote: "Live Interactive Sessions",
    accreditations: ["NAAC", "UGC", "AICTE"],
    features: ["ZeroCostEMI", "Placement"],
  },
  {
    id: "jain",
    name: "Jain University Online",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=70",
    program: "BCA in Data Science & Analytics",
    degree: "BCA",
    specialization: "Data Science",
    mode: "Online",
    location: "Bangalore",
    matchScore: 85,
    rating: 4.5,
    reviews: 754,
    fee: 48000,
    scholarshipNote: "Merit scholarship up to 20%",
    durationNote: "100% Online · 3 Years Duration",
    accreditations: ["NAAC", "UGC"],
    features: ["Scholarship"],
  },
  {
    id: "dypatil",
    name: "DY Patil Vidyapeeth Online",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=70",
    program: "M.Tech in Cloud Architecture & Cyber Security",
    degree: "M.Tech",
    specialization: "Cloud & Cyber Security",
    mode: "Hybrid",
    location: "Pune",
    matchScore: 83,
    rating: 4.5,
    reviews: 512,
    fee: 95000,
    durationNote: "Industry-Aligned Labs",
    accreditations: ["NAAC", "AICTE", "WES"],
    features: ["Placement"],
  },
  {
    id: "sharda",
    name: "Sharda University Online",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=70",
    program: "M.Sc in Artificial Intelligence & Machine Learning",
    degree: "M.Sc",
    specialization: "AI & ML",
    mode: "Online",
    location: "Greater Noida",
    matchScore: 90,
    rating: 4.6,
    reviews: 833,
    fee: 58000,
    scholarshipNote: "Zero Cost EMI · Scholarship eligible",
    durationNote: "100% Online · 2 Years Duration",
    accreditations: ["UGC", "AICTE"],
    features: ["Scholarship", "ZeroCostEMI"],
  },
  {
    id: "galgotias",
    name: "Galgotias University",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=400&q=70",
    program: "MBA in Full Stack Product Management",
    degree: "MBA",
    specialization: "Full Stack",
    mode: "Campus",
    location: "Greater Noida",
    matchScore: 80,
    rating: 4.3,
    reviews: 421,
    fee: 120000,
    durationNote: "On-Campus · 2 Years Duration",
    accreditations: ["NAAC", "AICTE"],
    features: ["Placement"],
  },
  {
    id: "ggu",
    name: "GGU Online",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=70",
    program: "MCA in Full Stack Development",
    degree: "MCA",
    specialization: "Full Stack",
    mode: "Online",
    location: "Bilaspur",
    matchScore: 78,
    rating: 4.2,
    reviews: 298,
    fee: 52000,
    scholarshipNote: "Zero Cost EMI available",
    durationNote: "100% Online · 2 Years Duration",
    accreditations: ["UGC", "AICTE"],
    features: ["ZeroCostEMI"],
  },
];

const DEGREES: Degree[] = ["MBA", "MCA", "BCA", "BBA", "M.Tech", "M.Sc"];
const SPECIALIZATIONS: { id: Specialization; label: string }[] = [
  { id: "AI & ML", label: "Artificial Intelligence & ML" },
  { id: "Data Science", label: "Data Science & Analytics" },
  { id: "Cloud & Cyber Security", label: "Cloud & Cyber Security" },
  { id: "Full Stack", label: "Full Stack Software Engg" },
];
const MODES: Mode[] = ["Online", "Hybrid", "Campus"];
const ACCREDITATIONS: { id: Accreditation; label: string }[] = [
  { id: "NAAC", label: "NAAC A+ & A++ Rated" },
  { id: "UGC", label: "UGC Entitled Degree" },
  { id: "AICTE", label: "AICTE Approved" },
  { id: "WES", label: "WES Recognized" },
];
const FEATURES: { id: FeatureTag; label: string }[] = [
  { id: "Scholarship", label: "Scholarship Eligible" },
  { id: "ZeroCostEMI", label: "Zero Cost EMI Option" },
  { id: "Placement", label: "Job Placement Support" },
];
const FEATURE_CHIP_LABEL: Record<FeatureTag, string> = {
  Scholarship: "Scholarship Eligible",
  ZeroCostEMI: "Zero Cost EMI",
  Placement: "Placement Support",
};
const ACCREDITATION_CHIP_LABEL: Record<Accreditation, string> = {
  NAAC: "NAAC A+",
  UGC: "UGC Entitled",
  AICTE: "AICTE Approved",
  WES: "WES Recognized",
};

const MIN_FEE = 20000;
const MAX_FEE = 150000;
const PAGE_SIZE = 6;

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-2.5 py-1.5 text-left"
    >
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded transition-colors ${
          checked ? "bg-red-600" : "border border-gray-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-red-600 text-white"
          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function Dropdown({
  value,
  options,
  onChange,
  icon: Icon,
  bordered = true,
  align = "left",
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  bordered?: boolean;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          bordered
            ? "flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300"
            : "flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-gray-900 transition hover:text-gray-900"
        }
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0 text-gray-400" />}
        <span className="flex-1 truncate text-left">{selected?.label ?? value}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full z-30 mt-2 w-full min-w-[11rem] overflow-hidden rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between whitespace-nowrap px-3.5 py-2 text-left text-sm transition-colors ${
                o.value === value
                  ? "bg-red-50 font-semibold text-red-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {o.label}
              {o.value === value && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function AIDegreeMatcherPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Any Location");
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [modes, setModes] = useState<Mode[]>([]);
  const [maxFee, setMaxFee] = useState(MAX_FEE);
  const [accreditations, setAccreditations] = useState<Accreditation[]>([]);
  const [features, setFeatures] = useState<FeatureTag[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("match");
  const [page, setPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [whyMatchOpen, setWhyMatchOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
  }, []);

  const locations = useMemo(
    () => ["Any Location", ...Array.from(new Set(UNIVERSITIES.map((u) => u.location)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (
        q &&
        !(
          u.name.toLowerCase().includes(q) ||
          u.program.toLowerCase().includes(q) ||
          u.specialization.toLowerCase().includes(q)
        )
      )
        return false;
      if (location !== "Any Location" && u.location !== location) return false;
      if (degrees.length && !degrees.includes(u.degree)) return false;
      if (specializations.length && !specializations.includes(u.specialization))
        return false;
      if (modes.length && !modes.includes(u.mode)) return false;
      if (u.fee > maxFee) return false;
      if (
        accreditations.length &&
        !accreditations.some((a) => u.accreditations.includes(a))
      )
        return false;
      if (features.length && !features.some((f) => u.features.includes(f)))
        return false;
      return true;
    });
  }, [search, location, degrees, specializations, modes, maxFee, accreditations, features]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "fee":
          return a.fee - b.fee;
        case "popular":
          return b.reviews - a.reviews;
        default:
          return b.matchScore - a.matchScore;
      }
    });
    return list;
  }, [filtered, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [search, location, degrees, specializations, modes, maxFee, accreditations, features, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleResetFilters = () => {
    setDegrees([]);
    setSpecializations([]);
    setModes([]);
    setMaxFee(MAX_FEE);
    setAccreditations([]);
    setFeatures([]);
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev,
    );
  };

  const filterPanel = (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          Filters
        </h2>
        <button
          type="button"
          onClick={handleResetFilters}
          className="text-xs font-semibold text-red-600 hover:underline"
        >
          Reset All
        </button>
      </div>

      <FilterSection title="Degree Program">
        <div className="flex flex-wrap gap-1.5">
          {DEGREES.map((d) => (
            <Pill key={d} active={degrees.includes(d)} onClick={() => setDegrees((p) => toggleInArray(p, d))}>
              {d}
            </Pill>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Specialization">
        {SPECIALIZATIONS.map((s) => (
          <Checkbox
            key={s.id}
            checked={specializations.includes(s.id)}
            onChange={() => setSpecializations((p) => toggleInArray(p, s.id))}
            label={s.label}
          />
        ))}
      </FilterSection>

      <FilterSection title="Study Mode">
        <div className="flex flex-wrap gap-1.5">
          {MODES.map((m) => (
            <Pill key={m} active={modes.includes(m)} onClick={() => setModes((p) => toggleInArray(p, m))}>
              {m}
            </Pill>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Maximum Annual Fee">
        <input
          type="range"
          min={MIN_FEE}
          max={MAX_FEE}
          step={5000}
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          className="w-full accent-red-600"
        />
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
          <span>₹{MIN_FEE.toLocaleString("en-IN")}</span>
          <span className="font-semibold text-red-600">
            Up to ₹{maxFee.toLocaleString("en-IN")}/yr
          </span>
        </div>
      </FilterSection>

      <FilterSection title="Accreditations">
        {ACCREDITATIONS.map((a) => (
          <Checkbox
            key={a.id}
            checked={accreditations.includes(a.id)}
            onChange={() => setAccreditations((p) => toggleInArray(p, a.id))}
            label={a.label}
          />
        ))}
      </FilterSection>

      <FilterSection title="Features">
        {FEATURES.map((f) => (
          <Checkbox
            key={f.id}
            checked={features.includes(f.id)}
            onChange={() => setFeatures((p) => toggleInArray(p, f.id))}
            label={f.label}
          />
        ))}
      </FilterSection>

      <button
        type="button"
        onClick={() => {
          setPage(1);
          setFiltersOpen(false);
        }}
        className="mt-4 w-full rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Find Your Perfect University
              </h1>
              <p className="mt-1 max-w-xl text-sm text-gray-500">
                Explore universities and degree programs matched to your goals, budget, and career plans.
              </p>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Recommendations
            </span>
          </div>

          {/* Search bar */}
          <div className="mb-4 flex flex-col rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm transition-colors focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5">
              <Search className="h-[18px] w-[18px] flex-shrink-0 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search universities, degrees, or specializations"
                className="w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
              />
            </div>
            <div className="mx-1 hidden h-6 w-px flex-shrink-0 bg-gray-200 sm:block" />
            <div className="border-t border-gray-100 pt-1.5 sm:w-52 sm:flex-shrink-0 sm:border-t-0 sm:pt-0">
              <Dropdown
                value={location}
                onChange={setLocation}
                options={locations.map((loc) => ({ value: loc, label: loc }))}
                icon={MapPin}
                bordered={false}
              />
            </div>
            <button
              type="button"
              onClick={() => setPage(1)}
              className="mt-1.5 flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:ml-1.5 sm:mt-0"
            >
              <Search className="h-4 w-4" />
              Search Universities
            </button>
          </div>

          {/* AI recommendation banner */}
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3.5 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                <div>
                  <p className="text-sm font-bold text-gray-900">AI Recommended for You</p>
                  <p className="text-xs text-gray-500">
                    Based on your academic profile, career goals &amp; budget target.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhyMatchOpen((v) => !v)}
                className="whitespace-nowrap text-xs font-semibold text-red-600 hover:underline"
              >
                Why this match? {whyMatchOpen ? "▲" : "→"}
              </button>
            </div>
            {whyMatchOpen && (
              <p className="mt-2.5 border-t border-red-100 pt-2.5 text-xs leading-relaxed text-gray-600">
                Matches are calculated from your AI Advisor questionnaire goals, uploaded
                academic transcript, and your preferred budget range — the closer a program
                aligns with all three, the higher its match score.
              </p>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-start">
            {/* Filters — desktop; stays pinned in view while the results column scrolls */}
            <div className="hidden flex-shrink-0 lg:sticky lg:top-6 lg:block lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:overflow-y-auto">
              {filterPanel}
            </div>

            {/* Filters — mobile toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </span>
              <span className="text-xs text-gray-400">{filtersOpen ? "Hide" : "Show"}</span>
            </button>
            {filtersOpen && <div className="lg:hidden">{filterPanel}</div>}

            {/* Results */}
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-gray-900">{sorted.length}</span> Universities Found
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex-shrink-0 text-gray-500">Sort by</span>
                  <div className="w-44">
                    <Dropdown
                      value={sortBy}
                      onChange={(v) => setSortBy(v as SortKey)}
                      align="right"
                      options={[
                        { value: "match", label: "AI Match Score" },
                        { value: "rating", label: "Highest Rated" },
                        { value: "fee", label: "Lowest Fees" },
                        { value: "popular", label: "Most Popular" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {pageItems.length === 0 ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">No universities match your filters</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try widening your budget or clearing a few filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pageItems.map((u) => {
                    const compared = compareIds.includes(u.id);
                    return (
                      <div
                        key={u.id}
                        className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 sm:flex-row sm:items-center"
                      >
                        <div className="relative h-36 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-40">
                          <UniImage src={u.image} alt={u.name} className="object-cover" />
                          <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
                            {u.matchScore}% Match
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold tracking-wide text-red-600">
                              {u.name.toUpperCase()}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              {u.rating.toFixed(1)}{" "}
                              <span className="text-gray-400">
                                ({(u.reviews / 1000).toFixed(1).replace(".0", "")}k reviews)
                              </span>
                            </span>
                          </div>

                          <p className="mt-1.5 text-lg font-semibold text-gray-900">{u.program}</p>

                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {u.accreditations.map((a) => (
                              <span
                                key={a}
                                className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                              >
                                {ACCREDITATION_CHIP_LABEL[a]}
                              </span>
                            ))}
                            {u.features.map((f) => (
                              <span
                                key={f}
                                className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                              >
                                {FEATURE_CHIP_LABEL[f]}
                              </span>
                            ))}
                          </div>

                          <p className="mt-3 text-sm text-gray-500">
                            Annual Fee{" "}
                            <span className="font-semibold text-gray-900">
                              ₹{u.fee.toLocaleString("en-IN")}
                            </span>
                          </p>
                          {u.scholarshipNote && (
                            <p className="mt-0.5 text-xs font-medium text-emerald-600">
                              {u.scholarshipNote}
                            </p>
                          )}
                          <p className="mt-0.5 text-xs text-gray-400">{u.durationNote}</p>
                        </div>

                        <div className="flex flex-shrink-0 gap-2.5 sm:w-40 sm:flex-col">
                          <button
                            type="button"
                            onClick={() => toggleCompare(u.id)}
                            className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:w-full ${
                              compared
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {compared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
                            {compared ? "Added" : "Compare"}
                          </button>
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md sm:flex-none sm:w-full"
                          >
                            <Zap className="h-3.5 w-3.5 fill-white" />
                            1-Click Apply
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {sorted.length > 0 && (
                <div className="flex items-center justify-center gap-1.5 pt-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                        n === currentPage
                          ? "bg-red-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Sticky compare bar */}
      {compareIds.length >= 2 && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="flex items-center gap-3 rounded-full bg-gray-900 py-2 pl-4 pr-2 text-white shadow-2xl">
            <span className="text-sm font-medium">
              {compareIds.length} universities selected
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold transition hover:bg-emerald-700"
            >
              Compare Universities
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              aria-label="Clear comparison"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
