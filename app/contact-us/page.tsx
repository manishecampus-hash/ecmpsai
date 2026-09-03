"use client";

import Banner from "@/components/contact/banner";
import ContactCards from "@/components/contact/ContactCards";
import OurOffices from "@/components/contact/OurOffices";

import { Footer } from "@/components/layout/footer";

const ContactUs = () => {
  return (
    <>
      <Banner />
      <ContactCards />
      <OurOffices />
      <Footer />
    </>
  );
};

export default ContactUs;
