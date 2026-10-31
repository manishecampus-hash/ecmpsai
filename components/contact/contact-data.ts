// Contact details shown on the Contact Us page
export const PHONE = { display: "1800-121-6201", tel: "18001216201" };
export const EMAIL = "support@ecampusapp.com";
export const WHATSAPP = { display: "+91 93559 07564", number: "919355907564" };

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const OFFICES = [
  {
    city: "Noida",
    tag: "Headquarters",
    country: "India",
    address: "B-46, 2nd Floor, Sector 2, Noida, Uttar Pradesh – 201301",
  },
  {
    city: "Dubai",
    tag: "Global Office",
    country: "UAE",
    address: "3006, X3 Tower, Jumeirah Lakes Tower, Dubai, U.A.E",
  },
  {
    city: "Aligarh",
    tag: "Hub Office",
    country: "India",
    address: "Bankner Nadrai Gate, Opp. Khusi Restaurant, Gandhi Kunj, Kasganj, UP – 207123",
  },
];
