# Next phase: Weekly Stars and profile editorial controls

No adminsite/eventsite or production backend changes are included in this release.

## Backward-compatible public DTO

`listSiteTeam` may add `weeklyStars: [{ name: string }]` and `weeklyStarsWeek: "YYYY-MM-DD"` (Monday, Europe/Istanbul). Existing fields remain unchanged. The site hides the section when the field is absent or empty; it never generates people as placeholders. Icons are decorative and names are accessible text. The service should return only the current published week and currently active contributors, without private IDs/emails/phones.

## Server and Console follow-up

- Add an audited, current-admin-only weekly selection operation in Fulcrum; store contributor references rather than typed duplicate names. Validate active membership, week, duplicates and an explicit bounded selection count.
- Resolve names on the server using the existing Contributor identity model. Preserve previous weeks for audit, but expose only the current selection in the public DTO. Invalidate the public team cache on publication; make retries idempotent.
- Add a week selector, eligible-member search, preview and publish action to the existing Console team editor. Keep this independent from membership, department, role and subscription mutations.
- If more profile pages are created, add an explicit reviewed `profileUrl` to the public card DTO. The current frontend links only Mustafa's verified existing name + image pair, to the two real TR/EN pages; no other profile URL is fabricated.
- Tests: stale admin denied, inactive person excluded, duplicate selection rejected, current-week boundary, public DTO privacy, empty-state hiding and harmless old-client behavior.

The eight initial photo cards in HTML mirror the already-public editorial card data so the page remains useful to crawlers and without JavaScript; the current service remains the live update source. Refresh this static public snapshot when editorial cards change in a future publishing integration.
