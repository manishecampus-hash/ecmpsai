export interface ComparisonItem {
  id: string;
  name: string;
  short: string;
  university: string;
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
    id: "rushford-vs-eimt",
    image: "/compare/testttt.png",
    a: {
      id: "rushford",
      name: "Online DBA",
      short: "Rushford",
      university: "Rushford Business School",
      courses: ["Online DBA", "Doctorate", "Executive MBA", "MS"],
      image: "/compare/new.png",
      location: "Lucerne, Switzerland",
      established: 2008,
      ranking: "EduQua • QS 5-Star",
      affiliations: ["EduQua Certified", "AACSB Member", "ACBSP Member", "WES Approved"],
      highlights: [
        "Swiss Quality Label (EduQua)",
        "QS 5-Stars for Online Learning",
        "WES Evaluated Global Credential",
        "100% Online Doctorate with Mentorship",
      ],
      description:
        "Rushford Business School in Lucerne, Switzerland offers globally recognized business and doctoral programs.",
      website: "www.rushford.ch",
    },
    b: {
      id: "eimt",
      name: "Online DBA",
      short: "EIMT",
      university: "EIMT Switzerland",
      courses: ["Executive DBA", "Doctorate", "Master's", "Bachelor's"],
      image: "/compare/eimtnew.png",
      location: "Cham, Switzerland",
      established: 1987,
      ranking: "ACBSP Member • EURASHE",
      affiliations: ["ACBSP Member", "EURASHE Member", "ISO 40180:2017", "WES Approved"],
      highlights: [
        "Swiss Higher Education Institution",
        "WES Evaluated for International Careers",
        "Executive Online DBA Framework",
        "International Convocation Ceremonies",
      ],
      description:
        "European Institute of Management and Technology (EIMT) in Cham, Switzerland delivers accredited online doctoral and master's degrees.",
      website: "www.eimt.ch",
    },
  },
  {
    id: "ssbm-vs-esgci",
    image: "/compare/rbs-vs-cu.png",
    a: {
      id: "ssbm",
      name: "Executive DBA",
      short: "SSBM",
      university: "SSBM Geneva",
      courses: ["Executive DBA", "Global MBA", "Doctorate", "Executive Programs"],
      image: "/compare/ssbm.png",
      location: "Geneva, Switzerland",
      established: 2012,
      ranking: "ACBSP • EduQua Certified",
      affiliations: ["ACBSP Accredited", "EduQua Certified", "CHEA Recognized", "WES Approved"],
      highlights: [
        "Geneva Business Hub Presence",
        "Swiss Quality Label Certified",
        "Global Executive Cohort",
        "Applied Practical Research Curriculum",
      ],
      description:
        "Swiss School of Business and Management (SSBM Geneva) delivers prestigious European DBA and MBA degrees.",
      website: "www.ssbm.ch",
    },
    b: {
      id: "esgci",
      name: "Executive Program",
      short: "ESGCI",
      university: "ESGCI Paris",
      courses: ["Doctorate", "Executive MBA", "International Management", "BBA"],
      image: "/compare/esgc.png",
      location: "Paris, France",
      established: 1986,
      ranking: "Qualiopi • French State",
      affiliations: ["Qualiopi Certified", "French State Recognized", "WES Approved"],
      highlights: [
        "Premier Paris Campus",
        "French State Recognized Qualification",
        "International Management Specializations",
        "Global European Alumni Network",
      ],
      description:
        "École de Commerce International (ESGCI) in Paris is a renowned French business school offering state-recognized degrees.",
      website: "www.esgci.com",
    },
  },
  {
    id: "ggu-vs-edgewood",
    image: "/compare/gla-vs-amity.png",
    a: {
      id: "ggu",
      name: "Executive DBA",
      short: "GGU",
      university: "Golden Gate University",
      courses: ["Executive DBA", "Online MBA", "MS Business Analytics", "LLM"],
      image: "/compare/ggu.png",
      location: "California, USA",
      established: 1901,
      ranking: "WASC Accredited • Top US",
      affiliations: ["WASC Senior College Accredited", "AACSB Member", "WES Approved"],
      highlights: [
        "120+ Years American Higher Education Heritage",
        "San Francisco Financial District Connection",
        "Silicon Valley Tech & Business Ties",
        "Designed for Experienced Working Professionals",
      ],
      description:
        "Golden Gate University (GGU) in California provides top-tier accredited American degrees with flexible delivery.",
      website: "www.ggu.edu",
    },
    b: {
      id: "edgewood",
      name: "1 Year MBA",
      short: "Edgewood",
      university: "Edgewood University",
      courses: ["1 Year MBA", "Doctorate", "MS", "Executive Programs"],
      image: "/compare/e.png",
      location: "Madison, Wisconsin, USA",
      established: 1927,
      ranking: "HLC Accredited • Madison, USA",
      affiliations: ["Higher Learning Commission (HLC)", "Regional US Accreditation", "WES Approved"],
      highlights: [
        "Nearly 100-Year American University Heritage",
        "HLC Regional US Accreditation",
        "Accelerated 1-Year MBA Track Available",
        "Global Online Learning Community",
      ],
      description:
        "Edgewood University in Madison, Wisconsin delivers regionally accredited American master's and executive programs.",
      website: "www.edgewood.edu",
    },
  },
  {
    id: "lsmt-vs-birchwood",
    image: "/compare/mu-vs-ru.png",
    a: {
      id: "lsmt",
      name: "Executive DBA",
      short: "LSMT",
      university: "LSMT University",
      courses: ["Executive DBA", "Global MBA", "Doctorate", "Management"],
      image: "/compare/lsmt.png",
      location: "London, United Kingdom",
      established: 2001,
      ranking: "UK Executive Education",
      affiliations: ["UK Accredited Framework", "WES Approved", "Global Recognition"],
      highlights: [
        "Prestigious London Education Hub",
        "Career-Accelerating Doctorates & MBAs",
        "Flexible Distance & Online Format",
        "Dedicated Executive Faculty Mentorship",
      ],
      description:
        "London School of Management and Technology (LSMT) delivers career-focused UK business and doctoral degrees.",
      website: "www.lsmt.org.uk",
    },
    b: {
      id: "birchwood",
      name: "Doctorate / DBA",
      short: "Birchwood",
      university: "Birchwood University",
      courses: ["Doctorate / DBA", "Global MBA", "MS Data Science", "Certifications"],
      image: "/compare/b.png",
      location: "Orlando, Florida, USA",
      established: 2002,
      ranking: "Florida Licensed • DEAC",
      affiliations: ["Florida Commission for Independent Education", "WES Approved", "US Standards"],
      highlights: [
        "American Higher Education Degrees",
        "Curriculum Focused on Tech & Global Management",
        "100% Self-Paced & Online Flexibility",
        "Affordable US Degree Pathway",
      ],
      description:
        "Birchwood University in Florida offers modern, industry-aligned American doctoral and master's degrees.",
      website: "www.birchwoodu.org",
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
      uni.university.toLowerCase().includes(lowercaseQuery) ||
      uni.location.toLowerCase().includes(lowercaseQuery) ||
      uni.courses.some((course) =>
        course.toLowerCase().includes(lowercaseQuery),
      ),
  );
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
