"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserRecord, UserStatus } from "@/lib/auth/types";

interface AuthContextType {
  user: UserRecord | null;
  status: UserStatus | "UNAUTHENTICATED";
  isAuthenticated: boolean;
  isPhoneVerified: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "UNAUTHENTICATED",
  isAuthenticated: false,
  isPhoneVerified: false,
  isLoading: true,
  refreshUser: async () => {},
  logout: async () => {},
  logoutAll: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [status, setStatus] = useState<UserStatus | "UNAUTHENTICATED">("UNAUTHENTICATED");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      let res = await fetch("/api/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });
      let data = await res.json();

      // If access token is unauthenticated, attempt silent refresh with refresh token
      if (!data?.authenticated) {
        try {
          const refreshRes = await fetch("/api/auth/token/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (refreshRes.ok) {
            const retryRes = await fetch("/api/auth/me", {
              headers: { "Cache-Control": "no-cache" },
            });
            data = await retryRes.json();
          }
        } catch {
          // ignore refresh error
        }
      }

      if (data && data.authenticated && data.user) {
        setUser(data.user);
        setStatus(data.user.status);

        // Sync local storage for client components without blowing away existing answers
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("ecampus_student");
          let existing: Record<string, any> = {};
          try {
            existing = raw ? JSON.parse(raw) : {};
          } catch {}

          const merged = {
            ...existing,
            id: data.user.id,
            name: data.user.full_name || existing.name,
            email: data.user.email || existing.email,
            phone: data.user.phone_e164 || existing.phone,
            state: data.user.state || existing.state,
            course: data.user.course || existing.course,
            coursesInterested: data.user.coursesInterested || existing.coursesInterested,
            advisorProfile: data.user.advisorProfile || existing.advisorProfile,
            spinReward: data.user.spinReward || existing.spinReward,
            spinSkipped: typeof data.user.spinSkipped === "boolean" ? data.user.spinSkipped : existing.spinSkipped,
            status: data.user.status,
          };
          localStorage.setItem("ecampus_student", JSON.stringify(merged));
        }
      } else {
        setUser(null);
        setStatus("UNAUTHENTICATED");
        if (typeof window !== "undefined") {
          localStorage.removeItem("ecampus_student");
        }
      }
    } catch {
      setUser(null);
      setStatus("UNAUTHENTICATED");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    const handleAuthChange = () => {
      refreshUser();
    };

    window.addEventListener("ecampus-auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("ecampus-auth-change", handleAuthChange);
    };
  }, [refreshUser]);

  const logout = async () => {
    await performLogout("/");
  };

  const logoutAll = async () => {
    await performLogoutAll("/login");
  };

  const isPhoneVerified = Boolean(
    user && user.phone_e164 && user.phone_verified_at && user.status === "ACTIVE"
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: Boolean(user),
        isPhoneVerified,
        isLoading,
        refreshUser,
        logout,
        logoutAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Universal logout helper:
 * 1. Calls /api/auth/logout to revoke server session & purge httpOnly cookies.
 * 2. Clears client-side localStorage ("ecampus_student").
 * 3. Dispatches "ecampus-auth-change" event so active tabs / components react.
 * 4. Navigates cleanly via window.location.href to flush Next.js client router cache.
 */
export async function performLogout(redirectTo: string = "/") {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("Logout request failed:", err);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ecampus_student");
      window.dispatchEvent(new Event("ecampus-auth-change"));
      window.location.href = redirectTo;
    }
  }
}

/**
 * Universal logout-all helper:
 * Revokes all sessions across all devices and clears cookies and local storage.
 */
export async function performLogoutAll(redirectTo: string = "/login") {
  try {
    await fetch("/api/auth/logout-all", {
      method: "POST",
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("Logout all request failed:", err);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ecampus_student");
      window.dispatchEvent(new Event("ecampus-auth-change"));
      window.location.href = redirectTo;
    }
  }
}
