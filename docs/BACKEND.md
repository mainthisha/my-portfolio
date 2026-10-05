# Backend, database & admin — architecture

The frontend is complete and works with zero backend configuration (the contact form
logs to the server console via `/api/contact`). This doc lays out how to wire up the
real backend, database, and admin dashboard the brief asked to prepare for. Nothing
here is built yet — it's a plan, not fake functionality.

## 1. Database

Recommended: **PostgreSQL** via an ORM (Prisma or Drizzle). Suggested schema:

```prisma
model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Project {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  subtitle     String?
  category     String
  summary      String
  overview     String
  problem      String?
  solution     String?
  features     String[]
  technologies String[]
  github       String?
  liveUrl      String?
  order        Int      @default(0)
  updatedAt    DateTime @updatedAt
}

model AdminUser {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
}
```

`src/data/projects.ts`, `experience.ts`, `skills.ts` and `certifications.ts` are typed
exactly like these tables on purpose — moving from static files to a database is a
data-fetching change, not a redesign. Swap each `export const x = [...]` for a fetch
call (e.g. `await prisma.project.findMany()`).

## 2. Contact form → database

`src/app/api/contact/route.ts` already validates input (`src/lib/validation.ts`) and
has a `persist()` stub. Replace it with:

```ts
await prisma.message.create({ data: payload });
```

Add an email step in `notify()` with Resend, Postmark, or Nodemailer once you have a
provider and API key. Keep the honeypot field (`company`) — it silently drops bot
submissions.

## 3. Admin dashboard

A minimal admin lives well at `/admin`, gated by middleware:

- `src/middleware.ts` — checks a signed session cookie (e.g. via `iron-session`,
  `next-auth`, or `Lucia`) and redirects unauthenticated requests away from `/admin/*`.
- `/admin/messages` — list, mark-as-read, delete.
- `/admin/projects` — CRUD over the `Project` table, editing exactly the fields
  already in `src/types/index.ts`.
- Login should be single-user (your own account) and password-hashed — no self-signup.

## 4. Suggested env vars

Copy `.env.example` to `.env.local`:

```
DATABASE_URL=postgres://...
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD_HASH=...
RESEND_API_KEY=...
```

## 5. Deploying

The frontend deploys as-is to Vercel with zero backend. Add a managed Postgres
(Vercel Postgres, Neon, or Supabase) when you're ready for step 1, then layer in
steps 2–3 without touching the design.
