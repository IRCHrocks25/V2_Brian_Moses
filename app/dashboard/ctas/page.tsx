"use client";

import { useState, useEffect } from "react";
import Toast from "@/components/dashboard/Toast";
import DashboardSelect from "@/components/dashboard/DashboardSelect";
import PreviewButton from "@/components/dashboard/PreviewButton";

type CTA = {
  id: string;
  text: string;
  url: string;
  style: string;
  placement: string;
  page: string;
  order: number;
  isActive: boolean;
};

const PLACEMENTS = ["hero", "navbar", "footer", "floating", "section-hero", "section-end", "modal"];
const PAGES = ["home", "keynote", "attract-business", "all"];
const STYLES = ["primary", "secondary", "outline"];

export default function CTAsPage() {
  const [ctas, setCtas] = useState<CTA[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ text: "", url: "", style: "primary", placement: "hero", page: "all", isActive: true });
  const [toast, setToast] = useState<{ message: string; variant?: "success" | "error" } | null>(null);

  function load() {
    fetch("/api/ctas?manage=1", { credentials: "include" })
      .then((r) => r.json())
      .then(setCtas)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/ctas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = res.status === 401 ? "Session expired. Please log in again." : (data as { error?: string }).error || "Failed to create";
      setToast({ message: msg, variant: "error" });
      return;
    }
    setForm({ text: "", url: "", style: "primary", placement: "hero", page: "all", isActive: true });
    setToast({ message: "Saved! Changes are now live." });
    load();
  }

  async function update(id: string, data: Partial<CTA>) {
    const res = await fetch(`/api/ctas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = res.status === 401 ? "Session expired. Please log in again." : (data as { error?: string }).error || "Failed to update";
      setToast({ message: msg, variant: "error" });
      return;
    }
    setEditing(null);
    setToast({ message: "Saved! Changes are now live." });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this CTA?")) return;
    const res = await fetch(`/api/ctas/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = res.status === 401 ? "Session expired. Please log in again." : (data as { error?: string }).error || "Failed to delete";
      setToast({ message: msg, variant: "error" });
      return;
    }
    setToast({ message: "Deleted." });
    load();
  }

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
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">CTAs</h1>
          <p className="mt-1 text-slate-500 dark:text-white/50">Add and manage call-to-action buttons across the site.</p>
        </div>
        <PreviewButton
          getDraftData={async () => {
            const draftCtas = [...ctas];
            if (form.text && form.url) {
              draftCtas.push({
                id: "preview-new",
                text: form.text,
                url: form.url,
                style: form.style,
                placement: form.placement,
                page: form.page,
              });
            }
            return { ctas: draftCtas };
          }}
          targetUrl="/"
          label="Preview"
        />
      </div>

      {/* Create form */}
      <form onSubmit={create} className="mb-10 p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Add CTA</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">Button Text</label>
            <input
              value={form.text}
              onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="See the System"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="https://..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">Placement</label>
            <DashboardSelect
              value={form.placement}
              onChange={(v) => setForm((p) => ({ ...p, placement: v }))}
              options={PLACEMENTS}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-white/70 mb-2">Page</label>
            <DashboardSelect
              value={form.page}
              onChange={(v) => setForm((p) => ({ ...p, page: v }))}
              options={PAGES}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-slate-700 dark:text-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
              className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
            />
            Active
          </label>
          <PreviewButton
            getDraftData={async () => {
              const draftCtas = [...ctas];
              if (form.text && form.url) {
                draftCtas.push({
                  id: "preview-new",
                  text: form.text,
                  url: form.url,
                  style: form.style,
                  placement: form.placement,
                  page: form.page,
                } as CTA);
              }
              return { ctas: draftCtas };
            }}
            targetUrl={form.page === "keynote" ? "/keynote" : form.page === "attract-business" ? "/attract-business" : "/"}
            label="Preview"
            compact
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/20 transition-all"
          >
            Add CTA
          </button>
        </div>
      </form>

      {/* List */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Existing CTAs</h2>
        {ctas.length === 0 ? (
          <p className="text-slate-500 dark:text-white/50 py-8">No CTAs yet. Add one above.</p>
        ) : (
          <div className="space-y-3">
            {ctas.map((cta) => (
              <div
                key={cta.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.1] transition-colors shadow-sm dark:shadow-none"
              >
                {editing === cta.id ? (
                  <div className="flex-1 flex flex-wrap gap-3 items-center">
                    <input
                      defaultValue={cta.text}
                      onBlur={(e) => update(cta.id, { text: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white w-40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <input
                      defaultValue={cta.url}
                      onBlur={(e) => update(cta.id, { url: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] border-2 border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <DashboardSelect
                      value={cta.placement}
                      onChange={(v) => update(cta.id, { placement: v })}
                      options={PLACEMENTS}
                      className="min-w-[120px]"
                    />
                    <DashboardSelect
                      value={cta.page}
                      onChange={(v) => update(cta.id, { page: v })}
                      options={PAGES}
                      className="min-w-[120px]"
                    />
                    <label className="flex items-center gap-2 text-slate-600 dark:text-white/70">
                      <input
                        type="checkbox"
                        defaultChecked={cta.isActive}
                        onChange={(e) => update(cta.id, { isActive: e.target.checked })}
                        className="rounded border-white/20 bg-white/5"
                      />
                      Active
                    </label>
                    <PreviewButton
                      getDraftData={async () => ({ ctas })}
                      targetUrl={cta.page === "keynote" ? "/keynote" : cta.page === "attract-business" ? "/attract-business" : "/"}
                      label="Preview"
                      compact
                    />
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-900 dark:text-white font-medium">{cta.text}</span>
                    <span className="text-slate-400 dark:text-white/40 mx-2">→</span>
                    <span className="text-slate-600 dark:text-white/60 truncate">{cta.url}</span>
                    <span className="ml-2 text-xs text-slate-400 dark:text-white/40">({cta.placement} / {cta.page})</span>
                  </div>
                )}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditing(editing === cta.id ? null : cta.id)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all"
                  >
                    {editing === cta.id ? "Done" : "Edit"}
                  </button>
                  <button
                    onClick={() => remove(cta.id)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 dark:text-red-400/90 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
