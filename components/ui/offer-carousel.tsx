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

const VideoModal = ({ src, onClose }: { src: string; onClose: () => void }) => {
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

const toEmbedUrl = (src: string): string => {
  try {
    // Already an embed URL
    if (src.includes("youtube.com/embed/")) {
      return src;
    }
    // youtu.be short link
    if (src.includes("youtu.be/")) {
      const id = src.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com/watch?v=
    if (src.includes("youtube.com/watch")) {
      const url = new URL(src);
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Return as-is for non-YouTube or already-correct URLs
    return src;
  } catch {
    return src;
  }
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
  const [hovered, setHovered] = React.useState(false);

  const autoplaySrc = React.useMemo(() => {
    if (!offer.videoSrc) return null;
    try {
      const embedUrl = toEmbedUrl(offer.videoSrc);
      const url = new URL(embedUrl);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", "1");
      url.searchParams.set("controls", "0");
      url.searchParams.set("loop", "1");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("modestbranding", "1");
      url.searchParams.set("rel", "0");
      url.searchParams.set("enablejsapi", "1");
      // loop requires playlist param set to the same video id
      const videoId = url.pathname.split("/embed/")[1]?.split("?")[0];
      if (videoId) {
        url.searchParams.set("playlist", videoId);
      }
      return url.toString();
    } catch {
      return offer.videoSrc;
    }
  }, [offer.videoSrc]);

  // Modal src: embed URL with autoplay + controls
  const modalSrc = React.useMemo(() => {
    if (!offer.videoSrc) return null;
    try {
      const embedUrl = toEmbedUrl(offer.videoSrc);
      const url = new URL(embedUrl);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("enablejsapi", "1");
      url.searchParams.set("rel", "0");
      return url.toString();
    } catch {
      return offer.videoSrc;
    }
  }, [offer.videoSrc]);

  const cardInner = (
    <>
      {/* Rank number */}
      <span
        className="absolute bottom-0 left-2 z-10 text-[65px] sm:text-[85px] lg:text-[100px] font-black select-none pointer-events-none"
        style={{ WebkitTextStroke: "2px white", WebkitTextFillColor: "#111" }}
      >
        {rank}
      </span>

      {/* Media container */}
      <div className="ml-6 h-full w-full overflow-hidden rounded-xl shadow-md relative">
        {/* Thumbnail image — always rendered */}
        <img
          src={offer.imageSrc}
          alt={offer.imageAlt}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            hovered && offer.videoSrc
              ? "opacity-0 scale-110"
              : "opacity-100 scale-100",
          )}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const placeholder = target.nextElementSibling as HTMLElement | null;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />

        {/* Fallback placeholder */}
        <div
          className="hidden h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-xs text-center p-2"
          aria-hidden="true"
        >
          <span>No Image</span>
        </div>

        {/* Hover video preview — covers full card without black bars */}
        {offer.videoSrc && hovered && autoplaySrc && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={autoplaySrc}
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "177.78%",
                height: "177.78%",
                minWidth: "100%",
                minHeight: "100%",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={offer.imageAlt}
            />
          </div>
        )}

        {/* Click-to-fullscreen overlay (only when video exists) */}
        {offer.videoSrc && (
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onVideoClick(modalSrc ?? offer.videoSrc!);
            }}
          />
        )}
      </div>
    </>
  );

  const sizeClasses =
    "relative flex h-[180px] w-[150px] flex-shrink-0 sm:h-[250px] sm:w-[180px] lg:h-[260px] lg:w-[210px]";

  if (offer.videoSrc) {
    return (
      <div
        className={sizeClasses}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {cardInner}
      </div>
    );
  }

  return (
    <Link href={offer.href || "#"} className={sizeClasses}>
      {cardInner}
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
