# Owner-approved Screen 1 adaptation — selectable country without map geometry

**Date:** 22.09.2026  
**Approved by:** Owner  
**Scope:** Screen 1 prototype / country selection / map visualization  
**Status:** OWNER-APPROVED ADAPTATION FOR WORK CONTROLLER CANONICALIZATION

## Problem

The active Screen 1 direction now uses the full existing `countries.js` source (62 selectable countries).

The current preserved SVG map contains drawable geometry for 60 of those 62 country codes. `MT` (Malta) and `SG` (Singapore) are valid selectable countries but do not have a separate `data-country` shape in the current map source.

The older map audit rule assumed every offered country had drawable geometry. That assumption no longer holds once the full country source is exposed.

## Owner-approved product rule

**A selectable country remains valid even when the current visualization dataset has no separate drawable country shape.**

The map is a visualization layer, not the source of truth for whether the user's country is valid.

For a valid selected country with no drawable geometry:

- accept the country selection;
- do not hide/remove the country from the selector;
- do not invent a country centre;
- do not invent a marker or locality coordinate;
- do not reuse another country's shape or point;
- keep the map in a safe general view;
- give a short human-facing continuation cue;
- continue to the locality input normally.

Internal state name may be `country selected + geometry unavailable`, but user-facing copy must not expose SVG/dataset/geometry terminology.

## Human-facing behavior

Approved direction:

**„Избрана държава: <име>. Продължи с населеното място.“**

This is informational, not an error/warning state.

## Brand / UX rationale

The project is about people, origin, belonging and community. A person must not be excluded because a visualization dataset lacks a separate country outline.

Principle:

**Country/context validity is not determined by map rendering capability.**

The experience should feel calm, honest and complete:
- no technical excuses;
- no fake precision;
- no decorative false marker;
- no blocked flow.

## Relationship to existing rules

This adapts the older audit expectation `offered country ⇒ drawable geometry`.

New rule:

**For an offered country, use drawable geometry when available. When it is unavailable, use an explicit safe no-geometry visualization state without inventing geographic position.**

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

Those two cases intentionally remain distinct for later locality/fallback testing.

## WORK CONTROLLER action

WORK CONTROLLER should review this Owner-approved adaptation and canonicalize it into the appropriate Screen 1 source-of-truth section before final promotion.

Ordinary executor implementation must remain limited to the prototype behavior described above.
