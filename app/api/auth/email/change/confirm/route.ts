// app/api/auth/email/change/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext, jsonError } from "@/lib/auth/guards";
import { verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection, getLeadsCollection } from "@/lib/auth/db";
import { logAuthEvent } from "@/lib/auth/audit";
import { resolveEmailVerificationConflict } from "@/lib/auth/email-conflict";
import { createAccessToken, setAuthCookies } from "@/lib/auth/tokens";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth || !auth.user) {
      return jsonError("UNAUTHORIZED", "Please log in to verify and change your email address.", 401);
    }

    const body = await req.json().catch(() => ({}));
    const { email, code, challenge_id } = body;

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanCode = (code || "").trim();

    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return jsonError("INVALID_EMAIL", "A valid email address is required.", 400);
    }

    if (!cleanCode || cleanCode.length !== 6) {
      return jsonError("INVALID_CODE", "A 6-digit OTP code is required.", 400);
    }

    // Verify OTP challenge (check email_change first, then fallback to email_verify)
    let verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target: cleanEmail,
      purpose: "email_change",
      code: cleanCode,
    });

    if (!verification.valid) {
      verification = await verifyOtpChallenge({
        challengeId: challenge_id,
        target: cleanEmail,
        purpose: "email_verify",
        code: cleanCode,
      });
    }

    if (!verification.valid) {
      return jsonError(
        "OTP_INVALID",
        verification.error || "Invalid or expired verification code.",
        400
      );
    }

    const users = await getUsersCollection();
    const now = new Date();

    // 1. Resolve conflict: if this email exists in any other document, remove it or delete doc
    await resolveEmailVerificationConflict(auth.user.id, cleanEmail);

    // 2. Update current authenticated user
    await users.updateOne(
      { id: auth.user.id },
      {
        $set: {
          email: cleanEmail,
          email_verified_at: now,
          updated_at: now,
        },
      }
    );

    // 3. Keep leads collection in sync for this user
    if (auth.user.phone_e164) {
      const leads = await getLeadsCollection();
      await leads.updateMany(
        { phone: auth.user.phone_e164 },
        { $set: { email: cleanEmail, updated_at: now } }
      );
    }

    const updatedUser = await users.findOne({ id: auth.user.id });
    if (!updatedUser) {
      return jsonError("NOT_FOUND", "User account not found.", 404);
    }

    await logAuthEvent("EMAIL_VERIFIED", {
      userId: auth.user.id,
      req,
      metadata: { targetEmail: cleanEmail, changeFlow: true },
    });

    // Generate new access token reflecting the verified email
    const accessToken = await createAccessToken(updatedUser);

    const studentData = {
      id: updatedUser.id,
      name: updatedUser.full_name || "",
      email: updatedUser.email || "",
      email_verified_at: updatedUser.email_verified_at,
      phone: updatedUser.phone_e164 || "",
      phone_verified_at: updatedUser.phone_verified_at,
      state: updatedUser.state || "",
      course:
        updatedUser.course ||
        (updatedUser.coursesInterested && updatedUser.coursesInterested[0]) ||
        "",
      coursesInterested: updatedUser.coursesInterested || [],
      advisorProfile: updatedUser.advisorProfile || undefined,
      spinReward: updatedUser.spinReward || undefined,
      spinSkipped: updatedUser.spinSkipped || undefined,
      status: updatedUser.status,
    };

    const res = NextResponse.json({
      success: true,
      message: "Email updated and verified successfully!",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        email_verified_at: updatedUser.email_verified_at,
        phone_e164: updatedUser.phone_e164,
        phone_verified_at: updatedUser.phone_verified_at,
        full_name: updatedUser.full_name,
        status: updatedUser.status,
      },
      student: studentData,
    });

    setAuthCookies(res, { accessToken });
    return res;
  } catch (err: any) {
    console.error("Error in /api/auth/email/change/confirm:", err);
    return jsonError("INTERNAL_ERROR", "Failed to update email.", 500);
  }
}
