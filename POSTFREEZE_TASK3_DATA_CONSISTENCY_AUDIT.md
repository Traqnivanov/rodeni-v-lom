# Post-freeze Task 3 — data consistency audit

Branch: `review/ordinary-screen1-postfreeze-work`

Frozen base:
- branch: `review/ordinary-screen1-frozen-for-work`
- SHA: `1c1551dc47faa249132394f019491373bc876f22`
- active frozen candidate: `prototype-screen1-map-interaction-lab.html`
- candidate blob: `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

## Scope and authority

This is a data-consistency audit only.

Before auditing, checked:
1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`
4. relevant Master §63 and §100.4

Also cross-checked the post-freeze QA errata/contradiction audit so already-approved rules were not re-invented.

Canonical baseline:
- `countries.js + cities.js` remain Layer A;
- Layer A labels are suggestions, not canonical locality identities;
- exact locality use requires canonical identity;
- missing/unverified text cannot create trusted exact matching;
- a place without valid coordinates must never borrow another place's coordinate;
- GeoNames is the existing working Layer B fallback recommendation, not a replacement for Layer A.

No provider decision, product rule or frozen implementation is changed here.

## Structural results

### countries.js
- selectable countries: **62**
- duplicate country codes: **0**
- blank/invalid country-code findings: **0**

### cities.js
- country keys with Layer-A lists: **60**
- total locality-name suggestions: **1530**
- country keys not present in countries.js: **0**
- exact duplicate names inside the same country list: **0**
- blank locality labels: **0**
- non-string locality entries: **0**

Countries without a Layer-A list:
- `MT` — Malta
- `LU` — Luxembourg

This is already documented as a known missing-list demo state, not a contradiction.

### Map geometry
- SVG country paths: **178**
- unique SVG country codes: **177**
- duplicate internal geometry code: `-99` appears on more than one path
- selectable countries without their own current SVG geometry:
  - `MT` — Malta
  - `SG` — Singapore

The `-99` geometry code is not a selectable country from countries.js and is not used as locality identity.

The MT/SG no-geometry cases are known review cases. The candidate does not invent a replacement country centre or borrow another country's point.

### Demo canonical-place fixtures
- demo place fixtures: **45**
- unknown country codes: **0**
- duplicate demo IDs: **0**
- duplicate coordinate pairs: **0**
- non-finite/missing demo coordinates: **0**
- demo fixtures whose country has no geometry: **0**

Therefore every demo fixture that is allowed to act as a demo canonical place has its own finite map point.

## Aggregate/demo fixture integrity

Checked the hard-coded demo result references:
- exact result keys;
- safe-broader current keys;
- Current-only keys;
- Lom-region Root group.

Findings:
- every referenced Current place exists in the demo fixture registry;
- every referenced Root place exists;
- every exact Root reference is Bulgarian;
- every broader/current-only reference resolves to an existing demo canonical place;
- no aggregate fixture references a raw Layer-A-only label.

**Aggregate fixture reference check: PASS.**

## Canonical identity boundary

The frozen candidate keeps Layer-A labels separate from demo canonical identity:

- Layer-A search may return a name;
- if that name has no matching demo fixture, it stays draft/unverified;
- it does not receive another place's coordinate;
- it does not unlock exact aggregate state by itself;
- Current cannot continue as canonical unless it resolves to a demo canonical fixture;
- Root preserves the already-approved unverified path.

This is aligned with the already-approved `raw text != canonical locality` rule.

## Known Bulgaria/demo exception — not a contradiction

Layer-A Bulgaria currently contains only:
- София
- Пловдив
- Бургас
- Стара Загора

The frozen demo fixture registry intentionally contains additional Bulgarian places for Screen 1 review, including:
- Лом
- Ковачица
- Монтана
- Видин
- Берковица
- Враца
- Козлодуй
- Плевен
- Варна
- Русе
- Велико Търново

This does not silently expand Layer A. Those entries are separate demo canonical fixtures.

`Бургас` is deliberately a useful boundary case:
- present in Layer A;
- also present as a fallback demo fixture;
- Layer-A selection alone does not become canonical automatically;
- controlled demo verification can resolve it to the fixture.

That behavior is consistent with the existing T4 boundary.

## Issues found

### DATA-01 — MEDIUM — Frankfurt label collision between Layer A and demo fixture

Layer A under Germany contains:
- `Франкфурт на Майн`

The demo canonical fixture contains:
- `DE|Франкфурт`

Because the labels are not identical, the search flow can expose both:
- the Layer-A suggestion `Франкфурт на Майн`, which remains draft/unverified in this demo;
- the demo canonical option `Франкфурт`, which can become the canonical demo identity.

Why this matters:
- the shorter demo label is ambiguous inside Germany;
- two labels can appear to describe the same intended city while having different identity behavior;
- this is exactly the kind of alias/canonical-name inconsistency that the production locality registry will need to prevent.

Important:
- this does **not** currently corrupt an exact/broader/current-only aggregate fixture;
- Frankfurt is not referenced by the hard-coded aggregate result tables.

Status:
**CONSISTENCY ISSUE CONFIRMED.**

No data change applied.

### DATA-02 — MEDIUM — Brussels entity/label overlap between Layer A and demo fixture

Layer A under Belgium contains:
- `Столичен регион Брюксел`

The demo canonical fixture contains:
- `BE|Брюксел`

These are not the same label and may represent different administrative scopes.

The search can therefore expose two overlapping Brussels concepts with different demo identity behavior.

Why this matters:
- city vs region semantics are not explicit;
- an eventual canonical registry must distinguish entity type and stable identity, rather than relying on display text.

Important:
- this also does **not** currently corrupt any hard-coded aggregate result table.

Status:
**CONSISTENCY / DISAMBIGUATION ISSUE CONFIRMED.**

No data change applied.

## Known limitations that are NOT failures

### MT / LU — no local Layer-A list
This is already an intentional review case:
- selectable country remains valid;
- write-first/fallback state appears;
- no raw text is promoted to canonical Current.

### MT / SG — no separate SVG geometry
This is already an intentional review case:
- country remains selectable;
- no fake marker/borrowed coordinate is used;
- map geometry is not treated as country-validity authority.

### Layer A is not a complete locality registry
1530 names are suggestions under 60 country keys, not 1530 canonical identities and not complete world coverage.

### Bulgaria Root dataset is incomplete
The four BG Layer-A names are not treated as the national canonical Root registry.

## What this task does NOT verify

This static consistency audit does **not** prove:
- external geographic correctness of all 1530 locality names;
- external geographic correctness of every hand-authored demo coordinate;
- administrative hierarchy accuracy;
- production GeoNames/backend behavior;
- stable production locality IDs.

What is verified here is the internal relationship between the current repository data sources and the frozen candidate.

## Task 3 result

**PARTIAL / ISSUES FOUND.**

Strong structural consistency:
- 62 selectable countries;
- 60 Layer-A country lists;
- exactly 1530 suggestions;
- no unknown city-list country keys;
- no duplicate country codes;
- no duplicate names inside a country list;
- all aggregate demo references resolve to real demo fixtures;
- unresolved labels do not borrow coordinates or become trusted canonical identity.

Confirmed data issues:
- 2 MEDIUM naming/entity consistency problems:
  1. Frankfurt
  2. Brussels

No frozen candidate, C1/C2 artifact, Layer-A file, canonical authority document, main, production, Supabase or Screen 2 was changed.

## What WORK should inspect later

1. Decide the canonical/alias treatment for `Франкфурт` vs `Франкфурт на Майн`.
2. Decide whether the Brussels Layer-A label and demo fixture represent city vs region and how that distinction should be encoded.
3. Preserve the approved rule that display aliases do not define canonical identity.
4. Preserve MT/LU/SG as explicit missing-data/geometry review cases until a real provider/registry exists.
5. Do not replace the 1530-name Layer A as a side effect of fixing these two fixture/name mismatches.
