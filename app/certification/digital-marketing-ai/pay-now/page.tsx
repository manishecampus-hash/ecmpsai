import { Metadata } from "next";
import CertificationEnrollment from "@/components/certification/CertificationEnrollment";

export const metadata: Metadata = {
  title: "Digital Marketing & AI Certification | Ecampus Executive Enrollment",
  description:
    "Enroll in the accredited Digital Marketing & AI Certification at Ecampus. Master Generative AI, Performance Marketing, MarTech Automation and capstone projects.",
  keywords: [
    "Digital Marketing Certification",
    "AI Marketing Course",
    "Ecampus AI Certification",
    "Executive Specialization",
    "Digital Marketing & AI Certification",
    "Pay Now",
  ],
  openGraph: {
    title: "Digital Marketing & AI Certification | Ecampus",
    description:
      "Join the Fall 2026 cohort for the accredited Digital Marketing & AI Executive Certification.",
    type: "website",
  },
};

export default function DigitalMarketingAiPayNowPage() {
  return <CertificationEnrollment initialSlug="digital-marketing-ai/pay-now" />;
}
