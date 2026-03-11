import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const reset = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!reset || reset.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    await prisma.$transaction([
      prisma.user.update({
        where: { email: reset.email },
        data: { passwordHash },
      }),
      prisma.passwordReset.delete({ where: { id: reset.id } }),
    ]);

    return NextResponse.json({ message: "Password updated. You can now sign in." });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
