"use client";

import { useState, useEffect, useRef } from "react";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import Toast from "@/components/dashboard/Toast";
import PreviewButton from "@/components/dashboard/PreviewButton";
import DashboardSelect from "@/components/dashboard/DashboardSelect";
import { Icons } from "@/components/dashboard/icons";
import { EXTRA_SOCIAL_PLATFORMS } from "@/lib/social-icons";

const SOCIAL_KEYS = [
  { key: "social.facebook", label: "Facebook URL", placeholder: "https://www.facebook.com/..." },
  { key: "social.instagram", label: "Instagram URL", placeholder: "https://www.instagram.com/..." },
  { key: "social.linkedin", label: "LinkedIn URL", placeholder: "https://www.linkedin.com/in/..." },
  { key: "social.youtube", label: "YouTube URL", placeholder: "https://www.youtube.com/@..." },
  { key: "contact.email", label: "Contact Email", placeholder: "your@email.com" },
  { key: "contact.phone", label: "Contact Phone", placeholder: "+1 234 567 8900" },
];

const BUILTIN_KEYS = new Set(SOCIAL_KEYS.map((k) => k.key));

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "") || "custom";
}

export default function SocialPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ label: "", value: "", type: "social" as "social" | "contact", platform: "tiktok" });
  const [toast, setToast] = useState<{ message: string; variant?: "success" | "error" } | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

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

  async function save(key: string, value: string) {
    setSaving(key);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, page: "all", section: "Social" }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data as { error?: string }).error || (res.status === 401 ? "Session expired. Please log in again." : "Failed to save");
        setToast({ message: msg, variant: "error" });
        return;
      }
      setContent((prev) => ({ ...prev, [key]: value }));
      setSavedContent((prev) => ({ ...prev, [key]: value }));
      setToast({ message: "Saved! Changes are now live." });
    } catch (e) {
      setToast({ message: "Failed to save", variant: "error" });
    } finally {
      setSaving(null);
    }
  }

  async function remove(key: string) {
    if (!confirm(`Remove this link?`)) return;
    try {
      const res = await fetch(`/api/content?key=${encodeURIComponent(key)}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ message: (data as { error?: string }).error || "Failed to delete", variant: "error" });
        return;
      }
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
      setToast({ message: "Removed." });
    } catch (e) {
      setToast({ message: "Failed to delete", variant: "error" });
    }
  }

  async function addNew(e: React.FormEvent) {
    e.preventDefault();
    const value = addForm.value.trim();
    if (!value) return;
    let key: string;
    if (addForm.type === "social") {
      key = `social.${addForm.platform}`;
    } else {
      const label = addForm.label.trim();
      if (!label) return;
      const slug = slugify(label);
      key = `contact.${slug}`;
    }
    if (BUILTIN_KEYS.has(key)) {
      setToast({ message: "A link with this name already exists.", variant: "error" });
      return;
    }
    await save(key, value);
    setAddForm({ label: "", value: "", type: "social", platform: "tiktok" });
    setShowAddForm(false);
  }

  const customEntries = Object.keys(content)
    .filter((k) => (k.startsWith("social.") || k.startsWith("contact.")) && !BUILTIN_KEYS.has(k))
    .sort()
    .map((key) => {
      const label = key.split(".")[1]?.replace(/([a-z])([A-Z])/g, "$1 $2") || key;
      return { key, label: label.charAt(0).toUpperCase() + label.slice(1) };
    });

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/50">
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">Social & Contact</h1>
          <p className="mt-1 text-slate-500 dark:text-white/50">
            Update your social media links and contact info. These appear in the site footer.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PreviewButton
            getDraftData={async () => ({ content: contentRef.current })}
            targetUrl="/"
            label="Preview"
          />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all font-medium"
          >
            <Icons.Plus />
            Add
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={addNew} className="mb-6 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-emerald-500/20">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add new link</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Type</label>
              <DashboardSelect
                value={addForm.type === "social" ? "Social link" : "Contact"}
                onChange={(v) => setAddForm((p) => ({ ...p, type: v === "Contact" ? "contact" : "social" }))}
                options={["Social link", "Contact"]}
                className="w-full"
              />
            </div>
            {addForm.type === "social" ? (
              <div>
                <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Platform (icon)</label>
                <DashboardSelect
                  value={EXTRA_SOCIAL_PLATFORMS.find((p) => p.slug === addForm.platform)?.label ?? "TikTok"}
                  onChange={(v) => {
                    const p = EXTRA_SOCIAL_PLATFORMS.find((x) => x.label === v);
                    setAddForm((prev) => ({ ...prev, platform: p?.slug ?? "tiktok" }));
                  }}
                  options={EXTRA_SOCIAL_PLATFORMS.map((p) => p.label)}
                  className="w-full"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Label (e.g. Website)</label>
                <input
                  value={addForm.label}
                  onChange={(e) => setAddForm((p) => ({ ...p, label: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  placeholder="Website"
                  required={addForm.type === "contact"}
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">URL or value</label>
              <input
                type="text"
                value={addForm.value}
                onChange={(e) => setAddForm((p) => ({ ...p, value: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                placeholder="https://... or email or phone"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600">
              Add
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_KEYS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">{label}</label>
              <div className="flex gap-2 items-center flex-wrap">
                <input
                  type={key.includes("email") ? "email" : "text"}
                  value={content[key] ?? ""}
                  onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if ((content[key] ?? "").trim() !== (savedContent[key] ?? "")) save(key, (content[key] ?? "").trim());
                    }
                  }}
                  placeholder={placeholder}
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                />
                <PreviewButton
                  getDraftData={async () => ({ content: contentRef.current })}
                  targetUrl="/"
                  label="Preview"
                  compact
                />
                <button
                  onClick={() => save(key, (content[key] ?? "").trim())}
                  disabled={saving === key || (content[key] ?? "").trim() === (savedContent[key] ?? "")}
                  className="px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving === key ? (
                    <span className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          ))}
          {customEntries.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">{label}</label>
              <div className="flex gap-2 items-center flex-wrap">
                <input
                  type="text"
                  value={content[key] ?? ""}
                  onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if ((content[key] ?? "").trim() !== (savedContent[key] ?? "")) save(key, (content[key] ?? "").trim());
                    }
                  }}
                  placeholder="https://... or value"
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                />
                <PreviewButton
                  getDraftData={async () => ({ content: contentRef.current })}
                  targetUrl="/"
                  label="Preview"
                  compact
                />
                <button
                  onClick={() => save(key, (content[key] ?? "").trim())}
                  disabled={saving === key || (content[key] ?? "").trim() === (savedContent[key] ?? "")}
                  className="px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving === key ? (
                    <span className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  onClick={() => remove(key)}
                  className="p-3 rounded-xl text-red-500 dark:text-red-400/80 hover:bg-red-100 dark:hover:bg-red-500/20"
                  title="Remove"
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
