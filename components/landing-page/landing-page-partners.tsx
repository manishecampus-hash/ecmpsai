import React from "react";
import { LogoMarquee, LpHeading, LpSection } from "./lp-ui";

export interface PartnerLogoItem {
  id?: string;
  name: string;
  logo: string;
}

export interface LandingPageGlobalPartnersData {
  sectionHeading?: string;
  sectionDescription?: string;
  logos?: PartnerLogoItem[];
}

interface LandingPagePartnersProps {
  partners?: LandingPageGlobalPartnersData;
}

export function LandingPagePartners({ partners }: LandingPagePartnersProps) {
  // CRITICAL REQUIREMENT: If no logos are present, the section shall NOT be visible.
  // No fallback content.
  const logos = partners?.logos;
  if (!logos || !Array.isArray(logos) || logos.length === 0) {
    return null;
  }

  // Filter out any invalid items without a logo URL
  const validLogos = logos.filter((item) => item && item.logo && item.logo.trim() !== "");
  if (validLogos.length === 0) {
    return null;
  }

  const sectionHeading =
    partners?.sectionHeading || "Our Top *Global University Partners*";
  const sectionDescription = partners?.sectionDescription;


  return (
    <LpSection>
      <LpHeading heading={sectionHeading} description={sectionDescription || undefined} />
      <LogoMarquee logos={validLogos} speed={30} />
      <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Accredited Global University Network
      </p>
    </LpSection>
  );
}

export default LandingPagePartners;
