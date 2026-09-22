# Screen 1 T6 — realistic geographic/UI regression matrix

Branch: `review/ordinary-screen1-active-integration`

## Scope

T6 only: run representative geographic/UI states against the expanded country and Layer-A locality scope.

This is a regression checkpoint, not a new product decision.

No Screen 1 product behavior was added during T6.

## Stable candidate under test

Active candidate:
`prototype-screen1-map-interaction-lab.html`

Candidate blob throughout T6:
`a3334bfabd9d99d156a766ca094f2bd1cbf1822c`

The candidate blob stayed unchanged during T6.

T6 commits only added/adjusted:
- review scenarios;
- review diagnostics;
- regression test;
- review documentation.

Official WORK C2 remains unchanged:
`750eafb4275b8e551325bf372bf70a028ac5c3ab`.

## Data-scope representatives

The expanded local sources currently contain:
- 62 selectable countries;
- 60 country locality lists;
- 1530 Layer-A locality names.

Representative classes used:

### Dense country
US:
- 180 Layer-A names;
- query `а` produces more than 10 matches;
- adapter/render cap remains 10.

### Sparse country
SI:
- exactly one Layer-A name: **Любляна**.

### Missing-list country
LU:
- valid selectable country;
- no Layer-A locality list;
- write-first + verification state from T3B.

### Long locality
CA:
- **Сейнт Джонс (Нюфаундленд и Лабрадор)**.

### Long country
AE:
- **Обединени арабски емирства**.

### Country switch
DE canonical Current → FR.

Expected:
- country becomes FR;
- previous Current canonical ID is cleared;
- Current draft is cleared;
- Current CTA becomes disabled again.

### Recovery
Expired session payload older than 24 hours.

Expected:
- stale state removed;
- safe empty Current step;
- visible explanation that previous selection expired/could not be restored.

## Source-backed regression

Detailed T6 source audit:
**28/28 PASS**

Final integrity audit after QA-only harness refinements:
**18/18 PASS**

Regression suite:
`screen1-t6-realistic-regression-matrix.test.cjs`

It covers:
- 62 / 60 / 1530 source inventory;
- dense/sparse/missing-list representatives;
- max-10 suggestion cap contract;
- long locality/country representatives;
- canonical vs list-only separation;
- country-switch clearing;
- Current/Root CTA gating;
- recovery validation and notice;
- error paths;
- Root-only unverified fallback;
- pending Root exact-aggregate protection;
- 360 / 390 / 412 review widths;
- 200% review mode;
- QA scenarios;
- candidate/review inline JavaScript parsing.

## Mobile visual matrix

### 360px — dense US / 100%
PASS:
- 10 suggestion rows represented;
- suggestion container scrolls instead of expanding the full page;
- rows remain readable;
- Current remains draft-only.

### 390px — sparse SI / 100%
PASS:
- one result is clear;
- no empty/broken autocomplete impression;
- disabled primary CTA remains visually distinct.

### 412px — long Canada locality / 100%
PASS:
- **Сейнт Джонс (Нюфаундленд и Лабрадор)** wraps normally inside the suggestion row;
- no horizontal clipping observed.

### 360px — long country / 100%
PASS:
- **Обединени арабски емирства** remains readable in the native country select;
- no layout break observed.

### 390px — country switch DE → FR / 100%
PASS:
review diagnostics after switch:
- `country=FR`
- `current=∅`
- `currentDraft=∅`
- `root=∅`
- `pending=∅`

The Current field returns to an empty state and the CTA is disabled.

### 412px — expired session recovery / 100%
PASS:
- stale selection is removed;
- safe empty Current step is shown;
- visible message:
  **„Предишният избор е изтекъл или не може да се възстанови. Посочи местата отново.“**

### 390px — error state / 100%
PASS:
- error is clearly technical, not a no-people result;
- canonical Current/Root selections remain preserved;
- retry and edit-context actions remain available.

The post-retry secondary continue path is source-verified but was not separately screenshot-tested in T6.

### 412px — unresolved Root fallback / 100%
PASS:
- `root=∅`
- `rootDraft=Стара Загора`
- explicit verification failure message;
- Root-only **„Продължи с непотвърдено място“** remains available.

### 360px — LU missing-list / 100%
PASS:
- write-first state is clear;
- one concise no-list explanation;
- explicit **„Провери мястото“** action;
- Current CTA remains disabled without canonical Current.

### 360px — dense US / 200%
PASS:
- text reflows vertically;
- suggestion rows remain large/readable;
- suggestion box remains internally scrollable;
- no observed horizontal clipping;
- page scrolling is required and allowed.

## Existing map matrix still applies

The earlier map/camera matrix remains preserved:
- 360 / 390 / 412;
- normal / 200% pair heights;
- Madrid/Lom;
- Munich/Lom;
- London/Lom;
- Milan/Lom;
- Lom/Kovachitsa;
- Lom/Lom;
- Manchester/Veliko Tarnovo.

The active candidate also retained the later T5 visual checks for:
- Ковачица ↔ Лом;
- Лом ↔ Лом;
- Root 200% status wrapping.

## Problems found during T6

No Screen 1 product defect was found that required candidate code changes.

QA-only issues corrected:
1. review harness needed explicit expired-session setup/focus;
2. review diagnostics were expanded to expose Current/Root draft/canonical state;
3. 200% dense review needed to focus the suggestion list rather than the top of the panel.

These changes are confined to the review harness.

## Evidence boundary

PASS:
- representative expanded-data locality behavior;
- dense/sparse/missing-list/long-name classes;
- country-switch reset;
- stale-session recovery;
- error and Root fallback presentation;
- 360/390/412 representative mobile coverage;
- 200% dense suggestion reflow;
- stable candidate throughout T6.

NOT VERIFIED:
- every one of the 1530 names visually;
- every one of the 62 countries visually;
- real phone soft keyboard/IME;
- real phone touch;
- screen reader;
- production provider/backend;
- arbitrary real-world network latency;
- final Owner phone approval;
- WORK acceptance/canonicalization.

## Status

T6 is complete as a representative regression checkpoint.

Next planned task:
**T7 — interaction/performance audit.**
