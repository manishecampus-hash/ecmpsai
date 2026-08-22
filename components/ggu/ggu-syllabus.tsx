"use client";

import React, { useRef, useState } from "react";
import { Download, ChevronRight, ChevronLeft } from "lucide-react";

interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  topics: string[];
}

const courses: Course[] = [
  {
    id: 1,
    code: "DBA 800",
    title: "Doctoral Writing",
    description:
      "Develop advanced research skills to conduct and present doctoral-level research effectively.",
    topics: [
      "Introduction to Research",
      "Identifying the Research Problem",
      "Conducting Literature Research and Review",
      "Structuring and Drafting a Literature Review",
      "Formulating a Research Question and Hypothesis",
      "Choosing a Research Method",
      "Collecting and Analyzing Data",
    ],
  },
  {
    id: 2,
    code: "DBA 801",
    title: "Quantitative Research Methods",
    description:
      "Master quantitative analysis and statistical methods for business research and data-driven decision making.",
    topics: [
      "Quantitative Research Design",
      "Sampling Techniques and Methods",
      "Questionnaire Development",
      "Statistical Foundations",
      "Descriptive Statistics",
      "Hypothesis Testing",
      "Regression Analysis",
    ],
  },
  {
    id: 3,
    code: "DBA 802",
    title: "Qualitative Research Methods",
    description:
      "Explore qualitative research methodologies for in-depth business insights and theory development.",
    topics: [
      "Qualitative Research Paradigms",
      "Interview Techniques",
      "Focus Group Discussions",
      "Ethnographic Research",
      "Case Study Analysis",
      "Content Analysis",
      "Thematic Coding and Analysis",
    ],
  },
  {
    id: 4,
    code: "DBA 820",
    title: "Corporate Finance",
    description:
      "Analyze corporate finance theories and apply them to strategic business decisions and organizational growth.",
    topics: [
      "Financial Statement Analysis",
      "Capital Budgeting",
      "Cost of Capital",
      "Financial Leverage",
      "Working Capital Management",
      "Valuation Methods",
      "Dividend Policy",
    ],
  },
  {
    id: 5,
    code: "DBA 821",
    title: "Financial Theory",
    description:
      "Deep dive into advanced financial theories and their applications in modern business environments.",
    topics: [
      "Portfolio Theory",
      "Asset Pricing Models",
      "Market Efficiency",
      "Risk Management",
      "Derivatives and Hedging",
      "Behavioral Finance",
      "Financial Innovation",
    ],
  },
  {
    id: 6,
    code: "DBA 822",
    title: "International Finance",
    description:
      "Understand global financial markets, international business transactions, and cross-border financial management.",
    topics: [
      "Exchange Rate Markets",
      "International Trade Finance",
      "Foreign Direct Investment",
      "International Capital Markets",
      "Sovereign Debt",
      "International Monetary System",
      "Cross-Border Valuation",
    ],
  },
  {
    id: 7,
    code: "DBA 850",
    title: "Data as an Asset",
    description:
      "Examine how organizations treat data as a strategic asset, covering governance, quality, and value creation.",
    topics: [
      "Data Governance Frameworks",
      "Data Quality Management",
      "Data as a Strategic Resource",
      "Data Monetization Strategies",
      "Master Data Management",
      "Data Privacy and Compliance",
      "Building a Data-Driven Culture",
    ],
  },
  {
    id: 8,
    code: "DBA 851",
    title: "Operational Performance",
    description:
      "Study frameworks and metrics for measuring and improving organizational operational performance.",
    topics: [
      "Operations Strategy",
      "Process Improvement Methods",
      "Performance Measurement Systems",
      "Lean and Six Sigma",
      "Supply Chain Optimization",
      "Quality Management",
      "Benchmarking and KPIs",
    ],
  },
  {
    id: 9,
    code: "DBA 852",
    title: "Application of AI",
    description:
      "Explore practical applications of artificial intelligence in business strategy and decision making.",
    topics: [
      "AI Fundamentals for Business",
      "Machine Learning Applications",
      "AI-Driven Decision Making",
      "Ethics and Governance of AI",
      "AI in Business Process Automation",
      "Data-Driven AI Strategy",
      "Emerging AI Technologies",
    ],
  },
  {
    id: 10,
    code: "DBA 870",
    title: "Marketing Management",
    description:
      "Analyze strategic marketing management principles and their application to competitive business environments.",
    topics: [
      "Marketing Strategy Development",
      "Market Segmentation and Targeting",
      "Brand Management",
      "Product Positioning",
      "Pricing Strategy",
      "Marketing Analytics",
      "Competitive Analysis",
    ],
  },
  {
    id: 11,
    code: "DBA 871",
    title: "Consumer Behavior",
    description:
      "Investigate the psychological, social, and cultural factors that influence consumer decision making.",
    topics: [
      "Consumer Decision Processes",
      "Psychological Influences on Buying",
      "Social and Cultural Factors",
      "Consumer Research Methods",
      "Brand Perception and Loyalty",
      "Behavioral Segmentation",
      "Ethical Considerations in Marketing",
    ],
  },
  {
    id: 12,
    code: "DBA 872",
    title: "Digital Marketing and New Media",
    description:
      "Explore digital marketing strategies, new media platforms, and their role in modern business growth.",
    topics: [
      "Digital Marketing Strategy",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Content Marketing",
      "Influencer and New Media Trends",
      "Digital Analytics and Metrics",
      "Omnichannel Marketing",
    ],
  },
];

export default function GGUDoctorateSyllabusNew() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [expandedTopics, setExpandedTopics] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      style={{}}
      className="relative w-full px-4 pt-0 pb-14 -mt-8 text-slate-900 sm:px-6 lg:pb-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
            Online DBA <span className="text-red-500">Syllabus</span>
          </h2>
        </div>

        {/* Course Cards Carousel */}
        <div className="relative mb-10">
          {/* Left arrow */}
          <button
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth px-8 pb-2 scrollbar-hide"
          >
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`flex w-40 flex-shrink-0 flex-col items-start justify-center rounded-2xl px-4 py-4 text-left transition-all sm:w-44 ${
                  selectedCourse.id === course.id
                    ? "border-2 border-red-500 bg-white shadow-md"
                    : "border border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div
                  className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
                    selectedCourse.id === course.id
                      ? "text-red-500"
                      : "text-slate-500"
                  }`}
                >
                  {course.code}
                </div>
                <div
                  className={`text-sm font-bold leading-snug ${
                    selectedCourse.id === course.id
                      ? "text-red-600"
                      : "text-slate-700"
                  }`}
                >
                  {course.title}
                </div>
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Course Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg">
          {/* Course Title & Description */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              {selectedCourse.title} and Research Methods
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              {selectedCourse.description}
            </p>
          </div>

          {/* Topics Section */}
          <div>
            <button
              onClick={() => setExpandedTopics(!expandedTopics)}
              className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900 hover:text-red-600"
            >
              Topics Covered:
              <ChevronRight
                className={`h-5 w-5 transition-transform ${
                  expandedTopics ? "rotate-90" : ""
                }`}
              />
            </button>

            {expandedTopics && (
              <div className="space-y-3">
                {selectedCourse.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500 bg-red-50">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    </div>
                    <p className="text-base text-slate-700">{topic}</p>
                  </div>
                ))}
              </div>
            )}

            <button className="mt-6 text-base font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
              Read More
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-10 flex justify-center">
          <button className="inline-flex h-11 w-fit items-center justify-center gap-2 self-start whitespace-nowrap rounded-[13px] bg-red-600 px-5 text-sm font-bold text-white shadow-[0_10px_18px_rgba(239,68,68,0.28)] transition hover:bg-red-700 active:scale-[0.99]">
            <Download className="h-4 w-4" />
            Download Syllabus
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
