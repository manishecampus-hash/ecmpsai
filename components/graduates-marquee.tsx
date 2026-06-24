"use client";

import { Handshake } from "lucide-react";
import React from "react";
import { DEFAULT_GRADUATES, GraduateTestimonialT } from "@/data/graduates";

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 2, marginTop: 8 }}></div>
);

const GraduateTile = ({
  graduate,
  tall = false,
}: {
  graduate: GraduateTestimonialT;
  tall?: boolean;
}) => (
  <div
    style={{
      height: tall ? 320 : 220,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 18px 50px rgba(0,0,0,0.32)",
    }}
  >
    {graduate.avatarSrc ? (
      <img
        src={graduate.avatarSrc}
        alt={graduate.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    ) : (
      <div
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

    <div
      style={{
        position: "absolute",
        inset: "auto 0 0",
        padding: 14,
        background: "linear-gradient(to top, rgba(5,7,13,0.9), rgba(5,7,13,0))",
        color: "#fff",
      }}
    >
      <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>
        {graduate.name}
      </p>
      <p style={{ margin: "2px 0 0", fontSize: 12 }}>{graduate.role}</p>
      <StarRating rating={graduate.rating} />
    </div>
  </div>
);

const ImageColumn = ({
  items,
  reverse = false,
  offset = 0,
}: {
  items: GraduateTestimonialT[];
  reverse?: boolean;
  offset?: number;
}) => (
  <div style={{ overflow: "hidden", paddingTop: offset }}>
    <div
      className={reverse ? "graduate-loop-down" : "graduate-loop-up"}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {[...items, ...items].map((graduate, index) => (
        <GraduateTile
          key={`${graduate.name}-${index}`}
          graduate={graduate}
          tall={index % 3 === 1}
        />
      ))}
    </div>
  </div>
);

export function GraduatesMarquee({
  graduates = DEFAULT_GRADUATES,
}: {
  graduates?: GraduateTestimonialT[];
}) {
  const firstColumn = [graduates[0], graduates[1], graduates[2]];
  const secondColumn = [graduates[2], graduates[3], graduates[0]];
  const thirdColumn = [graduates[1], graduates[3], graduates[2]];

  return (
    <section
      style={{ background: "white" }}
      className="relative w-full py-10 text-white"
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
          animation: graduateLoopUp 22s linear infinite;
        }
        .graduate-loop-down {
          animation: graduateLoopDown 24s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-black border border-gray-200">
            <Handshake className="h-4 w-4 text-red-500" />
            Success Stories
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-black">
            What Our Graduates <span className="text-red-500">Say</span>
          </h2>
        </div>

        <div
          style={{
            position: "relative",
            height: 700,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              height: "100%",
            }}
          >
            <ImageColumn items={firstColumn} />
            <ImageColumn items={secondColumn} reverse offset={52} />
            <ImageColumn items={thirdColumn} offset={24} />
          </div>
        </div>
      </div>
    </section>
  );
}
