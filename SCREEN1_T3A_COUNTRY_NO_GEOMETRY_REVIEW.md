# Screen 1 T3A — selectable country without map geometry

Branch: `review/ordinary-screen1-active-integration`

## Scope

T3A only: handle valid selectable countries that have no separate SVG country shape in the current preserved map source.

Current cases:
- `MT` — selectable, no current SVG country shape, no `cities.js` list;
- `SG` — selectable, no current SVG country shape, has a `cities.js` list.

## Authority / authorship

The behavior below was **proposed by the ordinary executor** and the Owner agreed it may be tested in the prototype.

It is **not an Owner-originated product rule** and **not canonical**.

WORK CONTROLLER must independently review it before any source-of-truth canonicalization or promotion.

## Prototype behavior under test

For a valid selected country with no drawable geometry:
- keep the country selectable;
- accept the country selection;
- keep the map in a safe general view;
- do not invent a country centre;
- do not invent a marker/point/coordinate;
- do not reuse another country's geometry;
- show the informational continuation cue:
  **„Избрана държава: <име>. Продължи с населеното място.“**
- expose equivalent screen-reader text;
- continue to the locality field normally.

## Verification

Source-backed audit: **11/11 PASS**

Verified:
- MT and SG remain selectable;
- they are exactly the two selectable country codes without current SVG geometry;
- explicit no-geometry state exists;
- human continuation copy is used;
- no old `countryPoint` / country-centre fallback exists;
- drawable countries still focus via their SVG geometry;
- MT and SG remain distinct locality-data cases;
- accessibility text mirrors the continuation cue;
- official WORK C2 remains unchanged;
- inline JavaScript parses.

Runnable regression test:

```bash
node screen1-country-no-geometry.test.cjs
```

## Evidence boundary

This is:
- **technical/source PASS**

This is not:
- full browser visual PASS;
- real-phone PASS;
- Owner visual approval;
- WORK acceptance;
- canonical product rule.

## Next dependency

The remaining locality-data issue is separate:

**T3B — country exists but local Layer-A list is absent** (`MT`, `LU`).

Do not mix T3B with the later 1501 list-only/canonical-identity issue.
