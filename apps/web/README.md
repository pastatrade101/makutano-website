# @makutano/web

SvelteKit 2 / Svelte 5 frontend for Makutano Digital, with TypeScript and a shared navy-and-gold CSS design system.

## Develop and verify

From the workspace root:

```sh
pnpm dev:web
pnpm check
pnpm build
```

The frontend is on port 5173; the development API is on 5174. Content has bundled fallbacks, so all pages render without an API. A failed contact submission preserves the enquiry and offers retry and direct email.

## Frontend conventions

- `src/lib/styles/tokens.css`: colours, type, spacing, radii and motion timings.
- `src/lib/components/layout`: fixed navigation, native modal mobile menu, page banners, footer and progress controls.
- `src/lib/components/sections`: homepage sections and the validated enquiry form.
- `src/routes`: Home, Services, About, Partners, Contact and the error page.
- `packages/shared/src/content.ts`: English and Swahili content fallbacks.
- `src/lib/api.ts`: content and contact API boundary; GET timeout 5 seconds, POST timeout 15 seconds.

Navigation uses native document scrolling and SvelteKit history/hash restoration. The mobile dialog provides focus containment, Escape dismissal and background scroll locking. Heading animation never replaces Svelte-owned text, so translations and natural line wrapping remain intact. Reduced-motion CSS disables transitions and animation; reveal actions respect the same preference.

Contact fields use the shared Zod schema before making a request. The form supports field errors, sending, success, retry, service preselection and keyboard focus recovery. The API still receives the English service title, regardless of display language, to preserve its current contract.

Leadership is shown only when records contain a real name and portrait. Unconfigured social links are omitted. Bundled partner SVG placeholders are rendered as readable organisation names; a supplied custom logo URL is rendered as an image.

## Backend handoff

1. Configure persistence for the existing Fastify API and implement the actual enquiry notification delivery. Its current development fallback is temporary memory; success in local UI testing does not prove persistence or email delivery.
2. Route browser `/api/v1/*` requests to the API in production. `PUBLIC_API_URL` is the server-side API origin and the development/preview proxy target.
3. Keep the response contract: `{ ok: true, data: ... }` or `{ ok: false, error: { message, details?: { fieldName: message } } }`.
4. Maintain the existing content endpoints: `/site`, `/services`, `/capabilities`, `/credibility`, `/values`, `/leadership` and `/partners`.
5. Leadership names/portraits, custom partner logos and real social URLs can be supplied through content when available. Incomplete entries do not appear as unfinished public UI.

See `UI-REVIEW.md` for the verification record.
