"use client";

import { Footer } from "@/components/layout/footer";
import DBACounselor from "@/components/online-dba/dba-counselor";
import DBAFAQ from "@/components/online-dba/dba-faq";
import DBAGlobalPartners from "@/components/online-dba/dba-global-partners";
import DBAHero from "@/components/online-dba/dba-hero";
import DBAHighlights from "@/components/online-dba/dba-highlights";
import DBAImpact from "@/components/online-dba/dba-impact";
import DBATopPlacementPartners from "@/components/online-dba/dba-placement-partners";

import DbaPlacementPartners from "@/components/online-dba/dba-placement-partners";

import DBAStats from "@/components/online-dba/dba-stats";
import UniversityPrograms from "@/components/online-dba/university-programs";


const OnlineDba = () => {
  return (
    <>
      <DBAHero />
      <DBAStats/>
      <DBAHighlights />
        <UniversityPrograms />
        <DBAImpact/>
         <DBAGlobalPartners />
          <DBACounselor />
          {/* <PlacementPartners/> */}
     <DBATopPlacementPartners />
     <DBAFAQ/>
        <Footer/>
    </>
  );
};

export default OnlineDba;