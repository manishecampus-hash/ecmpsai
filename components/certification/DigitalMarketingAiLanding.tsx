"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Clock,
  ArrowRight,
  Download,
  PhoneCall,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  Laptop,
  Check,
  CheckCircle2,
  Layers,
  Store,
  Briefcase,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Mail,
  Globe,
  Calendar,
  X,
  ExternalLink,
  Lock,
  BadgePercent,
  PlayCircle,
  Video,
  Database,
  Search,
  Share2,
  SlidersHorizontal,
  Bot,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

interface TrackDetail {
  id: string;
  name: string;
  badge?: string;
  duration: string;
  price: string;
  priceNum: number;
  emiText: string;
  description: string;
  pointsTitle: string;
  points: string[];
  ctaText: string;
  isPopular?: boolean;
}

const TRACKS: TrackDetail[] = [
  {
    id: "fast-track",
    name: "DM & AI (Fast-Track)",
    duration: "1.5 Months",
    price: "₹15,000",
    priceNum: 15000,
    emiText: "Split in 2 installments available",
    description:
      "Speed-run practical generative automation, dynamic copywriting, and performance execution for immediate freelance or workplace deployment.",
    pointsTitle: "Track Curriculum Focus:",
    points: [
      "Fundamentals of Modern Digital Marketing",
      "Prompt Engineering for Growth Marketers",
      "Social Media Ads Automation & Meta Engine",
      "Verified Certificate of Completion",
      "Placement Mentorship (Audit Only)",
    ],
    ctaText: "Enroll Now",
    isPopular: false,
  },
  {
    id: "comprehensive",
    name: "DM & AI (Comprehensive Specialisation)",
    badge: "3 Months Immersion",
    duration: "3 Months",
    price: "₹25,000",
    priceNum: 25000,
    emiText: "No Cost EMI: ₹4,166/month (6 Months)",
    description:
      "Full-scale leadership program mastering automated performance architectures, deep multi-funnel analytics, AI models, and real-client Capstones.",
    pointsTitle: "Complete Curriculum & Access:",
    points: [
      "Advanced AI Performance Marketing Engine",
      "Multi-channel Campaign Strategy & Media Buying",
      "Predictive Analytics & AI Agent Toolchains",
      "Capstone Live Brand Project with Real Budgets",
      "100% Placement Mentorship & Resume Audit",
      "Global Swiss Dual Credential Issued",
    ],
    ctaText: "Enroll Now & Secure Seat",
    isPopular: true,
  },
  {
    id: "ecommerce-seo",
    name: "Ecommerce Website & SEO",
    duration: "1 Month",
    price: "₹10,000",
    priceNum: 10000,
    emiText: "Instant Access & Tool Credits",
    description:
      "Laser-focused technical masterclass covering programmatic search dominance, conversion rate optimization, and storefront infrastructure.",
    pointsTitle: "Track Curriculum Focus:",
    points: [
      "Shopify & WooCommerce Store Architecture",
      "Technical & AI-Driven On-Page SEO",
      "Conversion Rate Optimization (CRO) Audits",
      "Google Search Console & Schema Mastery",
      "Multi-Channel Paid Ads (Not Included)",
    ],
    ctaText: "Enroll Now",
    isPopular: false,
  },
];

interface ModuleItem {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  lessons: string[];
}

const MODULES: ModuleItem[] = [
  {
    id: 1,
    title: "Module 1: Foundations & Market Research",
    subtitle: "Targeting, Consumer Psychology, Competitive Positioning & Auditing",
    duration: "Week 1 - 3",
    lessons: [
      "Macro digital landscape, TAM/SAM/SOM framework, and customer journey mapping",
      "Autonomous persona discovery using AI web research agents",
      "Audience behavioral psychology & quantitative intent signals",
      "Comprehensive competitor media audit & reverse-engineering spend footprints",
    ],
  },
  {
    id: 2,
    title: "Module 2: AI in Content & Creative Strategy",
    subtitle: "Generative Copywriting, AI Imaging, Dynamic Landing Pages",
    duration: "Week 4 - 6",
    lessons: [
      "Advanced prompt engineering with Claude 3.5 Sonnet & GPT-4o for ad copywriting",
      "Commercial visual generation and batch variation scaling via Midjourney & SD-3",
      "AI-accelerated headline testing and conversion landing page blueprints",
      "Dynamic creative optimization (DCO) frameworks for multi-variant testing",
    ],
  },
  {
    id: 3,
    title: "Module 3: Paid Media & Meta/Google Ads",
    subtitle: "Algorithmic Bidding, Advantage+ Campaigns, Search Engine Marketing",
    duration: "Week 7 - 9",
    lessons: [
      "Meta Ads Manager: Advantage+ creative automation, custom audiences & lookalikes",
      "Google Performance Max (PMax), Search intent bidding, and YouTube media buying",
      "Algorithmic budget pacing scripts, ROAS benchmarking, and kill-criteria setups",
      "Server-side tracking (Conversions API) to circumvent iOS & browser privacy barriers",
    ],
  },
  {
    id: 4,
    title: "Module 4: Advanced Data Analytics & Attribution",
    subtitle: "GA4 Custom Dimensions, Looker Studio, Predictive LTV",
    duration: "Week 10 - 12",
    lessons: [
      "Google Analytics 4 event schema architecture and custom dimensions calibration",
      "Building executive-ready real-time reporting dashboards in Looker Studio",
      "Multi-touch attribution models: First touch vs. Data-driven vs. Marketing mix",
      "Predictive customer lifetime value (pLTV) and churn modeling with machine learning",
    ],
  },
];

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Am I eligible if I only have 10th or 12th standard qualifications?",
    a: "Yes, absolutely! The minimum qualification is 10th or 12th standard (Higher Secondary) pass from any recognized national or state educational board. The program is specifically structured to start with fundamental principles before progressing to advanced AI-assisted execution, making it accessible to freshers, high school graduates, and experienced professionals alike.",
  },
  {
    q: "How does the 3-month comprehensive pathway work?",
    a: "The 3-month pathway is an intensive immersion designed for end-to-end career transition or accelerated promotion. It includes live interactive weekend masterclasses, 12 practical capstone brand projects, 24/7 cloud sandbox access to premium AI marketing tools, and 1-on-1 bi-weekly mentorship clinics with senior agency directors.",
  },
  {
    q: "Are there EMI options or installment schemes for the ₹25,000 fee?",
    a: "Yes. We offer zero-cost EMI plans starting from ₹4,166/month across 6 months via major credit cards, debit cards, and banking partners (Razorpay/PayU rails). Alternatively, you can choose split-installment payments (2 equal payments) with zero hidden fees.",
  },
  {
    q: "What makes Ecampus's dual certification globally recognized?",
    a: "Graduates of our certification programs receive dual institutional credentials: an accredited Swiss Professional Certificate adhering to European EduQua quality standards, along with Ecampus European Academic transcripts with verifiable digital blockchain hashes accepted by multinational hiring agencies.",
  },
  {
    q: "Can I switch tracks after enrolling?",
    a: "Yes! You can upgrade from the Fast-Track (₹15,000) or Ecommerce (₹10,000) track to the Comprehensive 3-Month program within the first 14 days of batch launch simply by paying the fee differential.",
  },
];

export default function DigitalMarketingAiLanding() {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  // Counselor Form State
  const [advisorName, setAdvisorName] = useState("");
  const [advisorPhone, setAdvisorPhone] = useState("");
  const [advisorEmail, setAdvisorEmail] = useState("");
  const [advisorTrack, setAdvisorTrack] = useState(
    "DM & AI (Comprehensive Specialisation) - 3 Mos - ₹25,000"
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Brochure Modal Form State
  const [brochureName, setBrochureName] = useState("");
  const [brochureEmail, setBrochureEmail] = useState("");
  const [brochurePhone, setBrochurePhone] = useState("");
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdvisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorName || !advisorPhone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setFormSubmitted(true);
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName || !brochureEmail) {
      alert("Please enter your name and email.");
      return;
    }
    setBrochureDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800">
      {/* 1. Hero Section */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-red-50/50 via-rose-50/20 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Top Tag */}
          <div className="flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span className="text-[#E53935] font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              Executive Specialization Program
            </span>
            <span>•</span>
            <span>Accredited Professional Cohort</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.15]">
                Digital Marketing &amp;{" "}
                <span className="text-[#E53935]">AI Certification</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                Master cutting-edge generative AI marketing architectures,
                algorithmic performance marketing, semantic SEO, and
                omnichannel brand acceleration engineered specifically for
                progressive corporate professionals and ambitious students.
              </p>

              {/* Meta / Highlight Bar */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs grid grid-cols-2 sm:grid-cols-5 gap-3 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="pt-2 sm:pt-0 sm:px-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Credential
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    Professional Cert
                  </span>
                </div>
                <div className="pt-2 sm:pt-0 sm:px-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Duration
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    1 to 3 Mos.*
                  </span>
                </div>
                <div className="pt-2 sm:pt-0 sm:px-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Eligibility
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    10th / 12th Pass
                  </span>
                </div>
                <div className="pt-2 sm:pt-0 sm:px-3">
                  <span className="text-[10px] uppercase font-bold text-[#E53935] tracking-wider block">
                    Deadline
                  </span>
                  <span className="text-xs font-black text-[#E53935]">
                    30 Sept 2026
                  </span>
                </div>
                <div className="pt-2 sm:pt-0 sm:px-3 flex items-center justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    Online / Hybrid
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/certification/digital-marketing-ai/pay-now"
                  className="bg-[#E53935] hover:bg-red-700 active:scale-[0.99] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md shadow-red-500/20 flex items-center gap-2 text-sm transition-all"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowBrochureModal(true)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Download Brochure</span>
                </button>

                <a
                  href="#counselor-section"
                  className="text-slate-600 hover:text-[#E53935] font-bold px-3 py-3 text-sm transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-[#E53935]" />
                  <span>Talk to Academic Advisor</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 font-medium">
                *Global Dual ECTS &amp; Ecampus European accreditation with live
                AI sandbox capstone lab.
              </p>
            </div>

            {/* Right Hero Visual Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden relative group">
                {/* Hero Image */}
                <div className="relative h-60 sm:h-68 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="/offlinecertification/Learn-Digital-Marketing-with-Generative-AI-Tools.jpg"
                    alt="Digital Marketing and AI Certification Lab"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-black uppercase tracking-wider bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                      Applied AI Tools &amp; Strategic Growth
                    </span>
                    <span className="text-[10px] font-bold text-red-200">
                      Fall 2026 Batch
                    </span>
                  </div>
                </div>

                {/* Card Features List */}
                <div className="p-5 space-y-3 bg-white text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600 font-medium flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#E53935]" />
                      Dual Swiss/Certification
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Included
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600 font-medium flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[#E53935]" />
                      Hands-on AI Sandbox
                    </span>
                    <span className="font-bold text-slate-800">12+ Tools</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-600 font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#E53935]" />
                      Job Placement Guarantee
                    </span>
                    <span className="font-bold text-slate-800">Assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Red Trust Metrics Bar */}
      <section className="bg-[#E53935] text-white py-5 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-black block leading-tight">
                  100% Placement
                </span>
                <span className="text-[11px] text-red-100 font-medium">
                  Assistance Support
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-black block leading-tight">
                  1:1 Tier-1 Mentors
                </span>
                <span className="text-[11px] text-red-100 font-medium">
                  Industry Leaders
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-black block leading-tight">
                  Live AI Sandbox Labs
                </span>
                <span className="text-[11px] text-red-100 font-medium">
                  ChatGPT, Midjourney, SD-3
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-black block leading-tight">
                  Dual Accreditation
                </span>
                <span className="text-[11px] text-red-100 font-medium">
                  Ecampus Swiss &amp; Global Body
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Choose Your Specialisation Track Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] block mb-1">
              Tailored Industry Learning Pathways
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your Specialisation Track
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Tailor your learning timeline and career trajectory with our
              industry-endorsed tracks. High-impact curriculum adapted for
              direct market execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  track.isPopular
                    ? "border-2 border-[#E53935] bg-white shadow-xl shadow-red-500/10 md:-translate-y-2"
                    : "border border-slate-200/90 bg-[#FAFBFD] hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Popular Pill */}
                {track.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E53935] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm tracking-wider">
                    {track.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {track.duration} Pathway
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 leading-snug">
                      {track.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-6 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-black text-[#E53935]">
                      {track.price}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mt-0.5">
                      All Inclusive Taxes
                    </span>
                    <span className="text-xs font-semibold text-slate-700 block mt-1.5 pt-1.5 border-t border-slate-100">
                      {track.emiText}
                    </span>
                  </div>

                  {/* Curriculum Points */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-bold text-slate-900 block">
                      {track.pointsTitle}
                    </span>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {track.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-2">
                  <Link
                    href="/certification/digital-marketing-ai/pay-now"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all ${
                      track.isPopular
                        ? "bg-[#E53935] hover:bg-red-700 text-white shadow-md shadow-red-500/25"
                        : "bg-red-50/70 hover:bg-red-100 text-[#E53935] border border-red-200/70"
                    }`}
                  >
                    <span>{track.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curriculum Structure & Modules Section */}
      <section className="py-16 bg-[#F8F9FA] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Syllabus Accordions (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] block mb-1">
                  Comprehensive Syllabus
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Curriculum Structure &amp; Modules
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Designed by global CMOs and AI practitioners, every module
                  merges theoretical marketing fundamentals with concurrent
                  live-tool orchestration.
                </p>
              </div>

              <div className="space-y-3 pt-3">
                {MODULES.map((m) => {
                  const isOpen = openModuleId === m.id;
                  return (
                    <div
                      key={m.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenModuleId(isOpen ? null : m.id)
                        }
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="w-7 h-7 rounded-lg bg-red-50 text-[#E53935] border border-red-200 text-xs font-black flex items-center justify-center shrink-0 font-mono mt-0.5">
                            {m.id}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                {m.title}
                              </h3>
                              <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                                {m.duration}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {m.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-slate-400 p-1">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-[#FAFBFD]/60 animate-in fade-in duration-200">
                          <span className="font-bold text-slate-800 block mb-2">
                            Key Competencies Covered:
                          </span>
                          <ul className="space-y-2">
                            {m.lessons.map((lesson, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] mt-1.5 shrink-0" />
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Learning Methodology Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#E53935] tracking-wider block">
                    Pedagogical Framework
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    Learning Methodology
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Swiss-curation standards built for working professionals,
                    balancing flexibility with rigorous hands-on application.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-[#E53935] border border-red-100 flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Live Weekend Masterclasses
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Live interactive weekend cohorts with global directors.
                        Recordings cataloged on Swiss LMS 24 hours later.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-[#E53935] border border-red-100 flex items-center justify-center shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        24/7 Cloud LMS Access
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Lifetime platform access to prompts, project templates,
                        case studies, and proprietary sandbox environments.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-[#E53935] border border-red-100 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        1-on-1 Industry Mentorship
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Bi-weekly private clinics for code/ad strategy reviews,
                        portfolio sharpening, and job interview mock sessions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prompt Templates Banner */}
                <div className="bg-red-50/70 border border-red-100 rounded-2xl p-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#E53935] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">
                    Includes 50+ Ready-to-Deploy AI Prompt Templates &amp; Swipe
                    Files
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Eligibility & Admission Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] block mb-1">
              Simple &amp; Transparent Enrollment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Eligibility &amp; Admission Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Open to students and professionals. Zero prior coding required.
              Verified entry criteria ensure cohort quality.
            </p>
          </div>

          {/* Eligibility Banner Card */}
          <div className="bg-red-50/70 border border-red-200/90 rounded-2xl p-5 sm:p-6 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E53935] text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#E53935] block">
                  Minimum Academic Eligibility
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5 leading-relaxed">
                  Candidates must have successfully passed{" "}
                  <strong>10th or 12th Standard (Higher Secondary)</strong> from
                  any recognized national/state board. Working professionals and
                  graduates are equally eligible.
                </p>
              </div>
            </div>
            <div className="shrink-0 self-start sm:self-auto">
              <span className="bg-white border border-red-200 text-[#E53935] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                No Prior Coding Required
              </span>
            </div>
          </div>

          {/* 4-Step Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 relative group hover:border-[#E53935] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#E53935] text-white font-black text-xs flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                Submit Application
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your specialisation track (Fast-Track, Comprehensive, or
                Ecommerce) and submit the online application form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 relative group hover:border-[#E53935] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#E53935] text-white font-black text-xs flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                Counselor Screening
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit scanned proof of 10th or 12th pass certificate. An
                academic advisor reviews qualifications within 12 hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 relative group hover:border-[#E53935] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#E53935] text-white font-black text-xs flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                Online Fee Payment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your seat via encrypted payment gateway (Net Banking,
                UPI, Cards, or split EMI installment plans).
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 relative group hover:border-[#E53935] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#E53935] text-white font-black text-xs flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                Onboarding &amp; Orientation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive Swiss LMS credentials, student portal access, and
                cohort calendar. Batch closes 30th Sept 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mid-Page Urgent CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E53935] text-white flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-red-400 tracking-wider block">
                Admissions Closing: 30th Sept 2026
              </span>
              <h3 className="text-lg sm:text-2xl font-black mt-0.5">
                Ready to future-proof your career with AI &amp; Digital
                Marketing?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Lock your subsidized pricing tier and gain immediate entry to
                our pre-cohort AI masterclass.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/certification/digital-marketing-ai/pay-now"
              className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 flex-1 md:flex-initial"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#counselor-section"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3.5 rounded-xl text-xs sm:text-sm transition-colors text-center"
            >
              Request Callback
            </a>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] block mb-1">
              Admissions Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about credentials, schedules,
              installment payments, and hybrid participation.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 p-1 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAFBFD]/60 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Speak to an Academic Counselor & Form Section */}
      <section id="counselor-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (Counselor Contact Info) */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] block">
                  Dedicated Admissions Helpline
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Speak to an Ecampus Academic Counselor
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Unsure which track fits your immediate career leap? Our
                  admission desks in Geneva and Bangalore provide personal
                  guidance, installment arrangement, and resume review.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Swiss Desk:</strong>
                      <span className="text-slate-600">
                        +41 22 518 80 80 (Mon-Fri 09:00 - 18:00 CET)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">
                        Inquiries Desk:
                      </strong>
                      <span className="text-slate-600">admissions@ecampus.ch</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">
                        EduQua Certified Standard:
                      </strong>
                      <span className="text-slate-600">
                        Institutional Swiss Federal Recognition Registry
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Callback Request Form */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
                  <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">
                    Request an Immediate Callback
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Complete details below. An advisor will contact you within 2
                    working hours.
                  </p>

                  {formSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800 space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-extrabold text-sm">
                        Callback Request Received!
                      </h4>
                      <p className="text-xs text-emerald-700">
                        Thank you, {advisorName}. Our admissions counselor will
                        contact you at {advisorPhone} shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleAdvisorSubmit} className="space-y-3.5">
                      <div>
                        <input
                          type="text"
                          required
                          value={advisorName}
                          onChange={(e) => setAdvisorName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="tel"
                          required
                          value={advisorPhone}
                          onChange={(e) => setAdvisorPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                        />
                        <input
                          type="email"
                          value={advisorEmail}
                          onChange={(e) => setAdvisorEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                        />
                      </div>

                      <div>
                        <select
                          value={advisorTrack}
                          onChange={(e) => setAdvisorTrack(e.target.value)}
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935] cursor-pointer"
                        >
                          <option value="DM & AI (Comprehensive Specialisation) - 3 Mos - ₹25,000">
                            DM &amp; AI (Comprehensive Specialisation) - 3 Mos -
                            ₹25,000
                          </option>
                          <option value="DM & AI (Fast-Track) - 1.5 Mos - ₹15,000">
                            DM &amp; AI (Fast-Track) - 1.5 Mos - ₹15,000
                          </option>
                          <option value="Ecommerce Website & SEO - 1 Mo - ₹10,000">
                            Ecommerce Website &amp; SEO - 1 Mo - ₹10,000
                          </option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#E53935] hover:bg-red-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Submit &amp; Request Callback</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Sticky Bottom Conversion Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-3 px-4 shadow-lg animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E53935] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 text-xs block">
                  Digital Marketing &amp; AI Certification
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Starting from ₹10,000 INR • 10th or 12th Pass Eligible • Swiss
                  Certified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowBrochureModal(true)}
                className="hidden md:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure</span>
              </button>

              <Link
                href="/certification/digital-marketing-ai/pay-now"
                className="bg-[#E53935] hover:bg-red-700 text-white font-extrabold px-5 py-2 rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Download Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setShowBrochureModal(false);
                setBrochureDownloaded(false);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#E53935] flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-slate-900">
                Download Official Syllabus Brochure
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Get full module breakdowns, live tool specs, project guidelines,
                and Swiss accreditation details sent to your email.
              </p>

              {brochureDownloaded ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold">Brochure Dispatched Successfully!</p>
                  <p className="text-slate-600">
                    We have emailed the official PDF brochure to{" "}
                    <strong>{brochureEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowBrochureModal(false)}
                    className="mt-2 w-full bg-[#E53935] text-white font-bold py-2 rounded-xl text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBrochureSubmit} className="space-y-3 text-left">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brochureName}
                      onChange={(e) => setBrochureName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={brochureEmail}
                      onChange={(e) => setBrochureEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mobile Number (for WhatsApp delivery)
                    </label>
                    <input
                      type="tel"
                      value={brochurePhone}
                      onChange={(e) => setBrochurePhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#E53935]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E53935] hover:bg-red-700 text-white font-extrabold py-3 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Now</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
