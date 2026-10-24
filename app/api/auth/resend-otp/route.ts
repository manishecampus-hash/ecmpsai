// app/api/auth/resend-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { otpStore } from "@/lib/otp-store";
import { sendZeptoOtpEmail } from "@/lib/zeptomail";

export async function POST(req: NextRequest) {
  try {
    const { phone, email } = await req.json();

    const normalizedEmail = email ? email.trim().toLowerCase() : "";
    const normalizedPhone = phone ? phone.trim() : "";
    const identifier = normalizedEmail || normalizedPhone;

    if (!identifier) {
      return NextResponse.json(
        { success: false, message: "Phone or email is required" },
        { status: 400 },
      );
    }

    if (!otpStore[identifier]) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your details to sign up first",
        },
        { status: 400 },
      );
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[identifier].otp = newOtp;
    otpStore[identifier].createdAt = Date.now();

    // ── Email Resend: Dispatch via ZeptoMail ──────────────────
    if (normalizedEmail) {
      await sendZeptoOtpEmail({
        email: normalizedEmail,
        otp: newOtp,
        name: otpStore[identifier].name,
      });

      return NextResponse.json({
        success: true,
        message: "New verification code sent to your email",
      });
    }

    // ── Mobile Resend: Dispatch via Twilio SMS ────────────────
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE;

    if (
      accountSid &&
      authToken &&
      twilioPhone &&
      !accountSid.includes("your_twilio")
    ) {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `Your new OTP is: ${newOtp}. Valid for 5 minutes.`,
        from: twilioPhone,
        to: normalizedPhone,
      });
    } else {
      console.warn("⚠️ Twilio not configured. Mobile OTP resend logged:", {
        phone: normalizedPhone,
        otp: newOtp,
      });
    }

    return NextResponse.json({
      success: true,
      message: "New OTP sent to your phone",
    });
  } catch (error: any) {
    console.error("Error resending OTP:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error resending OTP: " + (error?.message || "Internal error"),
      },
      { status: 500 },
    );
  }
}
