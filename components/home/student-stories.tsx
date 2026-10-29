"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Phone, Play, Quote, Star, Video, X } from "lucide-react";
import { STUDENT_STORIES, type StudentStoryT } from "@/data/student-stories";

const HELPLINE = "18001216201";
const WHATSAPP = "919873794789";
const EASE = [0.22, 1, 0.36, 1] as const;

// Each card on a page sits at a slight angle, like photos laid out on a table
const TILTS = [-3, 2, -1.5, 2.5, -2];
const LIFTS = [6, -4, 8, -2, 4];

// Cards per page: 1 on phones, 2 on large phones, 3 on tablets, 5 on desktop
function useCardsPerPage() {
  const [perPage, setPerPage] = useState(5);
  useEffect(() => {
    const queries = [
      { q: "(min-width: 1024px)", n: 5 },
      { q: "(min-width: 768px)", n: 3 },
      { q: "(min-width: 520px)", n: 2 },
    ].map((x) => ({ ...x, mql: window.matchMedia(x.q) }));
    const update = () => setPerPage(queries.find((x) => x.mql.matches)?.n ?? 1);
    update();
    queries.forEach((x) => x.mql.addEventListener("change", update));
    return () => queries.forEach((x) => x.mql.removeEventListener("change", update));
  }, []);
  return perPage;
}

// Slowly turning "Verified student" seal in the card corner
function VerifiedSeal() {
  const pathId = `seal-${useId().replace(/:/g, "")}`;
  return (
    <span className="absolute right-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-black/20">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id={pathId} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="11.5" fontWeight="700" letterSpacing="1.6" fill="#e11d48">
          <textPath href={`#${pathId}`}>VERIFIED • ECAMPUS STUDENT •</textPath>
        </text>
      </motion.svg>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white">
        <GraduationCap className="h-3.5 w-3.5" />
      </span>
    </span>
  );
}

function StoryCard({ story, onOpen }: { story: StudentStoryT; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Watch ${story.name}'s story`}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[22px] text-left shadow-[0_22px_45px_-20px_rgba(159,18,57,0.65)] outline-none ring-1 ring-white/10 focus-visible:ring-4 focus-visible:ring-red-300"
    >
      {/* Brand backdrop: eCampus red fading into the site's navy */}
      <span className="absolute inset-0 bg-gradient-to-b from-[#ff5a6a] via-[#e11d48] to-[#1B2230]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.35),transparent_55%)]" />
      <span className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(135deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />

      <Image
        src={story.photo}
        alt=""
        fill
        sizes="(min-width: 1024px) 260px, (min-width: 768px) 30vw, 80vw"
        className="origin-top object-contain object-top pt-7 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />

      {/* Darkens the lower half so the text reads on any photo */}
      <span className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#120a12] via-[#120a12]/80 to-transparent" />

      <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-bold text-gray-900 shadow-md">
        <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
        {story.rating.toFixed(1)}
      </span>
      <VerifiedSeal />

      {/* Play button — small and see-through so the student stays visible */}
      <span className="absolute left-1/2 top-[50%] z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 group-hover:animate-ping group-hover:opacity-100" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/10 ring-1 ring-white/60 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/90 group-hover:ring-white">
          <Play className="ml-0.5 h-4 w-4 text-white/90 drop-shadow transition-colors group-hover:text-red-600" fill="currentColor" />
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 z-20 p-4">
        <span className="block text-lg font-extrabold leading-tight text-white drop-shadow-sm">{story.name}</span>
        <span className="mt-0.5 block text-xs font-medium text-white/75">{story.program}</span>
        <span className="mt-3 flex flex-wrap gap-1.5">
          {story.tags.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/25 backdrop-blur-sm"
            >
              <span aria-hidden>{t.emoji}</span>
              {t.label}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
    </svg>
  );
}

// Story player: a wide cinema-style video on top, the student's portrait overlapping it, their words set as a
// classic serif quote, and a footer to step through the other stories without closing.
function StoryModal({
  stories,
  index,
  onChange,
  onClose,
}: {
  stories: StudentStoryT[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const story = index === null ? null : stories[index];
  const total = stories.length;
  const go = useCallback((step: number) => index !== null && onChange((index + step + total) % total), [index, total, onChange]);

  useEffect(() => {
    if (!story) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [story, onClose, go]);

  // Start playing as soon as a story opens; if the browser blocks sound, play muted instead
  useEffect(() => {
    const v = videoRef.current;
    if (!story || !v) return;
    v.play().catch((e: DOMException) => {
      if (e.name !== "NotAllowedError") return;
      v.muted = true;
      v.play().catch(() => undefined);
    });
  }, [story]);

  const prev = story ? stories[(index! - 1 + total) % total] : null;
  const next = story ? stories[(index! + 1) % total] : null;

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          key="story-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0f17]/80 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${story.name}'s story`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 30 } }}
            exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="overflow-y-auto">
              {/* Cinema-style player */}
              <div className="relative bg-[#1B2230] p-2 sm:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[18px] bg-black">
                  <video
                    ref={videoRef}
                    key={story.id}
                    src={story.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Student story · {String(index! + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition hover:scale-105 hover:bg-gray-100 sm:right-7 sm:top-7"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="px-5 pb-7 sm:px-9"
                >
                  {/* Portrait overlapping the player, with name and rating */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
                    <span className="relative -mt-11 h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-rose-100 to-red-200 ring-4 ring-white shadow-lg sm:-mt-12 sm:h-24 sm:w-24">
                      <Image src={story.photo} alt="" fill sizes="96px" className="object-cover object-top" />
                    </span>
                    <div className="min-w-0 flex-1 sm:pb-1">
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900">{story.name}</h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-600">
                        <GraduationCap className="h-4 w-4 text-red-600" aria-hidden />
                        {story.program}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:pb-2" aria-label={`Rated ${story.rating} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`h-4 w-4 ${n <= Math.round(story.rating) ? "text-amber-400" : "text-gray-200"}`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-1.5 text-sm font-bold text-gray-900">{story.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* The student's words, set as a classic quote */}
                  <figure className="relative mt-7 border-t border-gray-200 pt-7">
                    <span aria-hidden className="absolute -top-[18px] left-0 bg-white pr-3 font-serif text-[56px] leading-none text-red-600">
                      &ldquo;
                    </span>
                    <blockquote className="font-serif text-[19px] italic leading-[1.65] text-gray-800 sm:text-[21px]">
                      {story.quote}
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                      <span aria-hidden className="h-px w-8 bg-red-600" />
                      <span>
                        <span className="font-semibold text-gray-900">{story.name}</span>, {story.program.split(" · ")[0]}
                      </span>
                    </figcaption>
                  </figure>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {story.tags.map((t) => (
                      <li
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700"
                      >
                        <span aria-hidden>{t.emoji}</span>
                        {t.label}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: step through stories, or talk to someone */}
            <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={`Previous story: ${prev?.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-red-300 hover:text-red-600 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={`Next story: ${next?.name}`}
                  className="group flex h-10 items-center gap-2 rounded-full border border-gray-300 bg-white pl-4 pr-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600 active:scale-95"
                >
                  <span className="max-w-[140px] truncate">Next: {next?.name}</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I watched a student story on eCampus and would like help choosing a program.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-emerald-300 bg-white px-3 py-2.5 text-[13px] sm:px-5 sm:text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${HELPLINE}`}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-red-600 px-3 py-2.5 text-[13px] sm:px-5 sm:text-sm font-semibold text-white shadow-md shadow-red-600/25 transition hover:bg-red-700"
                >
                  <Phone className="h-4 w-4" fill="currentColor" strokeWidth={1.5} />
                  Talk to an Expert
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const pageVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.06 } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70, transition: { duration: 0.25, ease: "easeIn" } }),
};

const cardVariants: Variants = {
  enter: { opacity: 0, y: 40, rotate: 0 },
  center: (i: number) => ({
    opacity: 1,
    y: LIFTS[i % LIFTS.length],
    rotate: TILTS[i % TILTS.length],
    transition: { type: "spring", stiffness: 220, damping: 20 },
  }),
  exit: { opacity: 0, y: 20 },
};

// "What Our Students Say" — video testimonials laid out as tilted cards, paged with dots and arrows.
export function StudentStoriesSection({ stories = STUDENT_STORIES }: { stories?: StudentStoryT[] }) {
  const perPage = useCardsPerPage();
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const [active, setActive] = useState<number | null>(null);
  // A swipe ends with a pointer-up on a card — don't treat that as a click
  const draggedRef = useRef(false);

  const pageCount = Math.max(1, Math.ceil(stories.length / perPage));
  const current = Math.min(page, pageCount - 1);
  const visible = stories.slice(current * perPage, current * perPage + perPage);

  const goTo = useCallback(
    (next: number) => {
      const target = (next + pageCount) % pageCount;
      if (target !== current) setPage([target, next > current ? 1 : -1]);
    },
    [current, pageCount],
  );
  const closeModal = useCallback(() => setActive(null), []);

  if (stories.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14">
      {/* Soft brand-tinted backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-red-50/50 to-white" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[70%] -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Video className="h-3.5 w-3.5 text-red-500" />
            Student Stories
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            What Our <span className="text-red-500">Students Say</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Real learners, real journeys. Hear how students found the right online degree, the right university and the
            right career path with guidance from eCampus.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative mt-10">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={`${current}-${perPage}`}
              custom={dir}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragStart={() => {
                draggedRef.current = true;
              }}
              onDragEnd={(_, info) => {
                setTimeout(() => {
                  draggedRef.current = false;
                }, 0);
                if (info.offset.x < -60) goTo(current + 1);
                else if (info.offset.x > 60) goTo(current - 1);
              }}
              className="mx-auto grid cursor-grab gap-3 active:cursor-grabbing sm:gap-4 lg:gap-2"
              style={{
                gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
                maxWidth: perPage === 1 ? 300 : undefined,
              }}
            >
              {visible.map((story, i) => (
                <motion.div
                  key={story.id}
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ rotate: 0, y: -12, scale: 1.04, zIndex: 10, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                  className="relative"
                >
                  <StoryCard story={story} onOpen={() => !draggedRef.current && setActive(stories.indexOf(story))} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous stories"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Story pages">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="relative h-2.5 rounded-full transition-[width] duration-300"
                  style={{ width: i === current ? 28 : 10 }}
                >
                  <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors hover:bg-gray-400" />
                  {i === current && (
                    <motion.span
                      layoutId="story-page-dot"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-rose-500"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next stories"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href={`tel:${HELPLINE}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/40 active:translate-y-0"
          >
            Talk to our experts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <StoryModal stories={stories} index={active} onChange={setActive} onClose={closeModal} />
    </section>
  );
}
