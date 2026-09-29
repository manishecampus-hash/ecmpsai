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

// Map string icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
  Download,
  Building2,
  Award,
  Sparkles,
};

// Friendly pastel colors for the 4 stat cards
const statThemeClasses = [
  {
    bg: "bg-amber-50/80",
    border: "border-amber-250/70",
    iconBg: "bg-amber-100 text-amber-700",
    numColor: "text-amber-950",
  },
  {
    bg: "bg-sky-50/80",
    border: "border-sky-250/70",
    iconBg: "bg-sky-100 text-sky-700",
    numColor: "text-sky-950",
  },
  {
    bg: "bg-emerald-50/80",
    border: "border-emerald-250/70",
    iconBg: "bg-emerald-100 text-emerald-700",
    numColor: "text-emerald-950",
  },
  {
    bg: "bg-purple-50/80",
    border: "border-purple-250/70",
    iconBg: "bg-purple-100 text-purple-700",
    numColor: "text-purple-950",
  },
];

// Clean inline WhatsApp brand glyph
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.463 3.483 1.343 4.997L2 22l5.115-1.341a9.96 9.96 0 0 0 4.888 1.248h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.929-7.071a9.938 9.938 0 0 0-7.071-2.836zm0 18.174h-.003a8.15 8.15 0 0 1-4.152-1.137l-.298-.177-3.037.796.811-2.96-.194-.304a8.166 8.166 0 0 1-1.256-4.395c0-4.508 3.669-8.177 8.177-8.177a8.13 8.13 0 0 1 5.783 2.396 8.13 8.13 0 0 1 2.394 5.785c-.003 4.508-3.672 8.173-8.225 8.173z" />
  </svg>
);

const renderPointerIcon = (iconStr: string, alt: string) => {
  if (!iconStr) {
    return <BookOpen className="h-5 w-5" />;
  }

  const LucideIcon =
    iconMap[iconStr] ||
    iconMap[iconStr.charAt(0).toUpperCase() + iconStr.slice(1)] ||
    iconMap[iconStr.toLowerCase()];

  if (LucideIcon) {
    return <LucideIcon className="h-5 w-5" />;
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
        className="h-5 w-5 object-contain"
      />
    );
  }

  return <BookOpen className="h-5 w-5" />;
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
  const dbLogos = banner.accreditationLogos || [];
  const dynamicBadges =
    dbLogos.length > 0
      ? dbLogos
          .filter((logo: string) => logo && logo.trim() !== "")
          .map((logo: string, idx: number) => ({
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

  return (
    <header className="relative w-full bg-slate-50/60 pb-12 sm:pb-16 lg:pb-20">
      {/* ── 1. Hero Cover Banner ── */}
      <div className="relative h-60 sm:h-72 lg:h-84 w-full overflow-hidden bg-slate-900">
        <img
          src={bannerBg}
          alt={`${bannerHeading} Campus Cover`}
          className="h-full w-full object-cover object-center opacity-85 transition-transform duration-700 hover:scale-102"
        />

        {/* Subtle, soft cinematic dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-black/25" />

        {/* Top-right subtle location tag on cover */}
        <div className="absolute right-4 top-4 sm:right-8 sm:top-6 z-10 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm border border-white/15">
            <MapPin className="h-3.5 w-3.5 text-red-400" />
            {bannerLocation}
          </span>
        </div>
      </div>

      {/* ── 2. Floating Crisp & Friendly Identity Card ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 z-20">
          <div className="rounded-3xl bg-white p-5 sm:p-7 lg:p-9 shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-slate-200/90 transition-all">
            
            {/* Top Row: Logo, Title, Badges & Primary Actions */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-100">
              {/* Left Column: Logo + Main Headings */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 min-w-0 flex-1">
                {/* University Logo Container */}
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-md border border-slate-200/80">
                  <img
                    src={bannerLogo}
                    alt={`${bannerHeading} Logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Title & Trust Metadata */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-600 border border-red-200/70 uppercase tracking-wide">
                      <Shield className="h-3 w-3 text-red-500" />
                      UGC-DEB Approved
                    </span>

                    {university?.wesApproval && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/60">
                        <Globe className="h-3 w-3 text-blue-500" />
                        WES Recognized
                      </span>
                    )}

                    {university?.nirfRanking && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200/80">
                        <Award className="h-3 w-3 text-amber-600" />
                        NIRF Ranked
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {bannerHeading}
                  </h1>

                  {/* Rating & Social Proof */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm pt-0.5">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(bannerRating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-150 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-extrabold text-slate-900 ml-1 text-sm">
                        {bannerRating.toFixed(1)}
                      </span>
                      <span className="text-slate-500 font-medium text-xs">
                        ({bannerReviews} verified reviews)
                      </span>
                    </div>

                    <span className="h-3.5 w-px bg-slate-200 hidden sm:inline-block" />

                    {/* Trusted Badge */}
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      {bannerTrustedIcon ? (
                        <img
                          src={bannerTrustedIcon}
                          alt="Trust"
                          className="h-4 w-4 shrink-0 object-contain"
                        />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                      <span>{bannerTrustedText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean, Friendly Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto lg:w-72">
                {/* Primary Action: Apply to University */}
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 active:scale-[0.98] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-red-500/25 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" fill="currentColor" />
                  <span>{primaryCtaText}</span>
                </button>

                {/* Secondary Action: Explore Courses */}
                <button
                  type="button"
                  onClick={scrollToCourses}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 active:scale-[0.98] py-3 px-5 text-sm font-bold text-slate-800 transition-colors shadow-2xs"
                >
                  <Search className="h-4 w-4 text-slate-500" />
                  <span>{secondaryCtaText}</span>
                </button>

                {/* Friendly Direct Quick Contact Chips */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/919355907564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/70 py-2 px-3 text-xs font-bold text-emerald-700 transition-colors no-underline"
                    title="Direct WhatsApp Chat"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={scrollToCourses}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/70 py-2 px-3 text-xs font-bold text-indigo-700 transition-colors cursor-pointer"
                    title="Speak with AI Counselling Guide"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Accreditations Row */}
            {dynamicBadges.length > 0 && (
              <div className="py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                  Recognitions &amp; Accreditations
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {dynamicBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex h-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 p-2 shadow-2xs transition-all hover:bg-white hover:border-slate-300"
                      title={badge.alt}
                    >
                      {badge.src ? (
                        <img
                          src={badge.src}
                          alt={badge.alt}
                          className="h-7 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-600 px-1">
                          {badge.label || "Approved"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Row: 4 Crisp Stat Highlights & AI Compare Feature */}
            <div className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-center">
                {/* 4 Crisp Key Metric Cards */}
                <div>
                  <div className="mb-3.5 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      {pointersTitle} Highlights
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                    {pointersItems.map((item: any, idx: number) => {
                      const theme = statThemeClasses[idx % statThemeClasses.length];
                      return (
                        <div
                          key={idx}
                          className={`rounded-2xl border ${theme.border} ${theme.bg} p-3.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-xl ${theme.iconBg} shadow-2xs shrink-0`}
                            >
                              {renderPointerIcon(item.icon, item.heading)}
                            </div>
                            <span className="text-xs font-semibold text-slate-600 line-clamp-1">
                              {item.heading}
                            </span>
                          </div>

                          <div
                            className={`text-xl sm:text-2xl font-black ${theme.numColor} tracking-tight`}
                          >
                            {item.mainText}
                          </div>

                          {item.subheading && (
                            <div className="mt-1 text-[11px] font-medium text-slate-500 line-clamp-1">
                              {item.subheading}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Compare Card */}
                {showCompareSection && (
                  <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-sky-50/50 to-white p-4 sm:p-5 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-700">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                        <span>AI University Comparison</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        Instant
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {compareHeading}
                    </h3>

                    {compareSubheading && (
                      <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                        {compareSubheading}
                      </p>
                    )}

                    <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-indigo-100/70">
                      {/* Peer university avatars */}
                      <div className="flex items-center -space-x-2.5 overflow-hidden">
                        {compareLogos.slice(0, 4).map((logo, idx) => (
                          <div
                            key={idx}
                            className="relative h-9 w-9 rounded-full border-2 border-white bg-white p-1 shadow-sm shrink-0"
                          >
                            <img
                              src={logo}
                              alt={`Peer institution ${idx + 1}`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ))}
                        {compareLogos.length > 4 && (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[11px] font-bold text-white shadow-sm">
                            +{compareLogos.length - 4}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={scrollToCourses}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-800 transition-colors"
                      >
                        <span>Compare Now</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
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