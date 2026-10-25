// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { normalizePhone } from "@/lib/auth/phone";
import { createAndSendOtpChallenge, verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection } from "@/lib/auth/db";
import { verifyPassword } from "@/lib/auth/password";
import { createAccessToken, createSession, setAuthCookies } from "@/lib/auth/tokens";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";
import { UserRecord } from "@/lib/auth/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action = "send-otp", identifier, phone, email, password, otp, challenge_id } = body;

    const rawId = (identifier || phone || email || "").toString().trim();
    const isEmail = rawId.includes("@") || (!rawId && Boolean(email));

    const users = await getUsersCollection();
    const now = new Date();

    // ─────────────────────────────────────────────────────────────
    // ACTION: CHECK IF USER EXISTS
    // ─────────────────────────────────────────────────────────────
    if (action === "check") {
      let targetPhone: string | null = null;
      let targetEmail: string | null = null;

      if (isEmail) {
        targetEmail = rawId.toLowerCase();
      } else {
        const norm = normalizePhone(rawId);
        if (norm.isValid) targetPhone = norm.e164;
      }

      const existingInUsers = await users.findOne(
        targetEmail ? { email: targetEmail } : { phone_e164: targetPhone }
      );

      const exists = Boolean(existingInUsers);
      return NextResponse.json({ success: true, exists });
    }

    // ─────────────────────────────────────────────────────────────
    // ACTION: SEND OTP (LOGIN)
    // ─────────────────────────────────────────────────────────────
    if (action === "send-otp") {
      let target = "";
      let channel: "SMS" | "EMAIL" = "SMS";

      if (isEmail) {
        target = rawId.toLowerCase();
        channel = "EMAIL";
        if (!/^\S+@\S+\.\S+$/.test(target)) {
          return jsonError("INVALID_EMAIL", "A valid email address is required.", 400);
        }
      } else {
        const norm = normalizePhone(rawId);
        if (!norm.isValid) {
          return jsonError("INVALID_PHONE", norm.error || "Valid mobile number is required.", 400);
        }
        target = norm.e164;
        channel = "SMS";
      }

      // Check if user account exists in users collection (single source of truth)
      const userInUsers = await users.findOne(isEmail ? { email: target } : { phone_e164: target });

      if (!userInUsers) {
        return NextResponse.json(
          {
            success: false,
            not_found: true,
            code: "ACCOUNT_NOT_FOUND",
            message: `You haven't signed up with this ${isEmail ? "email" : "mobile number"} yet. Please sign up first.`,
          },
          { status: 404 }
        );
      }

      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        undefined;
      const userAgent = req.headers.get("user-agent") || undefined;

      const userName = userInUsers?.full_name || undefined;

      const { challengeId, resendCooldown } = await createAndSendOtpChallenge({
        target,
        channel,
        purpose: isEmail ? "email_verify" : "phone_login",
        name: userName,
        ip,
        userAgent,
      });

      return NextResponse.json({
        success: true,
        challenge_id: challengeId,
        resend_cooldown: resendCooldown,
        target,
        message: `OTP sent to your ${channel === "SMS" ? "mobile" : "email"}.`,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // ACTION: PASSWORD LOGIN
    // ─────────────────────────────────────────────────────────────
    if (action === "password") {
      const normalizedEmail = (email || rawId || "").toString().trim().toLowerCase();
      if (!normalizedEmail || !password) {
        return jsonError("INVALID_CREDENTIALS", "Email and password are required.", 400);
      }

      const user = await users.findOne({ email: normalizedEmail });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            not_found: true,
            code: "ACCOUNT_NOT_FOUND",
            message: "You haven't signed up with this email yet. Please sign up first.",
          },
          { status: 404 }
        );
      }

      if (!user.password_hash) {
        await verifyPassword(password, "$2a$12$e80MvQ0a3j82hZ1V6iVzK.R1Oqf0hC1k3Ue3vV9y3d7k5X1w2q3e4");
        return jsonError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
      }

      const passwordMatch = await verifyPassword(password, user.password_hash);
      if (!passwordMatch) {
        return jsonError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
      }

      const mergedName = user.full_name?.trim() || "";
      const mergedCourses =
        user.coursesInterested ||
        user.course_interested ||
        (user.course ? [user.course] : []);
      const mergedCourse = user.course || mergedCourses[0] || "";
      const mergedState = user.state || "";
      const mergedAdvisorProfile = user.advisorProfile || null;
      const mergedSpinReward = user.spinReward || null;
      const mergedSpinSkipped = Boolean(user.spinSkipped);

      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        undefined;

      const isPhoneVerified = Boolean(user.phone_e164 && user.phone_verified_at);
      const requiresPhoneVerification =
        !isPhoneVerified || user.status === "PENDING_PHONE_VERIFICATION";

      const targetStatus = requiresPhoneVerification ? "PENDING_PHONE_VERIFICATION" : "ACTIVE";
      if (user.status !== targetStatus) {
        await users.updateOne({ id: user.id }, { $set: { status: targetStatus, updated_at: now } });
        user.status = targetStatus;
      }

      const { refreshToken } = await createSession({
        userId: user.id,
        ip,
      });

      const accessToken = await createAccessToken(user);

      await logAuthEvent("EMAIL_LOGIN_SUCCESS", {
        userId: user.id,
        req,
      });

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
        id: user.id,
        name: mergedName,
        email: user.email || normalizedEmail,
        phone: user.phone_e164 || "",
        state: mergedState,
        course: mergedCourse,
        coursesInterested: mergedCourses,
        advisorProfile: mergedAdvisorProfile || undefined,
        spinReward: mergedSpinReward || undefined,
        spinSkipped: mergedSpinSkipped || undefined,
        status: user.status,
      };

      const res = NextResponse.json({
        success: true,
        isExistingUser: true,
        phone_required: requiresPhoneVerification,
        hasProfileDetails,
        hasAdvisorProfile,
        student: studentData,
        message: requiresPhoneVerification
          ? "Please verify your mobile number to complete login."
          : "Logged in successfully.",
      });

      setAuthCookies(res, { accessToken, refreshToken });
      return res;
    }

    // ─────────────────────────────────────────────────────────────
    // ACTION: VERIFY OTP (LOGIN)
    // ─────────────────────────────────────────────────────────────
    if (action === "verify-otp" || otp) {
      const code = (otp || "").toString().trim();
      if (!code || code.length !== 6) {
        return jsonError("INVALID_OTP", "6-digit OTP code is required.", 400);
      }

      let target = "";
      if (isEmail) {
        target = rawId.toLowerCase();
      } else {
        const norm = normalizePhone(rawId);
        if (!norm.isValid) {
          return jsonError("INVALID_PHONE", norm.error || "Valid mobile number required.", 400);
        }
        target = norm.e164;
      }

      const verification = await verifyOtpChallenge({
        challengeId: challenge_id,
        target,
        code,
      });

      if (!verification.valid) {
        return jsonError("OTP_INVALID", verification.error || "Invalid verification code.", 400);
      }

      // Find user in users collection (single source of truth)
      const user = await users.findOne(isEmail ? { email: target } : { phone_e164: target });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            not_found: true,
            code: "ACCOUNT_NOT_FOUND",
            message: `You haven't signed up with this ${isEmail ? "email" : "mobile number"} yet. Please sign up first.`,
          },
          { status: 404 }
        );
      }

      const isTargetPhoneVerified = Boolean(
        (!isEmail) || (user.phone_e164 && user.phone_verified_at)
      );
      const targetStatus = isTargetPhoneVerified ? "ACTIVE" : "PENDING_PHONE_VERIFICATION";

      await users.updateOne(
        { id: user.id },
        {
          $set: {
            ...(isEmail
              ? { email_verified_at: now }
              : { phone_e164: target, phone_verified_at: now }),
            status: targetStatus,
            last_login_at: now,
            updated_at: now,
          },
        }
      );

      const activeUser: UserRecord = {
        ...user,
        phone_e164: isEmail ? user.phone_e164 : target,
        phone_verified_at: isEmail ? user.phone_verified_at : now,
        status: targetStatus,
        last_login_at: now,
      };

      const mergedName = activeUser.full_name?.trim() || "";
      const mergedEmail = activeUser.email || "";
      const mergedPhone = activeUser.phone_e164 || "";
      const mergedState = activeUser.state || "";
      const mergedCourses =
        activeUser.coursesInterested ||
        activeUser.course_interested ||
        (activeUser.course ? [activeUser.course] : []);
      const mergedCourse = activeUser.course || mergedCourses[0] || "";
      const mergedAdvisorProfile = activeUser.advisorProfile || null;
      const mergedSpinReward = activeUser.spinReward || null;
      const mergedSpinSkipped = Boolean(activeUser.spinSkipped);

      // Ensure updated fields are saved in users collection
      if (mergedName || mergedAdvisorProfile || mergedState) {
        await users.updateOne(
          { id: activeUser.id },
          {
            $set: {
              full_name: mergedName,
              state: mergedState,
              course: mergedCourse,
              coursesInterested: mergedCourses,
              ...(mergedAdvisorProfile ? { advisorProfile: mergedAdvisorProfile } : {}),
              ...(mergedSpinReward ? { spinReward: mergedSpinReward } : {}),
              ...(mergedSpinSkipped ? { spinSkipped: true } : {}),
              updated_at: now,
            },
          }
        );
      }

      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        undefined;

      const { refreshToken } = await createSession({
        userId: activeUser.id,
        ip,
      });

      const accessToken = await createAccessToken(activeUser);

      await logAuthEvent(isEmail ? "EMAIL_LOGIN_SUCCESS" : "PHONE_LOGIN_SUCCESS", {
        userId: activeUser.id,
        req,
        metadata: { target },
      });

      const isPhoneVerified = Boolean(
        activeUser.phone_e164 && activeUser.phone_verified_at
      );
      const requiresPhoneVerification =
        isEmail && (!isPhoneVerified || activeUser.status === "PENDING_PHONE_VERIFICATION");

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
        id: activeUser.id,
        name: mergedName,
        email: mergedEmail,
        phone: mergedPhone,
        state: mergedState,
        course: mergedCourse,
        coursesInterested: mergedCourses,
        advisorProfile: mergedAdvisorProfile || undefined,
        spinReward: mergedSpinReward || undefined,
        spinSkipped: mergedSpinSkipped || undefined,
        status: activeUser.status,
      };

      const res = NextResponse.json({
        success: true,
        isExistingUser: true,
        phone_required: requiresPhoneVerification,
        hasProfileDetails,
        hasAdvisorProfile,
        student: studentData,
        message: requiresPhoneVerification
          ? "Please verify your mobile number to complete login."
          : "Logged in successfully.",
      });

      setAuthCookies(res, { accessToken, refreshToken });
      return res;
    }

    return jsonError("BAD_REQUEST", "Invalid login action specified.", 400);
  } catch (err: any) {
    if (err.code === "RATE_LIMITED") {
      return jsonError("RATE_LIMITED", err.message, 429, null, err.retryAfter);
    }
    console.error("Error in /api/auth/login:", err);
    return jsonError("INTERNAL_ERROR", "Login process encountered an error.", 500);
  }
}
