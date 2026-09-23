# Screen 1 — physical mobile / real-device test checklist

**Canonical status:** Task #3 physical-phone checklist. Use this file for the real-device pass.

**Purpose:** final physical-device evidence for the frozen Screen 1 package  
**Frozen branch:** `review/ordinary-screen1-frozen-for-work`  
**Frozen HEAD:** `1c1551dc47faa249132394f019491373bc876f22`  
**Frozen candidate:** `prototype-screen1-map-interaction-lab.html`

This checklist does **not** authorize product changes.

Use it only to record physical-device evidence.

---

# Test discipline

For every step record exactly one status:

- **PASS** — observed exactly as required;
- **FAIL** — behavior is wrong or confusing;
- **BLOCKED** — cannot be tested on this device/browser;
- **NOT RUN** — not tested yet.

Do not write:
- “seems okay”;
- “probably fine”;
- “technical pass”.

For every FAIL capture:
1. screenshot or screen recording;
2. device/browser;
3. exact step;
4. what was expected;
5. what happened instead.

Do not fix anything in the frozen branch during this test.

---

# Device record — fill before testing

Record:

- Device model:
- OS/version:
- Browser/WebView:
- Orientation: portrait / landscape
- Physical text-size setting:
- Browser zoom if any:
- Screen resolution if known:
- Network state:
- Date/time:

From the prototype review diagnostics record exactly:

- Reported mode: **Mobile / Desktop**
- CSS viewport width × height:
- pointer: coarse / fine
- hover: true / false
- touch points:

## Gate A — responsive mode

### A1. Real phone must report Mobile

**Expected:**
- diagnostics show **Mobile**;
- desktop two-column layout must not activate;
- page uses mobile-first layout.

**PASS only if all three are true.**

If the physical Android/iPhone reports Desktop, stop visual approval and record FAIL.

---

# Phase 1 — three-second initial-screen test

Open the frozen candidate fresh.

Do not tap anything for three seconds.

Answer these four questions immediately:

1. What is the page asking you?
2. What should you do next?
3. What benefit do you expect after doing it?
4. What does the privacy line mean?

Expected understanding:
- main question: **„А ти къде си на картата?“**
- action: **„Провери за себе си“**
- benefit: choose where you live + where you are from to see relevant community context;
- privacy: communities are shown, not personal profiles.

## B1. Main hook

Expected:
- visually first/strong;
- immediately readable;
- not visually weaker than secondary content.

Status: ___

## B2. Primary CTA

Expected:
- visible without hunting;
- clearly primary;
- comfortable touch target;
- not competing with secondary controls.

Status: ___

## B3. Privacy line

Expected:
- readable;
- secondary but not tiny;
- does not dominate the CTA.

Status: ___

## B4. Three-second comprehension

Expected:
user can naturally describe the experience without explanation from tester.

Status: ___

---

# Phase 2 — Current location + keyboard/IME

Tap **„Провери за себе си“**.

## C1. Step 1 hierarchy

Expected:
- Step 1 is obvious;
- question **„Къде си сега?“** is readable;
- country and locality fields are clear;
- CTA remains disabled until canonical Current exists.

Status: ___

## C2. Country select

Choose **Germany / Германия**.

Expected:
- field updates immediately;
- map focuses Germany where geometry exists;
- no stale previous locality;
- locality field remains usable.

Status: ___

## C3. Open soft keyboard

Tap the locality field.

Expected:
- keyboard opens normally;
- field stays visible or can be brought into view;
- no horizontal layout break;
- CTA is not permanently hidden/trapped;
- page can still scroll.

Status: ___

## C4. Type with normal keyboard

Type:
**Мюнхен**

Expected:
- suggestions appear;
- text remains readable above keyboard;
- selecting suggestion works reliably;
- keyboard does not create a stuck layout.

Status: ___

## C5. Edit selected canonical locality

After selecting Munich, edit the field.

Expected:
- canonical state is invalidated;
- CTA disables again;
- edited text becomes draft/verification state;
- no stale canonical marker should remain authoritative.

Status: ___

## C6. Select Munich again

Expected:
- canonical Current returns;
- CTA enables;
- map label **„Сега · Мюнхен“** is readable.

Status: ___

---

# Phase 3 — one-finger scroll and two-finger pinch

Perform these tests while map is visible.

## D1. One-finger vertical page scroll starting on map

Place one finger directly on map and drag vertically.

Expected:
- page scrolls vertically;
- map must not trap ordinary one-finger page scrolling.

Status: ___

## D2. One-finger accidental horizontal/diagonal move

Expected:
- no unusable gesture trap;
- page remains controllable.

Status: ___

## D3. Two-finger pinch on map

Expected:
- map zoom responds;
- page does not unexpectedly jump;
- pinch feels bounded, not infinite;
- labels remain readable.

Status: ___

## D4. After pinch, continue page scroll

Expected:
- page scrolling still works normally;
- map interaction does not leave gesture system stuck.

Status: ___

---

# Phase 4 — Root / Latin typing

Continue to **„Откъде си?“**.

## E1. Step 2 summary

Expected:
- current summary reads **„Мюнхен, Германия“**;
- **„Промени“** is visible and understandable;
- summary is not compressed or unreadable.

Status: ___

## E2. Root helper and field

Expected:
- question **„Откъде си?“** is clear;
- helper explains meaning of Root;
- label says **„Населено място в България“**.

Status: ___

## E3. Latin typing

Type:
**Lom**

Expected:
- suggestion **„Лом“** appears;
- raw Latin text is not silently treated as canonical;
- selecting **Лом** confirms Root.

Status: ___

## E4. Longer Latin spelling

Optional second check:
**Kovachitsa**

Expected:
- **Ковачица** is offered.

Status: ___

---

# Phase 5 — exact result

Use:
- Current: Мюнхен
- Root: Лом

Continue through loading.

## F1. Loading state

Expected:
- visible loading state;
- user understands the system is checking;
- no broken/blank panel;
- no accidental double action.

Status: ___

## F2. Exact result

Expected:
- clearly reads as result for the two places;
- privacy-safe range/band, not exact private-user count;
- map context remains understandable;
- CTA hierarchy is clear.

Status: ___

## F3. Three-second result comprehension

Without explanation, answer:
**„Какво показва този резултат?“**

Expected meaning:
**„Показах къде живея и откъде съм; виждам какво има за тази комбинация.“**

Status: ___

---

# Phase 6 — safe-broader result

Use the prototype review example:
- Current: Париж
- Root: Ковачица

Expected:
- result is explicitly **„По-широка общност“**;
- user can tell it is not an exact match;
- text does not falsely imply exact locality match;
- layout remains readable.

Status: ___

---

# Phase 7 — suppressed result

Use the prototype review example:
- Current: Грац
- Root: София

Expected:
- no exact public count;
- state reads as privacy/suppressed result;
- explanation makes clear that lack of public result does **not** mean no people exist.

Status: ___

---

# Phase 8 — Current-only result after unverified Root

Use a valid canonical Current for which the demo has Current-only data, then use an unresolved Root and choose the explicit unverified Root path.

Expected:
- Root remains marked as unverified;
- result uses only Current where allowed;
- UI explicitly says unverified Root was not used for trusted matching;
- no exact Current+Root result appears.

Status: ___

---

# Phase 9 — error and post-error continue

Use review controls to force a network error.

## I1. Error state

Expected:
- technical error is visually distinct from “no people”/suppressed result;
- Current/Root context is preserved;
- **„Опитай отново“** is available;
- edit-context path remains available.

Status: ___

## I2. Post-error secondary continue

Use the allowed secondary continue path after error where applicable.

Expected:
- no fabricated result;
- transition to next boundary is explicit;
- previous context is not lost.

Status: ___

---

# Phase 10 — recovery

Create/reopen the expired-session recovery scenario.

Expected:
- stale state is discarded;
- safe empty Current step appears;
- visible message:
  **„Предишният избор е изтекъл или не може да се възстанови. Посочи местата отново.“**
- no old personal map markers remain authoritative.

Status: ___

---

# Phase 11 — missing-list country

Use **Luxembourg / LU**.

Expected:
- country remains selectable;
- locality field says to write the place;
- no fake suggestions;
- one concise verification block;
- Current CTA stays disabled without canonical Current.

Status: ___

---

# Phase 12 — no-map-geometry country

Use **Malta / MT** or **Singapore / SG** according to scenario.

Expected:
- country remains valid/selectable;
- no marker is placed at another country's location;
- no invented centre;
- map falls back safely;
- locality flow can continue according to available data.

Status: ___

---

# Phase 13 — large text / 200%

Activate the prototype **200% text** review mode.

Run at least:

1. initial;
2. Current;
3. Root;
4. exact result;
5. dense suggestion list.

Expected:
- no horizontal clipping;
- no unreadably narrow words;
- primary actions remain reachable;
- vertical scrolling is allowed;
- text is not reduced just to fit.

Status:
- Initial: ___
- Current: ___
- Root: ___
- Result: ___
- Dense suggestions: ___

---

# Phase 14 — orientation change

While in Current or Root step:

1. rotate portrait → landscape;
2. rotate landscape → portrait.

Expected:
- state remains intact;
- no duplicate panel;
- no broken map labels;
- no desktop/mobile mode flip unless diagnostics legitimately indicate it;
- keyboard dismissal/reopen remains normal.

Status: ___

---

# Phase 15 — back/edit behavior

From Root:
tap **„Промени“**.

Expected:
- returns to Current;
- state is understandable;
- changing country clears stale Current identity/draft;
- user can continue forward again without broken state.

Status: ___

---

# Phase 16 — close/reopen flow

Close the guided panel, then reopen.

Expected:
- public initial map does not expose private selected markers;
- permitted private session context is not confused with public aggregate display;
- reopening follows session/recovery contract.

Status: ___

---

# Phase 17 — physical performance feel

Do not use stopwatch numbers here.

Judge only obvious usability:

- typing feels immediate;
- suggestion list does not stutter;
- country switch feels immediate;
- scrolling over map feels natural;
- pinch does not lag severely;
- 200% text remains usable.

Status: ___

If obvious lag exists, record device and screen recording.

---

# Phase 18 — screen reader

Only run if TalkBack/VoiceOver is available and the tester can use it reliably.

Check:

1. initial hook;
2. primary CTA;
3. Current country/locality labels;
4. suggestion list;
5. Root field;
6. error alert;
7. result context;
8. hidden map context / Current + Root meaning.

Expected:
- controls have understandable names;
- focus order is logical;
- hidden content is not announced as visible UI;
- error/result context is understandable.

Status: ___

If not run:
**NOT RUN — requires screen-reader pass.**

---

# Final Owner-only visual gate

After all technical/device observations, Owner answers only these:

1. Is the first screen visually strong enough?
2. Is the main action obvious immediately?
3. Does anything look too small?
4. Does the map help rather than dominate?
5. After Current + Root, is the relationship between the two places obvious?
6. Does broader look clearly broader, not exact?
7. Does suppressed look privacy-protected, not broken?
8. At 200%, is the experience still usable?
9. Would you approve this exact frozen visual direction for WORK review?

Do not convert these answers into approval automatically.

Final status must be recorded explicitly as one of:

- **OWNER VISUAL APPROVED**
- **OWNER VISUAL CHANGES REQUIRED**
- **OWNER REVIEW NOT COMPLETED**

---

# Evidence package to keep

For one physical-phone run keep:

1. diagnostics screenshot;
2. initial screenshot;
3. Current + keyboard screenshot;
4. Root + Latin search screenshot;
5. exact result screenshot;
6. broader screenshot;
7. suppressed screenshot;
8. error screenshot;
9. recovery screenshot;
10. 200% screenshot;
11. short screen recording of one-finger scroll over map;
12. short screen recording of two-finger pinch.

This is enough evidence for WORK to inspect later without repeating every physical test blindly.

---

# Stop conditions

Stop the test and report instead of continuing if:

- physical phone reports Desktop;
- main CTA becomes unreachable;
- keyboard traps the user;
- one-finger map gesture blocks page scroll;
- state is lost unexpectedly;
- private context appears in public initial state;
- broader is presented as exact;
- suppressed reveals a protected exact count;
- raw locality text becomes trusted canonical identity without confirmation.

Do not patch frozen Screen 1 during the test.
