"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/dashboard/Toast";

const PREVIEW_PAGES = ["/", "/keynote", "/attract-business"];

export default function PreviewBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const preview = searchParams.get("preview");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const isPreviewMode = Boolean(preview && PREVIEW_PAGES.includes(pathname ?? ""));

  // Prevent search engines from indexing preview URLs — preview is testing only, not public
  useEffect(() => {
    if (!isPreviewMode) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [isPreviewMode]);

  if (!isPreviewMode) return null;

  const exitPreview = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    router.push(url.pathname + url.search);
  };

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    setSavedToast(false);
    try {
      const res = await fetch("/api/preview/draft/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: preview }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage((data as { error?: string }).error || "Failed to save");
        return;
      }
      setSavedToast(true);
      setTimeout(() => {
        window.location.href = "/dashboard/content?saved=1";
      }, 1500);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-center gap-4 bg-amber-500/95 px-4 py-2.5 text-sm font-medium text-amber-950 shadow-lg flex-wrap">
      <span>Preview mode — testing only, not live. Changes go public when you click Save.</span>
      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
      <button
        onClick={exitPreview}
        disabled={saving}
        className="rounded-lg bg-amber-900/20 px-3 py-1 font-semibold hover:bg-amber-900/30 transition-colors disabled:opacity-60"
      >
        Exit preview
      </button>
      <Link
        href="/dashboard/content"
        className="rounded-lg bg-amber-900/20 px-3 py-1 font-semibold hover:bg-amber-900/30 transition-colors"
      >
        Back to Content
      </Link>
      {message && <span className="text-amber-950/80">{message}</span>}
      {savedToast && (
        <Toast
          message="Saved! Your changes are now live on the site."
          onClose={() => setSavedToast(false)}
          duration={1500}
        />
      )}
    </div>
  );
}
