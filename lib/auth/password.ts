// lib/auth/password.ts
import bcrypt from "bcryptjs";

const BCRYPT_SALT_ROUNDS = 12;

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (!password || typeof password !== "string") {
    return { isValid: false, error: "Password is required." };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long.",
    };
  }

  if (password.length > 72) {
    // Bcrypt max length is 72 bytes
    return {
      isValid: false,
      error: "Password cannot exceed 72 characters.",
    };
  }

  // Check for mix of characters (at least 1 number or special symbol)
  const hasDigitOrSymbol = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );
  if (!hasDigitOrSymbol) {
    return {
      isValid: false,
      error: "Password must contain at least one digit or special symbol.",
    };
  }

  return { isValid: true };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hash: string | null | undefined
): Promise<boolean> {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}
