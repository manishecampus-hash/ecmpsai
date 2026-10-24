// app/api/auth/email/verify/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, jsonError } from "@/lib/auth/guards";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const body = await req.json().catch(() => ({}));
    const email = body.email ? body.email.trim().toLowerCase() : auth?.user.email;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return jsonError("INVALID_EMAIL", "Valid email address required.", 400);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
      target: email,
      channel: "EMAIL",
      purpose: "email_verify",
      userId: auth?.user.id || null,
      name: auth?.user.full_name,
      ip,
    });

    await logAuthEvent("EMAIL_VERIFY_SENT", {
      userId: auth?.user.id,
      req,
      metadata: { email },
    });

    return NextResponse.json({
      success: true,
      challenge_id: challengeId,
      resend_cooldown: resendCooldown,
      message: "Verification code sent to email.",
    });
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /auth/email/verify/send:", err);
    return jsonError("INTERNAL_ERROR", "Failed to send email verification.", 500);
  }
}
