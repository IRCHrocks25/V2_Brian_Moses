"use client";

import { useState, useEffect } from "react";
import { CONTENT_KEYS } from "@/lib/content-keys";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import Link from "next/link";
import Toast from "@/components/dashboard/Toast";
import { Icons } from "./icons";

type ContentItem = { key: string; label: string; page: string; section: string };

const HERO_KEYS = CONTENT_KEYS.filter((c) => c.section === "Hero" && c.page === "home");
const IMAGE_KEYS = CONTENT_KEYS.filter((c) => c.key.startsWith("bg.") || (c.key.startsWith("program") && c.key.endsWith(".image")) || c.key.startsWith("img."));

export default function DashboardContentEditor() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast() {
    setToast("Saved! Changes are now live.");
  }

  useEffect(() => {
    fetch("/api/content?page=all")
      .then((r) => r.json())
      .then((data) => {
        const merged = { ...DEFAULT_CONTENT, ...data };
        setContent(merged);
        setSavedContent(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function undo(key: string) {
    const val = savedContent[key] ?? DEFAULT_CONTENT[key] ?? "";
    setContent((p) => ({ ...p, [key]: val }));
  }

  async function save(key: string, value: string, page = "home", section?: string) {
    setSaving(key);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, page, section }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setContent((prev) => ({ ...prev, [key]: value }));
      setSavedContent((prev) => ({ ...prev, [key]: value }));
      setEditing(null);
      showToast();
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    } finally {
      setSaving(null);
    }
  }

  async function remove(key: string) {
    if (!confirm(`Remove "${key}"? The site will use the default value.`)) return;
    try {
      const res = await fetch(`/api/content?key=${encodeURIComponent(key)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setContent((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSavedContent((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setEditing(null);
      showToast();
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/50 mt-10">
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Hero Section - Quick Edit */}
      <div className="mt-10 p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Hero Section (Home)</h3>
          <Link href="/dashboard/content" className="text-sm text-emerald-400 hover:text-emerald-300">
            Edit all content →
          </Link>
        </div>
        <div className="space-y-4">
          {HERO_KEYS.map(({ key, label }) => (
            <div key={key} className="group">
              <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-1">{label}</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={content[key] ?? ""}
                  onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                  onFocus={() => setEditing(key)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                  placeholder={label}
                />
                <button
                  onClick={() => save(key, content[key] ?? "", "home", "Hero")}
                  disabled={saving === key}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving === key ? (
                    <span className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                  ) : (
                    <Icons.Check />
                  )}
                  Save
                </button>
                <button
                  onClick={() => undo(key)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-400 font-medium hover:bg-amber-500/30"
                  title="Revert to last saved"
                >
                  Undo
                </button>
                <button
                  onClick={() => remove(key)}
                  className="p-2.5 rounded-xl text-red-400/80 hover:bg-red-500/20 hover:text-red-400"
                  title="Delete"
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Images */}
      <div className="mt-6 p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Background Images</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {IMAGE_KEYS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] overflow-hidden"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-white/5">
                {(content[key] || "").startsWith("/") || (content[key] || "").startsWith("http") ? (
                  <img
                    src={content[key]}
                    alt={label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-slate-400 dark:text-white/40 text-sm">No image</div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-white/40 text-sm">
                    No image set
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-800 dark:text-white/90 mb-2 truncate">{label}</p>
                {editing === key ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={content[key] ?? ""}
                      onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white text-sm"
                      placeholder="/images/... or https://..."
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const item = CONTENT_KEYS.find((c) => c.key === key);
                          save(key, content[key] ?? "", item?.page || "home");
                        }}
                        disabled={saving === key}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 disabled:opacity-50"
                      >
                        {saving === key ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => undo(key)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/30"
                        title="Revert to last saved"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => remove(key)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-3 py-1.5 rounded-lg text-slate-500 dark:text-white/50 text-sm hover:bg-slate-100 dark:hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(key)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 text-sm font-medium hover:bg-slate-200 dark:hover:bg-white/[0.1] flex items-center justify-center gap-1"
                    >
                      <Icons.Pencil />
                      Edit
                    </button>
                    <button
                      onClick={() => remove(key)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400/90 text-sm font-medium hover:bg-red-500/20"
                      title="Delete"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
