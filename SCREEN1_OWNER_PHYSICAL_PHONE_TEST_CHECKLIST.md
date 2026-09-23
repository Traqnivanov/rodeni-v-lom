# Screen 1 — Owner physical-phone test checklist

**Purpose:** final real-device evidence for the frozen ordinary Screen 1 candidate  
**Frozen branch:** `review/ordinary-screen1-frozen-for-work`  
**Frozen HEAD:** `1c1551dc47faa249132394f019491373bc876f22`  
**Frozen candidate:** `prototype-screen1-map-interaction-lab.html`  
**Frozen candidate blob:** `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

This checklist does **not** change the candidate.

It is for physical-phone review only.

Do not mark a point PASS from desktop emulation, screenshots, source code, or iframe review if the step explicitly says **physical phone**.

---

# How to record each step

For every numbered test record only one of:

- **PASS** — behaves exactly as expected;
- **FAIL** — visible/interaction problem;
- **NOT TESTED** — step not performed;
- **BLOCKED** — device/browser does not allow the test.

If FAIL:
- take one screenshot when visual;
- note the phone/browser;
- note exactly what happened;
- do not change the frozen branch.

---

# A. Device mode confirmation — mandatory first

## A1. Open the frozen candidate on the physical phone

Open the exact frozen candidate.

Before testing the flow, expand:
**„Проверка на прототипа“**

### Expected

The diagnostics line must identify the phone experience as:

**Mobile**

It should also show:
- viewport width × height;
- pointer;
- hover;
- touch count.

### PASS

- reports **Mobile**;
- layout visibly remains mobile;
- no desktop two-column flow appears.

### FAIL

Any of:
- reports **Desktop** on the physical phone;
- desktop two-column flow appears;
- viewport is obviously desktop-like;
- diagnostics contradict the device.

**If A1 FAILS: stop the rest of the visual approval.**
Do not compensate with another breakpoint guess.

---

## A2. Record diagnostics

Write down exactly:

- device:
- OS:
- browser/WebView:
- mode shown:
- viewport:
- pointer:
- hover:
- touch:

This is evidence, not product data.

---

# B. Three-second initial-screen test

## B1. Fresh initial screen

Clear demo selection if needed and return to the beginning.

Look at the first screen for about three seconds without interacting.

### Must be immediately understandable

The user should be able to answer:

1. **What is this for?**
   - choose where I live now and where I am from;
   - see what community exists around that context.

2. **What do I do next?**
   - **„Провери за себе си“**

3. **What is the privacy promise?**
   - **„Показваме общности, не лични профили.“**

### PASS

- main question is the visual leader;
- CTA is immediately obvious;
- privacy does not compete with CTA;
- map supports the idea rather than stealing attention;
- no tiny user-facing text.

### FAIL

Any of:
- unclear what to do;
- CTA is visually weak;
- map dominates the user task;
- important copy is hard to read;
- secondary elements compete with the main action.

---

# C. Touch-size / readability quick check

This is a visual/physical confirmation, not a substitute for computed-size audit.

## C1. Initial CTA

Tap:
**„Провери за себе си“**

### Expected

- tap target feels comfortably large;
- no precision tapping needed;
- text is clearly readable.

### FAIL

- accidental misses;
- target feels too small;
- text looks smaller than surrounding normal body text should allow.

---

## C2. Main questions

Check:
- **„Къде си сега?“**
- later **„Откъде си?“**

### Expected

- visually strong question;
- clearly larger than helper text;
- readable without zooming.

---

## C3. Helper/privacy text

Check:
- Current helper;
- Root helper;
- privacy lines;
- verification/error text.

### Expected

- readable at normal viewing distance;
- no tiny 10–13px-looking user text;
- wrapping is allowed;
- content must not be clipped to preserve compactness.

---

# D. Current location — physical keyboard / IME

## D1. Country select

Start the flow.

Choose:
**Германия**

### Expected

- country changes immediately;
- Current field becomes usable;
- map focuses the selected country context;
- no stale previous locality remains.

### FAIL

- stale old locality remains;
- CTA remains enabled from old selection;
- field/map does not reflect new country.

---

## D2. Open the Current field

Tap the locality field.

### Expected

- physical keyboard opens normally;
- field remains visible or can be brought into view naturally;
- page does not jump into a broken position;
- CTA/panel is not permanently trapped behind the keyboard.

Record:
- keyboard opens: PASS/FAIL
- layout with keyboard: PASS/FAIL

---

## D3. Type a known locality

Type:
**Мюнхен**

### Expected

- suggestions appear promptly;
- suggestion list is readable;
- no visible lag;
- no network-loading spinner for typing;
- max list remains compact/scrollable.

Tap **Мюнхен**.

### Expected after tap

- keyboard can close normally;
- canonical Current is selected;
- CTA becomes enabled;
- map shows:
  **„Сега · Мюнхен“**

### FAIL

- typed text alone enables CTA without a confirmed selection;
- suggestion tap does not select;
- keyboard obscures the control with no usable recovery;
- map label clips or becomes unreadable.

---

## D4. Edit an already selected Current

Tap the Current field again and alter the text.

### Expected

- canonical selection is invalidated;
- CTA becomes disabled;
- edited text is treated as draft/search text;
- old canonical identity must not silently remain active.

---

# E. Root — Bulgarian search and Latin keyboard behavior

## E1. Go to Step 2

With Current = **Мюнхен**, continue.

### Expected

Compact Current summary:

**Сега**  
**Мюнхен, Германия**  
**Промени**

Then:
**„Откъде си?“**

### PASS

- summary is readable;
- country is visible;
- „Промени“ is usable;
- no text is crushed into a narrow vertical column.

---

## E2. Root helper meaning

Without typing yet, read the helper.

### Expected meaning

The user understands:
- choose the Bulgarian place considered their home/root;
- it will be connected to where they live now.

If that meaning is not clear on the phone, record FAIL.

---

## E3. Latin typing

Type:
**Lom**

### Expected

Suggestion:
**Лом**

Tap it.

### PASS

- Latin input can find the Cyrillic place;
- the canonical selected value is **Лом**, not raw `Lom`;
- CTA enables only after the recognized choice.

### FAIL

- no useful suggestion;
- raw Latin text is treated as canonical;
- keyboard/layout blocks the result.

---

# F. One-finger page scroll over the map

This must be done on the physical phone.

## F1. Put one finger on the map and drag vertically

### Expected

- page scrolls vertically;
- map does not trap the one-finger gesture;
- user can continue down/up the page naturally.

### PASS

Normal page scroll works while the gesture starts on the map.

### FAIL

- map traps the page;
- page cannot move;
- gesture feels stuck;
- accidental map pan replaces expected page scroll.

---

# G. Two-finger pinch on the map

## G1. Pinch with two fingers

### Expected

- map zoom responds;
- page does not wildly scroll during the pinch;
- zoom is bounded;
- labels remain readable;
- map does not disappear or jump uncontrollably.

### FAIL

- one finger is required to zoom;
- pinch fights page scroll badly;
- labels scale into unreadability;
- map becomes lost/off-screen.

---

# H. Same-place / nearby-map readability

These are visual checks.

## H1. Nearby places

Use:
- Current: **Ковачица**
- Root: **Лом**

### Expected

Both labels remain distinguishable:
- **Сега · Ковачица**
- **Откъде · Лом**

No confusing overlap.

---

## H2. Same place

Use:
- Current: **Лом**
- Root: **Лом**

### Expected

The two meanings remain understandable even at one location:
- **Сега · Лом**
- **Откъде · Лом**

No fake connecting line.

---

# I. 200% / large-text physical-phone pass

Open:
**Проверка на прототипа → Текст 200%**

Test at minimum:
- initial;
- Current;
- Root;
- one result.

### Expected

- horizontal clipping is not introduced;
- text wraps vertically;
- page scrolling is allowed;
- CTA remains reachable;
- locality/country summary stays readable;
- text is not shrunk just to fit.

### Known important Root check

**„Мюнхен, Германия“** must stay readable.

It is acceptable for **„Промени“** to wrap to another line.

---

# J. Close / back / recovery from keyboard state

## J1. Close flow while keyboard has been used

Use the close control.

### Expected

- flow closes;
- no broken fixed viewport remains;
- page returns to a sensible position;
- reopening still works.

---

## J2. Back/change Current from Root

Tap:
**„Промени“**

### Expected

- returns to Current;
- editing Current does not silently preserve an incompatible Root/result state;
- focus is usable.

---

# K. Missing-list physical-phone behavior

Use a no-list country such as:
**Люксембург**

### Expected

- field says effectively **write the city/locality** rather than presenting broken autocomplete;
- one concise verification explanation;
- **„Провери мястото“** is clear;
- Current CTA stays disabled without canonical Current.

### FAIL

- empty/broken dropdown appearance;
- country looks invalid;
- raw text silently becomes accepted Current.

---

# L. Error-state physical-phone readability

Use the review control to simulate an error after valid Current + Root.

### Expected

Error state is clearly technical.

The user should still understand:
- selected places are preserved;
- retry is available;
- places can be changed;
- technical failure does **not** mean “there are no people”.

### FAIL

- error looks like a privacy-suppressed/no-community result;
- selected context disappears;
- recovery actions are unclear.

---

# M. Three-second result comprehension

After a normal exact result, look for about three seconds.

The user should be able to say in their own words something equivalent to:

**„Показах къде живея и откъде съм; сега виждам какво има за точно тази комбинация.“**

### PASS

The result clearly feels connected to the two chosen places.

### FAIL

- unclear why this result is shown;
- looks like a generic community count;
- broader/exact meaning is confused;
- map/result connection is not understandable.

This is an Owner judgment and cannot be self-approved by ordinary QA.

---

# N. Tests that should NOT be falsely marked complete from this checklist

This phone checklist does not prove:

- screen-reader compatibility;
- low-end Android performance across devices;
- full Bulgarian/world locality coverage;
- production provider/backend behavior;
- production network latency;
- WORK CONTROLLER approval;
- final release readiness.

---

# O. Minimum evidence to send back after the phone pass

Return only:

1. device / OS / browser;
2. diagnostics line from A2;
3. PASS/FAIL for:
   - Mobile mode;
   - initial three-second test;
   - Current keyboard;
   - Root Latin `Lom`;
   - one-finger map scroll;
   - two-finger pinch;
   - 200% text;
   - exact-result three-second test;
4. screenshots only for FAIL states or anything visually questionable.

This is enough to decide the next safe action without reopening the frozen candidate prematurely.

---

# Stop rule

If a physical-phone test FAILS:

- record it;
- do not modify `review/ordinary-screen1-frozen-for-work`;
- do not patch the candidate in place;
- create a separate bounded fix proposal only after the failure is understood;
- WORK CONTROLLER still receives the untouched frozen checkpoint plus any later isolated fix candidate.
