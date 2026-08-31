"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:px-10 sm:py-16">

          {/* Background Decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-50" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-red-50" />

          {/* Success Icon */}
          <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <div className="absolute inset-0 rounded-full border border-red-100" />

            <CheckCircle2
              className="h-12 w-12 text-red-500"
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}
          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
              Submission Successful
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Thank You!
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Your request has been submitted successfully. Our education
              counsellor will get in touch with you shortly.
            </p>
          </div>

          {/* Info Box */}
          <div className="relative mx-auto mt-8 max-w-lg rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5 text-left">
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  What happens next?
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Our counsellor will review your details and contact you to
                  help you with the next steps.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-100 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>

            <Link
              href="/programs"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              Explore Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Bottom Text */}
          <p className="relative mt-8 text-xs text-gray-400">
            We appreciate your interest in eCampus Edu.
          </p>
        </div>
      </div>
    </main>
  );
}