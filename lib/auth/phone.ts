// lib/auth/phone.ts
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";

export const ALLOWED_COUNTRY_CODES: CountryCode[] = [
  "IN", // India (+91)
  "US", // United States (+1)
  "CA", // Canada (+1)
  "GB", // United Kingdom (+44)
  "AE", // United Arab Emirates (+971)
  "AU", // Australia (+61)
  "SG", // Singapore (+65)
  "MY", // Malaysia (+60)
  "DE", // Germany (+49)
  "FR", // France (+33)
  "JP", // Japan (+81)
];

export interface NormalizedPhoneResult {
  isValid: boolean;
  e164: string; // Canonical e.g. "+919876543210"
  country?: CountryCode;
  nationalNumber?: string;
  error?: string;
}

/**
 * Parses and normalizes any phone string to canonical E.164 format (+919876543210).
 * Rejects numbers outside allowed countries or with invalid lengths.
 */
export function normalizePhone(
  rawInput: string,
  defaultCountry: CountryCode = "IN"
): NormalizedPhoneResult {
  if (!rawInput || typeof rawInput !== "string") {
    return {
      isValid: false,
      e164: "",
      error: "Phone number is required.",
    };
  }

  const cleaned = rawInput.trim();

  try {
    if (!isValidPhoneNumber(cleaned, defaultCountry)) {
      return {
        isValid: false,
        e164: "",
        error: "Invalid phone number format or length.",
      };
    }

    const parsed = parsePhoneNumber(cleaned, defaultCountry);

    if (!parsed) {
      return {
        isValid: false,
        e164: "",
        error: "Unable to parse phone number.",
      };
    }

    // Country allowlist check
    if (parsed.country && !ALLOWED_COUNTRY_CODES.includes(parsed.country)) {
      return {
        isValid: false,
        e164: parsed.number,
        country: parsed.country,
        error: `Country code (+${parsed.countryCallingCode}) is currently not supported.`,
      };
    }

    return {
      isValid: true,
      e164: parsed.number, // E.164 canonical
      country: parsed.country,
      nationalNumber: parsed.nationalNumber,
    };
  } catch (err: any) {
    return {
      isValid: false,
      e164: "",
      error: err.message || "Failed to validate phone number.",
    };
  }
}
