export type Offer = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  brandLogoSrc: string;
  duration: string;
  fee: string;
  mode: "Online" | "Offline" | "Hybrid";
  icon: "bar-chart" | "graduation-cap" | "book-open" | "bot" | "cpu";
  href: string;
  videoSrc?: string;
};

export const popularCourses: Offer[] = [
  {
    id: 1,
    imageSrc: "/courses/iim.jpeg",
    imageAlt: "Business analysis and data visualization",
    tag: "Popular",
    title: "IIM K HR Analytics",
    brandLogoSrc: "",
    duration: "6 Months",
    fee: "₹1,20,000",
    mode: "Online",
    icon: "bar-chart",
    href: "/programs/iim-k-hr-analytics",
    videoSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
  },
  {
    id: 2,
    imageSrc: "/courses/opjindal.png",
    imageAlt: "1 Year MBA - O.P Jindal",
    tag: "Trending",
    title: "1 Year MBA - O.P Jindal",
    brandLogoSrc: "",
    duration: "12 Months",
    fee: "₹1,80,000",
    mode: "Online",
    icon: "graduation-cap",
    href: "/programs/op-jindal-mba",
    videoSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
  },
  {
    id: 3,
    imageSrc: "/courses/dba.png",
    imageAlt: "Online DBA - Rushford",
    tag: "Advanced",
    title: "Online DBA - Rushford",
    brandLogoSrc: "",
    duration: "36 Months",
    fee: "₹4,50,000",
    mode: "Online",
    icon: "book-open",
    href: "/programs/rushford-dba",
    videoSrc: "https://www.youtube.com/embed/uhLyIkBATJs",
  },
  {
    id: 4,
    imageSrc: "/courses/esg.png",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "GGU Gen Ai",
    brandLogoSrc: "",
    duration: "8 Months",
    fee: "₹95,000",
    mode: "Online",
    icon: "bot",
    href: "/programs/ggu-gen-ai",
    videoSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
  },
  {
    id: 5,
    imageSrc: "/courses/ggu.png",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
    videoSrc: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
  },
  {
    id: 6,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
  },
  {
    id: 7,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
  },
  {
    id: 8,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
  },
  {
    id: 9,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
  },
  {
    id: 10,
    imageSrc:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI and machine learning",
    tag: "New",
    title: "IIM K AI Professional",
    brandLogoSrc: "",
    duration: "10 Months",
    fee: "₹1,50,000",
    mode: "Online",
    icon: "cpu",
    href: "/programs/iimk-ai",
  },
];
