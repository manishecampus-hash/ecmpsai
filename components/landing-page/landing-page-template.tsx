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
  MbaFinalCta,
  MbaKeyInfo,
  MbaOffers,
  MbaSpecializations,
  MbaSyllabus,
  MbaUniversities,
  MBA_SPECIALISATIONS,
  type MbaCourseData,
} from "./landing-page-mba-extras";
import { LP_REVEAL_CSS } from "./lp-ui";
import { ApplyFormStyleProvider } from "@/components/form/apply-now-modal";
import DbaGiftButton from "./dba-gift-button";
import MbaHeroForm from "./mba-hero-form";
import SubHeader from "@/components/universities/sub-header";
import { DBA_UNIVERSITIES } from "@/data/dba-universities";
import { MediaMarquee, type MediaArticle } from "@/components/home/media-marquee";
import LpFeeStructure from "./lp-fee-structure";
import LpWhyEcampus from "./lp-why-ecampus";
import { DBA_FEE_PLANS, MBA_FEE_PLANS } from "./lp-fee-data";

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
  /** "Media & Press" logos — same CMS list as the home page */
  media?: MediaArticle[];
}

export function LandingPageTemplate({ data, isPreview, mbaCourse, media }: LandingPageTemplateProps) {
  // Extra DBA-specific sections (who it's for, admission path, closing CTA)
  const isDba = /dba/i.test(data.slug || data.name || "");
  // Extra MBA-specific sections (never rendered on the DBA page)
  const isMba = !isDba && /mba/i.test(data.slug || data.name || "");
  const mba = isMba ? mbaCourse || null : null;
  // DBA / MBA pages: the form dropdowns list the programme's specialisations instead of all courses
  const formCourses = isDba ? DBA_SPECIALISATIONS : isMba ? MBA_SPECIALISATIONS : undefined;

  // Frontend content overrides for the DBA page (until they're updated in the CMS)
  const hero = data.hero && isDba
    ? {
        ...data.hero,
        mainHeading: data.hero.mainHeading.replace(/\bManoj\b/g, "Rajesh"),
        primaryCtaText: "Start Your Dr. Journey",
        secondaryCtaText: undefined, // no "Explore Universities" button
      }
    : data.hero && isMba
      ? { 
          ...data.hero, 
          credentialLabel: "UGC-Entitled Degree", 
          trustLabel: "UGC-DEB Approved",
          secondaryCtaText: undefined, // no "View Universities" button
        }
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
  // Filter out specific universities that should not be displayed
  const excludedUniversities = ['solini', 'shoolini', 'andra', 'andhra', 'sharda', 'lingayas', 'vignan', 'centurion', 'uttaranchal', 'galgotias', 'jain'];
  const mbaUniversities = (mba?.associatedUniversities || []).filter(
    (u) => u && u.name && !excludedUniversities.some(excluded => 
      u.name.toLowerCase().includes(excluded)
    )
  );
  const globalPartners = isDba
    ? {
        ...(data.globalPartners || {}),
        logos: DBA_UNIVERSITIES.map((u) => ({ id: u.slug, name: u.name, logo: u.logo })),
      }
    : isMba && mbaUniversities.length > 0
      ? {
          ...(data.globalPartners || {}),
          sectionHeading: "Top School & *University Partners*",
          sectionDescription: "Leading UGC-entitled universities that offer the Online MBA programme.",
          logos: mbaUniversities
            .filter((u) => u.logoUrl)
            .map((u) => ({ id: u.id || u.name, name: u.name.trim(), logo: u.logoUrl as string })),
        }
      : data.globalPartners;

  // Fee structure (static for now). MBA logos come from the CMS university list when the name matches.
  const MBA_LOGO_KEYS: Record<string, string> = { lpu: "lovely", "dy-patil": "patil" };
  const feePlans = isDba
    ? DBA_FEE_PLANS
    : isMba
      ? MBA_FEE_PLANS.map((plan) => {
          const key = MBA_LOGO_KEYS[plan.id] || plan.id;
          const match = (mba?.associatedUniversities || []).find(
            (u) => u?.name && u.logoUrl && u.name.toLowerCase().includes(key),
          );
          return match?.logoUrl ? { ...plan, logo: match.logoUrl } : plan;
        })
      : [];
  const hasMedia = (isDba || isMba) && (media?.length ?? 0) > 0;

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

  // In-page navigation — same sticky sub-header as the university pages.
  // Only sections that actually render on this page are listed.
  const hasCounsellors = Boolean(counsellorsSection && (counsellorsSection.counsellors?.length ?? 0) > 0);
  const hasFaq = Boolean(faqSection && (faqSection.faqs?.length ?? 0) > 0);
  const hasPartners = Boolean(globalPartners?.logos && globalPartners.logos.length > 0);
  const subHeaderItems = (
    isMba
      ? [
          hasPartners && { id: "lp-partners", label: "Partners" },
          mba && { id: "lp-overview", label: "Overview" },
          mba?.details?.specializations?.items?.length && { id: "lp-specialisations", label: "Specialisations" },
          { id: "programs", label: "Universities" },
          { id: "lp-fees", label: "Fees" },
          mba?.details?.syllabus && { id: "lp-syllabus", label: "Syllabus" },
          data.highlights && { id: "lp-compare", label: "Online vs Distance" },
          mba?.details?.processFlow?.steps?.length && { id: "lp-admission", label: "Admission" },
          { id: "lp-why-ecampus", label: "Why eCampus" },
          hasCounsellors && { id: "lp-counsellors", label: "Counsellors" },
          hasMedia && { id: "lp-media", label: "Media" },
          hasFaq && { id: "lp-faq", label: "FAQs" },
        ]
      : [
          data.highlights && { id: "lp-compare", label: "Key Highlights" },
          { id: "programs", label: "Universities" },
          isDba && { id: "lp-fees", label: "Fees" },
          isDba && { id: "lp-audience", label: "Who Can Apply" },
          experience && { id: "lp-why", label: isDba ? "Why DBA" : "Why Us" },
          isDba && { id: "lp-journey", label: "Your Path" },
          hasPartners && { id: "lp-partners", label: "Partners" },
          { id: "lp-why-ecampus", label: "Why eCampus" },
          hasCounsellors && { id: "lp-counsellors", label: "Counsellors" },
          hasMedia && { id: "lp-media", label: "Media" },
          hasFaq && { id: "lp-faq", label: "FAQs" },
        ]
  ).filter(Boolean) as { id: string; label: string }[];

  return (
    // MBA & DBA pages: every popup (Apply, Download Brochure) uses the same look as the hero form; other pages keep the default
    <ApplyFormStyleProvider value={isDba || isMba ? "lp" : "default"} courses={formCourses}>
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
        <LandingPageHero
          hero={hero}
          formCourses={formCourses}
          aside={isMba || isDba ? <MbaHeroForm courses={formCourses} /> : undefined}
        />
      )}

      {/* Sticky in-page navigation (same component & look as the university pages) */}
      <SubHeader items={subHeaderItems} spread />

      {/* MBA: partners strip, key programme info, about + recognitions — right after the hero */}
      {isMba && globalPartners?.logos && globalPartners.logos.length > 0 && (
        <div id="lp-partners" className="scroll-mt-28">
          <LandingPagePartners partners={globalPartners} footnote="UGC-Entitled University Network" />
        </div>
      )}
      {mba && (
        <div id="lp-overview" className="scroll-mt-28">
          <MbaKeyInfo course={mba} tone="muted" />
        </div>
      )}
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
        <div id="lp-specialisations" className="scroll-mt-28">
          <MbaSpecializations items={mba.details.specializations.items} tone="muted" />
        </div>
      )}

      {/* 2. Trust / Statistics — hidden for now */}

      {/* 3. Key Highlights / Comparison — shown lower down on the MBA page */}
      {!isMba && data.highlights && (
        <div id="lp-compare" className="scroll-mt-28">
          <LandingPageHighlights highlights={data.highlights} formCourses={formCourses} copy={highlightsCopy} />
        </div>
      )}

      {/* 4. Universities — MBA page lists the Online MBA universities; others keep the DBA list */}
      <div id="programs" className="scroll-mt-28">
        {isMba && mbaUniversities.length > 0 ? (
          <MbaUniversities universities={mbaUniversities} />
        ) : (
          <UniversityPrograms formCourses={formCourses} />
        )}
      </div>

      {/* MBA & DBA: fee structure (with / without immersion) right after the universities */}
      {feePlans.length > 0 && (
        <div id="lp-fees" className="scroll-mt-28">
          <LpFeeStructure
            programLabel={isDba ? "DBA" : "MBA"}
            plans={feePlans}
            formCourses={formCourses}
            heading={isDba ? "Online DBA *Fee Structure*" : "Online MBA *Fee Structure*"}
            description={`Secure your ${isDba ? "DBA" : "MBA"} seat today at special scholarship rates.`}
            tone={isMba ? "white" : "muted"}
          />
        </div>
      )}

      {/* MBA: 2-Year MBA Journey right after universities */}
      {mba?.details?.syllabus && (
        <div id="lp-syllabus" className="scroll-mt-28">
          <MbaSyllabus syllabus={mba.details.syllabus} tone="muted" />
        </div>
      )}

      {isDba && (
        <div id="lp-audience" className="scroll-mt-28">
          <DbaAudience />
        </div>
      )}

      {/* MBA: "Built for Graduates & Professionals" section removed as requested */}

      {/* MBA: "Why MBA" section removed as requested */}

      {/* MBA: Online vs Distance comparison sits lower on this page */}
      {isMba && data.highlights && (
        <div id="lp-compare" className="scroll-mt-28">
          <LandingPageHighlights highlights={data.highlights} formCourses={formCourses} copy={highlightsCopy} />
        </div>
      )}

      {isDba && (
        <div id="lp-journey" className="scroll-mt-28">
          <DbaJourney />
        </div>
      )}

      {/* MBA: Remove "Why Choose an Online MBA" section - MbaOffers removed */}
      
      {mba?.details?.processFlow?.steps && (
        <div id="lp-admission" className="scroll-mt-28">
          <MbaAdmissionJourney
            steps={mba.details.processFlow.steps}
            description={mba.details.processFlow.subHeading}
            tone="white"
          />
        </div>
      )}

      {/* 6. Global University Partners */}
      {!isMba && globalPartners?.logos && globalPartners.logos.length > 0 && (
        <div id="lp-partners" className="scroll-mt-28">
          <LandingPagePartners partners={globalPartners} />
        </div>
      )}

      {/* MBA & DBA: Why eCampus — benefits of applying through eCampus (programme-specific copy) */}
      {(isDba || isMba) && (
        <div id="lp-why-ecampus" className="scroll-mt-28">
          <LpWhyEcampus program={isDba ? "dba" : "mba"} />
        </div>
      )}

      {/* 7. Counsellors Section */}
      {counsellorsSection && (counsellorsSection.counsellors?.length ?? 0) > 0 && (
        <div id="lp-counsellors" className="scroll-mt-28">
        <LandingPageCounsellors
          counsellorsSection={counsellorsSection}
          {...(isMba
            ? {
                roleLabel: "MBA Counsellor",
                description: "Get one-on-one guidance from experienced mentors to choose the right university and specialisation.",
              }
            : {})}
        />
        </div>
      )}

      {/* 8. Top Placement Partners (Dynamic from Admin) — not shown on the DBA page */}
      {!isDba && data.placementPartners?.logos && data.placementPartners.logos.length > 0 && (
        <LandingPagePlacementPartners placementPartners={data.placementPartners} />
      )}

      {/* Media & Press — same strip as the home page */}
      {hasMedia && (
        <div id="lp-media" className="scroll-mt-28 bg-white pb-8 pt-2 sm:pb-11">
          <MediaMarquee articles={media} className="" />
        </div>
      )}

      {/* 9. FAQ Section */}
      {faqSection && (faqSection.faqs?.length ?? 0) > 0 && (
        <div id="lp-faq" className="scroll-mt-28">
          <LandingPageFaq faqSection={faqSection} formCourses={formCourses} />
        </div>
      )}

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
