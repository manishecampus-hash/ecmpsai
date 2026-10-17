"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The form and popup frame load only when the popup is first opened,
// so pages with "Apply Now" buttons don't ship the form code up front.
const ApplicationForm = dynamic(() => import("@/components/form/common-form").then((m) => m.ApplicationForm), { ssr: false });
const LeadFormModalFrame = dynamic(() => import("@/components/form/lead-form-modal-frame"), { ssr: false });

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyNowModal({ isOpen, onClose }: ApplyNowModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <LeadFormModalFrame onClose={onClose} title="Apply now" imageSrc="/application-form-popup.jpeg">
      <ApplicationForm onSubmit={() => onClose()} onBack={() => onClose()} />
    </LeadFormModalFrame>
  );
}

/**
 * A button that opens the Apply Now popup. Lets server-rendered sections
 * have an Apply button without making the whole section a client component.
 */
export function ApplyNowButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <ApplyNowModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default ApplyNowModal;
