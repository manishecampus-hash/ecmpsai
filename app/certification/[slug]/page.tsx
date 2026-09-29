import { redirect } from "next/navigation";
import { Metadata } from "next";
import CertificationEnrollment from "@/components/certification/CertificationEnrollment";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return {
    title: "Digital Marketing & AI Certification | Ecampus Executive Enrollment",
    description:
      "Enroll in the accredited Digital Marketing & AI Certification at Ecampus.",
  };
}

export default async function CertificationDynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug || "");

  if (decoded === "dm&ai" || decoded === "digital-marketing-ai") {
    redirect("/certification/digital-marketing-ai/pay-now");
  }

  return <CertificationEnrollment initialSlug={decoded} />;
}
