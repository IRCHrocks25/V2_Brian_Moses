"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setMessage(data.message || "Password updated. You can now sign in.");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p>Invalid reset link.</p>
          <Link href="/forgot-password" className="text-emerald-400 hover:underline mt-2 inline-block">
            Request a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/Frame 8.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">Brian Moses</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Reset password</h1>
          <p className="mt-1 text-white/50 text-sm">Enter your new password</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">{error}</div>
            )}
            {message && (
              <div className="rounded-xl bg-emerald-500/15 px-4 py-3 text-sm text-emerald-400 ring-1 ring-emerald-500/30">
                {message}
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/90">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/90">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/30 disabled:opacity-50 disabled:hover:shadow-emerald-500/25"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Updating...
                </span>
              ) : (
                "Update password"
              )}
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link href="/login" className="text-sm text-white/50 transition-colors hover:text-white/90">
              ← Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
