/**
 * In-memory store for preview drafts. Drafts expire after 30 minutes.
 * For production with multiple instances, consider Redis or similar.
 */
const TTL_MS = 30 * 60 * 1000; // 30 minutes
const store = new Map<
  string,
  {
    content?: Record<string, string>;
    ctas?: Array<{ id: string; text: string; url: string; style: string; placement: string; page: string }>;
    testimonials?: Array<{ id: string; header: string; body: string; author: string; title: string; image: string; order: number }>;
    expires: number;
  }
>();

function prune() {
  const now = Date.now();
  for (const [id, data] of store.entries()) {
    if (data.expires < now) store.delete(id);
  }
}

export function setDraft(
  draftId: string,
  data: {
    content?: Record<string, string>;
    ctas?: Array<{ id: string; text: string; url: string; style: string; placement: string; page: string }>;
    testimonials?: Array<{ id: string; header: string; body: string; author: string; title: string; image: string; order: number }>;
  }
) {
  prune();
  store.set(draftId, {
    ...data,
    expires: Date.now() + TTL_MS,
  });
}

export function getDraft(draftId: string) {
  const data = store.get(draftId);
  if (!data || data.expires < Date.now()) return null;
  return data;
}

export function generateDraftId() {
  return `preview_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}
