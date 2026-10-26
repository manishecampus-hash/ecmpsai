// lib/auth/db.ts
import { Collection, Db } from "mongodb";
import { getDb } from "@/lib/mongodb";
import {
  UserRecord,
  OtpChallengeRecord,
  SessionRecord,
  OAuthAccountRecord,
  AuthEventRecord,
  LeadRecord,
} from "./types";

export async function getUsersCollection(): Promise<Collection<UserRecord>> {
  const db: Db = await getDb();
  return db.collection<UserRecord>("users");
}

export async function getLeadsCollection(): Promise<Collection<LeadRecord>> {
  const db: Db = await getDb();
  return db.collection<LeadRecord>("leads");
}

export async function getOtpChallengesCollection(): Promise<
  Collection<OtpChallengeRecord>
> {
  const db: Db = await getDb();
  return db.collection<OtpChallengeRecord>("otp_challenges");
}

export async function getSessionsCollection(): Promise<
  Collection<SessionRecord>
> {
  const db: Db = await getDb();
  return db.collection<SessionRecord>("sessions");
}

export async function getOAuthAccountsCollection(): Promise<
  Collection<OAuthAccountRecord>
> {
  const db: Db = await getDb();
  return db.collection<OAuthAccountRecord>("oauth_accounts");
}

export async function getAuthEventsCollection(): Promise<
  Collection<AuthEventRecord>
> {
  const db: Db = await getDb();
  return db.collection<AuthEventRecord>("auth_events");
}

let indexesEnsured = false;

/**
 * Ensures all required indexes exist with proper unique, TTL, and partial filters.
 */
export async function ensureAuthIndexes(): Promise<void> {
  if (indexesEnsured) return;

  try {
    const db: Db = await getDb();

    // 1. Users Indexes
    const users = db.collection("users");
    await users.createIndex({ id: 1 }, { unique: true });
    await users.createIndex(
      { phone_e164: 1 },
      {
        unique: true,
        partialFilterExpression: { phone_e164: { $type: "string" } },
        name: "idx_users_phone_e164_unique",
      }
    );
    try {
      await users.dropIndex("idx_users_email_unique");
    } catch {
      // index might already be dropped
    }
    await users.createIndex(
      { email: 1 },
      {
        unique: true,
        partialFilterExpression: {
          email: { $type: "string" },
          email_verified_at: { $type: "date" },
        },
        name: "idx_users_email_verified_unique",
      }
    );
    await users.createIndex({ email: 1 }, { name: "idx_users_email" });
    await users.createIndex({ status: 1 });

    // 2. OTP Challenges Indexes (with TTL auto-expiry)
    const otpChallenges = db.collection("otp_challenges");
    await otpChallenges.createIndex({ id: 1 }, { unique: true });
    await otpChallenges.createIndex(
      { expires_at: 1 },
      { expireAfterSeconds: 0, name: "idx_otp_ttl" }
    );
    await otpChallenges.createIndex({ target: 1, purpose: 1, consumed_at: 1 });
    await otpChallenges.createIndex({ created_at: -1 });

    // 3. Sessions Indexes (with TTL auto-expiry)
    const sessions = db.collection("sessions");
    await sessions.createIndex({ id: 1 }, { unique: true });
    await sessions.createIndex(
      { refresh_token_hash: 1 },
      { unique: true, name: "idx_sessions_refresh_hash_unique" }
    );
    await sessions.createIndex(
      { expires_at: 1 },
      { expireAfterSeconds: 0, name: "idx_sessions_ttl" }
    );
    await sessions.createIndex({ user_id: 1, is_revoked: 1 });
    await sessions.createIndex({ token_family: 1 });

    // 4. OAuth Accounts Indexes
    const oauth = db.collection("oauth_accounts");
    await oauth.createIndex({ id: 1 }, { unique: true });
    await oauth.createIndex(
      { provider: 1, provider_user_id: 1 },
      { unique: true, name: "idx_oauth_provider_uid_unique" }
    );
    await oauth.createIndex({ user_id: 1 });

    // 5. Auth Events Indexes
    const events = db.collection("auth_events");
    await events.createIndex({ user_id: 1, created_at: -1 });
    await events.createIndex({ event_type: 1, created_at: -1 });

    // 6. Leads Collection Indexes
    const leads = db.collection("leads");
    await leads.createIndex({ id: 1 }, { unique: true });
    await leads.createIndex({ phone: 1 });
    await leads.createIndex({ email: 1 });
    await leads.createIndex({ source: 1, created_at: -1 });
    await leads.createIndex({ created_at: -1 });

    indexesEnsured = true;
    console.log("✓ Auth and Leads database indexes ensured successfully.");
  } catch (err) {
    console.error("Warning: Failed to ensure auth database indexes:", err);
  }
}
