import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      coursesInterested,
      course,
      state,
      referralCode,
      whatsappOptIn,
      advisorProfile,
      source = "eCampus AI Web Signup Modal",
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    if (!phone?.trim() && !email?.trim()) {
      return NextResponse.json(
        { success: false, message: "Phone or email is required" },
        { status: 400 }
      );
    }

    const courses = Array.isArray(coursesInterested)
      ? coursesInterested
      : course
      ? [course]
      : [];

    const now = new Date();

    const userData: Record<string, any> = {
      name: name.trim(),
      email: email?.trim() || "",
      phone: phone?.trim() || "",
      coursesInterested: courses,
      state: state || "",
      referralCode: referralCode?.trim() || "",
      whatsappOptIn: Boolean(whatsappOptIn),
      source,
      updatedAt: now,
    };

    if (advisorProfile) {
      userData.advisorProfile = advisorProfile;
    }

    // Save directly to MongoDB collection 'web_users'
    const db = await getDb();
    const collection = db.collection("web_users");

    const filter = phone?.trim()
      ? { phone: phone.trim() }
      : { email: email.trim() };

    const result = await collection.updateOne(
      filter,
      {
        $set: userData,
        $setOnInsert: {
          createdAt: now,
          otpVerified: true,
        },
      },
      { upsert: true }
    );

    // Optionally also sync to ecampus-backend if running
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_ECAMPUS_BACKEND_API_URL ||
        "http://localhost:4000";
      fetch(`${backendUrl}/api/web-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => {});
    } catch {}

    return NextResponse.json({
      success: true,
      message: "User registered and details saved to web_users collection successfully",
      user: {
        ...userData,
        upsertedId: result.upsertedId,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error: any) {
    console.error("Error saving user details to web_users:", error);

    // If direct DB connection fails, fallback to backend API
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_ECAMPUS_BACKEND_API_URL ||
        "http://localhost:4000";
      const fallbackRes = await fetch(`${backendUrl}/api/web-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(await req.json().catch(() => ({}))),
      });
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return NextResponse.json(data);
      }
    } catch {}

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to save user details to database",
      },
      { status: 500 }
    );
  }
}
