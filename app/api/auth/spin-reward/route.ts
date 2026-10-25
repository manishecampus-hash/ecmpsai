import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/guards";
import { getDb } from "@/lib/mongodb";

function getPhoneVariants(phone?: string | null): string[] {
  if (!phone) return [];
  const cleaned = phone.replace(/[^\d+]/g, "").trim();
  const digits = cleaned.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  const variants = new Set<string>();
  if (cleaned) variants.add(cleaned);
  if (digits) variants.add(digits);
  if (last10) {
    variants.add(last10);
    variants.add(`+91${last10}`);
    variants.add(`91${last10}`);
  }
  return Array.from(variants);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reward, skipped, phone, email, userId } = body;

    const auth = await getAuthContext(req);
    const targetUserId = auth?.user?.id || userId;
    const targetPhone = auth?.user?.phone_e164 || phone;
    const targetEmail = auth?.user?.email || email;

    if (!targetUserId && !targetPhone && !targetEmail) {
      return NextResponse.json(
        { success: false, message: "User identifier required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date();
    const isoNow = now.toISOString();

    const userFilters: any[] = [];
    if (targetUserId) userFilters.push({ id: targetUserId });
    if (targetPhone) {
      const variants = getPhoneVariants(targetPhone);
      variants.forEach((p) => {
        userFilters.push({ phone_e164: p });
        userFilters.push({ phone: p });
      });
    }
    if (targetEmail) userFilters.push({ email: targetEmail.toLowerCase().trim() });

    const webUserFilters: any[] = [];
    if (targetPhone) {
      const variants = getPhoneVariants(targetPhone);
      variants.forEach((p) => webUserFilters.push({ phone: p }));
    }
    if (targetEmail) webUserFilters.push({ email: targetEmail.toLowerCase().trim() });

    const userUpdate: Record<string, any> = {
      updated_at: now,
    };
    const webUserUpdate: Record<string, any> = {
      updatedAt: isoNow,
    };

    if (skipped) {
      userUpdate.spinSkipped = true;
      webUserUpdate.spinSkipped = true;
    } else if (reward) {
      userUpdate.spinReward = reward;
      userUpdate.spinSkipped = false;
      webUserUpdate.spinReward = reward;
      webUserUpdate.spinSkipped = false;
    }

    // 1. Update users collection
    if (userFilters.length > 0) {
      await db.collection("users").updateMany(
        { $or: userFilters },
        { $set: userUpdate }
      );
    }

    // 2. Update web_users collection
    if (webUserFilters.length > 0) {
      await db.collection("web_users").updateMany(
        { $or: webUserFilters },
        { $set: webUserUpdate }
      );
    }

    return NextResponse.json({
      success: true,
      spinReward: reward || null,
      spinSkipped: Boolean(skipped),
    });
  } catch (error: any) {
    console.error("Error in /api/auth/spin-reward:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to persist spin data" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const searchParams = req.nextUrl.searchParams;
    const phone = searchParams.get("phone") || auth?.user?.phone_e164;
    const email = searchParams.get("email") || auth?.user?.email;
    const userId = searchParams.get("userId") || auth?.user?.id;

    if (!userId && !phone && !email) {
      return NextResponse.json({
        success: false,
        spinReward: null,
        spinSkipped: false,
      });
    }

    const db = await getDb();
    let spinReward: any = null;
    let spinSkipped = false;

    // Check users collection
    const userFilters: any[] = [];
    if (userId) userFilters.push({ id: userId });
    if (phone) {
      const variants = getPhoneVariants(phone);
      variants.forEach((p) => {
        userFilters.push({ phone_e164: p });
        userFilters.push({ phone: p });
      });
    }
    if (email) userFilters.push({ email: email.toLowerCase().trim() });

    if (userFilters.length > 0) {
      const user = await db.collection("users").findOne({ $or: userFilters });
      if (user) {
        if (user.spinReward) spinReward = user.spinReward;
        if (user.spinSkipped) spinSkipped = true;
      }
    }

    // Check web_users collection
    if (!spinReward && (phone || email)) {
      const webFilters: any[] = [];
      if (phone) {
        const variants = getPhoneVariants(phone);
        variants.forEach((p) => webFilters.push({ phone: p }));
      }
      if (email) webFilters.push({ email: email.toLowerCase().trim() });
      if (webFilters.length > 0) {
        const webUser = await db.collection("web_users").findOne({ $or: webFilters });
        if (webUser) {
          if (webUser.spinReward) spinReward = webUser.spinReward;
          if (webUser.spinSkipped) spinSkipped = true;
        }
      }
    }

    return NextResponse.json({
      success: true,
      spinReward,
      spinSkipped,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      spinReward: null,
      spinSkipped: false,
    });
  }
}
