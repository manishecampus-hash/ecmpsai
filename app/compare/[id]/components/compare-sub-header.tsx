"use client";

import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
    { id: "overview", label: "Program Overview" },
    { id: "highlights", label: "Key Highlights" },
    { id: "academics", label: "Subject/Syllabus" },
    { id: "eligibility", label: "Eligibility & Duration" },
    { id: "fees", label: "Program Fees" },
    { id: "campus", label: "Campus Life" },
    { id: "placements", label: "Career Scope" },
    { id: "verdict", label: "Verdict" },
    { id: "faq", label: "FAQs" },
];

export default function CompareSubHeader() {
    const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            let currentSection = NAV_ITEMS[0].id;
            for (const item of NAV_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the element is near the top of the viewport or above it
                    if (rect.top <= 140) {
                        currentSection = item.id;
                    }
                }
            }
            setActiveSection(currentSection);
            
            // Auto scroll the horizontal nav container if needed
            const container = scrollContainerRef.current;
            if (container) {
                const activeBtn = container.querySelector(`[data-id="${currentSection}"]`);
                if (activeBtn) {
                    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky header
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className={`sticky top-16 z-40 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${isScrolled ? 'translate-y-0 opacity-100 shadow-sm' : '-translate-y-full opacity-0 pointer-events-none'}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto hide-scrollbar gap-2 py-3"
                >
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            data-id={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                activeSection === item.id
                                    ? "bg-red-50 text-red-600 border border-red-200"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
