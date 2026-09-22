"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link, Check } from "lucide-react";

export function ShareSaveButtons({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShareClick = async () => {
    // If Web Share API is supported and it is a mobile device, use native share
    if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch (err) {
        console.log("Native share failed, opening fallback dropdown:", err);
      }
    }
    // Otherwise toggle custom dropdown
    setIsOpen(!isOpen);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const getShareUrl = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    switch (platform) {
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${title}%20${url}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      default:
        return "#";
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        onClick={handleShareClick}
        className={
          className ||
          "inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50/50 shadow-2xs transition-all cursor-pointer"
        }
      >
        <Share2 className="h-3.5 w-3.5 text-red-500" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-lg z-50 flex flex-col gap-1 text-xs sm:text-sm font-medium">
          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Link className="h-4 w-4 text-slate-500" />
            )}
            <span className={copied ? "font-semibold text-emerald-600" : ""}>
              {copied ? "Link Copied!" : "Copy Link"}
            </span>
          </button>

          <hr className="border-t border-slate-100 my-1" />

          {/* WhatsApp */}
          <a
            href={getShareUrl("whatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href={getShareUrl("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#0077b5]">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          {/* Twitter / X */}
          <a
            href={getShareUrl("twitter")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-slate-900">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter / X</span>
          </a>

          {/* Facebook */}
          <a
            href={getShareUrl("facebook")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1877F2]">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default ShareSaveButtons;
