# Screen 1 — WORK C1 verification

Date: 2026-09-21
Branch: review/work-screen1-approved-direction
Contract: Master §100
Artifact: prototype-screen1-work-c1.html
Artifact Git blob SHA: 3645bf8c1554f38f5b272493faa690e9c085fb47

## Status

IMPLEMENTED CANDIDATE. 18 functional/static verification groups PASS.
Full technical release gate: PARTIAL. Browser layout, computed sizes, visual acceptance and Owner final approval: NOT VERIFIED.
This file is not a promotion or production approval.

## What changed

Clean Screen 1 implementation using the existing full inline map geometry only, without merging the ordinary demo branch.
- Human question and primary action lead the initial mobile view.
- HTML labels retain their font size; SVG viewBox and overlay share one aspect-matched projection.
- Country focus uses the map shape bounds; city and pair focus use one locality coordinate table.
- All offered demo localities have coordinates; missing geography never borrows another city's position.
- Initial public labels have leader lines to their anchors. No line connects the two personal places.
- Guided flow uses an in-page panel so increased text can scroll without a fixed overlay hiding actions. This layout choice still requires visual assessment against §100.
- Exact eligibility uses both locality IDs; broader results have explicit demo Root eligibility.
- Unverified Root has no map point and never creates an exact result; an eligible Current-only result is labeled honestly.
- Closing/changing flow invalidates pending work; retry allowance resets when context changes.
- Drafts are session-only, versioned, validated and expire after 24 hours.
- Demo data, device diagnostics, failure simulation and 200% text control are available.
- Privacy and Login explain prototype boundaries; there is no registration or backend call.

## Reproducible functional checks

Runner: prototype-screen1-work-c1.test.cjs (Node + jsdom; jsdom is a QA-only dependency).
Run with jsdom available: `node prototype-screen1-work-c1.test.cjs`.
Alternatively set `JSDOM_PATH` to an installed jsdom module path.
The tests load the actual artifact, simulate DOM input and use controlled timers. They do not render pixels.

18 groups passed:
1. JavaScript syntax, unique static IDs, no external scripts/backend.
2. Initial public entry and hidden flow.
3. Canonical Current validation.
4. Munich + Lom exact 25+.
5. Paris + Kovachitsa broader 5+.
6. Paris + Sofia never gets a Lom broader result.
7. Graz + Sofia suppressed without count.
8. Every offered locality has finite coordinates.
9. Close during loading, including late completion.
10. Change during loading, including late completion.
11. Temporary error retry without losing context.
12. Persistent error, skip only after retry, edit resets retry.
13. Stuttgart + Ruse fallback and reload recovery.
14. Unverified Root with clearly labeled Current-only result.
15. Resolver service failure distinct from missing place.
16. Whitespace normalization and escaping unverified input.
17. Invalid and expired draft recovery.
18. Android/touch force-mobile.

## Outstanding release gates

| Gate | Status |
|---|---|
| 360 / 390 / 412 CSS px rendering | NOT VERIFIED |
| High-resolution/coarse mobile and desktop layout | NOT VERIFIED |
| Actual effective font sizes and target geometry | NOT VERIFIED |
| Marker clipping, collision, geography and same-place pair | NOT VERIFIED visually |
| 200% text reflow, long names, keyboard and screen reader | NOT VERIFIED in browser |
| Initial/input/loading/exact/broader/suppressed/error/recovery screenshots | NOT VERIFIED |
| Three-second comprehension | NOT VERIFIED with a person |
| Real Owner phone and final approval | PENDING |

The cloud browser rejected file:// navigation through its security URL policy (only HTTP/HTTPS supported). No alternate browser or policy workaround was attempted. jsdom checks are not a substitute for visual evidence. No screenshot exists for C1 and no visual PASS is claimed.

## Scope / next

Main, production, Supabase and Screen 2 are unchanged.
Next: obtain an allowed isolated HTTP/HTTPS preview or user-provided visual evidence; finish the visual matrix, correct concrete findings, then request final Owner approval.
No automatic promotion. Demo locality lists and approximate map coordinates are not a production canonical resolver.
