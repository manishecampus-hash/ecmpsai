// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { otpStore } from "@/lib/otp-store";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

export async function POST(req: NextRequest) {
  try {
    const { phone, email, name } = await req.json();

    if (!phone || !email) {
      return NextResponse.json(
        { success: false, message: "Phone and Email are required" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[phone] = {
      otp: otp.toString(),
      email,
      name,
      createdAt: Date.now(),
      expiresIn: 5 * 60 * 1000,
    };

    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. Valid for 5 minutes.`,
      from: TWILIO_PHONE,
      to: phone, // Format: +91XXXXXXXXXX
    });

    console.log(`OTP sent to ${phone}: ${message.sid}`);

    return NextResponse.json({
      success: true,
      message: "OTP sent to your phone",
      phone,
      expiresIn: 300,
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, message: "Error sending OTP: " + error.message },
      { status: 500 },
    );
  }
}
