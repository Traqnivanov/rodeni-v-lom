# Screen 1 — WORK C2 review handoff

**Date:** 2026-09-21  
**Role:** ordinary executor → return to WORK CONTROLLER  
**Branch:** `review/ordinary-screen1-c2-mobile`  
**Base branch:** `review/work-screen1-approved-direction`  
**Base commit:** `21b068f1992a4e583ed6118dff1a773fb58d1558`  
**Base C1 blob:** `3645bf8c1554f38f5b272493faa690e9c085fb47`  
**C2 artifact:** `prototype-screen1-work-c2.html`  
**C2 artifact last-change commit:** `2d2575f769257c4a9c7440274086e419a1a82954`  
**C2 blob:** `146bf85bfb630cb19d58b3f9f7a3bb77e0c0d759`

Status: **C2 candidate returned for independent WORK CONTROLLER audit.**  
This is not merge approval, production approval, visual Owner approval, or Screen 2 work.

## 1. Exact scope completed

### A. Mobile space priority
- Guided mobile map height is compact while entering context: 170 CSS px.
- After both canonical places are confirmed, the map expands to 240 CSS px.
- At the built-in 200% text review state, the guided map uses 210 px while entering and 300 px for the two-place state.
- `Сега · …` remains blue and `Откъде · …` remains gold.
- No fixed panel was introduced; content remains in normal document flow and scrolls.

### B. Explicit locality selection
- Native `datalist` was removed from C2.
- Suggestions are an in-page list directly below the relevant input.
- Inputs use combobox semantics with `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`; suggestions use `role="listbox"` / `role="option"`.
- Mouse/touch selection confirms a canonical demo place.
- Free typed text does not become confirmed merely because its spelling matches.
- Editing a confirmed name clears the old canonical selection until a new valid choice is made.
- Arrow Up/Down, Enter and Escape are supported.
- Existing `Не намираш мястото?`, controlled lookup, resolver-error and unverified Root paths remain.
- During browser QA a real focus race was found: delayed step-heading focus could close a newly opened Root listbox. It was fixed by keeping the approved step announcement focus but making it synchronous.

### C. Noninteractive heading outlines
- The blanket `[tabindex="-1"]:focus` gold outline was removed.
- Programmatic step focus is preserved for announcement.
- Actual controls retain `:focus-visible`.
- Programmatically focused error messages retain a visible focus outline.
- No global `outline:none` or equivalent was added.

### D. Broader result presentation
The existing safe-broader aggregate logic was not changed.

For Amsterdam + Lom the presentation is now:
- `5+ души в Амстердам`
- `от Лом и региона`
- `За самия Лом не показваме отделен брой.`

For another eligible Root in the existing Lom broader group, the explanation uses the actual selected Root name, e.g.:
- `За избраното място „Ковачица“ не показваме отделен брой.`

Exact, broader, Current-only and suppressed remain separately labelled. No list of people or profile access is promised.

### E. Compactness without smaller text
- Repeated vertical gaps were reduced.
- Step 2 keeps the compact Current status.
- Root helper/label wording was shortened without removing locality/privacy meaning.
- Result padding and repeated spacing were reduced.
- Required context wraps; no necessary context uses ellipsis.
- No user-facing type size was reduced to obtain compactness.

## 2. Verification

### PASS

Independent Chromium/Playwright browser matrix on the C2 DOM/CSS/JS was re-run after the focus-race correction: **23 PASS / 0 FAIL**:
- 360, 390 and 412 CSS px: inline combobox is below the field, no horizontal overflow, noninteractive heading has no gold outline.
- Mobile/touch emulation: tap selection works.
- Adaptive map state: 170 → 170 → 240 px; at review 200% text the two-place map is 300 px.
- Munich + Lom → exact `25+`.
- Paris + Kovachitsa → broader `5+ души в Париж`.
- Paris + Sofia → suppressed; no incorrect `Лом и региона`.
- Graz + Sofia → suppressed.
- Amsterdam + Lom → broader wording required by C2.
- Confirmed choice edit invalidates the old canonical locality.
- Arrow/Enter selection and Escape listbox closing work.
- Stuttgart + Ruse fallback resolves to the existing fallback demo localities.
- Stuttgart + Ruse recovery logic was additionally exercised in Chromium with controlled same-session storage and restored both values.
- Unverified Root → existing honest Current-only path.
- Close during loading → delayed result cannot reopen/replace the closed flow.
- Change during loading → delayed result cannot replace the changed step.
- Retry + back preserves context and succeeds on the existing temporary-failure simulation.
- Long/near/same-place label checks: Manchester + Veliko Tarnovo, Lom + Lom, Lom + Kovachitsa remain inside the map overlay and do not overlap in the tested 360 px browser geometry.
- Desktop 1024 px: normal and built-in 200% text states have no horizontal overflow.
- Full C2 candidate was also rendered through Opera directly from the review branch; the temporary visual harness used exact iframe viewports of 360/390/412 CSS px with the full inline world SVG.

The local Playwright QA copy removed only the very large inline world-path geometry so the same C2 controls/CSS/JS could be exercised efficiently; map-overlay projection, marker labels and dimensions remained active. Full-SVG visual evidence was therefore captured separately through Opera.

### FAIL

**None remaining in the completed C2 checks.**

One real race defect was found during verification (delayed heading focus vs. newly opened Root suggestions) and corrected before this handoff.

### НЕПРОВЕРЕНО

- The repository Node/jsdom runner `prototype-screen1-work-c2.test.cjs` is updated, but this execution environment did not have `jsdom` installed and the branch has no CI run for it. No PASS is claimed for that specific runner invocation.
- A real phone OS soft keyboard / IME was not available to automation.
- Screen-reader behavior was not tested with a real assistive-technology client.
- Human three-second comprehension test is not automated.
- Final Owner phone review and final Owner approval are pending.

## 3. Screenshot evidence

Evidence uses the full C2 file from the review branch, rendered in Opera through a temporary QA harness. The harness itself is not part of the intended final diff.

- `review-evidence/screen1-c2/viewport-suggestions-360-390-412.png`  
  State: Step 1 locality entry / suggestions; viewports: 360×844, 390×844, 412×844 CSS px.

- `review-evidence/screen1-c2/viewport-amsterdam-lom-broader-360-390-412.png`  
  State: safe-broader result for Amsterdam + Lom; viewports: 360×844, 390×844, 412×844 CSS px.

- `review-evidence/screen1-c2/viewport-step2-200pct-pair-360-390-412.png`  
  State: Step 2, Munich + Lom, built-in 200% text review; viewports: 360×844, 390×844, 412×844 CSS px.

## 4. Known limitations / outside-scope findings

- No backend, external locality service, production resolver or new geographic dataset was added.
- Demo locality identities, coordinates, aggregate eligibility, privacy threshold, broader membership and result ranges were not changed.
- No outside-scope product defect was silently repaired.
- The published C1 review site was not updated.
- Main, production, Supabase, C1, V13, registration, onboarding and Screen 2 were not changed.

## 5. Final diff verified from the base commit

Final compare against `21b068f1992a4e583ed6118dff1a773fb58d1558` contains only:
- `prototype-screen1-work-c2.html`
- `prototype-screen1-work-c2.test.cjs`
- `SCREEN1_WORK_C2_REVIEW.md`
- screenshot evidence under `review-evidence/screen1-c2/`

The temporary browser-evidence harnesses were removed. No QA harness remains in the final diff.

No merge and no publish are performed. C2 is returned to WORK CONTROLLER for independent audit.
