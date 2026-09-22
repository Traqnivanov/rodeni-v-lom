# Screen 1 geography / viewport matrix — ordinary review

Branch: `review/ordinary-screen1-matrix-lab`  
Parent checkpoint: `review/ordinary-map-interaction-lab` at `db39669a2a0815589b594a5fe8f1ddcbde092142`.

## Scope

This task performs the regression matrix required by the existing map/locality audit on the isolated map-interaction candidate.

No product logic, aggregate rule, privacy rule, registration flow, official WORK C2, main, production or Supabase is changed.

## Matrix scenarios

Checked:
- Spain–Lom: Madrid + Lom;
- Germany–Lom: Munich + Lom;
- UK–Lom: London + Lom;
- Italy–Lom: Milan + Lom;
- nearby Bulgaria pair: Lom + Kovachitsa;
- same-place pair: Lom + Lom;
- long-label pair: Manchester + Veliko Tarnovo;
- widths 360 / 390 / 412 CSS px;
- normal root text;
- external-style 200% root text.

The pair map height used by the C2 contract is 240 px at normal root text and 300 px when the root font is 200%.

## Source / camera verification — PASS

`screen1-map-matrix.test.cjs` is a built-in-Node regression test for:
- required ES/DE/GB/IT/BG geometry presence;
- all matrix locality coordinates coming from the actual map-interaction candidate;
- pair-fit camera math across 360/390/412 and 240/300 map heights;
- both projected locality points remaining inside the viewport;
- fixed-size HTML labels remaining outside the transformed SVG geometry.

Equivalent source/math checks were executed against the GitHub branch and passed: **10 checks**.

Runnable command:

```bash
node screen1-map-matrix.test.cjs
```

The exact repository command is not claimed as executed because the repository is not locally mounted in this environment.

## Chromium label/camera harness — PASS 42/42 states

The candidate's pair-fit camera formula, locality coordinates, label placement rules and relevant label CSS were exercised in the available headless Chromium.

For every state, both labels had to:
- remain fully inside the map box;
- avoid overlap with each other.

Result:

```text
PASS label/camera Chromium matrix — 42/42 states
```

All combinations passed:
- 7 scenarios;
- 360 / 390 / 412 px;
- 100% / 200% root text.

This is real Chromium layout measurement for the isolated camera/label layer.

## Important evidence boundary

The 42/42 result is **not** a full-candidate visual PASS.

The entire GitHub HTML candidate could not be materialized into the browser runtime in this environment, and Opera Browser Connector is disconnected.

Therefore these remain NOT VERIFIED on the whole candidate:
- complete C2 page flow at all matrix widths;
- actual phone soft keyboard;
- real phone touch gesture arbitration;
- arbitrary manual zoom/pan followed by every label scenario;
- screen reader;
- human three-second comprehension;
- final Owner phone review;
- complete §99 release gate.

## Dataset distinction

The review candidate continues to state clearly:
- `cities.js` / adapter results are name suggestions;
- they are not canonical locality identity;
- they do not create coordinates or public aggregate eligibility.

The limited C2 demo identity/coordinate fixtures remain separate.

## Next decision point

The map/locality audit's remaining item E is product-facing:

> resolve result-copy duplication and registration transition separately against canonical product decisions.

This affects Screen 1's final result/boundary experience rather than only technical map/locality infrastructure.

According to the project process, the next step is:
1. audit the current result + boundary against the canonical registration/context-bridge decisions;
2. present one concrete problem and best solution to Owner;
3. only after Owner approval, implement it in a new isolated ordinary branch.
