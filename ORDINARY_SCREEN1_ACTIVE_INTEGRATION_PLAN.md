# Ordinary Screen 1 — active integration plan

**Owner-approved process adaptation:** 22.09.2026  
**Active branch:** `review/ordinary-screen1-active-integration`  
**Starting checkpoint:** `43e0bb9be12b1f7a712cacb834c379eea3eee458`

## 1. Process rule from this point

This branch is the single active ordinary integration line for Screen 1.

Older ordinary branches are frozen historical checkpoints. They remain available for WORK CONTROLLER audit, but corrections are no longer mirrored backward across all old branches.

Flow from now on:

`bounded task → audit → implementation → verification → checkpoint commit → next bounded task`

WORK CONTROLLER still reviews/adopts the work. Owner remains final authority.

No merge, deploy, production, main or Supabase change is implied by work on this branch.

## 2. Adaptive task sizing rule

Task size is chosen by risk and dependency, not by a fixed number of files or minutes.

### Small
Use when:
- one local behavior/copy/test correction;
- no product-state change;
- no cross-module dependency;
- failure is easy to isolate and revert.

Execution:
- implement directly after confirming existing rule;
- targeted verification;
- one meaningful checkpoint.

Do not stop the project for microscopic edits that can safely belong to one small batch.

### Medium
Use when:
- one clear feature slice touches several related functions/files;
- existing product decision already authorizes the behavior;
- several states must be tested together;
- rollback boundary is still obvious.

Execution:
- brief dependency audit;
- implementation in one coherent slice;
- focused regression matrix;
- checkpoint before the next slice.

### Large
Use when:
- multiple independent product/technical risks are mixed;
- new architecture/state/identity/backend behavior is involved;
- task spans several user states or would create a large difficult-to-review diff;
- failure would cause major rework.

Execution:
- do **not** implement as one task;
- split into ordered small/medium sub-tasks;
- each sub-task must be independently reviewable and testable;
- stop at product decision gates and report to Owner.

## 3. Product/data boundary for locality work

Current known layers:

- world map geometry: **177 country shapes**;
- `countries.js`: **62 selectable countries**;
- `cities.js`: **1530 name suggestions under 60 country keys**;
- `MT` and `LU`: country entries exist but no local city list;
- local name data is not a complete all-cities/all-villages registry;
- names are suggestions, not canonical verified locality identities;
- canonical IDs, verified coordinates and production aggregate eligibility remain separate.

Approved direction:

**Use the full available local scope in the prototype without pretending it is complete production geography.**

That means:
- all existing 62 countries may appear in the test UI;
- all existing 1530 names may participate as Layer-A suggestions;
- countries without a list remain selectable and exercise the fallback path;
- list-only names do not receive invented IDs/coordinates/verified state;
- existing C2 demo identities remain explicitly separate test fixtures.

## 4. Ordered task sequence

### T1 — Full country selector scope
**Size: Medium**  
**Status: TECHNICAL CHECKPOINT — selector scope PASS; country-focus correction 9/9 PASS; MT/SG + full mobile visual remain open**

Goal:
- remove the artificial 20-country C2 gate in the active lab candidate;
- use all 62 entries from `countries.js`;
- preserve the source order and Bulgarian labels.

Must verify:
- 62 options exactly;
- no duplicate country codes;
- selected-country state/reset remains correct;
- mobile selector remains usable;
- no change to canonical identity rules.

Not included:
- adding countries not present in `countries.js`;
- backend or production registration changes.

Checkpoint completed. Next active task: T2.

---

### T2 — Full Layer-A locality suggestions
**Size: Medium**  
**Status: DONE — source-backed 17/17 PASS; no prototype logic change required**

Goal:
- exercise all 1530 existing `cities.js` names through the adapter for their selected country;
- keep the current country-scoped search, normalization, original spelling and max-10 behavior.

Representative verification:
- dense list: Germany / Spain;
- medium list;
- sparse list;
- Bulgaria;
- cross-country exclusion;
- long locality labels;
- keyboard/touch selection;
- empty-query C2 demo behavior remains controlled.

Not included:
- declaring the dataset complete;
- fuzzy/transliteration/autocorrect;
- canonicalizing all 1530 names.

Checkpoint completed. Next active task: T3.

---

### T3A — Selectable country without map geometry
**Size: Small**  
**Status: TECHNICAL CHECKPOINT — source-backed 11/11 PASS; visual/WORK acceptance NOT VERIFIED**

Goal:
- handle valid selectable countries with no separate SVG country shape;
- current cases: MT and SG;
- keep country validity separate from visualization capability;
- never invent a country centre/point.

Authority:
- ordinary-executor proposal;
- Owner agreed it may be tested;
- not canonical until WORK review.

Checkpoint completed.

---

### T3B — Missing Layer-A list / fallback states
**Size: Small-to-Medium**

Goal:
- explicitly verify MT/LU where the country exists but Layer-A has no local list;
- ensure UI does not look broken or empty without explanation;
- controlled `Не намираш мястото?` path remains reachable.

Must verify:
- no fake suggestions;
- no fake coordinates;
- no blocked flow caused only by an absent local list;
- SG remains a separate case: no geometry, but it does have Layer-A locality data.

If this requires changing approved fallback semantics, stop and ask Owner.

Checkpoint required before T4.

---

### T4 — Suggestion vs canonical identity contract
**Size: Medium**

Goal:
- harden the integration boundary so UI scope can grow without coupling every suggestion to the current demo fixture array.

Target architecture:
`country → suggestion source → selected label → resolver/identity boundary → optional verified locality`

Must verify:
- list-only choice never silently becomes trusted canonical context;
- demo canonical fixture can still exercise current result/map flow;
- unverified/pending state is explicit;
- no aggregate eligibility inferred from raw name.

No backend provider implementation.

Checkpoint required before T5.

---

### T5 — Root/Bulgaria coverage reality check
**Size: Medium analysis + bounded implementation only if already authorized**

Reason:
- approved Root is national Bulgaria;
- existing `cities.js` has only four Bulgarian names;
- C2 also contains additional demo BG fixtures;
- neither source is a complete Bulgarian settlement registry.

Goal:
- test the correct architecture without pretending we have full Bulgarian coverage.

Scenarios:
- canonical demo Root;
- Layer-A BG suggestion;
- Bulgarian place absent from local data;
- fallback/pending Root;
- nearby and same-place map cases.

If a complete Bulgaria dataset/provider is required to proceed, stop at proposal; do not create a hand-built pseudo-registry.

Checkpoint required before T6.

---

### T6 — Geographic/UI regression matrix at realistic data scope
**Size: Medium**

Run representative states, not every 1530-name pair.

Required classes:
- canonical demo locality;
- list-only locality;
- missing-list country;
- dense-country search;
- sparse-country search;
- long country/locality names;
- country switch after locality selection;
- 360 / 390 / 412;
- 200% text;
- current/root states;
- error/fallback/recovery.

Checkpoint required before T7.

---

### T7 — Interaction/performance audit
**Size: Medium**

Goal:
- confirm expanding 20 → 62 countries and full Layer-A suggestions does not make the UI heavy or interaction confusing.

Check:
- no per-keypress network request;
- no full 1530-item DOM rendering;
- max-10 rendered suggestion results;
- country switch responsiveness;
- map pan/zoom unaffected;
- single-touch page scroll intent preserved;
- no unnecessary new library.

Real-device items remain `NOT VERIFIED` until actually tested.

Checkpoint required before T8.

---

### T8 — Final active-candidate package for WORK
**Size: Small**

Produce:
- exact active HEAD;
- ordered commits/checkpoints;
- changed-file list;
- PASS / NOT VERIFIED matrix;
- known data limitations;
- explicit no-Supabase/no-production statement;
- recommendation for WORK adoption order.

No PR/merge/promotion unless explicitly requested.

## 5. Stop / Owner decision gates

Stop and report here before implementation if work would require:
- changing an approved product rule;
- adding a new locality provider;
- choosing a complete national/world settlement registry;
- inventing canonical IDs or coordinates;
- changing aggregate/privacy eligibility;
- changing Root/Current meaning;
- adding Screen 2/auth/backend;
- significant new dependency;
- changing production/main/Supabase.

## 6. Why this order reduces rework

The sequence intentionally validates from lowest coupling to highest:

`country scope → local suggestion scope → absent-data behavior → identity boundary → Root reality → UI matrix → performance → WORK package`

This makes the prototype realistic early, while keeping incomplete geography data behind a stable boundary. If a later provider or registry changes, the UI and Screen 1 flow should not need to be redesigned.
