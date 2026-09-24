"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check, PartyPopper, Gift } from "lucide-react";
import { SPIN_WHEEL_REWARDS, type SpinWheelReward } from "./data";
import { SpinWheelSvg, getTargetRotation } from "./wheel";

type Phase = "idle" | "spinning" | "result";

const SEGMENT_ANGLE = 360 / SPIN_WHEEL_REWARDS.length;

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardWon?: (reward: SpinWheelReward) => void;
}

interface ClaimDelta {
  dx: number;
  dy: number;
}

// Explicitly chained stages instead of one multi-keyframe animate call —
// each stage is a plain two-value tween, which framer-motion times reliably;
// a single animate with a `times` array proved to visually race ahead of its
// own declared duration when mixed with simultaneous x/y/scale/opacity keys.
type ClaimStage = "idle" | "dip" | "rise" | "swoop";

export default function SpinWheelModal({ isOpen, onClose, onRewardWon }: SpinWheelModalProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const [rewardIndex, setRewardIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [claimStage, setClaimStage] = useState<ClaimStage>("idle");
  const [claimDelta, setClaimDelta] = useState<ClaimDelta | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const claiming = claimStage !== "idle";

  // Fresh spin every time the modal is (re)opened.
  useEffect(() => {
    if (!isOpen) return;
    setPhase("idle");
    setRotation(0);
    setRewardIndex(null);
    setCopied(false);
    setClaimStage("idle");
    setClaimDelta(null);
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
    dialogRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !claiming) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, claiming]);

  const handleSpin = () => {
    if (phase !== "idle") return;

    const index = Math.floor(Math.random() * SPIN_WHEEL_REWARDS.length);
    setRewardIndex(index);
    setRotation((prev) => getTargetRotation(index, SEGMENT_ANGLE, prev));
    setPhase("spinning");
  };

  const handleSpinComplete = () => {
    if (phase !== "spinning") return;
    setPhase("result");
    if (rewardIndex !== null) onRewardWon?.(SPIN_WHEEL_REWARDS[rewardIndex]);
  };

  const handleCopy = async () => {
    if (rewardIndex === null) return;

    try {
      await navigator.clipboard.writeText(SPIN_WHEEL_REWARDS[rewardIndex].couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do in a frontend-only demo.
    }
  };

  const wonReward = rewardIndex !== null ? SPIN_WHEEL_REWARDS[rewardIndex] : null;

  // "Claim Reward" does the normal copy, then the whole card shrinks and
  // flies up toward the reward pill in the topbar before closing — instead
  // of just fading the dialog out in place. Runs as three chained stages
  // (dip -> rise -> swoop) so the path curves rather than moving in a
  // straight line, and so each stage's timing is exact and reliable.
  const handleClaim = () => {
    if (claiming) return;
    handleCopy();

    const dialogEl = dialogRef.current;
    const targetEl = document.querySelector<HTMLElement>("[data-reward-target]");
    const targetRect = targetEl?.getBoundingClientRect();

    let dx = 0;
    let dy = -180; // fallback: float up and away if no visible target (e.g. narrow mobile)

    if (dialogEl && targetRect && targetRect.width > 0 && targetRect.height > 0) {
      const fromRect = dialogEl.getBoundingClientRect();
      const fromX = fromRect.left + fromRect.width / 2;
      const fromY = fromRect.top + fromRect.height / 2;
      const toX = targetRect.left + targetRect.width / 2;
      const toY = targetRect.top + targetRect.height / 2;
      dx = toX - fromX;
      dy = toY - fromY;
    }

    setClaimDelta({ dx, dy });
    setClaimStage("dip");
  };

  const handleClaimStageComplete = () => {
    if (claimStage === "dip") {
      setClaimStage("rise");
    } else if (claimStage === "rise") {
      setClaimStage("swoop");
    } else if (claimStage === "swoop") {
      onClose();
      window.dispatchEvent(new Event("reward-pill-landed"));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: claimStage === "swoop" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={
              claimStage === "swoop"
                ? { duration: 0.42, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0a1428]/70 p-3 backdrop-blur-sm"
            onClick={() => {
              if (!claiming) onClose();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="spin-wheel-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={
                claimStage === "dip"
                  ? { scale: 0.96, opacity: 1, x: 0, y: 0 }
                  : claimStage === "rise" && claimDelta
                    ? { scale: 0.55, opacity: 0.95, x: claimDelta.dx * 0.25, y: claimDelta.dy * 0.65 }
                    : claimStage === "swoop" && claimDelta
                      ? { scale: 0.1, opacity: 0, x: claimDelta.dx, y: claimDelta.dy }
                      : { opacity: 1, scale: 1, x: 0, y: 0 }
              }
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={
                claimStage === "dip"
                  ? { duration: 0.12, ease: "easeOut" }
                  : claimStage === "rise"
                    ? { duration: 0.28, ease: "easeOut" }
                    : claimStage === "swoop"
                      ? { duration: 0.42, ease: [0.4, 0, 0.2, 1] }
                      : { type: "spring", stiffness: 380, damping: 28 }
              }
              onAnimationComplete={handleClaimStageComplete}
              className={`relative flex max-h-[92vh] w-full flex-col overflow-y-auto rounded-[28px] bg-white px-6 pb-6 pt-5 text-center shadow-2xl outline-none sm:px-9 sm:pb-8 sm:pt-6 ${
                phase === "result" ? "max-w-[400px]" : "max-w-[540px]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky wrapper keeps the close button reachable even if the
                  dialog has to scroll internally on a short viewport. */}
              <div className="sticky top-0 z-20 h-0 w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (!claiming) onClose();
                  }}
                  aria-label="Close spin wheel"
                  className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {phase !== "result" ? (
                <>
                  <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    EXCLUSIVE SCHOLARSHIP SPIN
                  </span>

                  <h2
                    id="spin-wheel-title"
                    className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-[28px]"
                  >
                    Win Your Scholarship Coupon!
                  </h2>

                  <p className="mx-auto mt-1.5 max-w-[320px] text-sm leading-relaxed text-gray-500">
                    Spin the wheel once to unlock your exclusive scholarship reward.
                  </p>

                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Spin the wheel"
                    onClick={handleSpin}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSpin();
                      }
                    }}
                    className={`relative mx-auto mt-5 w-[clamp(190px,min(62vw,34vh),340px)] outline-none ${
                      phase === "idle" ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {/* Fixed pointer — sits above the wheel and never rotates */}
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-[-6px] z-10 h-0 w-0 -translate-x-1/2"
                      style={{
                        borderLeft: "11px solid transparent",
                        borderRight: "11px solid transparent",
                        borderTop: "18px solid #b91c1c",
                        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
                      }}
                    />

                    <div className="aspect-square w-full">
                      <SpinWheelSvg
                        rewards={SPIN_WHEEL_REWARDS}
                        rotation={rotation}
                        onSpinComplete={handleSpinComplete}
                      />
                    </div>

                    {/* Fixed center hub — stays put while the wheel spins beneath it */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-[24%] w-[24%] items-center justify-center rounded-full border-2 border-red-100 bg-white text-[11px] font-extrabold tracking-wide text-red-600 shadow-lg sm:text-[13px]">
                        SPIN
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSpin}
                    disabled={phase === "spinning"}
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none sm:h-14"
                  >
                    {phase === "spinning" ? "Spinning..." : "Spin The Wheel Now"}
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center py-2"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 16 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/60"
                  >
                    <PartyPopper className="h-7 w-7 text-amber-500" />
                  </motion.div>

                  <h2 id="spin-wheel-title" className="mt-5 text-2xl font-bold text-gray-900">
                    Congratulations!
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">You Won</p>

                  <p className="mt-2 text-4xl font-extrabold text-red-600 sm:text-[42px]">
                    {wonReward?.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    Your Scholarship Coupon
                  </p>

                  <div className="mt-5 flex w-full max-w-[280px] items-center justify-between rounded-xl border border-dashed border-red-200 bg-red-50 px-4 py-3">
                    <span className="font-mono text-base font-bold tracking-wider text-gray-900">
                      {wonReward?.couponCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label="Copy coupon code"
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-100"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleClaim}
                    disabled={claiming}
                    className="mt-6 flex h-12 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none sm:h-14"
                  >
                    <Gift className="h-4 w-4" /> Claim Reward
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
