import HeroSearch from "@/components/home/hero-search";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import CareerExplorer from "@/components/discovery/career-explorer";
// import SalaryInsights from "@/components/discovery/salary-insights";
// import UniversityRankings from "@/components/discovery/university-rankings";
import ProgramsSection from "@/components/home/online-courses";
import { Footer } from "@/components/layout/footer";
import FAQ from "@/components/faq";
import { GraduatesMarquee } from "@/components/graduates-marquee";
// import DegreeCards from "@/components/home/degree-cards";
// import SuccessStories from "@/components/home/success-stories";
// import ScholarshipBanner from "@/components/home/scholarship-banner";
// import CareerExplorer from "@/components/home/career-explorer";

export default function HomePage() {
  return (
    <main>
      <HeroSearch />

      <PopularCoursesSection />

      {/* tempppp */}

      <CareerExplorer />
      <ProgramsSection />
      <GraduatesMarquee />
      {/* <SalaryInsights /> */}
      {/* <UniversityRankings /> */}
      <FAQ />
      <Footer />

      {/* _____________________ */}

      {/* <DegreeCards /> */}
      {/* <CareerExplorer /> */}
      {/* <SuccessStories /> */}
      {/* <ScholarshipBanner /> */}
    </main>
  );
}
