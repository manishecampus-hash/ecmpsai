import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection, getLeadsCollection, ensureAuthIndexes } from "@/lib/auth/db";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    await ensureAuthIndexes();

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
    const trimmedName = name.trim();
    const cleanEmail = email?.trim().toLowerCase() || "";
    const cleanPhone = phone?.trim() || "";

    // 1. UPDATE 'users' COLLECTION (Single Source of Truth for Auth & Accounts)
    const users = await getUsersCollection();
    const userUpdateDoc: Record<string, any> = {
      full_name: trimmedName,
      updated_at: now,
      state: state || "",
      coursesInterested: courses,
      course_interested: courses,
      course: course || courses[0] || "",
      referral_code: referralCode?.trim() || "",
      whatsapp_opt_in: Boolean(whatsappOptIn),
    };
    if (cleanEmail) userUpdateDoc.email = cleanEmail;
    if (advisorProfile) userUpdateDoc.advisorProfile = advisorProfile;

    const userFilter =
      cleanPhone && cleanEmail
        ? {
            $or: [
              { phone_e164: cleanPhone },
              { phone_e164: cleanPhone.replace(/[^\d+]/g, "") },
              { email: cleanEmail },
            ],
          }
        : cleanPhone
        ? {
            $or: [
              { phone_e164: cleanPhone },
              { phone_e164: cleanPhone.replace(/[^\d+]/g, "") },
            ],
          }
        : { email: cleanEmail };

    await users.updateOne(userFilter, { $set: userUpdateDoc });

    // 2. LOG / UPSERT INTO 'leads' COLLECTION (Single Source of Truth for Lead Generation)
    const leads = await getLeadsCollection();
    const leadFilter =
      cleanPhone && cleanEmail
        ? { $or: [{ phone: cleanPhone }, { email: cleanEmail }] }
        : cleanPhone
        ? { phone: cleanPhone }
        : { email: cleanEmail };

    const leadData = {
      name: trimmedName,
      email: cleanEmail,
      phone: cleanPhone,
      course: course || courses[0] || "",
      coursesInterested: courses,
      state: state || "",
      referralCode: referralCode?.trim() || "",
      whatsappOptIn: Boolean(whatsappOptIn),
      source,
      ...(advisorProfile ? { advisorProfile } : {}),
      updated_at: now,
    };

    const leadResult = await leads.updateOne(
      leadFilter,
      {
        $set: leadData,
        $setOnInsert: {
          id: randomUUID(),
          status: "new",
          created_at: now,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "User profile updated and lead captured successfully.",
      user: {
        ...leadData,
        leadId: leadResult.upsertedId,
      },
    });
  } catch (error: any) {
    console.error("Error in /api/auth/register-details:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to save registration details",
      },
      { status: 500 }
    );
  }
}
