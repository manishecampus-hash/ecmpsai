// app/api/auth/phone/change/start/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireActiveUser, jsonError } from "@/lib/auth/guards";
import { normalizePhone } from "@/lib/auth/phone";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { verifyPassword } from "@/lib/auth/password";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await requireActiveUser(req);
    if (errorResponse) return errorResponse;
    const { user } = auth!;

    const body = await req.json().catch(() => ({}));
    const { new_phone, current_password } = body;

    const normalizedNew = normalizePhone(new_phone);
    if (!normalizedNew.isValid) {
      return jsonError("INVALID_PHONE", normalizedNew.error || "Valid new mobile number required.", 400);
    }

    if (user.phone_e164 === normalizedNew.e164) {
      return jsonError("SAME_PHONE", "New phone number cannot be identical to current phone number.", 400);
    }

    // Step A: Re-authenticate user via password if account has password
    if (user.password_hash) {
      if (!current_password) {
        return jsonError("PASSWORD_REQUIRED", "Current account password is required to change phone number.", 400);
      }
      const match = await verifyPassword(current_password, user.password_hash);
      if (!match) {
        return jsonError("INVALID_PASSWORD", "Incorrect password.", 401);
      }
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    // Step B: Send OTP to old phone (if available) as 2FA factor
    let oldPhoneChallengeId: string | undefined;
    if (user.phone_e164) {
      const oldRes = await createAndSendOtpChallenge({
        target: user.phone_e164,
        channel: "SMS",
        purpose: "phone_change_old",
        userId: user.id,
        ip,
      });
      oldPhoneChallengeId = oldRes.challengeId;
    }

    // Step C: Send OTP to new phone
    const newRes = await createAndSendOtpChallenge({
      target: normalizedNew.e164,
      channel: "SMS",
      purpose: "phone_change_new",
      userId: user.id,
      ip,
    });

    await logAuthEvent("PHONE_CHANGE_INITIATED", {
      userId: user.id,
      req,
      metadata: { new_phone_e164: normalizedNew.e164 },
    });

    return NextResponse.json({
      success: true,
      requires_old_otp: Boolean(user.phone_e164),
      old_challenge_id: oldPhoneChallengeId,
      new_challenge_id: newRes.challengeId,
      message: "Verification codes dispatched to initiate phone update.",
    });
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /auth/phone/change/start:", err);
    return jsonError("INTERNAL_ERROR", "Failed to initiate phone change.", 500);
  }
}
