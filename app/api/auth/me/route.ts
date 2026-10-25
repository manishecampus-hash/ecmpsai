// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/guards";
import { getSessionsCollection, getUsersCollection } from "@/lib/auth/db";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);

    if (!auth) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    const { user, tokenPayload } = auth;
    const canAccessApp =
      user.status === "ACTIVE" && Boolean(user.phone_e164 && user.phone_verified_at);

    // Fetch active session count
    const sessions = await getSessionsCollection();
    const activeSessionCount = await sessions.countDocuments({
      user_id: user.id,
      is_revoked: false,
      expires_at: { $gt: new Date() },
    });

    // Merge from web_users if fields are missing in users record
    let webUser: any = null;
    if (!user.advisorProfile || !user.full_name || !user.spinReward) {
      try {
        const db = await getDb();
        const webUsers = db.collection("web_users");
        const orClauses: any[] = [];
        if (user.phone_e164) {
          const cleaned = user.phone_e164.replace(/[^\d+]/g, "").trim();
          const digits = cleaned.replace(/\D/g, "");
          const last10 = digits.slice(-10);
          if (cleaned) orClauses.push({ phone: cleaned });
          if (digits) orClauses.push({ phone: digits });
          if (last10) {
            orClauses.push({ phone: last10 });
            orClauses.push({ phone: `+91${last10}` });
            orClauses.push({ phone: `91${last10}` });
          }
        }
        if (user.email) {
          orClauses.push({ email: user.email.toLowerCase().trim() });
        }
        if (orClauses.length > 0) {
          webUser = await webUsers.findOne({ $or: orClauses });
        }

        // If web_users has spinReward/spinSkipped and users does not, backfill users
        if (webUser && (webUser.spinReward || webUser.spinSkipped)) {
          const usersCol = await getUsersCollection();
          await usersCol.updateOne(
            { id: user.id },
            {
              $set: {
                ...(webUser.spinReward && !user.spinReward ? { spinReward: webUser.spinReward } : {}),
                ...(webUser.spinSkipped && !user.spinSkipped ? { spinSkipped: true } : {}),
                updated_at: new Date(),
              },
            }
          );
        }
      } catch {}
    }

    const fullName = user.full_name || webUser?.name || "";
    const courses =
      user.coursesInterested ||
      webUser?.coursesInterested ||
      user.course_interested ||
      (webUser?.course ? [webUser.course] : []);
    const course = user.course || webUser?.course || courses[0] || "";
    const state = user.state || webUser?.state || "";
    const advisorProfile = user.advisorProfile || webUser?.advisorProfile || null;
    const spinReward = user.spinReward || webUser?.spinReward || null;
    const spinSkipped = Boolean(user.spinSkipped || webUser?.spinSkipped);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        phone_e164: user.phone_e164,
        phone_verified_at: user.phone_verified_at,
        email: user.email,
        email_verified_at: user.email_verified_at,
        full_name: fullName,
        status: user.status,
        state,
        course,
        course_interested: courses,
        coursesInterested: courses,
        advisorProfile,
        spinReward,
        spinSkipped,
        created_at: user.created_at,
      },
      permissions: {
        can_access_app: canAccessApp,
        phone_verification_required: !canAccessApp,
        scope: tokenPayload.scope,
      },
      active_sessions_count: activeSessionCount,
    });
  } catch (err: any) {
    console.error("Error in /auth/me:", err);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
