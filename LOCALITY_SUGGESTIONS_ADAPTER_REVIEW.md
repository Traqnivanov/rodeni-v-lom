# Locality suggestions adapter — review handoff

Branch: `review/ordinary-locality-adapter`  
Base commit: `a809b3bf6bfcc8991304a806894a04f9e75d4c0f`

## Scope

This change prepares only the local locality-name suggestion layer backed by the existing `countries.js` and `cities.js`. It is intentionally not integrated into C2.

The existing source inventory at the base commit is:
- 62 countries in `countries.js`;
- 1530 locality names under 60 country keys in `cities.js`;
- `MT` and `LU` are known country codes without a corresponding city list.

The original data files remain unchanged.

## API

Browser usage after `countries.js`, `cities.js`, and the adapter are loaded:

```js
window.RODENI_LOCALITY_SUGGESTIONS.suggest("DE", "  франкфурт   на майн  ");
// ["Франкфурт на Майн"]
```

Node usage for isolated tests/tools:

```js
const adapter = require("./locality-suggestions-adapter.js");

adapter.suggest("ES", "мадр", {
  countries: existingCountries,
  cities: existingCities
});
// ["Мадрид"]
```

`suggest(countryCode, query, explicitSources?)`:
- scopes results to the selected country;
- normalizes query case and whitespace for comparison only;
- returns original list spelling and original list order;
- returns at most 10 names;
- returns `[]` for an empty query, unknown country, missing list, or invalid source shape;
- does not mutate the input lists.

## Verification

Command:

```bash
node locality-suggestions-adapter.test.cjs
```

Actual result on the base `countries.js` and `cities.js`:

```text
PASS real source inventory is loaded
PASS valid suggestion is scoped to selected country
PASS name that exists only in another country is not suggested
PASS case and repeated/outer spaces are normalized for matching
PASS original list spelling is returned unchanged
PASS results are capped at 10
PASS empty query returns no suggestions
PASS known country without city list returns no suggestions
PASS unknown country code returns no suggestions
PASS no transliteration or automatic name correction is performed
PASS original data remains unchanged
PASS browser-style load works without Node globals
PASS locality-suggestions-adapter.test.cjs — 12 checks
```

The locally executed source copies were checked against the base Git blobs before the Node run:
- `cities.js`: `901034b1cf5ca1a2e819ff5ed740a46542b7fb04`;
- `countries.js`: `c7df5f486e8d3ca3b9a63d39e2e2f2a32f4fec9b`.

A separate source-backed verification against the files fetched directly from the review branch also passed the adapter behavior checks.

## Boundaries and limitations

A returned value is only a name suggestion. It is not a verified geographic identity, canonical locality ID, confirmed user selection, verified coordinate, or proof that the locality is eligible for a public aggregate/count.

The adapter deliberately does not:
- generate canonical IDs from names;
- add coordinates or country-centre fallbacks;
- add any `verified` state;
- transliterate;
- fuzzy-match;
- autocorrect locality names;
- make network requests;
- add dependencies;
- implement GeoNames/backend fallback;
- change C1, C2, V13, the map, privacy, registration, counts, Screen 2, production, main, or Supabase.

Matching is a literal normalized substring match within the selected country's existing list. Coverage therefore remains limited by the current curated lists and does not represent a complete settlement registry.

## Documentation note

There is a historical status mismatch in the read material: Master §100 still states that the official candidate was not implemented, while the newer `START_HERE.md` checkpoint records C1 as implemented. This adapter task does not depend on resolving that historical wording and does not modify product-rule documents.
