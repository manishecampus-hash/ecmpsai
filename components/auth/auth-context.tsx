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
      const res = await fetch("/api/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
        setStatus(data.user.status);

        // Sync local storage for client components
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "ecampus_student",
            JSON.stringify({
              id: data.user.id,
              name: data.user.full_name,
              email: data.user.email,
              phone: data.user.phone_e164,
              status: data.user.status,
            })
          );
        }
      } else {
        setUser(null);
        setStatus("UNAUTHENTICATED");
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
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setStatus("UNAUTHENTICATED");
      if (typeof window !== "undefined") {
        localStorage.removeItem("ecampus_student");
        window.dispatchEvent(new Event("ecampus-auth-change"));
      }
      router.push("/");
    }
  };

  const logoutAll = async () => {
    try {
      await fetch("/api/auth/logout-all", { method: "POST" });
    } finally {
      setUser(null);
      setStatus("UNAUTHENTICATED");
      if (typeof window !== "undefined") {
        localStorage.removeItem("ecampus_student");
        window.dispatchEvent(new Event("ecampus-auth-change"));
      }
      router.push("/");
    }
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
