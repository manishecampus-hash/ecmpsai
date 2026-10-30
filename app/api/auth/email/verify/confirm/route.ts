import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, jsonError } from "@/lib/auth/guards";
import { verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection } from "@/lib/auth/db";
import { logAuthEvent } from "@/lib/auth/audit";
import { resolveEmailVerificationConflict } from "@/lib/auth/email-conflict";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const body = await req.json().catch(() => ({}));
    const { code, email, challenge_id } = body;

    const targetEmail = email ? email.trim().toLowerCase() : auth?.user.email;
    if (!targetEmail || !code) {
      return jsonError("INVALID_REQUEST", "Email and 6-digit code are required.", 400);
    }

    const verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target: targetEmail,
      purpose: "email_verify",
      code: code.trim(),
    });

    if (!verification.valid) {
      return jsonError("OTP_INVALID", verification.error || "Invalid verification code.", 400);
    }

    const users = await getUsersCollection();
    const now = new Date();

    let userId = auth?.user.id || verification.challenge?.user_id;

    if (!userId) {
      // Find the user with this email
      const candidate = await users.findOne({ email: targetEmail });
      if (candidate) {
        userId = candidate.id;
      }
    }

    if (userId) {
      // Clean up conflicting documents with the same email
      await resolveEmailVerificationConflict(userId, targetEmail);

      await users.updateOne(
        { id: userId },
        {
          $set: {
            email: targetEmail,
            email_verified_at: now,
            updated_at: now,
          },
        }
      );
    } else {
      await users.updateOne(
        { email: targetEmail },
        {
          $set: {
            email_verified_at: now,
            updated_at: now,
          },
        }
      );
    }

    await logAuthEvent("EMAIL_VERIFIED", {
      userId,
      req,
      metadata: { email: targetEmail },
    });

    const updatedUser = userId ? await users.findOne({ id: userId }) : null;

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
      user: updatedUser
        ? {
            id: updatedUser.id,
            email: updatedUser.email,
            email_verified_at: updatedUser.email_verified_at,
            phone_e164: updatedUser.phone_e164,
            phone_verified_at: updatedUser.phone_verified_at,
            full_name: updatedUser.full_name,
            status: updatedUser.status,
          }
        : null,
    });
  } catch (err: any) {
    console.error("Error in /auth/email/verify/confirm:", err);
    return jsonError("INTERNAL_ERROR", "Verification failed.", 500);
  }
}
