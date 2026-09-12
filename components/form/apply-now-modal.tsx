"use client";

import React, { useEffect } from "react";
import { ApplicationForm } from "@/components/form/common-form";

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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-gray-600 shadow cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>

        <ApplicationForm
          onSubmit={() => {
            onClose();
          }}
          onBack={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default ApplyNowModal;
