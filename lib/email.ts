import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const SITE_NAME = "Brian Moses";

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: "Email is not configured. Add RESEND_API_KEY to your .env" };
  }

  const { error } = await resend.emails.send({
    from: `${SITE_NAME} <${FROM_EMAIL}>`,
    to: [to],
    subject: "Reset your password",
    html: `
      <p>You requested a password reset for your ${SITE_NAME} account.</p>
      <p><a href="${resetUrl}" style="color:#10b981;font-weight:600;">Reset password</a></p>
      <p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
    `,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
