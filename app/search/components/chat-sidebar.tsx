"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gift,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Search,
  Sparkles,
  SquarePen,
  Trash2,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { groupThreads, type ChatThread } from "./chat-store";

interface SidebarProps {
  threads: ChatThread[];
  activeId: string | null;
  /** Thread whose answer is streaming right now */
  busyThreadId: string | null;
  student: { name?: string } | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (thread: ChatThread) => void;
  onLogin: () => void;
  /** Docked (desktop) collapses to an icon rail; the drawer (phones) closes instead */
  variant: "docked" | "drawer";
  collapsed?: boolean;
  onToggle: () => void;
}

function RailButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group/rail relative flex h-10 w-10 items-center justify-center rounded-xl text-[#5d5d5d] transition-colors hover:bg-black/[0.05] hover:text-[#0d0d0d]"
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#0d0d0d] px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover/rail:opacity-100">
        {label}
      </span>
    </button>
  );
}

function ThreadRow({
  thread,
  active,
  busy,
  touch,
  onSelect,
  onRename,
  onDelete,
}: {
  thread: ChatThread;
  active: boolean;
  busy: boolean;
  touch: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(thread.title);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rowRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const finishRename = (save: boolean) => {
    const next = title.trim();
    if (save && next && next !== thread.title) onRename(next);
    else setTitle(thread.title);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={() => finishRename(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") finishRename(true);
          if (e.key === "Escape") finishRename(false);
        }}
        aria-label="Chat name"
        className="w-full rounded-lg border border-black/20 bg-white px-2.5 py-[7px] text-sm text-[#0d0d0d] outline-none focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
      />
    );
  }

  return (
    <div
      ref={rowRef}
      className={`group/row relative rounded-lg transition-colors ${active ? "bg-black/[0.07]" : "hover:bg-black/[0.04]"}`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? "page" : undefined}
        title={thread.title}
        className="flex w-full items-center gap-2 py-2 pl-2.5 pr-9 text-left text-sm text-[#0d0d0d]"
      >
        <span className="truncate">{thread.title}</span>
        {busy && <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-emerald-500" aria-label="Answering" />}
      </button>

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Chat options"
        aria-expanded={menuOpen}
        className={`absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#5d5d5d] transition hover:bg-black/[0.06] hover:text-[#0d0d0d] focus-visible:opacity-100 ${
          menuOpen || active || touch ? "opacity-100" : "opacity-0 group-hover/row:opacity-100"
        }`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-30 mt-1 w-40 origin-top-right rounded-xl border border-black/[0.08] bg-white p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                setEditing(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-[#0d0d0d] hover:bg-black/[0.04]"
            >
              <Pencil className="h-4 w-4 text-[#5d5d5d]" /> Rename
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChatSidebar({
  threads,
  activeId,
  busyThreadId,
  student,
  onNewChat,
  onSelect,
  onRename,
  onDelete,
  onLogin,
  variant,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [focusSearch, setFocusSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupThreads(q ? threads.filter((t) => t.title.toLowerCase().includes(q)) : threads);
  }, [threads, query]);

  // "Search chats" on the rail opens the sidebar straight into the search box
  useEffect(() => {
    if (!collapsed && focusSearch) {
      searchRef.current?.focus();
      setFocusSearch(false);
    }
  }, [collapsed, focusSearch]);

  const firstName = student?.name?.trim().split(/\s+/)[0];

  if (variant === "docked" && collapsed) {
    return (
      <div className="flex h-full w-full flex-col items-center gap-1 py-3">
        <RailButton icon={PanelLeftOpen} label="Open sidebar" onClick={onToggle} />
        <RailButton icon={SquarePen} label="New chat" onClick={onNewChat} />
        <RailButton
          icon={Search}
          label="Search chats"
          onClick={() => {
            setFocusSearch(true);
            onToggle();
          }}
        />
        <div className="flex-1" />
        {student ? (
          <Link
            href="/dashboard"
            aria-label="Go to dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ee2c3c] text-sm font-bold text-white transition hover:opacity-90"
          >
            {(firstName || "S").charAt(0).toUpperCase()}
          </Link>
        ) : (
          <RailButton icon={UserRound} label="Login" onClick={onLogin} />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full w-[260px] flex-col">
      <div className="flex h-14 flex-shrink-0 items-center justify-between pl-4 pr-2">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d0d0d]">
            <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden />
          </span>
          <span className="text-[15px] font-semibold text-[#0d0d0d]">eCampus AI</span>
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Close sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5d5d5d] transition-colors hover:bg-black/[0.05] hover:text-[#0d0d0d]"
        >
          {variant === "drawer" ? <X className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <div className="flex-shrink-0 space-y-0.5 px-2">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-[#0d0d0d] transition-colors hover:bg-black/[0.04]"
        >
          <SquarePen className="h-[18px] w-[18px]" /> New chat
        </button>
        <label className="flex w-full cursor-text items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors focus-within:bg-black/[0.04] hover:bg-black/[0.04]">
          <Search className="h-[18px] w-[18px] flex-shrink-0 text-[#0d0d0d]" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            aria-label="Search chats"
            className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-sm text-[#0d0d0d] shadow-none outline-none placeholder:text-[#0d0d0d] focus:border-0 focus:bg-transparent focus:shadow-none focus:placeholder:text-[#8f8f8f]"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-[#8f8f8f] hover:text-[#0d0d0d]">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </label>
      </div>

      <nav aria-label="Chat history" className="mt-3 min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {groups.length === 0 ? (
          <div className="mx-2 mt-6 flex flex-col items-center rounded-xl border border-dashed border-black/10 px-4 py-6 text-center">
            <MessageSquare className="h-5 w-5 text-[#8f8f8f]" />
            <p className="mt-2 text-[13px] font-medium text-[#0d0d0d]">{query ? "No matching chats" : "No chats yet"}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#8f8f8f]">
              {query ? `Nothing found for “${query}”.` : "Your conversations will show up here."}
            </p>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="px-2.5 pb-1 text-xs font-semibold text-[#8f8f8f]">{group.label}</p>
              <div className="space-y-px">
                {group.items.map((t) => (
                  <ThreadRow
                    key={t.id}
                    thread={t}
                    active={t.id === activeId}
                    busy={t.id === busyThreadId}
                    touch={variant === "drawer"}
                    onSelect={() => onSelect(t.id)}
                    onRename={(title) => onRename(t.id, title)}
                    onDelete={() => onDelete(t)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </nav>

      <div className="flex-shrink-0 border-t border-black/[0.06] p-2.5">
        {student ? (
          <Link href="/dashboard" className="flex items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-black/[0.04]">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-sm font-bold text-white">
              {(firstName || "S").charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-[#0d0d0d]">{student.name || "Student"}</span>
              <span className="block text-xs text-[#8f8f8f]">View dashboard</span>
            </span>
          </Link>
        ) : (
          <div className="rounded-2xl border border-black/[0.06] bg-white p-3.5">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0d0d0d]">
              <Gift className="h-4 w-4 text-[#ee2c3c]" /> Login to Win Scholarship
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5d5d5d]">
              Save your university picks, track your applications, and make smarter decisions.
            </p>
            <button
              type="button"
              onClick={onLogin}
              className="mt-3 w-full rounded-full bg-[#0d0d0d] py-2 text-[13px] font-semibold text-white transition hover:bg-black/80"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
