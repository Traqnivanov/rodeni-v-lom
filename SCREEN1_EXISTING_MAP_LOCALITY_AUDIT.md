# Existing map and locality reuse audit — WORK CONTROLLER
Date: 2026-09-21
Status: source audit completed; C2 final approval remains BLOCKED. No runtime adoption or deployment in this audit.

## Exact inspected sources
Repository: Traqnivanov/rodeni-v-lom
Main: 7b1af9840f0054b477f1a2fb5ec33b709c8002de.
Review baseline: 01ec7aeedf235b2f2fb361b044fd1f5bacbaa2c5.
Files: index.html, account.html, cities.js, countries.js, prototype-screen1.html, PROJECT_STATE.md, START_HERE.md, review Master §63 and §100, V13 source and C1/C2 SVG.
Cities introduction commit: e2d44a2994ef3fe388099d71b6c50b49fca4af07.
Owner direction: audit existing work before adopting it; preserve useful prior work, including map interactions and locality lists.

## Findings and reuse decisions
1. KEEP existing countries.js and cities.js as local suggestion data, as already required by approved Master §63.
   countries.js has 62 countries. cities.js has 1530 names under 60 country keys (55 Spain, 73 Germany); no duplicate identical names within a country detected.
   The file is 30434 bytes, loaded locally, without a remote request for each typed character. Names were curated according to the introduction commit; this audit did not independently validate all 1530 spellings.
2. Do not call this a complete all-villages registry.
   cities.js is names only, predominantly larger cities; BG has four names. account.html separately lists Lom and nine other municipality settlements plus Other.
   It has no stable per-locality ID or coordinates. Those are separate requirements.
3. KEEP the existing hybrid resolution product decision.
   Master §63 explicitly preserves these files as first layer and adds country-scoped explicit fallback, cached verified identities and pending/unverified handling.
   Its implementation status is explicitly NOT IMPLEMENTED. The old prototype fallback uses a timer and small hardcoded fixtures, not a real provider.
   Therefore the prior statement that the entire locality capability is future work was incorrect; local data/UX exist, canonical resolver completion is outstanding.
4. KEEP the complete original map geometry/projection as a reuse source.
   index.html renders all world-atlas features with Natural Earth projection. It does not deliberately remove Spain.
   V13 has 177 country paths; C1/C2 have 170. DE/ES/GB/IT exist in V13 with class "country has-signal", but are missing in C1/C2. The transfer also lost paths coded "-99" and "CN-TW".
   Loss occurred between V13 and C1, inherited by C2. Do not describe it as an intentional demo limitation or a defect in the user's original map.
5. KEEP interaction implementation as a reference; do not approve wholesale replacement.
   Original index uses d3.zoom, bounds 1–6 and bounded translation, applying a group transform rather than rebuilding geometry on every zoom. Old prototype uses bounds 1–5.
   This is evidence of implemented controls, not a measured performance benchmark or real-device approval. Pointer/touch and scroll conflict need runtime testing before adoption.
   C2 guided entry and readable fixed-size HTML labels remain useful. Restore/adapt map interaction without shrinking labels or bringing back intrusive entry controls.
6. REJECT old privacy/person-display logic for reuse.
   Original map tooltip shows exact counts, including one person, and country selection opens existing community/person views. These do not meet the newly approved aggregate threshold/bands and visibility contract. Reuse geometry/interaction separately from data/person logic.
7. REJECT inaccurate coordinate fallbacks.
   Old prototype validateCity uses CITY_COORDS or the country center, then [0,20]. A country center is not a verified city location. Importing 1530 names does not justify giving them invented map coordinates.
8. REJECT old marker scaling and fixed pair zoom as-is.
   Old prototype markers are inside the zoomed SVG scene and thus scale with it. Pair focus uses fixed scale 1.45, not a true bounds fit.
   Preserve the approved fixed-size labels and pair-fit requirement.
9. Preserve C2 inline combobox rather than bringing back native datalist, whose phone behavior prompted C2.

## Required correction sequence
A. Restore all original country geometry with attribute-aware extraction; verify every original country path survives, including country paths with extra classes/non-two-letter codes. Add a regression check for every offered country having drawable geometry.
B. Retain the curated lists in the architecture and document the source. Separate suggestion label, canonical identity and verified coordinate; no country-centroid marker masquerading as city.
C. Integrate audited pan/zoom behavior with C2 layout in the review candidate; test wheel, drag, touch/page-scroll coexistence and readable labels before acceptance.
D. Recheck Spain–Lom, Germany–Lom, UK–Lom, Italy–Lom, nearby BG pair, long labels, widths 360/390/412 and external text enlargement. Current limited demo list must be clearly distinguished from the preserved local dataset.
E. Resolve previously reported result-copy duplication and registration transition separately against canonical product decisions. Do not change aggregate eligibility or visibility rules.

## Release status
The 25 DOM test groups previously passing did not establish country coverage or full release readiness. Earlier controller report's "no geography change from C2" is only a comparison against C2, not proof of map completeness.
No main, product production, Supabase, Screen 2 or Site preview changes during this audit.
No real phone keyboard, screen reader, pointer performance or all-locality visual PASS is claimed.
Next implementation starts from the reviewed candidate and this report, not a fresh map/list rebuild.
