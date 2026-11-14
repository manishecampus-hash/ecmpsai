"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgent } from "../components/agent/agent-shell";

// My Chat now lives in the eCampus Agent (Chat mode). Links that still point here — compare cards (?q=),
// "Open in My Chat" from the degree finder (?t=), the About page — open the agent's chat full screen instead.
export default function MyChatPage() {
  const agent = useAgent();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    agent?.openChat({ q: params.get("q")?.trim() || undefined, t: params.get("t") || undefined });
    router.replace("/dashboard");
    // Runs once on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
