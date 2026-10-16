"use client";

import React, { useEffect } from "react";
import { ApplicationForm } from "@/components/form/common-form";
import LeadFormModalFrame from "@/components/form/lead-form-modal-frame";

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
    <LeadFormModalFrame onClose={onClose} title="Apply now">
      <ApplicationForm onSubmit={() => onClose()} onBack={() => onClose()} />
    </LeadFormModalFrame>
  );
}

export default ApplyNowModal;
