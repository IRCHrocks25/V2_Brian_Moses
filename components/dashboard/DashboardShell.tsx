"use client";

import { useState, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const navLinks = (
    <>
      <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
        <span className="text-slate-400 dark:text-white/50"><Icons.Layout /></span>
        Overview
      </Link>
      <Link href="/dashboard/content" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
        <span className="text-slate-400 dark:text-white/50"><Icons.FileEdit /></span>
        Content
      </Link>
      <Link href="/dashboard/ctas" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
        <span className="text-slate-400 dark:text-white/50"><Icons.Cursor /></span>
        CTAs
      </Link>
      <Link href="/dashboard/testimonials" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
        <span className="text-slate-400 dark:text-white/50"><Icons.Quote /></span>
        Testimonials
      </Link>
      <Link href="/dashboard/social" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all font-medium">
        <span className="text-slate-400 dark:text-white/50"><Icons.Link /></span>
        Social & Contact
      </Link>
    </>
  );

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Ambient background glow - dark only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Mobile menu button - right side, hidden when sidebar open */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 right-4 z-50 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 shadow-lg text-slate-600 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Icons.Menu />
        </button>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar - slides from right on mobile, fixed left on md+ */}
      <aside
        className={`fixed right-0 top-0 h-full w-72 max-w-[85vw] flex flex-col z-40 transition-transform duration-300 ease-out md:left-0 md:right-auto ${
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 m-2 md:m-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/20 overflow-hidden transition-colors duration-300 flex flex-col">
          <div className="p-4 md:p-6 border-b border-slate-200 dark:border-white/[0.06] flex items-start justify-between gap-3">
            <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 group min-w-0">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow">
                <span className="text-white"><Icons.Brand /></span>
              </div>
              <div className="min-w-0">
                <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight block truncate">Brian Moses</span>
                <span className="text-xs text-slate-500 dark:text-white/40 font-medium">CMS</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-lg text-slate-500 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close menu"
            >
              <Icons.X />
            </button>
          </div>
          <div className="px-4 md:px-6 pb-2 pt-4">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] mb-4">
              <div className="w-2 h-2 flex-shrink-0 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-600 dark:text-white/50 truncate">{session.email}</span>
            </div>
          </div>
          <nav className="p-4 space-y-0.5 flex-1 overflow-y-auto">
            {navLinks}
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
      <main className="relative md:ml-72 min-h-screen p-4 pt-14 md:pt-8 md:p-8">{children}</main>
    </div>
  );
}
