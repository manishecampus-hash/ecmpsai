// tests/auth-system.test.ts
import { normalizePhone } from "../lib/auth/phone";
import { hashPassword, verifyPassword, validatePasswordStrength } from "../lib/auth/password";
import { generateSecureOtp, hashOtp, verifyOtpChallenge } from "../lib/auth/otp";
import {
  createAccessToken,
  verifyAccessToken,
  createSession,
  rotateRefreshToken,
} from "../lib/auth/tokens";
import { UserRecord } from "../lib/auth/types";
import { getSessionsCollection, getUsersCollection, ensureAuthIndexes } from "../lib/auth/db";

async function runTests() {
  console.log("=================================================");
  console.log("  RUNNING AUTHENTICATION & IDENTITY TEST SUITE   ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName}`);
      failed++;
    }
  }

  // ── TEST 1: Phone Normalization & E.164 Conformance ──
  console.log("▶ Testing Phone Normalization & E.164:");
  const inPhone = normalizePhone("9876543210", "IN");
  assert(inPhone.isValid && inPhone.e164 === "+919876543210", "Normalizes 10-digit Indian phone to +919876543210");

  const usPhone = normalizePhone("+1 (415) 555-2671");
  assert(usPhone.isValid && usPhone.e164 === "+14155552671", "Normalizes US phone to +14155552671");

  const formattedIn = normalizePhone("+91 98765-43210");
  assert(formattedIn.isValid && formattedIn.e164 === "+919876543210", "Handles spaced and hyphenated formats");

  const invalidLength = normalizePhone("12345", "IN");
  assert(!invalidLength.isValid, "Rejects short/invalid numbers");

  // ── TEST 2: Password Strength & Bcrypt Hashing ──
  console.log("\n▶ Testing Password Security:");
  assert(!validatePasswordStrength("short").isValid, "Rejects passwords < 8 characters");
  assert(!validatePasswordStrength("onlylettershere").isValid, "Rejects passwords without numbers or symbols");
  assert(validatePasswordStrength("SecureP@ss2026").isValid, "Accepts strong compliant passwords");

  const hash = await hashPassword("SecureP@ss2026");
  assert(await verifyPassword("SecureP@ss2026", hash), "Verifies correct password against bcrypt hash");
  assert(!(await verifyPassword("WrongPassword123!", hash)), "Rejects incorrect password against hash");

  // ── TEST 3: Cryptographic OTP & HMAC Hashing ──
  console.log("\n▶ Testing Cryptographic OTP Generation & HMAC:");
  const otp1 = generateSecureOtp();
  const otp2 = generateSecureOtp();
  assert(otp1.length === 6 && /^\d{6}$/.test(otp1), "Generates 6-digit cryptographic OTP");
  assert(otp1 !== otp2, "Consecutive OTP generations are random and distinct");

  const hmacA = hashOtp("123456", "+919876543210");
  const hmacB = hashOtp("123456", "+919876543210");
  const hmacC = hashOtp("654321", "+919876543210");
  assert(hmacA === hmacB, "HMAC-SHA256 is deterministic for same target & OTP");
  assert(hmacA !== hmacC, "HMAC-SHA256 changes when OTP code changes");

  // ── TEST 4: JWT Access Tokens & Scope Enforcement ──
  console.log("\n▶ Testing JWT Access Tokens & Scope Enforcement:");
  const activeUser: UserRecord = {
    id: "user-uuid-active-123",
    phone_e164: "+919876543210",
    phone_verified_at: new Date(),
    email: "user@example.com",
    email_verified_at: new Date(),
    password_hash: null,
    full_name: "Test Active User",
    status: "ACTIVE",
    failed_login_attempts: 0,
    locked_until: null,
    last_login_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  const activeToken = await createAccessToken(activeUser);
  const activePayload = await verifyAccessToken(activeToken);
  assert(
    activePayload !== null &&
      activePayload.sub === "user-uuid-active-123" &&
      activePayload.status === "ACTIVE" &&
      activePayload.scope === "full_access",
    "Issues 'full_access' token for ACTIVE user"
  );

  const pendingUser: UserRecord = {
    ...activeUser,
    id: "user-uuid-pending-456",
    phone_e164: null,
    phone_verified_at: null,
    status: "PENDING_PHONE_VERIFICATION",
  };

  const pendingToken = await createAccessToken(pendingUser);
  const pendingPayload = await verifyAccessToken(pendingToken);
  assert(
    pendingPayload !== null &&
      pendingPayload.sub === "user-uuid-pending-456" &&
      pendingPayload.status === "PENDING_PHONE_VERIFICATION" &&
      pendingPayload.scope === "phone_verification",
    "Restricts token to 'phone_verification' scope for PENDING users"
  );

  // ── TEST 5: Refresh Token Rotation & Theft/Reuse Detection ──
  console.log("\n▶ Testing Session Rotation & Token Reuse Detection:");
  await ensureAuthIndexes();

  const testUserId = "test-session-user-" + Date.now();
  const usersColl = await getUsersCollection();
  await usersColl.insertOne({
    id: testUserId,
    phone_e164: "+919999999999",
    phone_verified_at: new Date(),
    email: `${testUserId}@example.com`,
    email_verified_at: new Date(),
    password_hash: null,
    full_name: "Session Test User",
    status: "ACTIVE",
    failed_login_attempts: 0,
    locked_until: null,
    last_login_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  const { refreshToken: rToken1, session: s1 } = await createSession({
    userId: testUserId,
  });

  assert(s1.token_family !== undefined && !s1.is_revoked, "Creates new session with distinct token family");

  // Rotate token (First valid rotation)
  const rotation1 = await rotateRefreshToken({
    rawRefreshToken: rToken1,
  });

  assert(rotation1 !== null, "Rotates valid refresh token into new session");
  assert(rotation1?.refreshToken !== rToken1, "Issued new refresh token distinct from predecessor");

  // ATTEMPT REUSE OF BURNED TOKEN rToken1 (Theft simulation!)
  const reuseAttempt = await rotateRefreshToken({
    rawRefreshToken: rToken1,
  });

  assert(reuseAttempt === null, "Reusing burned token is rejected");

  // Verify that the whole family was revoked
  const sessions = await getSessionsCollection();
  const familySessions = await sessions
    .find({ token_family: s1.token_family })
    .toArray();

  const allRevoked = familySessions.every((s) => s.is_revoked === true);
  assert(allRevoked && familySessions.length >= 2, "Automatic theft response: entire token family revoked upon reuse attempt");

  console.log("\n=================================================");
  console.log(`  RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests().catch((err) => {
  console.error("Test execution failed with error:", err);
  process.exit(1);
});
