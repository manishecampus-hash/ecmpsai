"use client";

import Link from "next/link";

export default function DegreeCta() {
    return (
        <div className="mt-8 p-8 text-center">
            <p className="text-xl font-bold mb-2 text-gray-900">
                Not sure which degree suits you?
            </p>

            <p className="text-gray-500 text-sm mb-6">
                Get personalised guidance from eCampus AI — compare fees, check eligibility, and find the right university for your profile.
            </p>

            <Link
                href="/"
                className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-gray-700 transition-all text-sm"
            >
                Ask eCampus AI 🤖
            </Link>
        </div>
    );
}