import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, MessagesSquare, Phone } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import FlowingLines from "@/components/about/flowing-lines";
import AboutHero from "@/components/about/about-hero";
import AiAgentSection from "@/components/about/ai-agent-section";
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

export default function AboutUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <article className="overflow-hidden bg-white text-gray-900">
        {/* 1. Hero: photo slideshow with the Inside eCampus panel */}
        <AboutHero container={CONTAINER} />

        {/* 2. Our Journey */}
        <section aria-labelledby="our-journey" className="pb-20 pt-12 lg:pb-28 lg:pt-16">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} mx-auto max-w-3xl text-center`}>
              <p className="text-2xl font-extrabold uppercase tracking-[0.16em] text-red-600 sm:text-3xl lg:text-[40px]">Our journey</p>
              <h2 id="our-journey" className="mt-4 text-[24px] font-bold leading-[1.25] tracking-tight text-gray-900 sm:text-[28px] lg:text-[32px]">
                Built from the ground up, <span className="text-red-600">since 2017</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                From a three-person idea to a platform that helps learners across India find their next step.
              </p>
            </div>
            <JourneyTimeline />
          </div>
        </section>

        {/* 3. eCampus AI Agent */}
        <AiAgentSection />

        {/* 4. Call to action */}
        <section aria-labelledby="start-journey" className="py-20 lg:py-28">
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
