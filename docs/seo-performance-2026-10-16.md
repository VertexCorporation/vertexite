# Website delivery and measurement — 2026-10-16

Scope: vertexite only. No adminsite, eventsite, personnel, accounts, roles or subscription mutations.

## Production Lighthouse measurements

Same public English homepage, Chrome headless, Lighthouse mobile default and desktop preset. Lab runs vary; these are individual runs, not field percentiles.

| Metric | Before mobile | Final mobile | Before desktop | Final desktop |
| --- | --- | --- | --- | --- |
| Performance | Unavailable (NO_LCP) | Unavailable (NO_LCP) | 85 | Unavailable (NO_LCP) |
| Accessibility | 98 | 100 | 98 | 100 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| First Contentful Paint | 3.8 s | 2.5 s | — | 1.2 s |
| Largest Contentful Paint | Unavailable | Unavailable | 1.9 s | Unavailable |
| Cumulative Layout Shift | 0 | 0 | — | 0 |

The final hero page produced no LCP candidate in these runs. Its cause is unresolved. Performance cannot be scored or compared reliably; FCP is not LCP. There is no verified final LCP or field INP result, so the requested Core Web Vitals targets are **not verified**. PageSpeed Insights API returned HTTP 429 RESOURCE_EXHAUSTED. Raw reports remain in the private workspace, outside Git. Repeat mobile/desktop Lighthouse and obtain Search Console/CrUX field data before claiming those targets. Earlier valid desktop Performance 85 is retained here, not replaced with an invented final score.

## Delivered

- Local international phone input and validation; theme-aware searchable country selector; consistent accessible form controls; existing Cal.com and idempotent submission retained.
- Team name strips below photo cards, square cards, real Turkish/English Mustafa Çakı profiles, optional empty Weekly Stars support. See weekly-stars-integration.md for next-phase server/admin work.
- Detailed lightweight skyline; visibility-triggered reduced-motion-aware section transitions; smoother bounded hero title; half-height fog; browser-theme favicon.
- Static initial hero and eight existing public team cards; deferred animation/Lottie; local licensed fonts and phone assets; image dimensions; Vertex-only OG artwork.
- Metadata, canonical/hreflang, JSON-LD, sitemap, redirect, cache and link audit. Root HTTP 301 points to /en/; both profile routes return 200.

## Validation

- `npm run test:seo`: 144 pages, zero errors/warnings, including internal route checks.
- `npm run test:refresh`: application/Cal mocked integration, 16 locales, hero states and reduced motion.
- `npm run test:experience`: real phone utility validation, country search/keyboard, profiles, browser favicon, light/dark at 390/768/1440 widths.
- `npm run test:weekly-stars`: absent data stays hidden; synthetic test-only data renders correctly.
- `npm run test:personnel`: account action regressions, public team categories and transient refresh failure preservation.

Browser tests use isolated mocked service responses and never create production accounts or send email. Experience/weekly tests require `npm run preview` on port 8765. Install Playwright dependencies before running. Public lists continue using the existing listSiteTeam service; Weekly Stars needs the separately documented backend/admin extension before real entries appear.

References: [Google CWV](https://developers.google.com/search/docs/appearance/core-web-vitals), [multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
