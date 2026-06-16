"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag?: string;
  href: string;
  videoSrc?: string;
}

const VideoModal = ({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) => {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 aspect-video rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={src}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const OfferCard = ({
  offer,
  index,
  onVideoClick,
}: {
  offer: Offer;
  index: number;
  onVideoClick: (src: string) => void;
}) => {
  const rank = index + 1;

  const handleClick = () => {
    if (offer.videoSrc) {
      onVideoClick(offer.videoSrc);
    }
  };

  const cardContent = (
    <>
      <span
        className="absolute bottom-0 left-2 z-10 text-[65px] sm:text-[85px] lg:text-[100px] font-black"
        style={{ WebkitTextStroke: "2px white", WebkitTextFillColor: "#111" }}
      >
        {rank}
      </span>
      <div className="ml-6 h-full w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={offer.imageSrc}
          alt={offer.imageAlt}
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const placeholder = target.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
        <div
          className="hidden h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-xs text-center p-2"
          aria-hidden="true"
        >
          <span>No Image</span>
        </div>
      </div>
    </>
  );

  if (offer.videoSrc) {
    return (
      <div
        onClick={handleClick}
        className="relative flex h-[180px] w-[150px] flex-shrink-0 sm:h-[250px] sm:w-[180px] lg:h-[260px] lg:w-[210px] cursor-pointer"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={offer.href || "#"}
      className="relative flex h-[150px] w-[150px] flex-shrink-0 sm:h-[250px] sm:w-[180px] lg:h-[260px] lg:w-[210px]"
    >
      {cardContent}
    </Link>
  );
};

export const OfferCarousel = ({
  offers,
  className,
}: {
  offers: Offer[];
  className?: string;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = scrollRef.current?.clientWidth ?? 400;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 500);
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [offers]);

  return (
    <>
      <div className={cn("relative w-full", className)}>
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-40 -translate-y-1/2 flex h-24 w-4 items-center justify-center rounded-r-full bg-[#666666] text-white hover:bg-[#333] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className={cn(
            "flex gap-4 overflow-x-auto py-6 scroll-smooth",
            showLeft && showRight
              ? "px-7 md:mx-10 md:px-0"
              : showLeft
                ? "pl-7 pr-4 md:mx-10 md:px-0"
                : "pl-4 pr-7 md:mx-10 md:px-0",
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
              onVideoClick={setActiveVideo}
            />
          ))}
        </div>

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-40 -translate-y-1/2 flex h-24 w-4 items-center justify-center rounded-l-full bg-[#666666] text-white hover:bg-[#333] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
};