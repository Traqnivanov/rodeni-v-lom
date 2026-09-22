# Screen 1 T5 — Root / Bulgaria coverage reality check

Branch: `review/ordinary-screen1-active-integration`

## Scope

T5 only: verify and harden the national Bulgaria Root path without pretending the current prototype contains a complete Bulgarian settlement registry.

This task does not add a national registry, provider, backend, stable production IDs or new aggregate rules.

## Reality of the current data

`cities.js` currently contains exactly four Bulgarian Layer-A names:
- София
- Пловдив
- Бургас
- Стара Загора

The active demo also contains additional BG fixtures for map/review purposes.

These two sources are intentionally treated as incomplete test data, not as complete Bulgaria coverage.

## Root contract alignment

The active Root step now matches the approved Screen 1 contract:

- summary includes **Current locality + country**;
- **„Промени“** is part of the compact Current status;
- helper:
  **„Избери населеното място в България, което приемаш за свое. Така ще свържем откъде си с мястото, където живееш сега.“**
- label:
  **„Населено място в България“**
- privacy:
  **„Изборът още не се публикува и не се брои в картата.“**
- CTA:
  **„Виж какво показва картата“**

At 200% review text size the status is allowed to wrap so the locality/country is not compressed into a narrow column.

## Root Latin search

The approved national Root contract allows typing locality names in Latin characters.

The active prototype now includes a lightweight **Root-only** Latin matching layer.

It does not modify the original locality adapter contract.

Verified examples:
- `Lom` → **Лом**
- `Kovachitsa` → **Ковачица**
- `Sofia` / `Sofiya` → **София**
- `Veliko Tarnovo` → matching key for **Велико Търново**

Latin text is only a search key. It never becomes canonical identity by itself.

## Tested Root classes

### Direct demo canonical Root

Example:
- **Лом**

Behavior:
- direct canonical selection;
- valid Root marker;
- normal preview path.

### Layer-A + direct demo canonical

Example:
- **София**

Behavior:
- found in Layer A;
- maps directly to existing demo canonical identity.

### Layer-A → controlled resolver canonical

Example:
- **Бургас**

Current data:
- Layer-A suggestion exists;
- not a direct normal demo suggestion fixture;
- existing controlled fallback demo fixture exists.

Verified review state:
- after explicit **„Провери мястото“**:
  `root=BG|Бургас`
- `rootDraft=∅`
- `pending=∅`

No raw text promotion occurs.

### Layer-A but unresolved in demo

Example:
- **Стара Загора**

Verified review state after resolver failure:
- `root=∅`
- `rootDraft=Стара Загора`
- `pending=∅`
- explicit **„Продължи с непотвърдено място“** is available.

Only if the user chooses that existing Root-only path does the value move to pending/unverified Root.

Unverified Root cannot create exact aggregate.

### Absent from current local data and demo fixtures

Example:
- **Трайково**

This demonstrates why the prototype must not be mistaken for complete Bulgarian coverage.

The correct future path is the existing controlled resolver/provider boundary, not a hand-built pseudo-registry.

## Nearby and same-place map cases

Verified at 360px:

### Ковачица ↔ Лом

- both canonical;
- map shows separate **„Сега · Ковачица“** and **„Откъде · Лом“** labels;
- labels are separated vertically and remain readable.

### Лом ↔ Лом

- same locality is allowed for Current and Root;
- one shared point may carry both meanings;
- **„Сега · Лом“** and **„Откъде · Лом“** are separated above/below the point;
- no fake route line is added.

## Verification

### Source-backed audit

**26/26 PASS**

Includes:
- national BG Root scope;
- approved Root copy/CTA/privacy;
- compact Current status;
- 48px change target;
- 200% wrapping support;
- explicit incomplete BG Layer-A inventory;
- direct/resolver/unresolved Root classes;
- Root-only Latin search;
- no raw-text canonicalization;
- pending Root exact-aggregate protection;
- nearby/same-place camera minimums;
- official WORK C2 unchanged;
- inline JavaScript syntax.

Runnable regression suite:

```bash
node screen1-t5-root-bulgaria-coverage.test.cjs
```

### Mobile visual review

Observed on 360px:
- Latin Root search `Lom` → **Лом** suggestion;
- canonical Burgas after controlled resolver;
- unresolved Stara Zagora with explicit unverified option;
- Ковачица ↔ Лом map labels;
- Лом ↔ Лом map labels;
- Root at 200% text size after status-wrap correction.

The 200% pass found and corrected a real visual issue where the compact Current status compressed `Мюнхен, Германия` excessively. Final layout wraps the status/action instead.

## Known limitations — intentionally not faked

NOT IMPLEMENTED / NOT VERIFIED:
- complete Bulgarian settlement registry;
- municipality/region metadata for same-name settlement disambiguation;
- production stable locality IDs for every Bulgarian place;
- real fallback provider/backend/cache;
- real phone keyboard/IME;
- screen reader;
- Owner final Screen 1 approval;
- WORK acceptance/canonicalization.

The §95 disambiguation example such as
**„Ковачица, община Лом, област Монтана“**
cannot be honestly demonstrated with the current data model because municipality/region metadata is not present. This remains a provider/registry responsibility, not a reason to invent metadata in the prototype.

## Status

T5 is a **prototype technical + targeted mobile visual checkpoint**, not proof of complete national geographic coverage.

Next planned task:
**T6 — realistic geographic/UI regression matrix at the expanded data scope.**
