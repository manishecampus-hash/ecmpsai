// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: "Phone and OTP are required" },
        { status: 400 },
      );
    }

    const storedData = otpStore[phone];

    if (!storedData) {
      return NextResponse.json(
        { success: false, message: "Send OTP first" },
        { status: 400 },
      );
    }

    if (Date.now() - storedData.createdAt > storedData.expiresIn) {
      delete otpStore[phone];
      return NextResponse.json(
        { success: false, message: "OTP expired, please try again" },
        { status: 400 },
      );
    }

    if (storedData.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Incorrect OTP entered" },
        { status: 400 },
      );
    }

    const userData = {
      phone,
      email: storedData.email,
      name: storedData.name,
      verified: true,
      createdAt: new Date(),
    };

    // TODO: save to database
    console.log("User registered:", userData);

    delete otpStore[phone];

    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
      user: userData,
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { success: false, message: "Verification error: " + error.message },
      { status: 500 },
    );
  }
}
