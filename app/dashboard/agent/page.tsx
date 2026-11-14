"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgent } from "../components/agent/agent-shell";

// Old link to the agent: opens it beside the dashboard (work mode) and shows the Overview next to it
export default function AgentPage() {
  const agent = useAgent();
  const router = useRouter();

  useEffect(() => {
    agent?.setOpen(true);
    router.replace("/dashboard");
    // Runs once on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
