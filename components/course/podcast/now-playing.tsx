"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mic, Pause, Play, RotateCcw, SkipBack, SkipForward, Square, X, type LucideIcon } from "lucide-react";
import type { SpeechPlayer } from "./use-speech-player";

const clock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** Bars that bounce while audio plays (keyframes live in PodcastButton's style tag) */
export function EqualizerBars({ playing, className = "h-3.5" }: { playing: boolean; className?: string }) {
  return (
    <span className={`flex items-end gap-[3px] ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-full w-[3px] origin-bottom rounded-full bg-[#ee2c3c]"
          style={{
            animation: playing ? `podcast-eq 0.9s ease-in-out ${i * 0.15}s infinite` : "none",
            transform: playing ? undefined : "scaleY(0.35)",
          }}
        />
      ))}
    </span>
  );
}

function ControlButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 active:scale-95"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

// Centred "Now Playing" card, music-app style. Minimise keeps the audio going.
export default function NowPlaying({
  open,
  player,
  title,
  image,
  onMinimize,
  onClose,
}: {
  open: boolean;
  player: SpeechPlayer;
  title: string;
  image?: string;
  onMinimize: () => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onMinimize();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onMinimize]);

  if (!mounted) return null;

  const playing = player.status === "playing";
  const { line, linePos } = player;
  const wordEnd = linePos >= 0 ? line.indexOf(" ", linePos + 1) : -1;
  const spokenEnd = wordEnd === -1 ? line.length : wordEnd;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="now-playing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.2 }}
          onClick={onMinimize}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Now playing"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[94vh] w-full max-w-[380px] overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.5)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 pt-4">
              <button
                type="button"
                onClick={onMinimize}
                aria-label="Minimise player"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
              <div className="text-center leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Now playing</p>
                <p className="text-xs font-semibold text-slate-700">eCampus AI Podcast</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close player"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Artwork */}
            <div className="px-6 pt-4">
              <motion.div
                animate={{ scale: playing ? 1 : 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative aspect-[27/16] overflow-hidden rounded-2xl bg-gradient-to-br from-[#ee2c3c] to-[#c81e2f] shadow-[0_18px_40px_-16px_rgba(238,44,60,0.55)]"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <Mic className="absolute inset-0 m-auto h-14 w-14 text-white/90" />
                )}
              </motion.div>
            </div>

            {/* Title */}
            <div className="flex items-start justify-between gap-3 px-6 pt-5">
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900">{title}</h3>
                <p className="mt-0.5 text-sm text-slate-500">AI audio overview</p>
              </div>
              <EqualizerBars playing={playing} className="mt-1.5 h-4" />
            </div>

            {/* What's being read right now */}
            <div className="mx-6 mt-4 min-h-[88px] rounded-2xl bg-slate-50 px-4 py-3 text-[13px] leading-relaxed">
              {player.status === "idle" ? (
                <p className="text-slate-400">Press play to listen to the course overview.</p>
              ) : linePos >= 0 ? (
                <p>
                  <span className="text-slate-800">{line.slice(0, linePos)}</span>
                  <span className="font-semibold text-[#ee2c3c]">{line.slice(linePos, spokenEnd)}</span>
                  <span className="text-slate-400">{line.slice(spokenEnd)}</span>
                </p>
              ) : (
                <p className="text-slate-800">{line}</p>
              )}
            </div>

            {/* Progress — click to jump */}
            <div className="px-6 pt-5">
              <button
                type="button"
                aria-label="Seek"
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  player.seek(Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1));
                }}
                className="group relative block h-4 w-full"
              >
                <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-slate-200">
                  <span className="block h-full rounded-full bg-[#ee2c3c] transition-[width] duration-300 ease-linear" style={{ width: `${player.progress * 100}%` }} />
                </span>
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ee2c3c] shadow ring-2 ring-white transition-[left] duration-300 ease-linear"
                  style={{ left: `${player.progress * 100}%` }}
                />
              </button>
              <div className="mt-1 flex justify-between text-[11px] font-medium tabular-nums text-slate-400">
                <span>{clock(player.elapsed)}</span>
                <span>-{clock(player.duration - player.elapsed)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-6 pb-6 pt-3">
              <ControlButton icon={RotateCcw} label="Restart" onClick={player.restart} />
              <ControlButton icon={SkipBack} label="Previous" onClick={() => player.skip(-1)} />
              <button
                type="button"
                onClick={player.toggle}
                autoFocus
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ee2c3c] text-white shadow-[0_12px_28px_-8px_rgba(238,44,60,0.7)] transition hover:scale-105 hover:bg-[#d92233] active:scale-95"
              >
                {playing ? <Pause className="h-7 w-7" fill="currentColor" /> : <Play className="ml-1 h-7 w-7" fill="currentColor" />}
              </button>
              <ControlButton icon={SkipForward} label="Next" onClick={() => player.skip(1)} />
              <ControlButton icon={Square} label="Stop" onClick={player.stop} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
