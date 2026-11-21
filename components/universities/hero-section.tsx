"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ApplyNowModal } from "@/components/form/apply-now-modal";
import { getApplicationFlow, toUniversitySlug } from "@/data/application-flows";
import { useAuth } from "@/components/auth/auth-context";
import { SignupModal } from "@/components/layout/signup-modal";
import { LoginModal } from "@/components/layout/login-modal";
import {
  Star,
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
  Download,
  MapPin,
  Volume2,
  Sparkles,
  Award,
  Building2,
  CheckCircle2,
  Share2,
  ExternalLink,
  Compass,
  GraduationCap,
  Briefcase,
} from "lucide-react";

type Badge = { alt: string; src?: string; label?: string };

type Props = {
  heroImage?: string;
  logoSrc?: string;
  title?: string;
  badges?: Badge[];
  rating?: number;
  reviews?: number;
  trustedText?: string;
  onApplyHref?: string;
  onTalkHref?: string;
  university?: any;
};

// Map normalized icon strings to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  bookopen: BookOpen,
  clock: Clock,
  globe: Globe,
  users: Users,
  shield: Shield,
  download: Download,
  building2: Building2,
  award: Award,
  sparkles: Sparkles,
  mappin: MapPin,
  pincodes: MapPin,
  graduationcap: GraduationCap,
  briefcase: Briefcase,
  learners: Users,
  countries: Globe,
  years: Clock,
  alumni: GraduationCap,
  recruiters: Building2,
};

const renderPointerIcon = (iconStr: string, alt: string) => {
  if (!iconStr) {
    return <BookOpen className="h-4.5 w-4.5" />;
  }

  const normalized = iconStr.toLowerCase().replace(/[^a-z0-9]/g, "");
  const LucideIcon = iconMap[normalized] || iconMap[alt.toLowerCase().replace(/[^a-z0-9]/g, "")];

  if (LucideIcon) {
    return <LucideIcon className="h-4.5 w-4.5" />;
  }

  if (
    iconStr.startsWith("http") ||
    iconStr.startsWith("/") ||
    iconStr.includes(".")
  ) {
    return (
      <img
        src={iconStr}
        alt={alt}
        className="h-4.5 w-4.5 object-contain"
      />
    );
  }

  return <BookOpen className="h-4.5 w-4.5" />;
};

export default function UniversityHeroWithStats({
  heroImage = "/newuniversities/amitybanner.webp",
  logoSrc = "/ggubanner/amityu.png",
  title = "Golden Gate University",
  badges = [
    { alt: "Seal", src: "/ggubanner/aiu-logo.jpg", label: "" },
    { alt: "WES", src: "/ggubanner/wes-logo.jpg", label: "" },
    { alt: "AACSB", src: "/ggubanner/3rd.webp", label: "" },
    { alt: "More", src: undefined, label: "MORE" },
  ],
  rating = 4.8,
  reviews = 44,
  trustedText = "Trusted by 10,000+ learners",
  university,
}: Props) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const isUserLoggedIn = () => {
    if (isAuthenticated || Boolean(user)) return true;
    try {
      const raw = localStorage.getItem("ecampus_student");
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return Boolean(parsed && (parsed.id || parsed.phone || parsed.email));
    } catch {
      return false;
    }
  };

  const handleKivoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUserLoggedIn()) {
      router.push("/dashboard");
    } else {
      setShowSignupModal(true);
    }
  };

  // Universities with the online application flow open it; the rest keep the quick form
  const universitySlug = toUniversitySlug(university?.slug);
  const applyHref = getApplicationFlow(universitySlug) ? `/universities/${universitySlug}/apply` : null;

  // Extract database fields with clean fallbacks
  const banner = university?.details?.banner || {};
  const bannerHeading = banner.heading || university?.name || title;
  const bannerSubheading = banner.subheading || "";
  const bannerLocation = university?.location || "India";
  const bannerLogo = banner.icon || university?.logoUrl || logoSrc;
  const bannerBg = banner.image || heroImage || "/ggubanner/ggubnr.webp";

  const bannerRating =
    banner.rating !== undefined ? Number(banner.rating) : rating;
  const bannerReviews =
    banner.reviewsCount !== undefined ? Number(banner.reviewsCount) : reviews;
  const bannerTrustedText = banner.trustedText || trustedText;
  const bannerTrustedIcon = banner.trustedIcon || "";

  // Comparison section
  const compareData = banner.compareSection;
  const compareHeading =
    compareData?.heading && compareData.heading !== "Compare Universities with AI"
      ? compareData.heading
      : "Compare with Kivo AI";
  const compareSubheading =
    compareData?.subheading || "Evaluate programs side-by-side with peer institutions.";
  const compareLogos = (compareData?.logos || []).filter(
    (logo: string) => logo && logo.trim() !== ""
  );
  const showCompareSection = compareLogos.length > 0;

  // Accreditations & Badges
  const dbLogos: string[] = (banner.accreditationLogos || []).filter(
    (logo: string) => logo && logo.trim() !== ""
  );

  const dynamicBadges =
    dbLogos.length > 0
      ? dbLogos.map((logo: string, idx: number) => ({
        alt: `Accreditation Logo ${idx + 1}`,
        src: logo,
        label: "",
      }))
      : badges.filter((b) => b.src);

  // Key Highlight Pointers
  const pointers = banner.pointers || {};
  const pointersTitle = pointers.title || `${university?.name || title}`;
  const pointersItems =
    pointers.items && pointers.items.length > 0
      ? pointers.items
      : [
        {
          mainText: "100+",
          heading: "Programs",
          subheading: "Diverse specializations",
          icon: "BookOpen",
        },
        {
          mainText: "75+",
          heading: "Years of Legacy",
          subheading: "Experience & excellence",
          icon: "Clock",
        },
        {
          mainText: "Global",
          heading: "Community",
          subheading: "Diverse student body",
          icon: "Globe",
        },
        {
          mainText: "Career",
          heading: "Focused",
          subheading: "Job-ready learning",
          icon: "Users",
        },
      ];

  // CTA button labels (no static fallback buttons when empty in admin)
  const primaryCtaText = (banner.ctas?.[0]?.buttonText || "").trim();
  const secondaryCtaText = (banner.ctas?.[1]?.buttonText || "").trim();
  const hasAnyCta = Boolean(primaryCtaText || secondaryCtaText);

  const scrollToCourses = () => {
    const el =
      document.getElementById("courses") ||
      document.getElementById("programs") ||
      document.getElementById("university-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToApprovals = () => {
    const el =
      document.getElementById("approvals") ||
      document.getElementById("accreditations") ||
      document.getElementById("courses");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Approval ribbon badges — rendered beside the logo
  const ribbonBadges = (
    <>
      {/* UGC Approved Toggle Badge */}
      {university?.ugcApproval !== false && (
        <span className="inline-flex items-center gap-[3px] sm:gap-1.5 rounded-full bg-red-50 text-[#ea384c] border border-red-200/80 px-1.5 py-0.5 text-[clamp(9px,2.6vw,10px)] font-semibold tracking-normal sm:tracking-wide sm:px-3 sm:py-1 sm:text-xs">
          <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ea384c]" />
          <span>UGC Approved</span>
        </span>
      )}

      {/* NIRF Ranked Toggle Badge */}
      {(university?.nirfRanked ?? (Boolean(university?.nirfRanking && university?.nirfRanking.trim() !== ""))) ? (
        <span className="inline-flex items-center gap-[3px] sm:gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-1.5 py-0.5 text-[clamp(9px,2.6vw,10px)] font-semibold tracking-normal sm:tracking-wide sm:px-3 sm:py-1 sm:text-xs">
          <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500" />
          <span>NIRF Ranked {university?.nirfRanking ? `(#${university.nirfRanking.replace(/^#/, "")})` : ""}</span>
        </span>
      ) : null}

      {/* WES Approved Toggle Badge */}
      {university?.wesApproval && (
        <span className="inline-flex items-center gap-[3px] sm:gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-1.5 py-0.5 text-[clamp(9px,2.6vw,10px)] font-semibold tracking-normal sm:tracking-wide sm:px-3 sm:py-1 sm:text-xs">
          <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500" />
          <span>WES Recognized</span>
        </span>
      )}

      {/* EMI Facility Toggle Badge */}
      {university?.emiFacility && (
        <span className="inline-flex items-center gap-[3px] sm:gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-1.5 py-0.5 text-[clamp(9px,2.6vw,10px)] font-semibold tracking-normal sm:tracking-wide sm:px-3 sm:py-1 sm:text-xs">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500" />
          <span>EMI Available</span>
        </span>
      )}
    </>
  );

  return (
    <header className="relative w-full bg-slate-50/50 pb-8 sm:pb-12 lg:pb-14">
      {/* ── 1. Hero Cover Banner ── */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={bannerBg}
          alt={banner?.imageAlt || `${bannerHeading} Campus Cover`}
          className="h-full w-full object-cover object-center opacity-85 transition-transform duration-700 hover:scale-102"
        />

        {/* Soft cinematic dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/20" />

      </div>

      {/* ── 2. Floating Crisp & Executive Identity Card ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24 lg:-mt-28 z-20">
          <div className="rounded-3xl bg-white p-5 sm:p-8 lg:p-9 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 transition-all">

            {/* Top Row: Logo, Title, Badges & Primary Actions */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 sm:pb-7 border-b border-slate-100">
              {/* Left Column: Logo + Main Headings */}
              <div className="flex flex-col items-start gap-4 min-w-0 flex-1">
                {/* Logo row — logo sits half over the cover image with the badges beside it; title below */}
                <div className="flex w-full items-start gap-2 sm:gap-3">
                  {/* University Logo Container */}
                  <div className="relative z-10 -mt-14 flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.25)] sm:-mt-20 sm:h-24 sm:w-24 lg:-mt-[84px]">
                    <img
                      src={bannerLogo}
                      alt={university?.logoAlt || banner?.iconAlt || `${bannerHeading} Logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Ribbon badges beside the logo */}
                  <div className="-mt-2 flex min-w-0 flex-1 flex-wrap items-center gap-[3px] sm:-mt-[22px] sm:gap-2 lg:-mt-[26px]">
                    {ribbonBadges}
                  </div>
                </div>

                {/* Title & Trust Metadata */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                      {bannerHeading}
                    </h1>
                    {bannerSubheading && (
                      <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-2 max-w-3xl leading-relaxed">
                        {bannerSubheading}
                      </p>
                    )}
                  </div>

                  {/* Rating & Social Proof */}
                  <div className="flex flex-nowrap items-center gap-x-2 gap-y-1.5 text-xs sm:flex-wrap sm:gap-x-4 sm:text-sm pt-0.5">
                    {/* Stars */}
                    <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                      <div className="flex items-center gap-px sm:gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(bannerRating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900 text-[13px] sm:text-sm">
                        {bannerRating.toFixed(1)}
                      </span>
                      <span className="whitespace-nowrap text-slate-500 font-normal text-[11px] sm:text-xs">
                        ({bannerReviews} <span className="hidden sm:inline">verified </span>reviews)
                      </span>
                    </div>

                    <span className="inline-block h-3.5 w-px shrink-0 bg-slate-200" />

                    {/* Trusted Badge */}
                    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap text-slate-600 font-medium text-[11px] sm:gap-1.5 sm:text-sm">
                      {bannerTrustedIcon ? (
                        <img
                          src={bannerTrustedIcon}
                          alt="Trust"
                          className="h-3.5 w-3.5 shrink-0 object-contain sm:h-4 sm:w-4"
                        />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 sm:h-4 sm:w-4" />
                      )}
                      <span>{bannerTrustedText}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Classic Stat Highlights & AI Compare Feature */}
            <div className="pt-6 sm:pt-7 border-t border-slate-100">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-[#ea384c] border border-red-100/80 shadow-2xs">
                    <Sparkles className="h-4 w-4 text-[#ea384c]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#ea384c]">
                    {pointersTitle} Highlights
                  </span>
                </div>
              </div>

              {/* 4 Stat Cards in Full Width Balanced Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
                {pointersItems.map((item: any, idx: number) => {
                  const cleanNumber = (item.mainText || "")
                    .replace(/\s+\+/g, "+")
                    .replace(/\s+%/g, "%")
                    .trim();

                  // Determine if the mainText is a short numeric/stat (e.g. "100+", "75+", "95%", "4.8")
                  // vs descriptive text labels (e.g. "Duration", "French Degree", "For Leaders", "Flexible")
                  const isShortNumeric =
                    cleanNumber.length <= 6 &&
                    /^[\d.,%+\-kKmM\s]+$/.test(cleanNumber);

                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={
                            isShortNumeric
                              ? "font-heading text-lg sm:text-xl font-bold text-slate-950 tracking-tight leading-tight"
                              : "font-heading text-sm sm:text-base font-bold text-slate-950 leading-snug"
                          }
                        >
                          {cleanNumber}
                        </div>
                        <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-red-50/70 text-[#ea384c] border border-red-100 group-hover:bg-red-100/80 group-hover:scale-105 transition-all shrink-0">
                          {renderPointerIcon(item.icon, item.heading)}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">
                          {item.heading}
                        </div>
                        {item.subheading ? (
                          <div className="mt-0.5 text-xs text-slate-600 font-medium line-clamp-1">
                            {item.subheading}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI University Comparison Banner (Full-Width Sleek Discovery Strip) */}
              {showCompareSection && (
                <div className="mt-4 sm:mt-5 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50/80 via-white to-rose-50/30 p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#ea384c] border border-red-100/70 shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-sm font-bold text-slate-900">
                          {compareHeading}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-[#ea384c] border border-red-200/60">
                          AI Tool
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {compareSubheading}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="flex items-center -space-x-2">
                      {compareLogos.slice(0, 4).map((logo: string, idx: number) => (
                        <div
                          key={idx}
                          className="relative h-8 w-8 rounded-full border-2 border-white bg-white p-0.5 shadow-2xs shrink-0"
                        >
                          <img
                            src={logo}
                            alt={`Peer institution ${idx + 1}`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ))}
                      {compareLogos.length > 4 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#ea384c] text-[10px] font-bold text-white shadow-2xs">
                          +{compareLogos.length - 4}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleKivoClick}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#ea384c] hover:bg-[#d62d40] px-4 py-2 text-xs font-bold text-white shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <span>Kivo AI</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Application Form Modal ── */}
      <ApplyNowModal isOpen={showApplicationForm} onClose={() => setShowApplicationForm(false)} />

      {/* ── 4. Signup Modal for Kivo AI CTA ── */}
      {showSignupModal && (
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {/* ── 5. Login Modal ── */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
    </header>
  );
}
