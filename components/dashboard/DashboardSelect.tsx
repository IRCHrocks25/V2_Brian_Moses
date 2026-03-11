"use client";

import { useState, useRef, useEffect } from "react";

type DashboardSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  className?: string;
  placeholder?: string;
};

export default function DashboardSelect({ value, onChange, options, className = "", placeholder }: DashboardSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-left"
      >
        <span>{value || placeholder || "Select..."}</span>
        <svg className="w-4 h-4 shrink-0 text-slate-400 dark:text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[140px] rounded-xl border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-slate-800 shadow-lg dark:shadow-black/50 py-1 max-h-48 overflow-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors
                ${opt === value
                  ? "bg-emerald-500/20 text-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "text-slate-700 dark:text-white/90 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
