# Screen 1 T4 — suggestion vs canonical identity boundary proposal

Branch: `review/ordinary-screen1-active-integration`  
Status: **IMPLEMENTED AS ORDINARY PROTOTYPE CHECKPOINT — SEE `SCREEN1_T4_IDENTITY_BOUNDARY_REVIEW.md`**  
Author: ordinary executor  
Owner status: **authorized prototype implementation/testing; not Owner-originated canonical rule**

## Problem found in the ordinary implementation

The active candidate correctly exposes the full Layer-A suggestion dataset, but its interaction contract is inconsistent:

- 1530 names can appear as country-scoped suggestions;
- only 29 currently map to an existing non-fallback demo identity;
- selecting one of the other 1501 names visually looks like a successful choice;
- internally it clears canonical state;
- the primary CTA remains active;
- pressing the CTA then shows technical copy about a "confirmed geographic identity".

This violates the approved Screen 1 contract in two ways:

1. Layer-A suggestion label is being visually confused with canonical selection.
2. Current primary CTA is active before a valid canonical Current exists, while Master §94 says it activates only after a valid canonical choice.

## Dependency conclusion

T3B (countries with no local list such as MT/LU) depends on this boundary.

Without a clear resolver/identity state, missing-list behavior cannot be judged correctly.

Therefore T4 must be resolved before T3B.

## Proposed state separation

Keep three meanings separate:

1. **Draft label**
   - what the person typed or selected from Layer A;
   - private browser-session value;
   - not trusted identity.

2. **Canonical locality**
   - verified/accepted locality identity;
   - the only value that can satisfy mandatory Current selection or exact locality logic.

3. **Map coordinate**
   - visualization data for a canonical/demo locality when available;
   - never invented from country centre or another place.

Conceptually:

`country → draft/suggestion label → resolver boundary → canonical locality → optional valid coordinate`

## Proposed Current behavior

### Existing demo-canonical suggestion
If the selected Layer-A/demo item already maps to an existing demo canonical fixture:
- confirm immediately;
- draw the valid locality marker;
- enable **„Продължи към „Откъде си?““**.

### Layer-A suggestion without canonical demo identity
On selection:
- keep the selected text visibly in the field;
- save it only as a private draft label;
- do not assign canonical Current;
- automatically reveal the existing verification/fallback block;
- show human copy:
  **„Провери мястото, за да сме сигурни, че е правилното.“**
- keep the primary Current CTA disabled;
- the user explicitly chooses **„Провери мястото“**.

If the controlled resolver returns a valid canonical demo identity:
- confirm it;
- enable the primary CTA.

If it cannot be resolved in the prototype:
- do not invent identity/coordinates;
- explain that the place could not be confirmed in the demo;
- Current cannot advance to Screen 1 preview without a canonical choice.

This preserves Master §94 and §97.

## Proposed Root behavior

Root uses the same draft → resolver boundary, but keeps its already approved exception:

- canonical resolver result → confirmed Root;
- unresolved/unavailable result → existing secondary path may continue with unverified Root;
- unverified Root never creates exact Root aggregate;
- only the already approved Current-only/suppressed behavior may follow.

No equivalent unverified bypass is added for mandatory Current.

## Session continuity

The current candidate only persists canonical IDs plus Root `pending`.

To satisfy the existing rule that entered context survives close/reopen within the valid browser session, T4 should persist a private **Current draft label** separately from canonical Current.

This draft:
- is display/review state only;
- is not aggregate/matching eligibility;
- is cleared/replaced when canonical Current is confirmed or country changes.

Root's existing pending/unverified label remains separate from canonical Root.

## CTA state correction

Current:
- no country → locality input disabled;
- country selected, no canonical Current → primary CTA disabled;
- canonical Current confirmed → primary CTA enabled.

Root:
- canonical Root → main preview action allowed;
- unresolved Root → only the explicit approved unverified path can continue.

A disabled CTA must be visibly disabled and not rely on an error after click as the normal path.

## Copy correction

Remove technical user-facing copy:

**Do not show:**
"Името може да е предложение от локалния списък, но това само по себе си не е потвърдена географска идентичност."

Use human copy at the verification state:

**„Провери мястото, за да сме сигурни, че е правилното.“**

Review/debug UI may still explain the internal distinction separately.

## What this does NOT do

- does not make all 1530 names canonical;
- does not invent stable IDs;
- does not invent coordinates;
- does not add GeoNames/backend implementation;
- does not change aggregate/privacy eligibility;
- does not allow unverified Current into preview;
- does not change Root/Current meaning;
- does not start Screen 2.

## Visual / mobile intent

This should remain a small state transition inside the existing field area:
- no new modal;
- no extra page;
- no technical terminology;
- existing fallback block is reused;
- primary hierarchy remains question → field → verification if needed → CTA.

The intent is to reduce confusion, not add UI density.

## Uniqueness report

This resolver boundary is not itself a unique feature.

It protects the project's distinctive mechanism:

**real Current + Root context → explainable privacy-safe result → private continuity toward personal value**

The important quality is honesty: the interface never presents a suggestion label as trusted geographic truth.

## Approval gate

Implementation requires Owner approval of this exact interaction direction.

After approval, implement T4 as one medium checkpoint and verify it before returning to T3B.
