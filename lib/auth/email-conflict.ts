// lib/auth/email-conflict.ts
import { getUsersCollection, getSessionsCollection, getOAuthAccountsCollection } from "./db";
import { logAuthEvent } from "./audit";

export interface ConflictResolutionResult {
  unlinkedAccounts: string[];
  deletedAccounts: string[];
}

/**
 * Resolves conflicts when a user verifies an email address.
 *
 * Requirements:
 * - If any OTHER user document in `users` currently has this exact email (case-insensitive):
 *   - If the other document HAS a valid phone number (phone_e164), remove the email ID and email_verified_at
 *     from that other document, keeping ONLY its phone number.
 *   - If the other document does NOT have a phone number, delete the entire user document,
 *     along with its sessions and OAuth accounts.
 */
export async function resolveEmailVerificationConflict(
  verifiedUserId: string,
  email: string
): Promise<ConflictResolutionResult> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    return { unlinkedAccounts: [], deletedAccounts: [] };
  }

  const users = await getUsersCollection();
  const sessions = await getSessionsCollection();
  const oauth = await getOAuthAccountsCollection();
  const now = new Date();

  // Find other user documents with this email
  const conflictingUsers = await users
    .find({
      id: { $ne: verifiedUserId },
      email: cleanEmail,
    })
    .toArray();

  const unlinkedAccounts: string[] = [];
  const deletedAccounts: string[] = [];

  for (const other of conflictingUsers) {
    const hasPhone = Boolean(
      other.phone_e164 &&
        typeof other.phone_e164 === "string" &&
        other.phone_e164.trim().length > 0
    );

    if (hasPhone) {
      // 1. Has phone number: remove email ID so only phone number remains visible in DB
      await users.updateOne(
        { id: other.id },
        {
          $unset: { email: "", email_verified_at: "" },
          $set: { updated_at: now },
        }
      );
      unlinkedAccounts.push(other.id);

      await logAuthEvent("EMAIL_CONFLICT_RESOLVED_UNLINKED", {
        userId: other.id,
        metadata: {
          targetEmail: cleanEmail,
          verifiedByUserId: verifiedUserId,
          action: "unset_email_kept_phone",
          remainingPhone: other.phone_e164,
        },
      });
    } else {
      // 2. Email-only account: delete the entire document
      await users.deleteOne({ id: other.id });
      await sessions.deleteMany({ user_id: other.id });
      await oauth.deleteMany({ user_id: other.id });
      deletedAccounts.push(other.id);

      await logAuthEvent("EMAIL_CONFLICT_RESOLVED_DELETED", {
        userId: other.id,
        metadata: {
          targetEmail: cleanEmail,
          verifiedByUserId: verifiedUserId,
          action: "deleted_account_no_phone",
        },
      });
    }
  }

  return { unlinkedAccounts, deletedAccounts };
}
