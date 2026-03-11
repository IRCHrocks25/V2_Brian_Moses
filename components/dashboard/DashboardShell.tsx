"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import { Icons } from "./icons";

type Session = { userId: string; email: string; role: string };

export default function DashboardShell({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Ambient background glow - dark only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <aside className="fixed left-0 top-0 h-full w-72 flex flex-col z-40">
        <div className="flex-1 m-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/20 overflow-hidden transition-colors duration-300">
          <div className="p-6 border-b border-slate-200 dark:border-white/[0.06]">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow">
                <span className="text-white"><Icons.Brand /></span>
              </div>
              <div>
                <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Brian Moses</span>
                <span className="block text-xs text-slate-500 dark:text-white/40 font-medium">CMS</span>
              </div>
            </Link>
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.04]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-600 dark:text-white/50 truncate">{session.email}</span>
            </div>
          </div>
          <nav className="p-4 space-y-0.5">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
              <span className="text-slate-400 dark:text-white/50"><Icons.Layout /></span>
              Overview
            </Link>
            <Link href="/dashboard/content" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
              <span className="text-slate-400 dark:text-white/50"><Icons.FileEdit /></span>
              Content
            </Link>
            <Link href="/dashboard/ctas" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
              <span className="text-slate-400 dark:text-white/50"><Icons.Cursor /></span>
              CTAs
            </Link>
            <Link href="/dashboard/testimonials" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
              <span className="text-slate-400 dark:text-white/50"><Icons.Quote /></span>
              Testimonials
            </Link>
            <Link href="/dashboard/social" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
              <span className="text-slate-400 dark:text-white/50"><Icons.Link /></span>
              Social & Contact
            </Link>
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-white/[0.06] space-y-2">
            <ThemeToggle />
            <LogoutButton />
            <Link
              href="/"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all text-sm font-medium"
            >
              <span className="text-slate-400 dark:text-white/40"><Icons.External /></span>
              View site
            </Link>
          </div>
        </div>
      </aside>
      <main className="relative ml-72 min-h-screen p-8">{children}</main>
    </div>
  );
}
