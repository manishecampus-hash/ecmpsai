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
import {
  MbaAboutWhy,
  MbaAdmissionJourney,
  MbaAudienceSection,
  MbaFinalCta,
  MbaKeyInfo,
  MbaOffers,
  MbaSpecializations,
  MbaSyllabus,
  MbaUniversities,
  type MbaCourseData,
} from "./landing-page-mba-extras";
import { LP_REVEAL_CSS } from "./lp-ui";
import { ApplyFormStyleProvider } from "@/components/form/apply-now-modal";
import DbaGiftButton from "./dba-gift-button";
import MbaHeroForm from "./mba-hero-form";
import { DBA_UNIVERSITIES } from "@/data/dba-universities";

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
  /** Online MBA course content from the CMS — only passed for MBA landing pages */
  mbaCourse?: MbaCourseData | null;
}

export function LandingPageTemplate({ data, isPreview, mbaCourse }: LandingPageTemplateProps) {
  // Extra DBA-specific sections (who it's for, admission path, closing CTA)
  const isDba = /dba/i.test(data.slug || data.name || "");
  // Extra MBA-specific sections (never rendered on the DBA page)
  const isMba = !isDba && /mba/i.test(data.slug || data.name || "");
  const mba = isMba ? mbaCourse || null : null;
  // DBA page: the Apply form's dropdown lists DBA specialisations instead of all courses
  const formCourses = isDba ? DBA_SPECIALISATIONS : undefined;

  // Frontend content overrides for the DBA page (until they're updated in the CMS)
  const hero = data.hero && isDba
    ? {
        ...data.hero,
        mainHeading: data.hero.mainHeading.replace(/\bManoj\b/g, "Rajesh"),
        primaryCtaText: "Start Your Dr. Journey",
      }
    : data.hero && isMba
      ? { ...data.hero, credentialLabel: "UGC-Entitled Degree", trustLabel: "UGC-DEB Approved" }
      : data.hero;
  const experience = data.slug === "online-dba" && data.experience
    ? { ...data.experience, sectionHeading: "Make Your Experience *Worth It*" }
    : isMba && data.experience
      ? {
          ...data.experience,
          // "campus fairs" doesn't apply to an online programme
          cards: data.experience.cards?.map((c) =>
            /campus fair/i.test(c.description || "")
              ? { ...c, description: "Companies that hire through the universities' placement support." }
              : c,
          ),
        }
      : data.experience;
  // DBA counsellors (name, photo and experience); rating & students counselled still come from the CMS
  const DBA_COUNSELLORS = [
    {
      name: "Priya Verma",
      image: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/Priya.png",
      experience: "7+ Yrs. Experience",
    },
    {
      name: "Prithvi Kumar",
      image: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/shivi.png",
      experience: "2+ Yrs. Experience",
    },
  ];
  const counsellorsSection = data.counsellorsSection && isDba
    ? {
        ...data.counsellorsSection,
        counsellors: data.counsellorsSection.counsellors?.map((c, i) => ({
          ...c,
          ...(DBA_COUNSELLORS[i] ?? {}),
        })),
      }
    : data.counsellorsSection;

  // DBA page: the partner strip shows only the universities featured in "Top Online Universities"
  // MBA page: the logos of the universities offering the Online MBA
  const mbaUniversities = (mba?.associatedUniversities || []).filter((u) => u && u.name);
  const globalPartners = isDba
    ? {
        ...(data.globalPartners || {}),
        logos: DBA_UNIVERSITIES.map((u) => ({ id: u.slug, name: u.name, logo: u.logo })),
      }
    : isMba && mbaUniversities.length > 0
      ? {
          ...(data.globalPartners || {}),
          sectionDescription: "Leading UGC-entitled universities that offer the Online MBA programme.",
          logos: mbaUniversities
            .filter((u) => u.logoUrl)
            .map((u) => ({ id: u.id || u.name, name: u.name.trim(), logo: u.logoUrl as string })),
        }
      : data.globalPartners;

  // MBA page: CMS FAQs first, then the course FAQs (no duplicates)
  const faqSection = isMba && mba?.details?.supportDesk?.faqs?.length
    ? (() => {
        const base = data.faqSection?.faqs || [];
        const seen = new Set(base.map((f) => f.question.trim().toLowerCase()));
        const extra = mba.details!.supportDesk!.faqs!
          .filter((f) => f?.question && !seen.has(f.question.trim().toLowerCase()))
          .map((f, i) => ({ id: `course-faq-${i}`, question: f.question, answer: f.answer }));
        return { ...(data.faqSection || {}), faqs: [...base, ...extra] };
      })()
    : data.faqSection;

  // Page-specific wording for shared sections
  const highlightsCopy = isMba
    ? {
        leadSubtitle: "Live, interactive & flexible",
        otherSubtitle: "Self-paced study material",
        otherShort: "Self-paced",
        promptText: "Not sure which MBA fits your goals?",
        promptCta: "Talk to an MBA Counsellor",
      }
    : undefined;

  return (
    // DBA page: Apply popups use the eCampus Assured design; other pages keep the default
    <ApplyFormStyleProvider value={isDba ? "assured" : "default"}>
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
      {hero && (
        <LandingPageHero hero={hero} formCourses={formCourses} aside={isMba ? <MbaHeroForm /> : undefined} />
      )}

      {/* MBA: partners strip, key programme info, about + recognitions — right after the hero */}
      {isMba && globalPartners?.logos && globalPartners.logos.length > 0 && (
        <LandingPagePartners partners={globalPartners} footnote="UGC-Entitled University Network" />
      )}
      {mba && <MbaKeyInfo course={mba} tone="muted" />}
      {mba && (
        <MbaAboutWhy
          course={mba}
          universityCount={mbaUniversities.length}
          specializationCount={mba.details?.specializations?.items?.length || 0}
          tone="white"
        />
      )}
      {/* MBA: specialisations & careers right after "Recognised & Trusted" */}
      {mba?.details?.specializations?.items && (
        <MbaSpecializations items={mba.details.specializations.items} tone="muted" />
      )}

      {/* 2. Trust / Statistics — hidden for now */}

      {/* 3. Key Highlights / Comparison — shown lower down on the MBA page */}
      {!isMba && data.highlights && (
        <LandingPageHighlights highlights={data.highlights} formCourses={formCourses} copy={highlightsCopy} />
      )}

      {/* 4. Universities — MBA page lists the Online MBA universities; others keep the DBA list */}
      <div id="programs">
        {isMba && mbaUniversities.length > 0 ? (
          <MbaUniversities universities={mbaUniversities} />
        ) : (
          <UniversityPrograms formCourses={formCourses} />
        )}
      </div>

      {isDba && <DbaAudience />}

      {/* MBA: graduates vs working professionals */}
      {mba && <MbaAudienceSection tone="muted" />}

      {/* 5. Experience / Benefits Section */}
      {experience && <LandingPageExperience experience={experience} />}

      {/* MBA: Online vs Distance comparison sits lower on this page */}
      {isMba && data.highlights && (
        <LandingPageHighlights highlights={data.highlights} formCourses={formCourses} copy={highlightsCopy} />
      )}

      {isDba && <DbaJourney />}

      {/* MBA: what an online MBA offers, semester-wise journey, admission steps */}
      {mba?.details?.courseOffer?.categories && <MbaOffers categories={mba.details.courseOffer.categories} tone="white" />}
      {mba?.details?.syllabus && <MbaSyllabus syllabus={mba.details.syllabus} tone="muted" />}
      {mba?.details?.processFlow?.steps && (
        <MbaAdmissionJourney
          steps={mba.details.processFlow.steps}
          description={mba.details.processFlow.subHeading}
          tone="white"
        />
      )}

      {/* 6. Global University Partners */}
      {!isMba && globalPartners?.logos && globalPartners.logos.length > 0 && (
        <LandingPagePartners partners={globalPartners} />
      )}

      {/* 7. Counsellors Section */}
      {counsellorsSection && (
        <LandingPageCounsellors
          counsellorsSection={counsellorsSection}
          {...(isMba
            ? {
                roleLabel: "MBA Counsellor",
                description: "Get one-on-one guidance from experienced mentors to choose the right university and specialisation.",
              }
            : {})}
        />
      )}

      {/* 8. Top Placement Partners (Dynamic from Admin) — not shown on the DBA page */}
      {!isDba && data.placementPartners?.logos && data.placementPartners.logos.length > 0 && (
        <LandingPagePlacementPartners placementPartners={data.placementPartners} />
      )}

      {/* 9. FAQ Section */}
      {faqSection && <LandingPageFaq faqSection={faqSection} formCourses={formCourses} />}

      {isDba && <DbaFinalCta />}
      {isMba && <MbaFinalCta />}

      {/* 10. Footer */}
      <Footer />

      {/* DBA page: floating gift button (bottom-left) opens the Apply form */}
      {isDba && <DbaGiftButton courses={formCourses} />}
    </ApplyFormStyleProvider>
  );
}

export default LandingPageTemplate;
