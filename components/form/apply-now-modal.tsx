"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The form and popup frame load only when the popup is first opened,
// so pages with "Apply Now" buttons don't ship the form code up front.
const ApplicationForm = dynamic(() => import("@/components/form/common-form").then((m) => m.ApplicationForm), { ssr: false });
const LeadFormModalFrame = dynamic(() => import("@/components/form/lead-form-modal-frame"), { ssr: false });

/**
 * Visual style of the Apply popup. "assured" shows the eCampus Assured artwork
 * (desktop / mobile images) with the matching form look. A page opts in by wrapping
 * its content in <ApplyFormStyleProvider value="assured">; every other page keeps the default.
 */
export type ApplyFormStyle = "default" | "assured";

const ApplyFormStyleContext = createContext<ApplyFormStyle>("default");

export function ApplyFormStyleProvider({ value, children }: { value: ApplyFormStyle; children: React.ReactNode }) {
  return <ApplyFormStyleContext.Provider value={value}>{children}</ApplyFormStyleContext.Provider>;
}

const ASSURED_IMAGES = {
  desktop: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/application-form-popup.jpeg",
  mobile: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/application-form-mobile%20view.jpeg",
};

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Page-specific options for the form's course dropdown (e.g. DBA specialisations) */
  courses?: string[];
}

export function ApplyNowModal({ isOpen, onClose, courses }: ApplyNowModalProps) {
  const style = useContext(ApplyFormStyleContext);
  const isAssured = style === "assured";

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
    <LeadFormModalFrame
      onClose={onClose}
      title="Apply now"
      imageSrc={isAssured ? ASSURED_IMAGES.desktop : "/application-form-popup.jpeg"}
      mobileImageSrc={isAssured ? ASSURED_IMAGES.mobile : undefined}
      variant={style}
    >
      <ApplicationForm
        onSubmit={() => onClose()}
        onBack={() => onClose()}
        courses={courses}
        coursePlaceholder={courses?.length ? "Choose Specialisation" : undefined}
        variant={style}
      />
    </LeadFormModalFrame>
  );
}

/**
 * A button that opens the Apply Now popup. Lets server-rendered sections
 * have an Apply button without making the whole section a client component.
 */
export function ApplyNowButton({
  className,
  children,
  courses,
}: {
  className?: string;
  children: React.ReactNode;
  courses?: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <ApplyNowModal isOpen={open} onClose={() => setOpen(false)} courses={courses} />
    </>
  );
}

export default ApplyNowModal;
