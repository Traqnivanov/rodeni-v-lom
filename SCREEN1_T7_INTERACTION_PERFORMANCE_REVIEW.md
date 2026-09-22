# Screen 1 T7 — interaction / performance audit

Branch: `review/ordinary-screen1-active-integration`

## Scope

T7 only: confirm that expanding Screen 1 from the old limited country set to the full local country/Layer-A suggestion scope does not introduce heavy interaction, network-on-type behavior, full-list DOM rendering, map regressions or unnecessary runtime dependencies.

No product behavior was added during T7.

## Stable candidate under test

Active candidate:
`prototype-screen1-map-interaction-lab.html`

Candidate blob:
`a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

The candidate blob remained unchanged through T6 and T7.

Official WORK C2 also remains unchanged:
`750eafb4275b8e551325bf372bf70a028ac5c3ab`.

## Local data/runtime footprint

Approximate source text sizes observed:
- `countries.js`: ~1.3 KB
- `cities.js`: ~18 KB
- `locality-suggestions-adapter.js`: ~2.3 KB

Current locality inventory:
- 62 selectable countries
- 60 locality lists
- 1530 Layer-A locality names
- largest single country list: US, 180 names

The active candidate does not load a new framework or geographic runtime library for this integration.

## Network-on-type audit

PASS.

The active candidate contains no:
- `fetch()`
- `XMLHttpRequest`
- `WebSocket`
- `EventSource`
- `sendBeacon`

The only external script tags in the candidate are local repository files:
- `countries.js`
- `cities.js`
- `locality-suggestions-adapter.js`

There is no D3, topojson or Supabase runtime dependency added to this active prototype.

Typing into Current/Root search uses only:
- local in-memory arrays;
- local normalization;
- bounded DOM replacement;
- sessionStorage draft persistence.

## Suggestion rendering audit

PASS.

The adapter itself caps returned locality suggestions at 10.

The active merged suggestion layer also applies:
`names.length >= 10`

The DOM is updated with:
`box.replaceChildren(...list.map(...))`

Therefore the UI does not render all 1530 names.

For an empty query, the candidate intentionally shows only up to 7 existing demo choices:
`demo.slice(0,7)`

Dense-country review at 360px also visually confirmed a scrollable 10-result suggestion box.

## Browser timing probe

A QA-only timing probe was added to:
`prototype-screen1-mobile-visual-review.html`

The probe:
- selects US;
- dispatches 10 representative synchronous input searches;
- records input-handler + bounded DOM-paint duration;
- verifies the rendered option count;
- then performs a canonical Germany state followed by DE → FR country switch;
- records synchronous switch/render time;
- validates final state after the switch.

Important QA correction:
the first timing-probe version retained a stale `<select>` reference across a candidate `render()`. The state readout exposed the mistake. The harness was corrected to reacquire the live country select after every render before the measurements below were accepted.

Observed in Opera/Chromium review environment:

### 360px
- search average: **0.81 ms**
- search max: **2.70 ms**
- rendered options: **10**
- DE → FR switch: **6.60 ms**
- final state:
  - `country=FR`
  - `current=∅`
  - `currentDraft=∅`

### 412px
- search average: **0.50 ms**
- search max: **1.10 ms**
- rendered options: **10**
- DE → FR switch: **9.30 ms**
- final state:
  - `country=FR`
  - `current=∅`
  - `currentDraft=∅`

These are environment observations, not universal device benchmarks.

They are sufficient to show that the current local 1530-name data scope is not producing an obvious interaction-performance bottleneck in the tested browser.

## Country-switch responsiveness

PASS in source and browser probe.

Country change synchronously clears:
- previous canonical Current;
- Current draft;
- map interaction state;

then saves/renders the new state.

No network dependency is involved.

## Map interaction regression

PASS at source level.

The active map interaction engine from:
`function resetMapInteractionState...`
through the interaction wiring block before `drawMap()`

is **byte-for-byte identical** to the original map-interaction checkpoint at:
`db39669a2a0815589b594a5fe8f1ddcbde092142`

That earlier interaction layer had already been browser-harnessed for:
- wheel zoom;
- mouse drag pan;
- geometry matrix update;
- single-touch page-scroll preservation;
- two-touch pinch capture.

Current source still verifies:
- zoom clamp 1..6;
- bounded pan;
- matrix transform instead of rebuilding geometry;
- coarse-pointer wheel/double-click guard;
- `touch-action: pan-y`;
- touch pointer path only calls `preventDefault()` when two touch points are active.

## Single-touch page-scroll intent

PASS at source level.

The map uses:
`touch-action: pan-y`

The touch pointer branch records one touch point and returns.

`preventDefault()` is only reached in the two-touch pinch path:
`if(touchPoints.size===2)`

This preserves vertical one-finger page scroll intent in the implementation.

Real-device touch behavior remains NOT VERIFIED until tested on a physical phone.

## Minor inefficiency found

There is a small local redundancy when a user first edits an already-canonical locality:

- `invalidateEditedSelection()` may call `syncDraftFromInput()`;
- the enclosing `input` handler then calls `syncDraftFromInput()` again.

This can cause one duplicate sessionStorage save during the transition from canonical → edited draft.

Assessment:
- bounded;
- local only;
- not on every subsequent keypress once canonical state is cleared;
- no network cost;
- no observed performance issue.

No candidate change was made only for this micro-optimization.

## Verification

### Final source-backed audit

**23/23 PASS**

Covers:
- no network APIs;
- only local helper scripts;
- no new heavy libraries;
- 62 / 60 / 1530 source scope;
- largest list 180;
- max-10 merged suggestions;
- empty-query demo cap;
- bounded DOM replacement;
- country-switch reset;
- touch/pan/zoom rules;
- QA timing probe integrity;
- candidate/review JavaScript parsing;
- stable candidate blob;
- unchanged WORK C2.

Runnable regression suite:

```bash
node screen1-t7-interaction-performance.test.cjs
```

## Evidence boundary

PASS:
- local search architecture;
- no network-on-type;
- bounded result DOM;
- representative browser search timing;
- representative country-switch timing;
- map interaction source continuity;
- single-touch scroll intent in source;
- no unnecessary new runtime library;
- stable candidate during audit.

NOT VERIFIED:
- real phone touch gesture arbitration;
- physical-phone scroll feel;
- soft keyboard / IME;
- low-end Android hardware timing;
- screen reader;
- production provider/backend behavior;
- final Owner phone approval;
- WORK acceptance/canonicalization.

## Status

T7 is complete as an interaction/performance audit checkpoint.

Next planned task:
**T8 — final self-audit + WORK CONTROLLER handoff.**
