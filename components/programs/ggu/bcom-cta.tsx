import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";

export default function BComCTA() {
  return (
    <section
      id="apply"
      className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-red-500 p-8 text-center text-white shadow-xl shadow-red-100 sm:p-10">
        <Users className="mx-auto mb-4 h-9 w-9" />
        <h2 className="text-3xl font-black">Start Your B.Com Journey</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-red-50 sm:text-base">
          Get admission guidance, fee details, eligibility support, and program
          counselling from our education experts.
        </p>
        <Link
          href="#"
          className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-black text-red-500 transition hover:bg-red-50"
        >
          Enroll Now
        </Link>
      </div>
    </section>
  );
}
