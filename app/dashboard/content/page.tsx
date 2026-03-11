"use client";

import { useState, useEffect, useRef } from "react";
import { CONTENT_KEYS } from "@/lib/content-keys";
import { DEFAULT_CONTENT } from "@/lib/default-content";
import Toast from "@/components/dashboard/Toast";
import DashboardSelect from "@/components/dashboard/DashboardSelect";
import PreviewButton from "@/components/dashboard/PreviewButton";
import { Icons } from "@/components/dashboard/icons";

type ContentItem = { key: string; label: string; page: string; section: string };

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});
  const beforeLastSaveRef = useRef<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ key: "", label: "", value: "", page: "home", section: "Custom" });
  const [toast, setToast] = useState<{ message: string; variant?: "success" | "error" } | null>(null);
  const [previewPage, setPreviewPage] = useState("/");
  const contentRef = useRef(content);
  contentRef.current = content;

  const updateContent = (key: string, value: string) => {
    setContent((prev) => {
      const next = { ...prev, [key]: value };
      contentRef.current = next;
      return next;
    });
  };

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("saved") === "1") {
        setToast({ message: "Saved! Your changes are now live on the site." });
        window.history.replaceState({}, "", "/dashboard/content");
      }
    }
  }, []);

  function undo(key: string) {
    // Revert unsaved edits, or undo last save if no unsaved edits
    const currentVal = content[key] ?? "";
    const savedVal = savedContent[key] ?? DEFAULT_CONTENT[key] ?? "";
    const beforeSaveVal = beforeLastSaveRef.current[key];
    const targetVal =
      currentVal !== savedVal
        ? savedVal // discard unsaved edits
        : beforeSaveVal !== undefined
          ? beforeSaveVal // undo last save
          : savedVal;
    setContent((p) => {
      const next = { ...p, [key]: targetVal };
      contentRef.current = next;
      return next;
    });
    if (currentVal === savedVal && beforeSaveVal !== undefined) {
      delete beforeLastSaveRef.current[key];
      const meta = CONTENT_KEYS.find((c) => c.key === key);
      save(key, targetVal, meta?.page || "home", meta?.section, true);
    }
  }

  async function save(key: string, value: string, page = "home", section?: string, isUndo = false) {
    if (!isUndo) {
      beforeLastSaveRef.current[key] = savedContent[key] ?? DEFAULT_CONTENT[key] ?? "";
    }
    setSaving(key);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, page, section }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = res.status === 401 ? "Session expired. Please log in again." : (data as { error?: string }).error || "Failed to save";
        // Revert UI to last saved state
        const reverted = savedContent[key] ?? DEFAULT_CONTENT[key] ?? "";
        setContent((p) => {
          const next = { ...p, [key]: reverted };
          contentRef.current = next;
          return next;
        });
        if (!isUndo) delete beforeLastSaveRef.current[key];
        else beforeLastSaveRef.current[key] = value;
        setToast({ message: msg, variant: "error" });
        return;
      }
      setContent((prev) => ({ ...prev, [key]: value }));
      setSavedContent((prev) => ({ ...prev, [key]: value }));
      setToast({ message: "Saved! Changes are now live." });
    } catch (e) {
      const reverted = savedContent[key] ?? DEFAULT_CONTENT[key] ?? "";
      setContent((p) => {
        const next = { ...p, [key]: reverted };
        contentRef.current = next;
        return next;
      });
      if (!isUndo) delete beforeLastSaveRef.current[key];
      else beforeLastSaveRef.current[key] = value;
      setToast({ message: "Failed to save. Please try again.", variant: "error" });
    } finally {
      setSaving(null);
      setEditing(null);
    }
  }

  async function remove(key: string) {
    if (!confirm(`Remove "${key}"? The site will use the default value.`)) return;
    try {
      const res = await fetch(`/api/content?key=${encodeURIComponent(key)}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = res.status === 401 ? "Session expired. Please log in again." : (data as { error?: string }).error || "Failed to delete";
        setToast({ message: msg, variant: "error" });
        setEditing(null);
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
      setToast({ message: "Deleted. Site will use default." });
    } catch (e) {
      setToast({ message: "Failed to delete.", variant: "error" });
    }
    setEditing(null);
  }

  async function addNew(e: React.FormEvent) {
    e.preventDefault();
    if (!addForm.key.trim()) return;
    const key = addForm.key.trim().toLowerCase().replace(/\s+/g, ".");
    await save(key, addForm.value, addForm.page, addForm.section);
    setAddForm({ key: "", label: "", value: "", page: "home", section: "Custom" });
    setShowAddForm(false);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/50">
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  const bySection = CONTENT_KEYS.reduce(
    (acc, item) => {
      const sec = item.section || "Other";
      if (!acc[sec]) acc[sec] = [];
      acc[sec].push(item);
      return acc;
    },
    {} as Record<string, ContentItem[]>
  );

  // Add custom keys from DB that aren't in CONTENT_KEYS
  const knownKeys = new Set<string>(CONTENT_KEYS.map((c) => c.key));
  for (const key of Object.keys(content)) {
    if (!knownKeys.has(key) && content[key]) {
      const sec = "Custom";
      if (!bySection[sec]) bySection[sec] = [];
      bySection[sec].push({ key, label: key, page: "home", section: sec });
    }
  }

  const isImageKey = (key: string) => key.startsWith("bg.") || (key.startsWith("program") && key.endsWith(".image")) || key.startsWith("img.");
  const imageItems = CONTENT_KEYS.filter((c) => isImageKey(c.key));

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">Content</h1>
          <p className="mt-1 text-slate-500 dark:text-white/50">Edit copy and images. Each item has Edit, Delete, and you can Add new.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <DashboardSelect
            value={previewPage === "/" ? "Home" : previewPage === "/keynote" ? "Keynote" : "Attract Business"}
            onChange={(v) => setPreviewPage(v === "Home" ? "/" : v === "Keynote" ? "/keynote" : "/attract-business")}
            options={["Home", "Keynote", "Attract Business"]}
            className="w-36"
          />
          <PreviewButton
            getDraftData={async () => ({ content: contentRef.current })}
            targetUrl={previewPage}
            label="Preview"
          />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all font-medium"
          >
            <Icons.Plus />
            Add new
          </button>
        </div>
      </div>

      {/* Add new form */}
      {showAddForm && (
        <form onSubmit={addNew} className="mb-8 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-emerald-500/20">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add custom content</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Key (e.g. custom.headline)</label>
              <input
                value={addForm.key}
                onChange={(e) => setAddForm((p) => ({ ...p, key: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                placeholder="custom.headline"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Label</label>
              <input
                value={addForm.label}
                onChange={(e) => setAddForm((p) => ({ ...p, label: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                placeholder="Custom Headline"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Value</label>
              <input
                value={addForm.value}
                onChange={(e) => setAddForm((p) => ({ ...p, value: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                placeholder="Your content..."
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Page</label>
              <DashboardSelect
                value={addForm.page}
                onChange={(v) => setAddForm((p) => ({ ...p, page: v }))}
                options={["home", "keynote", "attract-business", "all"]}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <PreviewButton
              getDraftData={async () => {
                const k = addForm.key.trim().toLowerCase().replace(/\s+/g, ".");
                const c = contentRef.current;
                return { content: k ? { ...c, [k]: addForm.value } : { ...c } };
              }}
              targetUrl={addForm.page === "keynote" ? "/keynote" : addForm.page === "attract-business" ? "/attract-business" : "/"}
              label="Preview"
              compact
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600">
              Add
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-slate-500 dark:text-white/60 hover:text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Background Images - Visual grid */}
      <div className="mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-500/80"><Icons.Image /></span>
          Background Images
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {imageItems.map(({ key, label }) => (
            <div
              key={key}
              className="group rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] overflow-hidden hover:border-slate-300 dark:hover:border-white/[0.1] transition-all"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-white/5">
                {(content[key] || "").startsWith("/") || (content[key] || "").startsWith("http") ? (
                  <img
                    src={content[key]}
                    alt={label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-900 dark:text-white/40 text-sm">No image</div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-900 dark:text-white/40 text-sm">
                    No image set
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-900 dark:text-white/90 mb-2 truncate">{label}</p>
                {editing === key ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={content[key] ?? ""}
                      onChange={(e) => updateContent(key, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white text-sm"
                      placeholder="/images/... or https://..."
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2">
                      <PreviewButton
                        getDraftData={async () => ({ content: contentRef.current })}
                        targetUrl={CONTENT_KEYS.find((c) => c.key === key)?.page === "keynote" ? "/keynote" : CONTENT_KEYS.find((c) => c.key === key)?.page === "attract-business" ? "/attract-business" : "/"}
                        label="Preview"
                        compact
                      />
                      <button
                        onClick={() => save(key, content[key] ?? "", CONTENT_KEYS.find((c) => c.key === key)?.page || "home")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30"
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
                        className="px-3 py-1.5 rounded-lg text-slate-500 dark:text-white/50 text-sm hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(key)}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/[0.06] text-slate-900 dark:text-white/80 text-sm font-medium hover:bg-white/[0.1] flex items-center justify-center gap-1"
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

      {/* Text content by section */}
      <div className="space-y-12">
        {Object.entries(bySection)
          .filter(([section]) => section !== "Backgrounds")
          .map(([section, items]) => (
            <div key={section} className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{section}</h2>
              <div className="space-y-5">
                {items.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-2 group">
                    <label className="text-sm font-medium text-slate-900 dark:text-white/80">{label}</label>
                    <div className="flex gap-2 items-center flex-wrap">
                      <input
                        type="text"
                        value={content[key] ?? ""}
                        onChange={(e) => updateContent(key, e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                      />
                      <PreviewButton
                        getDraftData={async () => ({ content: contentRef.current })}
                        targetUrl={CONTENT_KEYS.find((c) => c.key === key)?.page === "keynote" ? "/keynote" : CONTENT_KEYS.find((c) => c.key === key)?.page === "attract-business" ? "/attract-business" : "/"}
                        label="Preview"
                        compact
                      />
                      <button
                        onClick={() => save(key, content[key] ?? "", CONTENT_KEYS.find((c) => c.key === key)?.page || "home")}
                        disabled={saving === key}
                        className="px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 disabled:opacity-50 flex items-center gap-2"
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
                        className="px-4 py-3 rounded-xl bg-amber-500/20 text-amber-400 font-medium hover:bg-amber-500/30"
                        title="Revert to last saved"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => remove(key)}
                        className="p-3 rounded-xl text-red-500 dark:text-red-400/80 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
