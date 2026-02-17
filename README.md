# BuilderNet

Production-ready **SaaS Website Builder** for non-technical users. Drag-and-drop page builder, modular blocks, themes, and multi-tenant architecture.

## Features

- **Page builder** — Grid-based drag-and-drop canvas (dnd-kit), undo/redo, live preview
- **Blocks** — Hero, Text, Text+Image, Rich Text, Accordion, Pricing, Form
- **Themes** — Global colors, typography, spacing, radius (stored per site)
- **Multi-tenant** — Users and sites; each site has pages and optional theme
- **Auth** — JWT session (login/signup), protected dashboard
- **Public sites** — Rendered at `/sites/[slug]` with SSR
- **14-day trial** — Ready for Stripe integration (see env)

## Tech stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript, TailwindCSS, ShadCN-style UI, Framer Motion, dnd-kit
- **Backend:** Next.js Server Actions + API routes, Prisma, PostgreSQL
- **Auth:** JWT (jose), bcrypt

## Monorepo structure

```
apps/web          — Next.js app (dashboard, editor, public sites)
packages/database — Prisma schema + client
packages/utils    — Shared types, block/theme schemas, slug
packages/ui       — Button, Input, Card, cn (Tailwind)
packages/blocks   — Block components (Hero, Text, Accordion, etc.)
packages/editor   — Page builder (dnd-kit canvas, palette, history)
```

## Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (recommended via Docker below)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment

Copy `.env.example` to `.env` and set at least:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — e.g. `openssl rand -base64 32`

### 2a. PostgreSQL via Docker (recommended)

If you don’t have PostgreSQL installed locally, use the included `docker-compose.yml`:

```bash
docker compose up -d
```

Optional DB UI (Adminer) will be available at **http://localhost:8080**:

- System: `PostgreSQL`
- Server: `postgres` (if connecting from another container) or `localhost` (from your host)
- Username: `buildernet`
- Password: `buildernet`
- Database: `buildernet`

Then create `apps/web/.env.local` by copying `apps/web/.env.local.example`.

### 3. Database

```bash
pnpm db:push
pnpm db:seed
```

Seed creates user `demo@buildernet.app` / `demo1234` and a demo site at `/sites/demo`.

### 4. Run dev

```bash
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000). Log in with the demo user, create a site, and use the editor.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `pnpm dev`     | Run all dev scripts in parallel |
| `pnpm dev:web` | Run Next.js dev server         |
| `pnpm build`   | Build all packages and web     |
| `pnpm db:generate` | Generate Prisma client    |
| `pnpm db:push` | Push schema to DB (no migrations) |
| `pnpm db:studio` | Open Prisma Studio          |
| `pnpm db:seed` | Run seed (from repo root)     |

## Docker

Build and run:

```bash
docker build -t buildernet .
docker run -p 3000:3000 --env-file .env buildernet
```

Requires `DATABASE_URL` (and optionally other env vars) at runtime.

## Production deployment

1. **Database:** Run migrations or `prisma db push` against your PostgreSQL.
2. **Env:** Set all variables from `.env.example` in your host (Vercel, Railway, etc.).
3. **Build:** `pnpm build` (or build only web: `pnpm build:web`).
4. **Start:** `pnpm start` in `apps/web` or use the standalone output (see Dockerfile).
5. **Stripe (optional):** Add `STRIPE_*` and implement checkout/billing in app (schema has `Subscription` and trial fields).

## Architecture overview

- **Data:** User → Site → Page(s), Theme, Block (header/footer), Media, Form, FormSubmission, Subscription, Backup.
- **Pages:** Each page has a `blocks` JSON array (block id, type, config, animation). Editor persists this via `/api/pages/save`.
- **Public render:** `/sites/[slug]/[[...path]]` loads site + page by slug and renders blocks with `blockComponents[block.type]`.
- **Editor:** `PageBuilder` (dnd-kit) with block palette, sortable canvas, undo/redo; sidebar and theme/SEO/backup can be added in the dashboard.

## License

MIT
