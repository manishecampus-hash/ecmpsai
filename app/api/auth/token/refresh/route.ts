// app/api/auth/token/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  rotateRefreshToken,
  REFRESH_TOKEN_COOKIE,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/auth/tokens";
import { jsonError } from "@/lib/auth/guards";

export async function POST(req: NextRequest) {
  try {
    const rawRefreshToken =
      req.cookies.get(REFRESH_TOKEN_COOKIE)?.value ||
      (await req.json().catch(() => ({})))?.refresh_token;

    if (!rawRefreshToken) {
      return jsonError("MISSING_TOKEN", "Refresh token required.", 401);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const rotationResult = await rotateRefreshToken({
      rawRefreshToken,
      ip,
      deviceInfo: {
        browser: req.headers.get("sec-ch-ua") || undefined,
        ip,
      },
      req,
    });

    if (!rotationResult) {
      const res = jsonError(
        "INVALID_REFRESH_TOKEN",
        "Session expired or revoked. Please log in again.",
        401
      );
      clearAuthCookies(res);
      return res;
    }

    const res = NextResponse.json({
      success: true,
      user: {
        id: rotationResult.user.id,
        phone_e164: rotationResult.user.phone_e164,
        email: rotationResult.user.email,
        full_name: rotationResult.user.full_name,
        status: rotationResult.user.status,
      },
    });

    setAuthCookies(res, {
      accessToken: rotationResult.accessToken,
      refreshToken: rotationResult.refreshToken,
    });

    return res;
  } catch (err: any) {
    console.error("Error in /auth/token/refresh:", err);
    return jsonError("INTERNAL_ERROR", "Token refresh failed.", 500);
  }
}
