// app/api/auth/resend-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { otpStore } from "@/lib/otp-store";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!otpStore[phone]) {
      return NextResponse.json(
        { success: false, message: "Please signup first" },
        { status: 400 },
      );
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    otpStore[phone].otp = newOtp.toString();
    otpStore[phone].createdAt = Date.now();

    await client.messages.create({
      body: `Your new OTP is: ${newOtp}. Valid for 5 minutes.`,
      from: TWILIO_PHONE,
      to: phone,
    });

    return NextResponse.json({ success: true, message: "New OTP sent" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error: " + error.message },
      { status: 500 },
    );
  }
}
