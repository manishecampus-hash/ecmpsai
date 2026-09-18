"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

// Dashboard has its own sidebar/topbar shell — skip the marketing navbar there.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
    </>
  );
}
