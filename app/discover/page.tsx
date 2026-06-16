import CareerExplorer from "@/components/discovery/career-explorer";
import DegreeFinderFlow from "@/components/discovery/degree-finder/degree-finder-flow";
import SalaryInsights from "@/components/discovery/salary-insights";
import UniversityRankings from "@/components/discovery/university-rankings";
import { PopularCoursesSection } from "@/components/home/goal-cards";
import { Footer } from "@/components/layout/footer";

export default function DiscoverPage() {
    return (
        <main>
            <DegreeFinderFlow />
            <PopularCoursesSection />
            <CareerExplorer />
            <SalaryInsights />
            <UniversityRankings />
            <Footer />
        </main>
    );
}