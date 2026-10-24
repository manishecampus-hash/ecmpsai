// app/api/auth/email/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getUsersCollection, ensureAuthIndexes } from "@/lib/auth/db";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { createAccessToken, createSession, setAuthCookies } from "@/lib/auth/tokens";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";
import { UserRecord } from "@/lib/auth/types";

export async function POST(req: NextRequest) {
  try {
    await ensureAuthIndexes();

    const body = await req.json().catch(() => ({}));
    const { email, password, full_name } = body;

    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return jsonError("INVALID_EMAIL", "A valid email address is required.", 400);
    }

    const passCheck = validatePasswordStrength(password);
    if (!passCheck.isValid) {
      return jsonError("WEAK_PASSWORD", passCheck.error || "Password does not meet requirements.", 400);
    }

    const users = await getUsersCollection();
    const existing = await users.findOne({ email: normalizedEmail });

    if (existing) {
      // Anti-enumeration: if email exists, return identical response or redirect hint
      return jsonError(
        "EMAIL_IN_USE",
        "An account with this email already exists. Please log in.",
        409
      );
    }

    const now = new Date();
    const passwordHash = await hashPassword(password);

    // CORE RULE: Account is created in PENDING_PHONE_VERIFICATION
    const newUser: UserRecord = {
      id: randomUUID(),
      phone_e164: null,
      phone_verified_at: null,
      email: normalizedEmail,
      email_verified_at: null,
      password_hash: passwordHash,
      full_name: full_name?.trim() || "",
      status: "PENDING_PHONE_VERIFICATION",
      failed_login_attempts: 0,
      locked_until: null,
      last_login_at: now,
      created_at: now,
      updated_at: now,
    };

    await users.insertOne(newUser);

    // Issue restricted token for phone verification
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { refreshToken } = await createSession({
      userId: newUser.id,
      ip,
    });

    const accessToken = await createAccessToken(newUser);

    // In parallel, send email verification OTP
    createAndSendOtpChallenge({
      target: normalizedEmail,
      channel: "EMAIL",
      purpose: "email_verify",
      userId: newUser.id,
      name: newUser.full_name,
      ip,
    }).catch((err) => console.error("Email verify dispatch error:", err));

    await logAuthEvent("EMAIL_SIGNUP_PENDING", {
      userId: newUser.id,
      req,
      metadata: { email: normalizedEmail },
    });

    const res = NextResponse.json({
      success: true,
      status: "PENDING_PHONE_VERIFICATION",
      message: "Account created. You must verify a mobile phone number to activate your account.",
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        status: newUser.status,
      },
    });

    setAuthCookies(res, { accessToken, refreshToken });
    return res;
  } catch (err: any) {
    console.error("Error in /auth/email/signup:", err);
    return jsonError("INTERNAL_ERROR", "Failed to register account.", 500);
  }
}
