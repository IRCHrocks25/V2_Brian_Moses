import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const SESSION_COOKIE = "bm_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "change-me-in-production-min-32-chars";

// Simple signed session (base64 encoded JSON + HMAC)
// For production, use a proper library like iron-session or jose

function getSigningKey() {
  return new TextEncoder().encode(SESSION_SECRET.padEnd(32, "0").slice(0, 32));
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    getSigningKey(),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function verify(data: string, signature: string): Promise<boolean> {
  const expected = await sign(data);
  return signature === expected;
}

export type Session = { userId: string; email: string; role: string };

export async function createSession(userId: string, email: string, role: string) {
  const payload = JSON.stringify({ userId, email, role, t: Date.now() });
  const encoded = btoa(encodeURIComponent(payload));
  const sig = await sign(encoded);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `${encoded}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [encoded, sig] = raw.split(".");
  if (!encoded || !sig) return null;
  const valid = await verify(encoded, sig);
  if (!valid) return null;
  try {
    const payload = JSON.parse(decodeURIComponent(atob(encoded)));
    if (payload.t && Date.now() - payload.t > 60 * 60 * 24 * 7) return null; // 7 day expiry
    return { userId: payload.userId, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function verifyPassword(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
