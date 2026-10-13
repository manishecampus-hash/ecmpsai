"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

function Dialog({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 px-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SHARE_TARGETS = [
  {
    label: "WhatsApp",
    color: "#25d366",
    href: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
  {
    label: "Twitter / X",
    color: "#000000",
    href: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    color: "#0a66c2",
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export function ShareDialog({ url, onClose }: { url: string | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the link is still visible to copy by hand.
    }
  };

  return (
    <Dialog open={Boolean(url)} onClose={onClose}>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[15px] font-semibold text-[#0d0d0d]">Share this answer</span>
        <button type="button" onClick={onClose} aria-label="Close" className="text-[#5d5d5d] hover:text-[#0d0d0d]">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-4 flex gap-2.5">
        {SHARE_TARGETS.map((t) => (
          <a
            key={t.label}
            href={url ? t.href(url) : "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: t.color }}
            className="flex flex-1 flex-col items-center gap-1.5 rounded-xl px-2 py-3 transition-opacity hover:opacity-85"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d={t.path} />
            </svg>
            <span className="text-[11px] font-medium text-white">{t.label}</span>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-black/[0.08] px-3 py-2.5">
        <span className="min-w-0 flex-1 truncate text-xs text-[#5d5d5d]">{url}</span>
        <button
          type="button"
          onClick={copy}
          className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors ${
            copied ? "bg-[#10a37f]" : "bg-[#0d0d0d] hover:bg-black/80"
          }`}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </Dialog>
  );
}

export function ConfirmDeleteDialog({
  title,
  onCancel,
  onConfirm,
}: {
  title: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={title !== null} onClose={onCancel}>
      <h2 className="text-lg font-semibold text-[#0d0d0d]">Delete chat?</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5d5d5d]">
        This will delete <span className="font-semibold text-[#0d0d0d]">{title}</span> from this device.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#0d0d0d] transition hover:bg-black/[0.04]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          autoFocus
          className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Dialog>
  );
}
