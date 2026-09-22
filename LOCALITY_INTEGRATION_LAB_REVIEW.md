# Locality integration lab — ordinary review

Branch: `review/ordinary-locality-integration-lab`  
Base lineage: WORK C2 at `a809b3bf6bfcc8991304a806894a04f9e75d4c0f` + completed adapter branch `review/ordinary-locality-adapter`.

## Purpose

This is an isolated ordinary-executor laboratory for checking how the existing local suggestion data can feed the current C2 combobox without changing the official WORK C2 file.

Official `prototype-screen1-work-c2.html` is intentionally untouched.

## What is integrated

The lab copy `prototype-screen1-locality-integration-lab.html` loads, in order:

1. `countries.js`
2. `cities.js`
3. `locality-suggestions-adapter.js`
4. the copied C2 application script

The current C2 offered-country set and order are preserved. Country labels come from `countries.js`.

For the locality combobox:
- the adapter provides country-scoped local name suggestions;
- the existing C2 demo choices remain as a scoped supplement so already approved demo flows such as Lom are not lost;
- the combined list is de-duplicated and capped at 10;
- an empty query does not expand the whole local list;
- original list spelling is displayed.

## Critical identity boundary

A local-list result is still only a name suggestion.

Clicking or keyboard-selecting a suggestion that has no existing C2 demo identity:
- fills the input with the original suggestion label;
- does **not** create or invent a canonical ID;
- does **not** create coordinates;
- clears/keeps canonical state empty;
- cannot advance as a confirmed locality merely because the name came from `cities.js`.

Only an existing C2 demo place with an exact same normalized name can use the existing `confirmPlace` path.

This deliberately avoids:
- generated canonical IDs;
- country-centre coordinates;
- implicit `verified` state;
- transliteration/fuzzy/autocorrect behavior;
- backend/provider calls.

The existing controlled "Не намираш мястото?" path remains the route for a label that is not already an existing C2 demo identity.

## Verification performed

Source-backed verification against the branch:
- official C2 blob remains `750eafb4275b8e551325bf372bf70a028ac5c3ab`;
- all inline lab JavaScript parses;
- real source inventory remains 62 countries / 60 city-list keys / 1530 names;
- DE suggestion for `мюнх` returns `Мюнхен`;
- the same query under ES returns no result;
- combined suggestions are capped at 10;
- empty query returns no list expansion;
- suggestion-only label never assigns itself to canonical state;
- canonical confirmation requires an existing mapped C2 demo identity;
- C2 country ordering remains unchanged;
- no fetch/Supabase/GeoNames dependency was introduced.

The branch also contains the runnable built-in-Node test:

```bash
node locality-integration-lab.test.cjs
```

The current execution environment cannot run that repository command directly because the repository is not locally mounted and outbound git access is unavailable. Therefore no claim is made that this exact Node command was executed here. Equivalent source-backed checks were executed against the GitHub branch and passed.

## Browser status

Opera Browser Connector was attempted and reported `Browser not connected`. No browser visual PASS, phone keyboard PASS or screen-reader PASS is claimed for this task.

## Scope intentionally not included

This task does not:
- modify official C2;
- expose all 62 countries in the C2 UI;
- make all 1530 labels canonical;
- add coordinates for the 1530 labels;
- change aggregate logic, privacy, result bands, registration, Screen 2, main, production or Supabase;
- add pan/zoom behavior.

Pan/zoom + locality interaction is the next separate task in the ordinary work sequence.

## No rule adaptation

No product-rule adaptation was required for this laboratory. The implementation follows the existing distinction between suggestion label, canonical identity and verified coordinate.
