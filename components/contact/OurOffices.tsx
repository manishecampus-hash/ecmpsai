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
    tag: "Hub Office",
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
    case "Hub Office":
      return "bg-gray-800 text-white border-gray-500 shadow-md font-medium";
    default:
      return "bg-white/20 text-white border-white/30";
  }
};

const OurOffices: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-20 text-center">
        Our Offices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
    <div className="relative rounded-3xl bg-white border border-gray-100 shadow-xl p-8 pt-20 transition-all hover:shadow-2xl">
      {/* 🟢 CIRCLE IMAGE (POP-OUT EFFECT) */}
      <div className="absolute -top-12 left-8 z-10">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src={imageUrl}
            alt={city}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      {/* STRONG TAG */}
      {tag && (
        <div className="absolute top-6 right-6 z-20">
          <span
            className={`text-xs px-4 py-1.5 rounded-full border ${getTagStyle(tag)}`}
          >
            {tag === "Headquarters" && "🔥 "}
            {tag === "Global Office" && "🌍 "}
            {tag === "Aligarh" && "📍 "}
            {tag}
          </span>
        </div>
      )}

      {/* TEXT CONTENT */}
      <div className="space-y-3">
        <h3 className="text-2xl font-extrabold text-gray-900">{city}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{address}</p>
      </div>
    </div>
  );
};

export default OurOffices;
