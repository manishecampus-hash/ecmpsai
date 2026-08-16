import { CareerMomentumChart } from "@/components/ignou-vs-online-universities/career-chart";
import { ComparisonSection } from "@/components/ignou-vs-online-universities/comparison-section";
import IgnouOnlineFAQ from "@/components/ignou-vs-online-universities/faq-section";

import { Hero } from "@/components/ignou-vs-online-universities/hero";
import { InfoBanner } from "@/components/ignou-vs-online-universities/info-banner";
import { Footer } from "@/components/layout/footer";

export default function IgnouVsOnlineUniversitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <InfoBanner />
      <ComparisonSection />
      <CareerMomentumChart />
      <IgnouOnlineFAQ />
      <Footer />
    </main>
  );
}
