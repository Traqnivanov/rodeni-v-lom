# Screen 1 — canonical contradiction audit after Owner catch

**Branch:** `review/ordinary-screen1-postfreeze-qa`  
**Frozen package audited:** `review/ordinary-screen1-frozen-for-work` @ `1c1551dc47faa249132394f019491373bc876f22`

## Why this audit exists

Owner caught a real process failure: provider/locality research was started as if the global locality architecture were still open, without first re-reading the already-approved Master §63 Hybrid locality resolution.

That was not a harmless wording issue.

The project process explicitly requires:
`START_HERE → PROJECT_STATE → PRODUCT_FUNCTION_DEPENDENCY_MAP → relevant Master section`
before product/UX/flow decisions.

This audit therefore re-checks the ordinary Screen 1 package against the canonical documents instead of relying on chat memory.

No frozen candidate code is changed by this audit.

---

# Executive result

## Candidate behavior

No new frozen Screen 1 product bug was found in this pass that requires reopening the candidate.

The frozen implementation remains broadly aligned with the approved locality and Screen 1 contracts.

## Documentation / authority

Three real issues were found:

1. **HIGH — provider research initially ignored already-approved §63 architecture.**
2. **HIGH — T4 documentation overstates ordinary ownership of a principle that is already canonical.**
3. **MEDIUM/HIGH — T3A documentation overstates ordinary ownership of the no-fake-coordinate principle already present in §100.4.**

A separate source-of-truth drift was also found:

4. **HIGH PROCESS RISK — START_HERE / PROJECT_STATE still headline WORK C1 while the same branch contains the later C2 controller review and C2 candidate.**

This fourth issue is repository documentation drift, not a frozen candidate defect.

---

# Finding 1 — provider/locality architecture was already decided

## What I incorrectly treated as open

The post-freeze locality/provider research initially compared global provider architectures as though the project had not already decided how the existing local lists fit into the product.

That framing could imply:
- replace `cities.js`;
- reconsider whether a provider should be primary;
- treat the 1530-name work as provisional.

## Canonical truth

Master §63 is already **ОДОБРЕНО**:

### Layer A
Preserve:
- `countries.js`;
- `cities.js`;

as the first fast local suggestion layer.

No external request for normal local-list selection.

### Layer B
Only when the locality is missing:
- explicit **„Не намирам населеното място“** path;
- backend lookup scoped to selected country;
- populated places only;
- few candidates;
- user confirms.

### Working provider recommendation
Master §63 already names **GeoNames** as the working fallback recommendation.

### Layer C
Confirmed external places are cached in a local Rodeni locality registry.

### Layer D
If resolution fails:
- pending/unverified label may remain;
- it does not create high-confidence exact-locality matching.

## Historical evidence

The original `cities.js` commit explicitly states:
- 1530 larger cities in the 62 countries;
- checked Bulgarian names from Wikipedia/Wikidata;
- local file;
- no external API/fees;
- missing city may remain free text in the historical implementation.

Later Master §63 deliberately keeps the useful local-list work but replaces raw-text exact matching with canonical hybrid resolution.

## Correction

`SCREEN1_LOCALITY_PROVIDER_RESEARCH.md` now has a correction banner.

Correct interpretation:

**The 1530-city local layer stays.**
Provider research is only about the controlled fallback/enrichment boundary, not replacing Layer A.

---

# Finding 2 — T4 core principle was already canonical

## Frozen ordinary wording that is too broad

The T4 proposal/review and final handoff say, in effect:

- interaction direction proposed by ordinary executor;
- not an Owner-originated canonical rule;
- WORK must decide whether/how to canonicalize it.

That is only partly true.

## Already-canonical core

Master §63 already approved:

- exact locality matching uses stable locality ID/key;
- raw user text is kept only for display/review;
- pending/unverified does not create high-confidence locality matching;
- country scopes locality resolution.

Master §94 additionally approved for Screen 1 Current:

- local suggestions first;
- controlled external lookup when missing;
- unconfirmed free text does not give exact-locality aggregate;
- CTA activates only after valid canonical selection.

Master §95 approved analogous Root boundaries.

Therefore these T4 principles are **not new ordinary product rules**:

- suggestion/raw label ≠ trusted canonical identity;
- canonical locality is required for trusted exact locality use;
- raw label does not create aggregate eligibility.

## What actually is ordinary implementation work

The ordinary contribution is the concrete prototype state/UI implementation, including:

- `currentDraft` / `rootDraft`;
- automatic verification state for a list-only label;
- hiding the redundant **„Не намираш мястото?“** link while verification is already open;
- specific verification copy;
- demo-state transition details;
- concrete code separation of canonical identity from optional valid map coordinates.

Those implementation/UX details still require WORK review.

## Severity

**HIGH documentation/authority error.**

Why:
WORK could incorrectly believe the underlying identity rule still needs a new product decision, when the core rule is already Owner-approved.

The frozen candidate behavior itself is consistent with the canonical rule.

---

# Finding 3 — T3A contains a canonical core plus an ordinary adaptation

## Frozen ordinary wording that is too broad

T3A documents say the behavior is:
- ordinary-executor proposal;
- not canonical;
- requires WORK canonicalization.

Again, that is only partly true.

## Already-canonical core

Master §100.4 already states:

**An selectable place without valid coordinates must not be displayed at the coordinates of another city/country.**

It also requires:
- one coordinate system for map/camera/markers;
- demo locality/fallback limitations to be honestly represented.

Thus these are already canonical principles:

- never invent another place's coordinate;
- never borrow another city/country position;
- lack of visualization coordinates must not create false geography.

## What remains an ordinary adaptation

The exact UX for a **country whose SVG has no separate drawable country shape** is more specific than §100.4.

Ordinary implementation choices include:
- explicit `countryNoGeometry` state;
- keeping safe general map view;
- informational copy:
  **„Избрана държава: <име>. Продължи с населеното място.“**
- exact screen-reader wording.

Those specifics still deserve WORK review.

## Severity

**MEDIUM/HIGH authority-classification error.**

Candidate behavior is safe; documentation should distinguish canonical safety rule from ordinary no-geometry UX adaptation.

---

# Finding 4 — canonical checkpoint documents are stale relative to C2

## Observed repository state

On the frozen branch:

`START_HERE.md` and `PROJECT_STATE.md` still headline:

**WORK C1**

and cite:
- `prototype-screen1-work-c1.html`
- C1 blob `3645bf...`

But the same branch also contains:

- `prototype-screen1-work-c2.html`
- C2 blob `750eafb4275b8e551325bf372bf70a028ac5c3ab`
- `SCREEN1_WORK_C2_CONTROLLER_REVIEW.md`

The C2 controller review explicitly says:
- C2 is the candidate for Owner phone review;
- 25 functional groups PASS after controller correction;
- real mobile keyboard/IME, screen reader, remaining §99 real-device matrix and Owner approval remain open.

## Why this matters

The mandatory entry documents tell a new chat/developer to use C1, while later controller evidence exists for C2.

This is a **source-of-truth synchronization defect**.

It is not caused by the active frozen candidate, but it increases the chance of exactly the kind of context mistake Owner caught.

## Safe handling while WORK is unavailable

Do not rewrite canonical START_HERE/PROJECT_STATE from ordinary QA.

Instead:
- flag this explicitly to WORK;
- use the exact frozen handoff/C2 evidence for review;
- require WORK to reconcile canonical checkpoint docs when it returns.

---

# Checked areas with no equivalent contradiction found

## T1 — 62-country local source

Aligned with:
- existing `countries.js`;
- §63 preservation of local data;
- §94 country-first locality flow.

No claim of complete world coverage.

## T2 — 1530 Layer-A names

Aligned with §63 Layer A.

The ordinary package correctly states:
- suggestions only;
- incomplete settlement registry;
- no automatic canonical identity from name.

## T3B — missing Layer-A list

Aligned with §63/§94 controlled fallback principle.

Ordinary UI adaptation:
- write-first state when no local list;
- verification block.

No fake identity/coordinate.

## T5 — national Root + Latin typing

Aligned with §67 and §95:
- Root is one exact locality in Bulgaria;
- not limited to Lom;
- Latin typing supported;
- canonical selection required for trusted Root.

The T5 document correctly calls the national Root contract approved.

## Current canonical requirement in public Screen 1

No contradiction between §63 and §94.

§63 Layer D says pending/unverified must not block **onboarding/product continuity**.

§94 is the later Screen 1 public-preview contract and explicitly requires valid canonical Current before advancing to Root/public aggregate.

Therefore the ordinary prototype's lack of an unverified **Current preview bypass** is consistent with Screen 1.

## Root unverified path

Aligned with §95 / §100:
- unverified Root gives no exact Root+Current result;
- an allowed broader/Current-only path can remain;
- unverified Root remains separate from trusted Root.

## Registration boundary copy

Aligned with:
- §57 registration;
- §85 Context Bridge;
- registration → email confirmation → review/edit pending Root/Current → user confirmation.

The ordinary review explicitly says it is copy/continuity alignment, not a new registration decision.

## T6/T7 performance and QA

No product-contract contradiction found.

No-network-on-type and bounded local suggestions align with §63.

---

# Post-freeze provider research — correct status

Research about EKATTE, GeoNames, Geoapify, Nominatim, Mapbox can still be useful, but its role must be narrow.

Canonical baseline already is:

**Layer A local lists → Layer B controlled fallback → Layer C cache → Layer D pending/unverified**

and GeoNames is already the working fallback recommendation in §63.

Therefore:
- EKATTE is supplementary research for possible official Bulgarian enrichment/authority;
- Geoapify/Mapbox are comparison data, not a greenfield provider decision;
- replacing Layer A is outside the approved direction unless Owner/WORK explicitly changes §63.

---

# Frozen handoff correction required for WORK

The frozen branch must remain untouched.

However WORK must receive an errata alongside:
`SCREEN1_ORDINARY_FINAL_WORK_HANDOFF.md`

The errata must state:

1. T4 core identity boundary is already canonical under §63/§94/§95.
2. T4 concrete draft-state UI/code remains ordinary implementation for review.
3. T3A no-fake-coordinate safety is already canonical under §100.4.
4. T3A missing-SVG-country UX/copy remains ordinary adaptation.
5. §63 already preserves `countries.js` + `cities.js` as Layer A and recommends GeoNames as working Layer B fallback.
6. START_HERE/PROJECT_STATE C1 headline conflicts with later C2 controller evidence and must be reconciled by WORK.

---

# Process correction for all further ordinary work

Before any new analysis/proposal:

1. read `START_HERE.md`;
2. read `PROJECT_STATE.md`;
3. read `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`;
4. identify exact affected approved functions;
5. read the relevant Master sections;
6. explicitly classify every proposed statement as one of:
   - **CANONICAL — already approved**
   - **IMPLEMENTATION DETAIL — ordinary may test**
   - **OPEN PRODUCT DECISION — Owner approval required**
   - **STALE/CONFLICTING DOC — stop and report**
7. only then perform research or propose work.

A research task must start with:
**„Какво вече е решено?“**
not:
**„Какви варианти съществуват?“**

---

# Final assessment

Owner's concern is valid.

This audit found more than the original provider-research miss.

The important positive result is that the errors found are currently **authority/documentation/process classification errors**, not evidence that the frozen Screen 1 candidate itself has a newly discovered privacy or flow defect.

But these errors are serious because they can send WORK toward re-deciding already-approved architecture.

The frozen candidate should stay frozen.

WORK should receive the frozen package **plus the errata**, not the frozen handoff alone.
