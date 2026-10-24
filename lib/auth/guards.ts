// lib/auth/guards.ts
import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  ACCESS_TOKEN_COOKIE,
  AccessTokenPayload,
} from "./tokens";
import { getUsersCollection } from "./db";
import { UserRecord } from "./types";

export interface AuthContext {
  user: UserRecord;
  tokenPayload: AccessTokenPayload;
}

export function jsonError(
  code: string,
  message: string,
  status = 400,
  details?: any,
  retryAfter?: number | null
): NextResponse {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        details,
        retry_after: retryAfter || null,
      },
    },
    { status }
  );
}

export async function getAuthContext(
  req: NextRequest
): Promise<AuthContext | null> {
  let token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const users = await getUsersCollection();
  const user = await users.findOne({ id: payload.sub });

  if (!user) return null;
  if (user.status === "DISABLED" || user.status === "LOCKED") return null;

  return { user, tokenPayload: payload };
}

/**
 * Enforces that a user has an active session and has verified their phone number.
 */
export async function requireActiveUser(
  req: NextRequest
): Promise<{ auth?: AuthContext; errorResponse?: NextResponse }> {
  const auth = await getAuthContext(req);

  if (!auth) {
    return {
      errorResponse: jsonError(
        "UNAUTHORIZED",
        "Authentication required. Please log in.",
        401
      ),
    };
  }

  if (auth.user.status === "PENDING_PHONE_VERIFICATION") {
    return {
      errorResponse: jsonError(
        "PHONE_VERIFICATION_REQUIRED",
        "A verified phone number is mandatory to access this resource.",
        403,
        { status: auth.user.status }
      ),
    };
  }

  if (auth.user.status !== "ACTIVE") {
    return {
      errorResponse: jsonError(
        "ACCOUNT_NOT_ACTIVE",
        `Account status is ${auth.user.status}.`,
        403
      ),
    };
  }

  return { auth };
}

/**
 * Validates request for users in PENDING_PHONE_VERIFICATION state who are adding their phone.
 */
export async function requirePendingOrActiveUser(
  req: NextRequest
): Promise<{ auth?: AuthContext; errorResponse?: NextResponse }> {
  const auth = await getAuthContext(req);

  if (!auth) {
    return {
      errorResponse: jsonError(
        "UNAUTHORIZED",
        "Authentication token required.",
        401
      ),
    };
  }

  return { auth };
}
