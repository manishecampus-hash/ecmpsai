"use client";

import { useEffect } from "react";

interface BlogViewCounterProps {
  blogId: string;
}

export function BlogViewCounter({ blogId }: BlogViewCounterProps) {
  useEffect(() => {
    if (!blogId) return;

    const incrementView = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
      try {
        await fetch(`${apiUrl}/blogs/${blogId}/view`, {
          method: "POST",
        });
      } catch (err) {
        console.error("Error updating view count:", err);
      }
    };

    // Increment view count on mount
    incrementView();
  }, [blogId]);

  return null;
}
