/**
 * ZeptoMail transactional email client for eCampus.
 * Delivers fast, high-deliverability transactional emails (e.g. OTP verification).
 */

interface SendOtpEmailParams {
  email: string;
  otp: string;
  name?: string;
}

export async function sendZeptoOtpEmail({ email, otp, name }: SendOtpEmailParams) {
  const token = process.env.ZEPTO_TOKEN;
  const endpoint =
    process.env.ZEPTO_ENDPOINT || "https://api.zeptomail.in/v1.1/email";
  const fromEmail = process.env.ZEPTO_FROM_EMAIL || "no-reply@ecampusapp.com";
  const fromName = process.env.ZEPTO_FROM_NAME || "eCampus";

  if (!token) {
    console.warn("⚠️ ZEPTO_TOKEN not configured. Email OTP logged for development:", {
      email,
      otp,
    });
    // Return gracefully in dev if token is somehow missing
    return { success: true, simulated: true };
  }

  const recipientName = name?.trim() || "Learner";

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your eCampus Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 20px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #dc2626; letter-spacing: -0.5px;">
                eCampus
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #64748b; font-weight: 500;">
                Empowering your online education journey
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 36px;">
              <h2 style="margin: 0 0 12px; font-size: 19px; font-weight: 700; color: #0f172a;">
                Verify your email address
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 22px; color: #475569;">
                Hello ${recipientName},<br>
                Thank you for signing up on eCampus. Please use the verification code below to verify your account:
              </p>

              <!-- OTP Code Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px;">
                <tr>
                  <td align="center" style="background-color: #fef2f2; border: 1.5px dashed #fca5a5; border-radius: 12px; padding: 18px 24px;">
                    <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #dc2626; font-family: 'Courier New', Courier, monospace;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; line-height: 20px;">
                ⏱️ This verification code is valid for <strong>5 minutes</strong>.
              </p>
              <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 20px;">
                If you did not request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} eCampus. All rights reserved.
              </p>
              <p style="margin: 4px 0 0; font-size: 11px; color: #cbd5e1;">
                This is an automated transactional message, please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const payload = {
    from: {
      address: fromEmail,
      name: fromName,
    },
    to: [
      {
        email_address: {
          address: email,
          name: recipientName,
        },
      },
    ],
    subject: `${otp} is your eCampus verification code`,
    htmlbody: htmlBody,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Zoho-enczapikey ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("❌ ZeptoMail Error sending OTP email:", result);
    throw new Error(
      result?.message ||
        result?.error?.message ||
        "Failed to send verification email via ZeptoMail",
    );
  }

  console.log(`✅ ZeptoMail OTP email dispatched to ${email}`);
  return { success: true, result };
}
