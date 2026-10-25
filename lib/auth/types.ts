// lib/auth/types.ts

export type UserStatus =
  | "PENDING_PHONE_VERIFICATION"
  | "ACTIVE"
  | "LOCKED"
  | "DISABLED";

export type OtpChannel = "SMS" | "EMAIL" | "WHATSAPP";

export type OtpPurpose =
  | "phone_signup"
  | "phone_login"
  | "phone_add"
  | "phone_change_old"
  | "phone_change_new"
  | "email_verify"
  | "password_reset";

export interface UserRecord {
  id: string; // Canonical UUID string
  phone_e164: string | null; // E.164 normalized e.g. "+919876543210"
  phone_verified_at: Date | null;
  email: string | null; // Lowercase
  email_verified_at: Date | null;
  password_hash: string | null; // Bcrypt / Argon2 hash
  full_name: string;
  status: UserStatus;
  failed_login_attempts: number;
  locked_until: Date | null;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
  // Metadata & Profile
  state?: string;
  course_interested?: string[];
  coursesInterested?: string[];
  course?: string;
  referral_code?: string;
  whatsapp_opt_in?: boolean;
  advisorProfile?: Record<string, any>;
  spinReward?: Record<string, any>;
  spinSkipped?: boolean;
}

export interface OtpChallengeRecord {
  id: string;
  user_id: string | null;
  target: string; // Normalized E.164 phone or lowercase email
  channel: OtpChannel;
  purpose: OtpPurpose;
  code_hash: string; // HMAC-SHA256
  expires_at: Date;
  attempts: number;
  max_attempts: number;
  consumed_at: Date | null;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export interface SessionRecord {
  id: string;
  user_id: string;
  token_family: string; // UUID tracking token lineage
  refresh_token_hash: string; // SHA-256 hash of refresh token
  device_info?: {
    browser?: string;
    os?: string;
    device?: string;
    ip?: string;
  };
  ip_address?: string;
  is_revoked: boolean;
  rotated_from: string | null; // ID of predecessor session
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface OAuthAccountRecord {
  id: string;
  user_id: string;
  provider: "google" | "apple";
  provider_user_id: string;
  email?: string;
  profile_data?: Record<string, any>;
  created_at: Date;
}

export interface AuthEventRecord {
  id: string;
  user_id: string | null;
  event_type:
    | "PHONE_SIGNUP_START"
    | "PHONE_SIGNUP_SUCCESS"
    | "PHONE_LOGIN_START"
    | "PHONE_LOGIN_SUCCESS"
    | "EMAIL_SIGNUP_PENDING"
    | "EMAIL_LOGIN_SUCCESS"
    | "PHONE_ADDED_VERIFIED"
    | "PHONE_CHANGE_INITIATED"
    | "PHONE_CHANGE_COMPLETED"
    | "EMAIL_VERIFY_SENT"
    | "EMAIL_VERIFIED"
    | "PASSWORD_RESET_REQUESTED"
    | "PASSWORD_RESET_COMPLETED"
    | "SESSION_REFRESHED"
    | "TOKEN_REUSE_DETECTED"
    | "LOGOUT"
    | "LOGOUT_ALL"
    | "ACCOUNT_LOCKED";
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: Date;
}

export interface AuthErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    retry_after?: number | null;
  };
}
