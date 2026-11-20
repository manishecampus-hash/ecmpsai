"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Download } from "lucide-react";

// The form and popup frame load only when the popup is first opened,
// so pages with "Apply Now" buttons don't ship the form code up front.
const ApplicationForm = dynamic(() => import("@/components/form/common-form").then((m) => m.ApplicationForm), { ssr: false });
const LeadFormModalFrame = dynamic(() => import("@/components/form/lead-form-modal-frame"), { ssr: false });

/**
 * Visual style of the Apply popup. "assured" shows the eCampus Assured artwork
 * (desktop / mobile images) with the matching form look. A page opts in by wrapping
 * its content in <ApplyFormStyleProvider value="assured">; every other page keeps the default.
 * "lp" (MBA & DBA landing pages) is the assured popup with the university-card style Apply button,
 * matching the inline hero form.
 */
export type ApplyFormStyle = "default" | "assured" | "lp";

// Site-wide default: the landing-page form look (one form everywhere). A page can still opt out via the provider.
const ApplyFormStyleContext = createContext<ApplyFormStyle>("lp");
/** Page-wide course dropdown options, used by any popup on the page that isn't given its own list */
const ApplyFormCoursesContext = createContext<string[] | undefined>(undefined);

export function ApplyFormStyleProvider({
  value,
  courses,
  children,
}: {
  value: ApplyFormStyle;
  courses?: string[];
  children: React.ReactNode;
}) {
  return (
    <ApplyFormStyleContext.Provider value={value}>
      <ApplyFormCoursesContext.Provider value={courses}>{children}</ApplyFormCoursesContext.Provider>
    </ApplyFormStyleContext.Provider>
  );
}

function usePageCourses(courses?: string[]) {
  const pageCourses = useContext(ApplyFormCoursesContext);
  return courses?.length ? courses : pageCourses;
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

export function ApplyNowModal({ isOpen, onClose, courses: ownCourses }: ApplyNowModalProps) {
  const style = useContext(ApplyFormStyleContext);
  const courses = usePageCourses(ownCourses);
  const isAssured = style !== "default";

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
      variant={isAssured ? "assured" : "default"}
    >
      <ApplicationForm
        onSubmit={() => onClose()}
        onBack={() => onClose()}
        courses={courses}
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

interface BrochureModalProps extends ApplyNowModalProps {
  /** Shown in the popup title, e.g. "Golden Gate University" */
  programName?: string;
}

/**
 * "Download Brochure" popup — same look, fields and lead submission as the Apply popup
 * (and the landing-page hero form), with brochure wording.
 */
export function BrochureModal({ isOpen, onClose, courses: ownCourses, programName }: BrochureModalProps) {
  const style = useContext(ApplyFormStyleContext);
  const courses = usePageCourses(ownCourses);
  const isAssured = style !== "default";

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
      title="Download brochure"
      imageSrc={isAssured ? ASSURED_IMAGES.desktop : "/application-form-popup.jpeg"}
      mobileImageSrc={isAssured ? ASSURED_IMAGES.mobile : undefined}
      variant={isAssured ? "assured" : "default"}
    >
      <ApplicationForm
        onSubmit={() => onClose()}
        onBack={() => onClose()}
        courses={courses}
        variant={style}
        heading={
          programName ? (
            <>
              Download <span className="text-red-600">{programName}</span> Brochure
            </>
          ) : (
            <>
              Download <span className="text-red-600">Brochure</span>
            </>
          )
        }
        badge="Fees, Syllabus & Scholarships"
        submitLabel="Download Brochure"
        submitIcon={<Download className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />}
      />
    </LeadFormModalFrame>
  );
}

/** A button that opens the Download Brochure popup (usable from server-rendered sections). */
export function BrochureButton({
  className,
  children,
  courses,
  programName,
}: {
  className?: string;
  children: React.ReactNode;
  courses?: string[];
  programName?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <BrochureModal isOpen={open} onClose={() => setOpen(false)} courses={courses} programName={programName} />
    </>
  );
}

export default ApplyNowModal;
