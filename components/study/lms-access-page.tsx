import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Laptop,
  Search,
  ShieldCheck,
  Smartphone,
  Tag,
  Users,
  Video,
  FileText,
  Globe,
  HeadphonesIcon,
  Award,
  Wifi,
  ClipboardList,
  MessageSquare,
  Star,
} from "lucide-react";

const stats = [
  { label: "100+ Universities", icon: Building2 },
  { label: "Verified LMS Credentials", icon: CheckCircle2 },
  { label: "1,000+ Courses", icon: GraduationCap },
];

const universityPairs = [
  {
    universities: [
      {
        name: "Sanskriti University Engineering",
        logo: "/universities/sanskriti.png",
        rating: "4.6",
        features: [
          { label: "Live Recorded Lectures", icon: Video },
          { label: "Progress Tracking Dashboard", icon: BarChart3 },
          { label: "Online Proctored Exams", icon: ShieldCheck },
          { label: "Mobile LMS Access", icon: Smartphone },
        ],
      },
      {
        name: "Amity University Online",
        logo: "/universities/amity.webp",
        rating: "4.7",
        features: [
          { label: "AI Academic Support", icon: Bot },
          { label: "Virtual Campus Community", icon: Users },
          { label: "Live Recorded Sessions", icon: Video },
          { label: "Secure Online Exams", icon: ShieldCheck },
        ],
      },
    ],
    deals: [
      "Flat ₹5,000 off on first semester fees",
      "Free study material worth ₹2,000",
    ],
  },
  {
    universities: [
      {
        name: "Manipal University Online",
        logo: "/universities/onlinemanipal.webp",
        rating: "4.7",
        features: [
          { label: "Progress Tracking Dashboard", icon: BarChart3 },
          { label: "Live Recorded Sessions", icon: Video },
          { label: "Discussion Forums", icon: BookOpen },
          { label: "Dedicated Learner App", icon: Smartphone },
        ],
      },
      {
        name: "Lovely Professional University",
        logo: "/universities/lpu.png",
        rating: "4.5",
        features: [
          { label: "24/7 Student Support", icon: HeadphonesIcon },
          { label: "Industry Certifications", icon: Award },
          { label: "Live Interactive Classes", icon: Video },
          { label: "Online Examination Portal", icon: ClipboardList },
        ],
      },
    ],
    deals: [
      "₹10,000 cashback on full fee payment",
      "Free alumni network access for life",
    ],
  },
  // Add other university pairs here following the same structure
];

export default function LmsAccessPage() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4 leading-tight">
            Access Your <span className="text-red-600">University LMS</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto px-2">
            Choose your institution to get verified access to your learning
            portal, dashboard, and resources.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10 sm:mb-12">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-sm border border-gray-100"
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 shrink-0" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-col sm:block gap-2">
            <input
              type="search"
              placeholder="Search for your university..."
              className="w-full h-14 sm:h-16 pl-5 sm:pl-6 pr-4 sm:pr-28 rounded-2xl border-0 shadow-lg ring-1 ring-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-base sm:text-lg"
            />

            <button className="w-full sm:w-auto sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 bg-gray-900 text-white h-10 px-3 rounded-full font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                <Search className="w-4 h-4" />
              </span>
              Search
            </button>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grid gap-4 sm:gap-6">
          {universityPairs.map((pair, pairIdx) => (
            <div
              key={pairIdx}
              className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <div className="relative grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-gray-200 gap-6 md:gap-0">
                {pair.universities.map((university, uniIdx) => (
                  <div
                    key={university.name}
                    className={`flex flex-col gap-3 sm:gap-4 pt-6 first:pt-0 md:pt-0 ${
                      uniIdx === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="h-10 w-24 sm:h-12 sm:w-32 relative bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100 shrink-0">
                        <Image
                          src={university.logo}
                          alt={university.name}
                          width={120}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <span className="bg-amber-50 text-amber-700 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{" "}
                        {university.rating}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug">
                      {university.name}
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                      {university.features.map((f) => (
                        <li key={f.label} className="flex items-center gap-2">
                          <f.icon className="h-3.5 w-3.5 text-red-500 shrink-0" />{" "}
                          <span>{f.label}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="http://localhost:3000/apply"
                      className="mt-2 sm:mt-4 text-red-600 font-semibold flex items-center gap-1 text-sm hover:underline"
                    >
                      Access LMS <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}

                {/* Center "OR" badge (desktop only) — anchored on the divide-x line */}
                <span className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-[10px] font-bold text-gray-500 items-center justify-center shadow-sm">
                  OR
                </span>
              </div>

              {/* Deal Section */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100 flex flex-wrap gap-2 sm:gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center">
                  Exclusive Deals:
                </span>
                {pair.deals.map((deal) => (
                  <span
                    key={deal}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {deal}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
