"use client";

import Banner from "@/components/contact/banner";
import CTA from "@/components/contact/cta";
import OurOffices from "@/components/contact/OurOffices";

import { Footer } from "@/components/layout/footer";

const ContactUs = () => {
  return (
    <>
      <Banner />
      <OurOffices />
      {/* <ScrollBallEffect /> */}
      <CTA />
      <Footer />
    </>
  );
};

export default ContactUs;
