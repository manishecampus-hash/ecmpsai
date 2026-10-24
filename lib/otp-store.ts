export interface OtpData {
  otp: string;
  email?: string;
  phone?: string;
  name?: string;
  createdAt: number;
  expiresIn: number;
}

declare global {
  // eslint-disable-next-line no-var
  var otpStore: Record<string, OtpData> | undefined;
}

export const otpStore: Record<string, OtpData> =
  global.otpStore || (global.otpStore = {});
