"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import UniImage from "@/components/ui/uniImage";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import { EASE_OUT, backdropMotion, collapse, fadeUp } from "../components/motion";
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
  Monitor,
  Shuffle,
  Building2,
  type LucideIcon,
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

// Page-to-page transition: the whole result list slides in the direction of travel
const pageVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT, staggerChildren: 0.05 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -24,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

// Individual result cards: staggered fade-up on entry, quick fade on removal
const cardVariants: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
};

const MODE_ICONS: Record<Mode, LucideIcon> = {
  Online: Monitor,
  Hybrid: Shuffle,
  Campus: Building2,
};

const FEE_PRESETS = [
  { label: "Any", value: MAX_FEE },
  { label: "≤ ₹50K", value: 50000 },
  { label: "≤ ₹75K", value: 75000 },
  { label: "≤ ₹1L", value: 100000 },
];

type FilterState = {
  search: string;
  location: string;
  degrees: Degree[];
  specializations: Specialization[];
  modes: Mode[];
  maxFee: number;
  accreditations: Accreditation[];
  features: FeatureTag[];
};
type FacetKey = "degree" | "specialization" | "mode" | "accreditation" | "feature";

// `skip` ignores one filter group so facet counts show how many results each option would give
function matchesFilters(u: UniversityListing, f: FilterState, skip?: FacetKey) {
  const q = f.search.trim().toLowerCase();
  if (
    q &&
    !(
      u.name.toLowerCase().includes(q) ||
      u.program.toLowerCase().includes(q) ||
      u.specialization.toLowerCase().includes(q)
    )
  )
    return false;
  if (f.location !== "Any Location" && u.location !== f.location) return false;
  if (skip !== "degree" && f.degrees.length && !f.degrees.includes(u.degree)) return false;
  if (skip !== "specialization" && f.specializations.length && !f.specializations.includes(u.specialization))
    return false;
  if (skip !== "mode" && f.modes.length && !f.modes.includes(u.mode)) return false;
  if (u.fee > f.maxFee) return false;
  if (skip !== "accreditation" && f.accreditations.length && !f.accreditations.some((a) => u.accreditations.includes(a)))
    return false;
  if (skip !== "feature" && f.features.length && !f.features.some((x) => u.features.includes(x)))
    return false;
  return true;
}

const formatFeeShort = (fee: number) =>
  fee >= 100000 ? `₹${(fee / 100000).toFixed(fee % 100000 ? 1 : 0)}L` : `₹${fee / 1000}K`;

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function OptionRow({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  const disabled = count === 0 && !checked;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <span
        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
          checked ? "border-red-600 bg-red-600" : "border-gray-300 bg-white group-hover:border-gray-400"
        }`}
      >
        {checked && (
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex"
          >
            <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
          </motion.span>
        )}
      </span>
      <span className={`flex-1 text-sm ${checked ? "font-medium text-gray-900" : "text-gray-600"}`}>
        {label}
      </span>
      <span className="min-w-[1.5rem] rounded-full bg-gray-100 px-1.5 py-0.5 text-center text-[11px] font-medium tabular-nums text-gray-500">
        {count}
      </span>
    </button>
  );
}

function ChoiceChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  const disabled = count === 0 && !active;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${
        active
          ? "border-red-500 bg-red-50 text-red-700"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {active && <Check className="h-3 w-3" strokeWidth={3} />}
      {label}
      <span className={`tabular-nums ${active ? "text-red-400" : "text-gray-400"}`}>{count}</span>
    </button>
  );
}

function ModeTile({
  mode,
  active,
  onClick,
  count,
}: {
  mode: Mode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  const Icon = MODE_ICONS[mode];
  const disabled = count === 0 && !active;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${
        active
          ? "border-red-500 bg-red-50 text-red-700 shadow-sm shadow-red-100"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <Icon className={`h-[18px] w-[18px] ${active ? "text-red-600" : "text-gray-400"}`} strokeWidth={1.8} />
      <span className="text-xs font-semibold">{mode}</span>
      <span className={`text-[10px] tabular-nums ${active ? "text-red-400" : "text-gray-400"}`}>
        {count} {count === 1 ? "program" : "programs"}
      </span>
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

      <AnimatePresence>
        {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
          style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
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
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSection({
  title,
  selected = 0,
  defaultOpen = true,
  children,
}: {
  title: string;
  selected?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen || selected > 0);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 py-3.5 text-left"
      >
        <span className="flex-1 text-[13px] font-semibold text-gray-900">{title}</span>
        {selected > 0 && (
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
            {selected}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" {...collapse} className="overflow-hidden">
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
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

  const filterState: FilterState = useMemo(
    () => ({ search, location, degrees, specializations, modes, maxFee, accreditations, features }),
    [search, location, degrees, specializations, modes, maxFee, accreditations, features],
  );

  const filtered = useMemo(
    () => UNIVERSITIES.filter((u) => matchesFilters(u, filterState)),
    [filterState],
  );

  // How many results each option would give, given every *other* active filter
  const facets = useMemo(() => {
    const count = (skip: FacetKey, test: (u: UniversityListing) => boolean) =>
      UNIVERSITIES.filter((u) => matchesFilters(u, filterState, skip) && test(u)).length;
    return {
      degree: Object.fromEntries(DEGREES.map((d) => [d, count("degree", (u) => u.degree === d)])),
      specialization: Object.fromEntries(
        SPECIALIZATIONS.map((x) => [x.id, count("specialization", (u) => u.specialization === x.id)]),
      ),
      mode: Object.fromEntries(MODES.map((m) => [m, count("mode", (u) => u.mode === m)])),
      accreditation: Object.fromEntries(
        ACCREDITATIONS.map((a) => [a.id, count("accreditation", (u) => u.accreditations.includes(a.id))]),
      ),
      feature: Object.fromEntries(
        FEATURES.map((x) => [x.id, count("feature", (u) => u.features.includes(x.id))]),
      ),
    } as Record<FacetKey, Record<string, number>>;
  }, [filterState]);

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

  // Direction of the last page change (1 = forward, -1 = back) drives the slide direction
  const prevPageRef = useRef(currentPage);
  const direction = currentPage >= prevPageRef.current ? 1 : -1;
  useEffect(() => {
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const resultsTopRef = useRef<HTMLDivElement>(null);
  const goToPage = (n: number) => {
    if (n === currentPage) return;
    setPage(n);
    // Bring the top of the results back into view if the user has scrolled past it
    const el = resultsTopRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilters = () => {
    setDegrees([]);
    setSpecializations([]);
    setModes([]);
    setMaxFee(MAX_FEE);
    setAccreditations([]);
    setFeatures([]);
  };

  const activeFilterCount =
    degrees.length +
    specializations.length +
    modes.length +
    accreditations.length +
    features.length +
    (maxFee < MAX_FEE ? 1 : 0);

  const handleClearAll = () => {
    handleResetFilters();
    setLocation("Any Location");
  };

  // Removable chips summarising every active filter, shown above the results
  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...(location !== "Any Location"
      ? [{ key: "loc", label: location, onRemove: () => setLocation("Any Location") }]
      : []),
    ...degrees.map((d) => ({ key: `deg-${d}`, label: d, onRemove: () => setDegrees((p) => p.filter((x) => x !== d)) })),
    ...specializations.map((sp) => ({
      key: `spec-${sp}`,
      label: SPECIALIZATIONS.find((x) => x.id === sp)?.label ?? sp,
      onRemove: () => setSpecializations((p) => p.filter((x) => x !== sp)),
    })),
    ...modes.map((m) => ({ key: `mode-${m}`, label: m, onRemove: () => setModes((p) => p.filter((x) => x !== m)) })),
    ...(maxFee < MAX_FEE
      ? [{ key: "fee", label: `Up to ${formatFeeShort(maxFee)}/yr`, onRemove: () => setMaxFee(MAX_FEE) }]
      : []),
    ...accreditations.map((a) => ({
      key: `acc-${a}`,
      label: ACCREDITATION_CHIP_LABEL[a],
      onRemove: () => setAccreditations((p) => p.filter((x) => x !== a)),
    })),
    ...features.map((f) => ({
      key: `feat-${f}`,
      label: FEATURE_CHIP_LABEL[f],
      onRemove: () => setFeatures((p) => p.filter((x) => x !== f)),
    })),
  ];

  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFiltersOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev,
    );
  };

  const feePct = ((maxFee - MIN_FEE) / (MAX_FEE - MIN_FEE)) * 100;

  const filterBody = (
    <>
      <FilterSection title="Degree Program" selected={degrees.length}>
        <div className="flex flex-wrap gap-1.5">
          {DEGREES.map((d) => (
            <ChoiceChip
              key={d}
              label={d}
              count={facets.degree[d]}
              active={degrees.includes(d)}
              onClick={() => setDegrees((p) => toggleInArray(p, d))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Specialization" selected={specializations.length}>
        <div className="-mx-2">
          {SPECIALIZATIONS.map((sp) => (
            <OptionRow
              key={sp.id}
              label={sp.label}
              count={facets.specialization[sp.id]}
              checked={specializations.includes(sp.id)}
              onChange={() => setSpecializations((p) => toggleInArray(p, sp.id))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Study Mode" selected={modes.length}>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map((m) => (
            <ModeTile
              key={m}
              mode={m}
              count={facets.mode[m]}
              active={modes.includes(m)}
              onClick={() => setModes((p) => toggleInArray(p, m))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Annual Fee" selected={maxFee < MAX_FEE ? 1 : 0}>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-gray-500">Maximum budget</span>
          <span className="text-sm font-bold tabular-nums text-gray-900">
            ₹{maxFee.toLocaleString("en-IN")}
            <span className="text-xs font-medium text-gray-400">/yr</span>
          </span>
        </div>
        <input
          type="range"
          min={MIN_FEE}
          max={MAX_FEE}
          step={5000}
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          aria-label="Maximum annual fee"
          style={{ background: `linear-gradient(to right, #dc2626 ${feePct}%, #e5e7eb ${feePct}%)` }}
          className="mt-3.5 h-1.5 w-full cursor-pointer appearance-none rounded-full border-0 p-0 outline-none focus:border-0 focus:shadow-none focus:outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-red-600 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110 focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-red-100"
        />
        <div className="mt-2 flex justify-between text-[11px] text-gray-400">
          <span>{formatFeeShort(MIN_FEE)}</span>
          <span>{formatFeeShort(MAX_FEE)}</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {FEE_PRESETS.map((preset) => {
            const active = maxFee === preset.value;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => setMaxFee(preset.value)}
                className={`whitespace-nowrap rounded-full px-1 py-1 text-[11px] font-semibold transition active:scale-95 ${
                  active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Accreditations" selected={accreditations.length} defaultOpen={false}>
        <div className="-mx-2">
          {ACCREDITATIONS.map((a) => (
            <OptionRow
              key={a.id}
              label={a.label}
              count={facets.accreditation[a.id]}
              checked={accreditations.includes(a.id)}
              onChange={() => setAccreditations((p) => toggleInArray(p, a.id))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Features" selected={features.length} defaultOpen={false}>
        <div className="-mx-2">
          {FEATURES.map((f) => (
            <OptionRow
              key={f.id}
              label={f.label}
              count={facets.feature[f.id]}
              checked={features.includes(f.id)}
              onChange={() => setFeatures((p) => toggleInArray(p, f.id))}
            />
          ))}
        </div>
      </FilterSection>
    </>
  );

  const filterHeading = (
    <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
      <SlidersHorizontal className="h-4 w-4 text-gray-400" />
      Filters
      <AnimatePresence initial={false}>
        {activeFilterCount > 0 && (
          <motion.span
            key="count"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white"
          >
            {activeFilterCount}
          </motion.span>
        )}
      </AnimatePresence>
    </h2>
  );

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
          <motion.div {...fadeUp(0)} className="mb-5 flex flex-wrap items-start justify-between gap-3">
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
          </motion.div>

          {/* Search bar */}
          <motion.div {...fadeUp(0.06)} className="relative z-20 mb-4 flex flex-col rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm transition-colors focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 sm:flex-row sm:items-center">
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
              onClick={() => goToPage(1)}
              className="mt-1.5 flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] sm:ml-1.5 sm:mt-0"
            >
              <Search className="h-4 w-4" />
              Search Universities
            </button>
          </motion.div>

          {/* AI recommendation banner */}
          <motion.div {...fadeUp(0.12)} className="mb-5 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3.5 sm:px-5">
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
                Why this match?{" "}
                <motion.span
                  animate={{ rotate: whyMatchOpen ? -90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </button>
            </div>
            <AnimatePresence initial={false}>
              {whyMatchOpen && (
                <motion.div key="why" {...collapse} className="overflow-hidden">
                  <p className="mt-2.5 border-t border-red-100 pt-2.5 text-xs leading-relaxed text-gray-600">
                    Matches are calculated from your AI Advisor questionnaire goals, uploaded
                    academic transcript, and your preferred budget range — the closer a program
                    aligns with all three, the higher its match score.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-start">
            {/* Filters — desktop; header stays fixed while the options scroll inside the pinned panel */}
            <aside className="hidden flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-0 lg:flex lg:max-h-[calc(100vh-7rem)] lg:w-72">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                {filterHeading}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  disabled={activeFilterCount === 0}
                  className="text-xs font-semibold text-red-600 transition hover:underline disabled:cursor-default disabled:text-gray-300 disabled:no-underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 [scrollbar-width:thin]">{filterBody}</div>
            </aside>

            {/* Filters — mobile trigger (opens a bottom sheet) */}
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition active:scale-[0.99] lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* Results */}
            <div className="min-w-0 flex-1 space-y-4">
              <div ref={resultsTopRef} className="relative z-10 flex scroll-mt-4 flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-gray-500">
                  <motion.span
                    key={sorted.length}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="inline-block font-bold text-gray-900"
                  >
                    {sorted.length}
                  </motion.span>{" "}
                  Universities Found
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

              <AnimatePresence initial={false}>
                {activeChips.length > 0 && (
                  <motion.div key="active-chips" {...collapse} className="overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2">
                      <AnimatePresence initial={false} mode="popLayout">
                        {activeChips.map((chip) => (
                          <motion.button
                            layout
                            key={chip.key}
                            type="button"
                            onClick={chip.onRemove}
                            aria-label={`Remove filter: ${chip.label}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 py-1 pl-3 pr-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                          >
                            {chip.label}
                            <X className="h-3 w-3" strokeWidth={2.5} />
                          </motion.button>
                        ))}
                      </AnimatePresence>
                      <button
                        type="button"
                        onClick={handleClearAll}
                        className="px-1 text-xs font-semibold text-gray-500 transition hover:text-gray-900 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
              {pageItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE_OUT } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-900">No universities match your filters</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try widening your budget or clearing a few filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleClearAll();
                      setSearch("");
                    }}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${currentPage}`}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4"
                >
                  <AnimatePresence mode="popLayout">
                  {pageItems.map((u) => {
                    const compared = compareIds.includes(u.id);
                    return (
                      // Motion lives on a wrapper so framer's transforms don't override the card's CSS hover lift
                      <motion.div key={u.id} layout="position" variants={cardVariants} exit="exit">
                      <div
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
                            className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.97] sm:flex-none sm:w-full ${
                              compared
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <motion.span
                              key={compared ? "added" : "compare"}
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              className="flex"
                            >
                              {compared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
                            </motion.span>
                            {compared ? "Added" : "Compare"}
                          </button>
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md active:scale-[0.97] sm:flex-none sm:w-full"
                          >
                            <Zap className="h-3.5 w-3.5 fill-white" />
                            1-Click Apply
                          </button>
                        </div>
                      </div>
                      </motion.div>
                    );
                  })}
                  </AnimatePresence>
                </motion.div>
              )}
              </AnimatePresence>

              {/* Pagination */}
              {sorted.length > 0 && (
                <motion.div layout="position" className="flex items-center justify-center gap-1.5 pt-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      aria-current={n === currentPage ? "page" : undefined}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        n === currentPage ? "text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {/* Active indicator glides between page numbers */}
                      {n === currentPage && (
                        <motion.span
                          layoutId="matcher-active-page"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-red-600 shadow-sm"
                        />
                      )}
                      <span className="relative">{n}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            key="filter-sheet"
            {...backdropMotion}
            onClick={() => setFiltersOpen(false)}
            className="fixed inset-0 z-[70] bg-slate-900/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0, transition: { type: "spring", stiffness: 380, damping: 38 } }}
              exit={{ y: "100%", transition: { duration: 0.2, ease: "easeIn" } }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl"
            >
              <div className="mx-auto mt-2.5 h-1 w-10 flex-shrink-0 rounded-full bg-gray-200" />
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
                {filterHeading}
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5">{filterBody}</div>
              <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  disabled={activeFilterCount === 0}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
                >
                  Show {sorted.length} {sorted.length === 1 ? "result" : "results"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky compare bar */}
      <AnimatePresence>
      {compareIds.length >= 2 && (
        <motion.div
          key="compare-bar"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 30 } }}
          exit={{ opacity: 0, y: 40, transition: { duration: 0.18 } }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
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
        </motion.div>
      )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
