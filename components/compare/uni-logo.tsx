import Image from "next/image";
import type { CompareUniversity } from "@/data/compare-pairs";

// White logo tile; universities without a logo file get a monogram in the same tile
export default function UniLogo({ uni, className = "h-12 w-24" }: { uni: CompareUniversity; className?: string }) {
  return (
    <span className={`relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 ${className}`}>
      {uni.logo ? (
        <Image src={uni.logo} alt={`${uni.name} logo`} fill sizes="120px" className="object-contain p-1.5" />
      ) : (
        <span aria-hidden className="text-base font-black tracking-tight text-slate-900">
          {uni.short}
        </span>
      )}
    </span>
  );
}
