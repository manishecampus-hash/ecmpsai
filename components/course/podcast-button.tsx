"use client";

import { useState } from "react";
import { Maximize2, Mic, Pause, Play, X } from "lucide-react";
import { useSpeechPlayer } from "./podcast/use-speech-player";
import NowPlaying, { EqualizerBars } from "./podcast/now-playing";

// "Listen Podcast": reads the course overview aloud with the browser's own voice and opens a
// music-app style player. Hidden where speech isn't supported.
export default function PodcastButton({ script, title, image }: { script: string; title: string; image?: string }) {
  const player = useSpeechPlayer(script);
  const [open, setOpen] = useState(false);

  if (!player.supported) return null;

  const { status } = player;
  const Icon = status === "idle" ? Mic : status === "playing" ? Pause : Play;

  const onMain = () => {
    if (status === "idle") setOpen(true);
    player.toggle();
  };

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <span className="relative isolate flex h-10 w-10 shrink-0 sm:h-12 sm:w-12">
        {status === "idle" && (
          <span aria-hidden className="absolute -inset-1.5 rounded-full bg-red-100 motion-safe:animate-pulse sm:-inset-2.5" />
        )}
        <button
          type="button"
          onClick={onMain}
          aria-label={status === "idle" ? "Listen podcast" : status === "playing" ? "Pause podcast" : "Resume podcast"}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2c3c] text-white shadow-[0_10px_24px_-6px_rgba(238,44,60,0.65)] transition-transform hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
        >
          {status === "idle" && (
            <span aria-hidden className="absolute inset-0 rounded-full bg-[#ee2c3c]/40 motion-safe:animate-ping" />
          )}
          <Icon className="relative h-4 w-4 sm:h-5 sm:w-5" fill={status === "idle" ? "none" : "currentColor"} />
        </button>
      </span>

      <div className="min-w-0 leading-tight">
        {status === "idle" ? (
          <>
            <p className="text-xs font-bold text-slate-900 min-[360px]:whitespace-nowrap sm:text-sm">Listen Podcast</p>
            <span className="hidden truncate text-[10px] font-medium text-slate-500 min-[360px]:block sm:text-xs">AI audio overview</span>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-[#ee2c3c]"
            >
              {status === "playing" ? "Now playing" : "Paused"}
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <div className="mt-1 flex items-center gap-2">
              <EqualizerBars playing={status === "playing"} />
              <span className="h-1 w-10 overflow-hidden rounded-full bg-slate-200 min-[400px]:w-16 sm:w-20">
                <span className="block h-full rounded-full bg-[#ee2c3c] transition-[width] duration-300" style={{ width: `${Math.max(player.progress, 0.03) * 100}%` }} />
              </span>
              <button
                type="button"
                onClick={player.stop}
                aria-label="Stop podcast"
                className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      <NowPlaying
        open={open}
        player={player}
        title={title}
        image={image}
        onMinimize={() => setOpen(false)}
        onClose={() => {
          player.stop();
          setOpen(false);
        }}
      />
      <style>{`@keyframes podcast-eq { 0%,100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }`}</style>
    </div>
  );
}
