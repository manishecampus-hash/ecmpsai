export interface Program {
  id: string;
  tab: string;
  ribbon: string;
  title: string;
  image: string;
  duration: string;
  learners: string;
  slug: string;
  isFree: boolean;
}

export const programsData: Program[] = [
  {
    id: "free-ai-basics",
    tab: "free",
    ribbon: "100% FREE",
    title: "Introduction to AI & Prompt Engineering Masterclass",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=900&auto=format&fit=crop&q=80",
    duration: "4 hrs of learning",
    learners: "45.1k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "free-mgmt-foundations",
    tab: "free",
    ribbon: "FREE Course",
    title: "Foundations of Digital Marketing & Business Analytics",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
    duration: "6 hrs of learning",
    learners: "99.2k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "mba-healthcare",
    tab: "pg",
    ribbon: "Trending",
    title: "MBA in Hospital and Healthcare Management",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    learners: "12.4k+ learners",
    slug: "#",
    isFree: false,
  },
  {
    id: "bca-fintech-ai",
    tab: "ug",
    ribbon: "Trending",
    title: "BCA with specialization in Financial Technology and AI",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=900&auto=format&fit=crop&q=80",
    duration: "36 months",
    learners: "8.7k+ learners",
    slug: "#",
    isFree: false,
  },
  {
    id: "mca-fintech-ai",
    tab: "pg",
    ribbon: "Trending",
    title: "MCA with specialization in Financial Technology and AI",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    learners: "6.3k+ learners",
    slug: "#",
    isFree: false,
  },
  {
    id: "mba-dual",
    tab: "pg",
    ribbon: "QS Ranked",
    title: "MBA with Dual Specialization",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    learners: "21.5k+ learners",
    slug: "#",
    isFree: false,
  },
];
