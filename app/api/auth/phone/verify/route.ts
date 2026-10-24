// app/api/auth/phone/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { normalizePhone } from "@/lib/auth/phone";
import { verifyOtpChallenge } from "@/lib/auth/otp";
import { getUsersCollection } from "@/lib/auth/db";
import { createAccessToken, createSession, setAuthCookies } from "@/lib/auth/tokens";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";
import { UserRecord } from "@/lib/auth/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { challenge_id, phone, code } = body;

    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      return jsonError("INVALID_CODE", "A 6-digit OTP code is required.", 400);
    }

    let targetPhone: string | undefined;
    if (phone) {
      const normalized = normalizePhone(phone);
      if (normalized.isValid) {
        targetPhone = normalized.e164;
      }
    }

    const verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target: targetPhone,
      purpose: "phone_signup",
      code: code.trim(),
    });

    if (!verification.valid || !verification.challenge) {
      return jsonError("OTP_INVALID", verification.error || "Invalid verification code.", 400);
    }

    const verifiedPhoneE164 = verification.challenge.target;
    const users = await getUsersCollection();
    const now = new Date();

    // Check if account with verified phone already exists
    const existingUser = await users.findOne({ phone_e164: verifiedPhoneE164 });
    let userRecord: UserRecord;

    if (!existingUser) {
      // Create new ACTIVE account
      const newUser: UserRecord = {
        id: randomUUID(),
        phone_e164: verifiedPhoneE164,
        phone_verified_at: now,
        email: null,
        email_verified_at: null,
        password_hash: null,
        full_name: "",
        status: "ACTIVE",
        failed_login_attempts: 0,
        locked_until: null,
        last_login_at: now,
        created_at: now,
        updated_at: now,
      };

      await users.insertOne(newUser);
      userRecord = newUser;
    } else {
      // Update existing account
      await users.updateOne(
        { id: existingUser.id },
        {
          $set: {
            phone_verified_at: now,
            status: "ACTIVE",
            last_login_at: now,
            updated_at: now,
          },
        }
      );
      userRecord = {
        ...existingUser,
        status: "ACTIVE",
        phone_verified_at: now,
        last_login_at: now,
      };
    }

    // Create session and access token
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { refreshToken } = await createSession({
      userId: userRecord.id,
      ip,
      deviceInfo: {
        browser: req.headers.get("sec-ch-ua") || undefined,
        ip,
      },
    });

    const accessToken = await createAccessToken(userRecord);

    await logAuthEvent("PHONE_SIGNUP_SUCCESS", {
      userId: userRecord.id,
      req,
      metadata: { phone_e164: verifiedPhoneE164 },
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: userRecord.id,
        phone_e164: userRecord.phone_e164,
        email: userRecord.email,
        full_name: userRecord.full_name,
        status: userRecord.status,
      },
      message: "Phone verified successfully. Session established.",
    });

    setAuthCookies(res, { accessToken, refreshToken });
    return res;
  } catch (err: any) {
    console.error("Error in /auth/phone/verify:", err);
    return jsonError("INTERNAL_ERROR", "Verification failed.", 500);
  }
}
