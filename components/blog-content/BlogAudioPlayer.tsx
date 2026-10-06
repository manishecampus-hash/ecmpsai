"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Headphones,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
} from "lucide-react";

type VoiceGender = "female" | "male";

interface BlogAudioPlayerProps {
  title: string;
  content: any;
  description?: string;
  readTime?: string;
  className?: string;
}

export function BlogAudioPlayer({
  title,
  content,
  description,
  readTime,
  className = "",
}: BlogAudioPlayerProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [gender, setGender] = useState<VoiceGender>("female");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // References to keep event handlers fresh without stale closures
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const speedRef = useRef(1);
  const genderRef = useRef<VoiceGender>("female");
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  isPlayingRef.current = isPlaying;
  isPausedRef.current = isPaused;
  currentIndexRef.current = currentIndex;
  speedRef.current = speed;
  genderRef.current = gender;
  voicesRef.current = voices;

  // Extract clean sentences from content
  const sentences = useMemo(() => {
    const parts: string[] = [];
    if (title) parts.push(title);
    if (description) parts.push(description);

    if (typeof content === "string") {
      const cleaned = content
        .replace(/<(h[1-6]|p|li|blockquote|td)[^>]*>/gi, " ")
        .replace(/<\/(h[1-6]|p|li|blockquote|td)>/gi, ". ")
        .replace(/<br\s*\/?>/gi, ". ")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      parts.push(cleaned);
    } else if (Array.isArray(content)) {
      content.forEach((block: any) => {
        if (block?.type === "heading" && block.text) {
          parts.push(block.text);
        } else if (block?.type === "paragraph" && block.text) {
          parts.push(block.text.replace(/[*`_]/g, ""));
        } else if (block?.type === "list" && Array.isArray(block.items)) {
          block.items.forEach((item: string) =>
            parts.push(item.replace(/[*`_]/g, ""))
          );
        } else if (block?.type === "callout" && block.text) {
          parts.push(block.text.replace(/[*`_]/g, ""));
        }
      });
    }

    const full = parts.join(". ");
    const parsed = full
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.replace(/\s+/g, " ").trim())
      .filter((s) => s.length > 6 && !/^[\d.\s-]+$/.test(s));

    return parsed.length > 0 ? parsed : [title || "Blog audio"];
  }, [title, content, description]);

  // Load browser voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Pick voice & pitch based on selected gender
  const currentVoiceConfig = useMemo(() => {
    const list = voices;
    const isFemale = gender === "female";

    if (!list || list.length === 0) {
      return { voice: null, pitch: isFemale ? 1.15 : 0.88 };
    }

    const englishList = list.filter((v) => v.lang.toLowerCase().startsWith("en"));
    const pool = englishList.length > 0 ? englishList : list;

    const femaleKeywords = [
      "female",
      "woman",
      "zira",
      "samantha",
      "victoria",
      "karen",
      "moira",
      "fiona",
      "veena",
      "neerja",
      "tessa",
      "serena",
      "allison",
      "susan",
      "ava",
      "zoe",
      "jenny",
      "aria",
    ];

    const maleKeywords = [
      "male",
      "man",
      "david",
      "alex",
      "daniel",
      "george",
      "rishi",
      "fred",
      "oliver",
      "tom",
      "guy",
      "mark",
      "james",
      "ravi",
    ];

    const keywords = isFemale ? femaleKeywords : maleKeywords;
    const match = pool.find((v) =>
      keywords.some((kw) => v.name.toLowerCase().includes(kw))
    );

    if (match) {
      return {
        voice: match,
        pitch: isFemale ? 1.05 : 0.92,
      };
    }

    // Fallback: Pick default English voice with distinct pitch
    const fallbackVoice = pool[0];
    return {
      voice: fallbackVoice,
      pitch: isFemale ? 1.18 : 0.84,
    };
  }, [voices, gender]);

  // Core speak function for a specific sentence index
  const speakSentence = (index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (index < 0 || index >= sentences.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentIndex(0);
      return;
    }

    window.speechSynthesis.cancel();

    const sentenceText = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentenceText);

    // Apply voice and pitch
    const cfg = currentVoiceConfig;
    if (cfg.voice) {
      utterance.voice = cfg.voice;
    }
    utterance.pitch = cfg.pitch;
    utterance.rate = speedRef.current;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      // If user paused or stopped, don't auto-advance
      if (!isPlayingRef.current || isPausedRef.current) return;

      const next = index + 1;
      if (next < sentences.length) {
        setCurrentIndex(next);
        speakSentence(next);
      } else {
        // Finished all sentences!
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentIndex(0);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech synthesis error:", e);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    setIsExpanded(true);

    if (isPaused) {
      // Resume from current pause
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      // In some browsers (Chrome bug), resume can fail silently — if still not speaking, replay sentence
      setTimeout(() => {
        if (!window.speechSynthesis.speaking && isPlayingRef.current) {
          speakSentence(currentIndexRef.current);
        }
      }, 50);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    speakSentence(currentIndex);
  };

  const handlePause = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(0);
  };

  const handleGenderChange = (newGender: VoiceGender) => {
    setGender(newGender);
    // If currently speaking, immediately switch voice and continue
    if (isPlaying || isPaused) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        if (isPlayingRef.current) {
          speakSentence(currentIndexRef.current);
        }
      }, 50);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    speedRef.current = newSpeed;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speakSentence(currentIndexRef.current);
      }, 50);
    }
  };

  const handleSkip = (direction: "forward" | "back") => {
    const delta = direction === "forward" ? 1 : -1;
    const target = Math.max(0, Math.min(sentences.length - 1, currentIndex + delta));
    setCurrentIndex(target);
    if (isPlaying) {
      speakSentence(target);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIndex = Math.min(
      sentences.length - 1,
      Math.floor(ratio * sentences.length)
    );
    setCurrentIndex(targetIndex);
    if (isPlaying) {
      speakSentence(targetIndex);
    }
  };

  if (!isSupported) {
    return null;
  }

  const progressPercent =
    sentences.length > 0
      ? Math.round(((currentIndex + 1) / sentences.length) * 100)
      : 0;

  // Approximate remaining time (assuming ~150 words/min = ~2.5 words/sec)
  const remainingSentences = sentences.length - currentIndex;
  const approxSecondsLeft = Math.max(0, Math.round((remainingSentences * 3.5) / speed));
  const minutesLeft = Math.floor(approxSecondsLeft / 60);
  const secondsLeft = approxSecondsLeft % 60;
  const timeFormatted = `${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

  return (
    <div
      className={`w-full rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/60 to-red-50/20 p-3.5 sm:p-4.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] transition-all duration-300 font-sans ${className}`}
    >
      {/* ── Top Bar: Title, Duration & Primary Quick Action ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
              isPlaying
                ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/25 animate-pulse"
                : "bg-red-50 text-[#ea384c] border-red-100"
            }`}
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-full"></span>
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_250ms] h-3/4"></span>
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_400ms] h-4/5"></span>
              </div>
            ) : (
              <Headphones className="h-4.5 w-4.5 stroke-[2.2]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                Listen to this article
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-100/70 px-2 py-0.5 text-[10px] font-bold text-[#ea384c]">
                <Sparkles className="h-2.5 w-2.5" />
                AI Voice
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {isPlaying
                ? `${timeFormatted} remaining • Playing sentence ${currentIndex + 1}/${sentences.length}`
                : readTime
                ? `${readTime} listen • Voice narration`
                : "Narrated with clear voice"}
            </p>
          </div>
        </div>

        {/* Right: Voice Toggle (Man / Woman) + Play Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Man / Woman Segmented Pill */}
          <div className="inline-flex items-center rounded-xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => handleGenderChange("female")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                gender === "female"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Listen with a woman's voice"
            >
              <span className="text-sm">👩</span>
              <span className="hidden xs:inline sm:inline">Woman</span>
            </button>

            <button
              type="button"
              onClick={() => handleGenderChange("male")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                gender === "male"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Listen with a man's voice"
            >
              <span className="text-sm">👨</span>
              <span className="hidden xs:inline sm:inline">Man</span>
            </button>
          </div>

          {/* Primary Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 rounded-xl bg-[#ea384c] hover:bg-[#d92d40] active:scale-95 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[13px] font-bold shadow-sm shadow-red-500/25 transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-white stroke-[2.5]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-white stroke-[2.5]" />
                <span>{isPaused ? "Resume" : "Listen"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Interactive Progress Bar ── */}
      {(isPlaying || isPaused || isExpanded) && (
        <div className="mt-3.5 pt-3 border-t border-slate-200/70 animate-in fade-in duration-200">
          <div
            onClick={handleProgressClick}
            className="relative h-2 w-full rounded-full bg-slate-200/80 cursor-pointer overflow-hidden group"
            title="Click to seek"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#ea384c] rounded-full transition-all duration-200 group-hover:bg-[#d92d40]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-500 tabular-nums">
            <span>
              {currentIndex + 1} of {sentences.length} sections
            </span>
            <span>{progressPercent}% completed</span>
            <span>{timeFormatted} left</span>
          </div>

          {/* ── Secondary Controls: Skip Back, Skip Forward, Speed & Stop ── */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-1">
            {/* Skip & Stop Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => handleSkip("back")}
                disabled={currentIndex === 0}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-35 transition cursor-pointer"
                title="Previous sentence"
              >
                <SkipBack className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSkip("forward")}
                disabled={currentIndex >= sentences.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-35 transition cursor-pointer"
                title="Next sentence"
              >
                <SkipForward className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition cursor-pointer ml-1"
                title="Reset audio"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Reading Preview Snippet */}
            <div className="hidden md:block max-w-[280px] lg:max-w-[340px] truncate text-[11px] text-slate-500 font-medium italic">
              &ldquo;{sentences[currentIndex]}&rdquo;
            </div>

            {/* Speed Selector Pills */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden sm:inline">
                Speed:
              </span>
              {[1, 1.25, 1.5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSpeedChange(s)}
                  className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold transition cursor-pointer ${
                    speed === s
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogAudioPlayer;
