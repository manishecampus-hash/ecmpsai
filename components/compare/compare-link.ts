"use client";

import { useEffect, useState } from "react";

// Every comparison on /compare opens in the dashboard's My Chat, which runs ?q= automatically.
// Signed-out students go through login first and land in My Chat afterwards (login honours returnUrl).

export function compareQuestion(a: string, b: string, course?: string) {
  return course ? `Compare ${course} at ${a} vs ${b}` : `Compare ${a} vs ${b}`;
}

const chatPath = (question: string) => `/dashboard/mychat?q=${encodeURIComponent(question)}`;
const loginPath = (returnUrl: string) => `/login?returnUrl=${encodeURIComponent(returnUrl)}`;

function isSignedIn() {
  try {
    const student = JSON.parse(localStorage.getItem("ecampus_student") ?? "null");
    return Boolean(student && (student.id || student.phone || student.email) && student.status === "ACTIVE");
  } catch {
    return false;
  }
}

export function compareHref(a: string, b: string, course?: string, signedIn = isSignedIn()) {
  const path = chatPath(compareQuestion(a, b, course));
  return signedIn ? path : loginPath(path);
}

// For links rendered on the server: starts with the login URL and switches once we know the student is signed in
export function useCompareHref() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const sync = () => setSignedIn(isSignedIn());
    sync();
    window.addEventListener("ecampus-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ecampus-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (a: string, b: string, course?: string) => compareHref(a, b, course, signedIn);
}

// The picker dialog is mounted once on the page; any button can open it with this event
export const OPEN_COMPARE_PICKER = "open-compare-picker";
export const openComparePicker = () => window.dispatchEvent(new Event(OPEN_COMPARE_PICKER));
