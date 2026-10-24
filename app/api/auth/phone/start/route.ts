// app/api/auth/phone/start/route.ts
import { NextRequest, NextResponse } from "next/server";
import { normalizePhone } from "@/lib/auth/phone";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";
import { ensureAuthIndexes } from "@/lib/auth/db";

export async function POST(req: NextRequest) {
  try {
    await ensureAuthIndexes();

    const body = await req.json().catch(() => ({}));
    const { phone, defaultCountry } = body;

    const normalized = normalizePhone(phone, defaultCountry || "IN");
    if (!normalized.isValid) {
      return jsonError("INVALID_PHONE", normalized.error || "Invalid phone number.", 400);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
      target: normalized.e164,
      channel: "SMS",
      purpose: "phone_signup",
      ip,
      userAgent,
    });

    await logAuthEvent("PHONE_SIGNUP_START", {
      req,
      metadata: { phone_e164: normalized.e164 },
    });

    return NextResponse.json({
      success: true,
      challenge_id: challengeId,
      resend_cooldown: resendCooldown,
      phone_e164: normalized.e164,
      message: "Verification code sent via SMS.",
    });
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /auth/phone/start:", err);
    return jsonError("INTERNAL_ERROR", "Failed to initiate phone verification.", 500);
  }
}
