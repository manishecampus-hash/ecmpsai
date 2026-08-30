import HeroSearch from "@/components/home/hero-search";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import CareerExplorer from "@/components/home/career-explorer";
import ProgramsSection from "@/components/home/online-courses";
import { Footer } from "@/components/layout/footer";
import FAQ from "@/components/home/faq";
import { GraduatesMarquee } from "@/components/home/graduates-marquee";
import { MediaSection } from "@/components/home/media";
import { CarouselBanner } from "@/components/home/carousel-banner";

export default function HomePage() {
  return (
    <main className="home-sections">
   <div className="mt-1  mb-1">
  <CarouselBanner />
</div>
      <HeroSearch />
      <PopularCoursesSection />
      <CareerExplorer />
      <ProgramsSection />
      <MediaSection />
      <GraduatesMarquee />

      <FAQ />
      <Footer />
    </main>
  );
}
