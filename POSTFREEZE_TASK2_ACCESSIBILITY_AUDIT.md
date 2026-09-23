# Post-freeze Task 2 — static accessibility audit

Branch: `review/ordinary-screen1-postfreeze-work`

Frozen base:
- branch: `review/ordinary-screen1-frozen-for-work`
- SHA: `1c1551dc47faa249132394f019491373bc876f22`
- active frozen candidate: `prototype-screen1-map-interaction-lab.html`
- candidate blob: `a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

## Scope and authority

This task is a static accessibility audit only.

Before auditing, checked:
1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`
4. relevant Master §§97, 99 and 100

Classification:
- already canonical: visible focus, keyboard-reachable core controls, understandable labels, applicable live/status/error announcements, accessible result context, 48px+ important targets, mobile-first readability;
- ordinary implementation detail: exact focus transfer after locality selection, exact disclosure semantics, exact dialog naming markup, exact keyboard equivalent for optional map pan/zoom;
- open product decision: none introduced by this audit;
- stale documentation: the C1/C2 authority drift is already isolated by Task 1 and is not changed here.

No product rule is changed.

## Static checks that PASS

### Language and structure
- document language is `bg`;
- one main H1 exists;
- dynamic Screen 1 questions use H2;
- the guided panel is labelled by the current question;
- the visual SVG/marker layer is hidden from assistive technology while equivalent text context is provided separately.

### Controls and labels
- Current country has a visible label;
- Current and Root locality inputs have visible labels;
- review-only selects are wrapped by labels;
- primary and secondary buttons have understandable visible text;
- the close × button has an explicit accessible name.

### Focus visibility and target size
- buttons, links, inputs, selects and summary elements have a clear 3px visible focus outline;
- important controls use at least the required 48px target floor;
- inputs/selects are 54px high;
- no hover-only requirement is used for the core form flow.

### Combobox/listbox semantics
The Current/Root locality control includes:
- `role="combobox"`;
- `aria-autocomplete="list"`;
- `aria-haspopup="listbox"`;
- `aria-expanded`;
- `aria-controls`;
- listbox/options semantics;
- `aria-activedescendant`;
- ArrowUp/ArrowDown navigation;
- Enter selection;
- Escape closes the suggestion list without closing the whole flow.

### State focus and errors
- opening/changing Screen 1 state moves programmatic focus to the current question;
- closing the Screen 1 flow returns focus to the main start button;
- validation/fallback errors use `role="alert"`, are focusable programmatically and receive visible focus;
- loading uses `role="status"`;
- result markup includes screen-reader-only Current + Root context;
- visually hidden screen-reader text is clipped rather than `display:none`.

### Duplicate IDs
Repeated IDs found in the source string templates (`question`, `error`, `next`, `back`) belong to mutually exclusive rendered states inside the same dynamic content container.

Static inspection does not show those duplicates coexisting in the live DOM at the same time.

## Issues found

### A11Y-01 — HIGH — locality selection drops keyboard focus

In both confirmed and draft suggestion selection paths, the locality input is explicitly blurred after selection.

There is no explicit transfer of focus to:
- the selected field;
- the next CTA;
- another meaningful continuation target.

Why this matters:
A keyboard user can select a suggestion with Arrow keys + Enter and then lose the logical position in the flow. The next Tab can restart from an unexpected place instead of naturally continuing to the next action.

This affects the core Current and Root paths.

Status:
**ISSUE CONFIRMED BY STATIC CODE.**

No fix applied in this task.

### A11Y-02 — MEDIUM — “Не намираш мястото?” disclosure has no expanded-state semantics

The button opens/closes fallback verification content, but it does not expose:
- `aria-expanded`;
- `aria-controls`.

Why this matters:
A screen-reader user is not told that the button controls expandable content or whether that content is currently open.

Status:
**ISSUE CONFIRMED BY STATIC CODE.**

No fix applied.

### A11Y-03 — MEDIUM — network error state is not an explicit live/alert region

Input/fallback validation errors correctly use `role="alert"`.

The full network error state (“Резултатът не се зареди”) is rendered as a focused heading and helper text, but the error copy itself is not inside `role="alert"`, `role="status"` or an explicit `aria-live` region.

Master §97 requires applicable status/error copy to be announced through live semantics.

The programmatic heading focus provides some state-change information, but it is not the same as an explicit live error announcement.

Status:
**CONTRACT MISMATCH CONFIRMED BY STATIC CODE.**

No fix applied.

### A11Y-04 — MEDIUM — privacy/login modal dialog has no accessible dialog name

The native `<dialog id="info">` contains a visible H2 (`infoTitle`), but the dialog itself has no `aria-labelledby="infoTitle"` or `aria-label`.

Why this matters:
The dialog title is visually present but is not explicitly connected as the accessible name of the modal.

Status:
**ISSUE CONFIRMED BY STATIC MARKUP.**

No fix applied.

### A11Y-05 — MEDIUM — map pan/zoom interaction has no keyboard equivalent

The map supports:
- pointer drag/pan;
- wheel zoom;
- double-click zoom;
- touch pinch.

The map container is not keyboard-focusable and has no map-specific keyboard pan/zoom handler.

The core Current/Root form can still be completed without manipulating the map, so this does not statically prove that the main flow is blocked. However the advertised interactive map manipulation itself is pointer/touch-only.

Status:
**ISSUE CONFIRMED FOR MAP INTERACTION FUNCTIONALITY.**

WORK should later decide the smallest compliant implementation treatment without changing the approved product flow.

No fix applied.

## Important items that are NOT statically verified

The following must not be marked PASS from this task:

- real TalkBack/VoiceOver reading order;
- real screen-reader announcement quality for results;
- physical keyboard/browser focus behavior after native dialog close;
- phone soft keyboard / IME behavior;
- physical-device 200% text reflow;
- real focus visibility under all browser/device combinations;
- real assistive-technology behavior of the combobox pattern.

These remain **NOT VERIFIED** and belong to real-browser/real-device validation.

## Task 2 result

**PARTIAL / ISSUES FOUND.**

The frozen candidate has a generally sound accessibility base, but it is not clean enough for a static accessibility PASS.

Confirmed findings:
- 1 HIGH;
- 4 MEDIUM;
- 0 product redesign requests.

No frozen file, C1/C2 artifact, canonical authority document, main, production, Supabase or Screen 2 was changed.

## What WORK should inspect later

WORK should independently verify:
1. focus continuity after Current and Root suggestion selection;
2. fallback disclosure semantics;
3. live announcement of network error state;
4. accessible name/focus behavior of the native info dialog;
5. whether optional map pan/zoom needs a keyboard equivalent or another narrowly scoped accessibility treatment;
6. real screen-reader and real phone/IME behavior before any accessibility approval.

Task 2 must not be converted into product approval by ordinary work.
