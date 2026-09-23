# Screen 1 — post-freeze QA gap audit

**Branch:** `review/ordinary-screen1-postfreeze-qa`  
**Frozen package under audit:** `review/ordinary-screen1-frozen-for-work`  
**Frozen HEAD:** `1c1551dc47faa249132394f019491373bc876f22`  
**Frozen active candidate blob:** `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

## Purpose

This is a QA-only audit after freezing the ordinary Screen 1 package for WORK CONTROLLER.

It does not change Screen 1 product code.

Goal:
- identify what is genuinely proved;
- identify what is only partially evidenced;
- identify what remains unverified;
- separate safe follow-up QA from Owner/WORK/provider responsibilities.

## Executive result

No new product defect was found that requires reopening the frozen candidate.

The main remaining gaps are **release-evidence gaps**, especially:
- physical phone behavior;
- complete §99 visual state evidence;
- formal three-second Owner test;
- computed-size evidence across representative states;
- independent WORK CONTROLLER pass.

## §99 release-gate matrix

### Gate 1 — hierarchy card before code

**Status: PARTIAL / inherited**

Evidence:
- canonical hierarchy/product direction already exists in §§93, 99 and 100;
- frozen candidate preserves:
  - main hook;
  - main benefit;
  - primary CTA;
  - privacy role;
  - mobile-first direction.

Gap:
- there is no fresh post-expansion hierarchy-card artifact specifically re-issued after the 62-country / Layer-A work.

Assessment:
- not a reason to modify the candidate;
- WORK should confirm that the broader locality scope did not invalidate the already approved hierarchy contract.

### Gate 2 — hard mobile floors

**Status: SOURCE PASS / COMPUTED EVIDENCE PARTIAL**

Current source values include:
- initial hook: `2rem` ≈ 32px at default root size;
- primary CTA: `1.25rem` ≈ 20px;
- primary CTA height: `62px`;
- main question: `1.5rem` ≈ 24px;
- helper/body: `1.0625rem` ≈ 17px;
- privacy/fallback/body metadata: `1rem` ≈ 16px;
- small metadata: `.9375rem` ≈ 15px.

This is consistent with the §99 floors in source.

Gap:
- a full browser-computed-size capture has not been recorded across the final frozen state matrix.

### Gate 3 — viewport matrix

**Status: PARTIAL**

PASS evidence:
- 360px representative mobile review;
- 390px representative mobile review;
- 412px representative mobile review;
- multiple 200% states;
- mobile-base CSS;
- desktop layout is opt-in only under:
  `min-width:760px + hover:hover + pointer:fine`;
- source-level force-mobile detection includes:
  - mobile user-agent;
  - touch points;
  - coarse pointer;
  - no-hover;
- visible review diagnostics expose:
  - Mobile/Desktop;
  - viewport;
  - pointer;
  - hover;
  - touch count.

Missing:
- physical high-resolution/coarse-pointer phone pass;
- full desktop/fine-pointer visual matrix on the final frozen candidate;
- physical confirmation that Owner Android/WebView activates Mobile mode correctly.

### Gate 4 — state matrix

**Status: PARTIAL**

Targeted visual evidence exists for:
- initial;
- Current input;
- Root input;
- exact result;
- error;
- recovery;
- list-only draft verification;
- no-geometry;
- missing-list;
- Root unresolved/unverified option;
- near places;
- same place;
- selected 200% states.

States that exist in product code but do not yet have dedicated final-frozen visual evidence:
- loading;
- safe-broader;
- suppressed;
- Current-only result after unverified Root;
- post-error secondary continue path.

These should be QA-only follow-up states; they do not require product-rule changes.

### Gate 5 — three-second test

**Status: NOT VERIFIED for final frozen candidate**

The contract defines the intended comprehension:
**„Показах къде живея и откъде съм; сега виждам какво има за точно тази комбинация.“**

Gap:
- no formal final Owner three-second check has been recorded against the exact frozen candidate after T1–T7.

This cannot be self-approved by the ordinary executor.

### Gate 6 — readability evidence

**Status: PARTIAL**

Evidence:
- representative mobile visual review at 360/390/412;
- targeted 200% visual passes;
- source font/touch sizes;
- visual corrections were made when 200% Root status compressed text.

Missing:
- browser-computed font/touch-size evidence for a representative final state set;
- physical-phone visual/keyboard evidence;
- complete visual evidence for broader/suppressed/loading/current-only states.

### Gate 7 — independent WORK CONTROLLER pass

**Status: NOT VERIFIED**

Reason:
- WORK CONTROLLER is currently unavailable due usage limit.

The frozen package exists specifically so WORK can later perform this independent pass without the target moving.

### Gate 8 — status discipline

**Status: PASS**

Evidence:
- technical/source PASS is kept separate from visual PASS;
- physical-device states remain explicitly NOT VERIFIED;
- WORK acceptance is not claimed;
- final Owner approval is not claimed;
- ordinary proposals are not misattributed as Owner-originated rules;
- historical handoff is marked superseded;
- active candidate and QA harness are clearly separated.

## Responsive architecture audit

### Source architecture

**PASS**

The frozen candidate:
- uses mobile layout as the base;
- desktop is opt-in only for fine-pointer/hover desktop conditions;
- applies `force-mobile` when mobile/touch/coarse/no-hover signals exist;
- visibly reports mode/viewport/pointer/hover/touch in review mode.

### Real-device proof

**NOT VERIFIED**

Still required:
- physical Android/iPhone;
- actual reported Mobile/Desktop line;
- actual viewport values;
- actual coarse/fine pointer report;
- page scroll over map;
- two-finger pinch;
- keyboard opening/closing.

## Interaction/accessibility gaps

### Soft keyboard / IME

**NOT VERIFIED**

Need physical-device check for:
- country select → Current field;
- suggestion selection;
- field editing;
- Root Latin typing;
- viewport shift when keyboard opens;
- CTA not hidden/trapped;
- close/back behavior.

### One-finger page scroll over map

**SOURCE PASS / REAL DEVICE NOT VERIFIED**

Source:
- `touch-action: pan-y`;
- one touch is not prevented;
- two-touch pinch path uses `preventDefault()`.

Need physical phone proof.

### Two-finger pinch

**BROWSER-HARNESS LOGIC PASS / REAL DEVICE NOT VERIFIED**

Need physical phone proof for gesture feel and conflict with page scroll.

### Keyboard-only navigation

**PARTIAL**

Source wiring exists for:
- ArrowDown;
- ArrowUp;
- Enter;
- Escape/close behavior where applicable.

Missing:
- full browser keyboard-only flow pass from initial → Current → Root → result → back/edit.

### Screen reader

**NOT VERIFIED**

Source includes:
- labels;
- roles;
- live/error semantics;
- screen-reader-only context text.

But no real screen-reader pass has been performed.

## Performance gaps

### Local search

**PASS in sampled browser environment**

Existing evidence:
- max 10 rendered options;
- no network-on-type;
- local source only;
- sampled search/switch timings were low.

### Low-end Android

**NOT VERIFIED**

No physical low-end Android timing/scroll test exists.

This is a device-evidence gap, not a reason to change the frozen candidate now.

## Geographic/data gaps

These are **not prototype QA failures** and should not be “fixed” by ordinary QA:

- complete world locality registry;
- complete Bulgarian settlement registry;
- stable production locality IDs for every place;
- municipality/region metadata for same-name Bulgarian settlements;
- production resolver/provider/cache;
- production provider latency/failure behavior.

These belong to future provider/implementation work and WORK/Owner decision-making.

## Safe QA tasks that can be done now without changing frozen Screen 1

1. **Final state visual evidence**
   - loading;
   - safe-broader;
   - suppressed;
   - Current-only;
   - post-error continue.

2. **Computed readability audit**
   - record actual computed font sizes;
   - record touch heights;
   - 360/390/412;
   - normal + 200%.

3. **Desktop/fine-pointer representative pass**
   - initial;
   - Current;
   - Root;
   - result;
   - error;
   - map wheel/drag.

4. **Keyboard-only browser flow**
   - focus order;
   - suggestion arrows;
   - Enter;
   - back/edit;
   - no focus trap.

5. **Static accessibility audit**
   - labels/roles/aria state;
   - duplicate IDs;
   - focus targets;
   - hidden/visible state semantics.

All five can be executed in the post-freeze QA branch/harness without changing the frozen candidate.

## Tasks that require Owner / physical device

1. real Android/iPhone mode confirmation;
2. soft keyboard/IME;
3. one-finger scroll over map;
4. two-finger pinch feel;
5. physical-phone 200%/large-text review;
6. final three-second comprehension test;
7. final visual Owner approval.

## Tasks that must wait for WORK CONTROLLER

1. independent §99 pass;
2. decision on T3A no-geometry adaptation;
3. decision on T4 draft/canonical interaction adaptation;
4. canonical source-of-truth updates;
5. adoption/rejection of ordinary candidate;
6. controlled promotion path.

## Priority recommendation while WORK is unavailable

Safe order:

1. final missing-state visual evidence;
2. computed readability audit;
3. keyboard/static accessibility audit;
4. desktop/fine-pointer representative pass;
5. prepare physical-phone checklist for Owner.

Do not:
- reopen frozen candidate;
- add provider;
- invent registry data;
- start Screen 2;
- merge/promote;
- declare release-ready.

## Final QA conclusion

The frozen candidate is suitable to remain frozen for WORK review.

It is **not release-ready** under §99 because the remaining physical-device, full-state, Owner and WORK gates are intentionally still open.

The ordinary team can safely reduce the evidence gap while WORK is unavailable, but must not convert those QA activities into new product implementation.
