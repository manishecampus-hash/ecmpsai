"use client";

import { useEffect } from "react";

interface EventViewCounterProps {
  eventId: string;
}

export function EventViewCounter({ eventId }: EventViewCounterProps) {
  useEffect(() => {
    if (!eventId) return;

    const incrementView = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
      try {
        await fetch(`${apiUrl}/events/${eventId}/view`, {
          method: "POST",
        });
      } catch (err) {
        console.error("Error updating event view count:", err);
      }
    };

    incrementView();
  }, [eventId]);

  return null;
}
