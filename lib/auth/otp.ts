// lib/auth/otp.ts
import { randomInt, createHmac, randomUUID } from "crypto";
import twilio from "twilio";
import { getOtpChallengesCollection } from "./db";
import { OtpChallengeRecord, OtpChannel, OtpPurpose } from "./types";
import { sendZeptoOtpEmail } from "@/lib/zeptomail";

const OTP_SECRET_KEY =
  process.env.OTP_SECRET_KEY ||
  process.env.JWT_SECRET ||
  "ecampus_default_otp_hmac_secret_key_2026";

const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

// Rate limiting thresholds
const MAX_PER_HOUR_TARGET = 4;
const MAX_PER_DAY_TARGET = 10;
const MAX_PER_HOUR_IP = 15;

export function generateSecureOtp(): string {
  return randomInt(100000, 1000000).toString();
}

export function hashOtp(code: string, target: string): string {
  return createHmac("sha256", OTP_SECRET_KEY)
    .update(`${target.toLowerCase().trim()}:${code.trim()}`)
    .digest("hex");
}

export async function checkOtpRateLimits(
  target: string,
  ip?: string
): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
  const challenges = await getOtpChallengesCollection();
  const normalizedTarget = target.toLowerCase().trim();
  const now = Date.now();

  // 1. Check Resend Cooldown (30 seconds)
  const latest = await challenges
    .find({ target: normalizedTarget })
    .sort({ created_at: -1 })
    .limit(1)
    .toArray();

  if (latest.length > 0) {
    const elapsed = now - latest[0].created_at.getTime();
    if (elapsed < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
      return {
        allowed: false,
        reason: `Please wait ${waitSeconds}s before requesting a new code.`,
        retryAfter: waitSeconds,
      };
    }
  }

  // 2. Check Target Hourly Cap
  const oneHourAgo = new Date(now - 60 * 60 * 1000);
  const countHour = await challenges.countDocuments({
    target: normalizedTarget,
    created_at: { $gte: oneHourAgo },
  });

  if (countHour >= MAX_PER_HOUR_TARGET) {
    return {
      allowed: false,
      reason: "Too many OTP requests for this number/email. Try again in an hour.",
      retryAfter: 3600,
    };
  }

  // 3. Check Target Daily Cap
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const countDay = await challenges.countDocuments({
    target: normalizedTarget,
    created_at: { $gte: oneDayAgo },
  });

  if (countDay >= MAX_PER_DAY_TARGET) {
    return {
      allowed: false,
      reason: "Daily OTP limit reached for this number/email. Try again tomorrow.",
      retryAfter: 86400,
    };
  }

  // 4. Check IP Hourly Cap
  if (ip) {
    const countIp = await challenges.countDocuments({
      ip_address: ip,
      created_at: { $gte: oneHourAgo },
    });

    if (countIp >= MAX_PER_HOUR_IP) {
      return {
        allowed: false,
        reason: "Too many verification requests from your network. Please wait an hour.",
        retryAfter: 3600,
      };
    }
  }

  return { allowed: true };
}

export async function createAndSendOtpChallenge(options: {
  target: string; // Normalized E.164 phone or lowercase email
  channel: OtpChannel;
  purpose: OtpPurpose;
  userId?: string | null;
  ip?: string;
  userAgent?: string;
  name?: string;
}): Promise<{ challengeId: string; resendCooldown: number }> {
  const { target, channel, purpose, userId, ip, userAgent, name } = options;
  const normalizedTarget = target.toLowerCase().trim();

  // 1. Rate Limit Checks
  const limitCheck = await checkOtpRateLimits(normalizedTarget, ip);
  if (!limitCheck.allowed) {
    const error: any = new Error(limitCheck.reason);
    error.code = "RATE_LIMITED";
    error.retryAfter = limitCheck.retryAfter;
    throw error;
  }

  // 2. Generate and Hash OTP
  const rawOtp = generateSecureOtp();
  const codeHash = hashOtp(rawOtp, normalizedTarget);
  const challengeId = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_TTL_MS);

  // 3. Invalidate prior unconsumed challenges for this target & purpose
  const challenges = await getOtpChallengesCollection();
  await challenges.updateMany(
    { target: normalizedTarget, purpose, consumed_at: null },
    { $set: { consumed_at: now } }
  );

  // 4. Save Challenge Record
  const challengeRecord: OtpChallengeRecord = {
    id: challengeId,
    user_id: userId || null,
    target: normalizedTarget,
    channel,
    purpose,
    code_hash: codeHash,
    expires_at: expiresAt,
    attempts: 0,
    max_attempts: MAX_ATTEMPTS,
    consumed_at: null,
    ip_address: ip,
    user_agent: userAgent,
    created_at: now,
  };

  await challenges.insertOne(challengeRecord);

  // 5. Dispatch via Channel
  if (channel === "SMS") {
    await dispatchSmsOtp(target, rawOtp);
  } else if (channel === "EMAIL") {
    await dispatchEmailOtp(target, rawOtp, name);
  }

  return { challengeId, resendCooldown: 30 };
}

async function dispatchSmsOtp(phone: string, otp: string): Promise<void> {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE;

  if (
    accountSid &&
    authToken &&
    twilioPhone &&
    !accountSid.includes("your_twilio")
  ) {
    try {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `Your eCampus verification code is: ${otp}. Valid for 5 minutes. Do not share this code with anyone.`,
        from: twilioPhone,
        to: phone,
      });
      return;
    } catch (twilioErr) {
      console.error("Twilio SMS Dispatch error:", twilioErr);
      // Fallback to local dev logging
    }
  }

  // Safe development output
  console.log(`[SMS OTP DEV GATEWAY] >>> Phone: ${phone} | Code: ${otp} <<<`);
}

async function dispatchEmailOtp(
  email: string,
  otp: string,
  name?: string
): Promise<void> {
  try {
    await sendZeptoOtpEmail({
      email,
      otp,
      name,
    });
  } catch (emailErr) {
    console.error("ZeptoMail dispatch error:", emailErr);
    console.log(`[EMAIL OTP DEV GATEWAY] >>> Email: ${email} | Code: ${otp} <<<`);
  }
}

export async function verifyOtpChallenge(options: {
  challengeId?: string;
  target?: string;
  purpose?: OtpPurpose;
  code: string;
}): Promise<{ valid: boolean; challenge?: OtpChallengeRecord; error?: string }> {
  const { challengeId, target, purpose, code } = options;
  const challenges = await getOtpChallengesCollection();
  const now = new Date();

  let query: any = {};
  if (challengeId) {
    query.id = challengeId;
  } else if (target && purpose) {
    query.target = target.toLowerCase().trim();
    query.purpose = purpose;
  } else {
    return { valid: false, error: "Challenge identifier is missing." };
  }

  query.consumed_at = null;

  const challenge = await challenges.findOne(query, {
    sort: { created_at: -1 },
  });

  if (!challenge) {
    return {
      valid: false,
      error: "No active verification code found. Please request a new one.",
    };
  }

  // Check TTL Expiry
  if (now.getTime() > challenge.expires_at.getTime()) {
    await challenges.updateOne(
      { id: challenge.id },
      { $set: { consumed_at: now } }
    );
    return {
      valid: false,
      error: "Verification code has expired. Please request a new one.",
    };
  }

  // Check Attempt Limits
  if (challenge.attempts >= challenge.max_attempts) {
    await challenges.updateOne(
      { id: challenge.id },
      { $set: { consumed_at: now } }
    );
    return {
      valid: false,
      error: "Maximum verification attempts exceeded. Please request a new code.",
    };
  }

  // Validate HMAC Hash
  const expectedHash = hashOtp(code, challenge.target);
  if (challenge.code_hash !== expectedHash) {
    const updatedAttempts = challenge.attempts + 1;
    const remaining = challenge.max_attempts - updatedAttempts;

    await challenges.updateOne(
      { id: challenge.id },
      {
        $inc: { attempts: 1 },
        ...(remaining <= 0 ? { $set: { consumed_at: now } } : {}),
      }
    );

    return {
      valid: false,
      error:
        remaining > 0
          ? `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
          : "Maximum attempts exceeded. Code has been invalidated.",
    };
  }

  // Successfully Verified: Mark Consumed
  await challenges.updateOne(
    { id: challenge.id },
    { $set: { consumed_at: now } }
  );

  return { valid: true, challenge };
}
