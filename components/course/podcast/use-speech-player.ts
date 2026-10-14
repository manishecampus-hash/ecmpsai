"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Plays a script with the browser's own voice, one sentence-sized chunk at a time, so it
// can be paused, skipped and seeked like a track. No audio files or API involved.

export type PlayerStatus = "idle" | "playing" | "paused";

/** Average speaking pace at rate 1 — drives the time read-out and the progress between word events */
const CHARS_PER_SECOND = 14;
const TICK_MS = 250;

// Chrome cuts off long single utterances, so keep each chunk to a sentence or two
function toChunks(text: string, max = 220) {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const s of sentences) {
    if (current && (current + s).length > max) {
      chunks.push(current.trim());
      current = "";
    }
    current += s;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-IN") ??
    voices.find((v) => /^en[-_]GB/i.test(v.lang)) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    null
  );
}

export function useSpeechPlayer(script: string) {
  const chunks = useMemo(() => toChunks(script), [script]);
  const offsets = useMemo(() => {
    let total = 0;
    return chunks.map((c) => {
      const start = total;
      total += c.length + 1;
      return start;
    });
  }, [chunks]);
  const totalChars = chunks.length ? offsets[offsets.length - 1] + chunks[chunks.length - 1].length : 0;

  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(0); // characters spoken in the current chunk
  const runRef = useRef(0);
  const boundaryRef = useRef(false); // true once the voice reports word positions

  useEffect(() => {
    const ok = "speechSynthesis" in window && chunks.length > 0;
    setSupported(ok);
    if (!ok) return;
    window.speechSynthesis.getVoices(); // starts loading the voice list
    return () => {
      runRef.current++;
      window.speechSynthesis.cancel();
    };
  }, [chunks]);

  // Voices without word events still get a smoothly moving progress bar
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      if (!boundaryRef.current) setPos((p) => Math.min(p + (CHARS_PER_SECOND * TICK_MS) / 1000, chunks[index]?.length ?? 0));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [status, index, chunks]);

  const playFrom = useCallback(
    (start: number) => {
      const synth = window.speechSynthesis;
      const run = ++runRef.current;
      synth.cancel();
      const voice = pickVoice();

      const speak = (k: number) => {
        if (runRef.current !== run) return;
        if (k >= chunks.length) {
          setStatus("idle");
          setIndex(0);
          setPos(0);
          return;
        }
        const u = new SpeechSynthesisUtterance(chunks[k]);
        if (voice) u.voice = voice;
        u.lang = voice?.lang || "en-IN";
        u.onstart = () => {
          if (runRef.current !== run) return;
          boundaryRef.current = false;
          setIndex(k);
          setPos(0);
        };
        u.onboundary = (e) => {
          if (runRef.current !== run) return;
          boundaryRef.current = true;
          setPos(e.charIndex);
        };
        u.onend = () => speak(k + 1);
        synth.speak(u);
      };

      setIndex(start);
      setPos(0);
      setStatus("playing");
      speak(start);
    },
    [chunks],
  );

  const stop = useCallback(() => {
    runRef.current++;
    window.speechSynthesis.cancel();
    setStatus("idle");
    setIndex(0);
    setPos(0);
  }, []);

  const toggle = useCallback(() => {
    if (status === "idle") return playFrom(0);
    if (status === "playing") window.speechSynthesis.pause();
    else window.speechSynthesis.resume();
    setStatus(status === "playing" ? "paused" : "playing");
  }, [status, playFrom]);

  const skip = useCallback(
    (delta: number) => playFrom(Math.min(Math.max(index + delta, 0), chunks.length - 1)),
    [index, chunks.length, playFrom],
  );

  /** Jump to a point (0–1) — playback restarts at the chunk containing it */
  const seek = useCallback(
    (fraction: number) => {
      const target = fraction * totalChars;
      let k = 0;
      while (k < offsets.length - 1 && offsets[k + 1] <= target) k++;
      playFrom(k);
    },
    [offsets, totalChars, playFrom],
  );

  const spoken = status === "idle" ? 0 : (offsets[index] ?? 0) + pos;

  return {
    supported,
    status,
    /** 0–1 through the whole script */
    progress: totalChars ? Math.min(spoken / totalChars, 1) : 0,
    elapsed: spoken / CHARS_PER_SECOND,
    duration: totalChars / CHARS_PER_SECOND,
    /** The sentence being read, and how far into it the voice is (for the "lyrics" view) */
    line: chunks[index] ?? "",
    linePos: boundaryRef.current ? pos : -1,
    toggle,
    restart: () => playFrom(0),
    skip,
    seek,
    stop,
  };
}

export type SpeechPlayer = ReturnType<typeof useSpeechPlayer>;
