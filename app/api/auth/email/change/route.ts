// app/api/auth/email/change/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, jsonError } from "@/lib/auth/guards";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth || !auth.user) {
      return jsonError("UNAUTHORIZED", "Please log in to change your email address.", 401);
    }

    const body = await req.json().catch(() => ({}));
    const rawEmail = body.email || body.new_email || "";
    const cleanEmail = rawEmail.trim().toLowerCase();

    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return jsonError("INVALID_EMAIL", "A valid email address is required.", 400);
    }

    if (auth.user.email === cleanEmail && auth.user.email_verified_at) {
      return jsonError(
        "ALREADY_VERIFIED",
        "This email address is already verified on your account.",
        400
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
      target: cleanEmail,
      channel: "EMAIL",
      purpose: "email_change",
      userId: auth.user.id,
      name: auth.user.full_name,
      ip,
    });

    await logAuthEvent("EMAIL_CHANGE_INITIATED", {
      userId: auth.user.id,
      req,
      metadata: { targetEmail: cleanEmail },
    });

    return NextResponse.json({
      success: true,
      challenge_id: challengeId,
      resend_cooldown: resendCooldown,
      email: cleanEmail,
      message: `Verification code sent to ${cleanEmail}`,
    });
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /api/auth/email/change:", err);
    return jsonError("INTERNAL_ERROR", "Failed to send email verification code.", 500);
  }
}
