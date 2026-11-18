"use client";

import React, { useState } from "react";
import GiftFab from "@/app/dashboard/components/spin-wheel/gift-fab";
import { ApplyNowModal } from "@/components/form/apply-now-modal";

/**
 * DBA landing page: the dashboard's animated gift icon, fixed bottom-left.
 * Opens the same Apply form as "Start Your Dr. Journey".
 */
export default function DbaGiftButton({ courses }: { courses?: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GiftFab onClick={() => setOpen(true)} positionClassName="bottom-5 left-4 sm:bottom-6 sm:left-6" />
      <ApplyNowModal isOpen={open} onClose={() => setOpen(false)} courses={courses} />
    </>
  );
}
