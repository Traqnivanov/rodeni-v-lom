# Screen 1 working adaptation proposal — selectable country without map geometry

**Date:** 22.09.2026  
**Proposed by:** ordinary executor  
**Owner status:** agreed for prototype testing only  
**Canonical status:** NOT CANONICAL; requires WORK CONTROLLER review  
**Scope:** Screen 1 prototype / country selection / map visualization

## Why this exists

The active Screen 1 prototype now uses the full existing `countries.js` source (62 selectable countries).

The current preserved SVG map contains drawable geometry for 60 of those 62 country codes. `MT` (Malta) and `SG` (Singapore) are valid selectable countries but do not have a separate `data-country` shape in the current map source.

The older map audit assumed every offered country had drawable geometry. That assumption no longer holds once the full country source is exposed.

## Working proposal being tested

A selectable country remains valid even when the current visualization dataset has no separate drawable country shape.

For a valid selected country with no drawable geometry, the prototype should:
- accept the country selection;
- not hide/remove the country from the selector;
- not invent a country centre;
- not invent a marker or locality coordinate;
- not reuse another country's shape or point;
- keep the map in a safe general view;
- give a short human-facing continuation cue;
- continue to the locality input normally.

Internal state may be described as `country selected + geometry unavailable`, but user-facing copy must not expose SVG/dataset/geometry terminology.

## Prototype copy under test

**„Избрана държава: <име>. Продължи с населеното място.“**

This is informational, not an error/warning state.

## Product rationale

The map is treated as a visualization layer, not as the authority for whether a person's country is valid.

The intended experience is:
- no technical excuses;
- no fake precision;
- no decorative false marker;
- no blocked flow caused only by missing map geometry.

## Important authorship / authority note

This is **not an Owner-originated product decision**.

It is an ordinary-executor proposal that the Owner agreed may be tested in the prototype.

WORK CONTROLLER must independently review whether this is the correct adaptation and, only if accepted through the project process, canonicalize it in the appropriate source-of-truth document.

It does not change:
- Root/Current meaning;
- locality canonical identity;
- aggregate eligibility/privacy;
- fallback provider policy;
- registration/context bridge;
- Screen 2;
- backend/Supabase.

## Current known cases

- `MT` — selectable; no current SVG country shape; no local `cities.js` list.
- `SG` — selectable; no current SVG country shape; has a local `cities.js` list.

These remain intentionally distinct for later locality/fallback testing.
