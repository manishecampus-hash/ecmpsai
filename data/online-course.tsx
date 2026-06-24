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
  // ── Engineering ──
  {
    id: "eng-ai-ml",
    tab: "engineering",
    ribbon: "100% FREE",
    title: "Introduction to Artificial Intelligence & Machine Learning",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=900&auto=format&fit=crop&q=80",
    duration: "5 hrs of learning",
    learners: "52.3k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "eng-python",
    tab: "engineering",
    ribbon: "FREE Course",
    title: "Python Programming for Engineers – Zero to Hero",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
    duration: "6 hrs of learning",
    learners: "88.1k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "eng-cloud",
    tab: "engineering",
    ribbon: "Trending",
    title: "Cloud Computing & DevOps Fundamentals for Engineers",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
    duration: "8 hrs of learning",
    learners: "34.7k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "eng-data-structures",
    tab: "engineering",
    ribbon: "FREE Course",
    title: "Data Structures & Algorithms Crash Course",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&auto=format&fit=crop&q=80",
    duration: "7 hrs of learning",
    learners: "61.2k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "eng-cybersecurity",
    tab: "engineering",
    ribbon: "100% FREE",
    title: "Cybersecurity Essentials for Software Engineers",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80",
    duration: "4 hrs of learning",
    learners: "29.5k+ learners",
    slug: "#",
    isFree: true,
  },

  // ── All Courses ──
  {
    id: "all-prompt-eng",
    tab: "all",
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
    id: "all-digital-mktg",
    tab: "all",
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
    id: "all-mba-healthcare",
    tab: "all",
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
    id: "all-bca-fintech",
    tab: "all",
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
    id: "all-python",
    tab: "all",
    ribbon: "FREE Course",
    title: "Python Programming for Engineers – Zero to Hero",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
    duration: "6 hrs of learning",
    learners: "88.1k+ learners",
    slug: "#",
    isFree: true,
  },

  // ── Management ──
  {
    id: "mgmt-digital-mktg",
    tab: "management",
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
    id: "mgmt-leadership",
    tab: "management",
    ribbon: "100% FREE",
    title: "Leadership & Team Management Fundamentals",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80",
    duration: "3 hrs of learning",
    learners: "41.8k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "mgmt-project",
    tab: "management",
    ribbon: "FREE Course",
    title: "Project Management Essentials – Agile & Scrum",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80",
    duration: "5 hrs of learning",
    learners: "33.6k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "mgmt-finance",
    tab: "management",
    ribbon: "Trending",
    title: "Finance for Non-Finance Managers",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80",
    duration: "4 hrs of learning",
    learners: "27.9k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "mgmt-supply-chain",
    tab: "management",
    ribbon: "FREE Course",
    title: "Supply Chain & Operations Management Basics",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80",
    duration: "4 hrs of learning",
    learners: "19.3k+ learners",
    slug: "#",
    isFree: true,
  },

  // ── Degree ──
  {
    id: "deg-bca-fintech",
    tab: "degree",
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
    id: "deg-mca-fintech",
    tab: "degree",
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
    id: "deg-mba-dual",
    tab: "degree",
    ribbon: "QS Ranked",
    title: "MBA with Dual Specialization",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    learners: "21.5k+ learners",
    slug: "#",
    isFree: false,
  },
  {
    id: "deg-bsc-ds",
    tab: "degree",
    ribbon: "New Launch",
    title: "B.Sc. in Data Science & Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=900&auto=format&fit=crop&q=80",
    duration: "36 months",
    learners: "5.1k+ learners",
    slug: "#",
    isFree: false,
  },
  {
    id: "deg-mba-healthcare",
    tab: "degree",
    ribbon: "Trending",
    title: "MBA in Hospital and Healthcare Management",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80",
    duration: "24 months",
    learners: "12.4k+ learners",
    slug: "#",
    isFree: false,
  },

  // ── Global and Async ──
  {
    id: "global-ai-basics",
    tab: "globalandasync",
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
    id: "global-ux",
    tab: "globalandasync",
    ribbon: "FREE Course",
    title: "UX Design Fundamentals – Self-Paced Global Program",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop&q=80",
    duration: "5 hrs of learning",
    learners: "38.4k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "global-data-analytics",
    tab: "globalandasync",
    ribbon: "Trending",
    title: "Data Analytics for Business – Async Global Edition",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
    duration: "6 hrs of learning",
    learners: "22.7k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "global-python",
    tab: "globalandasync",
    ribbon: "FREE Course",
    title: "Python for Data Science – Async Self-Paced",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
    duration: "7 hrs of learning",
    learners: "71.3k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "global-blockchain",
    tab: "globalandasync",
    ribbon: "New Launch",
    title: "Blockchain Technology & Web3 Fundamentals",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&auto=format&fit=crop&q=80",
    duration: "4 hrs of learning",
    learners: "14.9k+ learners",
    slug: "#",
    isFree: true,
  },

  // ── Certifications ──
  {
    id: "cert-pmp",
    tab: "certifications",
    ribbon: "FREE Course",
    title: "PMP Certification Prep – Project Management Professional",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80",
    duration: "8 hrs of learning",
    learners: "56.2k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "cert-aws",
    tab: "certifications",
    ribbon: "Trending",
    title: "AWS Cloud Practitioner Certification Crash Course",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
    duration: "6 hrs of learning",
    learners: "43.8k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "cert-google-data",
    tab: "certifications",
    ribbon: "100% FREE",
    title: "Google Data Analytics Professional Certificate Prep",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
    duration: "10 hrs of learning",
    learners: "67.4k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "cert-cyber",
    tab: "certifications",
    ribbon: "FREE Course",
    title: "CompTIA Security+ Certification Preparation Course",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80",
    duration: "7 hrs of learning",
    learners: "31.6k+ learners",
    slug: "#",
    isFree: true,
  },
  {
    id: "cert-scrum",
    tab: "certifications",
    ribbon: "Trending",
    title: "Certified Scrum Master (CSM) – Free Prep Course",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80",
    duration: "3 hrs of learning",
    learners: "24.1k+ learners",
    slug: "#",
    isFree: true,
  },
];
