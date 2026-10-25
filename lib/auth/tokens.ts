// lib/auth/tokens.ts
import { SignJWT, jwtVerify } from "jose";
import { randomBytes, createHash, randomUUID } from "crypto";
import { NextResponse, NextRequest } from "next/server";
import { getSessionsCollection, getUsersCollection } from "./db";
import { SessionRecord, UserRecord } from "./types";
import { logAuthEvent } from "./audit";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecampus_super_secret_jwt_key_987654321_2026"
);

export const ACCESS_TOKEN_COOKIE = "ecampus_access_token";
export const REFRESH_TOKEN_COOKIE = "ecampus_refresh_token";

const ACCESS_TOKEN_TTL_SEC = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface AccessTokenPayload {
  sub: string;
  phone_e164: string | null;
  email: string | null;
  status: UserRecord["status"];
  scope: "full_access" | "phone_verification";
}

/**
 * Creates a signed JWT Access Token.
 * If user status is PENDING_PHONE_VERIFICATION, scope is strictly restricted.
 */
export async function createAccessToken(
  user: UserRecord
): Promise<string> {
  const scope =
    user.status === "ACTIVE" ? "full_access" : "phone_verification";

  return new SignJWT({
    phone_e164: user.phone_e164,
    email: user.email,
    status: user.status,
    scope,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_TTL_SEC}s`)
    .sign(JWT_SECRET);
}

export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      sub: payload.sub as string,
      phone_e164: (payload.phone_e164 as string) || null,
      email: (payload.email as string) || null,
      status: payload.status as UserRecord["status"],
      scope: payload.scope as "full_access" | "phone_verification",
    };
  } catch {
    return null;
  }
}

function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Generates an opaque refresh token and registers a session with a token family.
 */
export async function createSession(options: {
  userId: string;
  tokenFamily?: string;
  rotatedFrom?: string | null;
  deviceInfo?: SessionRecord["device_info"];
  ip?: string;
}): Promise<{ refreshToken: string; session: SessionRecord }> {
  const { userId, tokenFamily, rotatedFrom, deviceInfo, ip } = options;
  const sessions = await getSessionsCollection();

  const rawRefreshToken = randomBytes(32).toString("hex");
  const refreshTokenHash = hashRefreshToken(rawRefreshToken);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + REFRESH_TOKEN_TTL_MS);

  const session: SessionRecord = {
    id: randomUUID(),
    user_id: userId,
    token_family: tokenFamily || randomUUID(),
    refresh_token_hash: refreshTokenHash,
    device_info: deviceInfo,
    ip_address: ip,
    is_revoked: false,
    rotated_from: rotatedFrom || null,
    expires_at: expiresAt,
    created_at: now,
    updated_at: now,
  };

  await sessions.insertOne(session);
  return { refreshToken: rawRefreshToken, session };
}

/**
 * Rotates a refresh token and detects reuse attempts.
 * If token reuse is detected, revokes the entire token family immediately.
 */
export async function rotateRefreshToken(options: {
  rawRefreshToken: string;
  deviceInfo?: SessionRecord["device_info"];
  ip?: string;
  req?: NextRequest;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  user: UserRecord;
} | null> {
  const { rawRefreshToken, deviceInfo, ip, req } = options;
  const sessions = await getSessionsCollection();
  const users = await getUsersCollection();
  const hash = hashRefreshToken(rawRefreshToken);

  const existingSession = await sessions.findOne({ refresh_token_hash: hash });

  if (!existingSession) {
    return null;
  }

  // ── REUSE DETECTION ──
  // If this session is already revoked, an attacker or compromised client is reusing a burned token!
  if (existingSession.is_revoked) {
    console.warn(
      `[SECURITY ALERT] Refresh token reuse detected for family ${existingSession.token_family}. Revoking entire lineage.`
    );

    // Revoke all sessions in the entire family
    await sessions.updateMany(
      { token_family: existingSession.token_family },
      { $set: { is_revoked: true, updated_at: new Date() } }
    );

    await logAuthEvent("TOKEN_REUSE_DETECTED", {
      userId: existingSession.user_id,
      req,
      metadata: {
        token_family: existingSession.token_family,
        compromised_session_id: existingSession.id,
      },
    });

    return null;
  }

  // Check Expiry
  if (Date.now() > existingSession.expires_at.getTime()) {
    await sessions.updateOne(
      { id: existingSession.id },
      { $set: { is_revoked: true, updated_at: new Date() } }
    );
    return null;
  }

  // Fetch User
  const user = await users.findOne({ id: existingSession.user_id });
  if (!user || user.status === "DISABLED" || user.status === "LOCKED") {
    await sessions.updateOne(
      { id: existingSession.id },
      { $set: { is_revoked: true, updated_at: new Date() } }
    );
    return null;
  }

  // Burn Current Refresh Token (mark revoked)
  await sessions.updateOne(
    { id: existingSession.id },
    { $set: { is_revoked: true, updated_at: new Date() } }
  );

  // Issue New Session in the Same Family
  const { refreshToken: newRefreshToken } = await createSession({
    userId: user.id,
    tokenFamily: existingSession.token_family,
    rotatedFrom: existingSession.id,
    deviceInfo: deviceInfo || existingSession.device_info,
    ip,
  });

  const newAccessToken = await createAccessToken(user);

  await logAuthEvent("SESSION_REFRESHED", {
    userId: user.id,
    req,
    metadata: { token_family: existingSession.token_family },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  };
}

export async function revokeSessionByToken(rawRefreshToken: string): Promise<void> {
  const sessions = await getSessionsCollection();
  const hash = hashRefreshToken(rawRefreshToken);
  await sessions.updateOne(
    { refresh_token_hash: hash },
    { $set: { is_revoked: true, updated_at: new Date() } }
  );
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  const sessions = await getSessionsCollection();
  await sessions.updateMany(
    { user_id: userId, is_revoked: false },
    { $set: { is_revoked: true, updated_at: new Date() } }
  );
}

/**
 * Attaches httpOnly, Secure, SameSite cookies to the response.
 */
export function setAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken?: string }
): void {
  const isProduction = process.env.NODE_ENV === "production";

  // Access Token Cookie (15 minutes)
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: tokens.accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_TTL_SEC,
  });

  // Refresh Token Cookie (30 days)
  if (tokens.refreshToken) {
    response.cookies.set({
      name: REFRESH_TOKEN_COOKIE,
      value: tokens.refreshToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
}

/**
 * Clears authentication cookies upon logout.
 */
export function clearAuthCookies(response: NextResponse): void {
  const isProduction = process.env.NODE_ENV === "production";

  // Explicitly delete cookies
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);

  // Set expired cookies as a robust fallback for all browser engines
  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}
