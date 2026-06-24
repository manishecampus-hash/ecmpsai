"use client";

import React from "react";
import Image from "next/image";

interface OfficeCardProps {
  city: string;
  address: string;
  imageUrl: string;
  tag?: string;
}

const offices: OfficeCardProps[] = [
  {
    city: "Noida",
    tag: "Headquarters",
    address: "B-46, 2nd Floor, Sector 2, Noida, Uttar Pradesh – 201301",
    imageUrl: "/contact/noida-map.png",
  },
  {
    city: "Dubai",
    tag: "Global Office",
    address:
      "Dubai Office - 3006, X3 Tower, Jumeirah Lakes Tower, Dubai, U.A.E",
    imageUrl: "/contact/dubai.png",
  },
  {
    city: "Aligarh",
    tag: "Aligarh",
    address:
      "Bankner Nadrai Gate, Opp. Khusi Restaurant, Gandhi Kunj, Kasganj, UP – 207123",
    imageUrl: "/contact/aligarh.png",
  },
];

/* ── STRONG HIGHLIGHT STYLES ── */
const getTagStyle = (tag?: string) => {
  switch (tag) {
    case "Headquarters":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-300 shadow-lg shadow-yellow-500/40 font-bold";
    case "Global Office":
      return "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/40 font-semibold";
    case "Aligarh":
      return "bg-gray-800 text-white border-gray-500 shadow-md font-medium";
    default:
      return "bg-white/20 text-white border-white/30";
  }
};

const OurOffices: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Offices</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offices.map((office) => (
          <OfficeCard key={office.city} {...office} />
        ))}
      </div>
    </section>
  );
};

const OfficeCard: React.FC<OfficeCardProps> = ({
  city,
  address,
  imageUrl,
  tag,
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden h-80 group border border-gray-200 shadow-lg">
      {/* IMAGE */}
      <Image
        src={imageUrl}
        alt={city}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* 🔥 STRONG TAG */}
      {tag && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`text-xs px-4 py-1.5 rounded-full border ${getTagStyle(
              tag,
            )}`}
          >
            {tag === "Headquarters" && "🔥 "}
            {tag === "Global Office" && "🌍 "}
            {tag === "Aligarh" && "📍 "}
            {tag}
          </span>
        </div>
      )}

      {/* PIN */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <PinIcon />
      </div>

      {/* TEXT */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
        <h3 className="text-white text-xl font-bold">{city}</h3>
        <p className="text-white/80 text-xs mt-1">{address}</p>
      </div>
    </div>
  );
};

const PinIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="#ffffff"
    />
    <circle cx="12" cy="9" r="2.5" fill="#000" />
  </svg>
);

export default OurOffices;
