import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalized } });

    // Always return success to prevent email enumeration
    const message = "If an account exists, you will receive a password reset link shortly.";

    if (!user) {
      return NextResponse.json({ message });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordReset.create({
      data: { email: normalized, token, expiresAt },
    });

    const baseUrl = process.env.SITE_URL || (request.headers.get("origin") ?? `https://${request.headers.get("host")}`);
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    const { ok, error } = await sendPasswordResetEmail(normalized, resetUrl);

    if (!ok) {
      return NextResponse.json(
        { error: error || "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
