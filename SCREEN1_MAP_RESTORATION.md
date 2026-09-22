# Screen 1 — map geometry restoration, 2026-09-22

Base review commit: 35a7c6925f5a5945744edee9758d2c017e1666a8.
Restored all 177 original country paths from V13 using parsed class tokens and attributes, including DE/ES/GB/IT (country has-signal) and nonstandard codes. Existing path geometry, projection coordinates, flow, counts, typography and privacy logic were not redesigned.

Validation: verify-map-coverage.cjs PASS: 177 paths, drawable geometry for all 20 offered countries, restored multi-class and nonstandard-code cases. Supplied functional suite: 25 groups PASS after restoration. Chrome supervised preview: Madrid + Lom visually checked at 390px; Spain now has a visible blue country shape under Madrid. Evidence: review-evidence/screen1-c2-controller/restored-spain-lom-390.jpg.

This completes geometry correction only, not the whole map reuse programme. Existing 1530-name data remains preserved in cities.js. Integrating the larger suggestion list with verified identities/coordinates, audited pan/zoom, and result-copy/registration-transition improvements remains pending. No all-locality, real-phone keyboard, screen-reader or full §99 approval is claimed. Main, Supabase and Screen 2 untouched.
