"use client";

import React from "react";
import { Handshake } from "lucide-react";
import { LogoMarquee, LpHeading, LpSection } from "./lp-ui";

export interface PlacementPartnerLogoItem {
  id?: string;
  name: string;
  logo: string;
}

export interface LandingPagePlacementPartnersData {
  sectionHeading?: string;
  sectionDescription?: string;
  logos?: PlacementPartnerLogoItem[];
}

interface LandingPagePlacementPartnersProps {
  placementPartners?: LandingPagePlacementPartnersData;
}

export function LandingPagePlacementPartners({
  placementPartners,
}: LandingPagePlacementPartnersProps) {
  // CRITICAL: If no logos are configured, the section shall NOT be visible.
  // No fallback content.
  const logos = placementPartners?.logos;
  if (!logos || !Array.isArray(logos) || logos.length === 0) {
    return null;
  }

  const validLogos = logos.filter(
    (item) => item && item.logo && item.logo.trim() !== ""
  );
  if (validLogos.length === 0) {
    return null;
  }

  const sectionHeading =
    placementPartners?.sectionHeading || "Top *Placement Partners*";
  const sectionDescription = placementPartners?.sectionDescription;


  return (
    <LpSection id="placements">
      <LpHeading
        eyebrow={<><Handshake className="h-3.5 w-3.5" /> Executive Hiring Network</>}
        heading={sectionHeading}
        description={sectionDescription || undefined}
      />
      <LogoMarquee logos={validLogos} speed={28} />
      <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active Hiring Partners Across Senior Leadership &amp; Consulting
      </p>
    </LpSection>
  );
}

export default LandingPagePlacementPartners;
