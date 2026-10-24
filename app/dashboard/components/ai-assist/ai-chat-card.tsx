"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RobotMascot from "./robot-mascot";
import { fadeUp } from "../motion";

// Entry point to eCampus AI on the degree finder — personalised with the course from the student's AI Advisor answers.
export default function AiChatCard({
  course,
  onChat,
  delay = 0,
}: {
  course?: string;
  onChat: () => void;
  delay?: number;
}) {
  return (
    <motion.section
      {...fadeUp(delay)}
      aria-labelledby="ai-chat-card-heading"
      className="rounded-2xl bg-gradient-to-br from-rose-300 via-fuchsia-300 to-violet-300 p-px shadow-[0_12px_32px_-14px_rgba(168,85,247,0.45)]"
    >
      <div className="relative overflow-hidden rounded-[15px] bg-white px-5 pb-5 pt-5">
        {/* Soft glow and dot texture */}
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(244,63,94,0.12),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(168,85,247,0.12),transparent_55%)]" />
        <span className="pointer-events-none absolute right-0 top-0 h-28 w-44 opacity-70 [background-image:radial-gradient(#e9d5ff_1.2px,transparent_1.2px)] [background-size:10px_10px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />

        {/* Peeks in from the bottom-right corner */}
        <RobotMascot className="pointer-events-none absolute -bottom-5 right-1 h-[124px] w-[108px]" />

        <div className="relative flex items-start gap-3 pr-10">
          <Image src="/aiimage/newai.png" alt="" width={32} height={32} className="mt-0.5 h-8 w-8 flex-shrink-0" />
          <h2 id="ai-chat-card-heading" className="text-[17px] font-semibold leading-snug text-gray-900">
            Find the best university using AI for your{" "}
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 bg-clip-text font-bold text-transparent">
              {course || "career goals"}
            </span>
          </h2>
        </div>

        <div className="relative mt-4 pl-11">
          <motion.button
            type="button"
            onClick={onChat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-5 py-2.5 text-[15px] font-bold text-white shadow-lg shadow-fuchsia-500/30"
          >
            {/* Light sweep across the button */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-10 -skew-x-12 bg-white/30 blur-[2px]"
              initial={{ left: "-30%" }}
              animate={{ left: "130%" }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            />
            <span className="relative">Chat now</span>
            <ArrowRight className="relative h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
