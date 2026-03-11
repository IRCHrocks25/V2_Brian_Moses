"use client";

import { useState } from "react";

type PreviewButtonProps = {
  getDraftData: () => Promise<{
    content?: Record<string, string>;
    ctas?: Array<{ id: string; text: string; url: string; style: string; placement: string; page: string }>;
    testimonials?: Array<{ id: string; header: string; body: string; author: string; title: string; image: string; order: number }>;
  }>;
  targetUrl?: string;
  label?: string;
  compact?: boolean;
};

export default function PreviewButton({
  getDraftData,
  targetUrl = "/",
  label = "Preview",
  compact = false,
}: PreviewButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handlePreview() {
    setLoading(true);
    try {
      const draft = await getDraftData();
      const res = await fetch("/api/preview/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create preview");
      const { draftId } = await res.json();
      const url = new URL(targetUrl, window.location.origin);
      url.searchParams.set("preview", draftId);
      window.open(url.toString(), "_blank", "noopener");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Preview failed");
    } finally {
      setLoading(false);
    }
  }

  const icon = loading ? (
    <span className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin shrink-0" />
  ) : (
    <svg className={compact ? "w-4 h-4 shrink-0" : "w-5 h-5 shrink-0"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={handlePreview}
      disabled={loading}
      className={`flex items-center gap-1.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 transition-all font-medium disabled:opacity-50 ${
        compact ? "px-3 py-1.5 text-sm rounded-lg" : "px-4 py-2.5 gap-2"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
