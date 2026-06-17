export interface ComparisonItem {
  id: string;
  name: string;
  short: string;
  fee: string;
  courses: string[];
  image: string;
  location: string;
  established: number;
  ranking: string;
  affiliations: string[];
  highlights: string[];
  description: string;
  website: string;
  verdict?: string;
}

export interface UniversityPair {
  id: string;
  image: string;
  a: ComparisonItem;
  b: ComparisonItem;
  recommendation?: string;
}

export const UNIVERSITY_COMPARISONS: UniversityPair[] = [
  {
    id: "amity-vs-manipal",
    image: "/compare/amity-vs-mn.png",
    a: {
      id: "amity",
      name: "MBA",
      short: "AMITY",
      fee: "Amity",
      courses: ["BBA", "MBA", "B.Tech", "Law", "Commerce", "Arts"],
      image: "/compare/amity-vs-mn.png",

      location: " Noida, UP",
      established: 2002,
      ranking: "NIRF Rank: 76 (Overall)",
      affiliations: ["NAAC Accredited", "UGC Recognized", "AICTE Approved"],
      highlights: [
        "300+ academic programs",
        "Global partnerships with 300+ international universities",
        "State-of-the-art infrastructure and labs",
        "Strong placement record",
      ],
      description:
        "Amity University is a leading private institution known for quality education and industry collaboration.",
      website: "www.amity.edu",
    },
    b: {
      id: "manipal-jaipur",
      name: "",
      short: "MUJ",
      fee: "manipal",
      courses: [
        "Engineering",
        "Commerce",
        "Arts",
        "Science",
        "Management",
        "Law",
      ],
      image: "/compare/manipal.png",
      location: "Jaipur, Rajasthan",
      established: 2016,
      ranking: "NIRF Rank: ",
      affiliations: ["NAAC Accredited", "AICTE Approved", "UGC Recognized"],
      highlights: [
        "Part of Manipal Academy of Higher Education",
        "Excellent faculty from industry experts",
        "100+ courses across disciplines",
        "Modern campus with international standards",
        "Strong industry connections",
      ],
      description:
        "Manipal University Jaipur offers quality education with a focus on innovation and skill development.",
      website: "www.jaipur.manipal.edu",
    },
  },
  {
    id: "rushford-vs-chandigarh-online",
    image: "/compare/rbs-vs-cu.png",
    a: {
      id: "rushford",
      name: "BBA",
      short: "RBS",
      fee: "₹12L - 20L",
      courses: ["MBA", "Executive MBA", "PGDM", "Diploma", "Certification"],
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop",
      location: "New Delhi & International",
      established: 1997,
      ranking: "Global MBA Rankings: Top 500",
      affiliations: [
        "ACBSP Accredited",
        "AACSB Member",
        "International Quality",
      ],
      highlights: [
        "Premium business education provider",
        "Industry-oriented curriculum",
        "Global faculty and network",
        "Executive mentoring programs",
        "Strong alumni network across Fortune 500 companies",
      ],
      description:
        "Rushford specializes in business education with a focus on management and leadership development.",
      website: "www.rushforduniversity.edu",
    },
    b: {
      id: "chandigarh-online",
      name: "BBA",
      short: "CU",
      fee: "₹2L - 5L",
      courses: ["BCA", "MBA", "B.Tech", "MCA", "B.Com", "MA", "Diploma"],
      image:
        "https://images.unsplash.com/photo-1516534775068-bb57ad17166b?w=500&h=400&fit=crop",
      location: "Chandigarh (Online Mode)",
      established: 2012,
      ranking: "NIRF Rank: 51 (Overall)",
      affiliations: ["NAAC A+ Accredited", "UGC Recognized", "ISO Certified"],
      highlights: [
        "Affordable online education",
        "Flexible learning schedules",
        "100% online delivery",
        "Industry-recognized degrees",
        "Strong support system for online learners",
      ],
      description:
        "Chandigarh University Online provides accessible, quality education through flexible online programs.",
      website: "www.cuchd.in/online",
    },
  },
  {
    id: "gla-vs-amity-online",
    image: "/compare/gla-vs-amity.png",
    a: {
      id: "gla-online",
      name: "BCA",
      short: "GLA",
      fee: "₹2.5L - 6L",
      courses: ["MBA", "MCA", "B.Tech", "BCA", "Diploma", "Certificate"],
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
      location: "Mathura, UP (Online)",
      established: 1998,
      ranking: "NIRF Rank: 201+ (Overall)",
      affiliations: ["UGC Recognized", "AICTE Approved", "ISO Certified"],
      highlights: [
        "Affordable online programs",
        "Flexible curriculum",
        "Online practical sessions",
        "Strong placement support",
        "Industry-relevant courses",
      ],
      description:
        "GLA University Online offers cost-effective online education with industry focus.",
      website: "www.gla.ac.in/online",
    },
    b: {
      id: "amity-online",
      name: "BCA",
      short: "AMITY",
      fee: "₹5L - 12L",
      courses: [
        "MBA",
        "M.Tech",
        "BCA",
        "B.Tech",
        "Executive Programs",
        "Certification",
      ],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop",
      location: "Noida (Online Platform)",
      established: 2002,
      ranking: "NIRF Rank: 76 (Overall)",
      affiliations: ["NAAC Accredited", "UGC Recognized", "AICTE Approved"],
      highlights: [
        "World-class online infrastructure",
        "Live interactive classes",
        "Expert faculty from industry",
        "Global student community",
        "Strong placement record",
      ],
      description:
        "Amity University Online delivers premium education through advanced online learning platforms.",
      website: "www.amity.edu/online",
    },
  },
  {
    id: "manipal-vs-rushford",
    image: "/compare/mu-vs-ru.png",
    a: {
      id: "manipal-full",
      name: "DBA",
      short: "MANIPAL",
      fee: "₹7L - 14L",
      courses: ["B.Tech", "MBA", "Medicine", "Law", "Engineering", "Commerce"],
      image:
        "https://images.unsplash.com/photo-1441239372925-51cff79fb247?w=500&h=400&fit=crop",
      location: "Manipal, Karnataka",
      established: 1953,
      ranking: "NIRF Rank: 29 (Overall)",
      affiliations: ["NAAC A+ Accredited", "UGC Recognized", "AICTE Approved"],
      highlights: [
        "One of India's premier institutions",
        "Strong research and innovation",
        "International collaborations",
        "Excellent faculty",
        "State-of-the-art facilities",
      ],
      description:
        "Manipal University is a leading institution known for academic excellence and research.",
      website: "www.manipal.edu",
    },
    b: {
      id: "rushford-full",
      name: "DBA",
      short: "RUSH",
      fee: "₹15L - 25L",
      courses: ["MBA", "Executive MBA", "PGDM", "Doctorate", "Short Courses"],
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
      location: "Global (Online & Offline)",
      established: 1997,
      ranking: "Global Rankings: Top 300",
      affiliations: ["ACBSP", "International Standards", "Global Network"],
      highlights: [
        "Premium executive education",
        "Global faculty network",
        "Industry partnerships",
        "Personalized learning paths",
        "International degree recognition",
      ],
      description:
        "Rushford provides world-class business education with global recognition and opportunities.",
      website: "www.rushforduniversity.edu",
    },
  },
];

export function getUniversityById(id: string): ComparisonItem | undefined {
  for (const pair of UNIVERSITY_COMPARISONS) {
    if (pair.a.id === id) return pair.a;
    if (pair.b.id === id) return pair.b;
  }
  return undefined;
}

export function getComparisonByPairId(
  pairId: string,
): UniversityPair | undefined {
  return UNIVERSITY_COMPARISONS.find((pair) => pair.id === pairId);
}

export function getAllUniversities(): ComparisonItem[] {
  const universities: ComparisonItem[] = [];
  for (const pair of UNIVERSITY_COMPARISONS) {
    universities.push(pair.a, pair.b);
  }
  return Array.from(new Map(universities.map((u) => [u.id, u])).values());
}

export function searchUniversities(query: string): ComparisonItem[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllUniversities().filter(
    (uni) =>
      uni.name.toLowerCase().includes(lowercaseQuery) ||
      uni.location.toLowerCase().includes(lowercaseQuery) ||
      uni.courses.some((course) =>
        course.toLowerCase().includes(lowercaseQuery),
      ),
  );
}

export function filterByFeeRange(min: number, max: number): ComparisonItem[] {
  return getAllUniversities().filter((uni) => {
    const fees = uni.fee
      .split(" - ")
      .map((f) => parseInt(f.replace(/₹|L/g, "")));
    return fees[0] >= min && fees[1] <= max;
  });
}

export function filterByCourse(course: string): ComparisonItem[] {
  return getAllUniversities().filter((uni) =>
    uni.courses.some((c) => c.toLowerCase().includes(course.toLowerCase())),
  );
}

export function getAllCourses(): string[] {
  const courses = new Set<string>();
  getAllUniversities().forEach((uni) => {
    uni.courses.forEach((course) => courses.add(course));
  });
  return Array.from(courses).sort();
}

export function getUniversitiesByLocation(location: string): ComparisonItem[] {
  return getAllUniversities().filter((uni) =>
    uni.location.toLowerCase().includes(location.toLowerCase()),
  );
}
