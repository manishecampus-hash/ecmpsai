"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Clock,
  Check,
  IdCard,
  SlidersHorizontal,
  Award,
  Briefcase,
  Layers,
  Store,
  Laptop,
  QrCode,
  CreditCard,
  Landmark,
  Percent,
  Headphones,
  Phone,
  Info,
  ChevronDown,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

interface SpecialisationTrack {
  id: "track-a" | "track-b" | "track-c";
  key: string;
  name: string;
  duration: string;
  specialisationName: string;
  recommended?: boolean;
  totalPrice: number;
  basePrice: number;
  gstPrice: number;
  description: string;
  badges: {
    icon: "award" | "briefcase" | "layers" | "store" | "laptop";
    label: string;
    isPrimary?: boolean;
  }[];
}

const TRACKS: SpecialisationTrack[] = [
  {
    id: "track-a",
    key: "Track A",
    name: "Track A: DM & AI Immersion (3 Months)",
    duration: "3 Months (Comprehensive Masterclass)",
    specialisationName: "DM & AI Executive Certification",
    recommended: true,
    totalPrice: 25000,
    basePrice: 21186,
    gstPrice: 3814,
    description:
      "Generative AI Copywriting, Meta & Google Performance Ads, Autonomous Agents, Prompt Strategy, MarTech Automation & Live Sandbox Capstone.",
    badges: [
      {
        icon: "award",
        label: "Dual ECTS & Ecampus Accreditation",
        isPrimary: true,
      },
      {
        icon: "briefcase",
        label: "12 Industry Projects",
        isPrimary: true,
      },
    ],
  },
  {
    id: "track-b",
    key: "Track B",
    name: "Track B: DM & AI Accelerated (1.5 Months)",
    duration: "1.5 Months (Accelerated Sprint)",
    specialisationName: "DM & AI Accelerated Sprint",
    totalPrice: 15000,
    basePrice: 12712,
    gstPrice: 2288,
    description:
      "Core Digital Channels, AI Creative Automation, Google Analytics 4, ROI Optimization & Campaign Performance Sprint.",
    badges: [
      {
        icon: "layers",
        label: "6 Hands-on Modules",
      },
      {
        icon: "award",
        label: "Institutional Credential",
      },
    ],
  },
  {
    id: "track-c",
    key: "Track C",
    name: "Track C: Ecommerce Website & SEO (1 Month)",
    duration: "1 Month (Intensive Lab Sprint)",
    specialisationName: "Ecommerce Website & SEO Certification",
    totalPrice: 10000,
    basePrice: 8475,
    gstPrice: 1525,
    description:
      "Shopify Architecture, Technical SEO Auditing, AI Structured Data, Search Intent Strategy & Conversion Optimization.",
    badges: [
      {
        icon: "store",
        label: "Ecom Store Deployment",
      },
      {
        icon: "laptop",
        label: "Screaming Frog Lab",
      },
    ],
  },
];

type PaymentRail = "upi" | "cards" | "netbanking" | "emi";

export default function CertificationEnrollment({
  initialSlug = "dm&ai",
}: {
  initialSlug?: string;
}) {
  // Form State
  const [fullName, setFullName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("aarav.sharma@outlook.com");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("98765 43210");
  const [qualification, setQualification] = useState(
    "Bachelor's Degree (Any Discipline)"
  );
  const [deliveryMode, setDeliveryMode] = useState<"online" | "hybrid">(
    "online"
  );
  const [selectedTrackId, setSelectedTrackId] = useState<
    "track-a" | "track-b" | "track-c"
  >("track-a");

  // Declarations
  const [agreedEligibility, setAgreedEligibility] = useState(true);
  const [agreedUpdates, setAgreedUpdates] = useState(true);

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Payment Rails
  const [selectedRail, setSelectedRail] = useState<PaymentRail>("upi");

  // Modals & Gateway State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<
    "integrity" | "refund" | null
  >(null);

  // Selected Track details
  const currentTrack =
    TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];

  // Pricing calculations
  const grossTotal = currentTrack.totalPrice;
  const discountAmount = appliedCoupon ? Math.round(grossTotal * 0.1) : 0; // 10% coupon discount
  const finalPayable = grossTotal - discountAmount;
  // Itemize 18% GST (Included in final fee)
  const calculatedBase = Math.round(finalPayable / 1.18);
  const calculatedGST = finalPayable - calculatedBase;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const cleaned = couponInput.trim().toUpperCase();

    if (!cleaned) {
      setCouponError("Please enter a valid coupon code");
      return;
    }

    if (
      cleaned === "AIEXECUTIVE" ||
      cleaned === "SCHOLARSHIP10" ||
      cleaned === "FALL2026"
    ) {
      setAppliedCoupon(cleaned);
      setCouponDiscount(Math.round(grossTotal * 0.1));
      setCouponError(null);
    } else {
      setCouponError("Invalid or expired scholarship code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponError(null);
  };

  const handleProceedPayment = () => {
    if (!agreedEligibility) {
      alert("Please accept the Academic Integrity and Eligibility declaration.");
      return;
    }
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case "award":
        return <Award className="w-3.5 h-3.5" />;
      case "briefcase":
        return <Briefcase className="w-3.5 h-3.5" />;
      case "layers":
        return <Layers className="w-3.5 h-3.5" />;
      case "store":
        return <Store className="w-3.5 h-3.5" />;
      case "laptop":
        return <Laptop className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 text-slate-800">
      {/* Top Banner & Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#E53935] block mb-1">
              Executive Specialization Enrollment
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight leading-tight">
              Digital Marketing &amp; AI Certification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Cohort Fall 2026 Admissions • Accredited Professional
              Certification
            </p>
          </div>

          {/* Admissions Deadline Badge */}
          <div className="self-start md:self-auto bg-red-50/80 border border-red-100/90 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-[#E53935] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-[#E53935] tracking-wider block">
                Admissions Deadline
              </span>
              <span className="text-xs font-bold text-slate-800">
                Registration closes Sept 30, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Phase Navigation Bar (3 Phases) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          {/* Phase 01: Active */}
          <div className="bg-[#E53935] text-white rounded-xl p-3 px-4 flex items-center gap-3.5 shadow-sm transition-all">
            <div className="w-6 h-6 rounded-full bg-white text-[#E53935] text-xs font-black flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-red-100 tracking-wider block">
                Phase 01
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                Student Details
              </span>
            </div>
          </div>

          {/* Phase 02: In Progress */}
          <div className="bg-red-50/70 border border-red-100 rounded-xl p-3 px-4 flex items-center gap-3.5 transition-all">
            <div className="w-6 h-6 rounded-full bg-[#E53935] text-white text-xs font-black flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-[#E53935] tracking-wider block">
                Phase 02
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Track Selection
              </span>
            </div>
          </div>

          {/* Phase 03: Future */}
          <div className="bg-slate-50/90 border border-slate-200/60 rounded-xl p-3 px-4 flex items-center gap-3.5 transition-all">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">
                Phase 03
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400">
                Gateway Payment
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Form & Selection vs. Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Main Form & Track Selection) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 01: Applicant Credentials */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="bg-red-50 border border-red-200 text-[#E53935] text-xs font-black px-2 py-0.5 rounded-md font-mono">
                    01
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      Applicant Credentials
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Provide authentic details corresponding to academic transcripts.
                    </p>
                  </div>
                </div>
                <div className="text-slate-300 p-1">
                  <IdCard className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Full Name <span className="text-[#E53935]">*</span>{" "}
                    <span className="font-normal text-slate-400">
                      (as per educational certificates)
                    </span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] transition-all"
                    placeholder="Enter full legal name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Institutional / Personal Email Address{" "}
                    <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] transition-all"
                    placeholder="name@organization.com"
                  />
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#E53935] font-medium">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      LMS credentials and batch calendar will be sent to this email ID.
                    </span>
                  </div>
                </div>

                {/* Mobile Number & OTP Verification */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile Number &amp; OTP Verification{" "}
                    <span className="text-[#E53935]">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {/* Country Code Select */}
                    <div className="relative shrink-0">
                      <select
                        aria-label="Country Dial Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] transition-all cursor-pointer"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Phone Input with Verified Pill inside */}
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        aria-label="Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 pr-24 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] transition-all"
                        placeholder="Mobile number"
                      />
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                        <span className="bg-red-50 text-[#E53935] border border-red-200 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualification & Delivery Mode Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Highest Academic Qualification{" "}
                      <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        aria-label="Highest Academic Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] transition-all cursor-pointer truncate"
                      >
                        <option value="Bachelor's Degree (Any Discipline)">
                          Bachelor's Degree (Any Discipline)
                        </option>
                        <option value="Master's Degree (MBA / M.Tech / M.Sc)">
                          Master's Degree (MBA / M.Tech / M.Sc)
                        </option>
                        <option value="Doctorate / Ph.D.">Doctorate / Ph.D.</option>
                        <option value="Diploma (3-Year Polytechnic)">
                          Diploma (3-Year Polytechnic)
                        </option>
                        <option value="High School / 12th Grade">
                          High School / 12th Grade
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Delivery Mode Radios */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Delivery Mode <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="flex items-center gap-2 h-[42px]">
                      {/* 100% Online Radio */}
                      <button
                        type="button"
                        onClick={() => setDeliveryMode("online")}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                          deliveryMode === "online"
                            ? "border-[#E53935] bg-red-50/50 text-[#E53935]"
                            : "border-slate-200 bg-[#FAFBFD] text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            deliveryMode === "online"
                              ? "border-[#E53935]"
                              : "border-slate-300"
                          }`}
                        >
                          {deliveryMode === "online" && (
                            <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                          )}
                        </span>
                        100% Online
                      </button>

                      {/* Hybrid Blend Radio */}
                      <button
                        type="button"
                        onClick={() => setDeliveryMode("hybrid")}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                          deliveryMode === "hybrid"
                            ? "border-[#E53935] bg-red-50/50 text-[#E53935]"
                            : "border-slate-200 bg-[#FAFBFD] text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            deliveryMode === "hybrid"
                              ? "border-[#E53935]"
                              : "border-slate-300"
                          }`}
                        >
                          {deliveryMode === "hybrid" && (
                            <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                          )}
                        </span>
                        Hybrid Blend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Select Specialisation Track */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="bg-red-50 border border-red-200 text-[#E53935] text-xs font-black px-2 py-0.5 rounded-md font-mono">
                    02
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      Select Specialisation Track
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose your depth of study and industrial accreditation scope.
                    </p>
                  </div>
                </div>
                <div className="text-slate-300 p-1">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Tracks List */}
              <div className="space-y-4">
                {TRACKS.map((track) => {
                  const isSelected = selectedTrackId === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => setSelectedTrackId(track.id)}
                      className={`relative rounded-2xl p-4 sm:p-5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#E53935] bg-white shadow-xs"
                          : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Radio + Title + Badge */}
                        <div className="flex items-start gap-3 flex-1">
                          <div className="pt-0.5 shrink-0">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? "border-[#E53935]"
                                  : "border-slate-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
                              )}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                                {track.name}
                              </h3>
                              {track.recommended && (
                                <span className="bg-[#E53935] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                  Recommended
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                              {track.description}
                            </p>

                            {/* Track Badges / Highlights */}
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              {track.badges.map((b, idx) => (
                                <span
                                  key={idx}
                                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                                    isSelected || b.isPrimary
                                      ? "text-[#E53935]"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {renderBadgeIcon(b.icon)}
                                  <span>{b.label}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div className="text-right shrink-0">
                          <div className="text-xl sm:text-2xl font-black text-slate-900">
                            ₹{track.totalPrice.toLocaleString("en-IN")}
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase block mt-0.5">
                            All Taxes Included
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Declarations & Institutional Governance */}
              <div className="pt-8 border-t border-slate-100 mt-6">
                <h4 className="font-extrabold text-slate-900 text-sm mb-3.5">
                  Declarations &amp; Institutional Governance
                </h4>

                <div className="space-y-3">
                  {/* Checkbox 1: Academic Regulations */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedEligibility}
                      onChange={(e) => setAgreedEligibility(e.target.checked)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        agreedEligibility
                          ? "bg-[#E53935] text-white"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {agreedEligibility && (
                        <Check className="w-3 h-3 stroke-[3]" />
                      )}
                    </div>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I confirm I satisfy the minimum eligibility requirements
                      (10th/12th or equivalent diploma/degree) and hereby agree to
                      the{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePolicyModal("integrity");
                        }}
                        className="text-[#E53935] font-bold hover:underline"
                      >
                        Academic Integrity Regulations
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePolicyModal("refund");
                        }}
                        className="text-[#E53935] font-bold hover:underline"
                      >
                        Fee Refund Policy
                      </button>
                      .
                    </span>
                  </label>

                  {/* Checkbox 2: Operations SMS/WhatsApp alerts */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedUpdates}
                      onChange={(e) => setAgreedUpdates(e.target.checked)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        agreedUpdates
                          ? "bg-[#E53935] text-white"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {agreedUpdates && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I authorize Ecampus Academic Operations to transmit
                      real-time cohort onboarding notices, live zoom links, and
                      study materials via WhatsApp and SMS alerts.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Admission Verification & Payment Box) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm relative overflow-hidden">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E53935] to-rose-400" />

              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#E53935] tracking-wider block">
                    Enrollment Summary
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    Admission Verification
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 fill-emerald-100" />
                </div>
              </div>

              {/* Summary Details Table */}
              <div className="space-y-2.5 text-xs py-3 border-y border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Program Title:</span>
                  <span className="font-bold text-slate-900 text-right">
                    Digital Marketing &amp; AI Certification
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Selected Specialisation:
                  </span>
                  <span className="font-bold text-[#E53935] text-right">
                    {currentTrack.specialisationName}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Target Cohort:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    Fall Batch (Oct 2026)
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Duration Commitment:
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    {currentTrack.duration}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Certification Body:
                  </span>
                  <span className="font-semibold text-slate-800 text-right">
                    Ecampus European Standards
                  </span>
                </div>
              </div>

              {/* Executive Scholarship / Coupon Code */}
              <div className="py-4 border-b border-slate-100">
                <label
                  htmlFor="couponInput"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Executive Scholarship / Referral Code
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon}</span>
                      <span className="text-[11px] font-medium text-emerald-600">
                        (₹{discountAmount.toLocaleString("en-IN")} Scholarship
                        Applied)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-slate-400 hover:text-red-500 text-xs font-semibold p-1"
                      title="Remove coupon"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      id="couponInput"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="ENTER COUPON (E.G. AIEXECUTIVE)"
                      className="flex-1 bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-semibold uppercase text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                    />
                    <button
                      type="submit"
                      className="bg-[#E53935] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-3.5 border-b border-slate-100 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Base Tuition Fee</span>
                  <span className="font-semibold text-slate-900">
                    ₹{calculatedBase.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Applicable GST (18% itemized)</span>
                  <span className="font-semibold text-slate-900">
                    ₹{calculatedGST.toLocaleString("en-IN")}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-600 font-medium">
                    <span>Executive Scholarship</span>
                    <span className="font-bold">
                      -₹{discountAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Amount Payable */}
              <div className="py-4 flex items-center justify-between border-b border-slate-100">
                <div>
                  <div className="text-sm font-black text-slate-900">
                    Total Amount Payable
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Inclusive of all institutional levies
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl sm:text-[34px] font-black text-[#E53935] tracking-tight leading-none">
                    ₹{finalPayable.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Select Secured Gateway Rails */}
              <div className="pt-4 pb-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2.5">
                  Select Secured Gateway Rails
                </span>

                <div className="grid grid-cols-4 gap-2">
                  {/* UPI / QR */}
                  <button
                    type="button"
                    onClick={() => setSelectedRail("upi")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                      selectedRail === "upi"
                        ? "border-[#E53935] bg-red-50/50 text-[#E53935] shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1" />
                    UPI / QR
                  </button>

                  {/* Cards */}
                  <button
                    type="button"
                    onClick={() => setSelectedRail("cards")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                      selectedRail === "cards"
                        ? "border-[#E53935] bg-red-50/50 text-[#E53935] shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1" />
                    Cards
                  </button>

                  {/* NetBanking */}
                  <button
                    type="button"
                    onClick={() => setSelectedRail("netbanking")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                      selectedRail === "netbanking"
                        ? "border-[#E53935] bg-red-50/50 text-[#E53935] shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Landmark className="w-4 h-4 mb-1" />
                    NetBanking
                  </button>

                  {/* 0% EMI */}
                  <button
                    type="button"
                    onClick={() => setSelectedRail("emi")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                      selectedRail === "emi"
                        ? "border-[#E53935] bg-red-50/50 text-[#E53935] shadow-2xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Percent className="w-4 h-4 mb-1" />
                    0% EMI
                  </button>
                </div>
              </div>

              {/* Proceed to Payment Gateway Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleProceedPayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-[#E53935] hover:bg-red-700 active:scale-[0.99] text-white font-black py-3.5 px-4 rounded-xl shadow-md shadow-red-500/20 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-75 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting to Secure Rails...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Proceed to Payment Gateway</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Razorpay
                  </span>
                  <span>•</span>
                  <span>PayU</span>
                  <span>•</span>
                  <span>Stripe</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700">
                    <Lock className="w-3 h-3 text-[#E53935]" />
                    Instant LMS Access
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Upon successful transaction, official fee receipt and batch
                  schedule will be generated automatically.
                </p>
              </div>
            </div>

            {/* Admissions Support Helpline Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 text-[#E53935] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase text-[#E53935] tracking-wider block">
                  Admissions Support Helpline
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Experiencing payment difficulties or need corporate billing?
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-bold text-[#E53935]">
                  <a
                    href="tel:+918003226787"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    +91 800-ECAMPUS
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="mailto:admissions@ecampus.org"
                    className="hover:underline"
                  >
                    admissions@ecampus.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Simulator Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-extrabold uppercase text-[#E53935] tracking-wider">
                Ecampus Payment Gateway Rails
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Order Initiated Successfully
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Transaction ID: ECMP-{Date.now().toString().slice(-8)}
              </p>

              {/* Order Info Card */}
              <div className="bg-slate-50 rounded-2xl p-4 my-5 text-left text-xs space-y-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-800">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Track:</span>
                  <span className="font-bold text-[#E53935]">
                    {currentTrack.key}: {currentTrack.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Rail:</span>
                  <span className="font-bold text-slate-800 uppercase">
                    {selectedRail}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-900">Total Payable:</span>
                  <span className="font-black text-[#E53935]">
                    ₹{finalPayable.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Mock QR / Action */}
              <div className="p-4 bg-red-50/60 rounded-2xl border border-red-100 text-xs text-slate-700 flex items-center gap-3 mb-5">
                <QrCode className="w-9 h-9 text-[#E53935] shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-slate-900">
                    Direct UPI &amp; Bank Webhook Active
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Scan via GPay, PhonePe, Paytm or complete on secure bank portal.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Congratulations ${fullName}! Your enrollment in ${currentTrack.name} is confirmed. Welcome email dispatched to ${email}.`
                    );
                    setShowSuccessModal(false);
                  }}
                  className="flex-1 bg-[#E53935] hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-sm"
                >
                  Simulate Success
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Details Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActivePolicyModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {activePolicyModal === "integrity" ? (
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#E53935] tracking-wider">
                  Institutional Governance
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Academic Integrity Regulations
                </h3>
                <div className="text-xs text-slate-600 space-y-3 mt-4 leading-relaxed max-h-72 overflow-y-auto pr-1">
                  <p>
                    <strong>1. Individual Authorship:</strong> All cohort
                    assignments, capstone projects, and AI-prompt experiments
                    must represent the authentic work of the enrolled candidate.
                  </p>
                  <p>
                    <strong>2. Ethical AI Usage:</strong> Participants are
                    encouraged to utilize Generative AI tools (ChatGPT, Claude,
                    Midjourney, etc.) strictly within designated lab guidelines
                    and disclose autonomous agent configurations.
                  </p>
                  <p>
                    <strong>3. Attendance &amp; Milestones:</strong> A minimum of
                    75% live session engagement or timely sandbox module completion
                    is mandatory to receive the Dual ECTS &amp; Ecampus European
                    Accreditation.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#E53935] tracking-wider">
                  Admissions Office Policy
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Fee Refund Policy
                </h3>
                <div className="text-xs text-slate-600 space-y-3 mt-4 leading-relaxed max-h-72 overflow-y-auto pr-1">
                  <p>
                    <strong>1. 7-Day Cooling Off Period:</strong> Full refund
                    (excluding nominal gateway processing charges of 2%) is
                    applicable if requested within 7 calendar days of admission
                    confirmation prior to batch start.
                  </p>
                  <p>
                    <strong>2. Batch Transfer:</strong> Students encountering
                    unforeseen professional or medical commitments may defer their
                    admission to the subsequent Winter 2027 cohort without penalty.
                  </p>
                  <p>
                    <strong>3. Processing Timeline:</strong> Approved refund
                    claims are disbursed back to the original source rail within
                    5 to 7 business banking days.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="bg-[#E53935] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors"
              >
                Understood &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Site Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

