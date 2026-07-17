// "use client";

// import React from "react";
// import Image from "next/image";

// interface OfficeCardProps {
//   city: string;
//   address: string;
//   imageUrl: string;
//   tag?: string;
// }

// const offices: OfficeCardProps[] = [
//   {
//     city: "Noida",
//     tag: "Headquarters",
//     address: "B-46, 2nd Floor, Sector 2, Noida, Uttar Pradesh – 201301",
//     imageUrl: "/contact/noida-map.png",
//   },
//   {
//     city: "Dubai",
//     tag: "Global Office",
//     address:
//       "Dubai Office - 3006, X3 Tower, Jumeirah Lakes Tower, Dubai, U.A.E",
//     imageUrl: "/contact/dubai.png",
//   },
//   {
//     city: "Aligarh",
//     tag: "Hub Office",
//     address:
//       "Bankner Nadrai Gate, Opp. Khusi Restaurant, Gandhi Kunj, Kasganj, UP – 207123",
//     imageUrl: "/contact/aligarh.png",
//   },
// ];

// /* ── STRONG HIGHLIGHT STYLES ── */
// const getTagStyle = (tag?: string) => {
//   switch (tag) {
//     case "Headquarters":
//       return "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-300 shadow-lg shadow-yellow-500/40 font-bold";
//     case "Global Office":
//       return "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/40 font-semibold";
//     case "Hub Office":
//       return "bg-gray-800 text-white border-gray-500 shadow-md font-medium";
//     default:
//       return "bg-white/20 text-white border-white/30";
//   }
// };

// const OurOffices: React.FC = () => {
//   return (
//     <section className="max-w-6xl mx-auto px-6 py-20">
//       <h2 className="text-4xl font-bold text-gray-900 mb-20 text-center">
//         Our Offices
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//         {offices.map((office) => (
//           <OfficeCard key={office.city} {...office} />
//         ))}
//       </div>
//     </section>
//   );
// };

// const OfficeCard: React.FC<OfficeCardProps> = ({
//   city,
//   address,
//   imageUrl,
//   tag,
// }) => {
//   return (
//     <div className="relative rounded-3xl bg-white border border-gray-100 shadow-xl p-8 pt-20 transition-all hover:shadow-2xl">
//       {/* 🟢 CIRCLE IMAGE (POP-OUT EFFECT) */}
//       <div className="absolute -top-12 left-8 z-10">
//         <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
//           <Image
//             src={imageUrl}
//             alt={city}
//             fill
//             unoptimized
//             className="object-cover"
//           />
//         </div>
//       </div>

//       {/* STRONG TAG */}
//       {tag && (
//         <div className="absolute top-6 right-6 z-20">
//           <span
//             className={`text-xs px-4 py-1.5 rounded-full border ${getTagStyle(tag)}`}
//           >
//             {tag === "Headquarters" && "🔥 "}
//             {tag === "Global Office" && "🌍 "}
//             {tag === "Aligarh" && "📍 "}
//             {tag}
//           </span>
//         </div>
//       )}

//       {/* TEXT CONTENT */}
//       <div className="space-y-3">
//         <h3 className="text-2xl font-extrabold text-gray-900">{city}</h3>
//         <p className="text-gray-500 text-sm leading-relaxed">{address}</p>
//       </div>
//     </div>
//   );
// };

// export default OurOffices;

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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 md:mb-20 text-center">
        Our Offices
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
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
    <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-red-600">
      {/* CARD CONTENT */}
      <div className="p-6 sm:p-8 pt-16 sm:pt-20">
        {/* 🟢 CIRCLE IMAGE (POP-OUT EFFECT) */}
        <div className="absolute -top-9 sm:-top-12 left-6 sm:left-8 z-10 transition-all duration-300 group-hover:scale-110">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-300 group-hover:border-red-600">
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
          <div className="absolute top-3 sm:top-6 right-3 sm:right-6 z-20">
            <span
              className={`text-[10px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border whitespace-nowrap transition-all duration-300 ${getTagStyle(tag)} group-hover:scale-110 group-hover:shadow-xl`}
            >
              {tag === "Headquarters" && "🔥 "}
              {tag === "Global Office" && "🌍 "}
              {tag === "Aligarh" && "📍 "}
              {tag}
            </span>
          </div>
        )}

        {/* TEXT CONTENT */}
        <div className="space-y-2 sm:space-y-3 transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
            {city}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-600">
            {address}
          </p>
        </div>
      </div>

      {/* SOCIAL MEDIA BAR - POSITIONED ABSOLUTELY, NO HEIGHT CHANGE */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
        <ul className="flex items-center justify-center bg-red-600">
          <li>
            <a
              href="#"
              aria-label="Facebook"
              className="block px-3 sm:px-4 py-2.5 sm:py-3 text-white transition-colors duration-300 hover:bg-white hover:text-red-600"
            >
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Twitter"
              className="block px-3 sm:px-4 py-2.5 sm:py-3 text-white transition-colors duration-300 hover:bg-white hover:text-red-600"
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="LinkedIn"
              className="block px-3 sm:px-4 py-2.5 sm:py-3 text-white transition-colors duration-300 hover:bg-white hover:text-red-600"
            >
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Location"
              className="block px-3 sm:px-4 py-2.5 sm:py-3 text-white transition-colors duration-300 hover:bg-white hover:text-red-600"
            >
              <PinIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const FacebookIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.55c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.98 3.1 15.04 3 13.94 3c-2.3 0-3.87 1.4-3.87 3.98v2.62H7.3v3.2h2.77V21h3.43z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 5.9c-.72.32-1.5.53-2.31.63a4.03 4.03 0 0 0 1.77-2.22c-.78.46-1.64.8-2.56.98a4.02 4.02 0 0 0-6.85 3.66A11.4 11.4 0 0 1 3.66 4.9a4.02 4.02 0 0 0 1.24 5.36c-.66-.02-1.28-.2-1.82-.5v.05a4.02 4.02 0 0 0 3.22 3.94c-.6.16-1.24.19-1.88.07a4.02 4.02 0 0 0 3.75 2.79A8.07 8.07 0 0 1 2 18.57 11.38 11.38 0 0 0 8.16 20.4c7.4 0 11.44-6.13 11.44-11.44 0-.17 0-.35-.01-.52A8.18 8.18 0 0 0 22 5.9z" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.7c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.8h-4V9z" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default OurOffices;
