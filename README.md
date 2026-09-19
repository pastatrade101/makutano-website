# Makutano Digital — website monorepo

The makutano.co.tz website: a SvelteKit frontend and a Fastify API, backed by
Supabase Postgres, in a pnpm workspace.

```
makutano-web/
├── apps/
│   ├── web/        @makutano/web    SvelteKit 2 · Svelte 5 · TypeScript
│   └── api/        @makutano/api    Fastify 5 · Supabase · TypeScript
└── packages/
    └── shared/     @makutano/shared types, zod schemas, and all site copy
```

`packages/shared` is the single source of truth for the site's content. Both
apps import it: the API seeds Supabase from it and falls back to it, and the
frontend uses it as a fallback so pages still render if the API is unreachable.

## Quick start

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
pnpm dev
```

- Frontend — http://localhost:5173
- API — http://localhost:5174 (`/health` reports the active storage backend)

Without Supabase credentials the API serves the bundled copy and keeps enquiries
in memory, so the whole site works offline from a clean checkout.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run `apps/api/supabase/migrations/0001_init.sql` in the SQL editor
   (or `supabase db push`).
3. Put `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings →
   API** into `apps/api/.env`.
4. Load the copy into the database:

   ```bash
   pnpm --filter @makutano/api seed
   ```

`GET /health` should then report `"storage": "supabase"`.

**The service role key bypasses Row Level Security.** It belongs only in the API
process — never in `apps/web`, never in the browser. Content tables are readable
by `anon`; `contact_submissions` accepts inserts but is readable only with the
service role.

## Scripts

| Command        | What it does                                      |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Runs the API and the frontend together            |
| `pnpm dev:web` | Frontend only                                     |
| `pnpm dev:api` | API only                                          |
| `pnpm build`   | Builds shared → api → web                         |
| `pnpm start`   | Runs both production builds                       |
| `pnpm check`   | Typechecks every package                          |

## Deploying

Build once, then run the two processes:

```bash
pnpm build
NODE_ENV=production node apps/api/dist/server.js
NODE_ENV=production PORT=3000 PUBLIC_API_URL=https://api.makutano.co.tz \
  PUBLIC_SITE_URL=https://makutano.co.tz node apps/web/build/index.js
```

Set `CORS_ORIGIN` on the API to the site's public origin. `PUBLIC_SITE_URL`
drives canonical URLs, `robots.txt` and `sitemap.xml`, so set it in production
or those fall back to the request origin.

In the browser, frontend requests go to a same-origin `/api/v1` path (proxied in
dev by Vite); put the API behind that path in production, and set
`PUBLIC_API_URL` to the API origin for server-side rendering.

## The content model

The site is bilingual. Localized fields are `{ en, sw }` pairs; `sw` is optional
to allow content to fall back to English when a translation is missing. `t()` in
`apps/web/src/lib/i18n.svelte.ts` resolves a pair against the active language,
falling back to English. The choice persists in `localStorage` and is mirrored
onto `<html lang>`.

To change copy, edit `packages/shared/src/content.ts`, then re-run the seed if
you are on Supabase.

## Frontend handoff

The five public pages and error page use a responsive navy-and-gold design, with
English/Swahili controls, accessible mobile navigation, and validated contact
states. See `apps/web/README.md` and `apps/web/UI-REVIEW.md` for implementation
notes and verification.

Leadership records need real names and portraits before publication; incomplete
records are hidden. Partner names render as readable text until custom logos are
supplied. Social buttons appear only for configured HTTP(S) links. These are
optional content additions rather than visible placeholders.

The development API still stores enquiries in memory without Supabase. Persistent
storage and actual notification delivery remain backend work — see the warning
under Deploying.

## Deploying

Two containers from one image, fronted by Caddy, on the shared `makutano-net`
network. Neither publishes a host port.

```bash
cp apps/api/.env.example apps/api/.env   # fill in the Supabase credentials
docker compose up -d --build
```

| Service | Container | Port | Command |
| --- | --- | --- | --- |
| API | `makutano-site-api` | 5174 | `node apps/api/dist/server.js` |
| Web | `makutano-site-web` | 3000 | `node apps/web/build/index.js` |

Caddy routes `makutano.co.tz/api/v1*` to the API and everything else to the web
server, which keeps browser requests same-origin — the same arrangement the Vite
proxy provides in dev, so no API host is baked into the bundle and there is no
CORS. Server-side rendering calls the API container directly on
`PUBLIC_API_URL`.

`ORIGIN` must match the public URL or adapter-node rejects form POSTs.

> **Enquiries are lost without Supabase.** With `SUPABASE_URL` and
> `SUPABASE_SERVICE_ROLE_KEY` unset the API keeps submissions in an in-memory
> array, while the visitor still sees a success message. Set both before taking
> the contact form live.
