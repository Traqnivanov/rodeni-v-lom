# SCREEN 1 — ORDINARY FINAL WORK HANDOFF

**Role:** ordinary-executor package for independent WORK CONTROLLER review  
**Active branch:** `review/ordinary-screen1-active-integration`  
**WORK base:** `a809b3bf6bfcc8991304a806894a04f9e75d4c0f`  
**Official WORK C2 blob preserved:** `750eafb4275b8e551325bf372bf70a028ac5c3ab`  
**Active candidate file:** `prototype-screen1-map-interaction-lab.html`  
**Active candidate blob:** `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

> START HERE FOR THE CURRENT ORDINARY PACKAGE.
>
> `ORDINARY_SCREEN1_LOCALITY_MAP_HANDOFF.md` is historical/superseded.
> `prototype-screen1-locality-integration-lab.html` is a historical intermediate lab.
> The only current product-facing ordinary candidate for WORK review is:
> `prototype-screen1-map-interaction-lab.html`.

## 1. Authority and review boundary

This package is **not final product approval**.

- Owner remains final product/visual authority.
- WORK CONTROLLER independently audits/adopts/rejects ordinary work.
- Ordinary executor did not merge, deploy, modify production/main, or touch Supabase.
- No Screen 2/auth/backend/provider was implemented.
- No complete national/world locality registry was invented.

Where an ordinary proposal was allowed to be implemented for prototype testing, the documents explicitly distinguish:
- ordinary-executor proposal;
- Owner permission to test;
- WORK CONTROLLER decision still required for canonicalization.

In particular, the no-map-geometry behavior and the T4 draft/canonical boundary are **not Owner-originated product ideas**.

## 2. Why this active line exists

The original C2 flow exposed an artificially narrow country set even though repository-local data already contained broader scope.

The active line tested a lower-rework architecture:

`country source → Layer-A suggestion source → private draft label → canonical identity boundary → optional valid coordinate → privacy-safe Screen 1 result`

The critical design separation is:

1. **Suggestion/draft label is not canonical identity.**
2. **Canonical identity is not automatically a map coordinate.**
3. **Map visualization does not determine whether a country/context is valid.**
4. **Raw text never becomes aggregate/matching eligibility by itself.**

## 3. Ordered checkpoints

### T1 — full country selector scope

Current prototype uses all existing `countries.js` entries:
- **62 selectable countries**.

Post-audit correction:
- selected-country map focus uses the actual SVG country shape when available;
- focus no longer depends on a demo locality fixture.

Evidence:
- `screen1-full-country-selector.test.cjs`
- `SCREEN1_T1_FULL_COUNTRY_SELECTOR_REVIEW.md`

Important boundary:
- this is not a claim that all world countries are present;
- MT/SG geometry exceptions are handled separately;
- real-device visual approval is not implied.

---

### T2 — full Layer-A locality suggestion scope

Current local Layer-A source:
- **60 country keys**
- **1530 locality-name suggestions**

All 1530 existing names are reachable under their own country through the adapter.

Evidence:
- `screen1-layer-a-suggestions.test.cjs`
- `SCREEN1_T2_LAYER_A_SUGGESTIONS_REVIEW.md`

Post-audit correction:
- T2 is a **data/search coverage PASS**, not end-to-end identity PASS.
- 1530 suggestion labels must not be mistaken for 1530 canonical identities.

---

### T3A — selectable country without map geometry

Current known cases:
- MT — selectable; no separate current SVG country shape; no Layer-A list.
- SG — selectable; no separate current SVG country shape; does have Layer-A data.

Prototype behavior under review:
- country remains valid/selectable;
- no invented country centre;
- no fake marker;
- no borrowed shape/coordinate;
- safe general map view;
- human continuation cue.

Authorship:
- ordinary-executor proposal;
- Owner allowed prototype testing;
- **not canonical / not Owner-originated**;
- WORK must decide whether/how to canonicalize.

Evidence:
- `SCREEN1_COUNTRY_NO_GEOMETRY_WORKING_PROPOSAL.md`
- `screen1-country-no-geometry.test.cjs`
- `SCREEN1_T3A_COUNTRY_NO_GEOMETRY_REVIEW.md`

---

### T4 — suggestion/draft vs canonical identity boundary

Problem corrected:
- a list-only Layer-A suggestion previously looked selected even though no canonical identity existed;
- primary CTA could appear usable before canonical Current.

Active model:
- `currentDraft` / `rootDraft` = private display/search state;
- `current` / `root` = canonical demo identity;
- draft never creates canonical state by itself;
- mandatory Current has no unverified bypass;
- Root keeps the already-approved Root-only unverified path;
- canonical identity no longer assumes map coordinates always exist.

Human verification copy:
**„Провери мястото, за да сме сигурни, че е правилното.“**

Evidence:
- `SCREEN1_T4_IDENTITY_BOUNDARY_PROPOSAL.md`
- `screen1-t4-identity-boundary.test.cjs`
- `SCREEN1_T4_IDENTITY_BOUNDARY_REVIEW.md`

Checkpoint evidence:
- **24/24 source PASS**
- targeted 360px mobile draft/canonical visual review
- 360px / 200% reflow review

Authorship:
- ordinary-executor interaction proposal;
- Owner authorized prototype implementation/testing;
- **not Owner-originated canonical rule**.

---

### T3B — selectable country without Layer-A list

Current cases:
- MT — no Layer-A list;
- LU — no Layer-A list.

Distinct comparison:
- SG has Layer-A data even though map geometry is absent.

Active behavior:
- write-first locality field;
- verification block opens immediately;
- no fake autocomplete result;
- no raw-text canonicalization;
- Current CTA remains disabled until canonical Current;
- honest demo limitation when resolver cannot confirm the place.

Evidence:
- `screen1-t3b-missing-locality-list.test.cjs`
- `SCREEN1_T3B_MISSING_LOCALITY_LIST_REVIEW.md`

Checkpoint:
- **17/17 source PASS**
- 360px MT/LU targeted visual review
- LU 200% reflow review

Important limitation:
- no real provider exists in this prototype, so arbitrary MT/LU locality cannot honestly become a new canonical Current.

---

### T5 — Root / Bulgaria reality check

Current `cities.js` Bulgaria Layer-A list is intentionally incomplete:
- София
- Пловдив
- Бургас
- Стара Загора

Active Root step was aligned with the approved Root contract:
- Current locality + country summary;
- compact **„Промени“** action;
- approved helper meaning;
- `Населено място в България`;
- explicit privacy copy;
- `Виж какво показва картата`.

Root-only Latin matching was added without changing the original adapter contract.

Verified search-key examples:
- `Lom` → Лом
- `Kovachitsa` → Ковачица
- `Sofia` / `Sofiya` → София
- `Veliko Tarnovo` → matching key for Велико Търново

Representative Root classes:
- Лом — direct demo canonical;
- София — Layer-A + direct canonical;
- Бургас — Layer-A → controlled resolver → canonical demo fixture;
- Стара Загора — Layer-A unresolved → Root-only unverified option;
- Трайково — absent from current local data/demo fixtures.

Map counterexamples reviewed:
- Ковачица ↔ Лом;
- Лом ↔ Лом.

Evidence:
- `screen1-t5-root-bulgaria-coverage.test.cjs`
- `SCREEN1_T5_ROOT_BULGARIA_COVERAGE_REVIEW.md`

Checkpoint:
- **26/26 source PASS**
- targeted 360px Root/Latin/resolver/unverified/near/same review
- Root 200% status-wrap review

Important limitation:
- no complete Bulgarian settlement registry;
- no municipality/region metadata for same-name settlement disambiguation;
- do not invent that metadata in the prototype.

---

### T6 — realistic geographic/UI regression matrix

No Screen 1 product code changed during T6.

Stable candidate blob throughout:
`a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

Representative classes reviewed:
- dense country: US / 180 names / max-10 visible results;
- sparse country: SI / 1 name;
- missing list: LU;
- long locality: Сейнт Джонс (Нюфаундленд и Лабрадор);
- long country: Обединени арабски емирства;
- country switch DE → FR;
- expired session recovery;
- error state;
- Root fallback;
- 360 / 390 / 412;
- 200% dense suggestion reflow.

Evidence:
- `screen1-t6-realistic-regression-matrix.test.cjs`
- `SCREEN1_T6_REALISTIC_REGRESSION_MATRIX_REVIEW.md`

Recorded:
- detailed source audit **28/28 PASS**
- final integrity audit **18/18 PASS**
- representative mobile matrix PASS

The earlier map/camera matrix remains relevant:
- Spain/Lom;
- Germany/Lom;
- UK/Lom;
- Italy/Lom;
- nearby BG;
- same place;
- long labels;
- 360/390/412;
- normal/200% pair heights.

---

### T7 — interaction/performance audit

No Screen 1 product code changed during T7.

Active candidate blob remained:
`a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

Audit result:
- no `fetch` / XHR / WebSocket / EventSource / sendBeacon in search path;
- local script dependencies only:
  - countries.js
  - cities.js
  - locality-suggestions-adapter.js
- no D3/topojson/Supabase runtime dependency added;
- max 10 rendered suggestions;
- empty query limited to demo choices;
- map interaction engine byte-for-byte identical to the earlier bounded interaction checkpoint;
- one-finger page-scroll intent preserved in source;
- pinch requires two touch pointers.

Sample browser timing observations in Opera/Chromium review environment:

360px:
- search avg 0.81ms
- search max 2.70ms
- 10 options
- DE→FR switch 6.60ms

412px:
- search avg 0.50ms
- search max 1.10ms
- 10 options
- DE→FR switch 9.30ms

These are **environment observations, not universal device benchmarks**.

Evidence:
- `screen1-t7-interaction-performance.test.cjs`
- `SCREEN1_T7_INTERACTION_PERFORMANCE_REVIEW.md`

Final T7 source audit:
- **23/23 PASS**

Known minor inefficiency:
- first edit of an already-canonical locality may produce one redundant sessionStorage save;
- bounded/local/no network impact;
- no candidate change made for micro-optimization only.

## 4. Registration boundary

The active candidate also contains the previously reviewed Screen 1 boundary copy alignment.

The prototype intentionally stops before actual registration.

No Screen 2/auth flow is implemented.

Relevant evidence:
- `registration-boundary-copy.test.cjs`
- `REGISTRATION_BOUNDARY_COPY_REVIEW.md`

WORK should independently confirm that the boundary copy remains compatible with:
- short registration;
- email confirmation;
- pending private context continuity;
- post-confirmation review/edit;
- onboarding order.

## 5. Active vs historical artifacts

### ACTIVE product-facing ordinary candidate
- `prototype-screen1-map-interaction-lab.html`

### ACTIVE QA-only visual harness
- `prototype-screen1-mobile-visual-review.html`

The QA harness:
- is not product UI;
- may inject test session state;
- contains timing/review diagnostics;
- must not be promoted as product code.

### HISTORICAL / intermediate
- `prototype-screen1-locality-integration-lab.html`
- `ORDINARY_SCREEN1_LOCALITY_MAP_HANDOFF.md`
- earlier lab-specific review snapshots

Historical artifacts are preserved for audit trace only.

## 6. PASS / NOT VERIFIED matrix

### PASS / evidenced in ordinary package

- official WORK C2 blob unchanged;
- WORK base history not rewritten;
- active branch ahead of base, not diverged behind;
- all ordinary product/review/test files are isolated additions relative to WORK base;
- 62-country source integration;
- 1530-name Layer-A coverage;
- country-scoped suggestion cap;
- draft vs canonical identity separation;
- canonical identity vs optional coordinate separation;
- no-map-geometry safe state;
- no-list safe state;
- Root-only Latin matching;
- Root pending/unverified aggregate protection;
- country-switch state reset;
- stale-session recovery;
- representative mobile matrix;
- 200% targeted reflow states;
- bounded local search;
- no search-time network dependency;
- unchanged bounded map interaction engine.

### NOT VERIFIED / NOT IMPLEMENTED

- real phone soft keyboard / IME;
- physical phone one-finger scroll feel;
- physical phone pinch gesture arbitration;
- screen reader pass;
- low-end Android performance;
- complete world locality registry;
- complete Bulgarian settlement registry;
- same-name Bulgarian municipality/region disambiguation metadata;
- production canonical provider/backend/cache;
- real production network latency/failure behavior for provider;
- final Owner phone approval of Screen 1;
- WORK CONTROLLER acceptance/canonicalization;
- PR/merge/promotion/deploy.

## 7. Data limitations WORK must not erase

1. `countries.js` = 62 selectable countries, not a claim of full world-country product scope.
2. `cities.js` = 1530 names under 60 country keys, not a full cities/villages registry.
3. A Layer-A name is not a canonical locality identity.
4. MT/LU/SG demonstrate different absent-data/geometry combinations.
5. Root Bulgaria data is demonstrative/incomplete.
6. No stable production locality IDs were invented.
7. No arbitrary coordinates were invented.
8. Aggregate eligibility still depends on canonical/privacy-safe state, not raw labels.
9. Map capability is visualization capability, not country-validity authority.

## 8. Recommended WORK CONTROLLER adoption order

WORK should not adopt the package as one blind diff.

Recommended order:

1. **Audit authority/status boundaries**
   - confirm ordinary proposal vs canonical approved contract;
   - especially T3A and T4.

2. **Audit active candidate identity**
   - use only `prototype-screen1-map-interaction-lab.html`;
   - ignore historical prototype as adoption source.

3. **Review T1/T2 data-scope expansion**
   - 62-country source;
   - Layer-A 1530-name integration.

4. **Review T4 identity boundary before fallback states**
   - draft ≠ canonical;
   - canonical ≠ coordinate.

5. **Review T3A/T3B absent-data behavior**
   - missing map geometry;
   - missing locality list.

6. **Review T5 Root alignment**
   - approved Root contract;
   - Latin search;
   - incomplete BG-data boundary.

7. **Re-run T6/T7 regression evidence**
   - source tests;
   - representative mobile matrix;
   - interaction/performance checks.

8. **Canonicalize only accepted product adaptations**
   - do not treat ordinary review documents as source of truth until WORK explicitly adopts them.

9. **Require real-device gate before final Owner approval**
   - phone;
   - keyboard/IME;
   - one-finger scroll/pinch;
   - screen reader as required by §99.

## 9. Explicit non-actions

This ordinary package did **not**:
- modify production/main;
- modify Supabase;
- add provider/backend;
- add Screen 2;
- add auth;
- merge to WORK branch;
- open/merge a PR;
- deploy a release;
- declare final Owner approval.

## 10. WORK review objective

The question for WORK is not “did ordinary tests pass?”

The review objective is:

**Does this active candidate preserve the approved Screen 1 product contract while making broader locality scope easier to integrate later without false identity, false coordinates, privacy regression, mobile regression or unnecessary runtime cost?**

If WORK accepts the direction, it should canonicalize only the accepted rules and then produce its own controlled candidate/checkpoint for Owner review.
