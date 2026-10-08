"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ApplicationForm } from "@/components/form/common-form";
import {
  Star,
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
  ShieldCheck,
  Download,
  MapPin,
  Send,
  Search,
  Volume2,
  Sparkles,
  Award,
  Building2,
  CheckCircle2,
  Share2,
  ExternalLink,
  X,
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
  const compareHeading = compareData?.heading || "Compare Universities with AI";
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

  // CTA button labels
  const primaryCtaText = banner.ctas?.[0]?.buttonText || "Apply to University";
  const secondaryCtaText = banner.ctas?.[1]?.buttonText || "Explore Courses";

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

  return (
    <header className="relative w-full bg-slate-50/50 pb-8 sm:pb-12 lg:pb-14">
      {/* ── 1. Hero Cover Banner ── */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={bannerBg}
          alt={`${bannerHeading} Campus Cover`}
          className="h-full w-full object-cover object-center opacity-85 transition-transform duration-700 hover:scale-102"
        />

        {/* Soft cinematic dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/20" />

        {/* Top bar on cover banner */}
        <div className="absolute inset-x-4 top-4 sm:inset-x-8 sm:top-5 z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-slate-200 border border-white/10 shadow-sm">
            <Building2 className="h-3.5 w-3.5 text-rose-400" />
            Verified University Profile
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-white shadow-sm border border-white/15">
            <MapPin className="h-3.5 w-3.5 text-rose-400" />
            {bannerLocation}
          </span>
        </div>
      </div>

      {/* ── 2. Floating Crisp & Executive Identity Card ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24 lg:-mt-28 z-20">
          <div className="rounded-3xl bg-white p-6 sm:p-8 lg:p-9 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 transition-all">
            
            {/* Top Row: Logo, Title, Badges & Primary Actions */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 sm:pb-7 border-b border-slate-100">
              {/* Left Column: Logo + Main Headings */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 min-w-0 flex-1">
                {/* University Logo Container */}
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm border border-slate-200/80">
                  <img
                    src={bannerLogo}
                    alt={`${bannerHeading} Logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Title & Trust Metadata */}
                <div className="min-w-0 flex-1 space-y-2">
                  {/* Dynamic Ribbon Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* UGC Approved Toggle Badge */}
                    {university?.ugcApproval !== false && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-[#ea384c] border border-red-200/80 px-3 py-1 text-xs font-semibold tracking-wide">
                        <Shield className="h-3.5 w-3.5 text-[#ea384c]" />
                        <span>UGC Approved</span>
                      </span>
                    )}

                    {/* NIRF Ranked Toggle Badge */}
                    {(university?.nirfRanked ?? (Boolean(university?.nirfRanking && university?.nirfRanking.trim() !== ""))) ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-3 py-1 text-xs font-semibold tracking-wide">
                        <Award className="h-3.5 w-3.5 text-slate-500" />
                        <span>NIRF Ranked {university?.nirfRanking ? `(#${university.nirfRanking.replace(/^#/, "")})` : ""}</span>
                      </span>
                    ) : null}

                    {/* WES Approved Toggle Badge */}
                    {university?.wesApproval && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-3 py-1 text-xs font-semibold tracking-wide">
                        <Globe className="h-3.5 w-3.5 text-slate-500" />
                        <span>WES Recognized</span>
                      </span>
                    )}

                    {/* EMI Facility Toggle Badge */}
                    {university?.emiFacility && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200/80 px-3 py-1 text-xs font-semibold tracking-wide">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />
                        <span>EMI Available</span>
                      </span>
                    )}
                  </div>

                  <div className="pt-0.5">
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
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm pt-0.5">
                    {/* Stars */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              i < Math.floor(bannerRating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        {bannerRating.toFixed(1)}
                      </span>
                      <span className="text-slate-500 font-normal text-xs">
                        ({bannerReviews} verified reviews)
                      </span>
                    </div>

                    <span className="h-3.5 w-px bg-slate-200 hidden sm:inline-block" />

                    {/* Trusted Badge */}
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs sm:text-sm">
                      {bannerTrustedIcon ? (
                        <img
                          src={bannerTrustedIcon}
                          alt="Trust"
                          className="h-4 w-4 shrink-0 object-contain"
                        />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      )}
                      <span>{bannerTrustedText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean, Focused Action Panel */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto lg:w-64">
                {/* Primary Action: Apply to University */}
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ea384c] hover:bg-[#d62d40] active:scale-[0.99] py-3.5 px-6 text-sm font-bold text-white shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" fill="currentColor" />
                  <span>{primaryCtaText}</span>
                </button>

                {/* Secondary Action: Explore Courses */}
                <button
                  type="button"
                  onClick={scrollToCourses}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] py-3 px-5 text-sm font-semibold text-slate-700 transition-colors shadow-2xs hover:border-slate-300 cursor-pointer"
                >
                  <Search className="h-4 w-4 text-slate-500" />
                  <span>{secondaryCtaText}</span>
                </button>
              </div>
            </div>

            {/* Accreditations Row - Unified Eyebrow & Sleek Trust Pill */}
            {dynamicBadges.length > 0 && (
              <div className="py-5 sm:py-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                {/* Left: Section Label + Logos */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-wrap">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50 text-[#ea384c]">
                      <Award className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Recognitions &amp; Accreditations
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    {dynamicBadges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="flex h-13 sm:h-14 min-w-[80px] sm:min-w-[96px] items-center justify-center rounded-xl bg-white border border-slate-200/90 px-3.5 py-1.5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all"
                        title={badge.alt}
                      >
                        {badge.src ? (
                          <img
                            src={badge.src}
                            alt={badge.alt}
                            className="h-9 sm:h-10 w-auto max-w-[120px] object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-700 px-1">
                            {badge.label || "Approved"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Regulatory Validity & Trust Assurance Pill */}
                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start lg:self-auto">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/90 px-3.5 py-2 shadow-2xs">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-xs text-slate-700">Govt. Job &amp; Global Mobility Approved</span>
                  </div>

                  <button
                    type="button"
                    onClick={scrollToApprovals}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#ea384c] hover:text-red-700 transition-colors cursor-pointer px-2 py-1"
                    title="Jump to full approvals breakdown"
                  >
                    <span>All Approvals</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Row: Classic Stat Highlights & AI Compare Feature */}
            <div className="pt-5 sm:pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50 text-[#ea384c]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
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

                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-slate-200/90 bg-white p-4.5 sm:p-5 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                          {cleanNumber}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-[#ea384c] border border-slate-100 group-hover:bg-red-50 group-hover:scale-105 transition-all shrink-0">
                          {renderPointerIcon(item.icon, item.heading)}
                        </div>
                      </div>

                      <div className="mt-3.5">
                        <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                          {item.heading}
                        </div>
                        {item.subheading ? (
                          <div className="mt-1 text-xs text-slate-500 font-normal line-clamp-1">
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

                    <a
                      href="/compare"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#ea384c] hover:bg-[#d62d40] px-4 py-2 text-xs font-bold text-white shadow-sm hover:shadow transition-all"
                    >
                      <span>Compare Now</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Application Form Modal ── */}
      {showApplicationForm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setShowApplicationForm(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowApplicationForm(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X className="h-4 w-4" />
            </button>

            <ApplicationForm
              onSubmit={() => {
                setShowApplicationForm(false);
              }}
              onBack={() => {
                setShowApplicationForm(false);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}