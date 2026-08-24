import { Footer } from "@/components/layout/footer";
import OnlineVsRegular from "@/components/online-mba/online-vs-regular";
import EligibilityDuration from "@/components/online-mba/eligibility-duration";
import FeesAndEnrollment from "@/components/online-mba/fees-and-enrollment";
import KeyHighlights from "@/components/online-mba/key-highlight";
import OnlineMBAFAQ from "@/components/online-mba/mba-faq";
import MbaHeroSection from "@/components/online-mba/mba-hero";
import WhatDoesOnlineMBAOffer from "@/components/online-mba/mba-offer";
import MBAOverview from "@/components/online-mba/mba-overview";
import Specializations from "@/components/online-mba/mba-specializations";
import Syllabus from "@/components/online-mba/mba-syllabus";
import WhyChooseOnlineMBA from "@/components/online-mba/mba-why-choose-online";
import Professionals from "@/components/online-mba/professionals";
import TypesOfOnlineMBA from "@/components/online-mba/type-online-mba";
import UgcValidity from "@/components/online-mba/ugc-validity";
import SubHeader from "@/components/subheader/sub-header";
import MbaUniversitySection from "@/components/online-mba/mba-university-section";

export default function OnlineMbaPage() {
  return (
    <main>
      <SubHeader/>
      <MbaHeroSection />
      <MbaUniversitySection/>
      <MBAOverview/>
      <KeyHighlights/>
      <EligibilityDuration/>
      <Syllabus/>
      
      <FeesAndEnrollment/>
      <Specializations/>
      <UgcValidity/>
      <OnlineVsRegular/>
      <WhyChooseOnlineMBA/>
      <TypesOfOnlineMBA/>
      <WhatDoesOnlineMBAOffer/>
      <Professionals/>
      <OnlineMBAFAQ/>
      <Footer/>
    </main>
  );
}