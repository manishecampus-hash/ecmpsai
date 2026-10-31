import type { Metadata } from "next";
import RevealObserver from "@/components/about/reveal-observer";
import ContactChannels from "@/components/contact/contact-channels";
import ContactHero from "@/components/contact/contact-hero";
import ContactOffices from "@/components/contact/contact-offices";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact eCampus | Talk to an Education Counsellor",
  description:
    "Get in touch with eCampus for help with courses, universities, admissions and careers. Call 1800-121-6201 (toll free), email or chat on WhatsApp.",
  alternates: { canonical: "/contact-us" },
};

const ContactUs = () => {
  return (
    <>
      <article className="overflow-hidden bg-white text-gray-900">
        <ContactHero />
        <ContactChannels />
        <ContactOffices />
      </article>
      <RevealObserver />
      <Footer />
    </>
  );
};

export default ContactUs;
