// app/api/auth/verify-otp/route.ts
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
    const { phone, email, otp, challenge_id } = body;

    if (!otp || typeof otp !== "string" || otp.trim().length !== 6) {
      return jsonError("INVALID_OTP", "6-digit OTP code is required.", 400);
    }

    const isEmail = Boolean(email) && !phone;
    let target = "";
    let purpose: "email_verify" | "phone_signup" = "phone_signup";

    if (isEmail) {
      target = email.trim().toLowerCase();
      purpose = "email_verify";
    } else {
      const normalized = normalizePhone(phone);
      if (!normalized.isValid) {
        return jsonError("INVALID_PHONE", normalized.error || "Valid phone required.", 400);
      }
      target = normalized.e164;
      purpose = "phone_signup";
    }

    const verification = await verifyOtpChallenge({
      challengeId: challenge_id,
      target,
      purpose,
      code: otp.trim(),
    });

    if (!verification.valid) {
      return jsonError("OTP_INVALID", verification.error || "Incorrect OTP code.", 400);
    }

    const users = await getUsersCollection();
    const now = new Date();

    let user: UserRecord | null = null;
    if (isEmail) {
      user = await users.findOne({ email: target });
      if (!user) {
        // Created in PENDING_PHONE_VERIFICATION state
        const newUser: UserRecord = {
          id: randomUUID(),
          phone_e164: null,
          phone_verified_at: null,
          email: target,
          email_verified_at: now,
          password_hash: null,
          full_name: "",
          status: "PENDING_PHONE_VERIFICATION",
          failed_login_attempts: 0,
          locked_until: null,
          last_login_at: now,
          created_at: now,
          updated_at: now,
        };
        await users.insertOne(newUser);
        user = newUser;
      } else {
        await users.updateOne(
          { id: user.id },
          { $set: { email_verified_at: now, updated_at: now } }
        );
        user.email_verified_at = now;
      }
    } else {
      // Phone verification -> ACTIVE
      user = await users.findOne({ phone_e164: target });
      if (!user) {
        const newUser: UserRecord = {
          id: randomUUID(),
          phone_e164: target,
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
        user = newUser;
      } else {
        await users.updateOne(
          { id: user.id },
          {
            $set: {
              phone_verified_at: now,
              status: "ACTIVE",
              last_login_at: now,
              updated_at: now,
            },
          }
        );
        user.status = "ACTIVE";
        user.phone_verified_at = now;
      }
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { refreshToken } = await createSession({
      userId: user.id,
      ip,
    });

    const accessToken = await createAccessToken(user);

    await logAuthEvent(isEmail ? "EMAIL_VERIFIED" : "PHONE_SIGNUP_SUCCESS", {
      userId: user.id,
      req,
      metadata: { target },
    });

    const res = NextResponse.json({
      success: true,
      status: user.status,
      phone_required: user.status === "PENDING_PHONE_VERIFICATION",
      message: "OTP verified successfully!",
      user: {
        id: user.id,
        phone: user.phone_e164,
        email: user.email,
        status: user.status,
      },
    });

    setAuthCookies(res, { accessToken, refreshToken });
    return res;
  } catch (err: any) {
    console.error("Error in /api/auth/verify-otp:", err);
    return jsonError("INTERNAL_ERROR", "OTP verification failed.", 500);
  }
}
