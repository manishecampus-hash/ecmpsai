// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  REFRESH_TOKEN_COOKIE,
  revokeSessionByToken,
  clearAuthCookies,
} from "@/lib/auth/tokens";
import { getAuthContext } from "@/lib/auth/guards";
import { logAuthEvent } from "@/lib/auth/audit";

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    if (refreshToken) {
      await revokeSessionByToken(refreshToken);
    }

    if (auth?.user.id) {
      await logAuthEvent("LOGOUT", {
        userId: auth.user.id,
        req,
      });
    }

    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    clearAuthCookies(res);
    return res;
  } catch (err: any) {
    console.error("Error in /auth/logout:", err);
    const res = NextResponse.json({ success: true });
    clearAuthCookies(res);
    return res;
  }
}
