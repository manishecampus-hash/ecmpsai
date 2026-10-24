// lib/auth/audit.ts
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";
import { getAuthEventsCollection } from "./db";
import { AuthEventRecord } from "./types";

export async function logAuthEvent(
  eventType: AuthEventRecord["event_type"],
  options: {
    userId?: string | null;
    req?: NextRequest;
    metadata?: Record<string, any>;
  } = {}
): Promise<void> {
  try {
    const events = await getAuthEventsCollection();

    let ip: string | undefined;
    let userAgent: string | undefined;

    if (options.req) {
      ip =
        options.req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        options.req.headers.get("x-real-ip") ||
        undefined;
      userAgent = options.req.headers.get("user-agent") || undefined;
    }

    // Clean metadata to guarantee no passwords, raw OTPs, or auth tokens are logged
    const cleanMeta = options.metadata ? { ...options.metadata } : {};
    delete cleanMeta.password;
    delete cleanMeta.otp;
    delete cleanMeta.code;
    delete cleanMeta.token;
    delete cleanMeta.refreshToken;

    const eventRecord: AuthEventRecord = {
      id: randomUUID(),
      user_id: options.userId || null,
      event_type: eventType,
      ip_address: ip,
      user_agent: userAgent,
      metadata: cleanMeta,
      created_at: new Date(),
    };

    await events.insertOne(eventRecord);
  } catch (err) {
    // Non-blocking error handling for audit logging
    console.error("Warning: Failed to log auth event:", err);
  }
}
