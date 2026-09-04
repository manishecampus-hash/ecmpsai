"use client";

import React from "react";
import {
  BriefcaseBusiness,
  UserRound,
  Star,
} from "lucide-react";

const counsellors = [
  {
    name: "Siddharth Stephen",
    image: "/dba/counsellor-1.png",
    rating: "4.4/5",
    experience: "10+ Yrs. Experience",
    students: "5677+ Students Counselled",
  },
  {
    name: "Kriti Bhalla",
    image: "/dba/counsellor-2.png",
    rating: "4.7/5",
    experience: "12+ Yrs. Experience",
    students: "6975+ Students Counselled",
  },
  {
    name: "Rashid Ali",
    image: "/dba/counsellor-3.png",
    rating: "4.3/5",
    experience: "7+ Yrs. Experience",
    students: "4267+ Students Counselled",
  },
  {
    name: "Ashok Joshi",
    image: "/dba/counsellor-4.png",
    rating: "4.8/5",
    experience: "9+ Yrs. Experience",
    students: "5634+ Students Counselled",
  },
];

export default function DBACounsellors() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        !m-0
        !p-0
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-8
          font-[Inter]
          sm:px-6
          sm:py-10
          lg:px-16
          lg:py-12
        "
      >
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mb-7 text-center sm:mb-8">
          <h2
            className="
              m-0
              text-[24px]
              font-extrabold
              leading-tight
              tracking-[-0.5px]
              text-slate-800
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            Meet Our{" "}
            <span className="text-red-500">
              DBA Counsellors
            </span>
          </h2>

          
        </div>

        {/* =====================================================
            COUNSELLOR GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-4
          "
        >
          {counsellors.map((counsellor) => (
            <article
              key={counsellor.name}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border-2
                border-slate-200
                bg-white
                p-2.5
                shadow-[0_5px_15px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-100
                hover:shadow-[0_14px_28px_rgba(15,23,42,0.11)]
              "
            >
              {/* =================================================
                  PHOTO
              ================================================== */}

              <div
                className="
                  relative
                  h-[175px]
                  overflow-hidden
                  rounded-xl
                  bg-slate-100
                  sm:h-[185px]
                "
              >
                <img
                  src={counsellor.image}
                  alt={counsellor.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-top
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* subtle overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-900/10
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div className="px-2 pb-3 pt-3">
                {/* NAME + RATING */}

                <div className="flex min-h-[45px] items-start justify-between gap-2">
                  <h3
                    className="
                      m-0
                      max-w-[145px]
                      text-[15px]
                      font-extrabold
                      leading-[1.35]
                      text-red-600
                      sm:text-[16px]
                    "
                  >
                    {counsellor.name}
                  </h3>

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-full
                      bg-slate-100
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-medium
                      text-slate-700
                    "
                  >
                    <Star
                      className="h-3.5 w-3.5 fill-red-500 text-red-500"
                      strokeWidth={1.8}
                    />

                    {counsellor.rating}
                  </div>
                </div>

                {/* EXPERIENCE */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    font-medium
                    text-slate-700
                    sm:text-[12px]
                  "
                >
                  <div
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      bg-red-50
                      text-red-500
                    "
                  >
                    <BriefcaseBusiness
                      className="h-3.5 w-3.5"
                      strokeWidth={2.3}
                    />
                  </div>

                  <span className="truncate">
                    {counsellor.experience}
                  </span>
                </div>

                {/* STUDENTS */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    font-medium
                    text-slate-700
                    sm:text-[12px]
                  "
                >
                  <div
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      bg-red-50
                      text-red-500
                    "
                  >
                    <UserRound
                      className="h-3.5 w-3.5"
                      strokeWidth={2.3}
                    />
                  </div>

                  <span className="truncate">
                    {counsellor.students}
                  </span>
                </div>
              </div>

              {/* Bottom accent */}

              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[3px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-red-500
                  transition-all
                  duration-300
                  group-hover:w-1/2
                "
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}