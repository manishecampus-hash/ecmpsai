import { Footer } from "@/components/layout/footer";
import OnlineVsRegular from "@/components/online-mba/online-vs-regular";
import EligibilityDuration from "@/components/online-mba/eligibility-duration";
import FeesAndEnrollment from "@/components/online-mba/fees-and-enrollment";
import KeyHighlights from "@/components/online-mba/key-highlight";
import OnlineMBAFAQ from "@/components/online-mba/mba-faq";
import MbaHeroSection from "@/components/online-mba/mba-hero";
import WhatDoesOnlineMBAOffer from "@/components/online-mba/mba-offer";
import MBAOverview from "@/components/online-mba/mba-overview";
import Specializations from "@/components/online-mba/mba-specializations";
import Syllabus from "@/components/online-mba/mba-syllabus";
import Professionals from "@/components/online-mba/professionals";
import TypesOfOnlineMBA from "@/components/online-mba/type-online-mba";
import UgcValidity from "@/components/online-mba/ugc-validity";
import SubHeader from "@/components/subheader/sub-header";
import MbaUniversitySection from "@/components/online-mba/mba-university-section";
import MbaEnrolNew from "@/components/online-mba/mba-enrol";

const DEFAULT_FALLBACK_MBA_DATA = {
  hero: {
    heading: "Online MBA Program in *India*",
    subheading: "UGC-DEB Approved | 2 Years Master Degree",
    description: "An Online Master of Business Administration (Online MBA) is a 2-year postgraduate degree program designed for working professionals and graduates seeking strategic management skills, career growth, and leadership roles.",
    cta1: "Apply Now",
    cta2: "Download Brochure",
    image: "/courses/iim.jpeg",
    titleSide: "Master of Business Administration",
    name: "Online MBA",
    stats: [
      { label: "Duration", value: "2 Years", iconName: "CalendarDays" },
      { label: "Recognition", value: "UGC-DEB", iconName: "ShieldCheck" },
      { label: "Mode", value: "100% Online", iconName: "Globe2" },
      { label: "Avg Salary", value: "₹8-25 LPA", iconName: "Award" },
    ],
    logos: [
      "/banner/31aug.svg",
      "/banner/Untitled design (7).svg",
    ]
  },
  universities: [
    { id: "1", name: "Manipal University Online", logoUrl: "/courses/birchwood.png", slug: "manipal-university", shortcode: "MU", location: "Jaipur, Rajasthan", nirfRanking: "#16", wesApproval: true },
    { id: "2", name: "Amity University Online", logoUrl: "/courses/ggu.png", slug: "amity-university", shortcode: "AU", location: "Noida, UP", nirfRanking: "#28", wesApproval: true },
    { id: "3", name: "Jain University Online", logoUrl: "/courses/7new.png", slug: "jain-university", shortcode: "JU", location: "Bengaluru, Karnataka", nirfRanking: "#68", wesApproval: true },
    { id: "4", name: "Chandigarh University Online", logoUrl: "/courses/8.png", slug: "chandigarh-university", shortcode: "CU", location: "Mohali, Punjab", nirfRanking: "#45", wesApproval: true },
  ],
  overview: {
    heading: "Online MBA *Overview*",
    description: "<p>The <strong>Online Master of Business Administration (MBA)</strong> is one of the most sought-after postgraduate management programs in India. Designed to cater to working executives, entrepreneurs, and fresh graduates, this program offers the flexibility of remote learning without compromising academic rigor or industry value.</p>",
    tabs: [
      {
        label: "Flexible Learning",
        heading: "100% Online & Asynchronous",
        subtext: "Learn at your own pace with recorded lectures and live weekend interactive sessions.",
        points: ["Access study materials 24/7", "Flexible examination slots", "Virtual interactive LMS"]
      },
      {
        label: "Career Growth",
        heading: "Placement Support & Networking",
        subtext: "Connect with global alumni networks and leading recruiters.",
        points: ["1-on-1 Mentorship", "Resume & LinkedIn Building", "Virtual Placement Drives"]
      }
    ]
  },
  eligibility: {
    heading: "Eligibility & *Duration*",
    eligCriteria: "<p>Bachelor's degree in any discipline from a recognized university with at least <strong>50% aggregate marks</strong> (45% for SC/ST reserved categories). Final year students can also apply provisionally.</p>",
    durationText: "<p>Standard Duration: <strong>2 Years (4 Semesters)</strong><br/>Maximum Duration Allowed: <strong>4 Years</strong></p>",
    eligNote: "No entrance exam score is mandatory for most UGC-DEB approved online MBA programs, though CAT/MAT/GMAT scores may qualify for fee waivers."
  },
  syllabus: {
    heading: "Online MBA *Syllabus*",
    journeyBadge: "2-Year Academic Roadmap",
    journeyTitle: "Comprehensive Management Curriculum",
    journeySubtitle: "4 Semesters covering core business fundamentals to specialized advanced topics",
    semesters: [
      { number: "01", title: "Semester 1", text: "Management Concepts, Managerial Economics, Financial Accounting, Organizational Behavior, Marketing Fundamentals" },
      { number: "02", title: "Semester 2", text: "Human Resource Management, Financial Management, Operations Research, Business Analytics, Corporate Governance" },
      { number: "03", title: "Semester 3", text: "Specialization Elective Core, Strategic Management, International Business, Project Work & Case Studies" },
      { number: "04", title: "Semester 4", text: "Advanced Specialization Electives, Business Ethics, Capstone Project & Master Thesis Defense" }
    ],
    coreTitle: "Core Management Subjects",
    coreBadge: "UGC Compliant",
    coreDescription: "Key subjects covered across all top online MBA specializations in India:",
    coreSubjects: [
      "Strategic Management",
      "Corporate Finance",
      "Digital Marketing & E-Commerce",
      "Human Resource Strategy",
      "Business Analytics & Data Science",
      "Supply Chain & Operations",
      "Consumer Behavior",
      "Leadership & Risk Management"
    ],
    note: "Syllabus may vary slightly depending on the specific university and chosen specialization."
  },
  fees: {
    heading: "Program *Fees* & Tuition",
    subHeading: "Compare tuition fees across top NAAC A+ accredited online MBA universities in India",
    col1Header: "Top Accredited Universities",
    col2Header: "Full Program Fees (Approx.)",
    rows: [
      { university: "Manipal University Online", fee: "₹1,75,000", link: "#" },
      { university: "Amity University Online", fee: "₹1,98,000", link: "#" },
      { university: "Jain University Online", fee: "₹1,60,000", link: "#" },
      { university: "NMIMS Distance & Online", fee: "₹1,96,000", link: "#" },
      { university: "Chandigarh University Online", fee: "₹1,50,000", link: "#" },
      { university: "LPU Online", fee: "₹1,40,000", link: "#" },
    ]
  },
  processFlow: {
    heading: "Online MBA Admission *Process*",
    subHeading: "Simple 5-step hassle-free online admission journey",
    steps: [
      { title: "Registration", description: "Fill out the online application form with basic personal and academic details." },
      { title: "Counseling Call", description: "Connect with expert academic advisors to clarify queries and choose specializations." },
      { title: "Document Upload", description: "Upload graduation marksheets, ID proof, and passport photo for eligibility verification." },
      { title: "Fee Payment", description: "Pay program tuition fee securely via Net Banking, Credit Card, or easy No-Cost EMI options." },
      { title: "Enrollment & LMS Access", description: "Receive official enrollment ID and immediate credentials to the University Student Portal." }
    ],
    note: "Admission is 100% online and direct based on eligibility criteria."
  },
  specializations: {
    heading: "Top Online MBA *Specializations*",
    subHeading: "In-Demand Specializations for Career Acceleration",
    items: [
      { key: "Finance Management", value: "Focuses on corporate finance, investment banking, portfolio management, and financial analysis." },
      { key: "Marketing Management", value: "Covers brand strategy, digital marketing, consumer behavior, market research, and sales strategy." },
      { key: "Human Resource Management", value: "Emphasizes talent acquisition, organizational development, corporate labor laws, and HR analytics." },
      { key: "Business Analytics", value: "Combines data science, predictive modeling, data visualization, and decision analysis." },
      { key: "Operations & Supply Chain", value: "Covers logistics, inventory management, quality assurance, project management, and global supply networks." }
    ]
  },
  validity: {
    heading: "Is Online MBA Degree *Valid?*",
    paragraphs: [
      "Yes, an Online MBA degree is 100% valid and legally recognized by UGC-DEB (University Grants Commission - Distance Education Bureau) in India.",
      "Degrees awarded through UGC-DEB approved online programs hold equal status to conventional on-campus degrees for private job roles, government job exams, and higher education abroad."
    ]
  },
  faq: {
    heading: "Frequently Asked *Questions*",
    faqs: [
      { question: "Is an Online MBA degree valid for Government jobs in India?", answer: "Yes, any Online MBA degree awarded by a UGC-DEB recognized university is fully valid for all government exams and public sector jobs." },
      { question: "What is the average salary after completing an Online MBA?", answer: "The average salary package ranges from ₹8 LPA to ₹25 LPA depending on previous work experience, university branding, and specialization." },
      { question: "Can I do an Online MBA while working full-time?", answer: "Yes! Online MBA programs are specifically designed with flexible weekend live classes and self-paced recorded lectures for working professionals." }
    ]
  }
};

export default function OnlineMbaPage() {
  return (
    <main>
      <SubHeader />
      <div id="about">
        <MbaHeroSection data={DEFAULT_FALLBACK_MBA_DATA.hero} />
        <MbaUniversitySection universities={DEFAULT_FALLBACK_MBA_DATA.universities} />
        <MBAOverview data={DEFAULT_FALLBACK_MBA_DATA.overview} />
        <KeyHighlights />
      </div>
      <div id="eligibility-duration">
        <EligibilityDuration data={DEFAULT_FALLBACK_MBA_DATA.eligibility} />
      </div>
      <div id="subject-syllabus">
        <Syllabus data={DEFAULT_FALLBACK_MBA_DATA.syllabus} />
      </div>
      <div id="program-fees">
        <FeesAndEnrollment data={DEFAULT_FALLBACK_MBA_DATA.fees} />
      </div>
      <div id="admission-procedure">
        <MbaEnrolNew data={DEFAULT_FALLBACK_MBA_DATA.processFlow} />
      </div>
      <div id="top-specializations">
        <Specializations data={DEFAULT_FALLBACK_MBA_DATA.specializations} />
      </div>
      <UgcValidity data={DEFAULT_FALLBACK_MBA_DATA.validity} />
      <OnlineVsRegular />
      <TypesOfOnlineMBA />
      <WhatDoesOnlineMBAOffer />
      <Professionals />
      <OnlineMBAFAQ data={DEFAULT_FALLBACK_MBA_DATA.faq} />
      <Footer />
    </main>
  );
}