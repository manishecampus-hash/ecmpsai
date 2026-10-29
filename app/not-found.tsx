import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap, Headphones, Home, type LucideIcon } from "lucide-react";
import NotFoundIllustration from "@/components/not-found/not-found-illustration";

export const metadata: Metadata = {
  title: "Page Not Found | eCampus",
  description: "The page you are looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

// Existing routes the header and footer already link to
const QUICK_LINKS: { icon: LucideIcon; title: string; text: string; href: string }[] = [
  { icon: Compass, title: "Go to Homepage", text: "Start your learning journey", href: "/" },
  { icon: BookOpen, title: "Explore Courses", text: "Discover new programs", href: "/discover" },
  { icon: GraduationCap, title: "Student Portal", text: "Access your account", href: "/dashboard" },
  { icon: Headphones, title: "Need Help?", text: "Contact our support team", href: "/contact-us" },
];

// The site's global stylesheet removes focus rings, so links show focus with an underline instead.
const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="relative isolate flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-[#fdf8f8]">
      {/* Corner decoration: soft blobs and a dashed path */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-50" />
        <span className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-red-50" />
        <svg viewBox="0 0 220 120" className="absolute left-6 top-6 hidden h-24 w-48 md:block" fill="none">
          <path d="M4 110 C 60 100, 70 40, 130 40 S 200 20, 216 4" stroke="#fca5a5" strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 pb-10 pt-12 sm:px-8 lg:w-[86%] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:px-0 lg:pb-14 lg:pt-16">
        {/* Message */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-gray-700">
            Oops!
            <span aria-hidden className="h-0.5 w-12 rounded-full bg-red-600" />
          </p>
          <h1
            id="not-found-heading"
            className="mt-5 text-[40px] font-extrabold uppercase leading-[1.05] tracking-tight text-gray-900 sm:text-[52px] lg:text-[60px]"
          >
            Page <span className="text-red-700">Not Found</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
            Looks like this page took a study break and went off the syllabus.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className={`group inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-red-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-red-700/20 transition-colors hover:bg-red-800 ${FOCUS}`}
            >
              <Home className="h-[18px] w-[18px]" aria-hidden />
              Back to Home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/discover"
              className={`inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-red-700 bg-white px-6 py-3.5 text-[15px] font-semibold text-red-700 transition-colors hover:bg-red-50 ${FOCUS}`}
            >
              <BookOpen className="h-[18px] w-[18px]" aria-hidden />
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:fill-mode-both motion-safe:delay-150 motion-safe:duration-700">
          <NotFoundIllustration className="mx-auto h-auto w-full max-w-[620px]" />
        </div>
      </div>

      {/* Quick links */}
      <nav aria-label="Helpful links" className="mx-auto w-full max-w-[1320px] px-5 pb-14 sm:px-8 lg:w-[86%] lg:px-0">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {QUICK_LINKS.map(({ icon: Icon, title, text, href }) => (
            <li key={title} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <Link
                href={href}
                className={`group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white lg:justify-center ${FOCUS}`}
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-700 transition-colors duration-300 group-hover:bg-red-700 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-gray-900">{title}</span>
                  <span className="block text-sm text-gray-500">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
