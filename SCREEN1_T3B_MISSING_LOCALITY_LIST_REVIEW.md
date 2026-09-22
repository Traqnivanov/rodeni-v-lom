# Screen 1 T3B — missing Layer-A list / fallback state review

Branch: `review/ordinary-screen1-active-integration`

## Scope

T3B only: handle valid selectable countries that have no local `cities.js` Layer-A suggestion list.

Current cases:
- `MT` — selectable, no Layer-A list, no current SVG country geometry;
- `LU` — selectable, no Layer-A list, current SVG country geometry exists.

Distinct comparison case:
- `SG` — selectable, no current SVG country geometry, but it **does** have Layer-A locality data.

## Dependency

T3B was intentionally run after T4.

Reason:
- no-list countries still require a clear draft → canonical boundary;
- raw text must not become canonical just because no local suggestions exist;
- mandatory Current still requires canonical identity before Screen 1 preview.

## Implemented behavior

For a country without a Layer-A list:

- locality input remains enabled;
- placeholder changes to:
  **„Напиши град или село“**
- the verification block opens immediately;
- contradictory **„Не намираш мястото?“** is hidden;
- one concise human message is shown:
  **„Няма готови предложения за тази държава. Напиши мястото и го провери.“**
- user text is stored only as private draft state;
- primary Current CTA remains disabled until a canonical Current exists;
- no fake suggestion, ID, coordinate or country-centre point is created.

If the demo resolver cannot confirm the place:

**„В това демо още не можем да потвърдим места в тази държава. Написаното остава тук, но няма да го използваме като потвърдено място.“**

This explains the prototype limitation without claiming that the country/place is invalid.

## Important boundary

The active prototype has no real fallback provider/backend.

Therefore MT/LU can exercise the correct **no-list UX and verification boundary**, but the prototype cannot honestly produce a new canonical Current for an arbitrary MT/LU locality.

This is intentional:
- no fake canonical ID;
- no invented coordinates;
- no unverified Current bypass;
- no silent promotion of raw text.

Production/future integration should place the approved controlled resolver/provider behind the same verification boundary.

## Verification

### Source-backed audit

**17/17 PASS**

Verified:
- MT/LU are selectable;
- MT/LU have no Layer-A list;
- SG remains a separate no-geometry + has-list case;
- LU has geometry while MT/SG do not;
- no-list detection exists;
- write-first placeholder;
- single concise human guidance;
- verification opens automatically;
- missing-place link is hidden;
- resolver failure explains the demo limitation;
- raw text never becomes canonical;
- Current CTA remains canonical-only;
- unverified bypass remains Root-only;
- no fake country-centre helpers;
- no stale duplicate helper styling;
- inline JavaScript parses;
- official WORK C2 remains unchanged.

Runnable regression suite:

```bash
node screen1-t3b-missing-locality-list.test.cjs
```

### Mobile visual review

Observed with the review-only harness:

- **360px / 100% / MT** — PASS for no-list state hierarchy;
- **360px / 100% / LU** — PASS for no-list state hierarchy;
- **360px / 200% / LU** — PASS for reflow; vertical scrolling required and allowed; no observed horizontal clipping.

A duplicate guidance line was found during mobile review and removed before this checkpoint was closed.

## Evidence boundary

PASS:
- no-list state detection;
- honest write-first/verify-first UX;
- mobile hierarchy at 360px;
- 200% reflow observation;
- distinction between MT/LU/SG technical cases.

NOT VERIFIED / NOT IMPLEMENTED:
- real fallback provider;
- actual canonical resolution for arbitrary MT/LU localities;
- real phone keyboard/IME;
- screen reader;
- production backend/cache;
- WORK acceptance;
- Owner final visual approval of Screen 1.

## Product/process status

This checkpoint does not change the approved meaning of Current or Root.

It does not introduce a new unverified Current path.

It only makes the existing hybrid-locality boundary honest when local Layer-A suggestions are absent.

Next planned task remains **T5 — Root/Bulgaria coverage reality check**.
