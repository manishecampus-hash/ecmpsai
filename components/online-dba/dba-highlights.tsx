// "use client";

// import React from "react";
// import {
//   Bookmark,
//   CheckSquare,
//   Search,
//   CalendarDays,
//   Users,
// } from "lucide-react";

// const highlights = [
//   {
//     icon: Bookmark,
//     title: "Program Focus",
//     dba: "Scholar-practitioner approach towards addressing real-world business problems.",
//     phd: "Ideal if you are interested in pursuing a career in academia or conducting research at a high level.",
//   },
//   {
//     icon: CheckSquare,
//     title: "Career Enhancement",
//     dba: "Career enhancement in business management, executive leadership, or consulting.",
//     phd: "More suited for individuals interested in conducting in-depth research and contributing to the theoretical foundation of their academic field.",
//   },
//   {
//     icon: Search,
//     title: "Research with Impact",
//     dba: "Solving business problems and creating an impact through research.",
//     phd: "The focus tends to be more on theoretical contributions and advancing the knowledge within a specific academic discipline.",
//   },
//   {
//     icon: CalendarDays,
//     title: "Time Commitment",
//     dba: "Suitable for mid-career professionals who want to pursue advanced education without taking an extended break from their careers.",
//     phd: "PhD programs are longer and more intensive, often requiring 4–6+ years to complete.",
//   },
//   {
//     icon: Users,
//     title: "Networking Opportunities",
//     dba: "Experienced professionals from diverse business backgrounds, providing excellent networking opportunities within the business community.",
//     phd: "More focused within academic circles and research communities.",
//   },
// ];

// export default function DBAHighlights() {
//   return (
//     <section className="relative z-10 w-full overflow-hidden bg-white !m-0 !p-0">
//       <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-16 lg:py-12 font-[Inter]">

//         {/* HEADING */}
//         <div className="mb-7 text-center sm:mb-9">
//           <h2 className="m-0 text-[28px] font-extrabold leading-tight tracking-[-0.6px] text-slate-900 sm:text-[34px] lg:text-[38px]">
//             Key <span className="text-red-500">Highlights</span>
//           </h2>

//           <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-red-500" />
//         </div>

//         {/* DESKTOP TABLE */}
//         <div className="hidden overflow-hidden rounded-2xl border border-slate-100 shadow-sm md:block">

//           {/* HEADER */}
//           <div className="grid grid-cols-[1fr_1fr_1fr]">

//             <div className="bg-white" />

//             <div className="relative flex h-[64px] items-end justify-center bg-white">
//               <div className="flex h-[52px] min-w-[120px] items-center justify-center rounded-t-2xl bg-red-500 px-8 text-[19px] font-extrabold text-white shadow-sm">
//                 DBA
//               </div>
//             </div>

//             <div className="relative flex h-[64px] items-end justify-center bg-white">
//               <div className="flex h-[52px] min-w-[120px] items-center justify-center rounded-t-2xl bg-slate-900 px-8 text-[19px] font-extrabold text-white">
//                 PhD
//               </div>
//             </div>
//           </div>

//           {/* ROWS */}
//           {highlights.map((item, index) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="grid grid-cols-[1fr_1fr_1fr]"
//               >

//                 {/* LABEL */}
//                 <div
//                   className={`flex min-h-[118px] items-center gap-4 px-5 lg:px-7 ${
//                     index % 2 === 0 ? "bg-slate-50" : "bg-white"
//                   }`}
//                 >
//                   <Icon
//                     className="h-5 w-5 shrink-0 text-red-500"
//                     strokeWidth={2.5}
//                   />

//                   <span className="text-[15px] font-bold text-slate-900 lg:text-[16px]">
//                     {item.title}
//                   </span>
//                 </div>

//                 {/* DBA */}
//                 <div
//                   className={`flex min-h-[118px] items-center px-6 lg:px-9 ${
//                     index % 2 === 0
//                       ? "bg-red-500"
//                       : "bg-red-600"
//                   }`}
//                 >
//                   <p className="m-0 text-[14px] font-medium leading-6 text-white lg:text-[15px] lg:leading-6">
//                     {item.dba}
//                   </p>
//                 </div>

//                 {/* PHD */}
//                 <div
//                   className={`flex min-h-[118px] items-center px-6 lg:px-9 ${
//                     index % 2 === 0
//                       ? "bg-slate-50"
//                       : "bg-white"
//                   }`}
//                 >
//                   <p className="m-0 text-[14px] font-medium leading-6 text-slate-800 lg:text-[15px] lg:leading-6">
//                     {item.phd}
//                   </p>
//                 </div>

//               </div>
//             );
//           })}
//         </div>

//         {/* MOBILE */}
//         <div className="space-y-5 md:hidden">

//           {highlights.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
//               >
//                 {/* TITLE */}
//                 <div className="flex items-center gap-3 bg-slate-50 px-4 py-4">
//                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
//                     <Icon
//                       className="h-5 w-5 text-red-500"
//                       strokeWidth={2.5}
//                     />
//                   </div>

//                   <h3 className="m-0 text-[15px] font-bold text-slate-900">
//                     {item.title}
//                   </h3>
//                 </div>

//                 {/* DBA */}
//                 <div className="bg-red-500 px-5 py-5">
//                   <div className="mb-2 inline-flex rounded-md bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
//                     DBA
//                   </div>

//                   <p className="m-0 text-[14px] font-medium leading-6 text-white">
//                     {item.dba}
//                   </p>
//                 </div>

//                 {/* PHD */}
//                 <div className="bg-white px-5 py-5">
//                   <div className="mb-2 inline-flex rounded-md bg-slate-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
//                     PhD
//                   </div>

//                   <p className="m-0 text-[14px] font-medium leading-6 text-slate-700">
//                     {item.phd}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import {
  Bookmark,
  CheckSquare,
  Search,
  CalendarDays,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: Bookmark,
    title: "Program Focus",
    dba: "Scholar-practitioner approach towards addressing real-world business problems.",
    phd: "Ideal if you are interested in pursuing a career in academia or conducting research at a high level.",
  },
  {
    icon: CheckSquare,
    title: "Career Enhancement",
    dba: "Career enhancement in business management, executive leadership, or consulting.",
    phd: "More suited for individuals interested in conducting in-depth research and contributing to the theoretical foundation of their academic field.",
  },
  {
    icon: Search,
    title: "Research with Impact",
    dba: "Solving business problems and creating an impact through research.",
    phd: "The focus tends to be more on theoretical contributions and advancing the knowledge within a specific academic discipline.",
  },
  {
    icon: CalendarDays,
    title: "Time Commitment",
    dba: "Suitable for mid-career professionals who want to pursue advanced education without taking an extended break from their careers.",
    phd: "PhD programs are longer and more intensive, often requiring 4–6+ years to complete.",
  },
  {
    icon: Users,
    title: "Networking Opportunities",
    dba: "Experienced professionals from diverse business backgrounds, providing excellent networking opportunities within the business community.",
    phd: "More focused within academic circles and research communities.",
  },
];

export default function DBAHighlights() {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-white !m-0 !p-0">

      {/* =====================================================
          LEFT DECORATIVE CURVE
      ====================================================== */}
      <img
        src="/dba/red-curve.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-80px]
          top-[-80px]
          z-0
          hidden
          h-[900px]
          w-[540px]
          object-contain
          opacity-80
          lg:block
        "
      />

      {/* =====================================================
          RIGHT DECORATIVE CURVE
      ====================================================== */}
      <img
        src="/dba/red-curve.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-80px]
          top-[-80px]
          z-0
          hidden
          h-[900px]
          w-[540px]
          -scale-x-100
          object-contain
          opacity-80
          lg:block
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div
        className="
          relative
          z-10
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
            SECTION HEADING
        ====================================================== */}
        <div className="mb-7 text-center sm:mb-9">

          <h2
            className="
              m-0
              text-[28px]
              font-extrabold
              leading-tight
              tracking-[-0.6px]
              text-slate-900
              sm:text-[34px]
              lg:text-[38px]
            "
          >
            Key{" "}
            <span className="text-red-500">
              Highlights
            </span>
          </h2>

          <div
            className="
              mx-auto
              mt-3
              h-1
              w-14
              rounded-full
              bg-red-500
              shadow-[0_3px_8px_rgba(239,68,68,0.35)]
            "
          />

        </div>

        {/* =====================================================
            DESKTOP TABLE
        ====================================================== */}
        <div
          className="
            relative
            hidden
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-[0_12px_30px_rgba(15,23,42,0.10),0_25px_60px_rgba(15,23,42,0.08)]
            md:block
          "
        >

          {/* ================= TABLE HEADER ================= */}
          <div className="grid grid-cols-3">

            {/* EMPTY FIRST COLUMN */}
            <div className="bg-white" />

            {/* ================= DBA HEADER ================= */}
            <div className="flex h-[64px] items-end justify-center bg-white">

              <div
                className="
                  relative
                  flex
                  h-[52px]
                  min-w-[120px]
                  items-center
                  justify-center
                  rounded-t-2xl
                  border
                  border-red-400
                  border-b-0
                  bg-gradient-to-b
                  from-red-400
                  via-red-500
                  to-red-600
                  px-8
                  text-[19px]
                  font-extrabold
                  text-white
                  shadow-[0_-2px_4px_rgba(255,255,255,0.35)_inset,0_7px_0_#b91c1c,0_12px_20px_rgba(220,38,38,0.28)]
                "
              >
                {/* Top shine */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    right-4
                    top-1
                    h-[2px]
                    rounded-full
                    bg-white/40
                  "
                />

                DBA
              </div>

            </div>

            {/* ================= PHD HEADER ================= */}
            <div className="flex h-[64px] items-end justify-center bg-white">

              <div
                className="
                  relative
                  flex
                  h-[52px]
                  min-w-[120px]
                  items-center
                  justify-center
                  rounded-t-2xl
                  border
                  border-slate-700
                  border-b-0
                  bg-gradient-to-b
                  from-slate-700
                  via-slate-800
                  to-slate-950
                  px-8
                  text-[19px]
                  font-extrabold
                  text-white
                  shadow-[0_-2px_4px_rgba(255,255,255,0.18)_inset,0_7px_0_#020617,0_12px_20px_rgba(15,23,42,0.22)]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    right-4
                    top-1
                    h-[2px]
                    rounded-full
                    bg-white/25
                  "
                />

                PhD
              </div>

            </div>

          </div>

          {/* ================= TABLE ROWS ================= */}
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  grid
                  grid-cols-3
                  transition-all
                  duration-300
                "
              >

                {/* ================= LABEL ================= */}
                <div
                  className={`
                    relative
                    flex
                    min-h-[118px]
                    items-center
                    gap-4
                    border-t
                    border-slate-200
                    px-5
                    lg:px-7
                    ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-slate-50 to-white"
                        : "bg-white"
                    }
                  `}
                >

                  {/* Small vertical depth accent */}
                  <span
                    className="
                      absolute
                      bottom-3
                      left-0
                      top-3
                      w-[3px]
                      rounded-r-full
                      bg-red-500/70
                    "
                  />

                  <Icon
                    className="
                      relative
                      h-5
                      w-5
                      shrink-0
                      text-red-500
                      drop-shadow-[0_2px_2px_rgba(239,68,68,0.25)]
                    "
                    strokeWidth={2.5}
                  />

                  <span
                    className="
                      relative
                      text-[15px]
                      font-bold
                      text-slate-900
                      lg:text-[16px]
                    "
                  >
                    {item.title}
                  </span>

                </div>

                {/* ================= DBA CONTENT ================= */}
                <div
                  className={`
                    relative
                    flex
                    min-h-[118px]
                    items-center
                    overflow-hidden
                    border-t
                    border-red-500/40
                    px-6
                    lg:px-9
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
                        : "bg-gradient-to-br from-red-500 via-red-600 to-red-700"
                    }
                  `}
                >

                  {/* 3D top shine */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      right-0
                      top-0
                      h-[3px]
                      bg-white/25
                    "
                  />

                  {/* 3D side depth */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      top-0
                      w-[5px]
                      bg-red-900/20
                    "
                  />

                  {/* Soft light */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-white/10
                      blur-2xl
                    "
                  />

                  <p
                    className="
                      relative
                      z-10
                      m-0
                      text-[14px]
                      font-medium
                      leading-6
                      text-white
                      drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]
                      lg:text-[15px]
                    "
                  >
                    {item.dba}
                  </p>

                </div>

                {/* ================= PHD CONTENT ================= */}
                <div
                  className={`
                    relative
                    flex
                    min-h-[118px]
                    items-center
                    overflow-hidden
                    border-t
                    border-slate-200
                    px-6
                    lg:px-9
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-slate-50 via-white to-slate-100"
                        : "bg-gradient-to-br from-white via-slate-50 to-slate-100"
                    }
                  `}
                >

                  {/* 3D inner shine */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      right-0
                      top-0
                      h-[2px]
                      bg-white
                    "
                  />

                  {/* Subtle right depth */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      top-0
                      w-[4px]
                      bg-slate-300/30
                    "
                  />

                  <p
                    className="
                      relative
                      z-10
                      m-0
                      text-[14px]
                      font-medium
                      leading-6
                      text-slate-800
                      lg:text-[15px]
                    "
                  >
                    {item.phd}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            MOBILE TABLE
            SAME STRUCTURE AS DESKTOP
        ====================================================== */}
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-[0_10px_25px_rgba(15,23,42,0.10),0_18px_40px_rgba(15,23,42,0.07)]
            md:hidden
          "
        >

          {/* ===================================================
              MOBILE PROGRAM TABS
          =================================================== */}
          <div className="grid grid-cols-2">

            {/* ================= DBA TAB ================= */}
            <div
              className="
                relative
                flex
                h-[42px]
                items-center
                justify-center
                border-r
                border-red-400
                bg-gradient-to-b
                from-red-50
                to-red-100
                shadow-[inset_0_-2px_4px_rgba(220,38,38,0.08)]
              "
            >

              <span
                className="
                  text-[18px]
                  font-extrabold
                  leading-none
                  text-red-500
                  drop-shadow-[0_1px_1px_rgba(239,68,68,0.20)]
                "
              >
                DBA
              </span>

            </div>

            {/* ================= PHD TAB ================= */}
            <div
              className="
                relative
                flex
                h-[42px]
                items-center
                justify-center
                bg-gradient-to-b
                from-slate-50
                to-slate-100
                shadow-[inset_0_-2px_4px_rgba(15,23,42,0.06)]
              "
            >

              <span
                className="
                  text-[18px]
                  font-extrabold
                  leading-none
                  text-slate-900
                "
              >
                PhD
              </span>

            </div>

          </div>

          {/* ===================================================
              MOBILE ROWS
          =================================================== */}
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative"
              >

                {/* =============================================
                    ROW TITLE
                ============================================== */}
                <div
                  className="
                    relative
                    flex
                    min-h-[44px]
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-slate-200
                    bg-gradient-to-r
                    from-slate-50
                    via-white
                    to-slate-50
                    px-3
                    py-2
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
                  "
                >

                  {/* tiny red depth line */}
                  <span
                    className="
                      absolute
                      left-3
                      top-1/2
                      h-5
                      w-[3px]
                      -translate-y-1/2
                      rounded-full
                      bg-red-500
                    "
                  />

                  <Icon
                    className="
                      h-[17px]
                      w-[17px]
                      shrink-0
                      text-red-500
                      drop-shadow-[0_2px_2px_rgba(239,68,68,0.25)]
                    "
                    strokeWidth={2.8}
                  />

                  <span
                    className="
                      text-[13px]
                      font-bold
                      leading-tight
                      text-slate-900
                    "
                  >
                    {item.title}
                  </span>

                </div>

                {/* =============================================
                    DBA + PHD COLUMNS
                ============================================== */}
                <div className="grid grid-cols-2">

                  {/* ================= DBA ================= */}
                  <div
                    className="
                      relative
                      flex
                      min-h-[140px]
                      items-center
                      overflow-hidden
                      border-r
                      border-t
                      border-red-200
                      bg-gradient-to-br
                      from-red-50
                      via-red-50
                      to-red-100
                      px-3
                      py-4
                      shadow-[inset_-3px_0_5px_rgba(220,38,38,0.08)]
                    "
                  >

                    {/* inner highlight */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        right-0
                        top-0
                        h-[2px]
                        bg-white/80
                      "
                    />

                    {/* soft 3D glow */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-20
                        w-20
                        rounded-full
                        bg-red-200/30
                        blur-xl
                      "
                    />

                    <p
                      className="
                        relative
                        z-10
                        m-0
                        text-[12.5px]
                        font-medium
                        leading-[1.55]
                        text-slate-800
                      "
                    >
                      {item.dba}
                    </p>

                  </div>

                  {/* ================= PHD ================= */}
                  <div
                    className="
                      relative
                      flex
                      min-h-[140px]
                      items-center
                      overflow-hidden
                      border-t
                      border-slate-200
                      bg-gradient-to-br
                      from-white
                      via-slate-50
                      to-slate-100
                      px-3
                      py-4
                      shadow-[inset_0_-2px_5px_rgba(15,23,42,0.035)]
                    "
                  >

                    {/* inner highlight */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        right-0
                        top-0
                        h-[2px]
                        bg-white
                      "
                    />

                    <p
                      className="
                        relative
                        z-10
                        m-0
                        text-[12.5px]
                        font-medium
                        leading-[1.55]
                        text-slate-800
                      "
                    >
                      {item.phd}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}