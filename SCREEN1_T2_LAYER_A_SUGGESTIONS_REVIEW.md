# Screen 1 T2 — full Layer-A locality suggestions

Branch: `review/ordinary-screen1-active-integration`

## Scope

T2 only: verify that the existing locality adapter and active Screen 1 candidate correctly exercise the full existing `cities.js` Layer-A dataset.

No provider, canonical registry, coordinates, backend, production or Supabase work is added.

## Result

No prototype logic change was required for T2.

The existing adapter already makes all current Layer-A names reachable under their selected country while preserving the existing identity boundary.

Current inventory:
- 60 country keys in `cities.js`;
- 1530 locality-name suggestions;
- all 60 list-country codes exist in the 62-country `countries.js` source.

## Verification

Source-backed verification: **17/17 PASS**

Coverage includes:
- 1530/1530 names reachable by exact-name query in their own country;
- no exact duplicate names within a country list;
- dense list: US = 180 names, rendered results remain capped at 10;
- Germany = 73 names;
- Spain = 55 names;
- sparse list example: Singapore = 1 name;
- Bulgaria remains the existing 4-name Layer-A list;
- long original spelling preserved;
- case/repeated-space normalization;
- cross-country isolation;
- adapter empty query remains `[]`;
- active UI separately preserves the existing empty-focus C2 demo behavior;
- active UI calls the adapter with the selected country;
- keyboard and pointer/click selection wiring remains present;
- a Layer-A label cannot assign itself as canonical identity.

Representative long-label check:
`Сейнт Джонс (Нюфаундленд и Лабрадор)`

Runnable regression suite:

```bash
node screen1-layer-a-suggestions.test.cjs
```

## Important boundary

This PASS means:
- all **existing** 1530 Layer-A names are usable as suggestions.

It does **not** mean:
- the dataset contains every city/village;
- every suggestion is canonical/verified;
- every suggestion has coordinates;
- every suggestion can produce an exact public aggregate;
- MT/LU no-list behavior is solved.

Those are separate tasks.

## T2 implementation impact

Prototype functional diff for T2: **none**.

Only regression evidence/documentation is added because the already-built adapter passed the expanded scope.

Next task: **T3 — missing-list / fallback states**.
