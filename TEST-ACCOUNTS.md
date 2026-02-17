# BuilderNet – Test accounts

Use these accounts to log in at **http://localhost:3000/login** (after running the seed).

---

## Accounts

| Name        | Email                 | Password    | Site (public URL)              |
|------------|------------------------|-------------|---------------------------------|
| Demo User  | `demo@buildernet.app`  | `demo1234`  | http://localhost:3000/sites/demo |
| Alice Test | `alice@buildernet.app` | `password123` | http://localhost:3000/sites/alice-site |
| Bob Test   | `bob@buildernet.app`   | `password123` | http://localhost:3000/sites/bob-site  |

---

## Creating the test data

1. Ensure PostgreSQL is running and `DATABASE_URL` is set in `.env`.
2. From the repo root:

   ```bash
   pnpm db:push
   pnpm db:seed
   ```

3. Start the app: `pnpm dev:web`, then open http://localhost:3000.

---

## After login

- **Dashboard**: http://localhost:3000/dashboard — list of your sites.
- **Edit a site**: open a site card, or go to `/dashboard/sites/[siteId]/edit`.
- **View public site**: use the “Site (public URL)” links above (home page must be published; seed does this).

**Security:** These credentials are for local/testing only. Do not use them in production or expose them publicly.
