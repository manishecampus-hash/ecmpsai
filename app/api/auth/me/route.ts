// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/guards";
import { getSessionsCollection } from "@/lib/auth/db";

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

    const fullName = user.full_name || "";
    const courses =
      user.coursesInterested ||
      user.course_interested ||
      (user.course ? [user.course] : []);
    const course = user.course || courses[0] || "";
    const state = user.state || "";
    const advisorProfile = user.advisorProfile || null;
    const spinReward = user.spinReward || null;
    const spinSkipped = Boolean(user.spinSkipped);

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
