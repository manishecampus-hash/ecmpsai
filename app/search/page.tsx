// app/search/page.tsx
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUp,
  Search,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Share2,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  BookOpen,
  TrendingUp,
  User,
  X,
  Lightbulb,
  Check,
  ArrowLeft,
} from "lucide-react";
import { SignupModal } from "@/components/layout/signup-modal";
import { Footer } from "@/components/layout/footer";

// ── Design tokens ─────────────────────────────────────────────
const T = {
  bg: "#fffafa",
  // Soft red-to-white wash used behind the whole page
  bgGradient:
    "radial-gradient(1100px 420px at 50% -120px, rgba(254,202,202,0.55), rgba(255,255,255,0) 70%), linear-gradient(180deg, #fff5f5 0%, #ffffff 38%, #fffafa 100%)",
  surface: "#ffffff",
  border: "rgba(15,23,42,0.08)",
  borderHov: "rgba(220,38,38,0.35)",
  textPrim: "#0f172a",
  textSec: "#475569",
  textHint: "#94a3b8",
  accent: "#dc2626", // eCampus brand red
  accentDark: "#b91c1c",
  accentLight: "#fef2f2",
  accentGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 55%, #b91c1c 100%)",
  green: "#16a34a",
  greenLight: "#f0fdf4",
  red: "#dc2626",
  redLight: "#fef2f2",
  btnGray: "#334155",
  btnGrayBg: "#f8fafc",
  cardShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(220,38,38,0.12)",
};

const CHIP_ICONS = [
  TrendingUp,
  BookOpen,
  GraduationCap,
  BriefcaseBusiness,
  Landmark,
  Lightbulb,
];

function SourceLogo({ domain }: { domain: string }) {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        background: T.accentGradient,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={faviconUrl}
        alt={domain}
        width={18}
        height={18}
        style={{ display: "block" }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.style.fontSize = "13px";
            parent.style.fontWeight = "700";
            parent.style.color = "#fff";
            parent.style.fontFamily = "Arial, sans-serif";
            parent.innerHTML = domain[0].toUpperCase();
          }
        }}
      />
    </div>
  );
}

function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[100, 85, 92, 70, 88].map((w, i) => (
        <div
          key={i}
          style={{
            height: 14,
            width: `${w}%`,
            borderRadius: 8,
            background:
              "linear-gradient(90deg,#fdf2f2 25%,#fde2e2 50%,#fdf2f2 75%)",
            backgroundSize: "200% 100%",
            animation: `shimmer 1.4s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

function FormattedAnswer({ text }: { text: string }) {
  const clean = text.replace(/\**\s*FOLLOWUPS:[\s\S]*$/, "").trim();
  return (
    <div style={{ lineHeight: 1.85, fontSize: 15, color: T.textPrim }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: T.textPrim,
                margin: "1.4rem 0 0.5rem",
                paddingBottom: 4,
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: T.textPrim,
                margin: "1.4rem 0 0.5rem",
                paddingBottom: 4,
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: T.textPrim,
                margin: "1rem 0 0.4rem",
              }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p
              style={{
                margin: "0 0 0.8rem",
                color: T.textPrim,
                lineHeight: 1.85,
              }}
            >
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: 600, color: T.textPrim }}>
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                paddingLeft: 0,
                margin: "0.4rem 0 0.8rem",
                listStyle: "none",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                paddingLeft: 18,
                margin: "0.4rem 0 0.8rem",
                color: T.textPrim,
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              style={{ marginBottom: 8, color: T.textPrim, lineHeight: 1.75 }}
            >
              {children}
            </li>
          ),
          table: ({ children }) => (
            <div
              style={{
                overflowX: "auto",
                margin: "1rem 0",
                borderRadius: 10,
                border: `1px solid ${T.border}`,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                  minWidth: 320,
                }}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ background: T.accentLight }}>{children}</thead>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: "10px 14px",
                textAlign: "left",
                fontWeight: 600,
                color: T.accent,
                borderBottom: `2px solid ${T.borderHov}`,
                whiteSpace: "nowrap",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {children}
            </th>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr
              style={{ transition: "background 0.15s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fff7f7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: "9px 14px",
                borderBottom: `1px solid ${T.border}`,
                color: T.textPrim,
                verticalAlign: "top",
                lineHeight: 1.6,
              }}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: `1px solid ${T.border}`,
                margin: "1.2rem 0",
              }}
            />
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: `3px solid ${T.accent}`,
                margin: "0.8rem 0",
                paddingLeft: 14,
                color: T.textSec,
                fontStyle: "italic",
              }}
            >
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code
              style={{
                background: T.accentLight,
                color: T.accent,
                borderRadius: 4,
                padding: "1px 6px",
                fontSize: 13,
                fontFamily: "monospace",
              }}
            >
              {children}
            </code>
          ),
        }}
      >
        {clean}
      </ReactMarkdown>
    </div>
  );
}

function SourceCard({ source }: { source: any }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        padding: "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        background: T.surface,
        boxShadow: hov ? "0 4px 14px rgba(220,38,38,0.10)" : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flexShrink: 0 }}>
          <SourceLogo domain={source.domain} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: T.textPrim,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {source.title}
          </p>
          <p
            style={{
              fontSize: 11,
              color: T.accent,
              margin: "2px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <ExternalLink size={10} />
            {source.domain}
          </p>
        </div>
      </div>
    </a>
  );
}

function getSourcesForQuery(q: string) {
  const domains = [
    "shiksha.com",
    "careers360.com",
    "collegedunia.com",
    "getmyuni.com",
    "indiatoday.in",
  ];
  return domains.slice(0, 4).map((domain, i) => ({
    id: i + 1,
    title: `${q} — Guide ${i + 1}`,
    domain,
    url: `https://${domain}`,
  }));
}

function IconBtn({
  icon: Icon,
  label,
  active,
  activeColor,
  activeBg,
  onClick,
}: any) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 12px",
        borderRadius: 999,
        border: `1px solid ${active || hov ? T.borderHov : T.border}`,
        background: active ? activeBg : hov ? T.btnGrayBg : "transparent",
        color: active ? activeColor : T.btnGray,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function ActionBtn({ icon: Icon, label, onClick, active, activeColor }: any) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 10px",
        borderRadius: 999,
        border: "none",
        background: hov ? T.btnGrayBg : "transparent",
        color: active ? activeColor : T.btnGray,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

function Chip({
  label,
  iconIndex,
  onClick,
}: {
  label: string;
  iconIndex: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const Icon = CHIP_ICONS[iconIndex % CHIP_ICONS.length];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 999,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        background: hov ? T.accentLight : T.surface,
        fontSize: 13,
        color: hov ? T.accentDark : T.textPrim,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Icon size={13} style={{ color: T.accent }} />
      {label}
    </button>
  );
}

function ShareModal({ url, onClose }: { url: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      color: "#25d366",
      href: `https://wa.me/?text=${encodeURIComponent(url)}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      color: "#000",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      color: "#0a66c2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "100%",
          maxWidth: 340,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 15, color: T.textPrim }}>
            Share this answer
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: T.textSec,
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          {shareOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "12px 8px",
                borderRadius: 10,
                background: opt.color,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {opt.icon}
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 500 }}>
                {opt.label}
              </span>
            </a>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: T.bg,
            borderRadius: 10,
            padding: "10px 12px",
            border: `1px solid ${T.border}`,
          }}
        >
          <span
            style={{
              flex: 1,
              fontSize: 12,
              color: T.textSec,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </span>
          <button
            onClick={copyLink}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 12px",
              borderRadius: 8,
              background: copied ? T.green : T.accent,
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Core search page ──────────────────────────────────────────
function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get("q") ?? "";

  const [inputVal, setInputVal] = useState(urlQuery);
  const [answer, setAnswer] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const [isDone, setDone] = useState(false);
  const [showSrc, setShowSrc] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const [followUp, setFollowUp] = useState("");
  const [fuFocused, setFuFocused] = useState(false);

  // Below 768px the site's BottomNav (73.5px, hides while scrolling down) sits at the
  // bottom of the screen — mirror its visibility so the composer always sits just above it.
  const [hasBottomNav, setHasBottomNav] = useState(false);
  const [bottomNavShown, setBottomNavShown] = useState(true);
  useEffect(() => {
    let lastY = window.scrollY;
    const onResize = () => setHasBottomNav(window.innerWidth < 768);
    const onScroll = () => {
      const y = window.scrollY;
      setBottomNavShown(!(y > lastY && y > 100));
      lastY = y;
    };
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const composerOffset = hasBottomNav && bottomNavShown ? 74 : 0;

  // ── Detect mobile ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleOpenSignup = () => setShowSignupModal(true);
    window.addEventListener("open-signup", handleOpenSignup);
    return () => window.removeEventListener("open-signup", handleOpenSignup);
  }, []);

  useEffect(() => {
    if (!urlQuery) return;
    setInputVal(urlQuery);
    runQuery(urlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  async function runQuery(q: string) {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setAnswer("");
    setDone(false);
    setShowSrc(false);
    setLiked(null);
    setChips([]);
    setSources(getSourcesForQuery(q));
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
        signal: ctrl.signal,
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let srcShown = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setAnswer(full);
        if (!srcShown && full.length > 60) {
          setShowSrc(true);
          srcShown = true;
        }
      }

      // The model sometimes bolds the marker ("**FOLLOWUPS:**") and puts the questions
      // on the next line(s), so read everything after it and strip markdown leftovers.
      const followMatch = full.match(/FOLLOWUPS:([\s\S]*)$/);
      if (followMatch) {
        const parsed = followMatch[1]
          .split(/\||\n/)
          .map((s) =>
            s
              .replace(/[*_`#>]/g, "")
              .replace(/^\s*(?:[-•]|\d+[.)])\s*/, "")
              .replace(/^["'“”]+|["'“”]+$/g, "")
              .trim(),
          )
          .filter((s) => s.length > 3 && /[a-z]/i.test(s))
          .slice(0, 5);
        setChips(parsed);
      }

      setDone(true);
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setAnswer("Sorry, something went wrong. Please try again.");
        setDone(true);
      }
    } finally {
      setStreaming(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputVal.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleChip = (label: string) => {
    router.push(`/search?q=${encodeURIComponent(label)}`);
  };

  const handleCopy = () => {
    const clean = answer
      .replace(/\**\s*FOLLOWUPS:[\s\S]*$/, "")
      .replace(/\*\*/g, "")
      .replace(/##\s*/g, "")
      .trim();
    navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetry = () => {
    if (urlQuery) runQuery(urlQuery);
  };
  const handleShare = () => setShowShare(true);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const fallbackFaqs = [
    {
      q: `What should I know about ${urlQuery || "this topic"}?`,
      a: "This FAQ is based on your current search topic.",
    },
    {
      q: `How do I compare options for ${urlQuery || "this search"}?`,
      a: "Compare approval, fees, flexibility, specialization, support, and career value.",
    },
    {
      q: "What should I verify before applying?",
      a: "Verify UGC-DEB approval, latest fees, eligibility, admission deadline, and official terms.",
    },
    {
      q: "Are EMI or installment options available?",
      a: "Many private universities offer EMI, no-cost EMI, or semester-wise fee payment options.",
    },
    {
      q: "Is this suitable for working professionals?",
      a: "Online programs are usually suitable for working professionals because they offer flexible classes and recorded lectures.",
    },
  ];

  const dynamicFaqs = [
    ...chips.map((chip) => ({
      q: chip,
      a: "Click this question to explore it in detail.",
    })),
    ...fallbackFaqs,
  ].slice(0, 6);

  const visibleFaqs = showAllFaqs ? dynamicFaqs : dynamicFaqs.slice(0, 3);
  const hasMoreFaqs = dynamicFaqs.length > 3;

  // ── Sidebar / FAQ panel (shared between mobile & desktop) ──
  const SidebarContent = (
    <div
      style={{
        position: isMobile ? "static" : "sticky",
        top: 88,
        opacity: showSrc ? 1 : 0,
        transform: showSrc ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* FAQ card */}
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          padding: 18,
          boxShadow: T.cardShadow,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: T.textPrim,
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {visibleFaqs.map((faq, index, arr) => (
            <div
              key={faq.q}
              style={{
                borderBottom:
                  index === arr.length - 1 ? "none" : `1px solid ${T.border}`,
                paddingBottom: index === arr.length - 1 ? 0 : 10,
              }}
            >
              <button
                type="button"
                onClick={() => handleChip(faq.q)}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.textPrim,
                  margin: "0 0 4px",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {faq.q}
              </button>
              <p
                style={{
                  fontSize: 12,
                  color: T.textSec,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
        {hasMoreFaqs && (
          <button
            type="button"
            onClick={() => setShowAllFaqs((prev) => !prev)}
            style={{
              marginTop: 14,
              width: "100%",
              border: `1px solid ${T.border}`,
              background: T.surface,
              color: T.accent,
              borderRadius: 999,
              padding: "8px 12px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {showAllFaqs ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* CTA card */}
      {isDone && (
        <div
          style={{
            marginTop: 12,
            background: "linear-gradient(135deg,#fff1f2 0%,#fee2e2 100%)",
            border: "1px solid rgba(220,38,38,0.16)",
            borderRadius: 18,
            padding: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <User size={14} color={T.accent} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.accent }}>
              Save this answer
            </span>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "#444",
              margin: "0 0 12px",
              lineHeight: 1.6,
            }}
          >
            Sign up to bookmark answers, track your applications and get
            personalised guidance.
          </p>
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            style={{
              width: "100%",
              padding: "9px",
              borderRadius: 999,
              background: T.accentGradient,
              color: "#fff",
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 16px -6px rgba(220,38,38,0.55)",
            }}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bgGradient, backgroundColor: T.bg, color: T.textPrim }}>
      {showShare && (
        <ShareModal url={shareUrl} onClose={() => setShowShare(false)} />
      )}

      {/* ══ Sticky header ══ */}

      {/* <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: T.surface,
              border: `1.5px solid ${T.border}`,
              borderRadius: 999,
              padding: isMobile ? "5px 6px 5px 12px" : "6px 8px 6px 16px",
              transition: "border-color 0.2s",
              minWidth: 0, // critical: prevents overflow in flex
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
          >
            <Search size={14} style={{ color: T.textHint, flexShrink: 0 }} />
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask eCampus AI…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: isMobile ? 13 : 14,
                color: T.textPrim,
                minWidth: 0, // critical: prevents input from overflowing
              }}
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: T.textHint,
                  padding: 4,
                  display: "flex",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              >
                <X size={13} />
              </button>
            )}
            <button
              type="submit"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#3c4043",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowUp size={14} color="#fff" />
            </button>
          </form> */}

      {/* ══ Main body ══ */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "16px 12px 230px" : "32px 24px 170px",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "1fr 308px",
          gap: isMobile ? 16 : 32,
          alignItems: "start",
        }}
      >
        {/* ════ LEFT / Main column ════ */}
        <div style={{ minWidth: 0, width: "100%" }}>
          {/* ── The question being answered ── */}
          {urlQuery && (
            <div style={{ marginBottom: isMobile ? 14 : 18 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: T.accent,
                  background: T.accentLight,
                  border: "1px solid rgba(220,38,38,0.14)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                <Sparkles size={12} />
                eCampus AI Search
              </span>
              <h1
                style={{
                  margin: "10px 0 0",
                  fontSize: isMobile ? 21 : 28,
                  lineHeight: 1.25,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: T.textPrim,
                  wordBreak: "break-word",
                }}
              >
                {urlQuery}
              </h1>
            </div>
          )}

          {/* ── AI Answer card ── */}
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: isMobile ? "16px 14px" : "22px 26px",
              marginBottom: 16,
              boxShadow: T.cardShadow,
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: T.accentGradient,
                  boxShadow: "0 4px 12px -4px rgba(220,38,38,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={15} color="#fff" aria-label="eCampus AI" />
              </div>
              <span
                style={{ fontWeight: 600, fontSize: 14, color: T.textPrim }}
              >
                AI Summary
              </span>
              {isStreaming && (
                <span
                  style={{
                    fontSize: 11,
                    color: T.accent,
                    background: T.accentLight,
                    padding: "2px 10px",
                    borderRadius: 999,
                  }}
                >
                  Generating…
                </span>
              )}
              {isDone && (
                <span
                  style={{
                    fontSize: 11,
                    color: T.green,
                    background: T.greenLight,
                    padding: "2px 10px",
                    borderRadius: 999,
                  }}
                >
                  Done
                </span>
              )}
            </div>

            {/* Answer body */}
            <div style={{ minHeight: 64 }}>
              {!isStreaming && !isDone && !answer ? (
                <Skeleton />
              ) : answer ? (
                <>
                  <FormattedAnswer text={answer} />
                  {isStreaming && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: "1em",
                        background: T.accent,
                        verticalAlign: "middle",
                        marginLeft: 2,
                        animation: "blink 0.7s steps(1) infinite",
                      }}
                    />
                  )}
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: T.textSec,
                    fontSize: 14,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      border: `2px solid ${T.accent}`,
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      flexShrink: 0,
                    }}
                  />
                  Thinking…
                </div>
              )}
            </div>

            {/* Actions row */}
            {isDone && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 2 : 4,
                  flexWrap: "wrap",
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <IconBtn
                  icon={ThumbsUp}
                  label={isMobile ? "" : "Helpful"}
                  active={liked === true}
                  activeColor={T.green}
                  activeBg={T.greenLight}
                  onClick={() => setLiked(true)}
                />
                <IconBtn
                  icon={ThumbsDown}
                  label={isMobile ? "" : "Not helpful"}
                  active={liked === false}
                  activeColor={T.red}
                  activeBg={T.redLight}
                  onClick={() => setLiked(false)}
                />
                <div style={{ flex: 1 }} />
                <ActionBtn
                  icon={copied ? Check : Copy}
                  label={isMobile ? "" : copied ? "Copied!" : "Copy"}
                  onClick={handleCopy}
                  active={copied}
                  activeColor={T.green}
                />
                <ActionBtn
                  icon={Share2}
                  label={isMobile ? "" : "Share"}
                  onClick={handleShare}
                />
                <ActionBtn
                  icon={RefreshCw}
                  label={isMobile ? "" : "Retry"}
                  onClick={handleRetry}
                />
              </div>
            )}
          </div>

          {/* ── Follow-up chips ── */}
          {isDone && chips.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: T.textSec,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Related searches
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {chips.map((label, i) => (
                  <Chip
                    key={label}
                    label={label}
                    iconIndex={i}
                    onClick={() => handleChip(label)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── FAQ panel: mobile only (inline) ── */}
          {isMobile && SidebarContent}

        </div>

        {/* ════ RIGHT: Desktop sidebar only ════ */}
        {!isMobile && SidebarContent}
      </main>

      {/* ════ FOOTER ════ */}
      <div className="relative z-10 pb-28 sm:pb-32">
        <Footer />
      </div>

      {/* ══ Fixed composer (always reachable, like ChatGPT) ══ */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: composerOffset,
          transition: "bottom 0.3s ease",
          zIndex: 40,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,250,250,0) 0%, rgba(255,250,250,0.92) 38%, #fffafa 70%)",
          paddingTop: 28,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "0 12px 12px" : "0 24px 18px",
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? undefined : "1fr 308px",
            gap: 32,
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const t = followUp.trim();
                if (t) {
                  router.push(`/search?q=${encodeURIComponent(t)}`);
                  setFollowUp("");
                }
              }}
              style={{
                background: T.surface,
                border: `1.5px solid ${fuFocused ? "rgba(220,38,38,0.45)" : "rgba(220,38,38,0.18)"}`,
                borderRadius: 22,
                padding: isMobile ? "8px 8px 8px 14px" : "10px 10px 10px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: fuFocused
                  ? "0 0 0 4px rgba(254,226,226,0.9), 0 18px 40px -18px rgba(220,38,38,0.45)"
                  : "0 14px 36px -18px rgba(220,38,38,0.35), 0 2px 6px rgba(15,23,42,0.04)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  background: T.accentLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={15} style={{ color: T.accent }} />
              </span>
              <input
                name="fu"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                onFocus={() => setFuFocused(true)}
                onBlur={() => setFuFocused(false)}
                placeholder={
                  isMobile ? "Ask eCampus AI anything…" : "Ask a follow-up about universities, fees, courses or careers…"
                }
                aria-label="Ask eCampus AI"
                autoComplete="off"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
                  padding: "8px 0",
                  fontSize: isMobile ? 14 : 15,
                  color: T.textPrim,
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                disabled={!followUp.trim()}
                aria-label="Send"
                style={{
                  width: isMobile ? 38 : 42,
                  height: isMobile ? 38 : 42,
                  borderRadius: 14,
                  background: followUp.trim() ? T.accentGradient : "#f1f5f9",
                  border: "none",
                  cursor: followUp.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: followUp.trim() ? "0 8px 18px -8px rgba(220,38,38,0.7)" : "none",
                  transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
                }}
              >
                <ArrowUp size={17} color={followUp.trim() ? "#fff" : T.textHint} strokeWidth={2.5} />
              </button>
            </form>
            <p
              style={{
                margin: "8px 0 0",
                textAlign: "center",
                fontSize: 11,
                color: T.textHint,
              }}
            >
              eCampus AI can make mistakes. Verify fees and approvals on the official university website.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin   { to{transform:rotate(360deg)} }
      `}</style>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => setShowSignupModal(false)}
      />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#fffafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#5f6368",
          }}
        >
          Loading…
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
