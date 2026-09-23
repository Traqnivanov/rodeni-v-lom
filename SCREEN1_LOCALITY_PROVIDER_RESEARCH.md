# Screen 1 — locality/provider research (NO DECISION / NO INTEGRATION)

**Branch:** `review/ordinary-screen1-postfreeze-qa`  
**Frozen Screen 1 remains unchanged:** `review/ordinary-screen1-frozen-for-work` @ `1c1551dc47faa249132394f019491373bc876f22`

## Status

**RESEARCH ONLY**

This document does not:
- choose a production provider;
- authorize API integration;
- add a key/secret;
- modify Supabase;
- modify Screen 1;
- create canonical production locality IDs;
- replace WORK CONTROLLER review.

The purpose is to reduce uncertainty before a future provider/registry decision.

---

# 1. Product requirements the future locality layer must satisfy

The existing approved contracts imply two related but different jobs.

## A. Root — Bulgaria

Need:
- one exact populated place in Bulgaria;
- canonical identity, not raw text;
- Bulgarian name;
- Latin transliteration/search support;
- municipality;
- district/oblast;
- enough hierarchy to support:
  locality → municipality → broader context;
- reliable same-name disambiguation;
- coordinates when valid;
- update/history strategy.

## B. Current — world

Need:
- country-scoped locality search;
- cities/towns/villages, not only major cities;
- canonical provider identity;
- display/local/alternate names;
- lat/lon;
- administrative hierarchy where available;
- search on common Latin/native variants;
- a realistic autocomplete API or local index;
- bounded cost and no network-on-every-keystroke requirement if avoidable;
- storage terms compatible with saving canonical context.

---

# 2. Bulgaria: official NSI / EKATTE

## What the official registry provides

The Bulgarian National Statistical Institute maintains the National Register of Populated Places and EKATTE.

The current official territorial-units table exposes:
- EKATTE code;
- settlement type;
- Bulgarian settlement name;
- transliteration;
- district/oblast code and name;
- municipality code and name;
- mayoralty;
- NUTS1/NUTS2/NUTS3;
- type/category;
- other classification metadata.

The registry also offers:
- downloadable Excel archive;
- downloadable JSON archive;
- historical archives by year;
- developer/integration service documentation.

Official developer access exists through an authenticated EKATTE data service; NSI states that Swagger descriptions are available over SSL and access credentials must be requested.

## Spatial data

NSI also publishes spatial data.

The 2025 populated-place point layer:
- contains **5256 populated places**;
- uses **EPSG:4326 / WGS84**;
- contains official names and national EKATTE identifiers;
- is described as valid until the next correction/change.

Municipality and district polygon layers are also published separately.

## Why this matters to the approved Root contract

This source can represent:

`root locality → EKATTE → municipality code/name → district code/name`

without hardcoded rules such as:
- “Ковачица is near Lom”;
- “Трайково belongs to Lom”.

It also provides official transliteration instead of requiring the product to invent a Bulgarian transliteration table for canonical records.

## Research assessment

**Strong fit for Bulgarian Root canonical authority.**

Reason:
- official national classifier;
- explicit stable national code namespace;
- municipality/district hierarchy;
- transliteration;
- downloadable data;
- spatial point data;
- archive/history.

Important:
this is a research finding, **not an implementation decision**.

Potential future technical question for WORK:
- periodic downloadable snapshot vs authenticated NSI service vs hybrid update process.

Sources:
- https://www.nsi.bg/nrnm/ekatte/index
- https://www.nsi.bg/nrnm/ekatte/territorial-units
- https://www.nsi.bg/nrnm/spatial-data-files
- https://www.nsi.bg/nrnm/special/for-developers
- https://www.nsi.bg/nrnm/ekatte/archive

---

# 3. GeoNames — global locality candidate

## Capabilities

GeoNames exposes:
- `geonameId`;
- country code;
- latitude / longitude;
- feature class and feature code;
- admin1/admin2/admin3/admin4 codes;
- population and other metadata;
- alternate names;
- language-tagged alternate names;
- ASCII/transliterated name variants.

The downloadable dataset includes:
- daily worldwide extract;
- country-specific extracts;
- alternateNamesV2;
- admin code lookup files.

The web search service supports:
- country filter;
- feature class/code filters;
- `name_startsWith`;
- paging.

GeoNames search demonstrates real examples relevant to this project:
- Munich under Germany/Bavaria with administrative hierarchy;
- Kovachitsa as a populated place in Bulgaria/Montana/Lom hierarchy.

## Licensing / service limits

GeoNames states:
- data is free;
- CC-BY attribution applies;
- commercial use is allowed;
- data is provided “as is”;
- free web services have 10,000 credits/day and 1,000/hour;
- paid SLA/premium services exist.

## Strengths for Rodeni

- real canonical-style provider ID (`geonameId`);
- very simple data model;
- can be downloaded and indexed locally;
- alternate spellings/languages;
- country/admin hierarchy;
- coordinates;
- no need for a heavyweight map runtime.

## Risks / questions

- aggregated/community-maintained global data, not a national official register;
- “as is” accuracy/completeness;
- hierarchy quality varies by country;
- production should not assume every provider admin level has the same meaning worldwide;
- a future internal ID strategy should avoid making the whole product permanently depend on one provider identifier.

## Research assessment

**Strong candidate for a global Current locality layer or fallback index.**

Particularly attractive if the future implementation prefers:
- locally indexed data;
- predictable no-network autocomplete;
- provider independence at UI level.

Not selected.

Sources:
- https://www.geonames.org/export/
- https://www.geonames.org/export/geonames-search.html
- https://download.geonames.org/export/dump/
- https://www.geonames.org/export/web-services.html
- https://www.geonames.org/search.html?country=BG

---

# 4. Geoapify — managed autocomplete candidate

## Capabilities

Geoapify provides a managed Address/Place Autocomplete API.

Relevant controls include:
- `type=city`;
- country filters;
- language parameter;
- result limit;
- location bias.

Returned structured data can include:
- name;
- country/country_code;
- state/state_code;
- county/county_code;
- city;
- lat/lon;
- result_type;
- `place_id`.

Geoapify says its platform uses open sources including OpenStreetMap, GeoNames and others.

## Storage / pricing

Geoapify publicly states:
- results can be cached/stored under its terms;
- free plan: 3,000 credits/day;
- simple geocoding/autocomplete requests generally cost 1 credit;
- free plan currently allows up to 5 requests/sec;
- paid tiers scale upward.

## Strengths

- ready-made autocomplete;
- structured global results;
- easy country filtering;
- low implementation burden;
- permissive storage posture compared with some proprietary providers;
- can avoid self-hosting global geocoding infrastructure.

## Risks / questions

- external API dependency;
- search-as-you-type consumes credits unless debounced;
- provider `place_id` should not automatically become the product’s permanent internal locality ID until stability semantics are explicitly confirmed;
- underlying source quality can vary because it is assembled from multiple open-data sources.

## Research assessment

**Strong managed-service candidate for interactive global Current search.**

Good comparison point against a locally indexed GeoNames approach.

Not selected.

Sources:
- https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/
- https://apidocs.geoapify.com/docs/geocoding/
- https://www.geoapify.com/pricing/
- https://www.geoapify.com/

---

# 5. OpenStreetMap Nominatim

There are two very different options:
1. public OSMF Nominatim server;
2. self-hosted Nominatim.

## Public Nominatim

The official public-server policy explicitly says:
- absolute maximum 1 request/second;
- attribution required;
- applications should be able to switch service;
- **autocomplete search is forbidden** on the public server.

Therefore:

**Public nominatim.openstreetmap.org is not a viable production autocomplete backend for this Screen 1 flow.**

This is a policy constraint, not a quality judgment.

## Identifier stability

Nominatim documentation explicitly states:
- `place_id` is an internal ID;
- it is not persistent;
- it differs between installations;
- it may change after reimport/update;
- even `osm_type + osm_id` can change when an OSM object is deleted/recreated/split.

Therefore Nominatim `place_id` should **not** be used as the product’s permanent canonical locality ID.

## Self-hosting

Self-hosting removes the public-server autocomplete restriction, but full-planet operation is heavy.

Current Nominatim documentation recommends for a full planet import roughly:
- 128 GB RAM or more;
- at least 1 TB disk;
- fast NVMe;
- around 2.5 days import on a well-configured machine.

## Research assessment

### Public service
**Not suitable for this autocomplete use case.**

### Self-hosted
Technically possible, but **high operational weight relative to the current project stage**.

Not selected.

Sources:
- https://operations.osmfoundation.org/policies/nominatim/
- https://nominatim.org/release-docs/develop/api/Output/
- https://nominatim.org/release-docs/develop/admin/Installation/

---

# 6. Mapbox Search / Geocoding

## Capabilities

Mapbox offers:
- Search Box suggest/retrieve autocomplete;
- country/region/place/locality hierarchy;
- coordinates;
- `mapbox_id`;
- localized and preferred names.

The Geocoding API documentation says `mapbox_id` uniquely identifies a feature in the Mapbox search database.

## Important storage distinction

Mapbox has two different storage models.

### Search Box

Current Search Box documentation says returned data is for temporary use; use cases requiring stored position data should contact Mapbox sales.

### Geocoding API

Geocoding supports:
- temporary mode by default;
- permanent mode for data that must be stored;
- permanent storage requires a valid credit card / applicable commercial setup.

## Strengths

- strong interactive search UX/API;
- structured global hierarchy;
- mature localization;
- canonical-like Mapbox IDs.

## Risks / questions

- vendor dependency;
- storage/licensing workflow must be designed deliberately;
- Search Box temporary results cannot simply be treated as a persistent canonical database record;
- persistent workflow may require a different endpoint/commercial mode.

## Research assessment

**Technically strong managed candidate, but storage/terms architecture is more consequential than with GeoNames or Geoapify.**

Not selected.

Sources:
- https://docs.mapbox.com/api/search/search-box/
- https://docs.mapbox.com/api/search/geocoding/
- https://docs.mapbox.com/help/dive-deeper/understand-temporary-vs-permanent-geocoding/

---

# 7. Google Places — reference comparison only

Google Place IDs:
- uniquely identify places in Google’s place database;
- may be stored;
- can change over time;
- Google recommends refreshing stored Place IDs older than 12 months.

This makes them usable as provider references but not an ideal assumption for an immutable product-owned locality identity.

This research pass did not evaluate Google pricing or integration because there are already credible open/managed alternatives and no provider decision is being made.

Source:
- https://developers.google.com/maps/documentation/places/web-service/place-id

---

# 8. Key architectural finding: product ID should be provider-independent

This is a research recommendation for WORK review, not a product rule.

A future production locality row should probably separate:

- **internal product locality ID**
- **country code**
- **canonical display name**
- **canonical local/native name**
- **search aliases/transliterations**
- **lat/lon when valid**
- **administrative hierarchy**
- **provider namespace**
- **provider external ID**
- **source/version**
- **verification/update timestamp**

Conceptually:

```
locality
  internal_id
  country_code
  name
  native_name
  lat
  lon
  admin1
  admin2
  ...

locality_external_identity
  internal_id
  provider
  external_id
  source_version
```

Why:
- GeoNames ID, EKATTE code, Mapbox ID, OSM ID etc. are different namespaces;
- providers can change;
- one provider can be enriched/cross-checked with another;
- UI/privacy logic should not depend on provider internals.

For Bulgaria specifically, an internal Root locality could reference the official EKATTE code as the authoritative national external identity.

---

# 9. Candidate future architectures to compare — NOT DECISIONS

## Architecture A — official BG + local global index

Root Bulgaria:
- NSI EKATTE canonical authority.

Current world:
- locally indexed GeoNames data.

Autocomplete:
- local DB/index.

Potential benefits:
- low runtime API dependency;
- predictable search latency;
- storage freedom;
- clear canonical IDs;
- easy provider fallback later.

Costs:
- periodic data import/update job;
- data-quality reconciliation.

---

## Architecture B — official BG + managed global API

Root Bulgaria:
- NSI EKATTE canonical authority.

Current world:
- Geoapify managed autocomplete/geocoding.

Potential benefits:
- lowest operational complexity;
- strong interactive search;
- no full global import pipeline initially.

Costs:
- API dependency/credits;
- provider ID/storage semantics must be reviewed;
- network failure path required.

---

## Architecture C — official BG + commercial managed search

Root Bulgaria:
- NSI EKATTE.

Current world:
- Mapbox permanent-compatible geocoding/search architecture.

Potential benefits:
- mature search/localization.

Costs:
- storage/terms architecture;
- vendor/commercial dependency;
- careful distinction between temporary Search Box data and permanent geocoding.

---

## Architecture D — self-hosted OSM/Nominatim

Root Bulgaria:
- still preferably EKATTE for official Root hierarchy.

Current world:
- self-hosted OSM/Nominatim.

Potential benefits:
- maximum infrastructure/data control.

Costs:
- by far the heaviest infrastructure option reviewed;
- Nominatim IDs are not suitable as permanent product IDs by themselves.

---

# 10. Research comparison summary

| Requirement | NSI EKATTE | GeoNames | Geoapify | Public Nominatim | Self-host Nominatim | Mapbox |
|---|---|---|---|---|---|---|
| Bulgaria official authority | **Yes** | No | No | No | No | No |
| Global scope | Bulgaria only | Yes | Yes | Yes | Yes | Yes |
| Stable provider-style ID | EKATTE code | geonameId | place_id available; persistence needs confirmation | **No: place_id not persistent** | **No: place_id not persistent** | mapbox_id |
| Coordinates | official spatial layer | Yes | Yes | Yes | Yes | Yes |
| Admin hierarchy | **Strong BG official** | Yes, variable by country | Structured | OSM-derived | OSM-derived | Structured |
| Alternate/transliterated names | **Official BG transliteration** | Strong | Search/localization | OSM search | OSM search | Localized names |
| Autocomplete permitted | local/API design possible | search API/local index | Yes | **No on public server** | Yes | Yes |
| Can avoid network-on-type | Yes with local snapshot | **Yes with local dump** | No unless cached/local Layer-A first | N/A | possible | No for managed search |
| Storage friendliness | downloadable official data | downloadable CC-BY | provider says cache/store allowed | ODbL constraints | ODbL/self-host | temporary/permanent rules |
| Operational weight | Low/medium import | Low/medium import | Low | unusable for autocomplete | **High** | Low/medium |
| Production provider selected? | **NO** | **NO** | **NO** | **NO** | **NO** | **NO** |

---

# 11. What can already be said with high confidence

1. **Bulgaria Root does not need a hand-built locality list.**
   Official EKATTE already provides the hierarchy the product contract requires.

2. **The current four-name BG `cities.js` list must remain demo data only.**
   It should never become the canonical national Root source.

3. **Public Nominatim should not be used for this autocomplete flow.**
   Its own policy forbids autocomplete on the public service.

4. **Nominatim `place_id` is not a permanent canonical ID.**

5. **GeoNames is materially stronger than the existing 1530-name Layer-A file as a global locality dataset.**
   It supplies IDs, coordinates, hierarchy and alternate names.

6. **Geoapify is a realistic managed-service alternative if the project wants to avoid maintaining a global index.**

7. **A provider-independent internal locality identity is safer than making user/profile relations depend directly on one vendor ID.**

---

# 12. Questions that must remain open for WORK / Owner

Do not decide these in ordinary QA:

1. Does production prefer:
   - local global dataset;
   - managed global API;
   - hybrid?

2. Should Root Bulgaria use:
   - periodic EKATTE JSON/GeoPackage snapshot;
   - authenticated EKATTE service;
   - hybrid snapshot + scheduled refresh?

3. What exact internal locality schema is approved?

4. What update cadence is acceptable?

5. What attribution/licensing surface is acceptable?

6. What cost ceiling is acceptable for global autocomplete?

7. Should provider fallback exist at launch?

8. How should old provider IDs be reconciled if a source changes?

---

# 13. Safe next research experiment if WORK remains unavailable

Without integrating anything into Screen 1:

- obtain/read one current EKATTE JSON/spatial snapshot;
- inspect records for:
  - Лом;
  - Ковачица;
  - Трайково;
  - София;
  - duplicate-name examples;
- document the exact fields needed for a future canonical schema;
- optionally compare those same places against GeoNames.

This can be done entirely in the QA/research branch and would not modify the frozen candidate.

---

# Final research conclusion

There is no need to rush into a generic geocoding API.

The locality problem naturally separates into:

**Bulgaria Root = official national authority problem**  
and  
**Current world = global search/provider problem**.

The strongest factual discovery in this pass is that NSI/EKATTE already supplies the official Bulgarian canonical hierarchy and WGS84 settlement points required by the approved Root logic.

For world Current, GeoNames and Geoapify are the two clearest low-lock-in directions to investigate further, while public Nominatim is unsuitable for autocomplete and Mapbox requires more deliberate storage/terms design.

**No provider has been selected.**
