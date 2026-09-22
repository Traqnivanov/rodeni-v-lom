# Screen 1 T4 — suggestion vs canonical identity boundary review

Branch: `review/ordinary-screen1-active-integration`

## Authority / status

The interaction direction was proposed by the ordinary executor.

The Owner authorized implementation/testing of this proposal in the prototype.

This is **not an Owner-originated canonical rule**. WORK CONTROLLER must still independently review and decide whether/how it should be canonicalized.

## Problem corrected

Before T4:
- 1530 Layer-A names could appear as suggestions;
- only 29 matched existing non-fallback demo identities;
- a list-only suggestion visually looked selected but did not become canonical;
- the primary CTA stayed active and only failed after click with technical copy.

That created a false-success UX.

## Implemented state separation

The active candidate now keeps these meanings separate:

1. **draft label**
   - typed or selected Layer-A text;
   - private session state;
   - `currentDraft` / `rootDraft`;
   - never used as canonical identity or aggregate eligibility.

2. **canonical locality**
   - existing demo canonical ID in `current` / `root`;
   - the only state that satisfies the mandatory Current/Root primary CTA.

3. **map coordinate**
   - remains tied only to an existing demo locality with valid coordinates;
   - no coordinate is invented for a draft label.

Conceptually:

`country → draft/suggestion label → verification boundary → canonical demo locality → optional valid coordinate`

## Current behavior

### Demo-canonical suggestion

Example: Germany → Munich.

- selection confirms existing canonical demo ID;
- draft is cleared;
- normal locality marker may render;
- primary CTA is enabled.

### Layer-A list-only suggestion

Example: Germany → Dresden.

- text remains visible in the field;
- canonical Current remains empty;
- draft is saved privately in the current browser session;
- verification state opens automatically;
- user sees:
  **„Провери мястото, за да сме сигурни, че е правилното.“**
- primary CTA remains disabled;
- contradictory **„Не намираш мястото?“** is hidden while this verification state is already open.

If the demo resolver cannot confirm it:
- no canonical identity is invented;
- no coordinates are invented;
- user sees:
  **„Не успяхме да потвърдим това място в демото. Провери изписването или опитай друго.“**

Mandatory Current has no unverified bypass.

## Root behavior

Root uses the same draft/canonical separation.

Its already approved exception remains separate:
- canonical Root → normal preview flow;
- unresolved Root → explicit existing **„Продължи с непотвърдено място“** path may be used;
- Root pending text remains separate from canonical Root;
- unverified Root does not create exact Root aggregate.

No equivalent bypass was added for Current.

## Session behavior

Draft labels are persisted in the existing browser-session draft with a 100-character bound.

On canonical confirmation:
- the matching draft is cleared.

On country change:
- Current canonical ID and Current draft are cleared.

A restored canonical ID always wins over a stale draft label.

## CTA correction

Current primary CTA:
- disabled until canonical Current exists.

Root primary CTA:
- disabled until canonical Root exists.

Defensive error copy remains human-readable if an invalid state is forced programmatically.

## User-facing copy correction

Removed technical phrase:
- „потвърдена географска идентичност“

Replaced normal verification with:
- **„Провери мястото, за да сме сигурни, че е правилното.“**

## Verification

### Source-backed audit

**19/19 PASS**

Verified:
- separate draft fields;
- session draft restore;
- canonical display priority;
- raw suggestion cannot assign canonical identity;
- verification state opens for list-only choice;
- redundant missing-place link is hidden in draft verification;
- canonical confirmation restores normal state;
- Current/Root CTA gating;
- canonical confirmation clears draft;
- editing canonical selection invalidates it;
- country change clears Current draft;
- resolver success uses only existing demo identity;
- resolver failure uses human copy;
- Current has no unverified bypass;
- Root pending remains separate;
- technical identity terminology removed;
- inline JavaScript parses;
- official WORK C2 remains unchanged.

Runnable regression suite:

```bash
node screen1-t4-identity-boundary.test.cjs
```

### Mobile visual review

Review-only harness:
`prototype-screen1-mobile-visual-review.html`

Observed on exact active candidate:
- **360px / 100% / Current list-only Dresden** — PASS for hierarchy and understandable verification state;
- **360px / 100% / Current canonical Munich** — PASS for clean canonical state and active CTA;
- **360px / 200% / Current list-only Dresden** — PASS for vertical reflow/no observed horizontal clipping; scrolling is required and allowed.

A review-harness defect was found and corrected during this pass: scenario state could inherit iframe `sessionStorage`; the harness now clears session state before every automated scenario.

## Evidence boundary

PASS:
- source/state separation;
- 360px mobile visual hierarchy for T4 draft/canonical comparison;
- 360px 200% reflow observation.

NOT VERIFIED:
- real phone soft keyboard/IME;
- screen reader;
- 390/412 dedicated T4 list-only screenshots;
- real touch interaction;
- production resolver/backend;
- WORK acceptance;
- Owner final visual approval of Screen 1.

## Scope intentionally not included

T4 does not:
- canonicalize all 1530 names;
- add stable locality IDs;
- add GeoNames/backend;
- solve countries with no Layer-A list;
- change aggregate/privacy rules;
- start Screen 2.

Next dependency:
**T3B — missing Layer-A list / fallback states**, now evaluated on top of this explicit identity boundary.
