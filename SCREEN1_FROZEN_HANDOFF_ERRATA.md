# READ BEFORE FROZEN WORK HANDOFF — Screen 1 errata

**Applies to frozen branch:** `review/ordinary-screen1-frozen-for-work` @ `1c1551dc47faa249132394f019491373bc876f22`

This errata corrects authority/context wording in the frozen ordinary documentation.

It does **not** modify the frozen candidate.

## 1. T4 identity boundary — correction

The frozen handoff is too broad when it describes T4 as a non-canonical ordinary product rule.

### Already canonical
Master §63 + Screen 1 §§94–95 already approve:
- raw/suggestion text is not the trusted canonical locality identity;
- exact locality use requires stable canonical identity;
- unverified/pending locality does not create trusted exact-locality matching;
- Current CTA requires valid canonical Current in Screen 1.

### Ordinary implementation still for review
- `currentDraft` / `rootDraft`;
- automatic verification-state presentation;
- exact copy and hiding/showing of fallback controls;
- concrete code state machine;
- concrete coordinate-decoupling implementation.

WORK must review the implementation, **not re-decide the canonical identity principle from zero**.

## 2. T3A no-geometry — correction

The frozen handoff is too broad when it describes the whole T3A behavior as non-canonical.

### Already canonical
Master §100.4 already requires:
- a selectable place without valid coordinates must not be shown at another city/country's coordinates;
- no false geographic placement.

### Ordinary adaptation still for review
For a selected country with no separate SVG country shape:
- safe general map view;
- `countryNoGeometry` state;
- exact informational copy/accessibility wording.

WORK reviews those UI specifics, not the no-fake-coordinate safety principle.

## 3. Hybrid locality architecture — correction

Master §63 is already approved:

- **Layer A:** keep `countries.js` + `cities.js` as fast local suggestions;
- **Layer B:** explicit controlled fallback when locality is missing;
- working fallback recommendation: **GeoNames**;
- **Layer C:** local cache/registry after confirmation;
- **Layer D:** pending/unverified when resolution fails.

Do not interpret later provider research as a proposal to replace the 1530-name local layer.

## 4. Canonical checkpoint drift

`START_HERE.md` / `PROJECT_STATE.md` still headline WORK C1.

The same repository state contains:
- `prototype-screen1-work-c2.html` blob `750eafb4275b8e551325bf372bf70a028ac5c3ab`;
- `SCREEN1_WORK_C2_CONTROLLER_REVIEW.md`.

C2 review says it is the candidate for Owner phone review, with remaining real-device gates open.

WORK must reconcile the canonical checkpoint docs when available.

## 5. What is NOT changed by this errata

No claim of:
- final Owner approval;
- WORK acceptance of ordinary active candidate;
- production/main/Supabase promotion;
- completed real-phone §99 gate.

Frozen candidate remains untouched.
