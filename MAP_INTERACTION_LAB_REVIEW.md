# Map interaction lab — ordinary review

Branch: `review/ordinary-map-interaction-lab`  
Parent checkpoint: `review/ordinary-locality-integration-lab` at `c5d43d2bbdc19f4a2747db5a9d09e2a80ed1b988`.

## Purpose

This is an isolated ordinary-executor implementation of the map-interaction step from `SCREEN1_EXISTING_MAP_LOCALITY_AUDIT.md`.

It does not modify the official WORK C2 file. The lab candidate is:

`prototype-screen1-map-interaction-lab.html`

## Preserved baseline

- official WORK C2 blob remains `750eafb4275b8e551325bf372bf70a028ac5c3ab`;
- locality integration lab blob remains `bcbdc81ecbc519ea44c3873ee3f9cdfbbceeb48f`;
- all 177 restored country paths remain present;
- C2 flow, aggregate logic, privacy bands, session behavior and locality identity boundary are not intentionally changed.

## Interaction implementation

The audit identified the original site's D3 interaction as a useful reference:
- bounded zoom;
- scale range 1–6 in the original site;
- bounded translation;
- transform the geometry rather than rebuilding paths for every interaction.

This lab preserves those interaction semantics without adding D3/topojson or a new runtime request.

Implementation:
- all country paths are wrapped once in `#mapGeometry`;
- manual zoom range is clamped to 1–6;
- pan is bounded to the currently scaled viewport;
- geometry uses one SVG transform matrix;
- HTML pins/labels remain outside the SVG geometry group and receive the same projected interaction transform, so their CSS text size does not scale with the map;
- automatic C2 context/camera changes reset the manual interaction state.

### Pointer behavior

Fine pointer:
- wheel/trackpad zoom;
- left-button pointer drag for pan;
- double click zoom.

Touch:
- map container uses `touch-action: pan-y`;
- a single touch is not cancelled by the map interaction layer, preserving vertical page scrolling;
- two active touch pointers are handled as map pinch/pan.

The above is an ordinary-lab implementation for WORK review, not an Owner/WORK final interaction approval.

## Dependency / performance note

No external library or request was added.

The alternative of directly adding D3 to the C2 prototype was intentionally not taken because it would introduce a new runtime dependency for behavior that can be expressed with a small native layer. WORK/Owner can still reject this implementation choice during review without affecting official C2.

## Verification

### Source-backed candidate verification — PASS, 15 checks

Verified against the actual GitHub branch:
- inline JS syntax parses;
- 177 country paths remain;
- geometry transform group exists;
- official C2 unchanged;
- locality integration checkpoint unchanged;
- no D3/topojson/fetch/Supabase dependency added;
- scale bounded 1–6;
- translation bounded;
- geometry uses transform matrix;
- HTML markers share the transform math;
- `touch-action: pan-y`;
- coarse-pointer wheel is not captured;
- context changes reset the manual transform;
- mouse drag uses bounded pointer-capture pan;
- the original C2 empty-query demo choices remain available without expanding the full local dataset.

Runnable repository test:

```bash
node map-interaction-lab.test.cjs
```

As with the previous task, the repository itself is not locally mounted in this execution environment, so no claim is made that this exact repository command was executed here.

### Isolated Chromium interaction harness — PASS, 6 checks

The same interaction functions were executed in the available headless Chromium through an isolated in-memory harness:

```text
PASS isolated Chromium interaction harness — 6 checks
touch-action pan-y
wheel zooms within 1..6
mouse drag changes bounded pan
geometry matrix updated
single touch remains uncancelled for page scroll
two touch pinch captured and zooms
```

This confirms the interaction event/math layer in a real Chromium runtime.

It is **not** a visual/browser PASS for the full C2-derived candidate because the full GitHub file was not materialized into that browser environment.

## Browser / real-device status

Opera Browser Connector is currently disconnected.

Therefore these remain NOT VERIFIED on the full candidate:
- full candidate wheel/drag behavior with all C2 layout;
- real touch/page-scroll gesture arbitration on a phone OS;
- pinch behavior on real hardware;
- marker/label overlap after arbitrary manual zoom/pan;
- screen reader;
- full §99 visual matrix.

No visual PASS or final Screen 1 approval is claimed.

## Next ordinary task

Prepare the geography/viewport regression matrix on the map-interaction candidate:
- Spain–Lom;
- Germany–Lom;
- UK–Lom;
- Italy–Lom;
- nearby Bulgaria pair;
- same-place pair;
- long labels;
- 360 / 390 / 412;
- external 200% text.

Where full-browser evidence cannot be produced, mark the item NOT VERIFIED rather than PASS.
