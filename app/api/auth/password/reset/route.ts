// app/api/auth/password/reset/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/auth/db";
import { verifyOtpChallenge } from "@/lib/auth/otp";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { revokeAllUserSessions } from "@/lib/auth/tokens";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, code, new_password, challenge_id } = body;

    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !code || !new_password) {
      return jsonError("INVALID_REQUEST", "Email, code, and new password are required.", 400);
    }

    const passCheck = validatePasswordStrength(new_password);
    if (!passCheck.isValid) {
      return jsonError("WEAK_PASSWORD", passCheck.error || "Password too weak.", 400);
    }

    // Verify OTP challenge
    const verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target: normalizedEmail,
      purpose: "password_reset",
      code: code.trim(),
    });

    if (!verification.valid) {
      return jsonError("OTP_INVALID", verification.error || "Invalid reset code.", 400);
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: normalizedEmail });
    if (!user) {
      return jsonError("USER_NOT_FOUND", "Account not found.", 404);
    }

    const passwordHash = await hashPassword(new_password);
    const now = new Date();

    // Update password and reset locks
    await users.updateOne(
      { id: user.id },
      {
        $set: {
          password_hash: passwordHash,
          failed_login_attempts: 0,
          locked_until: null,
          updated_at: now,
        },
      }
    );

    // Invalidate all existing sessions across devices
    await revokeAllUserSessions(user.id);

    await logAuthEvent("PASSWORD_RESET_COMPLETED", {
      userId: user.id,
      req,
      metadata: { email: normalizedEmail },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. Please log in with your new password.",
    });
  } catch (err: any) {
    console.error("Error in /auth/password/reset:", err);
    return jsonError("INTERNAL_ERROR", "Password reset failed.", 500);
  }
}
