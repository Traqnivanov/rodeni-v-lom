# NEXT CHAT START — „Родени в Лом“

**Дата на handoff:** 26.09.2026  
**Роля на този файл:** кратък вход за следващ чат.  
**НЕ е отделен source of truth.** При конфликт важат `START_HERE.md`, `PROJECT_STATE.md`, `PRODUCT_FUNCTION_DEPENDENCY_MAP.md` и Master.

## FRESHNESS GUARD — ЗАДЪЛЖИТЕЛНО

Този файл е **жив handoff**, не постоянна истина.

Правило:
- текущият чат го обновява при всеки значим strategic/product checkpoint и задължително преди смяна на чат;
- новият чат НЕ приема сляпо записания тук CURRENT NEXT;
- след прочита на този файл той задължително проверява актуалния `PROJECT_STATE.md`;
- ако има разминаване, **по-новият валиден `PROJECT_STATE.md` + Master/Dependency Map имат приоритет**;
- GitHub Issues/PR-и могат да съдържат работа и история, но **не са source of truth за текущия product checkpoint**, освен ако каноничните документи изрично не сочат към тях;
- не се продължава по стар handoff само защото файлът съществува.

**Цел:** дори този handoff да е останал от преди няколко часа, следващият чат да не тръгне по остаряла задача.

## Задължително начало

Новият чат трябва да прочете, в този ред:

1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `WORK_CONTROLLER_HANDOFF.md`
4. `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`
5. Master §§115–116 и релевантните §§67, 70, 75, 82, 87, 112, 114

Не започвай проекта отначало.

## Текущ стратегически checkpoint

Master §§115–116 — **Municipality Community Graph + Owner-approved Community Identity Naming Contract**.

За България:

- **community membership = canonical община**;
- **exact Root = точно canonical населено място вътре в общността**;
- normal people discovery: **exact Root → same municipality → силна друга причина**;
- при active need / Travel / конкретен момент човешката релевантност може да е по-важна от exact Root;
- municipality membership НЕ означава автоматично person display;
- Visibility / `open_to_strangers` / block / decline / safety остават задължителни;
- public exact `0–4` може да broadens само към canonical municipality aggregate, ако той самостоятелно покрива privacy threshold;
- locality→municipality идва от versioned official mapping, не от ръчни групи;
- frozen `lomGroup` и `Лом и региона` са demo/historical, не canonical geography;
- националното име на продукта остава **OPEN**;
- `Родени в Лом` не е заключено като националното име на целия продукт.

## Какво вече е проверено

### Live сайтът

Историческият live продукт вече съдържа полезни механизми/сигнали:
- settlement;
- current city/country;
- school;
- profession;
- willingness to help/guidance precursor;
- Travel;
- connection requests;
- accepted connections;
- private chat.

Тези механизми могат да захранят R.E., но старият broad public people browsing НЕ се връща.

### Frozen Screen 1 prototype

Пази се:
- map-first entry;
- Current → Root;
- canonical-vs-draft boundary;
- privacy-safe aggregate;
- Context Bridge;
- error/recovery/mobile/map interaction work.

НЕ се канонизира:
- hardcoded `lomGroup`;
- размитото `Лом и региона`;
- demo география.

Frozen prototype не се пипа без ново Owner approval.

## CURRENT ENVIRONMENT — FINAL MODEL

- `main` = canonical truth;
- `work/screen1-current` = единствена active Screen 1 work + QA lane; current product candidate = carried-forward test/working blob `38544a93...`; QA harness = `dc4962a...`;
- frozen reference = `review/ordinary-screen1-frozen-for-work` @ `1c1551dc...`, DO NOT MODIFY;
- live/production = untouched;
- всички други Screen 1 branches/PR-и = archive/evidence only.

Не избирай друга среда по собствена преценка. Не започвай нов branch за малка задача.

## CURRENT NEXT

**Screen 1 dependency revalidation спрямо Master §§112, 114, 115, 116**

Naming Contract за общия случай вече е **OWNER APPROVED (§116)**:
- exact Root identity и municipality Community identity са отделни човешки нива;
- community display label е отделен от canonical municipality ID/official name;
- national brand остава отделен;
- не се използва механично `Родени в + municipality_name`;
- при Root/community с еднакво човешко име е допустим compact display без загуба на отделните identity данни;
- **Sofia/Столична община остава отделен mandatory research gate и НЕ е решена от §116.**

Следващата работа:
1. end-to-end audit на frozen Screen 1 спрямо §§112, 114, 115, 116;
2. провери first 3 seconds, Current → Root, preview, exact→municipality broadening, CTA, registration continuity и mobile;
3. открий конфликтите между frozen demo semantics и новия approved model;
4. дай **ЕДНО най-добро конкретно предложение → рискове → Criteria Check → Owner approval**;
5. без prototype implementation преди Owner approval.

## Забрани до Owner approval

- няма prototype implementation;
- няма live/production промяна;
- няма Supabase/DB/schema промяна;
- няма EKATTE import;
- няма нов национален brand;
- няма автоматично `Родени в [Root]` rebrand;
- няма public people directory;
- няма финално записване на Naming Contract преди Owner approval.

## Как да разбереш, че си тръгнал в грешна посока

Спри, ако започнеш да:
- правиш prototype/code преди текущия Screen 1 revalidation proposal + Owner approval;
- третираш всяко село като отделна community;
- губиш exact Root;
- приемаш same municipality като достатъчно основание за показване на произволен stranger;
- използваш frozen demo geography като source of truth;
- решаваш националното име без отделно Owner решение;
- връщаш стария Screen 1 NEXT преди §115/naming dependency да е затворена.
