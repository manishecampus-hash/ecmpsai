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
//     <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20">
//       <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-14 md:mb-20 text-center">
//         Our Offices
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
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
//     <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
//       {/* CARD CONTENT */}
//       <div className="p-6 sm:p-8 pt-16 sm:pt-20">
//         {/* 🟢 CIRCLE IMAGE (POP-OUT EFFECT) */}
//         <div className="absolute -top-9 sm:-top-12 left-6 sm:left-8 z-10 transition-all duration-300 group-hover:scale-110">
//           <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-300">
//             <Image
//               src={imageUrl}
//               alt={city}
//               fill
//               unoptimized
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* STRONG TAG */}
//         {tag && (
//           <div className="absolute top-3 sm:top-6 right-3 sm:right-6 z-20">
//             <span
//               className={`text-[10px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border whitespace-nowrap transition-all duration-300 ${getTagStyle(tag)} group-hover:scale-110 group-hover:shadow-xl`}
//             >
//               {tag === "Headquarters" && "🔥 "}
//               {tag === "Global Office" && "🌍 "}
//               {tag === "Aligarh" && "📍 "}
//               {tag}
//             </span>
//           </div>
//         )}

//         {/* TEXT CONTENT */}
//         <div className="space-y-2 sm:space-y-3 transition-all duration-300">
//           <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 transition-colors duration-300">
//             {city}
//           </h3>
//           <p className="text-gray-500 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-600">
//             {address}
//           </p>
//         </div>
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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-14 md:mb-20 text-center">
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
    <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* CARD CONTENT */}
      <div className="p-6 sm:p-8 pt-16 sm:pt-20">
        {/* 🟢 CIRCLE IMAGE (POP-OUT EFFECT) */}
        <div className="absolute -top-9 sm:-top-12 left-6 sm:left-8 z-10 transition-all duration-300 group-hover:scale-110">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-300">
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
              {tag === "Hub Office" && "📍 "}
              {tag}
            </span>
          </div>
        )}
        {/* TEXT CONTENT */}
        <div className="space-y-4 sm:space-y-5 transition-all duration-300">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 transition-colors duration-300">
              {city}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-600 mt-2">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurOffices;