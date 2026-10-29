import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Compass,
  MessageCircle,
  MessagesSquare,
  Phone,
  Scale,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import FlowingLines from "@/components/about/flowing-lines";
import HeroProgramPanel from "@/components/about/hero-program-panel";
import JourneyTimeline from "@/components/about/journey-timeline";
import RevealObserver from "@/components/about/reveal-observer";
import { REVEAL_UP } from "@/components/about/reveal";

export const metadata: Metadata = {
  title: "About eCampus | Explore Online Degrees & Certifications",
  description:
    "Discover how eCampus helps students and working professionals explore online degrees, certifications, and higher education programs to support their career goals.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About eCampus | Explore Online Degrees & Certifications",
    description:
      "Discover how eCampus helps students and working professionals explore online degrees, certifications, and higher education programs to support their career goals.",
    url: "/about-us",
    type: "website",
    images: [{ url: "/image/logo.png", alt: "eCampus" }],
  },
};

// Only details already published elsewhere on the site (legal name from the privacy policy,
// logo, domain and the toll-free helpline from the footer).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "eCampus",
  legalName: "Ecampus Technologies Private Limited",
  url: "https://www.ecampusapp.com/",
  logo: "https://www.ecampusapp.com/image/logo.png",
  foundingDate: "2017",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-1800-121-6201",
    contactType: "customer support",
    areaServed: "IN",
  },
};

// Existing routes — the header menu, footer menu and program pages already link to these
const ROUTES = {
  explore: "/discover",
  advisor: "/contact-us",
  universities: "/universities",
  compare: "/compare",
};

// Same WhatsApp number as the site-wide chat button
const WHATSAPP = "919873794789";

const WHO_WE_ARE_POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Explore programs", text: "Online degrees, certifications, executive education and doctoral programs in one place." },
  { icon: Scale, title: "Understand your options", text: "Clear program information so you can compare what suits you best." },
  { icon: Target, title: "Choose your path", text: "Identify the learning path that matches your goals and your schedule." },
];

const HELP_ITEMS = [
  {
    icon: Compass,
    title: "Discover Education Programs",
    text: "Explore online degrees, certifications, executive education, and doctoral programs from available institutions and education providers.",
    link: { href: ROUTES.universities, label: "Browse online universities" },
    preview: "discover",
  },
  {
    icon: Scale,
    title: "Compare Your Options",
    text: "Review relevant program information to understand your options and find programs that suit your educational goals, interests, and requirements.",
    link: { href: ROUTES.compare, label: "Compare universities" },
    preview: "compare",
  },
  {
    icon: MessagesSquare,
    title: "Get Career and Education Guidance",
    text: "Explore guidance and support to help you make more informed decisions about your next educational step.",
    link: { href: ROUTES.explore, label: "Find a program that fits your goals" },
    preview: "guide",
  },
] as const;

const CONTACT_OPTIONS = [
  { icon: MessagesSquare, title: "Talk to an advisor", text: "Book a free one-on-one session", href: ROUTES.advisor, external: false },
  { icon: Phone, title: "Call 1800 121 6201", text: "Toll-free guidance line", href: "tel:18001216201", external: false },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    text: "Get quick answers from our team",
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like help choosing a program.")}`,
    external: true,
  },
];

// Shared content width: 80% of the screen on desktop, padded full width on smaller screens
const CONTAINER = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:w-[80%] lg:px-0";

// The site's global stylesheet removes focus rings, so links show focus with an underline instead.
// (rounded-lg resolves to 0 in this project's Tailwind config, hence the explicit radii.)
const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";
const PRIMARY_BUTTON = `group inline-flex items-center justify-center gap-2 rounded-[10px] bg-red-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 focus-visible:bg-red-800 ${FOCUS}`;
const SECONDARY_BUTTON = `inline-flex items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-colors hover:border-gray-900 ${FOCUS}`;
const TEXT_LINK = `group inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 ${FOCUS}`;

const H2 = "text-[30px] font-bold leading-[1.2] tracking-tight text-gray-900 sm:text-[36px] lg:text-[42px]";

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-red-300" : "text-red-600"}`}>{children}</p>;
}

// Small product previews at the top of each "How eCampus helps" card
function HelpPreview({ kind }: { kind: (typeof HELP_ITEMS)[number]["preview"] }) {
  if (kind === "discover") {
    return (
      <div aria-hidden className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
          <Search className="h-3.5 w-3.5" />
          Online MBA for working professionals
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["MBA", "MCA", "BBA", "DBA", "Certifications"].map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                i === 0 ? "bg-red-600 text-white" : "bg-white text-gray-600 ring-1 ring-gray-200 group-hover:ring-red-200"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "compare") {
    return (
      <div aria-hidden className="overflow-hidden rounded-lg border border-gray-200 bg-white text-[11px]">
        <div className="grid grid-cols-[1fr_56px_56px] border-b border-gray-100 bg-gray-50 px-3 py-1.5 font-semibold text-gray-500">
          <span>Compare</span>
          <span className="text-center">Uni A</span>
          <span className="text-center">Uni B</span>
        </div>
        {["Approvals", "Flexible classes", "EMI options"].map((row, i) => (
          <div key={row} className="grid grid-cols-[1fr_56px_56px] items-center px-3 py-1.5 text-gray-700">
            <span>{row}</span>
            <span className="flex justify-center">
              <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
            </span>
            <span className="flex justify-center">
              {i === 2 ? <span className="h-0.5 w-2.5 rounded-full bg-gray-300" /> : <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div aria-hidden className="space-y-2 text-[11px] leading-snug">
      <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-gray-900 px-3 py-2 text-white">Which program suits a working professional?</p>
      <p className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-gray-700 ring-1 ring-gray-200">
        Let&apos;s look at flexible 2-year online MBAs that fit your schedule.
      </p>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <article className="overflow-hidden bg-white text-gray-900">
        {/* 1. Hero */}
        <section aria-labelledby="about-heading" className="relative overflow-hidden border-b border-red-100 bg-[#fff5f5]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <FlowingLines className="[mask-image:linear-gradient(to_right,transparent_38%,black_68%)]" />
            <span className="absolute right-[-140px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-red-200/70" />
            <span className="absolute right-[-50px] top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-red-200/70" />
            <span className="absolute right-[40px] top-1/2 hidden h-[260px] w-[260px] -translate-y-1/2 rounded-full border border-dashed border-red-300/60 motion-safe:animate-[spin_40s_linear_infinite] lg:block" />
          </div>

          <div className={`${CONTAINER} relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:py-24`}>
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                <Link href="/" className={`transition-colors hover:text-gray-900 ${FOCUS}`}>
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <span aria-current="page" className="font-medium text-gray-900">
                  About Us
                </span>
              </nav>
              <div className="mt-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                <Eyebrow>About eCampus</Eyebrow>
              </div>
              <h1
                id="about-heading"
                className="mt-3 max-w-xl text-[38px] font-bold leading-[1.1] tracking-tight text-gray-900 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:delay-100 motion-safe:duration-700 sm:text-[50px] lg:text-[58px]"
              >
                Find the Right <span className="whitespace-nowrap text-red-600">Education Path</span> for Your Future
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 sm:text-lg">
                We help students and working professionals explore, compare and choose the right higher education program.
              </p>
              <div className="mt-9 flex flex-col gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:delay-300 motion-safe:duration-700 sm:flex-row">
                <Link href={ROUTES.explore} className={PRIMARY_BUTTON}>
                  Explore Programs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link href={ROUTES.advisor} className={SECONDARY_BUTTON}>
                  Talk to an Advisor
                </Link>
              </div>
              <a
                href="tel:18001216201"
                className={`mt-8 inline-flex items-center gap-3 border-t border-red-200/70 pt-6 text-sm text-gray-600 transition-colors hover:text-gray-900 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-500 motion-safe:duration-700 ${FOCUS}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-sm ring-1 ring-red-100">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  Free guidance on <span className="font-semibold text-gray-900">1800 121 6201</span>
                </span>
              </a>
            </div>

            {/* Program finder panel */}
            <div className="relative mx-auto w-full max-w-[500px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 lg:mr-0">
              <HeroProgramPanel />
            </div>
          </div>
        </section>

        {/* 2. Our Journey */}
        <section aria-labelledby="our-journey" className="py-20 lg:py-28">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} mx-auto max-w-3xl text-center`}>
              <Eyebrow>Our journey</Eyebrow>
              <h2 id="our-journey" className={`mt-3 ${H2}`}>
                Built from the ground up, <span className="text-red-600">since 2017</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-[17px]">
                From a three-person idea to a platform that helps learners across India find their next step.
              </p>
            </div>
            <JourneyTimeline />
          </div>
        </section>

        {/* 3. Who We Are */}
        <section aria-labelledby="who-we-are" className="relative overflow-hidden bg-[#1B2230] py-20 text-white lg:py-28">
          <FlowingLines tone="inverse" className="[mask-image:linear-gradient(to_left,black,transparent_70%)]" />
          <div className={`${CONTAINER} relative`}>
            <div data-reveal className={REVEAL_UP}>
              <Eyebrow light>Who we are</Eyebrow>
              <h2 id="who-we-are" className="mt-3 max-w-4xl text-[30px] font-bold leading-[1.2] tracking-tight text-white sm:text-[38px] lg:text-[46px]">
                A higher education discovery platform that helps you <span className="text-red-400">choose with clarity.</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <div data-reveal className={`${REVEAL_UP} space-y-4 text-base leading-[1.8] text-white/70 sm:text-[17px]`}>
                <p className="text-white/80">
                  eCampus is a higher education discovery platform designed to help learners make informed decisions about their
                  education and careers. We bring education opportunities together in one place, helping users explore programs,
                  understand their options, and identify learning paths that match their goals.
                </p>
                <p className="text-white/80">
                  Whether you are planning your next degree, looking to develop new skills, or considering a career change, eCampus
                  helps you navigate your education journey with greater clarity.
                </p>
              </div>

              <ol className="divide-y divide-white/10 border-y border-white/10">
                {WHO_WE_ARE_POINTS.map(({ icon: Icon, title, text }, i) => (
                  <li
                    key={title}
                    data-reveal
                    style={{ transitionDelay: `${i * 120}ms` }}
                    className={`${REVEAL_UP} group flex items-start gap-5 py-6`}
                  >
                    <span className="text-sm font-bold tabular-nums text-red-400">0{i + 1}</span>
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-red-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-white/70">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. How eCampus Helps You */}
        <section aria-labelledby="how-we-help" className="py-20 lg:py-28">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} flex flex-col gap-4 md:flex-row md:items-end md:justify-between`}>
              <div className="max-w-2xl">
                <Eyebrow>What we do</Eyebrow>
                <h2 id="how-we-help" className={`mt-3 ${H2}`}>
                  How eCampus helps you
                </h2>
              </div>
              <Link href={ROUTES.advisor} className={`flex-shrink-0 ${TEXT_LINK}`}>
                Not sure where to start? Talk to an Advisor
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {HELP_ITEMS.map(({ icon: Icon, title, text, link, preview }, i) => (
                <div key={title} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className={`${REVEAL_UP} flex`}>
                  <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_24px_50px_-30px_rgba(17,24,39,0.35)]">
                    <div className="flex h-[160px] flex-col justify-center border-b border-gray-100 bg-gray-50 p-5">
                      <HelpPreview kind={preview} />
                    </div>
                    <div className="flex flex-1 flex-col p-6 lg:p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                      </span>
                      <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-gray-600">{text}</p>
                      <Link href={link.href} className={`mt-6 border-t border-gray-100 pt-5 ${TEXT_LINK}`}>
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Call to action */}
        <section aria-labelledby="start-journey" className="pb-20 lg:pb-28">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} relative overflow-hidden rounded-[28px] bg-red-600 text-white`}>
              <FlowingLines tone="inverse" />
              <div className="relative grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:p-14">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-100">Let&apos;s build your future</p>
                  <h2 id="start-journey" className="mt-3 text-[30px] font-bold leading-[1.15] tracking-tight text-white sm:text-[38px] lg:text-[44px]">
                    Your next chapter starts with a conversation.
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                    Speak to an eCampus advisor about the right program for you — it&apos;s free, with no obligation.
                  </p>
                </div>

                <ul className="space-y-3">
                  {CONTACT_OPTIONS.map(({ icon: Icon, title, text, href, external }) => (
                    <li key={title}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`group flex items-center gap-4 rounded-2xl bg-white p-4 text-gray-900 shadow-lg shadow-red-900/15 transition-transform duration-300 hover:-translate-y-0.5 sm:p-5 ${FOCUS}`}
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-bold text-gray-900">{title}</span>
                          <span className="block text-sm text-gray-500">{text}</span>
                        </span>
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-gray-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-600" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </article>

      <RevealObserver />
      <Footer />
    </>
  );
}
