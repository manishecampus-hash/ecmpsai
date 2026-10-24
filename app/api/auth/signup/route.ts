// app/api/auth/signup/route.ts
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
    const { mode, phone, email, name } = body;
    const isEmailMode = mode === "email" || (!phone && Boolean(email));

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    if (isEmailMode) {
      const normalizedEmail = email?.trim().toLowerCase();
      if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
        return jsonError("INVALID_EMAIL", "A valid email address is required.", 400);
      }

      const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
        target: normalizedEmail,
        channel: "EMAIL",
        purpose: "email_verify",
        name: name?.trim(),
        ip,
        userAgent,
      });

      return NextResponse.json({
        success: true,
        challenge_id: challengeId,
        resend_cooldown: resendCooldown,
        email: normalizedEmail,
        message: "OTP sent to your email",
      });
    }

    // Phone Mode
    const normalized = normalizePhone(phone);
    if (!normalized.isValid) {
      return jsonError("INVALID_PHONE", normalized.error || "Valid mobile number is required.", 400);
    }

    const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
      target: normalized.e164,
      channel: "SMS",
      purpose: "phone_signup",
      name: name?.trim(),
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
      phone: normalized.e164,
      message: "OTP sent to your phone",
    });
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /api/auth/signup:", err);
    return jsonError("INTERNAL_ERROR", "Failed to initiate verification.", 500);
  }
}
