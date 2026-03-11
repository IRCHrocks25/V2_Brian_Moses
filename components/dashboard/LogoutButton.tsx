"use client";

import { useRouter } from "next/navigation";
import { Icons } from "./icons";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all text-sm font-medium"
    >
      <span className="text-slate-400 dark:text-white/40"><Icons.LogOut /></span>
      Sign out
    </button>
  );
}
