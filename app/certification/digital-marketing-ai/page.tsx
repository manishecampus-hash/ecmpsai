import { Metadata } from "next";
import DigitalMarketingAiLanding from "@/components/certification/DigitalMarketingAiLanding";

export const metadata: Metadata = {
  title: "Digital Marketing & AI Certification | Executive Professional Program | Ecampus",
  description:
    "Master Generative AI marketing architectures, algorithmic performance marketing, semantic SEO, and MarTech automation with Ecampus Swiss & Global Dual Certification.",
  keywords: [
    "Digital Marketing & AI Certification",
    "Digital Marketing Certification",
    "AI Marketing Course",
    "Performance Marketing Course",
    "Generative AI Marketing",
    "Ecampus Certification",
    "Executive Specialization",
  ],
  openGraph: {
    title: "Digital Marketing & AI Certification | Ecampus",
    description:
      "Master Generative AI marketing architectures, algorithmic performance marketing, and semantic SEO with Ecampus Dual Certification.",
    type: "website",
    url: "https://www.ecampusapp.com/certification/digital-marketing-ai",
  },
  alternates: {
    canonical: "/certification/digital-marketing-ai",
  },
};

export default function DigitalMarketingAiOverviewPage() {
  return <DigitalMarketingAiLanding />;
}
