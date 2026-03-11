# Dashboard Functions — Technical Reference

## Overview

The admin dashboard is a Next.js application under `app/dashboard/` with server-side authentication via `getSession()` and client components for editing. All write operations require an authenticated session (cookie-based). The dashboard lets admins manage content, CTAs, testimonials, social links, and view change history.

---

## Auth / Session

| Function | Location | Description |
|----------|----------|-------------|
| `getSession()` | `lib/auth.ts` | Reads session cookie, verifies HMAC, returns `{ userId, email, role }` or `null` |
| `createSession()` | `lib/auth.ts` | Creates signed cookie (7-day expiry) |
| `destroySession()` | `lib/auth.ts` | Deletes session cookie |
| `requireAuth()` | API routes | Throws "Unauthorized" if no session; used for protected endpoints |

**APIs:**
- `POST /api/auth/login` — Login with email/password
- `POST /api/auth/logout` — Logout, destroy session
- `GET /api/auth/me` — Check current session

---

## Dashboard Overview

**Page:** `app/dashboard/page.tsx` (server component)

- Renders greeting, quick links (Content, CTAs, Testimonials, Social & Contact)
- Displays `DashboardHistory` component (recent changes)
- Uses `getSession()` for auth; redirects to login if not authenticated

**Quick Links:**
- **Content** — `/dashboard/content`
- **CTAs** — `/dashboard/ctas`
- **Testimonials** — `/dashboard/testimonials`
- **Social & Contact** — `/dashboard/social`

---

## Content Editing

**Page:** `app/dashboard/content/page.tsx` (client)

### Functions

| Function | Description |
|----------|-------------|
| `updateContent(key, value)` | Updates local state and content ref for preview |
| `save(key, value, page, section, isUndo)` | POST to `/api/content`, updates savedContent, handles 401 with toast |
| `remove(key)` | DELETE `/api/content?key=...` to remove a content key |
| `undo(key)` | Reverts unsaved edits or undoes last save via `save(..., true)` |
| `addNew(e)` | Adds custom content key and saves to API |

### APIs

- `GET /api/content?page=all` — Returns merged content (DEFAULT_CONTENT + DB + optional preview draft)
- `POST /api/content` — Body: `{ key, value, page, section }` — Upsert content item
- `DELETE /api/content?key=...` — Remove content key

### Data

- Merges `DEFAULT_CONTENT` with API response
- Content keys defined in `lib/content-keys.ts`
- Supports image keys (bg.*, img.*, program*.image) with visual grid
- Preview loads draft via `?preview=draftId`

---

## CTAs (Call-to-Actions)

**Page:** `app/dashboard/ctas/page.tsx` (client)

### Functions

| Function | Description |
|----------|-------------|
| `load()` | GET `/api/ctas?manage=1` — Load all CTAs (including inactive) |
| `create(e)` | POST `/api/ctas` with form data |
| `update(id, data)` | PATCH `/api/ctas/[id]` — Update CTA |
| `remove(id)` | DELETE `/api/ctas/[id]` — Delete CTA |

### APIs

- `GET /api/ctas?page=...&manage=1&preview=...` — List CTAs (manage=1 includes inactive)
- `POST /api/ctas` — Body: `{ text, url, style, placement, page, order, isActive }`
- `PATCH /api/ctas/[id]` — Partial update
- `DELETE /api/ctas/[id]` — Delete CTA

### Constraints

- **Style:** primary | secondary | outline
- **Placement:** hero, navbar, footer, floating, section-hero, section-end, modal
- **Page:** home, keynote, attract-business, all

---

## Testimonials

**Page:** `app/dashboard/testimonials/page.tsx` (client)

### Functions

| Function | Description |
|----------|-------------|
| `load()` | GET `/api/testimonials` — Load testimonials |
| `handleFileSelect(e)` | Upload via `/api/upload`, sets image URL in form |
| `save(id, data)` | PATCH `/api/testimonials/[id]` — Update testimonial |
| `remove(id)` | DELETE `/api/testimonials/[id]` |
| `addNew(ev)` | POST `/api/testimonials` — Create new testimonial |
| `startEdit(t)` | Enter edit mode with `editingForm` |

### APIs

- `GET /api/testimonials?preview=...` — List testimonials (optional draft)
- `POST /api/testimonials` — Body: `{ header, body, author, title, image, order }`
- `PATCH /api/testimonials/[id]` — Partial update
- `DELETE /api/testimonials/[id]` — Delete
- `POST /api/upload` — FormData with `file` — Returns `{ url }` for uploaded image

---

## Social & Contact

**Page:** `app/dashboard/social/page.tsx` (client)

### Functions

| Function | Description |
|----------|-------------|
| `save(key, value)` | POST `/api/content` for social/contact keys |
| `remove(key)` | DELETE `/api/content?key=...` |
| `addNew(e)` | Adds custom social link (with platform/icon) or contact item |

### Built-in Keys

- `social.facebook`, `social.instagram`, `social.linkedin`, `social.youtube`
- `contact.email`, `contact.phone`

### Custom Links

- **Social:** Platform dropdown (TikTok, Twitter/X, Pinterest, Threads, Snapchat, Other) — icon derived from platform
- **Contact:** Free-text label (e.g. Website)
- Icons rendered via `lib/social-icons.tsx` and `SocialIcon` component in Footer

---

## History of Changes

**Component:** `components/dashboard/DashboardHistory.tsx` (client)

### Functions

| Function | Description |
|----------|-------------|
| `fetchHistory()` | GET `/api/history?limit=50` |
| `handleDelete()` | DELETE `/api/history` with `{ ids }` or `{ deleteAll: true }` |
| `toggleSelect(id)` | Toggle single item selection |
| `toggleSelectAll()` | Toggle "Select all (entire history)" |
| `exitEditMode()` | Exit edit mode, clear selection |

### Edit Mode

- Click **Edit** to show checkboxes and delete controls
- **Select all (entire history)** — Deletes entire history when Delete is clicked
- **Delete selected** — Deletes only checked items

### API

- `GET /api/history?limit=50` — List recent changes (action, targetLabel, changedBy, changedAt)
- `DELETE /api/history` — Body: `{ ids: string[] }` or `{ deleteAll: true }` — Returns `{ deleted }`

---

## Preview

**Component:** `components/dashboard/PreviewButton.tsx` (client)

### Flow

1. `getDraftData()` returns `{ content?, ctas?, testimonials? }`
2. POST `/api/preview/draft` → `{ draftId }`
3. Opens `targetUrl?preview=draftId` in new tab

### APIs

- `POST /api/preview/draft` — Body: draft payload — Returns `{ draftId }` (30-min TTL)
- `POST /api/preview/draft/save` — Body: `{ draftId }` — Saves **only content** from draft to live (CTAs and testimonials must be saved from their own pages)

### Preview Banner

**Component:** `components/PreviewBanner.tsx`

- Shown on `/`, `/keynote`, `/attract-business` when `?preview=` is present
- **Save changes** — Saves draft content to live, shows success toast, redirects to Content
- **Exit preview** — Removes `?preview=` from URL
- **Back to Content** — Links to `/dashboard/content`
- Adds `noindex, nofollow` meta to prevent indexing

---

## Shared Components

| Component | Purpose |
|-----------|---------|
| `DashboardShell` | Layout, sidebar nav, theme toggle, logout |
| `DashboardSelect` | Custom dropdown (dark-mode friendly) |
| `PreviewButton` | Creates draft, opens preview in new tab |
| `Toast` | Success/error toast with variant (auto-dismiss) |
| `ThemeToggle` | Light/dark mode |
| `LogoutButton` | POST logout, redirect to /login |
| `DashboardGreeting` | Greeting message |
| `SocialIcon` | Renders platform icon in Footer (from `lib/social-icons.tsx`) |

---

## Change Logging

**Library:** `lib/log-change.ts`

- `logContentChange(key, changedBy)` — Logs content edits
- `logCtaChange(label, changedBy)` — Logs CTA changes
- `logTestimonialChange(label, changedBy)` — Logs testimonial changes

Logging is called from:
- Content API (POST, PUT, DELETE)
- CTAs API (POST, PATCH, DELETE)
- Testimonials API (POST, PATCH, DELETE)
- Preview draft save (per content key saved)
