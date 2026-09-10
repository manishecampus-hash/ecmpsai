import { Footer } from "@/components/layout/footer";
import CareerScope from "@/components/online-mba/career-scope/career-scope";
import CareerScopeFAQ from "@/components/online-mba/career-scope/career-scope-faq";
import SubHeader from "@/components/subheader/sub-header";

const STATIC_ONLINE_MBA_CAREER_SCOPE_DATA = {
  heading: "Job Opportunity after *Online MBA*",
  introText:
    "Aspirants can take several job opportunities from the course; thereof, there are several job roles available with their estimated data. Go through it in detail, which will help you learn about further opportunities.",
  disclaimer:
    "*The salary is estimated, and the data can be derived from Naukri or Glassdoor.",
  jobRolesTableTitle: "Job Roles Overview",
  jobRolesCol1: "Job Role",
  jobRolesCol2: "Wages in INR (annually)",
  jobRoles: [
    { role: "Portfolio manager", salary: "3 LPA to 37.2 LPA" },
    { role: "Consultant", salary: "4.2 LPA to 25.3 LPA" },
    { role: "Business development manager", salary: "3.1 LPA to 15.8 LPA" },
    { role: "Security/investment analyst", salary: "3 LPA to 10.9 LPA" },
    { role: "Finance manager", salary: "3.5 LPA to 37 LPA" },
    { role: "Marketing Manager", salary: "2.2 LPA to 25.5 LPA" },
    { role: "Project manager", salary: "5 LPA to 30 LPA" },
    { role: "Management consultant", salary: "4.6 LPA to 37.5 LPA" },
    { role: "Investment banker", salary: "2.4 LPA to 52.3 LPA" },
    { role: "Business operations manager", salary: "4 LPA to 31.5 LPA" },
  ],
  recruitersHeading: "Top Recruiters",
  recruitersIntro:
    "Multiple top recruiters of top MNCs hire course graduates and offer competitive packages.",
  recruitersTableTitle: "Top Hiring Companies",
  recruitersCol1: "Company",
  recruitersCol2: "Salary Packages (yearly, in INR)",
  recruiters: [
    { company: "ICICI Lombard", salary: "39 lakhs to 44.2 lakhs" },
    { company: "Mphasis", salary: "2 lakhs to 106 lakhs" },
    { company: "Airtel", salary: "4.5 lakhs to 22.2 lakhs" },
    { company: "IndiaMART", salary: "3.2 lakhs to 16.9 lakhs" },
    { company: "NIIT", salary: "2.5 lakhs to 39.3 lakhs" },
    { company: "Coforge", salary: "24.5 lakhs to 44.2 lakhs" },
    { company: "EY", salary: "0.7 lakhs to 29 lakhs" },
    { company: "Amazon", salary: "1.5 lakhs to 34 lakhs" },
    { company: "Accenture", salary: "2 lakhs to 10.6 lakhs" },
  ],
  bottomNote:
    "Salary figures shown above are estimated and sourced from job platforms. Actual packages may vary based on experience and specialization.",
};

async function getCareerScopeData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "career_scope" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "career-scope" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "job-opportunities"
      );
      if (sh) {
        return {
          templateData: sh.templateData,
          title: sh.title,
          subHeaders: course?.subHeaders,
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch career scope data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaCareerScopePage() {
  const info = await getCareerScopeData();
  const data = info?.templateData || STATIC_ONLINE_MBA_CAREER_SCOPE_DATA;

  return (
    <main>
      <SubHeader subHeaders={info?.subHeaders} courseSlug="online-mba" />
      <CareerScope data={data} title={info?.title} />
      <CareerScopeFAQ />
      <Footer />
    </main>
  );
}