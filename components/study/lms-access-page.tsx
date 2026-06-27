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
    ],
    deals: [
      "₹10,000 cashback on full fee payment",
      "Free alumni network access for life",
    ],
  },
];

export default function LmsAccessPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white px-4 py-10 text-gray-600 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-normal text-gray-950 sm:text-4xl">
            <span className="text-red-600">One Gateway</span> to Your University
            LMS
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            Select your university to continue. We&apos;ll verify your details
            and share the correct LMS login information.
          </p>
        </div>

        {/* Stats + Search */}
        <div className="mx-auto mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 text-center text-base font-bold text-gray-950"
              >
                <item.icon className="h-5 w-5 text-red-600" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <form className="mt-10 flex flex-col gap-4 lg:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search any university</span>
              <input
                type="search"
                placeholder="Search any University"
                className="h-14 w-full rounded-lg border border-gray-200 bg-white px-5 pr-12 text-sm font-medium text-gray-700 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-600" />
            </label>
            <button
              type="submit"
              className="h-14 rounded-lg bg-red-600 px-8 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              Search University
            </button>
          </form>
        </div>

        {/* University Pair Cards */}
        <div className="mx-auto mt-12 space-y-6 max-w-2xl">
          {universityPairs.map((pair, pairIdx) => (
            <article
              key={pairIdx}
              className="rounded-2xl border border-gray-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)] overflow-hidden"
            >
              {/* Universities side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-gray-100">
                {pair.universities.map((university) => (
                  <div
                    key={university.name}
                    className="flex flex-col gap-4 p-5 sm:p-6"
                  >
                    {/* Logo */}
                    {/* Logo */}
                    <div className="flex h-16 w-44 items-center justify-center rounded-xl border border-gray-200 bg-white px-3">
                      <Image
                        src={university.logo}
                        alt={`${university.name} logo`}
                        width={80}
                        height={36}
                        className="max-h-9 w-auto object-contain"
                      />
                    </div>

                    {/* Name + Rating */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-950">
                        {university.name}
                      </h2>
                      <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700">
                        ★ {university.rating}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                      {university.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-center gap-2"
                        >
                          <feature.icon className="h-4 w-4 shrink-0 text-red-600" />
                          <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/apply"
                      className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 whitespace-nowrap"
                    >
                      Get LMS Access
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Deals Strip */}
              <div className="border-t border-dashed border-red-100 bg-red-50 px-5 py-3 sm:px-6">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <Tag className="h-3.5 w-3.5" />
                    Exclusive Deals
                  </span>
                  {pair.deals.map((deal) => (
                    <span
                      key={deal}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500" />
                      {deal}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Floating AI Button */}
        <Link
          href="/search"
          aria-label="Ask AI"
          className="fixed bottom-8 right-6 hidden flex-col items-center gap-2 text-xs font-bold text-red-700 md:flex"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)]">
            <Laptop className="h-7 w-7" />
          </span>
          Ask AI
        </Link>
      </div>
    </section>
  );
}
