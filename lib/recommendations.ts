import type { StudentProfile } from "@/app/dashboard/types";

export interface RecommendationItem {
  id: string;
  image: string;
  match: string;
  matchScore: number;
  university: string;
  rating: string;
  reviews: string;
  applied: number;
  seed: string;
  title: string;
  tags: string[];
  fee: string;
  duration?: string;
  slug?: string;
}

// Known high-res campus photography mapping for universities
export const CAMPUS_IMAGES: Record<string, string> = {
  chandigarh:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=70",
  nmims:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=70",
  amity:
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=400&q=70",
  manipal:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=70",
  gla:
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=70",
  jain:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=70",
  dypatil:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=70",
  sharda:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=70",
  galgotias:
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=400&q=70",
  shoolini:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=70",
  default:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=70",
};

export function getUniversityCampusImage(name: string, bannerImg?: string): string {
  const lower = (name || "").toLowerCase();
  for (const [key, img] of Object.entries(CAMPUS_IMAGES)) {
    if (key !== "default" && lower.includes(key)) {
      return img;
    }
  }
  if (bannerImg && bannerImg.startsWith("http")) {
    return bannerImg;
  }
  return CAMPUS_IMAGES.default;
}

export function extractTargetDegree(student?: Partial<StudentProfile>): string {
  const pref = (student?.advisorProfile?.coursePreference || "").toLowerCase().trim();
  const directCourse = (student?.course || student?.coursesInterested?.[0] || "").toLowerCase().trim();

  const raw = pref || directCourse;
  if (!raw) return "mca"; // Default popular degree

  if (raw.includes("mca")) return "mca";
  if (raw.includes("mba")) return "mba";
  if (raw.includes("bca")) return "bca";
  if (raw.includes("bba")) return "bba";
  if (raw.includes("b.com") || raw.includes("bcom")) return "bcom";
  if (raw.includes("m.com") || raw.includes("mcom")) return "mcom";
  if (raw.includes("m.sc") || raw.includes("msc")) return "msc";
  if (raw.includes("b.sc") || raw.includes("bsc")) return "bsc";
  if (raw.includes("majmc") || raw.includes("ma_jmc")) return "majmc";
  if (raw.includes("bajmc")) return "bajmc";
  if (raw.includes("ma")) return "ma";
  if (raw.includes("ba")) return "ba";
  if (raw.includes("dba") || raw.includes("doctor")) return "dba";
  if (raw.includes("tech")) return "tech";

  return raw;
}

export function parseBudgetRange(budget?: string): { min: number; max: number } {
  if (!budget) return { min: 0, max: 2500000 };

  const clean = budget.replace(/,/g, "").replace(/\s+/g, " ");

  // Handle University Course Budget Range tab options
  if (clean.includes("250000") && (clean.includes("Above") || clean.includes("above") || clean.includes("&"))) {
    return { min: 250000, max: 2500000 };
  }
  if (clean.includes("200000") && clean.includes("250000")) {
    return { min: 200000, max: 250000 };
  }
  if (clean.includes("150000") && clean.includes("200000")) {
    return { min: 150000, max: 200000 };
  }
  if (clean.includes("100000") && clean.includes("150000")) {
    return { min: 100000, max: 150000 };
  }
  if (clean.includes("50000") && clean.includes("100000")) {
    return { min: 50000, max: 100000 };
  }

  // Generic extraction of numbers from strings
  const numbers = clean.match(/\d+/g)?.map((n) => parseInt(n, 10)) || [];
  if (numbers.length >= 2) {
    return { min: Math.min(numbers[0], numbers[1]), max: Math.max(numbers[0], numbers[1]) };
  } else if (numbers.length === 1) {
    if (clean.includes("above") || clean.includes("+") || clean.includes("&")) {
      return { min: numbers[0], max: 2500000 };
    }
    return { min: 0, max: numbers[0] };
  }

  switch (budget) {
    case "50k":
      return { min: 0, max: 55000 };
    case "50k_1l":
      return { min: 50000, max: 100000 };
    case "1l_3l":
      return { min: 100000, max: 300000 };
    case "3l_5l":
      return { min: 300000, max: 500000 };
    case "5l_plus":
      return { min: 500000, max: 2500000 };
    default:
      return { min: 0, max: 2500000 };
  }
}

export function formatIndianRupees(val: number): string {
  return "₹" + Math.round(val).toLocaleString("en-IN");
}

export function calculateMatchScore(params: {
  targetDegree: string;
  courseDegree: string;
  courseName: string;
  annualFee: number;
  budget?: string;
  highestQualification?: string;
  category?: string;
  studentState?: string;
  universityLocation?: string;
  universityRating?: number;
}): number {
  let score = 52; // base score

  // 1. Degree / Course match (up to +25)
  const target = params.targetDegree.toLowerCase();
  const cDeg = params.courseDegree.toLowerCase();
  const cName = params.courseName.toLowerCase();

  if (cDeg === target || cName.includes(target)) {
    score += 25;
  } else if (
    (target === "mca" && cDeg === "bca") ||
    (target === "mba" && cDeg === "bba") ||
    (target === "bca" && cDeg === "mca") ||
    (target === "bba" && cDeg === "mba")
  ) {
    score += 15;
  } else {
    score += 5;
  }

  // 2. Academic eligibility (up to +10)
  const qual = (params.highestQualification || "").toLowerCase();
  const isPgCourse = ["mca", "mba", "mcom", "ma", "msc", "tech", "pg"].some((d) =>
    cDeg.includes(d) || cName.includes(d)
  );
  const isUgCourse = ["bca", "bba", "bcom", "ba", "bsc", "ug"].some((d) =>
    cDeg.includes(d) || cName.includes(d)
  );

  if (qual === "bachelors") {
    score += isPgCourse ? 10 : 6;
  } else if (qual === "12th_pass" || qual === "diploma") {
    score += isUgCourse ? 10 : 5;
  } else if (qual === "masters") {
    score += 10;
  } else {
    score += 8;
  }

  // 3. Budget fit (up to +10)
  if (params.budget) {
    const { min, max } = parseBudgetRange(params.budget);
    if (params.annualFee >= min && params.annualFee <= max) {
      score += 10;
    } else if (params.annualFee < min) {
      score += 8;
    } else if (params.annualFee <= max * 1.25) {
      score += 5;
    } else {
      score += 2;
    }
  } else {
    score += 8;
  }

  // 4. Category advantage (up to +3)
  if (params.category && params.category !== "none") {
    score += 3;
  }

  // 5. University rating (up to +2)
  if ((params.universityRating || 0) >= 4.5) {
    score += 2;
  }

  return Math.min(98, Math.max(76, score));
}

// Fallback curated recommendations in case database is offline or empty
export const FALLBACK_RECOMMENDATIONS_CATALOG: RecommendationItem[] = [
  {
    id: "chandigarh-mca",
    image: CAMPUS_IMAGES.chandigarh,
    match: "98% Match",
    matchScore: 98,
    university: "CHANDIGARH UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "1.2k reviews",
    applied: 1240,
    seed: "chandigarh",
    title: "MCA with AI & Machine Learning Specialization",
    tags: ["NAAC A+", "UGC Entitled", "Zero Cost EMI", "Top Recruiter Network"],
    fee: "₹65,000",
    duration: "2 Years",
    slug: "/universities/chandigarh-university-online/mca",
  },
  {
    id: "nmims-mba",
    image: CAMPUS_IMAGES.nmims,
    match: "94% Match",
    matchScore: 94,
    university: "NMIMS CDOE",
    rating: "4.9",
    reviews: "2.4k reviews",
    applied: 2380,
    seed: "nmims",
    title: "Executive MBA in Business & AI Analytics",
    tags: ["Top Ranked B-School", "Industry Mentorship", "Placement Support"],
    fee: "₹1,10,000",
    duration: "2 Years",
    slug: "/universities/nmims-cdoe/mba",
  },
  {
    id: "amity-mca",
    image: CAMPUS_IMAGES.amity,
    match: "92% Match",
    matchScore: 92,
    university: "AMITY UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "1.8k reviews",
    applied: 1860,
    seed: "amity",
    title: "Online MCA in Cyber Security & Software Engineering",
    tags: ["NAAC A+", "UGC Entitled", "QS Ranked", "AI Learning Companion"],
    fee: "₹91,540",
    duration: "2 Years",
    slug: "/universities/amity-university-online/mca",
  },
  {
    id: "chandigarh-bca",
    image: CAMPUS_IMAGES.chandigarh,
    match: "98% Match",
    matchScore: 98,
    university: "CHANDIGARH UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "1.1k reviews",
    applied: 1120,
    seed: "chandigarh-bca",
    title: "Online BCA with AI & Data Science Specialization",
    tags: ["NAAC A+", "UGC Entitled", "Zero Cost EMI", "Generative AI Cert"],
    fee: "₹47,200",
    duration: "3 Years",
    slug: "/universities/chandigarh-university-online/bca",
  },
  {
    id: "amity-bba",
    image: CAMPUS_IMAGES.amity,
    match: "96% Match",
    matchScore: 96,
    university: "AMITY UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "2.1k reviews",
    applied: 2150,
    seed: "amity-bba",
    title: "Online BBA in Data Analytics & Digital Business",
    tags: ["NAAC A+", "HCLTech Collab", "Zero Cost EMI", "Top Placements"],
    fee: "₹58,370",
    duration: "3 Years",
    slug: "/universities/amity-university-online/bba",
  },
  {
    id: "gla-bca",
    image: CAMPUS_IMAGES.gla,
    match: "93% Match",
    matchScore: 93,
    university: "GLA UNIVERSITY ONLINE",
    rating: "4.6",
    reviews: "780 reviews",
    applied: 840,
    seed: "gla-bca",
    title: "Online BCA in Full Stack Development & Cloud",
    tags: ["NAAC A+", "UGC Approved", "Zero Cost EMI", "Live Coding Labs"],
    fee: "₹29,500",
    duration: "3 Years",
    slug: "/universities/gla-university/bca",
  },
  {
    id: "chandigarh-mba",
    image: CAMPUS_IMAGES.chandigarh,
    match: "97% Match",
    matchScore: 97,
    university: "CHANDIGARH UNIVERSITY ONLINE",
    rating: "4.8",
    reviews: "1.5k reviews",
    applied: 1650,
    seed: "cu-mba",
    title: "Online MBA with Triple Industry Certification",
    tags: ["NAAC A+", "UGC Entitled", "PwC Training", "Harvard Credential"],
    fee: "₹90,200",
    duration: "2 Years",
    slug: "/universities/chandigarh-university-online/mba",
  },
  {
    id: "gla-mca",
    image: CAMPUS_IMAGES.gla,
    match: "91% Match",
    matchScore: 91,
    university: "GLA UNIVERSITY ONLINE",
    rating: "4.7",
    reviews: "910 reviews",
    applied: 920,
    seed: "gla-mca",
    title: "Online MCA with Cloud Computing & AI/ML",
    tags: ["NAAC A+", "UGC Approved", "Zero Cost EMI", "Hackathons & Mentorship"],
    fee: "₹43,000",
    duration: "2 Years",
    slug: "/universities/gla-university/mca",
  },
];
