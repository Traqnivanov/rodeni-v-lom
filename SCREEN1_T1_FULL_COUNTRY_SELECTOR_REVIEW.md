# Screen 1 T1 — full country selector scope

Branch: `review/ordinary-screen1-active-integration`

## Scope

T1 only: remove the artificial 20-country prototype gate and use the full existing `countries.js` source in the active ordinary candidate.

No locality identity, map-result, Root, backend, production or Supabase rule is changed.

## Change

The active candidate now binds the country selector to:

```js
const countryPairs=Array.isArray(window.RODENI_COUNTRIES)?window.RODENI_COUNTRIES:[];
const countries=Object.fromEntries(countryPairs);
```

The former hardcoded `C2_COUNTRY_CODES` list is removed from the active candidate.

## Preserved behavior

- source order is preserved;
- Bulgarian labels come from `countries.js`;
- changing country still clears the previous Current locality;
- Root remains scoped to Bulgaria;
- locality suggestions still remain country-scoped;
- canonical identity rules are unchanged;
- official WORK C2 is untouched.

## Verification

Source-backed verification: **10/10 PASS**

Checks:
- 62 source countries;
- 62 unique ISO codes;
- full source binding;
- 20-country gate removed;
- source order preserved;
- country change clears Current;
- Root remains BG;
- official C2 unchanged;
- inline JS parses;
- no backend/network dependency added.

Runnable regression test:

```bash
node screen1-full-country-selector.test.cjs
```

## Boundary

This task does not claim that all world countries are selectable. It intentionally uses the current approved/local existing source of 62 countries.

It also does not claim complete locality coverage for those countries. That is handled separately by T2/T3 and the hybrid locality boundary.
