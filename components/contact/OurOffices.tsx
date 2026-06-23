"use client";

import React from "react";
import Image from "next/image";

/* ── Types ── */
interface OfficeCardProps {
  city: string;
  address: string;
  imageUrl: string;
  tag?: string;
}

/* ── Office data ── */
const offices: OfficeCardProps[] = [
  {
    city: "Noida",
    tag: "Headquarters",
    address: "B-46, 2nd Floor, Sector 2, Noida, Uttar Pradesh – 201301",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Noida_skyline.jpg/1280px-Noida_skyline.jpg",
  },
  {
    city: "Kasganj",
    tag: "Branch Office",
    address:
      "Bankner Nadrai Gate, Opp. Khusi Restaurant, Gandhi Kunj, Kasganj, UP – 207123",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Agra_03-2016_15_Taj_Mahal.jpg/1280px-Agra_03-2016_15_Taj_Mahal.jpg",
  },
  {
    city: "United States",
    tag: "Global Office",
    address:
      "Blackboard E Learning LLC, 8 The Green, Suite A, Dover, Delaware – 19901",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/24701-nature-natural-beauty.jpg/1280px-24701-nature-natural-beauty.jpg",
  },
];

/* ── Main Component ── */
const OurOffices: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Offices</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offices.map((office) => (
          <OfficeCard key={office.city} {...office} />
        ))}
      </div>
    </section>
  );
};

/* ── Office Card ── */
const OfficeCard: React.FC<OfficeCardProps> = ({
  city,
  address,
  imageUrl,
  tag,
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
      {/* Background image — optimized with next/image */}
      <Image
        src={imageUrl}
        alt={`${city} office`}
        fill
        unoptimized // ← Add this as temporary fix
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay — light at top, dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Tag pill — top left */}
      {tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/30">
            {tag}
          </span>
        </div>
      )}

      {/* Pin icon — centered, above text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <PinIcon />
      </div>

      {/* City + address — bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center z-10">
        <h3 className="text-white text-xl font-bold mb-1">{city}</h3>
        <p className="text-white/80 text-xs leading-relaxed">{address}</p>
      </div>
    </div>
  );
};

/* ── Pin Icon ── */
const PinIcon: React.FC = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="#EF4444"
    stroke="#fff"
    strokeWidth="0.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" fill="#fff" stroke="none" />
  </svg>
);

export default OurOffices;
