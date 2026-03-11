"use client";

import { useTheme } from "./ThemeContext";
import { Icons } from "./icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-all text-sm font-medium"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <>
          <span className="text-slate-400 dark:text-white/40"><Icons.Sun /></span>
          Light mode
        </>
      ) : (
        <>
          <span className="text-slate-400 dark:text-white/40"><Icons.Moon /></span>
          Dark mode
        </>
      )}
    </button>
  );
}
