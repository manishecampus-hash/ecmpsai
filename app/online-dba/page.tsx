"use client";

import { Footer } from "@/components/layout/footer";
import DBAHero from "@/components/online-dba/dba-hero";
import DBAHighlights from "@/components/online-dba/dba-highlights";
import DBAImpact from "@/components/online-dba/dba-impact";
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
        <Footer/>
    </>
  );
};

export default OnlineDba;