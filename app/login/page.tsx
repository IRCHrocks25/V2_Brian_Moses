"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Hero background - same as homepage */}
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Brand accent */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">Brian Moses</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Dashboard Login</h1>
          <p className="mt-1 text-white/50 text-sm">Sign in to manage your site</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">{error}</div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-white/90">Password</label>
                <Link href="/forgot-password" className="text-sm text-emerald-400/90 transition-colors hover:text-emerald-400">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
                required
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link href="/" className="text-sm text-white/50 transition-colors hover:text-white/90">
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
