"use client";

import React from "react";
import { Footer } from "@/components/layout/footer";
import UniversityPrograms from "@/components/online-dba/university-programs";
import LandingPageHero, { LandingPageHeroData } from "./landing-page-hero";
import LandingPageStats, { LandingPageStatisticItem } from "./landing-page-stats";
import LandingPageHighlights, { LandingPageHighlightsData } from "./landing-page-highlights";
import LandingPageExperience, { LandingPageExperienceData } from "./landing-page-experience";
import LandingPagePartners, { LandingPageGlobalPartnersData } from "./landing-page-partners";
import LandingPageCounsellors, { LandingPageCounsellorsData } from "./landing-page-counsellors";
import LandingPagePlacementPartners, { LandingPagePlacementPartnersData } from "./landing-page-placement-partners";
import LandingPageFaq, { LandingPageFaqData } from "./landing-page-faq";

export interface LandingPageData {
  id?: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  hero?: LandingPageHeroData;
  statistics?: LandingPageStatisticItem[];
  highlights?: LandingPageHighlightsData;
  experience?: LandingPageExperienceData;
  globalPartners?: LandingPageGlobalPartnersData;
  counsellorsSection?: LandingPageCounsellorsData;
  placementPartners?: LandingPagePlacementPartnersData;
  faqSection?: LandingPageFaqData;
}

interface LandingPageTemplateProps {
  data: LandingPageData;
  isPreview?: boolean;
}

export function LandingPageTemplate({ data, isPreview }: LandingPageTemplateProps) {
  return (
    <>
      {/* Preview Bar Banner if in preview mode */}
      {isPreview && (
        <div className="sticky top-16 z-50 flex items-center justify-between bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <span>PREVIEW MODE: Showing unpublished draft for &ldquo;{data.name}&rdquo;</span>
          </div>
          <span className="rounded bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">
            Status: {data.status}
          </span>
        </div>
      )}

      {/* 1. Hero Section */}
      {data.hero && (
        <LandingPageHero
          hero={data.hero}
          onCtaClick={() => {
            window.dispatchEvent(new CustomEvent("open-signup"));
          }}
        />
      )}

      {/* 2. Trust / Statistics */}
      {data.statistics && <LandingPageStats stats={data.statistics} />}

      {/* 3. Key Highlights / Comparison */}
      {data.highlights && <LandingPageHighlights highlights={data.highlights} />}

      {/* 4. Programs From Top Online Universities (Static as requested) */}
      <div id="programs">
        <UniversityPrograms />
      </div>

      {/* 5. Experience / Benefits Section */}
      {data.experience && <LandingPageExperience experience={data.experience} />}

      {/* 6. Global University Partners */}
      {data.globalPartners?.logos && data.globalPartners.logos.length > 0 && (
        <LandingPagePartners partners={data.globalPartners} />
      )}

      {/* 7. Counsellors Section */}
      {data.counsellorsSection && (
        <LandingPageCounsellors counsellorsSection={data.counsellorsSection} />
      )}

      {/* 8. Top Placement Partners (Dynamic from Admin) */}
      {data.placementPartners?.logos && data.placementPartners.logos.length > 0 && (
        <LandingPagePlacementPartners placementPartners={data.placementPartners} />
      )}

      {/* 9. FAQ Section */}
      {data.faqSection && <LandingPageFaq faqSection={data.faqSection} />}

      {/* 10. Footer */}
      <Footer />
    </>
  );
}

export default LandingPageTemplate;
