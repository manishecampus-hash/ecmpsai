"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Check, Loader2, Sparkles, X } from "lucide-react";
import UniImage from "@/components/ui/uniImage";
import { useAgent } from "../agent/agent-shell";
import { backdropMotion, dialogMotion } from "../motion";
import { applyTo, type ApplyTarget } from "./applied-store";

const APPLICATIONS = "/dashboard/applications";
type Choice = "single" | "ai";

// "1-Click Apply" popup. "Only this university" applies straight away and opens My Applications;
// "AI Apply" hands the job to the agent, which applies one university at a time in Work mode.
// Frontend only for now — results are saved by applied-store.
export default function ApplyChoiceModal({
  target,
  similar = [],
  onClose,
}: {
  target: ApplyTarget | null;
  similar?: ApplyTarget[];
  onClose: () => void;
}) {
  const router = useRouter();
  const agent = useAgent();
  const [choice, setChoice] = useState<Choice>("single");
  const [sending, setSending] = useState(false);
  // Rendered on <body> so the dark backdrop covers the whole screen (sidebar and top bar too)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fresh state each time it opens for a program
  useEffect(() => {
    if (!target) return;
    setChoice("single");
    setSending(false);
  }, [target]);

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onClose]);

  const picks = similar.slice(0, 3);
  const total = choice === "ai" ? picks.length + 1 : 1;
  const agentBusy = Boolean(agent?.runningTask);

  const applySingle = async (t: ApplyTarget) => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 500));
    applyTo(t);
    onClose();
    router.push(APPLICATIONS);
  };

  const applyWithAI = (t: ApplyTarget) => {
    const list = [t, ...picks];
    const started = agent?.runScript({
      prompt: `AI Apply: ${t.program} at ${t.university}${picks.length ? ` and ${picks.length} similar ${picks.length === 1 ? "university" : "universities"}` : ""}`,
      route: APPLICATIONS,
      routeTitle: "Opening My Applications",
      steps: list.map((p) => ({
        title: `Applying to ${p.university}`,
        run: () => {
          const res = applyTo(p, true);
          return res.status === "applied"
            ? { ok: true, title: `Applied to ${p.university}`, detail: p.program }
            : { ok: false, title: `${res.note ?? "Couldn't apply"} — ${p.university}`, detail: p.program };
        },
      })),
      summarize: (results) => {
        const ok = results.filter((r) => r.ok).length;
        const lines = results.map((r) => `- ${r.ok ? "✅" : "⚠️"} ${r.title}`).join("\n");
        return `**AI Apply finished — applied to ${ok} of ${results.length} ${results.length === 1 ? "university" : "universities"}.**\n\n${lines}\n\nYou can see every application in [My Applications](${APPLICATIONS}).`;
      },
    });
    onClose();
    // No agent here (or it's busy with another task): apply directly instead
    if (!started) {
      list.forEach((p) => applyTo(p, true));
      router.push(APPLICATIONS);
    }
  };

  const confirm = () => {
    if (!target || sending) return;
    if (choice === "ai") applyWithAI(target);
    else applySingle(target);
  };

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {target && (
        <motion.div
          key="apply-choice"
          {...backdropMotion}
          onClick={onClose}
          // Same backdrop as the Invite & Earn popup
          className="fixed inset-0 z-[90] flex items-end justify-center bg-gray-900/40 backdrop-blur-[2px] sm:items-center sm:p-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="1-Click Apply"
            {...dialogMotion}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] sm:max-w-[500px] sm:rounded-[28px] sm:p-7"
          >
            <div className="mx-auto -mt-2.5 mb-3 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Program */}
            <div className="flex items-center gap-3.5 pr-10">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
                {target.image && <UniImage src={target.image} alt={target.university} className="object-cover" />}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold uppercase tracking-wider text-red-600">{target.university}</p>
                <p className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 sm:text-base">{target.program}</p>
                {target.fee && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    Annual fee <span className="font-semibold text-gray-800">{target.fee}</span>
                  </p>
                )}
              </div>
            </div>

            <p className="mt-6 text-sm font-bold text-gray-900">How would you like to apply?</p>

            <div className="mt-3 space-y-3" role="radiogroup" aria-label="Apply option">
              <OptionCard
                selected={choice === "single"}
                onSelect={() => setChoice("single")}
                icon={<Building2 className="h-5 w-5" />}
                title="Only this university"
                text="Apply to this program now. It shows up in My Applications straight away."
              />
              <OptionCard
                selected={choice === "ai"}
                onSelect={() => setChoice("ai")}
                icon={<Sparkles className="h-5 w-5" />}
                title="AI Apply"
                badge="Recommended"
                text={
                  agentBusy
                    ? "The agent is busy with another task — these will be applied directly."
                    : `The eCampus Agent applies here${picks.length ? ` and to ${picks.length} similar ${picks.length === 1 ? "university" : "universities"}` : ""}, one by one, and tells you how each one went.`
                }
              >
                {picks.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {picks.map((p) => (
                      <span
                        key={`${p.university}-${p.program}`}
                        className="max-w-full truncate rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700"
                      >
                        {p.university}
                      </span>
                    ))}
                  </div>
                )}
              </OptionCard>
            </div>

            <button
              type="button"
              onClick={confirm}
              disabled={sending}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(220,38,38,0.7)] transition hover:from-red-700 hover:to-rose-600 active:scale-[0.99] disabled:opacity-80"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Applying…
                </>
              ) : choice === "ai" ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start AI Apply · {total} {total === 1 ? "university" : "universities"}
                </>
              ) : (
                <>
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function OptionCard({
  selected,
  onSelect,
  icon,
  title,
  badge,
  text,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  title: string;
  badge?: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition ${
        selected
          ? "border-red-500 bg-red-50/40 shadow-[0_10px_24px_-18px_rgba(220,38,38,0.8)]"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
          selected ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{title}</span>
          {badge && (
            <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{badge}</span>
          )}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-gray-500">{text}</span>
        {children}
      </span>
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
          selected ? "border-red-500 bg-red-500" : "border-gray-300"
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
      </span>
    </button>
  );
}
