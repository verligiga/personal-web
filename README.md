# Portofolio - Gregorius Verli Giga Winarno

Personal portofolio with a self-built CMS. Public site (Home, About, Experience,
Projects, Contact) reads content from Postgres; everything is editable from
`/admin` without touching code.

**Stack:** Next.js (App Router) · TypeScript · Tailwind · Prisma ·
Neon Postgres · Auth.js (Credentials) · Vercel Blob

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Neon database

1. Sign up / log in at [neon.tech](https://neon.tech) and create a project.
2. From the project dashboard, copy the **pooled** connection string.

### 3. Create a Vercel Blob store

1. In the [Vercel dashboard](https://vercel.com), open **Storage → Blob**
   and create a store.
2. Copy the `BLOB_READ_WRITE_TOKEN` from its `.env.local` tab.

### 4. Configure environment variables

Copy `.env.example` to `.env` and fill in every value:

```bash
cp .env.example .env
```

- `DATABASE_URL` - Neon pooled connection string
- `AUTH_SECRET` - generate with `npx auth secret`
- `BLOB_READ_WRITE_TOKEN` - from step 3
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` - credentials for the one-time seed script
  below (only used at seed time, not read at runtime)

### 5. Push the schema and seed content

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

This creates all tables and populates them with the real CV/LinkedIn content
plus one admin login (from `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

### 6. Run the dev server

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Editing content

Everything on the public site - profile, experience, projects, skills,
education, organization roles - is managed from `/admin`. No redeploy is
needed after an edit; pages revalidate on save.

## Notes

- All public routes render dynamically (`export const dynamic = "force-dynamic"`
  in the root layout) since content comes from the database rather than being
  known at build time.
- Mutations use Server Actions (`src/lib/actions/*`), not a separate REST/GraphQL
  API - appropriate for a single-admin personal CMS.
