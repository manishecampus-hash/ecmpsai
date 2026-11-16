import type { ReactNode } from "react";
import AgentShell from "./components/agent/agent-shell";

// Every dashboard page sits inside the agent shell, so the eCampus Agent chat can open beside the dashboard
// (work mode) and stay open while the student — or the agent — moves between pages.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AgentShell>{children}</AgentShell>;
}
