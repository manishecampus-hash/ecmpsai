export const softwareDeveloper = {
  slug: "software-developer",
  title: "Software Developer",
  category: "Technology",

  hero: {
    badge: "High-Growth Career Track",
    heading: "Become a Full Stack",
    headingHighlight: "Software Developer",
    description:
      "Master modern web architectures, cloud systems, and generative AI tooling with global university credentials and 1:1 industry mentorship.",
    image: "/career/software-hero.png",
    salary: "₹6-18 LPA",
    duration: "6-12 Months Learning Path",
    features: [
      {
        icon: "stack",
        title: "Modern Stack",
        description: "React, Next.js, Node, Docker & Cloud Microservices.",
      },
      {
        icon: "apps",
        title: "Real Production Apps",
        description: "Build 12+ real deployable systems and enterprise applications.",
      },
      {
        icon: "mentor",
        title: "1:1 Mentorship",
        description: "Direct coaching by experienced industry mentors.",
      },
    ],
    ratingText: "4.8/5 Rated by 50,000+ Engineers",
    placementText: "100% Placement Support",
    report: {
      candidateCtc: "₹18.4 LPA",
      placementWindow: "64 Days",
      careerGoals: [
        "Switch to Full Stack Developer (0-2 Yrs)",
        "Upskill as a Backend Engineer",
        "Break into Software Development (Fresher)",
        "Senior / Lead Engineer Transition",
      ],
    },
  },

  overview: {
    title: "What Does a Software Developer Do?",
    content:
      "Software developers design, build, test, and maintain applications that solve real-world business problems. They work with frontend, backend, databases, APIs, and cloud infrastructure.",
  },

  skills: [
    {
      title: "Frontend Development",
      description: "React, Next.js, Tailwind CSS, TypeScript",
      icon: "code",
    },
    {
      title: "Backend Development",
      description: "Node.js, Express, REST APIs, Authentication",
      icon: "server",
    },
    {
      title: "Database Management",
      description: "MySQL, PostgreSQL, MongoDB, Prisma ORM",
      icon: "database",
    },
  ],

  roadmap: [
    {
      step: 1,
      title: "Programming Fundamentals",
      description:
        "Learn JavaScript, TypeScript, Git, and problem-solving basics.",
    },
    {
      step: 2,
      title: "Frontend Projects",
      description: "Build responsive websites and React applications.",
    },
    {
      step: 3,
      title: "Backend & APIs",
      description:
        "Create APIs, connect databases, and implement authentication.",
    },
  ],

  salary: {
    average: "₹9.5 LPA",
    ranges: [
      { experience: "Fresher", salary: "₹4-6 LPA" },
      { experience: "1-3 Years", salary: "₹6-10 LPA" },
      { experience: "3-5 Years", salary: "₹10-18 LPA" },
      { experience: "5+ Years", salary: "₹18-35 LPA" },
    ],
  },

  tools: ["VS Code", "GitHub", "Postman", "Docker", "Vercel", "Figma"],

  opportunities: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
  ],

  faqs: [
    {
      question: "Can I become a developer without a CS degree?",
      answer:
        "Yes. A strong portfolio, GitHub projects, internships, and practical skills are often more important than the degree itself.",
    },
    {
      question: "Which language should I start with?",
      answer:
        "JavaScript is an excellent starting point because it can be used for both frontend and backend development.",
    },
  ],
} as const;

// ============================================
// Dynamic Route Support
// ============================================

export const careers = [softwareDeveloper] as const;

export const careersMap = {
  "software-developer": softwareDeveloper,
} as const;
