import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApplicationFlow } from "@/data/application-flows";
import { ApplicationProvider } from "@/components/application-flow/application-context";
import { buildApplicationProgram } from "@/components/application-flow/build-program";

interface ApplyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function fetchUniversity(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/universities/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const text = await res.text();
    return text.trim() ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Failed to fetch university for application flow:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flow = getApplicationFlow(slug);
  const university = flow ? await fetchUniversity(slug) : null;
  return {
    title: university?.name ? `Apply – ${flow?.programName} | ${university.name} | eCampus` : "Application | eCampus",
    // Personal application pages shouldn't appear in search results
    robots: { index: false, follow: false },
  };
}

// Shared by the landing, details and payment screens so the application state survives navigation.
export default async function ApplyLayout({ children, params }: ApplyLayoutProps) {
  const { slug } = await params;
  const flow = getApplicationFlow(slug);
  if (!flow) notFound();

  const university = await fetchUniversity(slug);
  if (!university) notFound();

  return <ApplicationProvider program={buildApplicationProgram(slug, flow, university)}>{children}</ApplicationProvider>;
}
