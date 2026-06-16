// ─── Types ────────────────────────────────────────────────────────────────────

export type Heading = {
    id: string;
    text: string;
    level: 2 | 3;
};

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string; id: string }
    | { type: "list"; ordered?: boolean; items: string[] }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "callout"; variant: "tip" | "warning" | "info"; text: string };

export type Blog = {
    id: number;
    category: string;
    title: string;
    imageSrc: string;
    /** Short card excerpt (used on listing page) */
    excerpt: string;
    /** Longer subtitle shown in the hero of the detail page */
    description: string;
    author: string;
    authorBio: string;
    authorImage: string;
    date: string;
    readTime: string;
    reads: string;
    slug: string;
    featured?: boolean;
    tags: string[];
    headings: Heading[];
    content: ContentBlock[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const blogs: Blog[] = [
    // ── 1 ────────────────────────────────────────────────────────────────────
    {
        id: 1,
        category: "CAREER OPPORTUNITIES",
        title: "Top 6 Career Options after BA: What to do After BA? [2026]",
        imageSrc: "/blogs/top-career.png",

        excerpt:
            "Confused after BA? Explore the best career paths, higher education options, and job opportunities available after a BA degree.",
        description:
            "A BA degree opens more doors than most students realise. From civil services to digital marketing, here's a structured look at the six highest-impact paths you can take in 2026.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "Jun 8, 2026",
        readTime: "9 min read",
        reads: "28K Reads",
        slug: "career-options-after-ba",
        featured: true,
        tags: ["BA", "Career", "Higher Education", "UPSC", "MBA"],
        headings: [
            { id: "overview", text: "Why a BA is More Valuable Than You Think", level: 2 },
            { id: "option-1", text: "1. Civil Services (UPSC / State PSC)", level: 2 },
            { id: "option-2", text: "2. Pursue an MBA", level: 2 },
            { id: "option-3", text: "3. Mass Communication & Journalism", level: 2 },
            { id: "option-4", text: "4. Law (LLB)", level: 2 },
            { id: "option-5", text: "5. Digital Marketing", level: 2 },
            { id: "option-6", text: "6. Teaching & Education", level: 2 },
            { id: "salary", text: "Expected Salaries at a Glance", level: 2 },
            { id: "conclusion", text: "Final Thoughts", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "overview",
                text: "Why a BA is More Valuable Than You Think",
            },
            {
                type: "paragraph",
                text: "Many BA graduates feel uncertain about their next step — but the degree builds critical thinking, communication, and analytical skills that are in high demand across industries. The key is pairing those skills with a clear direction.",
            },
            {
                type: "heading",
                level: 2,
                id: "option-1",
                text: "1. Civil Services (UPSC / State PSC)",
            },
            {
                type: "paragraph",
                text: "Civil services remain the most prestigious career path for BA graduates. Humanities and social science backgrounds align naturally with UPSC's General Studies papers. With consistent preparation of 12–18 months, many BA graduates crack the exam on their first or second attempt.",
            },
            {
                type: "callout",
                variant: "tip",
                text: "Start with NCERT books for history, polity, and geography. Then layer in standard references like Laxmikanth (Polity) and Bipin Chandra (History).",
            },
            {
                type: "heading",
                level: 2,
                id: "option-2",
                text: "2. Pursue an MBA",
            },
            {
                type: "paragraph",
                text: "An MBA is a powerful credential for BA graduates looking to enter corporate roles. Online MBA programs from UGC-approved universities now cost as little as ₹80,000–₹1.5 lakh, making it accessible without a career break.",
            },
            {
                type: "heading",
                level: 2,
                id: "option-3",
                text: "3. Mass Communication & Journalism",
            },
            {
                type: "paragraph",
                text: "A PG Diploma or MA in Mass Communication opens roles in digital media, PR, content strategy, and broadcast journalism. The sector is growing rapidly due to the explosion of regional-language digital content.",
            },
            {
                type: "heading",
                level: 2,
                id: "option-4",
                text: "4. Law (LLB)",
            },
            {
                type: "paragraph",
                text: "A 3-year LLB after BA is one of the most direct post-graduation routes. Corporate law, litigation, and legal consulting are all booming in India's expanding economy.",
            },
            {
                type: "heading",
                level: 2,
                id: "option-5",
                text: "5. Digital Marketing",
            },
            {
                type: "paragraph",
                text: "Digital marketing requires strong communication and creativity — exactly what BA graduates have. A 3–6 month certification course is enough to land an entry-level role, with senior roles paying ₹8–20 LPA within 4–5 years.",
            },
            {
                type: "heading",
                level: 2,
                id: "option-6",
                text: "6. Teaching & Education",
            },
            {
                type: "paragraph",
                text: "B.Ed after BA qualifies you to teach at the secondary level. With NEP 2020 reforms, government school teachers now earn ₹35,000–₹70,000/month depending on the state.",
            },
            {
                type: "heading",
                level: 2,
                id: "salary",
                text: "Expected Salaries at a Glance",
            },
            {
                type: "table",
                headers: ["Career Path", "Entry Salary (LPA)", "Senior Salary (LPA)"],
                rows: [
                    ["IAS / IPS Officer", "₹9.3 + perks", "₹18–25"],
                    ["MBA Graduate", "₹5–8", "₹15–40"],
                    ["Journalist / Content", "₹3–5", "₹10–20"],
                    ["Lawyer (LLB)", "₹3–6", "₹15–50+"],
                    ["Digital Marketer", "₹3–5", "₹8–20"],
                    ["School Teacher (Govt)", "₹4–6", "₹8–12"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "conclusion",
                text: "Final Thoughts",
            },
            {
                type: "paragraph",
                text: "There is no single best path after BA — the right choice depends on your interests, financial situation, and long-term goals. Use eCampus's free counselling tool to get a personalised roadmap based on your profile.",
            },
        ],
    },

    // ── 2 ────────────────────────────────────────────────────────────────────
    {
        id: 2,
        category: "MBA",
        title: "MBA under ₹2 Lakh: Best Affordable Online MBA Programs in India",
        imageSrc: "/blogs/mba-under-2.png",
        excerpt:
            "Looking for a budget-friendly MBA? Here are top universities offering quality MBA programs under ₹2 lakh.",
        description:
            "Quality MBA education no longer requires a six-figure spend. We've ranked the best UGC-approved online MBA programs available in India for under ₹2 lakh total fee.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "Jun 5, 2026",
        readTime: "7 min read",
        reads: "15K Reads",
        slug: "mba-under-2-lakh",
        tags: ["MBA", "Online Degree", "Affordable", "UGC"],
        headings: [
            { id: "why", text: "Why Online MBA Has Gone Mainstream", level: 2 },
            { id: "universities", text: "Top Universities & Fees", level: 2 },
            { id: "eligibility", text: "Eligibility & Admission Process", level: 2 },
            { id: "placements", text: "Placement & Salary Outcomes", level: 2 },
            { id: "tips", text: "How to Choose the Right Program", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "why",
                text: "Why Online MBA Has Gone Mainstream",
            },
            {
                type: "paragraph",
                text: "UGC's 2020 guidelines gave online degrees from recognised universities the same legal standing as campus degrees. This triggered a wave of affordable, industry-aligned MBA programs from reputed institutions.",
            },
            {
                type: "heading",
                level: 2,
                id: "universities",
                text: "Top Universities & Fees",
            },
            {
                type: "table",
                headers: ["University", "Total Fee", "Duration", "NAAC Grade"],
                rows: [
                    ["Amity University Online", "₹1.25 Lakh", "2 Years", "A+"],
                    ["Manipal Online", "₹1.40 Lakh", "2 Years", "A+"],
                    ["Jain University Online", "₹1.10 Lakh", "2 Years", "A"],
                    ["Chandigarh University Online", "₹1.20 Lakh", "2 Years", "A+"],
                    ["UPES Online", "₹1.60 Lakh", "2 Years", "A"],
                    ["DY Patil Online", "₹1.80 Lakh", "2 Years", "A"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "eligibility",
                text: "Eligibility & Admission Process",
            },
            {
                type: "paragraph",
                text: "Most programs require a Bachelor's degree with 50% marks (45% for SC/ST). Admission is through a merit-based or online entrance test. No CAT/MAT score is required for online programs.",
            },
            {
                type: "list",
                items: [
                    "Graduation in any stream",
                    "50% aggregate marks (relaxed for reserved categories)",
                    "Valid ID proof & marksheets",
                    "Some universities accept work experience in lieu of entrance tests",
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "placements",
                text: "Placement & Salary Outcomes",
            },
            {
                type: "paragraph",
                text: "Online MBA graduates from tier-1 universities report average salary hikes of 40–60% within 2 years of completion. Top employers include TCS, Infosys, HDFC Bank, Wipro, and numerous startups.",
            },
            {
                type: "heading",
                level: 2,
                id: "tips",
                text: "How to Choose the Right Program",
            },
            {
                type: "list",
                items: [
                    "Check UGC-DEB approval status on ugcdeb.ac.in",
                    "Verify NAAC accreditation grade",
                    "Look for live mentorship sessions, not just recorded content",
                    "Compare alumni LinkedIn profiles for real placement outcomes",
                    "Prefer universities with industry project requirements",
                ],
            },
        ],
    },

    // ── 3 ────────────────────────────────────────────────────────────────────
    {
        id: 3,
        imageSrc: "/blogs/how-toswitch.png",
        category: "CAREER GUIDANCE",
        title: "How to Switch Careers in 2026: A Step-by-Step Guide",
        excerpt:
            "Planning a career switch? This guide covers everything from skill assessment to landing your first job in a new field.",
        description:
            "Career switching is more common — and more achievable — than ever. Here's a practical, step-by-step framework used by thousands of successful career changers in India.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "Jun 3, 2026",
        readTime: "10 min read",
        reads: "11K Reads",
        slug: "career-switch-guide-2026",
        tags: ["Career Switch", "Upskilling", "Jobs", "2026"],
        headings: [
            { id: "step1", text: "Step 1: Self-Assessment", level: 2 },
            { id: "step2", text: "Step 2: Research Your Target Field", level: 2 },
            { id: "step3", text: "Step 3: Bridge the Skill Gap", level: 2 },
            { id: "step4", text: "Step 4: Build a Portfolio", level: 2 },
            { id: "step5", text: "Step 5: Network Strategically", level: 2 },
            { id: "step6", text: "Step 6: Apply & Negotiate", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "step1",
                text: "Step 1: Self-Assessment",
            },
            {
                type: "paragraph",
                text: "Before anything else, list your transferable skills — communication, project management, data analysis, client handling. These cross industry lines and are your biggest asset when switching.",
            },
            {
                type: "heading",
                level: 2,
                id: "step2",
                text: "Step 2: Research Your Target Field",
            },
            {
                type: "paragraph",
                text: "Spend 2–3 weeks reading job descriptions in your target field. Note which skills appear in 80%+ of listings — those are your priority learning targets.",
            },
            {
                type: "callout",
                variant: "info",
                text: "LinkedIn's 'Skills on the Rise' India report for 2026 is free to download and shows the fastest-growing skills by sector.",
            },
            {
                type: "heading",
                level: 2,
                id: "step3",
                text: "Step 3: Bridge the Skill Gap",
            },
            {
                type: "paragraph",
                text: "Online certifications from Coursera, Google, or NASSCOM FutureSkills can bridge most skill gaps in 3–6 months. Pair them with a relevant online degree for long-term credibility.",
            },
            {
                type: "heading",
                level: 2,
                id: "step4",
                text: "Step 4: Build a Portfolio",
            },
            {
                type: "paragraph",
                text: "Projects beat certifications every time. Build 2–3 real projects that demonstrate your new skills. For data roles, use public datasets. For marketing, run a small paid campaign with ₹500.",
            },
            {
                type: "heading",
                level: 2,
                id: "step5",
                text: "Step 5: Network Strategically",
            },
            {
                type: "list",
                items: [
                    "Connect with 5 professionals in your target field on LinkedIn per week",
                    "Ask for 20-minute informational interviews, not jobs",
                    "Join 2–3 online communities or Discord servers in your new domain",
                    "Attend free industry webinars and engage in Q&A",
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "step6",
                text: "Step 6: Apply & Negotiate",
            },
            {
                type: "paragraph",
                text: "Expect a 10–20% salary dip when switching. Frame it as a short-term investment. Most switchers recover their old salary within 18 months and surpass it within 3 years.",
            },
        ],
    },

    // ── 4 ────────────────────────────────────────────────────────────────────
    {
        id: 4,
        category: "SCHOLARSHIP",
        title: "Top 10 Scholarships for Indian Students in 2026",
        imageSrc: "/blogs/scholarship.png",
        excerpt:
            "Comprehensive list of government and private scholarships available for undergraduate and postgraduate students.",
        description:
            "Thousands of crores in scholarship money goes unclaimed every year because students don't know where to look. Here are the 10 most accessible scholarships for Indian students in 2026.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "Jun 1, 2026",
        readTime: "6 min read",
        reads: "9K Reads",
        slug: "scholarships-for-indian-students",
        tags: ["Scholarship", "Government Scheme", "Financial Aid"],
        headings: [
            { id: "govt", text: "Government Scholarships", level: 2 },
            { id: "private", text: "Private & Corporate Scholarships", level: 2 },
            { id: "online", text: "Scholarships for Online Degrees", level: 2 },
            { id: "apply", text: "How to Apply", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "govt",
                text: "Government Scholarships",
            },
            {
                type: "table",
                headers: ["Scholarship", "Amount", "Eligibility", "Portal"],
                rows: [
                    ["NSP Central Sector Scheme", "₹10,000–20,000/year", "Top 20 percentile, Class 12", "scholarships.gov.in"],
                    ["PM Yasasvi", "₹75,000–1.25 lakh/year", "OBC/EBC/DNT students", "yet.nta.ac.in"],
                    ["Pragati (AICTE)", "₹50,000/year", "Girls in technical courses", "aicte-pragati.com"],
                    ["Saksham (AICTE)", "₹50,000/year", "Students with disability", "aicte-saksham.com"],
                    ["Ishan Uday (UGC)", "₹5,400–7,800/month", "North-East region students", "scholarships.gov.in"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "private",
                text: "Private & Corporate Scholarships",
            },
            {
                type: "list",
                items: [
                    "Tata Capital Pankh Scholarship — up to ₹50,000/year for Class 11 to UG",
                    "HDFC Bank Educational Crisis Scholarship — one-time ₹75,000 for financial hardship",
                    "Reliance Foundation Scholarships — ₹2 lakh/year for STEM & Humanities graduates",
                    "Buddy4Study aggregates 3,000+ scholarships — set up a profile to match automatically",
                    "Infosys BPM Scholarship for women in engineering — ₹1.2 lakh/year",
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "online",
                text: "Scholarships for Online Degrees",
            },
            {
                type: "paragraph",
                text: "Several universities offer 30–50% fee waivers for meritorious or economically weaker students on their online programs. Always contact the university's financial aid office before paying full fees.",
            },
            {
                type: "heading",
                level: 2,
                id: "apply",
                text: "How to Apply",
            },
            {
                type: "list",
                ordered: true,
                items: [
                    "Register on scholarships.gov.in (NSP) or the relevant portal",
                    "Keep marksheets, income certificate, caste certificate, and Aadhaar ready",
                    "Apply before August 31 — most central schemes close by then",
                    "Track status via NSP login and respond to any verification request within 7 days",
                ],
            },
        ],
    },

    // ── 5 ────────────────────────────────────────────────────────────────────
    {
        id: 5,
        category: "UNIVERSITY",
        title: "Best Online Universities in India: Rankings & Fees [2026]",
        imageSrc: "/blogs/ranking.png",
        excerpt:
            "Compare top UGC-approved online universities based on rankings, fees, placement records, and course offerings.",
        description:
            "With 70+ UGC-approved online universities now operating in India, choosing the right one is harder than ever. We've built a clear comparison framework so you can decide in minutes.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "May 30, 2026",
        readTime: "11 min read",
        reads: "22K Reads",
        slug: "best-online-universities-india",
        tags: ["University", "UGC", "Rankings", "Online Degree"],
        headings: [
            { id: "criteria", text: "How We Ranked Them", level: 2 },
            { id: "top10", text: "Top 10 Online Universities 2026", level: 2 },
            { id: "fees", text: "Fee Comparison", level: 2 },
            { id: "choose", text: "Which One Should You Pick?", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "criteria",
                text: "How We Ranked Them",
            },
            {
                type: "paragraph",
                text: "We evaluated universities on five parameters: NAAC grade, NIRF ranking, UGC-DEB approval status, student-to-mentor ratio, and verified LinkedIn placement outcomes from 2024–25 batches.",
            },
            {
                type: "heading",
                level: 2,
                id: "top10",
                text: "Top 10 Online Universities 2026",
            },
            {
                type: "table",
                headers: ["Rank", "University", "NAAC", "Best For"],
                rows: [
                    ["1", "BITS Pilani Online", "A++", "Engineering, IT"],
                    ["2", "Amity Online", "A+", "MBA, BBA, MCA"],
                    ["3", "Manipal Online", "A+", "MBA, MCA, MSc"],
                    ["4", "Chandigarh University", "A+", "MBA, BCA, MCA"],
                    ["5", "Jain University Online", "A", "Commerce, Management"],
                    ["6", "LPU Online", "A++", "All streams"],
                    ["7", "Symbiosis Online (SCDL)", "A++", "PG Diplomas"],
                    ["8", "UPES Online", "A", "Energy, Business"],
                    ["9", "Vignan Online", "A+", "Engineering, MBA"],
                    ["10", "DY Patil Online", "A", "Health, Business"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "fees",
                text: "Fee Comparison",
            },
            {
                type: "callout",
                variant: "warning",
                text: "Always verify fees directly on the university website. Some platforms show outdated fee data. Fees can increase by 5–10% each academic year.",
            },
            {
                type: "heading",
                level: 2,
                id: "choose",
                text: "Which One Should You Pick?",
            },
            {
                type: "paragraph",
                text: "If budget is the primary constraint, Chandigarh University or Jain Online offer the best value. If brand recognition matters for your target employers, BITS Pilani Online or Amity are worth the premium. Always check if your target company specifically rejects or accepts online degrees — most IT and BFSI employers now treat them equally.",
            },
        ],
    },

    // ── 6 ────────────────────────────────────────────────────────────────────
    {
        id: 6,
        category: "JOBS & INTERNSHIPS",
        title: "Highest Paying Jobs in India 2026: Salary & Skills Required",
        imageSrc: "/blogs/high-payng-job.png",
        excerpt:
            "Discover which careers offer the highest salaries in India and what skills you need to land these roles.",
        description:
            "From AI engineers to investment bankers — we've mapped the 10 highest-paying job profiles in India for 2026 with real salary data, required qualifications, and the fastest way to enter each field.",
        author: "eCampus Team",
        authorBio:
            "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
        authorImage: "/images/authors/ecampus-team.png",
        date: "May 28, 2026",
        readTime: "12 min read",
        reads: "33K Reads",
        slug: "highest-paying-jobs-india-2026",
        featured: false,
        tags: ["Salary", "Jobs", "AI", "Finance", "Tech"],
        headings: [
            { id: "overview", text: "Salary Landscape in India 2026", level: 2 },
            { id: "tech", text: "Tech & AI Roles", level: 2 },
            { id: "finance", text: "Finance & Banking Roles", level: 2 },
            { id: "management", text: "Management Roles", level: 2 },
            { id: "skills", text: "Skills That Pay the Most in 2026", level: 2 },
        ],
        content: [
            {
                type: "heading",
                level: 2,
                id: "overview",
                text: "Salary Landscape in India 2026",
            },
            {
                type: "paragraph",
                text: "India's talent market has bifurcated sharply: AI-adjacent and finance roles are seeing 25–40% year-on-year salary growth, while traditional IT services roles have plateaued. Knowing which skills to build now is critical.",
            },
            {
                type: "heading",
                level: 2,
                id: "tech",
                text: "Tech & AI Roles",
            },
            {
                type: "table",
                headers: ["Role", "Avg. CTC (LPA)", "Key Skills", "Min. Qualification"],
                rows: [
                    ["AI/ML Engineer", "₹18–45", "Python, PyTorch, LLMs", "B.Tech / M.Tech"],
                    ["Data Scientist", "₹12–30", "Python, SQL, Statistics", "B.Tech / MCA"],
                    ["Cloud Architect", "₹20–50", "AWS/Azure, DevOps", "B.Tech + certifications"],
                    ["Cybersecurity Engineer", "₹14–35", "Networking, SIEM, CISSP", "B.Tech / MCA"],
                    ["Full-Stack Developer", "₹10–25", "React, Node.js, Databases", "B.Tech / BCA"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "finance",
                text: "Finance & Banking Roles",
            },
            {
                type: "table",
                headers: ["Role", "Avg. CTC (LPA)", "Key Skills", "Min. Qualification"],
                rows: [
                    ["Investment Banker", "₹20–60", "Financial modelling, Excel, CFA", "MBA Finance / CA"],
                    ["Chartered Accountant", "₹10–30", "Taxation, Audit, IFRS", "CA Final"],
                    ["Financial Analyst", "₹8–22", "Excel, Python, Bloomberg", "MBA / CFA L1"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "management",
                text: "Management Roles",
            },
            {
                type: "table",
                headers: ["Role", "Avg. CTC (LPA)", "Key Skills", "Min. Qualification"],
                rows: [
                    ["Product Manager", "₹18–50", "Roadmapping, SQL, UX", "MBA / B.Tech"],
                    ["Marketing Director", "₹20–55", "Brand strategy, Analytics", "MBA Marketing"],
                ],
            },
            {
                type: "heading",
                level: 2,
                id: "skills",
                text: "Skills That Pay the Most in 2026",
            },
            {
                type: "list",
                items: [
                    "Generative AI & Prompt Engineering — 38% salary premium over peers",
                    "Data Engineering (Spark, Kafka, Airflow) — ₹18–35 LPA average",
                    "Cloud-native Development — almost every tech job now requires at least 1 cloud cert",
                    "Financial Modelling + Python — dominant combo for BFSI roles",
                    "Product Strategy — highest correlation with Director-level promotions",
                ],
            },
            {
                type: "callout",
                variant: "tip",
                text: "You don't need to start from scratch. Most of these skills can be layered onto your existing degree via 6–12 month online programs. Use eCampus's Career Match tool to find the right upskilling path.",
            },
        ],
    },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: string[] = [
    "Latest Articles",
    "Career Opportunities",
    "MBA",
    "Career Guidance",
    "Scholarship",
    "University",
    "Jobs & Internships",
];