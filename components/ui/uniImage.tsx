"use client";

import Image from "next/image";

interface UniImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function UniImage({ src, alt, className }: UniImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={className ?? "object-cover"}
            onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/120x80/e2e8f0/64748b?text=${encodeURIComponent(alt[0])}`;
            }}
        />
    );
}