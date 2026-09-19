# Frontend verification — 18 September 2026

## Scope

Home, Services, About, Partners, Contact, the error page, shared navigation/footer,
English/Swahili presentation and contact form states. The existing navy-and-gold
identity and photography were retained.

## Changes

- Rebalanced the homepage so the headline, introduction and actions stay together;
  added a partner strip, clearer section hierarchy and consistent card grids.
- Standardised page banners, spacing, contrast, touch controls and responsive
  image/card layouts. Fixed mobile image overflow and unreadable partner names.
- Replaced the off-canvas navigation with a native modal dialog, explicit keyboard
  focus loop, Escape/close controls and scroll locking.
- Removed the navigation curtain and forced scroll resets. Native SvelteKit
  navigation now handles deep links and history without an unconditional jump.
- Removed DOM-rewriting heading animations, preserving translation updates and
  responsive wrapping; capped reveal delays and retained reduced-motion support.
- Removed empty social links and suppressed incomplete leadership profiles.
- Added persistent form labels, local shared-schema validation, translated errors,
  service preselection, pending/success/failure states, timeout handling, focus
  recovery and input retention after a failed request.
- Kept content behind the existing API client with bundled fallbacks; the homepage
  partner strip and footer service list also read from the API-backed page data.

## Checks performed

- `pnpm check`: all workspace packages pass; Svelte reports 0 errors and 0 warnings.
- `pnpm build`: shared package, API and adapter-node frontend production build pass.
- Browser layout matrix: all 5 pages at widths 320, 390, 768 and 1440 pixels;
  final pass has no horizontal overflow and exactly one H1 on each page.
- Swahili: all 5 pages checked at 320 pixels; translated headings fit without
  overflow. Contact validation messages update when switching languages.
- Navigation: active state, mobile open/close, Escape, focus return, Tab/Shift+Tab
  wrapping, same-page menu dismissal, service anchors and contact preselection.
- Forms: empty required fields focus the first invalid field; successful local
  submission shows confirmation; reset clears the fields and returns focus.
- Backend unavailable: a separate production preview used an unreachable API;
  all pages still rendered. Failed submission preserved the entered enquiry,
  focused the error message and restored the submit button for retry.
- Missing route: usable 404 page with recovery links, no overflow and `noindex`.
- No application runtime errors were observed in the normal browsing checks.

The success check used one synthetic enquiry (`qa@example.test`) against the
existing development API. Its health endpoint reported `fallback-seed` storage;
this verifies the UI/API response flow, not durable storage or email delivery.
The isolated offline preview was stopped after testing.

## Remaining backend/content work

Connect durable enquiry storage, implement notification delivery and configure
production API routing. Real leadership profiles, custom partner logos and social
URLs can be added when supplied; the public UI does not expose their placeholders.

Verification was in the available Chromium-based browser with viewport emulation.
It is not a physical-device or full cross-browser accessibility certification.
