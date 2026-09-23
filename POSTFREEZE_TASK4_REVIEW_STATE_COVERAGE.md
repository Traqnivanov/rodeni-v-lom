# Post-freeze Task 4 — review-state coverage audit

Branch: `review/ordinary-screen1-postfreeze-work`

Frozen base:
- branch: `review/ordinary-screen1-frozen-for-work`
- SHA: `1c1551dc47faa249132394f019491373bc876f22`
- active frozen candidate: `prototype-screen1-map-interaction-lab.html`
- candidate blob: `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

## Scope

Goal:
make every required Screen 1 review state directly reproducible for WORK/Owner review without modifying the frozen product candidate.

Before work, re-checked:
1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`
4. relevant Master §§97, 99 and 100
5. existing T3A/T3B/T5/T6 review evidence

No product rule was re-decided.

## Existing QA harness

The frozen package already contains a separate QA-only review harness:

`prototype-screen1-mobile-visual-review.html`

This file loads the active frozen candidate in an iframe and can:
- choose 360 / 390 / 412 px;
- choose a named review scenario;
- switch 100% / 200% text;
- inject review-only session setup;
- keep the product candidate file unchanged.

Existing evidence already covered:
- initial;
- Current;
- Root;
- exact;
- error;
- recovery;
- missing Layer-A list;
- no map geometry;
- 200% text;
- multiple realistic T6/T5 states.

## Gap found before Task 4 change

The review harness did not expose direct named scenarios for:
- loading;
- safe-broader;
- suppressed;
- Current-only;
- retry success after temporary error;
- post-error continue after persistent failure.

These states existed in the frozen candidate, but they were not equally easy to open/review from the QA harness.

That is a review-coverage gap, not a product defect.

## QA-only change made

Only `prototype-screen1-mobile-visual-review.html` was changed on the post-freeze work branch.

Added named review scenarios:
- `broader` — Paris + Kovachitsa;
- `suppressed` — Graz + Sofia;
- `currentonly` — Paris + unresolved/unverified Root;
- `loading` — stable review-only loading presentation;
- `retry` — one temporary error followed by successful retry;
- `posterror` — persistent error → retry → secondary continue boundary.

The loading scenario is stabilized only by the QA harness so it can be inspected longer than the product's short normal loading delay. The frozen product code is not changed.

## Required state matrix after Task 4

| Required state | Review path |
|---|---|
| initial | `initial` |
| Current | `current` |
| Root | `root` |
| loading | `loading` |
| exact | `exact` |
| safe-broader | `broader` |
| suppressed | `suppressed` |
| Current-only | `currentonly` |
| error | `error` |
| retry | `retry` |
| post-error continue | `posterror` |
| recovery | `t6recovery` |
| missing local list | `mt` or `lu` |
| no map geometry | `mt` or `sg` |
| 200% text | text selector = `200%` with any applicable scenario |

Source inspection confirms all required Task 4 states now have a direct QA review path.

## Important separation

The active frozen product candidate remains:

`prototype-screen1-map-interaction-lab.html`

Blob remains exactly:

`a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

Task 4 did not modify it.

The changed review harness is QA-only and is not a production/canonical product artifact.

## Existing evidence reused

Earlier T6/T5 evidence already records review coverage for:
- expired-session recovery;
- error presentation;
- missing-list MT/LU;
- no-geometry MT/SG;
- 360 / 390 / 412 widths;
- 200% text;
- Root fallback/unverified behavior;
- realistic long/dense/sparse locality states.

Task 4 does not claim those prior browser/device observations were re-run from zero.

## What is verified in this Task 4 pass

**PASS — source/review-path coverage.**

Verified:
- every required Task 4 state has a named, deterministic QA path;
- recovery injection remains QA-only;
- stable loading inspection is QA-only;
- the frozen candidate blob is unchanged;
- no main/production/Supabase/Screen 2 change;
- no canonical rule change.

## What is NOT claimed

This Task 4 pass does not claim:
- new real-phone visual approval;
- new screen-reader approval;
- new physical keyboard/IME approval;
- that every newly added harness scenario was independently screenshot-approved in this pass;
- final WORK/Owner approval.

Those remain separate review gates.

## Task 4 result

**PASS — review-state coverage is complete at the QA-harness/source level.**

One QA-only file changed:
- `prototype-screen1-mobile-visual-review.html`

No frozen product candidate change.

## WORK action later

WORK can use the review harness to inspect the full state matrix without manually reconstructing difficult states or modifying Screen 1.

WORK should still independently review:
- visual correctness of the newly exposed scenarios;
- Task 2 accessibility findings;
- Task 3 Frankfurt/Brussels data findings;
- real-device gates before any adoption/promotion.
