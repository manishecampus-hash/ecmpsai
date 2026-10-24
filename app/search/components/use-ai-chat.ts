"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadThreads,
  parseFollowups,
  saveThreads,
  titleFrom,
  toApiHistory,
  uid,
  type ChatMessage,
  type ChatThread,
} from "./chat-store";

export type HistoryMode = "push" | "replace" | "none";
type ApiHistory = ReturnType<typeof toApiHistory>;

// The chat engine behind /search, the dashboard's My Chat and the AI panel on the degree finder:
// saved threads, the open thread, and answers streamed from /api/chat.
// `onNavigate` lets a page mirror the open thread in its URL (`?t=<id>`); leave it out to keep the URL as is.
export function useAiChat(onNavigate?: (id: string | null, history: Exclude<HistoryMode, "none">) => void) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const threadsRef = useRef<ChatThread[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [streaming, setStreaming] = useState<{ threadId: string; messageId: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Whether the conversation view should keep following the newest message
  const pinnedRef = useRef(true);

  const navigateRef = useRef(onNavigate);
  navigateRef.current = onNavigate;

  // ── State helpers: every change goes through here so the ref is always current ──
  const updateThreads = useCallback((fn: (prev: ChatThread[]) => ChatThread[], persist = false) => {
    const next = fn(threadsRef.current);
    threadsRef.current = next;
    setThreads(next);
    if (persist) saveThreads(next);
  }, []);

  const patchMessage = useCallback(
    (threadId: string, messageId: string, patch: Partial<ChatMessage>, persist = false) =>
      updateThreads(
        (ts) =>
          ts.map((t) =>
            t.id !== threadId ? t : { ...t, messages: t.messages.map((m) => (m.id === messageId ? { ...m, ...patch } : m)) },
          ),
        persist,
      ),
    [updateThreads],
  );

  const showThread = useCallback((id: string | null, history: HistoryMode = "push") => {
    activeIdRef.current = id;
    setActiveId(id);
    pinnedRef.current = true;
    if (history !== "none") navigateRef.current?.(id, history);
  }, []);

  // ── Streaming one answer; earlier turns go along so follow-ups keep their context ──
  const streamAnswer = useCallback(
    async (threadId: string, messageId: string, question: string, history: ApiHistory) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setStreaming({ threadId, messageId });

      let full = "";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: question, messages: [...history, { role: "user", content: question }] }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) throw new Error("API error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          patchMessage(threadId, messageId, { content: full });
        }
        patchMessage(threadId, messageId, { content: full, status: "done", followups: parseFollowups(full) }, true);
      } catch (e: any) {
        patchMessage(threadId, messageId, { content: full, status: e?.name === "AbortError" ? "stopped" : "error" }, true);
      } finally {
        if (abortRef.current === ctrl) {
          abortRef.current = null;
          setStreaming(null);
        }
      }
    },
    [patchMessage],
  );

  const ask = useCallback(
    (text: string, threadId: string | null, history: "push" | "replace" = "push") => {
      const question = text.trim();
      if (!question) return;
      const now = Date.now();
      const existing = threadId ? threadsRef.current.find((t) => t.id === threadId) : undefined;
      const reply: ChatMessage = { id: uid(), role: "assistant", content: "", status: "streaming" };
      const messages: ChatMessage[] = [...(existing?.messages ?? []), { id: uid(), role: "user", content: question }, reply];
      const thread: ChatThread = existing
        ? { ...existing, messages, updatedAt: now }
        : { id: uid(), title: titleFrom(question), messages, createdAt: now, updatedAt: now };

      updateThreads((ts) => [thread, ...ts.filter((t) => t.id !== thread.id)], true);
      if (existing) pinnedRef.current = true;
      else showThread(thread.id, history);
      streamAnswer(thread.id, reply.id, question, toApiHistory(existing?.messages ?? []));
    },
    [updateThreads, showThread, streamAnswer],
  );

  const regenerate = useCallback(
    (threadId: string) => {
      const thread = threadsRef.current.find((t) => t.id === threadId);
      const msgs = thread?.messages ?? [];
      const question = msgs[msgs.length - 2];
      if (msgs[msgs.length - 1]?.role !== "assistant" || question?.role !== "user") return;
      const reply: ChatMessage = { id: uid(), role: "assistant", content: "", status: "streaming" };
      updateThreads(
        (ts) => ts.map((t) => (t.id === threadId ? { ...t, messages: [...msgs.slice(0, -1), reply], updatedAt: Date.now() } : t)),
        true,
      );
      pinnedRef.current = true;
      streamAnswer(threadId, reply.id, question.content, toApiHistory(msgs.slice(0, -2)));
    },
    [updateThreads, streamAnswer],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const removeThread = useCallback(
    (thread: ChatThread) => {
      if (streaming?.threadId === thread.id) abortRef.current?.abort();
      updateThreads((ts) => ts.filter((t) => t.id !== thread.id), true);
      if (thread.id === activeIdRef.current) showThread(null, "replace");
    },
    [streaming, updateThreads, showThread],
  );

  // ── Load saved chats; stop any answer still streaming when the page goes away ──
  useEffect(() => {
    const saved = loadThreads();
    threadsRef.current = saved;
    setThreads(saved);
    setHydrated(true);
    return () => abortRef.current?.abort();
  }, []);

  return {
    threads,
    threadsRef,
    hydrated,
    activeId,
    activeIdRef,
    streaming,
    pinnedRef,
    updateThreads,
    patchMessage,
    showThread,
    ask,
    regenerate,
    stop,
    removeThread,
  };
}
