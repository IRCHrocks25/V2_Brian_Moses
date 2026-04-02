# Admin Dashboard — Clone Guide for Other Projects

Use this document as a prompt/instruction for Cursor in another Next.js project. Paste it and ask Cursor to clone the dashboard. The **functions and looks** of the dashboard stay the same; only the **content keys and default content** should be customized for the new website.

---

## QUICK PROMPT (paste this into Cursor of your other project)

```
Clone the admin dashboard from my V2_Brian_Moses project into this project. 

Copy everything from: app/dashboard/, app/login/, app/api/ (auth, content, ctas, testimonials, upload, history, preview), components/dashboard/, and lib/ (auth.ts, db.ts, default-content.ts, content-keys.ts, get-content.ts, log-change.ts, preview-store.ts, social-icons.tsx, default-testimonials.ts, email.ts). Also copy prisma/schema.prisma and prisma/seed.ts.

Keep the dashboard functions and UI identical (sidebar, hamburger on right, theme toggle, etc.). Only customize lib/content-keys.ts and lib/default-content.ts for this project's pages and copy.

Follow the full steps in DASHBOARD_CLONE_GUIDE.md if you have access to it.
```

---

## Full instruction (copy this entire section into Cursor):

---

**I need you to clone the admin dashboard from my Brian Moses project (V2_Brian_Moses) into this project. Copy all dashboard functionality and UI exactly. The dashboard includes:**

- **Auth:** Login, logout, session (cookie-based)
- **Content editor:** Edit text, images, keys
- **CTAs manager:** Create, edit, delete call-to-action buttons
- **Testimonials manager:** CRUD with image upload
- **Social & Contact editor:** Social links, contact info
- **Change history:** View and delete history
- **Preview:** Draft preview + save to live
- **UI:** Sidebar (hamburger on right, slides from right on mobile), theme toggle, email display

**Keep the dashboard functions and looks identical. Only the content keys and default content should be customized for this project's pages/sections.**

---

## Step-by-step process

### Step 1 — Copy these files and folders from V2_Brian_Moses

**App routes:**
```
app/dashboard/layout.tsx
app/dashboard/page.tsx
app/dashboard/content/page.tsx
app/dashboard/ctas/page.tsx
app/dashboard/testimonials/page.tsx
app/dashboard/social/page.tsx

app/login/page.tsx

app/api/auth/login/route.ts
app/api/auth/logout/route.ts
app/api/auth/me/route.ts
app/api/auth/forgot-password/route.ts
app/api/auth/reset-password/route.ts
app/api/content/route.ts
app/api/ctas/route.ts
app/api/ctas/[id]/route.ts
app/api/testimonials/route.ts
app/api/testimonials/[id]/route.ts
app/api/upload/route.ts
app/api/history/route.ts
app/api/preview/draft/route.ts
app/api/preview/draft/save/route.ts
```

**Components (entire folder):**
```
components/dashboard/DashboardShell.tsx
components/dashboard/DashboardGreeting.tsx
components/dashboard/DashboardHistory.tsx
components/dashboard/DashboardContentEditor.tsx
components/dashboard/DashboardSelect.tsx
components/dashboard/PreviewButton.tsx
components/dashboard/Toast.tsx
components/dashboard/ThemeToggle.tsx
components/dashboard/ThemeContext.tsx
components/dashboard/LogoutButton.tsx
components/dashboard/icons.tsx
```

**Library files:**
```
lib/auth.ts
lib/db.ts
lib/default-content.ts
lib/content-keys.ts
lib/get-content.ts
lib/log-change.ts
lib/preview-store.ts
lib/social-icons.tsx
lib/default-testimonials.ts
lib/email.ts
```

**Prisma:**
```
prisma/schema.prisma
prisma/seed.ts
```

**Other (if your site uses them):**
```
components/PreviewBanner.tsx
components/DynamicCTA.tsx
```

---

### Step 2 — Add dependencies (if missing)

```bash
npm install @prisma/client bcryptjs zod
npm install -D prisma tsx @types/bcryptjs
```

Optional: `cloudinary`, `resend` (for uploads, password reset).

---

### Step 3 — Prisma setup

1. Copy `prisma/schema.prisma` — models: User, PasswordReset, ContentItem, Testimonial, CTA, PreviewDraft, ChangeHistory.
2. Ensure `DATABASE_URL` is in `.env`.
3. Run:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Seed admin user:
   ```bash
   npx tsx prisma/seed.ts
   ```

---

### Step 4 — Environment variables (.env)

```
DATABASE_URL="postgresql://..."
SESSION_SECRET="your-secret-at-least-32-chars"
```

Optional:
```
RESEND_API_KEY=...
FROM_EMAIL=...
SITE_URL=...
CLOUDINARY_URL=...
```

---

### Step 5 — Customize for the new website

**Keep as-is (dashboard logic & UI):**
- `DashboardShell.tsx` — layout, sidebar, hamburger, theme
- `auth.ts`, `db.ts`, `log-change.ts`, `preview-store.ts`
- All API routes
- `DashboardContentEditor`, `DashboardSelect`, `Toast`, `PreviewButton`, etc.

**Customize (site-specific content):**
- `lib/content-keys.ts` — define keys for your pages (e.g. hero.headline, footer.text). Use your site's sections.
- `lib/default-content.ts` — default values for each key. Match your site's copy.
- `lib/default-testimonials.ts` — default testimonials if any.
- `lib/social-icons.tsx` — add/remove platforms if needed.
- Sidebar nav links in `DashboardShell.tsx` — update hrefs if you use different routes (e.g. `/dashboard/content` stays the same unless you rename).

---

### Step 6 — Path aliases

Ensure your project has `@/` alias (e.g. `@/lib`, `@/components`). If using `@/lib/auth`, `@/components/dashboard/`, update `tsconfig.json` or `next.config.js` accordingly.

---

### Step 7 — Wire up the frontend

If your site uses DynamicCTA or content from the API:
- Use `getContent()` or fetch from `/api/content` on pages.
- Use `DynamicCTA` component with `placement` and `page` props.
- Add `PreviewBanner` to layout when `?preview=` is in the URL.

---

## DashboardShell UI details (already implemented)

- Hamburger icon: **top-right** on mobile
- Sidebar: **slides from right** on mobile
- Hamburger: **hidden** when sidebar is open
- Email section: top padding (`pt-4`), bottom margin (`mb-4`), no cutoff
- Desktop: sidebar on left, always visible

---

## Quick checklist

| Item | Action |
|------|--------|
| Copy app routes | ✅ |
| Copy components/dashboard | ✅ |
| Copy lib files | ✅ |
| Copy Prisma schema + seed | ✅ |
| Install deps | prisma, @prisma/client, bcryptjs |
| Set DATABASE_URL, SESSION_SECRET | ✅ |
| Run prisma generate, db push | ✅ |
| Run seed | ✅ |
| Customize content-keys.ts | Your site's keys |
| Customize default-content.ts | Your site's copy |

---

## Reference: source project structure

```
V2_Brian_Moses/
├── app/
│   ├── dashboard/
│   ├── login/
│   └── api/
│       ├── auth/
│       ├── content/
│       ├── ctas/
│       ├── testimonials/
│       ├── upload/
│       ├── history/
│       └── preview/
├── components/
│   └── dashboard/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── content-keys.ts
│   ├── default-content.ts
│   └── ...
└── prisma/
```

---

---

## Important: Source project access

For Cursor to copy the files, it needs access to the source project (V2_Brian_Moses). Either:

1. **Open both folders** in the same Cursor workspace (File → Add Folder to Workspace), or
2. **Copy this file** (`DASHBOARD_CLONE_GUIDE.md`) into your target project, then paste the contents into Cursor and ask it to create the files from scratch using the structure above (you may need to provide key file contents if Cursor can't read the source).
