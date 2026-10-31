import type { Metadata } from "next";
import RevealObserver from "@/components/about/reveal-observer";
import CompareHero from "@/components/compare/compare-hero";
import ComparisonCards from "@/components/compare/comparison-cards";
import ComparePickerHost from "@/components/compare/compare-picker-host";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Compare Universities Side by Side | eCampus",
  description:
    "Compare online universities and global business schools on fees, approvals, duration and placements, then get a detailed AI breakdown from eCampus.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <article className="overflow-hidden bg-white text-gray-900">
        <CompareHero />
        <ComparisonCards />
      </article>
      <ComparePickerHost />
      <RevealObserver />
      <Footer />
    </>
  );
}
