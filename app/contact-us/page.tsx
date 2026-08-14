"use client";

import CTA from "@/components/contact/cta";
import OurOffices from "@/components/contact/OurOffices";
import ScrollBallEffect from "@/components/contact/scroll-ball-effect";
import { Footer } from "@/components/layout/footer";

const ContactUs = () => {
  return (
    <>
      <OurOffices />
      <ScrollBallEffect />
      <CTA />
      <Footer />
    </>
  );
};

export default ContactUs;
