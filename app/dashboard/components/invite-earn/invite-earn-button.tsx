"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import InviteOfferModal from "./invite-offer-modal";

// Set before navigating so the Invite & Earn page skips its popup and goes straight to the form
export const REFER_INTENT_KEY = "ecampus_invite_refer";

export const INVITE_BUTTON_CLASS =
  "group inline-flex h-9 items-center gap-2 rounded-xl bg-red-600 px-2.5 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.97] sm:px-3.5";

export function InviteButtonContent() {
  return (
    <>
      <Gift className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden />
      <span className="hidden sm:inline">Invite &amp; Earn</span>
    </>
  );
}

// Top bar button on every dashboard page: opens the offer popup, and "Refer a friend" goes to the form
export default function InviteEarnButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Invite and earn offer" className={INVITE_BUTTON_CLASS}>
        <InviteButtonContent />
      </button>
      {/* Portalled so the sticky top bar can't affect the popup's position */}
      {mounted &&
        createPortal(
          <InviteOfferModal
            open={open}
            onClose={() => setOpen(false)}
            onRefer={() => {
              setOpen(false);
              try {
                sessionStorage.setItem(REFER_INTENT_KEY, "1");
              } catch {
                // Storage unavailable — the page simply opens with its popup.
              }
              router.push("/dashboard/invite-earn");
            }}
          />,
          document.body,
        )}
    </>
  );
}
