"use client";

import React, { useEffect, useState } from "react";
import GiftFab from "@/app/dashboard/components/spin-wheel/gift-fab";
import { ApplyNowModal } from "@/components/form/apply-now-modal";

/** Fired by the site header's "Apply Now" button on landing pages */
export const LP_OPEN_APPLY_EVENT = "lp-open-apply";

/**
 * DBA landing page: the dashboard's animated gift icon, fixed bottom-left.
 * Opens the same Apply form as "Start Your Dr. Journey".
 * Also opens that form when the header's "Apply Now" button is clicked (the header sits outside
 * the page's form provider, so it signals here instead of rendering its own popup).
 */
export default function DbaGiftButton({ courses }: { courses?: string[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openForm = () => setOpen(true);
    window.addEventListener(LP_OPEN_APPLY_EVENT, openForm);
    return () => window.removeEventListener(LP_OPEN_APPLY_EVENT, openForm);
  }, []);

  return (
    <>
      <GiftFab onClick={() => setOpen(true)} positionClassName="bottom-5 left-4 sm:bottom-6 sm:left-6" />
      <ApplyNowModal isOpen={open} onClose={() => setOpen(false)} courses={courses} />
    </>
  );
}
