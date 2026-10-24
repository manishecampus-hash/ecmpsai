// app/api/auth/phone/change/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireActiveUser, jsonError } from "@/lib/auth/guards";
import { normalizePhone } from "@/lib/auth/phone";
import { verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection } from "@/lib/auth/db";
import {
  revokeAllUserSessions,
  createSession,
  createAccessToken,
  setAuthCookies,
} from "@/lib/auth/tokens";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const { auth, errorResponse } = await requireActiveUser(req);
    if (errorResponse) return errorResponse;
    const { user } = auth!;

    const body = await req.json().catch(() => ({}));
    const { new_phone, new_code, old_code, old_challenge_id, new_challenge_id } = body;

    const normalizedNew = normalizePhone(new_phone);
    if (!normalizedNew.isValid) {
      return jsonError("INVALID_PHONE", normalizedNew.error || "Valid new phone required.", 400);
    }

    // 1. Verify Old Phone OTP if old phone was configured
    if (user.phone_e164 && old_code) {
      const oldVerify = await verifyOtpChallenge({
        challengeId: old_challenge_id,
        target: user.phone_e164,
        purpose: "phone_change_old",
        code: old_code.trim(),
      });
      if (!oldVerify.valid) {
        return jsonError("OLD_PHONE_OTP_INVALID", "Incorrect verification code for your current phone.", 400);
      }
    }

    // 2. Verify New Phone OTP
    const newVerify = await verifyOtpChallenge({
      challengeId: new_challenge_id,
      target: normalizedNew.e164,
      purpose: "phone_change_new",
      code: new_code.trim(),
    });

    if (!newVerify.valid) {
      return jsonError("NEW_PHONE_OTP_INVALID", "Incorrect verification code for your new phone.", 400);
    }

    const users = await getUsersCollection();
    const now = new Date();

    // Check collision
    const conflict = await users.findOne({
      phone_e164: normalizedNew.e164,
      id: { $ne: user.id },
    });

    if (conflict) {
      return jsonError(
        "PHONE_IN_USE",
        "The new phone number is already registered to another account.",
        409
      );
    }

    const previousPhone = user.phone_e164;

    // Swap Phone Number
    await users.updateOne(
      { id: user.id },
      {
        $set: {
          phone_e164: normalizedNew.e164,
          phone_verified_at: now,
          updated_at: now,
        },
      }
    );

    // Security precaution: Revoke all previous active sessions
    await revokeAllUserSessions(user.id);

    // Issue fresh session on current device
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { refreshToken } = await createSession({
      userId: user.id,
      ip,
    });

    const updatedUser = {
      ...user,
      phone_e164: normalizedNew.e164,
      phone_verified_at: now,
    };
    const accessToken = await createAccessToken(updatedUser);

    await logAuthEvent("PHONE_CHANGE_COMPLETED", {
      userId: user.id,
      req,
      metadata: {
        previous_phone: previousPhone,
        new_phone: normalizedNew.e164,
      },
    });

    const res = NextResponse.json({
      success: true,
      message: "Phone number updated successfully. Other device sessions revoked.",
      phone_e164: normalizedNew.e164,
    });

    setAuthCookies(res, { accessToken, refreshToken });
    return res;
  } catch (err: any) {
    console.error("Error in /auth/phone/change/verify:", err);
    return jsonError("INTERNAL_ERROR", "Failed to update phone number.", 500);
  }
}
