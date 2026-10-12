"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ApplicantDetails, ApplicationProgram, ApplicationState, PaymentRecord } from "./types";

// The application is saved per university in this browser, so a refresh (or coming
// back later) resumes where the student left off.
const storageKey = (slug: string) => `ecampus_application_${slug}`;

const EMPTY_STATE: ApplicationState = { applicationId: null, details: null, payment: null };

type StudentSnapshot = {
  name?: string;
  email?: string;
  phone?: string;
  state?: string;
  advisorProfile?: { highestQualification?: string };
};

interface ApplicationContextValue {
  program: ApplicationProgram;
  state: ApplicationState;
  /** False until the saved draft has been read — guards wait for it */
  hydrated: boolean;
  /** Signed-in student (if any), used for the greeting and to pre-fill the form */
  student: StudentSnapshot | null;
  saveDetails: (details: ApplicantDetails) => void;
  savePayment: (payment: PaymentRecord) => void;
  /** Base path of this flow, e.g. /universities/<slug>/apply */
  basePath: string;
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function newApplicationId() {
  return `EC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

export function ApplicationProvider({
  program,
  children,
}: {
  program: ApplicationProgram;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ApplicationState>(EMPTY_STATE);
  const [student, setStudent] = useState<StudentSnapshot | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = readJSON<ApplicationState>(storageKey(program.slug));
    if (saved?.payment) {
      // A finished application saved by an earlier version — start fresh instead
      try {
        localStorage.removeItem(storageKey(program.slug));
      } catch {}
      setState(EMPTY_STATE);
    } else {
      setState({ ...EMPTY_STATE, ...saved });
    }
    setStudent(readJSON<StudentSnapshot>("ecampus_student"));
    setHydrated(true);
  }, [program.slug]);

  const persist = useCallback(
    (next: ApplicationState) => {
      setState(next);
      try {
        localStorage.setItem(storageKey(program.slug), JSON.stringify(next));
      } catch {
        // Storage unavailable — the flow still works for this visit.
      }
    },
    [program.slug],
  );

  const saveDetails = useCallback(
    (details: ApplicantDetails) =>
      persist({ ...state, details, applicationId: state.applicationId ?? newApplicationId() }),
    [persist, state],
  );

  // Frontend-only for now: the success screen shows right after paying, but the finished
  // application isn't kept — a refresh starts a fresh application from the landing screen.
  const savePayment = useCallback(
    (payment: PaymentRecord) => {
      setState({ ...state, payment });
      try {
        localStorage.removeItem(storageKey(program.slug));
      } catch {
        // Nothing saved to clear.
      }
    },
    [state, program.slug],
  );

  const value = useMemo(
    () => ({
      program,
      state,
      hydrated,
      student,
      saveDetails,
      savePayment,
      basePath: `/universities/${program.slug}/apply`,
    }),
    [program, state, hydrated, student, saveDetails, savePayment],
  );

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplication must be used inside ApplicationProvider");
  return ctx;
}
