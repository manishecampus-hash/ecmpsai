export const softwareDeveloper = {
  slug: "software-developer",
  title: "Software Developer",
  category: "Technology",

  hero: {
    badge: "High Demand Career",
    heading: "Become a Full Stack Software ",
    description:
      "Build modern web applications using React, Next.js, Node.js, and cloud technologies. Prepare for high-paying software engineering roles in startups and MNCs.",
    image: "/career/software-hero.png",
    salary: "₹6-18 LPA",
    duration: "6-12 Months Learning Path",
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
