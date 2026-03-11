"use client";

import { useState, useEffect } from "react";
import { Icons } from "@/components/dashboard/icons";
import Toast from "@/components/dashboard/Toast";

type HistoryEntry = {
  id: string;
  action: string;
  targetLabel: string;
  changedBy: string;
  changedAt: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function actionLabel(action: string) {
  switch (action) {
    case "content":
      return "Content";
    case "cta":
      return "CTA";
    case "testimonial":
      return "Testimonial";
    default:
      return action;
  }
}

export default function DashboardHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteAllEntire, setDeleteAllEntire] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant?: "success" | "error" } | null>(null);

  const fetchHistory = () => {
    fetch("/api/history?limit=50", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const allIds = history.map((e) => e.id);
  const allSelected = history.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0;
  const canDelete = deleteAllEntire || someSelected;

  const toggleSelect = (id: string) => {
    setDeleteAllEntire(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (deleteAllEntire) {
      setDeleteAllEntire(false);
      setSelected(new Set());
    } else {
      setDeleteAllEntire(true);
      setSelected(new Set());
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setSelected(new Set());
    setDeleteAllEntire(false);
  };

  async function handleDelete() {
    if (!canDelete) return;
    setDeleting(true);
    try {
      const body = deleteAllEntire ? { deleteAll: true } : { ids: Array.from(selected) };
      const res = await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ message: (data as { error?: string }).error || "Failed to delete", variant: "error" });
        return;
      }
      setSelected(new Set());
      setDeleteAllEntire(false);
      exitEditMode();
      fetchHistory();
      const count = (data as { deleted?: number }).deleted ?? 0;
      setToast({ message: `Deleted ${count} history item(s).` });
    } catch (e) {
      setToast({ message: "Failed to delete history.", variant: "error" });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-slate-500 dark:text-white/50">
            <Icons.Clock />
          </span>
          Recent changes
        </h2>
        <div className="flex items-center gap-3 text-slate-500 dark:text-white/50">
          <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-slate-500 dark:text-white/50">
            <Icons.Clock />
          </span>
          Recent changes
        </h2>
        <p className="text-slate-500 dark:text-white/50 text-sm">No changes yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-slate-500 dark:text-white/50">
            <Icons.Clock />
          </span>
          Recent changes
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          {editMode ? (
            <>
              <button
                onClick={exitEditMode}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors"
              >
                Done
              </button>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={deleteAllEntire}
                  ref={(el) => {
                    if (el) (el as HTMLInputElement & { indeterminate?: boolean }).indeterminate = someSelected && !deleteAllEntire;
                  }}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 dark:border-white/30 text-emerald-500 focus:ring-emerald-500/50"
                />
                Select all (entire history)
              </label>
              <button
                onClick={handleDelete}
                disabled={!canDelete || deleting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-red-500/30"
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                ) : (
                  <Icons.Trash />
                )}
                {deleteAllEntire ? "Delete entire history" : `Delete selected ${someSelected ? `(${selected.size})` : ""}`}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10"
            >
              <Icons.Pencil />
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-start gap-4 py-2 border-b border-slate-100 dark:border-white/[0.06] last:border-0 ${
              selected.has(entry.id) ? "bg-slate-50 dark:bg-white/[0.04]" : ""
            }`}
          >
            {editMode && (
              <input
                type="checkbox"
                checked={deleteAllEntire || selected.has(entry.id)}
                disabled={deleteAllEntire}
                onChange={() => toggleSelect(entry.id)}
                className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-white/30 text-emerald-500 focus:ring-emerald-500/50 shrink-0 disabled:opacity-50"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {entry.targetLabel}
              </p>
              <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">
                {actionLabel(entry.action)} · {entry.changedBy}
              </p>
            </div>
            <span className="text-xs text-slate-400 dark:text-white/40 whitespace-nowrap shrink-0">
              {formatDate(entry.changedAt)}
            </span>
          </div>
        ))}
      </div>
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
