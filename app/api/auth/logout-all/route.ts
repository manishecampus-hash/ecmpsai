// app/api/auth/logout-all/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revokeAllUserSessions, clearAuthCookies } from "@/lib/auth/tokens";
import { getAuthContext, jsonError } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth) {
      return jsonError("UNAUTHORIZED", "Authentication required.", 401);
    }

    await revokeAllUserSessions(auth.user.id);

    await logAuthEvent("LOGOUT_ALL", {
      userId: auth.user.id,
      req,
    });

    const res = NextResponse.json({
      success: true,
      message: "Successfully logged out of all devices and active sessions.",
    });

    clearAuthCookies(res);
    return res;
  } catch (err: any) {
    console.error("Error in /auth/logout-all:", err);
    return jsonError("INTERNAL_ERROR", "Failed to logout of all sessions.", 500);
  }
}
