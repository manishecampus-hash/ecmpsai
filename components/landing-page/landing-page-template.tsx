import React from "react";
import { Footer } from "@/components/layout/footer";
import UniversityPrograms from "@/components/online-dba/university-programs";
import LandingPageHero, { LandingPageHeroData } from "./landing-page-hero";
import type { LandingPageStatisticItem } from "./landing-page-stats";
import LandingPageHighlights, { LandingPageHighlightsData } from "./landing-page-highlights";
import LandingPageExperience, { LandingPageExperienceData } from "./landing-page-experience";
import LandingPagePartners, { LandingPageGlobalPartnersData } from "./landing-page-partners";
import LandingPageCounsellors, { LandingPageCounsellorsData } from "./landing-page-counsellors";
import LandingPagePlacementPartners, { LandingPagePlacementPartnersData } from "./landing-page-placement-partners";
import LandingPageFaq, { LandingPageFaqData } from "./landing-page-faq";
import { DBA_SPECIALISATIONS, DbaAudience, DbaFinalCta, DbaJourney } from "./landing-page-dba-extras";
import { LP_REVEAL_CSS } from "./lp-ui";

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
  // Extra DBA-specific sections (who it's for, admission path, closing CTA)
  const isDba = /dba/i.test(data.slug || data.name || "");
  // DBA page: the Apply form's dropdown lists DBA specialisations instead of all courses
  const formCourses = isDba ? DBA_SPECIALISATIONS : undefined;

  // Frontend content overrides for the DBA page (until they're updated in the CMS)
  const hero = data.hero && isDba
    ? {
        ...data.hero,
        mainHeading: data.hero.mainHeading.replace(/\bManoj\b/g, "Rajesh"),
        primaryCtaText: "Start Your Dr. Journey",
      }
    : data.hero;
  const experience = data.slug === "online-dba" && data.experience
    ? { ...data.experience, sectionHeading: "Make Your Experience *Worth It*" }
    : data.experience;
  const COUNSELLOR_NAMES = ["Harsh Sharma", "Vishal Kumar"];
  const counsellorsSection = data.counsellorsSection && isDba
    ? {
        ...data.counsellorsSection,
        counsellors: data.counsellorsSection.counsellors?.map((c, i) => ({
          ...c,
          name: COUNSELLOR_NAMES[i] ?? c.name,
        })),
      }
    : data.counsellorsSection;

  return (
    <>
      <style>{LP_REVEAL_CSS}</style>

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
      {hero && <LandingPageHero hero={hero} formCourses={formCourses} />}

      {/* 2. Trust / Statistics — hidden for now */}

      {/* 3. Key Highlights / Comparison */}
      {data.highlights && <LandingPageHighlights highlights={data.highlights} formCourses={formCourses} />}

      {/* 4. Programs From Top Online Universities (Static as requested) */}
      <div id="programs">
        <UniversityPrograms formCourses={formCourses} />
      </div>

      {isDba && <DbaAudience />}

      {/* 5. Experience / Benefits Section */}
      {experience && <LandingPageExperience experience={experience} />}

      {isDba && <DbaJourney />}

      {/* 6. Global University Partners */}
      {data.globalPartners?.logos && data.globalPartners.logos.length > 0 && (
        <LandingPagePartners partners={data.globalPartners} />
      )}

      {/* 7. Counsellors Section */}
      {counsellorsSection && (
        <LandingPageCounsellors counsellorsSection={counsellorsSection} />
      )}

      {/* 8. Top Placement Partners (Dynamic from Admin) */}
      {data.placementPartners?.logos && data.placementPartners.logos.length > 0 && (
        <LandingPagePlacementPartners placementPartners={data.placementPartners} />
      )}

      {/* 9. FAQ Section */}
      {data.faqSection && <LandingPageFaq faqSection={data.faqSection} formCourses={formCourses} />}

      {isDba && <DbaFinalCta />}

      {/* 10. Footer */}
      <Footer />
    </>
  );
}

export default LandingPageTemplate;
