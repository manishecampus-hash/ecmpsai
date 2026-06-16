export type University = {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  naac: string;
  ugc: boolean;
  mode: string[];
  avgFee: number;
  programs: string[];
  placementRate: number;
  avgSalary: number;
  rating: number;
  established: number;
  students: number;
  emi: boolean;
  description: string;
  highlights: string[];
  outcomes: { role: string; salary: string }[];
  reviews: { name: string; role: string; text: string; rating: number }[];
};

export type Degree = {
  slug: string;
  name: string;
  fullName: string;
  duration: string;
  avgFee: number;
  minFee: number;
  maxFee: number;
  avgSalary: number;
  universities: number;
  mode: string[];
  description: string;
  careerPath: string[];
  whoShouldDo: string[];
  topRoles: { title: string; salary: string }[];
  faqs: { q: string; a: string }[];
};

export type Career = {
  slug: string;
  title: string;
  avgSalary: string;
  growth: string;
  degrees: string[];
  skills: string[];
};

export const universities: University[] = [
  {
    slug: "amity",
    name: "Amity University Online",
    shortName: "Amity",
    location: "Noida, UP",
    naac: "A+",
    ugc: true,
    mode: ["Online", "Distance"],
    avgFee: 150000,
    programs: ["MBA", "MCA", "BBA", "BCA", "MCom", "MA"],
    placementRate: 92,
    avgSalary: 850000,
    rating: 4.2,
    established: 2005,
    students: 125000,
    emi: true,
    description: "Amity University Online offers UGC-entitled degrees with industry-aligned curriculum and strong placement support.",
    highlights: ["UGC Entitled", "NAAC A+", "92% Placement", "EMI Available"],
    outcomes: [
      { role: "Marketing Manager", salary: "₹8L–₹14L" },
      { role: "Product Manager", salary: "₹12L–₹20L" },
      { role: "Business Analyst", salary: "₹7L–₹12L" },
      { role: "HR Manager", salary: "₹6L–₹10L" },
    ],
    reviews: [
      { name: "Riya S.", role: "MBA 2023", text: "Got placed at a top MNC. Faculty was amazing and very supportive.", rating: 5 },
      { name: "Arjun M.", role: "MCA 2022", text: "Great tech curriculum. Switched careers from banking to IT.", rating: 4 },
      { name: "Priya K.", role: "MBA 2023", text: "Flexible schedule helped me study while working full time.", rating: 5 },
    ],
  },
  {
    slug: "lpu",
    name: "Lovely Professional University",
    shortName: "LPU",
    location: "Phagwara, Punjab",
    naac: "A",
    ugc: true,
    mode: ["Online", "Regular"],
    avgFee: 200000,
    programs: ["MBA", "MCA", "BBA", "BCA", "MCom", "MSc", "MA"],
    placementRate: 88,
    avgSalary: 780000,
    rating: 4.0,
    established: 2005,
    students: 200000,
    emi: true,
    description: "LPU is one of India's largest universities with a strong focus on industry readiness and global exposure.",
    highlights: ["India's Largest Private Uni", "NAAC A", "Strong Tech Programs", "Global Alumni"],
    outcomes: [
      { role: "Software Engineer", salary: "₹6L–₹14L" },
      { role: "Data Analyst", salary: "₹7L–₹13L" },
      { role: "Marketing Executive", salary: "₹5L–₹10L" },
      { role: "Operations Manager", salary: "₹8L–₹15L" },
    ],
    reviews: [
      { name: "Vikram R.", role: "MCA 2023", text: "Amazing infrastructure and placement opportunities in tech.", rating: 4 },
      { name: "Sneha T.", role: "MBA 2022", text: "Good for those looking to enter the corporate world.", rating: 4 },
    ],
  },
  {
    slug: "manipal",
    name: "Manipal University Online",
    shortName: "Manipal",
    location: "Manipal, Karnataka",
    naac: "A+",
    ugc: true,
    mode: ["Online"],
    avgFee: 180000,
    programs: ["MBA", "MCA", "BBA", "BCA", "MCom", "MA"],
    placementRate: 90,
    avgSalary: 900000,
    rating: 4.4,
    established: 1957,
    students: 85000,
    emi: true,
    description: "Manipal University is a pioneer in online education with globally recognised degrees and exceptional alumni network.",
    highlights: ["Legacy Institution", "NAAC A+", "Global Recognition", "90% Placement"],
    outcomes: [
      { role: "Business Analyst", salary: "₹8L–₹15L" },
      { role: "Product Manager", salary: "₹14L–₹22L" },
      { role: "Finance Manager", salary: "₹9L–₹16L" },
      { role: "IT Manager", salary: "₹10L–₹18L" },
    ],
    reviews: [
      { name: "Ananya B.", role: "MBA 2023", text: "Best investment I made. Got a 3x salary hike after graduation.", rating: 5 },
      { name: "Rahul P.", role: "MCA 2023", text: "Top-notch faculty and fantastic career support services.", rating: 5 },
    ],
  },
  {
    slug: "ignou",
    name: "IGNOU",
    shortName: "IGNOU",
    location: "New Delhi",
    naac: "A",
    ugc: true,
    mode: ["Distance", "Online"],
    avgFee: 25000,
    programs: ["MBA", "MCA", "BBA", "BCA", "MCom", "MSc", "MA"],
    placementRate: 65,
    avgSalary: 550000,
    rating: 3.7,
    established: 1985,
    students: 3500000,
    emi: false,
    description: "IGNOU is India's largest open university offering affordable distance education to millions across India.",
    highlights: ["Most Affordable", "Govt University", "Widely Accepted", "Flexible Learning"],
    outcomes: [
      { role: "Teacher / Educator", salary: "₹3L–₹6L" },
      { role: "Govt Job Eligible", salary: "₹4L–₹8L" },
      { role: "HR Executive", salary: "₹3.5L–₹6L" },
      { role: "Bank Officer", salary: "₹5L–₹10L" },
    ],
    reviews: [
      { name: "Mohan L.", role: "MCom 2022", text: "Best option for those on a tight budget. Degree is widely accepted.", rating: 4 },
      { name: "Kavita S.", role: "MA 2023", text: "Flexibility is unmatched. Could study while working at my government job.", rating: 4 },
    ],
  },
  {
    slug: "symbiosis",
    name: "Symbiosis Online",
    shortName: "Symbiosis",
    location: "Pune, Maharashtra",
    naac: "A+",
    ugc: true,
    mode: ["Online"],
    avgFee: 220000,
    programs: ["MBA", "BBA", "MCom", "MA"],
    placementRate: 94,
    avgSalary: 1050000,
    rating: 4.5,
    established: 1971,
    students: 42000,
    emi: true,
    description: "Symbiosis Online is the premium choice for professionals seeking top-tier management education from a legacy institution.",
    highlights: ["Premium Brand", "NAAC A+", "94% Placement", "Top Industry Network"],
    outcomes: [
      { role: "Senior Manager", salary: "₹12L–₹22L" },
      { role: "Consultant", salary: "₹10L–₹18L" },
      { role: "Brand Manager", salary: "₹9L–₹16L" },
      { role: "Strategy Analyst", salary: "₹11L–₹20L" },
    ],
    reviews: [
      { name: "Ishaan M.", role: "MBA 2023", text: "The Symbiosis brand name opened many doors for me in consulting.", rating: 5 },
      { name: "Pooja V.", role: "MBA 2022", text: "Very challenging program but worth every rupee. Great ROI.", rating: 5 },
    ],
  },
];

export const degrees: Degree[] = [
  {
    slug: "mba",
    name: "MBA",
    fullName: "Master of Business Administration",
    duration: "2 Years",
    avgFee: 175000,
    minFee: 20000,
    maxFee: 250000,
    avgSalary: 1200000,
    universities: 52,
    mode: ["Online", "Distance", "Regular"],
    description: "The most popular postgraduate degree for career growth, salary hikes, and leadership roles in any industry.",
    careerPath: ["Executive / Manager", "Senior Manager", "Business Head", "Director / VP"],
    whoShouldDo: ["Working Professionals", "Career Switchers", "Entrepreneurs", "Fresh Graduates"],
    topRoles: [
      { title: "Marketing Manager", salary: "₹8L–₹16L" },
      { title: "Product Manager", salary: "₹12L–₹25L" },
      { title: "HR Manager", salary: "₹6L–₹14L" },
      { title: "Business Analyst", salary: "₹8L–₹18L" },
      { title: "Operations Manager", salary: "₹9L–₹18L" },
    ],
    faqs: [
      { q: "Is an online MBA valid in India?", a: "Yes — online MBAs from UGC-approved universities are 100% valid for jobs, government exams, and higher studies." },
      { q: "What salary hike can I expect after MBA?", a: "On average, MBA graduates see a 50–150% salary increase within 2 years of graduation." },
      { q: "Can I do MBA while working full time?", a: "Absolutely. Online MBA programs are designed for working professionals with flexible schedules." },
      { q: "What is the minimum fee for an online MBA?", a: "IGNOU offers MBA at just ₹20,000 while premium universities like Symbiosis charge ₹2.5L+." },
      { q: "Which MBA specialisation is best for 2026?", a: "MBA in Data Analytics, Digital Marketing, and FinTech are the hottest specialisations right now." },
    ],
  },
  {
    slug: "mca",
    name: "MCA",
    fullName: "Master of Computer Applications",
    duration: "2 Years",
    avgFee: 120000,
    minFee: 15000,
    maxFee: 180000,
    avgSalary: 950000,
    universities: 38,
    mode: ["Online", "Distance", "Regular"],
    description: "The gateway to a high-paying tech career for non-engineering graduates. Builds strong software development skills.",
    careerPath: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
    whoShouldDo: ["BCA / BSc Graduates", "Career Switchers to Tech", "Government Job Aspirants", "IT Professionals"],
    topRoles: [
      { title: "Software Engineer", salary: "₹6L–₹18L" },
      { title: "Data Analyst", salary: "₹7L–₹14L" },
      { title: "Full Stack Developer", salary: "₹8L–₹20L" },
      { title: "System Analyst", salary: "₹7L–₹13L" },
    ],
    faqs: [
      { q: "Is MCA equivalent to M.Tech?", a: "For most IT jobs and government positions, MCA is treated at par with M.Tech as a postgraduate tech degree." },
      { q: "Can I do MCA after BBA or BCom?", a: "Most universities require Mathematics at 10+2 or graduation level. Check specific eligibility criteria." },
      { q: "What is the scope of MCA in 2026?", a: "Excellent scope — AI, cloud computing, and cybersecurity are creating massive demand for MCA graduates." },
    ],
  },
  {
    slug: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    duration: "3 Years",
    avgFee: 80000,
    minFee: 10000,
    maxFee: 150000,
    avgSalary: 550000,
    universities: 45,
    mode: ["Online", "Distance", "Regular"],
    description: "The first step towards a business career. Builds management, marketing, and finance fundamentals.",
    careerPath: ["Management Trainee", "Executive", "Team Lead", "Manager"],
    whoShouldDo: ["12th Pass Students", "Gap Year Students", "Working in Retail/Sales"],
    topRoles: [
      { title: "Sales Executive", salary: "₹3L–₹7L" },
      { title: "Marketing Executive", salary: "₹3.5L–₹7L" },
      { title: "HR Executive", salary: "₹3L–₹6L" },
      { title: "Business Development", salary: "₹4L–₹9L" },
    ],
    faqs: [
      { q: "Is BBA a good degree in India?", a: "Yes — BBA is a solid foundation for a business career and a prerequisite for top MBA programs." },
      { q: "BBA vs BCom — which is better?", a: "BBA is more business-focused with management skills; BCom is better for accounting and finance roles." },
    ],
  },
  {
    slug: "bca",
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    duration: "3 Years",
    avgFee: 70000,
    minFee: 8000,
    maxFee: 130000,
    avgSalary: 500000,
    universities: 42,
    mode: ["Online", "Distance", "Regular"],
    description: "A tech-focused undergraduate degree that builds programming, database, and IT skills for the digital economy.",
    careerPath: ["Junior Developer", "Software Developer", "Senior Developer", "Tech Lead"],
    whoShouldDo: ["12th Pass (PCM/Commerce)", "Aspiring Developers", "Gaming / App Dev Enthusiasts"],
    topRoles: [
      { title: "Web Developer", salary: "₹3.5L–₹8L" },
      { title: "App Developer", salary: "₹4L–₹10L" },
      { title: "Database Admin", salary: "₹4L–₹9L" },
      { title: "IT Support", salary: "₹2.5L–₹5L" },
    ],
    faqs: [
      { q: "Is BCA good for government jobs?", a: "Yes — BCA qualifies you for many central and state government IT department positions." },
      { q: "Should I do BCA or B.Tech?", a: "BCA is more affordable and accessible. B.Tech offers more depth in core engineering. Both lead to similar IT jobs." },
    ],
  },
  {
    slug: "mcom",
    name: "MCom",
    fullName: "Master of Commerce",
    duration: "2 Years",
    avgFee: 45000,
    minFee: 8000,
    maxFee: 100000,
    avgSalary: 700000,
    universities: 35,
    mode: ["Online", "Distance", "Regular"],
    description: "Advanced commerce education for finance, accounting, and taxation careers. Essential for CA / CMA aspirants.",
    careerPath: ["Accountant", "Senior Accountant", "Finance Manager", "CFO"],
    whoShouldDo: ["BCom Graduates", "CA / CMA Aspirants", "Tax & Audit Professionals"],
    topRoles: [
      { title: "Finance Analyst", salary: "₹5L–₹12L" },
      { title: "Tax Consultant", salary: "₹6L–₹14L" },
      { title: "Audit Manager", salary: "₹7L–₹14L" },
      { title: "Investment Analyst", salary: "₹6L–₹15L" },
    ],
    faqs: [
      { q: "Is MCom useful for government jobs?", a: "Absolutely — MCom is accepted for Group A and B government posts including tax officer, auditor, and economist." },
      { q: "Can I do PhD after MCom?", a: "Yes — MCom is a direct path to PhD in Commerce, Economics, or Management." },
    ],
  },
  {
    slug: "msc",
    name: "MSc",
    fullName: "Master of Science",
    duration: "2 Years",
    avgFee: 60000,
    minFee: 10000,
    maxFee: 120000,
    avgSalary: 800000,
    universities: 30,
    mode: ["Online", "Distance", "Regular"],
    description: "A science postgraduate degree with specialisations in Data Science, IT, Mathematics, and more.",
    careerPath: ["Analyst", "Senior Analyst", "Lead Scientist", "Research Head"],
    whoShouldDo: ["BSc Graduates", "Data Enthusiasts", "Research Aspirants", "GATE Aspirants"],
    topRoles: [
      { title: "Data Scientist", salary: "₹8L–₹20L" },
      { title: "Research Analyst", salary: "₹6L–₹14L" },
      { title: "AI Engineer", salary: "₹10L–₹25L" },
      { title: "Lab Manager", salary: "₹5L–₹10L" },
    ],
    faqs: [
      { q: "Which MSc specialisation is in demand?", a: "MSc Data Science, MSc AI/ML, and MSc Cybersecurity are the highest-demand specialisations in 2026." },
      { q: "Is online MSc valid for government jobs?", a: "Yes — UGC-approved online MSc degrees are valid for all government positions requiring postgraduate qualifications." },
    ],
  },
  {
    slug: "ma",
    name: "MA",
    fullName: "Master of Arts",
    duration: "2 Years",
    avgFee: 30000,
    minFee: 5000,
    maxFee: 80000,
    avgSalary: 600000,
    universities: 40,
    mode: ["Online", "Distance", "Regular"],
    description: "A versatile postgraduate degree in humanities, social sciences, and liberal arts for diverse career paths.",
    careerPath: ["Research Assistant", "Content Writer", "Manager", "Academic / Educator"],
    whoShouldDo: ["BA Graduates", "Civil Services Aspirants", "Teachers", "Content Creators"],
    topRoles: [
      { title: "Civil Services (IAS/IPS)", salary: "₹7L–₹18L" },
      { title: "Content Strategist", salary: "₹5L–₹12L" },
      { title: "HR Manager", salary: "₹6L–₹12L" },
      { title: "Teacher / Lecturer", salary: "₹4L–₹9L" },
    ],
    faqs: [
      { q: "Is MA valid for government jobs?", a: "Yes — MA is required for many Grade A government positions, teaching posts, and civil services." },
      { q: "Which MA specialisation is best?", a: "MA Political Science, Psychology, and English are top choices for government jobs and corporate roles." },
    ],
  },
];

export const careers: Career[] = [
  {
    slug: "data-analyst",
    title: "Data Analyst",
    avgSalary: "₹6L–₹18L",
    growth: "+35% in 3 years",
    degrees: ["mca", "msc", "mba"],
    skills: ["SQL", "Python", "Excel", "Tableau", "Statistics"],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    avgSalary: "₹12L–₹30L",
    growth: "+42% in 3 years",
    degrees: ["mba", "mca", "bca"],
    skills: ["Roadmapping", "User Research", "Analytics", "Agile", "SQL"],
  },
  {
    slug: "hr-manager",
    title: "HR Manager",
    avgSalary: "₹6L–₹14L",
    growth: "+20% in 3 years",
    degrees: ["mba", "ma"],
    skills: ["Recruitment", "Payroll", "Compliance", "Training", "HRMS"],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    avgSalary: "₹8L–₹18L",
    growth: "+28% in 3 years",
    degrees: ["mba", "bba"],
    skills: ["SEO/SEM", "Social Media", "Analytics", "Content", "CRM"],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    avgSalary: "₹7L–₹16L",
    growth: "+30% in 3 years",
    degrees: ["mba", "mca", "mcom"],
    skills: ["SQL", "Power BI", "Excel", "Process Mapping", "Stakeholder Mgmt"],
  },
];

export const goalCards = [
  { id: "promotion", emoji: "📈", title: "Get a Promotion", subtitle: "Level up in your current company", gradient: "from-[#4F46E5] to-[#7C3AED]" },
  { id: "salary", emoji: "💰", title: "Increase Salary", subtitle: "Target 2x–3x your current CTC", gradient: "from-emerald-500 to-teal-600" },
  { id: "switch", emoji: "🔄", title: "Career Switch", subtitle: "Move to a new field entirely", gradient: "from-blue-500 to-cyan-600" },
  { id: "ai", emoji: "🤖", title: "Learn AI Skills", subtitle: "Future-proof your career now", gradient: "from-orange-500 to-amber-600" },
  { id: "govt", emoji: "🏛️", title: "Government Jobs", subtitle: "Qualify for Group A & B posts", gradient: "from-red-500 to-rose-600" },
  { id: "business", emoji: "🚀", title: "Start a Business", subtitle: "Build the skills to launch your startup", gradient: "from-violet-500 to-purple-600" },
];

export const successStories = [
  { name: "Riya", age: 26, text: "Switched from customer support to digital marketing. Salary went from ₹4L to ₹14L after online MBA.", change: "₹4L → ₹14L", tag: "Online MBA", icon: "🚀" },
  { name: "Arjun", age: 29, text: "Got promoted from Sales Executive to Product Manager at a top startup. Changed everything.", change: "Executive → PM", tag: "MBA Marketing", icon: "💼" },
  { name: "Priya", age: 24, text: "Cleared SSC exam and got a government job after MCA. Best decision of my life.", change: "Private → Govt Job", tag: "Online MCA", icon: "🏛️" },
];

export function getUniversityBySlug(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug);
}

export function getDegreeBySlug(slug: string): Degree | undefined {
  return degrees.find((d) => d.slug === slug);
}

export function formatFee(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${(amount / 1000).toFixed(0)}K`;
}
