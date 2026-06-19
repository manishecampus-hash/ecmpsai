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
  view: string;
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
      {
        id: "overview",
        text: "Why a BA is More Valuable Than You Think",
        level: 2,
      },
      {
        id: "option-1",
        text: "1. Civil Services (UPSC / State PSC)",
        level: 2,
      },
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
    category: "government",
    title:
      "Government Jobs After Diploma in Civil Engineering: Complete Guide 2026",
    imageSrc: "/blogs/testblog.webp",
    excerpt:
      "Government jobs after Diploma in Civil Engineering offer stable careers with excellent benefits. Thousands of diplomas in civil engineering government jobs open every year in state and central departments Job portal",

    description: `Government jobs after Diploma in Civil Engineering offer stable careers with excellent benefits. Thousands of diplomas in civil engineering government jobs open every year in state and central departments Job portal. If you completed your civil engineering diploma, this guide shows exact steps to secure govt jobs after diploma civil engineering with salary details and preparation strategy.

Many students think a degree is mandatory for government jobs. But government career options after diploma in civil engineering are actually plenty. From Junior Engineer government job diploma positions to Surveyor roles, opportunities exist in railways, PWD, municipalities, and PSUs. 

This article covers job opportunities after diploma in civil engineering, eligibility, exams, and salary and career growth in government jobs after diploma civil engineering.`,
    author: "eCampus Team",
    authorBio:
      "The eCampus editorial team researches and curates guidance on Indian higher education, online degrees, and career growth for students across India.",
    authorImage: "/images/authors/ecampus-team.png",
    date: "Jun 5, 2026",
    readTime: "7 min read",
    reads: "15K Reads",
    view: "60.25K+",
    slug: "government-jobs-after-diploma-guide2026",
    tags: ["MBA", "Online Degree", "Affordable", "UGC"],
    headings: [
      {
        id: "why",
        text: "Government Jobs After Graduation & Diploma Overview",
        level: 2,
      },
      {
        id: "universities",
        text: "Top Universities Offering Career Opportunities",
        level: 2,
      },
      {
        id: "eligibility",
        text: "Job Options After Completing Your Course",
        level: 2,
      },
      {
        id: "placements",
        text: "Importance of Government Jobs in Career Growth",
        level: 2,
      },
      {
        id: "tips",
        text: "Top Government Job Roles You Can Apply For",
        level: 2,
      },
      {
        id: "eligibility-criteria",
        text: "Eligibility Criteria and Requirements Explained",
        level: 2,
      },
      {
        id: "best-books",
        text: "Best Books and Study Materials for Preparation",
        level: 2,
      },
      {
        id: "faqs",
        text: "Frequently Asked Questions About Government Jobs",
        level: 2,
      },
      {
        id: "conclusion",
        text: "Conclusion and Final Career Guidance",
        level: 2,
      },
    ],
    content: [
      {
        type: "heading",
        level: 2,
        id: "why",
        text: "Government Jobs After Diploma in Civil Engineering (Overview Table)",
      },
      {
        type: "paragraph",
        text: "Learn what government jobs after Diploma in Civil Engineering actually means and why diploma holders prefer the public sector. Discover the importance of government jobs for diploma civil engineers in the 2026 job market.",
      },
      {
        type: "heading",
        level: 2,
        id: "universities",
        text: "Top Universities & Fees",
      },
      {
        type: "table",
        headers: ["Focus Area", "Details"],
        rows: [
          [
            "Government jobs after Diploma in Civil Engineering",
            "Permanent state and central government jobs for diploma civil engineers in technical departments",
          ],
          [
            "Eligibility for diploma civil engineering government jobs",
            "Diploma in Civil Engineering (3 years) from a recognized polytechnic institute",
          ],
          [
            "Top government job roles for diploma civil engineers",
            "Junior Engineer (JE), Overseer, Supervisor, Draughtsman (Civil), Surveyor, Technician",
          ],
          [
            "Junior Engineer government job diploma",
            "Most preferred govt job after diploma civil engineering with high salary and promotion scope",
          ],
          [
            "Departments hiring diploma civil engineers",
            "PWD, Irrigation, Railways, Municipal Corporations, SSC, State PSCs, PSUs",
          ],
          [
            "Nature of work in civil engineering diploma govt jobs",
            "Site supervision, quality control, surveying, estimation, construction monitoring",
          ],
          [
            "Diploma civil engineering government job salary",
            "₹25,000 – ₹55,000 per month initially (including DA, HRA, TA)",
          ],
          [
            "Salary growth in government jobs after diploma civil engineering",
            "₹70,000 – ₹90,000 per month after 8–10 years with promotions",
          ],
          [
            "Government job exams for diploma civil engineers",
            "SSC JE, RRB JE, State JE exams, PSU recruitment exams",
          ],
          [
            "Age limit for govt jobs after diploma civil engineering",
            "18–27 years (age relaxation for SC/ST/OBC/PwD as per rules)",
          ],
          [
            "Experience required for diploma civil govt jobs",
            "Freshers eligible for most entry-level government jobs",
          ],
          [
            "Promotion to Assistant Engineer (AE)",
            "Possible after 5–10 years through departmental exams or AMIE",
          ],
          [
            "Career growth in government civil engineering jobs",
            "JE → Senior JE → Assistant Engineer → Executive Engineer",
          ],
          [
            "Allowances & perks of government job",
            "DA, HRA, TA, medical facilities, LTC, pension, job security",
          ],
          [
            "Why choose government jobs after diploma civil engineering",
            "Stable career, pension benefits, work-life balance, social respect",
          ],
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "eligibility",
        text: "What Are Government Jobs After Diploma in Civil Engineering?",
      },
      {
        type: "paragraph",
        text: "Government jobs after Diploma in Civil Engineering means permanent positions in state or central government departments for polytechnic civil graduates. These jobs involve construction supervision, project planning, quality checking, and infrastructure maintenance. Unlike the private sector, govt jobs for diploma engineers offer job security, pension, and regular promotions.",
      },
      {
        type: "list",
        items: [
          "The civil engineering diploma job roles in government includes Junior Engineer, Overseer, Draughtsman, and Surveyor. Each role has specific responsibilities in building roads, bridges, dams, and government buildings. The diploma civil government job salary starts from ₹25,000 and can reach ₹80,000+ with experience and promotions.",
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "placements",
        text: "Importance of Government Jobs for Diploma Civil Engineers",
      },
      {
        type: "paragraph",
        text: "Getting civil engineering diploma jobs government is dream for many because:",
      },
      {
        type: "list",
        items: [
          "Job Security: Permanent position till retirement age",
          "Pension Benefits: Monthly pension after retirement",
          "Work-Life Balance: Fixed working hours, less stress than private",
          "Social Status: Respect in society as government officer",
          "Career Growth: Regular promotions based on seniority and exams",
        ],
      },
      {
        type: "paragraph",
        text: "The government salary for diploma civil engineers may seem lower initially than the private sector. But when you add allowances, pension, and job stability, total benefits exceed private jobs. Many state and central govt jobs for civil diploma holders also provide quarters or HRA benefits.",
      },
      {
        type: "heading",
        level: 2,
        id: "tips",
        text: "Top Government Job Roles After Diploma in Civil Engineering",
      },

      {
        type: "paragraph",
        text: "Explore top government job roles after diploma in civil engineering with detailed responsibilities. Compare diploma civil engineering job roles and salaries to choose the best career path.",
      },

      {
        type: "heading",
        level: 3,
        id: "junior-engineer",
        text: "1. Junior Engineer (JE) – Responsibilities & Salary",
      },

      {
        type: "paragraph",
        text: "Junior Engineer (JE) is the most popular government job after a Diploma in Civil Engineering. JEs work under Executive Engineers and handle day-to-day construction supervision, project execution, and site management activities.",
      },

      {
        type: "heading",
        level: 3,
        id: "je-responsibilities",
        text: "Responsibilities",
      },

      {
        type: "list",
        items: [
          "Supervise construction work at site",
          "Check quality of materials and work",
          "Prepare measurement books and bills",
          "Maintain site records and progress reports",
          "Coordinate with contractors and labor",
        ],
      },

      // ── Salary Details ──
      {
        type: "heading",
        level: 3,
        id: "je-salary",
        text: "Salary details",
      },
      {
        type: "table",
        headers: ["Component", "Amount"],
        rows: [
          ["Basic Pay", "₹35,400 – ₹1,12,400 (Level 6)"],
          ["DA (42%)", "₹14,868 – ₹47,208"],
          ["HRA", "₹2,832 – ₹8,992 (8–24%)"],
          ["Total Starting", "₹45,000 – ₹55,000/month"],
        ],
      },
      {
        type: "paragraph",
        text: "Growth path: JE → Assistant Engineer → Executive Engineer → Superintending Engineer",
      },

      // ── Civil Engineering Technician ──
      {
        type: "heading",
        level: 3,
        id: "technician",
        text: "2. Civil Engineering Technician – job description & salary",
      },
      {
        type: "paragraph",
        text: "Civil Engineering Technician works in technical support roles. This diploma in civil engineering government job is available in municipalities and development authorities.",
      },
      {
        type: "heading",
        level: 3,
        id: "technician-responsibilities",
        text: "Responsibilities",
      },
      {
        type: "list",
        items: [
          "Assist in preparing technical drawings",
          "Conduct site surveys and measurements",
          "Test construction materials in lab",
          "Help in estimation and costing",
          "Maintain engineering documents",
        ],
      },
      {
        type: "paragraph",
        text: "Salary: ₹25,000 – ₹40,000/month (varies by state)",
      },

      // ── Supervisor / Overseer ──
      {
        type: "heading",
        level: 3,
        id: "overseer",
        text: "3. Supervisor / Overseer (Civil) – role & benefits",
      },
      {
        type: "paragraph",
        text: "Overseer is a field-level government job for diploma holders. They directly monitor construction activities.",
      },
      {
        type: "heading",
        level: 3,
        id: "overseer-responsibilities",
        text: "Responsibilities",
      },
      {
        type: "list",
        items: [
          "Daily site inspection and reporting",
          "Ensure work as per drawings",
          "Check safety measures at site",
          "Maintain labour attendance",
          "Prepare running account bills",
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "overseer-benefits",
        text: "Benefits",
      },
      {
        type: "list",
        items: [
          "Field allowance in addition to salary",
          "Vehicle facility or conveyance allowance",
          "Promotion to JE after 5–10 years",
        ],
      },

      // ── Draughtsman ──
      {
        type: "heading",
        level: 3,
        id: "draughtsman",
        text: "4. Draughtsman (Civil government job)",
      },
      {
        type: "paragraph",
        text: "Draughtsman prepares technical drawings using AutoCAD. This government recruitment role is common in PWD and housing boards.",
      },
      {
        type: "heading",
        level: 3,
        id: "draughtsman-skills",
        text: "Key skills required",
      },
      {
        type: "list",
        items: [
          "AutoCAD proficiency",
          "Knowledge of building byelaws",
          "Understanding of structural drawings",
          "Estimation software basics",
        ],
      },
      {
        type: "paragraph",
        text: "Salary range: ₹22,000 – ₹45,000/month",
      },

      // ── Surveyor ──
      {
        type: "heading",
        level: 3,
        id: "surveyor",
        text: "5. Surveyor – govt sector jobs",
      },
      {
        type: "paragraph",
        text: "The surveyor conducts land measurements for government projects, requiring strong practical skills.",
      },
      {
        type: "heading",
        level: 3,
        id: "surveyor-work",
        text: "Work areas",
      },
      {
        type: "list",
        items: [
          "Road and highway projects",
          "Irrigation canal surveys",
          "Land acquisition measurements",
          "Building layout marking",
        ],
      },
      {
        type: "paragraph",
        text: "Career scope: Surveyor → Head Surveyor → JE (through departmental exam)",
      },

      // ── AE via Promotion ──
      {
        type: "heading",
        level: 3,
        id: "ae-promotion",
        text: "6. Assistant Engineer via promotion (AE) – career growth",
      },
      {
        type: "paragraph",
        text: "Assistant Engineer is a promotional post for diploma holders. You cannot directly become AE after diploma, but the journey from diploma holder to senior engineer is achievable.",
      },
      {
        type: "heading",
        level: 3,
        id: "ae-promotion-path",
        text: "Promotion path",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Join as JE or Overseer",
          "Gain 5–10 years of experience",
          "Clear departmental promotion exam",
          "Get promoted to AE",
          "Further promotion to Executive Engineer",
        ],
      },
      {
        type: "paragraph",
        text: "AE Salary: ₹56,100 – ₹1,77,500/month (Level 10)",
      },

      // ── Eligibility ──
      {
        type: "heading",
        level: 2,
        id: "eligibility-criteria",
        text: "Eligibility criteria for government jobs after diploma civil engineering",
      },
      {
        type: "paragraph",
        text: "Check the diploma civil engineering eligibility criteria for government jobs before applying. Know the minimum qualification and age limit, and experience and age relaxation rules for state and central posts.",
      },
      {
        type: "heading",
        level: 3,
        id: "min-qualification",
        text: "Minimum qualification & age limit",
      },
      {
        type: "table",
        headers: ["Criteria", "Requirement"],
        rows: [
          [
            "Education",
            "Diploma in Civil Engineering (3 years) from a recognised polytechnic",
          ],
          ["Minimum Marks", "50–60% (varies by recruitment)"],
          ["Age Limit", "18–27 years for general category"],
          ["Nationality", "Indian citizen"],
          ["Physical Fitness", "Required for field jobs"],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "age-relaxation",
        text: "Experience & age relaxation rules (state / central govt)",
      },
      {
        type: "paragraph",
        text: "Most government jobs after a diploma in civil engineering allow freshers to apply, especially for JE, Overseer, Draughtsman, and Surveyor posts. Some technical assistant roles ask for 2–3 years of field experience.",
      },
      {
        type: "table",
        headers: ["Category", "Relaxation"],
        rows: [
          ["OBC", "3 years"],
          ["SC/ST", "5 years"],
          ["PwD", "10 years"],
          ["Ex-Servicemen", "As per rules"],
          ["State Govt Employees", "5 years"],
        ],
      },
      {
        type: "list",
        items: [
          "Freshers: can apply for JE, Draughtsman, and Surveyor posts",
          "Experience: 2–3 years required for some technical assistant roles",
          "No experience: most entry-level vacancies for 2026 accept freshers",
        ],
      },

      // ── Exams ──
      {
        type: "heading",
        level: 2,
        id: "govt-exams",
        text: "Government job exams for diploma civil engineers",
      },
      {
        type: "heading",
        level: 3,
        id: "je-exams",
        text: "Junior Engineer (JE) competitive exams",
      },
      {
        type: "table",
        headers: ["Exam", "Conducting Body", "Posts", "Salary"],
        rows: [
          [
            "SSC JE",
            "Staff Selection Commission",
            "CPWD, CWC, BRO",
            "₹35,400 – ₹1,12,400",
          ],
          [
            "State JE",
            "State PSCs",
            "PWD, Irrigation, Panchayat",
            "₹25,000 – ₹50,000",
          ],
          [
            "RRB JE",
            "Railway Recruitment Board",
            "Railways",
            "₹35,400 – ₹1,12,400",
          ],
          ["BSNL JE", "Bharat Sanchar Nigam", "Telecom", "₹30,000 – ₹40,000"],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "state-exams",
        text: "State engineering recruitment exams",
      },
      {
        type: "paragraph",
        text: "Each state conducts its own exam for diploma holders — examples include UPSSSC JE (Uttar Pradesh), MPSC JE (Maharashtra), TNPSC JE (Tamil Nadu), KPSC JE (Karnataka), APPSC JE (Andhra Pradesh), and GPSC JE (Gujarat).",
      },
      {
        type: "heading",
        level: 3,
        id: "exam-pattern",
        text: "Exam pattern",
      },
      {
        type: "list",
        items: [
          "Written test (Objective + Descriptive)",
          "Technical subject (Civil Engineering)",
          "General Awareness and Reasoning",
          "Interview / Personality Test (in some states)",
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "rrb-ssc",
        text: "Railway & SSC JE exams",
      },
      {
        type: "paragraph",
        text: "RRB JE stages: CBT 1 (Mathematics, General Intelligence, General Science, General Awareness) → CBT 2 (Technical Civil, Physics & Chemistry, Basics of Computers) → Document Verification & Medical.",
      },
      {
        type: "paragraph",
        text: "SSC JE pattern: Paper 1 (General Awareness, General Intelligence, Technical Civil) → Paper 2 (Technical Civil Engineering only) → Document Verification.",
      },
      {
        type: "heading",
        level: 3,
        id: "psu",
        text: "PSU recruitment for diploma civil",
      },
      {
        type: "table",
        headers: ["PSU", "Posts", "Selection Process"],
        rows: [
          ["NPCIL", "Technical Assistant", "GATE not required"],
          ["BHEL", "Supervisor", "Written test + Interview"],
          ["NTPC", "Diploma Trainee", "Online test + Interview"],
          ["NHPC", "Junior Engineer", "Written exam"],
          ["SAIL", "Junior Manager", "GATE or separate exam"],
        ],
      },

      // ── Salary & Benefits ──
      {
        type: "heading",
        level: 2,
        id: "salary-benefits",
        text: "Salary & job benefits in the government sector",
      },
      {
        type: "table",
        headers: ["Job Role", "Starting Salary", "After 10 Years"],
        rows: [
          ["Junior Engineer", "₹45,000 – ₹55,000", "₹70,000 – ₹90,000"],
          ["Overseer/Supervisor", "₹25,000 – ₹35,000", "₹45,000 – ₹60,000"],
          ["Draughtsman", "₹22,000 – ₹30,000", "₹40,000 – ₹50,000"],
          ["Surveyor", "₹20,000 – ₹28,000", "₹35,000 – ₹50,000"],
          ["Technician", "₹25,000 – ₹40,000", "₹45,000 – ₹65,000"],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "allowances",
        text: "Allowances, pension & perks",
      },
      {
        type: "list",
        items: [
          "Dearness Allowance (DA) – 42% of basic (revised periodically)",
          "House Rent Allowance (HRA) – 8–24% based on city",
          "Transport Allowance (TA) and Medical Allowance",
          "Pension: monthly pension after retirement (NPS or old pension scheme)",
          "Gratuity: one-time payment on retirement",
          "Leave Travel Concession (LTC): free travel once every 2 years",
          "Government quarters (or HRA if quarters are unavailable)",
          "Medical facilities: CGHS/ESIS for the family",
          "Education allowance for children",
          "Easy loans at low interest rates",
        ],
      },

      // ── Preparation ──
      {
        type: "heading",
        level: 2,
        id: "preparation",
        text: "How to prepare for government jobs after diploma civil engineering",
      },
      {
        type: "heading",
        level: 3,
        id: "study-plan",
        text: "6-month preparation plan",
      },
      {
        type: "table",
        headers: ["Month", "Focus Area"],
        rows: [
          ["1–2", "Complete syllabus coverage, basic concepts"],
          ["3–4", "Previous year papers, practice questions"],
          ["5", "Mock tests, time management"],
          ["6", "Revision, weak area improvement"],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "best-books",
        text: "Best books",
      },
      {
        type: "table",
        headers: ["Subject", "Book Name", "Author"],
        rows: [
          ["Strength of Materials", "Strength of Materials", "R.S. Khurmi"],
          ["Theory of Structures", "Theory of Structures", "B.C. Punmia"],
          ["RCC Design", "RCC Design", "S. Ramamrutham"],
          ["Steel Design", "Design of Steel Structures", "S.K. Duggal"],
          ["Surveying", "Surveying", "B.C. Punmia"],
          ["Hydraulics", "Fluid Mechanics", "R.K. Bansal"],
          ["General Awareness", "Lucent's GK", "Dr. Binay Karna"],
          [
            "Reasoning",
            "A Modern Approach to Verbal & Non-Verbal Reasoning",
            "R.S. Aggarwal",
          ],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "syllabus-tips",
        text: "Exam syllabus & preparation tips",
      },
      {
        type: "list",
        items: [
          "Technical Syllabus covers: Building Materials, Surveying, Construction Technology, Hydraulics, Soil Mechanics, Transportation Engineering, Environmental Engineering, Estimating and Costing",
          "Focus on technical subjects (70% weightage)",
          "Solve 10 years of previous papers",
          "Join a test series for regular practice",
          "Stay updated with current affairs, especially infrastructure projects",
          "Improve calculation speed for numerical problems",
        ],
      },

      // ── Practical Experience ──
      {
        type: "heading",
        level: 2,
        id: "practical-experience",
        text: "Internship & practical experience benefits for diploma holders",
      },
      {
        type: "paragraph",
        text: "Government departments prefer candidates with practical knowledge in site supervision, quality control, measurement skills, drawing reading, and estimation.",
      },
      {
        type: "heading",
        level: 3,
        id: "where-to-train",
        text: "Where to get training",
      },
      {
        type: "list",
        items: [
          "Summer Training: during diploma course in PWD / contractor offices",
          "Apprenticeship: National Apprenticeship Training Scheme (NATS)",
          "Site Work: work with small contractors for 6–12 months",
          "Software Training: AutoCAD, STAAD.Pro, MS Project",
        ],
      },
      {
        type: "list",
        items: [
          "Practical questions become easier in exams",
          "Interview performance improves significantly",
          "Better confidence in technical discussions",
          "Stronger understanding of real-world problems",
        ],
      },

      // ── Career Growth ──
      {
        type: "heading",
        level: 2,
        id: "career-growth",
        text: "Career growth & promotion opportunities",
      },
      {
        type: "table",
        headers: ["Years", "Position", "Grade Pay"],
        rows: [
          ["0", "Junior Engineer", "Level 6"],
          ["5–8", "Senior JE", "Level 7"],
          ["10–15", "Assistant Engineer", "Level 10"],
          ["20–25", "Executive Engineer", "Level 11–12"],
          ["30+", "Superintending Engineer", "Level 13–14"],
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "ae-path",
        text: "Two ways to become Assistant Engineer",
      },
      {
        type: "list",
        items: [
          "Departmental Promotion: complete 5–10 years as JE → clear LDCE (Limited Departmental Competitive Examination) → get promoted to AE",
          "Direct Recruitment (after AMIE): complete AMIE (Associate Member of Institution of Engineers) → apply for direct AE posts → clear competitive exam",
        ],
      },
      {
        type: "heading",
        level: 3,
        id: "higher-education",
        text: "Higher education options after a govt job",
      },
      {
        type: "table",
        headers: ["Course", "Duration", "Benefit"],
        rows: [
          [
            "AMIE",
            "4 years (part-time)",
            "Equivalent to B.Tech; eligible for AE direct recruitment",
          ],
          [
            "B.Tech (Lateral Entry)",
            "3 years",
            "Degree for better opportunities",
          ],
          ["M.Tech (after AMIE/B.Tech)", "2 years", "Teaching and R&D roles"],
          ["PMP Certification", "6 months", "Project management roles"],
        ],
      },

      // ── FAQs ──
      {
        type: "heading",
        level: 2,
        id: "faqs",
        text: "Frequently asked questions (FAQs)",
      },
      {
        type: "callout",
        variant: "info",
        text: "What government jobs can I get after a diploma in civil engineering? You can get Junior Engineer, Overseer, Draughtsman, Surveyor, Technician, and Supervisor positions in PWD, Irrigation, Railways, Municipalities, and PSUs through competitive exams.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Is a diploma enough for government jobs? Yes, for entry-level roles. For higher positions like Assistant Engineer, you need an AMIE or B.Tech through promotion or lateral entry.",
      },
      {
        type: "callout",
        variant: "info",
        text: "What salary can I expect? Starting salary ranges from ₹25,000 to ₹55,000 depending on department and state. After 10 years, you can earn ₹60,000 – ₹90,000 with DA, HRA, and other allowances.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Which exams should I focus on? SSC JE, RRB JE, State PSC JE exams, and PSU recruitments offer the best career growth and stability.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Can diploma holders become Assistant Engineers? Yes — through promotion after 5–10 years of service and clearing departmental exams, or by completing AMIE and applying for direct AE posts.",
      },

      // ── Conclusion ──
      {
        type: "heading",
        level: 2,
        id: "conclusion",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Government jobs after a Diploma in Civil Engineering provide a secure and respected career path. With proper preparation for the right competitive exams, you can secure a position in reputed departments. Remember that eligibility criteria vary by state, so always check official notifications carefully.",
      },
      {
        type: "paragraph",
        text: "When you factor in pension, allowances, and long-term job security, the salary and career growth in government civil engineering jobs is excellent. Start preparing today for the latest 2026 vacancies and build a successful career in the public sector.",
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
          [
            "NSP Central Sector Scheme",
            "₹10,000–20,000/year",
            "Top 20 percentile, Class 12",
            "scholarships.gov.in",
          ],
          [
            "PM Yasasvi",
            "₹75,000–1.25 lakh/year",
            "OBC/EBC/DNT students",
            "yet.nta.ac.in",
          ],
          [
            "Pragati (AICTE)",
            "₹50,000/year",
            "Girls in technical courses",
            "aicte-pragati.com",
          ],
          [
            "Saksham (AICTE)",
            "₹50,000/year",
            "Students with disability",
            "aicte-saksham.com",
          ],
          [
            "Ishan Uday (UGC)",
            "₹5,400–7,800/month",
            "North-East region students",
            "scholarships.gov.in",
          ],
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
          [
            "AI/ML Engineer",
            "₹18–45",
            "Python, PyTorch, LLMs",
            "B.Tech / M.Tech",
          ],
          [
            "Data Scientist",
            "₹12–30",
            "Python, SQL, Statistics",
            "B.Tech / MCA",
          ],
          [
            "Cloud Architect",
            "₹20–50",
            "AWS/Azure, DevOps",
            "B.Tech + certifications",
          ],
          [
            "Cybersecurity Engineer",
            "₹14–35",
            "Networking, SIEM, CISSP",
            "B.Tech / MCA",
          ],
          [
            "Full-Stack Developer",
            "₹10–25",
            "React, Node.js, Databases",
            "B.Tech / BCA",
          ],
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
          [
            "Investment Banker",
            "₹20–60",
            "Financial modelling, Excel, CFA",
            "MBA Finance / CA",
          ],
          [
            "Chartered Accountant",
            "₹10–30",
            "Taxation, Audit, IFRS",
            "CA Final",
          ],
          [
            "Financial Analyst",
            "₹8–22",
            "Excel, Python, Bloomberg",
            "MBA / CFA L1",
          ],
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
          [
            "Marketing Director",
            "₹20–55",
            "Brand strategy, Analytics",
            "MBA Marketing",
          ],
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
