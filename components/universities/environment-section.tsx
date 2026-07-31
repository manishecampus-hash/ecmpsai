"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CertificateData {
  heading?: string;
  description?: string;
  checklist?: string[];
  imageUrl?: string;
}

interface CertificateSection {
  university?: {
    name?: string;
    details?: {
      certificate?: CertificateData;
    };
  };
}

const DEFAULT_CHECKLIST = [
  "1st in India to get UGC approval for online programs",
  "India's only Online MBA accredited by QS and ranked among the top 10 in Asia Pacific.",
  "Degrees recognised by World Education Services (WES) across Canada & USA.",
  "Ranked 22nd by NIRF in 2025",
];

const DEFAULT_CERTIFICATE_IMAGE =
  "/newuniversities/amity-online-new-sample-degree.webp";

function PortalModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // lock body scroll when modal open
  useEffect(() => {
    const prev =
      typeof document !== "undefined" ? document.body.style.overflow : "";
    if (isOpen && typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content (centered, scrollable if needed) */}
      <div
        className="relative z-[100000] max-h-[90vh] w-full max-w-3xl overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-full">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default function SampleCertificateSection({
  university,
}: CertificateSection) {
  const [isOpen, setIsOpen] = useState(false);
  const certData = university?.details?.certificate || {};
  const universityName = university?.name || "Amity University";

  const checklist =
    certData.checklist && certData.checklist.length > 0
      ? certData.checklist
      : DEFAULT_CHECKLIST;

  const certificateImage = certData.imageUrl || DEFAULT_CERTIFICATE_IMAGE;

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isOpen]);

  return (
    <section
      id="certificate"
      className="bg-white px-4 pt-2 pb-14 sm:px-6 sm:pt-3 lg:px-8 lg:pt-4 lg:pb-20 font-[Inter]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-6">
          {/* Left: heading, description & checklist */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-3xl">
              {certData.heading ? (
                <span dangerouslySetInnerHTML={{ __html: certData.heading }} />
              ) : (
                <>
                  Sample Certificate from{" "}
                  <span className="text-red-500">{universityName} Online</span>
                </>
              )}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
              {certData.description ||
                `Become alumnus of ${universityName} Online and get a UGC-approved online degree. The degree awarded by the university is also been accredited by WES, etc.`}
            </p>

            <ul className="mt-5 space-y-4">
              {checklist.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.792 6.793-6.793a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: framed certificate image */}
          <div className="flex justify-center lg:col-span-2">
            {/* Use `group` so we can reveal the eye icon on hover */}
            <div className="relative w-full max-w-xs border-[8px] border-slate-900 bg-slate-900 shadow-2xl sm:max-w-sm group cursor-pointer">
              <div className="relative h-56 overflow-hidden bg-[#f5efe4] p-3 sm:h-64">
                {/* thumbnail image (click opens lightbox) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificateImage}
                  alt={`Sample certificate from ${universityName}`}
                  className="h-full w-full object-contain"
                  onClick={() => setIsOpen(true)}
                  role="button"
                  aria-label={`Open certificate preview from ${universityName}`}
                />

                {/* small centered eye icon on hover */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                  aria-label="Preview certificate"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-slate-900"
                    aria-hidden="true"
                  >
                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                    <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                  </svg>
                </button>

                {/* diagonal SAMPLE watermark */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl font-bold uppercase tracking-widest text-slate-400/30 [transform:rotate(-25deg)]">
                  Sample
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal portal with close button overlay on the image */}
      <PortalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative mx-auto w-full">
          {/* close button OVERLAYED on image (top-right of the image container) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close preview"
            className="absolute right-3 top-3 z-[100001] flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg hover:bg-slate-200 focus:outline-none"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={certificateImage}
            alt={`Sample certificate from ${universityName}`}
            className="mx-auto max-h-[calc(100vh-6rem)] w-auto max-w-full rounded-md object-contain shadow-2xl"
          />
        </div>
      </PortalModal>
    </section>
  );
}
