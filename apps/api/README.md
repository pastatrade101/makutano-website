# @makutano/api

Fastify + TypeScript API for **makutano.co.tz**, backed by Supabase Postgres.

## Setup

```bash
cp .env.example .env
```

Fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings → API**
in the Supabase dashboard.

> The service role key bypasses Row Level Security. It lives only in this
> process — never ship it to the browser.

Then apply the schema and load the site copy:

```bash
# paste supabase/migrations/0001_init.sql into the Supabase SQL editor,
# or: supabase db push
pnpm --filter @makutano/api seed
```

Without Supabase credentials the API still boots: reads are served from the copy
in `@makutano/shared` and enquiries are held in memory. `GET /health` reports
which mode it is in.

## Endpoints

| Method | Path                     | Purpose                                     |
| ------ | ------------------------ | ------------------------------------------- |
| GET    | `/health`                | Liveness + which storage backend is active  |
| GET    | `/api/v1/site`           | Contact details, mission, vision, licence   |
| GET    | `/api/v1/services`       | The seven service domains                   |
| GET    | `/api/v1/services/:slug` | One service domain                          |
| GET    | `/api/v1/capabilities`   | Home-page capability cards                  |
| GET    | `/api/v1/values`         | Core values                                 |
| GET    | `/api/v1/credibility`    | Proven-credibility items                    |
| GET    | `/api/v1/partners`       | Partner organisations                       |
| GET    | `/api/v1/partners/:slug` | One partner                                 |
| GET    | `/api/v1/leadership`     | Executive team                              |
| POST   | `/api/v1/contact`        | Enquiry form (validated, rate limited)      |

Responses are `{ ok: true, data }` or `{ ok: false, error: { error, message, details? } }`.

Bilingual fields arrive as `{ "en": "…", "sw": "…" }`; `sw` is absent where the
live site is English-only.

## Scripts

```bash
pnpm dev    # tsx watch
pnpm build  # tsc → dist/
pnpm start  # node dist/server.js
pnpm seed   # push the site copy into Supabase
```
