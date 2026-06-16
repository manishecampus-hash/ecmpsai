import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScholarshipBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-8 md:p-12">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-orange-500 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              ₹50,000+ Scholarships for 2026
            </h2>
            <p className="text-white/60 max-w-md">
              Merit-based and need-based scholarships from top universities. Check your eligibility now.
            </p>
          </div>

          <Link href="/search?q=scholarships" className="flex-shrink-0">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-black px-8 rounded-xl h-12 flex items-center gap-2">
              Explore Scholarships
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
