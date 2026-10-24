// app/api/auth/phone/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requirePendingOrActiveUser, jsonError } from "@/lib/auth/guards";
import { normalizePhone } from "@/lib/auth/phone";
import { createAndSendOtpChallenge, verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection } from "@/lib/auth/db";
import { createAccessToken, setAuthCookies } from "@/lib/auth/tokens";
import { logAuthEvent } from "@/lib/auth/audit";
import { UserRecord } from "@/lib/auth/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { phone, code, challenge_id, email } = body;

    let user: UserRecord | null = null;
    const { auth } = await requirePendingOrActiveUser(req);
    if (auth) {
      user = auth.user;
    } else if (email) {
      const users = await getUsersCollection();
      user = await users.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return jsonError("UNAUTHORIZED", "Authentication session or verified email required.", 401);
    }

    const normalized = normalizePhone(phone);
    if (!normalized.isValid) {
      return jsonError("INVALID_PHONE", normalized.error || "Valid mobile number required.", 400);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    // STEP 1: Send OTP to new phone if code not yet provided
    if (!code) {
      const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
        target: normalized.e164,
        channel: "SMS",
        purpose: "phone_add",
        userId: user.id,
        ip,
      });

      return NextResponse.json({
        success: true,
        challenge_id: challengeId,
        resend_cooldown: resendCooldown,
        phone_e164: normalized.e164,
        message: "Verification code sent to your phone.",
      });
    }

    // STEP 2: Verify OTP
    const verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target: normalized.e164,
      purpose: "phone_add",
      code: code.trim(),
    });

    if (!verification.valid || !verification.challenge) {
      return jsonError("OTP_INVALID", verification.error || "Invalid verification code.", 400);
    }

    const users = await getUsersCollection();
    const now = new Date();

    // Check for Phone Collision with another account
    const existingConflict = await users.findOne({
      phone_e164: normalized.e164,
      id: { $ne: user.id },
    });

    if (existingConflict) {
      return jsonError(
        "PHONE_ALREADY_REGISTERED",
        "This phone number is already linked to another eCampus account. Please log in using this number.",
        409
      );
    }

    // Promote User to ACTIVE!
    await users.updateOne(
      { id: user.id },
      {
        $set: {
          phone_e164: normalized.e164,
          phone_verified_at: now,
          status: "ACTIVE",
          updated_at: now,
        },
      }
    );

    const updatedUser = {
      ...user,
      phone_e164: normalized.e164,
      phone_verified_at: now,
      status: "ACTIVE" as const,
    };

    // Issue upgraded full access token
    const upgradedAccessToken = await createAccessToken(updatedUser);

    await logAuthEvent("PHONE_ADDED_VERIFIED", {
      userId: user.id,
      req,
      metadata: { phone_e164: normalized.e164 },
    });

    // Also update web_users if matching record exists
    let webUser: any = null;
    try {
      const db = await (await import("@/lib/mongodb")).getDb();
      const webUsers = db.collection("web_users");
      if (user.email) {
        await webUsers.updateOne(
          { email: user.email },
          { $set: { phone: normalized.e164, phoneVerified: true, updatedAt: now } }
        );
        webUser = await webUsers.findOne({ email: user.email });
      }
    } catch {}

    const mergedName = updatedUser.full_name?.trim() || webUser?.name?.trim() || "";
    const mergedState = updatedUser.state || webUser?.state || "";
    const mergedCourses =
      updatedUser.coursesInterested ||
      webUser?.coursesInterested ||
      updatedUser.course_interested ||
      (webUser?.course ? [webUser.course] : []);
    const mergedCourse = updatedUser.course || webUser?.course || mergedCourses[0] || "";
    const mergedAdvisorProfile =
      updatedUser.advisorProfile || webUser?.advisorProfile || null;

    const hasProfileDetails = Boolean(
      mergedName.trim() &&
      mergedState.trim() &&
      (mergedCourse.trim() || mergedCourses.length > 0)
    );
    const hasAdvisorProfile = Boolean(
      mergedAdvisorProfile &&
        (mergedAdvisorProfile.highestQualification ||
          mergedAdvisorProfile.coursePreference ||
          mergedAdvisorProfile.goal ||
          mergedAdvisorProfile.budget)
    );

    const studentData = {
      id: updatedUser.id,
      name: mergedName,
      email: updatedUser.email || webUser?.email || "",
      phone: normalized.e164,
      state: mergedState,
      course: mergedCourse,
      coursesInterested: mergedCourses,
      advisorProfile: mergedAdvisorProfile || undefined,
      status: "ACTIVE",
    };

    const res = NextResponse.json({
      success: true,
      status: "ACTIVE",
      phone_required: false,
      hasProfileDetails,
      hasAdvisorProfile,
      message: "Phone verified successfully. Your account is now active!",
      user: {
        id: updatedUser.id,
        phone_e164: updatedUser.phone_e164,
        email: updatedUser.email,
        full_name: mergedName,
        status: updatedUser.status,
      },
      student: studentData,
    });

    setAuthCookies(res, { accessToken: upgradedAccessToken });
    return res;
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /auth/phone/add:", err);
    return jsonError("INTERNAL_ERROR", "Failed to add phone number.", 500);
  }
}
