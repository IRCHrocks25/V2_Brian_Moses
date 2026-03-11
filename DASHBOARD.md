# Brian Moses CMS Dashboard

Admin dashboard for editing website content and managing CTAs.

## Setup (Railway)

1. **Add PostgreSQL** to your Railway project (or use an existing one).

2. **Environment variables** – set in Railway:
   - `DATABASE_URL` – from the PostgreSQL service
   - `SESSION_SECRET` – a long random string (min 32 chars) for session signing

3. **Deploy** – Railway will run `prisma generate` during build.

4. **Run migrations & seed** (one-time, from your machine or Railway console):
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Default login** (change these after first login):
   - Admin: `admin@brianmoses.com` / `admin123`
   - User: `user@brianmoses.com` / `user123`

   Override via env: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `USER_EMAIL`, `USER_PASSWORD` when running seed.

## URLs

- **Login:** `/login`
- **Dashboard:** `/dashboard` (redirects to login if not authenticated)
- **Content:** `/dashboard/content`
- **CTAs:** `/dashboard/ctas`

## Features

- **Content** – Edit hero copy, achievements, meta, etc. by section.
- **CTAs** – Add/edit/delete buttons; set placement (hero, navbar, footer, etc.) and page (home, keynote, all).
- **Roles** – Admin and User (both can edit; role can be extended for permissions).

## Local development

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL` (e.g. local PostgreSQL or [Neon](https://neon.tech))
3. Run:
   ```bash
   npm install
   npx prisma db push
   npx prisma db seed
   npm run dev
   ```
