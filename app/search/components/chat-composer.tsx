"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";

const MAX_HEIGHT = 200;

export interface ChatComposerHandle {
  focus: () => void;
}

// Auto-growing message box: Enter sends, Shift+Enter adds a line, Stop while an answer streams
const ChatComposer = forwardRef<
  ChatComposerHandle,
  {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onStop: () => void;
    streaming: boolean;
    autoFocus?: boolean;
  }
>(function ChatComposer({ value, onChange, onSubmit, onStop, streaming, autoFocus }, ref) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => ({ focus: () => textareaRef.current?.focus() }), []);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !streaming;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSubmit();
      }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="flex items-end gap-2 rounded-[28px] border border-black/10 bg-white py-2 pl-5 pr-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-200 focus-within:border-black/20 focus-within:shadow-[0_6px_28px_rgba(0,0,0,0.1)]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (canSend) onSubmit();
            }
          }}
          placeholder="Ask anything"
          aria-label="Ask eCampus AI"
          className="max-h-[200px] min-h-[40px] flex-1 resize-none rounded-none border-0 bg-transparent px-0 py-2 text-[15px] leading-6 text-[#0d0d0d] shadow-none outline-none transition-none placeholder:text-[#8f8f8f] focus:border-0 focus:bg-transparent focus:shadow-none"
        />
        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] text-white transition hover:bg-black/80 active:scale-95"
          >
            <Square className="h-3.5 w-3.5" fill="currentColor" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send"
            className="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] text-white transition hover:bg-black/80 active:scale-95 disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:active:scale-100"
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </form>
  );
});

export default ChatComposer;
