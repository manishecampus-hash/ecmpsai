import HeroSearch from "@/components/home/hero-search";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import CareerExplorer from "@/components/discovery/career-explorer";
import ProgramsSection from "@/components/home/online-courses";
import { Footer } from "@/components/layout/footer";
import FAQ from "@/components/faq";
import { GraduatesMarquee } from "@/components/graduates-marquee";

export default function HomePage() {
  return (
    <main>
      <HeroSearch />

      <PopularCoursesSection />

      <CareerExplorer />
      <ProgramsSection />
      <GraduatesMarquee />

      <FAQ />
      <Footer />
    </main>
  );
}
