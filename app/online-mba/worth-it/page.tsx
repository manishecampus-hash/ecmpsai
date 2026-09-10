import { Footer } from "@/components/layout/footer";
import WorthIt from "@/components/online-mba/worth-it/worth-it";
import WorthItFAQ from "@/components/online-mba/worth-it/worth-it-faq";
import SubHeader from "@/components/subheader/sub-header";

const STATIC_ONLINE_MBA_WORTH_IT_DATA = {
  heading: "Is *Online MBA* Worth It?",
  introText:
    "Pursuing an online MBA course can be a valuable investment depending on your personal goals, career aspirations, and learning preferences. Here are some reasons why it might be worth pursuing:",
  demandHeading: "Demand & Growth Overview",
  demandStats: [
    { label: "Growing Market", value: "30%" },
    { label: "Flexibility", value: "75%" },
    { label: "Career Benefits", value: "55%" },
    { label: "Specialization Options", value: "70–80%" },
  ],
  reasons: [
    {
      title: "Convenience",
      description:
        "An online MBA program enables learners to pursue their studies around a flexible schedule, offering resources and recorded sessions alongside scheduled live classes depending on their convenience.",
      icon: "Clock",
    },
    {
      title: "Global Reach",
      description:
        "Internet access lets you get top university coursework from locations throughout the world, even if you don't move.",
      icon: "Globe",
    },
    {
      title: "Lower Costs",
      description:
        "Online MBA programs usually cost less than their conventional on-campus equivalents due to their reduced expenses.",
      icon: "Wallet",
    },
    {
      title: "Study While Working",
      description:
        "Working students can pursue their MBA studies through online programs so they can maintain their current employment.",
      icon: "Briefcase",
    },
    {
      title: "Leadership and Managerial Skills",
      description:
        "An MBA provides students with essential leadership abilities together with managerial competencies that enable them to advance in their careers.",
      icon: "Award",
    },
    {
      title: "Specializations",
      description:
        "The program allows students to select an academic focus that develops their skills in a particular field of expertise.",
      icon: "Target",
    },
    {
      title: "Innovative Learning Methods",
      description:
        "The learning experience improves through online programs because they adopt state-of-the-art technological solutions.",
      icon: "Sparkles",
    },
    {
      title: "Increased Earning Potential",
      description:
        "Professional leaders almost universally consider the Master of Business Administration their top qualification to reach executive positions.",
      icon: "TrendingUp",
    },
  ],
  gmacHighlight:
    "As per GMAC (Graduate Management Admission Council), MBA graduates typically earn a 77% higher median salary compared to bachelor's degree holders, along with stronger promotion rates and long-term career mobility.",
};

async function getWorthItData() {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/root-courses/online-mba`, { cache: "no-store" });
    if (res.ok) {
      const course = await res.json();
      const sh = course?.subHeaders?.find(
        (s: any) =>
          s.template === "worth_it" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "worth-it" ||
          (s.url || "").replace(/^\/+|\/+$/g, "").toLowerCase() === "is-it-worth-it"
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
    console.error("Failed to fetch worth it data for online-mba:", err);
  }
  return null;
}

export default async function OnlineMbaPage() {
  const info = await getWorthItData();
  const data = info?.templateData || STATIC_ONLINE_MBA_WORTH_IT_DATA;

  return (
    <main>
      <SubHeader subHeaders={info?.subHeaders} courseSlug="online-mba" />
      <WorthIt data={data} title={info?.title} />
      <WorthItFAQ />
      <Footer />
    </main>
  );
}