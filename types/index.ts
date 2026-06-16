export interface University {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  naac: string;
  ugc: boolean;
  rating: number;
  placementRate: number;
  avgFee: number;
  avgSalary: number;
  programs: string[];
  emi: boolean;
  description: string;
  highlights: string[];
  outcomes: { role: string; salary: string }[];
  reviews: { name: string; role: string; text: string; rating: number }[];
  mode: string[];
  established: number;
  students: number;
}

export interface Degree {
  slug: string;
  name: string;
  fullName: string;
  duration: string;
  avgSalary: number;
  avgFee: number;
  minFee: number;
  maxFee: number;
  universities: number;
  mode: string[];
  description: string;
  careerPath: string[];
  whoShouldDo: string[];
  topRoles: { title: string; salary: string }[];
  faqs: { q: string; a: string }[];
}

export interface Career {
  slug: string;
  title: string;
  avgSalary: string;
  growth: string;
  degrees: string[];
  skills: string[];
}

export interface GoalCard {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
}

export interface SuccessStory {
  name: string;
  age: number;
  icon: string;
  text: string;
  change: string;
  tag: string;
}

export interface AIRecommendation {
  recommendedDegrees: string[];
  careerPath: string[];
  salaryGrowth: string;
  reasoning: string;
  topUniversities: string[];
}

export interface SearchResult {
  universities: University[];
  degrees: Degree[];
  query: string;
}
