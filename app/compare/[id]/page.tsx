import { UNIVERSITY_COMPARISONS } from '@/data/comparisons';
import { notFound } from 'next/navigation';
import HeroSection from './components/hero-section';
import AcademicSection from './components/academic-section';
import FeeSection from './components/fee-section';
import CampusLife from './components/campus-life';
import VerdictSection from './components/verdict-section';
import { HighlightsSection, EligibilitySection, PlacementsSection, FAQSection } from './components/extra-sections';
import { Footer } from '@/components/layout/footer';
import CompareSubHeader from './components/compare-sub-header';

export async function generateStaticParams() {
    return UNIVERSITY_COMPARISONS.map((pair) => ({ id: pair.id }));
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pair = UNIVERSITY_COMPARISONS.find((p) => p.id === id);

    if (!pair) return notFound();

    return (
        <main className="min-h-screen bg-gray-50 pb-12">
            <CompareSubHeader />
            {/* 
               The max-w-5xl container aligns content to the center 
               and prevents over-stretching on wide monitors.
            */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
                <div id="overview" className="scroll-mt-28"><HeroSection a={pair.a} b={pair.b} /></div>
                <div id="highlights" className="scroll-mt-28"><HighlightsSection a={pair.a} b={pair.b} /></div>
                <div id="academics" className="scroll-mt-28"><AcademicSection a={pair.a} b={pair.b} /></div>
                <div id="eligibility" className="scroll-mt-28"><EligibilitySection a={pair.a} b={pair.b} /></div>
                <div id="fees" className="scroll-mt-28"><FeeSection a={pair.a} b={pair.b} /></div>
                <div id="campus" className="scroll-mt-28"><CampusLife a={pair.a} b={pair.b} /></div>
                <div id="placements" className="scroll-mt-28"><PlacementsSection a={pair.a} b={pair.b} /></div>
                <div id="verdict" className="scroll-mt-28">
                    <VerdictSection
                        a={{ ...pair.a, verdict: pair.a.verdict || "A solid choice with great potential." }}
                        b={{ ...pair.b, verdict: pair.b.verdict || "A competitive option with strong features." }}
                        recommendation={pair.recommendation || "Both options have their own merits. Choose based on your specific needs."}
                    />
                </div>
                <div id="faq" className="scroll-mt-28"><FAQSection /></div>
            </div>
            <Footer />
        </main>
    );
}