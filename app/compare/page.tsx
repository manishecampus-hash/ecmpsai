"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CTA from "./cta";
import UniversitySlider from "@/components/compare/page";
import { Footer } from "@/components/layout/footer";

export default function ComparePage() {
  return (
    <>
      <CTA />
      <UniversitySlider />
      <Footer />
    </>
  );
}
