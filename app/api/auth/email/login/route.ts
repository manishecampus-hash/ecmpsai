// app/api/auth/email/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/auth/db";
import { verifyPassword } from "@/lib/auth/password";
import { createAccessToken, createSession, setAuthCookies } from "@/lib/auth/tokens";
import { jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return jsonError("INVALID_CREDENTIALS", "Email and password are required.", 400);
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: normalizedEmail });

    // Anti-enumeration: compute fake compare time if user doesn't exist
    if (!user || !user.password_hash) {
      await verifyPassword(
        password,
        "$2a$12$e80MvQ0a3j82hZ1V6iVzK.R1Oqf0hC1k3Ue3vV9y3d7k5X1w2q3e4"
      );
      return jsonError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
    }

    const now = new Date();

    // Check Lockout Status
    if (user.locked_until && user.locked_until.getTime() > now.getTime()) {
      const remainingSeconds = Math.ceil(
        (user.locked_until.getTime() - now.getTime()) / 1000
      );
      return jsonError(
        "ACCOUNT_LOCKED",
        `Account temporarily locked due to failed attempts. Try again in ${Math.ceil(remainingSeconds / 60)} minutes.`,
        403,
        null,
        remainingSeconds
      );
    }

    // Verify Password
    const passwordMatch = await verifyPassword(password, user.password_hash);

    if (!passwordMatch) {
      const attempts = (user.failed_login_attempts || 0) + 1;
      const isNowLocked = attempts >= MAX_FAILED_ATTEMPTS;

      await users.updateOne(
        { id: user.id },
        {
          $inc: { failed_login_attempts: 1 },
          $set: {
            ...(isNowLocked
              ? {
                  status: "LOCKED",
                  locked_until: new Date(now.getTime() + LOCKOUT_DURATION_MS),
                }
              : {}),
            updated_at: now,
          },
        }
      );

      if (isNowLocked) {
        await logAuthEvent("ACCOUNT_LOCKED", {
          userId: user.id,
          req,
          metadata: { attempts },
        });
        return jsonError(
          "ACCOUNT_LOCKED",
          "Account locked due to 5 consecutive failed attempts. Try again in 15 minutes.",
          403,
          null,
          900
        );
      }

      return jsonError("INVALID_CREDENTIALS", "Invalid email or password.", 401);
    }

    // Reset failed attempts upon successful password
    await users.updateOne(
      { id: user.id },
      {
        $set: {
          failed_login_attempts: 0,
          locked_until: null,
          last_login_at: now,
          updated_at: now,
          ...(user.status === "LOCKED" ? { status: "ACTIVE" } : {}),
        },
      }
    );

    // Create session
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const { refreshToken } = await createSession({
      userId: user.id,
      ip,
    });

    const accessToken = await createAccessToken(user);

    await logAuthEvent("EMAIL_LOGIN_SUCCESS", {
      userId: user.id,
      req,
      metadata: { status: user.status },
    });

    // Check CORE RULE: Does user have verified phone?
    const isPhoneVerified = Boolean(user.phone_verified_at && user.phone_e164);
    const requiresPhoneVerification =
      !isPhoneVerified || user.status === "PENDING_PHONE_VERIFICATION";

    const res = NextResponse.json({
      success: true,
      status: user.status,
      phone_required: requiresPhoneVerification,
      message: requiresPhoneVerification
        ? "Please verify your mobile number to complete login."
        : "Login successful.",
      user: {
        id: user.id,
        phone_e164: user.phone_e164,
        email: user.email,
        full_name: user.full_name,
        status: user.status,
      },
    });

    setAuthCookies(res, { accessToken, refreshToken });
    return res;
  } catch (err: any) {
    console.error("Error in /auth/email/login:", err);
    return jsonError("INTERNAL_ERROR", "Login failed.", 500);
  }
}
