// app/api/auth/password/forgot/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/auth/db";
import { createAndSendOtpChallenge } from "@/lib/auth/otp";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    const normalizedEmail = email?.trim().toLowerCase();
    if (normalizedEmail) {
      const users = await getUsersCollection();
      const user = await users.findOne({ email: normalizedEmail });

      // Anti-enumeration: only send if user exists and email is verified
      if (user && user.email_verified_at) {
        const ip =
          req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          req.headers.get("x-real-ip") ||
          undefined;

        await createAndSendOtpChallenge({
          target: normalizedEmail,
          channel: "EMAIL",
          purpose: "password_reset",
          userId: user.id,
          name: user.full_name,
          ip,
        }).catch((err) => console.error("Forgot password dispatch error:", err));

        await logAuthEvent("PASSWORD_RESET_REQUESTED", {
          userId: user.id,
          req,
          metadata: { email: normalizedEmail },
        });
      }
    }

    // Always return generic success message to prevent user enumeration
    return NextResponse.json({
      success: true,
      message:
        "If this email is associated with a verified account, a password reset code has been sent.",
    });
  } catch (err: any) {
    console.error("Error in /auth/password/forgot:", err);
    return NextResponse.json({
      success: true,
      message:
        "If this email is associated with a verified account, a password reset code has been sent.",
    });
  }
}
