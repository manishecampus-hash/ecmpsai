// "use client";

// import { Handshake } from "lucide-react";
// import React from "react";
// import { DEFAULT_GRADUATES, GraduateTestimonialT } from "@/data/graduates";

// const StarRating = ({ rating }: { rating: number }) => (
//   <div style={{ display: "flex", gap: 2, marginTop: 8 }}></div>
// );

// const GraduateTile = ({
//   graduate,
//   tall = false,
// }: {
//   graduate: GraduateTestimonialT;
//   tall?: boolean;
// }) => (
//   <div
//     style={{
//       height: tall ? 320 : 220,
//       borderRadius: 10,
//       overflow: "hidden",
//       position: "relative",
//       border: "1px solid rgba(255,255,255,0.1)",
//       boxShadow: "0 18px 50px rgba(0,0,0,0.32)",
//     }}
//   >
//     {graduate.avatarSrc ? (
//       <img
//         src={graduate.avatarSrc}
//         alt={graduate.name}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           objectPosition: "top center",
//         }}
//       />
//     ) : (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           background: graduate.avatarColor,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 32,
//           fontWeight: 800,
//           color: "#fff",
//         }}
//       >
//         {graduate.initials}
//       </div>
//     )}

//     <div
//       style={{
//         position: "absolute",
//         inset: "auto 0 0",
//         padding: 14,
//         background: "linear-gradient(to top, rgba(5,7,13,0.9), rgba(5,7,13,0))",
//         color: "#fff",
//       }}
//     >
//       <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>
//         {graduate.name}
//       </p>
//       <p style={{ margin: "2px 0 0", fontSize: 12 }}>{graduate.role}</p>
//       <StarRating rating={graduate.rating} />
//     </div>
//   </div>
// );

// const ImageColumn = ({
//   items,
//   reverse = false,
//   offset = 0,
// }: {
//   items: GraduateTestimonialT[];
//   reverse?: boolean;
//   offset?: number;
// }) => (
//   <div style={{ overflow: "hidden", paddingTop: offset }}>
//     <div
//       className={reverse ? "graduate-loop-down" : "graduate-loop-up"}
//       style={{ display: "flex", flexDirection: "column", gap: 12 }}
//     >
//       {[...items, ...items].map((graduate, index) => (
//         <GraduateTile
//           key={`${graduate.name}-${index}`}
//           graduate={graduate}
//           tall={index % 3 === 1}
//         />
//       ))}
//     </div>
//   </div>
// );

// export function GraduatesMarquee({
//   graduates = DEFAULT_GRADUATES,
// }: {
//   graduates?: GraduateTestimonialT[];
// }) {
//   const firstColumn = [graduates[0], graduates[1], graduates[2]];
//   const secondColumn = [graduates[2], graduates[3], graduates[0]];
//   const thirdColumn = [graduates[1], graduates[3], graduates[2]];

//   return (
//     <section
//       style={{ background: "white" }}
//       className="relative w-full py-10 text-white"
//     >
//       <style>{`
//         @keyframes graduateLoopUp {
//           from { transform: translateY(0); }
//           to { transform: translateY(-50%); }
//         }
//         @keyframes graduateLoopDown {
//           from { transform: translateY(-50%); }
//           to { transform: translateY(0); }
//         }
//         .graduate-loop-up {
//           animation: graduateLoopUp 22s linear infinite;
//         }
//         .graduate-loop-down {
//           animation: graduateLoopDown 24s linear infinite;
//         }
//       `}</style>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mb-14 text-center">
//           <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-black border border-gray-200">
//             <Handshake className="h-4 w-4 text-red-500" />
//             Success Stories
//           </span>
//           <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
//             What Our Graduates <span className="text-red-500">Say</span>
//           </h2>
//         </div>

//         <div
//           style={{
//             position: "relative",
//             height: 700,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(3, 1fr)",
//               gap: 16,
//               height: "100%",
//             }}
//           >
//             <ImageColumn items={firstColumn} />
//             <ImageColumn items={secondColumn} reverse offset={52} />
//             <ImageColumn items={thirdColumn} offset={24} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Handshake, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DEFAULT_GRADUATES, GraduateTestimonialT } from "@/data/graduates";

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 2, marginTop: 6 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.round(rating) ? "#facc15" : "none"}
        color={i < Math.round(rating) ? "#facc15" : "#6b7280"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const GraduateTile = ({
  graduate,
  tall = false,
  onOpen,
}: {
  graduate: GraduateTestimonialT;
  tall?: boolean;
  onOpen: (g: GraduateTestimonialT) => void;
}) => (
  <div
    className={`__gradTile ${tall ? "__gradTileTall" : ""}`}
    onClick={() => onOpen(graduate)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onOpen(graduate);
    }}
  >
    {graduate.avatarSrc ? (
      <img
        src={graduate.avatarSrc}
        alt={graduate.name}
        className="__gradImg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "top center",
          background: "#0b0f19",
        }}
      />
    ) : (
      <div
        className="__gradImg"
        style={{
          width: "100%",
          height: "100%",
          background: graduate.avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {graduate.initials}
      </div>
    )}

    {/* Default bottom info - always visible */}
    <div className="__gradDefault">
      <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>
        {graduate.name}
      </p>
      <p style={{ margin: "2px 0 0", fontSize: 12, opacity: 0.85 }}>
        {graduate.role}
      </p>
      <StarRating rating={graduate.rating} />
    </div>

    {/* Hover overlay (desktop) - same tile size, extra testimonial content */}
    <div className="__gradOverlay">
      <p className="__gradQuote">
        “
        {graduate.testimonial ??
          "This program completely transformed my career path and gave me the confidence to grow."}
        ”
      </p>
      <div className="__gradOverlayFooter">
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#fff" }}>
          {graduate.name}
        </p>
        <p style={{ margin: "2px 0 6px", fontSize: 11.5, color: "#cbd5e1" }}>
          {graduate.role}
        </p>
        <StarRating rating={graduate.rating} />
      </div>
    </div>
  </div>
);

const ImageColumn = ({
  items,
  reverse = false,
  offset = 0,
  onOpen,
}: {
  items: GraduateTestimonialT[];
  reverse?: boolean;
  offset?: number;
  onOpen: (g: GraduateTestimonialT) => void;
}) => (
  <div className="__gradColumn" style={{ paddingTop: offset }}>
    <div
      className={reverse ? "graduate-loop-down" : "graduate-loop-up"}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {[...items, ...items].map((graduate, index) => (
        <GraduateTile
          key={`${graduate.name}-${index}`}
          graduate={graduate}
          tall={index % 3 === 1}
          onOpen={onOpen}
        />
      ))}
    </div>
  </div>
);

// Full-size lightbox modal shown on tile click
const GraduateModal = ({
  graduate,
  onClose,
}: {
  graduate: GraduateTestimonialT;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="__gradModalBackdrop" onClick={onClose}>
      <div className="__gradModalContent" onClick={(e) => e.stopPropagation()}>
        <button
          className="__gradModalClose"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {graduate.avatarSrc ? (
          <img
            src={graduate.avatarSrc}
            alt={graduate.name}
            className="__gradModalImg"
          />
        ) : (
          <div
            className="__gradModalImg __gradModalInitials"
            style={{ background: graduate.avatarColor }}
          >
            {graduate.initials}
          </div>
        )}

        <div className="__gradModalInfo">
          <p
            style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#fff" }}
          >
            {graduate.name}
          </p>
          <p style={{ margin: "2px 0 6px", fontSize: 13, color: "#cbd5e1" }}>
            {graduate.role}
          </p>
          <StarRating rating={graduate.rating} />
          <p className="__gradModalQuote">
            “
            {graduate.testimonial ??
              "This program completely transformed my career path and gave me the confidence to grow."}
            ”
          </p>
        </div>
      </div>
    </div>
  );
};

export function GraduatesMarquee({
  graduates = DEFAULT_GRADUATES,
}: {
  graduates?: GraduateTestimonialT[];
}) {
  const [selected, setSelected] = useState<GraduateTestimonialT | null>(null);

  const firstColumn = [graduates[0], graduates[1], graduates[2]];
  const secondColumn = [graduates[2], graduates[3], graduates[0]];
  const thirdColumn = [graduates[1], graduates[3], graduates[2]];

  return (
    <section
      style={{ background: "white" }}
      className="relative w-full pt-0 pb-10 text-white -mt-24 sm:-mt-36 z-10"
    >
      <style>{`
        @keyframes graduateLoopUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes graduateLoopDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .graduate-loop-up {
          animation: graduateLoopUp 32s linear infinite;
        }
        .graduate-loop-down {
          animation: graduateLoopDown 34s linear infinite;
        }
        .graduate-loop-up:hover,
        .graduate-loop-down:hover {
          animation-play-state: paused;
        }

        .__gradColumn {
          overflow: hidden;
        }

        /* ---- Grid + container (responsive) ---- */
        .__gradGridWrap {
          position: relative;
          height: 1000px;
          overflow: hidden;
        }
        .__gradGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          height: 100%;
        }

        @media (max-width: 900px) {
          .__gradGridWrap { height: 780px; }
        }

        @media (max-width: 640px) {
          .__gradGridWrap { height: 640px; }
          .__gradGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 420px) {
          .__gradGridWrap { height: 560px; }
          .__gradGrid {
            grid-template-columns: 1fr;
          }
        }

        /* ---- Tile sizing (responsive) ---- */
        .__gradTile {
          cursor: pointer;
          height: 480px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 50px rgba(0,0,0,0.32);
        }
        .__gradTileTall {
          height: 620px;
        }

        @media (max-width: 900px) {
          .__gradTile { height: 360px; }
          .__gradTileTall { height: 460px; }
        }

        @media (max-width: 640px) {
          .__gradTile { height: 300px; }
          .__gradTileTall { height: 380px; }
        }

        @media (max-width: 420px) {
          .__gradTile { height: 320px; }
          .__gradTileTall { height: 400px; }
        }

        .__gradImg {
          transition: transform 0.5s ease, filter 0.4s ease;
        }
        .__gradTile:hover .__gradImg {
          transform: scale(1.04);
          filter: brightness(0.55);
        }

        .__gradDefault {
          position: absolute;
          inset: auto 0 0;
          padding: 14px;
          background: linear-gradient(to top, rgba(5,7,13,0.9), rgba(5,7,13,0));
          color: #fff;
          transition: opacity 0.3s ease;
        }
        .__gradTile:hover .__gradDefault {
          opacity: 0;
        }

        /* ---- Hover overlay (desktop only, click still opens modal on all devices) ---- */
        .__gradOverlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          background: linear-gradient(180deg, rgba(5,7,13,0.15) 0%, rgba(5,7,13,0.75) 45%, rgba(5,7,13,0.96) 100%);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .__gradTile:hover .__gradOverlay {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .__gradQuote {
          margin: 0 0 10px;
          font-size: 12.5px;
          line-height: 1.55;
          color: #f1f5f9;
          font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s;
        }
        .__gradTile:hover .__gradQuote {
          opacity: 1;
          transform: translateY(0);
        }
        .__gradOverlayFooter {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.16s, transform 0.3s ease 0.16s;
        }
        .__gradTile:hover .__gradOverlayFooter {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .__gradOverlay { display: none; }
        }

        /* ---- Full-size click modal ---- */
        .__gradModalBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(5,7,13,0.92);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .__gradModalContent {
          position: relative;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0b0f19;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          flex-direction: column;
        }
        .__gradModalClose {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          background: rgba(0,0,0,0.55);
          border: none;
          color: #fff;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .__gradModalImg {
          width: 100%;
          max-height: 65vh;
          object-fit: contain;
          background: #0b0f19;
        }
        .__gradModalInitials {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: 800;
          color: #fff;
        }
        .__gradModalInfo {
          padding: 16px;
        }
        .__gradModalQuote {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: #e2e8f0;
          font-style: italic;
        }

        @media (max-width: 480px) {
          .__gradModalContent { max-width: 100%; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-black border border-gray-200">
            <Handshake className="h-4 w-4 text-red-500" />
            Success Stories
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            What Our Graduates <span className="text-red-500">Say</span>
          </h2>
        </div>

        <div className="__gradGridWrap">
          <div className="__gradGrid">
            <ImageColumn items={firstColumn} onOpen={setSelected} />
            <ImageColumn
              items={secondColumn}
              reverse
              offset={52}
              onOpen={setSelected}
            />
            <ImageColumn items={thirdColumn} offset={24} onOpen={setSelected} />
          </div>
        </div>
      </div>

      {selected && (
        <GraduateModal graduate={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
