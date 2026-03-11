"use client";

import { useState, useEffect, useRef } from "react";
import { DEFAULT_TESTIMONIALS } from "@/lib/default-testimonials";
import Toast from "@/components/dashboard/Toast";
import PreviewButton from "@/components/dashboard/PreviewButton";
import { Icons } from "@/components/dashboard/icons";

type Testimonial = {
  id: string;
  header: string;
  body: string;
  author: string;
  title: string;
  image: string;
  order: number;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<Partial<Testimonial>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant?: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    header: "",
    body: "",
    author: "",
    title: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<"add" | "edit" | null>(null);

  function load() {
    fetch("/api/testimonials", { credentials: "include" })
      .then((r) => r.json())
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function showSuccess() {
    setToast({ message: "Saved! Changes are now live." });
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast({ message: "Please select an image (JPEG, PNG, WebP, or GIF)", variant: "error" });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || "Upload failed");
      }
      const data = (await res.json()) as { url: string };
      const target = uploadTargetRef.current;
      if (target === "add") setForm((p) => ({ ...p, image: data.url }));
      else if (target === "edit") setEditingForm((p) => ({ ...p, image: data.url }));
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : "Upload failed", variant: "error" });
    } finally {
      setUploading(false);
      uploadTargetRef.current = null;
      e.target.value = "";
    }
  }

  function triggerUpload(target: "add" | "edit") {
    uploadTargetRef.current = target;
    fileInputRef.current?.click();
  }

  async function save(id: string, data: Partial<Testimonial>) {
    setSaving(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditing(null);
      setEditingForm({});
      showSuccess();
    } catch (e) {
      setToast({ message: "Failed to save", variant: "error" });
    } finally {
      setSaving(null);
    }
  }

  function startEdit(t: Testimonial) {
    setEditing(t.id);
    setEditingForm({ header: t.header, body: t.body, author: t.author, title: t.title, image: t.image });
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setToast({ message: "Deleted." });
    } catch (e) {
      setToast({ message: "Failed to delete", variant: "error" });
    }
  }

  async function addNew(ev: React.FormEvent) {
    ev.preventDefault();
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, order: testimonials.length }),
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((json as { error?: string }).error || `Server error ${res.status}`);
      }
      setForm({ header: "", body: "", author: "", title: "", image: "" });
      setShowAddForm(false);
      showSuccess();
      load();
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : "Failed to add", variant: "error" });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500 dark:text-white/50">
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  const list = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS.map((t, i) => ({ ...t, id: `default-${i}` }));

  return (
    <div className="w-full max-w-7xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileSelect}
      />
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">Testimonials</h1>
          <p className="mt-1 text-slate-500 dark:text-white/50">Edit testimonials — image, quote, author, and title. Add, Edit, Delete, Save.</p>
        </div>
        <div className="flex items-center gap-3">
          <PreviewButton
            getDraftData={async () => {
              let draft = list.map((t) => ({
                id: t.id,
                header: t.header,
                body: t.body,
                author: t.author,
                title: t.title,
                image: t.image,
                order: t.order,
              }));
              if (form.header && form.body && form.author && form.image) {
                draft = [
                  ...draft,
                  {
                    id: "preview-new",
                    header: form.header,
                    body: form.body,
                    author: form.author,
                    title: form.title,
                    image: form.image,
                    order: draft.length,
                  },
                ];
              }
              return { testimonials: draft };
            }}
            targetUrl="/"
            label="Preview"
          />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all font-medium"
          >
            <Icons.Plus />
            Add testimonial
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={addNew} className="mb-8 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-emerald-500/20 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add new testimonial</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Author</label>
              <input
                value={form.author}
                onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Image</label>
              <div className="flex gap-2">
                <input
                  value={form.image}
                  onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white"
                  placeholder="Paste URL or upload from PC"
                  required
                />
                <button
                  type="button"
                  onClick={() => triggerUpload("add")}
                  disabled={uploading}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 font-medium whitespace-nowrap disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload from PC"}
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Header (quote highlight)</label>
              <input
                value={form.header}
                onChange={(e) => setForm((p) => ({ ...p, header: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 dark:text-white/70 mb-1">Body (full quote)</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white min-h-[80px]"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <PreviewButton
              getDraftData={async () => {
                let draft = list.map((t) => ({ id: t.id, header: t.header, body: t.body, author: t.author, title: t.title, image: t.image, order: t.order }));
                if (form.header && form.body && form.author && form.image) {
                  draft = [...draft, { id: "preview-new", header: form.header, body: form.body, author: form.author, title: form.title, image: form.image, order: draft.length }];
                }
                return { testimonials: draft };
              }}
              targetUrl="/"
              label="Preview"
              compact
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600">
              Add
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {list.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex gap-6 shadow-sm dark:shadow-none"
          >
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 flex-shrink-0">
              {(t.image?.startsWith("/") || t.image?.startsWith("http")) ? (
                <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-white/40 text-xs">No image</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {editing === t.id ? (
                <div className="space-y-3">
                  <input
                    value={editingForm.header ?? ""}
                    onChange={(e) => setEditingForm((p) => ({ ...p, header: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white text-sm"
                    placeholder="Header"
                  />
                  <textarea
                    value={editingForm.body ?? ""}
                    onChange={(e) => setEditingForm((p) => ({ ...p, body: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm min-h-[60px]"
                    placeholder="Body"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={editingForm.author ?? ""}
                      onChange={(e) => setEditingForm((p) => ({ ...p, author: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      placeholder="Author"
                    />
                    <input
                      value={editingForm.title ?? ""}
                      onChange={(e) => setEditingForm((p) => ({ ...p, title: e.target.value }))}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      placeholder="Title"
                    />
                    <div className="col-span-2 flex gap-2">
                      <input
                        value={editingForm.image ?? ""}
                        onChange={(e) => setEditingForm((p) => ({ ...p, image: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-sm"
                        placeholder="Image URL or upload from PC"
                      />
                      <button
                        type="button"
                        onClick={() => triggerUpload("edit")}
                        disabled={uploading}
                        className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 whitespace-nowrap disabled:opacity-50"
                      >
                        {uploading ? "..." : "Upload"}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <PreviewButton
                      getDraftData={async () => {
                        const draft = list.map((t) =>
                          t.id === editing
                            ? {
                                id: t.id,
                                header: editingForm.header ?? t.header,
                                body: editingForm.body ?? t.body,
                                author: editingForm.author ?? t.author,
                                title: editingForm.title ?? t.title,
                                image: editingForm.image ?? t.image,
                                order: t.order,
                              }
                            : { id: t.id, header: t.header, body: t.body, author: t.author, title: t.title, image: t.image, order: t.order }
                        );
                        return { testimonials: draft };
                      }}
                      targetUrl="/"
                      label="Preview"
                      compact
                    />
                    <button
                      onClick={async () => {
                        const data = { ...editingForm, header: editingForm.header!, body: editingForm.body!, author: editingForm.author!, title: editingForm.title ?? "", image: editingForm.image! };
                        if (t.id.startsWith("default")) {
                          try {
                            setSaving(t.id);
                            const res = await fetch("/api/testimonials", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ ...data, order: testimonials.length }),
                              credentials: "include",
                            });
                            const json = await res.json().catch(() => ({}));
                            if (!res.ok) {
                              throw new Error((json as { error?: string }).error || `Server error ${res.status}`);
                            }
                            showSuccess();
                            setEditing(null);
                            setEditingForm({});
                            load();
                          } catch (e) {
                            alert(e instanceof Error ? e.message : "Failed to add");
                          } finally {
                            setSaving(null);
                          }
                        } else {
                          await save(t.id, data);
                        }
                      }}
                      disabled={saving === t.id}
                      className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 disabled:opacity-50"
                    >
                      {saving === t.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingForm({ header: t.header, body: t.body, author: t.author, title: t.title, image: t.image })}
                      className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/30"
                      title="Revert to last saved"
                    >
                      Undo
                    </button>
                    <button onClick={() => { setEditing(null); setEditingForm({}); }} className="px-4 py-2 rounded-lg text-slate-500 dark:text-white/50 text-sm hover:bg-slate-100 dark:hover:bg-white/5">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-slate-900 dark:text-white font-semibold truncate">{t.header}</p>
                  <p className="text-slate-600 dark:text-white/70 text-sm mt-1 line-clamp-2">{t.body}</p>
                  <p className="text-slate-500 dark:text-white/50 text-xs mt-2">
                    {t.author} — {t.title}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(t)}
                      className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 text-sm font-medium hover:bg-slate-200 dark:hover:bg-white/[0.1]"
                    >
                      Edit
                    </button>
                    {!t.id.startsWith("default") && (
                      <button
                        onClick={() => remove(t.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <p className="text-slate-500 dark:text-white/50 text-center py-8 border-t border-slate-200 dark:border-white/10 mt-8 pt-8">
          No testimonials in database yet. The homepage shows defaults. Add above or run <code className="bg-white/10 px-2 py-1 rounded">npx prisma db seed</code> to save to the database.
        </p>
      )}

      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
