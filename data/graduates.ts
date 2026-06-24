export type GraduateTestimonialT = {
  initials: string;
  avatarColor: string;
  avatarSrc?: string;
  name: string;
  role: string;
  rating: number;
  testimonial: string;
};

export const DEFAULT_GRADUATES: GraduateTestimonialT[] = [
  {
    initials: "SC",
    avatarColor: "#ef4444",
    avatarSrc: "/graduates/feedback1.png",
    name: "Sarah Chen",
    role: "MBA, Jul'25",
    rating: 5,
    testimonial: "Career transformation success story.",
  },
  {
    initials: "MJ",
    avatarColor: "#f97316",
    avatarSrc: "/graduates/feedback2.png",
    name: "Marcus Johnson",
    role: "B.Tech, Jun'25",
    rating: 5,
    testimonial: "Amazing mentorship and learning support.",
  },
  {
    initials: "PS",
    avatarColor: "#dc2626",
    avatarSrc: "/graduates/priyanshu-mishra.webp",
    name: "Priyanshu Mishra",
    role: "MBA, Jul'25",
    rating: 5,
    testimonial: "Excellent career services experience.",
  },
  {
    initials: "JW",
    avatarColor: "#64748b",
    avatarSrc: "/graduates/james-wilson.webp",
    name: "James Wilson",
    role: "MBA, May'25",
    rating: 4,
    testimonial: "Flexible and practical program.",
  },
];
